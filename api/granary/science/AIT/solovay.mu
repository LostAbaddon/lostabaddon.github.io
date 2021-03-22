标题：蔡廷常数、Solovay机与哥德尔不完备性（翻译）
关键词：算法信息论 翻译
作者：LostAbaddon
更新：2021/03/22 9:53

原文地址：[Elsevier](https://reader.elsevier.com/reader/sd/pii/S0304397501000688?token=CBC2195AFC679E2FAC793C6F2B622FB79C4BC8BBAF1224E27CCA89478EEE2B7B1E63357A10B5AB33E45149D22CE8E2AD)

[Toc]

# 摘要

计算可枚举（computably enumberable, c.e.）实数可以通过使用蔡廷机获得其停机概率（halting probability）的方式来编码。我们调整了Solovay关于蔡廷通用机的构造方式，使其在（[算术合理][^arithmeticalsound]）[ZFC][^zfc]中无法确定其二进制展开形式的任意一位对应的停机概率，从而我们证明了每一个计算可枚举实数都是一台如此设计的通用蔡廷机的停机概率，且其在ZFC中无法被计算出初始给出的位数以外的任何一位——比如你一开始拿到一个0，那此后你将无法算出任何东西，0将是你获得的全部数据。最终，我们证明了蔡廷信息论下的不完备定理的构造性版本。©2002 Elsevier Science B.V. 保留所有版权。
[arithmeticalsound]: arithmetically sound，即任何可由ZFC证明的算术命题都是（语义）真的。也即ZFC中语法真必然语义真（译者注）。
[zfc]: 带选择公里的ZF集合论。

**关键字：**计算可枚举实数；蔡廷机；随机实数；信息论版不完备定理

# 1，简介

我们只考虑单位区间$(0, 1)$中的实数。实数$\alpha$如果是__计算可枚举__（computably enumberable，简记为c.e.）的，那就表示它是一个可计算的、递增且收敛的有理数列的极限。计算可枚举实数与可计算实数（computable real）是不同的，后者可以通过一个可计算函数给出，而前者只能通过一个无穷过程来逼近，且我们永远无法知道这样得到的值与最终值之间的差距到底有多大。文献<[13]>中给出了一项最近的关于计算可枚举实数的研究。如果一个实数$\alpha$是随机的，当且仅当它的二进制表示是随机的（无穷长）数列（参见<[7]>、<[8]>、<[1]>），而且实际上这种随机性与进制选择无关（参见<[5]>、<[14]>、<[20]>）。计算可枚举随机实数则有很多其它的有趣性质，比如它们是[WTT-完备]{wttcomplete}而非[TT-完备]{ttcomplete}的（参见<[6]>）。相关计算理论可参见<[16]>。

[ttcomplete]: TT-complete，即Truth-Table完备。
[wttcomplete]: WTT-complete，即Weak-Truth-Table完备。

在文献<[7]>（以及<[8]>、<[11]>、<[12]>）中，蔡廷（Chaitin）已经引出了“蔡廷通用机（Chaitin universal machine）”$U$的停机概率$\Omega_U$——这就是蔡廷$\Omega$数。他证明了：

>	{|}**定理1**：对任意蔡廷通用机$U$，$\Omega_U$都是计算可枚举随机实数。

是否还有其它计算可枚举随机实数？答案是否定的，且证明是非构造性的，参见文献<[4]>、<[17]>（完整论文请看<[15]>，以及<[3]>、<[2]>）：

>	{|}**定理2**：计算可枚举随机实数集与蔡廷$\Omega$数集相同。

因此，计算可枚举实数可以由蔡廷通用机的停机概率来编码。这样的编码有多“好”或多“坏”？在文献<[7]>（以及<[8]>、<[11]>）中，蔡廷证明了下述定理：

>	{|}**定理3**：如果ZFC是[算术合理][^arithmeticalsound]的，那对于任意蔡廷通用机$U$，ZFC都只能确定$\Omega_U$的有限位，且可确定ZFC可确定的$\Omega_U$位数上限。

定理3中所指出的“可确定位数上限”是可以显式地给出，但这种显式表达是*无效*的，因为它是不可计算的。比如说，在<[11]>中蔡廷指出，如果选用LISP的一个方言，在其中编写一台通用机$U$和一套理论$T$，那可以证明$U$可以计算出$\Omega_U$的最多$H(T) + 15,328$位。其中$H(T)$是理论T的程序尺寸复杂度（program-size complexity）[^psc]，它是一个*不可计算数*。
[psc]: 怀疑就是算法复杂度或者说K氏长度、不可压缩长度，一个不可计算数。（译者注）

我们下面固定下蔡廷通用机$U$，并在此情况下考虑所有如下形式的命题：

$$
\Omega_U\ 的二进制表示的第n位是\ k\tag{1}
$$

其中$k = 0, 1$且$n \ge 0$。

有多少形如(1)的命题是可以用ZFC证明的？更准确地说，令一集合为所有能用ZFC证明的形如(1)的命题所构成的集合，那该集合中的非负整数n是否有上限？根据定理3，我们可以确定ZFC只能证明有效多条形如(1)的（真）命题。这便是最强形式的蔡廷信息论版哥德尔不完备性命题（参见文献<[11]>、<[12]>）：

>	{|}**定理4**：如果ZFC是算术合理的，$U$是一台蔡廷通用机，那几乎所有形如(1)的真命题在ZFC中都是不可证明的。

再一次，这一上限可以显式地给出，但无法被有效计算。

当然，对任意计算可枚举随机实数$\alpha$，我们可以构造一台蔡廷通用机$U$使$\alpha = \Omega_U$，且ZFC只能给出它的有限位（但我们想要多少位就能算出多少位）。通过调整蔡廷通用机的构造，Solovay在文献<[19]>中直接走到了这个思路的对立面，并取得了定理3的戏剧性改进：

>	{|}**定理5**：我们可以有效构造一台蔡廷通用机$U$，以使得算术合理的ZFC无法确认$\Omega_U$的任何一位数值。

在文献<[19]>中，Solovay通过将ZFC替换为一个可计算的公理化的1-自洽理论，证明了定理5的一个更清晰版本。定理3对任意蔡廷通用机$U$都适用（容易证明，能由ZFC证明的形如(1)的（真）命题所构成的有限集可以任意大），而定理5需要构造一台确定的$U$。

一台[PA系统][^pa]可证明其通用性的的蔡廷机$U$的停机概率$\Omega_U$的二进制表示，在ZFC中无法确认其除了初始第一位之外的任意位，这样的蔡廷机$U$被称为Solovay机[^solovay]。从定理2和定理5来看，我们可以提出如下问题：
[pa]: 即Peano算术系统。
[solovay]: 当然，$U$的形式依赖于ZFC。

$$
Solovay机的停机概率对应的计算可枚举随机数是多少？\tag{2}
$$

关于这一问题(2)，我们所得到的主要结果是：

>	{|}**定理6**：如果ZFC是算术合理的，那每一个计算可枚举随机数都对应一台Solovay机的停机概率。

比如，如果$\alpha \in \left( \frac{3}{4}, \frac{7}{8} \right)$是一个计算可枚举的随机数，那在最糟的情况下，ZFC只能确认它的前两位（11），但无法确认更多了。

>	{|}**结论7**：如果ZFC是算术合理的，那任意计算可枚举随机实数$x \in \left( 0, {1 \over 2} \right)$如果是一台Solovay机的停机概率，那这台Solovay机将无法计算$\alpha$的任意位。而计算可枚举随机实数$x \in \left( {1 \over 2}, 1 \right)$不具备这一性质。

哥德尔不完备定理的证明是构造性的，但定理4的证明是非构造性的。因此，是否可能得到一个定理4的可构造性证明的变形？答案是肯定的，下面就是一个可能的形式：

>	{|}**定理8**：如果ZFC是算术合理的，$U$是一台Solovay机，那形如“$\Omega_U$的二进制表示的第0位是0”的命题是真命题，但无法在ZFC中证明。

事实上，人们可以有效地构造任意多形如(1)的不可证明的真命题，只要(1)中的$U$是Solovay机即可。

本文的剩余部分是这样安排的：[第二章](#chap-3)回顾了我们所要用到的算法信息论基础概念；[第三章](#chap-4)中，我们将给出定理6的证明；[第四章](#chap-5)中我们将专门讨论不完备性。

# 2，基本定义与符号

令$\Sigma = \{ 0, 1 \}$，这样我们可以用$\Sigma^*$来表示所有可能的二进制字符串（包括空字符串$\lambda$）。如果$s$是一个二进制字符串，我们用$|s|$来表示它的长度。我们用$s \frown t$表示字符串s和t的连接。如果$j$是0或1之一，则长度为1的、唯一元素为$j$的字符串被记为$\left< j \right>$。如果$t = s \frown r, r \in \Sigma^*$，则字符串$s$称为字符串t的前缀（prefix），记为$s \subseteq t$。$\Sigma^*$的子集$A$如果满足$\forall s, t \in A\ (s \subseteq t \to s = t)$，则$A$称为*无前缀的（prefix-free）*。

我们下面的讨论将集中在部分可计算字符串函数的一般理论上（比如，定义域与值域都是$\Sigma^*$的某个子集），可参考文献<[1]>。

下面，我们将着重讨论概率论的部分。考虑下面这个问题：在$\left[ 0, 1 \right]$中以勒让德测度随机选择一个实数$x$，则$x$的二进制表示的前缀字符串落在无前缀集$A$中的概率为如下实数：

$$
\Omega_A = \sum_{s \in A} 2^{- |s|}
$$

一台可以用来计算部分字符串函数的*蔡廷机（计算机）*$V$，它的定义域$\mathrm{dom}(V)$是一个无前缀集[^prefixfreeset]。我们记$\Omega_V = \Omega_{\mathrm{dom}(V)}$。另一方面，一台蔡廷机$U$如果可以模拟任意其它蔡廷机，则它被称为*通用的（universal）*。更准确地说，$U$是通用的，如果对任意蔡廷机$V$都存在一个常数$c$（依赖于$U$和$V$的具体形式），对任意$s, t \in \Sigma^*$，若$V(s) = t$，则必然存在$s' \in \Sigma^*$且$|s'| \le |s| + c$，以满足$U(s') = t$。
[prefixfreeset]: 我们这里沿用<[18]>、<[19]>中Solovay所用的术语。

蔡廷通用机是可以被有效构造的（参见<[10]>、<[11]>、<[1]>）。根据定理1，如果$U$是通用的，那$\Omega_U$就是计算可枚举随机实数。作为一个结论，$\Omega_U$必然是一个无理数，且不存在可计算的二进制表示。然而，由于$\Omega_U$是计算可枚举的，因此存在一个可计算的下界。

蔡廷机构成的集合是计算可枚举的。事实上，令$\left( \varphi_n \right)_{n \ge 0}$表示对所有可计算部分字符串函数的哥德尔编码，那么必然存在一个可计算部分字符串函数$\psi$（有两个输入参数：一个非负整数与一个字符串），满足：

-	对任意非负整数n，记$\psi_n(s) = \psi(n, s)$是一台蔡廷机，
-	对任意无前缀定义域的$\varphi_n$，我们有$\psi_n(s) = \varphi_n(s)$，对所有非负整数$n$和字符串$s$都成立。

我们记$D_n$为$\psi_n$的定义域，并记$\Omega_n = \Omega_{D_n}$。$D_n$和$\Omega_n$的时间相关版本可以用通常的方式来定义。令$D_n [t]$是t时刻时$D_n$中所有可以被生成的元素构成的集合，并令$\Omega_n [t] = \Omega_{D_n [t]}$，它是$\Omega_n$在t时刻可计算的近似值。这样就可以直接得出如下两个结论：

1.	对于给定的n和t，我们可以有效计算有限集$D_n [t]$及有理数$\Omega_n [t]$；
2.	序列$\{\Omega_n [t]\}_{t \ge 0}$单调增且收敛于$\Omega_n$。

这表明，每一个$\Omega_n$都是计算可枚举的（事实上，每一个计算可枚举实数都对应某个n的$\Omega_n$，可参见文献<[4]>）。有些$\Omega_n$可能甚至是可计算的，但根据定理1，如果$\psi_n$是通用的，那$\Omega_n$就是计算可枚举随机实数，从而是不可计算的。

>	{|}**命题9**：$U$是一台蔡廷通用机，$\Omega_U = 0. \omega_0 \omega_1 ...$，且$s = s_0 s_1 ... s_m$是一个二进制字符串。因此，我们可以有效构造一台蔡廷通用机W，满足$\Omega_W = 0. s_0 s_1 ... s_m \omega_0 \omega_1 ...$

对任意蔡廷通用机$U$，我们都可以构造两台蔡廷机$V_1$与$V_2$，满足$\Omega_{V_1} = {1 \over 2} \Omega_U$、$\Omega_{V_1} = {1 \over 2} \left( 1 + \Omega_U \right)$，方法为：$V_1(0x) \simeq U(x), V_1(1) = 0$，以及$V_2(0x) \simeq U(x), V_2(1) = 1$。

# 3，回顾Solovay理论

我们选择[PA][^pa]在ZFC中的一个解释模型，它能将PA语言的每一条语句翻译为ZFC语言的一条语句。我们将PA语句在ZFC中的翻译称为ZFC的一条“算术语句”。我们假定ZFC是[算数合理][^arithmeticalsound]的，这就是说，如果一条算术语句是ZFC中的一条定理，那它（在PA的标准[模型][^model]看来）必然是真的[^metatheory]。
[model]: 这里的模型指的是模型论中的模型，即语义。（译者注）
[metatheory]: 这里元理论（metatheory）是ZFC自身，因为这里PA自身显然是算数合理的。

我们用*二阶有理数*来指代能表示为$r / 2^s$的有理数，其中$r$和$s$都是整数且$s \ge 0$。比如，$\Omega_n [t]$就是一个二阶有理数。如果$x$是一个非二阶有理数的实数，那$x$有一个唯一的二进制表示。我们从第0位开始为实数$\alpha$的二进制表示进行编码：$\alpha = 0. \alpha_0 \alpha_1...$。

每一条如下形式的命题都可以轻易地在PA中被形式化：

$$
\Omega_k 的二进制表示的第n位是k\tag{3}
$$

这里$n, l \ge 0$而$k = 0, 1$。更进一步，如果$\psi_l$是蔡廷机，且PA可证明其通用性，ZFC可证明形如(3)的命题，那这个命题一定是*语义真*的。

>	{|}**定理10**：如果ZFC是算术合理的。令$i \ge 0$，并考虑如下计算可枚举随机实数：
$$
\alpha = 0. \alpha_0 \alpha_1... \alpha_{i-1} \alpha_i \alpha_{i+1}..., \qquad \alpha_0 = \alpha_1 = ... = \alpha_{i - 1} = 1, \alpha_i = 0
$$
{|}我们可以有效构造一台蔡廷通用机$U$（依赖于ZFC与$\alpha$），它满足下面三条命题：
1.	PA可以证明$U$的通用性；
2.	ZFC可以确定$\Omega_U$的最多前$i$位；
3.	$\alpha = \Omega_U$

满足定理10中所有三条条件的蔡廷机被称为__Solovay机__。

我们先选择可用PA证明其通用性的蔡廷通用机$V$，且令$\alpha = \Omega_V$。通过定理2与命题9，我们可以有效构造一台蔡廷通用机$\tilde V$，当$i \ge 1$时它满足：

$$
\Omega_{\tilde V} = 0.\underbrace{00...0}_{i 0's} \alpha_{i + 1} \alpha_{i + 2}...
$$

而当$i = 0$时则满足：

$$
\Omega_{\hat V} = 0. \alpha_{1} \alpha_{2}...
$$

接着，我们可以通过如下方式类构造部分字符串函数$W(l, s)$（l是非负整数而s是$\Sigma^*$的字符串）：

1.	将$W(l, \lambda)$设为未定义；
2.	如果$i = 0$，则跳到第6步，否则：
$$
W(l, \left< 1 \right>) = W(l, 10) = ... = W(l, \underbrace{1...1}_{i 1's} 0) = \lambda
$$
3.	如果$s = 00 \frown t$，则：
$$
W(l, s) \simeq \tilde V(t)
$$
至此停止并退出[^step3]。
4.	如果$s = 01 \frown t$，则跳至第5步；
5.	将ZFC中的所有定理以某个确定且不依赖于$t$的顺序列出，搜索其中满足形式(3)的定理。如果没有这样的定理，则$W(l, s)$输出未定义并停机；如果找到了这样的定理，则令$n$、$l$、$k$是定理中用到的参数。
	-	如果$|t| \neq n$，则$W(l, s)$输出未定义并停机；
	-	如果$|t| = n$，则令$r \in [0, 1)$为一个二阶有理数，其二进制表达为$t \frown \left< k \right>$，再令$r' = r + 2^{-(n + 1)}$，接着搜索满足$\Omega_l [m] \in (r, r')$的最小整数$m$。如果搜索不到，或者$s \in D_l [m]$，则$W(l, s)$输出未定义并停机；否则$W(l, s)$输出$\lambda$并停机；
6.	如果$s = \left< 0 \right> \frown t$，则令$W(l, s) \simeq \tilde V (t)$
7.	如果$s = \left< 1 \right> \frown t$，调至第5步。

[step3]: 就和往常一样，两个部分函数$x$和$y$之间的二元关系$x \simeq y$表示：(1)只有$y$有定义时$x$才有定义；(2)如果$x$和$y$都有定义，则$x$和$y$的值相等。

递归定理证明存在$j$使$\varphi_j (s) \simeq W(j, s)$。我们选择一个这样的$j$并设$U = \varphi_j$。我们下面将要证明$U$是满足定理10中三个条件的蔡廷通用机。

首先，我们证明$U$是一台蔡廷机。我们假定$s_1$和$s_2$在$U$的定义域中，且$s_1 \subseteq s_2$。令$k$是$s_1$的第一位字符。

如果$i = 0$。由于$U$对空字符串未定义，所以$|s_1| \ge 1$。由于$s_i = \left< k \right> \frown t_i$，很显然$t_1 \subseteq t_2$。

如果$k = 0$，那$t_1$和$t_2$便位于$V$的定义域中，所以$t_1 = t_2$，故$s_1 = s_2$。

如果$k = 1$且$U(s_1)$和$U(s_2)$都有定义，则整数计算过程中用到的定理参数n是可以在整个计算过程中被确定的，它对$s_1$和$s_2$都是相同的，因为ZFC定理的枚举过程并不依赖于输入参数$t_1$和$t_2$。既然$|t_1| = |t_2| = n$，则$|s_1| = |s_2| = n + 1$，又由于$s_1 \subseteq s_2$，故$s_1 = s_2$。

现在，考虑$i \ge 1$的情况。

如果$k = 1$，那根据上面计算过程的第二步，$s_1$和$s_2$属于无前缀集[^wqz]：
[wqz]: 这里显然有纰漏。因为这里给出的集合，显然第一个元素是后面所有元素的前缀，只有将它去除之后才是无前缀集。不过好在我们讨论的问题中$s_i$不可能正好是$1 / 2$。（译者注）

$$
\{ 1, 10, 110, ... , \underbrace{1...1}_{i 1's} 0 \}
$$

因此显然$s_1 = s_2$。

如果$k = 0$，那又可以分为两个情况考虑。

如果$s_i = 0 0 \frown t_i$，则$t_1$与$t_2$属于$\tilde V$的定义域（第3步的要求），所以$t_1 = t_2$，即$s_1 = s_2$。

如果$s_i = 0 1 \frown t_i$，则主要看第5步，其讨论和$i = 0$相似，我们依然可以得到$s_1 = s_2$。

因此，这就证明了$U$是一台蔡廷机，比如$U = \varphi_j$且$\Omega_U = \Omega_j$。$U$的通用性建立在$W(l, s)$定义的第3步与第6步中$\tilde V$和$\hat V$的通用性。进一步，$U$从$\tilde V$和$\hat V$上不但继承了通用性，也继承了“可被PA证明通用性这一性质”。

现在，假定$i = 0$且ZFC可确定$\Omega_U$中的前若干位。那么，在计算过程中用到的整数n和k就是可以确定下来的。令$r$是分母为$2^{n + 1}$的二阶有理数，且满足：

$$
r < \Omega_U < r + 2^{- (n + 1)}
$$

令$r' = r + 2^{- (n + 1)}$。

由于ZFC是算术合理的，因此命题“$\Omega_U$的二进制表达的第n位是k”就是*语义真*的[^sshl]。因此$r$的二进制表达的前$n + 1$位肯定可以写为$t \frown \left< k \right>$。对于所有足够大的整数$m$，$\Omega_j [m]$必然落在区间$\left( r, r' \right)$内。
[sshl]: 这里因为讨论的前提是在ZFC下可确定$\Omega_U$的前若干位，所以这条命题必然是语法真的。（译者注）

令$s = \left< 1 \right> \frown t$，我们来考虑$U(s)$的计算过程。

在计算过程中，我们一定能找到满足$\Omega_j [m] \in (r, r')$的$m$，且它满足$s \notin D_j [m]$，这是因为如果$s \in D_j [m]$，则$U(s)$应该未定义（第5步第2条），这显然不对。但我们知道$s \in D_j$，因此$D_j$是所有$D_j [m]$与长$n + 1$的字符串的并。

这就给出一个直接结论：$\Omega_U \ge r + 2^{- (n + 1)} = r'$，而这直接与$r$的定义矛盾。

对于$i \ge 1$的情况，通过和上面类似的方法我们也可以证明：ZFC中无法确定$\Omega_U$在初始i位之后的任何数位。

上面的论证过程中，我们须要注意到：$i = 0$时$U \left( \left< 1 \right> \frown t \right)$无定义，而$i \ge 1$时$U \left( 01 \frown t \right)$无定义。我们现在来补完这最后的部分。$i = 0$的，令

$$
\Omega_V = \Omega_{\hat V} = \Omega_U
$$

而$i \ge 1$时令

$$
\Omega_V = \left( 1 - 2^{- i} \right) + {1 \over 4} \Omega_{\tilde V} = \Omega_U
$$

如果我们令定理10中$i = 0$，那我们就得到了结论7。确实，$\left( 0, {1 \over 2} \right)$中的每一个计算可枚举随机实数的第0位当然是0，它可以是Solovay机的停机概率，且ZFC只能确认它的第0位而无法计算任何其它数位；而如果计算可枚举随机实数$\alpha > {1 \over 2}$，那ZFC当然可以确定它的第0位是1了，但它不是任何Solovay机的停机概率。

# 4，不完备性

定理8是结论7的直接推论。确实，我们可以从一台蔡廷通用机$U$出发，有效构造出一台Solovay机$U'$，满足$\Omega_{U'} = {1 \over 2} \Omega_U$，因此$\Omega_{U'} < {1 \over 2}$，它的第0位肯定是0，但**ZFC无法证明这点**！

我们现在可以使用蔡廷的理论（<[9]>）了。

>	{|}**定理11**：给定一台蔡廷通用机$U$，我们可以有效构造一个指数丢番图方程$P(n, x, y_1, y_2, ... , y_m) = 0$，它对于任何固定的自然数$k$，$P(k, x, y_1, y_2, ... , y_m) = 0$有无穷多解，当且仅当$\Omega_U$的第$k$位是1。

我们可以有效构造只有有限个解的指数丢番图方程，但这点在ZFC中无法被证明。

事实上，对任意字符串$s = s_1 s_2 ... s_n$，利用命题9我们可以有效构造一台Solovay机$U$，满足$\Omega_U$以字符串$\left< 0 \right> \frown s$为前缀。也就是说，__下列命题都是语义真但ZFC中无法证明的__：

-	$\Omega_U$的二进制表达的第0位是0；
-	$\Omega_U$的二进制表达的第1位是$s_1$；
-	$\Omega_U$的二进制表达的第2位是$s_2$；
	$\vdots$
-	$\Omega_U$的二进制表达的第n位是$s_n$；

# 鸣谢

略……






CITE-1: C. Calude, Information and Randomness. An Algorithmic Perspective, Springer, Berlin, 1994.
CITE-2: C.S. Calude, A characterization of c.e. random reals, Theoret. Comput. Sci., to appear.
CITE-3: C.S. Calude, G.J. Chaitin, Randomness everywhere, Nature 400 (22) (1999) 319–320.
CITE-4: C.S. Calude, P. Hertling, B. Khoussainov, Y. Wang, Recursively enumerable reals and Chaitin Ω numbers, in: M. Morvan, C. Meinel, D. Krob (Eds.), Proc. 15th Symp. on Theoretical Aspects of Computer Science (Paris), Springer, Berlin, 1998, pp. 596–606; Theoret. Comput. Sci. 255 (2001) 125–149.
CITE-5:  C. Calude, H. Jürgensen, Randomness as an invariant for number representations, in: H. Maurer, J.Karhumäki, G. Rozenberg (Eds.), Results and Trends in Theoretical Computer Science, Springer, Berlin, 1994, pp. 44–66.
CITE-6: C. Calude, A. Nies, Chaitin Ω numbers and strong reducibilities, J. Univ. Comput. Sci. 3 (1997) 1161–1166.
CITE-7: G.J. Chaitin, A theory of program size formally identical to information theory, J. Assoc. Comput.Mach. 22 (1975) 329–340 (Reprinted in: [10], 113–128).
CITE-8: G.J. Chaitin, Algorithmic information theory, IBM J. Res. Develop. 21 (1977) 350–359, 496 (Reprintedin: [10], 44–58).
CITE-9: G.J. Chaitin, Algorithmic Information Theory, Cambridge University Press, Cambridge, 1987 (Thirdprinting 1990).
CITE-10: G.J. Chaitin, Information, Randomness and Incompleteness, Papers on Algorithmic Information Theory, World Scientific, Singapore, 1987 (2nd ed., 1990).
CITE-11: G.J. Chaitin, The Limits of Mathematics, Springer, Singapore, 1997.
CITE-12: G.J. Chaitin, The Unknowable, Springer, Singapore, 1999.
CITE-13: R.G. Downey, G.L. LaForte, Presentations of computably enumerable reals, CDMTCS Research Report135, 2000, 23pp.
CITE-14:  P. Hertling, K. Weihrauch, Randomness spaces, in: K.G. Larsen, S. Skyum, G. Winskel (Eds.), Automata, Languages and Programming, Proc. 25th Int. Colloq. ICALP’98, Springer, Berlin, 1998, pp. 796–807.
CITE-15: A. Kuçera, T.A. Slaman, Randomness and recursive enumerability, SIAM J. Comput. 31 (1) (2001) 199–211.
CITE-16: P. Odifreddi, Classical Recursion Theory, North-Holland, Amsterdam, vol.1, 1989, vol. 2, 1999.
CITE-17: T.A. Slaman, Random Implies Ω-Like, manuscript, 14 December 1998, 2 pp.
CITE-19: R.M. Solovay, A version of Ω for which ZFC cannot predict a single bit, in: C.S. Calude, G. Päun (Eds.), Finite Versus Infinite. Contributions to an Eternal Dilemma, Springer, London, 2000, pp. 323–334.
CITE-20: L. Staiger, The Kolmogorov complexity of real numbers, in: G. Ciobanu, Gh. Päun (Eds.), Proc. Fundamentals of Computation Theory, Lecture Notes in Computer Science 1684, Springer, Berlin, 1999, pp. 536–546.
























