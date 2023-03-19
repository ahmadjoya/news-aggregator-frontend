import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../layout";
import NewsPanel from "../news/news-panel";

const SearchPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("q");
  const date = searchParams.get("date");
  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/search?q=${keyword}&date=${
          date ? date : ""
        }`
      );

      setNewsData(data);
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [keyword, date]);
  return (
    <>
      <Layout>
        <NewsPanel data={newsData} loading={isLoading} />
      </Layout>
    </>
  );
};
export default SearchPage;
