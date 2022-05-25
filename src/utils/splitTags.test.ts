import { splitTags } from "./splitTags";

test("splitTags returns an array from the tag string", () => {
  expect(splitTags("World, gone, bad")).toStrictEqual(["World", "gone", "bad"])
});

test("splitTags will work when a tag is more than one word", () => {
  expect(splitTags("react, data structures, algorithms")).toStrictEqual(["react", "data structures", "algorithms"])
  expect(splitTags("i like coding, it is fun")).toStrictEqual(["i like coding", "it is fun"])
})
