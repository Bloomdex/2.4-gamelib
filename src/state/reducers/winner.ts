import { Win, ActionType } from "../actions"

type Action = Win

export type WinnerState = number | null

const defaultState: WinnerState = null
export default function winner(state: WinnerState = defaultState, action: Action) {
	if (action.type === ActionType.Win) {
		return action.payload
	} else {
		return state
	}
}
