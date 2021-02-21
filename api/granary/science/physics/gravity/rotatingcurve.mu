标题：关于星系转速曲线与暗物质
更新：2020.01.08 12:21:05

星系转速曲线异常是人们得以发现暗物质存在证据的最重要线索。

但最近笔者在翻译《Calculating the Cosmos》一书时，发现其中第十八章提到了一个很有趣的问题，所以就抽空作了一下相关的计算，发现还挺有意思的。

----

在最简单的模型下，我们可以假定星系是一个保持球对称的分层球集，也即**球形壳层模型**。

我们可以假定半径为r处的球面的总质量为$\rho(r)$，这个球面在自转下引力与离心力平衡，这样就可以给出星系转速曲线：

$$
\begin{cases}
M(r) = \int_0^r \rho(x) dx\\
\frac{v^2}{r} = \int_0^r \frac{G \rho(x)}{r^2} dx
\end{cases}\\
\therefore v(r) = \sqrt{\frac{G M(r)}{r}}\\
$$

这样得到的星系曲线与观测不符，而且，最关键的是，这个模型本身也不对——星系显然不可能是球对称的，绝大多数星系，比如常见的棒旋星系、螺旋星系与椭圆星系等，基本都是扁平的。

所以，我们将模型改一下——

星系在半径$R_I$以内都是球形的，但在这个界限之外是碟形的，碟形半径为$R_O$，且暂且忽略旋臂结构，认为始终是保持环形的，即**星环模型**。

> 在关于星系形态研究的早期，华裔天文学家、数学家林家翘与他的大四本科生徐遐生共同提出了早期主流数学模型“林-徐密度波模型”[^m]。在这个理论中，旋臂这种看似离散的星系结构是由大量在近椭圆轨道上运行的恒星在数密度涨落在空间中形成的一种暂时性的聚集效应，而非由物理作用维系的固定实体。

[^m]: 关于该模型还存在一些争论：学术界有人认为林-徐模型是建立在早前林德布拉德的共振密度波理论的基础上的，但对此还存在争议。另，林-徐密度波模型已经成功解释了土星等形星的星环上的很多现象。

在$R_I$之外半径为x处，星系的厚度为$2 H(r)$，且带状区域的总质量为$\rho(r)$，$R_I$之内半径为x处的球面总质量也记为$\rho(r)$。这样就有：

$$
\begin{cases}
M(r) = \int_0^r \rho(x) dx;\ \ \ \ M_I = M(R_I)\\
\psi(r \le R_I) = \frac{G}{r} \int_0^r \rho(x) dx + \int_{R_I}^{R_O} \psi(x, r) dx\\
\psi(r > R_I) = \frac{G M_I}{r} + \int_{R_I}^r \psi(x, r) dx\\
\psi(x, r) = \int_0^{2 \pi} \int_{-H(x)}^{H(x)} \frac{G \rho(x) dz d\theta}{4 \pi x H(x) \sqrt{z^2 + r^2 + x^2 - 2 r x \cos \theta}}\\
f(r) = \frac{d}{dr} \psi(r)\\
f(r) = \frac{v^2}{r}
\end{cases}
$$

显然，这里的积分不大可能给出解析精确解，所以我们要做一些近似。

对于半径为x的星环到半径r处的引力势$\psi(x,r)$，我们有：

$$
\psi(x, r) = \frac{G \rho(x)}{4 \pi H(x)} \int_0^{2 \pi} \int_{-H(x)}^{H(x)} \frac{dz d\theta}{\sqrt{z^2 + r^2 + x^2 - 2 r x \cos \theta}}\phantom{wwwwwwwwwwwa}\\
= \frac{G \rho(x)}{2 \pi H(x)} \int_0^{2 \pi} \ln \left( \frac{\sqrt{H(x)^2 + r^2 + x^2 - 2 x r \cos \theta} + H(x)}{\sqrt{r^2 + x^2 - 2 x r \cos \theta}} \right) d \theta
$$

令$L = \sqrt{r^2 + x^2}$、$\phi = \frac{2 x r}{L^2}$，并假定碟形的厚度很薄即$H(x) \ll x$。现在就可以分两类情况，一类是半径为x的星环距离r位置很远的情况（$\phi \approx 0$），一类是x与r很接近的情况。

