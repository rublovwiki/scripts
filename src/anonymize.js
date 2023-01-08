/**
 * Replaces the username at the top of the screen with a generic string.
 *
 * Written by [[User:Rublov]], December 2021
 *
 * This script is developed on GitHub: https://github.com/rublovwiki/scripts
 */

$(function () {
  const outer = document.getElementById("pt-userpage");
  const inner = outer.querySelector("a span");
  inner.innerText = "User page";
});
