import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { fetchSubscribedNews, subscribeToCategory, unsubscribeFromCategory } from "../redux/actions";

const socket = io("https://news-repo-backend.onrender.com", { transports: ["websocket"] });

const categories = ["Tech", "Business", "Sports", "Finance", "Economy"];

const CategorySubscriptions = () => {
  const dispatch = useDispatch();
  const subscribedCategories = useSelector((state) => state.subscribedCategories);

  const [loadingCategory, setLoadingCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Disable all buttons

  const handleToggleSubscription = async (category) => {
    if (isLoading) return; // Prevent multiple requests

    setIsLoading(true);
    setLoadingCategory(category);

    try {
      if (subscribedCategories.includes(category)) {
        dispatch(unsubscribeFromCategory(category));
        socket.emit("unsubscribeFromCategory", category);
      } else {
        dispatch(subscribeToCategory(category));
        socket.emit("subscribeToCategory", category);
      }

      // Simulate API delay
      setTimeout(() => {
        dispatch(fetchSubscribedNews());
        setLoadingCategory(null);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Subscription failed:", error);
      setLoadingCategory(null);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/10 shadow-lg p-6 rounded-2xl backdrop-blur-lg">
      <h2 className="text-green-400 mb-4 flex items-center gap-2">
        📌 Subscribe to Categories
      </h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleToggleSubscription(category)}
            disabled={isLoading} // Disable all buttons while loading
            className={`px-5 py-3 rounded-xl font-medium transition-all shadow-md text-lg flex items-center gap-2 
              ${subscribedCategories.includes(category)
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 hover:shadow-xl"}
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {loadingCategory === category && <span className="animate-spin">⏳</span>}
            {subscribedCategories.includes(category) ? `❌ Unsubscribe ${category}` : `➕ Subscribe ${category}`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySubscriptions;
