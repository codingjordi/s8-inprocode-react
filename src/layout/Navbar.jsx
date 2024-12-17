import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <header>
            <div>
                <h1>Inpro App</h1>
            </div>
            <nav >
                <ul className='flex'>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/new">Map</Link>
                    </li>
                    <li>
                        <Link to="/new">Calendar</Link>
                    </li>
                    <li>
                        <Link to="/new">Graphics</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
