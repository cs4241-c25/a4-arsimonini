import {useState} from "react";
import {useEffect} from "react";

const url = "http://localhost:3000/table";


function Results() {

    const [dataTable, setDataTable] = useState([])

    useEffect(()=> {
    const getMyData = async () => {
        console.log("getting Data");
        const response = await fetch(url);
        const json = await response.json();


        let obj = json.filter((r) => {
            return r.username === localStorage.getItem("username");
        });
        setDataTable(obj);
    }

        getMyData();
    }, [])



    const handleEdit = async (e)=> {
        e.preventDefault();
        console.log(form)


        let result = await fetch('http://localhost:3000/update/' + form.id, {
            method: 'POST',
            body: JSON.stringify({_id: id, username: localStorage.getItem("username"), console: form.console, game: form.game, completion: form.completion, spent: form.spent, hours: form.hours, spentHour: spentHour}),
            headers: {'Content-Type': 'application/json'}
        });
        //result = await result.json();
        navigate("/Results");
    }


    const handleDelete = async (param)=> {
        //e.preventDefault();
        console.log(param)


        let result = await fetch('http://localhost:3000/delete/' + param, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        });

        //result = await result.json();
        window.location.reload();
        //navigate("/Results");
    }




    return (
        <div style = {{
            flexDirection: "column"}}>
            <h2>Results </h2>
            <p> This is where you can view previous answers as well as edit the data </p>
            <div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table id="bigTable" className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Index</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Console Company</th>
                            <th scope="col" className="px-6 py-3">Game Played</th>
                            <th scope="col" className="px-6 py-3">Completion</th>
                            <th scope="col" className="px-6 py-3">Money Spent</th>
                            <th scope="col" className="px-6 py-3">Hours Played</th>
                            <th scope="col" className="px-6 py-3">Hours Per Dollar</th>
                        </tr>
                        </thead>
                        <tbody id="bigTableBody">
                        {
                            dataTable.map((row, index)=> {
                                return (
                                    <tr key={index}>
                                        <td>{row._id}</td>
                                        <td>{row.username}</td>
                                        <td>{row.console}</td>
                                        <td>{row.game}</td>
                                        <td>{row.completion}</td>
                                        <td>{row.spent}</td>
                                        <td>{row.hours}</td>
                                        <td>{row.spentHour}</td>
                                        <td>
                                            <button onClick={handleEdit}>Edit</button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(row._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default Results