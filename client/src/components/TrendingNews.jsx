import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingNews } from "../redux/actions";
import { motion } from "framer-motion";

const TrendingNews = () => {
  const dispatch = useDispatch();
  const trending = useSelector((state) => Array.isArray(state.trending) ? state.trending : []);

  useEffect(() => {
    dispatch(fetchTrendingNews());
  }, [dispatch]);

  return (
    <div className="mt-8 p-10">
      <h2 className="text-red-400 mb-5 text-center">🔥 Trending News</h2>
      {trending.length === 0 ? (
        <p className="text-gray-300 text-center">No trending news available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trending.map((article) => (
            <motion.div
              key={article._id}
              className="bg-white/10 shadow-lg p-5 rounded-xl backdrop-blur-lg transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-bold text-white">{article.title}</h3>
              <p className="text-white-300">{article.content}</p>
              <p className="text-sm text-white-400 mt-2">
                👍 {article.likes} | 👀 {article.views}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingNews;
