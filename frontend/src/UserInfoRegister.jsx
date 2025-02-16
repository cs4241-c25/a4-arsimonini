import {useState} from "react";
import {useNavigate} from "react-router-dom";

function UserInfoRegister() {

    const navigate = useNavigate();

    const [form, setForm] = useState({})
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }
    const handleSubmit = async (e)=> {
        e.preventDefault();
        console.log(form)

        const id = crypto.randomUUID()

        let result = await fetch('http://localhost:3000/register', {
            method: 'POST',
            body: JSON.stringify({_id: id, username: form.username, password: form.password}),
            headers: {'Content-Type': 'application/json'}
        });
        //result = await result.json();
        navigate("/Login");
    }


    return(
        <>
            <div className="flex justify-center">
                <label htmlFor="username"
                       className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Username: </label>
                <input onChange={(e) => setField('username', e.target.value)} type="text" id="username"
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                <br/>
                <br/>
            </div>

            <div className="flex justify-center">
                <label htmlFor="password"
                       className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Password: </label>
                <input onChange={(e) => setField('password', e.target.value)} type="text" id="password"
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                <br/>
                <br/>
            </div>
            <br/>
            <br/>
            <div className="flex justify-center">
                <button id="submit" onClick={handleSubmit} type="submit"
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> Enter
                </button>
            </div>
        </>
    );
}

export default UserInfoRegister;