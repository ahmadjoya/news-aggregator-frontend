import NewsPanel from "./news/news-panel";
import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "./layout";

const Home = () => {
  const [newsData, setNewsData] = useState([]);
  const fetchNews = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}/news`
    );
    setNewsData(data);
    console.log("data news", data);
  };

  useEffect(() => {
    fetchNews();
  }, []);
  return (
    <>
      <Layout>
        <NewsPanel data={newsData} />
      </Layout>
    </>
  );
};
export default Home;
