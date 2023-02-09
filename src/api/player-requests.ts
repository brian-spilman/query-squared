export type BasketballPlayer = {
    playerId:    number,
    fname:       string,
    lname:       string,
    bioMetrics:  BioMetrics,
    careerStats: CareerStats
}

export type BioMetrics = {
    heightInches: number,
    weightLbs:    number
}

export type CareerStats = {
    shotAttempts: number,
    madeBaskets:  number,
    rebounds:     number,
    assists:      number,
    blocks:       number
}

export type BasketballPlayerUpdate = {
    playerId: number,
    careerStats: CareerStats
}

export async function updatePlayer(basketballPlayer: BasketballPlayerUpdate):Promise<BasketballPlayer>{
    
    const query = `mutation UpdateStats($idToMerge: Int!, $shotsToMerge: Int, $bucketsToMerge: Int, $reboundsToMerge: Int,
        $assistsToMerge: Int, $blocksToMerge: Int){
      
      mergeStats(input:{
        playerId: $idToMerge
        shotAttempts: $shotsToMerge
        madeBaskets: $bucketsToMerge
        rebounds: $reboundsToMerge
        assists: $assistsToMerge
        blocks: $blocksToMerge
      }){
        __typename
        
        ... on BaksetballPlayer{
          lname
          careerStats{
            shotAttempts
            madeBaskets
            rebounds
            assists
            blocks
          }
        }
        
        ... on PlayerDoesNotExist{
          playerId
          message
        }
      }
    }`

    const variables = {
        idToMerge: basketballPlayer.playerId,
        shotsToMerge: basketballPlayer.careerStats.shotAttempts,
        blocksToMerge: basketballPlayer.careerStats.blocks,
        bucketsToMerge: basketballPlayer.careerStats.madeBaskets,
        reboundsToMerge: basketballPlayer.careerStats.rebounds,
        assistsToMerge: basketballPlayer.careerStats.assists
    };

    const requestBody = JSON.stringify({query:query, variables:variables});
    
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {
        method:"POST", 
        body:requestBody,
        headers: {
            "Content-Type":"application/json"
        }
    });

    const player:BasketballPlayer = await httpResponse.json();
    console.log(player);
    return player;
}

export async function getAllPlayers():Promise<BasketballPlayer[]>{

    const query = `query showAllPlayers{
        players{
          fname
          lname
          playerId
          careerStats{
            assists
            blocks
            madeBaskets
            rebounds
            shotAttempts
          }
        }
      }`;

    const requestBody = JSON.stringify({query:query});
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body:requestBody, headers:{"Content-Type":"application/json"}});
    const responseBody = await httpResponse.json();
    const players: BasketballPlayer[] = responseBody.data.players;
    console.log(players);
    return players;
}

export type PlayerInput = {
  fname: string,
  lname: string,
  heightInches: number,
  weightLbs: number
}
 
export async function addPlayer(newPlayer: PlayerInput):Promise<{playerId: number}>{
  
  const query = `mutation AddPlayer($playerInput: NewPlayerInput!) {
    addPlayer(input:$playerInput){
      playerId
      lname
    }
  }`;

  const variables = {playerInput:newPlayer};
  const requestBody: string = JSON.stringify({query, variables});
  const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body:requestBody, headers:{'Content-Type':"application/json"}});
  const responseBody = await httpResponse.json();
  const playerInfo:{playerId:number} = responseBody.data.addPlayer;
  return playerInfo;
}