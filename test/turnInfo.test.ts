import test from "ava"
import { advancedToPlayer, TurnInfoState, PlayOrder } from "../src/state/reducers/turnInfo"
import clone from "clone-deep"

const state: TurnInfoState = {
	current: 0,
	playOrder: PlayOrder.Normal,
	total: 3,
}

test("advancedToPlayer doesn't modify state", t => {
	const original = clone(state)

	advancedToPlayer(state)
	t.deepEqual(state, original)
})

test("advancedToPlayer bruteforce normal", t => {
	let advancingState = state
	for (let i = 0; i < 10; i++) {
		const advancingState = advancedToPlayer(state)
		if (advancingState.current < 0 || advancingState.current >= 3) {
			t.fail(`Current went outside of it's bounds. it is: ${advancingState.current}`)
		}
	}
	t.pass()
})

test("advancedToPlayer normal no wrap", t => {
	const advanced = advancedToPlayer(state)

	t.deepEqual(advanced, {
		...state,
		current: 1,
	})
})

test("advancedToPlayer normal wrap", t => {
	const advanced = advancedToPlayer(state, 3)
	t.deepEqual(advanced, state)

	const advanced2 = advancedToPlayer(state, 4)
	t.deepEqual(advanced2, {
		...state,
		current: 1,
	})
})

const reversedState: TurnInfoState = {
	current: 0,
	total: 3,
	playOrder: PlayOrder.Reversed,
}

test("advancedToPlayer reverse no wrap", t => {
	const state = {
		...reversedState,
		current: 2,
	}
	const advanced = advancedToPlayer(state)
	t.deepEqual(advanced, {
		...reversedState,
		current: 1,
	})
})

test("advancedToPlayer reverse wrap", t => {
	const advanced = advancedToPlayer(reversedState)
	t.deepEqual(advanced, {
		...reversedState,
		current: 2,
	})
})

test("advancedToPlayer bruteforce reversed", t => {
	let advancingState = reversedState
	for (let i = 0; i < 10; i++) {
		const advancingState = advancedToPlayer(state)
		if (advancingState.current < 0 || advancingState.current >= 3) {
			t.fail(`Current went outside of it's bounds. it is: ${advancingState.current}`)
		}
	}
	t.pass()
})
