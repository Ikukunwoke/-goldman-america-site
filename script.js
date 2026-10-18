/* =========================================================
   BANKING DEMO - MAIN FRONTEND SCRIPT
   =========================================================

   Shared frontend utilities for the Banking Demo website.

   IMPORTANT:
   - No real banking transactions are processed here.
   - Page-specific functionality remains inside each HTML file.
   - Supabase authentication/database logic is handled by
     the individual pages that require it.
   ========================================================= */


/* =========================================================
   PAGE READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    initializeNavigation();
    initializePasswordFields();
    initializeModals();
    initializeButtons();
    initializeForms();
});


/* =========================================================
   NAVIGATION
   ========================================================= */

function initializeNavigation() {

    const navigationMap = {
        dashboard: "dashboard.html",
        profile: "profile.html",
        settings: "settings.html",
        transactions: "transactions.html",
        cards: "cards.html",
        transfer: "transfer.html",
        statements: "statements.html"
    };

    Object.keys(navigationMap).forEach(function (linkName) {

        const links = document.querySelectorAll(
            '[data-link="' + linkName + '"]'
        );

        links.forEach(function (link) {

            link.addEventListener("click", function (event) {

                event.preventDefault();

                window.location.href =
                    navigationMap[linkName];

            });

        });

    });
}


/* =========================================================
   PASSWORD SHOW / HIDE
   ========================================================= */

function initializePasswordFields() {

    const passwordToggles =
        document.querySelectorAll("[data-password-toggle]");

    passwordToggles.forEach(function (toggle) {

        toggle.addEventListener("click", function () {

            const targetId =
                toggle.getAttribute("data-password-toggle");

            const passwordInput =
                document.getElementById(targetId);

            if (!passwordInput) {
                return;
            }

            if (passwordInput.type === "password") {

                passwordInput.type = "text";
                toggle.textContent = "Hide";

            } else {

                passwordInput.type = "password";
                toggle.textContent = "Show";

            }

        });

    });
}


/* =========================================================
   MODALS
   ========================================================= */

function initializeModals() {

    const openButtons =
        document.querySelectorAll("[data-open-modal]");

    openButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const modalId =
                button.getAttribute("data-open-modal");

            openModal(modalId);

        });

    });


    const closeButtons =
        document.querySelectorAll("[data-close-modal]");

    closeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const modalId =
                button.getAttribute("data-close-modal");

            closeModal(modalId);

        });

    });


    document
        .querySelectorAll(".modal-overlay")
        .forEach(function (overlay) {

            overlay.addEventListener("click", function (event) {

                if (event.target === overlay) {

                    overlay.style.display = "none";

                }

            });

        });
}


function openModal(modalId) {

    const modal =
        document.getElementById(modalId);

    if (modal) {

        modal.style.display = "flex";

    }
}


function closeModal(modalId) {

    const modal =
        document.getElementById(modalId);

    if (modal) {

        modal.style.display = "none";

    }
}


/* =========================================================
   BUTTONS
   ========================================================= */

function initializeButtons() {

    const logoutButtons =
        document.querySelectorAll('[data-action="logout"]');

    logoutButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            logout();

        });

    });


    const backButtons =
        document.querySelectorAll('[data-action="back"]');

    backButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            window.history.back();

        });

    });
}


/* =========================================================
   LOGOUT
   ========================================================= */

async function logout() {

    const confirmed =
        window.confirm(
            "Are you sure you want to log out?"
        );

    if (!confirmed) {
        return;
    }


    /*
       If a page has created a Supabase client,
       attempt to sign out through Supabase.

       The function does not require Supabase to exist,
       so the frontend can still be previewed without
       backend credentials.
    */

    try {

        if (
            typeof supabaseClient !== "undefined" &&
            supabaseClient &&
            supabaseClient.auth
        ) {

            await supabaseClient.auth.signOut();

        }

    } catch (error) {

        console.error(
            "Supabase logout error:",
            error
        );

    }


    /*
       Clear temporary demo/session data.
    */

    try {

        sessionStorage.removeItem("bankingDemoSession");

    } catch (error) {

        console.error(
            "Unable to clear session data:",
            error
        );

    }


    window.location.href = "login.html";
}


