
export interface Media {
    messaging_product: "whatsapp";
    file: any;
    type: "document" | "audio" | "image" | "video" | "sticker";
}

export interface ReturnMedia {
    messaging_product: "whatsapp";
    url: string;
    mime_type: string;
    sha256: string | null;
    file_size: number;
    id: string;
}