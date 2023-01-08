/**
 * Highlights the bolded title in the lead if it does not match the
 * capitalization of the actual page title.
 *
 * Written by [[User:Rublov]], January 2022
 *
 * This script is developed on GitHub: https://github.com/rublovwiki/scripts
 */

$(function () {
  if (!isMainspace()) {
    return;
  }

  const titleElement = getTitleElement();

  const leadTitle = (titleElement ? titleElement.textContent : "").trim();
  const articleTitle = getArticleTitle().trim();

  // Ignore first letter, which may be lower-case in running text but otherwise
  // match the title.
  if (differsOnlyInCase(leadTitle.slice(1), articleTitle.slice(1))) {
    highlightElement(titleElement);

    // Unhighlight the element when clicked.
    titleElement.addEventListener("click", () => {
      unHighlightElement(titleElement);
    });
  }
});

function isMainspace() {
  return mw.config.get("wgCanonicalNamespace") === "";
}

function getTitleElement() {
  // Return the first bolded element in the first paragraph of the article's
  // text. Not fool-proof, but generally matches the bolded title in the lead.
  return document.querySelector("#mw-content-text p b");
}

function getArticleTitle() {
  return mw.config.get("wgTitle");
}

function highlightElement(e) {
  e.style.color = "red";
}

function unHighlightElement(e) {
  e.style.color = "initial";
}

function differsOnlyInCase(s1, s2) {
  return s1 !== s2 && s1.toLowerCase() === s2.toLowerCase();
}
