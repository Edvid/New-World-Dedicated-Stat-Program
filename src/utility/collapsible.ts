/* #region  Taken from https://www.w3schools.com/howto/howto_js_collapsible.asp */
export function collapsible_behaviour() {
  const collapsibleItems = document.getElementsByClassName("collapsible");
  Array.from(collapsibleItems).forEach(collapsible => {
    collapsible.addEventListener("click", function () {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  });
}
/* #endregion */

export function collapsibleNextSibling() {
  this.classList.toggle("active");
  const content = this.nextElementSibling;
  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
}
