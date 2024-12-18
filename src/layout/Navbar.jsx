import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <header className='w-full flex items-center justify-between'>
            <div>
                <h1>Inpro App</h1>
            </div>
            <nav >
                <ul className='flex'>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/map">Map</Link>
                    </li>
                    <li>
                        <Link to="/calendar">Calendar</Link>
                    </li>
                    <li>
                        <Link to="/graphics">Graphics</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
