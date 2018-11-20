var share_text = ''

chrome.browserAction.onClicked.addListener(function(tab) {
  ShareTweet(tab)
})

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
