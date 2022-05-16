import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios"


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

export default function SingleStudyResourcePage(): JSX.Element {

  const { resource_id } = useParams();
  console.log(resource_id)

  const reload = true;

  const [currentResource, setCurrentResources] = useState<ResourceDataInterface>({
  name: "",
  author_name: "",
  url: "",
  description: "",
  tags: "",
  content_type: "",
  stage: "",
  original_recommendation: "",
  recommendation_reasoning: "",
  userid: 0,
  resourceid: 0,
  creation_date: "",
  });

    useEffect(() => {
      const fetchResourceInfo = async () => {
        const response = await axios.get("http://localhost:4000/resources/" + resource_id);
        const resourceInfo = await response.data;
        console.log(currentResource);
        setCurrentResources(resourceInfo);
      };
      fetchResourceInfo();
    },
    // eslint-disable-next-line
    [resource_id, reload]);  

  return (
    <section className="single-resource-element">
      <h3>{currentResource.name}</h3>
      <h3>{currentResource.author_name}</h3>
      <h3>{currentResource.content_type}</h3>
      <h3>{currentResource.creation_date}</h3>
      <h3>{currentResource.url}</h3>
      <p>{currentResource.description}</p>
      <h3>{currentResource.tags}</h3>
      <h3>{currentResource.stage}</h3>
      <h3>{currentResource.original_recommendation}</h3>
      <p>{currentResource.recommendation_reasoning}</p>
    </section>
  );
}
