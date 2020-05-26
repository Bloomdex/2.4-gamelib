import Effect from "./effects"

export interface Card {
	tags: string[]
	//amount: number
	effects: Effect[]
	options: Option[]
}

export type Option = {
	question: string
	choices: string[]
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
