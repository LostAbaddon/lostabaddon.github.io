标题：科普：广义相对论（2）
作者：LostAbaddon
更新：2015.09.17 00:53:06

让我们接着[前一小节](/article/science/physics/kpgr1.mu)继续扯淡。

----

上一节我们得到的最有用的东西，是这样的：

1.	假定时空每个点的邻域和闵氏时空就差一个坐标变换；
1.	假定粒子运动轨迹是极值曲线（极长或者极短或者驻值）或者自平行曲线；
1.	假定度规和联络满足适配条件的约束。

在这样的一系列假定下，我们得到了这么一些结果：

1.	时空是赝黎曼流形，由度规来刻画流形的形态；
1.	度规和流形上的联络适配；
1.	粒子在自由状态下的运动轨迹由初始状态和联络决定；
1.	粒子在自由状态下的运动轨迹也是连接起点和终点的最短或者最长曲线。

这其实就是说：引力可以用联络来刻画，而这点在适配条件的约束下，其实就是说：**引力由流形的“弯曲程度”决定。**

比如说，我们来看慢速情况下运动方程（自平行曲线方程）：
$$
\begin{align}
\because \quad & V^\mu \nabla_\mu V^\nu = 0\\
\therefore \quad & V^\mu \partial_\mu V^\nu = \Gamma^\nu_{\mu \lambda} V^\mu V^\lambda\\
\therefore \quad & \dot V^\mu = \Gamma^\mu_{\alpha \beta} V^\alpha V^\beta \approx \Gamma^\mu_{tt} = \frac{1}{2} g^{\mu \nu} \left( \partial_\nu g_{tt} - 2 \partial_t g_{t \nu} \right)
\end{align}
$$
接着，引入最常见的球对称静态时空的Schwardzschild解（球坐标下）：
$$
g_{\mu \nu} = \begin{pmatrix}
- \left( 1 - \frac{2 M}{r} \right) & & & \\
& \left( 1 - \frac{2 M}{r} \right)^{-1} & & \\
& & r^2 & \\
& & & r^2 \sin^2 \theta
\end{pmatrix}
$$
从而有：
$$
\begin{align}
\dot V^\mu &\approx \frac{1}{2} g^{\mu \nu} \left( \partial_\nu g_{t t} - \partial_t g_{t \nu} \right)\\
&= \frac{1}{2} g^{\mu \mu} \partial_\mu g_{t t} = - \frac{1}{2} \delta^\mu_r \left( 1 - \frac{2 M}{r} \right) \partial_r \left( 1 - \frac{2 M}{r} \right)\\
&= - \left( 1 - \frac{2 M}{r} \right) \frac{M}{r^2} \delta^\mu_r
\end{align}
$$
在弱场条件（自然单位制下$M \ll 1$）下，上面给出的就是经典物理中的牛顿引力方程。
因此，联络给出了引力——而在适配条件下，度规决定了联络，因此完全几何的数学量“度规”就和完全动力学的物理量引力建立起了联系。
这便是我们常说的：**时空弯曲给出了引力效应**。

那么，现在，我们自然要关心这么一个问题：**物质与能量到底如何决定时空的弯曲程度？**
因为很显然，如果我们不知道物质如何影响时空的弯曲，那么我们就算知道时空弯曲会带来引力效应，也依然不知道引力到底是怎么样的。
所以，下面我们就主要来考虑物质是如何影响时空的。

我们的最终目标，是建立这么一个等式：

`关于时空曲率的函数 = 关于物质能量分布的函数`

因为，这样这个等式就可以被理解为：时空弯曲的形式有物质能量分布决定，从而也就是我们的目标。
那么，什么样的东西可以被当作时空曲率的函数的变量呢？

