import {
    Controller,
    Delete,
    FormField,
    Get,
    Path,
    Post,
    Route,
    SuccessResponse,
    Tags,
    UploadedFile,
  } from "tsoa";
import { MediaService } from "../services/media";
import { Media, ReturnMedia } from "../models/Media";

@Route("/")
export class MediasController extends Controller {
  /**
   * Retrieves the details of an existing media sended for server.
   * @MEDIA_ID Media id for you retrieve
  */
  @Get("{MEDIA_ID}")
  @Tags("Media")
  public async getMedia(
    @Path() MEDIA_ID: string
  ): Promise<ReturnMedia> {
    return new MediaService().get(MEDIA_ID);
  }
  /**
   * To upload media, make a POST call to /PHONE_NUMBER_ID/media and include the parameters listed below. All media files sent through this endpoint are encrypted and persist for 30 days, unless they are deleted earlier.
   * @param PHONE_NUMBER_ID ID of your user "xxxxxxxxxx@c.us"
  */
  @Post("{PHONE_NUMBER_ID}/media")
  @Tags("Media")
  @SuccessResponse("200", "Created") 
  public async createMedia(
    @FormField() payload: Media,
    @UploadedFile() file: Express.Multer.File
  ): Promise<{id: string}> {
    this.setStatus(200);
    return new MediaService().create(payload, file);
  }
  /**
   * To delete media, make a DELETE call to the ID of the media you want to delete.
   * @param PHONE_NUMBER_ID ID of your user "xxxxxxxxxx@c.us"
  */
  @Delete("{MEDIA_ID}")
  @Tags("Media")
  public async deleteMedia(
    @Path() MEDIA_ID: string
  ): Promise<{sucess: boolean}> {
    this.setStatus(200);
    return new MediaService().delete(MEDIA_ID);
  }
}