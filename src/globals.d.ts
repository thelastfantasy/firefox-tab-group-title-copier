// 将 webextension-polyfill 的模块类型声明为全局 browser 变量
// 使源文件无需 import 即可直接使用 browser.* API
declare const browser: typeof import('webextension-polyfill')
