import Card from "./Card"

export enum ActionType {
	Card = "CARD",
	Skip = "SKIP",
	Button = "BUTTON",
}

export default interface Action {
	type: ActionType
}

export interface CardAction extends Action {
	type: ActionType.Card
	card: Card
}
