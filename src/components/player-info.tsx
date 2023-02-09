import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { BasketballPlayer, getAllPlayers } from "../api/player-requests";



export function PlayerInfo(){

    // const [players, setPlayers] = useState<BasketballPlayer[]>([]);

    // useEffect(()=>{
    //     (async () => {
    //         const retrievedPlayers = await getAllPlayers();
    //         setPlayers(retrievedPlayers);
    //     })()
    // }, []);

    const {isLoading, isError, data = []} = useQuery("players", getAllPlayers);

    if(isLoading){
        return <p>LOADING</p>
    }
    if(isError){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }

    return <>
    
        <h2>Player Info</h2>
        <table>
            <thead>
                <tr>
                    <th>Name [ID]</th> <th>Shots Made</th> <th>Assists</th> <th>Blocks</th> <th>Shot Attempts</th> <th>Rebounds</th> <th>ID</th>
                </tr>
            </thead>
            <tbody>
                {data.map(p => <tr><td>{p.fname} {p.lname}</td> <td>{p.careerStats.madeBaskets}</td> <td>{p.careerStats.assists}</td> 
                <td>{p.careerStats.blocks}</td> <td>{p.careerStats.shotAttempts}</td> <td>{p.careerStats.rebounds}</td> <td>{p.playerId}</td></tr>)}
            </tbody>
        </table>
    
    </>

}