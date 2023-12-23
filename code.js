let huestate
let tuyastate

let hueslide
let tuyaslide
let bothslide

let bothbutton
let huebutton
let tuyabutton

let bothcontent
let huecontent
let tuyacontent



window.addEventListener("load", async (event) => {
    bothbutton = document.getElementById("bothbutton")
    huebutton = document.getElementById("huebutton")
    tuyabutton = document.getElementById("tuyabutton")

    bothcontent = document.getElementById("bothcontent")
    huecontent = document.getElementById("huecontent")
    tuyacontent = document.getElementById("tuyacontent")

    hueslide = document.getElementById("hueswitch")
    tuyaslide = document.getElementById("tuyaswitch")
    bothslide = document.getElementById("bothswitch")


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


    await fetch('http://192.168.1.108/api/N8XEfqFFnzGK7rF6XAfFvOmTQql06sqNwKkgi9Qf/lights/1', {
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

    
    await fetch('https://hueapi.steinerr06.repl.co/lightstatus', {
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
    
    

    console.log(tuyastate, huestate)
    if(tuyastate && huestate){
        bothslide.checked = true;
    }else{
        bothslide.checked = false;
    }


})



function hueswitch(){
    fetch('http://192.168.1.108/api/N8XEfqFFnzGK7rF6XAfFvOmTQql06sqNwKkgi9Qf/lights/1/state', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"on": hueslide.checked})
    })
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

function bothswitch(){
    fetch('http://192.168.1.108/api/N8XEfqFFnzGK7rF6XAfFvOmTQql06sqNwKkgi9Qf/lights/1/state', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"on": bothslide.checked})
    })
    .catch(error => {
        console.error('fetch Error:', error);
    });


    let url = "https://hueapi.steinerr06.repl.co/lightoff" 
    if(bothslide.checked){ url = 'https://hueapi.steinerr06.repl.co/lighton'}
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
    
    if(mode == "both"){
        bothbutton.style.backgroundColor = "red"
        bothcontent.style.display = "block"


    }else if(mode == "hue"){
        huebutton.style.backgroundColor = "red"
        huecontent.style.display = "block"
    }else if(mode == "tuya"){
        tuyabutton.style.backgroundColor = "red"
        tuyacontent.style.display = "block"
    }

}