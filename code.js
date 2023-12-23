let huestate
let tuyastate

let hueslide
let tuyaslide


window.addEventListener("load", (event) => {
    hueslide = document.getElementById("hueswitch")
    tuyaslide = document.getElementById("tuyaswitch")

    fetch('http://192.168.1.108/api/N8XEfqFFnzGK7rF6XAfFvOmTQql06sqNwKkgi9Qf/lights/1', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then(json => {
        huestate = json.state.on
        hueslide.checked = huestate
    })
    .catch(error => {
        console.error('fetch Error:', error);
    });
    

    console.log(huestate)
})



function hueswitch(){
    fetch('http://192.168.1.108/api/N8XEfqFFnzGK7rF6XAfFvOmTQql06sqNwKkgi9Qf/lights/1/state', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"on": hueslide.checked})
    })
    .then((response) => response.json())
    .then(json => console.log(json))
    .catch(error => {
        console.error('fetch Error:', error);
    });
}



function tuyaswitch(bool){
    let url = "https://hueapi.steinerr06.repl.co/lightoff" 
    if(bool){ url = 'https://hueapi.steinerr06.repl.co/lighton'}

    fetch(url , {
        method: "GET", 
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => response.json())
    .then(json => console.log(json))
    .catch(error => {console.error('fetch Error:', error);}); 
}    