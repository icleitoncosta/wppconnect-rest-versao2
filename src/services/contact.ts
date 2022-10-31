import { ProfilePicThumbObj } from '@wppconnect-team/wppconnect';
import { RequestEx } from 'src/models/Request';
import { BusinessProfileInterface, Contact, FieldsBusinessContact, FieldsContact, MiniBusinessProfile } from '../models/Contact';
import { ServerError } from './server-error';

export class ContactService {
    public async get(req: RequestEx, id: string, _fields: FieldsContact[]): Promise<Contact | ServerError> {
        try {
            const contact = await req.client?.getContact(id);
            console.log(contact);
            return {
                wa_id: contact?.id._serialized as string,
                profile: {
                    name: contact?.name as string,
                },
                wpp_data: _fields.includes("wpp_data") ? {
                    profile_picture_url: (await req.client?.getProfilePicFromServer(id) as ProfilePicThumbObj).eurl as string,
                    formattedName: contact?.formattedName,
                    isBusiness: contact?.isBusiness,
                    isEnterprise: contact?.isEnterprise
                } : undefined,
            }
        } catch (error) {
            return Promise.reject(new ServerError("Error on get markstatus message",
                "error_set_status",
                3,
                error,
                131009));
        }
    }
    public async getBusiness(req: RequestEx, id: string, fields: FieldsBusinessContact[]): Promise<{ data: MiniBusinessProfile[]} | ServerError> {
        try {
            const contact = await req.client?.getContact(id);
            return {
                data: [
                    {
                        business_profile: {
                            messaging_product: "whatsapp",
                            profile_picture_url: fields.includes("profile_picture_url") ? (await req.client?.getProfilePicFromServer(id) as ProfilePicThumbObj).eurl as string : "",
                            name: fields.includes("name") ? contact?.name : undefined,
                            about: fields.includes("about") ? "" : undefined,
                            address: fields.includes("address") ? "" : undefined,
                            description: fields.includes("description") ? "" : undefined,
                            email: fields.includes("email") ? "" : undefined,
                            websites: fields.includes("about") ? [] : undefined,
                            vertical: fields.includes("vertical") ? "" : undefined,
                        },
                        wpp_data: fields.includes("wpp_data") ? {
                            profile_picture_url: (await req.client?.getProfilePicFromServer(id) as ProfilePicThumbObj).eurl as string,
                            formattedName: contact?.formattedName,
                            isBusiness: contact?.isBusiness,
                            isEnterprise: contact?.isEnterprise
                        } : undefined,
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
    public async updateBusinessProfile(_req: RequestEx, _payload: Partial<BusinessProfileInterface>): Promise<{ data: MiniBusinessProfile[]} | ServerError> {
        try {
            return Promise.reject(new ServerError("Not implemented yeat",
                "error_update_profile",
                3,
                "This is not implemented on @wppconnect-team/wppconnect",
                131009));
            
            /*return {
                data: [
                    {
                        business_profile: {
                            messaging_product: "whatsapp",
                            profile_picture_url: "",
                            name: "",
                            about: "",
                            address: "",
                            description: "",
                            email: "",
                            websites: [],
                            vertical: "",
                        },
                    }

                ]
            }
            */
        } catch (error) {
            return Promise.reject(new ServerError("Error on get markstatus message",
                "error_set_status",
                3,
                error,
                131009
            ));
        }
    }
}