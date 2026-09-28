function Login () {
    return (
        <div>
            <form action="login">
                <div>
                    <input type="text" placeholder="Username" name="username" />
                </div>
                <div>
                    <input type="password" placeholder="Password" name="password" />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login