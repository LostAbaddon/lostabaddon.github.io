标题：温度与熵的释义
关键词：物理
更新：2022/09/08 11:25:42
TOC: on
GLOSSARY: on
RESOURCES: on

这是本人关于温度与熵的物理与数学意义的解读。

这两个概念随着黑洞热力学的发现，以及后续量子引力的发展而变得日益重要。但对于温度与熵的物理意义，至少我个人一直总觉得有点模棱两可，所以这次总结一篇帖子来总结一下关于这两个概念的思考。

#	内能

如果我们考虑一个系统的话，系统的总能量等于作为整体的系统能量__外能__与系统内各子部分所拥有的有别于外能的能量__内能__的总和。而无论是外能还是内能，都可以分解为动能与势能两部分，所以外能等于系统的整体运动所具有的动能与所处势场中的势能的综合，而内能便是系统内各部分的动能与势能的综合，两者可以说是是泾渭分明的。

比如说，我们有N个粒子，每个例子的质量都是m，总体速度为$\vec v_0$，标记为i的粒子的速度则可以表示为$\vec v_0 + \vec v_i$，且满足 $\sum_i \vec v_i = 0$，从而系统的总外动能为$\frac{N m}{2} \vec v_0^2$，但每个粒子的动能为$\frac{m}{2} \left( \vec v_0 + \vec v_i \right)^2$，所以系统的总内动能为$\frac{N m}{2} \sum_i \vec v_i^2$。如果所有粒子都是不带荷的自由粒子，且没有外势的话，那这个系统的外能就是$\frac{N m}{2} \vec v_0^2$而内能就是$\frac{N m}{2} \sum_i \vec v_i^2$。考虑上所带荷与外势的话，情况当然会变得复杂，但意思还是这个意思。

我们将每个粒子偏离整体运动速度之外的速度分量称为该粒子的__热运动__，所以内能中的动能部分就是粒子的热运动所形成的动能。如果粒子是完全自由的，彼此之间没有相互作用，也不会发生碰撞，那么每个粒子的热运动都会保持不变。而如果允许存在相互作用或碰撞，那么每个粒子的热运动每时每刻都在发生改变，近乎变得杂乱无章的随机运动。

有意思的是，如果粒子的碰撞或相互作用会引起诸如粒子融合或分裂这样的情况，从而使得粒子之间的运动不是单纯的完全弹性碰撞的话，那么这样的系统的内动能与内势能是会相互转化的。而由于内动能与温度挂钩，从而这样的系统的温度是会发生变化的。比如在恒星内部，轻于铁的原子核会在最终聚变中变为铁甚至更重的原子核，这个过程中动能会转化为势能，且不会通过核聚变产生更多的能量，所以恒星核心的温度会下降。

其中，比较重要的是内能中的动能部分，它一般认为是和系统的温度相关的，但这种相关性在这一部分还未被揭露——到底温度就是内能中的动能部分，还是每个自由度的内动能部分，还是每个粒子的平均内动能，这个我们目前都还不清楚。

#	温度

温度，如前所说，它应该是和内能中的运动部分相关的。我们下面来看看它到底应该是什么。

##	理想气体

我们继续前面的假定，将不带荷且不处于外势中，彼此之间也只发生完全弹性碰撞的点粒子所构成的系统，称为__理想气体__。

对于理想气体，由于粒子之间不存在相互作用而只发生完全弹性碰撞，所以我们可以从牛顿力学推出它的物态方程：

假定容器体积为V，且其中总共有N枚粒子，那么平均而言，容器边缘一层的粒子到容器壁的平均距离（未必是平均垂直距离）为$\bar L = \gamma_D \left( \frac{V}{N} \right)^{\frac{1}{D}}$，这里D是空间维数，$\gamma_D$是一个和维度相关的比例系数。

另一方面，粒子i的质量为统一质量m而（热运动）速度为$\vec v_i$，在与容器壁发生碰撞后，粒子的方向会发生改变但大小不变，速度差垂直于壁表面，我们可以记方向差为$\Delta v_i = \rho_D v_i \vec n$，这里$v_i$是粒子原本热运动的速度大小，$\vec n$是壁表朝内的法向，$\rho_D$是碰撞后的平均速度差的大小占原速度大小的比例。

