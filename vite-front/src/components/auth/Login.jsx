import axios from "axios";
import { useState } from "react";


const loginUrl = 'http://localhost:3000/api/auth/login '

function Login() {

    const [authState, setAuthState] = useState({
        email: 'james@bond.com',
        password: '123456',
    });

    // function handleEmailInput(event) {
    //     console.log('event.target.name===', event.target.name)
    //     setAuthState({ ...authState, email: event.target.value });
    // }

    // function handlePassInput(event) {
    //   console.log('event.target.name===', event.target.name)
    //     setAuthState({ ...authState, password: event.target.value });
    // }

    function handleInput(event) {
        const { name, value } = event.target
        console.log('name===', name)
        setAuthState({ ...authState, [name]: value });
    }

    //jsdoc
    /**
     * 
     * @param {SubmitEvent} event 
     */
    function handleLogin(event) {
        event.preventDefault();
        console.log('js in control');

        //validation

        axios. post(loginUrl, authState)
        .then(ats => {
            console.log('ats===', ats);
            const {token} = ats.data;
            console.log('token ===', token);
            // issaugoti token i localstorage
            localStorage.setItem('bit_token', token);
            
        })
        .catch((error) => {
            console.log('ivyko klaida:', error);
          const errorAxios =  error.response.data;
          console.log('errorAxios ===', errorAxios);
        });
    }

    return (
        <div>
            <h2>Login</h2>
            <h3>{authState.email} - {authState.password}
            </h3>
            <form onSubmit={handleLogin} noValidate>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        onChange={handleInput}
                        value={authState.email}
                        type="email"
                        name='email'
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    <input
                        onChange={handleInput}
                        value={authState.password}
                        type="password"
                        name='password'
                        className="form-control"
                        id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default Login