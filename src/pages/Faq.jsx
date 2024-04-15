/* eslint-disable no-unused-vars */
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import { store } from "../../reducers/store"
import { themeContext } from "../App";
import { fetchData } from "../../utils/fetchData";
import { jwtDecode } from "jwt-decode";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { AiFillLike } from "react-icons/ai"
import { AiFillDislike } from "react-icons/ai";
export const Faq = () => {
  let [faq,setFaq] = useState("");
  let [componentName,setComponentName] = useState("add-faq");
  let [numberOfWords,setNumberOfWords] = useState(0);
  let [responseMessage,setResponseMessage]= useState("");
  let [faqs,setFaqs] = useState([]);
  let [isLoading,setIsLoading] = useState(false);
  let notificationRef = useRef();
  function getNumberOfWords(text){
    let words = []
    text.split(" ").forEach(element => {
      words.push(element.trim())
    });
    return words.filter(Boolean).length;
  }
  store.subscribe(()=>{
    console.log("local data store is connected");
  })
  let {isDark,setIsDark} = useContext(themeContext);
  async function handleSubmit(e){
    e.preventDefault()
    try {
      let request = await fetchData("/faqs/add","POST",{
        faq:faq.trim(),
        email:localStorage.getItem("email")
      },setIsLoading)
      if(jwtDecode(request.message).message){
        setResponseMessage(jwtDecode(request.message).message);
        setFaq("");
        notificationRef?.current?.classList.remove("hidden");
        setTimeout(()=>{
          notificationRef?.current?.classList.add("hidden");
        },4000)
    }
    } catch (error) {
      console.log(error);
    }
  }
  async function getData(){
    try {
      let request = await fetchData("/faqs","GET",null,setIsLoading);
      setFaqs(jwtDecode(request.response).faqs)
      console.log(jwtDecode(request.response));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getData()
  },[])
  useEffect(()=>{
    setComponentName(componentName)
  },[componentName])
  return (
    <>
      <main className="d-flex flex-column justify-content-start align-items-center" style={{
          backgroundColor:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#070F2B":"#F2F1EB"
        }}>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="add-faq-tab"
              data-bs-toggle="tab"
              data-bs-target="#add-faq"
              type="button"
              role="tab"
              aria-controls="add-faq"
              aria-selected="true"
              onClick={()=>setComponentName("add-faq")}
            >
              add-faq
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="faqs-tab"
              data-bs-toggle="tab"
              data-bs-target="#see-faqs-tab"
              type="button"
              role="tab"
              aria-controls="see-faqs-tab"
              aria-selected="false"
              onClick={()=>setComponentName("see-faqs-tab")}
            >
              see-faqs
            </button>
          </li>
        </ul>
        <div className="tab-content w-100 h-100">
          <section
            className="tab-pane active w-100 h-100 d-flex justify-content-center align-items-center flex-wrap"
            id="add-faq"
            role="tabpanel"
            aria-labelledby="faq-tab"
          >
            {
              componentName == "add-faq" &&
              (
                <form action="" method="post" className="d-flex flex-column justify-content-center align-items-center w-50 h-100" onSubmit={handleSubmit}>
                  <div className="mb-3 w-75 h-75 d-flex flex-column justify-content-start align-items-center">
                    <label htmlFor="faq" className={`form-label ${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>Faq</label>
                    <textarea 
                      name="" 
                      id="" 
                      cols="30" 
                      rows="10" 
                      required
                      className="form-control w-75 h-100"
                      placeholder="faq"
                      value={faq}
                      onChange={(e)=>{
                        setFaq(e.target.value)
                        setNumberOfWords(getNumberOfWords(faq))
                      }}
                      onBlur={(e)=>{
                        setNumberOfWords(getNumberOfWords(faq))
                      }}
                    ></textarea>
                  </div>
                    <p className={`form-label ${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{numberOfWords} words
                    </p>
                  <button className="btn btn-info">post Faq</button>
                </form>
              )
            }
          </section>
          <section
            className="tab-pane w-100 h-100 feedback-cards-container d-flex justify-content-center align-items-center flex-wrap"
            id="see-faqs-tab"
            role="tabpanel"
            aria-labelledby="see-faqs-tab"
          >
            {
              componentName == "see-faqs-tab" && (
                faqs.length !== 0 ? faqs.map((item,index)=>{
                  return(
                    <Suspense key={index}>
                      <div className="feedback-card" style={{
                        boxShadow:(isDark || JSON.parse(localStorage.getItem("isDark")))?"2px 2px 4px 1px rgba(0,0,100,0.2),-2px -2px 4px 1px rgba(0,0,0,.2)":"2px 2px 4px 1px rgba(0,0,0,.2),-2px -2px 4px 1px rgba(255,255,255,0.2)",
                      }}>
                        <div>
                          <img src={item.avatar.path} alt="" className="avatar"/>
                          <h4 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{item.firstName} {item.lastName}</h4>
                          <h5 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"} opacity-75`}><MdOutlineAlternateEmail /> {item.sender}</h5>
                        </div>
                        <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{item.content}</p>
                        <div>
                          {
                            item.reactors.map((el,i)=>{
                              return(
                                <div key={i}>
                                  <img src={el.reactorAvatar} alt="" />
                                  <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{el.reactorFirstName}</p>
                                  <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{el.reactorLastName}</p>
                                  <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{el.content}</p>
                                  <input type="checkbox" name="" id="" className="form-control" checked={el.isLiked}/>
                                  <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}><AiFillLike size={20}/> {el.numberOfLikes}</p>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    </Suspense>
                  )
                }):(
                  <p className={`form-label ${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>No faqs are posted yet</p>
                )
              )
            }
          </section>
        </div>
        {
          responseMessage && responseMessage.trim()!=="" && 
          (
            <div className={`d-flex flex-column justify-content-center align-items-center notification`} ref={notificationRef} style={{
              backgroundColor:(isDark || JSON.parse(localStorage.getItem("isDark")))?"rgb(59, 89, 152)":"rgb(0, 211, 63)"
            }}>
              <p className={`form-label ${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>
                {
                  responseMessage
                }
              </p>
            </div>
          )
        }
      </main>
    </>
  )
}