碰撞的平均发生时长可以用前面计算的平均距离与运动速度计算出：$\bar t_i = \frac{\bar L}{v_i}$，也就是说粒子在经过这么长时间后会和壁交换一次动量，利用冲量定理可以计算出这次交换中壁获得的往外的推力为：

$$
f_i = \frac{m \Delta v_i}{\bar t_i} = \frac{\rho_D}{\gamma_D} m v_i^2 \left( \frac{N}{V} \right)^{\frac{1}{D}}
$$

如果考虑压强的话，则还需要除以壁的表面积，从而就有：

$$
p_i = \frac{\rho_D}{\gamma_D} \frac{N}{V} m v_i^2
$$

这是由单个粒子与容器壁的碰撞计算而来的，对整体而言应该可以写为如下形式：

$$
p = \frac{2 \rho_D}{\gamma_D} \frac{N}{V} \left< \frac{1}{2} m v_i^2 \right>
$$

下面，我们可以将温度的定义限定为“每个粒子的平均动能”，那么就有：$T = \left< \frac{1}{2} m v_i^2 \right>$，或者将温度的定义限定为“每个自由度的平均动能”，那么就有：$T = \frac{1}{3} \left< \frac{1}{2} m v_i^2 \right>$，无论是哪一种定义，都可以将上述物态方程写为如下形式：

$$
p V = K_D N T
$$

>	当然，这里要指出的是，无论是哪一种定义，考虑到相对论效应后，结果都会发生一定的改变。

从形式上看，这和我们熟悉的物态方程是一直的，所以将温度定义为每个粒子或每个自由度的平均动能是合理的。

另一方面，上面考虑的是理想粒子，其特点之一便是内部没有任何相互作用，所以无论系统处于什么样的状态，都不用考虑由这些状态导致的内部势能变化。

##	广义能量均分定理

前面是从理想气体的运动来看什么是温度，下面我们换一个角度，从能量均分定理的角度来看一下温度的作用。

这里我们跳跃一下，直接给出统计力学中的一些基础结论，比如配分函数：

$$
Z[E] = \int \exp \left( - \frac{E}{k T} \right) \prod_i dX_i
$$

其中$X_i$是相空间中的广义坐标，所以对于有N个自由粒子的情况来说，就是3N个空间坐标和3N个动量坐标。

通过这个配分函数，我们可以计算如下平均值：

$$
\left< X_j \frac{\partial E}{\partial X_i} \right> = \frac{\int X_j \frac{\partial E}{\partial X_i} \exp \left( - \frac{E}{k T} \right) \prod_n dX_n}{Z[E]}
$$

我们主要看分子：

$$
\begin{align}
& \int X_j \frac{\partial E}{\partial X_i} \exp \left( - \frac{E}{k T} \right) \prod_n dX_n\\
= & - k T \int X_j \frac{\partial}{\partial X_i} \exp \left( - \frac{E}{k T} \right) \prod_n dX_n\\
= & k T \left[ \int \frac{\partial X_j}{\partial X_i} \exp \left( - \frac{E}{k T} \right) \prod_n dX_n - \left. \exp \left( - \frac{E}{k T} \right) \right|^{UP_i}_{DOWN_i} \right]\\
= & k T \delta_{ij} \int \exp \left( - \frac{E}{k T} \right) \prod_n dX_n\\
= & k T \delta_{ij} Z[E]\\
\end{align}
$$

所以就有：

$$
\left< X_j \frac{\partial E}{\partial X_i} \right> = \delta_{ij} kT
$$

其中，积分的倒数第二步其实要求了能量函数E在积分上下限处的值相等，而且一般在积分上下限时E应该都是发散的（正无穷），所以这个情况一般都可以满足。

这里实际上给出的是$X_j \frac{\partial E}{\partial X_i}$的平均值，我们还需要用它来构造能量的表达，这样才能计算出能量的平均值，比如对于完全非相对论性的自由理想粒子，它的能量为$E = \frac{1}{2 m} \left( p_x^2 + p_y^2 + p_z^2 \right)$，所以有：

$$
\left< E \right> = \frac{1}{2} \left( \left< p_x \frac{\partial E}{\partial p_x} \right> + \left< p_y \frac{\partial E}{\partial p_y} \right> + \left< p_z \frac{\partial E}{\partial p_z} \right> \right) = \frac{3}{2} k T
$$

如果考虑N个自由粒子的情况，就有：$\left< E \right> = \frac{3}{2} N k T$。

而对于极端相对论性的自由粒子，其能量为：

$$
E = c p = c \sqrt{p_x^2 + p_y^2 + p_z^2} = p_x \frac{\partial E}{\partial p_x} + p_y \frac{\partial E}{\partial p_y} + p_z \frac{\partial E}{\partial p_z}
$$

所以能量均值为：$\left< E \right> = 3 N k T$。

让我们回头再看一下温度的意义。

假定，一个系统的能量函数为$E = \sum_i C_i X_i^{n_i}$，那么显然它可以改写为：$E = \sum_i \frac{1}{n_i} X_i \frac{\partial E}{\partial X_i}$，这样它的平均能量就成了：$\left< E \right> = \sum_i \frac{1}{n_i} k T$。在一般情况下，无论是平动、转动还是谐振子的弹性势能，基本都是广义坐标的平方项的形式，所以指数$n_i = 2$基本上恒成立，这么一来内能就可以写为$\frac{n}{2} k T$，这里n是自由度的数量，从而此时温度可以理解为每个自由度上的平均能量。但这个情况并不始终成立，比如对于相对论性系统，转动和弹性谐振子依然是广义坐标的平方项，但平动却不是，那么此时平动自由度和转动、弹性谐振子自由度的平均能量就不相同，前者是后者的两倍。

所以，__温度大约可以理解为每个加权自由度上的平均能量__。

#	熵

热力学上的熵，最早被定义为$S = \frac{Q}{T}$，这样它其实就是自由度的加权总和，权重是每个自由度的等效指数的倒数。

但另一方面，我们又会说熵是系统混乱程度的度量，从统计力学的角度来说我们有玻尔兹曼熵公式：

$$
S = k \ln \Omega
$$

这里$\Omega$是系统状态数。

更详细地说，一个宏状态可以是由N个不同的微状态构成的，也即这N个不同的微状态在一套共通的“粗粒化”下归于同一个宏状态。这样的话，我们就可以说这个宏状态的熵，也即其混乱程度，就是状态数的对数：$S = \ln \Omega$。

那么，这里就有一个问题：在热力学中，熵与系统自由度的加权总和有关，而在统计力学中，熵与宏状态的微状态数的对数有关，那这里自由度的加权总和与微状态数的对数有什么关系呢？

我们来看一个丢骰子的例子：有N个骰子，其中$n_1$个骰子有2面，$n_2$个骰子有3面，$n_i$个骰子有i+1面，只需要满足$\sum_i n_i = N$即可。那么这样一组骰子能投出多少结果？答案很简单：$M = \prod_i (i+1)^{n_i}$。

让我们对所有可能的数量求个对数：$\ln M = \sum_i n_i \ln (i+1)$，这便就是另一种形式上的“自由度的加权总和”，至少在形式上和数学理解上两者是可以说得通的。

至此，我们也明了了__熵的意义，它是同一个宏状态下微状态数的对数，也是构成这些微状态的自由度的加权总合__。

#	黑洞：熵、温度与信息

黑洞是否有熵的问题可以追溯到惠勒问贝肯斯坦的一个问题：**我把一杯茶倒进黑洞的话，熵去哪了？**

在此之前，黑洞被认为只有3个自由度，也即**黑洞三毛**：质量、角动量、电荷。一杯茶所蕴含的信息与熵都很多，但它最后被黑洞吸收后，只是这三个量的小幅波动而已，似乎完全无法容纳如此巨大的信息与熵。

为了回答这个问题，贝肯斯坦仔细研究了黑洞物理学，尤其结合霍金证明的黑洞融合过程中的__表面积不减定理__，发现黑洞的表面积完全可以胜任熵的角色：__表面积即熵__。

既然有熵，那么按照热力学，就一定有温度，这是必然的，而且事实上也很好找，那就是表面引力强度。

而，有了温度，那自然就会有辐射。第一个关于黑洞会辐射的证据来自苏联的泽尔多维奇所证明的旋转黑洞会自发辐射，第二个证据便是霍金提出的霍金辐射，它在微观上可以视为量子昂鲁效应的弯曲时空版本。

