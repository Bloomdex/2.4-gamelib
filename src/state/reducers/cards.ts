import { Card, cardEquals } from "../../Card"
import { PlayCard, Initialise, ActionType, Skip, RefillStack } from "../actions"
import { RootState } from ".."
import { shuffle } from "../../util"

// actions that are used in this reducer
type Action = PlayCard | Initialise | Skip | RefillStack

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
			const remaining = shuffle({ seed: action.payload.seed, useCounter: 0 }, action.payload.gameRules.cards)
			const hands: Card[][] = []
			for (let i = 0; i < action.payload.players; i++) {
				hands[i] = []
			}
			for (let j = 0; j < action.payload.gameRules.startingCards; j++) {
				for (let i = 0; i < action.payload.players; i++) {
					const nextCard = remaining.shift()
					if (nextCard != null) {
						hands[i].push(nextCard)
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
		//TODO: draw card when player skips
		case ActionType.Skip:
			return {
				...state,
				remaining: state.remaining.slice(1),
				hands: state.hands.map<Card[]>((hand, playerIndex) => {
					if (playerIndex === root.turnInfo.current) {
						return [...hand, ...state.remaining.slice(0, 1)]
					} else {
						return hand
					}
				}),
			}
		case ActionType.RefillStack:
			return {
				...state,
				played: state.played.slice(-1),
				remaining: shuffle(root.seed!, state.remaining.slice(-1)),
			}
		default:
			return state
	}
}
