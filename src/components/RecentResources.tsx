import axios from "axios";
import { useEffect, useState } from "react";
import SingleStudyResource from "./SingleStudyResource";
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
export default function RecentResources(): JSX.Element {
  const [allResources, setAllResources] = useState<ResourceDataInterface[]>([]);
  useEffect(() => {
    const fetchResources = async () => {
      const response = await axios.get("http://localhost:4000/resources");
      const allResources = await response.data;
      console.log(allResources);
      setAllResources(allResources);
    };
    fetchResources();
  }, []);

  const slicedResources = allResources.slice(0, 10);

  return (
    <>
      <h1>Recent Resources</h1>
      {slicedResources.map((resource) => (
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
