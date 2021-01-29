import { MailerPollArgs, MailerEventArgs } from "../models/poll";

interface MailerResponse {
  statusCode: number;
}

class MailerAPI {
  // senderID: string;
  headers: any;

  URL: string | undefined;

  domain: string | undefined;

  constructor() {
    // this.senderID = "userIDfromStore"
    // this.token = "tokenfromStore"

    this.URL = process.env.NEXT_PUBLIC_MAILER_URL;
    this.domain = process.env.NEXT_PUBLIC_ORIGIN_DOMAIN;
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
    mailerArgs: MailerPollArgs,
    token: string
  ): Promise<MailerResponse> => {
    const payload = JSON.stringify(mailerArgs);
    const endpoint = `${this.URL}/meetInfo`;
    return this.httpPost(payload, endpoint, token);
  };

  sendEventInvites = (
    // Invite pollers for the event in final time-slot
    mailerArgs: MailerEventArgs,
    token: string
  ): Promise<MailerResponse> => {
    const payload = JSON.stringify(mailerArgs);
    const endpoint = `${this.URL}/finalOption`;
    return this.httpPost(payload, endpoint, token);
  };
}

export const mailerAPI = new MailerAPI();
