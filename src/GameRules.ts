import { Card } from "./Card"

export default interface GameRules {
	cards: Card[]
	minPlayers: number
	maxPlayers?: number
	startingCards: number // The amount of cards a player starts with in their hand
}

export interface FullGameRules extends GameRules {
	maxPlayers: number
}
