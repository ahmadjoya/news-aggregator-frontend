import { Link } from "react-router-dom";
import TextTruncate from "react-text-truncate";
import defaultImage from "./news-template.png";
function NewsCard({ data }) {
  const {
    image,
    title,
    description,
    date,
    category,
    source,
    author,
    sourceLink,
  } = data;
  console.log("data", image);

  return (
    <Link to={sourceLink} target="_blank">
      <div className="border rounded-lg shadow-lg overflow-hidden">
        <img
          src={image ? image : defaultImage}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="flex items-center pl-4 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 text-gray-600 mr-1"
          >
            <path
              fillRule="evenodd"
              d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 14.585a6.585 6.585 0 1 1 0-13.17 6.585 6.585 0 0 1 0 13.17zM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3.707-2.293a1 1 0 1 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 0-1.414 1 1 0 0 1 1.414 0zM11 10a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-1.293 2.293a1 1 0 0 1 0-1.414l.707-.707a1 1 0 1 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-gray-600 text-sm mr-3">{date}</span>
        </div>
        <div className="px-4 pb-4 pt-2">
          <h2 className="text-lg font-semibold mb-2">
            <TextTruncate
              line={1}
              element="span"
              truncateText="…"
              text={title}
            />
          </h2>
          <p className="text-gray-700 text-sm mb-4">
            <TextTruncate
              line={2}
              element="span"
              truncateText="…"
              text={description}
            />
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-gray-600 text-sm">{category}</span>
            </div>
            <div className="text-gray-600 text-sm">
              {source} | by {author}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default NewsCard;
