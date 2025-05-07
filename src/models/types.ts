
export type Language = 'en' | 'ar';

export interface Competitor {
  id: string;
  name: string;
  average: number | string;
  solves: (number | string)[];
  best?: number | string;
}

export interface Event {
  id: string;
  name: string;
  code: string;
  active: boolean;
}

export type CompetitionStatusType = 'not-started' | 'in-progress' | 'finished';
