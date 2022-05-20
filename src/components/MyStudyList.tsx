import { useState, useEffect } from "react";
import SingleStudyListElement from "./SingleStudyListElement";
import axios from "axios";
import { backendURL } from "../utils/URLs";

interface MyStudyListProps {
  currentUserId: number;
}

interface ResourceDataInterface {
  name: string;
  author_name: string;
  url: string;
  description: string;
  tags: string;
  content_type: string;
  stage: string;
  original_recommendation: string;
  recommendation_reasoning: string;
  userid: number;
  resourceid: number;
  creation_date: string;
}

export default function MyStudyList(props: MyStudyListProps): JSX.Element {
  const [studyListArray, setStudyListArray] = useState<ResourceDataInterface[]>(
    []
  );

  useEffect(() => {
    const fetchStudyList = async () => {
      const response = await axios.get(
        backendURL + "studylist/" + currentUserid
      );
      const studyListData = await response.data;
      setStudyListArray(studyListData);
    };
    fetchStudyList();
  }, []);

  const currentUserid = props.currentUserId;
  console.log(currentUserid);

  console.log("study list", studyListArray);

  async function handleDelete(resourceId: number) {
    const response = await axios.delete(
      backendURL + "studylist/" + currentUserid + "/" + resourceId
    );
    console.log(response);
  }

  const studyList = studyListArray.map((resource) => (
    <>
      <SingleStudyListElement
        resourceName={resource.name}
        authorName={resource.author_name}
        resourceType={resource.content_type}
        creationDate={resource.creation_date}
        URL={resource.url}
        description={resource.description}
        tags={resource.tags}
        buildPhaseWeek={resource.stage}
        recommendation={resource.original_recommendation}
        reasonForRecommendation={resource.recommendation_reasoning}
        userId={resource.userid}
        resourceId={resource.resourceid}
        key={resource.resourceid}
        loggedInUserId={currentUserid}
      />
      <div className="button-container">
        <button onClick={() => handleDelete(resource.resourceid)}>
          Remove from Study List
        </button>
      </div>
    </>
  ));

  return <>{studyList}</>;
}