对第一类，我们有近似：

$$
\psi_1(x, r) \approx \frac{G \rho(x)}{2 \pi L} \int_0^{2 \pi} \frac{1}{\sqrt{1 - \phi \cos \theta}} d\theta\phantom{wwwwwwwwwwwww}\\
\approx \frac{G \rho(x)}{2 \pi L} \int_0^{2 \pi} \left( 1 + \frac{\phi \cos \theta}{2} + \frac{3 \phi^2 \cos^2 \theta}{8} \right) d\theta\\
\approx \frac{G \rho(x)}{L} \left( 1 + \frac{3 x^2 r^2}{4 L^4} \right)\phantom{wwwwwwwwwwwwi}
$$

而对第二类情况，我们可以在环的大部分区域做展开，保留0点附近的正方形区域，这个区域的弧度半径为$\sigma(x) = \frac{H(x)}{\sqrt{r x}}$，通过这种挖洞的方法，将存在奇点的区域处理为不发散的情况——直接微扰展开时会发散：

$$
\psi_2(x, r) = \frac{G \rho(x)}{4 \pi H(x)} \int_\sigma^{2 \pi - \sigma} \int_{-H(x)}^{H(x)} \frac{dz d\theta}{\sqrt{z^2 + r^2 + x^2 - 2 r x \cos \theta}} +\phantom{wwww}\\
\frac{G \rho(x)}{4 \pi H(x)} \int_{-\sigma}^{\sigma} \int_{-H(x)}^{H(x)} \frac{dz d\theta}{\sqrt{z^2 + r^2 + x^2 - 2 r x \cos \theta}}\\
\phantom{wwwwwwwww}\approx \frac{G \rho(x)}{\pi} \left\{ \int_\sigma^{\pi} \frac{1}{H(x) + L \sqrt{1 - \phi \cos \theta}} d \theta + \frac{\pi H(x)}{2 \sqrt{r x} [ H(x) + |r - x| ]} \right\}\\
\phantom{wwwwwwi}\approx \frac{G \rho(x)}{\pi} \left\{ \frac{2}{r + x - \sqrt{ ( r - x )^2 + H^2 }} \ln \left[ \frac{r + x + H}{H + \sqrt{ ( r - x )^2 + H^2 }} \right]\\
\phantom{wwwwi}+ \frac{\pi - 2}{r + x + H} + \frac{\pi H}{2 \sqrt{r x} \left[ H + |r - x| \right]} \right\}\\
\phantom{wwwwwwwwwi}\approx \frac{G \rho(x)}{\pi} \left\{ \frac{2}{r + x} \left[ 1 + \frac{\sqrt{ ( r - x )^2 + H^2 }}{r + x} \right] \ln \left[ \frac{r + x}{H + \sqrt{ ( r - x )^2 + H^2 }} \right]\\
\phantom{wwwwwwwwwi}+ \frac{\pi - 2}{r + x} + \frac{(4 - \pi) H}{(r + x)^2} + \frac{\pi H}{2 \sqrt{r x} \left[ H + |r - x| \right]} \right\}
$$

如果最后考虑星环厚度 $H(x) \rightarrow 0$ 则有：

$$
\psi_2(x, r) \approx \frac{G \rho(x)}{\pi} \left[ \frac{2}{r + x} \left( 1 + \frac{|r - x|}{r + x} \right) \ln \left( \frac{r + x}{|r - x| + 2 H} \right) + \frac{\pi - 2}{r + x} \right]
$$

显然它在 $r = x$ 处发散，而原近似引力势的表现良好。

现在我们重新看一下现在得到的结果：

当 r 很小，即在星环中心时，引力势与径向引力强度（也只有径向有非 0 引力作用，另这里暂且略去 $G \rho(x)$，下同）为：

$$
\begin{cases}
\psi_1(x, r) \approx \frac{1}{L} \left( 1 + \frac{3 x^2 r^2}{4 L^4} \right)\\
F_1(x, r) \approx \frac{r x^2 (2 x^2 - 17 r^2)}{4 L^7}
\end{cases}
$$

而当 r 略小于 x，即在星环内测附近时，引力势与引力强度为：

