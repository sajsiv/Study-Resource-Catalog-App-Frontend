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
import TagResourceList from "./TagResourceList";
import RandomResourcePage from "./RandomResourcePage";

interface TagInterface {
  value: string;
  count: number;
}

export default function MainContent(): JSX.Element {
  //useState to conditionally render pages based on what view we want
  const [view, setView] = useState<
    "home" | "form" | "study-list" | "resource" | "random"
  >("home");
  const [searchTerm, setSearchTerm] = useState("");
  // store all the resources we fetch from our backend in an array of objects
  const [allResources, setAllResources] = useState<ResourceDataInterface[]>([]);
  const [isSearchTermClicked, setIsSearchTermClicked] =
    useState<boolean>(false);
  const [searchList, setSearchList] = useState<ResourceDataInterface[]>([]);
  // gives tags a number for their size based on aggregate count
  const [countArrayOfTags, setCountArrayOfTags] = useState<TagInterface[]>([]);
  const [isTagSelected, setIsTagSelected] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<AllUsersInterface[]>([]);
  // sets who is logged in by their user id number
  const [currentUser, setCurrentUser] = useState<string>("0");
  // 5 most recent resources from all resources
  const [displayedResources, setDisplayedResources] = useState<
    ResourceDataInterface[]
  >([]);

  //fetch all our resources and their associated resource tags (splitting the tag string into an array of tags and adding their count)
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

  // get logged in userid from locally stored data, so someone who has logged in earlier will stayed logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setCurrentUser(foundUser);
    }
  }, []);

  // fetch our list of users from the backend, users are displayed in our log in drop down
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

  function handleRandomPageClick() {
    setView("random");
  }

  // stores the logged in user as a cookie on the users browser storage
  function handleUserChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setCurrentUser(e.target.value);
    localStorage.setItem("user", e.target.value);
  }

  // "0" is our id for a logged out user
  function handleLogOut() {
    setCurrentUser("0");
  }

  // filter searched terms by what has been entered into the search box
  function handleSearchButtonClick() {
    setSearchList(
      allResources.filter(
        (object) =>
          object.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          object.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          object.content_type
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          object.stage.toLowerCase().includes(searchTerm.toLowerCase()) ||
          object.tags.toLowerCase().includes(searchTerm.toLowerCase()) ||
          object.author_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    setIsSearchTermClicked(true);
  }

  const data = countArrayOfTags;

  // fitlers our resources the tags selected
  function handleTagClick(tagValue: string) {
    setDisplayedResources(
      allResources.filter((object) => object.tags.includes(tagValue))
    ),
      setIsTagSelected(true);
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

  const handleEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearchButtonClick();
    }
  };

  return (
    <>
      <Header />
      {/* rendering on the homepage */}
      {view === "home" && (
        <>
          <div className="login">
            <select
              className="user--select"
              onChange={handleUserChange}
              value={currentUser}
            >
              <option value="0">-- Select a user --</option>
              {allUsers.map((user) => (
                <option key={user.userid} value={user.userid}>
                  {user.name}
                </option>
              ))}
            </select>
            <button onClick={handleLogOut}>Log Out</button>
          </div>
          <div className="button-bar">
            <button onClick={handleRandomPageClick}>See Random</button>
            <button>Popular Content</button>
            {currentUser !== (0 || "0") && (
              <button onClick={handleStudyListClick}>My Study List</button>
            )}
          </div>
          <div className="tags">
            <TagCloud
              minSize={12}
              maxSize={35}
              tags={data}
              onClick={(tag: TagInterface) => handleTagClick(tag.value)}
            />
          </div>
          <div className="search">
            <input
              className="search--input"
              onChange={handleSearchTerm}
              onKeyDown={(e) => handleEnter(e)}
              type="text"
              placeholder="Search a resource"
              value={searchTerm}
              name="searchTerm"
            ></input>
            <br />
            {searchTerm && (
              <button onClick={handleSearchButtonClick}>Search</button>
            )}
            {isSearchTermClicked && (
              <button onClick={handleResetSearchTerm}>Reset Search</button>
            )}
          </div>

          {currentUser !== (0 || "0") && (
            <div className="upload">
              <button onClick={handleUploadClick} className="upload--button">
                Add Resource
              </button>
            </div>
          )}

          {isSearchTermClicked && (
            <div className="search-list">
              <h1 className="heading">Search List</h1>
              <SearchTermResources
                allResources={searchList}
                loggedInUserId={parseInt(currentUser)}
              />
            </div>
          )}
          {isTagSelected && (
            <div>
              <h1 className="heading">Tag Results</h1>
              <button
                className="closeTag--button"
                onClick={() => setIsTagSelected(false)}
              >
                Close Tag Search
              </button>

              <TagResourceList
                allResources={displayedResources}
                loggedInUserId={parseInt(currentUser)}
              />
            </div>
          )}
          <RecentResources
            allResources={allResources}
            loggedInUserId={parseInt(currentUser)}
          />
          <UserRecommendations />
        </>
      )}
      {/* rendering on when we click to the random page */}
      {view === "random" && <RandomResourcePage allResources={allResources} />}
      {/* rendering on when we click to the form*/}
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
      {/* rendering on when we click to the study-list*/}
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
          <MyStudyList currentUserId={parseInt(currentUser)} />
        </section>
      )}
      <Footer />
    </>
  );
}
