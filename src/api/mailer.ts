import { MailerArgs } from "@models/poll";

class mailerAPI {
    //senderID: string;
    token: string;
    headers: Headers | string[][] | Record<string, string> | undefined;
    URL: string;

    constructor() {
        //this.senderID = "userIDfromStore"
        this.token = "tokenfromStore"
        this.headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorisation": `Bearer ${this.token}`
        }
        this.URL = "https://rocketmeet-mailer.herokuapp.com/v1/meetInfo"

    }

    httpPost = async (payload: any) => {
        const requestOptions: RequestInit = {
            method: "POST",
            headers: this.headers,
            body: payload,
        };
        const res = await fetch(`${this.URL}`, requestOptions);
        const { status } = res;
        return {
            statusCode: status
        };
    }

    sendInvite = async (mailerArgs: MailerArgs) => {
        const payload = JSON.stringify(mailerArgs);
        console.log(payload)
        const { statusCode } = await this.httpPost(payload)
        return statusCode;
    }
}

export const MailerAPI = new mailerAPI();