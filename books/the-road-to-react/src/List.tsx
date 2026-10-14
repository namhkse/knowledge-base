import * as React from "react";
import { Stories, Story } from "./type";
import styled from "styled-components";
import { StyledButtonSmall } from "./Button";
import { sortBy } from "lodash";

type ListProps = {
  list: Stories;
  onRemoveItem: (item: Story) => void;
};

const SORTS = {
  NONE: (list: Stories) => list,
  TITLE: (list: Stories) => sortBy(list, "title"),
  AUTHOR: (list: Stories) => sortBy(list, "author"),
  COMMENT: (list: Stories) => sortBy(list, "num_comments").reverse(),
  POINT: (list: Stories) => sortBy(list, "points").reverse(),
};

type SortKey = keyof typeof SORTS;

type Sort = {
  sortKey: SortKey;
  isReverse: boolean;
}

const List: React.FC<ListProps> = React.memo(({ list, onRemoveItem }) => {

  const [sort, setSort] = React.useState<Sort>({
    sortKey: 'NONE',
    isReverse: false,
  });

  const handleSort = (sortKey: SortKey) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;
    setSort({
      sortKey: sortKey,
      isReverse: isReverse,
    });
  };

  const sortFunction = SORTS[sort.sortKey];
  const sortedList = sort.isReverse
    ? sortFunction(list).reverse()
    : sortFunction(list);

  return (
    <ul>
      <li style={{ display: "flex" }}>
        <span style={{ width: "40%" }}>
          <button onClick={() => handleSort("TITLE")}>Title</button>
        </span>
        <span style={{ width: "30%" }}>
          <button onClick={() => handleSort("AUTHOR")}>Author</button>
        </span>
        <span style={{ width: "10%" }}>
          <button onClick={() => handleSort("COMMENT")}>Comments</button>
        </span>
        <span style={{ width: "10%" }}>
          <button onClick={() => handleSort("POINT")}>Points</button>
        </span>
        <span style={{ width: "10%" }}>
          <button>Actions</button>
        </span>
      </li>

      {sortedList.map((item) => (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      ))}
    </ul>
  );
});

const StyledItem = styled.li`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
`;

type StyledColumnProps = {
  width: string;
};

const StyledColumn = styled.span<StyledColumnProps>`
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  a {
    color: inherit;
  }

  width: ${(props) => props.width};
`;

type ItemProps = {
  item: Story;
  onRemoveItem: (item: Story) => void;
};

const Item: React.FC<ItemProps> = ({ item, onRemoveItem }) => (
  <StyledItem>
    <StyledColumn width="40%">
      <a href={item.url}>{item.title}</a>
    </StyledColumn>
    <StyledColumn width="30%">{item.author}</StyledColumn>
    <StyledColumn width="10%">{item.num_comments}</StyledColumn>
    <StyledColumn width="10%">{item.points}</StyledColumn>
    <StyledColumn width="10%">
      <StyledButtonSmall onClick={() => onRemoveItem(item)}>
        {/* <Check height="18px" width="18px" /> */}
        Dismiss
      </StyledButtonSmall>
    </StyledColumn>
  </StyledItem>
);

export { List };
