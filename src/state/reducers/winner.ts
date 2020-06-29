import { Win, ActionType, Action } from "../actions"

export type WinnerState = number | null

const defaultState: WinnerState = null
export default function winner(state: WinnerState = defaultState, action: Action) {
	if (action.type === ActionType.Win) {
		return action.payload
	} else {
		return state
	}
}
