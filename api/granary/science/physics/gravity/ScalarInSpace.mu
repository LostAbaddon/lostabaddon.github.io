标题：球对称时空中的标量场
作者：LostAbaddon
更新：2021/07/04 01:18:03
关键词：物理 广义相对论

在[《球对称时空中的自由下落物质是否可能构成黑洞》](/article/science/physics/gravity/fallingball2blackhole.mu)中，我们分析了球对称时空中只存在径向运动的点粒子时，时空的形态以及点粒子是否可能落入黑洞的问题。

我们这里来看一个复杂一点的情况：如果在保持球对称的情况下，现在时空中存在的不是点粒子而是标量场，会怎么样？

#	动力学方程

我们先来看Ricci张量与标量：

$$
ds^2 = - f(r,t) dt^2 + h(r,t) dr^2 + r^2 d\Omega^2\\
\begin{cases}
R_{\phi \phi} = \left[ 1 - \frac{1}{h} + \frac{r}{2 h} \left( \frac{h'}{h} - \frac{f'}{f} \right) \right] \sin^2 \theta\\
R_{\theta \theta} = 1 - \frac{1}{h} + \frac{r}{2 h} \left( \frac{h'}{h} - \frac{f'}{f} \right)\\
R_{r r} = \frac{h'}{r h} + \frac{H}{4 f}\\
R_{r t} = \frac{\dot h}{r h}\\
R_{t t} = \frac{f'}{r h} - \frac{H}{4 h}\\
H = 2 \ddot h - 2 f'' + \frac{f'^2 - \dot f \dot h}{f} - \frac{\dot h^2 - f' h'}{h}
\end{cases}\\
R = \frac{2}{r^2} \left( 1 - \frac{1}{h} \right) + \frac{2}{r h} \left( \frac{h'}{h} - \frac{f'}{f} \right) + \frac{H}{2 f h}
$$

下面，引入径向运动的实标量场$\phi (r, t)$与宇宙学常数，从而有：

$$
R_{\mu \nu} - \frac{1}{2} R g_{\mu \nu} + \Lambda g_{\mu \nu} = 8 \pi \partial_\mu \phi \partial_\nu \phi - 4 \pi \left( \partial_\alpha \phi \partial_\beta \phi g^{\alpha \beta} + m^2 \phi^2 \right) g_{\mu \nu}
$$

在考虑弯曲时空中的标量场运动方程：

$$
\frac{1}{\sqrt{-g}} \partial_\mu \left( \sqrt{-g} g^{\mu \nu} \partial_\nu \phi \right) - m^2 \phi = 0
$$

这里我们只考虑径向，即$\phi = \phi(t, r)$。这样，我们就能得到如下这组场和时空的联合运动方程组：

$$
\begin{cases}
m^2 \phi = \partial_\mu \left( g^{\mu \nu} \partial_\nu \phi \right) - \frac{\dot f h + f \dot h}{2 f^2 h} \dot \phi + \frac{\phi'}{f h} + \frac{f' h + f h'}{2 f h^2} \phi'\\
4 \pi \partial_\mu \phi \partial_\nu \phi g^{\mu \nu} = \frac{1}{2} R - 2 \Lambda - 8 \pi m^2 \phi^2\\
1 - \frac{1}{h} + \frac{r}{2 h} \left( \frac{h'}{h} - \frac{f'}{f} \right) = \left( \Lambda + 4 \pi m^2 \phi^2 \right) r^2\\
\frac{h'}{r h} + \frac{H}{4 f} = 8 \pi \phi'^2 + \left( \Lambda + 4 \pi m^2 \phi^2 \right) h\\
\frac{f'}{r h} - \frac{H}{4 h} = 8 \pi \dot \phi^2 - \left( \Lambda + 4 \pi m^2 \phi^2 \right) f\\
\frac{\dot h}{r h} = 8 \pi \phi' \dot \phi\\
H = 2 \ddot h - 2 f'' + \frac{f'^2 - \dot f \dot h}{f} - \frac{\dot h^2 - f' h'}{h}
\end{cases}
$$

整理后可得：

$$
\begin{cases}
m^2 \phi = \frac{1}{h} \phi'' - \frac{1}{f} \ddot \phi + \frac{\dot f}{2 f^2} \dot \phi - \frac{h'}{2 h^2} \phi' - \frac{\dot h}{2 f h} \dot \phi + \frac{f'}{2 f h} \phi' + \frac{1}{f h} \phi'\\
\partial_t \ln h = 8 \pi r \phi' \dot \phi\\
\partial_r \ln \left( \frac{h}{f} \right) = 2 \left( \Lambda + 4 \pi m^2 \phi^2 \right) r h - \frac{2 h - 2}{r}\\
\partial_r \ln (h f) = 8 \pi r \left( \phi'^2 + \dot \phi^2 \frac{h}{f} \right)
\end{cases}
$$

由最后两式可得：

$$
\partial_r \ln h = 4 \pi r \left( \phi'^2 + \dot \phi^2 \frac{h}{f} \right) + \left( \Lambda + 4 \pi m^2 \phi^2 \right) r h - \frac{h - 1}{r}
$$

结合第二式就有：

$$
8 \pi \phi' \dot \phi + 8 \pi r \phi'' \dot \phi + 8 \pi r \phi' \dot \phi' = 4 \pi r \partial_t \left( \phi'^2 + \dot \phi^2 \frac{h}{f} \right) + \left( 8 \pi m^2 \phi \dot \phi \right) r h + \left( \Lambda + 4 \pi m^2 \phi^2 \right) r \dot h - \frac{\dot h}{r}
$$

我们可以参考点粒子与理想流体情况中的结果，取$h$为如下形式：

$$
h(r, t) = \frac{r}{r - 2 M(r, t)}
$$

这样就有：

$$
\begin{cases}
m^2 \phi = \frac{1}{h} \phi'' - \frac{1}{f} \ddot \phi + \frac{\dot f}{2 f^2} \dot \phi - \frac{h'}{2 h^2} \phi' - \frac{\dot h}{2 f h} \dot \phi + \frac{f'}{2 f h} \phi' + \frac{1}{f h} \phi'\\
\frac{ 2 \dot M }{r - 2 M} = 8 \pi r \phi' \dot \phi\\
\partial_r \ln \left( \frac{h}{f} \right) = 2 \left( \Lambda + 4 \pi m^2 \phi^2 \right) \frac{r^2}{r - 2 M} - \frac{4 M}{r (r - 2 M)}\\
\partial_r \ln (h f) = 8 \pi r \left( \phi'^2 + \dot \phi^2 \frac{h}{f} \right)\\
8 \pi \phi' \dot \phi + 8 \pi r \phi'' \dot \phi + 8 \pi r \phi' \dot \phi' = 4 \pi r \partial_t \left( \phi'^2 + \dot \phi^2 \frac{h}{f} \right) + \left( 8 \pi m^2 \phi \dot \phi \right) r h + \left( \Lambda + 4 \pi m^2 \phi^2 \right) r \dot h - \frac{\dot h}{r}
\end{cases}
$$

我们下面主要考虑一个最简单的情况：$\Lambda = m = 0$。

此时方程相对非常简单：

$$
\begin{cases}
h = \frac{r}{r - 2 M}\\
\frac{ 2 \dot M }{r - 2 M} = 8 \pi r \phi' \dot \phi\\
\partial_r \ln f = \frac{2 ( r M' + M )}{r (r - 2 M)}\\
\phi'^2 + \dot \phi^2 \frac{h}{f} = \frac{M'}{2 \pi r (r - 2 M)}\\
\frac{1}{h} \phi'' - \frac{1}{f} \ddot \phi + \frac{\dot f}{2 f^2} \dot \phi - \frac{h'}{2 h^2} \phi' - \frac{\dot h}{2 f h} \dot \phi + \frac{f'}{2 f h} \phi' + \frac{1}{f h} \phi' = 0\\
\frac{2 ( r M' - M )}{r^2 (r - 2 M)} + \frac{H}{4 f} = 8 \pi \phi'^2\\
H = \frac{12 r \dot M^2}{(r - 2 M)^3} + \frac{4 r \ddot M}{(r - 2 M)^2} - 2 f'' + \frac{f'^2}{f} - \frac{\dot f}{f} \frac{2 r \dot M}{(r - 2 M)^2} + \frac{2 (r M' - M)}{r (r - 2 M)} f'
\end{cases}
$$

这里最后的部分构成了一组很复杂的约束条件，但除此之外的部分其实相对而言还是很简单的。

如果将标量场视为“已知”的，那么实际上就可以形式地写出M的表达式为：

$$
\ln (r - 2 M) = H_0(r) + 8 \pi r \int_0^t \phi' \dot \phi dt
$$

其中，部分是运动方程，而另外一些则可以被视为是约束方程，用来消除冗余自由度。

我们下面主要分析它的一些动力学特性。

#	时空演化分析

我们将运动方程中提取并整理出这么几条：

$$
\begin{cases}
\partial_r \ln h = \left[ \Lambda + 4 \pi\left( m^2 \phi^2 + \frac{\phi'^2}{h} + \frac{\dot \phi^2}{f} \right) \right] r h - \frac{1}{r} (h - 1)\\
\partial_r \ln (h f) = 8 \pi \left( \frac{\phi'^2}{h} + \frac{\dot \phi^2}{f} \right) r h\\
\partial_r \ln \left( \frac{h}{f} \right) = 2 \left( \Lambda + 4 \pi m^2 \phi^2 \right) r h - \frac{2 h - 2}{r}\\
\end{cases}
$$

形式上，我们取：

$$
\begin{align}
p(r, t) &= \frac{\phi'^2}{h} + \frac{\dot \phi^2}{f}\\
\rho(r, t) &= \frac{\Lambda}{4 \pi} + m^2 \phi^2 + p
\end{align}
$$

这样就有（第二式的指数部分选择如此形式要求$\Lambda = 0$）：

$$
\begin{align}
h(r, t) &= \frac{r}{r - 4 \pi \int_0^r \rho (x, t) x^2 dx}\\
f(r, t) h(r, t) &= \exp \left[ - 8 \pi \int_r^\infty p (x, t) x h (x, t) dr \right]
\end{align}
$$

由于无穷远处我们可以认定$f = h = 1$，所以很显然，$\rho \ge 0$和$p \ge 0$是可以保证的，只要宇宙学常数$\Lambda$不是负得特厉害就可以。而$h > 0$在遇到最外层的奇异性位置$r_H$之前也必然大于0。

另一方面，从上面我们也可以知道$0 \le f h \le 1$在最外层奇异性位置$r_H(t)$之外（如果存在奇异性的话）处处成立，且它在$r_H$之外随r的增加不减小。因此，不难得出结论：如果$h$在$r_H$处发散，则$f$在此处必然为0，这个位置自然就形成了一个视界。而，从$h$的形式表达可知，视界的形成甚至都不必须要求$\phi$、$\phi'$或$\dot \phi$发散。

##	逼近发散——黑洞是否可能在有限未来出现？

我们下面主要将视线集中在可能会出现奇异性的区域，在这块区域中$f \rightarrow 0$、$h \rightarrow \infty$、$f h$有限，我们将这个区域称为“__近奇异区域__”。

这样的区域有可能在未来会演化出真正的奇异性，但也可能不会，我们下面就要看是否可能演化出奇异性来。

我们可以将运动方程简化为：

$$
\begin{cases}
m^2 \phi = \frac{1}{h} \phi'' - \frac{1}{f} \ddot \phi + \frac{1}{f h} \phi' + \frac{\dot \phi}{2 f} \partial_t \ln \frac{f}{h} + \frac{\phi'}{2 h} \partial_r \ln \frac{f}{h}\\
\partial_r \ln h = 4 \pi r \left( \phi'^2 + \dot \phi^2 \frac{h}{f} \right) + \left( \Lambda + 4 \pi m^2 \phi^2 \right) r h - \frac{h}{r}\\
\partial_r \ln f = 4 \pi r \left( \phi'^2 + \dot \phi^2 \frac{h}{f} \right) - \left( \Lambda + 4 \pi m^2 \phi^2 \right) r h + \frac{h}{r}\\
\partial_t \ln h = 8 \pi r \phi' \dot \phi
\end{cases}
$$

其中第一个场运动部分可以进一步化简为：

$$
\begin{align}
m^2 \phi &= - \frac{1}{f} \ddot \phi + \frac{\dot \phi}{2 f} \partial_t \ln \frac{f}{h}\\
\therefore \ddot \phi & \approx \frac{\dot \phi}{2} \partial_t \ln \frac{f}{h}\\
\therefore \dot \phi^2 & \approx R(r)^2 \frac{f}{h}
\end{align}
$$

也就是说，场本身在这个近奇异区域中，标量场几乎被冻结而不会发生改变。

将这个结果代回则可得：

$$
\begin{align}
\partial_r \ln (f h) &= 8 \pi r \left( \phi'^2 + R^2 \right)\\
\partial_t \sqrt{h} &= 4 \pi r R \phi' \sqrt{f}
\end{align}
$$

在近奇异区域中，无论是$\sqrt{f}$、$\phi'$还是待定函数$R(r)$都不发散，而由于$R(r)$不含时，所以要在有限时间内得到$\sqrt{h}$的结果，只能寄希望于$\phi'$在有限时间内可以发散。因此我们考虑近奇异区域中$\phi'^2$趋向无穷的小区域，并考虑其中$\phi'$的随时演变：

$$
\begin{align}
\because \dot \phi & = R \sqrt{\frac{f}{h}}\\
\therefore \dot \phi' &= \sqrt{\frac{f}{h}} \left\{ R' + R h \left[ \frac{1}{r} - \left( \Lambda + 4 \pi m^2 \phi^2 \right) r \right] \right\}\\
&\approx \sqrt{f h} R \left[ \frac{1}{r} - \left( \Lambda + 4 \pi m^2 \phi^2 \right) r \right]
\end{align}
$$

因此我们下面主要看这两个方程：

$$
\begin{cases}
\partial_r \ln \sqrt{f h} \approx 4 \pi r \phi'^2\\
\dot \phi' \approx \sqrt{f h} R \left[ \frac{1}{r} - \left( \Lambda + 4 \pi m^2 \phi^2 \right) r \right]
\end{cases}
$$

我们取$\phi'_M$为$\left| \phi' \right|$在我们所去近奇异区域中的的最大值，而$r_M$为取到该最大值时的$r$值，而$R_M = R(r_M)$。同理，取$\phi'_m$为$\left| \phi' \right|$的最小值，相应就有$r_m$和$R_m$。

这样，我们能将第一个方程改写为：

$$
\begin{align}
& 4 \pi r \left( \phi'_M \right)^2 > \partial_r \ln \sqrt{f h} > 4 \pi r \left( \phi'_m \right)^2\\
\therefore & F(t) e^{2 \pi \left( \phi'_M \right)^2 r^2} > \sqrt{f h} > F(t) e^{2  \pi \left( \phi'_m \right)^2 r^2}
\end{align}
$$

这么一来，$\phi'$的最大点与最小点的演化方程就可以写为：

$$
\begin{align}
\dot \phi'_m & > F(t) e^{2  \pi \left( \phi'_m \right)^2 r_m^2} R_m \left[ \frac{1}{r_m} - \left( \Lambda + 4 \pi m^2 \phi_m^2 \right) r_m \right]\\
\dot \phi'_M & < F(t) e^{2  \pi \left( \phi'_M \right)^2 r_M^2} R_M \left[ \frac{1}{r_M} - \left( \Lambda + 4 \pi m^2 \phi_M^2 \right) r_M \right]
\end{align}
$$

我们下面考虑如下微分方程：

$$
f'(t) = A(t) e^{B f(t)^2}
$$

其解为：

$$
f = \frac{1}{\sqrt{B}} \mathrm{erf}^{-1} \left[ t_0 + 2 \sqrt{\frac{B}{\pi}} \int_{0}^t A(z) dz \right]
$$

对于逆误差函数$\mathrm{erf}^{-1}$，它的定义域是$(-1, 1)$，当取$\pm 1$时函数发散。利用这个结果，我们考虑$m = 0$的情况可得：

$$
\begin{align}
\phi'_m (t, r) & > \frac{1}{\sqrt{2 \pi} r_m} \mathrm{erf}^{-1} \left[ t_1 (r) + 2 \sqrt{2} R_m \left( 1 - \Lambda r_m^2 \right) \int_{0}^t F(z) dz \right]\\
\phi'_M (t, r) & < \frac{1}{\sqrt{2 \pi} r_M} \mathrm{erf}^{-1} \left[ t_2 (r) + 2 \sqrt{2} R_M \left( 1 - \Lambda r_M^2 \right) \int_{0}^t F(z) dz \right]
\end{align}
$$

由于$\sqrt{f h} > 0$，否则时空退化，所以$F(t) > 0$。当在近奇异区中$(1 - \Lambda r^2) > 0$时，$R \phi'$会增大，这表示在$\sqrt{h}$的峰值之外，$\sqrt{h}$和$\phi'$都会随着r的增加而减小，而$\dot \phi$则保持为正；反之，在峰值内侧，$\sqrt{h}$和$\phi'$都随r的减小而减小，$\dot \phi$依然保持为正。这就是说在峰值的两侧场在不断增大，但整个峰在变得越来越陡峭，最终当参数部分达到1时这个峰就发散了——坐标奇异性的视界就这么出现了。

但，如果在近奇异区中$(1 - \Lambda r^2) < 0$会发生什么？这个时候峰值两侧的场会越来越小，但同时峰依然会越来越陡峭。也就是说，在前一个情况中，峰的两侧会聚集标量场；而在后一个情况中，场被抽到峰上中。

现在就只剩下最后一个问题：逆误差函数的参数部分，是否真的可能达到1这个发散边界？

事实上，由于整个时空是满足球对称条件的，所以我们如果直接使用[Birkhoff定理](https://en.wikipedia.org/wiki/Birkhoff%27s_theorem_(relativity)的话，那么$f h$应该是常数，因此有：

$$
\begin{align}
F(t) & \sim e^{- 2 \pi r^2 \phi'^2}\\
\phi' (t, r) & \sim \frac{1}{\sqrt{2 \pi} r} \mathrm{erf}^{-1} \left[ t_2 (r) + 2 \sqrt{2} R \left( 1 - \Lambda r^2 \right) \int_{0}^t F(z) dz \right]
\end{align}
$$

也就是说，逆误差函数的参数部分将永远无法在有限时间t内达到发散边界值1。

因此，近奇异区域中的峰值的确会越来越高，但却永远不会在有限时间内达到发散。

也就是说，在这个球对称时空中，可能会存在一个标量场“高度凝结”、时空度规非常扭曲、接近发散的临界区域，可以被称之为“灰洞”。

这些结论和点粒子及理想流体的情况非常相似。