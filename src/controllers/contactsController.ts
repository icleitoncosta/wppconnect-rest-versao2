import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
    Tags,
  } from "tsoa";
import { Contact, BusinessProfileInterface, FieldsBusinessContact, FieldsContact } from "../models/Contact";
import { ContactService } from "../services/contact";

@Route("/")
export class ContactsController extends Controller {
  /**
   * Retrieves the details of an existing contact.
   * @param PHONE_NUMBER_ID ID of user or group "xxxxxxxxxx@c.us" for contacts, "xxxxxxxxxx@g.us" for groups
   * @fields You can specify what you want to know from your business. You have the following options: name
  */
  @Get("{PHONE_NUMBER_ID}/whatsapp_contact_profile")
  @Tags("Contacts")
  public async getContact(
    @Path() PHONE_NUMBER_ID: string,
    @Query() fields: FieldsContact[]
  ): Promise<Contact> {
    return new ContactService().get(PHONE_NUMBER_ID, fields);
  }

  /**
   * Within the business profile request, you can specify what you want to know from your business.
   * @param PHONE_NUMBER_ID ID of user "xxxxxxxxxx@c.us"
  */
  @Get("{PHONE_NUMBER_ID}/whatsapp_business_profile")
  @Tags("Contacts")
  public async getBusinessContact(
    @Path() PHONE_NUMBER_ID: string,
    @Query() fields: FieldsBusinessContact[]
  ): Promise<{ data: BusinessProfileInterface[]} > {
    return new ContactService().getBusiness(PHONE_NUMBER_ID, fields);
  }
  /**
   * To update your profile, make a POST. In your request, you can include the parameters listed below.
   * @param PHONE_NUMBER_ID ID of your user "xxxxxxxxxx@c.us"
  */
  @Post("{PHONE_NUMBER_ID}/whatsapp_business_profile")
  @Tags("Profile")
  @SuccessResponse("200", "Created") 
  public async updateBusinessProfile(
    @Path() PHONE_NUMBER_ID: string,
    @Body() payload: Partial<BusinessProfileInterface>
  ): Promise<void> {
    console.log(PHONE_NUMBER_ID);
    this.setStatus(200);
    new ContactService().updateBusinessProfile(payload);
    return;
  }
}