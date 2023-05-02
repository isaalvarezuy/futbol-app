import { SelectOption } from "../components/SelectOption";

export interface IAddGameForm {
  team1GoalAmount: string;
  team1: SelectOption;
  team1GoalScorers: ITeamGoalScorer[];
  team2GoalScorers: ITeamGoalScorer[];
  team2: SelectOption;
  team2GoalAmount: string;
}

export interface ITeamGoalScorer {
  player: SelectOption;
  amount: string;
}
