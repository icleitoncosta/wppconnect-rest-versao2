import { Wid } from '@wppconnect-team/wppconnect';

export interface Contact {
    wa_id: string | Wid;
    profile: ProfileInterface;
}

interface ProfileInterface {
    name: string;
}

export interface ContactCreationParams {
    wa_id: string | Wid;
    name: string;
}