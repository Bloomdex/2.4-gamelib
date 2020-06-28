import test from "ava"
import { v4 as uuid } from "uuid"
import { resolveOptions } from "../src/Card"

test("not nested", t => {
	const optionA = uuid()

	const obj = {
		name: "obj",
		someProp: optionA,
	}

	const options = {
		[optionA]: "some value",
	}

	const resolved = resolveOptions(obj, options)

	t.deepEqual(resolved, { ...obj, someProp: "some value" })
})

test("nested", t => {
	const optionA = uuid()
	const optionB = uuid()

	const obj = {
		name: "obj",
		someProp: optionA,
		nested: {
			someProp: optionB,
		},
	}

	const options = {
		[optionA]: "some value",
		[optionB]: "Some other value",
	}

	const resolved = resolveOptions(obj, options)

	t.deepEqual(resolved, {
		...obj,
		someProp: "some value",
		nested: {
			someProp: "Some other value",
		},
	})
})
