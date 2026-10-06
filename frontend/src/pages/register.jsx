import { Link } from 'react-router-dom'

function Register ( { setId } ) {
    async function handleSubmit(e) {
        e.preventDefault();

        const submission = e.target;
        const formdata = new FormData(submission);
        const email = formdata.get("email");
        const username = formdata.get("username");
        const password = formdata.get("password");

        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            }),
        })

        const data = await response.json();
        localStorage.setItem("userId", data.id);
        setId(data.id);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" placeholder="Email" name="email" />
                </div>
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