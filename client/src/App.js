
import {  BrowserRouter, Routes, Route } from "react-router-dom"
import Join from "./components/join/Join";
import Chat from "./components/chat/Chat";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact  element={<Join/>}/>
        <Route path="/chat" element={<Chat/>}/>
      </Routes>
     </BrowserRouter>
  );
}

export default App;
