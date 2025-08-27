import { configureStore } from "@reduxjs/toolkit";

import feedReducer from "./feedSlice.jsx";
import userReducer from "./userSlice.jsx";
import connectionReducer from "./connectionSlice.jsx"
import requestReducer from "./requestSlice.jsx"

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestReducer,
  },
});

export default appStore;