// TODO: ensure that an action is valid
import { Middleware } from "redux"
import { RootState } from "."
import { ActionType, Action } from "./actions"
import { resolveActiveTags } from "../util"
import { cardIsPlayable } from "./validActions"
export const checkCardTags: Middleware<{}, RootState> = store => next => (action: Action) => {
	if (action.type === ActionType.PlayCard) {
		const activeTags = resolveActiveTags(store.getState())

		if (cardIsPlayable(activeTags)(action.payload)) {
			next(action)
		} else {
			throw new Error(`Cannot play card ${action.payload}`)
		}
	} else {
		next(action)
	}
}

export const logger: Middleware<{}, RootState> = store => next => (action: Action) => {
	console.log("DISPATHED ACTION", JSON.stringify(action, null, 2))
	next(action)
}

export const checkWinner: Middleware<{}, RootState> = store => next => (action: Action) => {
	next(action)
	if (action.type !== ActionType.Win) {
		for (let i = 0; i < store.getState().cards.hands.length; i++) {
			const hand = store.getState().cards.hands[i]

			if (hand.length === 0) {
				store.dispatch({
					type: ActionType.Win,
					payload: i,
				})
				break
			}
		}
	}
}
