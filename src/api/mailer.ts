import { STATUS_CODES } from "http";
import { useSelector } from "react-redux";
import { RootState } from "../../src/store/store";

class mailerAPI {
    senderID: string;
    token: string;
    headers: Headers | string[][] | Record<string, string> | undefined;
    URL: string;

    constructor() {
        this.senderID = "userIDfromStore"
        this.token = "tokenfromStore"
        this.headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorisation": `Bearer ${this.token}`
        }
        this.URL = "https://rocketmeet-mailer.herokuapp.com/meetInfo"

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

    sendInvite = async (voteArgs: {
        pollid: string;
        recieverIDs: [string]
    }) => {
        const { pollid, recieverIDs } = voteArgs;
        const payload = JSON.stringify({
            pollid: pollid,
            recieverIDs: recieverIDs
        });
        const { statusCode } = await this.httpPost(payload)
        return statusCode;
    }
}

export const MailerAPI = new mailerAPI();