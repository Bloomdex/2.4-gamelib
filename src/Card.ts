import Effect, { EffectUnresolved, OptionId } from "./effects"

export interface Card {
	tags: string[]
	effects: (Effect | EffectUnresolved)[]
	options: Record<OptionId, Option>
}

export type Option = {
	choices: string[]
}

export function cardEquals(a: Card, b: Card): boolean {
	if (a.tags.length === b.tags.length) {
		for (let i = 0; i < a.tags.length; i++) {
			if (a.tags[i] !== b.tags[i]) {
				return false
			}
		}
		return true
	} else {
		return false
	}
}

/*
valid JSON card
JSON.parse(`
{
	tags: ["ace", "spades"],
	effects: [
		{
			type: "TURN_MODIFIER",
			turns: 2
		}
	]
}
`)
*/

type OptionsMap = Record<string, any>

export function resolveOptions(obj: any, options: OptionsMap) {
	const newObj = { ...obj }
	for (const [key, value] of Object.entries(obj)) {
		if (typeof value === "string" && value in options) {
			newObj[key] = options[value]
		} else if (typeof value === "object") {
			newObj[key] = resolveOptions(value, options)
		}
	}
	return newObj
}
