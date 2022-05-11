import  { useState } from "react";
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
    resourceType: "",
    buildPhaseWeek: "",
    recommendation: "",
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

  console.log(setFormData)
  return (
    <>
      <div className="resource-form">
        <form>
          <label htmlFor="resource-form-resourceName">Resource Name:</label>
          <input
            type="text"
            placeholder="type resource name here"
            name="resourceName"
            value={formData.resourceName}
            id="resource-form-resourceName"
          />
          <label htmlFor="resource-form-authorName">Author Name:</label>
          <input
            type="text"
            placeholder="type Author name here"
            name="authorName"
            value={formData.authorName}
            id="resource-form-authorName"
          />
          <label htmlFor="resource-form-URL">URL:</label>
          <input
            type="text"
            placeholder="type URL name here"
            name="URL"
            value={formData.URL}
            id="resource-form-URL"
          />
          <label htmlFor="resource-form-description">Description:</label>
          <textarea
            className="resource-form--description"
            placeholder="type description here"
            name="description"
            value={formData.description}
            id="resource-form-description"
          />
          <label htmlFor="resource-form-tags">Tags:</label>
          <input
            type="text"
            placeholder="type tags here (example: react, typescript, online course)"
            name="tags"
            value={formData.tags}
            id="resource-form-tags"
          />
          <label htmlFor="resource-form-tags">Tags:</label>
          <select
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
        </form>
      </div>
    </>
  );
}
