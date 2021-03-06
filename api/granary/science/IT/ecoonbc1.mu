标题：社区上的代币经济生态·上
作者：LostAbaddon
更新：2018.09.30 15:49:04
关键词：区块链 代币经济 社区生态

---

我们考虑在一个最简单的社区系统上，建立一套代币经济生态。

这个系统有多简单？简单到，所有用户都按照相同的一套行为标准来行动，没有例外，连投机都能被这套规则刻画。

这是一个标准的数学化、形式化的世界。

---

## 社区与代币

社区是节点的集合，而节点是提供各种功能的基础元素。一个社区中包含的节点种类越多，能提供的服务也就越多，整个社区的价值才能越高。

**代币是社区这具躯体中流动的血液**。虽然社区上的功能与业务可以分为**无币业务**与**有币业务**，但不可否认的是代币是将社区上的各项功能与业务贯穿为一个整体的必要元素。

因此，考察社区中的经济生态，一个核心问题就是__考察社区中的代币流是否处于*健康状态*__，即社区中投入的代币是否够用、是否存在流通性不足或过剩的问题，节点用户的消费欲望是否得到满足、大家是否不再想用代币进行消费。

简而言之，核心问题就是代币发放以及代币自身价值的波动是否在健康范围内，是否能维持和促进消费，还是在抑制消费。

基于这个问题，更进一步的是社区本身的消费规则的设定是否合理，社区交互规则本身对代币消费以及基于其上的代币经济起到了什么样的作用。

这就是代币经济生态的**核心问题**。

---

## 代币与交易

我们假定，社区内有 N 个点，记为 $N_i$，每个点上都有代币，记为 $C_i$，从而整个社区的代币总量显然就是 $C_T=\sum_{i=1}^N C_i$。

接着，给这个社区上注入交易 $T_i=(f_i,t_i,c_i)$，其中 $f_i$ 表示第 i 笔交易的转出方，$t_i$ 表示转入方，$c_i$ 表示交易金额。

与交易相对的，就是每个节点的**储蓄量** $S_i$，定义为节点 i 在每次交易后留下的货币量的最小值。比如一个节点一开始有 100 个代币，进行了三次交易，每次交易后剩下的代币量分别是 90、85、95，那么该节点的储蓄量就是 85。

因此，我们可以来讨论社区上的流动货币总量（**总流通量**） $T = \sum T_i$ 和**总储蓄量** $S=\sum S_i$。

> 需要指出的是，由于交易是在不断进行的，所以这里的流通量 T 和储蓄量 S，是随着时间而变的，而且事实上真正有意义的是一段时间内的流通量与储蓄量，并不一定要看整个历史上的情况。在不加说明的情况下，流通量和储蓄量都被认为是到当前位置的一个特定时间段内的统计值。

现在，整个社区构成了一张有向网，点是社区的节点，边是社区上的交易，方向是资金流转方向，且连接节点 A 和 B 的有向边可以有复数条，如下图：

![一个由六个节点构成的小社区](/image/19321-469cc6200be69f33.png)

我们可以很快写下这样一个社区上的基本动力学方程（虽然目前该方程本身毫无额外意义）：

$$
C_i(t+1) - C_i(t) = \sum_{j=1}^N \left( T_{j,i} - T_{i,j} \right)\tag{1}
$$

其中 $T_{i,j}$ 代表了由节点 i 转给节点 j 的所有交易的总代币量。等式左边是节点 i 在统计周期（也就是统计所有交易的时间段）内所持代币的增量，而右边是所有转入交易代币量减去所有转出交易代币量。很显然，如果我们将等式左右对节点指标 i 做一个遍历求和，那么左边就是系统总代币量在一个统计周期内的增量，它等于右边的二次遍历求和，结果为 0，即目前这个系统的代币总量是守恒的。

现在我们就有了一个由 N 个节点构成的、存在一组交易 $\{T_i\}$、每个节点上的储蓄量为 $S_i$ 的社区网络，下面就来对这个网络进行一些分析。

### 1，无锚定代币网络

所谓**无锚定代币网络**（UTN，Un-anchored Token Network），即网络中的所有代币交易不存在一个系统规定的交易价格。

> 这里使用“网络（Network）”一词而非“社区（Society / Community）”，主要是为了表征我们现在是从数学的角度来看到这个问题。在数学上，一个代币社区就是一张**有向图（Directed Graph）**，而考虑上其中节点之间的连接特性后，便是一个**复杂网络（Complexy Network）**——可能是随机网络，也可能是小世界网络。

