标题：科普：计算拉格朗日点

关键词：物理 科普

更新：2021/08/20 13:20:39

我们都知道，当两颗星体在绕着彼此公转时，存在一些三力平衡点，即来自两个星体的引力，以及绕着这两个星体的公转中心一起公转而产生的离心力，这三个力彼此达到平衡的位置。这样的点被称为“拉格朗日点”。

通过简单的分析就可以知道，这样的点总共有五个，其中三个位于两星体的连线上，另外两个在连线外。

我们下面就来计算一下。

>	在不妨碍计算的情况下，我们可以取两星体的公转中心为坐标原点，从而两星体的共同运动我们这里就不考虑了。

[toc]

# 连线上的拉格朗日点

先考虑连线上的三个点，它有可以分为两个情况：两个星体之外，以及两个星体之内。前者明显应该有两个点，后者就一个点。

所以，我们先计算两星体之外的情况，不妨就考虑在A星外侧，对B星外侧只要交换AB下标即可：

$$
\begin{cases}
\frac{G M_A m}{(r - r_A)^2} + \frac{G M_B m}{(r + r_B)^2} = m r \omega^2\\
\frac{G M_A M_B}{(r_A + r_B)^2} = M_A r_A \omega^2 = M_B r_B \omega^2\\
\end{cases}\\
\therefore \omega^2 = \frac{G M_B}{(r_A + r_B)^2 r_A} = \frac{G M_A}{(r_A + r_B)^2 r_B}\\
\therefore \frac{(r_A + r_B)^2 r_B}{(r - r_A)^2} + \frac{(r_A + r_B)^2 r_A}{(r + r_B)^2} = r
$$

容易发现，这是一个五次方程，几乎不可能求解——五次及以上一次方程是没有代数求根公式的，当然你可以用特殊函数来构造递归式的求解公式。

因此，我们可以考虑一个**简化了的情况**，即我们考虑$M_B \ll M_A$的情况，那么此时就有：

$$
\begin{align}
\therefore \ & r_A = r_B \frac{M_B}{M_A} \ll r_b\\
\therefore \ & \frac{r_B^3}{r^2} + \left( \frac{r_B^2}{(r + r_B)^2} + \frac{2 r_B^2 (r + r_B)}{r^3} \right) r_A \approx r\\
\therefore \ & r = r_B + d, \ d \approx 0 \Rightarrow\\
& d \approx \frac{17}{12} r_A = \frac{17 M_B}{12 M_A} r_B\\
\therefore \ & r \approx r_B + \frac{17 M_B}{12 M_A} r_B = 2 r_A + r_B - \frac{7 M_B}{12 M_A} r_B
\end{align}
$$

这个位置就是__第三拉格朗日点__，它到大质量星体A的距离与小重量星体B到A的距离几乎相等（就差A到AB公转中心距离的7/12）。

接着，我们考虑B外的三力平衡点：

$$
\begin{align}
\therefore \ & \frac{r_B^2 r_A}{(r - r_B)^2} + \frac{(r_B + 2 r_A) r_B^2}{r (r + 2 r_A)} = r\\
\therefore \ & r = r_B + d, \ d \approx 0 \Rightarrow\\
& \frac{r_B^2 r_A}{d^2} \approx \frac{3 r_B + 4 r_A}{r_B + 2 r_A} d\\
\therefore \ & d \approx \sqrt[3]{\frac{M_B}{3 M_A}} r_B\\
\therefore \ & r \approx r_B + \sqrt[3]{\frac{M_B}{3 M_A}} r_B
\end{align}
$$

这就是第二拉格朗日点。

而如果是在A、B内侧，和外侧一样，我们同样是要面对一个五次方程，所以我们还是只考虑$M_B \ll M_A$的情况，此时方程为：

$$
\begin{align}
\therefore \ & \frac{(r_B + 2 r_A) r_B^2}{r (r + 2 r_A)} - \frac{r_B^2 r_A}{(r_B - r)^2} \approx r\\
\therefore \ & r = r_B - d, \ d \approx 0 \Rightarrow\\
& \frac{3 r_B + 4 r_A}{r_B + 2 r_A} d \approx \frac{r_B^2 r_A}{d^2}\\
\therefore \ & d \approx \sqrt[3]{\frac{M_B}{3 M_A}} r_B\\
\therefore \ & r \approx r_B - \sqrt[3]{\frac{M_B}{3 M_A}} r_B
\end{align}
$$

这就是第一拉格朗日点，它到B的距离与第二拉格朗日点到B的距离相等。

到这里，我们就得到了AB连线上所有三个拉格朗日点了。

# 连线外的拉格朗日点