$$
\begin{cases}
\psi_2(x, r) \approx \frac{1}{\pi} \left[ \frac{2}{x + r} \left( 1 + \frac{x - r}{x + r} \right) \ln \left( \frac{x + r}{x - r + 2 H} \right) + \frac{\pi - 2}{x + r} \right]\\
F_2(x, r) \approx \frac{(10 - \pi) x^2 + (\pi - 2) r^2}{\pi (x - r + 2 H) (x + r)^3} - \frac{8 x}{\pi (x + r)^3} \ln \left( \frac{x + r}{x - r + 2 H} \right)
\end{cases}
$$

接着，当 r 略大于 x，即在星环外侧附近是，引力势与引力强度为：

$$
\begin{cases}
\psi_3(x, r) \approx \frac{1}{\pi} \left[ \frac{2}{r + x} \left( 1 + \frac{r - x}{r + x} \right) \ln \left( \frac{r + x}{r - x + 2 H} \right) + \frac{\pi - 2}{r + x} \right]\\
F_3(x, r) \approx - \frac{\pi - 2}{\pi (r + x)^2} - \frac{8 x r}{\pi (r - x + 2 H) (x + r)^3} + \frac{4 (r - x)}{\pi (r + x)^3} \ln \left( \frac{r + x}{r - x + 2 H} \right)
\end{cases}
$$

最后，当 r 很大，即在远离星环的地方，引力势与引力强度为：

$$
\begin{cases}
\psi_4(x, r) \approx \frac{1}{L} \left( 1 + \frac{3 x^2 r^2}{4 L^4} \right)\\
F_4(x, r) \approx - \frac{r^3 (4 r^2 + 17 x^2)}{4 L^7}
\end{cases}
$$

我们下面可以构造两个近似引力强度分布函数，用来模拟星环内与星环外的引力强度分布。

$$
\begin{cases}
g_I = \frac{r}{x} \left[ \frac{1}{(x - r + 2 H) [2 x + (\pi - 2) r]} - \frac{1}{\pi x^2} \ln \left( \frac{x + r}{x - r + 2 H} \right) \right]\\
g_O = - \frac{\pi - 2}{\pi (r + x)^2} - \frac{2 r - x}{\pi (r - x + 2 H) r^2} - \frac{r - x}{2 \pi r^3} \ln \left( \frac{r + x}{r - x + 2 H} \right)
\end{cases}
$$

和传统球形星系模型相比，这里有两个最显著的不同：

1. 外层星环对内层星体是有引力贡献的，方向向外而非指向星系核心；
2. 内层星环对外层星体的引力作用有了调整，靠近星环处比球形星系的引力要强，远离星环的地方则趋于与球形星系相同的引力强度。

下面，我们就可以来计算一个径向密度分布 $\rho(x)$ 已知情况下的星系内部的引力分布了，其中 $M_c$ 是星系核总质量，$M(r)$ 是到半径 r 为止的星系总质量，B 是星系核球半径，R是星系半径：

$$
\begin{cases}
F_c(r) = - \frac{M(r)}{r^2}\\
\phantom{wwwww}+ \int_B^R \rho(x) \frac{r}{x} \left[ \frac{1}{(x - r + 2 H) [2 x + (\pi - 2) r]} - \frac{1}{\pi x^2} \ln \left( \frac{x + r}{x - r + 2 H} \right) \right] dx\\
F_s(r) = - \frac{M_c}{r^2}\\
\phantom{wwwww}- \int_B^r \rho(x) \left[ \frac{\pi - 2}{\pi (r + x)^2} + \frac{2 r - x}{\pi (r - x + 2 H) r^2} + \frac{r - x}{2 \pi r^3} \ln \left( \frac{r + x}{r - x + 2 H} \right) \right] dx\\
\phantom{wwwww}+ \int_r^R \rho(x) \frac{r}{x} \left[ \frac{1}{(x - r + 2 H) [2 x + (\pi - 2) r]} - \frac{1}{\pi x^2} \ln \left( \frac{x + r}{x - r + 2 H} \right) \right] dx
\end{cases}
$$

我们可以假定密度的改变相对而言是较缓和的，从而上述结果可以进一步简化为：

