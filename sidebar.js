document.addEventListener('DOMContentLoaded', async () => {
    try {
        const tabGroups = await browser.tabGroups.query({});
        const loadingElement = document.getElementById('loading');
        const tabGroupsList = document.getElementById('tabGroupsList');
        const noGroupsElement = document.getElementById('noGroups');

        if (tabGroups.length === 0) {
            loadingElement.style.display = 'none';
            noGroupsElement.style.display = 'block';
            return;
        }

        loadingElement.style.display = 'none';

        // Sort tab groups by their actual order in the browser
        tabGroups.sort((a, b) => a.id - b.id);

        for (const group of tabGroups) {
            const groupElement = document.createElement('div');
            groupElement.className = 'tab-group';

            const groupHeader = document.createElement('div');
            groupHeader.className = 'group-header';

            const groupTitle = document.createElement('span');
            groupTitle.className = 'group-title';
            groupTitle.textContent = group.title || `Group ${group.id}`;

            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.textContent = browser.i18n.getMessage('copyTitles');
            copyButton.title = browser.i18n.getMessage('copyTitlesTooltip');
            copyButton.addEventListener('click', () => copyTabTitles(group.id));

            groupHeader.appendChild(groupTitle);
            groupHeader.appendChild(copyButton);

            const tabsList = document.createElement('div');
            tabsList.className = 'tabs-list';
            tabsList.style.display = 'none';

            // Get tabs for this group
            const tabs = await browser.tabs.query({ groupId: group.id });

            if (tabs.length === 0) {
                const emptyMessage = document.createElement('div');
                emptyMessage.className = 'empty-message';
                emptyMessage.textContent = browser.i18n.getMessage('noTabs');
                tabsList.appendChild(emptyMessage);
            } else {
                tabs.forEach(tab => {
                    const tabElement = document.createElement('div');
                    tabElement.className = 'tab-item';
                    tabElement.textContent = tab.title;
                    tabsList.appendChild(tabElement);
                });
            }

            groupElement.appendChild(groupHeader);
            groupElement.appendChild(tabsList);
            tabGroupsList.appendChild(groupElement);

            // Add click handler to toggle tabs list
            groupHeader.addEventListener('click', (e) => {
                if (e.target !== copyButton) {
                    tabsList.style.display = tabsList.style.display === 'none' ? 'block' : 'none';
                }
            });
        }
    } catch (error) {
        console.error('Error loading tab groups:', error);
        document.getElementById('loading').textContent = browser.i18n.getMessage('errorLoading');
    }
});

async function copyTabTitles(groupId) {
    try {
        const tabs = await browser.tabs.query({ groupId: groupId });
        const tabTitles = tabs.map(tab => tab.title).join('\n');

        if (tabTitles) {
            await navigator.clipboard.writeText(tabTitles);
            showCopySuccess();
        } else {
            alert(browser.i18n.getMessage('noTabsFound'));
        }
    } catch (error) {
        console.error('Error copying tab titles:', error);
        alert(browser.i18n.getMessage('errorCopying'));
    }
}

function showCopySuccess() {
    const successMessage = document.createElement('div');
    successMessage.className = 'copy-success';
    successMessage.textContent = browser.i18n.getMessage('copySuccess');
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
    `;

    document.body.appendChild(successMessage);

    setTimeout(() => {
        document.body.removeChild(successMessage);
    }, 2000);
}