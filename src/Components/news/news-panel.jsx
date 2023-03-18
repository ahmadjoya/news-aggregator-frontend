import NewsCard from "./news-card";

const NewsPanel = ({ data }) => {
  return (
    <>
      <div className="max-w-[120rem] m-auto my-5 mt-8">
        <h1 className="text-red-500 font-bold border-l-2 border-red-900 pl-2 ml-1 text-2xl mb-5">
          NEWS Feed
        </h1>
        <div className="flex flex-wrap mt-2">
          {data.map((item) => (
            <div className="p-1 w-1/3">
              <NewsCard data={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewsPanel;
