import { EffectType, TagOverride, effectUtil } from "../../effects"
import { PlayCard, ActionType } from "../actions"
import { RootState } from ".."

const tagOverrrideUtil = effectUtil(EffectType.TagOverride)

// actions that are used in this reducer
type Action = PlayCard

type FlagsState = {
	tagOverride: TagOverride["override"] | null
}

const defaultState = {
	tagOverride: null,
}

// Reducer to keep track of global flags
export default function flags(state: FlagsState = defaultState, action: Action): FlagsState {
	switch (action.type) {
		case ActionType.PlayCard:
			const { payload: card } = action
			let newState = state
			if (tagOverrrideUtil.has(card)) {
				const tagOverride = tagOverrrideUtil.get(card)!
				newState = {
					...newState,
					tagOverride: tagOverride.override,
				}
			} else {
				newState = {
					...newState,
					tagOverride: null,
				}
			}
			return newState
		default:
			return state
	}
}
