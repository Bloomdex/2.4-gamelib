import { Card } from "../Card"

enum Type {
	TurnModifier = "TURN_MODIFIER",

	ReversePlayOrder = "REVERSE_PLAY_ORDER",

	TagOverride = "TAG_OVERRIDE",
}

export const EffectType = Type

export type TurnModifier = {
	type: Type.TurnModifier
	turns: number
}

export type ReversePlayOrder = {
	type: Type.ReversePlayOrder
}

export type TagOverride<T = string | null> = {
	type: Type.TagOverride
	override: [number | null, T] // a from, to tuple
}

type EffectTypeToEffect = {
	[Type.TurnModifier]: TurnModifier
	[Type.ReversePlayOrder]: ReversePlayOrder
	[Type.TagOverride]: TagOverride<string>
}

type Effect = TurnModifier | ReversePlayOrder | TagOverride<string>
export default Effect

export const effectUtil = <T extends Type>(effectType: T) => ({
	has: (card: Card) => card.effects.some((e) => e.type === effectType),
	get: (card: Card): EffectTypeToEffect[T] | undefined =>
		card.effects.find((e) => e.type === effectType) as EffectTypeToEffect[T] | undefined,
})

/*
const hasTurnModifier = hasEffect(EffectType.TurnModifier)
const getTurnModifier = getEffect(EffectType.TurnModifier)
const hasReversePlayOrder = hasEffect(EffectType.ReversePlayOrder)
*/
