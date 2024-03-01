import { useContext, useState } from "react";
import {fetchData} from "../../utils/fetchData"
import {useCookies} from "react-cookie"
import {loginState} from "../App"
import {jwtDecode} from "jwt-decode"
import { store } from "../../reducers/store";
import { useDispatch } from "react-redux";
import { loginReducer } from "../../reducers/actions";
export const Signup = () => {
    store.subscribe(()=>{
        console.log("local data store connected");
    })
    function handlingTokenDecoding(token){
        return jwtDecode(token)
    }
    let [firstName,setFirstName] = useState("");
    let [lastName,setLastName] = useState("");
    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");
    let [isLoading,setIsLoading] = useState(false);
    let [emailError,setEmailError] = useState("");
    let [nameError,setNameError] = useState("");
    let [cookie,setCookie,removeCookie] = useCookies(["json_token"]);
    let {isLoggedIn,setIsLoggedIn} = useContext(loginState);
    let dispatch = useDispatch()
    async function handleSubmit(e){
        e.preventDefault();
        try {
            let response = await fetchData("http://localhost:3000/user/signup","POST",{
                firstName:firstName.trim(),
                lastName:lastName.trim(),
                email:email.trim(),
                password:password.trim()
            },setIsLoading);
            console.log(response);
            if(handlingTokenDecoding(response.token).email_existence_error){
                setEmailError(handlingTokenDecoding(response.token).email_existence_error);
            }else{
                setEmailError("")
            }
            if(handlingTokenDecoding(response.token).firstName_existence_error){
                setNameError(handlingTokenDecoding(response.token).firstName_existence_error)
            }else{
                setNameError("")
            }
            if(!handlingTokenDecoding(response.token).email_existence_error && !handlingTokenDecoding(response.token).firstName_existence_error){
                let maxAge=60*60*24*3;
                setCookie("json_token",response.token,{
                    maxAge,
                    path:"/"
                })
                dispatch(loginReducer("LOGIN"));
                setIsLoggedIn(true);
                e.target.reset();
                location.assign("/destinations");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <main className="d-flex justify-content-center align-items-center bg-dark-subtle signup-page">
                <section className="w-75 h-75 d-flex justify-content-center align-items-center">
                    <form action="" className="w-75 h-75 d-flex flex-column justify-content-center align-items-center" onSubmit={(e)=>{
                        handleSubmit(e)
                    }}>
                        <div className="mb-3 w-75 d-flex flex-column justify-content-start align-items-center">
                            <label htmlFor="first_name" className="form-label">first name</label>
                            <input
                                required
                                type="text"
                                className="form-control w-75"
                                name=""
                                id="first_name"
                                placeholder="name"
                                value={firstName}
                                onChange={(e)=>{
                                    setFirstName(e.target.value);
                                }}
                            />
                            <p>{nameError}</p>
                        </div>
                        <div className="mb-3 w-75 d-flex flex-column justify-content-start align-items-center">
                            <label htmlFor="last name" className="form-label">last name</label>
                            <input
                                required
                                type="text"
                                className="form-control w-75"
                                name=""
                                id="last name"
                                placeholder="last name"
                                value={lastName}
                                onChange={(e)=>{
                                    setLastName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="mb-3 w-75 d-flex flex-column justify-content-start align-items-center">
                            <label htmlFor="email" className="form-label">email</label>
                            <input
                                required
                                type="email"
                                className="form-control w-75"
                                name=""
                                id="email"
                                placeholder="abc@mail.com"
                                value={email}
                                onChange={(e)=>{
                                    setEmail(e.target.value);
                                }}
                            />
                            <p>{emailError}</p>
                        </div>
                        <div className="mb-3 w-75 d-flex flex-column justify-content-start align-items-center">
                            <label htmlFor="password" className="form-label">password</label>
                            <input
                                required
                                type="password"
                                className="form-control w-75"
                                name=""
                                id="password"
                                placeholder="password"
                                value={password}
                                onChange={(e)=>{
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                        <button type="submit" className={`btn btn-primary ${isLoading?"disabled":""}`} disabled={isLoading}>
                            Submit
                        </button>
                    </form>
                </section>
            </main>
        </>
    )
}
