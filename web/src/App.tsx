import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';

import './styles/main.css';
import logo from './Assets/logo.svg';
import axios from 'axios';


interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number;
    }
}

function App() {

    const [games, setGames] = useState<Game[]>([]);

    useEffect(()=>{
        axios('http://localhost:3333/games').then(response => {
           setGames(response.data);
        });
    }, []);

    return (
        <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
            <img src={logo} alt="logo" />
            <h1 className='text-6xl text-white font-black my-20'>Your <span className="text-transparent bg-nwl-gradient bg-clip-text">duo</span> is here</h1>

            <div className='grid grid-cols-6 gap-6 mt-8'>
                {games.map(game => {
                    return (
                        <GameBanner 
                            key={game.id}
                            bannerUrl={game.bannerUrl} 
                            title={game.title}
                            adsCount={game._count.ads} 
                        />
                    )
                })}             
            </div>
            
            <Dialog.Root>
                <CreateAdBanner />
                <CreateAdModal />
            </Dialog.Root>
        </div>
    );
};

export default App;
