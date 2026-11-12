import React, { useContext } from "react";
import { useState, useReducer } from "react";
import reducer from "../reducer/global_reducer";
import axios from "axios";
const GlobalContext = React.createContext();

const initialState = {
    recentNewsSummary: JSON.parse(localStorage.getItem("recent_summary")) || null,
    isLoading: true,
    error: false,
    errorMessage: null,
    newsContent: null,
    newsUrl: null,
    isDarkMode: false,
    isOpen: false,
    copyMessage: "",
    savedArticles: JSON.parse(localStorage.getItem("saved_articles")) || [],
}

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    

// fetch news article
    const getNewsText = async (articleUrl) => {
  console.log("Fetching news content for URL:", articleUrl);

  try {
    const response = await axios.post(
      "https://brief-gfvg.onrender.com/analyze",
      { url: articleUrl }
    );

    const newsSummary = response.data;

    dispatch({
      type: "SET_NEWS_CONTENT",
      payload: newsSummary,
    });

    // Retrieve existing summaries
    const existingSummary = JSON.parse(
      localStorage.getItem("recent_summary") || "[]"
    );

    // Check if this article already exists
    const alreadyExists = existingSummary.some(
      (summary) => summary.articleUrl === articleUrl
    );

    // Save only if the article is not already stored
    if (!alreadyExists) {
      const newSummary = {
        newsSummary,
        articleUrl,
      };

      localStorage.setItem(
        "recent_summary",
        JSON.stringify([...existingSummary, newSummary])
      );
    }
  } catch (error) {
    console.error("Error fetching news content:", error);

    dispatch({
      type: "ERROR",
      payload:
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch news content",
    });
  }
};


const saveArticle = (article) => {
  try {
    const savedArticles = JSON.parse(
      localStorage.getItem("saved_articles") || "[]"
    );

    // Prevent duplicate articles
    const alreadySaved = savedArticles.some(
      (item) => item.articleUrl === article.articleUrl
    );

    if (alreadySaved) {
      return { success: false, message: "Article already saved" };
    }

    const newArticle = {
      id: crypto.randomUUID(),
      ...article,
      savedAt: new Date().toISOString(),
    };

    const updatedArticles = [...savedArticles, newArticle];

    localStorage.setItem(
      "saved_articles",
      JSON.stringify(updatedArticles)
    );

    return { success: true, message: "Article saved successfully" };
  } catch (error) {
    console.error("Error saving article:", error);
    return { success: false, message: "Failed to save article" };
  }
};


    const handleCopySummary = async () => {
    if (!state.newsContent?.summary) {
        dispatch({type: "SET_COPY_MESSAGE", payload: "'No summary available to copy.'"});
        return;
    }

    try {
        await navigator.clipboard.writeText(state.newsContent.summary);
        dispatch({type: "SET_COPY_MESSAGE", payload: 'Summary copied successfully!'});

        setTimeout(() => dispatch({type: "SET_COPY_MESSAGE", payload: ""}), 2500);
    } catch (error) {
        console.error('Failed to copy summary:', error);
        dispatch({type: "SET_COPY_MESSAGE", payload: "Unable to copy summary"});
    }
    }

    
    const setIsOpen = () => {
        dispatch({type: "TOGGLE_SIDEBAR"})
    }
    const updateUrl = (url) => {
        dispatch({type: "SET_NEWS_URL", payload: url});
    }
    const toggleDarkMode = () => {
        dispatch({ type: "TOGGLE_DARK_MODE" });
    }

    return (<GlobalContext.Provider value={{...state, setIsOpen, getNewsText, updateUrl, handleCopySummary, toggleDarkMode, saveArticle}}>{children}</GlobalContext.Provider>)
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}
