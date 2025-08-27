import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
   const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };
  
  return (
    <div className="relative w-96 h-[600px] rounded-3xl overflow-hidden group">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={photoUrl} 
          alt={`${firstName}'s photo`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>
      
      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold mb-1">
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <p className="text-white/80 text-lg">
                  {age} years old • {gender}
                </p>
              )}
            </div>
            <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse"></div>
          </div>
          
          <p className="text-white/90 mb-6 leading-relaxed">
            {about?.substring(0, 100)}{about?.length > 100 ? '...' : ''}
          </p>
          
          <div className="flex gap-4">
            <button onClick={() => handleSendRequest("ignored", _id)} className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-2xl py-4 px-6 transition-all duration-300 hover:scale-105 active:scale-95">
              <div className="flex items-center justify-center gap-2 text-white font-semibold">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Pass
              </div>
            </button>
            
            <button onClick={() => handleSendRequest("interested", _id)} className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-2xl py-4 px-6 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
              <div className="flex items-center justify-center gap-2 text-white font-semibold">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                </svg>
                Super Like
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;