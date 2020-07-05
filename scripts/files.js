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

function abc(){
  
  alert('abcdef');
}

function ContextMenuDummyFunction(element){
  console.log(element);
  alert('you have click item ' +  element.id);
}

// Initialize a special custom menu for the "CustomContextMenu" div
var contextMenuTwo = CtxMenu(".CustomContextMenu");
contextMenuTwo.addItem("About", ContextMenuDummyFunction, 'ico-mega.svg');
contextMenuTwo.addItem("Mega website", ContextMenuDummyFunction, 'ico-website.svg');
contextMenuTwo.addItem("Cloud drive", ContextMenuDummyFunction, 'ico-cloud.svg');
contextMenuTwo.addSeperator();
contextMenuTwo.addItem("Add sync", ContextMenuDummyFunction, 'ico-sync.svg');
contextMenuTwo.addItem("Import links", ContextMenuDummyFunction, 'ico-link.svg');
contextMenuTwo.addItem("Upload", ContextMenuDummyFunction, 'ico-upload2.svg');
contextMenuTwo.addItem("Download", ContextMenuDummyFunction, 'ico-download.svg');
contextMenuTwo.addItem("Stream", ContextMenuDummyFunction, 'ico-stream.svg');
contextMenuTwo.addItem("Preferences", ContextMenuDummyFunction, 'ico-preference.svg');
contextMenuTwo.addSeperator();
contextMenuTwo.addItem("Quit", ContextMenuDummyFunction, 'ico-quit.svg');