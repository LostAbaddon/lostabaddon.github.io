标题：N维格点空间中的随机行走
关键词：数学
更新：2022/11/17 23:42:45

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
P(l + 1; x^\mu) = \sum_{\Delta n_i^\mu} P(l; x^\mu + \Delta n^\mu)
$$

这里$\Delta n^\mu$是连接相邻格点的矢量集，在一维时就是$\{+1, -1\}$，二维四方形时是$\{(+1, 0), (-1, 0), (0, +1), (0, -1)\}$，二维六边形时则有6个，三维正方形时也是6个。我们可以换成概率的迭代方程：

$$
\rho (l + 1; x^\mu) = \sum_{\Delta n_i^\mu} \frac{1}{N(x^\mu)} \rho (l; x^\mu + \Delta n^\mu)
$$

这里$N(x^\mu)$是在$x^\mu$这个位置上的相邻节点数。然后两边减去一个$\rho (l; x^\mu)$便有：

$$
\begin{align}
\Delta_l \rho (l; x^\mu) &= \left( \sum_{\Delta n_i^\mu} \frac{1}{n(x^\mu + \Delta n^\mu)} \rho (l; x^\mu + \Delta n^\mu) \right) - \rho (l; x^\mu)\\
&= \frac{1}{n} \sum_{\Delta n_i^\mu} \left( \rho (l; x^\mu + \Delta n^\mu) - \rho (l; x^\mu) \right)\\
&= \frac{1}{n} \sum_{\Delta n_i^\mu} \Delta_{\Delta n_i^\mu} \rho (l; x^\mu)
\end{align}
$$

这里$n = n(x^\mu)$是邻点数。

这个形式就非常好看了，而且较容易推广到更一般的情形：

$$
\Delta_l \rho (l; x^\mu) = \sum_{\Delta n_i^\mu} \frac{1}{n(x^\mu + \Delta n^\mu)} \Delta_{\Delta n_i^\mu} \rho (l; x^\mu)
$$

若果将空间连续化，则可以得到如下运动方程：

$$
\partial_l \rho (l; x^\mu) = \nabla^\mu \left( \frac{n_0}{n(x^\mu)} \nabla_\mu \rho (l; x^\mu) \right)
$$

这显然就是一个[扩散方程](https://en.wikipedia.org/wiki/Diffusion_equation)，而不同位置上的邻点连接数给出了扩散系数，当它是一个全局固定的常数时，方程就回到了热扩散系数为1的[热传导方程](https://en.wikipedia.org/wiki/Heat_equation)。而且，我们也可以看出，步长$l$的作用类似于“时间”。

至此，在N维空间$\mathbb{Z}^N$中的随机行走问题也就有了答案：它就是一个离散空间上的热扩散问题。