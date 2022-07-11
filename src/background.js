// var chrome
// var browser
// browser = chrome || browser
// chrome = chrome || browser


var backgroundInterface = {
  // bookmark
  getTreeBookmarksTree: function () {
    try {
      return chrome.bookmarks.getTree()
    } catch (error) {
      return new Promise((respose) => {
        chrome.bookmarks.getTree(respose)
      })
    }
  },
  searchBookmarks: function ({ searchText }) {
    try {
      return chrome.bookmarks.search(searchText)
    } catch (error) {
      return new Promise((respose) => {
        chrome.bookmarks.search(searchText, respose)
      })
    }
  },


  // store
  getLocal: async function ({ key }) {
    try {
      let obj = await chrome.storage.local.get(key)
      return obj.key
    } catch (error) {
      return new Promise((respose) => {
        chrome.storage.local.get(key, (obj) => {
          respose(obj.key)
        })
      })
    }
  },
  setLocal: async function ({ key, value }) {
    let localObj = {}
    localObj[key] = value
    await chrome.storage.local.set(localObj)
    return localObj
  },
  removeLocal: async function ({ key }) {
    return await chrome.storage.local.remove(key)
  },

  // history
  searchHistory: function ({ searchText, count, since }) {
    try {
      return chrome.history.search({
        text: searchText,
        startTime: since || 0,
        maxResults: count || 10
      })
    } catch (error) {
      return new Promise((respose) => {
        return chrome.history.search({
          text: searchText,
          startTime: since || 0,
          maxResults: count || 10
        }, respose)
      })
    }
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let reqFunc = backgroundInterface[request.name]
  if (reqFunc === undefined) {
    sendResponse(null)
  }

  console.log(request)
  reqFunc(request).then(sendResponse)
  return true
});

function sendBookmarksUpdateMsg() {
  backgroundInterface.getTreeBookmarksTree().then((bookmarks) => {
    chrome.runtime.sendMessage({
      event: "bookmarkUpdate",
      bookmarks: bookmarks
    });
  })
}

chrome.bookmarks.onCreated.addListener(() => { sendBookmarksUpdateMsg() })
chrome.bookmarks.onChanged.addListener(() => { sendBookmarksUpdateMsg() })
chrome.bookmarks.onMoved.addListener(() => { sendBookmarksUpdateMsg() })
chrome.bookmarks.onChildrenReordered.addListener(() => { sendBookmarksUpdateMsg() })
chrome.bookmarks.onRemoved.addListener(() => { sendBookmarksUpdateMsg() })