举例来说，UTN中 A 与 B 之间要进行一笔交易，A 支付给 B 一笔代币 c，用于购买货物或者服务 X，那么 c 到底应该是多少并没有系统规定，而是完全由 A 和 B 自己商议决定。

UTN 是一个**共形网络**（Conformal Network），即如果我们将每个节点（同时也包含了每一笔交易）的代币量乘上一个大于零的任意系数 $\lambda$，这样得到的新社区和老社区之间其实没有任何差异。

举例来说，假定我们现在社区 A，其上有 10 个节点，总共有一万枚代币，到目前为止总共有 100 笔交易，其中 90 笔转账了 1 枚代币，5 笔转账了 10 枚代币，3 笔转账了 20 枚代币，2 笔转账了 100 枚代币。然后我们还有一个社区 B，还是 10 个节点，但总共有十万枚代币，也有 100 笔交易，但 90 笔转账了 10 枚代币，5 笔转账 100 枚代币，3 笔转账 200 枚，2 笔转账了 1000 枚。这样两个社区 A 和 B，从代币流通的角度来说，是完全一样的，并没有什么分别。如果我们设置社区 A 的一枚代币可以兑换社区 B 的 十枚代币，那么就会发现都用社区 A 的代币或者都用社区 B 的代币来结算的时候，这两个社区上的所有交易没有丝毫区别。

这样的特性被称为**共形不变性**（Conformal Invariance）。

UTN 的共形不变性表示，在 UTN 上谈论代币总量的值是没什么意义的，它可以是任意值。

因此，我们必须找出 UTN 上的一个特征值，由它来表征整个网络的价值到底是多少。

让我们回到问题的最初，即代币社区究竟是什么。

代币社区的本质，是**将社区上的物品与服务、接入社区的物品与服务通过代币作为等价交换物进行流通的离散网络**。因此代币社区上真正有价值的并不是代币本身，而是在其中以代币为载体进行流通的物品与服务。

因此，要衡量一个代币社区的总价值，光衡量代币总量是没用的——即便在存在交易所的网络中，使用法币对代币进行定价后，由于投机行为的存在，光看代币总量对应的法币总值也不能得到整个社区的总价值。

一个最直接的手段，是找到愿意使用社区上代币进行价值流通的那些物品与服务，从而可以在代币网络的每一根有向边上赋予一个额外属性：**价值**（Value）。因此现在一笔交易就有四个属性：转出方 f、转入方 t、交易代币量 c 和交易价值量 v。而这样的网络可以被称为**赋价网络**（Valued Network），相应的 UTN 如果赋予价值结构后，就成了**赋价无锚定代币网络** VUTN。

到这里仅仅是一些字面上的花活，并不涉及到一些根本内容。

在 VUTN 上，我们可以得到两类值：流通的总价值 V，和流通的总代币 T。理想状态下，每一枚代币的价值就是这两个的币值：$v=\frac{V}{T}$，从而每一笔交易以及全网总代币的价值也就可以换算出来了。

但，这是一个理想状态，实际情况中，V 是一个很难给定具体值的东西。

如果代币网络中的代币都对应的是实物，那么相对而言可能还较容易定价。比如全网流通的代币总量为 1000 枚，总共被用来购买了 1000 枚苹果，那么每一枚代币的价值就是一枚苹果，这个是很容易定价的。

但问题在于，实际情况总我们并无法对代币的所有对应物进行定价，即 V 本身的值我们无法确定下来。而且，实际情况下很多时候能用代币购买多少物品与服务，取决于代币的定价，因此要通过代币能换取的价值来为代币定价本身就需要先给代币以定价，这样就陷入了循环定义中。

因此，赋价网络虽然看上去很美好，但实际上却缺乏可操作性。

但这一尝试给了一个思路：我们要确定一个代币网络中的代币的总价值，就要找到一个基本衡量单位，用这个衡量单位来计算所有交易的总量，得到的就是整个网络的价值了。

于是，我们下面就开始寻找这一特征衡量单位。

### 2，代币交易的特征值

假定，一个代币网络上的代币总量是 C，然后使用这个网络的人进行交易的时候，每一笔交易都是一枚代币，以换取自己所需的物件与服务，那么这个网络的总价值是多少？

接着，还是这个网络，但现在每一笔交易都是两枚代币，那么现在这个网络的总价值又是多少？

