// 国际化模块
// browser 全局变量由 tsconfig 中的 types: ["webextension-polyfill"] 注入

const i18n = {
  getMessage(messageName: string, substitutions?: string | string[]): string {
    return browser.i18n.getMessage(messageName, substitutions)
  },

  getUILanguage(): string {
    return browser.i18n.getUILanguage()
  },

  localizeElement(element: Element): void {
    const i18nKey = element.getAttribute('data-i18n')
    if (i18nKey) {
      const message = this.getMessage(i18nKey)
      if (message) element.textContent = message
    }
  },

  localizePage(): void {
    document.querySelectorAll('[data-i18n]').forEach(el => this.localizeElement(el))

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title')
      if (key) {
        const message = this.getMessage(key)
        if (message) el.setAttribute('title', message)
      }
    })

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder')
      if (key) {
        const message = this.getMessage(key)
        if (message) el.setAttribute('placeholder', message)
      }
    })
  },
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => i18n.localizePage())
} else {
  i18n.localizePage()
}
