标题：N维格点空间中的随机行走与Polya回归定理
关键词：数学
更新：2022/12/04 13:46:45

Polya曾经研究过一个很有趣的问题：__在N维空间$\mathbb{Z}^N$中的随机行走，会回到原点的概率$P_N$是多少？__对此问题，Polya证明了当$N \le 2$时$P_N = 1$，而当$N>2$时$P_N < 1$，这便是**Polya回归定理**。

我们现在来考虑和这个问题密切相关的另一个版本：

{|}$\mathbb{Z}^N$中随机行走，则行走$l$步后，它会落在点$\{n_i\}$的概率会多少？

这个问题有一个非常直接的答案：

$$
\begin{align}
\rho_N(l; n_1, n_2, ... n_N) &= \frac{1}{(2 N)^l} P(l; n_1, n_2, ... n_N)\\
P(l; n_1, n_2, ... n_N) &= \sum_{\sum_i m_i = L} \frac{l!}{\prod_i m_i! (m_i + n_i)!}\\
&= \sum_{\sum_i m_i = L} \frac{l!}{\prod_i (2 m_i + n_i)!} \prod_{i=1}^N \frac{(2 m_i + n_i)!}{m_i! (m_i + n_i)!}\\
&= \sum_{\sum_i m_i = L} \frac{l!}{\prod_i (2 m_i + n_i)!} \prod_{i=1}^N P_1 (2 m_i + n_i; n_i)\\
&= \sum_{m = 0}^{(l - n_N)/2} \frac{l!}{(2 m + n_N)! (l - 2 m - n_N)!} P_1 (2 m + n_N; n_N) P_{N - 1} \left( l - 2 m - n_N; n_1, ... n_{N - 1} \right)
\end{align}
$$

因此我们得到了一个一维维往上递增的递推关系，但这个递推关系并不好求。二维的时候结果可以用超几何函数来表达，但三维的时候就没有这样的表达了，更不用说更高维了。

所以，我们可以试图寻找近似解。

