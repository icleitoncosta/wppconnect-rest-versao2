export type MessageType = 'text' | 'image' | 'audio' | 'document' | 'template' | 'hsm' | "sticker" |
"order" | "video" | "contacts" | "location" | "unknown" | "system" | "interactive";

export interface Message {
    /**
     * Send Messages, audio, etc
     */
    messaging_product: "whatsapp",
    /**
     * Required for message templates.
     * The type of message being sent.
     */
    type?: MessageType;
    /**
     * ID of user or group "xxxxxxxxxx@c.us" for contacts, "xxxxxxxxxx@g.us" for groups
     * @example 5521985523778@c.us
     */
    to: string;
    from?: string;
    id: string;
    timestamp?: number;
    /**
     * Reply for a message
     */
    context?: { message_id: string };
    recipient_type?: 'individual' | 'group';
    /**
     * Required for template messages.
     * Contains all model information.
     */
    template?: any;
    /**
     * Required for message templates.
     * The contained element for the message content. Indicates that the message is highly structured. The contained parameters provide the structure.
     */
    hsm?: any;
    text?: TextMessageObject;
    reaction?: ReactMessageObject;
    image?: MediaObject;
    video?: MediaObject;
    audio?: MediaObject;
    document?: MediaObject;
    location?: LocationMessageObject;
    contacts?: ContactObject[];
    interactive?: InteractiveObject;
    sticker?: MediaObject;
}

export interface ReturnSendedMessage {
    messaging_product: "whatsapp";
    contacts: {
        input: string;
        wa_id: string;
    };
    messages: {
        id: string;
    }
}

export interface TextMessageObject {
    /**
     * @example "Welcome to Brazil!"
     */
    body: string;
    /**
     * @example true
     */
    preview_url?: boolean;
}
export interface ReactMessageObject {
    /**
     * The WhatsApp Message ID (wamid) of the message on which the reaction should appear. The reaction will not be sent if:
     * The message is a reaction message
     * The message has been deleted
     * If the ID is of a message that has been deleted, the message will not be delivered.
     */
    message_id: string;
    /**
     * Emoji to appear on the message.
     */
    emoji: string;
}
export interface LocationMessageObject {
    /**
     * Longitude of the location.
     */
    longitude: number | string;
    /**
     * Latitude of the location.
     */
    latitude: number | string;
    /**
     * Name of the location.
     */
    name?: string;
    /**
     * Address of the location. Only displayed if name is present.
     */
    address?: string;

}

export interface ContactObject {
    /**
     * Not implemented yeat on WAJS
     */
    addresses?: AdressesContact[],
    /**
     * Not implemented yeat on WAJS
     */
    birthday?: Date;
    /**
     * Not implemented yeat on WAJS
     */
    emails?: string[];
    name: NameContact;
    /**
     * Not implemented yeat on WAJS
     */
    org?: OrgContact;
    phones: PhonesContact[];
    /**
     * Not implemented yeat on WAJS
     */
    urls?: UrlsContact[];
}

export interface AdressesContact {
    street: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    country_code?: string;
    type?: "HOME" | "WORK";
}
interface NameContact {
    formatted_name: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    suffix?: string;
    prefix?: string;
}
interface OrgContact {
    company?: string;
    department?: string;
    title?: string;
}
interface PhonesContact {
    /**
     * Automatically populated with the `wa_id` value as a formatted phone number.
     */
    phone?: string;
    type?: "CELL" | "MAIN" | "IPHONE" | "HOME" | "WORK";
    wa_id?: string;
}
interface UrlsContact {
    /**
     * Not implemented yeat on WAJS
     */
    url?: string;
    type?: "HOME" | "WORK";
}

export interface MediaObject {
    /**
     * ID of File sended for the server.
     * Required when type is audio, document, image, sticker, or video and you are not using a link.
     */
    id?: string;

    mime_type?: string;
    sha256?: string;
    /**
     * Send LINK HTTPS or <base64>
     * Required when type is audio, document, image, sticker, or video and you are not using an uploaded media ID.
     * The protocol and URL of the media to be sent. Use only with HTTP/HTTPS URLs.
     * Do not use this field when message type is set to text.
     */
    link?: string;
    /**
     * Describes the specified image or video media.
     */
    caption?: string;
    /**
     * Describes the filename for the specific document. Use only with document media.
     * The extension of the filename will specify what format the document is displayed as in WhatsApp.
     */
    filename?: string;
}

export interface InteractiveObject {
    action: ActionObject;
    body?: { text: string; };
    footer?: { text: string; };
    header?: { type: "text"; text: string; };
    type: "button" | "list" | "product" | "product_list";
}
interface ActionObject {
    /**
     * Required for List Messages.
     * Button content. It cannot be an empty string and must be unique within the message. Emojis are supported, markdown is not.
     */
    button?: string;
    buttons?: Buttons[];
    /**
     * Unique identifier of the Facebook catalog linked to your WhatsApp Business Account.
     */
     catalog_id?: string;
     /**
      * Unique identifier of the product in a catalog.
      */
     product_retailer_id?: string;
     sections?: Sections[];
}

export interface Buttons {
    /**
     * Only supported type is reply (for Reply Button)
     */
    type: "reply";
    reply: {
        
        /**
         * Button title. It cannot be an empty string and must be unique within the message. Emojis are supported, markdown is not. Maximum length: 20 characters.
         */
        title: string;
        /**
         * Unique identifier for your button. This ID is returned in the webhook when the button is clicked by the user. Maximum length: 256 characters.
         */
        id: string;
    }
}
interface Sections {
    /**
     * Not implemented yeat
     * Array of product objects. There is a minimum of 1 product per section and a maximum of 30 products across all sections.
     */
    product_items?: any;
    /**
     * Contains a list of rows. You can have a total of 10 rows across your sections.
     */
    rows?: SectionsRows[];
    /**
     * Required if the message has more than one section.
     * Title of the section.
     */
    title?: string;
}
interface SectionsRows {
    id?: string;
    title: string;
    description?: string;
}

export interface PollMessageObject {
    /**
     * @example "What is the best city for the beach?"
     */
    title: string;
    /**
     * @example ['Arraial do Cabo', 'Porto de Galinhas', 'Ilha Grande']
     */
    options: string[];
    /**
     * @example 1
     */
     selectableCount?: number;
}