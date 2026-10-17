
/* ========================================
   CSE GUIDE - SHARED HEADER LOADER
======================================== */

(() => {
  const currentScript = document.currentScript;

  if (!currentScript) {
    console.error("CSE Guide: Unable to locate header.js.");
    return;
  }

  const headerFolderUrl = new URL(".", currentScript.src);
  const placeholder = document.getElementById("site-header");

  if (!placeholder) {
    console.error("CSE Guide: #site-header placeholder not found.");
    return;
  }

  /* Load header.css only once */

  const stylesheetUrl = new URL(
    "header.css",
    headerFolderUrl
  ).href;

  if (
    ![...document.querySelectorAll('link[rel="stylesheet"]')]
      .some((link) => link.href === stylesheetUrl)
  ) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = stylesheetUrl;
    document.head.appendChild(stylesheet);
  }

  /* Load the shared header HTML */

  fetch(new URL("header.html", headerFolderUrl))
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Header request failed: ${response.status}`
        );
      }

      return response.text();
    })
    .then((html) => {
      placeholder.outerHTML = html;

      const header = document.querySelector(".cse-header");

      if (!header) {
        throw new Error("Header markup was not found.");
      }

      const menuButton = header.querySelector(".cse-menu-toggle");
      const menu = header.querySelector(".cse-navigation");
      const panel = header.querySelector(".cse-navigation-panel");
      const closeButton = header.querySelector(".cse-menu-close");
      const backdrop = header.querySelector(".cse-menu-backdrop");

      if (
        !menuButton ||
        !menu ||
        !panel ||
        !closeButton ||
        !backdrop
      ) {
        throw new Error("One or more navigation elements are missing.");
      }

      let previousFocus = null;
      let previousBodyOverflow = "";

      /* Open the side menu */

      function openMenu() {
        if (!menu.hidden) return;

        previousFocus = document.activeElement;
        previousBodyOverflow = document.body.style.overflow;

        menu.hidden = false;

        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute(
          "aria-label",
          "Close navigation menu"
        );

        document.body.style.overflow = "hidden";

        closeButton.focus();
      }

      /* Close the side menu */

      function closeMenu(restoreFocus = true) {
        if (menu.hidden) return;

        menu.hidden = true;

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute(
          "aria-label",
          "Open navigation menu"
        );

        document.body.style.overflow = previousBodyOverflow;

        if (restoreFocus) {
          menuButton.focus();
        }
      }

      /* Hamburger button */

      menuButton.addEventListener("click", () => {
        if (menu.hidden) {
          openMenu();
        } else {
          closeMenu();
        }
      });

      /* X close button */

      closeButton.addEventListener("click", () => {
        closeMenu();
      });

      /* Click the dark area to close */

      backdrop.addEventListener("click", () => {
        closeMenu();
      });

      /* Escape key */

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !menu.hidden) {
          event.preventDefault();
          closeMenu();
        }
      });

      /* Keep keyboard focus inside the open drawer */

      menu.addEventListener("keydown", (event) => {
        if (event.key !== "Tab" || menu.hidden) return;

        const focusableElements = [
          ...panel.querySelectorAll(
            'a[href], button:not([disabled])'
          )
        ];

        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[
          focusableElements.length - 1
        ];

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      });

      /* Close the drawer when a page link is selected */

      menu.querySelectorAll(".cse-nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          closeMenu(false);
        });
      });
    })
    .catch((error) => {
      console.error("CSE Guide header error:", error);
    });
})();
