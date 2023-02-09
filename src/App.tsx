import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RegisterPlayerForm } from './components/player-creation-form';
import { PlayerInfo } from './components/player-info';
import { PlayerUpdateForm } from './components/player-update-form';

const queryClient = new QueryClient();

function App() {
  return <>

    <QueryClientProvider client={queryClient}>
      <PlayerInfo/>
      <PlayerUpdateForm/>
      <RegisterPlayerForm/>
    </QueryClientProvider>
  
  </>
}

export default App;
