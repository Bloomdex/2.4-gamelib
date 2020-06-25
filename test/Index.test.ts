import test from "ava"
import createGame from "../src/index"
import pesten from "../rulesets/pesten"
import random from "seed-random"

const seed = random("test")

test("can create game", (t) => {
	const game = createGame({
		gameRules: pesten,
		players: 5,
		seed,
	})

	t.pass()
})
