import { Card } from "../src/Card"
import { EffectType } from "../src/effects"
import { v4 as uuid } from "uuid"

export const cards: Card[] = [
	{ id: uuid(), tags: ["A", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["1", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["2", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["3", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["4", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["5", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["6", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["7", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["8", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["9", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["10", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["J", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["Q", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["K", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["A", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["1", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["2", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["3", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["4", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["5", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["6", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["7", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["8", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["9", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["10", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["J", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["Q", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["K", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["A", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["1", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["2", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["3", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["4", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["5", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["6", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["7", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["8", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["9", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["10", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["J", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["Q", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["K", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["A", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["1", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["2", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["3", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["4", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["5", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["6", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["7", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["8", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["9", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["10", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["J", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["Q", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["K", "Spades"], effects: [], options: {} },
]

export const jokers = [
	{ id: uuid(), tags: ["Joker", "Black"], effects: [], options: {} },
	{ id: uuid(), tags: ["Joker", "Red"], effects: [], options: {} },
]

export const withJokers = [...cards, ...jokers]

const tagOverrideOptionRaar = `l;ksdjflaskdjflsadkjf`

const raarPesten: Card[] = [
	{
		id: uuid(),
		tags: ["A", "Clubs"],
		effects: [
			{ type: EffectType.ReversePlayOrder },
			{ type: EffectType.TagOverride, override: [1, tagOverrideOptionRaar] },
		],
		options: {
			[tagOverrideOptionRaar]: {
				choices: ["Clubs", "Hearts"],
			},
		},
	},
	{ id: uuid(), tags: ["1", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["2", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["3", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["4", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["5", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["6", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["7", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["8", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["9", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["10", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["J", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["Q", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["K", "Clubs"], effects: [], options: {} },
	{ id: uuid(), tags: ["A", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["1", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["2", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["3", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["4", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["5", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["6", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["7", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["8", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["9", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["10", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["J", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["Q", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["K", "Diamonds"], effects: [], options: {} },
	{ id: uuid(), tags: ["A", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["1", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["2", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["3", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["4", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["5", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["6", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["7", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["8", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["9", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["10", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["J", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["Q", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["K", "Hearts"], effects: [], options: {} },
	{ id: uuid(), tags: ["A", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["1", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["2", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["3", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["4", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["5", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["6", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["7", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["8", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["9", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["10", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["J", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["Q", "Spades"], effects: [], options: {} },
	{ id: uuid(), tags: ["K", "Spades"], effects: [], options: {} },
]
