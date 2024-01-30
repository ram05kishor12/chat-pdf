"use client";
import TypewriterComponent from 'typewriter-effect';
import { Montserrat } from 'next/font/google';

export default function Type() {

return (
    <div className='text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-green-500 text-4xl font-semibold sm:text-5xl md:text-6xl lg:text-6xl space-y-5'>
        <TypewriterComponent
            options={{
                strings: ['Chat in real time', 'Query in realtime'],
                autoStart: true,
                loop: true,
            }}
        />
    </div>
);

}
