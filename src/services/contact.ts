import { RequestEx } from 'src/models/Request';
import { BusinessProfileInterface, Contact, ContactCreationParams, FieldsContact, MiniBusinessProfile } from '../models/Contact';
import { ServerError } from './server-error';

export class ContactService {
    public async get(req: RequestEx, id: string, _fields: FieldsContact[]): Promise<Contact | ServerError> {
        try {
            const contact = await req.client?.getContact(id);
            return {
                wa_id: contact?.id._serialized as string,
                profile: {
                    name: contact?.name as string,
                }
            }
        } catch (error) {
            return Promise.reject(new ServerError("Error on get markstatus message",
                "error_set_status",
                3,
                error,
                131009));
        }
    }
    public async getBusiness(req: RequestEx, id: string, fields: string): Promise<{ data: MiniBusinessProfile[]} | ServerError> {
        try {
            const contact = await req.client?.getContact(id);
            return {
                data: [
                    {
                        business_profile: {
                            messaging_product: "whatsapp",
                            profile_picture_url: "",
                            name: fields.includes("name") ? contact?.name : undefined,
                            about: "",
                            adress: "",
                            description: "",
                            email: "",
                            websites: [],
                            vertical: "",
                        }
                    }

                ]
            }
        } catch (error) {
            return Promise.reject(new ServerError("Error on get markstatus message",
                "error_set_status",
                3,
                error,
                131009));
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