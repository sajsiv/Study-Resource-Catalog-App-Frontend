import ResourceForm from "./ResourceForm";
import Header from "./Header";
import TagCloud from "./TagCloud";
import RecentResources from "./RecentResources";
import UserRecommendations from "./UserRecommendations";
import MyStudyList from "./MyStudyList";
import { useState } from "react";

export default function MainContent(): JSX.Element {
  const [view, setView] = useState<
    "home" | "form" | "study-list" | "resource" | "random"
  >("home");

  const [loggedIn, setLoggedIn] = useState(true);
  console.log(setLoggedIn);
  function handleUploadClick() {
    setView("form");
  }

  function handleHomeClick() {
    setView("home");
  }

  function handleStudyListClick() {
    setView("study-list");
  }

  return (
    <>
      <Header />
      {view === "home" && (
        <>
          <div className="button-bar">
            <button>See Random</button>
            <button>Popular Content</button>
            <button onClick={handleStudyListClick}>My Study List</button>
          </div>
          <div className="search">
            <input type="text" placeholder="Search a resource"></input>
            <br />
            <button>Search</button>
          </div>
          <div className="tags">
            <TagCloud />
          </div>
          {loggedIn && (
            <div className="upload">
              <h1>Upload Resource</h1>
              <button onClick={handleUploadClick} className="upload--button">
                +
              </button>
            </div>
          )}
          <RecentResources />
          <UserRecommendations />
        </>
      )}

      {view === "form" && (
        <>
          <div className="button-bar">
            <button>See Random</button>
            <button onClick={handleHomeClick}>Home</button>
            <button onClick={handleStudyListClick}>My Study List</button>
          </div>
          <ResourceForm />
        </>
      )}

      {view === "study-list" && (
        <section className="study-list">
          <div className="button-bar">
            <button>See Random</button>
            <button onClick={handleHomeClick}>Home</button>
            <button>Popular Content</button>
          </div>
          <h1>My Study List</h1>
          <p>
            Add resources to your list and work through them at your own pace.
          </p>
          <MyStudyList />
        </section>
      )}
    </>
  );
}