显然，我们可以认为前者的总价值是 $C$，而后者是 $\frac{C}{2}$。这是因为，假如我们认为这个社区在两个情况下，每一笔交易所购买的物件或服务是相同的，那么其价值也就应该是相同的，那么后者既然每笔两枚代币而前者只需要一枚，这就表示后者情况下一枚代币能兑换的价值只有前者的一半。也就是说，在社区的总代币量保持在 C 时，前一个情况下的总价值是后一个情况下总价值的两倍。

因此，我们现在的任务就是要找到这个“最小交易单位”，下面称其为“**元交易**（Meta Transaction）”。

由于 UTN 是共形不变的，因此元交易本身也应该是**共形不变**的，即假如我们将网络中所有节点和所有交易的代币量同时乘一个大于零的系数 $\lambda$，那么找到的元交易的代币量也要相应地变成原来的 $\lambda$ 倍。

元交易要能体现系统当下交易的特性，是所有交易的基础单位——但不是最小单位。可能存在部分交易在特殊意图的驱动下，采用元交易的分数倍。

因此元交易是当下所有交易的一个特征尺度，而非最小尺度。

为了找到该特征尺度，就必须从所有交易构成的集合 $\{T_i\}$ 入手。

所有交易的交易量构成的集合，天然有一些特征值，如最大值 max、最小值 min、平均代币量 ave 和中位代币量 mid。这些特征量都是共形不变的。但这些值本身都不适合作为这里所要的元交易量。

同时，我们以每一笔交易的代币量 $c$ 为横轴，同代币量的交易次数 $n_c$ 为纵轴，这样就可以得到一个代币交易分布。利用交易次数，我们可以为代币量为 c 的交易赋予一个权重：

$$
p_c = n_t \exp \left( - c^2 \right)
$$

这个分布的特点，便是交易用代币量越小，权重越大；交易次数越多，权重越大。但这个分布的缺点也很显然，那就是它不具备共形不变性。

为此，我们可以利用具有共形不变性的别的特征量来进行调整：

$$
p_c = n_t \exp \left[ - \left( \frac{c}{\mathrm{mid}} \right)^2 \right] \tag{2}
$$

这样得到的权重是共形不变的，也即所有节点持有和交易的代币量都乘上系数 $\lambda$ 后，对应代币交易量的权重不会发生变化。

而采用这种权重后，我们便可以得到一个用于描述所有交易所承载价值的特征值，即元交易量：

$$
C_M = \frac{\sum_c c p_c}{\sum_c p_c}\tag{3}
$$

举例来说，现在有下面这组交易：

|代币量|交易次数|
|-|-|
|10|20|
|15|25|
|20|25|
|30|20|
|50|10|
|100|5|

共有交易 105 笔，总交易量为 2675 枚代币，平均每笔交易使用代币 25.476 枚，交易代币中位值为 20，元交易特征值为 15.010。

我们可以取元交易量为 15，且称一倍元交易代币量为“1 特征币”，从而所有交易可以被改写为：

|特征币量|交易次数|
|-|-|
|$\frac{2}{3}$|20|
|1|25|
|$\frac{4}{3}$|25|
|2|20|
|$\frac{10}{3}$|10|
|$\frac{20}{3}$|5|

而所有交易的总量为 $\frac{535}{3}$ 枚特征币，而如果社区上的代币总量为 1 万枚，那么就等于有 $\frac{2000}{3}$ 枚特征币。

未来，如果社区上的代币量增加，而每一笔交易也等比例增加，那么社区的总特征币量将依然保持不变。

从功能上来说，特征币衡量了网络代币吞吐能力的基础单位（虽然不是最小单位），同时也衡量了每一枚代币的流通性负载能力。特征币越小，单位代币的流通性负载能力就越强，反之则流通性负载能力越弱。

特征币本身无法衡量网络上的代币流通所携带的价值，但也从侧面反映了网络的价值。

当两个社区的元交易特征值 $C_1$ 和 $C_2$ 已知时，如果没有别的可以用来锚定价格的参照物，且两个社区的交易的商品范围重合度足够高的时候，可以给出两个社区的代币 $T_1$ 和 $T_2$ 的汇率：$T_1 = \frac{C_1}{C_2}T_2$。

下面，我们要进一步来考察代币网络的流通性。

### 3，约化流通图

让我们回到最开始的社区结构上：我们有 N 个点，以及一组交易。

