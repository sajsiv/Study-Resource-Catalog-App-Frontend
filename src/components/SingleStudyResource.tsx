interface SingleStudyResourceProps {
    resourceName: string;
    authorName: string;
    URL: string;
    description: string;
    tags: string;
    resourceType: string;
    buildPhaseWeek: string;
    recommendation: string;
    reasonForRecommendation: string;
    creationDate: string;
    userId: number;
    resourceId: number;
  }


export default function SingleStudyResource(props: SingleStudyResourceProps):JSX.Element {
    return (
        <section className="single-resource-element">
            <h3>{props.resourceName}</h3>
            <h3>{props.authorName}</h3>
            <h3>{props.resourceType}</h3>
            <h3>{props.creationDate}</h3>
            <h3>{props.URL}</h3>
            <p>{props.description}</p>
            <h3>{props.tags}</h3>
            <h3>{props.buildPhaseWeek}</h3>
            <h3>{props.recommendation}</h3>
            <p>{props.reasonForRecommendation}</p>
            <h3>{props.resourceType}</h3>
        </section>
    )
}