可以选择的东西不算太多，比如度规张量$g_{\mu \nu}$及其逆$g^{\mu \nu}$，联络作为度规的导出量这里就不单独考虑了。接下来就是微分几何中专门讨论曲率的数学对象，比如Reimann曲率张量$R^\sigma_{\mu \nu \rho}$及Ricci曲率张量$R_{\mu \nu}$，以及Ricci曲率标量$R$。
它们的定义分别是：
$$
\begin{align}
R^\sigma_{\mu \nu \rho} V^\rho &= \left( \nabla_\mu \nabla_\nu - \nabla_\nu \nabla_\mu \right) V^\sigma\\
R_{\mu \nu} &= R^\lambda_{\mu \lambda \nu}\\
R &= R_{\mu \nu} g^{\mu \nu}
\end{align}
$$
而其中Riemann曲率张量又有如下性质：
$$
\begin{align}
& R^\rho_{[\mu \alpha \beta]} = R^\rho_{\mu \alpha \beta} = \nabla_{[ \mu} R^\rho_{\nu \alpha ] \beta} = 0\\
& R_{\mu \nu \alpha \beta} = g_{\mu \rho} R^\rho_{\mu \nu \alpha} \Rightarrow R_{\mu \nu \alpha \beta} = - R_{\mu \nu \beta \alpha} \ ,\  R_{\mu \nu \alpha \beta} = R_{\alpha \beta \mu \nu}
\end{align}
$$
其中中括号内表示对于指标做全反对称化排列并求和。

和曲面弯曲程度相关的最主要也是最重要的数学组件，就是上述这些。

当然，如果我们将时空看作是嵌入在一个巨大容器中的一叶孤舟，那么大概还可以考虑外曲率张量$K^{\mu \nu}$，但这一对象我们暂时先不考虑（加入我们讨论高维空间，比如大尺度额外维，时空是其中的一张膜，那么这货就可以考虑，而且事实上可以给出许多有趣的东西，包括大尺度引力修正及暗物质的某些可选模型）。

只有上面这些东西当然不足以确定那个等式左边的`关于时空曲率的函数`了，因为它可以是如下形式：
$$
R_{\mu \nu} - \frac{1}{2} R g_{\mu \nu} \ ;\  R R_{\mu \nu} \ ;\  R^\rho_{\mu \sigma \nu} g^{\sigma \alpha} R_{\rho \alpha}
$$
你看，是不是都长得奇形怪状，而且都是时空曲率的函数？  
这就要从等式的另一边来找了。

关于物质能量分布的函数，我们自然会想到能动张量$T^{\mu \nu}$，因此等式的右边应该就是能动张量或者它的迹$T = g_{\mu \nu} T^{\mu \nu}$构成的函数，从而等式基本上可以写成这个样子：
$$
F_{\mu \nu} \left( g_{\mu \nu}, R^\rho_{\mu \nu \sigma} \right) = G T_{\mu \nu}
$$
其中G是一个常数参数，可以视为引力常数。

由于能动张量具有守恒的特性：
$$
\nabla_\mu T^{\mu \nu} = 0
$$
因此我们自然也就要求了张量函数F<sub>μν</sub>也要具有这样的性质。
而，于此同时，我们根据Riemann曲率张量的性质可知：
$$
\begin{align}
& \because \nabla_{[ \mu} R^\rho_{\nu \alpha ] \beta} = 0\\
& \therefore \nabla_\mu R^\alpha_{\nu \alpha \beta} - \nabla_\nu R^\alpha_{\mu \alpha \beta} + \nabla_\nu R^\alpha_{\alpha \mu \beta} - \nabla_\alpha R^\alpha_{\nu \mu \beta} + \nabla_\alpha R^\alpha_{\mu \nu \beta} - \nabla_\mu R^\alpha_{\alpha \nu \beta}\\
& \therefore \nabla_\mu R_{\nu \alpha} - \nabla_\nu R_{\mu \alpha} + \nabla_\beta R^\beta_{\mu \nu \alpha} = 0\\
& \therefore \nabla_\mu R = 2 \nabla^\nu R_{\mu \nu}
\end{align}
$$
因此如果$F_{\mu \nu}$直接就是$R_{\mu \nu}$，那么这就等于要求Ricci曲率标量在整个时空中都是常数，但这显然不是最一般化的情况。
可，同时，通过这个结果我们也发现另一个东西挺适合：
$$
G_{\mu \nu} = R_{\mu \nu} - \frac{1}{2} R g_{\mu \nu}\\
\therefore \nabla^\nu G_{\mu \nu} = \nabla^\nu R_{\mu \nu} - \frac{1}{2} \nabla_\mu R = 0
$$
这么一来，至少$G_{\mu \nu}$看上去就很适合作为F而存在。

