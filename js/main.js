// Assigning our main global variables
var bookmarkName = document.getElementById("bookmark-name");
var websiteURL = document.getElementById("website-url");
var bookmarksList;

// If localstorage has content build the content found inside or else make a fresh list
if (localStorage.getItem("bookmarksList") == null) {
    bookmarksList = [];
 } else {
    bookmarksList = JSON.parse(localStorage.getItem("bookmarksList"));
    displayBookMark();
 };

// function to build the bookmark after calling it from the "Submit" button
function addBookMark() {

// storing the bookmark object in a variable
    var bookmark = {
        name: bookmarkName.value,
        url: websiteURL.value,
    };

// checking if one of the inputs or both are empty before building the bookmark
    var invalidName = document.getElementById("invalidName");
    var invalidURL = document.getElementById("invalidURL");
   
    if(bookmark.name == "" && bookmark.url == ""){
        invalidName.classList.remove("visually-hidden");
        invalidURL.classList.remove("visually-hidden");
    } else if(bookmark.url == "") {
        invalidURL.classList.remove("visually-hidden");
        invalidName.classList.add("visually-hidden");
    } else if(bookmark.name == ""){ 
        invalidName.classList.remove("visually-hidden");
        invalidURL.classList.add("visually-hidden");
    } 
    else {
        invalidName.classList.add("visually-hidden");
        invalidURL.classList.add("visually-hidden");
        bookmarksList.push(bookmark);

// Calling checkifAlreadyExists to make sure bookmark doesn't already exist
        checkifAlreadyExists(bookmark)
    
// building the Local storage
        localStorage.setItem("bookmarksList",JSON.stringify(bookmarksList));
// calling displayBookMark function to build the bookmark
        displayBookMark();
    }
};

// function Looping the array of Objects and using the key values to build html content
function displayBookMark() {
var contentBox = "";

for(i = 0; i < bookmarksList.length; i++){
    contentBox += `
    <div class="bookmark d-flex row my-4 py-3">
<h4 class="ms-3 col-3">${bookmarksList[i].name}</h4>
<div class="col-7">
<a href="https:/${bookmarksList[i].url}" target="_blank"><button type="button" class="btn btn-primary">Visit</button></a>
  <button type="button" class="btn btn-danger" onclick="DeleteBookMark(${i})">Delete</button>
</div>
</div>
    `
};

// Appending contentBox Elements to the parent Div
document.getElementById("bookmarks-area").innerHTML = contentBox;

};

// Deletes BookMark on clicking "Delete" Button
function DeleteBookMark(Index) {
    bookmarksList.splice(Index,1);
    displayBookMark();
    localStorage.setItem("bookmarksList",JSON.stringify(bookmarksList));
};

// clear the Inputs after Submitting
function clearInputs(){
    bookmarkName.value= "";
    websiteURL.value= "";
}


// Check If Url or Name Already Exists
function checkifAlreadyExists(item) {
    var nameExist = document.getElementById("nameExist");
    var urlExist = document.getElementById("urlExist");

    for(i =0; i < bookmarksList.length - 1; i++){
        if (item.name == bookmarksList[i].name && item.url == bookmarksList[i].url && bookmarksList.length > 1){
            nameExist.classList.remove("visually-hidden");
            urlExist.classList.remove("visually-hidden");
            DeleteBookMark(bookmarksList.length-1);
        }
        else if(item.name == bookmarksList[i].name && bookmarksList.length > 1){
            nameExist.classList.remove("visually-hidden");
            urlExist.classList.add("visually-hidden")
            DeleteBookMark(bookmarksList.length-1);
        } else if (item.url == bookmarksList[i].url && bookmarksList.length > 1) {
            urlExist.classList.remove("visually-hidden");
            nameExist.classList.add("visually-hidden");
            DeleteBookMark(bookmarksList.length-1);
        }
         else {
            nameExist.classList.add("visually-hidden");
            urlExist.classList.add("visually-hidden")
            
        };
    }  ;
};