import Logo from "../../assets/ntnu-logo-white.png";

//footer component with ntnu logo and group number
export default function Footer () {
    return (
        <footer>
            <a href="https://www.ntnu.no/"><img src={Logo} alt="NTNU logo" /></a>
            <p>Created by Group 5 ©</p>
        </footer>
    )
}