import { ContactObject, InteractiveObject, LocationMessageObject, MediaObject, PollMessageObject, ReactMessageObject, TextMessageObject } from "./Messages";

export interface DefaultSendMsg {
    /**
     * Send Messages, audio, etc
     */
    messaging_product: "whatsapp",
    recipient_type: "individual" | "group",
    /**
     * The type of message being sent.
     * @example "text"
     */
    /**
     * ID of user or group "xxxxxxxxxx@c.us" for contacts, "xxxxxxxxxx@g.us" for groups
     * @example "5521988556587@c.us"
     */
    to: string;
}
export interface SendText extends DefaultSendMsg {
    /**
     * Reply for a message
     * @example { message_id: "message_id_to_reply" }
     */
    type: "text",
    context?: { message_id: string };
    text: TextMessageObject;
}

export interface SendImage extends DefaultSendMsg {
     /**
      * ID of user or group "xxxxxxxxxx@c.us" for contacts, "xxxxxxxxxx@g.us" for groups
      * @example "5521988556587@c.us"
      */
     to: string;
     /**
      * Reply for a message
      * @example { message_id: "message_id_to_reply" }
      */
     type: "image";
     context?: { message_id: string };
     image: MediaObject;
}

export interface SendAudio extends DefaultSendMsg {
     /**
      * Reply for a message
      */
     type: "audio";
     context?: ReplyMsgId;
     audio: MediaObject;
}

export interface SendDocument extends DefaultSendMsg {
     type: "document";
     /**
      * Reply for a message
      */
     context?: ReplyMsgId;
     document: MediaObject;
}
export interface SendSticker extends DefaultSendMsg {
    type: "sticker";
     /**
      * Reply for a message
      */
     context?: ReplyMsgId;
     sticker: MediaObject;
}

export interface SendVideo extends DefaultSendMsg {
    
    type: "video";
     /**
      * Reply for a message
      */
     context?: ReplyMsgId;
     video: MediaObject;
}

export interface SendContact extends DefaultSendMsg {
    type: "contacts";
     /**
      * ID of user or group "xxxxxxxxxx@c.us" for contacts, "xxxxxxxxxx@g.us" for groups
      * @example "5521988556587@c.us"
      */
     to: string;
     /**
      * Reply for a message
      */
     context?: ReplyMsgId;
     contacts: ContactObject[];
}


export interface SendLocation extends DefaultSendMsg {
    
    type: "location";
     /**
      * ID of user or group "xxxxxxxxxx@c.us" for contacts, "xxxxxxxxxx@g.us" for groups
      * @example "5521988556587@c.us"
      */
     to: string;
     /**
      * Reply for a message
      */
     context?: ReplyMsgId;
     location: LocationMessageObject;
}


export interface SendReaction extends DefaultSendMsg {
    type: "reaction";
     reaction: ReactMessageObject;
}
export interface SendPoll extends DefaultSendMsg {
    type: "poll";
    poll: PollMessageObject;
}

export interface SendInteractive extends DefaultSendMsg {
    
    type: "interactive";
     interactive: InteractiveObject;
}
interface ReplyMsgId {
    /**
     * @example "messsage_id_to_reply"
     */
    message_id: string
}