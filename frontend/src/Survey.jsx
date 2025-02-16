import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

function Survey() {
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
        const spentHour = parseFloat(form.spent) / parseFloat(form.hours);

        let result = await fetch('http://localhost:3000/submit', {
            method: 'POST',
            body: JSON.stringify({_id: id, username: localStorage.getItem("username"), console: form.console, game: form.game, completion: form.completion, spent: form.spent, hours: form.hours, spentHour: spentHour}),
            headers: {'Content-Type': 'application/json'}
        });
        //result = await result.json();
        window.location.reload();
    }



    return (
        <>

            <h2>Survey Questions</h2>
            <br/>
            <br/>
            <div className="flex justify-center">
                <form>
                    <label htmlFor="favCon" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">1) What type of Console did you play the game on?:</label>
                    <select onChange={(e) => setField('console', e.target.value)} id="favCon"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-96">
                        <option value="Select Console Company"> Select Console Company</option>
                        <option value="Nintendo"> Nintendo</option>
                        <option value="Microsoft"> Microsoft</option>
                        <option value="Sony"> Sony</option>
                    </select>
                    <br/>
                    <br/>
                    <label htmlFor="favGame" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">2) What is the name of the Game you played?: </label>
                    <input onChange={(e)=>setField('game',e.target.value)} type="text" id="favGame"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    <br/>
                    <br/>
                    <label htmlFor="compl" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">3)
                        What percentage of completion do you have?: </label>
                    <select onChange={(e) => setField('completion', e.target.value)} id="compl"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-96">
                        <option value="Select Percentage"> Select Percentage</option>
                        <option value="0%"> 0%</option>
                        <option value="25%"> 25%</option>
                        <option value="50%"> 50%</option>
                        <option value="75%"> 75%</option>
                        <option value="100%"> 100%</option>
                        <option value="100+%"> 100+%</option>
                        <option value="Unsure"> Unsure</option>
                    </select>
                    <br/>
                    <br/>
                    <label htmlFor="spent" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">4) About how much did you Spend on the Game?: </label>
                    <input onChange={(e)=>setField('spent',e.target.value)} type="number" id="spent"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    <br/>
                    <br/>
                    <label htmlFor="hours" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">5) About how long have you Played the Game?: </label>
                    <input onChange={(e)=>setField('hours',e.target.value)} type="number" id="hours"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    <br/>
                </form>
            </div>
            <div>
                <button id="submit" onClick={handleSubmit} type="submit"
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> Submit
                </button>
            </div>
        </>
    )
}

export default Survey

