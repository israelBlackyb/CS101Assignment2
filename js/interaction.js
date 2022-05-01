function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
} 


/*#############
Catergory Modal
##############*/

// Get the modal
var catModal = document.getElementById("catModal");

// Get the button that opens the modal
var catBtn = document.getElementById("catButton");

// Get the <span> element that closes the modal
var catSpan = document.getElementsByClassName("catergoryClose")[0];

// When the user clicks on the button, open the modal
catBtn.onclick = function() {
  catModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
catSpan.onclick = function() {
    catModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == catModal) {
    catModal.style.display = "none";
  }
} 

