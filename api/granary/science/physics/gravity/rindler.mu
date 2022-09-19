标题：1+1维变速运动者的时空
关键词：物理
更新：2022/09/19 10:06:42

让我们考虑一维时间与一维空间构成的1+1维时空中的变速运动问题，1+3维时空中如果运动局限在一条直线上的话，其实也可以化为这种特殊形式。

我们取初始状态下的时空是标准二维闵氏时空，其上的度量可以写为$ds^2 = dt^2 - dx^2$。在这一背景下，我们将运动描述为$\{T(\tau), X(\tau)\}$，其中参数$\tau$是仿射参数，满足：$\left( \frac{dT}{d\tau} \right)^2 - \left( \frac{dX}{d\tau} \right)^2 = 1$。

这样，当物体在经过內秉时间$\tau$后运动到位置$\{T(\tau), X(\tau)\}$时，它的“共时面”为下述直线：

$$
\begin{cases}
t = T(\tau) + \lambda X'(\tau)\\
x = X(\tau) + \lambda T'(\tau)
\end{cases}\tag{1}
$$

从而在这条直线上的点$\{t, x\}$被映射为$\{ \tau, \lambda \}$，这便是该点在变速运动者坐标系中的新坐标。

根据方程组(1)，我们可以解出如下形式解：

$$
\begin{cases}
(t - T) T' = (x - X) X'\\
\lambda = \frac{x - X}{T'}
\end{cases}\tag{2}
$$

这里关键是要求出第一个方程，只要求出该方程，那么第二个方程就很容易求出。而，对于第一个方程，它有可能会包含不止一个解，或者在某些情况下没有解，这些都是__“病态”__的行为，但本质上都是__“不恰当”__的坐标变换导致的。当然，这种病态行为是坐标系的表观病态，并不表示时空出现问题。

下面来看几个具体的例子。

让我们考虑一个最简单的情况：匀速直线运动。此时我们有：

$$
\begin{cases}
T(\tau) = \frac{\tau}{\sqrt{1 - v^2}} \quad T' = \frac{1}{\sqrt{1 - v^2}}\\
X(\tau) = \frac{v \tau}{\sqrt{1 - v^2}} \quad X' = \frac{v}{\sqrt{1 - v^2}}
\end{cases}
$$

代入左边变换方程组(2)可得：

$$
\begin{cases}
\tau = \frac{t - x v}{\sqrt{1 - v^2}}\\
\lambda = \frac{x - t v}{\sqrt{1 - v^2}}
\end{cases}
$$

这就是洛伦兹坐标变换，一点也不意外。

接着，让我们来看一种在初始背景时空中的“近匀加速运动”。之所以说是“近匀加速”，因为实际上如果真的保持匀加速的话，那么观测者最终会超过光速，这显然是病态的。我们取变速观测者的轨迹为：

$$
\begin{cases}
T(\tau) = \frac{\sinh (\omega \tau)}{\omega}\\
X(\tau) = \frac{\cosh (\omega \tau) - 1}{\omega}\\
T'(\tau) = \cosh (\omega \tau)\\
X'(\tau) = \sinh (\omega \tau)
\end{cases}
$$

因此从我们选定的背景时空看来，其运动速度为$\tanh (\omega \tau)$，当$\tau$很小时就是匀加速，所以被称为“近匀加速”。

将运动方程代入坐标变换方程组(2)可得：

$$
\begin{cases}
\tau = \frac{1}{\omega} \mathrm{arctanh} \left( \frac{\omega t}{\omega x + 1} \right)\\
\lambda = \frac{1}{\omega} \left[ \mathrm{sign} (\omega x + 1) \sqrt{(\omega x + 1)^2 - \omega^2 t^2} - 1 \right]
\end{cases}
$$

显然，当$\left| \frac{\omega t}{\omega x + 1} \right| \ge 1$时，这个时空将出现病态，也即$x \in \left[ - t - \frac{1}{\omega}, t - \frac{1}{\omega} \right]$这个区域是一个__“无法被观测”__的__病态坐标时空区域__。事实上，这个区域在坐标变换后，从变速观测者看来它会整个收缩为$\lambda = - \frac{1}{\omega}$这条线，其中的所有细节都会被抹除。

现在，如果我们令$(t, x)$位置上有一个速度为$v$的物体，那么在变速观测者看来，它的视速度为：

$$
\begin{align}
v' &= \frac{\omega t - \omega x v - v}{\omega t v - \omega x - 1} \sqrt \Delta\\
\Delta &= (\omega x + 1)^2 - (\omega t)^2
\end{align}
$$

当$\sqrt \Delta \ge \left| \frac{\omega t v - (\omega x + 1)}{(\omega x + 1) v - \omega t} \right|$时，就会出现一个很有趣的现象，那就是物体的视速度$v' \ge 1$，即物体*看起来*超光速了。而这个视超光速区域范围条件其实是很宽泛的，比如对于$v=0$的情况，这个范围为：

$$
\begin{cases}
\omega t > 1\\
(\omega x + 1)^2 > \frac{(\omega t)^4}{(\omega t)^2 - 1}
\end{cases}
$$

这是一个相当大的区域。

这个时空的度规则可以写为：

$$
ds^2 = \Delta d\tau^2 - d\lambda^2 = (\omega \lambda + 1)^2 d\tau^2 - d\lambda^2
$$

事实上，这就是X轴平移过的[Rindler度规](https://en.wikipedia.org/wiki/Rindler_coordinates)：

$$
ds^2 = a^2 x^2 dt^2 - (dx^2 + dy^2 + dz^2)
$$

这个度规，就如之前分析运动时那样，存在坐标系固有的表观奇异性，也就是在$\omega \lambda = -1$的地方。同样，原坐标系中存在一个$\Delta < 0$的区域，那里在Rindler时空中是不存在的，它们只能存在于这个坐标系的“复时空”部分，所以我们会得出这个区域中的信息无法离开、这个区域也无法接受来自外界的信息，这样的结论。事实上，在这个表观视界区域上，所有物质的运动都会被接近甚至等于0的$\Delta$都给“冻结住了”。

事实上，如果我们在原始时空背景中将变速观测者的世界线、以及这根世界线每一点上的共时面（也就是法线的垂面）都画出来，我们会发现背景时空中有一部分是这族共时面始终没有扫描过的，这一区域就是$\Delta < 0$的区域，所以它自然是不可能出现在Rindler时空中的。而当$\tau$足够大的时候，世界线实际上已经非常接近光锥面，因为速度已经大到足够接近光速，所以此时在它看来外部世界都被冻结，这也就非常正常了。

由于这个表观视界的存在，我们可以考虑在这个位置上的“霍金辐射”，这一现象事实上就是[Unruh效应](https://en.wikipedia.org/wiki/Unruh_effect)。也即，从变速运动者看来，它的时空中会出现一个表观视界，而这个表观视界是有温度的，这一温度和变速运动者的加速度直接相关。