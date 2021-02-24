标题：阴阳五行的规范动力学
简介：一个用规范理论来描写阴阳五行的Toy理论
关键词：物理
作者：LostAbaddon
更新：2021/01/06 12:00

我们做一个假定：**阴阳五行是可以用规范理论来描述的物理实在。**

如果是这样的话，那这样的理论应该长什么样呢？

---

首先，五行存在相生相克关系，我们将五行具体内容抽象掉，仅用符号来表示的话，就是如下关系：

- 相生：a生b，b生c，c生d，d生e，e生a
- 相克：a克c，c克e，e克b，b克d，d克a

这样的关系可以用五角阵来描述，相生是外接五边形，相克是内接五角星。

关键在于，我们如何用规范理论来描述这一关系？尤其，如何用群来描述这一关系呢？

在不考虑阴阳的情况下，我们引入一种无属性的“气”，它本身不具有任何五行属性，但可以转化为五行中的任意一种，它本身用 q 来表示。这样五行元素加上气总共六个元素被称为“元素场”，是一个实标量场。

接着，我们来构造五行生克关系为如下映射：

$$
G(x, y) = - G(y, x)\\
G(a, q) = b - q;\ G(b, q) = c - q;\ G(c, q) = d - q;\ G(d, q) = e - q;\ G(e, q) = a - q\\
G(a, c) = q - c;\ G(b, d) = q - d;\ G(c, e) = q - e;\ G(d, a) = q - a;\ G(e, b) = q - b\\
G(x, y) = 0 \ for\ otherwise
$$

从而我们可以由此构造出五行的生克场，它是一种规范场：

$$
A_a^b = - A_a^q;\ A_b^c = - A_b^q;\ A_c^d = - A_c^q;\ A_d^e = - A_d^q;\ A_e^a = - A_e^q\\
A_a^q = - A_a^c;\ A_b^q = - A_b^d;\ A_c^q = - A_c^e;\ A_d^q = - A_d^a;\ A_e^q = - A_e^b
$$

其它元素都为 0。我们将这十组生成元记为 $\sigma_i$，而现在空间中的规范场只能是上述十个生成元的线性组合。

由于我们添加了无属性的气元素，所以现在生克场有这样一种特性：

$$
\sum_i A^i_{j \mu} = 0
$$

这个特性非常重要，我们在后面会看到。

接着，依然不考虑阴阳，我们来尝试构造规范场的动力学模型。

我们用 $\phi^i$ 来表示五行场，它有六个独立分量，且每个分量的取值都是实数。而由生克作用 $A^i_j$ 构成的矢量场 $A^i_{j \mu}$ 是一个每个分量都是一个生克作用的矢量场：$A^i_{j \mu} = \sum_a e^a_{\mu} A^i_{j (a)}$。

下面，根据传统规范场论的思路，我们可以构造如下作用量密度：

$$
\begin{cases}
L = \frac{1}{2} m^2 \phi^i \phi_i + \frac{1}{2} D_\mu \phi^i D^\mu \phi_i - \frac{G}{4} F^i_{j \mu \nu} F^{j \mu \nu}_i\\
D_\mu \phi^i = \partial_\mu \phi^i + g A^i_{m \mu} \phi^m\\
F^i_{j \mu \nu} = \partial_\mu A^i_{j \nu} - \partial_\nu A^i_{j \mu} + g \left( A^i_{k \mu} A^k_{j \nu} - A^i_{k \nu} A^k_{j \mu} \right)
\end{cases}
$$

这是标准规范场论的形式，我们可以加上熟悉的 Lorentz 规范固定条件 $\partial^\mu A^i_{j \mu} = 0$。将所有自由运动项与生克场自作用项去掉后，五行场与生克场之间存在如下相互作用项（$A_{i j \mu} = \delta_{i k} A^k_{j \mu}$）：

