// Imports below //
import $ from 'jquery'; 
import apis from './apis.js';
import store from './store.js'


// Below are functions that will structure each page view that a user will be seeing on the Bookmark app //

// FUNCTIONS FOR THE HTML OF EACH PAGE //

/* Function for the HTML on the main page
    --This function will show everything that a user will see on the main page. Items on this page include:
        --Button at the top that allows a user to add a new bookmark
        --Dropdown filter next to it that allows the user to filter by a certain number of stars (will show only Bookmarks for that number of stars or greater)
        --Expand view that lets the user click on a given bookmark 
            --Within the expand view, user needs to be able to click a button to visit the website, delete the bookmark (or edit if there is time to include this functionality)
                --It also should show the description of the bookmark within the dropdown
        --Will need to add new bookmarks to the items container when they are added
        --Will need to delete bookmarks from the items container when they are deleted
        --Will need to edit bookmark titles that changed (if there is time)
*/
function showMainPage(bookmark) {

    // Variables to help with the structure //
    let mainPageStructure = "";
    let filteredStars = "";
    let bookmarksPageStructure = "";
    let bookmarkDescription = "";
    let bookmarkRating = "";
    let filterBookmarks = [];
    let expandedView = "";

    // Need to first check what the value of the filter dropdown is and then include all bookmarks at or above that star value rating
    // When no rating is selected by the user (on the initial page for example) then all bookmarks should reflect on the page
    // If statement to get the filtered bookmarks array below
    if (store.filter !== -1) {
        filterBookmarks = bookmark.filter(item => item.rating >= store.filter);
    }

    //Add the content of filtered stars dropdown
    filteredStars = `
        <select name="stars-filter" class="js-stars-filter">
            <option disabled selected>Filter Rating &#11088</option>
                <option value="1">&#11088</option>
                <option value="2">&#11088&#11088</option>
                <option value="3">&#11088&#11088&#11088</option>
                <option value="4">&#11088&#11088&#11088&#11088</option>
                <option value="5">&#11088&#11088&#11088&#11088&#11088</option>
        </select>
    ` 

    //Loop through each bookmark and determine if it is in an 'expanded' view or not.  And add the HTML that accompanies each particular view.
    filterBookmarks.forEach(item => {
            if (item.expanded){
            bookmarksPageStructure += `
                <li class="combo-container" tabindex="0" role="tab">
                    <div class="bookmark-container">
                        <div class="title-area">${item.title}</div>
                        <div class="rating-area">${item.rating} &#11088 Rating</div>
                    </div>
                    <div class="info-container" data-item-id="${item.id}">
                    </div>
                <div class="more-info-container" data-item-id=${item.id}>
                    <div class="info-top">
                        <div class="info-url-container">
                            <a href="${item.url}" target="_blank">Visit Website </a>
                        </div>
                        <div class="more-buttons">
                            <button class="info-delete-button">Delete Bookmark</button>
                        </div>
                    </div>
                    <div class="info-bottom">
                        <div class="description-header">Bookmark Description Below:</div>
                        <div class="description-text">${item.desc}</div>
                    </div>
                </div>
                </li>`
        }
        else {
            bookmarksPageStructure += `
                <li class="combo-container" tabindex="0" role="tab">
                    <div class="bookmark-container">
                        <div class="title-area">${item.title}</div>
                        <div class="rating-area">${item.rating} &#11088</div>
                    </div>
                    <div class="info-container" data-item-id="${item.id}">
                    </div>
                </li>
            `
        }
    })

    // Add the content of mainPageStructure => include the upper-portion and lower-portion items //
    mainPageStructure = `
        <div class="main-portion">
            <div class="upper-portion">
             <button class="new-bookmark-button">Add New &#128278</button>
                ${filteredStars}
            </div>
            <ul class="combo-unordered" role="tablist">
                ${bookmarksPageStructure}
            </ul>
        </div>
        `

    return mainPageStructure;
}

/* Function for the HTML on the page where user adds a new bookmark
    --Will need to create variables for each of the components on the page
        --These will need to be filled in by what the user submits
        --Many will initially be set to empty strings until the user passes in a .val()
*/  
function createNewBookmark(bookmark) {
    let addHeader = "Add New Bookmark:";
    let bookmarkURL = "";
    let bookmarkTitle = "";
    let bookmarkRating = "";
    let bookmarkDescription = "";

    // Loop through the rating HTML loop to create unique radio buttons for each selection and also help get the value when the user submits their choice
    for (let i = 1; i <= 5; i++) {
        let checked = "";
        bookmarkRating += `
            <div class="ratings-section-container">
            <div class="ratings-header">
            <input type="radio" tabindex="0" required name="rating" class="js-add-rating" id="rating${i}" value="${i}" ${checked}></div>
            <div class="ratings-value"
            <label class="star" for="rating${i}"> <p>${i} &#11088 Rating</p> </label></div>
            </div>
        `
    }

    let newBookmarkStructure = `
        <form class="add-bookmark" role-"add new bookmark form"
            <div class="another-portion">
                <section class="add-upper-portion" role="Entering the URL">
                    <label for="add-URL">${addHeader}</label>
                    <input type="text" name="url" class="js-add-URL" placeholder="https://www.thinkful.com" ${bookmarkURL} required>
                </section>
                <section class="add-middle-portion" role="Title & Rating & Description Entry">
                    <div class="add-middle-title" role="Title Entry">
                        <input type="text" name="title" class="js-add-middle-title" placeholder="ADD TITLE HERE" ${bookmarkTitle} required>
                    </div>  
                    <div class="add-ratings-whole">     
                    ${bookmarkRating}  
                    </div> 
                    <div class="text-area-container">
                        <textarea role="user description entry" name="desc" class="js-add-middle-description" placeholder=" Add description here"${bookmarkDescription}required></textarea>
                    <div>
                </section>
                <section class="add-bottom-portion" role="Cancel & Submit buttons">
                    <div class="cancel-bookmark">
                    <button class="cancel-button">  CANCEL  </button>
                    </div>
                    <div class="create-bookmark">
                    <button class="create-button">  CREATE  </button>
                    </div>
                </section>
                <section class="js-error-message hidden" role="Error message handler">Error: ${store.errorMessage}</section>
            </div>
        </form>

    `   
    return newBookmarkStructure;
} 

