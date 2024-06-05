import "./dashboard.css";
import React from 'react';

const TabKategori = () => {

    return (
        <>
        <div className="pt-3 pb-4 px-10 text-sm font-medium text-center text-black">
            <ul className="flex flex-wrap space-x-3 -mb-px">
                <li className="me-2">
                    <a href="#" className="inline-block py-2 border-b-2 rounded-t-lg border-D32124 hover:text-D32124 hover:border-D32124 active">Prospek Sales</a>
                </li>
                <li className="me-2">
                    <a href="#" className="inline-block py-2 text-black border-b-2 border-transparent rounded-t-lg hover:text-D32124 hover:border-D32124 ">Keluhan</a>
                </li>
            </ul>
        </div>
        </>
    )
}

export default TabKategori;
