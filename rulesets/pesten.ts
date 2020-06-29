import GameRules from "../src/GameRules"
import { withJokers } from "./normalCards"
import clone from "clone-deep"
import { EffectType } from "../src/effects"
import { v4 as uuid } from "uuid"

const tagOverrideOption = `tag-override-${uuid()}`

const pesten: GameRules = {
	cards: withJokers.map(card => {
		const { tags, effects, options, ...rest } = clone(card)
		switch (tags[0]) {
			case "7":
				effects!.push({ type: EffectType.TurnModifier, turns: 0 })
				break

			case "8":
				effects!.push({ type: EffectType.TurnModifier, turns: 2 })
				break
			case "J":
				effects!.push({ type: EffectType.TagOverride, override: [1, tagOverrideOption] })
				options![tagOverrideOption] = {
					choices: ["Clubs", "Diamonds", "Hearts", "Spades"],
				}
				break
			case "A":
				effects!.push({ type: EffectType.ReversePlayOrder })
				break
			case "2":
				effects!.push({ type: EffectType.DrawCard, cards: 2 })
				break
			case "Joker":
				effects!.push({ type: EffectType.DrawCard, cards: 5 })
				break
			case "10":
				effects!.push({ type: EffectType.PassHandsAlong, steps: 1 })
		}
		return { tags, effects, options, ...rest }
	}),
	minPlayers: 2,
	startingCards: 7,
}

export default pesten
