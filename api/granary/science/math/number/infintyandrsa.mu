标题：从无穷求和到RSA加密
更新：2018.09.23 04:00:59

> 由于一个理论模型过于头疼，所以打算写点东西放松一下。
正好也已经很久不写东西了，最近数学界又有两件大事，所以打算写点东西。

---

对于黎曼Zeta函数，最早接触是在调和函数中：

$$
\sum_{i=1}^\infty \frac{1}{i}
$$

这个级数当然是发散的，不过它很有趣，因为有一个常数就和这个调和级数相关：

$$
\gamma = \lim_{n \rightarrow \infty} \sum_{i=1}^n \frac{1}{i^s} - \ln(n)
$$

调和级数当然可以进一步拓展，比如p-级数：

$$
Z_p = \sum_{i=1}^\infty \frac{1}{i^p}
$$

显然，这个无穷级数求和的收敛半径是 $\Re(p) > 1$ ，这个级数就是收敛的，而如果 $\Re(p) \le 1$ ，那么级数就是发散的。

比如如果p=1，那么就是调和级数，它是发散的；如果p=0，那么就是无穷个1相加，也是发散的；如果p=2，那么结果是有限的，为 $\frac{\pi^2}{6}$。p在小于0的时候是一些有趣的无穷级数求和，比如p=-1时是所有自然数之和，p=-2时是所有自然数的平方和，等等。显然所有这些无穷级数的和都是发散的，这点毫无疑问。

但，数学上有个东西叫做“解析延拓”，它的作用就是，如果某个函数的定义域是 A，那么我们可以通过解析延拓，将其推广到包含A的更大的范围B中，如果能延拓的话。

比如说，大家都熟悉下面这个几何级数：

$$
1 + x + x^2 + x^3 + ... = \sum_{i=0}^\infty x^i = \frac{1}{1-x}\ \ \ \ \ \ \ \ \ \ \ \ (|x| < 1)
$$

最左侧的几何级数，其收敛半径是1。而且当 $x=1$ 时，级数发散；当 $x=-1$ 时，级数在0和1上振荡，没有普通定义下的求和值，但有Abel求和定义下的求和值：$\frac{1}{2}$。而如果 $x>1$ 或 $x<-1$，那么这个级数求和显然是发散的（但存在拉马努金和）。

可最右侧的函数，只要 $x \neq 1$ 就有定义，从而定义域比级数求和的定义域要大得多，是级数求和的解析延拓的结果。很显然，后者在 $|x| > 1$ 的区域所得到的值，并不是前者的求和值，前者的求和值依然是无穷，所以上面第二个等号虽然写是这么写，但实际上并不是真的相等。

显然并不是所有函数都可以被延拓，但上面的p-级数求和，恰恰就是可以延拓的那种。

p-级数可以写成积分的形式：

$$
Z(s) = \sum_{i=1}^\infty \frac{1}{i^s} = \frac{1}{\Gamma(s)} \int_0^\infty \frac{x^{s-1}}{e^x - 1} dx = \zeta(s)
$$

这里用到了 $\Gamma$ 函数的性质，很容易就能推得。这个函数的定义域也是 $\Re(s) > 1$，但和无穷级数求和不同，现在它已经变成了定义域内的解析函数。

利用 $\Gamma$ 函数的性质：$\Gamma(z) \Gamma(1-z) = \frac{\pi}{\sin (\pi z)}$，以及负实轴上的围道积分，我们还可以将黎曼 $\zeta$ 函数进一步解析延拓：

$$
\zeta (s) = \frac{\Gamma(1-s)}{2 \pi i} \oint \frac{z^{s-1} e^z}{1 - e^z} dz
$$

这里围道积分沿着从实轴负无穷到0再回到负无穷的高度趋向0的逆时针闭合回路。这样，就可以将函数解析延拓到 $\Re(s) \le 1$ 的部分了，只留下 $s=1$ 这一个极点。

