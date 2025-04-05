

document.addEventListener("DOMContentLoaded", function () {
    try{
        // Read the category from the URL
        const params = new URLSearchParams(window.location.search);
        let selectedCategory = params.get("category");

        const courseContainer = document.getElementById("courses-layout");
        courseContainer.innerHTML = "";

        const resultLabel = document.createElement("h2");
        resultLabel.innerHTML = `${selectedCategory}`;
        courseContainer.appendChild(resultLabel)
        
        if (selectedCategory) {
            // Call function to filter courses
            filterCourses(selectedCategory);
        } else {
            resultLabel.innerHTML = "All Courses";
            loadCourse()
        }
    } catch(error){
        console.log('Error: ', error)
    }
    
});

//  function to filter category 
function filterCourses(category) {
    // Example: Fetch all courses and filter by category
    fetch("../../data.json") // Replace with your actual data source
        .then(response => response.json())
        .then(courses => {
            let filteredCourses = courses.filter(course => course.category === category);

            // Display courses on the page
            displayCourses(filteredCourses);
        });
}

// bringing data from json

async function loadCourse() {
    const response = await fetch("../../data.json")
    const courseContainer = await response.json()

    displayCourses(courseContainer)

}

// Function to display courses 
function displayCourses(categories) {
    const courseContainer = document.getElementById("courses-layout");
    const cards = document.createElement("div")
    cards.classList.add("cards")

    categories.forEach(category => {
        
        category.courses.forEach(course => {
            console.log(course)
            const card = document.createElement("a")
            card.classList.add("card")
            card.innerHTML =
            `  
                    <h4>${course.course}</h4>
                    <p>${category.category}</p>
                    <p>${course.lessons.length} </p>
                    
            `;
            
            card.href = `../lessons/lesson.html?course=${encodeURI(course.courses?.[0]?.course)}`
            
            cards.appendChild(card)
            courseContainer.appendChild(cards)

        })

        
        
    });

    
}

// Display searched courses
const input  = document.getElementById('input')
input.addEventListener("input", function() {
    
    const input = document.getElementById('input').value
    

        fetch("../../data.json") 
        .then(response => response.json())
        .then(courses => { 
            let search = courses.filter(course => course.courses?.[0]?.course.toLowerCase().includes(input.toLowerCase()) ||
            course.category.toLowerCase().includes(input.toLowerCase()) ) // filtring based on category and courses
            console.log(search)
            const courseContainer = document.getElementById("courses-layout");
            courseContainer.innerHTML = "";
            const resultLabel = document.createElement("h2");
            resultLabel.innerHTML = `Result for ${input}` || 'All Courses';
            courseContainer.appendChild(resultLabel)

            // Display courses on the page
            displayCourses(search);
            console.log(search)
        });

    
})

document.getElementById('search-button').addEventListener('click', function(e){
    e.preventDefault()
    searchArticle()
})


// ============================================================================================= 

