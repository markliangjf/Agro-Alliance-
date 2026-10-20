# 网站版本与部署记录

所有时间均为 **新加坡时间（SGT，UTC+8）**。源码提交与上线部署分别记录；保存一个备份不代表已经上线。

## 本次发布：Agro Alliance 品牌更新

- 发布记录准备时间：**2026-10-20 14:41:43 SGT**。实际提交时间以本文件所在 GitHub commit 的时间为准。
- 用户已明确授权部署。
- 发布内容：突出 Agro Alliance；Yaoda 保留为生产背景；首页通用询盘入口为 **Send an Enquiry**；修复产品中文名、面积单位及标点乱码；保留尿素重点、多地供货、图片、视频和地图。
- 发布准备：更新 CSS 地址的版本参数，确保回访用户获取新版样式；补齐历史版本及部署记录；将每次记录改动与 SGT 时间写入后续工作规则。
- 基础备份：[f9325db](https://github.com/markliangjf/Agro-Alliance-/tree/f9325db8da68a52243684c7829f3722c8c6e2fa7)。
- 本次提交、实际时间：[versions 历史](https://github.com/markliangjf/Agro-Alliance-/commits/versions/)。
- 发布结果、实际完成时间：[GitHub Actions](https://github.com/markliangjf/Agro-Alliance-/actions)。以对应提交的成功记录为准。
- 验证范围：已做源码、素材完整性检查；桌面和手机浏览器视觉检查此前因浏览器连接不可用而未完成。

## 之前的每次源码备份

时间采用各提交的 GitHub committer 时间。保留原始提交，不重写旧版本说明；下表补充中文摘要。每个版本链接可查看当时的完整源码和素材。

| 提交时间（SGT） | 版本 / 完整源码 | 改动内容 | 已核实部署情况 |
|---|---|---|---|
| 2026-10-20 00:43:36 | [f9325db](https://github.com/markliangjf/Agro-Alliance-/tree/f9325db8da68a52243684c7829f3722c8c6e2fa7) | 突出 Agro Alliance 品牌；Yaoda 调整为生产背景；首页使用 Send an Enquiry；修复中文及符号乱码；保存完整素材和预览生成脚本；建立 versions 分支备份流程。 | 源码备份 |
| 2026-10-19 20:30:43 | [8ccc614](https://github.com/markliangjf/Agro-Alliance-/tree/8ccc614aa0fb14e0402d43ed2b4223f5005251b6) | 首页询盘入口改为适用于所有产品，使用 Discuss your requirements。 | [部署成功](https://github.com/markliangjf/Agro-Alliance-/actions/runs/39252630025) |
| 2026-10-17 22:20:13 | [483247a](https://github.com/markliangjf/Agro-Alliance-/tree/483247aa8067922cd70846baca32ab59f5056c89) | 发布获批的新版设计；提高尿素展示权重；说明多地货源；加入可见的静态地图及地点优势。 | [部署成功](https://github.com/markliangjf/Agro-Alliance-/actions/runs/39040329271) |
| 2026-08-19 13:19:58 | [8e415e0](https://github.com/markliangjf/Agro-Alliance-/tree/8e415e0e62b26f3896542eee7cdfeba1d55c88f5) | 删除图库最后一张照片。 | [部署成功](https://github.com/markliangjf/Agro-Alliance-/actions/runs/32219082941) |
| 2026-06-06 18:34:34 | [d946ef4](https://github.com/markliangjf/Agro-Alliance-/tree/d946ef4675adbff525f517dcd56f0ef0c15b9a9a) | 新增 CNAME，将 GitHub Pages 关联至 agro-alliance.sg。 | [部署成功](https://github.com/markliangjf/Agro-Alliance-/actions/runs/27290844038) |
| 2026-06-06 18:23:34 | [02b09bc](https://github.com/markliangjf/Agro-Alliance-/tree/02b09bc3d0ea5ff4d5091f087ac85961766a870d) | 新增仓库装载视频 warehouse-loading-video.mov。 | 源码备份 |
| 2026-06-06 18:17:55 | [000daef](https://github.com/markliangjf/Agro-Alliance-/tree/000daefef1167787b6d1da8bf6677004fe56f624) | 新增 8 张工厂、仓库、包装及产品实拍图片。 | 源码备份 |
| 2026-06-06 18:14:05 | [55e45b1](https://github.com/markliangjf/Agro-Alliance-/tree/55e45b1849b06992e4c7084d09552da61318ec9d) | 移除未使用的尿素颗粒图片 urea-granular-realistic.jpg。 | 源码备份 |
| 2026-06-06 18:13:56 | [a0b25c5](https://github.com/markliangjf/Agro-Alliance-/tree/a0b25c5aa32ddf8fce81100ab61d6e385d3e0618) | 移除未使用的颗粒硫酸铵图片 ammonium-sulphate-granular-realistic.jpg。 | 源码备份 |
| 2026-06-06 18:13:48 | [087aa0b](https://github.com/markliangjf/Agro-Alliance-/tree/087aa0b6702c62335c5bfb04a04651b9d8f50847) | 移除未使用的结晶硫酸铵图片 ammonium-sulphate-crystal-realistic.jpg。 | 源码备份 |
| 2026-06-06 18:13:36 | [b2e5385](https://github.com/markliangjf/Agro-Alliance-/tree/b2e538567ee5b763d350da32d2e0aeb5c4c089e1) | 移除未使用的颗粒氯化铵图片 ammonium-chloride-granular-realistic.jpg。 | 源码备份 |
| 2026-06-06 18:13:24 | [9343f9d](https://github.com/markliangjf/Agro-Alliance-/tree/9343f9d188ad8ccaeece4036a307a398352f5be3) | 移除未使用的结晶氯化铵图片 ammonium-chloride-crystal-realistic.jpg。 | 源码备份 |
| 2026-06-06 18:05:37 | [546027b](https://github.com/markliangjf/Agro-Alliance-/tree/546027b49d7483fae45596d2fc535646d1873cc3) | 新增 9 张氯化铵、硫酸铵和尿素产品图片。 | 源码备份 |
| 2026-06-06 18:03:20 | [803399c](https://github.com/markliangjf/Agro-Alliance-/tree/803399c9784813322625434cf986316d2e9bc9f0) | 新增网站首页 index.html，更新 README。 | 源码备份 |
| 2026-05-16 23:31:56 | [557df31](https://github.com/markliangjf/Agro-Alliance-/tree/557df313401480cb072d1b07a8a58aa91ea3fc53) | 初始化仓库，新增 README。 | 源码备份 |

## 已核实的历史部署

下表结束时间采用工作流 updated_at；精确任务时间可点开记录。源码提交时间与部署时间可能不同。

| 源码版本 | 部署开始（SGT） | 工作流最后更新（SGT） | 结果与记录 |
|---|---|---|---|
| 8ccc614 | 2026-10-19 20:30:45 | 2026-10-19 20:31:47 | [成功](https://github.com/markliangjf/Agro-Alliance-/actions/runs/39252630025) |
| 483247a | 2026-10-17 22:20:31 | 2026-10-17 22:21:39 | [成功](https://github.com/markliangjf/Agro-Alliance-/actions/runs/39040329271) |
| 8e415e0 | 2026-08-19 13:20:55 | 2026-08-19 13:21:33 | [成功](https://github.com/markliangjf/Agro-Alliance-/actions/runs/32219082941) |
| d946ef4 | 2026-06-11 00:37:07 | 2026-06-11 00:38:04 | [成功](https://github.com/markliangjf/Agro-Alliance-/actions/runs/27290844038) |

## 以后每次更新的记录规则

1. 完成修改后，新增一条版本说明，写明 SGT 时间、改动内容及验证情况。
2. 先追加提交到 versions，保留全部历史，并向用户提供具体提交和历史链接。
3. 用户批准上线后，将对应版本发布到 main，检查 GitHub Pages 的部署结果。
4. 本地只留最新源码与最新预览；旧版从 GitHub 恢复。清理旧副本前先确认远端备份成功。
5. 如需回退，使用旧源码生成新提交，不强制覆盖或删除历史。

## 查找和下载

- [最新备份](https://github.com/markliangjf/Agro-Alliance-/tree/versions)
- [所有备份提交](https://github.com/markliangjf/Agro-Alliance-/commits/versions/)
- [上线源码历史](https://github.com/markliangjf/Agro-Alliance-/commits/main/)
- [部署记录](https://github.com/markliangjf/Agro-Alliance-/actions)

打开某个版本链接后，使用 **Code → Download ZIP** 下载完整版本；解压后打开 index.html。
