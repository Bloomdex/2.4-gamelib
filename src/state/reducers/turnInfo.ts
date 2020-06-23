import { Initialise, Skip, PlayCard, ActionType } from "../actions"
import { EffectType } from "../../effects"
import { resolveOptions } from "../../Card"

type Action = Initialise | Skip | PlayCard

enum PlayOrder {
	Normal = 1,
	Reversed = -1,
}

type TurnInfoState = {
	current: number
	total: number | null
	playOrder: PlayOrder
}

const defaultState = { current: 0, total: null, playOrder: PlayOrder.Normal }

// Reducer that keeps track of the turns
export default function turnInfo(state: TurnInfoState = defaultState, action: Action): TurnInfoState {
	switch (action.type) {
		// Initialise the playercount
		case ActionType.Initialise:
			if (state.total == null) {
				return {
					...state,
					total: action.payload.players,
				}
			} else {
				throw new Error("Cannot set total a second time")
			}
		// When playing a card, handle progressing the turn
		case ActionType.PlayCard:
			let { payload: card } = action
			card = resolveOptions(card, action.options)
			let turnModified = false
			let newState = state
			for (const effect of card.effects) {
				switch (effect.type) {
					// Reverse the turn order
					case EffectType.ReversePlayOrder:
						newState = {
							...newState,
							playOrder: switchPlayOrder(newState.playOrder),
						}
						break
					// Modify the current turn, for example by skipping a player
					case EffectType.TurnModifier:
						newState = advancedToPlayer(newState, effect.turns)
						turnModified = true
						break
				}
			}
			if (!turnModified) {
				// if the card had no TurnModifier, advance to the next player normally
				newState = advancedToPlayer(newState)
			}
			return newState
		default:
			return state
	}
}

/**
 * Calculate a next state where the currentplayer is advanced from a base state
 * @param state the base state to advance from
 * @param offset the amount of turns to advance, 1 means next player, 0 means stay at the current player, 2 means skip next
 */
const advancedToPlayer = (state: TurnInfoState, offset = 1): TurnInfoState => {
	if (state.total != null) {
		const realOffset = offset * state.playOrder
		let { current } = state
		current = (current + realOffset) % state.total
		if (current < 0) {
			current = state.total - current
		}
		return {
			...state,
			current,
		}
	} else {
		throw new Error("Cannot advance to next player without knowing total amount of players")
	}
}

const switchPlayOrder = (order: PlayOrder) => (order === PlayOrder.Normal ? PlayOrder.Reversed : PlayOrder.Normal)
