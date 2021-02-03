import { RocketMeetPoll, Vote, HttpResponse, Choice } from "../models/poll";

class ServerAPI {
  headers: any;

  URL: string | undefined;

  domain: string | undefined;

  version: string | undefined;

  constructor() {
    // Figure out a way to access store
    // https://github.com/kirill-konshin/next-redux-wrapper/issues/214#issuecomment-680273330

    this.domain = process.env.NEXT_PUBLIC_SERVER_DOMAIN;
    this.version = process.env.NEXT_PUBLIC_VERSION_NUMBER;
    this.URL = `${this.domain}/v${this.version}`;
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
    pollID: string | string[] | null | undefined
  ): Promise<HttpResponse> => {
    const endpoint = `${this.URL}/poll/${pollID}`;
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
    encryptedEmailID: string;
    token: string;
  }): Promise<HttpResponse> => {
    const { encryptedEmailID, token } = pollArgs;
    const endpoint = `${this.URL}/user/${encryptedEmailID}`;
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
    pollID: string;
  }): Promise<HttpResponse> => {
    const { newVote, pollID } = voteArgs;
    const endpoint = `${this.URL}/poll/${pollID}`;
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
    pollID: string;
    token: string;
  }): Promise<HttpResponse> => {
    const { finalChoice, pollID, token } = voteArgs;
    const endpoint = `${this.URL}/user/poll/${pollID}`;
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
    pollID: string;
    token: string;
  }): Promise<HttpResponse> => {
    const { pollID, token } = voteArgs;
    const endpoint = `${this.URL}/user/poll/${pollID}`;
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
