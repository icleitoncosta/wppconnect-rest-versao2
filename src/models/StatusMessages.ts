export interface StatusMessage {
    messaging_product: "whatsapp";
    /**
     * Availables: "read" | "played" | "delivered" | "sent" | "failed" | "deleted"
     * @example "read"
     */
    status: "read" | "played" | "delivered" | "sent" | "failed" | "deleted";
    /**
     * @example "false_5689889598@8965656_g.us"
     */
    message_id: string;
}
export interface FullStatusMessage extends StatusMessage { 
    id: string;
    type?: "message";
    pricing?: "free";
    errors?: any;
    recipient_id?: string;
    timestamp?: number;
}
export interface DeleteMessage {
    messaging_product: "whatsapp";
    status: "deleted";
    /**
     * @example "false_5689889598@8965656_g.us"
     */
    message_id: string;
}