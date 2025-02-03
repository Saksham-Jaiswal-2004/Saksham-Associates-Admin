"use client"
import { useEffect, useState } from 'react';
import { MdLightMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

const ThemeToggle = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        setTheme(savedTheme);
        document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.body.classList.toggle('dark-mode', newTheme === 'dark');
    };

    return (
        <div className='flex gap-8 justify-center items-center text-2xl'>
          {(theme=='light')? <MdLightMode onClick={toggleTheme} id='theme-toggle'/> : <MdOutlineLightMode onClick={toggleTheme} id='theme-toggle'/>}
        </div>
    );
};

export default ThemeToggle;
