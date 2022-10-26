import { RequestEx } from 'src/models/Request';
import { BusinessProfileInterface, Contact, ContactCreationParams, FieldsBusinessContact, FieldsContact } from '../models/Contact';

export class ContactService {
    public get(req: RequestEx, id: string, fields: FieldsContact[]): Contact {
        return {
            wa_id: id + fields + req,
            profile: {
                name: "John Doe"
            }
        }
    }
    public getBusiness(req: RequestEx, id: string, fields: FieldsBusinessContact[]): { data: BusinessProfileInterface[]} {
        return {
            data: [ {
                about: id + fields + req,
                adress: 'Adress',
                description: "Descrição",
                email: 'email@email.com',
                messaging_product: 'whatsapp',
                profile_picture_url: 'http://',
                websites: [],
                vertical: "INDUSTRY",
            }]
        }
    }
    public updateBusinessProfile(req: RequestEx, payload: Partial<BusinessProfileInterface>): { sucess:boolean } {
        console.log(payload, req); // fix for non error typescript
        return {
            sucess: true
        }
    }
    public create(req: RequestEx, payload: ContactCreationParams): Contact {
        return {
            wa_id: payload.wa_id,
            profile: {
                name: payload.name+req,
            }
        }
    }
}