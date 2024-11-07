
const inputBox = document.getElementById("code")
const displayResult = document.getElementById('display')




// -----------Encryption-----------

function Encrypt(text){
    text  = text.toString()
    let hexa = ''
    for(let key of text){
        // console.log(key.charCodeAt().toString(16))
        const random = Math.floor(Math.random() * 10);
        const random2 = Math.floor(Math.random() * 10);
        hexa += key.charCodeAt().toString(16)+random.toString()+random2.toString()
    } 
    return hexa
}
// console.log(Encrypt("Hamza"))


document.getElementById("encode").addEventListener("click",function(e){
    e.preventDefault()
    const result = Encrypt(inputBox.value)
    console.log(result)
    displayResult.textContent = result
})


// -----------------------Decrypt-------------------
function Decode(hash){
    // take four character then push in array from hash
    let splitFourChar = []
    let elementArray = ''
    let n = 1;
    for(let key of hash){
        if(n<=4) elementArray += key
        if(n>=4) {
            splitFourChar.push(elementArray)
            n = 1
            elementArray = ''
        }else n++;
    }

    console.log(splitFourChar)
    // take from each element of array take two of them
    let finalHexaDecimal = []
    for(let key of splitFourChar){
        finalHexaDecimal.push(key.slice(0,2))
    }

    console.log(finalHexaDecimal)


    let hexaToChar = []
    for(let key of finalHexaDecimal){
        console.log(hexaToChar)
        // console.log(String.fromCharCode(parseInt(key, 16)))
        hexaToChar.push(String.fromCharCode(parseInt(key, 16)))
    }

    console.log(hexaToChar.join(""))
    return { hash:hexaToChar.join("") }
}

// Decode(" ")
function checkHexaDecimal(value){
    return (/^([a-f0-9]{4,})$/.test(value))      
}

// checkHexaDecimal("6826a")
document.getElementById("decode").addEventListener("click",function(e){
    e.preventDefault()
    const validation = checkHexaDecimal(inputBox.value)
    console.log(validation)
    if(!validation)return displayResult.textContent = "Please Enter Valid Hash "
    const { hash } = Decode(inputBox.value);
    displayResult.textContent = hash
})