要刻画网络上交易的特征，有一个最基本的问题，就是要如何筛选出那些存在恶意的交易？

比如说，节点 A 和节点 B 之间其实并不存在任何交易，但出于某些特殊的原因，他们之间必须构造出交易，而这些交易会被考虑进整个社区代币经济生态中，从而对生态产生影响。

我们当然可以说，如果不存恶意的节点足够多，那么恶意节点带来的影响可以认为是很有限的。但这样的说法总是过于随缘、过于感性了，我们还是需要从制度和规则上来尽可能降低恶意交易带来的影响。

因此，需要对交易构成的流通图进行一定的约化，得到更有价值的**约化流通图**（RCG，Reduced Currency Graph）。

原本的**交易流通图**（TCG，Transaction Currency Graph）是一张有向图，节点是账户，连边是交易，连边方向是资金转账方向，连边权重是交易代币量。

这张图的天生问题，就是连接节点 A 到 B 的边可能有复数条，这样图本身带有很大的冗余性。

另一方面，就是 A 和 B 之间不断通过相互转账，有可能会增加彼此在图中的权重。

为了解决这两个问题，我们需要引入“**n 圈减除**（n-LS，n-Loop Substraction）”。

在此之前，我们可以先定义一些基本操作。

在同一个网络中，假定存在两张图 G1 与 G2。它们刻画了同一个网络中的两种不同的交易流。因此我们可以定义图的加法与减法：

$$
T_{3;A,B} = T_{1;A,B} + T_{2;A,B}
$$

即图 G3 的每一条有向边的权重（交易代币量）等于 G1 与 G2 连接相同两点的有向边的权重之和（如果无有向边连接，则计算时该权重为 0），那么 G3 就称为是 G1 与 G2 的**合图**，即图的**加法**，算符记为 $\oplus$：$G = G_1 \oplus G_2$。合图可能存在同一条边的两个相反方向上都有权重的情况，此时需要做减除，方向取较大权重的方向。

相似的方式可以定义图的减法：

$$
T_{3;A,B} = T_{1;A,B} - T_{2;A,B}
$$

但需要注意的是，如果上述操作的值最后是负数，那么需要在方向边上加上相应权重值。这样得到的图 G3，被称为是 G2 扣除 G1 得到的**余图**，即图的**减法**，算符记为 $\ominus$：$G = G_1 \ominus G_2$。

一张图的**逆图**的定义也很简单，将所有有向边的方向反向，得到的图就是原图的逆图，算符记为 $G^{\dagger}$。

至此，在图集 $\{G\}$ 上引入的合图运算 $\oplus$ 构成了一个群 $\left< \{G\}, \oplus \right>$。

最后还有图的数乘：新图每一条有向边的权重为原图对应边权重的 $\lambda$ 倍，则称新图是原图数乘 $\lambda$，记为 $\lambda G$。从现在图集 $\{G\}$ 可以视为一个矢量空间 $\left< \{G\}, R \right>$。

下面，令 $T_{A,B}$ 代表从节点 A 转入节点 B 的总代币量，因此它已经代表了原本从 A 指向 B 的所有有向边的总作用。用 $T_{A,B}$ 取代原来的一组有向边，将若干条从 A 到 B 的有向边约化为一根有向边，这样的操作被称 **0 圈减除**（0-LS），得到的图为 **0 圈减除图**（0-LSG）。

接着，我们在 0-LSG 上构造进一步的约化图，它定义为 0-LSG 中连接 A 到 B 与 B 到 A 的有向边的权重差：

$$
\hat T_{A,B} = T_{A,B} - T_{B,A}
$$

如果它大于 0，则约化交易从 A 流向 B；如果小于 0，则约化交易从 B 流向 A；如果等于 0，则可以视为 A 和 B 之间没有交易。

这样，就将原本从 A 指向 B 和从 B 指向 A 的一对有向边约化成了至多一根有向边，这个操作被称为 **1 圈减除**（1-LS）。

经过 1-LS 处理的图中，任意两点 A 和 B 之间至多只存在一根有向边相连，且绝对不存在 1-圈（即只由两个节点构成的封闭圈），这样的图被称为 **1 圈减除图**，简记为 1-LSG。

1-LSG 还有一个约化残余，我们将其称为“**1 圈余图**（1-LRG，1-Loop Remaining Graph）”：$\mathrm{LPG}_1 = \mathrm{RCG}_0 \ominus \mathrm{RCG}_1$。1-LRG 的一个特点，就是 A 到 B 的有向边和 B 到 A 的有向边的权重肯定是相同的。

