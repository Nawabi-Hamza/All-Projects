"strict mode"

import * as model from "./model.js"
import recipeView from "./views/recipeView.js";



const recipeContainer = document.querySelector('.recipe');
const result = document.querySelector(".results")
const spinner = document.getElementById("spinner")
const message = document.getElementById("message")

spinner.style.display = "none"

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
// api = "https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza"
// await fetch(`https://forkify-api.herokuapp.com/v2/recipes/${recipe}`)
///////////////////////////////////////

// Render Single Recipe
// function renderRecipe(data){
//   const html = `
//       <figure class="recipe__fig">
//         <img src="${data.image}" alt="Tomato" class="recipe__img" />
//         <h1 class="recipe__title">
//           <span>${data.title}</span>
//         </h1>
//       </figure>

//       <div class="recipe__details">
//         <div class="recipe__info">
//         🕐
//           <!-- <svg class="recipe__info-icon">
//             <use href="src/img/icons.svg#icon-clock"></use>
//           </svg> -->
//           <span class="recipe__info-data recipe__info-data--minutes">${data.cookingTime}</span>
//           <span class="recipe__info-text">minutes</span>
//         </div>
//         <div class="recipe__info">
//          <!-- <svg class="recipe__info-icon">
//             <use href="src/img/icons.svg#icon-users"></use>
//           </svg> -->
//           👤
//           <span class="recipe__info-data recipe__info-data--people">${data.servings}</span>
//           <span class="recipe__info-text">servings</span>

//           <div class="recipe__info-buttons">
//             <button class="btn--tiny btn--increase-servings">
//               <!--<svg>
//                 <use href="src/img/icons.svg#icon-minus-circle"></use>
//               </svg>-->
//               ➖
//             </button>
//             <button class="btn--tiny btn--increase-servings">
//               <!--<svg>
//                 <use href="src/img/icons.svg#icon-plus-circle"></use>
//               </svg>-->
//               ➕
//             </button>
//           </div>
//         </div>

//         <div class="recipe__user-generated">
//           <!--<svg>
//             <use href="src/img/icons.svg#icon-user"></use>
//           </svg>-->
//           👤
//         </div>
//         <button class="btn--round">
//           <!--<svg class="">
//             <use href="src/img/icons.svg#icon-bookmark-fill"></use>
//           </svg>-->
//           🔖
//         </button>
//       </div>

//       <div class="recipe__ingredients">
//         <h2 class="heading--2">Recipe ingredients</h2>
//         <ul class="recipe__ingredient-list">
//       ${
//           data.ingredients.map( ing => 
//           `
//             <li class="recipe__ingredient">
//               <!--<svg class="recipe__icon">
//                 <use href="src/img/icons.svg#icon-check"></use>
//               </svg>-->
//               ✔️
//               <div class="recipe__quantity">${ing.quantity}</div>
//               <div class="recipe__description">
//                 <span class="recipe__unit">${ing.unit}</span>
//                 ${ing.description}
//               </div>
//             </li>
//           `
//         ).join('')
//       }
//         </ul>
//       </div>

//       <div class="recipe__directions">
//         <h2 class="heading--2">How to cook it</h2>
//         <p class="recipe__directions-text">
//           This recipe was carefully designed and tested by
//           <span class="recipe__publisher">${data.publisher}</span>. Please check out
//           directions at their website.
//         </p>
//         <a
//           class="btn--small recipe__btn"
//           href="${data.sourceUrl}"
//           target="_blank"
//         >
//           <span>Directions</span>
//           <!--<svg class="search__icon">
//             <use href="src/img/icons.svg#icon-arrow-right"></use>
//           </svg>-->
//           ➡️
//         </a>
//       </div>
//   `;
//   // recipeContainer.innerHTML = ''
//   spinner.style.display = "none"
//   recipeContainer.insertAdjacentHTML("afterbegin",html)
// }
// Display in sidebar
function renderRecipeAll(data){

  const markup = `
    <li class="preview">
      <a class="preview__link preview__link--active" href="#${data.id}">
        <figure class="preview__fig">
          <img src="${data.image_url}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${data.title}</h4>
          <p class="preview__publisher">The Pioneer Woman</p>
          <div class="preview__user-generated">
          👤
           <!-- <svg>
              <use href="src/img/icons.svg#icon-user"></use>
            </svg> -->
          </div>
        </div>
      </a>
    </li>`;
    result.insertAdjacentHTML('beforeend', markup);
}

const showRecipe = async function(){
  try{
    const recipeId = window.location.hash.replace('#','');
    if(!recipeId) return;
    await model.loadRecipe(recipeId)
    const { recipe } = model.state
    // renderRecipe(recipe)
    recipeView.render(recipe)
  }catch(err){
    console.error(err)
  }
}
window.addEventListener("hashchange",showRecipe)
// showRecipe('5ed6604591c37cdc054bc886')



async function getRecipe(recipe="pizza"){
  fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipe}`)
  .then( res => res.json() )
  .then( data => {
    if(data.status!=="success") throw new Error("Something went wrong Recipe not found !");
    data.data.recipes.splice(0,10).map( item=> renderRecipeAll(item) )
    // console.log(data.data.recipes.splice(0,5))
  }).catch( err => console.error(err))
}
getRecipe()

const searchBtn = document.querySelector(".search__btn")

searchBtn.addEventListener('click',function(e){
  e.preventDefault()
  message.style.display = "none"
  spinner.style.display = "block"
  const searchInput = document.querySelector(".search__field").value;
  if(searchInput.trim()!==''){
    getRecipe(searchInput);
  }else{
    alert("Please enter a valid recipe name")
  }

})

