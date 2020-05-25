export function shuffle<T>(arr: readonly T[]): T[] {
	// https://stackoverflow.com/a/2450976
	// Fisher-Yates (aka Knuth) Shuffle

	const result = [...arr]
	let currentIndex = result.length,
		temporaryValue,
		randomIndex

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex -= 1

		// And swap it with the current element.
		temporaryValue = result[currentIndex]
		result[currentIndex] = result[randomIndex]
		result[randomIndex] = temporaryValue
	}

	return result
}

export function repeat<T>(element: T, amount: number): T[] {
	if (amount === 1) {
		return [element]
	} else {
		return [element, ...repeat(element, amount - 1)]
	}
}