$$
\begin{cases}
F_c(r) = - \frac{M(r)}{r^2}\\
\phantom{wwwwi} - \frac{\rho(r)}{\pi r} \left[ \frac{(R - B) r}{B R} - \frac{B^2 - r^2}{2 B^2} \ln \frac{B + r}{B - r} + \frac{R^2 - r^2}{2 R^2} \ln \frac{R + r}{R - r} -\\
\phantom{wwwwwwwi}\ln \frac{R - r}{B - r} + \frac{\pi}{\pi - 2} \ln \frac{R}{B} - \frac{2}{\pi - 2} \ln \frac{2 R + (\pi - 2) r}{2 B + (\pi - 2) r} \right]\\
F_s(r) = - \frac{M_c}{r^2} - \frac{1}{r^2} \int_B^r \rho(x) dx\\
\phantom{wwwww}- \frac{\rho(r)}{\pi r} \left\{ \frac{5 - 3 \pi}{2} + \frac{(\pi - 2) r}{r + B} - \frac{r}{R} + \frac{(2 \pi - 1) B}{2 r} - \frac{r + B}{r} \mathrm{ArcTanh} \frac{B}{r} + \ln \frac{2 R}{R - r}\\
\phantom{wwwwwi}+ \frac{R^2 - r^2}{2 R^2} \ln \frac{R + r}{R - r} - \frac{r^2 - B^2}{4 r^2} \ln \frac{r + B}{r - B} + \frac{2}{\pi - 2} \ln \frac{\pi R}{2 R + (\pi - 2) r} \right\}
\end{cases}
$$

我们可以对比球形模型中的引力分布：

$$
\begin{cases}
F'_c(r) = - \frac{M(r)}{r^2}\\
F'_s(r) = - \frac{M_c}{r^2} - \int_B^r \rho(x) \frac{1}{r^2} dx
\end{cases}
$$

可见，现在碟形的星环模型会在球壳模型的基础上带来引力修正，且在星环很薄（$H \ll r$）的情况下，修正项与星环的厚度无关。

修正项的特点是，它与星系的具体结构的关系不大，从而如果星环密度随星环半径的增大而减小，那么外延的引力修正效果自然也会下降。

我们当然可以把星环厚度补进去，甚至引入星环密度的导数、二阶导数项，但这些修正就更小了，很难在较大程度上修正星系内的引力强度分布情况。

另一方面，在星系核区与环状悬臂的过渡区，那里恒星会受到传统球壳模型中来自星系核区的向内的引力，以及外层星环所施加的向外的引力，且在恰当的质量分布及形态分布下，两者的大小会很难说——也即，这个过渡区的引力是混沌的，方向不一定。

这点与关于棒旋星系形成的理论模拟结果是吻合的。

而在环状悬臂部分，由于星环质量下降，所以外层受到的引力修正会非常小，直到悬臂末端，即整个星系的最外缘，引力修正才会变得足够大。

体现在星系的转速曲线上，环状星系的转速曲线在过渡区会出现显著的混沌，即速度分布具有较大的偏差；而在外侧，环状星系中的恒星公转速度会比传统模型的更大，并在星系最外缘有较大偏离。

但，无论是传统的连续球壳模型，还是现在的连续星环模型，星系转速曲线在旋臂区域基本还是随着半径的增加而下降的——当然，如果星环质量下降很缓、基本保持不变的话，那星环模型可以给出逐渐上扬的转速曲线，但这个显然与实际情况无关。

----

那么， 如果采用非连续的离散模型呢？

毕竟，所有人都知道，星系中的恒星分布不是真的“连续”的，两颗恒星是彼此分离、独立的，并不是连在一起的“恒星汤”。

最简单的例子，是考虑 $2 N + 1$ 枚恒星等间距放置，且对称位置上的恒星质量相等，这样构成的“星链”可以以相等的角速度绕着中央恒星公转，只要质量分布合适：

$$
\begin{cases}
F_i = \sum_{j = 0}^N \frac{G m_j}{r^2 (i + j)^2} + \sum_{j = 1}^{i - 1} \frac{G m_j}{r^2 (i - j)^2} - \sum_{j = i + 1}^N \frac{G m_j}{r^2 (j - i)^2}\\
F_i = i r \omega^2
\end{cases}
$$