$$
L_{\mathrm{int}} = g A^{\mu}_{i m} \phi^m \partial_\mu \phi^i + \frac{g^2}{2} A^i_{m \mu} A^{n \mu}_{i} \phi^m \phi_n
$$

显然，五行生克关系就是通过这两项实现的。

我们下面来看经典情况下五行生克的运动方程，容易从作用量密度导出如下：

$$
\begin{cases}
\partial_\mu \partial^\mu \phi_i = m^2 \phi_i + g \left( A^{\mu}_{k i} - A^{\mu}_{i k} \right) \partial_\mu \phi^k + g^2 A^{k}_{i \mu} A^{\mu}_{k l} \phi^l\\
G \partial_\nu F^{j \mu \nu}_{i} = g \phi^j \partial^\mu \phi_i + g^2 \phi^j A^{\mu}_{i k} \phi^k - G g \left( A^{j}_{k \nu} F^{k \mu \nu}_{i} - A^{k}_{i \nu} F^{j \mu \nu}_{k} \right)
\end{cases}
$$

直接硬解这个方程式非常麻烦的，比如生克场场强张量 $F^i_{j \mu \nu}$ 中包含了生克场的二次项，所以整个生克场运动方程式一个二阶矩阵的偏微分方程，很难直接求解。

但，从另一方面来说，我们注意到之前提到过的生克场的特性 $\sum_i A^i_{j \mu} = 0$，显然这一特性也会传递给其场强张量：$\sum_i F^i_{j \mu \nu} = 0$，因此我们对生克场场强张量的运动方程中所有元素上标求和，且认为 $\sum_i \phi^i$ 并不会在时空每一点上都精确为零，由此可得：

$$
\partial_\mu \phi^i = - g A^{i}_{k \mu} \phi^k
$$

这个意义就很明显了：元素 i 的变化量取决于能生克它的所有元素与相应生克场的量，很符合我们的五行直觉。

将这个结果代回运动方程可得：

$$
\begin{cases}
m^2 \phi_i = 0\\
\partial_\nu F^{j \mu \nu}_{i} = g \left( A^{k}_{i \nu} F^{j \mu \nu}_{k} - A^{j}_{k \nu} F^{k \mu \nu}_{i} \right)
\end{cases}
$$

也即，五行场的静质量必须为 0，且此后在每个位置上的总元素量 $\sum_i \phi^i$ 保持不变。而生克场虽然可以作用在五行场上引起元素生克变化，但五行场并不是生克场的源，生克场时自身的源。因此，如果空间中并不预先存在生克场，那么即便有再多的五行场，也无法凭空创造出五行生克变化。当然，换个角度来说，五行场在时空中分布的变化，也必然伴随着生克场的，且它不仅仅是引出生克场，而是确定了在变化位置生克场的具体值与方向，所以也可以视为一种源。

当然，我们也可以要求 $\sum_i \phi^i = 0$ 在时空每一点都成立，如果这样，我们依然可以得到这样的结论：

$$
\begin{cases}
\partial_\mu \phi^k + g A^{k}_{l \mu} \phi^l = V^k_\mu\\
A^{\mu}_{k i} V^k_\mu = 0\\
\sum_i V^i_\mu = 0\\
\partial^\mu V_{i \mu} = m^2 \phi_i\\
G \partial_\nu F^{j \mu \nu}_{i} = g \phi^j V_i^\mu - G g \left( A^{j}_{k \nu} F^{k \mu \nu}_{i} - A^{k}_{i \nu} F^{j \mu \nu}_{k} \right)
\end{cases}
$$

我们可以将它视为一种特例，这里不过多做分析。

此外，在不考虑生克场自作用的情况下，它的运动方程就是很常见的最典型的波动方程，但五行场的运动方程却是一阶偏微分方程，显然两者的行为非常不同。

非但如此，由于生克场的场强张量中包含了生克场的一次项与二次项两部分，生克场彼此之间的相互作用可以变得非常复杂而有趣，会呈现出很多复杂的互动关系。比如，如果同时存在 a 生 b 与 b 生 c 这两个生克场，那此时运动方程将变成：

