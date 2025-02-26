import React from "react";
import CategorySubscriptions from "./components/CategorySubscriptions";
import NewsFeed from "./components/NewsFeed";
import TrendingNews from "./components/TrendingNews";

const HomePage = () => {
  return (
    <div>
      <CategorySubscriptions />
      <TrendingNews />
      <NewsFeed />
    </div>
  );
};

export default HomePage;
