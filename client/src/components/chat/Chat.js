import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client'
import './chat.css'
import Infobar from '../infobar/Infobar';
import Input from '../input/Input';
import Messages from '../messages/Messages';

let socket;

export default function Chat() {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const ENDPOINT = 'http://localhost:5000';

  const location = useLocation();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    // console.log(name, room);

    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

   

  }, [location.search])


  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages])


  // function for sending messages
  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }


  console.log(message, messages);


  return (
    <div className="outerContainer">
      <div className="container">
        <Infobar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />

      </div>
    </div>

  )
}