/* =========================================================
   FORM INITIALIZATION
   ========================================================= */

function initializeForms() {

    const forms =
        document.querySelectorAll("form");

    forms.forEach(function (form) {

        form.addEventListener("submit", function (event) {

            /*
               Demo/static forms are prevented from
               accidentally refreshing the page.

               Pages with their own submit handlers can
               preventDefault() themselves.
            */

            if (
                form.hasAttribute("data-demo-form") ||
                form.hasAttribute("data-static-form")
            ) {

                event.preventDefault();

            }

        });

    });
}


/* =========================================================
   GLOBAL MESSAGE / NOTIFICATION
   ========================================================= */

function showMessage(message, type = "info") {

    const existing =
        document.querySelector(".global-notification");

    if (existing) {

        existing.remove();

    }


    const notification =
        document.createElement("div");

    notification.className =
        "global-notification";

    notification.textContent =
        message;


    notification.style.position = "fixed";
    notification.style.top = "20px";
    notification.style.right = "20px";
    notification.style.zIndex = "9999";
    notification.style.maxWidth = "360px";
    notification.style.padding = "14px 18px";
    notification.style.borderRadius = "10px";
    notification.style.fontSize = "14px";
    notification.style.fontWeight = "600";
    notification.style.lineHeight = "1.5";
    notification.style.boxShadow =
        "0 8px 25px rgba(0,0,0,0.15)";
    notification.style.transition =
        "opacity 0.3s ease";


    if (type === "success") {

        notification.style.background = "#EAF7F0";
        notification.style.color = "#197A4B";
        notification.style.border =
            "1px solid #BFE5CE";

    } else if (type === "error") {

        notification.style.background = "#FFF0F0";
        notification.style.color = "#C84444";
        notification.style.border =
            "1px solid #ECCACA";

    } else if (type === "warning") {

        notification.style.background = "#FFF7E8";
        notification.style.color = "#8A5A00";
        notification.style.border =
            "1px solid #F0D59B";

    } else {

        notification.style.background = "#FFF0F7";
        notification.style.color = "#5B1647";
        notification.style.border =
            "1px solid #F0C9DD";

    }


    document.body.appendChild(notification);


    setTimeout(function () {

        notification.style.opacity = "0";

        setTimeout(function () {

            if (notification.parentNode) {

                notification.remove();

            }

        }, 300);

    }, 3500);
}


/* =========================================================
   CONFIRMATION HELPER
   ========================================================= */

function confirmAction(message) {

    return window.confirm(message);

}


/* =========================================================
   FORMAT NUMBER
   ========================================================= */

function formatNumber(value) {

    const number =
        Number(value);

    if (Number.isNaN(number)) {

        return "0";

    }

    return number.toLocaleString("en-US");

}


/* =========================================================
   FORMAT USD MONEY
   ========================================================= */

function formatCurrency(value) {

    const number =
        Number(value);

    if (!Number.isFinite(number)) {

        return "$0.00";

    }

    return new Intl.NumberFormat("en-US", {

        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2

    }).format(number);

}


/* =========================================================
   FORMAT DATE
   ========================================================= */

