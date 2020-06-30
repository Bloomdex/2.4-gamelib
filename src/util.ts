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

export function resolveActiveTags(state: RootState): string[] {
	const lastPlayedCard = state.cards.played[state.cards.played.length - 1]

	const activeTags = lastPlayedCard.tags
	let newActiveTags = [...activeTags]
	const { tagOverride } = state.flags

	if (tagOverride != null) {
		// Check if there are tags to override
		if (tagOverride[0] != null && tagOverride[0] != []) {
			// We have tags to override
			let tagsToOverride: string[] = []
			
			// Check if iterable
			if (typeof tagOverride[0][Symbol.iterator] === 'function') {
				// Find all the tags to override
				for (let tag of tagOverride[0]) {
					tagsToOverride.push(tag)
				}
				// Remove them
				newActiveTags = newActiveTags.filter(function(val){
					return (tagsToOverride.indexOf(val) == -1 ? true : false)
				})

				// Add the new tags
				if (tagOverride[1] != null) {
					for (let tag of tagOverride[1]) {
						newActiveTags.push(tag)
					}
				}
			}
		} else {
			// Nothing to override, so add them
			// Add the new tags
			if (tagOverride[1] != null) {
				for (let tag of tagOverride[1]) {
					newActiveTags.push(tag)
				}
			}
		}
	}	

	// if (tagOverride != null) {
	// 	if (tagOverride[0] != null) {
	// 		if (activeTags[tagOverride[0]] != null) {
	// 			activeTags[tagOverride[0]] = tagOverride[1]
	// 		} else {
	// 			activeTags.push(tagOverride[1])
	// 		}
	// 	} else {
	// 		activeTags.push(tagOverride[1])
	// 	}
	// }
	return newActiveTags
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