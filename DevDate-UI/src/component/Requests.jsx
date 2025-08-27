import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const reviewRequest = async (status, _id) => {
    try {
      setLoading(true);
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recevied", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-300 mb-2">No Connection Requests</h2>
          <p className="text-gray-500">When someone wants to connect with you, it will appear here.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Connection Requests</h1>
          <p className="text-gray-400">People who want to connect with you</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="badge badge-primary badge-lg">{requests.length} pending</span>
          </div>
        </div>

        {/* Request Cards */}
        <div className="space-y-4">
          {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              request.fromUserId;

            return (
              <div
                key={_id}
                className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="card-body p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Profile Image */}
                    <div className="avatar">
                      <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={photoUrl || "/default-avatar.png"}
                          alt={`${firstName} ${lastName}`}
                          onError={(e) => {
                            e.target.src = "/default-avatar.png";
                          }}
                        />
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-grow">
                      <h2 className="text-2xl font-bold text-white mb-1">
                        {firstName + " " + lastName}
                      </h2>
                      {age && gender && (
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                          <span className="badge badge-ghost">{age} years</span>
                          <span className="badge badge-ghost">{gender}</span>
                        </div>
                      )}
                      {about && (
                        <p className="text-gray-300 line-clamp-2">
                          {about}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                      <button
                        className="btn btn-success flex-1 sm:flex-initial"
                        onClick={() => reviewRequest("accepted", request._id)}
                        disabled={loading}
                      >
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Accept
                      </button>
                      <button
                        className="btn btn-ghost btn-outline flex-1 sm:flex-initial"
                        onClick={() => reviewRequest("rejected", request._id)}
                        disabled={loading}
                      >
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;