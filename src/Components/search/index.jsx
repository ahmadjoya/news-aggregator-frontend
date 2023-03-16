import NewsPanel from "../news/news-panel";
import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../layout";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("q");
  const date = searchParams.get("date");
  console.log("keyword", keyword);
  const fetchNews = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}/search?q=${keyword}&date=${
        date ? date : ""
      }`
    );
    setNewsData(data);
    console.log("data news", data);
  };

  useEffect(() => {
    fetchNews();
  }, [keyword, date]);
  return (
    <>
      <Layout>
        <NewsPanel data={newsData} />
      </Layout>
    </>
  );
};
export default SearchPage;
