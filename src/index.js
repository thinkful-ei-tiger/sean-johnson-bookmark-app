// Imports below //
import $ from 'jquery'; 

import apis from './apis.js';
import books from './bookmark.js';
import store from './store.js';

// Main Function below //
const main = function () {
  console.log("The page has loaded")
    apis.getItems()
      .then(items => {
        store.error = 0;
        items.forEach((item) => store.addNewBookmark(item));
        console.log(store.bookmarks);
        books.renderPage();
      })
    books.handleNewBookmarkClicked();
    books.handleCancelButtonClicked();
    books.handleCreateButtonClicked();
    books.handleDeleteButtonClicked();
    books.handleExpandBookmarkClicked();
    books.handleFilterChoice();
}

$(main);