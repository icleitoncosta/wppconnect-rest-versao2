import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
  } from "tsoa";
import { Contact, ContactCreationParams } from "../models/Contact";
import { ContactService } from "../services/contact";

@Route("whatsapp_contact_profile")
export class ContactsController extends Controller {
  /**
   * Retrieves the details of an existing contact.
   * Supply the unique user ID from either and receive corresponding user details.
  */
  @Get("{PHONE_NUMBER_ID}")
  public async getUser(
    @Path() PHONE_NUMBER_ID: string,
    @Query() fields: string
  ): Promise<Contact> {
    return new ContactService().get(PHONE_NUMBER_ID, fields);
  }

  @SuccessResponse("201", "Created") 
  @Post()
  public async createUser(
    @Body() requestBody: ContactCreationParams
  ): Promise<void> {
    this.setStatus(201);
    new ContactService().create(requestBody);
    return;
  }
}