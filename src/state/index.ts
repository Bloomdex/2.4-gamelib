import { createStore, AnyAction, Reducer } from "redux"
import playedCardsReducer from "./reducers/cards"
import turnInfoReducer from "./reducers/turnInfo"
import flagsReducer from "./reducers/flags"

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

const createGame = () => createStore(reducer)

export default createGame
export type State = ReturnType<ReturnType<typeof createGame>["getState"]>

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
