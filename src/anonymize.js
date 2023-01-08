/**
 * Replaces the username at the top of the screen with a generic string.
 * 
 * Written by [[User:Rublov]], December 2021
 */
 
$(function () {
  const outer = document.getElementById("pt-userpage");
  const inner = outer.querySelector("a span");
  inner.innerText = "User page";
});
