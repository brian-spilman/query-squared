import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { BasketballPlayer, BasketballPlayerUpdate, CareerStats, updatePlayer } from "../api/player-requests"

type UpdateForm = CareerStats & {playerId:number}

export function PlayerUpdateForm(){

    const [form, setForm] = useState<UpdateForm>({
        playerId: 0, 
        shotAttempts: 0,
        madeBaskets: 0,
        blocks: 0,
        rebounds: 0,
        assists: 0
    });

    const queryClient = useQueryClient();

    const updatePlayerMutation = useMutation(updatePlayer, {
        onSuccess: () => queryClient.invalidateQueries("players")
    });

    function submitData(){
        const playerFix: BasketballPlayerUpdate = {
            playerId:form.playerId,
            careerStats:{
                assists:form.assists,
                shotAttempts:form.shotAttempts,
                madeBaskets:form.madeBaskets,
                blocks:form.blocks,
                rebounds:form.rebounds
            }
        }

        updatePlayerMutation.mutate(playerFix)
    }

    return <>
    
        <fieldset>
            <legend>Player ID</legend>

            <input type="number" placeholder="0" onChange={e => setForm({...form, playerId:Number(e.target.value)})}/>

        </fieldset>

        <fieldset>
            <legend>Career Stats</legend>

            <label htmlFor="madeInput">Shots Made</label>
            <input id="madeInput" type="number" placeholder="0" onChange={e => setForm({...form, madeBaskets:Number(e.target.value)})}/>

            <label htmlFor="assistsInput">Assists</label>
            <input id="assistsInput" type="number" placeholder="185" onChange={e => setForm({...form, assists:Number(e.target.value)})}/>

            <label htmlFor="blocksInput">Blocks</label>
            <input id="blocksInput" type="number" placeholder="0" onChange={e => setForm({...form, blocks:Number(e.target.value)})}/>

            <label htmlFor="shotsInput">Shot Attempts</label>
            <input id="shotsInput" type="number" placeholder="74" onChange={e => setForm({...form, shotAttempts:Number(e.target.value)})}/>

            <label htmlFor="reboundInput">Rebounds</label>
            <input id="reboundInput" type="number" placeholder="0" onChange={e => setForm({...form, rebounds:Number(e.target.value)})}/>

        </fieldset>

        <button onClick={submitData}>Update Data</button>
    
    </>
}