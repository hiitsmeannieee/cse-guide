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