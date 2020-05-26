import { Card } from "../../Card"
import { PlayCard, ActionType } from "../actions"

// actions that are used in this reducer
type Action = PlayCard

type State = Card[]

export default function playedCards(state: State = [], action: Action): State {
	switch (action.type) {
		case ActionType.PlayCard:
			return [...state, action.payload]
		default:
			return state
	}
}