function formatDate(dateValue) {

    const date =
        new Date(dateValue);

    if (Number.isNaN(date.getTime())) {

        return "";

    }

    return date.toLocaleDateString(
        "en-US",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================================================
   FORMAT DATE + TIME
   ========================================================= */

function formatDateTime(dateValue) {

    const date =
        new Date(dateValue);

    if (Number.isNaN(date.getTime())) {

        return "";

    }

    return date.toLocaleString(
        "en-US",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


/* =========================================================
   GENERATE DEMO REFERENCE
   ========================================================= */

function generateReference(prefix = "BD") {

    const random =
        Math.floor(
            100000 +
            Math.random() * 900000
        );

    return prefix + "-" + random;

}


/* =========================================================
   INPUT VALIDATION
   ========================================================= */

function isValidEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(
        String(email || "").trim()
    );

}


function isValidPhone(phone) {

    const cleaned =
        String(phone || "")
            .replace(/[\s()-]/g, "");

    return /^[+0-9]{7,18}$/.test(cleaned);

}


function isValidAmount(amount) {

    const number =
        Number(amount);

    return (
        Number.isFinite(number) &&
        number > 0
    );

}


/* =========================================================
   SAFE TEXT
   ========================================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   MOBILE MENU HELPER
   ========================================================= */

function toggleMobileMenu(menuId) {

    const menu =
        document.getElementById(menuId);

    if (!menu) {

        return;

    }

    menu.classList.toggle("open");

}


/* =========================================================
   DISABLE BUTTON DURING ACTION
   ========================================================= */

function disableButton(
    button,
    text = "Please wait..."
) {

    if (!button) {

        return;

    }

    if (!button.dataset.originalText) {

        button.dataset.originalText =
            button.textContent;

    }

    button.disabled = true;

    button.textContent =
        text;

    button.style.opacity = "0.7";

    button.style.cursor =
        "not-allowed";

}


function enableButton(button) {

    if (!button) {

        return;

    }

    button.disabled = false;

    button.textContent =
        button.dataset.originalText ||
        button.textContent;

    button.style.opacity = "";

    button.style.cursor = "";

}


/* =========================================================
   LOCAL DEMO STORAGE HELPERS
   =========================================================

   These functions are only for frontend testing.

   They are NOT the banking database.

   Customer/account information should come from
   Supabase when the backend is connected.
   ========================================================= */

function saveDemoData(key, value) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

        return true;

    } catch (error) {

        console.error(
            "Unable to save demo data:",
            error
        );

        return false;

    }

}


function getDemoData(
    key,
    fallback = null
) {

    try {

        const value =
            localStorage.getItem(key);

        if (value === null) {

            return fallback;

        }

        return JSON.parse(value);

    } catch (error) {

        console.error(
            "Unable to read demo data:",
            error
        );

        return fallback;

    }

}


function removeDemoData(key) {

    try {

        localStorage.removeItem(key);

        return true;

    } catch (error) {

        console.error(
            "Unable to remove demo data:",
            error
        );

        return false;

    }

}


/* =========================================================
   CLOSE ALL MODALS
   ========================================================= */

function closeAllModals() {

    document
        .querySelectorAll(".modal-overlay")
        .forEach(function (modal) {

            modal.style.display = "none";

        });

}


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeAllModals();

        }

    }
);


/* =========================================================
   GLOBAL ERROR HANDLING
   ========================================================= */

window.addEventListener(
    "error",
    function (event) {

        console.error(
            "Banking Demo frontend error:",
            event.error || event.message
        );

    }
);


/* =========================================================
   UNHANDLED PROMISE ERRORS
   ========================================================= */

window.addEventListener(
    "unhandledrejection",
    function (event) {

        console.error(
            "Banking Demo promise error:",
            event.reason
        );

    }
);


/* =========================================================
   GLOBAL FUNCTIONS
   ========================================================= */

window.BankingDemo = {

    logout,

    openModal,
    closeModal,
    closeAllModals,

    showMessage,
    confirmAction,

    formatNumber,
    formatCurrency,
    formatDate,
    formatDateTime,

    generateReference,

    isValidEmail,
    isValidPhone,
    isValidAmount,

    escapeHTML,

    toggleMobileMenu,

    disableButton,
    enableButton,

    saveDemoData,
    getDemoData,
    removeDemoData

};