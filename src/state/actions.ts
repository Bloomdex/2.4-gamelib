enum ActionTypes {
	Next,
	Skip,

	SetTotal,
}

export type NextAction = {
	type: ActionTypes.Next
}

export type SkipAction = {
	type: ActionTypes.Skip
}

export type SetTotalAction = {
	type: ActionTypes.SetTotal
	payload: number
}
