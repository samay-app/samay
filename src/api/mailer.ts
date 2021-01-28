import { MailerArgs } from "../models/poll";

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
    token: string
  ): Promise<MailerResponse> => {
    this.headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const requestOptions: RequestInit = {
      mode: 'cors',
      credentials: 'include',
      method: "POST",
      headers: this.headers,
      body: payload,
    };
    const res = await fetch(`${this.URL}`, requestOptions);
    const { status } = res;
    return {
      statusCode: status,
    };
  };

  sendInvite = (
    mailerArgs: MailerArgs,
    token: string
  ): Promise<MailerResponse> => {
    const payload = JSON.stringify(mailerArgs);
    return this.httpPost(payload, token);
  };
}

export const mailerAPI = new MailerAPI();
