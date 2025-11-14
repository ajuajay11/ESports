import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../socket";
import axios from "axios";
import { useSelector } from "react-redux";
import ParticipantsList from "../../components/match/ParticipantsList";

export default function MatchRoom() {
  const { matchId } = useParams();
  const user = useSelector((state) => state.auth.user.user);
  const token = useSelector((state) => state.auth.user.token);
 
  const isAdmin = user?.isSubscribed?.isActive === true;

  const [participants, setParticipants] = useState([]);

  // --------------------
  // START SOCKET LOGIC
  // --------------------
  function startSocket() {
    socket.connect();

    if (!isAdmin) {
      socket.emit("join-room", {
        matchId,
        userId: user._id,
        username: user.username,
      });
    } else {
      socket.emit("observe-room", {
        matchId,
        adminName: user.username,
      });
    }

    // listen for players joining
    socket.on("userJoined", (userData) => {
      setParticipants((prev) => {
        const exists = prev.some((p) => p.userId === userData.userId);
        return exists ? prev : [...prev, userData];
      });
    });

    // listen for players leaving
    socket.on("userLeft", (userId) => {
      setParticipants((prev) => prev.filter((p) => p.userId !== userId));
    });
  }

  // --------------------
  // LOAD PARTICIPANTS FROM API
  // --------------------
  useEffect(() => {
    async function loadParticipants() {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;

      const res = await axios.get(
        `http://localhost:3000/api/match/participants?matchId=${matchId}`
      );

      // backend returns: { participants: [...] }
      setParticipants(res.data.participants);

      startSocket();
    }

    loadParticipants();

    return () => {
      socket.emit("leave-room", { matchId, userId: user._id });
      socket.disconnect();

      // remove old listeners
      socket.off("userJoined");
      socket.off("userLeft");
    };
  }, [matchId, user._id]);
  // user._id ensures correct cleanup when switching accounts

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Match ID: {matchId}</h1>

      <h2 className="mt-4 text-lg">
        You are logged in as: <b>{isAdmin ? "Admin" : "Player"}</b>
      </h2>

      <ParticipantsList participants={participants} />
    </div>
  );
}