由此可得一个很有用的等式：

$$
\zeta(1-s) = 2 (2\pi)^{-s} \Gamma(s) \cos \left( \frac{s \pi}{2} \right) \zeta (s)
$$

这使得我们在求一些 $\zeta$ 函数值的时候可以方便很多，比如很显然s为负偶数的时候函数值为0。

至此，我们就完成了从最开始的p-调和级数的求和到黎曼 $\zeta$ 函数的解析延拓。

在原级数求和的定义域中，我们有 $\zeta(s) = \sum_{i=1}^\infty i^{-s}$，但在原定义域之外则没有这个关系，这就和之前举的几何级数求和的例子相同。

所以，虽然我们有 $\zeta(-1) = - \frac{1}{12}$，但并不表示下面这个无穷级数求和等式成立：

$$
1 + 2 + 3 + 4 + ... = - \frac{1}{12}
$$

因为左边的求和并不直接等于p-级数求和的解析延拓，而后者是p-级数求和的解析延拓的结果。

这就是很多看似奇葩的求和结果的来源，一个看着明显发散或者振荡总之不收敛的级数，都和一些意想不到的常数通过等号联系了起来，使得很多人觉得莫名其妙，但本质上这里的等号都不是真的表示其左右的级数和常数是相等的，而是表示级数的解析延拓在给定参数下等于另一侧的常数。

事实上，对于无穷级数的求和，除了通常的“加法”和“收敛极限”，还有很多不同的方法，比如对于振荡级数的平均收敛极限，对应的就是Abel和；或者拉马努金由欧拉-麦克劳林公式得到的拉马努金和。这些“求和”都与我们平常所理解的求和不同，如果不明确其定义，直接看着等式望文生义的话，往往会认为等式结果非常可笑。

从另一个角度来说，这些解析延拓与求和往往都是通过在原函数定义域之外丢掉一些无穷大来实现的，比如最简单的就是之前的几何级数求和的例子，其有限部分和为：

$$
J_n(x) = \sum_{i=0}^n x^i = \frac{x^{n+1} - 1}{x - 1}
$$

当 $n \rightarrow \infty$ 时，如果 $|x| < 1$，那么 $x^{n+1} \rightarrow 0$，所以结果自然得到我们之前所熟悉的分式。而当 $|x| > 1$ 时，$x^{n+1} \rightarrow \infty$，是一个发散项，但在 $\frac{1}{1-x}$中却将这个发散项给移除了，只保留有限项部分。当 $|x| = 1$ 时，我们得到的是一个模为1的不定项，在一般级数极限的意义下将导致级数没有收敛极限。

这点在物理上其实很常见，我们在做量子场论时经常会遇到各种无穷，然后在这些无穷中扣除一部分与物理无关的无穷，保留下和物理相关的有限部分，这个过程就是“正规化”（找到物理相关部分的过程是“重整化”，扣除的部分是“正规化”）（所以弦论中上述所有自然数之“和”等于-1/12的情况是有的，但那是在重整化意义上的“相等”）。在解析延拓的过程中，我们也可以认为是做了一次正规化，当然具体情况要具体分析。

----

回过头来继续说黎曼 $\zeta$ 函数。

前面已经提到，$\zeta(-2n)=0$，这些负偶数的零点（即函数值为0的点）被称为平凡零点。但 $\zeta$ 函数本身除了这些平凡零点，还包含无数个非凡零点，著名的“黎曼猜想”就是针对这些非凡零点的分布的，简单说来就是：

> **黎曼猜想**：黎曼 $\zeta$ 函数的所有非凡零点的实部分都为 $\frac{1}{2}$。

这个猜想写起来非常简单，但实际上要证明却是非常困难的。

人们已经对大量（数十亿个）非凡零点做了研究，发现都满足黎曼猜想，但这样只能增加人们的信心，却并不是证明了黎曼猜想，毕竟发现再多非凡零点也不过是有限个，对无限个非凡零点，证明力依然很小。

