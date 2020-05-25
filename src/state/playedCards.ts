import Card from "../Card"

type Action = { type: "PLAY_CARD"; payload: Card }

export default function playedCards(state = [], action: Action) {
	switch (action.type) {
		case "PLAY_CARD":
			return [...state, action.payload]
		default:
			return state
	}
}
