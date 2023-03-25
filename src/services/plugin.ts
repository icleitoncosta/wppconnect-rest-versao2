export enum EventTypes{
    // Event Types WPPConnect
    onQRCode = 'onQRCode',
    onMessage = 'onMessage', // Args: (type, clientWhatsApp, message)
    onCall = 'onCall', // Args: (type, clientWhatsApp, qrData)
    statusFind = 'statusFind', // Args: (type, clientWhatsApp, statusFind)
    onParticipantsChanged = 'onParticipantsChanged',
    onReactionMessage = 'onReactionMessage',
    onAck = 'onAck',
    onStateChange = 'onStateChange',
    onReaction = 'onReaction',
}

export class Plugin {
    toCall: any = [];

    constructor () {}

    register(toCall: any) {
        this.toCall.push(toCall);
    }

    call(event: EventTypes, ...args: any) {
        for (const func of this.toCall) {
            func(event, ...args);
        }
    }
}