很显然，1-LSG 与 1-LRG 的合图，就是 0-LSG：

$$
\mathrm{LSG}_1 \oplus \mathrm{LRG}_1 = \mathrm{LSG}_0
$$

如果原本的流通图中节点 A 和 B 之间存在大量交易，且最后这些交易彼此抵消，那么最后在 1-LSG 中将不会保留这部分信息，而在 1-LRG 中会保留。但有时我们并不希望将所有这些交易的信息都抹去，从而可以构造一个权重为 $\omega$ 的新图：

$$
G_\omega = \mathrm{LSG}_1 \oplus \omega \mathrm{LRG}_1
$$

这张新图中将保留交易信息，并且可以通过调整权重来调节这些信息的呈现方式。

接下来，我们可以进一步做 2-LS。

1-LS 所用的 1-圈很容易构造，只要是连续有向边构成形如 $A \rightarrow B \rightarrow A$ 的有向环即可，而环的权重是 A 到 B 的有向边的权重与 B 到 A 的有向边的权重的较小值。

同理，我们可以构造 2-圈为形如 $A \rightarrow B \rightarrow C \rightarrow A$ 的有向环，环的权重是 A 到 B 的有向边、B 到 C 的有向边和 C 到 A 的有向边三条边的权重的最小值。

但在做扣除的时候，0-LSG 中扣除 1-圈是很容易的，因为任意两个 1-圈之间肯定不存在公共边。但 1-LSG 中扣除 2-圈会有一定的问题，因为 两个 2-圈之间是允许有公共边的。

这里，我们所选择的约化方式是**最小权重优先减除**（MWFS），即便对于一张 1-LSG，找出其中所有 2-圈，对根据是否有共同边进行分类。将属于同一类的所有 2-圈合成一张新图，取新图每条边的权重 px 与原图对应边权重 py 的比 $\frac{py}{px}$ 的最小值为系数乘在图上，即得该类对应的图，随后将原图扣除所有类图，记得 MWFS 所得的新图。

1-LSG 通过MWFS 处理后可以得到新图 1-LSG-1，接着不断用 MWFS 对上一轮得到的新图做约化，直到左右 2-圈都被扣除为止。这样得到的图就是我们所要的 2-LSG，而 1-LSG 扣除 2-LSG 的部分（也就是 MWFS 不断扣除的部分合在一起），就是 2-LRG。

很显然，一次 MWFS 操作后，必然至少有一条原图中的边被消除，所以只要图本身是有限图，那么 MWFS 肯定会在有限次操作后终止，而终止后的图中将不再存在扣除的基础 n-圈，因此一张(n-1)-LSG 经过有限次 MWFS 后可以得到一张 n-LSG，而扣除的部分合在一起就是 n-LRG。

这个过程可以一直持续到某一张 n-LSG 上无法再找出 (n+1)-圈为止，因此此时这张 n-LSG 就是一张最终 DAG——有向无环图。

并不是所有的代币流通图最后都会剩下 DAG，对于这种特殊情况，为了计算方便，我们可以认为 DAG 就是一张权重恒为 0 的图。

因此，现在我们可以将一张任意的代币流通图分解为一系列约化流通图与一张有向无环图的合图：

$$
\mathrm{LSG}_0 = \mathrm{DAG} \bigoplus_{i=1}^D \mathrm{LRG}_i
$$

其中 D 是 DAG 的阶数，被称为代币流通图的**约化深度**。

下面，我们就可以构造真正需要的约化流通图了，它被称为**完全约化流通图**（完全 RCG）：

$$
\mathrm{RCG} = \lambda \mathrm{DAG} \bigoplus_{i=1}^r \omega_i \mathrm{LRG}_i\tag{4}
$$

我们可以取 $\lambda = 1$、$\omega_i = \left( \frac{i - 1}{i} \right)^2$，而 r 便是约化深度。

我们也可以取前 n 阶的 LRG 与第 n 阶的 LSG 来构造 n 阶 RCG：

$$
\mathrm{RCG}_n = \lambda \mathrm{LSG}_n \bigoplus_{i=1}^n \omega_i \mathrm{LRG}_i\tag{5}
$$

因此，完全 RCG 就是 r 阶 RCG。

