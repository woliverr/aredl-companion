import { Link } from 'react-router-dom'

function Login ({ setId }) {

    async function handleSubmit(e) {
        e.preventDefault();

        const submission = e.target;
        const formdata = new FormData(submission);
        const email = formdata.get("email");
        const password = formdata.get("password");

        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        });

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
                    <input type="password" placeholder="Password" name="password" />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>New user? <Link to="/register">Sign up!</Link></p>
        </div>
    )
}

export default Login