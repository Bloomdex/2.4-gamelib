// TODO: ensure that an action is valid
import { Middleware } from "redux"
import { RootState } from "."
import { ActionType, Action } from "./actions"
import { shuffle, resolveActiveTags } from "../util"

export const checkEmptyStack: Middleware<{}, RootState> = (store) => (next) => (action: Action) => {
	next(action)
	if (store.getState().cards.remaining.length === 1 && action.type === ActionType.Skip) {
		store.dispatch({ type: ActionType.RefillStack })
	}
}

export const checkCardTags: Middleware<{}, RootState> = (store) => (next) => (action: Action) => {
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
