import { Whatsapp } from "@wppconnect-team/wppconnect"
import Express from "express";

export interface RequestEx extends Express.Request {
    client?: ClientWhatsApp;
    session?: string;
    token?: string;
    logger?: any;
    data?: any;
}

export interface ClientWhatsApp extends Whatsapp {
    token?: string;
    urlcode?: string;
    qrcode?: string | null;
    status?: string;
    config?: any;
}

export interface Sessions {
    client?: ClientWhatsApp;
    status?: string;
    session?: string;
    token?: string;
    qrcode?: string | null;
    urlcode?: string;
}