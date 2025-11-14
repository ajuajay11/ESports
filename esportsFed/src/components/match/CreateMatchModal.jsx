import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function CreateMatchModal({ close }) {
  const token = useSelector((state) => state.auth.user.token);
 
  const [match, setMatch] = useState({
    matchId: "",
    password: "",
  });
  const createMatch = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      const res = await axios.post(
        "http://localhost:3000/api/match/create-match/",
        match
      );
      console.log(res);
      if(res.status === 201 || res.status === "201"){
         <Navigate to={`/room/${res?.data?.match?._id}`}/>;
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  const autoMatchId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";
    for (let i = 0; i < 6; i++) {
      id += chars[Math.floor(Math.random() * chars.length)];
    }
    setMatch({ ...match, matchId: id });
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Create Match</h2>
        <div className="space-y-3">
          <form onSubmit={createMatch} className="flex flex-col gap-5">
            <div className="flex flex-col justify-end">
              <input
                type="text"
                name="matchId"
                value={match.matchId}
                required
                onChange={(e) =>
                  setMatch({ ...match, [e.target.name]: e.target.value })
                }
                placeholder="Match ID"
                className="w-full border rounded-md px-3 py-2"
              />
              <span className="text-end" onClick={autoMatchId}>
                AutoMatch
              </span>
            </div>
            <input type="password" name="password" value={match.password}
              onChange={(e) =>
                setMatch({ ...match, [e.target.name]: e.target.value })
              }
              required
              placeholder="Password"
              className="w-full border rounded-md px-3 py-2"
            />
            <div className="mt-5 flex justify-end gap-3">
              <button className="px-4 py-2 bg-gray-400 rounded-md" onClick={close} >
                {" "}
                Cancel{" "}
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md">
                {" "}
                Create{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateMatchModal;
