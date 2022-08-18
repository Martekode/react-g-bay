import { Link } from "react-router-dom";

function MainNavigation() {
    return <header className="header">
        <div>
            <nav>
                <ul>
                    <li>
                        <Link className="test" to='/'>Home</Link>
                        <Link className="test" to='/profile'>Profile</Link>
                        <Link className="test" to='/checkout'>Checkout</Link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
}

export default MainNavigation;