同时，我们再考虑潮汐力的测地偏离方程：
$$
\ddot \eta^\mu = - R^\mu_{\alpha \nu \beta} V^\alpha \eta^\nu V^\beta
$$
它可以通过测地线方程，也就是自平行曲线方程来获得：
$$
\begin{align}
\ddot \eta^\mu &= - \frac{d^2}{dt^2} \eta^\mu = - V^\alpha \nabla_\alpha \left( V^\beta \nabla_\beta \eta^\mu \right)\\
&= - V^\alpha \nabla_\alpha \left( \eta^\beta \nabla_\beta V^\mu \right)\\
&= - V^\alpha \nabla_\alpha \eta^\beta \nabla_\beta V^\mu - V^\alpha \eta^\beta \nabla_\alpha \nabla_\beta V^\mu\\
&= - \eta^\alpha \nabla_\alpha V^\beta \nabla_\beta V^\mu - V^\alpha \eta^\beta \nabla_\alpha \nabla_\beta V^\mu\\
&= - \eta^\alpha \nabla_\alpha \left( V^\beta \nabla_\beta V^\mu \right) + \eta^\alpha V^\beta \nabla_\alpha \nabla_\beta V^\mu - \eta^\beta V^\alpha \nabla_\alpha \nabla_\beta V^\mu\\
&= \eta^\alpha V^\beta R^\mu_{\alpha \beta \sigma} V^\sigma = - R^\mu_{\alpha \nu \beta} V^\alpha \eta^\nu V^\beta
\end{align}
$$
其中利用了测地分离矢量与测地切矢量之间的对易关系。
于此同时，我们知道经典引力现象中的测地偏离方程为：
$$
\ddot \eta^\mu = - \eta^\nu \partial_\nu \partial^\mu \phi
$$
因此，我们就可以明确一点：至少在慢速弱场极限下，与能动张量$T^{\mu \nu}$对应的关于曲率的函数应该是关于Riemann曲率张量、Ricci曲率张量和Ricci曲率标量的一次函数。

故而，结合上述两点，符合要求的最简单的函数就呼之欲出了：
$$
G_{\mu \nu} = R_{\mu \nu} - \frac{1}{2} R g_{\mu \nu} = G T_{\mu \nu}
$$
这便是著名的Einstein场方程。

于是，我们今天的目的就这么达到了——通过分析守恒方程，并要求测地偏离方程在慢速弱场极限下可以得到与经典潮汐力方程相同的结果，从而找到了符合要求的最简单的场方程，即Einstein场方程。
广义相对论的第二项任务：找出物质能量是如何引起时空弯曲的，到这里基本就算是完工了。

===

当然，不得不指出的是，上述构造都是建立在**方程在慢速弱场极限下可以回到经典引力理论**这个大前提，但必须要明确的是，符合这个大前提的方程理论上是有无穷多的，我们只不过是选择了其中“最简单”的一个。
比如说，引入Lovelock项的爱因斯坦张量：
$$
B = R^2 - 4 R_{\mu nu} R^{\mu \nu} + R_{\mu \nu \alpha \beta} R^{\mu \nu \alpha \beta}\\
G'_{\mu \nu} = G_{\mu \nu} + 2 \left( R R_{\mu \nu} - 2 R_{\mu \lambda} R^\lambda_{\nu} - 2 R_{\mu \sigma \nu \rho} R^{\sigma \rho} + R_{\mu \alpha \beta \sigma} R^{\alpha \beta \sigma}_{\nu} \right) - \frac{1}{2} B g_{\mu \nu}
$$
它由二阶Gauss-Bonnet项（式中的B）给出。我们事实上还可以引入三阶Gauss-Bonnet项，给出曲率的三阶形式。而它们的特点就是都符合守恒方程，同时在弱场极限下又都会自动消失。所有这些引入高阶曲率项的理论被称为“f(R)引力理论”。
当然了，二阶的Lovelock引力在四维下是平庸的，所以只有在研究高维引力而我们的时空只是一张膜的时候，才会着力研究这些乱七八糟东西——也因此，至少在高维引力下，引力在大尺度上会因为高维引力传递而形成偏离Einstein理论的现象，同时在强引力场的情况下也会因为Lovelock项而引起偏离Einstein理论的现象。

***

总结一下。

在上一节的接触上，我们这次引入了一个不算新的假设：**引力由流形的“弯曲程度”决定**。从而，在这一假设下，我们要求场方程满足**满足守恒方程**与**低速弱场极限下与经典引力理论结果相符**这两个条件，于是得到了一个满足条件的最简单的理论，那便是Einstein广义相对论。

至此，整个目标基本算是终于完成了。