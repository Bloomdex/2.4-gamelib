import test from "ava"
import createGame from "../src/index"
import pesten from "../rulesets/pesten"
import random from "seed-random"

test("can create game", (t) => {
	const game = createGame({
		gameRules: pesten,
		players: 5,
		seed: "test",
	})

	t.pass()
})
