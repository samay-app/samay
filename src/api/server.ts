import { Choice, RocketMeetPoll, Vote } from "@models/poll";

class serverAPI {
    // userID: string;
    // token: string;
    headers: Headers | string[][] | Record<string, string> | undefined;
    URL: string | undefined;

    constructor() {
        // this.userID = "UserIDfromStore"
        // this.token = "tokenfromStore"; // Figure out a way to access store
        // https://github.com/kirill-konshin/next-redux-wrapper/issues/214#issuecomment-680273330

        this.URL = process.env.NEXT_PUBLIC_SERVER_URL;
    }

    httpMethod = async (payload: any, endpoint: string, reqMethod: string, token: string) => {
        this.headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorisation": token
        };
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

    getPolls = async (pollArgs: {
        userID: string;
        token: string;
    }) => {
        const { userID, token } = pollArgs;
        const endpoint = `${this.URL}/user/${userID}`;
        return await this.httpMethod(null, endpoint, "GET", token);
    }

    createPoll = async (pollArgs: {
        poll: RocketMeetPoll;
        token: string;
    }) => {
        const { poll, token } = pollArgs;
        const payload = JSON.stringify(poll);
        const endpoint = `${this.URL}/user/poll`;
        return await this.httpMethod(payload, endpoint, "POST", token);
    }

    markChoices = async (voteArgs: {
        newVote: Vote;
        pollid: string;
        token: string;
    }) => {
        const { newVote, pollid, token } = voteArgs;
        const payload = JSON.stringify(newVote);
        const endpoint = `${this.URL}/poll/${pollid}`;
        return await this.httpMethod(payload, endpoint, "PUT", token);
    }

    markFinalChoice = async (voteArgs: {
        finalChoice: any;
        pollid: string;
        token: string;
    }) => {
        const { finalChoice, pollid, token } = voteArgs;
        const payload = JSON.stringify(finalChoice);
        const endpoint = `${this.URL}/user/poll/${pollid}`;
        return await this.httpMethod(payload, endpoint, "PUT", token);
    }
}

export const ServerAPI = new serverAPI();
