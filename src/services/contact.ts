import { Wid } from '@wppconnect-team/wppconnect';
import { Contact, ContactCreationParams } from '../models/Contact';

export class ContactService {
    public get(id: Wid | string, fields: string): Contact {
        return {
            wa_id: id + fields,
            profile: {
                name: "John Doe"
            }
        }
    }
    public create(payload: ContactCreationParams): Contact {
        return {
            wa_id: payload.wa_id,
            profile: {
                name: payload.name,
            }
        }
    }
}