import Effect, { EffectUnresolved, OptionId } from "./effects"

export interface Card {
	id: string
	tags: string[]
	effects?: (Effect | EffectUnresolved)[]
	options?: Record<OptionId, Option>
}

export type Option = {
	choices: string[]
}

export function cardEquals(a: Card, b: Card): boolean {
	return a.id === b.id
}

type OptionsMap = Record<string, any>

export function resolveOptions(obj: any, options: OptionsMap) {
	if (Array.isArray(obj)) {
		return resolveOptionsArr(obj, options)
	}
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

function resolveOptionsArr(arr: Array<any>, options: OptionsMap) {
	const newArr = [...arr]
	for (let key = 0; key < arr.length; key++) {
		const value = arr[key]
		if (typeof value === "string" && value in options) {
			newArr[key] = options[value]
		} else if (typeof value === "object") {
			newArr[key] = resolveOptions(value, options)
		}
	}
	return newArr
}
