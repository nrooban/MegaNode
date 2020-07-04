// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("btnFile");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function abc() {
  console.log(1);
  alert(1);
}

function ChangeElementColor(element){
  console.log(element);
  alert('you have click item ' +  element.id);
  // var color = [
  //   Math.random() * 255,
  //   Math.random() * 255,
  //   Math.random() * 255
  // ];
  // element.style.background = "rgb(" + color + ")"
}

// Initialize a special custom menu for the "CustomContextMenu" div
var contextMenuTwo = CtxMenu(".CustomContextMenu");
contextMenuTwo.addItem("About", ChangeElementColor, 'ico-mega.svg');
contextMenuTwo.addItem("Mega website", ChangeElementColor, 'ico-download.svg');
contextMenuTwo.addItem("Cloud drive", ChangeElementColor, 'ico-mega.svg');
contextMenuTwo.addSeperator();
contextMenuTwo.addItem("Add sync", ChangeElementColor, 'ico-download.svg');
contextMenuTwo.addItem("Import links", ChangeElementColor, 'ico-mega.svg');
contextMenuTwo.addItem("Upload", ChangeElementColor, 'ico-download.svg');
contextMenuTwo.addItem("Download", ChangeElementColor, 'ico-mega.svg');
contextMenuTwo.addItem("Stream", ChangeElementColor, 'ico-download.svg');
contextMenuTwo.addItem("Preferences", ChangeElementColor, 'ico-mega.svg');
contextMenuTwo.addSeperator();
contextMenuTwo.addItem("Quit", ChangeElementColor, 'ico-download.svg');