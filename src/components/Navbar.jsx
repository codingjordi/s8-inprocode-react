import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <>
            <div>
                <h1>React MySQL</h1>
            </div>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/new">Create task</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}
