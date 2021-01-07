import { Choice, RocketMeetPoll, Vote } from "@models/poll";

class serverAPI {
    userID: string;
    token: string;
    headers: Headers | string[][] | Record<string, string> | undefined;
    authHeaders: Headers | string[][] | Record<string, string> | undefined;
    localURL: string;
    productionURL: string;
    URL: string;

    constructor() {
        this.userID = "UserIDfromStore"
        this.token = "tokenfromStore"; // Figure out a way to access store
        this.headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };
        this.authHeaders = Object.assign({}, this.headers, {
            "Authorisation": `Bearer ${this.token}`
        })
        // TODO: Move this to config / .env later
        this.localURL = "http://localhost:5000"; // local url
        this.productionURL = "https://rocketmeet.me"; // production url
        this.URL = this.localURL;
    }

    httpMethod = async (payload: any, endpoint: string, reqMethod: string) => {
        const requestOptions: RequestInit = {
            method: reqMethod,
            headers: this.headers,
            body: payload,
        };
        const res = await fetch(endpoint, requestOptions);
        const { status } = res;
        const responseData = await res.json()
        return {
            data: responseData,
            statusCode: status
        };
    }

    createPoll = async (poll: RocketMeetPoll) => {
        const payload = JSON.stringify(poll);
        const endpoint = `${this.URL}/v1/user/poll`;
        return await this.httpMethod(payload, endpoint, "POST");
    }

    markChoices = async (voteArgs: {
        newVote: Vote;
        pollid: string;
    }) => {
        const { newVote, pollid } = voteArgs;
        const payload = JSON.stringify(newVote);
        const endpoint = `${this.URL}/v1/poll/${pollid}`;
        return await this.httpMethod(payload, endpoint, "PUT");
    }

    markFinalChoice = async (voteArgs: {
        finalChoice: Choice | undefined;
        pollid: string;
    }) => {
        const { finalChoice, pollid } = voteArgs;
        const payload = JSON.stringify(finalChoice);
        const endpoint = `${this.URL}/v1/poll/${pollid}`;
        return await this.httpMethod(payload, endpoint, "PUT");
    }
}

export const ServerAPI = new serverAPI();
