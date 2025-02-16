import {useNavigate} from "react-router-dom";
import {useState} from "react";

function UserInfo() {


    const navigate = useNavigate();

    const [userForm, setUserForm] = useState({})
    const [auth, setAuth] = useState({})

    const setField = (field, value) => {
        setUserForm({
            ...userForm,
            [field]: value
        })
        setAuth({
            ...auth,
            [field]: value
        })
    }

    const handleSubmit = async (e)=> {
        e.preventDefault();
        console.log(userForm)

        let result = await fetch('http://localhost:3000/login', {
            method: 'POST',
            body: JSON.stringify({username: auth.username, password: userForm.password}),
            headers: {'Content-Type': 'application/json'}
        });
        localStorage.setItem('username', userForm.username);
        //result = await result.json();
        navigate("/");
    }

    const handleAuth = async (e)=> {
        e.preventDefault();
        console.log(auth)

        let result = await fetch('http://localhost:3000/auth/github', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        });
        //localStorage.setItem('username', userForm.username);
        //result = await result.json();
        navigate("/");
    }


    return (
        <>
            <div style = {{
                flexDirection: "column",
            }}>
            <div className = "flex justify-center">
                <label htmlFor="username" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Username: </label>
                <input onChange={(e) => setField('username', e.target.value)} type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                <br/>
                <br/>
            </div>

            <div className = "flex justify-center">
                <label htmlFor="password" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Password: </label>
                <input onChange={(e) => setField('password', e.target.value)} type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                <br/>
                <br/>
            </div>
            <br/>
            <br/>


            <div className="flex justify-center" >
                <button id="submit" onClick={handleSubmit} type="submit"
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> Enter
                </button>
                <button onClick={()=>navigate("/Register")} id="register" type="button"
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Register</button>
                <button onClick={handleAuth} id="githubButton" type="button"
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    GitHub LogIn </button>
            </div>
            </div>
        </>
    );
}

export default UserInfo;