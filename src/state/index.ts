import { createStore, AnyAction, Reducer, applyMiddleware } from "redux"
import playedCardsReducer from "./reducers/cards"
import turnInfoReducer from "./reducers/turnInfo"
import flagsReducer from "./reducers/flags"
import seedReducer from "./reducers/seed"
import { Initialise, ActionType } from "./actions"
import { checkCardTags, checkEmptyStack } from "./middlewares"

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
}

const reducer: Reducer<RootState, any> = (state, action) => ({
	cards: playedCardsReducer(state?.cards, action, state as RootState),
	turnInfo: turnInfoReducer(state?.turnInfo, action),
	flags: flagsReducer(state?.flags, action),
	seed: seedReducer(state?.seed, action),
})

const store = createStore(reducer)

const createGame = (options: Initialise["payload"]) => {
	const store = createStore(reducer, applyMiddleware(checkCardTags, checkEmptyStack))
	store.dispatch({
		type: ActionType.Initialise,
		payload: options,
	})
	return store
}

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
