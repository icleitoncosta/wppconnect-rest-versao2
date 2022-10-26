import { Whatsapp } from "@wppconnect-team/wppconnect"
import Express from "express";

export interface RequestEx extends Express.Request {
    client: Whatsapp;
    session?: string;
    token?: string;
    
    logger: any;
}