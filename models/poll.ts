export interface MarkedProps {
  userID: string;
  choices: number[];
}

export interface PollFromDBProps {
  _id: string;
  name: string;
  description?: string;
  open?: boolean;
  userID: string;
  interval: number;
  choices: number[];
  finalChoice?: number;
  marked?: MarkedProps[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
