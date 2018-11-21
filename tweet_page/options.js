// Saves options to chrome.storage
function save_options() {
  var prefix_text = document.getElementById('prefix_text').value
  var prefix_available = document.getElementById('prefix_available').checked

  chrome.storage.sync.set({
    prefixText: prefix_text,
    prefixAvailable: prefix_available
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status')
    status.textContent = 'Options saved.'
    setTimeout(function() {
      status.textContent = ''
    }, 750)
  })
}

// Restores options from chrome.storage
function restore_options() {
  chrome.storage.sync.get({
    prefixText: '',
    prefixAvailable: false
  }, function(items) {
    document.getElementById('prefix_text').value = items.prefixText
    document.getElementById('prefix_available').checked = items.prefixAvailable
  })
}

document.addEventListener('DOMContentLoaded', restore_options)
document.getElementById('save').addEventListener('click', save_options)
