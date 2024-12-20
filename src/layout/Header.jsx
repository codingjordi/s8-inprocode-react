import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className='w-full px-2 md:px-4 lg:px-8  flex items-center justify-between'>
            <div className='text-5xl font-semibold'>
                Inpro App
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