// RENDER PAGE FUNCTIONS //

// Render the error message
function renderErrorMessage(){
    if(store.error === 1) {
    $('.js-error-message').removeClass('hidden');
    }
    else if (store.error === 0) {
    $('.js-error-message').addClass('hidden');
    }
}

// Function to render the HTML on the page
function renderPage() {
    console.log("The page has been rendered");
    let data = store.bookmarks
    let pageHTML = "";

    if (store.adding === false){
        pageHTML = $('main').html(showMainPage(data));
    }
    else {
        pageHTML = $('main').html(createNewBookmark());
    }
    renderErrorMessage();
    return pageHTML;
}

// EVENT HANDLER FUNCTIONS //

// Function to handle when the user selects a Minimum Rating from the dropdown
function handleFilterChoice() {
    $('main').on('change', '.js-stars-filter', event => {
        const ratingChoice = $(".js-stars-filter option:selected").val();
        store.filter = Number(ratingChoice);
        console.log(store.filter);
        renderPage();
    });
}

/* Function to expand the bookmark when it is clicked
    --When the bookmark container for a specific bookmark is clicked, it will need to expand
    --We will need to find the ID of the container that was clicked first
    --Then toggle the expanded view and re-render the page
*/
function handleExpandBookmarkClicked() {
   $('main').on('click', '.bookmark-container', event => {
       console.log("events.target", event.target);
       const id = store.findContainerId(event.currentTarget);
       console.log(id);

       const bookmarkItem = store.findBookmarkById(id);
       const bookmarkObject = {expanded: !bookmarkItem.expanded};
       store.findAndUpdateBookmark(id, bookmarkObject);
       renderPage();
   }); 
}

/* Function to handle when the New Bookmark button is clicked 
    --Will need to change store.adding variable from true to false
    --Will need to make sure the store.edit variable is still set to false (in case this functionality is added)
    --Will need to call the render page so it knows to change HTML screens
*/
function handleNewBookmarkClicked () {
    $('main').on('click', '.new-bookmark-button', function(evt) {
        console.log('New button was clicked');
        evt.preventDefault();
        store.adding = true;
        store.edit = false;
        renderPage();
    });
}

// Function to handle when the cancel button is clicked
function handleCancelButtonClicked() {
    $('main').on('click', '.cancel-button', function(evt){
        console.log("Cancel button was clicked");
        evt.preventDefault();
        store.adding = false;
        store.edit = false;
        renderPage();
        store.error = 0;
    });
}

// Function to handle a new bookmark's submission
function handleCreateButtonClicked() {
    $('main').on('submit', '.add-bookmark', function(evt){
        evt.preventDefault();
        console.log("Create new bookmark was clicked");
        
        // Take the values that the user submits for URL, Title, Rating, Description
        const submissionTitle = $('.js-add-middle-title').val();
        const submissionURL = $('.js-add-URL').val();
        const submissionRating = $('input[name="rating"]:checked').val();
        const submissionDescription = $('.js-add-middle-description').val();
        console.log(submissionURL);
        console.log(submissionTitle);
        console.log(submissionRating);
        console.log(submissionDescription);

        apis.createItem(submissionTitle, submissionURL, submissionDescription, submissionRating)
        .then((response) => {
            store.error = 0
            store.adding = false;
            store.addNewBookmark(response);
            console.log(response);
            renderPage();
        }).catch(err => {
            console.log(err.message);
            store.errorMessage = err.message;
            store.error = 1;
            renderPage();
        });
    })
}


// Function to handle deleting a bookmark (delete button is within the expanded view)
function handleDeleteButtonClicked() {
    $('main').on('click', '.info-delete-button', event => {
        const id = store.findContainerIdDelete(event.currentTarget);
        console.log(id);
        apis.deleteItem(id)
            .then(() => {
                store.error = 0;
                store.deleteBookmarkById(id);
                renderPage();
            });
    });
}

//Export all functions
export default {
    showMainPage,
    createNewBookmark,
    handleNewBookmarkClicked,
    renderPage,
    renderErrorMessage,
    handleCancelButtonClicked,
    handleCreateButtonClicked,
    handleDeleteButtonClicked,
    handleExpandBookmarkClicked,
    handleFilterChoice,
}
