import { useRef } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/WhatsApp_Image_2024-02-24_at_20.46.19_a0be8a11-removebg-preview (1).png"
function DialogBox(props) {
    let ref = useRef();
    return (
        <section className={"dialog"+(!props.isShown?" shown":" hidden")} ref={ref}>
            <div className="bg-light-subtle">
                <div>
                    <h2 className="card-title">login</h2>
                </div>
                <img src={Logo} alt="" />
                <div className="card-body">
                    {
                        props.message
                    }
                    <br/>
                    {
                        props.message && <NavLink to="/user/login" className="btn btn-info">login</NavLink>
                    }
                </div>
            </div>
        </section>
    );
}

export {DialogBox};