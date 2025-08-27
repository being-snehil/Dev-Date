import { Link } from "react-router-dom";
import {BASE_URL} from "../utils/constants"
import { useDispatch , useSelector } from "react-redux";
import { useNavigate} from "react-router-dom"
import {removeUser} from "../utils/userSlice"
import axios from "axios";


const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout =async () => {
try {
  const response = await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
  if (response.status === 200) {
    dispatch(removeUser());
    navigate("/login");
  }
} catch (error) {
  console.log(error.message);
}
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">👩‍💻 DevDate</Link>
      </div>
      {user && (
        <div className="flex gap-2">
          <div className="form-control pt-2">Welcome, {user.firstName}</div>
          <div className="dropdown dropdown-end mx-5 flex">
            <div
              tabIndex={0}
              role="button"
              className=" btn btn-ghost btn-circle avatar f"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
              <Link to="/connections">Connections</Link>
              </li>

              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default NavBar;