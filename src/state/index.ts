import { createStore, AnyAction, Reducer } from "redux"
import playedCardsReducer from "./reducers/cards"
import turnInfoReducer from "./reducers/turnInfo"
import flagsReducer from "./reducers/flags"
import { Action } from "./actions"

// const reducer = combineReducers({
// 	playedCards,
// 	turnInfo,
// 	flags,
// })

export type RootState = {
	cards: ReturnType<typeof playedCardsReducer>
	turnInfo: ReturnType<typeof turnInfoReducer>
	flags: ReturnType<typeof flagsReducer>
}

const reducer: Reducer<RootState, any> = (state, action) => ({
	cards: playedCardsReducer(state?.cards, action, state as RootState),
	turnInfo: turnInfoReducer(state?.turnInfo, action),
	flags: flagsReducer(state?.flags, action),
})

const store = createStore(reducer)

export default store
export type State = ReturnType<typeof store.getState>

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
