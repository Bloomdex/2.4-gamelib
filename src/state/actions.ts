import { Card } from "../Card"
import GameRules from "../GameRules"

export enum ActionType {
	Initialise = "INITIALISE",
	PlayCard = "PLAY_CARD",
	Skip = "SKIP",
	Win = "WIN",
	Draw = "DRAW",
}

export type Action = PlayCard | Skip | Win | Initialise | Draw

export type Initialise = {
	type: ActionType.Initialise
	payload: {
		players: number
		gameRules: GameRules
		seed: string
	}
}

export type PlayCard = {
	type: ActionType.PlayCard
	payload: Card
	options: Record<string, any>
}

// TOOD: resolve options in middleware

export type Skip = {
	type: ActionType.Skip
}

export type Win = {
	type: ActionType.Win
	payload: number // the index of the winning player
}

export type Draw = {
	type: ActionType.Draw
}