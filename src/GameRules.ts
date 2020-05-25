import Card from "./Card"

export default interface GameRules {
	cards: readonly Card[]
	minPlayers: number
	maxPlayers?: number
	startingCards: number // The amount of cards a player starts with in their hand

	startWithOpenCard?: boolean // Does the game start with an open card on the played cards pile?
}

export interface FullGameRules extends GameRules {
	maxPlayers: number
}
