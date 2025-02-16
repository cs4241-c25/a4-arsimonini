import NavBar from "./NavBar.jsx";
import Results from "./Results.jsx";
import Footer from "./Footer.jsx";

function ResultsPage() {
    return(
        <div className="flex justify-center"
        style={{
            flexDirection: "column",
        }}>
            <NavBar/>
            <Results/>
            <Footer/>
        </div>
    );
}

export default ResultsPage;