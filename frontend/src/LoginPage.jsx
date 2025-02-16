import NavBar from "./NavBar.jsx";
import Results from "./Results.jsx";
import Footer from "./Footer.jsx";
import UserInfo from "./UserInfo.jsx";
import LoginButtons from "./LoginButtons.jsx";

function LoginPage() {
    return(
        <div style = {{
            flexDirection: "column",
        }}>
            <NavBar/>
            <UserInfo/>
            <Footer/>
        </div>
    );
}

export default LoginPage;