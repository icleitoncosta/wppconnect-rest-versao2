import { Whatsapp } from "@wppconnect-team/wppconnect"
import Express from "express";

export interface RequestEx extends Express.Request {
    client?: ClientWhatsApp;
    session?: string;
    token?: string;
    logger?: any;
}

export interface ClientWhatsApp extends Whatsapp {
    token?: string;
}