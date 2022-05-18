import axios from "axios";
import { backendURL, frontendURL } from "../utils/URLs";

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
interface likeDataInterface {
  likeValue: boolean;
  resourceID: number;
  userID: number;
}

export default function SingleStudyResource(
  props: SingleStudyResourceProps
): JSX.Element {
  async function handleLike() {
    const requestData: likeDataInterface = {
      likeValue: true,
      resourceID: props.resourceId,
      userID: props.userId,
    };
    const response = await axios.post(backendURL + "likes", requestData);
    console.log(response);
  }
  async function handleDislike() {
    const requestData: likeDataInterface = {
      likeValue: false,
      resourceID: props.resourceId,
      userID: props.userId,
    };
    const response = await axios.post(backendURL + "likes", requestData);
    console.log(response);
  }

  return (
    <div>
      <a href={frontendURL + "resource/" + props.resourceId}>
        <section className="single-resource-element">
          <h3>{props.resourceName}</h3>
          <h3>{props.authorName}</h3>
          <h3>{props.resourceType}</h3>
          <h3>{props.creationDate}</h3>
          <h3>{props.URL}</h3>
          <p>{props.description}</p>
          <h3>{props.tags}</h3>
          <h3>{props.buildPhaseWeek}</h3>
          <h3>{props.recommendation}</h3>
          <p>{props.reasonForRecommendation}</p>
        </section>
      </a>
      <button onClick={handleLike}>Like</button>
      <button onClick={handleDislike}>Dislike</button>
    </div>
  );
}
