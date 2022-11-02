import { ClientWhatsApp, RequestEx } from '../models/Request';
import { Media, ReturnMedia } from '../models/Media';
import { Validation } from './validations';
import config from '../config';
import { ServerError } from './server-error';
import globby from 'globby';
import fileType from 'file-type';
import fs from 'fs';
import { Message } from '@wppconnect-team/wppconnect';
import mime from 'mime-types';
import { logger } from '../app';

export class MediaService {
    public async get(req: RequestEx, id: string): Promise<ReturnMedia | ServerError> {
        const paths = await globby('uploads', {
            expandDirectories: {
                files: [id],
                extensions: ['*']
            }
        });

        if(new Validation().isUUID(id)) {
            if(paths.length === 0) {
                return new ServerError(
                    "Media not found", 
                    "media_not_found", 
                    3, 
                    "Check the ID media is correct",
                    134000
                );
            }else{
                return this.returnPathFound(paths[0], id);
            }
        } else {
            if(paths.length === 0) {
                const msg = await (req.client as ClientWhatsApp).getMessageById(id);
                if(!msg.isMedia) {
                    return new ServerError(
                        "Media not found", 
                        "media_not_found", 
                        3, 
                        "Check the ID media is correct",
                        134000
                    );
                } else { 
                    const path = await this.downloadFileFunction(msg, req.client as ClientWhatsApp);
                    return this.returnPathFound(path, id);
                }
            }else {
                return this.returnPathFound(paths[0], id);
            }
        }
    }
    private async returnPathFound(path: string, id: string): Promise<ReturnMedia> {
        const filetp = await fileType.fromFile(path);
        const stats = fs.statSync(path);
        return {
            messaging_product: "whatsapp",
            url: `${config.host}:${config.port}/${path}`,
            mime_type: filetp?.mime as string,
            sha256: null,
            file_size: stats.size,
            id: id,
        }
    }
    private async downloadFileFunction(message: Message, client: ClientWhatsApp) {
        try {
            const buffer = await client.decryptFile(message);
        
            let filename = `uploads/${message.id}`;
            if (!fs.existsSync(filename)) {
            let result = '';
            if (message.type === 'ptt') {
                result = `${filename}.oga`;
            } else {
                result = `${filename}.${mime.extension(message.mimetype)}`;
            }
        
            fs.writeFile(result, buffer, (err) => {
                if (err) {
                    logger.error(err);
                }
            });
        
            return result;
            } else {
                return `${filename}.${mime.extension(message.mimetype)}`;
            }
        } catch (e) {
            logger.error(e);
            logger.warn('Erro ao descriptografar a midia, tentando fazer o download direto...');
            try {
            const buffer = await client.downloadMedia(message);
            const filename = `uploads/file${message.id}`;
            if (!fs.existsSync(filename)) {
                let result = '';
                if (message.type === 'ptt') {
                    result = `${filename}.oga`;
                } else {
                    result = `${filename}.${mime.extension(message.mimetype)}`;
                }
        
                fs.writeFile(result, buffer, (err) => {
                    if (err) {
                        logger.error(err);
                    }
                });
        
                return result;
            } else {
                return `${filename}.${mime.extension(message.mimetype)}`;
            }
            } catch (e) {
                logger.error(e);
                logger.warn('Não foi possível baixar a mídia...');
                throw new Error("Não foi possível baixar a mídia...");
            }
        }
    }
    public create(req: RequestEx, payload: Media, file: Express.Multer.File): { id: string } {
        console.log(file);
        console.log(req);
        return {
            id: payload.type,
        }
    }
    public async delete(req: RequestEx, id: string): Promise<{ sucess: boolean } | ServerError> {
        try {
            const paths = await globby('uploads', {
                expandDirectories: {
                    files: [id],
                    extensions: ['*']
                }
            });
            if(new Validation().isUUID(id)) {
                if(paths.length === 0) {
                    return new ServerError(
                        "Media not found", 
                        "media_not_found", 
                        3, 
                        "Check the ID media is correct",
                        134000
                    );
                }
                await fs.promises.rm(paths[0]);
                return { sucess: true };
            } else { 
                try {
                    await (req.client as ClientWhatsApp).getMessageById(id);
                    
                    if(paths.length === 0) {
                        return new ServerError(
                            "Media not found", 
                            "media_not_found", 
                            3, 
                            "Check the ID media is correct",
                            134000
                        );
                    }
                    await fs.promises.rm(paths[0]);
                    return { sucess: true };
                } catch (error) {
                    return new ServerError(
                        "Error on delete media", 
                        "error_on_delete_media", 
                        3, 
                        "This file does not belong to you.",
                        135000
                    );
                }
            }
        } catch (error) {
            return new ServerError(
                "Error on delete media", 
                "error_on_delete_media", 
                3, 
                error,
                135000
            );
        }
    }
}