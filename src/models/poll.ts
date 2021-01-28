export interface Vote {
  name: string;
  choices: Choice[];
}

export interface VoteFromDB {
  _id: string;
  name: string;
  choices: ChoiceFromDB[];
}

export interface Choice {
  start: number;
  end: number;
}

export interface ChoiceFromDB {
  _id: string;
  start: number;
  end: number;
}

export interface RocketMeetPoll {
  title: string;
  description?: string;
  open?: boolean;
  encryptedEmailID: string;
  choices: Choice[];
  finalChoice?: Choice;
  votes?: Vote[];
}

export interface RocketMeetPollFromDB {
  _id: string;
  title: string;
  description?: string;
  open?: boolean;
  encryptedEmailID: string;
  choices: ChoiceFromDB[];
  finalChoice?: ChoiceFromDB;
  votes?: VoteFromDB[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface MailerArgs {
  pollID: string;
  pollTitle: string;
  receiverIDs: string[];
  senderName: string;
  senderEmailID: string;
}

export interface HttpResponse {
  data: any;
  statusCode: number;
}
