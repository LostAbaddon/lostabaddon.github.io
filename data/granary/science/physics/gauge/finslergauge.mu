标题：从弱Finsler几何到规范场
作者：LostAbaddon
更新：2016.02.18 15:19:53

过年在家，为了让这个年有点年味，而且也为了纪念马上就要去北漂，所以打算做点东西，于是就有了这篇文章。

嗯，虽然有很多计算，但基本还是一个脑洞，一个Toy Theory。

----

假定时空的度量具有如下Finsler形式：

$$
L (V^\mu) = \sqrt{g_{\mu \nu} V^\mu V^\nu} + h(V^\mu)
$$

其中第一部分是传统的黎曼型度量，后者为对黎曼型度量的偏离，从而构成Finsler度量。

这样的Finsler度量一般来说是很难直接求解的，于是我们这里假定：**h非常小，从而所有高阶项都可以忽略**。

这样的话，会为计算带来一定的便利，比如度量的平方（这个在Finsler几何中比度量本身更常用）：

$$
L (V^\mu)^2 = g_{\mu \nu} V^\mu V^\nu + 2 h(V^\mu) \sqrt{g_{\mu \nu} V^\mu V^\nu}
$$

---

然后，我们来看Clifford代数中的一个性质：

$$
u v + v u = 2 \left< u, v \right> = Q(u + v) - Q(u) - Q(v)
$$

这里Q是一个二次型，且容易看出它就是度量的平方（假定Clifford代数定义在一个具有度量结构的几何流形上）。

Finsler几何当然不是二次型度量的，所以不能直接使用上述Clifford代数结构，从而传统的Finsler几何采用如下形式的定义在节丛上的内积：

$$
\left< V^\mu, U^\mu \right> = V^\mu U^\nu \frac{\partial^2 L(x^\mu; y^\mu)^2}{2 \partial y^\mu \partial y^\nu}
$$

但这种定义的缺点，就是两个流形上矢量的内积还取决于第三个矢量的方向（因为是定义在节丛上的），这点本身也是有点反传统的。

那么，如果我们这里强行使用Clifford型内积，会得到什么呢？

最简单的，当然是直接使用如下形式的内积定义：

$$
\left< V^\mu, U^\mu \right> = \frac{L(V^\mu + U^\mu)^2 - L(V^\mu)^2 - L(U^\mu)^2}{2}
$$

但，我们都知道，Clifford型内积的表示其实也并不唯一，比如下面这几个在二次型Q的情况下是等价的：

$$
2 \left< u, v \right> = Q(u + v) - Q(u) - Q(v)\\
\phantom{wwwai}= Q(u) + Q(v) - Q(u - v)\\
\phantom{wwi}= \frac{Q(u + v) - Q(u - v)}{2}
$$

但对于Finsler度量，上述几个式子彼此之间是不等价的，有其对于某些Finsler度量，如果不满足强一阶齐次，而是弱一阶齐次，那么此时我们有：

$$
L(V^\mu) \neq L(- V^\mu)
$$

于是上面式子中的矢量差部分Q(u-v)就变得很微妙了，到底是u-v还是v-u？

这里，我们引入第二个假定：Finsler的内积是非对易的。

那么，现在，我们就采用如下形式的内积来讨论：

$$
\left< V^\mu, U^\mu \right> = \frac{L(V^\mu + U^\mu)^2 - L(V^\mu - U^\mu)^2}{4}
$$

这个内积的定义在L为黎曼型度量的时候天然回归到黎曼型内积，而在非黎曼型的Finsler度量下，则能给出不同的结果——特别是，如果Finsler度量具有强一阶齐次性，那么这个内积是对称的；但如果只有弱一阶齐次性，那么这个内积非对称，非对称的部分可以理解为扰率。

下面我们用|V|来代表流形上矢量V在开头所说的Finsler型度量的黎曼部分作用下的长度，从而对于弱Finsler流形，上述内积可以给出如下形式：

$$
\left< V^\mu, U^\mu \right> = \frac{|V + U|^2 - |V - U|^2 + 2 h (V + U) |V + U| - 2 h (V - U) |V - U|}{4}\\
= g_{\mu \nu} V^\mu U^\nu + \frac{h (V + U) |V + U| - h (V - U) |V - U|}{2}\ \ \ \ \ 
$$

----

有了度量，我们可以来看流形上的极值曲线：

