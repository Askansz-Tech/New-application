const translations = {
    en: {
        dashboardTitle: "Dashboard",
        dashboardWelcome: "Welcome to your personal dashboard. Stay updated with your latest activities.",
        quickActionsTitle: "Quick Actions",
        newTaskBtn: "New Task",
        quickNoteBtn: "Quick Note",
        privacyTitle: "Privacy Demo",
        privacyDesc: "This is a demonstration of privacy settings. Your data is safe and never shared.",
        privacyDetails: [
            "Local Storage: Your settings are saved locally if enabled.",
            "Cookies: Session cookies are used if enabled.",
            "Privacy Demo: Shows this privacy card."
        ],
        settingsTitle: "App Settings",
        darkModeLabel: "Dark Mode",
        darkModeDesc: "Switches the app between light and dark themes.",
        notificationsLabel: "Notifications",
        notificationsDesc: "Enable or disable browser notifications.",
        soundLabel: "Sound Effects",
        soundDesc: "Toggle sound effects for actions.",
        localStorageLabel: "Local Storage",
        localStorageDesc: "Allow the app to save your settings and data locally on your device.",
        cookiesLabel: "Cookies",
        cookiesDesc: "Allow the app to use cookies for session management.",
        privacyDemoLabel: "Privacy Demo",
        privacyDemoDesc: "Show a privacy demonstration card on the dashboard.",
        translationLabel: "Translate to Swedish",
        translationDesc: "Switches the app language between English and Swedish.",
        appearanceCategory: "Appearance",
        notificationsCategory: "Notifications",
        privacyCategory: "Privacy",
        languageCategory: "Language",
        navHome: "Home",
        navSettings: "Settings",
        navBugs: "Bugs",
        navSites: "Our Sites",
        bugsTitle: "Known Bugs & Issues",
        restartAppBtn: "Restart Application", // Add this to the English section
        analyticsLabel: "Analytics",
        analyticsDesc: "Allow anonymous usage data to help improve the app.",
        errorReportLabel: "Error Reporting",
        errorReportDesc: "Send crash and bug reports to help us fix issues faster."
    },
    sv: {
        dashboardTitle: "Instrumentpanel",
        dashboardWelcome: "Välkommen till din personliga instrumentpanel. Håll dig uppdaterad med dina senaste aktiviteter.",
        quickActionsTitle: "Snabba Åtgärder",
        newTaskBtn: "Ny Uppgift",
        quickNoteBtn: "Snabb Anteckning",
        privacyTitle: "Integritetsdemo",
        privacyDesc: "Detta är en demonstration av integritetsinställningar. Dina data är säkra och delas aldrig.",
        privacyDetails: [
            "Lokal lagring: Dina inställningar sparas lokalt om aktiverat.",
            "Cookies: Sessionscookies används om aktiverat.",
            "Integritetsdemo: Visar detta integritetskort."
        ],
        settingsTitle: "Appinställningar",
        darkModeLabel: "Mörkt läge",
        darkModeDesc: "Växlar appen mellan ljust och mörkt läge.",
        notificationsLabel: "Aviseringar",
        notificationsDesc: "Aktivera eller inaktivera webbläsaraviseringar.",
        soundLabel: "Ljud",
        soundDesc: "Aktivera eller inaktivera ljudeffekter.",
        localStorageLabel: "Lokal lagring",
        localStorageDesc: "Tillåt appen att spara dina inställningar och data lokalt på din enhet.",
        cookiesLabel: "Cookies",
        cookiesDesc: "Tillåt appen att använda cookies för sessionshantering.",
        privacyDemoLabel: "Integritetsdemo",
        privacyDemoDesc: "Visa ett integritetsdemokort på instrumentpanelen.",
        translationLabel: "Översätt till svenska",
        translationDesc: "Växlar appens språk mellan engelska och svenska.",
        appearanceCategory: "Utseende",
        notificationsCategory: "Aviseringar",
        privacyCategory: "Integritet",
        languageCategory: "Språk",
        navHome: "Hem",
        navSettings: "Inställningar",
        navBugs: "Buggar",
        navSites: "Våra Sidor",
        bugsTitle: "Kända buggar & problem",
        restartAppBtn: "Starta om applikationen", // Add this to the Swedish section
        analyticsLabel: "Analys",
        analyticsDesc: "Tillåt anonym användningsdata för att förbättra appen.",
        errorReportLabel: "Felsökning",
        errorReportDesc: "Skicka krascher och buggrapporter för att hjälpa oss åtgärda problem snabbare."
    }
};

