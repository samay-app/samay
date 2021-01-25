import { MailerArgs } from "@models/poll";

class mailerAPI {
    //senderID: string;
    token: string;
    headers: Headers | string[][] | Record<string, string> | undefined;
    URL: string;

    constructor() {
        //this.senderID = "userIDfromStore"
        this.token = "tokenfromStore"
    httpPost = async (payload: any, token: string) => {
        this.headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorisation": `Bearer ${token}`
        }
        this.URL = "https://rocketmeet-mailer.herokuapp.com/v1/meetInfo"

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