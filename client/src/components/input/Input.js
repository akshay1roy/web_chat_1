import React from 'react'
import './input.css'
export default function Input({ message, setMessage, sendMessage }) {
    return (
        <form action="" className="form">
            <input className='input' placeholder='Type a message...' type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button className='sendButton' onClick={(event) => sendMessage(event)}>send</button>
        </form>
    )
}
