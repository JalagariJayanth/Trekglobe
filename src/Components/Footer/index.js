import {GoHomeFill} from "react-icons/go"
import {HiMail} from "react-icons/hi"
import {IoIosCall} from "react-icons/io"
import {FaFacebookF} from "react-icons/fa"
import {AiFillLinkedin} from "react-icons/ai"
import {FaSquareGithub} from "react-icons/fa6"
import "./index.css"

const Footer = () => {
    return (
        <div className="footer-background-container">
         <div className="footer-main-container">
                <div className="footer-content-card">
                  <p className="footer-content-text"> Trekglobe offers 'End to End' travel solutions, help you to find out the international and domestic airlines  and trains schedules in India for all major cities.</p>
                </div>
                <div className="footer-contact-card">
                     <h1 className="footer-contact-heading">Contact</h1>
                     <div className="footer-contact-card-section">
                        <GoHomeFill className="footer-icons" />
                        <p className="footer-contact-card-section-text">Kurnool</p>
                     </div>
                     <div className="footer-contact-card-section">
                        <IoIosCall className="footer-icons" />
                        <p className="footer-contact-card-section-text">8585858585</p>
                     </div>
                     <div className="footer-contact-card-section">
                        <HiMail className="footer-icons" />
                        <p className="footer-contact-card-section-text">support@trekglobe.com</p>
                     </div>
                    
                  </div>
                <div className="footer-contact-card">
                    <p className="footer-contact-heading">Connect with us</p>
                    <div className="connect-icons-container">
                        <FaFacebookF className="footer-icons" />
                        <AiFillLinkedin className="footer-icons" />
                        <FaSquareGithub className="footer-icons" />
                    </div>
                </div>
            </div>
            <hr className="line" />
            <p className="footer-copyright-text">© 2023 Copyright : trekglobe.com</p>
        </div>

    )
}
export default Footer