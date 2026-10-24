const isNestedPage =
  window.location.pathname.includes("/sm/") ||
  window.location.pathname.includes("/faqs/") ||
  window.location.pathname.includes("/paano/") ||
  window.location.pathname.includes("/eserve/") ||
  window.location.pathname.includes("/requirements/");

const footerPath = isNestedPage
  ? "../footer/footer.html"
  : "footer/footer.html";

const smPath = isNestedPage
  ? "../sm/sm.html"
  : "sm/sm.html";


// Load Footer
fetch(footerPath)
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });


// Load Social Media
fetch(smPath)
  .then(response => response.text())
  .then(data => {
    document.getElementById("sm").innerHTML = data;
  });


// =========================
// DAILY QUOTE
// =========================

const dailyQuotePath = isNestedPage
  ? "../daily-quote/daily-quote.html"
  : "daily-quote/daily-quote.html";

fetch(dailyQuotePath)
  .then(response => response.text())
  .then(data => {
    document.getElementById("daily-quote").innerHTML = data;

    const dailyQuoteIcon = document.querySelector(".daily-quote-button img");

    if (dailyQuoteIcon) {
      dailyQuoteIcon.src = isNestedPage
        ? "../images/icon.png"
        : "images/icon.png";
    }

    setDailyQuote();
  });

const dailyQuotes = [
  "If you're reading this, this is your sign. Papasa ka. ✨",
  'From "sana pumasa" to "FINALLY PASSED". Claim mo na! ✨',
  "You! Yes you! You'll become a CSE Passer!!! 🤍",
  "By God's grace, CSE PASSER. 🤍",
  "This is your sign. You will pass the CSE. 1 take, last take, no retake. CLAIM IT! ✨",
  "Sending you CSE PASSER dust!!! ✨",
  "Your biggest plot twist next year: Papasa ka sa CSE. 🍀",
  "✨ basbas dust ✨ CSE PASSER KA NA NEXT YEAR!",
  "Your name will be on that #list. Claim it. ✨",
  "Congratulations! CSE PASSER ka na soon! ✨🍀",
  "Ah basta, CSE passer ka na soon. PERIOD ✨",
];

function getPhilippineDate() {
  const now = new Date();

  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(now);
}

function setDailyQuote() {
  const dateString = getPhilippineDate();
  const startDate = new Date("2026-01-01T00:00:00+08:00");
  const today = new Date(dateString + "T00:00:00+08:00");
  const daysPassed = Math.floor(
    (today - startDate) / (1000 * 60 * 60 * 24)
  );

  const quoteIndex =
    ((daysPassed % dailyQuotes.length) + dailyQuotes.length) %
    dailyQuotes.length;
  document.getElementById("dailyQuoteText").textContent =
    dailyQuotes[quoteIndex];
}

function showDailyQuote() {
  document
    .getElementById("dailyQuoteOverlay")
    .classList.add("show");
  document
    .getElementById("dailyQuotePopup")
    .classList.add("show");
}


function closeDailyQuote() {
  document
    .getElementById("dailyQuotePopup")
    .classList.remove("show");
  document
    .getElementById("dailyQuoteOverlay")
    .classList.remove("show");
}


// ============================================
// HOMEPAGE CARD CLICK TRACKING (index.html)
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const cardEvents = {
    "paano/paano.html": "paano_card_click",
    "eserve/eserve.html": "eserve_card_click",
    "requirements/requirements.html": "requirements_card_click",
    "faqs/faqs.html": "faqs_card_click"
  };

  document.querySelectorAll(".cards-grid a.card").forEach(link => {
    const href = link.getAttribute("href");
    const eventName = cardEvents[href];

    if (!eventName) return;

    link.addEventListener("click", () => {
      if (typeof gtag === "function") {
        gtag("event", eventName, {
          link_url: href,
          link_text: link.innerText.trim()
        });
      }
    });
  });
});


// ===========================
// "PAANO" PAGE LINK TRACKING
// ===========================

document.addEventListener("DOMContentLoaded", () => {

  // eServe
  const eserveLink = document.querySelector('a[href="https://services.csc.gov.ph/"]');
  if (eserveLink) {
    eserveLink.addEventListener("click", () => {
      if (typeof gtag === "function") {
        gtag("event", "paano_page_eserve_link_click");
      }
    });
  }

  // OCSEAS
  const ocseasLink = document.querySelector('a[href="https://ocseas.csc.gov.ph/home"]');
  if (ocseasLink) {
    ocseasLink.addEventListener("click", () => {
      if (typeof gtag === "function") {
        gtag("event", "ocseas_click");
      }
    });
  }

  // CSC Official Announcement - Paano Page
  const announcementLink = document.querySelector('a[href="https://csc.gov.ph/phocadownload/userupload/erpo/announcements/2026/ExamAnn_2026_06_Conduct%20of%2014%20March%202027%20CSE-PPT%20orig%20signed.pdf"]');
  if (announcementLink) {
    announcementLink.addEventListener("click", () => {
      if (typeof gtag === "function") {
        gtag("event", "paano_csc_announcement_click");
      }
    });
  }

  // Official Facebook Pages
  document.querySelectorAll(".facebook-pages a").forEach(link => {
    link.addEventListener("click", () => {
      if (typeof gtag === "function") {
        gtag("event", "csc_facebook_click");
      }
    });
  });

});


// ==============================
// "E-SERVE" PAGE LINK TRACKING
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("/eserve/")) {
    const eserveLink = document.querySelector(
      'a[href="https://services.csc.gov.ph/"]'
    );
    if (eserveLink) {
      eserveLink.addEventListener("click", () => {
        if (typeof gtag === "function") {
          gtag("event", "eserve_page_eserve_link_click");
        }
      });
    }
  }
});


// ==================================
// "REQUIREMENTS" PAGE LINK TRACKING
// ==================================

// Requirements - CSC Application Form
const cseApplicationFormLink = document.querySelector(
  'a[href="https://csc.gov.ph/downloads/category/459-cse-application-form"]'
);

if (cseApplicationFormLink) {
  cseApplicationFormLink.addEventListener("click", () => {
    if (typeof gtag === "function") {
      gtag("event", "cse_application_form_click");
    }
  });
}

// Requirements - Career Service Professional Application Form
const professionalApplicationFormLink = document.querySelector(
  'a[href="https://csc.gov.ph/phocadownload/userupload/erpo/forms/exam-app-forms/Annex%20A1_CS%20Form%20100_Revised%202023_CSEP_a1_edited_a1.pdf"]'
);

if (professionalApplicationFormLink) {
  professionalApplicationFormLink.addEventListener("click", () => {
    if (typeof gtag === "function") {
      gtag("event", "professional_application_form_click");
    }
  });
}

// Requirements - Career Service SubProfessional Application Form
const subProfessionalApplicationFormLink = document.querySelector(
  'a[href="https://csc.gov.ph/phocadownload/userupload/erpo/forms/exam-app-forms/Annex%20A2_CS%20Form%20100_Revised%202023_CSESP_a1_edited_a1.pdf"]'
);

if (subProfessionalApplicationFormLink) {
  subProfessionalApplicationFormLink.addEventListener("click", () => {
    if (typeof gtag === "function") {
      gtag("event", "subprofessional_application_form_click");
    }
  });
}

const announcementLinks = document.querySelectorAll('a[href="https://csc.gov.ph/phocadownload/userupload/erpo/announcements/2026/ExamAnn_2026_06_Conduct%20of%2014%20March%202027%20CSE-PPT%20orig%20signed.pdf"]');

// CSC official announcement 1
if (announcementLinks[0]) {
  announcementLinks[0].addEventListener("click", () => {
    if (typeof gtag === "function") {
      gtag("event", "requirements_csc_announcement_1_click");
    }
  });
}

// CSC official announcement 2
if (announcementLinks[1]) {
  announcementLinks[1].addEventListener("click", () => {
    if (typeof gtag === "function") {
      gtag("event", "requirements_csc_announcement_2_click");
    }
  });
}

