import { Card } from "./Card"

export default abstract class Player {
	cards: Card[] = []

	giveCard(card: Card): void {
		this.cards.push(card)
	}

	abstract async getNextAction(possible: Action[]): Promise<number>
}
