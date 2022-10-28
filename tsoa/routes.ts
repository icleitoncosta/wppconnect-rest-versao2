/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../src/controllers/authController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ContactsController } from './../src/controllers/contactsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MediasController } from './../src/controllers/mediasController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MessagesController } from './../src/controllers/messagesController';
import { expressAuthentication } from './../src/authentication';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import type { RequestHandler } from 'express';
import * as express from 'express';
const multer = require('multer');
const upload = multer();

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Error": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"nestedObjectLiteral","nestedProperties":{"fbtrace_id":{"dataType":"undefined","required":true},"error_subcode":{"dataType":"double","required":true},"error_data":{"dataType":"nestedObjectLiteral","nestedProperties":{"details":{"dataType":"any","required":true},"messaging_product":{"dataType":"enum","enums":["whatsapp"],"required":true}},"required":true},"code":{"dataType":"double","required":true},"type":{"dataType":"string","required":true},"message":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProfileInterface": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Contact": {
        "dataType": "refObject",
        "properties": {
            "wa_id": {"dataType":"string","required":true},
            "profile": {"ref":"ProfileInterface","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FieldsContact": {
        "dataType": "refAlias",
        "type": {"dataType":"enum","enums":["name"],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BusinessProfileInterface": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "about": {"dataType":"string"},
            "adress": {"dataType":"string"},
            "description": {"dataType":"string"},
            "email": {"dataType":"string"},
            "messaging_product": {"dataType":"enum","enums":["whatsapp"]},
            "profile_picture_url": {"dataType":"string","required":true},
            "websites": {"dataType":"array","array":{"dataType":"string"}},
            "vertical": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FieldsBusinessContact": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["about"]},{"dataType":"enum","enums":["address"]},{"dataType":"enum","enums":["description"]},{"dataType":"enum","enums":["email"]},{"dataType":"enum","enums":["profile_picture_url"]},{"dataType":"enum","enums":["websites"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_BusinessProfileInterface_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"},"about":{"dataType":"string"},"adress":{"dataType":"string"},"description":{"dataType":"string"},"email":{"dataType":"string"},"messaging_product":{"dataType":"enum","enums":["whatsapp"]},"profile_picture_url":{"dataType":"string"},"websites":{"dataType":"array","array":{"dataType":"string"}},"vertical":{"dataType":"string"}},"validators":{}},
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
        "dataType": "refEnum",
        "enums": ["text","image","audio","document","template","hsm","sticker","order","video","contacts","unknown","system","interactive"],
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
            "longitude": {"dataType":"double","required":true},
            "latitude": {"dataType":"double","required":true},
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
            "rows": {"ref":"SectionsRows"},
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
            "sections": {"ref":"Sections"},
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
    "Message": {
        "dataType": "refObject",
        "properties": {
            "messaging_product": {"dataType":"enum","enums":["whatsapp"],"required":true},
            "type": {"ref":"MessageType"},
            "to": {"dataType":"string","required":true},
            "from": {"dataType":"string"},
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
            "location": {"ref":"LocationMessageObject"},
            "contacts": {"dataType":"array","array":{"dataType":"refObject","ref":"ContactObject"}},
            "interactive": {"ref":"InteractiveObject"},
            "sticker": {"ref":"MediaObject"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServerError": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"nestedObjectLiteral","nestedProperties":{"fbtrace_id":{"dataType":"undefined","required":true},"error_subcode":{"dataType":"double","required":true},"error_data":{"dataType":"nestedObjectLiteral","nestedProperties":{"details":{"dataType":"any","required":true},"messaging_product":{"dataType":"enum","enums":["whatsapp"],"required":true}},"required":true},"code":{"dataType":"double","required":true},"type":{"dataType":"string","required":true},"message":{"dataType":"string","required":true}},"required":true},
            "type": {"dataType":"any","required":true},
            "code": {"dataType":"double","default":3},
            "details": {"dataType":"any","required":true},
            "subcode": {"dataType":"double","default":0},
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
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/:PHONE_NUMBER_ID/:SECRET_KEY/request_code',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.generateToken)),

            function AuthController_generateToken(request: any, response: any, next: any) {
            const args = {
                    PHONE_NUMBER_ID: {"in":"path","name":"PHONE_NUMBER_ID","required":true,"dataType":"string"},
                    SECRET_KEY: {"in":"path","name":"SECRET_KEY","required":true,"dataType":"string"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
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
        app.get('/:PHONE_NUMBER_ID/start',
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
                    PHONE_NUMBER_ID: {"in":"path","name":"PHONE_NUMBER_ID","required":true,"dataType":"string"},
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
                    PHONE_NUMBER_ID: {"in":"path","name":"PHONE_NUMBER_ID","required":true,"dataType":"string"},
                    payload: {"in":"body","name":"payload","required":true,"ref":"Message"},
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
