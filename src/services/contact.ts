import { ProfilePicThumbObj } from '@wppconnect-team/wppconnect';
import { ClientWhatsApp, RequestEx } from 'src/models/Request';
import { BusinessProfileInterface, Contact, FieldsBusinessContact, FieldsContact, MiniBusinessProfile } from '../models/Contact';
import { ServerError } from './server-error';

export class ContactService {
    public async get(req: RequestEx, id: string, _fields: FieldsContact[]): Promise<Contact | ServerError> {
        try {
            const contact = await (req?.client as ClientWhatsApp).getContact(id);
            console.log(contact);
            return {
                wa_id: contact?.id._serialized as string,
                profile: {
                    name: contact?.name as string,
                },
                wpp_data: _fields.includes("wpp_data") ? {
                    profile_picture_url: (await (req?.client as ClientWhatsApp).getProfilePicFromServer(id) as ProfilePicThumbObj).eurl as string,
                    formattedName: contact?.formattedName,
                    isBusiness: contact?.isBusiness,
                    isEnterprise: contact?.isEnterprise,
                    chatId: contact.id._serialized,
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
            if(!id.includes("@c.us")) {
                return new ServerError("Error on get profile",
                "error_get_profile",
                3,
                "Invalid phone, please send with @c.us format",
                131009);
            }
            const profile = await (req?.client as ClientWhatsApp).getBusinessProfile(id);
            console.log(profile);
            const contact = await (req?.client as ClientWhatsApp).getContact(id);
            return {
                data: [
                    {
                        business_profile: {
                            messaging_product: "whatsapp",
                            profile_picture_url: fields.includes("profile_picture_url") ? (await (req?.client as ClientWhatsApp).getProfilePicFromServer(id) as ProfilePicThumbObj).eurl as string : undefined,
                            name: fields.includes("name") ? contact?.name : undefined,
                            about: fields.includes("about") ? (await (req.client as ClientWhatsApp).getStatus(id)).status : undefined,
                            address: fields.includes("address") ? profile.address : undefined,
                            description: fields.includes("description") ? profile.description : undefined,
                            email: fields.includes("email") ? profile.email : undefined,
                            websites: fields.includes("about") ? profile.website : undefined,
                            vertical: "",
                        },
                        wpp_data: fields.includes("wpp_data") ? {
                            formattedName: contact?.formattedName,
                            isEnterprise: contact?.isEnterprise,
                            chatId: contact.id._serialized,
                            coverPhoto: profile.coverPhoto,
                        } : undefined,
                    }

                ]
            }
        } catch (error) {
            console.log(error);
            return Promise.reject(new ServerError("Error on get profile",
            "error_get_profile",
            3,
            error,
            131009));
        }
    }
    public async updateBusinessProfile(req: RequestEx, payload: Partial<BusinessProfileInterface>): Promise<{ data: MiniBusinessProfile[]} | ServerError> {
        try {
            const edit = await (req.client as ClientWhatsApp).editBusinessProfile({
                description: payload.description,
                address: payload.address,
                email: payload.email,
                websites: payload.websites,
            });
            if (payload.profile_picture_url) {
                await (req.client as ClientWhatsApp).setProfilePic(payload.profile_picture_url);
            }
            if (payload.about) {
                await (req.client as ClientWhatsApp).setProfileStatus(payload.about);
            }
            if (payload.name) {
                await (req.client as ClientWhatsApp).setProfileName(payload.name);
            }
            const get = await (req.client as ClientWhatsApp).getChatById(edit.id);
            
            return Promise.resolve({
                data: [
                    {
                        business_profile: {
                            messaging_product: "whatsapp",
                            profile_picture_url: (await (req.client as ClientWhatsApp).getProfilePicFromServer(edit.id)).eurl,
                            name: get.name,
                            about: (await (req.client as ClientWhatsApp).getStatus(edit.id)).status,
                            address: (edit as any).address,
                            description: (edit as any).description,
                            email: (edit as any).email,
                            websites: (edit as any).websites,
                            vertical: (edit as any).categories,
                        },
                    }
                ]
            });
        } catch (error) {
            console.log(error);
            return new ServerError("Error on update profile",
                "error_update_profile",
                3,
                error,
                131009
            );
        }
    }
}