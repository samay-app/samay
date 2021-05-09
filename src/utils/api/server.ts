import { RocketMeetPoll, Vote, HttpResponse, Choice } from "../../models/poll";

const DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN || "";
const VERSION = process.env.NEXT_PUBLIC_VERSION_NUMBER || "";
const URL = `${DOMAIN}/v${VERSION}`;

const httpMethod = async (
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

const getPoll = (
  pollID: string | string[] | null | undefined
): Promise<HttpResponse> => {
  const endpoint = `${URL}/poll/${pollID}`;
  const headers = {
    "Content-Type": "application/json",
  };
  const requestOptions: RequestInit = {
    mode: "cors",
    credentials: "include",
    method: "GET",
    headers,
  };
  return httpMethod(endpoint, requestOptions);
};

const getPolls = (pollArgs: {
  encryptedEmailID: string;
  token: string;
}): Promise<HttpResponse> => {
  const { encryptedEmailID, token } = pollArgs;
  const endpoint = `${URL}/pollster/${encryptedEmailID}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const requestOptions: RequestInit = {
    mode: "cors",
    credentials: "include",
    method: "GET",
    headers,
  };
  return httpMethod(endpoint, requestOptions);
};

const createPoll = (pollArgs: {
  poll: RocketMeetPoll;
  token: string;
}): Promise<HttpResponse> => {
  const { poll, token } = pollArgs;
  const endpoint = `${URL}/pollster/poll`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const requestOptions: RequestInit = {
    mode: "cors",
    credentials: "include",
    method: "POST",
    headers,
    body: JSON.stringify(poll),
  };
  return httpMethod(endpoint, requestOptions);
};

const markChoicesPublic = (voteArgs: {
  newVote: Vote;
  pollID: string;
}): Promise<HttpResponse> => {
  const { newVote, pollID } = voteArgs;
  const endpoint = `${URL}/poll/public/${pollID}`;
  const headers = {
    "Content-Type": "application/json",
  };
  const requestOptions: RequestInit = {
    mode: "cors",
    credentials: "include",
    method: "PUT",
    headers,
    body: JSON.stringify(newVote),
  };
  return httpMethod(endpoint, requestOptions);
};

const markChoicesProtected = (voteArgs: {
  newVote: Vote;
  pollID: string;
  token: string;
}): Promise<HttpResponse> => {
  const { newVote, pollID, token } = voteArgs;
  const endpoint = `${URL}/poll/protected/${pollID}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const requestOptions: RequestInit = {
    mode: "cors",
    credentials: "include",
    method: "PUT",
    headers,
    body: JSON.stringify(newVote),
  };
  return httpMethod(endpoint, requestOptions);
};

const markFinalChoice = (voteArgs: {
  finalChoice: { finalChoice: Choice | undefined; open: boolean };
  pollID: string;
  token: string;
}): Promise<HttpResponse> => {
  const { finalChoice, pollID, token } = voteArgs;
  const endpoint = `${URL}/pollster/poll/${pollID}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const requestOptions: RequestInit = {
    mode: "cors",
    credentials: "include",
    method: "PUT",
    headers,
    body: JSON.stringify(finalChoice),
  };
  return httpMethod(endpoint, requestOptions);
};

const deletePoll = (voteArgs: {
  pollID: string;
  token: string;
}): Promise<HttpResponse> => {
  const { pollID, token } = voteArgs;
  const endpoint = `${URL}/pollster/poll/${pollID}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const requestOptions: RequestInit = {
    mode: "cors",
    credentials: "include",
    method: "DELETE",
    headers,
    body: JSON.stringify(voteArgs),
  };
  return httpMethod(endpoint, requestOptions);
};

export {
  getPoll,
  getPolls,
  createPoll,
  markChoicesPublic,
  markChoicesProtected,
  markFinalChoice,
  deletePoll,
};
