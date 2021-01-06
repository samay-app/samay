import { useSelector } from "react-redux";
import { RootState } from "../../src/store/store";

class mailerAPI {
    senderID: string;
    token: string;
    headers: Object;
    URL: string;

    constructor() {
        this.senderID = "userIDfromStore"
        this.token = "tokenfromStore"
        this.headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorisation": `Bearer ${this.token}`
        }
        this.URL = "https://rocketmeet-mailer.herokuapp.com"

    }

    sendInvite = async (voteArgs: {
        pollid: string;
        recieverIDs: [string]
    }): Promise<{ statusCode: number; }> => {
        const { pollid, recieverIDs } = voteArgs;
        const payload = JSON.stringify({
            pollid: pollid,
            recieverIDs: recieverIDs
        });
        const requestOptions = {
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
}

export const MailerAPI = new mailerAPI();