比如说，**素数定理**告诉我们 $\lim_{n \rightarrow \infty} \frac{\pi(x)}{\mathrm{Li}(x)} = 1$（其中 $\pi(x)$ 是素数计数函数，即小于x的素数的个数），且在人们验证了的范围内都有 $\mathrm{Li}(x) > \pi (x)$，但数学家们证明了在大约 $e^{727.95133}$ 左右（大约是一个316位数），这个不等式会不成立。

可见，有限个数的验证对无穷来说，真的没什么说服力。

那么，黎曼 $\zeta$ 函数到底为什么这么重要呢？

一个最直接的作用，就是它能提供精确的素数计数函数（也就是上面提到的 $\pi(x)$）。

我们还是从p-级数开始看起（下面对于求和如果不另外写明，则对n的求和表示对所有自然数，对p的求和表示对所有素数）：

$$
\sum_n \frac{1}{n^s} = \prod_p \frac{1}{1 - p^{-s}}
$$

这个等式被称为欧拉乘积公式，其证明过程很容易，将所有自然数项根据素数从小到大进行筛选，在利用 $\Re(s) > 1$ 时的几何级数求和公式，就能得到。

从而，考虑解析延拓则有：$\zeta(s) = \prod_{p} \frac{1}{1 - p^{-s}}$。两边取对数，再考虑泰勒展开，就有：

$$
\ln \zeta(s) = \sum_p \sum_n \frac{1}{n} p^{-ns}
$$

我们可以引入一个辅助函数，称为黎曼素数计数函数J(x)，它是一个很奇特的阶跃函数：

$$
J(x) = \sum_n \frac{1}{n} \pi(x^{\frac{1}{n}})
$$

也就是说，每经过一个素数的n次方，该函数增加 $\frac{1}{n}$，且 $J(0)=0$。因此我们就有$J(2_+)=1$、$J(3_+)=2$、$J(4_+)=2.5$、$J(5_+)=3.5$、$J(6_+)=3.5$、$J(7_+)=4.5$、$J(8_+)=\frac{29}{6}$、$J(9_+)=\frac{16}{3}$，其中下标+表示比该值略大（右极限），而在该点处的值为左右极限的平均值。

然后，我们可以使用黎曼-斯蒂尔杰斯积分（一种分区取样求和然后取极限的积分法，是初学积分时的矩形分割法的升级版）：

$$
\lim_{n \rightarrow \infty} \sum_{i=0}^{n-1} f(t_i) [g(x_{i+1}) - g{x_i}] = \int_a^b f(x) dg(x)
$$

其中 $x_0 = a$、$x_n = b$，$t_i$ 是分片区间 $(x_i, x_{i+1})$ 中的取样值。

由于黎曼素数计数函数 J 是一个阶跃函数，所以如果取它为上述积分公式中的g，那么积分就变成了求和。而又由于阶跃点在素数的n次方，所以我们就有：

$$
\int_0^\infty f(x) dJ(x) = \sum_p \sum_n \frac{1}{n} f(p^n)
$$

于是，我们就可以把欧拉乘积公式改写为积分形式：

$$
\ln \zeta(s) = \int_0^\infty x^{-s} dJ(x) = s \int_0^\infty J(x) x^{-s-1} dx
$$

这样，黎曼 $\zeta$ 函数就和黎曼素数计数函数联系在了一起。

我们进一步用Mellin变换，就可以将黎曼素数计数函数用黎曼 $\zeta$ 函数表达出来了：

$$
J(x) = \frac{1}{2 \pi i} \int_{a - i \infty}^{a + i \infty} \frac{\ln \zeta(z)}{z} x^z dz
$$

其中a是大于1的实数。

而黎曼素数计数函数与素数计数函数之间可以用逆莫比乌斯变换来联系：

