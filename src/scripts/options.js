import storage from "./utils/storage";

var aBookml = [];

storage.get(['bookml'], function (resp) {
  if (resp.bookml) {
    aBookml = resp.bookml;
    renderList(aBookml);
  }
});

document.querySelector(".add-bookml").addEventListener("click", function () {
  var title = document.querySelector(".new-bookml-title").value.trim();
  var url = document.querySelector(".new-bookml-url").value.trim();
  if (title !== '' && title !== null && title && url !== '' && url !== null && url) {
    console.log({title, url});
    aBookml.push({title, url});
    storage.set({bookml: aBookml});
    renderList(aBookml);
  }
})

document.querySelector(".import-bookml").addEventListener("click", function () {
  var newConfig = document.querySelector("textarea.textarea-pre-display").value.trim();
  var newConfigJson = JSON.parse(newConfig);
  if (newConfigJson) {
    aBookml = newConfigJson;
    storage.set({bookml: aBookml});
    renderList(aBookml);
  }
})

document.querySelector("#modal-export").addEventListener("click", function () {
  document.querySelector("code.export-config").innerHTML = JSON.stringify(aBookml);
})

var renderList = (list) => {
  console.log(list);
  var elListItem = '';
  list.forEach((value) => {
    elListItem += `<tr>
      <td>${value.title}</td>
      <td>${value.url}</td>
    </tr>`
  })
  document.querySelector("tbody.list").innerHTML = elListItem;
}