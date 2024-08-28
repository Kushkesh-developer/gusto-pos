import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="paginationCol tablePagination">
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li
            className={`page-item pagination_btn ${
              currentPage === 1 ? "disabled" : ""
            }`}
          >
            <span
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
            >
              {/* <img src="/images/Chevron_1.svg" alt="" /> */} arrow
            </span>
          </li>
          <li className="page-item">
            <span
              className="page-link"
              onClick={() => onPageChange(currentPage)}
            >
              {currentPage}
            </span>
          </li>
          <li
            className={`page-item pagination_btn ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <span
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
            >
              {/* <img src="/images/Chevron_2.svg" alt="" /> */} arrow
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
