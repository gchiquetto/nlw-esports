import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { GameController } from 'phosphor-react';

import './styles/main.css';
import logo from './Assets/logo.svg';
import { Input } from './components/Form/Input';



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
        fetch('http://localhost:3333/games')
        .then(response => response.json())
        .then(data => {
           setGames(data);
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
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>
                    <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                        <Dialog.Title className='text-3xl font-black'>Publish here an Ad</Dialog.Title>
                            <form className="mt-8 flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="font-semibold" htmlFor="game">What's the game?</label>
                                    <Input id="game" type="text" placeholder="Select the game you want to play" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name">Your name (or nickname)</label>
                                    <Input id="name" type="text" placeholder="How are you called inside the game?" />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="yearsPlaying">Time playing this game?</label>
                                        <Input id="yearsPlaying" type="numer" placeholder="It's okay to be zero" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="discord">What's your discord?</label>
                                        <Input id="discord" type="text" placeholder="User#0000" />
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="weekDays">When do you usually play?</label>

                                        <div className="grid grid-cols-4 gap-2">
                                            <button 
                                             className="w-8 h-8 rounded bg-zinc-900"
                                             title="Sunday">S</button>
                                            <button 
                                             className="w-8 h-8 rounded bg-zinc-900"
                                             title="Monday">M</button>
                                            <button 
                                             className="w-8 h-8 rounded bg-zinc-900"
                                             title="Tuesday">T</button>
                                            <button 
                                             className="w-8 h-8 rounded bg-zinc-900"
                                             title="Wednesday">W</button>
                                            <button 
                                             className="w-8 h-8 rounded bg-zinc-900"
                                             title="Thursday">T</button>
                                            <button 
                                             className="w-8 h-8 rounded bg-zinc-900"
                                             title="Friday">F</button>
                                            <button 
                                             className="w-8 h-8 rounded bg-zinc-900"
                                             title="Saturday">S</button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 flex-1">
                                        <label htmlFor="hourStart">What time?</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input id="hourStart" type="time" placeholder="From" />
                                            <Input id="hourEnd" type="time" placeholder="To" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-2 flex gap-2 text-sm">
                                    <input type="checkbox" />
                                    I use voice chat
                                </div>

                                <footer className='mt-4 flex justify-end gap-4'>
                                    <Dialog.Close
                                        type="button"
                                        className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancel</Dialog.Close>
                                    <button 
                                        className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600" 
                                        type="submit">
                                        <GameController size={24} />
                                        Find duo
                                    </button>
                                </footer>
                            </form>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};

export default App;
