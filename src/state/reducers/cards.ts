import { Card, cardEquals } from "../../Card"
import { PlayCard, Initialise, ActionType, Skip, Action } from "../actions"
import { RootState } from ".."
import { shuffle, rotateArray } from "../../util"
import { effectUtil, EffectType, PassHandsAlong } from "../../effects"
import turnInfo from "./turnInfo"

// actions that are used in this reducer

type CardsState = {
	played: Card[]
	remaining: Card[]
	hands: Card[][]
	seed: SeedState
}

export type SeedState = {
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
				newState = drawCard(newState, root.turnInfo.current, root.flags.cardDrawCounter)
			}

			let card = action.payload
			if (card.effects != null) {
				for (const effect of card.effects) {
					switch (effect.type) {
						// Reverse the turn order
						case EffectType.PassHandsAlong:
							if (newState.hands.length > 1) {
								newState = passHandsAlong(newState, effect.steps)
							}
							break
					}
				}
			}

			return {
				...newState,
				played: [...newState.played, action.payload],
				hands: newState.hands.map((hand, playerIndex) => {
					if (playerIndex === root.turnInfo.current) {
						return hand.filter(card => !cardEquals(card, action.payload))
					} else {
						return hand
					}
				}),
			}

		case ActionType.Skip:
			if (root.flags.cardDrawCounter != null) {
				return drawCard(state, root.turnInfo.current, 1 + root.flags.cardDrawCounter)
			} else {
				return drawCard(state, root.turnInfo.current)
			}

		default:
			return state
	}
}

export function refillStack(state: CardsState): CardsState {
	return {
		...state,
		played: state.played.slice(-1),
		remaining: shuffle(state.seed, state.played.slice(0, -1)),
		seed: {
			...state.seed,
			useCounter: state.seed!.useCounter + 1,
		},
	}
}

export function drawCard(state: CardsState, handIndex: number, cardAmount: number = 1): CardsState {
	if (cardAmount > state.remaining.length) {
		const availableInStack = state.remaining.length
		let newState = drawCard(state, handIndex, availableInStack)
		newState = refillStack(newState)
		if (newState.remaining.length > 0) {
			newState = drawCard(newState, handIndex, cardAmount - availableInStack)
		}
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

export function passHandsAlong(state: CardsState, direction: number): CardsState {
	let hands: Card[][] = [...state.hands]

	hands = rotateArray(hands, direction)

	state = {
		...state,
		hands,
	}
	return state
}
