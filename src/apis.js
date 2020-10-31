import $ from 'jquery'; 

const BASE_URL = "https://thinkful-list-api.herokuapp.com/seanj/bookmarks";

// Functions below are utilized to interact with the API

// Function for fetching the data that can be used for each of the CRUD functions 
const listApiFetch = function (...args) {
    let error;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          error = { code: res.status };
          if (!res.headers.get('content-type').includes('json')) {
            error.message = res.statusText;
            return Promise.reject(error);
          }
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        return data;
      });
  };

// Function to GET the bookmarks from the API
function getItems() {
    return listApiFetch(`${BASE_URL}`);
}

// Function to POST a bookmark to the API
function createItem(title, url, desc, rating) {
    let newBookmarkItem = {
        'title': title,
        'url': url,
        'desc': desc,
        'rating': rating
    };
    newBookmarkItem = JSON.stringify(newBookmarkItem);

    return listApiFetch(`${BASE_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: newBookmarkItem
    });
}

// Function to DELETE a bookfrom from the API
function deleteItem(id) {
    let newUrl = `${BASE_URL}/${id}`;

    return fetch(newUrl, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
}

// Export items
export default {
    getItems,
    createItem,
    deleteItem
}