import {useNavigate} from "react-router-dom";
import Footer from "./Footer.jsx";

function GHConfirmation() {

    const navigate = useNavigate();

    const handleClick = async (e)=> {
        e.preventDefault()

        let result = await fetch('http://localhost:3000/GH', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        });
        localStorage.setItem('username', await result.json());
        localStorage.getItem('username');
        navigate("/");
    }
    return (
        <div style = {{flexDirection: "column"}}>

            <h2>GitHub Account Confirmed</h2>
            <button id="refresh" onClick={handleClick} type="submit"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> Go to Home
            </button>

            <Footer/>
        </div>

    )
}

export default GHConfirmation