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
        this.productionURL = "https://rocketmeet.herokuapp.com/v1"; // production url
        this.URL = this.productionURL;
    }

    httpMethod = async (payload: any, endpoint: string, reqMethod: string) => {
        const requestOptions: RequestInit = {
            method: reqMethod,
            headers: this.headers,
        };

        if (reqMethod !== "GET") {
            requestOptions.body = payload;
        }

        const res = await fetch(endpoint, requestOptions);
        const { status } = res;
        const responseData = await res.json()
        return {
            data: responseData,
            statusCode: status
        };
    }

    getPolls = async (userID: string) => {
        const endpoint = `${this.URL}/user/${userID}`;
        return await this.httpMethod(null, endpoint, "GET");
    }

    createPoll = async (poll: RocketMeetPoll) => {
        const payload = JSON.stringify(poll);
        const endpoint = `${this.URL}/user/poll`;
        return await this.httpMethod(payload, endpoint, "POST");
    }

    markChoices = async (voteArgs: {
        newVote: Vote;
        pollid: string;
    }) => {
        const { newVote, pollid } = voteArgs;
        const payload = JSON.stringify(newVote);
        const endpoint = `${this.URL}/poll/${pollid}`;
        return await this.httpMethod(payload, endpoint, "PUT");
    }

    markFinalChoice = async (voteArgs: {
        finalChoice: any;
        pollid: string;
    }) => {
        const { finalChoice, pollid } = voteArgs;
        const payload = JSON.stringify(finalChoice);
        const endpoint = `${this.URL}/user/poll/${pollid}`;
        return await this.httpMethod(payload, endpoint, "PUT");
    }
}

export const ServerAPI = new serverAPI();