在AB连线之外，还有两个拉格朗日点。

首先，很显然这两个点只能位于AB公转平面内，否则必然存在指向公转平面的引力分量，而该分力不可能由公转离心力抵消，虽然依然可能有稳定解，但却不可能是拉格朗日点。

因此，我们现在就在AB公转平面这个二维平面内解这个问题，我们取AB连线为X轴，B在正向：

$$
\begin{align}
\because \ & \begin{cases}
R_A = \sqrt{(r \cos \theta + r_A)^2 + (r \sin \theta)^2}\\
R_B = \sqrt{(r \cos \theta - r_B)^2 + (r \sin \theta)^2}
\end{cases}\\
\therefore \ & \begin{cases}
\frac{G M_A m}{R_A^3} (r \cos \theta + r_A) + \frac{G M_B m}{R_B^3} (r \cos \theta - r_B) = m r \omega^2 \cos \theta\\
\frac{G M_A m}{R_A^3} r \sin \theta + \frac{G M_B m}{R_B^3} r \sin \theta = m r \omega^2 \sin \theta
\end{cases}\\
\therefore \ & \frac{G M_A}{R_A^3} + \frac{G M_B}{R_B^3} = \omega^2\\
\therefore \ & \frac{G M_A}{R_A^3} r_A = \frac{G M_B}{R_B^3} r_B\\
\therefore \ & R_A = R_B\\
\therefore \ & R_A = R_B = r_A + r_B
\end{align}
$$

也就是说，最后两个拉格朗日点与A、B两个星体构成了严格的正三角形。

这样，我们就将五个拉格朗日点都找到了。其中很有趣的是，本来降维到一维的三个拉格朗日点结果只能得到近似解，而只能降维到二维的两个拉格朗日点却可以得到精确解。

# 拉格朗日点的稳定性

之前考虑的情况，是要求了物体必须停留在拉格朗日点上的情况，此时受力情况还是较简单的。我们下面考虑拉格朗日点附近的运动，那么受力情况会变得复杂：

$$
\begin{align}
\vec A(\vec r, \vec v) &= \omega^2 \vec r_\parallel - 2 \vec \omega \times \vec v - \frac{\omega^2 (r_A + r_B)^2 r_B}{R_A^3} \vec R_A - \frac{\omega^2 (r_A + r_B)^2 r_A}{R_B^3} \vec R_B\\
\vec R_A &= \{ r_x + r_A, r_y, r_z \}\\
\vec R_B &= \{ r_x - r_B, r_y, r_z \}
\end{align}
$$

这里第一项是离心力，第二项是非惯性系中运动导致的科里奥利力，后两项是来自星体的引力。这里首先最显然的一点，就是如果一个物体偏离轨道面，那它受到的合力肯定是指向轨道面的，因此在垂直轨道面方向上，所有拉格朗日点都是稳定的，因此我们主要要看的是在轨道面内的扰动是否也是稳定的。

除了科里奥利力项，其它力都是保守力，可以写为势能U的梯度：

$$
U = \frac{1}{2} \omega^2 r^2 + \frac{\omega^2 r_{AB}^2 r_B}{R_A} + \frac{\omega^2 r_{AB}^2 r_A}{R_B}
$$

科里奥利力部分非但不能写成保守势能的梯度，而且其在物体绕着拉格朗日点运动的过程中起到了改变物体运动方向的作用。

下面，我们引入扰动：$\{\delta x, \delta y\}$，此时运动方程可以写为：

$$
\begin{cases}
\delta \ddot x = \partial_x U + 2 \omega \delta \dot y\\
\delta \ddot y = \partial_y U + 2 \omega \delta \dot x
\end{cases}
$$

由于在拉格朗日点处$\partial_x U = \partial_y U = 0$，所以在拉格朗日点邻域内上式可以写为：

$$
\begin{cases}
\delta \ddot x = \partial_{xx} U \delta x + \partial_{xy} U \delta y + 2 \omega \delta \dot y\\
\delta \ddot y = \partial_{yy} U \delta y + \partial_{yx} U \delta x + 2 \omega \delta \dot x
\end{cases}
$$

我们可以将运动方程写为相空间中运动方程的形式（为了了解科里奥利力的作用，特别为它增加了一个系数）：

$$
\frac{d}{dt} \begin{pmatrix} \delta x \\ \delta y \\ \delta \dot x \\ \delta \dot y \end{pmatrix} =
\begin{pmatrix}
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 \\
\partial_{xx} U & U_{xy} U & 0 & 2 k \omega \\
\partial_{xy} U & U_{yy} U & - 2 k \omega & 0
\end{pmatrix}
\begin{pmatrix} \delta x \\ \delta y \\ \delta \dot x \\ \delta \dot y \end{pmatrix}
$$

