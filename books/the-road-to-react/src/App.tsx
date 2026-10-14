import * as React from "react";
import axios from "axios";
import styled from "styled-components";
import Check from "./check.svg?react";
import type { Stories, Story } from "./type";
import { SearchForm } from "./SearchForm";
import { List } from "./List";

const API_BASE = "https://hn.algolia.com/api/v1";
const API_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = 'page=';

type StoriesState = {
  data: Stories;
  page: number;
  isLoading: boolean;
  isError: boolean;
};

type StoriesAction =
  | StoriesFetchInitAction
  | StoriesFetchSuccessAction
  | StoriesFetchFailureAction
  | StoriesRemoveAction;

type StoriesFetchInitAction = {
  type: "STORIES_FETCH_INIT";
};

type StoriesFetchSuccessAction = {
  type: "STORIES_FETCH_SUCCESS";
  payload: {
    list: Stories;
    page: number;
  }
};

type StoriesFetchFailureAction = {
  type: "STORIES_FETCH_FAILURE";
};

type StoriesRemoveAction = {
  type: "REMOVE_STORY";
  payload: Story;
};

const storiesReducer = (state: StoriesState, action: StoriesAction) => {
  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: 
          action.payload.page === 0 
            ? action.payload.list 
            : state.data.concat(action.payload.list),
        page: action.payload.page,
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter(
          (story) => story.objectID !== action.payload.objectID,
        ),
      };
    default:
      throw new Error("unknown action");
  }
};

const useStorageState = (
  key: string,
  initialState: string,
): [string, (newValue: string) => void] => {
  const isMounted = React.useRef(false);

  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState,
  );

  React.useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      localStorage.setItem(key, value);
    }
  }, [value, key]);

  return [value, setValue];
};

const StyledContainer = styled.div`
  height: 100vw;
  padding: 20px

  background: #83a4d4;
  // background: linear-gradient(to left, #b6fbff, #83a4d4);
  color: #171212;
`;

const StyledHeadlinePrimary = styled.h1`
  font-size: 48px;
  font-weight: 300;
  letter-spacing: 2px;
`;

const getSumComments = (stories: StoriesState) => {
  return stories.data.reduce(
    (result, value) => result + Number(value.num_comments),
    0,
  );
};

const getLastSearches = (urls: string[]) =>
  urls
    .reduce((result: string[], url: string, index: number) => {
      const searchTerm = extractSearchTerm(url);

      if (index === 0) {
        return result.concat(searchTerm);
      }

      const previousSearchTerm = result[result.length - 1];

      if (searchTerm === previousSearchTerm) {
        return result;
      } else {
        return result.concat(searchTerm);
      }
    }, [])
    .slice(-6)
    .slice(0, -1);

const extractSearchTerm = (url: string) =>
  {

    console.log(url);
    let a =  url
      .substring(url.lastIndexOf('?') + 1, url.lastIndexOf("&"))
    console.log(a);
    
      return a.replace(PARAM_SEARCH, "");
  };

const getUrl = (searchTerm: string, page: number) =>
  `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;

const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState("search", "React");

  const [urls, setUrls] = React.useState([getUrl(searchTerm, 0)]);

  const [page, setPage] = React.useState(0);

  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    page: 0,
    isLoading: false,
    isError: false,
  });

  const handleSearch = (searchTerm: string, page: number) => {
    const url = getUrl(searchTerm, page);
    setUrls(urls.concat(url));
  };

  const lastSearches = getLastSearches(urls);

  const handleFetchStories = React.useCallback(async () => {
    if (!searchTerm) return;

    dispatchStories({ type: "STORIES_FETCH_INIT" });

    try {
      const lastUrl = urls[urls.length - 1];
      const result = await axios.get(lastUrl);

      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: {
          list: result.data.hits,
          page: result.data.page,
        }
      });
    } catch (error) {
      dispatchStories({ type: "STORIES_FETCH_FAILURE" });
    }
  }, [urls]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = React.useCallback((item: Story) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  }, []);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    handleSearch(searchTerm, 0);

    event.preventDefault();
  };

  const handleMore = () => {
    const lastUrl = urls[urls.length - 1];
    const searchTerm = extractSearchTerm(lastUrl);
    handleSearch(searchTerm, stories.page + 1);
  }

  const sumComments = React.useMemo(() => getSumComments(stories), [stories]);

  const handleLastSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);

    handleSearch(searchTerm, 0);
  };

  return (
    <StyledContainer>
      <StyledHeadlinePrimary>
        My Hacker Stories with {sumComments} comments.
      </StyledHeadlinePrimary>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

      <LastSearches
        lastSearches={lastSearches}
        onLastSearch={handleLastSearch}
      />

      {stories.isError && <p>Something went wrong ...</p>}

      <List list={stories.data} onRemoveItem={handleRemoveStory} />

      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={handleMore}>More</button>
      )}

    </StyledContainer>
  );
};

type LastSearchesProps = {
  lastSearches: string[];
  onLastSearch: (searchTern: string) => void;
};

const LastSearches: React.FC<LastSearchesProps> = ({
  lastSearches,
  onLastSearch,
}) => (
  <>
    {lastSearches.map((searchTerm, index) => (
      <button
        key={index}
        type="button"
        onClick={() => onLastSearch(searchTerm)}
      >
        {searchTerm}
      </button>
    ))}
  </>
);

type LoadingIndicatorProps = {
  isLoading: boolean;
};

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ isLoading }) => {
  return <div>{isLoading && <p>Loading</p>}</div>;
};

export default App;
