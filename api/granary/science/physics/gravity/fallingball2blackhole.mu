标题：球对称时空中的自由下落物质是否可能构成黑洞
更新：2019.04.17 23:29:15

> 干活干得累了，就想找点别的事情做，来缓缓脑子，于是就想到了这个问题，也算是趁着最近黑洞的热潮。
这篇计算的内容，很多年前晃晃提到过，当时和晃晃在群里聊过好几次，但今天我没找到他的论文，所以就自己手算一遍了，就当是习题练手了，哈哈。

---

球对称时空的度规可以采用如下形式：

$$
ds^2 = - f(r,t) dt^2 + 2 l(r,t) dt dr + h(r,t) dr^2 + r^2 d\Omega^2
$$

我们总可以通过坐标变换将其转换为如下形式：

$$
ds^2 = - f(r,t) dt^2 + h(r,t) dr^2 + r^2 d\Omega^2
$$

Birkhoff 定理告诉我们，任何球对称且只有径向物质与能量流动的时空，其外部真空部分时空的度规都是史瓦西度规。我们现在要计算在有物质或能流的情况下的度规。

下面我们来计算相关的几何量。

$$
\begin{cases}
g_{tt} = - f\ ;\ g_{rr} = h\\
g^{tt} = - f^{-1}\ ;\ g^{rr} = h^{-1}
\end{cases}\\
\begin{cases}
\Gamma^\phi_{\phi \theta} = \tan^{-1} \theta\ ;\ \Gamma^\phi_{\phi r} = \frac{1}{r}\\
\Gamma^\theta_{\phi \phi} = - \sin \theta \cos \theta\ ;\ \Gamma^\theta_{\theta r} = \frac{1}{r}\\
\Gamma^r_{\phi \phi} = - \frac{r}{h} \sin^2 \theta\ ;\ \Gamma^r_{\theta \theta} = - \frac{r}{h}\\
\Gamma^r_{r r} = \frac{h'}{2 h}\ ;\ \Gamma^r_{t t} = \frac{f'}{2 h}\\
\Gamma^t_{r r} = \frac{\dot h}{2 f}\ ;\ \Gamma^t_{t t} = \frac{\dot f}{2 f}\\
\Gamma^r_{r t} = \frac{\dot h}{2 h}\ ;\ \Gamma^t_{t r} = \frac{f'}{2 f}
\end{cases}\\
\begin{cases}
\Gamma^\mu_{\mu \phi} = 0\\
\Gamma^\mu_{\mu \theta} = \Gamma^\phi_{\phi \theta} = \tan^{-1} \theta\\
\Gamma^\mu_{\mu r} = \frac{2}{r} + \frac{h'}{2 h} + \frac{f'}{2 f}\\
\Gamma^\mu_{\mu t} = \frac{\dot h}{2 h} + \frac{\dot f}{2 f}
\end{cases}\\
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

有了上面得到的Ricci曲率张量和Ricci标量，我们就可以通过时空上的能动张量和爱因斯坦场方程来计算时空曲率了：

$$
R_{\mu \nu} - \frac{1}{2} R g_{\mu \nu} = 8 \pi T_{\mu \nu}
$$

下面的问题就是，时空上的能动张量是什么？

能动张量有些最常见的形式，比如下面这个：

$$
T^{tt} = \rho\phantom{wwwwa}\\
T^{ti} = T^{it} = P^i\\
T^{ij} = S^{ij}\phantom{wwwi}
$$

其中 $\rho$ 是物质密度，$P^i$ 是能流密度矢量，$S^{ij}$ 是压强-剪切应力张量。

在球对称且只有径向物质运动的情况中，能流密度矢量应该只有r分量，而剪切应力张量则只有径向和切向两个分量。

另一种常见的情况，是平衡态理想流体的能动张量：

$$
T^{\mu \nu} = (\rho + p) U^\mu U^\nu + p g^{\mu \nu}
$$

其中 $U^\mu$ 是流体每个质点的世界线切矢，满足：

$$
g_{\mu \nu} U^\mu U^\nu = k = -1 \ or\ 0 \ or\ 1
$$

其中普通物质是-1，光速运动物质是0，快子物质是1。

我们一般还可以将压强和密度通过物态方程结合起来，比如在宇宙学（FRW度规）中我们一般有：

$$
p = \alpha \rho^{1 + \omega}
$$

此外还有一些常见的场，比如实标量场：

$$
T^{\mu \nu} = \partial^\mu \phi \partial^\nu \phi - \frac{1}{2} \left( \partial_\sigma \phi \partial^\sigma \phi + m^2 \phi^2 \right) g^{\mu \nu}
$$

以及规范矢量场：

$$
T^{\mu \nu} = F^\mu_{\ \sigma} F^{\nu \sigma} - \frac{1}{4} F^{\alpha \beta} F_{\alpha \beta} g^{\mu \nu}
$$

现在回到场方程中，我们有：

$$
\begin{cases}
8 \pi T_{t t} = R_{t t} + \frac{f}{2} R\\
8 \pi T_{r r} = R_{r r} - \frac{h}{2} R\\
8 \pi T_{t r} = R_{t r}\\
8 \pi T_{\theta \theta} = R_{\theta \theta} - \frac{r^2}{2} R
\end{cases}
$$

我们考虑最常见的能动张量形式，其它能动张量都可以变形为它的形式。由于各分量独立且保持球对称、只有径向运动，所以可以不失一般性地取能动张量为：

$$
\begin{cases}
T_t^t = \rho(t, r)\\
T_t^r = \sqrt{\frac{f(t, r)}{h(t, r)}} P(t, r)\\
T_r^r = p(t, r)\\
T_\theta^\theta = q(t, r)\\
\end{cases}
$$

所以有：

$$
\begin{cases}
8 \pi \rho = \frac{1}{f} R_{t t} + \frac{1}{2} R\\
8 \pi p = \frac{1}{h} R_{r r} - \frac{1}{2} R\\
8 \pi \sqrt{f h} P = R_{t r}\\
8 \pi q = \frac{1}{r^2} R_{\theta \theta} - \frac{1}{2} R
\end{cases}\\
\therefore \begin{cases}
8 \pi r h (\rho + p) = \partial_r \ln (f h)\\
8 \pi P = \frac{1}{\sqrt{f h}} \frac{\dot h}{r h}\\
8 \pi q = \frac{1}{2 r h} \left( \frac{f'}{f} - \frac{h'}{h} \right) - \frac{H}{4 f h}
\end{cases}
$$

其中，利用第一和第三个结果可以简化H和R：

$$
\begin{cases}
H = 2 \ddot h - 2 f'' + 8 \pi r h (\rho + p) (f' - \dot h)\\
R = \frac{2}{r^2} \left( 1 - \frac{1}{h} \right) - \frac{H}{2 f h} - 32 \pi q
\end{cases}
$$

对第一个关系，我们可以进一步获得如下结果：

$$
\ln (f h) = C(t) + 8 \pi \int_0^r z h(z, t) [ \rho(z, t) + p(z, t) ] dz
$$

我们取无穷远处为渐近平直时空，所以上面的结果可以进一步写为：

$$
\begin{cases}
f(r, t) h(r, t) = \lambda(r, t) = \exp \left[ \Lambda(r,t) - \Lambda(\infty,t) \right]\\
\Lambda(r,t) = 8 \pi \int_0^r z h(z, t) [ \rho(z, t) + p(z, t) ] dz
\end{cases}
$$

由于物质与能流只会局限在一个有限大小的球形区域内，所以上面的 $\Lambda(\infty, t)$ 可以认为必然是有限值，从而结果有意义。

我们现在已经有了 fh 的表达，下面再来单独求 h。

我们可以构造一个从无穷远观测者看来的球形区域内的“总能量”函数：

$$
M(r, t) = 4 \pi \int_0^r z^2 \rho(z, t) dz
$$

因此我们可以利用该函数给出密度函数与能流矢量（径向之外为零）：

$$
\rho(r, t) = \frac{M'}{4 \pi r^2}\phantom{wwwi}\\
P(r, t) = - \sqrt \frac{h}{f} \frac{\dot M}{4 \pi r^2}
$$

当然，它必须符合能动张量的演化方程：

$$
\nabla_\mu T_\nu^\mu = 0 = \partial_\mu T_\nu^\mu + \Gamma^\mu_{\mu \lambda} T_\nu^\lambda - \Gamma^\lambda_{\mu \nu} T_\lambda^\mu\\
$$

将其代入之前的结果，就有：

$$
\partial_t h^{-1} = - \frac{2 \dot M}{r}\\
\therefore h = \left[ C(r) - \frac{2 M}{r} \right]^{-1}
$$

根据 Birkhoff 定理，当 r 足够大、远离物质与能流区的地方，我们应该有 $h = \left( 1 -  \frac{2 M}{r} \right)^{-1}$，所以这里就能确定下来 h 了：

$$
h(r, t) = \left( 1 - \frac{2 M}{r} \right)^{-1}
$$

从而有：

$$
\begin{cases}
f(r, t) = \lambda(r, t) \left[ 1 - \frac{2 M(r, t)}{r} \right]\\
h(r, t) = \left[ 1 - \frac{2 M(r, t)}{r} \right]^{-1}\\
M(r, t) = 4 \pi \int_0^r z^2 \rho(z, t) dz\\
\Lambda(r,t) = 8 \pi \int_0^r z \left[ 1 - \frac{2 M(z, t)}{z} \right]^{-1} [ \rho(z, t) + p(z, t) ] dz\\
\lambda(r, t) = \exp \left[ \Lambda(r,t) - \Lambda(\infty,t) \right]\\
\end{cases}
$$

很显然，如果物质与能流只在 $r < r_0$ 的区域存在，则上述结果就自动回到了 Birkhoff 定理。

这里，物质密度分布 $\rho$ 和径向压强分布 $p$ 都是任意的，因此原则上上述度规适合所有球对称且物质与能流只在径向有变化的时空，包括霍金辐射的情况。

进一步，当 $h(r, t) = 0$ 时，显然就出现了我们所理解的黑洞视界面（坐标表观奇异性）了。由于现在方程 $r = 2 M(r,t)$ 在任意时刻都可能有不止一个解，所以我们取其中最大的，作为 t 时刻的黑洞视界面：

$$
r_H(t) = \max \{ r | r = 2M(r, t) \}
$$

下面，我们就要来看一个很有趣的问题：这样的时空中，假定物质是球对称分布，且“自由”下落的，那么最终这些物质是否可能形成黑洞呢？

在不考虑黑洞的霍金辐射的情况下，虽然从无穷远观测者看来，上述自由下落的物质永远都在黑洞视界面之外，但这是由于坐标本身的表观奇异性所导致的，从自由落体的物质自身来看，它会在有限时间内穿越视界，并在有限时间内抵达黑洞的奇点。

但，有趣就有趣在有霍金辐射的情况下。

此时，从无穷远观测者看来，黑洞会在有限时间后辐射完自身所有的物质最终消失，而只要视界面存在，自由落体的物质在无穷远观测者看来，就无法在有限时间内抵达视界——所以问题来了，黑洞在有限时间 $t_v$ 后消失，而在任意有限时间内，物质都无法抵达黑洞的视界，所以**从无穷远观测者看来，落向黑洞的物质在黑洞蒸发完之前，都无法抵达黑洞**。

关键就是，在上述时空度规下，自由落体的物质从无穷远观测者看来，是不是在任何情况下都无法抵达黑洞的视界呢？只要这个命题成立，那就说明了直到黑洞蒸发，外界物质都无法抵达黑洞视界，更谈不上进入黑洞了。

由于任何物质的运动速度都无法超越光速，所以我们只要考虑这个时空中下落的光线是否可以在有限时间抵达黑洞视界即可。

下落光线的切矢为：

$$
\frac{d r}{d t} = - \sqrt{\lambda(r(t), t)} \left[ 1 - \frac{2 M(r(t), t)}{r(t)} \right]
$$

由于我们知道下面这种形式的运动，r无法在有限时间内从 $r_0 > 1$ 的位置抵达视界 $r_H = 1$：

$$
\frac{d r}{d t} = - \left( 1 - \frac{1}{r} \right)
$$

所以我们设法构造出与此类似的结构。

取 $y(t) = \frac{r(t)}{2 M(t)}$、$x(t) = \frac{t}{2 M(t)}$，从而有（下面 $'$ 表示对 t 求导）：

$$
\frac{d y}{d x} = \frac{y'}{x'} = r' \frac{M}{M - t M'} - \frac{r M'}{M - t M'}\\
= - \sqrt{\lambda} \left( 1 - \frac{1}{y} \right) \frac{M}{M - t M'} - \frac{2 M M'}{M - t M'} y\\
$$

其中，$\lambda(r,t)$是一个在0到1之间的函数，因此 $\sqrt \lambda < 1$。而另一方面，$M$ 是下落光线在 t 时刻的位置 $r(t)$ 内的所有物质与能量的总和，由于没有物质的下落速度可以快过光速，因此即便没有物质向外远离黑洞（此时显然 $M' < 0$），所有物质都跟着光下落，也必然有 $M' \le 0$，因此我们有：

$$
\because \begin{cases}
\sqrt \lambda < 1\\
M' \le 0
\end{cases}\phantom{wwwwwwwwwwwwi}\\
\therefore \frac{d y}{d x} \ge - \sqrt{\lambda} \left( 1 - \frac{1}{y} \right) \frac{M}{M - t M'}\\
\ge - \sqrt{\lambda} \left( 1 - \frac{1}{y} \right)\phantom{wwa}\\
\ge - \left( 1 - \frac{1}{y} \right)\phantom{wwwwi}\\
$$

由于 $\frac{dy}{dx} = - \left( 1 - \frac{1}{y} \right)$ 都无法在有限x内让y减小到1，因此上述方程更不可能在有限x内让y减小到1。而，这是光速下落的物质，它都无法在有限时间内抵达视界，那么任何实际的物质都更不可能在有限时间内抵达视界了。

也就是说，在上述时空中，无穷远观测者看来，任意径向自由下落的物质（实际上为了保持时空度规依然是上述形式，更准确的说法是任意径向下落、无旋转的球壳物质层，无论是否包含相互作用），都无法在有限时间内抵达黑洞视界——而，在考虑霍金辐射的情况下，黑洞视界会在有限时间内消失，所以这就是说：

**任意径向下落、无旋转的球壳物质层，无论是否包含相互作用，都无法在黑洞蒸发消失前抵达黑洞视界。**

要打破这一结论，除非让 $\lambda > 1$ 或者 $M' > 0$，这就是说，要有比光下落速度更快的快子物质，或者在下落物质球壳外存在一个区域 $\rho + p < 0$，这样前者能让 $M' > 0$ 而后者能让 $\lambda > 1$。

而这两个要求就是说：要么出现快子物质，要么存在违反能量条件（主能量条件、强能量条件、弱能量条件和类光能量条件都要违反）的物质或场。

而这两个情况，都是很科幻的黑科技啊。

当然，不得不说的是，既然都考虑霍金辐射了，我们也要考虑到：虚粒子由于不在壳，所以是有可能违背 $M' \le 0$ 这个约束的。而真空零点能等极限情况下的量子作用也有可能违反能量条件，所以在黑洞视界面附近的极端量子引力环境中，很有可能会突破上述限制，让物质抵达甚至进入黑洞内部。

回到经典的范畴中。

如果我们考虑在黑洞出现之前的物质聚集塌缩过程，整个过程中保持球对称，那么其实这就是说，黑洞根本无法形成：物质的聚集过程由于引力场的作用，将永远无法让物质达到足够聚合的程度，使黑洞形成。也就是说，对任意位置 r 而言，其内部物质球的质量对应的临界半径 $r_H(r)$ 将永远小于 r，因为物质要进一步聚集，就必须要完成上述“在有限时间内抵达临界半径”的任务，而这一任务已经被证明是做不到的了。

另一方面，对于非球对称的情况（比如旋转的 Kerr 时空，或者别的更加奇葩的时空），这里不好说。