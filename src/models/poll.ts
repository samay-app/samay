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

export interface PieObj {
  [key: string]: {
    start: number;
    end: number;
    voters: string[];
  };
}
export interface DataSetArgs {
  label: string;
  data: number[];
  backgroundColor: string[];
}
export interface ChartDataArgs {
  labels: string[];
  datasets: DataSetArgs[];
}
export interface ChartTooltipItem {
  label?: string;
  value?: string;
  xLabel?: string | number;
  yLabel?: string | number;
  datasetIndex: number;
  index: number;
  x?: number;
  y?: number;
}