$$
\begin{cases}
\frac{\partial}{\partial x_\mu} L(x^\mu; V^\mu) - \frac{d}{dt} \frac{\partial}{\partial V^\mu} L(x^\mu; V^\mu) = 0\\
\frac{d L(x^\mu; V^\mu)}{dt} = 0
\end{cases} \phantom{www} \Rightarrow \phantom{wwwwwwi}\\
\begin{cases}
\frac{1}{2 |V|} \left( g_{\alpha \beta, \mu} - 2 g_{\mu \alpha, \beta} \right) V^\alpha V^\beta - V^\nu \partial_\nu \delta_\mu h + \partial_\mu h - \frac{V_\mu V^\nu}{|V|^2} \partial_\nu h\\
\phantom{wwwwwwwwwwwwwwwi}=\dot V^\nu \left( \frac{g_{\mu \nu}}{|V|} + \delta_\mu \delta_\nu h + \frac{V_\mu}{|V|^2} \delta_\nu h \right)\\
2 g_{\mu \nu} \dot V^\mu V^\nu + g_{\alpha \beta, \mu} V^\alpha V^\beta V^\mu = - 2 |V| \left( \dot V^\mu \delta_\mu h + V^\mu \partial_\mu h \right)
\end{cases}
$$

以及自平行曲线：

$$
\begin{cases}
V^\mu \left( x^\mu + dx^\mu \right) = V^\mu \left( x^\mu \right) + \Gamma^\mu (V^\mu; dx^\mu; x^\mu)\\
\dot V^\mu - \Gamma^\mu \left( V^\mu; V^\mu; x^\mu \right) = 0
\end{cases}
$$

其中传统偏导是对坐标的偏导，而变分符号在这里表示对矢量部分的偏导，联络函数对第二个变量是一阶齐次的。

如果我们要求极值曲线与自平行曲线在任何情况下都相等，那么就可以得到联络的表达：

$$
\frac{V^\alpha V^\beta}{2 |V|} \left( g_{\alpha \beta, \mu} - 2 g_{\mu \alpha, \beta} \right) - V^\nu \partial_\nu \delta_\mu h + \partial_\mu h - \frac{V_\mu}{|V|^2} V^\nu \partial_\nu h\\
\phantom{wwwwwwwwwwwwwi}= \Gamma^\nu \left( \frac{g_{\mu \nu}}{|V|} + \delta_\mu \delta_\nu h + \frac{V_\mu}{|V|^2} \delta_\nu h \right)
$$

在弱Finsler极限下就有（上标V表示是V的函数）：

$$
\dot V^\mu = \Gamma^\mu (V; V)\phantom{wwwwwwwwwwwwwwwwwwwwwwwww}\\
= \Gamma^\mu_{\alpha \beta} V^\alpha V^\beta + |V| g^{\mu \alpha} V^\beta H^V_{\alpha \beta}\phantom{wwwwwwwwwwww}\\
= - \frac{V^\mu}{|V|} V^\alpha V^\beta \nabla^G_\alpha \delta_\beta h^V - |V| g^{\mu \sigma} V^\alpha V^\beta \Gamma^\rho_{\alpha \beta} \delta_\sigma \delta_\rho h^V
$$

其中

$$
\Gamma^\sigma_{\mu \nu} = \frac{1}{2} g^{\sigma \rho} \left( g_{\mu \nu, \rho} - g_{\rho \alpha, \beta} - g_{\rho \beta, \alpha} \right)\\
H^V_{\mu \nu} = \partial_\mu \delta_\nu h^V - \partial_\nu \delta_\mu h^V\phantom{wwwwww}\\
\nabla^G_\mu \delta_\nu h^V = \partial_\mu \delta_\nu h^V + \Gamma^\sigma_{\mu \nu} \delta_\sigma h^V\phantom{wwi}
$$

从而就有（注意对第二个参数的一阶齐次要求）：

$$
\Gamma^\mu (A; V) = \left( \Gamma^\mu_{\nu \sigma} - |A| g^{\mu \rho} \Gamma^\sigma_{\nu \lambda} \delta_\sigma \delta_\rho h^A \right) V^\nu A^\lambda + \frac{V^\nu V^\lambda}{|V|} A^\sigma \Phi^{A \mu}_{\sigma \lambda \nu} + \Lambda^\mu (A, V)
$$

其中

