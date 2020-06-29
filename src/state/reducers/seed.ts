import { Initialise, ActionType, RefillStack, Skip } from "../actions"
import { RootState } from ".."

// actions that are used in this reducer
type Action = Initialise | RefillStack | Skip

export type SeedState = {
	seed: string
	useCounter: number
}

// Reducer to keep track of global flags
export default function seed(state: SeedState, action: Action, root: RootState) {
	switch (action.type) {
		case ActionType.Initialise:
			return {
				seed: action.payload.seed,
				useCounter: 0,
			}
		case ActionType.Skip:
			if (root.cards.remaining.length === 1) {
				return {
					...state,
					useCounter: state.useCounter + 1,
				}
			} else {
				return state
			}
		default:
			return state
	}
}
