import { Contact } from "./Contact";
import { Message } from "./Messages";
import { StatusMessage } from "./StatusMessages";

export interface ReceivedMessage {
    object: "whatsapp_business_account";
    entry: [
        {
            id: string;
            changes: [
                {
                    value: {
                        messaging_product: "whatsapp",
                        metadata: {
                            display_phone_number: string;
                            phone_number_id: string;
                        },
                        contacts: Contact[];
                        messages: Message[];
                    }
                    field: string;
                }
            ]
        }
    ]
}

export interface ReceivedStatusUpdate {
    object: "whatsapp_business_account";
    entry: [
        {
            id: string;
            changes: [
                {
                    value: {
                        messaging_product: "whatsapp",
                        metadata: {
                            display_phone_number: string;
                            phone_number_id: string;
                        },
                        statuses: StatusMessage[];
                    }
                    field: string;
                }
            ]
        }
    ]
}


export interface ReceivedContacts {
    object: "whatsapp_business_account";
    entry: [
        {
            id: string;
            changes: [
                {
                    value: {
                        messaging_product: "whatsapp",
                        metadata: {
                            display_phone_number: string;
                            phone_number_id: string;
                        },
                        contacts: Contact[];
                        messages: Message[];
                    }
                    field: string;
                }
            ]
        }
    ]
}