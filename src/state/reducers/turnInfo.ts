import { SetTotalPlayers, Skip, PlayCard, ActionType } from "../actions"
import { EffectType } from "../../effects"

type Action = SetTotalPlayers | Skip | PlayCard

enum PlayOrder {
	Normal,
	Reversed,
}

type State = {
	current: number
	total: number | null
	playOrder: PlayOrder
}

const defaultState = { current: 0, total: null, playOrder: PlayOrder.Normal }

export default function turnInfo(state: State = defaultState, action: Action) {
	switch (action.type) {
		case ActionType.SetTotalPlayers:
			if (state.total == null) {
				return {
					...state,
					total: action.payload,
				}
			} else {
				throw new Error("Cannot set total a second time")
			}
		case ActionType.PlayCard:
			const { payload: card } = action
			let turnModified = false
			let newState = state
			for (const effect of card.effects) {
				switch (effect.type) {
					case EffectType.ReversePlayOrder:
						newState = {
							...newState,
							playOrder: switchPlayOrder(newState.playOrder),
						}
						break
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
			break

		default:
			return state
	}
}

const advancedToPlayer = (state: State, offset = 1): State => {
	if (state.total != null) {
		const realOffset = offset * state.playOrder === PlayOrder.Normal ? 1 : -1
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
