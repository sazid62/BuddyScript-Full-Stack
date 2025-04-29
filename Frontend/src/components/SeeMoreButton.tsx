import React from "react";

interface SeeMoreButtonProps {
  onClick: () => void;
  loading?: boolean;
  className?: string;
  buttonText?: string;
  loadingText?: string;
}

function SeeMoreButton({
  onClick,
  loading = false,
  className = "px-4 py-2 mb-16 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors flex items-center justify-center mx-auto",
  buttonText = "See More Comments",
  loadingText = "Loading...",
}: SeeMoreButtonProps) {
  return (
    <div className="flex justify-center m-3 mb-10 ">
      <button onClick={onClick} className={className} disabled={loading}>
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {loadingText}
          </>
        ) : (
          buttonText
        )}
      </button>
    </div>
  );
}

export default SeeMoreButton;