$$
\pi (x) = \sum_n \frac{\mu (n)}{n} J(x^{\frac{1}{n}})
$$

其中 $\mu (x)$ 是莫比乌斯函数，它有如下特点：

- 如果x能写成偶数个不同素数的乘积，则值为1；
- 如果x能写成奇数个不同素数的乘积，则值为-1；
- 否则为0；
- 规定 $\mu(1) = 1$。

因此，很显然，只要我们能得到黎曼 $\zeta$ 函数的完整信息，就能得到黎曼素数计数函数J(x)，进而就能得到素数计数函数 $\pi(x)$。也就是说，只要掌握了黎曼 $\zeta$ 函数，就能知道素数到底是怎么分布的——也就是说，我们能找到每一个素数了。

而，要计算黎曼 $\zeta$ 函数，我们还需要从辅助用的黎曼 $\xi$ 函数入手：

$$
\xi (s) = (s-1) \pi^{-\frac{s}{2}} \Gamma \left( \frac{s}{2} + 1 \right) \zeta(s)
$$

黎曼 $\xi$ 函数利用 $\Gamma$ 函数以及开头的 $s(s-1)$，将原来 $\zeta$ 函数中的所有平凡零点和极点都消除了，从而是一个在整个复平面都解析的整函数，并且它的零点就是 $\zeta$ 函数的非凡零点。

这个函数有两个很独特的性质：

$$
\xi (s) = \xi (1-s)
$$

以及更重要的：

$$
\xi(s) = \frac{1}{2} \prod_\rho \left( 1 - \frac{s}{\rho} \right)
$$

这里无穷乘积是对所有黎曼 $\xi$ 函数的零点求积。

这么一来，$\zeta$ 函数的对数就可以写为：

$$
\ln \zeta(z) = - \ln(s - 1) + \sum_\rho \ln \left( 1 - \frac{s}{\rho} \right) - \ln \Gamma \left( \frac{s}{2} + 1 \right) - \ln 2 + \frac{s}{2} \ln \pi
$$

代入黎曼素数计数函数，用一定技巧化简后就得到了这么一个东西：

$$
J(x) = \mathrm{Li}(x) - \sum_\rho \mathrm{Li}(x^\rho) - \ln 2 + \int_x^\infty \frac{dt}{t(t^2-1) \ln t}
$$

其中，$\mathrm{Li}(x) = \int_2^\infty \frac{dx}{\ln x}$ 就是前面提到的对数积分。

至此，$\zeta$ 函数的非凡零点对素数计数函数的作用终于变得显然了（所以上述公式被称为**黎曼显式公式**），也因此，我们掌握的非凡零点的精确值越多，我们就能得到越精确的素数计数函数，从而也就能得到越精确的素数分布。

当然，这里不得不说的是，计算非凡零点，尤其是其精确值的难度，比判断一个数是不是素数要难得多得多得多得多得多。在没有计算机之前，手算也只能得到几百个零点，但找素数那可以找几万个，只要有耐心——算非凡零点可不是光有耐心就足够的。

----

那么，黎曼猜想如果被证实了，对我们寻找素数能带来多大的影响呢？

事实上，影响并不是非常大。

我们可以看到，在黎曼素数计数函数中出现了素数定理中所提到的对数积分，以及由非凡零点调制的高阶项（第三项是常数，第四项随着x的增大而缩小，可以认为是高阶误差项），而从联系 $J(x)$ 与 $\pi(x)$ 的那个逆莫比乌斯变换的公式可以看到，其中最主要的共享就来自于 $J(x)$，因此可以说非凡零点决定了 $\pi(x)$ 与 $\mathrm{Li}(x)$ 之间的偏离程度。