$$
A^i_{j \mu} = \delta^a_j \left( \delta^i_b - \delta^i_q \right) V_\mu + \delta^b_j \left( \delta^i_c - \delta^i_q \right) W_\mu \Rightarrow\\
\begin{cases}
F^b_{a \mu \nu} = \partial_\mu V_{\nu} - \partial_\nu V_{\mu}\\
F^c_{a \mu \nu} = g \left( W_{\mu} V_{\nu} - W_{\nu} V_{\mu} \right)\\
F^q_{a \mu \nu} = \partial_\nu V_{\mu} - \partial_\mu V_{\nu} + g \left( W_{\nu} V_{\mu} - W_{\mu} V_{\nu} \right)\\
F^c_{b \mu \nu} = \partial_\mu W_{\nu} - \partial_\nu W_{\mu}\\
F^q_{b \mu \nu} = \partial_\nu W_{\mu} - \partial_\mu W_{\nu}
\end{cases}\\
\therefore \begin{cases}
\partial^\nu \partial_\nu V_{\mu} = 0\\
\partial^\nu \partial_\nu W_{\mu} = 0\\
W_{\nu} \partial^\nu V_{\mu} = 0\\
2 V_{\nu} \partial^\nu W_{\mu} = V^{\nu} \partial_\mu W_{\nu} - W^{\nu} \partial_\mu V_{\nu}
\end{cases}
$$

可见，此时在预料中的两个波动方程（第一、二条）之外，还多了两条耦合方程，使得这两个场并没有那么独立。当然，这组方程有一个很简单的形式：$W^\mu = \lambda V^\mu$，这样上述方程就退化为（这里还记上规范固定条件）：

$$
\begin{cases}
\partial_\mu V^\mu = 0\\
V^\nu \partial_\nu V_\mu = 0\\
V^\mu \partial_\mu \lambda = 0\\
\partial^\nu \partial_\nu V_{\mu} = 0\\
\partial^\nu \partial_\nu \lambda V_{\mu} + 2 \partial_\nu \lambda \partial^\nu V_{\mu} = 0\\
V^{\nu} V_{\nu} \partial_\mu \lambda = 0
\end{cases}
$$

显然，如果 a 生 b 的生克场非类光，那系数 $\lambda$ 就必须为常数，运动方程就变为：

$$
\begin{cases}
\partial_\mu V^\mu = 0\\
V^\nu \partial_\nu V_\mu = 0\\
\partial^\nu \partial_\nu V_{\mu} = 0
\end{cases}
$$

显然波动方向与自身方向正交的平面波、球面波甚至 Column 势就能满足条件了。

而如果 a 生 b 的生克场类光，那系数可以不是常数，从而方程为：

$$
\begin{cases}
\partial_\mu V^\mu = 0\\
V^\nu \partial_\nu V_\mu = 0\\
V^\mu \partial_\mu \lambda = 0\\
\partial^\nu \partial_\nu V_{\mu} = 0\\
\partial^\nu \partial_\nu \lambda V_{\mu} + 2 \partial_\nu \lambda \partial^\nu V_{\mu} = 0\\
V^{\nu} V_{\nu} = 0
\end{cases}
$$

则我们可以取 a 生 b 的生克场依然是一个波动方向与自身方向正交的类光场，同时 $\lambda$ 也是一个波动场所以满足 $\partial^\mu \partial_\mu \lambda = 0$，同时两者须满足如下耦合方程：

$$
\begin{cases}
V^\mu \partial_\mu \lambda = 0\\
\partial_\nu \lambda \partial^\nu V_{\mu} = 0
\end{cases}
$$

即 $\lambda$ 的波动方向与生克场、生克场的波动方向都正交。也即，我们可以认为现在这两个生克场虽然在每一点上的作用方向都是相同的，但强度存在一个差异，且这个差异的变化传播方向与场本身的方向、传播方向都正交。

