import ResourceForm from "./ResourceForm";
import Header from "./Header";
import Footer from "./Footer";
import RecentResources from "./RecentResources";
import SearchTermResources from "./SearchTermResources";
import UserRecommendations from "./UserRecommendations";
import MyStudyList from "./MyStudyList";
import { useState, useEffect } from "react";
import { ResourceDataInterface, AllUsersInterface } from "./interfaces";
import { backendURL } from "../utils/URLs";
import { TagCloud } from "react-tagcloud";
import axios from "axios";

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
  // const [currentTag, setCurrentTag] = useState<string>("");
  const [countArrayOfTags, setCountArrayOfTags] = useState<TagInterface[]>([]);
  const [allUsers, setAllUsers] = useState<AllUsersInterface[]>([]);
  const [currentUser, setCurrentUser] = useState("");
  const [displayedResources, setDisplayedResources] = useState<
    ResourceDataInterface[]
  >([]);

  useEffect(() => {
    let tempArray = [];
    const arrayOfTags: string[] = [];
    const tempCountArrayOfTags: TagInterface[] = [];
    const fetchResources = async () => {
      const response = await axios.get(backendURL + "resources");
      const allResources: ResourceDataInterface[] = await response.data;
      setAllResources(allResources);
      setDisplayedResources(allResources);

      for (const resource of allResources) {
        tempArray = resource.tags.split(", ");
        for (const tag of tempArray) {
          arrayOfTags.push(tag);
        }
      }
      tempCountArrayOfTags.push({ value: arrayOfTags[0], count: 0 });
      for (const tag of arrayOfTags) {
        let tagExists = false;
        for (const object of tempCountArrayOfTags) {
          if (object.value === tag) {
            object.count = object.count + 1;
            tagExists = true;
          }
        }
        if (tagExists === false) {
          tempCountArrayOfTags.push({ value: tag, count: 1 });
        }
      }
      setCountArrayOfTags(tempCountArrayOfTags);
    };

    fetchResources();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(backendURL + "users");
      const allUsers = await response.data;
      setAllUsers(allUsers);
    };
    fetchUsers();
  }, []);

  function handleUploadClick() {
    setView("form");
  }

  function handleHomeClick() {
    setView("home");
  }

  function handleStudyListClick() {
    setView("study-list");
  }

  function handleUserChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setCurrentUser(e.target.value);
  }

  function handleLogOut() {
    setCurrentUser("");
  }

  function handleSearchButtonClick() {
    setSearchList(
      allResources.filter(
        (object) =>
          object.name.includes(searchTerm) ||
          object.description.includes(searchTerm) ||
          object.content_type.includes(searchTerm) ||
          object.stage.includes(searchTerm) ||
          object.tags.includes(searchTerm) ||
          object.author_name.includes(searchTerm)
      )
    );

    setIsSearchTermClicked(true);
  }

  const data = countArrayOfTags;

  function handleTagClick(tagValue: string) {
    searchList.length > 0
      ? setSearchList(
          searchList.filter((object) => object.tags.includes(tagValue))
        )
      : setDisplayedResources(
          allResources.filter((object) => object.tags.includes(tagValue))
        ),
      console.log(displayedResources);
  }

  function handleSearchTerm(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setSearchTerm(value);
  }

  function handleResetSearchTerm() {
    setSearchTerm("");
    setIsSearchTermClicked(false);
    setSearchList([]);
  }
  console.log(searchTerm);
  return (
    <>
      <Header />
      {view === "home" && (
        <>
          <div className="login">
            <select onChange={handleUserChange} value={currentUser}>
              <option value="">-- Select a user --</option>
              {allUsers.map((user) => (
                <option key={user.userid} value={user.userid}>
                  {user.name}
                </option>
              ))}
            </select>
            <button onClick={handleLogOut}>Log Out</button>
          </div>
          <div className="button-bar">
            <button>See Random</button>
            <button>Popular Content</button>
            <button onClick={handleStudyListClick}>My Study List</button>
          </div>
          <div className="search">
            <input
              onChange={handleSearchTerm}
              type="text"
              placeholder="Search a resource"
              value={searchTerm}
              name="searchTerm"
            ></input>
            <br />
            <button disabled={!searchTerm} onClick={handleSearchButtonClick}>
              Search
            </button>
            <button onClick={handleResetSearchTerm}>Reset Search</button>
          </div>
          <div className="tags">
            <TagCloud
              minSize={12}
              maxSize={35}
              tags={data}
              onClick={(tag: TagInterface) => handleTagClick(tag.value)}
            />
          </div>
          {currentUser && (
            <div className="upload">
              <h1>Upload Resource</h1>
              <button onClick={handleUploadClick} className="upload--button">
                +
              </button>
            </div>
          )}

          {isSearchTermClicked && (
            <div className="search-list">
              <h1 className="heading">Search List</h1>
              <SearchTermResources allResources={searchList} />
            </div>
          )}
          <RecentResources allResources={displayedResources} />
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
          <ResourceForm userid={parseInt(currentUser)} />
        </>
      )}

      {view === "study-list" && (
        <section className="study-list">
          <div className="button-bar">
            <button>See Random</button>
            <button onClick={handleHomeClick}>Home</button>
            <button>Popular Content</button>
          </div>
          <h1 className="heading">My Study List</h1>
          <p className="sub-heading">
            Add resources to your list and work through them at your own pace.
          </p>
          <MyStudyList userid={parseInt(currentUser)} />
        </section>
      )}
      <Footer />
    </>
  );
}
