import Card from "./Card"
import Action from "./Action"

export default abstract class Player {
	cards: Card[] = []

	giveCard(card: Card): void {
		this.cards.push(card)
	}

	abstract async getNextAction(possible: Action[]): Promise<number>
}