$$
\Lambda^\mu (V, V) = 0\phantom{wwwwwwwwww}\\
\bar H^V_{\mu \nu} = \frac{1}{2} \left( \nabla^G_\mu \delta_\nu h^V + \nabla^G_\nu \delta_\mu h^V \right)\\
\Phi^{V \rho}_{\sigma \mu \nu} = g^{\rho \lambda} g_{\mu \nu} H^V_{\lambda \sigma} - \delta^\rho_\sigma \bar H^V_{\mu \nu}\phantom{ww}
$$

可以看到，这么选择的联络函数，对于两个参数都是一阶齐次的，算是一个很好的性质。更距离来说，对于方向矢量V不是线性的而只是一阶齐次，而对于被输运矢量A确实线性的。

这个形式当然是非唯一的，尤其对于某些量到底是选A还是V，其实有很大的任意性。这里主要考虑的还是关于第二个参数的一阶齐次要求，接着就是尽可能使被输运的矢量的作用简单，从而一切的复杂性只体现在方向的选择上。

从最终的表达来看，联络函数的第一项的第一部分是传统黎曼引力项，第二项的第一部分是传统规范场项。第一项与第二项的第二部分则都是引力与规范场的耦合项，且第一项的第二部分在选择传统规范场形式的时候自动消失。

而规范场的部分，在加速度的表达式中，我们可以认为粒子运动的切矢量的长度为常数且模为1，从而第一项是引力加速度，第二项是规范场导致的加速度，第三项则是和速度的三阶项相关，从而会给出高速运动下的高能修正，因此如果这个模型是正确的，那么我们可以预期在高能下会有不同的粒子行为。第四项在传统规范场下自动消失从而不考虑。

至于联络函数最后的部分，则是一个非对称项，可以视为扰率，这里不考虑。

接下来，让我们讨论一个很有趣也很有难度，同时也是一个实验性的话题：上述这个流形上的曲率，是多少？

尤其，曲率标量R现在是什么？

---

由于我们现在取消了原本Finsler几何定义在节丛上的度规张量，所以对于如何做内积是一件很难办的事。

即便我们可以通过最开始的方法定义两个矢量的内积，但对于更普通的张量，恐怕是无能为力的。

为此，这里我们采用如下方案：

$$
\frac{\oint_{\partial \Omega} T_{\mu \nu} n^\mu n^\nu d\omega}{\oint_{\partial \Omega} d\omega}
$$

其中曲面 $\partial \Omega$ 是流形上的单位球面，即指标球，而矢量n就是从球心指向单位球面的单位向量。

通过上述积分得到的标量T，在黎曼几何中与张量T对下标的缩并得到的标量之间，只差一个由流形维度决定的系数。

如果我们将分子被积函数拓展为一个n阶张量与n个单位矢量构成的函数，那么这个积分的特点，就是如果该数中含有奇数次个单位矢量，那么这个积分为0；如果含有偶数次个，那么会得到非零的结果，其中如上形式的二次形可以给出张量的缩并。

而在弱Finsler流形上，这个性质会有所不同：由于单位矢量被度量的h部分做了激化，从而有可能会在奇数次项中留下非零部分。

特别，当我们考虑的是规范场形的弱Finsler流形时，这种“激化”由规范矢量场A给出。

因此，如果我们采用上述积分形式来作为张量缩并的方案的话，那么我们就可以继续讨论在如上框架下的流形曲率的问题了。

为了简单起见，我们现在假定上述弱Finsler流形的黎曼度量部分是Minkowsky的，从而现在流形的联络函数可以写为：

$$
\Gamma^\mu (A; V) = \frac{V^\nu V^\lambda}{|V|} A^\sigma \Phi^{A \mu}_{\sigma \lambda \nu}
$$

现在我们考虑交错协变微分（弱Finsler极限下）：

$$
V^\mu \nabla_\mu \left( U^\nu \nabla_\nu A^\sigma \right) - U^\mu \nabla_\mu \left( V^\nu \nabla_\nu A^\sigma \right)\phantom{wwwwwwwwwwwwwwwwwwwwi}\\
= A^\beta \partial_\mu \left[ \left( |V| U^\mu - |U| V^\mu \right) \eta^{\sigma \lambda} H^A_{\lambda \beta} + \left( \frac{V^\mu U^\alpha U^\rho}{|U|} - \frac{U^\mu V^\alpha V^\rho}{|V|} \right) \delta^\sigma_\beta \bar H^A_{\rho \alpha} \right]
$$

接下来，对其考虑前面所说的积分。

首先，将U与A取为前面所说的单位矢量做积分，接着再给结果和矢量V一起做缩并，就可以得到如下结果：

