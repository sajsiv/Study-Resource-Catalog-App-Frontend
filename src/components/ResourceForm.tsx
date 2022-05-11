import { useState } from "react";
interface FormDataInterface {
  resourceName: string;
  authorName: string;
  URL: string;
  description: string;
  tags: string;
  resourceType: string;
  buildPhaseWeek: string;
  recommendation: string;
  reasonForRecommendation: string;
}
export default function ResourceForm(): JSX.Element {
  const [formData, setFormData] = useState<FormDataInterface>({
    resourceName: "",
    authorName: "",
    URL: "",
    description: "",
    tags: "",
    resourceType: "video",
    buildPhaseWeek: "week 1",
    recommendation: "I recommend this resource after having used it",
    reasonForRecommendation: "",
  });

  const resourceTypesList = [
    "video",
    "article",
    "ebook",
    "podcast",
    "exercise",
    "exercise set",
    "software tool",
    "course",
    "diagram",
    "cheat-sheet",
    "reference",
    "resource list",
    "youtube channel",
    "organisation",
  ];

  const buildPhaseWeeks = [
    "week 1",
    "week 2",
    "week 3",
    "week 4",
    "week 5",
    "week 6",
    "week 7",
    "week 8",
    "week 9",
    "week 10",
  ];

  const recommendationList = [
    "I recommend this resource after having used it",
    "I do not recommend this resource, having used it",
    "I haven't used this resource but it looks promising",
  ];

  function handleFormChange(
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setFormData((previous) => {
      return { ...previous, [name]: value };
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  console.log(formData);
  //hiya

  return (
    <>
      <h1>Resource Form</h1>
      <div className="resource-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="resource-form-resourceName">Resource Name:</label>
          <input
            onChange={(event) => handleFormChange(event)}
            type="text"
            placeholder="type resource name here"
            name="resourceName"
            value={formData.resourceName}
            id="resource-form-resourceName"
          />
          <label htmlFor="resource-form-authorName">Author Name:</label>
          <input
            onChange={(event) => handleFormChange(event)}
            type="text"
            placeholder="type Author name here"
            name="authorName"
            value={formData.authorName}
            id="resource-form-authorName"
          />
          <label htmlFor="resource-form-URL">URL:</label>
          <input
            onChange={(event) => handleFormChange(event)}
            type="text"
            placeholder="type URL name here"
            name="URL"
            value={formData.URL}
            id="resource-form-URL"
          />
          <label htmlFor="resource-form-description">Description:</label>
          <textarea
            onChange={(event) => handleFormChange(event)}
            className="resource-form--description"
            placeholder="type description here"
            name="description"
            value={formData.description}
            id="resource-form-description"
          />
          <label htmlFor="resource-form-tags">Tags:</label>
          <input
            onChange={(event) => handleFormChange(event)}
            type="text"
            placeholder="type tags here (example: react, typescript, online course)"
            name="tags"
            value={formData.tags}
            id="resource-form-tags"
          />
          <label htmlFor="resource-form-resourceType">Resource Type:</label>
          <select
            onChange={(event) => handleFormChange(event)}
            value={formData.resourceType}
            name="resourceType"
            id="resource-form--resourceType"
          >
            {resourceTypesList.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <label htmlFor="resource-form-weeks">Build Phase Week:</label>
          <select
            onChange={(event) => handleFormChange(event)}
            value={formData.buildPhaseWeek}
            name="buildPhaseWeek"
            id="resource-form--buildPhaseWeek"
          >
            {buildPhaseWeeks.map((week) => (
              <option key={week} value={week}>
                {week}
              </option>
            ))}
          </select>

          <label htmlFor="resource-form-recommendation">Recommendation:</label>
          <select
            onChange={(event) => handleFormChange(event)}
            value={formData.recommendation}
            name="recommendation"
            id="resource-form--recommendation"
          >
            {recommendationList.map((rec) => (
              <option key={rec} value={rec}>
                {rec}
              </option>
            ))}
          </select>

          <label htmlFor="resource-form-reason-recommendation">
            Reason for recommendation:
          </label>
          <textarea
            onChange={(event) => handleFormChange(event)}
            className="resource-form--reason-recommendation"
            placeholder="type reason here"
            name="reasonForRecommendation"
            value={formData.reasonForRecommendation}
            id="resource-form-reason-recommendation"
          />
          <br />

          <button>Submit</button>
        </form>
      </div>
    </>
  );
}
