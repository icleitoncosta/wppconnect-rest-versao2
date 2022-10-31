import { TokenService } from "../services/token";
import {
	Controller,
	Get,
	Path,
	Route,
	Tags,
  Request,
  NoSecurity,
  Security,
  Response,
  Post,
  Hidden,
  Query,
} from "tsoa";
import { RequestEx } from "../models/Request";
import { Error } from "../models/Error";
import { SessionService } from "../services/session";
import { ServerError } from "../services/server-error";

  
@Route("/")
export class AuthController extends Controller {
    /**
     * Generate token for acess qr-code
     * @param msg Insert message for send on call
     */
    @Get("{PHONE_NUMBER_ID}/{SECRET_KEY}/request_code")
    @Tags("Auth")
    @NoSecurity()
	public async generateToken(
        @Path() PHONE_NUMBER_ID: string,
        @Path("SECRET_KEY") SECRET_KEY: "THISISMYSECURETOKEN",
        @Request() req: RequestEx,
        @Query("reject_all_calls") refuseCall?: boolean,
        @Query("msg") msgRefuseCall?: string,
	): Promise<{status: string; token: string | null; data: any; } | Error> {
		this.setStatus(200);
		return new TokenService().create(req, PHONE_NUMBER_ID, SECRET_KEY, refuseCall, msgRefuseCall);
	}
    /**
     * Start the session (qrCode is send via webhook)
     */
    @Post("{PHONE_NUMBER_ID}/start")
    @Tags("Auth")
    @Security("apiKey")
    @Response<Error>(401, "Unauthorized", {
      error: {
        fbtrace_id: undefined,
        message: "Token in not present",
        type: "invalid_request",
        code: 3,
        error_data: {
          "messaging_product": "whatsapp",
          "details": "Token is not present. Check your header and try again"
        },
        "error_subcode": 132000
      }
    }
  )
    public async startSession(
        @Path() PHONE_NUMBER_ID: string,
        @Request() req: RequestEx
    ): Promise<{
        status: string,
        qrcode: string | null,
        urlcode: string | null,
        version: string
    }> { 
        return new SessionService(PHONE_NUMBER_ID).create(req);
    }
    /**
     * Update QR Code
     * Use this call after use the /start 
     */
    @Get("{PHONE_NUMBER_ID}/qr_code")
    @Tags("Auth")
    @Security("apiKey")
    @Response<Error>(401, "Unauthorized", {
      error: {
        fbtrace_id: undefined,
        message: "Token in not present",
        type: "invalid_request",
        code: 3,
        error_data: {
          "messaging_product": "whatsapp",
          "details": "Token is not present. Check your header and try again"
        },
        "error_subcode": 132000
      }
    }
  )
    public async getQrCode(
        @Path() PHONE_NUMBER_ID: string,
        @Request() req: RequestEx
    ): Promise<{
      status: string,
      qrcode: string,
      urlcode: string,
      version: string,
    }> {
    	return new SessionService(PHONE_NUMBER_ID).getSessionState(req);
    }
    /**
     * Start All Sessions
     * This route is exclusive to start all servers by service
    */
    @Post("{SECRET_KEY}/start-all")
    @Tags("Auth")
    @NoSecurity()
    @Hidden()
	public async startAllSessions(
        @Path("SECRET_KEY") SECRET_KEY: "THISISMYSECURETOKEN",
        @Request() req: RequestEx
	): Promise<{ success: true } | ServerError> {
		this.setStatus(200);
		return new SessionService("").startAll(req, SECRET_KEY);
	}
}