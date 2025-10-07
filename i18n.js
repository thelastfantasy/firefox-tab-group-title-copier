// Internationalization module
const i18n = {
    // Get localized string
    getMessage: function(messageName, substitutions = null) {
        return browser.i18n.getMessage(messageName, substitutions);
    },

    // Get UI language
    getUILanguage: function() {
        return browser.i18n.getUILanguage();
    },

    // Localize an element by data-i18n attribute
    localizeElement: function(element) {
        const i18nKey = element.getAttribute('data-i18n');
        if (i18nKey) {
            const message = this.getMessage(i18nKey);
            if (message) {
                element.textContent = message;
            }
        }
    },

    // Localize all elements with data-i18n attributes
    localizePage: function() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            this.localizeElement(element);
        });

        // Localize title attributes
        const titleElements = document.querySelectorAll('[data-i18n-title]');
        titleElements.forEach(element => {
            const i18nKey = element.getAttribute('data-i18n-title');
            if (i18nKey) {
                const message = this.getMessage(i18nKey);
                if (message) {
                    element.setAttribute('title', message);
                }
            }
        });

        // Localize placeholder attributes
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const i18nKey = element.getAttribute('data-i18n-placeholder');
            if (i18nKey) {
                const message = this.getMessage(i18nKey);
                if (message) {
                    element.setAttribute('placeholder', message);
                }
            }
        });
    }
};

// Auto-localize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        i18n.localizePage();
    });
} else {
    i18n.localizePage();
}