var share_text = ''

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

// share tweet popup
//
// Object tab
function ShareTweet(tab) {
  share_text = encodeURIComponent(tab.title)

  if (encodeURIComponent(tab.url)) {
    share_text += '%0a' + encodeURIComponent(tab.url)
  }

  chrome.windows.create({
      url: `https://twitter.com/intent/tweet?text=${share_text}`,
      type: 'popup',
      width: 600,
      height: 400,
  })
}
