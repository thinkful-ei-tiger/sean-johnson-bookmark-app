import $ from 'jquery'; 

/* Store is where many of the variables will be held that show what is in each JSon object response.
    We were given examples of what the store object wireframes will look like for the first three wireframes:
        --Initial View:
            --The bookmarks array is populated with objects that reference a bookmark with these variables for a given JSon object with value data types below:
                --id: string
                --title: string
                --rating: number
                --url: string
                --description: string
                --expanded: false (boolean) => Note that it starts off as false because it has not yet been "expanded"
            --Outside of the bookmarks array, the additional variables below are shown below which are represented as part of the entire STORE object:
                --adding: false (boolean)
                --error: null
                --filter: 0
        --Expanded Bookmark View:
            --Everything is the same EXCEPT:
                --expanded: true (boolean) => Now that we are looking at a specific bookmark object, the expanded boolean will need to be triggered from false to true
        --Add Bookmark Form View:
            --Everything is the same EXCEPT:
                --Bookmarks array is now empty since we are asking the user to input the values which will eventually be populated once we POST them to the Thinkful API database
                --adding: true (boolean) => The value of this boolean has been changed from false to true since we are "adding" a new bookmark
        --Form Error View:
            --Example was not provided, but shows an error message if, for exmaple, the user did not submit a rating
*/

/* VARIABLES for the STORE object */
const bookmarks = []        //Originally set as an empty array because when the user logs in they will not yet have created any bookmarks.  This will get populated with JSon objects eventually.
const adding = false;       //Originally set to false to indicate that we are not in a state of adding a new Bookmark (yet)
const error = 0;            //Originally set to 0 to begin, but if there is an error it should be set to 1
const filter = 0;           //Originally set to 0
const edit = false;         //Originally set to false.  This will basically determine which state of the page the app should be on (main page layout or create new bookmark page layout) 
const errorMessage = "";    //Originall set as an empty string, but will be changed throughout depending ont the error message that needs to be displayed

// FUNCTIONS below to help use the STORE object and finding items within the bookmark array with the objects that populate it //

/* Add a new bookmark to the store and also include a value that we can assign for whether the item in the store is expanded or not
    --Will need to add a new key-value pair to indicate if the bookmark is expanded or not
        --When false, the bookmark should not expand
            --Will need to set to true in the event that a user clicks on the container for that bookmark
*/
function addNewBookmark(item) {
    let expandedBookmark = {
        expanded: false
    };
    Object.assign(item, expandedBookmark);
    this.bookmarks.push(item);
}

// Choose a specific bookmark item in the array by its ID
function findBookmarkById(id) {
    return this.bookmarks.find(currentItem => currentItem.id === id);
}

// Find a bookmark by its ID and delete it
function deleteBookmarkById(id) {
    this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id)
}

// Find the container which is containing the ID of the bookmark I need
function findContainerId(target) {
    const closestContainer = target.closest('.combo-container');
    const infoContainer = $(closestContainer).find('.info-container');
    const dataContainer = $(infoContainer).data('item-id');
    return dataContainer;
}

// Find the container which is containing the ID of the bookmark I want to delete after going into expanded view
function findContainerIdDelete(target) {
    const closestContainer = target.closest('.more-info-container');
    const dataContainer = $(closestContainer).data('item-id');
    return dataContainer;
}

// Find and update each bookmark in the event that data on it changes
function findAndUpdateBookmark(id, newInfo) {
    let newItem = this.findBookmarkById(id);
    Object.assign(newItem, newInfo);
}

// export default => every variable and function above needs to be exported //
export default {
    bookmarks,
    adding,
    error,
    filter,
    edit,
    errorMessage,
    addNewBookmark,
    findBookmarkById,
    deleteBookmarkById,
    findContainerId,
    findAndUpdateBookmark,
    findContainerIdDelete
}





