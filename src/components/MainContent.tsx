import ResourceForm from "./ResourceForm";
import Header from "./Header";
import TagCloud from "./TagCloud";
import RecentResources from "./RecentResources";
import SearchTermResources from "./SearchTermResources";
import UserRecommendations from "./UserRecommendations";
import MyStudyList from "./MyStudyList";
import { useState, useEffect } from "react";
import { ResourceDataInterface } from "./interfaces";

import axios from "axios";
// import SingleStudyResource from "./SingleStudyResource";

export default function MainContent(): JSX.Element {
  const [view, setView] = useState<
    "home" | "form" | "study-list" | "resource" | "random"
  >("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [allResources, setAllResources] = useState<ResourceDataInterface[]>([]);
  const [isSearchTermClicked, setIsSearchTermClicked] =
    useState<boolean>(false);
  const [searchList, setSearchList] = useState<ResourceDataInterface[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      const response = await axios.get("http://localhost:4000/resources");
      const allResources = await response.data;
      console.log(allResources);
      setAllResources(allResources);
    };
    fetchResources();
  }, []);

  const [loggedIn, setLoggedIn] = useState(true);
  console.log(setLoggedIn)
  function handleUploadClick() {
    setView("form");
  }

  function handleHomeClick() {
    setView("home");
  }

  function handleStudyListClick() {
    setView("study-list");
  }

  function handleSearchButtonClick() {
    setSearchList(
      allResources.filter((object) => object.name.includes(searchTerm))
    );
    setIsSearchTermClicked(true);
  }
  console.log(searchList);

  console.log(searchTerm);
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
            <input
              onChange={(event) => setSearchTerm(event.target.value)}
              type="text"
              placeholder="Search a resource"
            ></input>
            <br />
            <button disabled={!searchTerm} onClick={handleSearchButtonClick}>
              Search
            </button>
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

          {isSearchTermClicked && (
            <div className="search-list">
              <h1>Search List</h1>
              <SearchTermResources allResources={searchList} />
              <button onClick={handleUploadClick} className="search--list">
                +
              </button>
            </div>
          )}
          <RecentResources allResources={allResources} />
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
