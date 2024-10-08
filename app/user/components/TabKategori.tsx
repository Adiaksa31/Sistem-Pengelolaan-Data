'use client';
import "./dashboard.css";
import React, { useEffect, useState } from 'react';
import { User } from '../../../types/User';

const TabKategori: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
    }, []);

    return (
        <>
        <div className="pt-3 pb-4 px-10 text-sm font-medium text-center text-black">
            <ul className="flex flex-wrap space-x-3 -mb-px">
                {/* sesuaikan penanda active page nya */}

                {/* if user.posisi.id = 3 or 4 or 8 show Prospek Sale */}
                {user?.posisi.id === 3 || user?.posisi.id === 4 || user?.posisi.id === 8 ? (
                    <li className="me-2">
                        <a href="/user/dashboard?id=2" className="inline-block py-2 border-b-2 rounded-t-lg hover:text-D32124 hover:border-D32124">Prospek Sale</a>
                    </li>
                ) : null}

                {/* if user.posisi.id = 5 or 7 show Booking Service */}
                {user?.posisi.id === 5 || user?.posisi.id === 7 ? (
                    <li className="me-2">
                        <a href="/user/dashboard?id=1" className="inline-block py-2 border-b-2 rounded-t-lg hover:text-D32124 hover:border-D32124">Booking Service</a>
                    </li>
                ) : null}

                {/* if user.posisi.id = 5 or 6 show Sparepart */}
                {user?.posisi.id === 5 || user?.posisi.id === 6 ? (
                    <li className="me-2">
                        <a href="/user/dashboard?id=3" className="inline-block py-2 border-b-2 rounded-t-lg hover:text-D32124 hover:border-D32124">Sparepart</a>
                    </li>
                ) : null}

                {/* selalu ada */}
                <li className="me-2">
                    <a href="/user/dashboard?id=4" className="inline-block py-2 border-b-2 rounded-t-lg hover:text-D32124 hover:border-D32124 ">Keluhan</a>
                </li>
            </ul>
        </div>
        </>
    )
}

export default TabKategori;
