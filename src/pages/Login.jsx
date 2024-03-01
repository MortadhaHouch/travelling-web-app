import "../App.css"
import {fetchData} from "../../utils/fetchData"
import { useContext, useState } from "react";
import {useCookies} from "react-cookie"
import {loginState} from "../App"
import {jwtDecode} from "jwt-decode"
import { NavLink } from "react-router-dom";
import {useDispatch} from "react-redux";
import { loginReducer,checkIsAdmin } from "../../reducers/actions.js";
import { store } from "../../reducers/store.js";
export const Login = () => {
    let [isLoading,setIsLoading] = useState(false);
    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");
    let [emailError,setEmailError] = useState("");
    let [passwordError,setPasswordError] = useState("");
    let [cookie,setCookie,removeCookie] = useCookies(["json_token"]);
    let dispatch = useDispatch();
    store.subscribe(()=>{
        console.log("local data store is connected");
    })
    function handlingTokenDecoding(token){
        return jwtDecode(token)
    }
    let {isLoggedIn,setIsLoggedIn,isAdmin,setIsAdmin} = useContext(loginState);
    async function handleSubmit(e){
        e.preventDefault();
        try {
            let response = await fetchData("http://localhost:3000/user/login","POST",{
                email:email.trim(),
                password:password.trim()
            },setIsLoading);
            console.log(jwtDecode(response.token));
            if(handlingTokenDecoding(response.token).email_error){
                setEmailError(handlingTokenDecoding(response.token).email_error);
                setIsLoggedIn(false);
                setIsAdmin(false);
                dispatch(loginReducer("LOGOUT"));
            }else{
                setEmailError("");
                setIsLoggedIn(false);
                setIsAdmin(false);
                dispatch(loginReducer("LOGOUT"));
            }
            if(handlingTokenDecoding(response.token).password_error){
                setPasswordError(handlingTokenDecoding(response.token).password_error);
                setIsLoggedIn(false);
                setIsAdmin(false);
                dispatch(loginReducer("LOGOUT"));
            }else{
                setPasswordError("");
                setIsLoggedIn(false);
                setIsAdmin(false);
                dispatch(loginReducer("LOGOUT"));
            }
            if(!handlingTokenDecoding(response.token).password_error && !handlingTokenDecoding(response.token).email_error){
                let maxAge=60*60*24*3;
                setCookie("json_token",response.token,{
                    maxAge,
                    path:"/"
                });
                setIsLoggedIn(true);
                dispatch(loginReducer("LOGIN"));
                e.target.reset();
                if(handlingTokenDecoding(response.token).isAdmin){
                    setIsAdmin(true);
                    dispatch(checkIsAdmin("ADMIN"));
                }else{
                    setIsAdmin(false);
                    dispatch(checkIsAdmin("USER"));
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <main className="d-flex justify-content-center align-items-center bg-dark-subtle login-page">
                <section className="w-75 h-75 d-flex justify-content-center align-items-center">
                    <form action="" className="w-75 h-75 d-flex flex-column justify-content-center align-items-center" onSubmit={(e)=>{
                        handleSubmit(e)
                    }}>
                        <div className="mb-3 w-75 d-flex flex-column justify-content-start align-items-center">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                required
                                type="email"
                                className="form-control w-75"
                                name=""
                                id="email"
                                aria-describedby="emailHelpId"
                                placeholder="abc@mail.com"
                                onChange={(e)=>{
                                    setEmail(e.target.value)
                                }}
                                />
                                <p>{emailError}</p>
                            </div>
                            <div className="mb-3 w-75 d-flex flex-column justify-content-start align-items-center">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                required
                                type="password"
                                className="form-control w-75"
                                name=""
                                id="password"
                                placeholder="password"
                                onChange={(e)=>{
                                    setPassword(e.target.value);
                                }}
                            />
                            <p>{passwordError}</p>
                        </div>
                        <button type="submit" className={`btn btn-primary ${isLoading?"disabled":""}`}>
                            Submit
                        </button>
                        <div className="w-100 h-auto d-flex flex-column justify-content-center align-items-center">
                            {
                                emailError?(
                                    <>
                                        <p>not logged in?? please signup</p>
                                        <li className="nav-item list-unstyled btn btn-warning">
                                            <NavLink className="nav-link" to="/user/signup">signup</NavLink>
                                        </li>
                                    </>
                                ):""
                            }
                        </div>
                    </form>
                </section>
            </main>
        </>
    )
}
