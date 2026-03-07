import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { useLocation,useNavigate } from "react-router-dom";

function ChatRoom() {
  console.log("start");
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState("");

  const location = useLocation();
  console.log(location);
  const query = new URLSearchParams(location.search);
  console.log(query);
  console.log("Hub URL:", import.meta.env.VITE_CHAT_HUB_URL);

  const name = query.get("name");
  const room = query.get("room");
  const navigate = useNavigate();
  console.log(name,room);

  useEffect(() => {
      console.log("useEffect");
    if (!room || !name) return;
    
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(import.meta.env.VITE_CHAT_HUB_URL)
      .withAutomaticReconnect()
      .build();
      console.log("useEffectds",newConnection);

    newConnection.on("ReceiveMessage", (user, msg) => {
      console.log("receive");
      console.log("oldmessages",messages);
      setMessages(prev => [...prev, { user, msg }]);
      console.log("messages",messages);
    });

    newConnection.start()
      .then(async () => {
        const result=await newConnection.invoke("JoinGroup", room);
        if(result==="Room does not exist"){
          navigate(`/`);
          alert(result);
          return ;
        }
        console.log("result",result);
        await newConnection.invoke("JoinMessage", room, name);
      })
      .catch(err => console.error(err));

    setConnection(newConnection);

    return () => {
      newConnection.stop();
      console.log("stop");
    };

  }, [room, name]);

  const sendMessage = async () => {
            console.log("sendMessage");
    if (connection && message.trim() !== "") {
      await connection.invoke("SendMessage", room, name, message);
      setMessage("");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Room: {room}</h2>

      <div>
        {messages.map((m, index) => (
          <div key={index}>
            <strong>{m.user}</strong>: {m.msg}
          </div>
        ))}
      </div>

      <br />

      <input
        value={message}
        placeholder="Type message..."
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatRoom;