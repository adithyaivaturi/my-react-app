import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JoinCreateRoom.css";

function JoinCreateRoom() {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
        console.log("Hub room:", import.meta.env.VITE_API_URL_Room_Create);

  const createRoom = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_API_URL_Room_Create, {
        method: "POST"
      });
      const newRoomId = await res.text();
      navigate(`/chat?name=${name}&room=${newRoomId}`);
    } catch (error) {
      console.error("Backend not available for room creation:", error);
      alert("Backend not deployed. Simulating room creation.");
      const newRoomId = Math.random().toString(36).substr(2, 9);
      navigate(`/chat?name=${name}&room=${newRoomId}`);
    }
  };

  const joinRoom = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL_check_Room}/${roomId}`,
        {
          method: "POST"
        }
      );
      const result = await res.text();
      if (result === "Room is exist") {
        navigate(`/chat?name=${name}&room=${roomId}`);
      } else {
        alert("Room does not exist");
      }
    } catch (error) {
      console.error("Backend not available for room check:", error);
      alert("Backend not deployed. Simulating room join.");
      navigate(`/chat?name=${name}&room=${roomId}`);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Chat Room</h2>

      <input
        placeholder="Enter Your Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <button onClick={createRoom}>Create Room</button>

      <hr />

      <input
        placeholder="Enter Room ID"
        onChange={(e) => setRoomId(e.target.value)}
      />
      <br /><br />
            <input
        placeholder="Enter Your Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
}

export default JoinCreateRoom;