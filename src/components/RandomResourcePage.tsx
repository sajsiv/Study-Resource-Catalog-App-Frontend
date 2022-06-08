import { useState } from "react";

export interface ResourceDataInterface {
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

export default function RandomResourcePage(props: {
  allResources: ResourceDataInterface[];
}): JSX.Element {
  //total number of resources
  const arrayLength = props.allResources.length;

  //helper function to generate a random number between 1 and max
  function getRandomNumber(max: number) {
    return Math.floor(Math.random() * max);
  }
  // usestate to store a random resource from the resource array on page load
  const [currentResource, setCurrentResource] = useState(
    props.allResources[getRandomNumber(arrayLength)]
  );

  // function to generate a new random resource and store it in the currentResource useState
  function handleReload() {
    setCurrentResource(props.allResources[getRandomNumber(arrayLength)]);
  }

  return (
    <>
      <section className="single-resource-element">
        <h3>Name: {currentResource.name}</h3>
        <h3>Author: {currentResource.author_name}</h3>
        <h3>{currentResource.content_type}</h3>
        <p>Description: {currentResource.description}</p>
        <h3>{currentResource.stage}</h3>
        <h3>{currentResource.original_recommendation}</h3>
        <p>{currentResource.recommendation_reasoning}</p>
        <h3>Tags: {currentResource.tags}</h3>
        <a href={currentResource.url}>{currentResource.url}</a>
        <h3>Date Added: {currentResource.creation_date}</h3>
        <button onClick={handleReload}>Get Another Resource</button>
      </section>
    </>
  );
}
