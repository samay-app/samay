import { Choice, RocketMeetPoll, Vote } from "@models/poll";

class serverAPI {
    // userID: string;
    // token: string;
    headers: Headers | string[][] | Record<string, string> | undefined;
    URL: string | undefined;
    domain: string | undefined;

    constructor() {
        // this.userID = "UserIDfromStore"
        // this.token = "tokenfromStore"; // Figure out a way to access store
        // https://github.com/kirill-konshin/next-redux-wrapper/issues/214#issuecomment-680273330

        this.URL = process.env.NEXT_PUBLIC_SERVER_URL;
        this.domain = process.env.NEXT_PUBLIC_ORIGIN_DOMAIN;
    }

    httpMethod = async (
        endpoint: string,
        reqMethod: string,
        token: string = "",
        payload: string = "",
    ) => {
        this.headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": `${this.domain}`,
            "Authorization": `Bearer ${token}`
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

    getPoll = async (pollid: any) => {
        const endpoint = `${this.URL}/poll/${pollid}`;
        return await this.httpMethod(endpoint, "GET")
    }

    getPolls = async (pollArgs: {
        userID: string;
        token: string;
    }) => {
        const { userID, token } = pollArgs;
        console.log(userID)
        console.log(token)
        const endpoint = `${this.URL}/user/${userID}`;
        return await this.httpMethod(endpoint, "GET", token);
    }

    createPoll = async (pollArgs: {
        poll: RocketMeetPoll;
        token: string;
    }) => {
        const { poll, token } = pollArgs;
        const payload = JSON.stringify(poll);
        const endpoint = `${this.URL}/user/poll`;
        return await this.httpMethod(endpoint, "POST", token, payload);
    }

    markChoices = async (voteArgs: {
        newVote: Vote;
        pollid: string;
        token: string;
    }) => {
        const { newVote, pollid, token } = voteArgs;
        const payload = JSON.stringify(newVote);
        const endpoint = `${this.URL}/poll/${pollid}`;
        return await this.httpMethod(endpoint, "PUT", token, payload);
    }

    markFinalChoice = async (voteArgs: {
        finalChoice: any;
        pollid: string;
        token: string;
    }) => {
        const { finalChoice, pollid, token } = voteArgs;
        const payload = JSON.stringify(finalChoice);
        const endpoint = `${this.URL}/user/poll/${pollid}`;
        return await this.httpMethod(endpoint, "PUT", token, payload);
    }
}

export const ServerAPI = new serverAPI();
