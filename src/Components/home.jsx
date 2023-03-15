import Header from "./layout/header";
import NewsCard from "./news/news-card";

import NewsPanel from "./news/news-panel";
import axios from "axios";
import { useEffect, useState } from "react";

// const NEWS = [
//   {
//     id: 1,
//     image: actress,
//     title: "The best fashion looks at the Oscars",
//     description:
//       "The famous Hollywood red carpet may have changed colour, but the glamour was the same as ever.",
//     date: "2023-03-21",
//     category: "ENTERTAINMENT & ARTS",
//     source: "BBC",
//     author: "Ahmad Joya",
//   },
//   {
//     id: 1,
//     image: actress,
//     title: "The best fashion looks at the Oscars",
//     description:
//       "The famous Hollywood red carpet may have changed colour, but the glamour was the same as ever.",
//     date: "2023-03-21",
//     category: "ENTERTAINMENT & ARTS",
//     source: "BBC",
//     author: "Ahmad Joya",
//   },
//   {
//     id: 1,
//     image: actress,
//     title: "The best fashion looks at the Oscars",
//     description:
//       "The famous Hollywood red carpet may have changed colour, but the glamour was the same as ever.",
//     date: "2023-03-21",
//     category: "ENTERTAINMENT & ARTS",
//     source: "BBC",
//     author: "Ahmad Joya",
//   },
//   {
//     id: 1,
//     image: actress,
//     title: "The best fashion looks at the Oscars",
//     description:
//       "The famous Hollywood red carpet may have changed colour, but the glamour was the same as ever.",
//     date: "2023-03-21",
//     category: "ENTERTAINMENT & ARTS",
//     source: "BBC",
//     author: "Ahmad Joya",
//   },
//   {
//     id: 1,
//     image: actress,
//     title: "The best fashion looks at the Oscars",
//     description:
//       "The famous Hollywood red carpet may have changed colour, but the glamour was the same as ever.",
//     date: "2023-03-21",
//     category: "ENTERTAINMENT & ARTS",
//     source: "BBC",
//     author: "Ahmad Joya",
//   },
//   {
//     id: 1,
//     image: actress,
//     title: "The best fashion looks at the Oscars",
//     description:
//       "The famous Hollywood red carpet may have changed colour, but the glamour was the same as ever.",
//     date: "2023-03-21",
//     category: "ENTERTAINMENT & ARTS",
//     source: "BBC",
//     author: "Ahmad Joya",
//   },
// ];
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
      <Header />
      <NewsPanel data={newsData} />
    </>
  );
};
export default Home;
