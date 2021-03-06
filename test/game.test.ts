import test, { ExecutionContext } from "ava"
import createGame, { validActions } from "../src/index"
import pesten from "../rulesets/pesten"
import SeedRandom from "seed-random"
import { ActionType } from "../src/state/actions"

test("can create game", t => {
	const game = createGame({
		gameRules: pesten,
		players: 5,
		seed: "test",
	})

	t.pass()
})

test("one action", t => {
	const game = createGame({
		players: 3,
		gameRules: pesten,
		seed: "b",
	})
	game.dispatch(validActions(game.getState())[0])
	// if it didn't throw I'm happy
	t.pass()
})

test("random actions until win", t => {
	const seeds = [
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m",
		"n",
		"o",
		"p",
		"q",
		"r",
		"s",
		"t",
		"u",
		"v",
		"w",
		"x",
		"y",
		"z",
	]
	for (const seed of seeds) {
		randomUntilWin(t, seed)
	}
})

const randomUntilWin = (t: ExecutionContext, seed: string) => {
	const game = createGame({
		players: 3,
		gameRules: pesten,
		seed: seed,
	})
	const random = SeedRandom("seed")
	const pickRandom = <T>(arr: T[]): T => arr[Math.floor(random() * arr.length)]

	const actionHistory = []
	while (game.getState().winner == null) {
		const state = game.getState()
		const vAction = validActions(state)
		const nextAction = pickRandom(vAction)
		actionHistory.push(nextAction)
		try {
			game.dispatch(nextAction)
		} catch (e) {
			t.log("Action history", actionHistory.map(action => JSON.stringify(action, null, 2)).join("\n---\n"))
			t.log("Action history length: ", actionHistory.length)
			const allHands = game
				.getState()
				.cards.hands.flat()
				.map(card => card.tags)
			t.log(`${allHands.length} Cards in hands`, allHands)
			throw e
		}
	}
	t.pass()
}

const logActions = (game: ReturnType<typeof createGame>) => {
	validActions(game.getState()).forEach(action => {
		console.log(JSON.stringify(action))
	})
}
