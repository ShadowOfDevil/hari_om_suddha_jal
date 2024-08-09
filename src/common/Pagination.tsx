export interface PaginationProps {
  perPage: number;
  onPerPageChange: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalPages: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  perPage,
  onPerPageChange,
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const generatePages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex justify-between items-center mt-4">
      <div>
        <label className="mr-2 font-semibold">Per page:</label>
        <select
          className="border rounded p-1 w-20 h-10"
          value={perPage}
          onChange={(e) => onPerPageChange(parseInt(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <div>
        <button
          className="px-4 py-2 mx-1 bg-gray-200 rounded"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-4 py-2 mx-1">
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`px-4 py-2 mx-1 rounded ${
                page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => onPageChange(parseInt(String(page)))}
            >
              {page}
            </button>
          )
        )}
        <button
          className="px-4 py-2 mx-1 bg-gray-200 rounded"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
