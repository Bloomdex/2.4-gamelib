import { ActionType, Action } from "./actions"
import { State } from "./index"
import {} from "../../rulesets/pesten"

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
	const possibleActions = playableCards.map()

	// Jack is handed off to UI with all 4 possible effects as a possible action
	// UI let's the user pick an effect
	// UI turns the Jack into a playcard action with the right effect
}
