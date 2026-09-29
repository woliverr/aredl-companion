import { Link } from 'react-router-dom'

function Register () {
    return (
        <div>
            <form action="login">
                <div>
                    <input type="text" placeholder="Username" name="username" />
                </div>
                <div>
                    <input type="password" placeholder="Password" name="password" />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Sign in!</Link></p>
        </div>
    )
}

export default Register