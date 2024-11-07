






const modalBtn = document.getElementById("modal-btn")
const modalContainer = document.getElementById("modal")

modalBtn.addEventListener("click",()=>{
    modalContainer.classList.toggle("modal")
})

modalContainer.addEventListener("click",(e)=>{
    // console.log(e.target.id)
    if(e.target.id === "modal"){
        modalContainer.classList.toggle("modal")
    }
})