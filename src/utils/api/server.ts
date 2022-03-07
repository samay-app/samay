import { Poll, Vote, HttpResponse, Choice } from "../../models/poll";

const BASE_URL = process.env.BASE_URL || "";

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
  const endpoint = `${BASE_URL}/api/poll/${pollID}`;
  const requestOptions: RequestInit = {
    method: "GET",
  };
  return httpMethod(endpoint, requestOptions);
};

const createPoll = (pollArgs: { poll: Poll }): Promise<HttpResponse> => {
  const { poll } = pollArgs;
  const endpoint = `${BASE_URL}/api/poll/create`;
  const requestOptions: RequestInit = {
    method: "POST",
    body: JSON.stringify(poll),
  };
  return httpMethod(endpoint, requestOptions);
};

const markChoices = (voteArgs: {
  newVote: Vote;
  pollID: string;
}): Promise<HttpResponse> => {
  const { newVote, pollID } = voteArgs;
  const endpoint = `${BASE_URL}/api/poll/${pollID}`;
  const requestOptions: RequestInit = {
    method: "PUT",
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
  const endpoint = `api/pollster/poll/${pollID}`;
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
  const endpoint = `api/pollster/poll/${pollID}`;
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

export { getPoll, createPoll, markChoices, markFinalChoice, deletePoll };
