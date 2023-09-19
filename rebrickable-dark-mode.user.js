// ==UserScript==
// @name         Rebrickable Dark Mode
// @namespace    https://fairburn.dev/
// @version      1.3.1
// @description  Enable dark mode on Rebrickable regardless of your account plan.
// @author       Garrett Fairburn
// @license      Apache-2.0
// @match        https://rebrickable.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rebrickable.com
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  // Callback function to enable dark mode on a given body element.
  function enableDarkMode(body) {
    // Apply dark mode CSS to body.
    body.classList.add('dark-mode');

    // Update state of dark mode toggle switch for consistency if it exists.
    const checkbox = body.querySelector('.js-toggle-dark-mode input');
    if (checkbox !== null) {
      checkbox.checked = true;
    }
  }

  // Given that this script is injected at document-start, the body element is
  // unlikely to already be defined. However, just to account for potential
  // differences between userscript managers and possible inconsistencies in
  // the target website, also handle the case where the body is defined.
  const body = document.querySelector('html > body');
  if (body !== null) {
    enableDarkMode(body);
    return;
  }

  // If the body element does not exist (as expected), set up a
  // MutationObserver to enable dark mode the moment the body element is
  // added. This minimizes the time spent in light mode and (ideally) makes it
  // appear as if the page was in dark mode from the start.
  new MutationObserver(function (mutationList, observer) {
    for (const mutation of mutationList) {
      for (const node of mutation.addedNodes) {
        // Enable dark mode if the node is the body element.
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BODY') {
          enableDarkMode(node);

          // Observer has served its purpose, so disconnect it.
          observer.disconnect();
          return;
        }
      }
    }
  }).observe(document.documentElement /* Root html node. */, {
    // Only interested in modifications to immediate child list,
    // not attributes or sub-children.
    childList: true,
  });
})();
