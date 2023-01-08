/**
 * Highlights violations of [[MOS:REFSPACE]] in red.
 *
 * Written by [[User:Rublov]], June 2021
 *
 * This script is developed on GitHub: https://github.com/rublovwiki/scripts
 */

$(function () {
  if (mw.config.get("wgAction") === "view") {
    for (const ref of document.querySelectorAll(
      ".reference, .Template-Fact, .Inline-Template",
    )) {
      const previous = ref.previousSibling;
      const next = ref.nextSibling;
      if (
        (!!previous && isBeforeWrong(previous.textContent)) ||
        (!!next && next.tagName !== "STYLE" && isAfterWrong(next.textContent))
      ) {
        const a = ref.querySelector("a");
        a.style.color = "red";
      }
    }
  }
});

function isBeforeWrong(text) {
  if (!text) {
    return false;
  }

  return (text.endsWith(" ") && !text.endsWith(": ")) || text.endsWith("\n");
}

function isAfterWrong(text) {
  if (!text) {
    return false;
  }

  return text.startsWith(".") || text.startsWith(";") || text.startsWith(",");
}
