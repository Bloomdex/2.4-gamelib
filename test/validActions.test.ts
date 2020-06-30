import test from "ava"
import { Card } from "../src/Card"
import { cardIsPlayable } from "../src/state/validActions"
import cardsReducer, { refillStack, passHandsAlong } from "../src/state/reducers/cards"
import pesten from "../rulesets/pesten"
import flags from "../src/state/reducers/flags"
import RootState from "../src/state/index"

// test("pass", t => {
// 	t.pass()
// })

test("cardIsPlayable no playableOnTags", t => {
	
	const hand = [
		{
			id: "1",
			tags: ["1", "Hearts"],
		},
		{
			id: "2",
			tags: ["2", "Spades"],
		},
		{
			id: "3",
			tags: ["3", "Cloves"],
		},
	]
	const playableHand = [
		{
			id: "1",
			tags: ["1", "Hearts"],
		},
		{
			id: "2",
			tags: ["2", "Spades"],
		},
	]

	const tags: string[] = ["2", "Hearts"]
	
	const result = hand.filter(cardIsPlayable(tags))
	t.deepEqual(playableHand, result)
}) 