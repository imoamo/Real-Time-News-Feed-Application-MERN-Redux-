import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { fetchSubscribedNews } from "../redux/actions";

const socket = io("https://news-repo-backend.onrender.com", { transports: ["websocket"] });

const NewsFeed = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => Array.isArray(state.news) ? state.news : []);
  const subscribedCategories = useSelector((state) => state.subscribedCategories);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchSubscribedNews()).finally(() => {
      setTimeout(() => setIsLoading(false), 500); // Adds a 500ms delay
    });

    subscribedCategories.forEach((category) => {
      socket.emit("subscribeToCategory", category);
      socket.on("newsUpdate", () => {
        setIsLoading(true);
        dispatch(fetchSubscribedNews()).finally(() => {
          setTimeout(() => setIsLoading(false), 500);
        });
      });
    });

    return () => {
      subscribedCategories.forEach(() => {
        socket.off("newsUpdate");
      });
    };
  }, [dispatch, subscribedCategories]);

  return (
    <div className="mt-10">
      <h2 className="text-gray-300 text-center mb-5">📰 Real-Time News Feed</h2>

      {isLoading ? (
        // 🌟 Elegant White Loading Spinner with a Delay
        <div className="flex justify-center items-center mt-8">
          <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      ) : news.length === 0 ? (
        <p className="text-gray-300 text-center">No news available. Subscribe to categories!</p>
      ) : (
        <div className="space-y-5 transition-all duration-500">
          {news.map((article) => (
            <div key={article._id} className="bg-white/10 shadow-lg p-5 rounded-xl backdrop-blur-lg">
              <h3 className="text-lg font-bold text-white-300">{article.title}</h3>
              <p className="text-white-300">{article.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
