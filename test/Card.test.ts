import test from "ava"
import { resolveOptions } from "../src/Card"

test("not nested", (t) => {
	const symbolA = Symbol()

	const obj = {
		name: "obj",
		someProp: symbolA,
	}

	const options = {
		[symbolA]: "some value",
	}

	const resolved = resolveOptions(obj, options)

	t.deepEqual(resolved, { ...obj, someProp: "some value" })
})

test("nested", (t) => {
	const symbolA = Symbol()
	const symbolB = Symbol()

	const obj = {
		name: "obj",
		someProp: symbolA,
		nested: {
			someProp: symbolB,
		},
	}

	const options = {
		[symbolA]: "some value",
		[symbolB]: "Some other value",
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
