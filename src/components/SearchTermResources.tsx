import SingleStudyResource from "./SingleStudyResource";
import { ResourceDataInterface } from "./interfaces";
//searchTermResources function takes in a prop containing the array, allResources, of type searchTermResources and a logged in userid
//searchTermResources function returns a SingleStudyResource component for each element in allResources
export default function searchTermResources(props: {
  allResources: ResourceDataInterface[];
  loggedInUserId: number;
}): JSX.Element {
  return (
    <>
      <div className="resource-list">
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
            loggedInUserId={props.loggedInUserId}
          />
        ))}
      </div>
    </>
  );
}
