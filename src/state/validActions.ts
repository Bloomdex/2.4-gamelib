import { ActionType, Action } from "./actions"
import { State } from "./index"
import {} from "../../rulesets/pesten"
import { Card } from "../Card"

/**
 * Calculate all possible actions for a player
 * @param state the base state to advance from
 * @returns Action[] of possible actions for the player
 */
export default function getValidActions(state: State): Action[] {
	const currentplayerHand = state.cards.hands[state.turnInfo.current]
	const lastPlayedCard = state.cards.played[state.cards.played.length - 1]

	const activeTags = lastPlayedCard.tags
	const { tagOverride } = state.flags
	if (tagOverride != null) {
		if (tagOverride[0] != null) {
			activeTags[tagOverride[0]] = tagOverride[1]
		} else {
			activeTags.push(tagOverride[1])
		}
	}

	const playableCards = currentplayerHand.filter((card) => {
		for (const tag of card.tags) {
			if (activeTags.includes(tag)) {
				return true
			}
		}
		return false
	})

	const possibleActions: Action[] = []

	// Convert all the possible cards to actions
	for (const card of playableCards) {
		if (Object.keys(card.options).length === 0) {
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

	// Return the possible actions
	return possibleActions

	// Jack is handed off to UI with all 4 possible effects as a possible action
	// UI let's the user pick an effect
	// UI turns the Jack into a playcard action with the right effect
}
