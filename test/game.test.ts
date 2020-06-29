import test from "ava"
import createGame, { validActions } from "../src/index"
import pesten from "../rulesets/pesten"

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

const logActions = (game: ReturnType<typeof createGame>) => {
	validActions(game.getState()).forEach(action => {
		console.log(JSON.stringify(action))
	})
}
