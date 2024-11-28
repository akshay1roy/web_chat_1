
import React from 'react'
import './infobar.css'
import onlineIcon from '../../icons/onlineIcon.png'
import closeIcon from '../../icons/closeIcon.png'
import { Link } from 'react-router-dom'

export default function Infobar({room}) {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img src={onlineIcon} alt="" />
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <Link to='/'> <img src={closeIcon} alt="closeImage" /> </Link>
            </div>
        </div>
    )
}
