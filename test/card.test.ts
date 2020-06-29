import test from "ava"
import { v4 as uuid } from "uuid"
import { resolveOptions } from "../src/Card"
import cardsReducer, { refillStack } from "../src/state/reducers/cards"
import pesten from "../rulesets/pesten"
import { shuffle } from "../src/util"

test("resolveOptions not nested", t => {
	const optionA = uuid()

	const obj = {
		name: "obj",
		someProp: optionA,
	}

	const options = {
		[optionA]: "some value",
	}

	const resolved = resolveOptions(obj, options)

	t.deepEqual(resolved, { ...obj, someProp: "some value" })
})

test("resolveOptions nested", t => {
	const optionA = uuid()
	const optionB = uuid()

	const obj = {
		name: "obj",
		someProp: optionA,
		nested: {
			someProp: optionB,
		},
	}

	const options = {
		[optionA]: "some value",
		[optionB]: "Some other value",
	}

	const resolved = resolveOptions(obj, options)

	t.deepEqual(resolved, {
		...obj,
		someProp: "some value",
		nested: {
			someProp: "Some other value",
		},
	})
})

test("refillStack", t => {
	const state: ReturnType<typeof cardsReducer> = {
		hands: [pesten.cards.slice(0, 3), pesten.cards.slice(3, 5), pesten.cards.slice(5, 10)],
		played: pesten.cards.slice(10),
		remaining: [],
		seed: {
			seed: "A",
			useCounter: 0,
		},
	}

	const refilled = refillStack(state)

	t.is(pesten.cards.slice(10).length - 1, refilled.remaining.length)

	t.deepEqual(
		{
			...state,
			seed: {
				...state.seed,
				useCounter: state.seed.useCounter + 1,
			},
			played: state.played.slice(-1),
			// we can use shuffle here because the seed is exactly the same
			remaining: shuffle(state.seed, state.played.slice(0, -1)),
		},
		refilled,
	)
})
