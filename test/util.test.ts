import test from "ava"
import {rotateArray} from "../src/util"

test("rotateArray positive step", t => {
	const arr = [1,2,3]
    const result = rotateArray(arr, 1)
	t.deepEqual([3,1,2], result)
})

test("rotateArray negative step", t => {
	const arr = [1,2,3]
    const result = rotateArray(arr, -1)
    t.deepEqual([2,3,1], result)
})