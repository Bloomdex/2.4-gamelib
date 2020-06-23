import { Card, cardEquals } from "../../Card"
import { PlayCard, Initialise, ActionType } from "../actions"
import { RootState } from ".."

// actions that are used in this reducer
type Action = PlayCard | Initialise

type CardsState = {
	played: Card[]
	remaining: Card[]
	hands: Card[][]
}

const defaultState: CardsState = {
	played: [],
	remaining: [],
	hands: [],
}

// Reducer that handles keeping track of cards, in both piles and hands
export default function cards(state: CardsState = defaultState, action: Action, root: RootState): CardsState {
	switch (action.type) {
		// Hand out cards to each player, from the draw pile, after shuffling it.
		case ActionType.Initialise:
			const remaining = [...action.payload.cardsInRandomOrder]
			const hands = new Array(action.payload.players).map(() => [])
			for (let j = 0; j < action.payload.gameRules.startingCards; j++) {
				for (let i = 0; i < action.payload.players; i++) {
					const nextCard = remaining.shift()
					if (nextCard != null) {
						hands[i].push()
					} else {
						throw new Error("Not enough cards to hand out")
					}
				}
			}
			return {
				played: [],
				remaining,
				hands,
			}
		// Play a card from the players hand
		case ActionType.PlayCard:
			return {
				...state,
				played: [...state.played, action.payload],
				hands: state.hands.map((hand, playerIndex) => {
					if (playerIndex === root.turnInfo.current) {
						return hand.filter((card) => !cardEquals(card, action.payload))
					} else {
						return hand
					}
				}),
			}
		default:
			return state
	}
}
