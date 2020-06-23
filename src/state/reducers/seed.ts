import { Initialise, ActionType } from "../actions"

// actions that are used in this reducer
type Action = Initialise

type SeedState = (() => number) | null

const defaultState = null

// Reducer to keep track of global flags
export default function seed(state: SeedState = defaultState, action: Action) {
	if (action.type === ActionType.Initialise) {
		return action.payload.seed
	} else {
		return state
	}
}
