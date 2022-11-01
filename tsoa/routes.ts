/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ContactsController } from './../src/controllers/contactsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GroupsController } from './../src/controllers/groupsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MediasController } from './../src/controllers/mediasController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MessagesController } from './../src/controllers/messagesController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../src/controllers/authController';
import { expressAuthentication } from './../src/authentication';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import type { RequestHandler } from 'express';
import * as express from 'express';
const multer = require('multer');
const upload = multer();

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "ProfileInterface": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ContactWPP": {
        "dataType": "refObject",
        "properties": {
            "profile_picture_url": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"undefined"}],"required":true},
            "formattedName": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"undefined"}],"required":true},
            "isBusiness": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"undefined"}],"required":true},
            "isEnterprise": {"dataType":"union","subSchemas":[{"dataType":"boolean"},{"dataType":"undefined"}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Contact": {
        "dataType": "refObject",
        "properties": {
            "wa_id": {"dataType":"string","required":true},
            "profile": {"ref":"ProfileInterface","required":true},
            "wpp_data": {"dataType":"union","subSchemas":[{"ref":"ContactWPP"},{"dataType":"undefined"}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServerError": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "stack": {"dataType":"string"},
            "type": {"dataType":"any","required":true},
            "code": {"dataType":"double","default":3},
            "details": {"dataType":"any","required":true},
            "subcode": {"dataType":"double","default":0},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Error": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "stack": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FieldsContact": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["name"]},{"dataType":"enum","enums":["wpp_data"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BusinessProfileInterface": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "name": {"dataType":"string"},
            "about": {"dataType":"string"},
            "address": {"dataType":"string"},
            "description": {"dataType":"string"},
            "email": {"dataType":"string"},
            "profile_picture_url": {"dataType":"string"},
            "websites": {"dataType":"array","array":{"dataType":"string"}},
            "vertical": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MiniBusinessProfile": {
        "dataType": "refObject",
        "properties": {
            "business_profile": {"ref":"BusinessProfileInterface","required":true},
            "wpp_data": {"dataType":"union","subSchemas":[{"ref":"ContactWPP"},{"dataType":"undefined"}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FieldsBusinessContact": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["name"]},{"dataType":"enum","enums":["about"]},{"dataType":"enum","enums":["address"]},{"dataType":"enum","enums":["description"]},{"dataType":"enum","enums":["email"]},{"dataType":"enum","enums":["profile_picture_url"]},{"dataType":"enum","enums":["websites"]},{"dataType":"enum","enums":["vertical"]},{"dataType":"enum","enums":["wpp_data"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_BusinessProfileInterface_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"messaging_product":{"dataType":"enum","enums":["whatsapp"]},"name":{"dataType":"string"},"about":{"dataType":"string"},"address":{"dataType":"string"},"description":{"dataType":"string"},"email":{"dataType":"string"},"profile_picture_url":{"dataType":"string"},"websites":{"dataType":"array","array":{"dataType":"string"}},"vertical":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Group": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "pic": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"undefined"}]},
            "participants": {"dataType":"any"},
            "admins": {"dataType":"any","required":true},
            "invite": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReturnGroup": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "group": {"ref":"Group","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateGroup": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "type": {"dataType":"enum","enums":["create_group"],"required":true},
            "create": {"dataType":"nestedObjectLiteral","nestedProperties":{"members":{"dataType":"array","array":{"dataType":"string"},"required":true},"description":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EditGroup": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "type": {"dataType":"enum","enums":["edit_group"],"required":true},
            "edit": {"dataType":"nestedObjectLiteral","nestedProperties":{"pic":{"dataType":"string"},"description":{"dataType":"string"},"name":{"dataType":"string"},"id":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddParticipantGroup": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "type": {"dataType":"enum","enums":["add_participant"],"required":true},
            "add_participant": {"dataType":"nestedObjectLiteral","nestedProperties":{"phones":{"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"string"}},{"dataType":"string"}],"required":true},"id":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeleteParticipantGroup": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "type": {"dataType":"enum","enums":["remove_participant"],"required":true},
            "remove_participant": {"dataType":"nestedObjectLiteral","nestedProperties":{"phones":{"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"string"}},{"dataType":"string"}],"required":true},"id":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DemoteParticipantGroup": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "type": {"dataType":"enum","enums":["demote_participant"],"required":true},
            "demote": {"dataType":"nestedObjectLiteral","nestedProperties":{"phone":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PromoteParticipantGroup": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "type": {"dataType":"enum","enums":["promote_participant"],"required":true},
            "promote": {"dataType":"nestedObjectLiteral","nestedProperties":{"phone":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RemoveLinkGroup": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "type": {"dataType":"enum","enums":["revoke_link"],"required":true},
            "revoke": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReturnMedia": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "url": {"dataType":"string","required":true},
            "mime_type": {"dataType":"string","required":true},
            "sha256": {"dataType":"string","required":true},
            "file_size": {"dataType":"double","required":true},
            "id": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MessageType": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["text"]},{"dataType":"enum","enums":["image"]},{"dataType":"enum","enums":["audio"]},{"dataType":"enum","enums":["document"]},{"dataType":"enum","enums":["template"]},{"dataType":"enum","enums":["hsm"]},{"dataType":"enum","enums":["sticker"]},{"dataType":"enum","enums":["order"]},{"dataType":"enum","enums":["video"]},{"dataType":"enum","enums":["contacts"]},{"dataType":"enum","enums":["location"]},{"dataType":"enum","enums":["unknown"]},{"dataType":"enum","enums":["system"]},{"dataType":"enum","enums":["interactive"]},{"dataType":"enum","enums":["poll"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TextMessageObject": {
        "dataType": "refObject",
        "properties": {
            "body": {"dataType":"string","required":true},
            "preview_url": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReactMessageObject": {
        "dataType": "refObject",
        "properties": {
            "message_id": {"dataType":"string","required":true},
            "emoji": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MediaObject": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "mime_type": {"dataType":"string"},
            "sha256": {"dataType":"string"},
            "link": {"dataType":"string"},
            "caption": {"dataType":"string"},
            "filename": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LocationMessageObject": {
        "dataType": "refObject",
        "properties": {
            "longitude": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"string"}],"required":true},
            "latitude": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"string"}],"required":true},
            "name": {"dataType":"string"},
            "address": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AdressesContact": {
        "dataType": "refObject",
        "properties": {
            "street": {"dataType":"string","required":true},
            "city": {"dataType":"string"},
            "state": {"dataType":"string"},
            "zip": {"dataType":"string"},
            "country": {"dataType":"string"},
            "country_code": {"dataType":"string"},
            "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["HOME"]},{"dataType":"enum","enums":["WORK"]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NameContact": {
        "dataType": "refObject",
        "properties": {
            "formatted_name": {"dataType":"string","required":true},
            "first_name": {"dataType":"string"},
            "last_name": {"dataType":"string"},
            "middle_name": {"dataType":"string"},
            "suffix": {"dataType":"string"},
            "prefix": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrgContact": {
        "dataType": "refObject",
        "properties": {
            "company": {"dataType":"string"},
            "department": {"dataType":"string"},
            "title": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PhonesContact": {
        "dataType": "refObject",
        "properties": {
            "phone": {"dataType":"string"},
            "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["CELL"]},{"dataType":"enum","enums":["MAIN"]},{"dataType":"enum","enums":["IPHONE"]},{"dataType":"enum","enums":["HOME"]},{"dataType":"enum","enums":["WORK"]}]},
            "wa_id": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UrlsContact": {
        "dataType": "refObject",
        "properties": {
            "url": {"dataType":"string"},
            "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["HOME"]},{"dataType":"enum","enums":["WORK"]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ContactObject": {
        "dataType": "refObject",
        "properties": {
            "addresses": {"dataType":"array","array":{"dataType":"refObject","ref":"AdressesContact"}},
            "birthday": {"dataType":"datetime"},
            "emails": {"dataType":"array","array":{"dataType":"string"}},
            "name": {"ref":"NameContact","required":true},
            "org": {"ref":"OrgContact"},
            "phones": {"dataType":"array","array":{"dataType":"refObject","ref":"PhonesContact"},"required":true},
            "urls": {"dataType":"array","array":{"dataType":"refObject","ref":"UrlsContact"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Buttons": {
        "dataType": "refObject",
        "properties": {
            "type": {"dataType":"enum","enums":["reply"],"required":true},
            "reply": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true},"title":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SectionsRows": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Sections": {
        "dataType": "refObject",
        "properties": {
            "product_items": {"dataType":"any"},
            "rows": {"dataType":"array","array":{"dataType":"refObject","ref":"SectionsRows"}},
            "title": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ActionObject": {
        "dataType": "refObject",
        "properties": {
            "button": {"dataType":"string"},
            "buttons": {"dataType":"array","array":{"dataType":"refObject","ref":"Buttons"}},
            "catalog_id": {"dataType":"string"},
            "product_retailer_id": {"dataType":"string"},
            "sections": {"dataType":"array","array":{"dataType":"refObject","ref":"Sections"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InteractiveObject": {
        "dataType": "refObject",
        "properties": {
            "action": {"ref":"ActionObject","required":true},
            "body": {"dataType":"nestedObjectLiteral","nestedProperties":{"text":{"dataType":"string","required":true}}},
            "footer": {"dataType":"nestedObjectLiteral","nestedProperties":{"text":{"dataType":"string","required":true}}},
            "header": {"dataType":"nestedObjectLiteral","nestedProperties":{"text":{"dataType":"string","required":true},"type":{"dataType":"enum","enums":["text"],"required":true}}},
            "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["button"]},{"dataType":"enum","enums":["list"]},{"dataType":"enum","enums":["product"]},{"dataType":"enum","enums":["product_list"]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PollMessageObject": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "options": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "selectableCount": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Message": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "type": {"ref":"MessageType"},
            "to": {"dataType":"string","required":true},
            "from": {"dataType":"string"},
            "id": {"dataType":"string","required":true},
            "timestamp": {"dataType":"double"},
            "context": {"dataType":"nestedObjectLiteral","nestedProperties":{"message_id":{"dataType":"string","required":true}}},
            "recipient_type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["individual"]},{"dataType":"enum","enums":["group"]}]},
            "template": {"dataType":"any"},
            "hsm": {"dataType":"any"},
            "text": {"ref":"TextMessageObject"},
            "reaction": {"ref":"ReactMessageObject"},
            "image": {"ref":"MediaObject"},
            "video": {"ref":"MediaObject"},
            "audio": {"ref":"MediaObject"},
            "document": {"ref":"MediaObject"},
            "sticker": {"ref":"MediaObject"},
            "location": {"ref":"LocationMessageObject"},
            "contacts": {"dataType":"array","array":{"dataType":"refObject","ref":"ContactObject"}},
            "interactive": {"ref":"InteractiveObject"},
            "poll": {"ref":"PollMessageObject"},
            "order": {"dataType":"any"},
            "unknown": {"dataType":"any"},
            "system": {"dataType":"any"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StatusMessage": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["read"]},{"dataType":"enum","enums":["played"]},{"dataType":"enum","enums":["delivered"]},{"dataType":"enum","enums":["sent"]},{"dataType":"enum","enums":["failed"]},{"dataType":"enum","enums":["deleted"]}],"required":true},
            "message_id": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ChangesObject": {
        "dataType": "refObject",
        "properties": {
            "field": {"dataType":"string","required":true},
            "value": {"dataType":"nestedObjectLiteral","nestedProperties":{"statuses":{"dataType":"array","array":{"dataType":"refObject","ref":"StatusMessage"}},"messages":{"dataType":"array","array":{"dataType":"refObject","ref":"Message"}},"contacts":{"dataType":"array","array":{"dataType":"refObject","ref":"Contact"},"required":true},"metadata":{"dataType":"nestedObjectLiteral","nestedProperties":{"phone_number_id":{"dataType":"string","required":true},"display_phone_number":{"dataType":"string","required":true}},"required":true},"messaging_product":{"dataType":"enum","enums":["whatsapp"],"required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EntryObject": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "changes": {"dataType":"array","array":{"dataType":"refObject","ref":"ChangesObject"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReceivedAndGetMessage": {
        "dataType": "refObject",
        "properties": {
            "object": {"dataType":"enum","enums":["whatsapp_business_account"],"required":true},
            "entry": {"dataType":"array","array":{"dataType":"refObject","ref":"EntryObject"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReturnSendedMessage": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "contacts": {"dataType":"nestedObjectLiteral","nestedProperties":{"wa_id":{"dataType":"string","required":true},"input":{"dataType":"string","required":true}},"required":true},
            "messages": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SendText": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "recipient_type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["individual"]},{"dataType":"enum","enums":["group"]}],"required":true},
            "to": {"dataType":"string","required":true},
            "type": {"dataType":"enum","enums":["text"],"required":true},
            "context": {"dataType":"nestedObjectLiteral","nestedProperties":{"message_id":{"dataType":"string","required":true}}},
            "text": {"ref":"TextMessageObject","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SendImage": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "recipient_type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["individual"]},{"dataType":"enum","enums":["group"]}],"required":true},
            "to": {"dataType":"string","required":true},
            "type": {"dataType":"enum","enums":["image"],"required":true},
            "context": {"dataType":"nestedObjectLiteral","nestedProperties":{"message_id":{"dataType":"string","required":true}}},
            "image": {"ref":"MediaObject","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReplyMsgId": {
        "dataType": "refObject",
        "properties": {
            "message_id": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SendAudio": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "recipient_type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["individual"]},{"dataType":"enum","enums":["group"]}],"required":true},
            "to": {"dataType":"string","required":true},
            "type": {"dataType":"enum","enums":["audio"],"required":true},
            "context": {"ref":"ReplyMsgId"},
            "audio": {"ref":"MediaObject","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SendDocument": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "recipient_type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["individual"]},{"dataType":"enum","enums":["group"]}],"required":true},
            "to": {"dataType":"string","required":true},
            "type": {"dataType":"enum","enums":["document"],"required":true},
            "context": {"ref":"ReplyMsgId"},
            "document": {"ref":"MediaObject","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SendSticker": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "recipient_type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["individual"]},{"dataType":"enum","enums":["group"]}],"required":true},
            "to": {"dataType":"string","required":true},
            "type": {"dataType":"enum","enums":["sticker"],"required":true},
            "context": {"ref":"ReplyMsgId"},
            "sticker": {"ref":"MediaObject","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SendVideo": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "recipient_type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["individual"]},{"dataType":"enum","enums":["group"]}],"required":true},
            "to": {"dataType":"string","required":true},
            "type": {"dataType":"enum","enums":["video"],"required":true},
            "context": {"ref":"ReplyMsgId"},
            "video": {"ref":"MediaObject","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SendContact": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "recipient_type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["individual"]},{"dataType":"enum","enums":["group"]}],"required":true},
            "to": {"dataType":"string","required":true},
            "type": {"dataType":"enum","enums":["contacts"],"required":true},
            "context": {"ref":"ReplyMsgId"},
            "contacts": {"dataType":"array","array":{"dataType":"refObject","ref":"ContactObject"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SendLocation": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "recipient_type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["individual"]},{"dataType":"enum","enums":["group"]}],"required":true},
            "to": {"dataType":"string","required":true},
            "type": {"dataType":"enum","enums":["location"],"required":true},
            "context": {"ref":"ReplyMsgId"},
            "location": {"ref":"LocationMessageObject","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SendReaction": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "recipient_type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["individual"]},{"dataType":"enum","enums":["group"]}],"required":true},
            "to": {"dataType":"string","required":true},
            "type": {"dataType":"enum","enums":["reaction"],"required":true},
            "reaction": {"ref":"ReactMessageObject","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SendInteractive": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "recipient_type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["individual"]},{"dataType":"enum","enums":["group"]}],"required":true},
            "to": {"dataType":"string","required":true},
            "type": {"dataType":"enum","enums":["interactive"],"required":true},
            "interactive": {"ref":"InteractiveObject","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeleteMessage": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "status": {"dataType":"enum","enums":["deleted"],"required":true},
            "message_id": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/:PHONE_NUMBER_ID/whatsapp_contact_profile',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ContactsController)),
            ...(fetchMiddlewares<RequestHandler>(ContactsController.prototype.getContact)),

            function ContactsController_getContact(request: any, response: any, next: any) {
            const args = {
                    PHONE_NUMBER_ID: {"in":"path","name":"PHONE_NUMBER_ID","required":true,"dataType":"string"},
                    fields: {"in":"query","name":"fields","required":true,"dataType":"array","array":{"dataType":"refAlias","ref":"FieldsContact"}},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ContactsController();


              const promise = controller.getContact.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/:PHONE_NUMBER_ID/whatsapp_business_profile',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ContactsController)),
            ...(fetchMiddlewares<RequestHandler>(ContactsController.prototype.getBusinessContact)),

            function ContactsController_getBusinessContact(request: any, response: any, next: any) {
            const args = {
                    PHONE_NUMBER_ID: {"in":"path","name":"PHONE_NUMBER_ID","required":true,"dataType":"string"},
                    fields: {"in":"query","name":"fields","required":true,"dataType":"array","array":{"dataType":"refAlias","ref":"FieldsBusinessContact"}},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ContactsController();


              const promise = controller.getBusinessContact.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/:PHONE_NUMBER_ID/whatsapp_business_profile',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ContactsController)),
            ...(fetchMiddlewares<RequestHandler>(ContactsController.prototype.updateBusinessProfile)),

            function ContactsController_updateBusinessProfile(request: any, response: any, next: any) {
            const args = {
                    payload: {"in":"body","name":"payload","required":true,"ref":"Partial_BusinessProfileInterface_"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ContactsController();


              const promise = controller.updateBusinessProfile.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/:PHONE_NUMBER_ID/groups/:GROUP_ID',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GroupsController)),
            ...(fetchMiddlewares<RequestHandler>(GroupsController.prototype.getGroup)),

            function GroupsController_getGroup(request: any, response: any, next: any) {
            const args = {
                    GROUP_ID: {"in":"path","name":"GROUP_ID","required":true,"dataType":"string"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GroupsController();


              const promise = controller.getGroup.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/:PHONE_NUMBER_ID/groups',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GroupsController)),
            ...(fetchMiddlewares<RequestHandler>(GroupsController.prototype.manageGroups)),

            function GroupsController_manageGroups(request: any, response: any, next: any) {
            const args = {
                    payload: {"in":"body","name":"payload","required":true,"dataType":"union","subSchemas":[{"ref":"CreateGroup"},{"ref":"EditGroup"},{"ref":"AddParticipantGroup"},{"ref":"DeleteParticipantGroup"},{"ref":"DemoteParticipantGroup"},{"ref":"PromoteParticipantGroup"},{"ref":"RemoveLinkGroup"}]},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GroupsController();


              const promise = controller.manageGroups.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/:PHONE_NUMBER_ID/groups/:GROUP_ID',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GroupsController)),
            ...(fetchMiddlewares<RequestHandler>(GroupsController.prototype.manageMyGroup)),

            function GroupsController_manageMyGroup(request: any, response: any, next: any) {
            const args = {
                    groupId: {"in":"path","name":"GROUP_ID","required":true,"dataType":"string"},
                    type: {"in":"query","name":"type","required":true,"dataType":"union","subSchemas":[{"dataType":"enum","enums":["leave"]},{"dataType":"enum","enums":["join"]}]},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    link: {"in":"query","name":"link","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GroupsController();


              const promise = controller.manageMyGroup.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/:MEDIA_ID',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(MediasController)),
            ...(fetchMiddlewares<RequestHandler>(MediasController.prototype.getMedia)),

            function MediasController_getMedia(request: any, response: any, next: any) {
            const args = {
                    MEDIA_ID: {"in":"path","name":"MEDIA_ID","required":true,"dataType":"string"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MediasController();


              const promise = controller.getMedia.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/:PHONE_NUMBER_ID/media',
            authenticateMiddleware([{"apiKey":[]}]),
            upload.single('file'),
            ...(fetchMiddlewares<RequestHandler>(MediasController)),
            ...(fetchMiddlewares<RequestHandler>(MediasController.prototype.createMedia)),

            function MediasController_createMedia(request: any, response: any, next: any) {
            const args = {
                    payload: {"in":"formData","name":"payload","required":true,"dataType":"string"},
                    file: {"in":"formData","name":"file","required":true,"dataType":"file"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MediasController();


              const promise = controller.createMedia.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/:MEDIA_ID',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(MediasController)),
            ...(fetchMiddlewares<RequestHandler>(MediasController.prototype.deleteMedia)),

            function MediasController_deleteMedia(request: any, response: any, next: any) {
            const args = {
                    MEDIA_ID: {"in":"path","name":"MEDIA_ID","required":true,"dataType":"string"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MediasController();


              const promise = controller.deleteMedia.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/:PHONE_NUMBER_ID/messages/:MESSAGE_ID',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(MessagesController)),
            ...(fetchMiddlewares<RequestHandler>(MessagesController.prototype.getMessage)),

            function MessagesController_getMessage(request: any, response: any, next: any) {
            const args = {
                    MESSAGE_ID: {"in":"path","name":"MESSAGE_ID","required":true,"dataType":"string"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MessagesController();


              const promise = controller.getMessage.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/:PHONE_NUMBER_ID/messages',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(MessagesController)),
            ...(fetchMiddlewares<RequestHandler>(MessagesController.prototype.sendMessage)),

            function MessagesController_sendMessage(request: any, response: any, next: any) {
            const args = {
                    payload: {"in":"body","name":"payload","required":true,"dataType":"union","subSchemas":[{"ref":"SendText"},{"ref":"SendImage"},{"ref":"SendAudio"},{"ref":"SendDocument"},{"ref":"SendSticker"},{"ref":"SendVideo"},{"ref":"SendContact"},{"ref":"SendLocation"},{"ref":"SendReaction"},{"ref":"SendInteractive"}]},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MessagesController();


              const promise = controller.sendMessage.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/:PHONE_NUMBER_ID/messages',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(MessagesController)),
            ...(fetchMiddlewares<RequestHandler>(MessagesController.prototype.markStatusMessage)),

            function MessagesController_markStatusMessage(request: any, response: any, next: any) {
            const args = {
                    payload: {"in":"body","name":"payload","required":true,"ref":"StatusMessage"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MessagesController();


              const promise = controller.markStatusMessage.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/:PHONE_NUMBER_ID/messages',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(MessagesController)),
            ...(fetchMiddlewares<RequestHandler>(MessagesController.prototype.deleteMessage)),

            function MessagesController_deleteMessage(request: any, response: any, next: any) {
            const args = {
                    payload: {"in":"body","name":"payload","required":true,"ref":"DeleteMessage"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MessagesController();


              const promise = controller.deleteMessage.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/:PHONE_NUMBER_ID/:SECRET_KEY/request_code',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.generateToken)),

            function AuthController_generateToken(request: any, response: any, next: any) {
            const args = {
                    PHONE_NUMBER_ID: {"in":"path","name":"PHONE_NUMBER_ID","required":true,"dataType":"string"},
                    SECRET_KEY: {"in":"path","name":"SECRET_KEY","required":true,"dataType":"enum","enums":["THISISMYSECURETOKEN"]},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    refuseCall: {"in":"query","name":"reject_all_calls","dataType":"boolean"},
                    msgRefuseCall: {"in":"query","name":"msg","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthController();


              const promise = controller.generateToken.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/:PHONE_NUMBER_ID/start',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.startSession)),

            function AuthController_startSession(request: any, response: any, next: any) {
            const args = {
                    PHONE_NUMBER_ID: {"in":"path","name":"PHONE_NUMBER_ID","required":true,"dataType":"string"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthController();


              const promise = controller.startSession.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/:PHONE_NUMBER_ID/qr_code',
            authenticateMiddleware([{"apiKey":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.getQrCode)),

            function AuthController_getQrCode(request: any, response: any, next: any) {
            const args = {
                    PHONE_NUMBER_ID: {"in":"path","name":"PHONE_NUMBER_ID","required":true,"dataType":"string"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthController();


              const promise = controller.getQrCode.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/:SECRET_KEY/backup-all-sessions',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.backupAllSessions)),

            function AuthController_backupAllSessions(request: any, response: any, next: any) {
            const args = {
                    SECRET_KEY: {"in":"path","name":"SECRET_KEY","required":true,"dataType":"enum","enums":["THISISMYSECURETOKEN"]},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthController();


              const promise = controller.backupAllSessions.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/:SECRET_KEY/restore-sessions',
            upload.single('file'),
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.restoreSessions)),

            function AuthController_restoreSessions(request: any, response: any, next: any) {
            const args = {
                    SECRET_KEY: {"in":"path","name":"SECRET_KEY","required":true,"dataType":"enum","enums":["THISISMYSECURETOKEN"]},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    file: {"in":"formData","name":"file","required":true,"dataType":"file"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthController();


              const promise = controller.restoreSessions.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/:SECRET_KEY/start-all',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.startAllSessions)),

            function AuthController_startAllSessions(request: any, response: any, next: any) {
            const args = {
                    SECRET_KEY: {"in":"path","name":"SECRET_KEY","required":true,"dataType":"enum","enums":["THISISMYSECURETOKEN"]},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthController();


              const promise = controller.startAllSessions.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, _response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await promiseAny(secMethodOrPromises);
                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
