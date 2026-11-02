# Shelfline 模板使用说明

先读本文件、template.json 与 project.json。模板是一个独立 Next.js 应用，业务代码采用 feature-based 结构。完整提供 39 个页面与状态页，默认中文，英文在 `/en`。支持商品与价格筛选、九款立体商品、三组套餐、课程目录、文章、政策、购物车及本地表单。

固定 Node 24.16.0、pnpm 9.15.4。先执行 `corepack pnpm install --frozen-lockfile`；开发执行 `corepack pnpm dev`，地址 `http://localhost:43410`。可用 PORT 覆盖端口，无需秘密配置。Ctrl+C 停止本次服务。生产依次执行 `corepack pnpm build` 和 `corepack pnpm start`。请在本地 Linux 文件系统安装、编译与打包。

验证命令为 `corepack pnpm typecheck`、`corepack pnpm lint`、`corepack pnpm test`、`corepack pnpm build`。格式检查：`node .tpl/tools/check.mjs .`。`corepack pnpm bundle` 只打包干净已提交源码，不上传或发布。

修改入口与约束见 customization.json，详细说明见 docs/ARCHITECTURE.md、CUSTOMIZATION.md、VERIFICATION.md 和 LICENSE.md。截图放在 assets；运行图片、字体放在 public/templates/shelfline。共享包通过 `shelfline-template/template` 和 `shelfline-template/host` 导出，HostProvider 只注入消费方品牌、Logo 与页脚节点。

表单只做本地校验，不发送、不保存，不接真实支付或账户，不包含付费数字商品文件。购物车只存在于浏览器内存，刷新清空；sessionStorage 只保存非个人化开场完成标记。示例销量、评价和价格不代表真实业务。参考素材商业权利未确认，listed=false。
