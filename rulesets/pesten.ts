import GameRules from "../src/GameRules"
import { withJokers } from "./normalCards"

const Pesten: GameRules = {
	cards: withJokers,
	minPlayers: 2,
	startingCards: 7,
}
