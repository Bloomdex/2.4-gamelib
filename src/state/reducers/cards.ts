import { Card, cardEquals } from "../../Card"
import { PlayCard, Initialise, ActionType, Skip } from "../actions"
import { RootState } from ".."
import { shuffle } from "../../util"
import { effectUtil, EffectType } from "../../effects"
import turnInfo from "./turnInfo"

// actions that are used in this reducer
type Action = PlayCard | Initialise | Skip

type CardsState = {
	played: Card[]
	remaining: Card[]
	hands: Card[][]
	seed: SeedState
}

type SeedState = {
	seed: string
	useCounter: number
}

const cardDrawUtil = effectUtil(EffectType.DrawCard)

const defaultState: CardsState = {
	played: [],
	remaining: [],
	hands: [],
	seed: {
		seed: "",
		useCounter: 0,
	},
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
			const firstCard = remaining.shift()
			if (firstCard == null) {
				throw new Error("Not enough cards to hand out")
			}
			return {
				played: [firstCard],
				remaining,
				hands,
				seed: {
					seed: action.payload.seed,
					useCounter: 0,
				},
			}
		// Play a card from the players hand
		case ActionType.PlayCard:
			let newState = state
			if (!cardDrawUtil.has(action.payload) && root.flags.cardDrawCounter != null) {
				newState = drawCard(newState, root.turnInfo.current)
			}
			return {
				...newState,
				played: [...state.played, action.payload],
				hands: state.hands.map((hand, playerIndex) => {
					if (playerIndex === root.turnInfo.current) {
						return hand.filter(card => !cardEquals(card, action.payload))
					} else {
						return hand
					}
				}),
			}

		case ActionType.Skip:
			return drawCard(state, root.turnInfo.current)

		default:
			return state
	}
}

function refillStack(state: CardsState): CardsState {
	return {
		...state,
		played: state.played.slice(-1),
		remaining: shuffle(state.seed, state.remaining.slice(-1)),
		seed: {
			...state.seed,
			useCounter: state.seed!.useCounter + 1,
		},
	}
}

function drawCard(state: CardsState, handIndex: number, cardAmount: number = 1): CardsState {
	if (cardAmount > state.remaining.length) {
		const availableInStack = state.remaining.length
		let newState = drawCard(state, handIndex, availableInStack)
		newState = refillStack(newState)
		newState = drawCard(newState, handIndex, cardAmount - availableInStack)
		return newState
	} else {
		return {
			...state,
			hands: state.hands.map((hand, index) => {
				if (index === handIndex) {
					return [...hand, ...state.remaining.slice(0, cardAmount)]
				} else {
					return hand
				}
			}),
			remaining: state.remaining.slice(cardAmount),
		}
	}
}
