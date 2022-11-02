import { Contact } from "./Contact";
import { Message } from "./Messages";
import { StatusMessage } from "./StatusMessages";

export interface ReceivedAndGetMessage {
    object: "whatsapp_business_account";
    entry: EntryObject[];
}

interface EntryObject {
    id: string;
    changes: ChangesObject[]
}
interface ChangesObject {
    field: string;
    value: {
        messaging_product: "whatsapp",
        metadata: {
            display_phone_number: string;
            phone_number_id: string;
        },
        contacts?: Contact[];
        messages?: Message[];
        statuses?: StatusMessage[];
        call?: any;
        presence?: any;
        participants_change?: any;
    }
}