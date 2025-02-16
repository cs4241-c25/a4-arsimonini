import NavBar from "./NavBar.jsx";
import Survey from "./Survey.jsx";
import Results from "./Results.jsx";
import Footer from "./Footer.jsx";

function HomePage() {
    return(
        <div className="flex justify-center" style = {{
            flexDirection: "column",
        }}>
            <NavBar/>
            <Survey/>
            <Results/>
            <Footer/>
        </div>
    );
}

export default HomePage;