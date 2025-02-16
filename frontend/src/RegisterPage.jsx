import NavBar from "./NavBar.jsx";
import Results from "./Results.jsx";
import Footer from "./Footer.jsx";
import UserInfo from "./UserInfo.jsx";
import RegisterButtons from "./RegisterButtons.jsx";
import UserInfoRegister from "./UserInfoRegister.jsx";

function RegisterPage() {
    return(
        <div className="flex justify-center"
        style={{
            flexDirection: "column",
        }}>
            <NavBar/>
            <UserInfoRegister/>
            <Footer/>
        </div>
    );
}

export default RegisterPage;