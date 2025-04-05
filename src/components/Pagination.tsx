const Pagination = ({ pages=0, page=1, onClick=()=>{} }: PaginationProps) => {
  return (
    <div className="row mt-2 justify-content-center">
      <div className="mt-4 justify-content-center align-items-center dt-layout-start col-md-auto mx-auto d-none"></div>
      <div className="mt-4 justify-content-center align-items-center dt-layout-end col-md-auto mx-auto">
        <div className="dt-paging paging_simple_numbers">
          <nav>
            <ul className="pagination">
              <li className={`dt-paging-button page-item ${page === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link previous"
                  role="link"
                  type="button"
                  aria-controls="sortTable"
                  aria-disabled="true"
                  aria-label="Previous"
                  data-dt-idx="previous"
                  tabIndex={-1}
                  onClick={() => onClick(page-1)}
                >
                  ‹
                </button>
              </li>
              {
                Array.from({ length: pages }, (_, i) => i+1)
                .map((n, i) => (
                  <li key={n} className={`dt-paging-button page-item ${page === n ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      role="link"
                      type="button"
                      aria-controls="sortTable"
                      aria-current="page"
                      data-dt-idx={i}
                      onClick={() => onClick(n)}
                    >
                      {n}
                    </button>
                  </li>
                ))
              }
              <li className={`dt-paging-button page-item ${page === pages ? 'disabled' : ''}`}>
                <button
                  className="page-link next"
                  role="link"
                  type="button"
                  aria-controls="sortTable"
                  aria-label="Next"
                  data-dt-idx="next"
                  onClick={() => onClick(page+1)}
                >
                  ›
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

interface PaginationProps {
  pages: number,
  page: number,
  onClick?: (page: number) => void,
}

export default Pagination;
