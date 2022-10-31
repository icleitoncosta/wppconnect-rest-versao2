import { RequestEx } from "../models/Request";
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
    Request,
    Security,
    Response
  } from "tsoa";
import { Contact, BusinessProfileInterface, FieldsContact, MiniBusinessProfile, FieldsBusinessContact } from "../models/Contact";
import { Error } from "../models/Error";
import { ContactService } from "../services/contact";
import { ServerError } from "../services/server-error";

@Route("/")
export class ContactsController extends Controller {
  /**
   * Retrieves the details of an existing contact.
   * @param PHONE_NUMBER_ID ID of user or group "xxxxxxxxxx@c.us" for contacts, "xxxxxxxxxx@g.us" for groups
   * @fields You can specify what you want to know from your business. You have the following options: name
  */
  @Get("{PHONE_NUMBER_ID}/whatsapp_contact_profile")
  @Tags("Contacts")
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
  public async getContact(
    @Path() PHONE_NUMBER_ID: string,
    @Query() fields: FieldsContact[],
    @Request() req: RequestEx
  ): Promise<Contact | ServerError> {
    return new ContactService().get(req, PHONE_NUMBER_ID, fields);
  }

  /**
   * Within the business profile request, you can specify what you want to know from your business.
   * @param PHONE_NUMBER_ID ID of user "xxxxxxxxxx@c.us"
  */
  @Get("{PHONE_NUMBER_ID}/whatsapp_business_profile")
  @Tags("Contacts")
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
  public async getBusinessContact(
    @Path() PHONE_NUMBER_ID: string,
    @Query() fields: FieldsBusinessContact[],
    @Request() req: RequestEx
  ): Promise<{ data: MiniBusinessProfile[] } | ServerError> {
    return new ContactService().getBusiness(req, PHONE_NUMBER_ID, fields);
  }
  /**
   * To update your profile, make a POST. In your request, you can include the parameters listed below.
   * @param PHONE_NUMBER_ID ID of your user "xxxxxxxxxx@c.us"
  */
  @Post("{PHONE_NUMBER_ID}/whatsapp_business_profile")
  @Tags("Profile")
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
  @SuccessResponse("200", "Created") 
  public async updateBusinessProfile(
    @Body() payload: Partial<BusinessProfileInterface>,
    @Request() req: RequestEx
  ): Promise<void> {
    this.setStatus(200);
    new ContactService().updateBusinessProfile(req, payload);
    return;
  }
}