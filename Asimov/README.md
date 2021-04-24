# Asimov

-	Author: [LostAbaddon](lostabaddon@gmail.com)
-	Version: 1.1.1

自制 MarkDown 解析器，支持更优化的 MarkUp 语法。

详情请看 demo.mu 。

## 安装方式

```
npm install https://github.com/LostAbaddon/Asimov.git --save
```

## 配置参数

-	overwrite
	为 true 时 title、author、email、date 这四个属性可以别 config 参数覆盖，否则沿用文档中设置的属性值。
-	title
	文档标题
-	author
	文档作者
-	email
	文档作者的联系邮箱
-	date
	文档更新时间
-	keyword
	文档关键词
-	classname
	整个文档的 class 样式名
-	toc
	是否自动生成文首目录
-	glossary
	是否自动生成文尾词汇表
-	links
	是否自动生成文尾外链表
-	refs
	是否自动生成文尾术语表
-	resources
	是否自动生成文尾资源表（用到的图片等资源）
-	showtitle
	是否生成标题区
-	showauthor
	是否生成作者区