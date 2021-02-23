标题：从深度神经网络到物理过程
更新：2017.10.31 01:02:55

> 在从魔都回帝都的火车上，实在是睡不着，主要是不知道车厢哪个隔间里的大叔或者大婶的脚实在是杀伤力过于强大，我被熏得完全无法入眠，所以就起来把从帝都到魔都的火车上所想到的一个idea给写下来。
纯属无聊，不具备任何现实意义，使用到的数学不晚于大二。


----


深度学习是这么一个过程，它将节点分解为输入层、输出层以及中间的隐藏层，且同一层之间的节点不能相连，只能与相邻层的节点相连。
如果我们将输入层的序号定为0而将输出层的序号定位N，那么节点也可以赋予一个序号列，记为$x_{i,n}$，其中n表示层的序号，i表示x在层中的序号。激活函数记为f，连接权重记为$\omega^i_{i,n}$，表示从n层的第i个节点连接到n+1层第j个节点的连接。这样一个多层神经网络中的数据流转过程就可以记为下述方程：

$$
x_{i, n} = f \left( \omega^j_{i, n - 1} x_{j, n - 1} \right)
$$

这里采用Einstein约定，相同指标自动求和。

上述方程可以通过如下符号形式改写：

$$
\phi (x, t + 1) = f \left( \sum_{x'} G \left( x, x', t \right) \phi \left( x', t \right) \right)
$$

我们将原来层内指标i改记为x，每个节点的输出值从x改记为$\phi$，层序号用t标记，连接权重改成了函数G。
这只是符号的改变，意义并没有发生丝毫变化。
但这个方程的形式却值得玩味，因为如果忽略激活函数f，那么下述方程的形式其实是量子力学中用两点关联函数（Green函数）改写的离散本征态系统的波函数演化方程：

$$
\phi (x, t + 1) = \sum_{x'} G (x, x', t) \phi (x', t)
$$

因此，一个很直接的想法，就是如果x是连续，会怎么样？
也即，如果我们将离散的每一层节点构成的空间，连续化为一维空间，会得到什么？
答案很直接：

$$
\phi (x, t + 1) = f \left( \int G (x, x', t) \phi (x', t) dx' \right)\\
f^{-1} \left( \phi (x, t + 1) \right) = \int G (x, x', t) \phi (x', t) dx'
$$

第二步直接取了反函数，这对于sigmoid激活函数来说不成问题，但对于ReLU激活函数来说恐怕不能这儿干，因为其在负半轴是常值函数0，反函数不存在。对于基于ReLU改造的Swish激活函数也不好用，因为它在负半轴非单调，会出现双值，所以也没有反函数。
因此，这个写法颇为形式性。

对空间（神经元节点指标）的连续化挺“顺利”的，如果我们忽略反函数不存在所带来的问题的话。
而对于时间（神经元层指标）的连续化则有点麻烦。

我们先来对上面的结果做一些形变：

$$
\because f^{-1} ( \phi (x, t + 1) ) = \int G(x, x', t) \phi (x', t) dx'\phantom{wwwwwwwwwwwwwwwwwwwwww}\\
\therefore f^{-1} ( \phi (x, t + 1) ) - \phi (x, t) \int G (x, x', t) dx' = \int G(x, x', t) \left[ \phi (x', t) - \phi (x, t) \right] dx'
$$

然后就可以做很强硬的形式上的连续化：

$$
f^{-1} ( \phi (x, t + dt) ) - \phi (x, t) \int G (x, x', t) dx' = dt \int G (x, x', t) \left[ \phi (x', t) - \phi (x, t) \right] dx'
$$

这里其实就等价于引入了一个隐形的归一化条件：

$$
f^{-1} ( \phi (x, t) ) = \phi (x, t) \int G (x, x', t) dx'
$$

或者可以写得对激活函数更加“普适”一点：

$$
\phi (x, t) = f \left[ \phi (x, t) \int G (x, x', t) dx' \right]
$$

更准确地说，由于这里无论是节点输出值$\phi$还是激活函数f还是两点连接函数G，都是已知的，所以上式的归一化要求事实上是对G的一次归一化调整，即：

$$
\begin{cases}
\phi (x, t) = f \left[ \Gamma (x, t) \phi (x, t) \int G (x, x', t) dx' \right]\\
\phi (x, t + dt) = f \left[ \Gamma (x, t) \int G (x, x', t) \phi (x', t) dx' \right]
\end{cases}
$$

我们可以取归一化调整之后的两点连接函数为新的两点连接函数，从而有最终的运动方程：

$$
\partial_t \left[ \phi (x, t) \int G (x, x', t) dx' \right] = \int G (x, x', t) \left[ \phi (x', t) - \phi (x, t) \right] dx'
$$

从形式上来说，可以看做是非相对论性哈密顿量显含时的薛定谔方程，或者，更加类似的其实是热扩散方程（因为没有关键的虚数单位i）。

我们可以将两点关联函数做一个分离。两点关联函数我们归一化到1，那么此时动力学方程为：

$$
\begin{cases}
\int G (x, x', t) dx' = 1\\
\phi (x, t) = f \left[ \Gamma (x, t) \phi (x, t) \right]\\
\partial_t \left[ \Gamma (x, t) \phi (x, t) \right] = \Gamma (x, t) \int G (x, x', t) \left[ \phi (x', t) - \phi (x, t) \right] dx'
\end{cases}
$$

对最后的方程再做一次形变：

$$
\partial_t \phi (x, t) = \int G (x, x', t) \left[ \phi (x', t) - \phi (x, t) \right] dx' - \phi (x, t) \partial_t \ln \Gamma (x, t)
$$

由于现在两点关联函数是归一化的，我们可以很任性很形式化地认为它是运动项与非定域的包含了波函数与波函数的动量项的非定域势（原因下面会说），而后面减掉的那一项则可以认为是一个定域的势能项与质量项的结合。
让我们对比一下非相对论性薛定谔方程：

$$
i \hbar \partial_t \Psi = - \frac{\hbar^2}{2 m} \nabla^2 \Psi + \hat V(x) \Psi
$$

是不是感觉形式上很像？
主要的区别就在于中间的积分那一项。
所以下面我们就来处理这一项。

将积分的部分做一下形变（同时我们这里直接取层内指标为坐标的形式，从而为矢量）：

$$
\int G (\vec x, \vec x', t) \left[ \phi (\vec x', t) - \phi (\vec x, t) \right] dx'\phantom{wwwwwwwwwwwwwwwwwwwwwwwwi}\\
= \int_r \int_{\partial \Omega (r)} G (\vec x, \vec x', t) \left[ \phi (\vec x', t) - \phi (\vec x, t) \right] d\Omega dr\phantom{wwwwwwwwwwwwwww}\\
= \int_r \int_{\partial \Omega (r)} G (\vec x, \vec x', t) \left[ \phi (\vec x', t) - \phi (\vec x, t) \right] \vec n \cdot \vec n d\Omega dr\phantom{wwwwwwwwwwwai}\\
= \int_r \int_{\Omega (r)} \vec \nabla \cdot \left\{ G (\vec x, \vec x + \vec n r, t) \left[ \phi (\vec x + \vec n r, t) - \phi (\vec x, t) \right] \vec n \right\} dV dr\phantom{wwwwwa}\\
= \int_r \int_{\Omega (r)} \vec \nabla \cdot \left\{ r^{D - 1} G (\vec x, \vec x + \vec n r, t) \left[ \phi (\vec x + \vec n r, t) - \phi (\vec x, t) \right] \frac{\vec n}{r^{D - 1}} \right\} dV dr\\
= \int_r \int_{\Omega (r)} \frac{\vec n}{r^{D - 1}} \cdot \vec \nabla \left\{ r^{D - 1} G (\vec x, \vec x + \vec n r, t) \left[ \phi (\vec x + \vec n r, t) - \phi (\vec x, t) \right] \right\} dV dr\ \\
= \int_r \int_{\Omega (r)} \vec n \cdot \vec \nabla \left\{ G (\vec x, \vec x + \vec n r, t) \left[ \phi (\vec x + \vec n r, t) - \phi (\vec x, t) \right] \right\} dV dr\phantom{wwwwwa}\\
+ \int_r \int_{\Omega (r)} \frac{D - 1}{r} \left\{ r^{D - 1} G (\vec x, \vec x + \vec n r, t) \left[ \phi (\vec x + \vec n r, t) - \phi (\vec x, t) \right] \right\} dV dr\phantom{wi}\\
$$

其中，第一步是将全空间分解为一系列以x为圆心的同心球，第二步中的$\vec n$是同心球上的单位径向量，第三步利用了Stokes定理，第四到第六步则利用了D维空间中的散度的特性。
最后的结果，第一部分是一个径向梯度，加上一个中心势，从而就是前面所说的“运动项与非定域的包含了波函数与波函数的动量项的非定域势”。

接下来，我们取无穷小曲面，即r只在0的邻域范围内，宏观范围的两点关联函数为0，这么一种特殊的情况，其对应的深度神经网络稍后再说，那么此时就有：

$$
\int G(\vec x, \vec x', t) \left[ \phi (\vec x', t) - \phi (\vec x, t) \right] dx'\phantom{wwwwwwwwwwwwwwwww}\\
= \oint G(\vec x, \vec x + \vec n dr, t) \left( \vec n \cdot \vec \nabla \phi + \frac{1}{2} \vec n \vec n : \vec \nabla \vec \nabla \phi \right) dn\phantom{wwwwwi}\\
= \frac{1}{2} \oint G(\vec x, \vec x + \vec n dr, t) \left( \frac{1}{2} \vec n \vec n : \vec \nabla \vec \nabla \phi + \vec n \cdot \vec \nabla \phi \right) dn\phantom{wwwwi}\\
+ \frac{1}{2} \oint G(\vec x, \vec x - \vec n dr, t) \left( \frac{1}{2} \vec n \vec n : \vec \nabla \vec \nabla \phi - \vec n \cdot \vec \nabla \phi \right) dn\phantom{wwwww}\\
= \frac{1}{2} \oint \left[ G(\vec x, \vec x + \vec n dr, t) - G(\vec x, \vec x - \vec n dr, t) \right] \left( \vec n \cdot \vec \nabla \phi \right) dn\phantom{ww}\\
+ \frac{1}{4} \oint \left[ G(\vec x, \vec x + \vec n dr, t) + G(\vec x, \vec x - \vec n dr, t) \right] \left( \vec n \vec n : \vec \nabla \vec \nabla \phi \right) dn\\
$$

假如我们取G的对称部分为$\hat G$而反对称部分为$\tilde G$，则有：

$$
\int G(\vec x, \vec x', t) \left[ \phi (\vec x', t) - \phi (\vec x, t) \right] dx'\phantom{wwwwwwwwwwwwwwwwwwwwwwwwwwi}\\
= \oint \tilde G(\vec x, \vec x + \vec n dr, t) \left( \vec n \cdot \vec \nabla \phi \right) dn + \frac{1}{2} \oint \hat G(\vec x, \vec x + \vec n dr, t) \left( \vec n \vec n : \vec \nabla \vec \nabla \phi \right) dn
$$

第二部分，将G看做是一个Finsler度量函数，从而这里给出的就是Finsler度量下的二阶微分算符$\nabla^2_G$，乘上一个Finsler度量下指标球相关的常数系数$g_G$。
而第一项则是Finsler度量的反对称部分诱导的类纤维丛联络与波函数梯度的矢量积，乘上另一个指标球相关的常数系数$A_G$。
这方面可以看以前写的老文：[《从弱Finsler几何到规范场》](http://www.jianshu.com/p/ec0645034d6a)。
因此，在无穷小连接函数的约束下，上面的方程就是：

$$
\partial_t \phi (x, t) = g(x, t) \nabla_G^2 \phi + \vec A (x, t) \cdot \vec \nabla_G \phi - V (x, t) \phi
$$

形式上是不是很简洁？
而每一项的意义也都明确了：
连接系数给出了Finsler度量，其反对称部分给出了类似纤维丛联络的规范力，其全局变更给出了类时空曲率变化的引力；而激活函数要求的连接系数的归一化系数则是时空上的全局势。
因此深度神经网络的整个学习过程，就是通过输入与输出的散射矩阵，来逆推整个时空的Finsler联络和全局势。

所谓的无穷小邻域内才有效的两点关联函数，在连续化之前，其实对应的就是卷积神经网络中的最小卷积核（3*3卷积）。
假如我们继续引入卷积神经网络的另一个要求，即卷积核是同一层内相同的，那么就等于将Finsler度量限定为只是时间t的函数：

$$
\partial_t \phi (x, t) = g(t) \nabla_G^2 \phi + \vec A (t) \cdot \vec \nabla_G \phi - V (t) \phi
$$

很明显，整个结构被简化了许多。
如果这个卷积网络还是所有层都共享参数的，那么等于把上述方程中的时间t也取消了，那就更简单了。

而假如我们取激活函数为f(x)=nx，那么就等于取消了全局势。最关键的是，如果两个这样的函数在原点处拼接起来，得到的也是取消全局势的激活函数，这样的激活函数中最著名的就是ReLU函数了，其在负半轴（当然$\phi$的取值也不可能到负半轴……）$\Gamma$恒为0，而在正半轴$\Gamma$恒为1，从而等效的势能函数V恒为0。
从而，ReLU对应的可以认为就是某Finsler时空中的“自由”量子系统或者“自由”热扩散系统了，吧…………

对于不是无穷小邻域的情况，其实可以通过无穷小邻域的情况在有限区间内做积分来获得，从而实际上是一个关于一阶与二阶导的非定域算符。
同样的，残差网络引入了不同间隔的层之间的连接，可以看做是将原本对时间的一阶导替换为一阶导的（时间上）非定域算符。

至于说循环神经网络，因为引入了与层数n不同的“时间”，所以这里暂不考虑——或者可以认为是引入了虚时间？？？

---

如果我们采用量子场论的视角（虽然很显然不是量子场论），那么深度学习的就是这么一个过程：

首先，我们通过实验知道系统的初态（输入层）与末态（输出层的目标值），而我们不知道的是系统所处的时空的度量（连接系数）与时空上的势能（激活函数）。
于是，我们通过大量的实验（通过大量输入与输出的学习素材）来分析这个时空的特性，通过选择恰当的系统能量函数（Hinton最早给出的RBM与热统中配分函数的相似性，用的就是一维Ising模型的能量函数来类比输出层的误差函数），使得整个系统的最低能态对应的时空就是我们要找的目标时空——这个也容易理解，时空上的测地线一般就是最低能态，而测地线在有相互作用的时候对应散射矩阵，散射矩阵刻画的就是末态与初态的关联，所以反过来知道末态初态就可以设法找出散射矩阵，从而可以设法得到测地线，从而可以设法获得测地线为最低能态的时空，从而得到时空的属性，这个逻辑很合理。
最终，我们利用找到的时空来预测给定初态对应的末态——利用神经网络学习到的结果来进行预测与应用。

所以，训练神经网络的过程，完全可以看做是物理学家通过实验结果来反推时空属性的过程。
很科学。

---

最后需要说明的是，虽然上面的推导很High，但实际上对于我们解决神经网络的学习这类问题来说，一点帮助都没有。

充其量，只能算是换了一个角度看待神经网络，吧…………