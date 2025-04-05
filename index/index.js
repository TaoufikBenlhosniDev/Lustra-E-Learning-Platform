
let contenair = []
const altLink = "https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg"
// bring data from json
async function loadCategories() {

    const response = await fetch("../../data.json")
    contenair = await response.json()
    displayInfo(contenair)
    console.log(contenair)

}

// Display Category information inside each card
function displayInfo(categories){

    const cards = document.querySelector('.cards') // Select element from html
    cards.innerHTML = "" // Empty cards div

    categories.forEach(category => {

        const card = document.createElement('div')
        card.classList.add('card')

        card.innerHTML = `
            <img src=${category.image} alt=""  >
            <h3><a href="../courses/courses.html?category=${encodeURIComponent(category.category)}">${category.category}</a></h3>
        `
        cards.appendChild(card)


    });


}

// Validate newsletter email 

const form  = document.querySelector('.form')

form.addEventListener("submit", function(e){
    e.preventDefault()
    const email = document.getElementById('email').value
    
    if (validateEmail(email)){
        console.log(email)
        alert("Thanks for subscribing!");
        form.reset();
        
       
        
    } else{
        alert("Please enter a valid email address.");
    }
    
})

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

loadCategories()