标题：如果波函数在四元数体上取值……
作者：LostAbaddon
更新：2016.02.05 19:35:48

让我们开一个脑洞：如果取值为复数的波函数，现在可以在四元数体上取值，那么情况会如何？

首先，波函数依然满足薛定谔方程：

$$
i \hbar \partial_t \Psi (\vec x, t) = \left( - \frac{\hbar^2}{2 m} \nabla^2 + V(\vec x, t) \right) \Psi (\vec x, t)
$$

然后，现在波函数和原来量子力学的相比，唯一的区别就是可以取四元数。

为了简单起见，我们做一个简化：

$$
i \partial_t \Psi = \left( - \frac{1}{2 m} \nabla^2 + V \right) \Psi
$$

势能V是常值，然后取自然单位制所以薛定谔常数为1。

我们进一步要求此时波函数可以写为如下形式：

$$
\Psi = \exp \left[ R(\vec x, t) + i I(\vec x, t) + j J(\vec x, t) + k K(\vec x, t) \right]
$$

代入演化方程可得：

$$
\begin{cases}
2 m I_t = \vec \nabla R \cdot \vec \nabla R - \left( \vec \nabla I \cdot \vec \nabla I + \vec \nabla J \cdot \vec \nabla J + \vec \nabla K \cdot \vec \nabla K \right) + \nabla^2 R - 2 m V\\
2 m R_t = - 2 \vec \nabla R \cdot \vec \nabla I - \nabla^2 I\\
2 m K_t = 2 \vec \nabla R \cdot \vec \nabla J - \nabla^2 J\\
2 m J_t = - 2 \vec \nabla R \cdot \vec \nabla K - \nabla^2 K
\end{cases}
$$

如果我们将J与K这两部分都去掉，那么剩下的当然就是普通的薛定谔方程了。求其自由解，典型的平面波解就为：

$$
\begin{cases}
R = 0\\
I = \vec p \cdot \vec x - E t\\
E = \frac{p^2}{2 m} + V
\end{cases}
$$

我们当然可以参照这一形式来给出自由波函数：

$$
\begin{cases}
R = 0\\
I = \vec p \cdot \vec x - E t\\
J = \vec q \cdot \vec x\\
K = \vec s \cdot \vec x\\
E = \frac{p^2 + q^2 + s^2}{2 m} + V
\end{cases}
$$

但对于这种波函数的物理解是却存在了问题——

我们现在多了两个静态的标量势，且这两个势能似乎无法通过某些更加基本的第一性原理来获得——它们不是动能，也不知道到底是什么能。

现在我们可以来看球面波。

原本取值为复数时，几率波的自由球面波形式为：

$$
\Psi = \frac{1}{r} \exp \left[ i (p r - E t) \right]
$$

现在，在四元数体上，球面波的形式会变得非常丰富（且荒谬），下面给出一种相对来说最简单的形式：

$$
\Psi = \frac{1}{r} \exp \left[ i (p_i r - E t + c_i)\ \ \ \ \ \ \ \ \ \ \ \ \\
+ j (a t - m b r^2 + \vec p_j \cdot \vec r + c_j)\ \ \ \\
+ k (b t + m a r^2 + \vec p_k \cdot \vec r + c_k) \right]
$$

其中

$$
E = V + \frac{1}{2 m} \left[ p_i^2 + p_j^2 + p_k^2 + m^2 (a^2 + b^2) r^2 - 2 m \left( b \vec p_j - a \vec p_k \right) \cdot \vec r \right]
$$

可见，球对称的情况下，允许存在一些“变化”这的第二、第三复相位所共轭的场，这个场本身可以分解为静态平面波形分布的部分，以及一个球对称且在径向越来越快速震荡的场这么两部分，且这第二、三复相位共轭的场的这第二部分是相互存在耦合的。

我们发现这里总能量除了粒子的动能加势能，还有额外的几项来源，一个就是j和k这两个复方向所共轭的“动量”提供的动能，一个是径向逐渐增大的部分，另一个则存在一定的方向性。

这等于说，如果我们将E依然看作粒子总能量从而必须是守恒的，那么这个系统显然就破坏了这种性质，这样的波函数必然不存在，除非没有这一径向场。

于是，我们下面考虑没有这一第二、三复相位共轭径向场的情况下，球对称波函数的形式：

$$
\Psi = \frac{1}{r} \exp \left[ i (p_i r - E t + c_i) + j (\vec p_j \cdot \vec x + c_j) + k (\vec p_k \cdot \vec x + c_k) \right]\\
E = V + \frac{1}{2 m} \left( p_i^2 + p_j^2 + p_k^2 \right)\phantom{wwwwwwwwwwwwwwwwwwi}
$$

柱面波的形式与球面波类似。

于是现在考虑双个点源构成的干涉现象：

