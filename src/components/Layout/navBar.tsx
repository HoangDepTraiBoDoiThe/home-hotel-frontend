import React from 'react'
import { Link } from "react-router-dom"
import { CircleUser } from "lucide-react"

const NavBar: React.FC = () => {
    return (
        <nav className="sticky top-0 bg-gray-200 h-24 flex items-center shadow-md">
            <div className="container px-4 mx-auto flex justify-between items-center">
                <Link to="/" className="flex gap-2 items-center" aria-label="Home">
                    <img alt="Home Hotel Logo" src="/vite.svg" width={60} height={60} />
                    <h1 className="text-2xl font-bold">Home Hotel</h1>
                </Link>
                <Link
                    to="/account"
                    className="flex items-center p-2 hover:bg-gray-300 rounded-full transition-colors"
                    aria-label="Account"
                >
                    <CircleUser size={40} aria-hidden="true" />
                </Link>
            </div>
        </nav>
    )
}

export default React.memo(NavBar)