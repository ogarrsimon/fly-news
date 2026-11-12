const global_reducer = (state, action) => {
    if(action.type === "SET_NEWS_CONTENT") {
        return {...state, newsContent: action.payload, isLoading: false}
    }
    if(action.type === "SET_NEWS_URL") {
        return {...state, newsUrl: action.payload};
    }
    if(action.type === "TOGGLE_DARK_MODE") {
        return {...state, isDarkMode: !state.isDarkMode};
    }
    if(action.type === "TOGGLE_SIDEBAR") {
        return {...state, isOpen: !state.isOpen}
    }
    if(action.type === "ERROR") {
        console.log(action.payload)
        return {...state, isLoading: false, error: true, errorMessage: action.payload}
    }
    if(action.type === "SET_COPY_MESSAGE") {
        return {...state, copyMessage: action.payload}
    }
    return state
}

export default global_reducer;