import { Card } from "../Card"
import GameRules from "../GameRules"
import random from "seed-random"

export enum ActionType {
	Initialise,
	PlayCard,
	Skip,
	RefillStack,
}

export type Action = PlayCard | Skip | RefillStack

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

export type RefillStack = {
	type: ActionType.RefillStack
	payload: Card[]
}
