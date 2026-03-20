interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-12 pb-10">
      {/* Simple dynamic page numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg border transition-all font-medium
            ${
              currentPage === page
                ? "bg-primary text-main border-primary shadow-lg"
                : "bg-surface text-muted border-divider hover:border-primary/50"
            }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
