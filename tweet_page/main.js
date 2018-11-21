// add contextMenus
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: 'share',
    type : 'normal',
    title : 'tweet current page',
    contexts: ['page'],
  });
});

// browserAction clicked
chrome.browserAction.onClicked.addListener(function(tab) {
  ShareTweet(tab)
})

// contextMenus clicked
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  ShareTweet(tab)
});

// share tweet
//
// Object tab
function ShareTweet(tab) {
  var share_text = encodeURIComponent(tab.title)

  var get_sync_storage = getSyncStorage()
  get_sync_storage.then(function (items) {
    if (items.prefixAvailable) {
      share_text = items.prefixText + share_text
    }

    if (encodeURIComponent(tab.url)) {
      share_text += '%0a' + encodeURIComponent(tab.url)
    }

    chrome.windows.create({
        url: `https://twitter.com/intent/tweet?text=${share_text}`,
        type: 'popup',
        width: 600,
        height: 400,
    })
  })
}

function getSyncStorage() {
  return new Promise(function(resolve) {
    chrome.storage.sync.get({
      prefixText: '',
      prefixAvailable: false
    }, function(items) {
      resolve(items)
    })
  })
}
