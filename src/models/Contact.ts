export interface Contact {
    /**
     * ID of user or group "xxxxxxxxxx@c.us" for contacts, "xxxxxxxxxx@g.us" for groups
     * @param wa_id 5521985523778@c.us
     */
    wa_id: string;
    profile: ProfileInterface;
    wpp_data?: ContactWPP | undefined;
}
interface ProfileInterface {
    name: string;
}
interface ContactWPP {
    profile_picture_url: string | undefined;
    formattedName: string | undefined;
    isBusiness: boolean | undefined;
    isEnterprise: boolean | undefined;
}
export interface MiniBusinessProfile {
    business_profile: BusinessProfileInterface;
    wpp_data?: ContactWPP | undefined;
}
export interface BusinessProfileInterface {
    messaging_product: 'whatsapp';
    /**
     * @example Name of your Bussiness
     */
    name?: string;
    /**
     * @example Description of your busines
     */
    about?: string;
    /**
     * @example Rua R. de Janeiro, 1985, Copacabana - RJ
     */
    address?: string;
    /**
     * @example The Rio de Janeiro is beautiful
     */
    description?: string;
    /**
     * @example rjbr@gmail.com
     */
    email?: string;
    /**
     * @example http://www.google.aaa/image.jpg
     */
    profile_picture_url?: string;
    /**
     * @example ['www.google.com.br']
     */
    websites?: string[];
    /**
     * @example "INDUSTRY"
     */
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

export type FieldsContact = "name" | "wpp_data";
export type FieldsBusinessContact = "name" | "about" | "address" | "description" | "email" | "profile_picture_url" | "websites" | "vertical" | "wpp_data";