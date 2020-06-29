import { createStore, Reducer, applyMiddleware } from "redux"
import playedCardsReducer from "./reducers/cards"
import turnInfoReducer from "./reducers/turnInfo"
import flagsReducer from "./reducers/flags"
import seedReducer from "./reducers/seed"
import winnerReducer from "./reducers/winner"
import { Initialise, ActionType } from "./actions"
import { checkCardTags, checkWinner } from "./middlewares"

// const reducer = combineReducers({
// 	playedCards,
// 	turnInfo,
// 	flags,
// })

export type RootState = {
	cards: ReturnType<typeof playedCardsReducer>
	turnInfo: ReturnType<typeof turnInfoReducer>
	flags: ReturnType<typeof flagsReducer>
	seed: ReturnType<typeof seedReducer>
	winner: ReturnType<typeof winnerReducer>
}

const reducer: Reducer<RootState, any> = (state, action) => ({
	cards: playedCardsReducer(state?.cards, action, state as RootState),
	turnInfo: turnInfoReducer(state?.turnInfo, action),
	flags: flagsReducer(state?.flags, action),
	seed: seedReducer(state?.seed!, action, state as RootState),
	winner: winnerReducer(state?.winner, action),
})

const middleware = applyMiddleware(checkCardTags, checkWinner)

const createGame = (options: Initialise["payload"]) => {
	const store = createStore(reducer, middleware)
	store.dispatch({
		type: ActionType.Initialise,
		payload: options,
	})
	return store
}

export const restoreGame = (existingState: RootState) => createStore(reducer, existingState, middleware)

export default createGame
export type State = ReturnType<ReturnType<typeof createGame>["getState"]>
