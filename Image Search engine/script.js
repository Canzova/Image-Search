let accessKey = "3fxp9nGaG0QfSC1V8KrMLpT7WAQeyDK5YZJH1TiEM5o";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searcResult = document.getElementById("search-result");
const sshowMoreBtn = document.getElementById("show-more-btn");
const searchBtn = document.getElementById("search-btn");

// we are here using unsplash api

let keyword = "";
let page = 1;

async function searhImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    // We need 12 images per page

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    // To remove the older result 
    if(page == 1)
    {
        searcResult.innerHTML = "";
    }
    
    // In data we will receive the data from unsplash in form of an object and in that object we have to choose result
    const result = data.results;

    // and result is an array

    // Below map function will run for each and each element of the given array

    // In summary, map is used to iterate over an array and perform a specific action for each element, allowing you to transform or manipulate the elements in some way. In this code snippet, map is used to create multiple img elements with their respective source URLs from the result array.

    result.map((result) => {
        // It will create an img tag
        const image = document.createElement("img");
        // We were getting different kind of image url in which we have choosed small size
        image.src = result.urls.small;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;  // This is the link of the unsplash
        imageLink.target = "_blank";  // We want that the link open in new tab

        imageLink.appendChild(image);
        searcResult.appendChild(imageLink);
    })
    // We want our showmore button to print after all the images
    sshowMoreBtn.style.display = "block";

}

searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();  // To prevent the default submission changes
    page = 1;
    searhImages();
})

sshowMoreBtn.addEventListener('click', ()=>{
    page++;
    searhImages();
})

searchBtn.addEventListener('click', function(e){
    e.preventDefault(); 
    page = 1;
    searhImages();
})