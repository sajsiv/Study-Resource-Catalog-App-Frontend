import { useState } from "react";
import SingleStudyResource from "./SingleStudyResource";

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

  const userid = props.userid;
  //do get request and populate studyListArray with response
  console.log(setStudyListArray);
  console.log(userid);

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
    />
  ));

  return <>{studyList}</>;
}
