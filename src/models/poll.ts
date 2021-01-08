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
  emailID: string; // encrypted email ID
  choices: Choice[];
  finalChoice?: Choice;
  votes?: Vote[];
}

export interface RocketMeetPollFromDB {
  _id: string;
  title: string;
  description?: string;
  open?: boolean;
  emailID: string; // encrypted email ID
  choices: ChoiceFromDB[];
  finalChoice?: ChoiceFromDB;
  votes?: VoteFromDB[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface MailerArgs {
  pollid: string;
  receiverIDs: string[],
  senderID: string
}
