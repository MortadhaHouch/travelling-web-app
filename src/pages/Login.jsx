import "../App.css"
import {fetchData} from "../../utils/fetchData"
import { useContext, useState } from "react";
import {useCookies} from "react-cookie"
import {loginState} from "../App"
export const Login = () => {
    let [isLoading,setIsLoading] = useState(false);
    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");
    let [emailError,setEmailError] = useState("");
    let [passwordError,setPasswordError] = useState("");
    let [cookie,setCookie,removeCookie] = useCookies(["json_token"]);
    let {isLoggedIn,setIsloggedIn} = useContext(loginState);
    async function handleSubmit(e){
        e.preventDefault();
        try {
            let response = await fetchData("http://localhost:3000/user/login",null,"POST",{
                email:email.trim(),
                password:password.trim()
            },setIsLoading);
            console.log(response);
            if(response.email_error){
                setEmailError(response.email_error);
            }else{
                setEmailError("")
            }
            if(response.password_error){
                setPasswordError(response.password_error);
            }else{
                setPasswordError("")
            }
            if(response.token){
                let maxAge=60*60*24*3;
                setCookie("json_token",response.token,{
                    maxAge,
                    path:"/"
                });
                setIsloggedIn(true);
                e.target.reset();
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <main className="d-flex justify-content-center align-items-center bg-dark-subtle">
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
                    </form>
                </section>
            </main>
        </>
    )
}
