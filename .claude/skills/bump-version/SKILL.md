Bump the extension version. Follow these steps exactly:

1. Read `package.json` to get the current version.

2. Ask the user: "当前版本是 X.Y.Z，请选择升级类型：patch / minor / major，或直接输入目标版本号"
   - patch: Z+1（bug 修复）
   - minor: Y+1, Z→0（新功能，向后兼容）
   - major: X+1, Y→0, Z→0（破坏性变更）

3. Calculate the new version string.

4. Update version in **both** files (they must always stay in sync):
   - `package.json`: the `"version"` field
   - `static/manifest.json`: the `"version"` field

5. Read `CHANGELOG.md`, then ask the user: "请描述本次变更内容（将写入 CHANGELOG）"
   Add a new section at the top of the changelog:
   ```
   ## vNEW_VERSION (YYYY-MM-DD)

   - <user's description>
   ```
   Use today's actual date.

6. Show a diff summary of all changed files and ask for confirmation before committing.

7. After confirmation, commit and tag:
   ```bash
   git add package.json static/manifest.json CHANGELOG.md
   git commit -m "chore: bump version to vNEW_VERSION"
   git tag vNEW_VERSION
   ```

8. Tell the user: "版本已更新至 vNEW_VERSION。推送并触发发布：git push && git push --tags"
