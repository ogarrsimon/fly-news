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
    copyMessage: ""
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

        // Update the application state
        dispatch({
        type: "SET_NEWS_CONTENT",
        payload: newsSummary,
        });

        // Retrieve existing summaries
        const existingSummary = JSON.parse(
        localStorage.getItem("recent_summary") || "[]"
        );

        // Create a consistent summary object
        const newSummary = {
        newsSummary,
        articleUrl,
        };

        // Save the updated summaries
        localStorage.setItem(
        "recent_summary",
        JSON.stringify([...existingSummary, newSummary])
        );
    } catch (error) {
        console.error("Error fetching news content:", error);

        dispatch({
        type: "ERROR",
        payload: error.response?.data?.message || error.message || "Failed to fetch news content",
        });
    }
    };

    const handleCopySummary = async () => {
    if (!newsContent?.summary) {
        dispatch({type: "SET_COPY_MESSAGE", payload: "'No summary available to copy.'"});
        return;
    }

    try {
        await navigator.clipboard.writeText(newsContent.summary);
        dispatch({type: "SET_COPY_MESSAGE", payload: 'Summary copied successfully!'});

        setTimeout(() => dispatch({type: "SET_COPY_MESSAGE", payload: ""}), 2500);
    } catch (error) {
        console.error('Failed to copy summary:', error);
        dispatch({type: "SET_COPY_MESSAGE", payload: "Unable to copy summary"});
    }
    };

    const handleShareArticle = async () => {
    if (!newsUrl) {
        console.error('No article URL available.');
        return;
    }

    const shareData = {
        title: newsContent?.title || 'News Article',
        text: newsContent?.summary || 'Check out this article.',
        url: newsUrl,
    };

    try {
        if (navigator.share) {
        await navigator.share(shareData);
        } else {
        await navigator.clipboard.writeText(newsUrl);
        alert('Sharing is not supported in this browser. Article link copied instead.');
        }
    } catch (error) {
        if (error.name !== 'AbortError') {
        console.error('Failed to share article:', error);
        }
    }
    };


    const setIsOpen = () => {
        dispatch({type: "TOGGLE_SIDEBAR"})
    }
    const updateUrl = (url) => {
        dispatch({type: "SET_NEWS_URL", payload: url});
    }
    const toggleDarkMode = () => {
        dispatch({ type: "TOGGLE_DARK_MODE" });
    }

    return (<GlobalContext.Provider value={{...state, setIsOpen, getNewsText, updateUrl, handleCopySummary, toggleDarkMode}}>{children}</GlobalContext.Provider>)
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}
