import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border-2 border-gray-700/50 text-gray-400
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:border-indigo-500/50 hover:text-gray-200 
          transition-colors duration-300"
        aria-label="Previous page"
      >
        <FiChevronLeft className="h-5 w-5" />
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-lg border-2 
              ${
                currentPage === page
                  ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
                  : "border-gray-700/50 text-gray-400 hover:text-gray-200 hover:border-indigo-500/50"
              } transition-colors duration-300`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border-2 border-gray-700/50 text-gray-400
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:border-indigo-500/50 hover:text-gray-200 
          transition-colors duration-300"
        aria-label="Next page"
      >
        <FiChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

export default Pagination;
