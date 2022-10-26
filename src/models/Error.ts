export interface Error {
    /**
     * Error Codes
     * 0 - AuthException - Unable to authenticate the app user.
     * 3 - Api Method - Indicates an issue involving resources or permissions.
     * 10 - Permission denied - Permission has not been granted or has been removed.
     * 190 - Expired token
     * API Permissions - Permission has not been granted or has been removed.
     * 
     * Limitation errors
     * 4 - API Limit - The app has reached its API call rate limit.
     * 80007 - WhatsApp Business account has reached the volume limit.
     * 
     * Integrity errors
     * 368 | 131031 - The WhatsApp Business account associated with the app has been restricted or disabled for violating a platform policy.
     * 
     * Other errors
     * 1 - Invalid request or possible server error.
     * 2 - Temporary due to inactivity or being overloaded.
     * 100 - The request included one or more incompatible or misspelled parameters.
     * 131000 - Falha ao enviar a mensagem devido a um erro desconhecido.
     * 131005 - Permission has not been granted or has been removed.
     * 131008 - A required parameter is missing from the order.
     * 131009 - One or more parameter values are not supported, the recipient's phone number is not valid for WhatsApp, or the sender's phone number has not been added to the WhatsApp Business Platform.
     * 131016 - A service is temporarily unavailable.
     * 131021 - The recipient's and sender's phone number is the same.
     * 131026 - The recipient uses a version of WhatsApp that is not compatible with the message content.
     * 131051 - Message type is not supported.
     * 131052 | 131053 - The type of media sent by WhatsApp user is not supported.
     * 132000 - The number of variable parameter values included in the request does not match the number of variable parameters defined in the template.
     * 133004 - The server is temporarily unavailable.
     * 133010 - The phone number is not registered and connected.
     * 135000 - Failed to send message due to an unknown error with your request parameters.
     */
    error: {
        message: string;
        type: string;
        /**
         * We recommend that you build your app's error handling around error codes rather than subcodes or HTTP response status codes.
         */
        code: number;
        error_data: {
            messaging_product: "whatsapp";
            details: any;
        },
        error_subcode: number;
        fbtrace_id: undefined;
    }
}
