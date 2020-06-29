// TODO: ensure that an action is valid
import { Middleware } from "redux"
import { RootState } from "."
import { ActionType, Action } from "./actions"
import { resolveActiveTags } from "../util"
export const checkCardTags: Middleware<{}, RootState> = store => next => (action: Action) => {
	if (action.type === ActionType.PlayCard) {
		const activeTags = resolveActiveTags(store.getState())

		// check if any of the tags match
		for (const tag of action.payload.tags) {
			if (activeTags.includes(tag)) {
				return next(action)
			}
		}
		throw new Error(`Cannot play card ${action.payload}`)
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
