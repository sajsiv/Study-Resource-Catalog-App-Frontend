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
//MyStudyList takes in currentUserId as a prop
//it returns studyList which contains a singleStudyListElement for each element in studyListArray and a (delete) button component
export default function MyStudyList(props: MyStudyListProps): JSX.Element {
  //created a studyListArray useState that will contain an array of elements of type ResourceDataInterface
  const [studyListArray, setStudyListArray] = useState<ResourceDataInterface[]>(
    []
  );
  //used useEffect on first mount to call axios.get() to fetch studylist data for a specific userid via the server
  useEffect(() => {
    const fetchStudyList = async () => {
      const response = await axios.get(
        backendURL + "studylist/" + currentUserid
      );
      const studyListData = await response.data;
      //stored response from axios.get() call in the studyListArray useState setter function
      setStudyListArray(studyListData);
    };
    fetchStudyList();
  }, []);

  const currentUserid = props.currentUserId;

  //handleDelete sends a delete request to remove a resource for a specific user's study list from the databse
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
