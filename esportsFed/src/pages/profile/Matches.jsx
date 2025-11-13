import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
export default function Matches() {
  const token = useSelector((state) => state.auth.user.token);
  const [role, setRole] = useState("all");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
const params = useSearchParams();
console.log(params);

  useEffect(() => {
    if (!token) return;
    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
        const res = await axios.get(
          `http://localhost:3000/api/match/matches?role=${role}`
        );
        setMatches(res.data.matches || []);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load matches");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [role, token]);

  if (!token) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-600">You must be signed in to view matches.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => setRole("admin")}
          className={`px-3 py-1 rounded ${role === "admin" ? "bg-indigo-600 text-white" : "bg-white border"}`}
        >
          Admin
        </button>
        <button
          onClick={() => setRole("participant")}
          className={`px-3 py-1 rounded ${role === "participant" ? "bg-indigo-600 text-white" : "bg-white border"}`}
        >
          My Matches
        </button>
        <button
          onClick={() => setRole("all")}
          className={`px-3 py-1 rounded ${role === "all" ? "bg-indigo-600 text-white" : "bg-white border"}`}
        >
          All
        </button>
      </div>

      {loading && <div className="text-sm text-gray-500">Loading...</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {!loading && matches.length === 0 && (
        <div className="text-sm text-gray-600">No matches found for role: {role}</div>
      )}

      <div className="grid gap-3">
        {matches.map((m) => (
          <div key={m._id} className="p-3 bg-white rounded shadow-sm border">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium">Match ID: {m.matchId}</div>
                <div className="text-xs text-gray-500">Created By: {m.createdBy || "—"}</div>
                <div className="text-xs text-gray-500">Participants: {m.participants?.length || 0}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
 