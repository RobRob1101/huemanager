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

let huecolorpicker
let tuyacolorpicker
let bothcolorpicker



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

    huecolorpicker = document.getElementById("huecolorpicker")
    tuyacolorpicker = document.getElementById("tuyacolorpicker")
    bothcolorpicker = document.getElementById("bothcolorpicker")


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

function huecolor(){
    let col = hexToRgb(huecolorpicker.value)
    col = RGBtoHUE(col.r, col.g ,col.b)   
    let value = [col.x, col.y]

    fetch('http://192.168.1.108/api/N8XEfqFFnzGK7rF6XAfFvOmTQql06sqNwKkgi9Qf/lights/1/state', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"xy": value})
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

function tuyacolor(){
    let col = hexToRgb(tuyacolorpicker.value)
    let url = `https://hueapi.steinerr06.repl.co/lightcolor/${col.r}/${col.g}/${col.b}`

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
function bothcolor(){
    let col = hexToRgb(bothcolorpicker.value)

    let value = RGBtoHUE(col.r, col.g ,col.b)   
    value = [value.x, value.y]

    fetch('http://192.168.1.108/api/N8XEfqFFnzGK7rF6XAfFvOmTQql06sqNwKkgi9Qf/lights/1/state', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"xy": value})
    })
    .catch(error => {
        console.error('fetch Error:', error);
    });


    let url = `https://hueapi.steinerr06.repl.co/lightcolor/${col.r}/${col.g}/${col.b}`
    fetch(url , {
        method: "GET", 
        headers: {
            'Content-Type': 'application/json',
        },
    })
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



function RGBtoHUE(r, g, b){
    //https://stackoverflow.com/questions/22564187/rgb-to-philips-hue-hsb

    r = r / 255
    g = g / 255
    b = b / 255
    
    console.log(r, g, b)


    // Make red more vivid
    if (r > 0.04045) {
        red = Math.pow((r + 0.055) / (1.0 + 0.055), 2.4);
    } else {
        red = r / 12.92;
    }

    // Make green more vivid
    if (g > 0.04045) {
        green = Math.pow((g + 0.055) / (1.0 + 0.055), 2.4);
    } else {
        green = g / 12.92;
    }

    // Make blue more vivid
    if (b > 0.04045) {
        blue = Math.pow((b + 0.055) / (1.0 + 0.055), 2.4);
    } else {
        blue = b / 12.92;
    }

    const X = red * 0.649926 + green * 0.103455 + blue * 0.197109;
    const Y = red * 0.234327 + green * 0.743075 + blue * 0.022598;
    const Z = red * 0.0000000 + green * 0.053077 + blue * 1.035763;

    const x = X / (X + Y + Z);
    const y = Y / (X + Y + Z);

    return {x: x, y: y};
    
}


function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    console.log(hex, result)

    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }