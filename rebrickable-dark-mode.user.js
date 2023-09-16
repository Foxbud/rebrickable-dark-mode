// ==UserScript==
// @name         Rebrickable Dark Mode
// @namespace    https://fairburn.dev/
// @version      1.0
// @description  Enables dark mode on Rebrickable regardless of your account plan.
// @author       Garrett Fairburn
// @license      Apache-2.0
// @match        https://rebrickable.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rebrickable.com
// @run-at       document-body
// ==/UserScript==

(function() {
  'use strict';

  var body = document.querySelector('body');

  // Apply dark mode CSS to body.
  body.classList.add('dark-mode');

  // Update state of toggle switch for consistency.
  // (Not strictly necessary, but most users would expect this.)
  body.querySelector('.js-toggle-dark-mode input').checked = true;
})();