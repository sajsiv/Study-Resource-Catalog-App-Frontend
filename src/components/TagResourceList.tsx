import SingleStudyResource from "./SingleStudyResource";
import { RecentResourcesInterface } from "./interfaces";

export default function RecentResources(
  props: RecentResourcesInterface
): JSX.Element {
  return (
    <>
      <h1 className="heading">Tag Results</h1>

      <div className="resource-list">
        {props.allResources.slice(0, 5).map((resource) => (
          <SingleStudyResource
            key={resource.resourceid}
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
          />
        ))}
      </div>
    </>
  );
}
