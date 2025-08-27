import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./component/Body.jsx";
import Login from "./component/login.jsx";
import Profile from "./component/Profile.jsx";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Connections from "./component/Connections.jsx"
import Feed from "./component/Feed.jsx";
import Requests from "./component/Requests.jsx"
import Chat from "./component/Chat.jsx"
import AboutUs from "./component/about.jsx"

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
              <Route path="/about" element={<AboutUs />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}
export default App;