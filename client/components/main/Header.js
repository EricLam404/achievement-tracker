import React from "react";
import Link from "next/link";

function Header() {
    return (
        <div className="flex justify-between px-20 items-center h-20 text-white bg-gradient-to-r from-teal-400 via-blue-400 to-teal-400 text-shadow-sm shadow-sm">
            <a href="/" className="text-2xl font-bold">Achievement Tracker</a>
            <Link href="/profile">
                <div className="text-xl font-semibold hover:text-gray-200">
                    Profile
                </div>
            </Link>
        </div>
    );
}

export default Header;
