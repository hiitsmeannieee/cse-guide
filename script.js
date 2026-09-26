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
  "If you saw this, this is your sign. Papasa ka. ✨",
  "'Wag ka na mag-overthink. Papasa ka ngani. ✨",
  'From "sana pumasa" to "FINALLY PASSED". Claim mo na! ✨',
  "You! Yes you! You'll become a CSE Passer!!! 🤍",
  "By God's grace, CSE PASSER. 🤍",
  "This is your sign. You will pass the CSE. 1 take, last take, no retake. CLAIM IT! ✨",
  "Sending you CSE PASSER dust!!! ✨",
  "Your biggest plot twist next year: Papasa ka sa CSE. 🍀",
  "PAPASA KA! KAYA MO YAN! 💪✨",
  "✨ basbas dust ✨ CSE PASSER KA NA NEXT YEAR!",
  "Your name will be on that #list. Claim it. ✨",
  "Congratulations! CSE PASSER ka na soon! ✨🍀",
  "Ah basta, CSE passer ka na soon. PERIOD ✨",
  "'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters' — Colossians 3:23",
  "'Cast all your anxiety on him because he cares for you.' — 1 Peter 5:7 (NIV)",
  "'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.' — Philippians 4:6–7 (NIV)",
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
  const announcementLink = document.querySelector('a[href="https://example.com"]');
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

const announcementLinks = document.querySelectorAll('a[href="https://example.com"]');

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
  'a[href="https://example.com"]'
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
  'a[href="https://vt.tiktok.com/ZSqK3Hfmt/"]'
);

if (brainboxTiktokLink) {
  brainboxTiktokLink.addEventListener("click", () => {
    if (typeof gtag === "function") {
      gtag("event", "faqs_brainbox_tiktok_shop_click");
    }
  });
}

// FAQs - Get Your Brainbox Book Reviewer - Shopee
const brainboxShopeeLink = document.querySelector(
  'a[href="https://vt.tiktok.com/ZS4x48kby/"]'
);

if (brainboxShopeeLink) {
  brainboxShopeeLink.addEventListener("click", () => {
    if (typeof gtag === "function") {
      gtag("event", "faqs_brainbox_shopee_click");
    }
  });
}

// FAQs - Get Faber-Castell Pens - TikTok Shop
const faberCastellTiktokLink = document.querySelector(
  'a[href="https://vt.tiktok.com/ZS9AyKub5AbpC-cnM3S/"]'
);

if (faberCastellTiktokLink) {
  faberCastellTiktokLink.addEventListener("click", () => {
    if (typeof gtag === "function") {
      gtag("event", "faqs_faber_castell_tiktok_shop_click");
    }
  });
}

// FAQs - Get Faber-Castell Pens - Shopee
const faberCastellShopeeLink = document.querySelector(
  'a[href="https://vt.tiktok.com/ZS4x48kby/"]'
);

if (faberCastellShopeeLink) {
  faberCastellShopeeLink.addEventListener("click", () => {
    if (typeof gtag === "function") {
      gtag("event", "faqs_faber_castell_shopee_click");
    }
  });
}


// ==================================
// SOCIAL MEDIA LINK TRACKING
// ==================================

const tiktokLink = document.querySelector(
  'a[href="https://www.tiktok.com/@hiitsmeannieee"]'
);

if (tiktokLink) {
  tiktokLink.addEventListener("click", () => {
    if (typeof gtag === "function") {
      gtag("event", "annie_tiktok_click");
    }
  });
}


const facebookLink = document.querySelector(
  'a[href="https://www.facebook.com/hiitsmeannieee"]'
);

if (facebookLink) {
  facebookLink.addEventListener("click", () => {
    if (typeof gtag === "function") {
      gtag("event", "annie_facebook_click");
    }
  });
}


// ==================================
// FOOTER LINK TRACKING
// ==================================

const footerLinks = document.querySelectorAll(
  'a[href="https://www.csc.gov.ph/"]'
);

// CSC Official Website
if (footerLinks[0]) {
  footerLinks[0].addEventListener("click", () => {
    if (typeof gtag === "function") {
      gtag("event", "footer_csc_website_click");
    }
  });
}

// CSC Official Announcement
if (footerLinks[1]) {
  footerLinks[1].addEventListener("click", () => {
    if (typeof gtag === "function") {
      gtag("event", "footer_csc_announcement_click");
    }
  });
}


// ==================================
// DAILY QUOTE BUTTON TRACKING
// ==================================

const dailyQuoteButton = document.querySelector(".daily-quote-button");

if (dailyQuoteButton) {
  dailyQuoteButton.addEventListener("click", () => {
    if (typeof gtag === "function") {
      gtag("event", "daily_quote_click");
    }
  });
}