可以预期到，如果在初始状态下十种生克场都存在，那最后的相互作用会是非常复杂的，简单的正交关系将不再满足条件，我们会面对一大坨完全“纠缠”在一起的生克场，其中的动力学关系与代数关系会非常复杂。

比如，如果现在存在这么几种生克场：a 生 b、b 克 d、d 克 a、a 克 c、c 克 e、e 生 a，那么此时由于 $F^a_{a \mu \nu}$ 必然恒为零，从而 $A^b_{a \mu} A^d_{b \mu} A^a_{d \nu}$、$A^b_{a \mu} A^d_{b \nu} A^a_{d \mu}$、$A^c_{a \mu} A^e_{c \mu} A^a_{e \nu}$ 与 $A^c_{a \mu} A^e_{c \nu} A^a_{e \mu}$ 之间就必须满足复杂的代数关系，使这四项必须相互抵消，否则将造成原本不应该存在的 $A^a_{a \mu}$ 的出现，即 a 元素自身可以无中生有或者凭空消失。从这个角度来说，或许它就是阵法的基本原理吧……

当然，我们还可以做一个简化：假定我们现在不区分是什么元素生什么元素，而是统一为“生场”与“可场”，它们分别为：

$$
A^{i \mu}_{j} = \left[ \delta^i_a \left( \delta^b_j - \delta^q_j \right) + \delta^i_b \left( \delta^c_j - \delta^q_j \right) + \delta^i_c \left( \delta^d_j - \delta^q_j \right) + \delta^i_d \left( \delta^e_j - \delta^q_j \right) + \delta^i_e \left( \delta^a_j - \delta^q_j \right) \right] A^\mu\\
A^{i \mu}_{j} = \left[ \delta^i_a \left( \delta^q_j - \delta^c_j \right) + \delta^i_b \left( \delta^q_j - \delta^d_j \right) + \delta^i_c \left( \delta^q_j - \delta^e_j \right) + \delta^i_d \left( \delta^q_j - \delta^a_j \right) + \delta^i_e \left( \delta^q_j - \delta^b_j \right) \right] V^\mu
$$

这样问题倒是可以简化了，现在规范场的运动方程为：

$$
\partial_\nu F^{j \mu \nu}_{i} = g \left( A^{k}_{i \nu} F^{j \mu \nu}_{k} - A^{j}_{k \nu} F^{k \mu \nu}_{i} \right)\\
X^{j}_{i \mu} = A^{k \nu}_{i} F^{j}_{k \mu \nu} - A^{j \nu}_{k} F^{k}_{i \mu \nu} = A^{k \nu}_{i} \partial_\mu A^{j}_{k \nu} - A^{j \nu}_{k} \partial_\mu A^{k}_{i \nu} - A^{k \nu}_{i} \partial_\nu A^{j}_{k \mu} + A^{j \nu}_{k} \partial_\nu A^{k}_{i \mu}\\
+ g A^{k}_{i \nu} A^{j}_{l \mu} A^{l \nu}_{k} - g A^{k}_{i \nu} A^{j \nu}_{l} A^l_{k \mu} + g A^{j}_{k \nu} A^{k \nu}_{l} A^{l}_{i \mu} - g A^{j}_{k \nu} A^{k}_{l \mu} A^{l \nu}_{i}\\
\partial_\nu F^{i \mu \nu}_{i} = g \left( A^{k}_{i \nu} F^{j \mu \nu}_{k} - A^{j}_{k \nu} F^{k \mu \nu}_{i} \right)\\
$$












----

接着，我们来考虑阴阳。

从我们朴素的情感来说，阴阳应该是相互抵消的二元对立的客体。但在中医中我们发现，一个人可能阴虚的同时，阳也虚。事实上，我们可以发现阴阳应该不是相互抵消的二元对立体，而应该是可以彼此共存的，只不过两者之间允许存在一定的转化。