在一维情况下，$P_1(l; n)$其实是一个[Beta函数](https://en.wikipedia.org/wiki/Beta_function)，它本身并不需要进一步近似。但考虑到后面的递推关系，我们可以用[高斯分布](https://en.wikipedia.org/wiki/Normal_distribution)来做近似：

$$
P_1(l; n) \approx \frac{\Gamma(1 + l)}{\Gamma \left( 1 + \frac{l}{2} \right)^2} \exp \left( - \frac{n^2}{2 l} \right)
$$

尤其当$l$足够大时，这个近似很好。

下面我们考虑二维的情况：

$$
P_2(l; n_1, n_2) = \sum_{m = 0}^{(l - n_2)/2} \frac{l!}{(2 m + n_2)! (l - 2 m - n_2)!} P_1 (2 m + n_2; n_2) P_1 \left( l - 2 m - n_2; n_1 \right)
$$

直接求的结果是超几何函数，但我们可以通过拟合来找到近似函数为：

$$
P_2(l; n_1, n_2) \approx P_2(l; 0, 0) \exp \left( - \frac{n_1^2 + n_2^2}{l} \right)
$$

而且通过超几何函数，很容易算出$P_2(l; 0, 0) = P_1(l; 0)^2$。

对于高维的情况，我们也可以得到如下近似解：

$$
P_N \left( l; n_1, ... n_N \right) \approx P_N \left( l; 0, ... 0 \right) \exp \left( - \frac{N \left( n_1^2 + n_2^2 \right)}{2 l} \right)
$$

但系数$P_N \left( l; 0, ... 0 \right)$并不满足$P_0(l)^N$这么一个简单的关系，但好在它只是一个归一化系数，可以通过下面的归一化条件方程来得到：

$$
\sum_{\sum_i \left| n_i \right| \le l} P_N \left( l; \left| n_1 \right|, ... \left| n_N \right| \right) = (2N)^l
$$

这显然也给出了最初我们所问的终点位置的分布概率函数的总概率守恒条件：

$$
\sum_{\sum_i \left| n_i \right| \le l} \rho_N \left( l; \left| n_1 \right|, ... \left| n_N \right| \right) = 1
$$

事实上，上述结果即便是对于六角形密铺而成的二维与三维空间也一样适用。

此外，从这里能看出一个很有趣的点，上述结果本来是在$\mathbb{Z}^N$中建立的，但最终的结果却自然显现出了欧氏距离。

另一方面，我们可以考虑长度从$l$到$l+1$的“动态”过程，并建立如下迭代方程：

$$
P(l + 1; x^\mu) = \sum_{\delta^\mu} P(l; x^\mu + \delta^\mu)
$$

这里$\delta^\mu$是连接相邻格点的矢量集，在一维时就是$\{+1, -1\}$，二维四方形时是$\{(+1, 0), (-1, 0), (0, +1), (0, -1)\}$，二维六边形时则有6个，三维正方形时也是6个。我们可以换成概率的迭代方程：

$$
\rho (l + 1; x^\mu) = \sum_{\delta^\mu} \frac{1}{n(x^\mu)} \rho (l; x^\mu + \delta^\mu)
$$

这里$n(x^\mu)$是在$x^\mu$这个位置上的相邻节点数。然后两边减去一个$\rho (l; x^\mu)$，并认为每个点上的邻点数都是相同的，从而有：

$$
\begin{align}
\Delta_l \rho (l; x^\mu) &= \left( \sum_{\delta^\mu} \frac{1}{n(x^\mu + \delta^\mu)} \rho (l; x^\mu + \delta^\mu) \right) - \rho (l; x^\mu)\\
&= \frac{1}{n} \sum_{\delta^\mu} \left( \rho (l; x^\mu + \delta^\mu) - \rho (l; x^\mu) \right)\\
&= \frac{1}{n} \sum_{\delta^\mu} \Delta_{\delta^\mu}^2 \rho (l; x^\mu)
\end{align}
$$

容易证明，当邻点只在每个维度的正负两个方向上存在且距离相等时，$n = 2 N$，此时上述方程可以给出近似的结果为：

$$
\Delta_l \rho (l; x^\mu) \approx \frac{1}{2 N} \sum_{i = 1}^N \nabla_i^2 \rho(l; x_i^\mu)
$$

这个结果也可以推广到具有恰当对称性的更复杂的情况，比如六边形，此时可以考虑用连接因子$\omega$来取代$\frac{1}{2 N}$，将方程写为：

$$
\Delta_l \rho (l; x^\mu) \approx \omega \sum_{i = 1}^N \nabla_i^2 \rho(l; x_i^\mu)
$$

但有趣的是，在一些拥有足够多对称性的情况下，连接因子可以只是维数$N$的函数，而和到底有多少连接无关：$\omega = \frac{1}{2 N}$。比如，六边形时候求和部分会给出一个因子$\frac{3}{2}$，但连接数$n = 6$，于是结果依然是$\frac{3}{2}\frac{1}{6} = \frac{1}{4}$。甚至考虑可以在单位元上连续取值的情况：$\frac{1}{2 \pi} \int_0^\pi \sin(x)^2 dx = \frac{1}{4}$。

这也就说明了为何十字形连接和六边形连接的情况下，随机行走结果的分布基本都满足相同的分布模式，且这个分布模式中只和欧氏距离相关，而不是我们一开始所想的曼哈顿距离。

当然，这个结论并不是普适的，比如当我们选择十字形的格点分布，但允许斜角相连，那么此时连接因子就是$\frac{3}{8}$；而如果连续化到方格形状，那么连接因子就是$\frac{7}{24}$。

如果我们进一步将步长$l$视为时间，那么上面实际上得到的就是[热传导方程](https://en.wikipedia.org/wiki/Heat_equation)：

$$
\partial_t \rho (t; x^\mu) \approx \frac{1}{2 N} \partial^2 \rho(t; x^\mu)
$$

如果我们考虑连接数非固定值、每个点往不同邻点随机运动的概率不同、邻点之间距离也不同等等情况，那么此时的随机行走实际上得到的也就是N维离散空间中的[扩散方程](https://en.wikipedia.org/wiki/Diffusion_equation)。

至此，在N维空间$\mathbb{Z}^N$中的随机行走问题也就有了答案：它就是一个离散空间上的热扩散问题。