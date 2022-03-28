import { Poll, Vote, HttpResponse, Time } from "../../models/poll";

const NEXT_PUBLIC_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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
  pollID: string | string[] | null | undefined,
  cookie = ""
): Promise<HttpResponse> => {
  const endpoint = `${NEXT_PUBLIC_BASE_URL}/api/poll/${pollID}`;
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie,
    },
  };
  return httpMethod(endpoint, requestOptions);
};

const createPoll = (pollArgs: { poll: Poll }): Promise<HttpResponse> => {
  const { poll } = pollArgs;
  const endpoint = `${NEXT_PUBLIC_BASE_URL}/api/admin/poll/create`;
  const requestOptions: RequestInit = {
    method: "POST",
    body: JSON.stringify(poll),
  };
  return httpMethod(endpoint, requestOptions);
};

const markTimes = (voteArgs: {
  newVote: Vote;
  pollID: string;
}): Promise<HttpResponse> => {
  const { newVote, pollID } = voteArgs;
  const endpoint = `${NEXT_PUBLIC_BASE_URL}/api/voter/poll/${pollID}`;
  const requestOptions: RequestInit = {
    method: "PUT",
    body: JSON.stringify(newVote),
  };
  return httpMethod(endpoint, requestOptions);
};

const markFinalTime = (voteArgs: {
  finalTime: { finalTime: Time | undefined; open: boolean };
  pollID: string;
}): Promise<HttpResponse> => {
  const { finalTime, pollID } = voteArgs;
  const endpoint = `${NEXT_PUBLIC_BASE_URL}/api/admin/poll/${pollID}`;
  const requestOptions: RequestInit = {
    method: "PUT",
    body: JSON.stringify(finalTime),
  };
  return httpMethod(endpoint, requestOptions);
};

const getPolls = (cookie = ""): Promise<HttpResponse> => {
  const endpoint = `${NEXT_PUBLIC_BASE_URL}/api/admin/poll/getAll`;
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie,
    },
  };
  return httpMethod(endpoint, requestOptions);
};

const deletePoll = (deleteArgs: { pollID: string }): Promise<HttpResponse> => {
  const { pollID } = deleteArgs;
  const endpoint = `${NEXT_PUBLIC_BASE_URL}/api/admin/poll/${pollID}`;
  const requestOptions: RequestInit = {
    method: "DELETE",
  };
  return httpMethod(endpoint, requestOptions);
};

const signupUser = (newUser: {
  username: string;
  email: string;
  password: string;
}): Promise<HttpResponse> => {
  const endpoint = `${NEXT_PUBLIC_BASE_URL}/api/auth/signup`;
  const requestOptions: RequestInit = {
    method: "POST",
    body: JSON.stringify(newUser),
  };
  return httpMethod(endpoint, requestOptions);
};

export {
  getPoll,
  createPoll,
  markTimes,
  markFinalTime,
  deletePoll,
  signupUser,
  getPolls,
};
