import random from "seed-random"
import { RootState } from "./state"
import { SeedState } from "./state/reducers/cards"

export function shuffle<T>({ seed, useCounter }: SeedState, arr: readonly T[]): T[] {
	// https://stackoverflow.com/a/2450976
	// Fisher-Yates (aka Knuth) Shuffle
	const rand = random(seed)
	for (let i = 0; i < useCounter; i++) {
		rand()
	}
	const result = [...arr]
	let currentIndex = result.length,
		temporaryValue,
		randomIndex

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(rand() * currentIndex)
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

export function resolveActiveTags(state: RootState) {
	const lastPlayedCard = state.cards.played[state.cards.played.length - 1]

	const activeTags = lastPlayedCard.tags
	const { tagOverride } = state.flags
	if (tagOverride != null) {
		if (tagOverride[0] != null) {
			activeTags[tagOverride[0]] = tagOverride[1]
		} else {
			activeTags.push(tagOverride[1])
		}
	}
	return activeTags
}

export function rotateArray<T>(original: T[], steps: number): T[] {
	const result = [...original]

	if (steps > 0) {
		for (let i = 0; i < steps; i++) {
			for (let j = 0; j < result.length - 1; j++) {
				const element: T = result.shift()!;
				result.push(element)
			}
		}
	} else if (steps < 0) {
		for (let i = steps; i < 0; i++) {
			for (let j = 0; j < result.length - 1; j++) {
				const element: T = result.pop()!;
				result.unshift(element)
			}
		}
	}

	return result
}