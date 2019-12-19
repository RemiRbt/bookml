import ext from "./utils/ext";
import storage from "./utils/storage";

var popup = document.getElementById("app");
storage.get('bookml', function(resp) {
  if (resp.bookml) {
    renderList(resp.bookml);
  }
});

var optionsLink = document.querySelector(".js-options");
optionsLink.addEventListener("click", function(e) {
  e.preventDefault();
  ext.tabs.create({'url': ext.extension.getURL('options.html')});
})

var renderList = (list) => {
  var elListItem = '';
  list.forEach((value) => {
    elListItem += `<li class="list-item" data-url="${value.url}">${value.title}</li>`
  })
  document.querySelector("ul.list").innerHTML = elListItem;
  document.querySelector("li.list-item").addEventListener("click", function(e) {
    var bookMlUrl = e.target.getAttribute('data-url');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `${bookMlUrl}/raw`);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var bookMl = xhr.responseText;
        ext.tabs.query({active: true, currentWindow: true}, function(tabs) {
          var activeTab = tabs[0];
          chrome.tabs.executeScript(activeTab.id, { code: bookMl });
        });
      }
      else {
        console.log(xhr.status);
      }
    };
    xhr.send();
  })
}

