import { NextAction, SkipAction, SetTotalAction } from "./actions"

type Action = NextAction | SkipAction | SetTotalAction

interface State {
	current: number
	total: number | null

	orderReversed: boolean
}

export default function currentPlayer(
	state: State = { current: 0, total: null, orderReversed: false },
	action: Action,
) {
	switch (action.type) {
		case ActionTypes.SetTotal:
			if (state.total == null) {
				return {
					...state,
					total: action.payload,
				}
			} else {
				throw new Error("Cannot set total a second time")
			}
		case ActionTypes.Next:
		case ActionTypes.Skip:
			if (state.total != null) {
				return {
					...state,
					current: (state.current + 1) % state.total,
				}
			} else {
				throw new Error("Cannot mutate current player without knowing total amount of players")
			}
		default:
			return state
	}
}