// CSC official announcement 3
if (announcementLinks[2]) {
  announcementLinks[2].addEventListener("click", () => {
    if (typeof gtag === "function") {
      gtag("event", "requirements_csc_announcement_3_click");
    }
  });
}


// ==================================
// "FAQS" PAGE LINK TRACKING
// ==================================

// FAQs - ONSA
const onsaLink = document.querySelector(
  'a[href="https://erpo.csc.gov.ph/eNOSAv3/"]'
);

if (onsaLink) {
  onsaLink.addEventListener("click", () => {
    if (typeof gtag === "function") {
      gtag("event", "faqs_onsa_click");
    }
  });
}

// FAQs - CSC Official Announcement #1
const faqsAnnouncementLink = document.querySelector(
  'a[href="https://csc.gov.ph/phocadownload/userupload/erpo/announcements/2026/ExamAnn_2026_06_Conduct%20of%2014%20March%202027%20CSE-PPT%20orig%20signed.pdf"]'
);

if (faqsAnnouncementLink) {
  faqsAnnouncementLink.addEventListener("click", () => {
    if (typeof gtag === "function") {
      gtag("event", "faqs_csc_announcement_1_click");
    }
  });
}

// FAQs - Get Your Brainbox Book Reviewer - TikTok Shop
const brainboxTiktokLink = document.querySelector(
  'a[href="https://vt.tiktok.com/ZS9UoMQku5UWN-55buN/"]'
);

if (brainboxTiktokLink) {
  brainboxTiktokLink.addEventListener("click", () => {
    if (typeof gtag === "function") {
      gtag("event", "faqs_brainbox_tiktok_shop_click");
    }
  });
}

// FAQs - Get Faber-Castell Pens - TikTok Shop
const faberCastellTiktokLink = document.querySelector(
  'a[href="https://vt.tiktok.com/ZS9UFGTEHcBgU-PeLFc/"]'
);

if (faberCastellTiktokLink) {
  faberCastellTiktokLink.addEventListener("click", () => {
    if (typeof gtag === "function") {
      gtag("event", "faqs_faber_castell_tiktok_shop_click");
    }
  });
}



/* =========================================
   SOCIAL MEDIA
========================================= */

document.addEventListener("click", function (event) {
  const tiktokLink = event.target.closest(
    '#sm a[href="https://www.tiktok.com/@hiitsmeannieee"]'
  );

  if (tiktokLink && typeof gtag === "function") {
    gtag("event", "annie_tiktok_click", {
      link_url: tiktokLink.href,
      link_text: "Annie TikTok Profile"
    });
  }
});

document.addEventListener("click", function (event) {
  const fbLink = event.target.closest(
    '#sm a[href="https://www.facebook.com/profile.php?id=100057326166377"]'
  );

  if (fbLink && typeof gtag === "function") {
    gtag("event", "annie_fb_click", {
      link_url: fbLink.href,
      link_text: "Annie Facebook Profile"
    });
  }
});



/* =========================================
   RESTORE HOMEPAGE SCROLL POSITION
========================================= */

(function () {
  const isHomepage =
    window.location.pathname.endsWith("/index.html") ||
    window.location.pathname.endsWith("/cse-guide/") ||
    window.location.pathname.endsWith("/cse-guide");

  const scrollKey = "cseGuideHomepageScroll";

  if (isHomepage) {
    // Restore the previous scroll position when returning
    const savedPosition = sessionStorage.getItem(scrollKey);

    if (savedPosition !== null) {
      history.scrollRestoration = "manual";

      const restoreScroll = () => {
        window.scrollTo(0, Number(savedPosition));
        sessionStorage.removeItem(scrollKey);
      };

      if (document.readyState === "complete") {
        requestAnimationFrame(restoreScroll);
      } else {
        window.addEventListener("load", () => {
          requestAnimationFrame(restoreScroll);
        }, { once: true });
      }
    }

    // Save the position
    document.querySelectorAll(".cards-grid a.card").forEach(card => {
      card.addEventListener("click", () => {
        sessionStorage.setItem(
          scrollKey,
          String(window.scrollY)
        );
      });
    });
  }
})();


