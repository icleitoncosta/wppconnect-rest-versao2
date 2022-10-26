import { RequestEx } from 'src/models/Request';
import { Media, ReturnMedia } from '../models/Media';

export class MediaService {
    public get(req: RequestEx, id: string): ReturnMedia {
        console.log(req);
        return {
            messaging_product: "whatsapp",
            url: "string",
            mime_type: "string",
            sha256: "string",
            file_size: 0,
            id: id,
        }
    }
    public create(req: RequestEx, payload: Media, file: Express.Multer.File): { id: string } {
        console.log(file);
        console.log(req);
        return {
            id: payload.type,
        }
    }
    public delete(req: RequestEx, id: string): { sucess: boolean } {
        console.log(req);
        return {
            sucess: id as unknown as boolean
        }
    }
}