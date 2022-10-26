import { TokenService } from "../services/token";
import {
	Controller,
	Get,
	Path,
	Route,
	Tags,
} from "tsoa";

  
@Route("/")
export class AuthController extends Controller {
    /**
     * Generate token for acess qr-code
     */
    @Get("{PHONE_NUMBER_ID}/{SECRET_KEY}/request_code")
    @Tags("Authentication")
	public async generateToken(
        @Path() PHONE_NUMBER_ID: string,
        @Path() SECRET_KEY: string,
	): Promise<{status: string; token: string | null; data: any; }> {
		this.setStatus(200);
		return new TokenService().create(PHONE_NUMBER_ID, SECRET_KEY);
	}
    /**
     * Start the session (qrCode is send via webhook)
     */
    @Get("{PHONE_NUMBER_ID}/start")
    @Tags("Authentication")
    public async startSession(
        @Path() PHONE_NUMBER_ID: string,
    ): Promise<{sucess: boolean}> { 
        console.log(PHONE_NUMBER_ID); // for fix
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
    public async getQrCode(
        @Path() PHONE_NUMBER_ID: string,
    ): Promise<{qrCode: string}> {
    	console.log(PHONE_NUMBER_ID); // for fix
    	return {
    		qrCode: "adasd"
    	};
    }
}