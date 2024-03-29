import { ReturnSendedMessage } from "../models/Messages";
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
    Example,
    Put,
    Delete
  } from "tsoa";
import { RequestEx } from "../models/Request";
import { Error } from "../models/Error";
import { ServerError } from "../services/server-error";
import { SendAudio, SendContact, SendDocument, SendImage, SendInteractive, SendLocation, SendPoll, SendReaction, SendSticker, SendText, SendVideo } from "../models/SendMessage";
import { ReceivedAndGetMessage } from "../models/Webhook";
import { DeleteMessage, StatusMessage } from "../models/StatusMessages";

@Route("/")
export class MessagesController extends Controller {
  /**
   * Retrieves the details of an existing message.
   * It's exactly the same way you get it via Webhooks.
   * @param PHONE_NUMBER_ID ID of user or group "xxxxxxxxxx@c.us" for contacts, "xxxxxxxxxx@g.us" for groups
   * @MESSAGE_ID MessageID for you retrieve
  */
  @Get("{PHONE_NUMBER_ID}/messages/{MESSAGE_ID}")
  @Tags("Messages")
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
  @Example<ReceivedAndGetMessage>({
    object: "whatsapp_business_account",
    entry: [
        {
            id: "your_session_name",
            changes: [
                {
                    value: {
                        messaging_product: "whatsapp",
                        metadata: {
                            display_phone_number: "display phone or name of contact",
                            phone_number_id: "phone number of client",
                        },
                        contacts: [
                          {
                            wa_id: "556589988988c.us",
                            profile: {
                              name: "Rafael Barroso",
                            }
                          },
                        ],
                        messages: [
                          {
                            messaging_product: "whatsapp",
                            id: "false_as5685989898989_56898989@c.us",
                            type: "text",
                            to: "5521988892356@c.us",
                            from: "552198523878@c.us",
                            timestamp: 56565665678,
                            recipient_type: "individual",
                            text: {
                              body: "You receive a text message from Brazil!"
                            }
                          }
                        ]
                    },
                    field: "messages",
                }
            ]
        }
    ]
  }, "Return of Get Text Message")
  @Example<ReceivedAndGetMessage>({
    object: "whatsapp_business_account",
    entry: [
        {
            id: "your_session_name",
            changes: [
                {
                    value: {
                        messaging_product: "whatsapp",
                        metadata: {
                            display_phone_number: "display phone or name of contact",
                            phone_number_id: "phone number of client",
                        },
                        contacts: [
                          {
                            wa_id: "556589988988c.us",
                            profile: {
                              name: "Rafael Barroso",
                            }
                          },
                        ],
                        messages: [
                          {
                            messaging_product: "whatsapp",
                            id: "false_as5685989898989_56898989@c.us",
                            type: "image",
                            to: "5521988892356@c.us",
                            from: "552198523878@c.us",
                            timestamp: 56565665678,
                            recipient_type: "individual",
                            image: {
                              id: "false_as5685989898989_56898989@c.us",
                              mime_type: "image/jpg",
                              sha256: "a63ab36162a4f4ee6622ccd787b0a048c26b93acfc05c6b1843659b253c3c00b",
                              link: "http://localhost:21465/false_as5685989898989_56898989@c.us",
                              caption: "Look this image from Brazil",
                            }
                          }
                        ]
                    },
                    field: "messages",
                }
            ]
        }
    ]
  }, "Return of Get Image Message")
  @Example<ReceivedAndGetMessage>({
    object: "whatsapp_business_account",
    entry: [
        {
            id: "your_session_name",
            changes: [
                {
                    value: {
                        messaging_product: "whatsapp",
                        metadata: {
                            display_phone_number: "display phone or name of contact",
                            phone_number_id: "phone number of client",
                        },
                        contacts: [
                          {
                            wa_id: "556589988988c.us",
                            profile: {
                              name: "Rafael Barroso",
                            }
                          },
                        ],
                        messages: [
                          {
                            messaging_product: "whatsapp",
                            id: "false_as5685989898989_56898989@c.us",
                            type: "image",
                            to: "5521988892356@c.us",
                            from: "552198523878@c.us",
                            timestamp: 56565665678,
                            recipient_type: "individual",
                            video: {
                              id: "false_as5685989898989_56898989@c.us",
                              mime_type: "video/mp4",
                              sha256: "a63ab36162a4f4ee6622ccd787b0a048c26b93acfc05c6b1843659b253c3c00b",
                              link: "http://localhost:21465/false_as5685989898989_56898989@c.us",
                              caption: "Look this video from Brazil",
                            }
                          }
                        ]
                    },
                    field: "messages",
                }
            ]
        }
    ]
  }, "Return of Get Video Message")
  @Example<ReceivedAndGetMessage>({
    object: "whatsapp_business_account",
    entry: [
        {
            id: "your_session_name",
            changes: [
                {
                    value: {
                        messaging_product: "whatsapp",
                        metadata: {
                            display_phone_number: "display phone or name of contact",
                            phone_number_id: "phone number of client",
                        },
                        contacts: [
                          {
                            wa_id: "556589988988c.us",
                            profile: {
                              name: "Rafael Barroso",
                            }
                          },
                        ],
                        messages: [
                          {
                            messaging_product: "whatsapp",
                            id: "false_as5685989898989_56898989@c.us",
                            type: "image",
                            to: "5521988892356@c.us",
                            from: "552198523878@c.us",
                            timestamp: 56565665678,
                            recipient_type: "individual",
                            audio: {
                              id: "false_as5685989898989_56898989@c.us",
                              mime_type: "video/mp4",
                              sha256: "a63ab36162a4f4ee6622ccd787b0a048c26b93acfc05c6b1843659b253c3c00b",
                              link: "http://localhost:21465/false_as5685989898989_56898989@c.us",
                              caption: "Look this audio from Brazil",
                            }
                          }
                        ]
                    },
                    field: "messages",
                }
            ]
        }
    ]
  }, "Return of Get Audio Message")
  @Example<ReceivedAndGetMessage>({
    object: "whatsapp_business_account",
    entry: [
        {
            id: "your_session_name",
            changes: [
                {
                    value: {
                        messaging_product: "whatsapp",
                        metadata: {
                            display_phone_number: "display phone or name of contact",
                            phone_number_id: "phone number of client",
                        },
                        contacts: [
                          {
                            wa_id: "556589988988c.us",
                            profile: {
                              name: "Rafael Barroso",
                            }
                          },
                        ],
                        messages: [
                          {
                            messaging_product: "whatsapp",
                            id: "false_as5685989898989_56898989@c.us",
                            type: "image",
                            to: "5521988892356@c.us",
                            from: "552198523878@c.us",
                            timestamp: 56565665678,
                            recipient_type: "group",
                            sticker: {
                              id: "false_as5685989898989_56898989@c.us",
                              mime_type: "video/mp4",
                              sha256: "a63ab36162a4f4ee6622ccd787b0a048c26b93acfc05c6b1843659b253c3c00b",
                              link: "http://localhost:21465/false_as5685989898989_56898989@c.us",
                              caption: "Look this audio from Brazil",
                            }
                          }
                        ]
                    },
                    field: "messages",
                }
            ]
        }
    ]
  }, "Return of Get Sticker Message")
  @Example<ReceivedAndGetMessage>({
    object: "whatsapp_business_account",
    entry: [
        {
            id: "your_session_name",
            changes: [
                {
                    value: {
                        messaging_product: "whatsapp",
                        metadata: {
                            display_phone_number: "display phone or name of contact",
                            phone_number_id: "phone number of client",
                        },
                        contacts: [
                          {
                            wa_id: "556589988988c.us",
                            profile: {
                              name: "Rafael Barroso",
                            }
                          },
                        ],
                        messages: [
                          {
                            messaging_product: "whatsapp",
                            id: "false_as5685989898989_56898989@c.us",
                            type: "image",
                            to: "5521988892356@c.us",
                            from: "552198523878@c.us",
                            timestamp: 56565665678,
                            recipient_type: "group",
                            location: {
                              latitude: "-56564889",
                              longitude: "8989846",
                              name: "Brasília - DF",
                              address: "Welcome To Brazil!",
                            }
                          }
                        ]
                    },
                    field: "messages",
                }
            ]
        }
    ]
  }, "Return of Get Location Message")
  public async getMessage(
    @Path() MESSAGE_ID: string,
    @Request() req: RequestEx
  ): Promise<ReceivedAndGetMessage | ServerError> {
    return new MessagesService().get(req, MESSAGE_ID);
  }
  /**
   * Use the /PHONE_NUMBER_ID/messages endpoint to send text, media, contacts, location, and interactive messages, as well as message templates to your customers.
   * @param PHONE_NUMBER_ID ID of your user "xxxxxxxxxx@c.us"
  */
  @Post("{PHONE_NUMBER_ID}/messages")
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
  @Example<SendText>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "text",
    to: "number@c.us",
    text: {
      body: "Hello, welcome to Brazil!"
    }
  }, "Send Text")
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
  }, "Send Text with reply")
  @Example<SendImage>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "image",
    to: "number@c.us",
    image: {
      caption: "Hello, welcome to Brazil!",
      link: "https://pbs.twimg.com/media/EJu-T-eWkAA8rcd?format=jpg&name=4096x4096"
    }
  }, "Send Image (Link)")
  @Example<SendImage>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "image",
    to: "number@c.us",
    image: {
      caption: "Hello, welcome to Brazil!",
      link: "data:image/webp;base64,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"
    }
  }, "Send Image (Base64) - Not similar to Official API")
  @Example<SendImage>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "image",
    to: "number@c.us",
    image: {
      caption: "Hello, welcome to Brazil!",
      id: "media_id_exexemple: 5a6598asd35a868a89 -- Please upload this media before",
    }
  }, "Send Image (Media)")
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
  }, "Send Image with reply")
  @Example<SendAudio>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "audio",
    to: "number@c.us",
    audio: {
      link: "https://file-examples.com/storage/feb1825f1e635ae95f6f16d/2017/11/file_example_MP3_700KB.mp3"
    }
  }, "Send Voice (Link)")
  @Example<SendAudio>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "audio",
    to: "number@c.us",
    audio: {
      id: "media_id_exexemple: 5a6598asd35a868a89 -- Please upload this media before",
    }
  }, "Send Voice (Media)")
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
  }, "Send Voice with reply")
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
  }, "Send Document (Link)")
  @Example<SendDocument>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "document",
    to: "number@c.us",
    context: {
      message_id: "message_id_to_reply"
    },
    document: {
      id: "media_id_exexemple: 5a6598asd35a868a89 -- Please upload this media before",
    }
  }, "Send Document (Media)")
  @Example<SendSticker>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "sticker",
    to: "number@c.us",
    sticker: {
      link: "https://pbs.twimg.com/media/EJu-T-eWkAA8rcd?format=jpg&name=4096x4096"
    }
  }, "Send Sticker (Link)")
  @Example<SendSticker>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "sticker",
    to: "number@c.us",
    sticker: {
      id: "media_id_exexemple: 5a6598asd35a868a89 -- Please upload this media before",
    }
  }, "Send Sticker (Media)")
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
  }, "Send Sticker with reply")
  @Example<SendVideo>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "video",
    to: "number@c.us",
    video: {
      caption: "The earth is flat haha",
      link: "https://edisciplinas.usp.br/pluginfile.php/5196097/mod_resource/content/1/Teste.mp4"
    }
  }, "Send Video (Link)")
  @Example<SendVideo>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "video",
    to: "number@c.us",
    video: {
      caption: "The earth is flat haha",
      id: "media_id_example: 5a6598asd35a868a89 -- Please upload this media before",
    }
  }, "Send Video (Media)")
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
  }, "Send Video with reply")
  @Example<SendContact>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "contacts",
    to: "number@c.us",
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
  }, "Send Contact")
  @Example<SendLocation>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "location",
    to: "number@c.us",
    location: {
      latitude: "-15.721387",
      longitude: "-48.0774438",
      name: "Brasilia - BR",
      address: "Capital dos Três Poderes - DF"
    }
  }, "Send Location")
  @Example<SendReaction>({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "reaction",
    to: "number@c.us",
    reaction: {
      message_id: "message_id_to_reaction",
      emoji: "🇧🇷"
    }
  }, "Send Reaction")
  @Example<SendPoll>({
    messaging_product: "whatsapp",
    recipient_type: "group",
    type: "poll",
    to: "number@c.us",
    poll: {
      title: "What is the best city for the beach?",
      options: ['Arraial do Cabo', 'Porto de Galinhas', 'Ilha Grande'],
      selectableCount: 1
    }
  }, "Send Poll - Not similar to Official API")
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
  }, "Send Buttons - WhatsApp error")
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
  }, "Send List Buttons - WhatsApp error")
  @Tags("Messages")
  @Security("apiKey")
  @Response<Error>(400, "Incorrect request")
  @SuccessResponse("200", "Created") 
  public async sendMessage(
    @Body() payload: SendText | SendImage | SendAudio | SendDocument | SendSticker | SendVideo | SendContact | SendLocation | SendReaction | SendInteractive,
    @Request() req: RequestEx
  ): Promise<ReturnSendedMessage | Error> {
    this.setStatus(200);
    return new MessagesService().create(req, payload);
  }
  /**
   * When you receive an incoming message from Webhooks, you could use messages endpoint to change the status of it to read.
   * We recommend marking incoming messages as read within 30 days of receipt.
   * Note: you cannot mark outgoing messages you sent as read.
   * 
   * You need to obtain the message_id of the incoming message from Webhooks.
   * @param PHONE_NUMBER_ID ID of your user "xxxxxxxxxx@c.us"
   */
  @Put("{PHONE_NUMBER_ID}/messages")
  @Tags("Messages")
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
  public async markStatusMessage(
    @Body() payload: StatusMessage,
    @Request() req: RequestEx
  ): Promise<{ sucess: boolean } | ServerError> {
    return new MessagesService().markStatusMessage(req, payload);
  }
  /**
   * This is NOT similar to Official API
   * Use this route to delete message
   * 
   * @param PHONE_NUMBER_ID ID of your user "xxxxxxxxxx@c.us"
   */
  @Delete("{PHONE_NUMBER_ID}/messages")
  @Tags("Messages")
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
  public async deleteMessage(
    @Body() payload: DeleteMessage,
    @Request() req: RequestEx
  ): Promise<{ sucess: boolean } | ServerError> {
    return new MessagesService().markStatusMessage(req, payload);
  }
}