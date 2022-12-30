标题：含间谍节点的分布式随机排序问题的泄密概率
作者：LostAbaddon
更新：2018.05.28 21:31:29

最近在做各种区块链方案、架构和算法的设计，这个问题就是其中之一。

问题本身是这样的：

> 全网有D个节点，1到N这N个数字。D个节点中有b个间谍节点，会将数据泄露出去。现在，将数据分成m份，每份都是连续数字段，保存在D个节点中的m个上，这m个节点被称为记录节点，且尽可能平均地保存这些数字段。然后建立这N份数据的索引，从而可以通过索引值到某个记录节点来读取数据。现在的问题是：当m为多少时，间谍节点通过自己掌握的数据来猜出全网数据的可能最小？

事先没人知道间谍节点是哪些，只知道有b个节点是间谍节点。而记录节点是通过算法选出的，可以避免拜占庭节点——从而我们可以认为所有D个节点都是非拜占庭节点，但算法本身无法找出哪些是间谍节点，直到消息泄露之后才有可能知道。

而题中所提到的索引，会为全网节点建立一个排序，从而将每个记录节点及其上的数字段对应起来，只不过每个记录节点会为数字段做一个随机排序。索引是每个节点都可以获取的全网公开数据。

而所谓泄密，就是对于网络之外的节点，如果发现有人想网络查询序号i，它可以不通过网络来知道i对应的数字是哪一个，那么就称它泄密了。

这是一个很常见的组合数学问题，可以应用在各种场合和领域。

首先，很显然地，如果`m=1`，所有数据保存在唯一一个记录节点上，那么就有`b/D`的概率这个节点是间谍节点，因此泄密的可能就是`b/D`。而如果`m=D`，且`N<=D`，那么由于索引的存在，每个节点中所保存的数字可以直接通过索引读出来，因此泄密的可能是100%。

对于记录节点，假定其上保存了x个数字，那么如果它是间谍节点，那么这x个数字泄密的概率是100%，毫无疑问。而如果它不是间谍节点，那么泄密的概率就是`1/x!`。

这样，对于D个节点、N个数字、b个间谍节点、m个记录节点，且记录节点中有i个间谍节点的情况，就可以很快地写出泄密概率：

$$
P(N, D, b, m, i) \approx \Gamma \left( \frac{N}{m} + 1 \right)^{i - m}
$$

这里将阶乘改写为Γ函数，是为了计算方便，因为如果m个节点尽可能平均地记录数字的话，那大多数情况下记录的数字量会有一个差异，但方便计算的话可以使用分数的Γ函数。

全网D个节点中有b个间谍节点而m个记录节点中有i个间谍节点的可能性为：

$$
C(D, b, m, i) = C^i_m C^{b - i}_{D - m}
$$

这里我们约定 $C^a_b = \frac{b!}{a! (b - a)!}$。

因此D个节点、N个数字、b个间谍节点、m个记录节点的情况下，泄密概率为：

$$
P(N, D, b, m) \approx \frac{\sum_{i = 0}^b C(D, b, m, i) P(N, D, b, m, i)}{\sum_{i = 0}^b C(D, b, m, i)}\phantom{wwwwwww}\\
= \frac{\sum_{i = 0}^b C^i_m C^{b - i}_{D - m} \Gamma \left( \frac{N}{m} + 1 \right)^{i - m}}{\sum_{i = 0}^b C^i_m C^{b - i}_{D - m}}\phantom{ww}\\
= \frac{1}{C^b_D} \sum_{i = 0}^b C^i_m C^{b - i}_{D - m} \Gamma \left( \frac{N}{m} + 1 \right)^{i - m}
$$

所以现在问题就是找出令函数 $P(N,D,b,m)$ 在N、D、b确定时为最小值的m，从而也就是令其分子为最小值的m。

当 $N/m$ 足够大的时候，我们可以使用 $P(N,D,b,m)$ 分子的求和部分在N、D、b、m确定时的最大项来代表 $P(N,D,b,m)$，这样问题就变成了找出这个代表函数的最小值的问题。

先来找出这个求和部分的最大项：

$$
\because Q(N, D, b, m, i) = C^i_m C^{b - i}_{D - m} \Gamma \left( \frac{N}{m} + 1 \right)^{i - m}\phantom{wwwwwwa}\\
\therefore \frac{Q(N, D, b, m, i + 1)}{Q(N, D, b, m, i)} = \frac{(b - i) (m - i)}{(D - m - b + i + 1) (i + 1)} \frac{N}{m}\\
\Rightarrow N (b - i) (m - i) = m (D - m - b + i + 1) (i + 1)\phantom{wwwi}\\
\because \frac{N}{m} \gg 1\phantom{wwwwwwwwwwwwwwwwwwwwwwwwwwww}\\
\therefore i \approx \frac{m + b + \frac{D}{m} \pm \sqrt{(m - b)^2 + 2 \frac{D}{m} (m + b) + \left( \frac{D}{m} \right)^2}}{2}\phantom{wi}
$$

因此，当 $m>b$ 时i差不多可以取b，而当 $b>m$ 时i差不多可以取m，即：

$$
\begin{cases}
Q(N, D, b, m \leq b) = C^{b - m}_{D - m}\\
Q(N, D, b, m > b) = C^b_m \Gamma \left( \frac{N}{m} + 1 \right)^{b - m}
\end{cases}
$$

对于 $b \leq m$ 的情况，很显然当 $m = b$ 时达到最大值。而对于 $m > b$ 的情况会比较复杂（用斯特林公式改写Γ函数）：

$$
\frac{Q(N, D, b, m + 1)}{Q(N, D, b, m)} \approx \frac{\sqrt{m (m + 1)}}{m - b - 1} \left( \frac{m e}{N} \right)^{\frac{N b}{m (m + 1)}} \left( \frac{m + 1}{m} \right)^{\frac{N (m + 1 - b)}{m + 1}}
$$

通过各种简化手段，最后可得近似关系：

$$
\ln \left( \frac{N}{m} \right) \approx \frac{N + b - 1}{b} \frac{m}{N} + \frac{2 N + b + 1}{2 N b}
$$

我们取一个特殊函数an，满足：

$$
x = \mathrm{an} (a) \Leftrightarrow \ln(x) = a x
$$

该函数在实数域内的定义域是不大于 $\frac{1}{e}$ 的实数，且在大于0的部分是双值的。现在，我们就有下面的结果：

$$
\ln(x) = a x + b \Leftrightarrow x = e^b \mathrm{an} \left( a e^b \right)
$$

回到我们的问题中，就有：

$$
\begin{cases}
A = \exp \left( - \frac{2 N + b + 1}{2 N b} \right)\\
\frac{m}{N} \approx A \mathrm{an} \left( - \frac{N + b + 1}{b} A \right)
\end{cases}
$$

通过模拟可以发现，实际情况比上述计算值略大一点。

当要求不是很高的时候，我们可以进一步近似：

$$
\frac{m}{N} \approx \left( \frac{b}{N + b + 1} \right)^{\frac{2}{3}} - 2 \left( \frac{b}{N + b + 1} \right)^{\frac{1}{3}} \frac{b}{3 N + 5 b + 3}\tag{1}
$$

从模拟结果来看，这个近似结果符合得很不错。

事实上如果再放低要求的话，还可以进一步简化：

$$
m \approx \left( b^2 N \right)^{\frac{1}{3}}\tag{2}
$$

这个近似虽然误差非常大，但做定性分析的时候足够了。

至此，这个问题就差不多解决了，使用结果(1)就可以得到相当好的近似。