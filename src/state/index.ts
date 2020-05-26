import { createStore, combineReducers } from "redux"
import playedCards from "./reducers/playedCards"
import turnInfo from "./reducers/turnInfo"
import flags from "./reducers/flags"

const reducer = combineReducers({
	playedCards,
	turnInfo,
	flags,
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
