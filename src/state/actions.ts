import { Card } from "../Card"
import GameRules from "../GameRules"

export enum ActionType {
	Initialise,
	PlayCard,
	Skip,
}

export type Action = Initialise | PlayCard | Skip

export type Initialise = {
	type: ActionType.Initialise
	payload: {
		players: number
		gameRules: GameRules
		cardsInRandomOrder: Card[]
	}
}

export type PlayCard = {
	type: ActionType.PlayCard
	payload: Card
	options?: Record<symbol, any>
}

// TOOD: resolve options in middleware

export type Skip = {
	type: ActionType.Skip
}