在只有1层（3颗恒星）的情况下，给定角速度时的质量分布为：

$$
m_1 = 4 (A - m_0);\ \ \ \ A = \frac{r^3 \omega^2}{G}
$$

在有2层5颗恒星时，质量分布为：

$$
\begin{cases}
m_1 = \frac{9540}{5201} A - \frac{1476}{5201} m_0\\
m_2 = \frac{5436}{5201} m_0 - \frac{3168}{5201} A
\end{cases};\ \ \ \ A = \frac{r^3 \omega^2}{G}
$$

3层7颗恒星时：

$$
\begin{cases}
m_1 = \frac{6074004816}{617969879} A - \frac{1966412016}{617969879} m_0\\
m_2 = \frac{580328100}{617969879} m_0 - \frac{195559200}{617969879} A\\
m_3 = \frac{5729929200}{617969879} A - \frac{2077228400}{617969879} m_0
\end{cases};\ \ \ \ A = \frac{r^3 \omega^2}{G}
$$

作为比较，传统球壳模型中如果我们认为只有三个球壳加上中央质点，那么此时要得到相等角速度，那么球壳质量分布应该是：

$$
\begin{cases}
M_0 = A\\
M_1 = 7 A\\
M_2 = 19 A
\end{cases}
$$

可见，这里有两个最主要的区别：

1. 离散模型中，转动角速度与中央恒星质量可以没有必然的代数关系，但在球对称的壳层模型中由于高斯定理，两者有了联系，从而系统的自由度被模型降低了；
2. 离散模型中恒星质量可以比球壳模型中对应位置的恒星质量小很多很多。

比如，在上面的例子中，我们就算取离散模型中的中央恒星质量为A，第一层的恒星质量也只需要 6.64691 A ，第二层更是只需要 0.622634 A，第三层为 5.91081 A。由此可见，比壳层模型“经济实惠”多了。

之所以会出现这种情况，部分就和星环模型中所揭示的一样：现在近距离邻近恒星的引力作用是主导项，而它们的行为在壳层这类平均模型中无法被体现出来。

当然，这里所选用的离散模型过于粗糙和Toy，鲁棒性非常糟糕，小小的扰动就能破坏这种共旋刚性。但这也告诉我们：在实际涉及千亿颗恒星的星系自转问题中，传统使用的平均模型很可能会得出具有极大偏差的转速曲线，因为它们将近距离下的引力作用给平均掉了，这样会带来的偏差到底有多大，目前很难说——很有可能暗物质的需求就是被错误选择的数学模型给带来的，而并非真实的物理实在。

> 目前暗物质存在的最大观测支持数据，依然来自星系的转速曲线，可见物质无法提供旋臂范围内不下降、基本保持相等恒星公转线速度。

关于“暗物质实际上只是数学模型选择错误带来的副产品”这样的质疑，2015年时专门研究多体运动与混沌动力学的数学家唐纳德·萨利写过论文[^1]，专门讨论了当前主流数学模型中存在的可疑之处：对星系中海量的离散物体的平均化模型，很可能会将重要的动力学特征给抹去。

[^1]: 12.	D.G. Saari. Mathematics and the ‘dark matter’ puzzle, Am. Math. Mon. 122 (2015) 407–423.

作为比较，笔者用一个简单的程序做了一下模拟。这个模型中恒星被固定在星环内，而且星环内的恒星数量只有5到20颗，通过简单的数密度分布函数与质量分布函数来控制星系结构，所以只能算是一个非常粗糙的模拟。模拟结果如下：

![模拟结果](/image/19321-9dffbd06ee03d998.png)

可见，根据球形壳层模型，星系的转速曲线应该是不可避免地下降的，但在离散模型中却不是，转速曲线的波动很大，但基本维持在一个基本保持水平或以很慢的速度下降，整体而言行为比球壳模型更接近实际转速曲线。尤其，尾部还略有上升，这个结果和星环模型的结果很像。

由此可见，离散模型应该是一个更好的选择——当然，我们这里用来模拟的模型很粗糙，所以绝对不可能作为实锤，只是一个有趣的思路而已。