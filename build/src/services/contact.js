"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
class ContactService {
    get(id, fields) {
        return {
            wa_id: id + fields,
            profile: {
                name: "John Doe"
            }
        };
    }
    create(payload) {
        return {
            wa_id: payload.wa_id,
            profile: {
                name: payload.name,
            }
        };
    }
}
exports.ContactService = ContactService;
