// https://www.transfermarkt.com/jonathan-calleri/leistungsdatendetails/spieler/284727/saison//verein/0/liga/0/wettbewerb//pos/0/trainer_id/0/plus/1

export type GoalkeeperStats = {
    goalsConced: number;
    cleanSheets: number;
  };
  
  export type ICompetition = {
    id: string;
    name: string;
  };
  
  export type IClub = {
    id: number;
    name: string;
  };
  
  export type ISeason = {
    year: number;
    name: string;
  };
  
  export type PlayerStats = {
    season: ISeason;
    competition: ICompetition;
    club: IClub;
    squad: number;
    apps: number;
    ppg: number; // Points per Game
    goals: number;
    assists?: number;
    ownGoals: number;
    substitutionsOn: number;
    substitutionsOff: number;
    yellowCard: number;
    secondYellowCard: number;
    redCard: number;
    penaltyGoal?: number;
    minutesPerGoal?: number;
    minutesPlayed: number;
    goalkeeperStats?: GoalkeeperStats;
  };