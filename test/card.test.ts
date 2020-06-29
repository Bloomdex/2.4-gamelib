import test, { after } from "ava"
import { v4 as uuid } from "uuid"
import { resolveOptions } from "../src/Card"
import cardsReducer, { refillStack, passHandsAlong } from "../src/state/reducers/cards"
import pesten from "../rulesets/pesten"
import { shuffle, rotateArray } from "../src/util"
import { RootState, EffectType, restoreGame } from "../src"
import { PlayOrder } from "../src/state/reducers/turnInfo"
import { ActionType } from "../src/state/actions"

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

test("passHandsAlong positive step", t => {
	const preShuffle = [pesten.cards.slice(0, 3), pesten.cards.slice(3, 5), pesten.cards.slice(5, 10)]
	const afterShuffle = [pesten.cards.slice(5, 10), pesten.cards.slice(0, 3), pesten.cards.slice(3, 5)]

	const state: ReturnType<typeof cardsReducer> = {
		hands: preShuffle,
		played: pesten.cards.slice(10),
		remaining: [],
		seed: {
			seed: "A",
			useCounter: 0,
		},
	}

	const passedHandsAlong = passHandsAlong(state, 1)
	const result: ReturnType<typeof cardsReducer> = passedHandsAlong
	t.deepEqual(result.hands, afterShuffle)
})

test("passHandsAlong negative step", t => {
	const preShuffle = [pesten.cards.slice(0, 3), pesten.cards.slice(3, 5), pesten.cards.slice(5, 10)]
	const afterShuffle = [pesten.cards.slice(3, 5), pesten.cards.slice(5, 10), pesten.cards.slice(0, 3)]

	const state: ReturnType<typeof cardsReducer> = {
		hands: preShuffle,
		played: pesten.cards.slice(10),
		remaining: [],
		seed: {
			seed: "A",
			useCounter: 0,
		},
	}

	const passedHandsAlong = passHandsAlong(state, -1)
	const result: ReturnType<typeof cardsReducer> = passedHandsAlong
	t.deepEqual(result.hands, afterShuffle)
})

test("drawCard effect", t => {
	const state: RootState = {
		flags: {
			cardDrawCounter: 2,
			tagOverride: null,
		},
		turnInfo: {
			current: 1,
			total: 3,
			playOrder: PlayOrder.Normal,
		},
		winner: null,
		cards: {
			hands: [
				[
					{
						id: "1",
						tags: ["J", "Hearts"],
					},
				],
				[
					{
						id: "2",
						tags: ["Q", "Clubs"],
					},
				],
				[
					{
						id: "3",
						tags: ["4", "Diamonds"],
					},
				],
			],
			played: [{ id: "4", tags: ["2", "Clubs"], effects: [{ type: EffectType.DrawCard, cards: 2 }] }],
			remaining: [
				{ id: "5", tags: ["3", "Hearts"] },
				{ id: "6", tags: ["5", "Diamonds"] },
			],
			seed: {
				seed: "test seed",
				useCounter: 3,
			},
		},
	}

	const game = restoreGame(state)
	t.deepEqual(game.getState(), state)
	game.dispatch({
		type: ActionType.PlayCard,
		payload: state.cards.hands[state.turnInfo.current][0],
		options: {},
	})

	const expectedState: RootState = {
		...state,
		turnInfo: {
			...state.turnInfo,
			current: state.turnInfo.current + 1,
		},
		flags: {
			...state.flags,
			cardDrawCounter: null,
		},
		winner: null,
		cards: {
			hands: state.cards.hands.map((hand, index) => {
				if (index === state.turnInfo.current) {
					return state.cards.remaining
				} else {
					return hand
				}
			}),
			played: [...state.cards.played, state.cards.hands[state.turnInfo.current][0]],
			remaining: [],
			seed: state.cards.seed,
		},
	}

	t.deepEqual(expectedState, game.getState())
})
