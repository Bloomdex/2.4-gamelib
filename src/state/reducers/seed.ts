import { Initialise, ActionType, RefillStack } from "../actions"

// actions that are used in this reducer
type Action = Initialise | RefillStack

type SeedState = {
	seed: string
	useCounter: number
}

// Reducer to keep track of global flags
export default function seed(state: SeedState, action: Action) {
	switch (action.type) {
		case ActionType.Initialise:
			return {
				seed: action.payload.seed,
				useCounter: 0,
			}
		case ActionType.RefillStack:
			return {
				...state,
				useCounter: state.useCounter + 1,
			}
		default:
			return state
	}
}
