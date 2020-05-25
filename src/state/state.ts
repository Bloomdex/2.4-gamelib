import { createStore, combineReducers } from "redux"
import playedCards from "./playedCards"
import currentPlayer from "./currentPlayer"

const reducer = combineReducers({
	thecardsthathavebeenplayed: playedCards,
	currentPlayer: currentPlayer,
})

const store = createStore(reducer)

export default store

/*
state is now:

{
	playedCards: [],
	currentPlayer: {
		current: number,
		total: number
	}
}
*/
