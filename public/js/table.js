window.onload = async function() {
    const response = await fetch("/table", {
        method: 'GET',
        headers: {"Content-Type": "application/json"}
    })

    const test = await response.json()
    console.log(test)
    currAllData = test

    const data = test

    let obj = data.filter((r) => {
        return r.userName === localStorage.getItem("username");
    });

    const bod = document.getElementById("bigTableBody")
    bod.innerHTML = ""
    for (let i = 0; i < obj.length; i++) {
        //console.log( "car:", cars[i]);
        const newRow = document.createElement("tr")
        const indexData = document.createElement("td")
        const nameData = document.createElement("td")
        const consoleData = document.createElement("td")
        const gameData = document.createElement("td")
        const completionData = document.createElement("td")
        const spentData = document.createElement("td")
        const hoursData = document.createElement("td")
        const sphrData = document.createElement("td")


        indexData.innerText = obj[i]._id
        nameData.innerText = obj[i].userName
        consoleData.innerText = obj[i].favConsole
        gameData.innerText = obj[i].favGame
        completionData.innerText = obj[i].completed
        spentData.innerText = obj[i].moneySpent
        hoursData.innerText = obj[i].hoursPlayed
        sphrData.innerText = obj[i].spentPlayer

        newRow.appendChild(indexData)
        newRow.appendChild(nameData)
        newRow.appendChild(consoleData)
        newRow.appendChild(gameData)
        newRow.appendChild(completionData)
        newRow.appendChild(spentData)
        newRow.appendChild(hoursData)
        newRow.appendChild(sphrData)

        bod.appendChild(newRow)
    }
}