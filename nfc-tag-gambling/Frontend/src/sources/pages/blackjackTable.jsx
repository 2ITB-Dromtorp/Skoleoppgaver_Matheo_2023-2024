import '../../css/blackJackTable.css'

import { socket } from "../../App";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { RoomIdContext } from "../../context";

export default function BlackjackTable() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);

  const { roomId} = useContext(RoomIdContext);


  useEffect(() => {
    socket.on("sendInPlayerThatJoinedGame", (name) => setPlayers(prevPlayers => [...prevPlayers, name]));

    return () => {
      socket.off("sendInPlayerThatJoinedGame", setPlayers);
    };
  }, []);

  function startGame(){
    navigate("/insideGame");
  }

  return (
    <div className='blackjackTable'>
        <h1>{roomId}</h1>
        {players.map((player, index) => <p key={index}>{player}</p>)}
        <button onClick={()=>startGame()}>Start the game</button>
    </div>
  );
};