从这个角度来说，最简单的选择就是将五行场与生克场都复化，实部为阳，虚部为阴。生克场如果始终保持实数，那就是阳木生阳火，阴木生阴货。但如果生克场也是复数，那样阳木可以生阳火，同时也可以生出部分阴火，甚至全部都是阴火。

但，无论我们如何调整复化后的生克场，我们依然要求关系 $\sum_i A^i_{j \mu} = 0$ 必须满足。

当然，这只是一种没有什么理论根据的纯脑洞罢了，作为我们建立模型的理论指导。我们完全可以换一套理论来建立模型，这个就看大家自己的喜好了。

----

上面只是经典的规范场论模型，我们当然也可以考虑将其量子化。

标准的量子化方案，就是利用上述作用量做配分泛函，所有场都对应到相应的算符，从而可以计算相应的量子过程：

$$
Z_0 \left[ \phi, A_\mu \right] = \int \exp \left( - i \int L d\varepsilon \right) [ d\phi] [d A_\mu]
$$

我们抛开繁琐的计算细节，只从性质上对量子化后的五行生克场进行简单的分析。

在量子化之后，我们考虑最常见的费曼图来做分析的工具。现在相互作用顶点主要有这么两个（这里考虑阴阳带来的复化操作，且不考虑生克场自身的相互作用）：

$$
\begin{cases}
L_3 = g \left( \bar A^{i \mu}_{j} \bar \phi^j \partial_\mu \phi_i + A^{i \mu}_{j} \phi^j \partial_\mu \bar \phi_i \right)\\
L_4 = g^2 \bar A^{i \mu}_{k} A^{l}_{i  \mu} \bar \phi^k \phi_l
\end{cases}
$$

看似很正确，但这里存在一个问题：生克场现在是传统意义上的规范场，这点没错，但五行场的行为已经发生了极大的不同，它满足的运动方程不是传统的有源波动方程，而是一阶偏微分方程 $\partial_\mu \phi^i = - g A^{i}_{k \mu} \phi^k$，它可以转化为如下形式：

$$
\bar \phi_i \partial^\mu \partial_\mu \phi^i = g^2 A^{i}_{j \mu} A^{j}_{k \mu} \bar \phi_i \phi^k
$$

这里，前者是自由运动的传播子，后者是相互作用项，换言之，三线顶角相互作用必须为零。

因此，在五行生克的量子过程中，五行场之间只存在四线顶角作用而不存在三线顶角作用，这是非常有趣的。

现在，两个五行场之间的相互作用最简单的形式是这样的：

![最简单量子过程的费曼图草图（*实在找不到像样的费曼图制作工具了……*）](/image/19321-321ba960a0e79157.png)

上下的直线是五行场，中间的红圈是两个生克场。

我们可以将这个理论与量子色动力学做一个比较：QCD 中中间规范场胶子携带一个色与一个反色，将夸克的色荷进行改变。而在我们的五行生克场中，中间规范场是生克场，它也携带一个“色”和一个“反色”，比如生成一个 b 与消耗一个 q。两者在形式上非常相似，且都有一个特点：单个粒子上的所有“色”的总量是守恒的。

真正有趣的地方在于，量子化之后的场存在真空能，也就是和输入输出无关的五行生克场形成的“线团”。而这个线团中因为可以存在五行场，所以也就可以造成其它五行场的属性改变。

例如，在经典情况下，如果空间中并不存在生克场，那么对应的五行元素是不会发生变化的。比如没有 a 生 b 的场，那即便 a 元素再多、q 元素再多，b 元素的量也不会发生变化。

但在量子化之后，情况发生了改变——真空中可以存在随机涨落的五行生克场，它们只需要在不确定关系约束的时间与空间范围内回归虚无就可以。那么比如现在随机涨落出了一个 a 生 b 的场与一个与之相反的场，由于五行场不会改变生克场而只会被生克场改变，那么这个随机涨落出来的生克场就可以作用在 a 元素上，使得空间中的 q 元素减少而 b 元素增加，原本不会发生改变的 b 元素由于真空量子涨落而发生了相应的涨落。而作用结束后，这个生克场又和相应的反场结合湮灭，回归虚无。

