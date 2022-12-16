TITLE: MarkUp 语法演示文档
AUTHOR: LostAbaddon
EMAIL: LostAbaddon@gmail.com
DESCRIPTION: MarkUp 语法演示文档，展示了所有可用的 MarkUp 语法
KEYWORD: MarkUp
PUBLISH: 2021/04/09 11:18
UPDATE: 2022/12/13 23:36
SHOWTITLE: on
SHOWAUTHOR： on
GLOSSARY: on
RESOURCES: on

Mark it Up, not Down.

VERSION: 1.1.2{>}

---

[toc]

---

# 块定义

下面的内容，你应该是看不见的：

[:test1:]这是单独一段文字的块定义。[:test1:]
[:test2:]
-	这是定义的一个列表块
-	块定义的作用很大
	+	你可以在表格中使用块引用来增强表格的内容
	+	或者需要重复引用的文字，也开始使用块引用来实现
[:test2:]

[footnote]：这条是脚注
[endnote]：这条是尾注

下面的内容是正常：

块定义的内容本身不可见，但可以在文档的其它地方使用。

块定义分为两种，我们在后面会逐一介绍。

# 常见语法

MarkUp 的常见语法与 MarkDown 几乎一样，包括：

-	**粗体**：\*\*粗体\*\*，默认样式中，粗体使用黑体字体并加粗
-	*斜体*：\*斜体\*，默认样式中，斜体采用楷体字体且不启用默认斜体
-	_下标_（正常）：\_下标\_
-	^上标^（正常）：\^上标\^
-	__下划线__：\_\_下划线\_\_
-	~波浪线~：\~波浪线\~
-	~~删除线~~：\~\~删除线\~\~
-	^^大一号^^（正常）：\^\^大一号\^\^
-	^^^大二号^^^（正常）：\^\^\^大二号\^\^\^
-	^^^^大三号^^^^（正常）：\^\^\^\^大三号\^\^\^\^
-	^^^^^大四号^^^^^（正常）：\^\^\^\^\^大四号\^\^\^\^\^
-	`代码变量`：\`代码变量\`
-	$LaTeX 变量$：由 MathJax 2.5 处理

## 颜色与图标

MarkUp 相对 MarkDown 增加了一些更丰富的针对字词的样式语法，比如颜色：

-	这是[red]红色的字[/]
-	这是[green]绿色的字[/]
-	这是[blue]蓝色的字[/]
-	这是[yellow]黄色的字[/]
1.	这是[gold]金色的字[/]
2.	这是[white]白色的字[/]
-	这是[silver]银色的字[/]
-	这是[gray]灰色的字[/]
-	这是[dark]深色的字[/]
-	这是[black]黑色的字[/]

所有颜色都可以通过指定 CSS 文件来自定义，这里采用的是默认 CSS。

颜色的语法为：\[颜色码\]文字\[\/\]。

除了颜色，我们还可以直接插入 [FontAwesome 图标](https://fontawesome.com)[:fa]：:smile:、:smile-wink:、:poo:、:grin-squint:、:teeth:、:kiss-beam:。

[fa]: 默认使用的是 [FontAwesome](https://fontawesome.com) 5.7.1 免费版。

## 脚注、尾注、术语、锚点

### 脚注与尾注

MarkUp 中也支持脚注[:footnote]和尾注[^endnote]。

脚注的写法为：\[划词\]\[\:脚注名\]，尾注的写法为：\[划词\]\[\^脚注名\]。而脚注、尾注以及后面提到的术语的定义方式都是相同的，独立一行中定格写：\[名称\]：内容。这里冒号可以是中文也可以是英文（脚注定义中的冒号必须是英文）。

脚注会出现在每一章节（由一级标题划分）的末尾，而尾注则出现在全文末尾。

同时，正文中脚注的形式为上标的方括号加数字，数字每一章节都会清空从1重新技术，而尾注是上标的圆括号加数字，全文连续计数。

脚注和尾注都可以[划词][:test3]或不划词[:test4]，划词后，鼠标移到被划定的词上会高亮显示，且点击后可以跳转到脚注与尾注上；不划词时则只能通过点击上标来跳转。

[test3]:这是划词脚注
[test4]：这是不划词脚注
[term]: 术语是特定词汇的解释，语义作用比脚注尾注更强。

### 术语与锚点

[术语]{term}和尾注很像，但不同，主要体现在它会独立出现在术语表中，而尾注出现在尾注部分。另外，术语的语义性更强，在显示上术语也会粗体强调显示。

术语和锚点的写法为：\[术语词\]\{名称\}

同样的写法也可以用于定义锚点，[锚点]{anchor}的作用是可以用作文内跳转，而被超链接使用。

术语只要定义过，就可以在任意地方使用：\{名称\}。比如：

> 所谓的[超文本]{hypertext}是一种现在很常见的格式，但{hypertext}在以前很罕见。
[hypertext]: 一个术语。

## 超链接

超链接的写法有两种：

1.	\[连接名\]\(地址\)
2.	\[连接名\]\[引用名\]

超链接分为两种，一种是外部连接，比如[这个](https://jianshu.com)（\[这个\]\(https://jianshu.com\)），另一个是内部连接，比如[这个](@anchor)（\[这个\]\(@anchor\)）。外部连接会打开新页面，而内部连接则只是在页面内跳转。

# 段落级的语法

上面介绍的针对字词的 MarkUp 语法，下面介绍针对段落的 MarkUp 语法。

与常见的 Github-Favorited MarkDown（[GMD]{GMD}） 语法一样，我们采用换行为不分段的软换行，多余一个连续换行为分段的硬换行，比如下面这两段：

[GMD]: 这是由 GitHub “魔改”的一个 MarkDown “方言”，当然，魔改程度比 MarkUp 小了很多。

> 这段，
是
软换行


> 这段，

> 是

> 硬换行


软换行的段落级样式不会重制，但硬换行会。

## 段落样式

{|}MarkDown 的段落样式比较单调，在 MarkUp 中我们增加了一些，比如缩进与对齐。
当然，如果是软换行就没法自定义缩进等段落样式了。

:上面这段就是居中的，而这段则用了一次缩进，我们当然也可以用多次缩进，比如下面这段：

::看到没？

对齐有三种：

1.	\{<\}：左对齐
2.	\{\|\}：居中
3.	\{>\}：右对齐
4.	举例：
	-	{<}左对齐
	-	{|}居中
	-	{>}右对齐

这三个对齐标记可写在每一段（**__记住，软换行^^^不分段^^^！__**）的开头或结尾。

而缩进，是首行缩进，并非左间隔（padding-left），语法为在段首输入\:，数量越多缩进量自然也就越大。

当然，软换行还有另一个语法，可以在某些不便于换行的地方使用，那就是“\/\/”[^softbreak]。比如在表格或图片标题里就不方便直接换行。

[softbreak]: 放心，软换行不会和 URL 地址冲突的。

## 引用

我们对引用作了一定的增强。

MarkDown 中触发引用的语法我们自然也继承了：

1.	\> 开头的文本
2.	多于 3 个空格开头的文本

引用当然可以多级嵌套，但我们在这些的基础上，增加了引用的样式：

> 比如，下面这样是不同引用块：
\> 这样


> [info] 但下面这个就是“信息”引用块了：
\> \[info\] 这样


> [success] 这样是“成功”型引用
\> \[success\] 成功


> [warning] 这样是“警告”型引用
\> \[warning\] 警告


> [danger] 这样是“危险”型引用
\> \[danger\] 危险


而且，考虑到有的时候希望引用块可以合并，有的时候并不希望，所以我们用两个换行表示继续在同一个引用块中，而超过两个换行才表示两个引用块分隔开，比如下面这样：

> 第一个引用块

> 中间一个空行，然后第二个引用提示符，此时实在同一个引用块中，只不过是不同段。

作为比较：

> 这是第一个引用块


> 中间空两个空行，此时这两个引用块就彼此独立了。

这样的方法，在多级引用的时候会很方便，比如下面这样：


> 引用1

>> [info] 引用2

> 还是引用1

以及比较：

> 引用1

>> [info] 引用2
还是引用2

调整引用层级时，不需要繁琐地输入引用前缀，只要换行就好了。

## 列表

列表的语法和 MarkDown 基本一样，但启动字符更多：

- \- 触发
+ \+ 触发
* \* 触发
~ \~ 触发
> \> 触发
注意：使用\>触发列表时，它不能是当列第一个，否则触发的是引用。
- 
	> 我们当然也可以在列表中使用引用，此时会自动将空白行去掉，所以引用触发符的写法可以是\-和\>同行，也可以分行。
	- 在这里可以继续定义列表
		1. 是不是很有趣？


要终止列表，只需要连续两个换行就可以了，不用三个。

## 公式块与代码块

### 公式块

这部分的语法与 MarkDown 一样，我们同样采用 [MathJax][:mj] 做公式转义。

[mj]: 这里采用的是 [MathJax 2.5](https://www.mathjax.org/mathjax-v2-5-now-available/)。

比如下面的公式：

$$
R_{\mu\nu} - \frac{1}{2} R g_{\mu\nu} = G T_{\mu\nu}
$$

也可以是行内公式，比如： $E = m c^2$。

### 代码块

此外，代码块也和 MarkDown 语法一样，在行内用 \` 来做前后缀，或者段落级的用 \`\`\` 或者 \~\~\~ 来做前后缀，在启动前缀后可以跟语言名，目前只支持`text`、`plaintext` 和 `javascript`，比如下面这样：

~~~ text
``` javascript
const demoStr1 = "var function = () => '123';";
const demoStr2 = 'var function = () => "123";';
const demoStr3 = "var function = () => \"123\";";
const demoStr4 = 'var function = () => \'123\';';
const demoStr5 = `var function hello = () => {
	return "All these are not function... Just test if while for return else new delete..."
}`;

