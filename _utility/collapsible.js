/* #region  Taken from https://www.w3schools.com/howto/howto_js_collapsible.asp */

export function collapsible_behaviour() {
  var coll = document.getElementsByClassName("collapsible");
  var collitem;

  for (collitem = 0; collitem < coll.length; collitem++) {
    coll[collitem].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
}
/* #endregion */
export function collapsibleNextSibling() {
  this.classList.toggle("active");
  var content = this.nextElementSibling;
  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
}
