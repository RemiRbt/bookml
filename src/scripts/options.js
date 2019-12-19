import ext from "./utils/ext";
import storage from "./utils/storage";

var aBookml = [];

storage.get(['bookml'], function(resp) {
  if (resp.bookml) {
    aBookml = resp.bookml;
    renderList(aBookml);
  }
});

document.querySelector(".add-bookml").addEventListener("click", function() {
  var title = document.querySelector(".new-bookml-title").value.trim();
  var url = document.querySelector(".new-bookml-url").value.trim();
  if (title !== '' && title !== null && title && url !== '' && url !== null && url) {
    console.log({title, url});
    aBookml.push({title, url});
    storage.set({bookml: aBookml});
    renderList(aBookml);
  }
})

document.querySelector(".import-bookml").addEventListener("click", function() {
  // @todo popin import fichier dans localstorage bookml
})

document.querySelector(".export-bookml").addEventListener("click", function() {
  // @todo popin export dans localstorage bookml dans fichier
  console.log(JSON.stringify(aBookml));
})

var renderList = (list) => {
  console.log(list);
  var elListItem = '';
  list.forEach((value) => {
    elListItem += `<li>${value.title}: ${value.url}</li>`
  })
  document.querySelector("ul.list").innerHTML = elListItem;
}