如果黎曼猜想成立，那么这两个函数之间的偏离基本就是 $\mathrm{Li}(\sqrt x)$ 的量级。但如果黎曼猜想不成立，考虑到 $\xi$ 函数的对称性我们可以知道，两者的偏离就会达到$\mathrm{Li}(x^{\frac{1}{2} + \delta})$ 的量级，其中 $\delta > 0$。

另一方面，如果黎曼猜想成立，我们只需要集中精力在临界线 $\Re(s) = \frac{1}{2}$ 上寻找非凡零点就可以了，这对我们计算来说会带来一定的便捷——但实际上，现在计算零点很多都是在约定黎曼猜想成立的前提下进行的，数以千计的命题也都是建立在这个假设成立的基础上，所以如果真的被证明成立，对已有内容其实不会带来太大的影响，最多就是让本来就已经很放下的心，放得更下一点罢了。

当然，也还有一些很让人出乎意料的领域可能会有影响，比如物理。

有一个**“Hilbert-Pólya猜想”**，是这么说的：

> 黎曼 $\zeta$ 函数的非凡零点与某个厄米算符的本征值对应。

或者简单一点说，就是存在一个量子系统，其本征能态 $E_n$ 对应了黎曼 $\zeta$ 函数的非凡零点 $\frac{1}{2} + i E_n$。

事实上，我们有Montgomery-Odlyzko 定律：

> 黎曼 $\zeta$ 函数的非凡零点分布可以用任何一个典型随机厄米矩阵的本征值分布来描述。

这次数学家Atiyah用来证明黎曼猜想的尚未公开的方法（本文写于22号，Atiyah将于24号公布其成果，所以写本文的时候方法尚未公开），就有人相信是采用了这种“量子证明法”，构造了可能如下形式的哈密顿量：

$$
\hat H = \frac{1}{1 - e^{-i \hat p}} (\hat x \hat p + \hat p \hat x) (1 - e^{-i \hat p})
$$

然后使用算子理论对其进行谱分析所得到的结论。

总之，就个人来看，由于现在其实很多人都在默认黎曼猜想成立的情况下进行数学工作，得到了很多有意思的结论，那么进一步证明这个猜想真的成立，也不会突然带来巨大的进展或改变——假如说证明它不成立，那带来的冲击才叫大呢。

----

那么，它和RSA加密又有什么关系呢？

RSA加密的本质，其实是大素数分解，即我们要在知道两个很大的素数p和q，然后使用它们的一些数论结果来进行数据的加密（基本都是模运算）。

要破解RSA加密，那本质就是在知道p和q的乘积N的情况下，逆向找出p和q。

由于这里涉及的都是素数，所以自然会有人认为如果黎曼猜想被证明成立，那么RSA就岌岌可危了。

这纯粹是危言耸听胡说八道。

首先，就算黎曼猜想被证明成立，我们计算非凡零点的进程也依然不会有什么加速——因为，人们早就在默认黎曼猜想成立的情况下来寻找非凡零点了（当然，数值验证猜想的人并不局限在这点上，然后数十亿、百亿的结果都支持黎曼猜想）。

其次，就算黎曼猜想的证明让我们突然能很快地找到所有非凡零点，从而找出素数分布的精确模式，也就是俗话所说的找到了素数地图，那么也不表示破解RSA所要的从N=pq找出p和q就会变得很快，毕竟，知道有哪些素数，和找出符合条件的素数，是两码事，后者的所要求的计算量依然是 $O(\pi(\sqrt N))$ 级的。

这就好比说，我告诉你房间里五个开关，控制五盏灯，让你找出哪一个开关控制哪一盏灯，然后告诉你这五个开关具体的位置，能降低你开关灯的次数么？并不能。

充其量，是我们生成素数的算法可以有改进——这还是在能从黎曼猜想带来非凡零点计算的加速这个假设上来的，而这个假设本身并不成立。

要攻破RSA，还是期待量子计算机吧——量子Shor算法理论上可以将大数素数分解的计算复杂度降低到 $O(\ln N)$ 的量级，这才叫提速。