$$
R = \eta^{\mu \nu} \eta^{\sigma \rho} H_\sigma \partial_\mu \left( H^{(1)}_{\beta \nu} + H^{(2)}_{\beta \nu} \right)
$$

其中上标(1)的部分来源于场强H与一个单位矢量的共同积分，上标(2)的部分来源于场强H与两个单位矢量的共同积分。

这东西是不是看着非常非常眼熟？

我们将规范矢量场A及其场强F代入：

$$
R = 2 \eta^{\mu \nu} \eta^{\sigma \rho} A_\sigma \partial_\mu F_{\beta \nu}
$$

因此，在作为作用量的时候，在全空间积分并忽略边界项后可得：

$$
\int R \epsilon = \int 2 \eta^{\mu \nu} \eta^{\sigma \rho} A_\sigma \partial_\mu F_{\rho \nu} \epsilon\phantom{wwwwwwwww}\\
= \int 2 \eta^{\mu \nu} \eta^{\sigma \rho} \partial_\mu A_\sigma F_{\nu \rho} \epsilon\phantom{wwwwwa}\\
= \int \eta^{\mu \nu} \eta^{\sigma \rho} \left( \partial_\mu A_\sigma - \partial_\sigma A_\mu \right) F_{\nu \rho} \epsilon\\
= \int \eta^{\mu \nu} \eta^{\sigma \rho} F_{\mu \sigma} F_{\nu \rho} \epsilon\phantom{wwwwwwwi}
$$

你看，和传统规范场的作用量就差一个常数系数，从而可以认为具有规范场形式的弱Finsler流形当黎曼部分为闵氏度量的时候给出的就是规范场。

当黎曼部分不是闵氏度量时候，我们也可以做同样的操作，此时会得到黎曼部分对应的广义相对论的Ricci标量，上述规范场强，以及规范场部分与黎曼引力部分的耦合项。

但，就和粒子运动部分在高速情况下会和传统黎曼几何有差异一样，对于黎曼引力部分不为零的情况，规范场和引力场的耦合的形式和传统的有所不同，因此在高能情况下也是可以验证的。

----

这里必须要指出的一点是，上述计算存在几点很不严谨的地方。

主要就是对于缩并用的积分的计算，这个计算在欧氏几何上可以给出所要的结果，在黎曼几何上也可以，但对于时空这种赝黎曼几何，则是存在一个无穷大发散的，将这个无穷大发散扣除后的有限部分，可以给出所要的结果。

但这种“正规化”为什么可以做，则仅仅是一种随意的选择，目前并不知道什么依据——或许是通过Wick转动，从时空转动到欧氏空间，然后做积分，再转回去，这倒是很传统的量子场论中用过的手段。

另一方面，即便是黎曼几何上没问题，这个积分在Finsler几何下是否依然成立，这就不知道了。当然，这里处理的是弱Finsler几何，所以或许还是可行的吧。

----

最后是一些讨论。

就和紧致化是对蜷缩的额外维做展开后只取一阶项一样，这种弱Finsler几何的方法也是对Finsler度量做微扰后只取展开的一阶项，两者在这个思想上是相同的，随后的差异就体现在弦论是针对具有额外维的黎曼几何做处理，而Finsler几何则是对具有非黎曼度量的四维Finsler时空做处理。

和一些量子引力的流派（比如这次吴岳良院士所采用的从郭汉英等老一辈我国物理学家开始就是用的Lorentz群规范场的流派）中将广义相对论中作为流形联络的引力变为纤维主丛联络的方法不同，这里不再将外延几何转化为内蕴几何，而是反过来，将原本作为内蕴的纤维丛性质的规范场视为外延的度量上的Finsler型变化，从而是将内蕴几何转化为外延几何。

弦论利用额外维来做这种由内而外的转变，其实也是一个想法。

当然了，至于最后能不能做成，这个另说，或许这个模型始终也不过是一个Toy罢了。

而且，这里时空的度量似乎是定死的，完全不受带荷粒子所携带的力荷的影响，这种对所有物质一视同仁的特点，显然会给出不带电粒子的行为也和带电粒子一样这种诡异的事情。因此，或许实际情况时空的度量会随着在其上运动的粒子的某些属性而改变，也或者这个模型不过真的就只是一个Toy罢了——个人目前倾向于后者。

而且，这里显然给出了高能下截然不同的行为，这本身就很有挑战——因为简单的实验大约就能把这货彻底否掉了吧。

当然也有很小很小的可能，我们找到了统一引力与规范场的框架，科科～