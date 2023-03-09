import { useState, useEffect, memo } from "react";

export interface Props {
  pagination: any;
  onPageChange: any;
}

const pageList = (start: number, end: number) => {
  const pageList = [];
  for (let i = start; i <= end; i++) pageList.push(i);
  return pageList;
};

const maxAmount = 3;

enum NAVIGATING_ACTION {
  NEXT = "next",
  PREV = "prev",
}

let selectedIndex = 1;

export const Pagination: React.FC<Props> = (props) => {
  const { pagination, onPageChange } = props;
  const { page, limit, totalRows } = pagination;
  const totalPages = Math.ceil(totalRows / limit);
  const start = Math.max(page - selectedIndex + 1, 1);
  const finish = Math.min(start + maxAmount - 1, totalPages);

  //console.log("totalPages", totalPages, totalRows, limit, page);
  // console.log("pagination",)
  const handlePageChange = (newPage: any, action: NAVIGATING_ACTION) => {
    switch (action) {
      case NAVIGATING_ACTION.NEXT:
        selectedIndex++;
        break;
      case NAVIGATING_ACTION.PREV:
        selectedIndex--;
        break;
    }
    if (selectedIndex > maxAmount) selectedIndex = maxAmount;
    if (selectedIndex < 1) selectedIndex = 1;
    onPageChange(newPage);
  };
  const pageSelectHandler = (pageNumber: number, index: number) => {
    selectedIndex = index;
    onPageChange(pageNumber);
  };
  console.log({ selectedIndex });

  return (
    <div style={{ display: "flex", height: "40px" }}>
      <button
        style={{ padding: "4px" }}
        disabled={page <= 1}
        onClick={() => handlePageChange(page - 1, NAVIGATING_ACTION.PREV)}
      >
        Prev
      </button>
      <ul style={{ padding: "6px" }}>
        {pageList(start, finish).map((pageNumber, index) => (
          <button
            style={{
              backgroundColor:
                index + 1 === selectedIndex ? "#fdb602" : "transparent",
            }}
            onClick={() => {
              pageSelectHandler(pageNumber, index + 1);
            }}
          >
            {pageNumber}
          </button>
        ))}
      </ul>
      <button
        style={{ padding: "4px" }}
        disabled={page >= totalPages}
        onClick={() => handlePageChange(page + 1, NAVIGATING_ACTION.NEXT)}
      >
        Next
      </button>
    </div>
  );
};
