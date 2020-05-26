import { Card } from "../Card"

export enum ActionType {
	SetTotalPlayers,
	PlayCard,
	Skip,
}

//export type Action = SetTotalPlayers | PlayCard | Skip

export type SetTotalPlayers = {
	type: ActionType.SetTotalPlayers
	payload: number
}

export type PlayCard = {
	type: ActionType.PlayCard
	payload: Card
	options: []
}

export type Skip = {
	type: ActionType.Skip
}

const resolveEffectFromOptions = (card: Card, optionValues: string[]) => {}
