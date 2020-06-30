import { EffectType, TagOverride, effectUtil, DrawCard } from "../../effects"
import { PlayCard, ActionType, Action } from "../actions"
import { resolveOptions } from "../../Card"

const tagOverrrideUtil = effectUtil(EffectType.TagOverride)
const cardDrawUtil = effectUtil(EffectType.DrawCard)

// actions that are used in this reducer

type FlagsState = {
	tagOverride: TagOverride["override"] | null
	cardDrawCounter: DrawCard["cards"] | null
}

const defaultState = {
	tagOverride: null,
	cardDrawCounter: null,
}

// Reducer to keep track of global flags
export default function flags(state: FlagsState = defaultState, action: Action): FlagsState {
	switch (action.type) {
		case ActionType.PlayCard:
			let { payload: card } = action
			card = resolveOptions(card, action.options)
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
			
			if (cardDrawUtil.has(card)) {
				if (newState.cardDrawCounter == null) {
					newState = {
						...newState,
						cardDrawCounter: cardDrawUtil.get(card)!.cards,
					}
				} else {
					newState = {
						...newState,
						cardDrawCounter: newState.cardDrawCounter + cardDrawUtil.get(card)!.cards,
					}
				}
			} else {
				newState = {
					...newState,
					cardDrawCounter: null,
				}
			}
			return newState
		case ActionType.Draw:
		case ActionType.Skip:
			return {
				...state,
				cardDrawCounter: null,
			}
		default:
			return state
	}
}
