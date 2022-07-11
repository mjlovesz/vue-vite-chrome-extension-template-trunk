
export function getLocalData(key, defaultValue) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ name: "getLocal", key }, (value) => {
      console.debug(value)
      resolve(value == undefined ? defaultValue : value)
    });
  })
}

export function setLocalData(key, value) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ name: "setLocal", key, value }, (kvObj) => {
      console.debug(kvObj)
      resolve(kvObj)
    });
  })
}


export function removeLocalData(key, value) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ name: "removeLocal", key }, () => {
      resolve()
    });
  })
}

export function getBookmarkTree() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ name: "getTreeBookmarksTree" }, (bookmarksTree) => {
      resolve(bookmarksTree || [])
    });
  })
}

export function searchBookmark(searchText) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ name: "searchBookmarks", searchText }, (bookmarksList) => {
      resolve(bookmarksList || [])
    });
  })
}

export function searchHistory(searchText) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ name: "searchHistory", searchText }, (bookmarksList) => {
      resolve(bookmarksList || [])
    });
  })
}

let BookmarkTreeChangeListeners = []
export function setBookmarkTreeChangeListener(listener) {
  BookmarkTreeChangeListeners.push(listener)
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.event == "bookmarkUpdate") {
    BookmarkTreeChangeListeners.forEach((listener) => {
      listener(request.bookmarks)
    })
  }
});

export function openUrl(url) {
  window.open(url, "_blank")
}
