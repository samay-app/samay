import { RocketMeetPoll, Vote, HttpResponse, Choice } from "../models/poll";

class ServerAPI {
  headers: any;

  URL: string | undefined;

  domain: string | undefined;

  constructor() {
    // Figure out a way to access store
    // https://github.com/kirill-konshin/next-redux-wrapper/issues/214#issuecomment-680273330

    this.URL = process.env.NEXT_PUBLIC_SERVER_URL;
    this.domain = process.env.NEXT_PUBLIC_ORIGIN_DOMAIN;
  }

  httpMethod = async (
    endpoint: string,
    requestOptions: RequestInit
  ): Promise<HttpResponse> => {
    const res = await fetch(endpoint, requestOptions);
    const { status } = res;
    const responseData = await res.json();
    return {
      data: responseData,
      statusCode: status,
    };
  };

  getPoll = (
    pollid: string | string[] | null | undefined
  ): Promise<HttpResponse> => {
    const endpoint = `${this.URL}/poll/${pollid}`;
    this.headers = {
      "Content-Type": "application/json",
    };
    const requestOptions: RequestInit = {
      mode: "cors",
      credentials: "include",
      method: "GET",
      headers: this.headers,
    };
    return this.httpMethod(endpoint, requestOptions);
  };

  getPolls = (pollArgs: {
    userID: string;
    token: string;
  }): Promise<HttpResponse> => {
    const { userID, token } = pollArgs;
    const endpoint = `${this.URL}/user/${userID}`;
    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const requestOptions: RequestInit = {
      mode: "cors",
      credentials: "include",
      method: "GET",
      headers: this.headers,
    };
    return this.httpMethod(endpoint, requestOptions);
  };

  createPoll = (pollArgs: {
    poll: RocketMeetPoll;
    token: string;
  }): Promise<HttpResponse> => {
    const { poll, token } = pollArgs;
    const endpoint = `${this.URL}/user/poll`;
    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const requestOptions: RequestInit = {
      mode: "cors",
      credentials: "include",
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(poll),
    };
    return this.httpMethod(endpoint, requestOptions);
  };

  markChoices = (voteArgs: {
    newVote: Vote;
    pollid: string;
  }): Promise<HttpResponse> => {
    const { newVote, pollid } = voteArgs;
    const endpoint = `${this.URL}/poll/${pollid}`;
    this.headers = {
      "Content-Type": "application/json",
    };
    const requestOptions: RequestInit = {
      mode: "cors",
      credentials: "include",
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(newVote),
    };
    return this.httpMethod(endpoint, requestOptions);
  };

  markFinalChoice = (voteArgs: {
    finalChoice: { finalChoice: Choice | undefined; open: boolean };
    pollid: string;
    token: string;
  }): Promise<HttpResponse> => {
    const { finalChoice, pollid, token } = voteArgs;
    const endpoint = `${this.URL}/user/poll/${pollid}`;
    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const requestOptions: RequestInit = {
      mode: "cors",
      credentials: "include",
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(finalChoice),
    };
    return this.httpMethod(endpoint, requestOptions);
  };

  deletePoll = (voteArgs: {
    pollid: string;
    token: string;
  }): Promise<HttpResponse> => {
    const { pollid, token } = voteArgs;
    const endpoint = `${this.URL}/user/poll/${pollid}`;
    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const requestOptions: RequestInit = {
      mode: "cors",
      credentials: "include",
      method: "DELETE",
      headers: this.headers,
      body: JSON.stringify(voteArgs),
    };
    return this.httpMethod(endpoint, requestOptions);
  };
}

export const serverAPI = new ServerAPI();
