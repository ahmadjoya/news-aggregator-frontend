import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import NewsPanel from "./news/news-panel";
import Layout from "./layout";

const Home = () => {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/news`
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
  }, []);
  return (
    <>
      <Layout>
        <NewsPanel data={newsData} loading={isLoading} />
      </Layout>
    </>
  );
};
export default Home;
