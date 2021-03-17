import { MailerArgs } from "../../models/poll";

interface MailerResponse {
  statusCode: number;
}

const DOMAIN = process.env.NEXT_PUBLIC_MAILER_DOMAIN || "";
const VERSION = process.env.NEXT_PUBLIC_VERSION_NUMBER || "";
const URL = `${DOMAIN}/v${VERSION}`;

const httpPost = async (
  payload: string,
  endpoint: string,
  token: string
): Promise<MailerResponse> => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const requestOptions: RequestInit = {
    mode: "cors",
    credentials: "include",
    method: "POST",
    headers,
    body: payload,
  };
  const res = await fetch(endpoint, requestOptions);
  const { status } = res;
  return {
    statusCode: status,
  };
};

const sendPollInvites = (
  // Invite pollers
  mailerArgs: MailerArgs,
  token: string
): Promise<MailerResponse> => {
  const payload = JSON.stringify(mailerArgs);
  const endpoint = `${URL}/invite`;
  return httpPost(payload, endpoint, token);
};

const sendFinalTime = (
  // Invite pollers for the event in final time-slot
  mailerArgs: MailerArgs,
  token: string
): Promise<MailerResponse> => {
  const payload = JSON.stringify(mailerArgs);
  const endpoint = `${URL}/finalChoice`;
  return httpPost(payload, endpoint, token);
};

const sendPollResponse = (
  // Send poll creater an email, everytime someone votes on their poll
  mailerArgs: MailerArgs,
  token: string
): Promise<MailerResponse> => {
  const payload = JSON.stringify(mailerArgs);
  const endpoint = `${URL}/pollResponse`;
  return httpPost(payload, endpoint, token);
};

export { sendPollInvites, sendFinalTime, sendPollResponse };
