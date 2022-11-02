import {
    Controller,
    Delete,
    Get,
    Path,
    Post,
    Route,
    SuccessResponse,
    Tags,
    UploadedFile,
    Request,
    Security,
    Response
  } from "tsoa";
import { MediaService } from "../services/media";
import { ReturnMedia } from "../models/Media";
import { RequestEx } from "../models/Request";
import { Error } from "../models/Error";
import { ServerError } from "../services/server-error";

@Route("/")
export class MediasController extends Controller {
  /**
   * Retrieves the details of an existing media sended for server.
   * @MEDIA_ID Media id for you retrieve
  */
  @Get("{MEDIA_ID}")
  @Tags("Media")
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
  public async getMedia(
    @Path() MEDIA_ID: string,
    @Request() req: RequestEx
  ): Promise<ReturnMedia | ServerError> {
    return new MediaService().get(req, MEDIA_ID);
  }
  /**
   * To upload media, make a POST call to /PHONE_NUMBER_ID/media and include the parameters listed below. All media files sent through this endpoint are encrypted and persist for 30 days, unless they are deleted earlier.
   * @param PHONE_NUMBER_ID ID of your user "xxxxxxxxxx@c.us"
  */
  @Post("{PHONE_NUMBER_ID}/media")
  @Tags("Media")
  @Security("apiKey")
  @SuccessResponse("200", "Created") 
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
  public async createMedia(
    @UploadedFile() file: Express.Multer.File
  ): Promise<{ id: string } | ServerError> {
    this.setStatus(200);
    return new MediaService().create(file);
  }
  /**
   * To delete media, make a DELETE call to the ID of the media you want to delete.
   * @param PHONE_NUMBER_ID ID of your user "xxxxxxxxxx@c.us"
  */
  @Delete("{MEDIA_ID}")
  @Tags("Media")
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
  public async deleteMedia(
    @Path() MEDIA_ID: string,
    @Request() req: RequestEx
  ): Promise<{ sucess: boolean } | ServerError> {
    this.setStatus(200);
    return new MediaService().delete(req, MEDIA_ID);
  }
}