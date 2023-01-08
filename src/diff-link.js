/**
 * Show "copy" links on history and contribution pages that copy
 * "Special:Diff/XYZ" to your clipboard when clicked.
 *
 * Inspired by [[User:BrandonXLF/ShowRevisionID.js]] and
 * [[User:Enterprisey/diff-permalink.js]]
 *
 * Written by [[User:Rublov]], June 2021
 */
const INPUT_ID = "user-rublov-diff-link";

$(function () {
  // diff-link works on the history and contributions pages.
  if (location.search.includes("action=history")) {
    initializePage(
      /* copyBoxLocation= */ ".mw-history-compareselectedversions",
      /* copyLinkLocation= */ "span.mw-history-histlinks"
    );
  } else if (location.href.includes("Special:Contributions")) {
    initializePage(
      /* copyBoxLocation= */ ".mw-pager-navigation-bar",
      /* copyLinkLocation= */ "span.mw-changeslist-links"
    );
  }
});

/**
 * Set up diff-link on the page by appending the copy box after the element
 * identified by the selector `copyBoxLocation`, and for each entry in the
 * revision list, adding a copy link to the element identified by the selector
 * `copyLinkLocation`.
 */
function initializePage(copyBoxLocation, copyLinkLocation) {
  document.querySelector(copyBoxLocation).after(makeCopyBox());

  const items = document.querySelectorAll("li[data-mw-revid]");
  for (let item of items) {
    const diffLink = "Special:Diff/" + item.getAttribute("data-mw-revid");
    const nav = item.querySelector(copyLinkLocation);
    nav.appendChild(makeCopyLink(diffLink));
  }
}

/**
 * Make the <a> element that copies the diff link when clicked.
 */
function makeCopyLink(diffLink) {
  const e = document.createElement("a");
  e.textContent = "copy";
  e.addEventListener("click", (event) => {
    event.preventDefault();

    // This copies the diff link to the clipboard by (1) putting the diff link
    // in the input box created by `makeCopyBox` and (2) selecting the input
    // box and using `document.execComamnd("copy")` to copy the text to the
    // user's clipboard.
    //
    // This method is deprecated; the new and preferred way is to use the
    // browser's clipboard API: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
    // This would remove the need to create a dummy <input> element in order
    // to copy the text, but it would require asking the user for permission
    // to access their clipboard, which might be confusing for users since it
    // would appear that Wikipedia itself was asking permission rather than my
    // user script. So we continue to use the old method for now.
    const input = document.getElementById(INPUT_ID);
    input.value = diffLink;
    input.select();
    document.execCommand("copy");
  });

  const span = document.createElement("span");
  span.appendChild(e);
  return span;
}

/**
 * Make the <input> element that holds the text to be copied to the clipboard.
 */
function makeCopyBox() {
  const input = document.createElement("input");
  input.setAttribute("id", INPUT_ID);

  const div = document.createElement("div");
  div.append(document.createTextNode("Diff link: "));
  div.appendChild(input);
  return div;
}
