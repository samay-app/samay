import { MailerArgs } from "@models/poll";

class mailerAPI {
    //senderID: string;
    headers: Headers | string[][] | Record<string, string> | undefined;
    URL: string | undefined;

    constructor() {
        // this.senderID = "userIDfromStore"
        // this.token = "tokenfromStore"

        this.URL = process.env.NEXT_PUBLIC_MAILER_URL;

    }

    httpPost = async (payload: any, token: string) => {
        this.headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorisation": `Bearer ${token}`
        }

        const requestOptions: RequestInit = {
            method: "POST",
            headers: this.headers,
            body: payload,
        };
        console.log(requestOptions);

        const res = await fetch(`${this.URL}`, requestOptions);
        const { status } = res;
        return {
            statusCode: status
        };
    }

    sendInvite = async (mailerArgs: MailerArgs, token: string) => {
        const payload = JSON.stringify(mailerArgs);
        console.log(payload)
        const { statusCode } = await this.httpPost(payload, token)
        return statusCode;
    }
}

export const MailerAPI = new mailerAPI();