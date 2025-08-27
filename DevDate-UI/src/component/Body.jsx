import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDispatch , useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios"; // Add this import
import { useNavigate} from "react-router-dom"

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(store=>store.user);
  
  const fetchUser = async () => {
    try {
      const user = await axios.get(BASE_URL + "/profile", { withCredentials: true });
      dispatch(addUser(user.data));
    } catch (error) {
      navigate("/login");
      console.log(error.message);
    }
  };

  useEffect(() => {
    if(!userData){
   fetchUser();
    }
 
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;