const tester = function (num) {
	var result = Math.sqrt(Math.abs(1 - num * num));
	if (result > 1) return 1 - 1 / result;
	else return result;
};
(async () => {
	await console.log(tester(123));
}) ();

let demoStr6 = "This 'is' a 'test'!";
```
~~~

解析后的结果为：

``` javascript
const demoStr1 = "var function = () => '123';";
const demoStr2 = 'var function = () => "123";';
const demoStr3 = "var function = () => \"123\";";
const demoStr4 = 'var function = () => \'123\';';
const demoStr5 = `var function hello = () => {
	return "All these are not function... Just test if while for return else new delete..."
}`;

const tester = function (num) {
	var result = Math.sqrt(Math.abs(1 - num * num));
	if (result > 1) return 1 - 1 / result;
	else return result;
};
(async () => {
	await console.log(tester(123));
}) ();

let demoStr6 = "This 'is' a 'test'!";
```

## 表格

表格的写法也和传统的 MarkDown 一样，不过现在我们支持无表头表格：

|内容1|内容2
内容3|内容4|

而传统必须要有表头：

|标题1|标题2|
|-|
|内容1|内容2|
|内容3|内容4|

### 表格进阶

MarkUp 的表格在 MarkDown 传统表格的基础上，还增加了一些新功能：

1.	排序（需要页面端支持，可点[这里](https://lostabaddon.github.io/#/markup)查看效果）
2.	简单公式（不受排序影响）
3.	图示功能（SVG）

在MarkUp中，我们可以将一些列隐藏起来，比如：

|栏1{s}|栏2|栏3{h}|栏4{s}|
|-|
|1|2|3|4|
|2|4|6|8|
|3|6|9|2|
|4|8|6|2|

甚至可以将一张表整个隐藏起来（用于绘图，但不显示原始数据）:

|> HiddenTable{h} <|
|栏1|栏2|栏3|栏4|
|-|
|1|2|3|4|
|2|4|6|8|
|3|6|9|2|
|4|8|6|2|

（你应该看不到上面的表格哦，但你应该能看到下面这张图）

CHART(HiddenTable):pie:饼状图:A-B,C,D

我们也可以在MarkUp的表格里做公式计算，甚至绘制图表：

|> Equation <|
|x{s}|y{s}|x + y{s}|x y{s}|max{s}|x1 + y0|x1 + y2|test|
|:-:|:-|-:|
|1|9|CAL=(A1+B1)/2|CAL=A1*B1|CAL1=Max(A1,B1)|CAL5=(A1+B0)-C2|CAL3=A1+B2|0|
|3|6||||||0|
|5|3||||||0|
|7|0||||||0|
|14|15||||||100|
|15|13||||||10|
|16|11||||||-1|

CHART(Equation):points:点状图:A-C,D,E,F,G

CHART(Equation):lines:连线图:3-1,2,4,5

CHART(Equation):area:连线覆盖图

CHART(Equation):pie:饼状图:A-C,E,G

CHART(Equation):pie:饼状图:A-C,E,B,H

CHART(Equation):pie:饼状图:reverse

CHART(Equation):column:柱状图:A-C,D,E,F,G

CHART(Equation):area:非从零开始覆盖图:A-F:false

CHART(Equation):area:从零开始覆盖图:A-F:yes

CHART(Equation):column:非从零开始柱状图:A-F:false

CHART(Equation):column:从零开始柱状图:A-F:yes

这个功能就很神奇了吧！

目前支持的函数包括：
-	四则混合运算，阶乘，幂次
-	max，min，绝对值
-	三角函数、反三角函数、双曲函数、反双曲函数
-	指数与对数函数
-	排列（permutate）、组合（combine）
-	四舍五入（round）、向下取整（floor）、向上取整（ceil）

目前支持的图示包括：
-	points: 点状图
-	lines：连线图
-	area：连线覆盖图
-	pie：饼状图
-	column：柱状图

图示格式：`CHART(table_name)\:chart_type\:chart_title\:主行（列）-线1,线2...`

更加神奇的是动画效果哦~~~MarkUp的官网版预置了动态横条图的效果（需要页面提供JS支持），你可以在[该页面](http://localhost:8080/#/markup)看到：

|> BarsHistory{h} <|
|代际	|柯南|高达|EVA|全金属狂潮|钢炼|天元突破|还有谁|Doctor|Master|HelloKitty|哆啦A梦|纳尼|沃特|星爷|达叔|哈哈哈|
|1		|97  |50 |31 |43        |75 |0      |-1    |
|2		|103 |61 |83 |32        |51 |0
|3		|205 |98 |107|50        |112|10     |3     |4     |13    |1         |153
|4		|201 |263|259|107       |106|201    |97    |22    |33    |75        |231
|7      |200 |301|275|202       |291|150    |37    |138   |137   |43        |311   |103 |201 |432|213 |250
|8      |193 |507|657|301       |299|       |      |201   |10    |300       |403   |600 |23  |501|499
|9      |100 |703|687|200       |356|1000   |      |      |      |456       |514   |    |369 |410|520
|10     |    |513|321|          |   |       |      |236   |      |123       |421   |100 |    |400|234

ANIMATE(BarsHistory):barsanime:历史动态图:all:5,800,2000

ANIMATE(BarsHistory):barsanime:历史动态图:all:8,1000

目前支持的动画图示包括：
-	barsanime：动态横条图

动画图示格式：`ANIMATE(table_name)\:chart_type\:chart_title\:主行（列）-线1,线2...`

# 特殊道具：图片与视频

MarkUp 在图片等资源的处理上，和 MarkDown 有较大的不同。

首先，我们支持插入图片、视频与音频三种资源，语法分别为：

-	\!\[图片标题\]\(地址 "left|right"\)
-	\@\[视频标题\]\(地址 "left|right"\)
-	\#\[音频标题\]\(地址 "left|right"\)

发现没？和传统 MarkDown 语法相比，我们将实用性不大的第三参数修改了，改成了 left 与 right 两个直的一个“开关”。

如果这第三参数不输，那图片等资源将独立一行，出现在当前内容的下方，比如这样：

---

这是图片前的文字 ![我是图片][pic] 我是图片后的文字

---

可以看到，图片前后的文字（包括空格）都被保留了下来，但图片独立放到了这段文字的下方，且最长宽度为容器宽度。

但如果第三参数设置了 left 或 right，情况就不同了，比如下面这样（我们设置为 left）：

---

我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~![我是图片](https://upload-images.jianshu.io/upload_images/19321-e5e574ddb183cacf.jpg "left")

----

看到没？图文混合在了一起，而且图片在这段文字的左侧，最大宽度为容器宽度的 40%。

如果设置 right 也是一样的：

---

我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~我是示例文字，大家不用管我，啦啦啦\~\~\~\~\~![我是图片](https://upload-images.jianshu.io/upload_images/19321-e5e574ddb183cacf.jpg "right")

----

这是MarkUp 中图片、视频与音频的一个“特殊技”，是不是很有趣？

MarkUp 中图片还有另一个特殊技（视频与音频没有），那就是图片墙：

![第 1 张图片][pic]
![第 2 张图片](https://lostabaddon.github.io/image/19321-1b14c166fc5085d3.png)
![第 3 张图片](https://lostabaddon.github.io/image/19321-4a42ff74ab875e4e.png)
![第 4 张图片](https://lostabaddon.github.io/image/19321-8ed744ecbfa2c36c.png)

可以看到，图片被成组放置，在默认情况下是可以横向滚动的图片组，大家可以自己写 JS 与 CSS 插件来控制图片墙如何显示。

连续多张图片只要不使用多于一个换行来分隔，就能自动形成图片墙，而用两个换行可以结束图片墙的定义。

[pic]: https://upload-images.jianshu.io/upload_images/19321-e5e574ddb183cacf.jpg

# 章节、间断与标题

在很多基于 MarkDown 的平台上，一级标题“\# Header 1”都被当作文档的标题使用，但这从语义上来说并不恰当。

在 MarkUp 中，一级标题用于定义章节，二级、三级标题则都是同一章节中的不同组成部分。

有了章节的定义后，脚注就会出现在每一章节的末尾，而尾注就是文档级的了。

> [info] 注意：脚注会自动在上方生成一段分割线，且样式不同于正常的分割线。

> ::而相邻两个章节之间会有一段大空格作为区分。

和 MarkDown 语法一样，一级标题与二级标题的定义方式有两种：

1.	\# 一级标题，\#\# 二级标题
2. >
一级标题 二级标题
====== -----------


而三级及以上的标题，在传统 MarkDown 中只能通过前置更多 \# 来实现，但在 MarkUp 中则不同（下划线符要超过 3 个）：

下划\+触发三级标题
+++

下划\_触发三级标题
___

下划\*触发四级标题
***

下划\#触发五级标题
###

下划\.触发六级标题
...

且 MarkUp 和一些 MarkDown 方言一样，对于标题行最后的 \# 字符会自动无视。

章节可以通过一级标题来定义，那文章的标题呢？

我们采用和 ORG 中的一些语法一样，使用 meta 数据定义，如下：

> TITLE: 文章标题

我们也支持用分割线来区分文章的不同部分，但分割线的触发符不同，产生的效果也是不同的，比如（默认 CSS 下）：

## 各种分割线

普通分割线（-）：

---

双层分割线（=）：

===

点线（.）：

...

点划线（\_）：

___

渐变线（+）

+++

变态线……（\~，这个至少须要4个而不是3个哦）：

~~~~

啥（\*）：

***

# 块引用

块引用是 MarkUp 的最大特色，它允许大家定义任意长一段内容，放置到一个“宏”中，并在任何地方使用它。

比如，我们在本文最开头定义的块内容为：

\[\:test1\:\]这是单独一段文字的块定义。\[\:test1\:\]
\[\:test2\:\]
\-	这是定义的一个列表块
\-	块定义的作用很大
\	\+	你可以在表格中使用块引用来增强表格的内容
\	\+	或者需要重复引用的文字，也开始使用块引用来实现
\[\:test2\:\]

而使用的地方（可以是[red]任意[/]地方）只需要写\[test1\]即可，比如下面这样：

原文（没有“test1”前后的空格）：

> [info] 大家好[ test1 ]我是引用块。

效果：

> [info] 大家好[test1]我是引用块。

同样的，对于test2 块也是如此：

原文（注意“test2”前后没有空格）：

> [info]
\|表格中\|也能用\|
\|比如这样\|\[ test2 \]\|


效果：

|表格中|也能用|
|比如这样|[test2]|

这个功能非常有趣，我们目前支持 10 层签到引用，未来会进一步改善增强。

# 文档元数据与控制开关

MarkUp 结合了 ORG 文档的元数据结构，这些元数据平时用户是看不到的，但可以通过 \[ \] 字段的形式来引用。元数据字段名大小写都可以，可以在文档任何位置定义，定义方式就是字段名后跟英文冒号（或者字段对应中文名后跟中文冒号）。

目前提供的元数据包括：

-	作者名：\[author\]（[author]）
-	作者邮箱：\[email\]（[email]）
	邮箱可以直接当作地址来用，比如这样：\[发邮件给作者\]\[email\]（[发邮件给作者][email]）
-	本文标题：\[title\]（[title]）
-	简介：\[description\]（[description]）
-	关键字：\[keyword\]（[keyword]）
-	发布日期：\[publish\]（[publish]） 或者：\[publish\]\{YY年DD日MM月\}（[publish]{YY年DD日MM月}）
-	更新日期：\[update\]（[update]） 或者：\[update\]\{YYYY-D-M h\:m\:s\}（[update]{YYYY-D-M h\:m\:s}）

如上所示，如果文档中没有定义该元数据，则会直接显示为“%xxx%”。

除了元数据，也支持文档自动数据，比如：

-	目录：\[TOC\]\{标题\}\{显示层级\}（两个参数开关可任选）
-	术语列表：\[GLOSSARY\]
-	资源列表：\[RESOURCES\]
	-	图片资源列表：\[IMAGES\]
	-	视频资源列表：\[VIDEOS\]
	-	音频资源列表：\[AUDIOS\]

这些元素可以在文档任何地方输入来引用。

此外，还可以定义一些开关，来控制最后生成的文档，这些字段包括：

-	SHOWTITLE：在文档顶显示标题
-	SHOWAUTHOR：在标题下显示作者（必须开启 SHOWTITLE）
-	GLOSSARY：在正文下自动显示术语表（会在目录中显示“术语表”索引）
-	RESOURCES：在正文下自动显示资源表（会在目录中显示“资源表”索引）
-	STYLE：引用指定 CSS 文件列表（用空格、中英文逗号分隔）
-	SCRIPT：引用指定 JS 文件列表（用空格、中英文逗号分开）


> [danger] {|}当然，还有一个没什么用的隐藏元数据，这里就不写明了，嘿嘿嘿~~~


+++

{|}完整演示效果可以[点击这里](https://lostabaddon.github.io/#/markup)查看。

---

# 未来计划

未来 MarkUp 会在以下这些方面作强化：

1.	Form 表单元素，提供交互的可能
2.	分页功能：一份文档，多页显示
3.	跨文件引用（需站点配合）
4.	编辑器更友好，提供更多功能
5.	PPT 模式
6.	MindMap 模式
7.	流程图模式