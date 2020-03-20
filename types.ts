export type ChainLocation = {
  startTime: number;
  endTime: number;
  zone: string;
  userId?: string;
};

export type ChainUser = {
  userId?: string;
  pushToken?: string;
};