显然，这个运动方程存在4个本征态$V_i$以及相应的本征值$\lambda_i$，满足$\dot V_i = \lambda_i V_i$，对应的实空间中的运动方程为$\dot { \vec r} = \lambda_i^2 \vec r$，因此如果本征值是实数，那么对应的运动要么是指数收敛到拉格朗日点，要么是指数离开拉格朗日点，取决于初速度与初位移是否反向；如果本征值是虚数，那么对应的运动就是在拉格朗日点周围的往复运动，从而不会真正离开拉格朗日点，而是会停留在它附近；如果是复数，那表示是上述两种情况的结合，从而也使不稳定的。因此稳定性的问题就变成了求解上述相空间运动方程的本征值的问题。

该运动的本征值方程（也即特征方程）为：

如果$\lambda_i$是实数，那么

$$
\lambda^4 + \left( 4 k^2 \omega^2 - \partial_{xx} U - \partial_{yy} U \right) \lambda^2 + \partial_{xx} U \partial_{yy} U - (\partial_{xy} U)^2 = 0
$$

因此，稳定条件就是上述方程的判别式不小于零且$\lambda^2$有负根：

$$
\Delta = \left( 4 k^2 \omega^2 - \partial_{xx} U - \partial_{yy} U \right)^2 - 4 \left[ \partial_{xx} U \partial_{yy} U - (\partial_{xy} U)^2 \right] \ge 0
$$

对于L1、L2和L3有：

$$
\begin{cases}
u = r_{AB}^2 \left( \frac{r_B}{R_A^3} + \frac{r_A}{R_B^3} \right)\\
u_1 \approx 1 + \frac{7 r_A}{8 r_B} > 1\\
u_2 \approx 4 - \sqrt[3]{\frac{9 r_A}{r_B}} > 1\\
u_3 \approx 4 + \sqrt[3]{\frac{9 r_A}{r_B}} > 1\\
\partial_{xx} U = \omega^2 (1 + 2 u)\\
\partial_{yy} U = \omega^2 (1 - u)\\
\partial_{xy} U = 0
\end{cases}
$$

因此有：

$$
\begin{align}
4 k^2 \omega^2 - \partial_{xx} U - \partial_{yy} U & = \omega^2 (4 k^2 - 2 - u)\\
\partial_{xx} U \partial_{yy} U & = \omega^4 (1 - u) (1 + 2 u) < 0\\
\Delta & = \omega^4 [ 16 k^2 (k^2 - 1) - 8 k^2 u + 9 u^2 ]
\end{align}
$$

也就是说，L1、L2与L3附近的扰动存在稳定的轨道，但更多时候是不稳定的，因为实际轨道随着初始扰动的大小不同，会是四根本征态的混合，其中有一半是不稳定的，那么最后混合的结果也是不稳定的。

下面我们看L4和L5：

$$
\begin{cases}
u= \frac{r_B - r_A}{r_B + r_A}\\
\partial_{xx} U = \frac{3}{4} \omega^2\\
\partial_{yy} U = \frac{9}{4} \omega^2\\
\partial_{xy} U = \frac{3 \sqrt{3} \omega^2}{4} u
\end{cases}
$$

所以稳定条件为：

$$
\begin{align}
4 k^2 \omega^2 - \partial_{xx} U - \partial_{yy} U & = ( 4 k^2 - 3 ) \omega^2 = C\\
\partial_{xx} U \partial_{yy} U - (\partial_{xy} U)^2 & = \frac{27}{16} (1 - u^2) \omega^4 \ge 0\\
\Delta & = \omega^4 \left[ ( 4 k^2 - 3 )^2 - 4 \frac{27}{16} (1 - u^2) \right]
\end{align}
$$

由于$\lambda^2 = \frac{- C \pm \sqrt{\Delta}}{2}$，因此稳定条件最终可以写为：

$$
\begin{align}
k & > \frac{\sqrt{3}}{2}\\
u & \ge \sqrt{1 - \frac{4}{27} (4 k^2 - 3)^2}
\end{align}
$$

也就是说，科里奥利力是拉格朗日点稳定的必要条件，正是它让扰动转向后进入可以被拉回拉格朗日点的区域。而这样的区域要存在的条件就是第二条（注意我们现在令$k=1$）：

$$
r_B \ge \frac{\sqrt{27} + \sqrt{23}}{\sqrt{27} - \sqrt{23}} r_A \approx 24.96 r_A
$$

它也就等于要求$M_A > 24.96 M_B$。

至此，我们将拉格朗日点附近的稳定性就都讨论好了。