class AppStateManager {
    constructor() {
        this.state = {
            darkMode: false,
            notifications: false,
            sound: false,
            translation: false,
            privacyDemo: false,
            localStorage: true,
            cookies: true,
            analytics: false,      // NEW
            errorReport: false     // NEW
        };
    }
    init() {
        this.loadState();
        this.setupEventListeners();
        this.applyInitialSettings();
    }
    loadState() {
        if (this.state.localStorage) {
            try {
                const savedState = localStorage.getItem('appState');
                if (savedState) {
                    const parsedState = JSON.parse(savedState);
                    this.state = { ...this.state, ...parsedState };
                }
            } catch (error) {
                console.error('Error loading app state:', error);
            }
        }
    }
    saveState() {
        if (this.state.localStorage) {
            try {
                localStorage.setItem('appState', JSON.stringify(this.state));
            } catch (error) {
                console.error('Error saving app state:', error);
            }
        }
    }
    applyInitialSettings() {
        document.body.classList.toggle('dark-mode', this.state.darkMode);
        [
            { id: 'darkModeToggle', key: 'darkMode' },
            { id: 'notificationsToggle', key: 'notifications' },
            { id: 'soundToggle', key: 'sound' },
            { id: 'translationToggle', key: 'translation' },
            { id: 'privacyDemoToggle', key: 'privacyDemo' },
            { id: 'localStorageToggle', key: 'localStorage' },
            { id: 'cookiesToggle', key: 'cookies' },
            { id: 'analyticsToggle', key: 'analytics' },         // NEW
            { id: 'errorReportToggle', key: 'errorReport' }      // NEW
        ].forEach(toggle => {
            const element = document.getElementById(toggle.id);
            if (element) element.checked = this.state[toggle.key];
        });
        this.applyTranslation();
        this.applyPrivacyDemo();
    }
    setupEventListeners() {
        // Appearance
        this.addToggleListener('darkModeToggle', 'darkMode', () => {
            document.body.classList.toggle('dark-mode', this.state.darkMode);
        });
        // Notifications
        this.addToggleListener('notificationsToggle', 'notifications', () => {
            if (this.state.notifications && "Notification" in window) {
                Notification.requestPermission().catch(console.error);
            }
        });
        // Sound
        this.addToggleListener('soundToggle', 'sound');
        // Language
        this.addToggleListener('translationToggle', 'translation', () => {
            this.applyTranslation();
        });
        // Privacy Demo
        this.addToggleListener('privacyDemoToggle', 'privacyDemo', () => {
            this.applyPrivacyDemo();
        });
        // Local Storage
        this.addToggleListener('localStorageToggle', 'localStorage', () => {
            if (!this.state.localStorage) {
                localStorage.removeItem('appState');
            } else {
                this.saveState();
            }
        });
        // Cookies (demo only)
        this.addToggleListener('cookiesToggle', 'cookies');
        // Analytics (demo only)
        this.addToggleListener('analyticsToggle', 'analytics', () => {
            // Here you could enable/disable analytics scripts if implemented
        });
        // Error Reporting (demo only)
        this.addToggleListener('errorReportToggle', 'errorReport', () => {
            // Here you could enable/disable error reporting scripts if implemented
        });
    }
    addToggleListener(elementId, stateKey, callback) {
        const el = document.getElementById(elementId);
        if (el) {
            el.addEventListener('change', (e) => {
                this.state[stateKey] = e.target.checked;
                this.saveState();
                if (callback) callback();
            });
        }
    }
    applyTranslation() {
        const lang = this.state.translation ? 'sv' : 'en';
        const t = translations[lang];
        [
            ['dashboard-title', t.dashboardTitle],
            ['dashboard-welcome', t.dashboardWelcome],
            ['quick-actions-title', t.quickActionsTitle],
            ['new-task-btn', t.newTaskBtn],
            ['quick-note-btn', t.quickNoteBtn],
            ['privacy-title', t.privacyTitle],
            ['privacy-desc', t.privacyDesc],
            ['settings-title', t.settingsTitle],
            ['dark-mode-label', t.darkModeLabel],
            ['dark-mode-desc', t.darkModeDesc],
            ['notifications-label', t.notificationsLabel],
            ['notifications-desc', t.notificationsDesc],
            ['sound-label', t.soundLabel],
            ['sound-desc', t.soundDesc],
            ['local-storage-label', t.localStorageLabel],
            ['local-storage-desc', t.localStorageDesc],
            ['cookies-label', t.cookiesLabel],
            ['cookies-desc', t.cookiesDesc],
            ['privacy-demo-label', t.privacyDemoLabel],
            ['privacy-demo-desc', t.privacyDemoDesc],
            ['translation-label', t.translationLabel],
            ['translation-desc', t.translationDesc],
            ['appearance-category', t.appearanceCategory],
            ['notifications-category', t.notificationsCategory],
            ['privacy-category', t.privacyCategory],
            ['language-category', t.languageCategory],
            ['nav-home', t.navHome],
            ['nav-settings', t.navSettings],
            ['nav-bugs', t.navBugs],
            ['nav-sites', t.navSites],
            ['bugs-title', t.bugsTitle],
            ['restartAppBtn', t.restartAppBtn],
            ['analytics-label', t.analyticsLabel],         // NEW
            ['analytics-desc', t.analyticsDesc],           // NEW
            ['error-report-label', t.errorReportLabel],    // NEW
            ['error-report-desc', t.errorReportDesc]       // NEW
        ].forEach(([id, value]) => {
            const el = document.getElementById(id);
            if (el) {
                if (id === 'restartAppBtn') {
                    el.innerHTML = `<i class="ri-refresh-line"></i> ${value}`;
                } else {
                    el.textContent = value;
                }
            }
        });
        // Privacy details
        const detailsList = document.getElementById('privacy-details');
        if (detailsList) {
            detailsList.innerHTML = '';
            t.privacyDetails.forEach(d => {
                const li = document.createElement('li');
                li.textContent = d;
                detailsList.appendChild(li);
            });
        }
    }
    applyPrivacyDemo() {
        const card = document.getElementById('privacy-demo-card');
        if (card) card.style.display = this.state.privacyDemo ? 'block' : 'none';
    }
}

// --- Bugs Page Expand/Collapse Logic ---
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.project-header').forEach(header => {
        header.addEventListener('click', function() {
            document.querySelectorAll('.project-card').forEach(card => {
                if (card.contains(header)) {
                    card.classList.toggle('expanded');
                } else {
                    card.classList.remove('expanded');
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('app-loader');
    // Show loader only if not loaded before in this session
    if (loader && !sessionStorage.getItem('appLoaded')) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
            sessionStorage.setItem('appLoaded', 'true');
        }, 900); // Show loader for at least 900ms
    } else if (loader) {
        loader.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const appStateManager = new AppStateManager();
    appStateManager.init();
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const restartBtn = document.getElementById('restartAppBtn');
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            // Clear local storage and session storage
            localStorage.clear();
            sessionStorage.clear();
            // Redirect to the main page (index.html)
            window.location.href = 'index.html';
        });
    }
});