整个过程中，我们看到的是五行元素的量没来由地发生了改变，这是原本经典物理世界中所不可能发生的，现在却可能因为量子涨落而发生。

甚至于，在既没有五行场也没有生克场的情况下，上述过程一样可以发生：真空量子涨落中先涨落出了 a 场与负 a 场，然后又涨落出 a 生 b 的生克场及其反场，量量结合后，将原本为零的无属性 q 场消耗，凭空创造出了 b 元素后，不发生改变的 a 场对与 a 生 b 场对又回归虚空消失，我们能看到的是真空中无缘无故出现了 b 元素同时将 q 元素消耗为负。

这是量子化之后我们会看到的原本经典物理下所不可能存在的现象，其发生的概率正比于 $g^4$。

----

当然，我们也可以选择完全不遵守规范场论的框架，而使用别的方式来构造描述阴阳五行的场论，比如取作用量为如下形式：

$$
L = M_{i j} \bar \phi^i \phi^j + D_{i j}^{\mu \nu} \partial_\mu \bar \phi^i \partial_\nu \phi^j
$$

它给出的运动方程为：

$$
\begin{cases}
M_{i j} \phi^j = \partial_\mu D_{i j}^{\mu \nu} \partial_\nu \phi^j + D_{i j}^{\mu \nu} \partial_\mu \partial_\nu \phi^j\\
M_{j i} \bar \phi^j = \partial_\mu D_{j i}^{\nu \mu} \partial_\nu \bar \phi^j + D_{j i}^{\nu \mu} \partial_\mu \partial_\nu \bar \phi^j
\end{cases}
$$

不妨取 $D_{i j}^{\mu \nu}$ 为最常规的 $\delta_{i j} g^{\mu \nu}$，这样方程就变为：

$$
\begin{cases}
\partial^\mu \partial_\mu \phi_i = M_{i j} \phi^j\\
\partial^\mu \partial_\mu \bar \phi_i = M_{j i} \bar \phi^j
\end{cases}
$$

和之前一样，我们令矩阵 $M_{i j} = m^2 \delta_{i j} + g A_{i j}$，那样生克关系一样可以被表达出来。

甚至于，我们可以采用标量规范场：

$$
L = m^2 \bar \phi^i \phi_i + D_\mu \phi^i \bar D^\mu \bar \phi_i + M^2 \bar \theta^i_j \theta^j_i + D_\mu \theta^i_j \bar D^\mu \bar \theta^j_i\\
D_\mu \phi^i = \partial_\mu \phi^i + g \partial_\mu \theta^i_j \phi^j
$$

相应的运动方程为（$\theta_{i j} = \theta^k_j \delta_{i k}$）：

$$
\partial_\mu \partial^\mu \phi_i + g \partial_\mu \partial^\mu \theta_{i k} \phi^k = m^2 \phi_i + g \left( \partial_\mu \bar \theta_{j i} - \partial_\mu \theta_{i j} \right) \partial^\mu \phi^j + g^2 \partial_\mu \bar \theta_{j i} \partial_\mu \theta^j_{k} \phi^k
$$

你看，一样可以让五行元素产生生克变化。

总之，理论上我们可以选择作为五行生克的理论模型有非常多，从基础的理论框架，到一些细节，都有很大的自由选择的空间。

---

最后，我们还是要再次强调，上面所做的一切都只是一个 Toy 理论，纯粹是为了好玩而作，和实际物理一点关系都没有，我们没有丝毫证据可以证明真的存在上述五行场或生克场。

但，如果你要写小说的话，这里倒是给了你一个不错的“理论依据”，你可以以此为基础来构建自己的阴阳五行世界，说不定会很有趣哦。