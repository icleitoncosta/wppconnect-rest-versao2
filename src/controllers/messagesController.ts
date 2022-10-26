import { ReturnSendedMessage, Message } from "../models/Messages";
import { MessagesService } from "../services/message";
import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Route,
    SuccessResponse,
    Tags,
    Request,
    Security
  } from "tsoa";
import { RequestEx } from "../models/Request";

@Route("/")
export class MessagesController extends Controller {
  /**
   * Retrieves the details of an existing message.
   * @param PHONE_NUMBER_ID ID of user or group "xxxxxxxxxx@c.us" for contacts, "xxxxxxxxxx@g.us" for groups
   * @MESSAGE_ID MessageID for you retrieve
  */
  @Get("{PHONE_NUMBER_ID}/messages/{MESSAGE_ID}")
  @Tags("Messages")
  @Security("apiKey")
  public async getMessage(
    @Path() MESSAGE_ID: string,
    @Request() req: RequestEx
  ): Promise<Message> {
    return new MessagesService().get(req, MESSAGE_ID);
  }
  /**
   * Use the /PHONE_NUMBER_ID/messages endpoint to send text, media, contacts, location, and interactive messages, as well as message templates to your customers.
   * @param PHONE_NUMBER_ID ID of your user "xxxxxxxxxx@c.us"
  */
  @Post("{PHONE_NUMBER_ID}/messages")
  @Tags("Messages")
  @Security("apiKey")
  @SuccessResponse("200", "Created") 
  public async sendMessage(
    @Path() PHONE_NUMBER_ID: string,
    @Body() payload: Message,
    @Request() req: RequestEx
  ): Promise<ReturnSendedMessage> {
    console.log(PHONE_NUMBER_ID);
    this.setStatus(200);
    return new MessagesService().create(req, payload);
  }
}