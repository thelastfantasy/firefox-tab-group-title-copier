// browser 全局变量由 src/globals.d.ts 声明

interface TabData {
  title: string | undefined
  url: string | undefined
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const tabGroups = await browser.tabGroups.query({})
    const loadingElement = document.getElementById('loading') as HTMLElement
    const tabGroupsList = document.getElementById('tabGroupsList') as HTMLElement
    const noGroupsElement = document.getElementById('noGroups') as HTMLElement

    if (tabGroups.length === 0) {
      loadingElement.style.display = 'none'
      noGroupsElement.style.display = 'block'
      return
    }

    loadingElement.style.display = 'none'

    // 按窗口分组
    const groupsByWindow: Record<number, (typeof tabGroups)[number][]> = {}
    for (const group of tabGroups) {
      if (!groupsByWindow[group.windowId]) {
        groupsByWindow[group.windowId] = []
      }
      groupsByWindow[group.windowId].push(group)
    }

    // 获取窗口信息
    const windows = await browser.windows.getAll()
    const windowInfo: Record<number, (typeof windows)[number]> = {}
    for (const win of windows) {
      if (win.id !== undefined) {
        windowInfo[win.id] = win
      }
    }

    // 按 ID 排序窗口，依序编号
    const sortedWindowIds = Object.keys(groupsByWindow)
      .map(Number)
      .sort((a, b) => a - b)
    let windowCounter = 1

    for (const windowId of sortedWindowIds) {
      const windowGroups = groupsByWindow[windowId]

      const windowElement = document.createElement('div')
      windowElement.className = 'window-group'

      const windowHeader = document.createElement('div')
      windowHeader.className = 'window-header'

      const windowTitle = document.createElement('span')
      windowTitle.className = 'window-title'
      const win = windowInfo[windowId]
      const windowNumber = windowCounter++
      const windowTitleText = browser.i18n.getMessage('windowTitle', [String(windowNumber)])
      const privateText = win?.incognito ? browser.i18n.getMessage('privateWindow') : ''
      windowTitle.textContent = windowTitleText + privateText

      windowHeader.appendChild(windowTitle)
      windowElement.appendChild(windowHeader)

      // 组内按 ID 排序
      windowGroups.sort((a, b) => a.id - b.id)

      for (const group of windowGroups) {
        const groupElement = document.createElement('div')
        groupElement.className = 'tab-group'

        const groupHeader = document.createElement('div')
        groupHeader.className = 'group-header'

        const groupTitle = document.createElement('span')
        groupTitle.className = 'group-title'
        groupTitle.textContent = group.title ?? `Group ${group.id}`

        const copyButtons = document.createElement('div')
        copyButtons.className = 'copy-buttons'

        const jsonCopyButton = document.createElement('button')
        jsonCopyButton.className = 'copy-button json'
        jsonCopyButton.title = 'Copy as JSON (title + URL)'
        jsonCopyButton.addEventListener('click', () => copyTabTitlesAsJSON(group.id))

        const textCopyButton = document.createElement('button')
        textCopyButton.className = 'copy-button text'
        textCopyButton.title = browser.i18n.getMessage('copyTitlesTooltip')
        textCopyButton.addEventListener('click', () => copyTabTitles(group.id))

        copyButtons.appendChild(jsonCopyButton)
        copyButtons.appendChild(textCopyButton)

        groupHeader.appendChild(groupTitle)
        groupHeader.appendChild(copyButtons)

        const tabsList = document.createElement('div')
        tabsList.className = 'tabs-list'
        tabsList.style.display = 'none'

        const tabs = await browser.tabs.query({ groupId: group.id })

        if (tabs.length === 0) {
          const emptyMessage = document.createElement('div')
          emptyMessage.className = 'empty-message'
          emptyMessage.textContent = browser.i18n.getMessage('noTabs')
          tabsList.appendChild(emptyMessage)
        } else {
          for (const tab of tabs) {
            const tabElement = document.createElement('div')
            tabElement.className = 'tab-item'
            tabElement.textContent = tab.title ?? ''
            tabElement.title = tab.title ?? ''
            tabsList.appendChild(tabElement)
          }
        }

        groupElement.appendChild(groupHeader)
        groupElement.appendChild(tabsList)
        windowElement.appendChild(groupElement)

        groupHeader.addEventListener('click', (e) => {
          if (!copyButtons.contains(e.target as Node)) {
            tabsList.style.display = tabsList.style.display === 'none' ? 'block' : 'none'
          }
        })
      }

      tabGroupsList.appendChild(windowElement)
    }
  } catch (error) {
    console.error('Error loading tab groups:', error)
    const loadingEl = document.getElementById('loading')
    if (loadingEl) {
      loadingEl.textContent = browser.i18n.getMessage('errorLoading')
    }
  }
})

async function copyTabTitles(groupId: number): Promise<void> {
  try {
    const tabs = await browser.tabs.query({ groupId })
    const tabTitles = tabs.map(tab => tab.title ?? '').join('\n')

    if (tabTitles) {
      await navigator.clipboard.writeText(tabTitles)
      showCopySuccess()
    } else {
      alert(browser.i18n.getMessage('noTabsFound'))
    }
  } catch (error) {
    console.error('Error copying tab titles:', error)
    alert(browser.i18n.getMessage('errorCopying'))
  }
}

async function copyTabTitlesAsJSON(groupId: number): Promise<void> {
  try {
    const tabs = await browser.tabs.query({ groupId })
    const tabData: TabData[] = tabs.map(tab => ({
      title: tab.title,
      url: tab.url,
    }))

    if (tabData.length > 0) {
      const jsonData = JSON.stringify(tabData, null, 2)
      await navigator.clipboard.writeText(jsonData)
      showCopySuccess()
    } else {
      alert(browser.i18n.getMessage('noTabsFound'))
    }
  } catch (error) {
    console.error('Error copying tab titles as JSON:', error)
    alert(browser.i18n.getMessage('errorCopying'))
  }
}

function showCopySuccess(): void {
  const successMessage = document.createElement('div')
  successMessage.className = 'copy-success'
  successMessage.textContent = browser.i18n.getMessage('copySuccess')
  successMessage.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: #4CAF50;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
    z-index: 1000;
  `
  document.body.appendChild(successMessage)
  setTimeout(() => document.body.removeChild(successMessage), 2000)
}
