import { useEffect, useState } from "react";
import SingleStudyResource from "./SingleStudyResource";
import {RecentResourcesInterface} from "./interfaces";


export default function RecentResources(props: RecentResourcesInterface): JSX.Element {

  return (
    <>
      <h1>Recent Resources</h1>
      {props.allResources.map((resource) => (
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
      ))}
    </>
  );
}
