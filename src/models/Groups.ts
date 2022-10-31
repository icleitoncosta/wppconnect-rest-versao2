/**
 * THIS IS NOT SIMILAR TO OFFICIAL API
 * EXCLUSIVE BY WPPCONNECT
 * 
 */

 export interface ReturnGroup {
    messaging_product: "whatsapp",
    group: Group;
}
export interface Group {
    id: string,
    name: string,
    description: string,
    pic?: string | undefined,
    participants?: any,
    admins: any,
    invite: string,
}
export interface CreateGroup {
    messaging_product: 'whatsapp';
    type: "create_group";
    create:{
        name: string,
        description: string;
        members: string[],
    }
}

export interface EditGroup {
    messaging_product: 'whatsapp';
    type: "edit_group";
    edit: {
        /**
         * group id
         * @example 895656588989a@g.us
         */
        id: string;
        name?: string;
        description?: string;
        pic?: string;
    }
}
export interface AddParticipantGroup {
    messaging_product: 'whatsapp';
    type: "add_participant";
    add_participant: {
        /**
         * group id
         * @example 895656588989a@g.us
         */
        id: string;
        phones: string[] | string;
    }
}
export interface DeleteParticipantGroup {
    messaging_product: 'whatsapp';
    type: "remove_participant";
    remove_participant: {
        /**
         * group id
         * @example 895656588989a@g.us
         */
        id: string;
        phones: string[] | string;
    }
}
export interface DemoteParticipantGroup {
    messaging_product: 'whatsapp';
    type: "demote_participant";
    demote: {
        /**
         * group id
         * @example 895656588989a@g.us
         */
        id: string;
        /**
         * participant id
         * @example 552136458956@c.us
         */
        phone: string;
    }
}
export interface PromoteParticipantGroup {
    messaging_product: 'whatsapp';
    type: "promote_participant";
    promote: {
        /**
         * group id
         * @example 895656588989a@g.us
         */
        id: string;
        /**
         * participant id
         * @example 552136458956@c.us
         */
        phone: string;
    }
}
export interface RemoveLinkGroup {
    messaging_product: 'whatsapp';
    type: "revoke_link";
    revoke: {
        /**
         * group id
         * @example 895656588989a@g.us
         */
        id: string;
    }
}
