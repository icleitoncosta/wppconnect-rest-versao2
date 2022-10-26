export interface Contact {
    /**
     * ID of user or group "xxxxxxxxxx@c.us" for contacts, "xxxxxxxxxx@g.us" for groups
     * @param wa_id 5521985523778@c.us
     */
    wa_id: string;
    profile: ProfileInterface;
}

interface ProfileInterface {
    name: string;
}

export interface BusinessProfileInterface {
    name?: string;
    about?: string;
    adress?: string;
    description?: string;
    email?: string;
    messaging_product?: 'whatsapp';
    profile_picture_url: string;
    websites?: string[];
    vertical?: string;
}

export interface ContactCreationParams {
    /**
     * ID of user or group "xxxxxxxxxx@c.us" for contacts, "xxxxxxxxxx@g.us" for groups
     * @example 5521985523778@c.us
     */
    wa_id: string;
    name: string;
}

export type FieldsContact = 'name';
export type FieldsBusinessContact = "about" | "address" | "description" | "email" | "profile_picture_url" | "websites";