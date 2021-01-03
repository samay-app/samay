export interface Vote {
  userID: string;
  choices: Choice[];
}

export interface Choice {
  start: number;
  end: number;
}

export interface Poll {
  title: string;
  description?: string;
  open?: boolean;
  userID: string;
  choices: Choice[];
  finalChoice?: Choice;
  marked?: Vote[];
}

export interface PollFromDB {
  _id: string;
  title: string;
  description?: string;
  open?: boolean;
  userID: string;
  choices: Choice[];
  finalChoice?: Choice;
  marked?: Vote[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
