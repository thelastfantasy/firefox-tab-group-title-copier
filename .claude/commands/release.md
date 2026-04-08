Publish the extension by pushing the current commit and tags to trigger the release workflow.

1. Run the following checks and show the results to the user:
   - Current branch: `git branch --show-current`
   - Working tree status: `git status --short`
   - Latest tag: `git describe --tags --abbrev=0`
   - Whether the tag is already pushed: `git ls-remote --tags origin <tag>`

2. Warn and stop if any of these conditions are true:
   - Not on the `main` branch
   - Working tree has uncommitted changes
   - No local tag exists (suggest running `/bump-version` first)
   - The latest tag is already on the remote (already released)

3. Show a confirmation summary:
   ```
   即将发布：
     版本：<tag>
     触发工作流：release.yml → 构建 XPI、创建 GitHub Release、提交 AMO

   确认发布？(yes/no)
   ```

4. Only proceed after the user explicitly confirms with "yes".

5. Run:
   ```bash
   git push origin main
   git push origin <tag>
   ```

6. Tell the user: "已推送 <tag>，GitHub Actions release.yml 正在运行：https://github.com/thelastfantasy/firefox-tab-group-title-copier/actions"
