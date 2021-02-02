import { MailerArgs } from "../models/poll";

interface MailerResponse {
  statusCode: number;
}

class MailerAPI {
  // senderID: string;
  headers: any;

  URL: string | undefined;

  domain: string | undefined;

  version: string | undefined;

  constructor() {
    // this.senderID = "userIDfromStore"
    // this.token = "tokenfromStore"

    this.domain = process.env.NEXT_PUBLIC_MAILER_URL;
    this.version = process.env.NEXT_PUBLIC_VERSION_NUMBER;
    this.URL = `${this.domain}/v${this.version}`;
  }

  httpPost = async (
    payload: string,
    endpoint: string,
    token: string
  ): Promise<MailerResponse> => {
    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const requestOptions: RequestInit = {
      mode: "cors",
      credentials: "include",
      method: "POST",
      headers: this.headers,
      body: payload,
    };
    const res = await fetch(endpoint, requestOptions);
    const { status } = res;
    return {
      statusCode: status,
    };
  };

  sendPollInvites = (
    // Invite pollers
    mailerArgs: MailerArgs,
    token: string
  ): Promise<MailerResponse> => {
    const payload = JSON.stringify(mailerArgs);
    const endpoint = `${this.URL}/invite`;
    return this.httpPost(payload, endpoint, token);
  };

  sendFinalTime = (
    // Invite pollers for the event in final time-slot
    mailerArgs: MailerArgs,
    token: string
  ): Promise<MailerResponse> => {
    const payload = JSON.stringify(mailerArgs);
    const endpoint = `${this.URL}/finalChoice`;
    return this.httpPost(payload, endpoint, token);
  };
}

export const mailerAPI = new MailerAPI();
