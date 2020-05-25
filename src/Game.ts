import Card from "./Card"
import Player from "./Player"
import GameRules, { FullGameRules } from "./GameRules"
import { shuffle, repeat } from "./util"

export default class Game {
	remainingCards: Card[]
	playedCards: Card[] = []
	players: Player[]

	rules: FullGameRules

	private currentPlayerIndex: number = 0

	get currentPlayer(): Player {
		return this.players[this.currentPlayerIndex]
	}

	constructor(rules: GameRules, players: Player[]) {
		this.rules = Game.resolveFullRules(rules)
		this.remainingCards = shuffle(this.rules.cards)
		this.players = players
		if (this.players.length > this.rules.maxPlayers) {
			throw new Error("More players specified than allowed")
		}

		this.handoutStartingCards()
	}

	private handoutStartingCards(): void {
		for (const player of this.players) {
			for (let i = 0; i < this.rules.startingCards; ) {
				if (this.remainingCards.length === 0) {
					throw new Error("Not enough cards in deck to give all players a starting hand")
				} else {
					player.giveCard(this.remainingCards.shift() as Card)
				}
			}
		}
	}

	async turn(): Promise<void> {
		// calculate possible actions
		// ask for action from player
		// check action effects
		// if: action ends turn -> end
		// else: loop
	}

	static resolveFullRules(rules: GameRules): FullGameRules {
		const copy = { ...rules }
		if (!copy.maxPlayers) {
			copy.maxPlayers = Math.floor(copy.cards.length / copy.startingCards)
		}

		if (!copy.startWithOpenCard) {
			copy.startWithOpenCard = true
		}

		return copy as FullGameRules
	}
}

//  Mensen hebben een hand
//  Drawpile
//  Gespeelde kaarten
//
//  = Pesten

// Stap 1: Deel kaarten uit
// Stap 2: Speler speelt een kaart
