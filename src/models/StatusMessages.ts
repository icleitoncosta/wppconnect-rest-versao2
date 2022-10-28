export interface StatusMessage {
    id: string;
    recipient_id: string;
    status: "read" | "delivered" | "sent" | "failed" | "deleted";
    timestamp: number;
    type?: "message";
    pricing?: "free";
    errors?: any;
}