import { Whatsapp } from "@wppconnect-team/wppconnect"
import Express from "express";

export interface RequestEx extends Express.Request {
    client?: Partial<ClientWhatsApp>;
    session?: string;
    token?: string;
    logger?: any;
    status?: string;
}

export interface ClientWhatsApp extends Whatsapp {
    token?: string;
    urlcode?: string;
    qrcode?: string | null;
    status?: string;
    config?: any;
    /**
     * @example false
     */
    refuseCall?: boolean,
    /**
     * Please, call, afternoon
     */
    msgRefuseCall?: string;
}

export interface Sessions {
    client?: Partial<ClientWhatsApp>;
    status?: string;
    session?: string;
    token?: string;
    qrcode?: string | null;
    urlcode?: string;
}