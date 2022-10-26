import { Media, ReturnMedia } from '../models/Media';

export class MediaService {
    public get(id: string): ReturnMedia {
        return {
            messaging_product: "whatsapp",
            url: "string",
            mime_type: "string",
            sha256: "string",
            file_size: 0,
            id: id,
        }
    }
    public create(payload: Media, file: Express.Multer.File): { id: string } {
        console.log(file);
        return {
            id: payload.type,
        }
    }
    public delete(id: string): { sucess: boolean } {
        return {
            sucess: id as unknown as boolean
        }
    }
}