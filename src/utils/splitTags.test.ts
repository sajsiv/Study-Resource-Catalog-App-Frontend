import { splitTags } from "./splitTags";

test("splitTags returns an array from the tag string", () => {
  expect(splitTags("World, gone, bad")).toStrictEqual(["World", "gone", "bad"]);
});
