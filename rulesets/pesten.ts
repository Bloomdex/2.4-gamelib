import GameRules from "../src/GameRules"
import { withJokers } from "./normalCards"
import clone from "clone-deep"
import { EffectType } from "../src/effects"

const Pesten: GameRules = {
	cards: clone(withJokers).map((card) => {
		const { tags, effects, options } = card
		if (tags[0] === "J") {
			options.push({
				question: "What suit?",
				choices: withJokers
					.map((c) => c.tags[1])
					.reduce<string[]>((acc, curr) => (acc.includes(curr) ? acc : [...acc, curr]), []),
			})
			effects.push({
				type: EffectType.TagOverride,
				override: [tags[1], "some other tag"],
			})
		}
		return card
	}),
	minPlayers: 2,
	startingCards: 7,
}
