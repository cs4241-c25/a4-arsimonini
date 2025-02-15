


const submitRegistration = async function( event ) {
    console.log("is running");

    event.preventDefault()
    const gameInput0 = document.querySelector("#username")
    const gameInput1 = document.querySelector("#password")


    const json = {
        "_id": crypto.randomUUID(),
        username: gameInput0.value,
        password: gameInput1.value,
       }

    const body = JSON.stringify(json)


    await fetch("/register", {
        method: 'POST',
        body: body,
        headers: {"Content-Type": "application/json"}
    })

    location.replace("login.html");

}


const gitButton = async function( event ) {
    await fetch('/auth/github', {
        method: "GET",
        //headers: {"Content-Type": "application/json"}
    })
}



const submitLogin = async function( event ) {
    console.log("is running");

    event.preventDefault()
    const gameInput0 = document.querySelector("#username")
    const gameInput1 = document.querySelector("#password")


    const json = {
        "_id": crypto.randomUUID(),
        username: gameInput0.value,
        password: gameInput1.value,
    }

    const body = JSON.stringify(json)


    const response = await fetch("/login", {
        method: 'POST',
        body: body,
        headers: {"Content-Type": "application/json"}
    })

    const data = await response.json()
    console.log("This is the User Data: ",data.username)
    localStorage.setItem('username', data.username);

    location.replace("index.html");

}

