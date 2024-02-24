import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram,FaTiktok,FaReddit,FaFacebook,FaWhatsapp } from "react-icons/fa";
export const Footer = () => {
    return (
        <footer className="container-fluid bg-dark text-light p-1 text-center d-flex flex-column justify-content-center align-items-center g-1">
            <div className="d-flex justify-content-center align-items-center p-1 w-auto">
                <FaFacebook size={30} color="" className="m-1"/>
                <FaReddit size={30} color="" className="m-1"/>
                <FaXTwitter size={30} color="" className="m-1"/>
                <FaInstagram size={30} color="" className="m-1"/>
                <FaTiktok size={30} color="" className="m-1"/>
                <FaWhatsapp size={30} color="" className="m-1"/>
            </div>
        </footer>
    )
}
