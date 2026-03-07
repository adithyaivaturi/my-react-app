import { Routes, Route } from "react-router-dom";
import JoinCreateRoom from "./screen/JoinCreateRoom";
import ChatRoom from "./screen/ChatRoom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<JoinCreateRoom />} />
      <Route path="/chat" element={<ChatRoom />} />
    </Routes>
  );
}

export default App;
