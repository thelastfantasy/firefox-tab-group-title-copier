import * as esbuild from 'esbuild'
import { cpSync, rmSync, mkdirSync } from 'fs'

const isWatch = process.argv.includes('--watch')

// 清理并重建 dist/
rmSync('dist', { recursive: true, force: true })
mkdirSync('dist', { recursive: true })

// 将静态资源原样复制到 dist/
cpSync('static', 'dist', { recursive: true })
console.log('Static files copied to dist/')

/** @type {import('esbuild').BuildOptions} */
const buildOptions = {
  entryPoints: [
    'src/popup.ts',
    'src/i18n.ts',
  ],
  // 不打包：两个脚本保持独立文件，与 popup.html 中的两个 <script> 标签对应
  bundle: false,
  outdir: 'dist',
  // Firefox 109+ 对应 manifest 中的 strict_min_version
  target: 'firefox109',
  // IIFE 格式：变量不泄漏到全局作用域
  format: 'iife',
  logLevel: 'info',
}

if (isWatch) {
  const ctx = await esbuild.context(buildOptions)
  await ctx.watch()
  console.log('Watching for changes...')
} else {
  await esbuild.build(buildOptions)
  console.log('Build complete.')
}
