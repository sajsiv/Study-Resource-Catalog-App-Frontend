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
          <h3>
            <strong>Resource Name:</strong> {props.resourceName}
          </h3>
          <p>
            <strong>Author:</strong> {props.authorName}
          </p>
          <p>{props.recommendation}</p>
          <p>
            <strong>Tags:</strong> {props.tags}
          </p>
          <p>
            <strong> Date Added:</strong> <em>{props.creationDate}</em>
          </p>
        </section>
      </a>
      <div className="button-bar">
        <button className="like-button" onClick={handleLike}>
          👍
        </button>
        <button className="like-button" onClick={handleDislike}>
          👎
        </button>
      </div>
    </div>
  );
}
