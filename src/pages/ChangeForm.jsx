/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react"
import { fetchData } from "../../utils/fetchData";
import {loginState,themeContext} from "../App"
import { jwtDecode } from "jwt-decode";
import { MdEmail } from "react-icons/md";
import { IoLogIn } from "react-icons/io5";
import { checkIsAdmin, loginReducer } from "../../reducers/actions";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { store } from "../../reducers/store";
import sign from "jwt-encode";
export default function ChangeForm() {
    let [isLoading,setIsLoading] = useState(false);
    let [email,setEmail] = useState("");
    let [isEmailValid,setIsEmailValid] = useState(false);
    let [emailError,setEmailError] = useState("");
    let [password,setPassword] = useState("");
    let [passwordToCheck,setPasswordToCheck] = useState("");
    let [passwordError,setPasswordError] = useState("");
    let [isPasswordValid,setIsPasswordValid] = useState(false);
    let [isRequestPassed,setIsRequestPassed] = useState(false);
    let {isDark,setIsDark} = useContext(themeContext);
    let {isLoggedIn,setIsLoggedIn,isAdmin,setIsAdmin} = useContext(loginState);
    let [newPassword,setNewPassword] = useState("");
    let [cookie,setCookie,removeCookie] = useCookies(["json_token"]);
    let dispatch = useDispatch();
    let emailFormRef = useRef();
    let passwordFormRef = useRef();
    store.subscribe(()=>{
        console.log("local data store is connected");
    })
    useEffect(()=>{
        setEmail(email);
        return ()=> setEmail("");
    },[email])
    useEffect(()=>{
        setIsEmailValid(isEmailValid);
        return ()=> setIsEmailValid(false);
    },[isEmailValid])
    useEffect(()=>{
        setEmailError(emailError);
        return ()=> setEmailError("");
    },[emailError])
    useEffect(()=>{
        setPassword(password);
        return ()=> setPassword("");
    },[password])
    useEffect(()=>{
        setPasswordError(passwordError);
        return ()=> setPasswordError("");
    },[passwordError])
    useEffect(()=>{
        setIsPasswordValid(isPasswordValid);
        return ()=> setIsPasswordValid(false);
    },[isPasswordValid]);
    useEffect(()=>{
        setIsLoading(isLoading);
        return ()=> setIsLoading(false);
    },[isLoading]);
    useEffect(()=>{
        setIsRequestPassed(isRequestPassed);
        return ()=> setIsRequestPassed(false);
    },[isRequestPassed]);
    useEffect(()=>{
        setPasswordToCheck(passwordToCheck);
        return ()=> setPasswordToCheck("");
    },[passwordToCheck]);
    useEffect(()=>{
        setNewPassword(newPassword);
        return ()=> setNewPassword("");
    },[newPassword]);
    async function handleEmailCheck(e){
        e.preventDefault();
        try {
            let request = await fetchData("/user/login/check_email","POST",{
                email:email.trim()
            },setIsLoading);
            setIsRequestPassed(true)
            if(jwtDecode(request.token).success){
                setIsEmailValid(true);
                emailFormRef.current?.classList.remove("shown");
                passwordFormRef.current?.classList.add("shown");
            }else{
                setIsEmailValid(false);
                emailFormRef.current?.classList.add("shown");
                passwordFormRef.current?.classList.remove("shown");
            }
            e.target.reset();
        } catch (error) {
            console.log(error);
        }
    }
    async function handlePasswordCheck(e){
        e.preventDefault();
        try {
            let response = await fetchData("/user/login/check_password","POST",{
                email:email.trim(),
                newPassword:newPassword.trim()
            },setIsLoading);
            setIsPasswordValid(jwtDecode(request.token).isPasswordValid);
            if(isPasswordValid){
                setIsPasswordValid(true);
                passwordFormRef.current?.classList.remove("shown");
                setIsLoggedIn(true);
                dispatch(loginReducer("LOGIN"));
                localStorage.setItem("isLoggedIn",true);
                localStorage.setItem("firstName",jwtDecode(response.token).firstName);
                localStorage.setItem("lastName",jwtDecode(response.token).lastName);
                localStorage.setItem("isAdmin",jwtDecode(response.token).isAdmin);
                localStorage.setItem("email",jwtDecode(response.token).email);
                localStorage.setItem("avatar",jwtDecode(response.token).avatar);
                if(jwtDecode(response.token).isAdmin){
                    localStorage.setItem("isAdmin",true);
                    setIsAdmin(true);
                    dispatch(checkIsAdmin("ADMIN"));
                }else{
                    localStorage.setItem("isAdmin",false);
                    setIsAdmin(false);
                    dispatch(checkIsAdmin("USER"));
                }
                let maxAge=60*60*24*3;
                console.log(jwtDecode(response.token));
                let {email,isAdmin,firstName,lastName} = jwtDecode(response.token)
                setCookie('json_token',sign({email,isAdmin,firstName,lastName},import.meta.env.VITE_SECRET_KEY),{
                    maxAge,
                    path:"/"
                })
                location.assign("/home");
            }else{
                setIsPasswordValid(false);
                passwordFormRef.current?.classList.add("shown");
            }
            e.target.reset();
        } catch (error) {
            console.log(error);
        }
    } 
    return (
        <main className="d-flex flex-column justify-content-center align-items-center login-page" style={{
            background:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#070F2B":"radial-gradient(circle at center, #fdfdfd 0%, #b4cbb7 100%)"
        }}>
            <section className="w-75 h-75 d-flex justify-content-center align-items-center">
                <form
                    ref={emailFormRef}
                    action="" className="w-75 h-75 d-flex flex-column justify-content-center align-items-center" onSubmit={(e)=>{
                        handleEmailCheck(e);
                    }}>
                    <div className="mb-3 w-75 d-flex flex-column justify-content-start align-items-center">
                        <label htmlFor="email">enter your email</label>
                        <input type="email" value={email} id="email" className={`form-label ${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`} required onChange={(e)=>setEmail(e.target.value)}/>
                        {
                            (isRequestPassed && !isEmailValid) && (
                                <p className={`form-label ${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"} ${isEmailValid?"text-success":"text-danger"}`}>{isEmailValid?"email is valid":"email is not valid"}</p>
                            )
                        }
                    </div>
                    <button className="btn btn-primary"><MdEmail size={20}/><span>verify email</span></button>
                </form>
                {
                    (isRequestPassed && isEmailValid) && (
                        <form action="" className="w-75 h-75 d-flex flex-column justify-content-center align-items-center" 
                            onSubmit={(e)=>{
                                handlePasswordCheck(e);
                            }}>
                            <div className="mb-3 w-75 d-flex flex-column justify-content-start align-items-center">
                                <label htmlFor="password" className={`form-label ${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>enter your password</label>
                                <input type="password" value={password} id="password" required onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                            <div className="mb-3 w-75 d-flex flex-column justify-content-start align-items-center">
                                <label htmlFor="new-password" className={`form-label ${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>enter your new password</label>
                                <input type="password" value={newPassword} id="new-password" required onChange={(e)=>setNewPassword(e.target.value)}/>
                            </div>
                            <div className="mb-3 w-75 d-flex flex-column justify-content-start align-items-center">
                                <input type="password" value={passwordToCheck} id="check-password" required onChange={(e)=>{
                                    setPasswordToCheck(e.target.value);
                                    setIsPasswordValid(e.target.value && (e.target.value == newPassword));
                                }}/>
                                <label htmlFor="check-password" className={`form-label ${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"} ${(password == passwordToCheck)?"text-success":"text-danger"}`}>
                                    {
                                        (passwordToCheck && (passwordToCheck == newPassword))?(
                                            <>
                                                password is valid
                                            </>
                                        ):(
                                            <>
                                                password is not valid
                                            </>
                                        )
                                    }
                                </label>
                            </div>
                            <button className="btn btn-primary"><IoLogIn size={20}/> <span>login</span></button>
                        </form>
                    )
                }
            </section>
        </main>
    )
}