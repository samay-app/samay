import { Choice, RocketMeetPoll, RocketMeetPollFromDB, Vote } from "@models/poll";

class serverAPI {
    userID: string;
    token: string;
    headers: Object;
    authHeaders: Object;
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
        this.localURL = "http://localhost:5000";
        this.productionURL = "https://rocketmeet.me";
        this.URL = this.localURL;
    }


    createPoll = async (poll: RocketMeetPoll): Promise<{ data: RocketMeetPollFromDB; statusCode: number; }> => {
        const payload = JSON.stringify(poll);
        const requestOptions = {
            method: "POST",
            headers: this.authHeaders,
            body: payload,
        };
        const res = await fetch(`${this.URL}/v1/user/poll`, requestOptions)
        const { status } = res;
        const responseData = await res.json()
        return {
            data: responseData,
            statusCode: status
        };
    }

    markChoices = async (voteArgs: {
        newVote: Vote;
        pollid: string;
    }): Promise<{ statusCode: number; }> => {
        const { newVote, pollid } = voteArgs;
        const payload = JSON.stringify(newVote);
        const requestOptions = {
            method: "PUT",
            headers: this.headers,
            body: payload,
        };
        const res = await fetch(`${this.URL}/v1/poll/${pollid}`, requestOptions);
        const { status } = res;
        return {
            statusCode: status
        };
    }

    markFinalChoice = async (voteArgs: {
        finalChoice: Choice | undefined;
        pollid: string;
    }): Promise<{ statusCode: number; }> => {

        const { finalChoice, pollid } = voteArgs;
        const payload = JSON.stringify(finalChoice);
        const requestOptions = {
            method: "PUT",
            headers: this.authHeaders,
            body: payload,
        };
        const res = await fetch(`${this.URL}/v1/poll/${pollid}`, requestOptions);
        const { status } = res;
        return {
            statusCode: status
        };
    }
}

export const ServerAPI = new serverAPI();
