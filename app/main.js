// js stuff to load all the code and shiz we need

function loadImports(importArray) {
  for (let i = 0; i < importArray.length; i++) {
    let imported = document.createElement("script");
    imported.src = importArray[i];
    document.head.appendChild(imported);
  }
}

function injectModule(theUrl, id) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState === this.DONE) {
      document.getElementById(id).innerHTML = xhr.responseText;
    }
  };
  xhr.open("GET", theUrl);
  xhr.send();
}

function Element(id) {
  return document.getElementById(id);
}