有了辐射，那就存在一个问题：这是一个纯粹的黑体辐射，而黑体辐射是不携带信息的（因为是完全的随机辐射），而黑洞辐射的终局是完全消失啥都不剩下，所以就产生了一个问题：落入黑洞的信息，去哪了？这个问题在经典物理范畴中不是什么问题，因为经典物理过程中信息丢失的情况非常常见（后面会介绍）。但在量子过程中就有问题了，量子过程中密度矩阵的[冯·诺依曼熵](https://en.wikipedia.org/wiki/Von_Neumann_entropy)（是一种信息熵）是守恒的，而现在黑洞蒸发过程中信息丢失了，这样就构成了一个著名的悖论：黑洞信息丢失疑难。

于是，整个逻辑就是：

>	掉进黑洞的物体的熵去哪了？ :arrow-right: 黑洞有熵 :arrow-right: 黑洞有温度 :arrow-right: 黑洞可以辐射 :arrow-right: 掉进黑洞的物体的信息去哪了？

其中，最初的问题是经典物理范畴的问题，黑洞熵也可以用经典物理来给出，但要解释如何辐射时却会需要引入量子理论（半经典的弯曲时空量子场论），而最后的问题却是经典物理中不存在的、量子理论中才会存在的问题。

如果我们现在把目光只局限在经典物理范畴的话，黑洞的信息丢失疑难是否有可能被解决呢？

在[《球对称时空中的自由下落物质是否可能构成黑洞》](/article/science/physics/gravity/fallingball2blackhole.mu)一文中，我们讨论了在绝对球对称的时空中，自由落体的物质球壳与光球壳永远都不可能在黑洞蒸发前跨越视界进入黑洞内部，所以实际上所有物质都被冻结在了视界位置之外的薄薄一层上。

当然，这和霍金的“灰洞”概念并不相同，霍金的灰洞概念是建立在量子理论之上的，我们暂不讨论。

上述经典灰洞（有别于霍金的灰洞概念）成立的前提，是不存在快子这种超光速运动物质，也不存在违反能量条件的负能量或负张力物质，这两点在量子理论中都有可能被违反。而在经典物理条件下，这种经典灰洞可以存在，它将所有“落入”它的物质都冻结在视界位置附近（事实上，它可以有一个处处都近乎视界状态的视界层壳甚至球层，而不单单是一个面），而由于这些物质是被冻结住的，所以信息和熵自然都被保留住了。而在这个情况下，由于引力与加速度等效，所以量子昂鲁效应依然可以引起经典灰洞的霍金辐射，从而冻结的物质在辐射作用下会被重新释放到外界，这个过程中没有任何熵与信息的损失。

经典灰洞虽然在原理上与霍金灰洞不同，但两者对信息的保存方案却是相同的。

另一个解决方案，是黑洞事实上可以有无穷多不同的毛。我们关于黑洞无毛或者说黑洞三毛的认识是建立在只考虑电磁力与引力的情况下构成的。但如果加上一些以前没考虑过的场呢？斯特罗明格和霍金等人就研究过这个问题，并提出了“软毛”理论，即认为黑洞可以保留除了三根主毛之外的其它信息，这些信息所具有的能量都很低，所以被称为“软毛”。

霍金的黑洞软毛和灰洞一样，是从量子理论的角度出发来构建的，但理论上它却可以存在在经典物理中，比如引入一些标量场，他们是可以以特定形式存在与黑洞中的（以一些参数的形式体现在黑洞的半径、形状等参数中）。斯特罗明格等人证明了至少在量子层面上，软毛的数量可以是无穷多，所以可以保存任意多的信息。在经典层面其实也差不多，任意多标量场都可以被结合到黑洞中。

这个大约是第二个在经典层面解释黑洞的熵与信息保存在哪里的方案了吧。

当然，我是不可能就这么解决黑洞信息疑难的，只是总结一下自己的相关想法而已。

#	信息

物理中有三个非常重要的核心概念：**物质、能量、信息**。

而在热力学与统计力学中，信息是非常重要的，它和熵密切相关，我们在前面讨论黑洞的信息丢失问题的时候也提到了信息。

那么，到底什么是信息呢？

从比较形而上的角度来说，信息告诉我们物质是如何组合起来、构成一个复杂整体的。但在物理讨论中，这样的说法显然过于宽泛了。

从可度量的角度来说，系统在一个过程中信息量的增量，等于该过程中熵的减量。比如，一个过程让系统的熵减少了S，那么我们就可以说这个过程为系统提供了量为S的信息。

从这个角度说，一个过程中提供了多少信息，等于在这个过程中消除了多少尚不明确的自由度的加权总和。从这个角度来说，__提供信息就是消除不确定性__，这个说法是很合理的。

那么，物理过程中信息是否一定保持守恒呢？

至少在经典物理范畴中，这点并不一定。

比如，两个全同的点粒子，以大小相同的速度相撞，两者的运动方向存在一定的夹角$\theta$，且相撞后两个粒子融合在了一起。在这么一个过程中，最终粒子的运动方向就是沿着角平分线运动，且质量会发生改变。那么，我们如果知道这个过程，且知道最终粒子的质量与速度，是否可能还原出初始状态下的这两个粒子的速度呢？

答案是：不可能，缺少必要的信息。

我们令两个粒子的原始质量都是$m$，而速度分别是$\vec v_1 = \{u, w\}$和$\vec v_1 = \{u, -w\}$，而最终粒子的质量是$m'$，速度为$\{ u', 0 \}$，这两个量是我们已知的。根据四维时空中的能动量守恒我们有：