我们可以将 RCG 看做是对 0-LSG 的高通。n-LS 操作可以看做是将图的 n 阶圈结构都剥离，剥离出来的 n-LRG 反映了圈结构信息，而 n-LSG 则保留了网结构信息，因此 RCG 便是对小尺度圈结构进行抑制而尽可能保留大尺度网结构的滤图，类似傅里叶变换后对高频部分进行抑制而保留低频部分，从而尽可能反映图的大尺度结构。

举例来说，现在一张网上有 4 个节点，存在如下交易组：

|方向|代币量|次数|
|-|-|-|
|A - B|30|2|
|A - C|15|5|
|A - D|20|8|
|B - A|40|1|
|B - C|40|1|
|B - D|20|2|
|C - A|10|4|
|C - D|15|3|
|D - A|5|8|
|D - B|10|8|

这样的网络中，总共有 42 笔交易，交易代币总量为 620 枚代币，平均每笔交易代币量为 14.762 枚代币，交易量中位数为 15 枚代币，元交易特征值为 9.826 枚代币。

因此，该交易流通图的 0-LSG 为：

|方向|代币量|
|-|-|
|A - B|60|
|A - C|75|
|A - D|160|
|B - A|40|
|B - C|40|
|B - D|40|
|C - A|40|
|C - D|45|
|D - A|40|
|D - B|80|

分解出的 1-LSG：

|方向|代币量|
|-|-|
|A - B|20|
|A - C|35|
|A - D|120|
|B - C|40|
|C - D|45|
|D - B|40|

以及 1-LRG：

|方向|代币量|
|-|-|
|A - B - A|40|
|A - C - A|45|
|A - D - A|40|
|B - D - B|40|

可以看到，1-LSG 中有唯一 2-圈：$B \rightarrow C \rightarrow D \rightarrow B$，因此还可以进一步将 1-LSG 分解出 2-LSG：

|方向|代币量|
|-|-|
|A - B|20|
|A - C|35|
|A - D|120|
|C - D|5|

以及 2-LRG：

|方向|代币量|
|-|-|
|B - C - D - B|40|

2-LSG 已经无法再分解出 n-圈，所以是最终 DAG，整个交易流通图的约化深度为 2。

我们再将它们合成为最终想要的 RCG：

|方向|代币量|
|-|-|
|A - B|20|
|A - C|35|
|A - D|120|
|B - C|10|
|C - D|15|
|D - B|10|

这么一来，RCG 上的有效交易总量只有 210 枚代币，有 410 枚代币被约化掉——那些被约化掉的交易很可能是存在不恰当交易行为或意图的，至少也是只具有小范围影响力而对整体而言不怎么重要的。

我们将 RCG 上的交易称为**主交易**，而不在 RCG 上的交易称为**次交易**。

可以看到，0-LSG 基本保留了 TCG 的主要特征，包括连通性等拓扑结构。1-LSG 在在 0-LSG 的基础上扣除了闭合圈结构，基本保留了代币流通特征，但在拓扑结构上会发生一些改变，一些 1-圈如果正反方向的权重相同，则两条边都会被扣除，从而破坏连通性。RCG 与 1-LSG 的拓扑结构相同，但更进一步将广域流通性保留了下来而抑制了局部流通性，是一种滤图。因此，我们可以认为 RCG 基本反映了真实代币流通情况，所有有价值的信息都被保留了下来。

最终，我们可以通过主交易和元交易特征值，来得到整个社区上的代币流通性最有价值的部分。

举例来说，我们模拟一个 150 个节点的社区中，分成 4 个层次，一个层次主要是生产者，一个层次是普通消费者，一个层次是超级消费者，一个层次是原料生产提供商。代币从消费者流向生产者，再从生产者流向提供商，生产者和提供商再将代币流向消费者。总共模拟了 10000 笔交易，总交易量将近 6 千 4 百万枚代币，最小值为 101 枚代币，最大值为 59961 枚代币，中值为 197 枚代币，元交易特征值为 144 枚代币，所以交易总量约为 45 万枚元交易币。在 RCG 中只留下 3774 笔交易，主交易量约为 4 千 5 百万枚代币，约为 31 万枚元交易代币。

#### k-剪枝

当社区上的交易很多时，我们往往并不需要关注交易的全貌，而只需要关注最核心的交易。

RCG 的作用仅仅是扣除小尺度上那些不重要的交易，并不能凸显出那些真正重要的交易，所以我们需要在 RCG 上做剪枝，保留核心交易内容。

