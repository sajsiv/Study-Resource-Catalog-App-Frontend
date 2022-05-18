import { frontendURL } from "../utils/URLs";

interface SingleStudyResourceProps {
  resourceName: string;
  authorName: string;
  URL: string;
  description: string;
  tags: string;
  resourceType: string;
  buildPhaseWeek: string;
  recommendation: string;
  reasonForRecommendation: string;
  creationDate: string;
  userId: number;
  resourceId: number;
}

export default function SingleStudyResource(
  props: SingleStudyResourceProps
): JSX.Element {
  return (
    <a href={frontendURL + "resource/" + props.resourceId}>
      <section className="single-resource-element">
        <h3>Resource Name: {props.resourceName}</h3>
        <p>Author: {props.authorName}</p>
        <p>{props.recommendation}</p>
        <p>Tags: {props.tags}</p>
        <p>
          Date Added: <em>{props.creationDate}</em>
        </p>
      </section>
    </a>
  );
}