$$
\begin{cases}
u = u'\\
m = \frac{m' \sqrt{1 - u^2 - w^2}}{2 \sqrt{1 - u^2}}
\end{cases}
$$

也即，末态速度和初态的纵向速度（也就是角平分线方向的速度）是相等的，但利用末态速度和质量，我们却无法得知初态的横向速度与粒子质量。

这其实也很显然：初态总共有三个未知量，但约束方程只有两个（横向其实还有一个方程，但两边都是0，所以不提供任何信息，自然也不够成约束），所以显然不足以确定初态的三个未知数。

这也就是说，至少在可融合的弹性碰撞这一经典物理过程中，信息发生了丢失。

在更一般的情况下，两个粒子融合成一个新粒子，初始粒子与产物粒子的质量都是已知的，产物粒子的速度也是已知的，且整个过程中动量与能量也都守恒，我们是否可能由此来得到初始两枚粒子的速度呢？在这种融合情况下，未知量有6个，但约束方程只有4个，所以依然会有信息丢失。

>	之前的例子中，利用对称性消除了一半的未知变量，所以如果质量也能确定的话，就刚好能确定所有未知数了。

这也就是说，至少在可融合的弹性碰撞这一经典物理过程中，信息发生了丢失。

其实，融合过程中的信息总是会发生减少的，这点即便是在数学中也是，比如我们知道$A + B = C$，也知道了C，但这些信息并不足以让我们反推出A和B是多少。在计算机中，这种计算门电路中的信息丢失会引起电路发热，而在量子计算机中的计算门电路却不是简单的融合而是会产生两个结果，利用第二个结果和C可以反推出A与B，所以量子电路理论上发热会小很多——但并不能完全确定所有情况，我们事实上依然会面临到底是AB还是BA这样的二分问题，所以依然存在1比特的随机性。

所以，在经典物理过程中，物质落入黑洞这是一个典型的融合过程，此时发生信息丢失是无可避免的，除非黑洞其实不是只有三根毛的黑洞，它是灰洞或者软毛黑洞，此时要么实际上并没有实现完全的融合，要么信息被编码，所以信息可以被恢复。

>	这里还有一个有趣的话题：如果时间反应对称性在经典层面也保持的话，那么信息丢失必然意味着在某些经典物理过程中会存在信息不足，即需要“从外部输入的”信息来补完物理过程。这里的一个粒子就是[诺顿穹顶](/article/science/physics/nortondoom.mu)，我们需要从未来提供而来的信息来“补完”粒子的运动。这个问题是非常有趣的。

但这种对信息丢失的放任的经典物理的任性行为，一般认为量子物理并不具备，量子过程中密度矩阵的迹保持不变是可以被严格证明的——除非，有什么我们还不知道的机制存在。

就个人观点来说，我认为我们对于信息的力学机制的了解依然很有限，未来如果真的发现存在一些特定的物理机制就是要求信息丢失的话，那也不是什么太糟糕的事。