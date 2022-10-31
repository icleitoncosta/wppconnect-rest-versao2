import { GroupsService } from "../services/groups";
import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Route,
    SuccessResponse,
    Response,
    Tags,
    Request,
    Security,
    Example,
    Put,
    Query
  } from "tsoa";
import { RequestEx } from "../models/Request";
import { Error } from "../models/Error";
import { AddParticipantGroup, CreateGroup, DeleteParticipantGroup, DemoteParticipantGroup, EditGroup, PromoteParticipantGroup, RemoveLinkGroup, ReturnGroup } from "../models/Groups";

@Route("/")
export class GroupsController extends Controller {
  /**
   * Retrieves details of groups
   * It's exactly the same way you get it via Webhooks.
   * @param PHONE_NUMBER_ID your phone number
   * @GROUP_ID ID of group  "xxxxxxxxxx@g.us" 
  */
  @Get("{PHONE_NUMBER_ID}/groups/{GROUP_ID}")
  @Tags("Groups")
  @Security("apiKey")
  @Response<Error>(400, "Incorrect request")
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
  public async getGroup(
    @Path() GROUP_ID: string,
    @Request() req: RequestEx
  ): Promise<ReturnGroup | Error> {
    return new GroupsService().get(req, GROUP_ID);
  }
  /**
   * Use the /PHONE_NUMBER_ID/groups endpoint to edit groups and functions
   * @param PHONE_NUMBER_ID ID of your user "xxxxxxxxxx@c.us"
  */
  @Post("{PHONE_NUMBER_ID}/groups")
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
  @Tags("Groups")
  @Security("apiKey")
  @Response<Error>(400, "Incorrect request")
  @Example<ReturnGroup>({
    messaging_product: "whatsapp",
    group: {
        id: "56898982356@g.us",
        name: "Name of your group",
        description: "Description of group",
        pic: "http://imgpicofgroup.com.br",
        participants: ['556589785332@c.us'],
        admins: ['556589785332@c.us'],
        invite: "http://wid.com/8898999a6sa6",
    }
}, "1 - Response Success")
  @Example<CreateGroup>({
    messaging_product: 'whatsapp',
    type: "create_group",
    create:{
        name: "Name for your group",
        description: "Description for your Group",
        members: ['55219855232878@c.us', '5521967855658@c.us']
    }
  }, "2 - Payload: Create group")
  @Example<EditGroup>({
    messaging_product: 'whatsapp',
    type: "edit_group",
    edit: {
        id: "5689785264498989@g.us",
        name: "New name for my group",
        description: "New description to my group\nWith new line",
    }
  }, "3 - Payload: Edit data of group")
  @Example<AddParticipantGroup>({
    messaging_product: 'whatsapp',
    type: "add_participant",
    add_participant: {
        id: "585668889887897@g.us",
        phones: ['5521985232927@c.us']
    }
  }, "4 - Payload: Add participants")
  @Example<DeleteParticipantGroup>({
    messaging_product: 'whatsapp',
    type: "remove_participant",
    remove_participant: {
        id: "585668889887897@g.us",
        phones: ['5521985232927@c.us']
    }
  }, "5 - Payload: Delete participants")
  @Example<DemoteParticipantGroup>({
    messaging_product: 'whatsapp',
    type: "demote_participant",
    demote: {
        id: "585668889887897@g.us",
        phone: '5521985232927@c.us'
    }
  }, "6 - Payload: Demote participants (remove admin)")
  @Example<PromoteParticipantGroup>({
    messaging_product: 'whatsapp',
    type: "promote_participant",
    promote: {
        id: "585668889887897@g.us",
        phone: '5521985232927@c.us'
    }
  }, "7 - Payload: Promove participants (promove admin)")
  @Example<RemoveLinkGroup>({
    messaging_product: 'whatsapp',
    type: "revoke_link",
    revoke: {
        id: "585668889887897@g.us",
    }
  }, "8 - Payload: Revoke Link Group")
  @SuccessResponse("200", "Success") 
  public async manageGroups(
    @Body() payload: CreateGroup | EditGroup | AddParticipantGroup | DeleteParticipantGroup | DemoteParticipantGroup | PromoteParticipantGroup | RemoveLinkGroup,
    @Request() req: RequestEx
  ): Promise<ReturnGroup | Error> {
    this.setStatus(200);
    return new GroupsService().manageGroup(req, payload);
  }
  /**
   * This is NOT similar to Official API
   * Use this route to leave and join to group
   * 
   * @param GROUP_ID ID of your group "xxxxxxxxxx@g.us"
   */
  @Put("{PHONE_NUMBER_ID}/groups/{GROUP_ID}")
  @Tags("Groups")
  @Security("apiKey")
  @SuccessResponse("200", "Created") 
  @Response<Error>(400, "Incorrect request")
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
  public async manageMyGroup(
    @Path("GROUP_ID") groupId: string,
    @Query() type: "leave" | "join",
    @Request() req: RequestEx,
    @Query() link?: string,
  ): Promise<{ sucess: true } | Error> {
    return new GroupsService().manageMyGroup(req, type, groupId, link);
  }
}