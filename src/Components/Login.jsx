import { useContext } from "react";
import { AuthContext } from "../authProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                navigate(`/${result.user?.email}`)
            })
            .catch(error => {
                console.error(error.message)
            })
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder="Email" />
                <input type="text" name="password" placeholder="Password" />
                <button>Login</button>
            </form>
        </div>
    );
};

export default Login;