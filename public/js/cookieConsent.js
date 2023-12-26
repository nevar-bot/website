function createCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }

    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

/* show cookie banner if not accepted */
if (!readCookie("cookieConsent")) {
    $(".cookie-card").attr("style", "display: inherit!important");
    $(".cookie-trigger").hide();
}else{
    $(".cookie-trigger").show();
}

/* Cookies declined */
$(".cookie-decline-btn").click(function() {
    createCookie("cookieConsent", 0, 3 * 365);
    $(".cookie-card").attr("style", "display: none!important");
    $(".cookie-trigger").show();
});

/* Cookies accepted */
$(".cookie-accept-btn").click(function() {
    createCookie("cookieConsent", 1, 3 * 365);
    $(".cookie-card").attr("style", "display: none!important");
    $(".cookie-trigger").show();
});

/* Cookie trigger */
$(".cookie-trigger").click(function() {
    $(".cookie-card").attr("style", "display: inherit!important");
    $(".cookie-trigger").hide();
})