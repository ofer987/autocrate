(function() {
  var statusLabel = document.getElementById('saved_status');

  var displaySaved = function() {
    statusLabel.textContent = 'Saved';
  };

  var save = function() {
    chrome.storage.sync.set({
      localhost: document.getElementById('localhost').value,
      dev: document.getElementById('dev').value,
      qa: document.getElementById('qa').value,
      uat: document.getElementById('uat').value,
      ppe: document.getElementById('ppe').value,
      production: document.getElementById('production').value
    }, displaySaved);
  };

  var restore = function() {
    chrome.storage.sync.get({
      localhost: '',
      dev: '',
      qa: '',
      uat: '',
      ppe: '',
      production: ''
    }, function(saved_values) {
      document.getElementById('localhost').value = saved_values.localhost;
      document.getElementById('dev').value = saved_values.dev;
      document.getElementById('qa').value = saved_values.qa;
      document.getElementById('uat').value = saved_values.uat;
      document.getElementById('ppe').value = saved_values.ppe;
      document.getElementById('production').value = saved_values.production;
    });
  };

  document.querySelector('button#save').addEventListener('click', save);
  document.addEventListener('DOMContentLoaded', restore);

  document.querySelectorAll('.server').forEach(function(element) {
    element.addEventListener('keydown', function(event) {
      statusLabel.textContent = '';
    });
  });
})();

