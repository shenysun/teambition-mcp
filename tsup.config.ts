import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'], // 输出 ES module 格式
  target: 'node16', // 目标 Node.js 版本
  outDir: 'dist',
  clean: true, // 构建前清理输出目录
  splitting: false, // 不进行代码分割
  sourcemap: true, // 生成 sourcemap
  minify: false, // 不压缩代码（开发阶段）
  dts: true, // 生成类型声明文件
})
