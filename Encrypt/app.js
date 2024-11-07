// console.log("hash")
/////////////////////////Encrypt
let text = "Hamza"

console.log(text)

text  = text.toString()

let hexa = ''
for(let key of text){ // H = 4824
    console.log(key.charCodeAt().toString(16))
    const random = Math.floor(Math.random() * 10); // 2
    const random2 = Math.floor(Math.random() * 10); // 4
    hexa += key.charCodeAt().toString(16)+random.toString()+random2.toString()
} 

console.log(hexa)

// ////////////////////Decrypt
let m = []
let threeChar = ''
let n = 1;

for(let key of hexa){
    
    if(n<=4) threeChar += key
    
    // console.log(key)
    if(n>=4) {
        m.push(threeChar)
        n = 1
        threeChar = ''
    }else n++;
}

console.log(m)

let finalHexaDecimal = []
for(let key of m){
    finalHexaDecimal.push(key.slice(0,2))
}

console.log(finalHexaDecimal.join(""))


let final = []
for(let key of finalHexaDecimal){
    // console.log(String.fromCharCode(parseInt(key, 16)))
    final.push(String.fromCharCode(parseInt(key, 16)))
}

console.log(final.join(""))

