import { useState, useEffect } from "react";
import SingleStudyResource from "./SingleStudyResource";
import axios from "axios";
import { backendURL } from "../utils/URLs";

interface MyStudyListProps {
  userid: number;
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
      const response = await axios.get(backendURL + "studylist");
      const studyListData = await response.data;
      setStudyListArray(studyListData);
    };
    fetchStudyList();
  }, []);

  const userid = props.userid;
  //do get request and populate studyListArray with response
  console.log(setStudyListArray);
  console.log(userid);

  console.log("study list", studyListArray);

  const studyList = studyListArray.map((resource) => (
    <SingleStudyResource
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
      loggedInUserId={userid}
    />
  ));

  return <>{studyList}</>;
}