$$
\Psi = \frac{\cos Z_1}{r_1} + \frac{\cos Z_2}{r_2} + \frac{\sin Z_1}{r_1} N_1 + \frac{\sin Z_2}{r_2} N_2\phantom{wwwwwwww}\\
r_1 = \sqrt{D^2 + \left( \vec x - \vec L \right)^2}\ \ \ \ \ \ r_2 = \sqrt{D^2 + \left( \vec x + \vec L \right)^2}\phantom{wwwwww}\\
Z_{1|2} = \sqrt{\left( p_i r_{1|2} - E t + c_i \right)^2 + \left( \vec p_j \cdot \vec x + c_j \right)^2 + \left( \vec p_k \cdot \vec x + c_k \right)^2}\\
N_{1|2} = \frac{p_i r - E t + c_i}{Z_{1|2}} i + \frac{\vec p_j \cdot \vec x + c_j}{Z_{1|2}} j + \frac{\vec p_k \cdot \vec x + c_k}{Z_{1|2}} k\phantom{wwwwa}
$$

其中两个N是在三个复单位构成的R3空间中的单位向量。

当不存在第二、三复相位时，两个N当然是相等的，但当存在第二、三复相位的时候它们就不等了，从而可以引发不同的干涉条纹。

其中，最关键的就在于第二、三共轭动量的存在，可能引起干涉条纹的整体偏移等改变。

比如说，当第二、三复相位所关联的常数c非常巨大时，我们发现，系统“退相干”了——这是一个非常有趣的结果。

上述双点源的波干涉结果可以写为：

$$
P = \frac{1}{r_1^2} + \frac{1}{r_2^2} + \frac{2 Q}{r_1 r_2}\phantom{wwwwwwwwwwwwwwwwwwwwwwwwwwwwwa}\\
Q = \cos Z_1 \cos Z_2 + \frac{Z_{12}}{Z_1 Z_2} \sin Z_1 \sin Z_2\phantom{wwwwwwwwwwwwwwwwwww}\\
Z_{12} = (p_i r_1 - E t + c_i) (p_i r_2 - E t + c_1) + \left( \vec p_j \cdot \vec x + c_j \right)^2 + \left( \vec p_k \cdot \vec x + c_k \right)^2
$$

可见，第二、三复相位的存在的作用便是降低量子相位的“起伏”。

是不是觉得这个Toy Theory很有趣？

由于第二、三复相位现在多了自由度，所以原则上可以得到很多和传统量子理论不同的结果，但有多少是物理上真实的，这个就再说了。

当然了，整个这个模型本就是Toy Theory，和物理也未必有多少关系。

这个模型还可以玩得再“有趣”一点。

比如说，传统的薛定谔方程在标量条件下考虑相对论效应，我们可以得到克莱恩方程：

$$
\partial_t^2 \Psi = \nabla^2 \Psi - m^2 \Psi
$$

这个方程相对薛定谔方程来说，最“有趣”的一点在于：没有特别指定的复相位单位i，从而可以得到更加自由的解：

$$
\Psi = \exp \left[ n (E t - \vec p \cdot \vec x) \right]\\
n = a i + b j + c k\phantom{wwww}\\
a^2 + b^2 + c^2 = 1\phantom{wwww}
$$

是不是自由度大了很多？

我们还可以做一个适当的变形：

$$
\left( \partial_t^2 - \nabla^2 \right) \Psi = - m^2 \Psi \Rightarrow \left( m^2 + \partial_t^2 - \nabla^2 \right) \Psi = 0\phantom{wwwwwwwwwwwwwwwwwwwi}\\
\therefore \left[ \left( n_\bot m + n_= \partial_t \right) + \left( i \partial_x + j \partial_y + k \partial_z \right) \right] \left[ \left( n_\bot m + n_= \partial_t \right) - \left( i \partial_x + j \partial_y + k \partial_z \right) \right] \Psi = 0\\
\therefore \begin{cases}
\left[ \left( n_\bot m + n_= \partial_t \right) + \left( i \partial_x + j \partial_y + k \partial_z \right) \right] \Psi = 0\\
\left[ \left( n_\bot m + n_= \partial_t \right) - \left( i \partial_x + j \partial_y + k \partial_z \right) \right] \Psi = 0\\
n_\bot^2 = n_=^2 = -1\ \ \ \ n_\bot n_= + n_= n_\bot = 0
\end{cases}\phantom{wwwwwwwwwwwwwwwwwwwa}
$$

这个的两个方程是不是很眼熟？从形式上说，我们得到的就是就是狄拉克方程。更有趣的是，四元数的虚数单位之间也恰好满足了Dirac矩阵反对易的特点。

当然，仅仅是“看上去”，实际上并不行——至少要拓展到更高维、更复杂的复空间中才行。

是不是看上去很有趣啊？