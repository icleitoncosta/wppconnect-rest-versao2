import { ClientWhatsApp, RequestEx } from '../models/Request';
import { Error } from '../models/Error';
import { AddParticipantGroup, CreateGroup, DeleteParticipantGroup, DemoteParticipantGroup, EditGroup, PromoteParticipantGroup, RemoveLinkGroup, ReturnGroup } from '../models/Groups';
import { ServerError } from './server-error';
import { ProfilePicThumbObj } from '@wppconnect-team/wppconnect';

export class GroupsService {
    /**
     * Function to retrieve data of a group
     */
    public async get(req: RequestEx, groupId: string): Promise<ReturnGroup | Error> {
        try {
            const client = req.client as ClientWhatsApp;
            const group = await client.getChatById(groupId);
            return Promise.resolve({
                messaging_product: "whatsapp",
                group: {
                    id: group?.id._serialized as string,
                    name: (group?.groupMetadata as any).subject as string,
                    description: group?.groupMetadata.desc as string,
                    pic: (await client.getProfilePicFromServer(groupId) as ProfilePicThumbObj).eurl,
                    participants: await client.getGroupMembersIds(groupId),
                    admins: await client.getGroupAdmins(groupId),
                    invite: await client.getGroupInviteLink(groupId) as string,
                }
            })
        } catch (error) {
            req.logger(error);
            return Promise.reject(new ServerError("Error on get group",
                "error_get_group",
                3,
                error,
                131009));
        }
    }
    /**
     * Function to create and send message to contact
     */
    public async manageGroup(req: RequestEx, payload: CreateGroup | EditGroup | AddParticipantGroup | DeleteParticipantGroup | DemoteParticipantGroup | PromoteParticipantGroup | RemoveLinkGroup): Promise<ReturnGroup | Error> {
        try {
            let data;
            const client = req.client as ClientWhatsApp;
            if(payload.type === "create_group") {
                data = await client.createGroup(payload.create.name, payload.create.members);
                return Promise.resolve(this.returnGroupSucess(data?.gid._serialized as string, req));
            }else if(payload.type === "edit_group") {
                if(payload.edit.description) await client.setGroupDescription(payload.edit.id, payload.edit.description);
                if(payload.edit.name) await client.setGroupSubject(payload.edit.id, payload.edit.name);
                if(payload.edit.pic) await client.setGroupIcon(payload.edit.id, payload.edit.pic);
                
                return Promise.resolve(this.returnGroupSucess(payload.edit.id, req));
            }else if(payload.type === "add_participant") {
                data = await client.addParticipant(payload.add_participant.id, payload.add_participant.phones);
                return Promise.resolve(this.returnGroupSucess(payload.add_participant.id, req));
            }else if(payload.type === "remove_participant") {
                data = await client.removeParticipant(payload.remove_participant.id, payload.remove_participant.phones)
                return Promise.resolve(this.returnGroupSucess(payload.remove_participant.id, req));
            }else if(payload.type === "demote_participant") {
                data = await client.demoteParticipant(payload.demote.id, payload.demote.phone)
                return Promise.resolve(this.returnGroupSucess(payload.demote.id, req));
            }else if(payload.type === "promote_participant") {
                data = await client.promoteParticipant(payload.promote.id, payload.promote.phone)
                return Promise.resolve(this.returnGroupSucess(payload.promote.id, req));
            }else if(payload.type === "revoke_link") {
                data = await client.revokeGroupInviteLink(payload.revoke.id)
                return Promise.resolve(this.returnGroupSucess(payload.revoke.id, req));
            }
            else {
                return {
                    error: {
                        message: "Error on manage groups",
                        type: "error_manage_groups",
                        code: 1,
                        error_data: {
                            messaging_product: "whatsapp",
                            details: "Error in your request, parameters not found.",
                        },
                        error_subcode: 135000,
                        fbtrace_id: undefined,
                    }
                }
            }
        } catch (error: any) {
            return {
                error: {
                    message: "Error on manage groups",
                    type: "error_manage_groups",
                    code: 1,
                    error_data: {
                        messaging_product: "whatsapp",
                        details: error,
                    },
                    error_subcode: 131000,
                    fbtrace_id: undefined,
                }
            }
        }
    }
    private async returnGroupSucess(gwid: string, req: RequestEx): Promise<ReturnGroup>{
        const client = req.client as ClientWhatsApp;
        const group = await client.getChatById(gwid);
        return {
            messaging_product: "whatsapp",
            group: {
                id: gwid,
                name: (group?.groupMetadata as any).subject as string,
                description: (group?.groupMetadata as any).desc as string,
                pic: (await client.getProfilePicFromServer(gwid) as ProfilePicThumbObj).eurl,
                participants: await client.getGroupMembersIds(gwid),
                admins: await client.getGroupAdmins(gwid),
                invite: await client.getGroupInviteLink(gwid) as string,
            }
        }
    }

    public async manageMyGroup(req: RequestEx, type: "leave" | "join", groupId: string, link?: string): Promise<{sucess: true} | Error> {
        try {
            const client = req.client as ClientWhatsApp;
            if(type === "leave") {
                await client.leaveGroup(groupId)
                return Promise.resolve({ sucess: true });
            }else if(type === "join") {
                await client.joinGroup(link as string)
                return Promise.resolve({ sucess: true });
            }else {
                return {
                    error: {
                        message: "Error on manage groups",
                        type: "error_manage_groups",
                        code: 1,
                        error_data: {
                            messaging_product: "whatsapp",
                            details: "Error in your request, parameters not found.",
                        },
                        error_subcode: 135000,
                        fbtrace_id: undefined,
                    }
                }
            }
        } catch (error: any) {
            req.logger(error);
            return Promise.reject(new ServerError("Error on manage groups",
                "error_manage_group",
                3,
                error,
                131009));
        }
    }
}