> 对于图的常见剪枝手段有很多，常见的有 k-Core 图、 k-Truss 图等，基本都是对节点或边做取舍。
其中 k-Truss 图（k-桁架图）是指将原图所有边中能成为至少 k-2 个三角形的边的那些保留而成的子图，也即所有边中首位节点存在至少 k-2 个公共 1 阶邻点的边所构成的子图，它是 (k-1)-Core 图的子图。
对于有向图而言，可以有强 k-桁架图和弱 k-桁架图两种，前者要求一条边必须是至少 k-2 个同向三角形的边，而后者则不要求方向。
![一个例子，a是原图，b是3-桁架图，c和d其实一样，分别是4-桁架图和5-桁架图，e是6-桁架图，f是7-桁架图，也是原图的最大桁架图。](/image/19321-da34e31495d01673.png)

我们将 RCG 上每个节点的所有转入和转出的交易构成一个集合，并对这个集合以交易代币量做由多到少的排序，取其前 k 条保留，这样得到的就是**深度为 k 的剪枝约化流通图**（k-PRCG，$\mathrm{PRCG}_k$，Pruned Reduced Currenty Graph）。

这里，我们不要求保留的有向边必须是以节点自身为起点或终点，而是完全以权重为单位，这样是为了能保留一个节点到底是流入占主还是流出占主这一特性。

以上面的例子来说，其 1-PRCG 为：

|方向|代币量|
|-|-|
|A - B|20|
|A - C|35|
|A - D|120|

而 2-PRCG 则就是 RCG 本身。

假如我们对 n-RCG 做 k 剪枝，那么得到的就是**剪枝深度 w、约化深度为 n 的 PRCG**（(k,n)-PRCG，$\mathrm{PRCG}_{k,n}$）。

在前面的 10000 笔交易的社区例子中，(3,3)-PRCG 中保留了 300 笔交易，代币量约为 1 千 6 百万枚，占总交易量的约 24.5%；(5,3)-PRCG 中保留了 475 笔交易，代币总量约为 2 千 2 百万枚，占总交易量的约 34.9%。

在当前的 $\omega_i$ 系数的选择下，RCG 不会改变 1-LSG 的拓扑结构，但 1-LSG 会改变 0-LSG 的拓扑结构，0-LSG 会改变 TCG 的拓扑结构但不会改变连通结构。而 PRCG 则会改变 RCG 的拓扑结构，甚至于引起图的碎片化，产生大量彼此独立的**弱连通子图**（TCG 上也可能有弱连通子图，这些拓扑结构会保留到 RCG 中，但 PRCG 会造成新的弱连通子图）。

> 弱连通子图，是将有向图的方向抹去后得到的无向图的连通子图，子图中任意两点都有一组边可以相连。

同样的，从 1-LSG 一直到 PRCG，交易具有如下特性：

$$
\begin{cases}
T_{i,j} \times T_{j,i} = 0\\
T_{i,j} + T_{j,i} \ge 0\\
T_{i,i} = 0
\end{cases}
$$

即便，正反方向至少有一个是 0，而不为 0 的那个必然大于 0，进而有 $\max (T_{i,j} - T_{j,i}, 0) = T_{i,j}$。

PRCG 上的一张弱连通子图权重为所有边权重的和。PRCG 中权重最大的弱连通子图所包含的总交易代币量 记为 $\tilde T$，将所有所含交易的代币量不小于 $\frac{\tilde n}{e}$ 的弱连通子图并在一起，构成 PRCG 的**核部**（cPRCG，或 $\mathrm{cPRCG}_{k,n}$）。绝大多数情况下，核部基本就是 PRCG 的最大弱连通子图。

核部在大多数情况下，包含了 PRCG 中最重要的交易内容，而 PRCG 体现了 RCG 上最主要的那些交易，所以主部在理想情况下反映了交易的核心部分。事实上，对于足够平均的交易网络，只要交易数足够多的时候，cPRCG 基本就等于 PRCG。

我们可以将 cPRCG 上的交易被称为**核心交易**（cTX），PRCG 中别的交易被称为**核外交易**（oTX），它们一起被称为**主部交易**（mTX），0-LSG 扣除 PRCG 后的图中的交易为**剩余交易**（rTX）。

最后，我们可以在 cPRCG 上计算每个节点的权重。

---

后篇请看[《社区上的代币经济生态·下》](/article/science/IT/ecoonbc2.mu)。