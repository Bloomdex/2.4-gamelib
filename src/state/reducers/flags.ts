import { EffectType, TagOverride, effectUtil } from "../../effects"
import { PlayCard, ActionType } from "../actions"

const tagOverrrideUtil = effectUtil(EffectType.TagOverride)

// actions that are used in this reducer
type Action = PlayCard

type State = {
	tagOverride: TagOverride["override"] | null
}

const defaultState = {
	tagOverride: null,
}

export default function flags(state: State = defaultState, action: Action): State {
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
