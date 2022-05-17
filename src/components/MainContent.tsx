import ResourceForm from "./ResourceForm";
import Header from "./Header";
import Footer from "./Footer";
import RecentResources from "./RecentResources";
import SearchTermResources from "./SearchTermResources";
import UserRecommendations from "./UserRecommendations";
import MyStudyList from "./MyStudyList";
import { useState, useEffect } from "react";
import { ResourceDataInterface } from "./interfaces";
import { backendURL } from "../utils/URLs";
import { TagCloud } from "react-tagcloud";
import axios from "axios";

// import SingleStudyResource from "./SingleStudyResource";

interface TagInterface {
  value: string;
  count: number;
}

export default function MainContent(): JSX.Element {
  const [view, setView] = useState<
    "home" | "form" | "study-list" | "resource" | "random"
  >("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [allResources, setAllResources] = useState<ResourceDataInterface[]>([]);
  const [isSearchTermClicked, setIsSearchTermClicked] =
    useState<boolean>(false);
  const [searchList, setSearchList] = useState<ResourceDataInterface[]>([]);
  const [currentTag, setCurrentTag] = useState<string>("");
  const [countArrayOfTags, setCountArrayOfTags] = useState<TagInterface[]>([]);

  useEffect(() => {
    let tempArray = [];
    const arrayOfTags: string[] = [];
    const tempCountArrayOfTags: TagInterface[] = [];
    const fetchResources = async () => {
      const response = await axios.get(backendURL + "resources");
      const allResources: ResourceDataInterface[] = await response.data;
      console.log(allResources);
      setAllResources(allResources);

      for (const resource of allResources) {
        tempArray = resource.tags.split(", ");
        for (const tag of tempArray) {
          arrayOfTags.push(tag);
        }
      }
      console.log("array of tags", arrayOfTags);
      tempCountArrayOfTags.push({ value: arrayOfTags[0], count: 0 });
      for (const tag of arrayOfTags) {
        let tagExists = false;
        for (const object of tempCountArrayOfTags) {
          // console.log('iteration of tempCountArrayOFtags', tempCountArrayOfTags)
          if (object.value === tag) {
            object.count = object.count + 1;
            tagExists = true;
          }
        }
        if (tagExists === false) {
          tempCountArrayOfTags.push({ value: tag, count: 1 });
        }
      }
      console.log("this is final product", tempCountArrayOfTags);
      setCountArrayOfTags(tempCountArrayOfTags);
    };

    fetchResources();
    console.log("this is split tags", arrayOfTags);
    console.log("this is countArrayOfTags", countArrayOfTags);
  }, []);

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

  function handleSearchButtonClick() {
    setSearchList(
      allResources.filter((object) => object.name.includes(searchTerm))
    );
    setIsSearchTermClicked(true);
  }

  const data = countArrayOfTags;

  console.log(currentTag);
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
            <TagCloud
              minSize={12}
              maxSize={35}
              tags={data}
              onClick={(tag: TagInterface) => setCurrentTag(tag.value)}
            />
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
      <Footer />
    </>
  );
}
