// COPY OF COOKIEBOT SCRIPT 
let settingsPage;

function isDecisionMade() {
    return Cookiebot.consented || Cookiebot.declined;
}

function showCookieBanner() {
    const cookieBanner = document.getElementById("cookieBanner");
    settingsPage = document.getElementById("settingsPage");
    if (!isDecisionMade()) {
        cookieBanner.style.display = "block";
    }
}

function hideCookieBanner(bannerID) {
    const banner = document.getElementById(bannerID);
    banner.style.display = "none";
}

function acceptAllCookies(element) {
    // Set all categories in Cookiebot.consent to true
    const allCategories = {
        stamp: Cookiebot.consent.stamp,
        necessary: true,
        preferences: true,
        statistics: true,
        marketing: true,
        method: "explicit", 
        ver: 1,
        utc: new Date().getTime(), 
        region: "de",
    };
    Cookiebot.consent = allCategories;
    Cookiebot.consented = true;
    Cookiebot.renew();
    Cookiebot.submitCustomConsent(Cookiebot.consent);
    hideCookieBanner(element);
}

function updateSettings() {
    const checkList = ["preferences", "statistics", "marketing"];
    for (let i = 0; i < checkList.length; i++) {
        const type = checkList[i];
        Cookiebot.consent[type] = document.getElementById(type).checked;
    }
    Cookiebot.consented = true;
    Cookiebot.consent.hasResponse = true;
    Cookiebot.submitCustomConsent(Cookiebot.consent);
    hideCookieBanner("settingsPage");
}

document.getElementById("acceptAll").addEventListener("click", function () {
        acceptAllCookies("cookieBanner");
});

document.getElementById("acceptAll2").addEventListener("click", function () {
        acceptAllCookies("settingsPage");
});

document.getElementById("customizeSettings").addEventListener("click", function () {
    hideCookieBanner("cookieBanner");
    settingsPage.style.display = "block";
});

document.getElementById("saveSettings").addEventListener("click", function () {
    updateSettings("settingsPage");
});

document.getElementById("rejectAll").addEventListener("click", function () {
    Cookiebot.declined = true;
    Cookiebot.consent.hasResponse = true;
    hideCookieBanner("settingsPage");
});


window.addEventListener('CookiebotOnAccept', function (e) {
    if (Cookiebot.consent.marketing) {
        // Marketing logic
         console.log("Marketing logic");
    } 
    if (Cookiebot.consent.preferences) {
        // Preferences logic
        console.log("Preference logic");
    } 
    if (Cookiebot.consent.statistics) {
        // Statistics logic
        console.log("Statistics logic");
    }
    if (Cookiebot.consent.necessary) {
        // Necessary logic
        console.log("Necessary logic");
    } 
}, false);
