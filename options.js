function save_options() {
  var generic_setting = document.getElementById('generic_setting').checked;
  chrome.storage.sync.set({
    generic_setting: generic_setting
  }, function() {
    var status = document.getElementById('generic_setting');
    status.textContent = 'Preferences saved.';
    setTimeout(function() {
      status.innerHTML = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    generic_setting: false
  }, function(items) {
    document.getElementById('generic_setting').checked = items.generic_setting;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);