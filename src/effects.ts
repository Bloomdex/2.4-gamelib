import { Card } from "./Card"

enum Type {
	TurnModifier = "TURN_MODIFIER",

	ReversePlayOrder = "REVERSE_PLAY_ORDER",

	TagOverride = "TAG_OVERRIDE",

	DrawCard = "DRAW_CARD",

	PassHandsAlong = "PASS_HANDS_ALONG",
}

export const EffectType = Type

export type OptionId = string

export type TurnModifier = {
	type: Type.TurnModifier
	turns: number
}

export type TurnModifierUnresolved = TurnModifier & {
	turns: OptionId
}

export type ReversePlayOrder = {
	type: Type.ReversePlayOrder
}

export type TagOverride = {
	type: Type.TagOverride
	override: [string[] | null, string] // a from, to tuple
}

export type TagOverrideUnresolved = {
	type: Type.TagOverride
	override: [string[] | null, OptionId]
}

export type DrawCard = {
	type: Type.DrawCard
	cards: number
}
// Right = 1, Left = -1
export type PassHandsAlong = {
	type: Type.PassHandsAlong
	steps: number
}

type EffectTypeToEffect = {
	[Type.TurnModifier]: TurnModifier
	[Type.ReversePlayOrder]: ReversePlayOrder
	[Type.TagOverride]: TagOverride
	[Type.DrawCard]: DrawCard
	[Type.PassHandsAlong]: PassHandsAlong
}

export type EffectUnresolved = TurnModifierUnresolved | TagOverrideUnresolved
type Effect = TurnModifier | ReversePlayOrder | TagOverride | DrawCard | PassHandsAlong

export default Effect

export const effectUtil = <T extends Type>(effectType: T) => ({
	has: (card: Card) => card.effects?.some(e => e.type === effectType) ?? false,
	get: (card: Card): EffectTypeToEffect[T] | undefined =>
		card.effects?.find(e => e.type === effectType) as EffectTypeToEffect[T] | undefined,
})

/*
const hasTurnModifier = hasEffect(EffectType.TurnModifier)
const getTurnModifier = getEffect(EffectType.TurnModifier)
const hasReversePlayOrder = hasEffect(EffectType.ReversePlayOrder)
*/
