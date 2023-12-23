let huestate
let tuyastate

let hueslide
let tuyaslide

let bothbutton
let huebutton
let tuyabutton


window.addEventListener("load", (event) => {
    bothbutton = document.getElementById("bothbutton")
    huebutton = document.getElementById("huebutton")
    tuyabutton = document.getElementById("tuyabutton")

    hueslide = document.getElementById("hueswitch")
    tuyaslide = document.getElementById("tuyaswitch")

    let query = window.location.search.match(/\?mode\=(both|hue|tuya)$/)

    let wrongurl
    if(query == null){
        wrongurl = true
    }else{
        wrongurl = false
    }
    
    if(wrongurl){
        window.location.href = "/?mode=both"
    }

    selectmode()



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

    
    fetch('https://hueapi.steinerr06.repl.co/lightstatus', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then(json => {
        tuyastate = json.value
        tuyaslide.checked = tuyastate
    })
    .catch(error => {
        console.error('fetch Error:', error);
    });
    
    


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



function tuyaswitch(){
    let url = "https://hueapi.steinerr06.repl.co/lightoff" 
    if(tuyaslide.checked){ url = 'https://hueapi.steinerr06.repl.co/lighton'}

    fetch(url , {
        method: "GET", 
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => response.json())
    .then(json => console.log(json))
    .catch(error => {console.error('fetch Error:', error);}); 
}    




function selectmode(){
    mode = window.location.search.match(/(both|hue|tuya)/)[0]

    console.log(mode)
    
    if(mode == "both"){
        bothbutton.style.backgroundColor = "red"
        


    }else if(mode == "hue"){
        huebutton.style.backgroundColor = "red"
    }else if(mode == "tuya"){
        tuyabutton.style.backgroundColor = "red"
    }

}