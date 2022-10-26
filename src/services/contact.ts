import { BusinessProfileInterface, Contact, ContactCreationParams, FieldsBusinessContact, FieldsContact } from '../models/Contact';

export class ContactService {
    public get(id: string, fields: FieldsContact[]): Contact {
        return {
            wa_id: id + fields,
            profile: {
                name: "John Doe"
            }
        }
    }
    public getBusiness(id: string, fields: FieldsBusinessContact[]): { data: BusinessProfileInterface[]} {
        return {
            data: [ {
                about: id + fields,
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
    public updateBusinessProfile(payload: Partial<BusinessProfileInterface>): { sucess:boolean } {
        console.log(payload); // fix for non error typescript
        return {
            sucess: true
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