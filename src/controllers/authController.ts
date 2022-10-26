import { TokenService } from "../services/token";
import {
	Controller,
	Get,
	Path,
	Route,
	Tags,
    Request,
    NoSecurity,
    Security
} from "tsoa";
import { RequestEx } from "../models/Request";
import { Error } from "../models/Error";

  
@Route("/")
export class AuthController extends Controller {
    /**
     * Generate token for acess qr-code
     */
    @Get("{PHONE_NUMBER_ID}/{SECRET_KEY}/request_code")
    @Tags("Authentication")
    @NoSecurity()
	public async generateToken(
        @Path() PHONE_NUMBER_ID: string,
        @Path() SECRET_KEY: string,
        @Request() req: RequestEx
	): Promise<{status: string; token: string | null; data: any; } | Error> {
		this.setStatus(200);
		return new TokenService().create(req, PHONE_NUMBER_ID, SECRET_KEY);
	}
    /**
     * Start the session (qrCode is send via webhook)
     */
    @Get("{PHONE_NUMBER_ID}/start")
    @Tags("Authentication")
    @Security("apiKey")
    public async startSession(
        @Path() PHONE_NUMBER_ID: string,
        @Request() req: RequestEx
    ): Promise<{sucess: boolean}> { 
        console.log(req, PHONE_NUMBER_ID); // for fix
        return {
            sucess: true
    	};
    }
    /**
     * Update QR Code
     * Use this call after use the /start 
     */
    @Get("{PHONE_NUMBER_ID}/qr_code")
    @Tags("Authentication")
    @Security("apiKey")
    public async getQrCode(
        @Path() PHONE_NUMBER_ID: string,
        @Request() req: RequestEx
    ): Promise<{qrCode: string}> {
    	console.log(req, PHONE_NUMBER_ID); // for fix
    	return {
    		qrCode: "adasd"
    	};
    }
}