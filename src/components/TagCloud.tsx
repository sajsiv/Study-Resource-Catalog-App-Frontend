import { TagCloud } from "react-tagcloud";

interface TagInterface {
  value: string;
  count: number;
}

const data = [
  { value: "JavaScript", count: 38 },
  { value: "React", count: 30 },
  { value: "Nodejs", count: 28 },
  { value: "Express.js", count: 25 },
  { value: "HTML5", count: 33 },
  { value: "MongoDB", count: 18 },
  { value: "CSS3", count: 20 },
];

interface ResourceTagCloudProps {
  currentTag: string;
  setCurrentTag: (
    string: string
  ) => React.Dispatch<React.SetStateAction<string>>;
}

export default function ResourceTagCloud(
  props: ResourceTagCloudProps
): JSX.Element {
  console.log(props.currentTag);
  return (
    <>
      <TagCloud
        minSize={12}
        maxSize={35}
        tags={data}
        onClick={(tag: TagInterface) => props.setCurrentTag(tag.value)}
      />
    </>
  );
}
