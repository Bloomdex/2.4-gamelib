import { ActionType, Action } from "./actions"
import { RootState } from "./index"
import {} from "../../rulesets/pesten"
import { Card } from "../Card"
import { resolveActiveTags } from "../util"
import { EffectType, effectUtil } from "../effects"
import { drawCard } from "./reducers/cards"

export const cardIsPlayable = (activeTags: string[]) => (card: Card) => {
	// No playableOnTags
	if (card.playableOnTags == null || card.playableOnTags.length === 0) {
		for (const tag of card.tags) {
			if (activeTags.includes(tag)) {
				return true
			}
		}
	} else { // Using playableOnTags
		for (const tag of card.playableOnTags) {
			if (activeTags.includes(tag)) {
				return true
			}
		}
	}
	return false
}

/**
 * Calculate all possible actions for a player
 * @param state the base state to advance from
 * @returns Action[] of possible actions for the player
 */
export default function getValidActions(state: RootState): Action[] {
	const currentplayerHand = state.cards.hands[state.turnInfo.current]
	const activeTags = resolveActiveTags(state)

	// WITHOUT playableOnTags
	// const playableCards = currentplayerHand.filter(card => {
	// 	for (const tag of card.tags) {
	// 		if (activeTags.includes(tag)) {
	// 			return true
	// 		}
	// 	}
	// 	return false
	// })

	const playableCards = currentplayerHand.filter(cardIsPlayable(activeTags))

	const possibleActions: Action[] = []

	const cardDrawUtil = effectUtil(EffectType.DrawCard)
	let canDraw = true

	// Convert all the possible cards to actions
	for (const card of playableCards) {

		if (card.options == null || Object.keys(card.options).length === 0) {
			possibleActions.push({
				type: ActionType.PlayCard,
				payload: card,
				options: {},
			})
		} else {
			for (const [optionId, option] of Object.entries(card.options)) {
				for (const choice of option.choices) {
					possibleActions.push({
						type: ActionType.PlayCard,
						payload: card,
						options: { [optionId]: choice }, //TODO: add all options and all choice combinations
					})
				}
			}
		}
	}

	// Add the skip action to the possibilities
	possibleActions.push({
		type: ActionType.Skip,
	})

	// // TODO: Only send this when neccesary
	// // Add the skip action to the possibilities
	// possibleActions.push({
	// 	type: ActionType.Draw,
	// })

	// Return the possible actions
	return possibleActions
}
