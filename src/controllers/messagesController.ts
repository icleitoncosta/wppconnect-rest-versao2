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
    Response,
    Tags,
    Request,
    Security,
    Example
  } from "tsoa";
import { RequestEx } from "../models/Request";
import { Error } from "../models/Error";
import { ServerError } from "../services/server-error";
import { SendAudio, SendContact, SendDocument, SendImage, SendInteractive, SendLocation, SendReaction, SendSticker, SendText, SendVideo } from "../models/SendMessage";

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
  @Response<Error>(400, "Incorrect request")
  public async getMessage(
    @Path() MESSAGE_ID: string,
    @Request() req: RequestEx
  ): Promise<Message | ServerError> {
    return new MessagesService().get(req, MESSAGE_ID);
  }
  /**
   * Use the /PHONE_NUMBER_ID/messages endpoint to send text, media, contacts, location, and interactive messages, as well as message templates to your customers.
   * @param PHONE_NUMBER_ID ID of your user "xxxxxxxxxx@c.us"
  */
  @Post("{PHONE_NUMBER_ID}/messages")
  @Example<SendText>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "text",
    to: "number@c.us",
    context: {
      message_id: "message_id_to_reply"
    },
    text: {
      body: "Hello, welcome to Brazil!"
    }
  })
  @Example<SendImage>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "image",
    to: "number@c.us",
    context: {
      message_id: "message_id_to_reply"
    },
    image: {
      caption: "Hello, welcome to Brazil!",
      link: "https://pbs.twimg.com/media/EJu-T-eWkAA8rcd?format=jpg&name=4096x4096"
    }
  })
  @Example<SendAudio>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "audio",
    to: "number@c.us",
    context: {
      message_id: "message_id_to_reply"
    },
    audio: {
      link: "https://file-examples.com/storage/feb1825f1e635ae95f6f16d/2017/11/file_example_MP3_700KB.mp3"
    }
  })
  @Example<SendDocument>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "document",
    to: "number@c.us",
    context: {
      message_id: "message_id_to_reply"
    },
    document: {
      link: "https://www.africau.edu/images/default/sample.pdf"
    }
  })
  @Example<SendSticker>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "sticker",
    to: "number@c.us",
    context: {
      message_id: "message_id_to_reply"
    },
    sticker: {
      link: "https://pbs.twimg.com/media/EJu-T-eWkAA8rcd?format=jpg&name=4096x4096"
    }
  })
  @Example<SendVideo>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "video",
    to: "number@c.us",
    context: {
      message_id: "message_id_to_reply"
    },
    video: {
      caption: "The earth is flat haha",
      link: "https://edisciplinas.usp.br/pluginfile.php/5196097/mod_resource/content/1/Teste.mp4"
    }
  })
  @Example<SendContact>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "contacts",
    to: "number@c.us",
    context: {
      message_id: "message_id_to_reply"
    },
    contacts: [
      {
        name: {
          formatted_name: "Rafael Barroso",
        },
        phones: [
          {
            phone: "5521988556655"
          }
        ]
      }
    ]
  })
  @Example<SendLocation>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "location",
    to: "number@c.us",
    context: {
      message_id: "message_id_to_reply"
    },
    location: {
      latitude: -15.721387,
      longitude: -48.0774438,
      name: "Brasilia - BR",
      address: "Capital dos Três Poderes - DF"
    }
  })
  @Example<SendReaction>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "reaction",
    to: "number@c.us",
    reaction: {
      message_id: "message_id_to_reaction",
      emoji: "🇧🇷"
    }
  })
  @Example<SendInteractive>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "interactive",
    to: "number@c.us",
    interactive: {
      type: "button",
      body: {
        text: "Button Text"
      },
      action: {
        buttons: [
          {
            "type": "reply",
            "reply": {
                "id": "1",
                "title": "Button 1"
            }
          },
          {
              "type": "reply",
              "reply": {
                  "id": "unique id 2",
                  "title": "Button 2"
              }
          }
        ]
      }
    }
  })
  @Example<SendInteractive>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "interactive",
    to: "number@c.us",
    interactive: {
      type: "list",
      "header": {
        type: "text",
        text: "<HEADER_TEXT>"
      },
      body: {
          text: "<BODY_TEXT>"
      },
      footer: {
          text: "<FOOTER_TEXT>"
      },
      action: {
        button: "<BUTTON_TEXT>",
        sections: [
            {
                title: "<LIST_SECTION_1_TITLE>",
                rows: [
                    {
                        "id": "<LIST_SECTION_1_ROW_1_ID>",
                        "title": "<SECTION_1_ROW_1_TITLE>",
                        "description": "<SECTION_1_ROW_1_DESC>"
                    },
                    {
                        "id": "<LIST_SECTION_1_ROW_2_ID>",
                        "title": "<SECTION_1_ROW_2_TITLE>",
                        "description": "<SECTION_1_ROW_2_DESC>"
                    }
                ]
            },
            {
                title: "<LIST_SECTION_2_TITLE>",
                rows: [
                    {
                        "id": "<LIST_SECTION_2_ROW_1_ID>",
                        "title": "<SECTION_2_ROW_1_TITLE>",
                        "description": "<SECTION_2_ROW_1_DESC>"
                    },
                    {
                        "id": "<LIST_SECTION_2_ROW_2_ID>",
                        "title": "<SECTION_2_ROW_2_TITLE>",
                        "description": "<SECTION_2_ROW_2_DESC>"
                    }
                ]
            }
        ]
      }
    }
  })
  @Tags("Messages")
  @Security("apiKey")
  @Response<Error>(400, "Incorrect request")
  @SuccessResponse("200", "Created") 
  public async sendMessage(
    @Path() PHONE_NUMBER_ID: string,
    @Body() payload: SendText | SendImage | SendAudio | SendDocument | SendSticker | SendVideo | SendContact | SendLocation | SendReaction | SendInteractive,
    @Request() req: RequestEx
  ): Promise<ReturnSendedMessage | Error> {
    console.log(PHONE_NUMBER_ID);
    this.setStatus(200);
    return new MessagesService().create(req, payload);
  }
}