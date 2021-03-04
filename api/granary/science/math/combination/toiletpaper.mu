标题：从N卷厕纸同时用完的概率开始
作者：LostAbaddon
更新：2019.04.23 16:42:37

我们可以将厕所坑位中用纸的情况，简化为一个数学问题，包含如下这些规则：

1. 假定有n卷厕纸，每卷的长度是 $L_n$，每个用户使用的长度都是N；
2. 用户在选择使用哪一卷厕纸时，会将所有长度还大于0的卷筒纸进行从长到短的排序成序列 $\{n_i\}$，随后以固定的概率在其中进行选择，将这个概率记为 $p(n, i)$，其中n是长度大于0的厕纸的数量，i是从长到短排序的第i个；
3. 如果两卷纸一样长，则在上一条规则下，固定选择n更大的那一卷；
4. 如果发生一卷纸的剩余量不足N的情况，则从第二顺位继续使用，直到用掉N为止；
5. 工作人员会每m个用户使用完厕所后去查看，将所有长度不大于 $L_T$ 的厕纸补充到长度 $L$；
6. 初始状态下，$L_n = L$；
7. 用户是一个个进去的，不考虑两个用户同时使用一个坑位的情况。

下面就是问题：在上述情况下，一位用户进入厕所后发现纸不够的概率Q，是多少？

---

假定只有一桶纸，这个问题其实不难。

如果 $L_T \ge mN$，则显然有 $Q=0$。

而如果 $L_T < mN$，情况略复杂一点。

首先，前 $T_1 = \lfloor \frac{L-L_T}{N} \rfloor$ 次肯定是正常的，此时工作人员已经进来检查过 $T_2 = \lfloor \frac{T_1}{m} \rfloor$ 次，再过 $T_m = m - ( T_1 - m T_2 )$ 轮后就会补纸。因此，如果剩余的纸量 $L_m = L - N T_1$ 不小于 $N T_m$，就不会遇到用完纸的情况，否则就会遇到。

所以在只有一卷纸的情况下，会不会用完纸是一个确定的问题，取决于下面这个关系：

$$
\left \lfloor \frac{1}{m} \left \lfloor \frac{L-L_T}{N} \right \rfloor \right \rfloor > \frac{L}{m N} - 1
$$

当这个不等式满足时，就会发生缺纸。而显然当 $L_T > m N$ 时，上式是不满足的，因此不会发生却纸。而，当 $m > \frac{L}{N}$ 时，上式右侧小于 0，而左侧为0，从而此时必然会发生缺纸。

或者，我们也可以认为开始检查纸是否用完的时刻和第一个用户进入的时刻是不重合的，那么此时就变成了一个概率问题，此时缺纸概率 Q 等于 1 减去厕纸总可用测试减去厕纸开始需要被替换的轮次与 m 的比值：

$$
Q = 1 - \frac{1}{m} \left( \left \lfloor \frac{L}{N} \right \rfloor - \left \lceil \frac{L-L_T}{N} \right \rceil \right)
$$

显然，当前面提到的不等式满足时，这里的缺纸概率会小于0，从而不可能发生缺纸。

---

从 $n=2$ 开始，情况就不一样了，这是因为选纸概率 $p(n,i)$ 的存在，使得每一卷纸的使用速度会出现一种“竞争”的状态。

比如说，只有两卷纸的时候，长的那卷被使用的概率是p，短的是1-p，那么当 $p < 0.5$ 时，人们会更多选择使用短的，直到将短的用完了再用长的，所以两卷纸的长度差是在不断拉大的，而当短的被用完时因为长的还有，所以有较大概率此时被工作人员补充，所以较不容易同时用完；而如果 $p > 0.5$，则人们会更多使用长的，所以两卷纸有更大的概率同时用完。

我们可以将问题做一个转化，取 $L / N$ 的余数为 $R$，$l = \lfloor \frac{L}{N} \rfloor$ 为新的长度值，而记 t 轮的长度分布为构型 $\phi(t) = \{ l_1, L_2, ..., l_n \}$，因此每一种构型的概率就是 $P(\phi(t))$。每一轮都是上一轮构型中的某一位减少1。

下面可以构造构型的权重：

$$
W(\phi(t)) = n \sum_i R_i + N \sum_i l_i
$$

这里只所以使用 $R_i$ 而非前面提到的余数 $R$，是因为随着系统的演化，在规则4下，当高位构型分量变为0后，它实际上还可以继续消耗余数，且能进一步传递给前一位，影响前一位的余数。

因此，问题的关键就了计算构型概率分布 $P(\phi, t)$，其中最关键的就是当构型 $\phi(t)$ 的最高位为满足临界条件 $\phi_n N + R_n \le L_T$ 的最大值时它的概率分布 $P(\phi_{i}, t_{c,i})$，其中下标 i 表示第 i 种这样的临界情况。

假定该概率分布已知，由于权重函数有如下性质：

$$
W(\phi(t)) = W(\phi(0)) - t N
$$

而每 m 轮工作人员补纸一次，所以我们可以知道此时刚刚完成了第 $T_{1,i} = \lfloor \frac{t_{c,i}}{m} \rfloor$ 次补纸，下一次补纸还有 $T_{2,i} = m (1 + T_{1,i}) - t_{c,i}$ 轮，而此时剩余的纸总量就是权重值 $W_i = n L - t_{c,i} N$，因此构型 $\phi_i$ 是否会遇到缺纸的情况，取决于下面这个不等式：

$$
\left \lfloor \frac{t_{c,i}}{m} \right \rfloor = \left \lfloor \frac{n L - W_{c,i}}{m N} \right \rfloor > \frac{n L}{m N} - 1
$$

我们将满足上述不等式的构型组成集合 $\mathrm{OOP} = \{\phi_i | \left \lfloor \frac{t_{c,i}}{m} \right \rfloor > \frac{n L}{m N} - 1\}$。

显然，这个集合的关键并不是构型本身如何，而是从初态达到该构型需要经历的总轮次，当然总轮次与构型之间的关系可以由构型的权重来获得。

因此，最后，会遇到缺纸情况的概率就是下面这个求和：

$$
Q_\mathrm{OOP} = \sum_{\phi_i \in \mathrm{OOP}} P(\phi_i, t_{c,i})
$$

所以，知道 $P(\phi, t)$ 自然也就能知道目标概率 $Q_\mathrm{OOP}$ 了。

或者我们也可以和 $n=1$ 时一样，认为工作人员换纸是 m 轮内的一个概率事件，从而缺纸概率 Q 等于：

$$
Q = \sum_i P(\phi_i) \times \max \left[ 0, 1 - \frac{1}{m} \left( \left \lfloor \frac{n L}{N} \right \rfloor - t_{c,i} \right) \right]
$$

---

从用纸规则我们不难发现，对于构型 $\phi(t)$，如果用 $\phi(t,i)$ 来表示该构型中的第 i 位的等效长度 $l_i$，则有 $\forall t,i : \phi(t, i) \le \phi(t, i+1)\ \land\ R_i \le R_{i+1}$，因此我们也就有：

$$
(n-1) L + L_T \ge W \ge n [N \phi(n) + R_n]
$$

由此可知，当 $m > \frac{n L}{N}$ 时，必然会发生缺纸；而当 $L_T \ge \frac{m N}{n} + N$ 时则必然不会发生缺纸。

由于 $\phi(t,n)N + R_n \le L_T$，所以我们要讨论的可能缺纸的情况就是 $\phi(t,n) \le \frac{m}{n} + \left( 1 - \frac{R_n}{N} \right)$ 的情况，取临界条件为：

$$
\phi(t,n) < \phi_c = \left \lfloor \frac{L_T - R}{N} \right \rfloor
$$

我们下面用 $\phi(t;a_i)$ 时，不加说明的情况下都认为对应的是构型 $\phi(A_i=a_i+\phi_c)$。

下面先看 $n=2$ 的情况，此时同长时的选择方案比较简单。此时将选较短的纸的概率记为 p，因此选较长的纸的概率自然就是 1-p 了。

当末态 $\phi(x,0)$ 临界条件即缺纸条件为：

$$
\phi_c = \left \lfloor \frac{L_T - R}{N} \right \rfloor\phantom{wwwwwwwwwwwwi}\\
\left \lfloor \frac{2 L - 2 N \phi_c - N x - 2 R}{m N} \right \rfloor > \frac{2 L}{m N} - 1
$$

当考虑到工作人员换纸是概率事件时，缺纸概率为：

$$
Q = \sum_x P(l,l;x,0) \times \max \left[ 0, 1 - \frac{1}{m} \left( \left \lfloor \frac{2 L}{N} \right \rfloor - 2 l + 2 \phi_c + x \right) \right]\\
x < m + 2 \left \lfloor \frac{L}{N} \right \rfloor - \left \lfloor \frac{2 L}{N} \right \rfloor - 2 \left \lfloor \frac{L_T - R}{N} \right \rfloor
$$

同时，我们也知道，一旦某个状态为 $\phi(t, n, n)$，则下一状态必然为 $\phi(t+1, n, n-1)$。因此，比如同样是从态 $\phi(t, n+1, n)$ 到态 $\phi(t+2, n, n - 1)$ 就可能经过两条“路径”：

$$
L_1 : (n+1, n) \rightarrow (n+1,n-1) \rightarrow (n, n-1)\\
L_2 : (n+1, n) \rightarrow (n,n) \rightarrow (n,n-1)\phantom{wwwwa}
$$

而这两条路径的概率是不同的，前者为 $p(1-p)$，而后者为 $1-p$。

此时，从初态 $\phi(0; l, l)$ 到态 $\phi(t, a, b)$（由前面的分析可知 $a \ge b$）所经历的所有“路径”，主要的差异在于其中经历过几次两个分量相等的状态。

从 $\phi(l,l)$（由于 t 可以通过构型计算得到，所以下面除非需要，否则不再显式地写出 t）到 $\phi(a,b)$ 最多可以有 $l-a-1$ 次两分量相等的状态，而假定一条路径有 $x < l-a$ 次相等的状态，则这条路径发生的概率为（短卷优先的概率记为 p）：

$$
P(l) = p^{l-b-1-x} (1-p)^{l-a}
$$

也即，长卷的使用次数固定的情况下，由其产生的概率部分也是固定的，只有短卷使用次数产生的概率会收到相等次数（末态相等不考虑）的影响。因此，最终从初态到末态的总概率就是一个“路径求和”：

$$
P(l,l;a,b) = (1-p)^{1-a} \sum_l p^{1-b-1-n_l}\\
= (1-p)^{l-a} p^{1-b-1} \sum_n C(l-a,l-b,n) p^{-n}
$$

其中 $C(x,y,n)$ 是低位下降 x 而高位下降 y 的路径中两分量相等次数为 n 的路径的数量。

因此，现在问题就变成了求 $C(x,y,n)$，只要它知道了，原则上就可以知道从初态到末态的概率，从而问题便可知了。

而要知道这个函数，本质上是要知道从初态 $\phi(l,l)$ 到末态 $\phi(a,b)$ 总共有多少条路径：$N(l-a,l-b)$。只要知道了 N，那么原则上 C 也就知道了：

$$
C(l-a,l-b,n) = \sum_{l \in L_n} N(l_n-a, l_n-b) \prod_i N(l_{i-1}-l_i, l_{i-1}-l_i)
$$

其中有序数列 $\{l_i\}$ 是长为 n 的由大到小排列的数列，且定义 $l_0 = l$，所有这样的数列构成集合 $L_n$。

同样的方法也适用于 $n > 2$ 的情况，只不过这里 C 和 N 会变得更加复杂，对于有几位相同的情况的处理也更复杂，但基本逻辑是相同的。

值得注意的是，对于末态 $\phi(x,0)$，由于末态之间我们认为不再存在状态迁移，所以我们有：

$$
P(l,l;0,0) = 0\phantom{wwwwwa}\\
P(l,l;x,0) = P(l,l;x,1)
$$

所以实际上我们要求的就是从初态 $\phi(l,l)$ 到末态 $\phi(x,1)$ 的概率。

而很显然，我们首先就可以有如下结果：

$$
P(l,l;l,x < l) = p^{l - 1 - x}
$$

接着：

$$
P(l,l;n-1,n-1) = (1-p) P(l,l;n,n-1)\phantom{wwwwwwwwwwwww}\\
P(l,l;n-1,n-2) = P(l,l;n-1,n-1) + (1-p) P(l,l;n,n-2)\\
P(l,l;n-1,m) = p P(l,l;n-1,m+1) + (1-p) P(l,l;n,m)\phantom{www}
$$

因此有：

$$
P(l,l;l-1,l-m) = (1-p) p^{M(m-2)} [1+M(m-1)p]\\
M(x) = \max(x,0)
$$

以及：

$$
P(l,l;l-2,l-m) = (1-p)^2 p^{A_m} (1 + B_m p + C_m p^2)\\
A_m = M(m - 3)\phantom{wwi}\\
B_m = m - 1\phantom{wwwww}\\
C_m = \frac{m(m-1)}{2} - 1
$$

事实上，我们可以将路径概率取为如下形式：

$$
P(l,l;d,m) = (1-p)^{l-d} p^{M(d-1-m)} \sum_{i=0}^{l-d} c(l-d,i,l-m) p^i
$$

从而递推关系为（以下将概率 $P(l,l;m,n)$ 简写为 $P(m,n)$）：

$$
\begin{cases}
P(n-1,n-1) = (1-p) P(n,n-1)\\
P(n-1,n-2) = P(n-1,n-1) + (1-p) P(n,n-2)\\
P(n-1,m) = p P(n-1,m+1) + (1-p) P(n,m)
\end{cases}
$$

由此可得系数函数 c 的递推关系和边界条件为：

$$
\begin{cases}
c(d,i,m+1) = c(d,i,m) + c(d-1,i-1,m+1)\ ;\ i > 0,m \ge d\\
c(d,i,d) = c(d-1,i,d)\ ;\ i \le d\\
c(d,0,m) = 1\\
c(d,d,d) = 0
\end{cases}
$$

最后得到如下结果：

$$
c(d,i,d+x) = c(d-1,i,d) + \sum_{j=1}^x c(d-1,i-1,d+j)\\
c(x,y,z) = 0\ ;\ if\ y > x\ or\ z < x\ or\ y < 0
$$

不难发现，其实 c 函数的第二位更重要，所以我们可以将上面的结果进一步写为：

$$
c(d,i,d+x) = \sum_{j=0}^{d-i-1} c(i+j-1,i-1,i+j+1)\\
\phantom{wwaa}+ \sum_{j=1}^x c(d-1,i-1,d+j)\\
$$

从而可以利用 $c(d,i-1,m)$ 来递归求出 $c(d,i,m)$，比如前几项为：

$$
\begin{cases}
c(d,0,m) = 1\\
c(d,1,m) = m - 1\\
c(d,2,m) = \frac{(m-2)(m+1)}{2}\\
c(d,3,m) = \frac{(m-3)(m+1)(m+2)}{6}\\
\end{cases}
$$

很有趣，这几项都和第一个参数 d 无关。事实上，我们可以相信系数函数 c 与第一参数 d 是无关的。

又由于：

$$
P(d,m) = (1-p)^{l-d} p^{M(d-1-m)} \sum_{i=0}^{l-d} c(l-d,i,l-m) p^i
$$

所以我们可以只保留最后求和部分的前三位，从而有：

$$
\begin{cases}
P(l,m) = p^{M(l-1-m)}\\
P(l-1,m) = (1-p) p^{M(l-2-m)} [1 + (l-m-1)p]\\
P(l-n,m) \approx (1-p)^n p^{M(l-n-1-m)} \times\\
\ \ \ \ \ \ \ \ \left[ 1 + (l-m-1)p + \frac{(l-m-2)(l-m+1)}{2} p^2 \right]
\end{cases}
$$

所以我们最终要计算的缺纸概率为：

$$
Q \approx \left[ 1 + (l-1)p + \frac{(l+1)(l-2)}{2} p^2 \right]\phantom{wwwwwwww}\\
\times \sum_x \left\{ (1-p)^{l-x} p^{M(x-1)}\phantom{wwwwwwwwwwwwwi}\\
\times \left[ 1 - \frac{1}{m} \left( \left \lfloor \frac{2 L}{N} \right \rfloor - 2 l + 2 \left \lfloor \frac{L_T - R}{N} \right \rfloor + x \right) \right] \right\}\\
\approx \left[ 1 + (l-1)p + \frac{(l+1)(l-2)}{2} p^2 \right] (1-p)^l \phantom{wwa}\\
\times \sum_x \left[ (1-p)^{-x} p^{M(x-1)} \left( \frac{m N - 2 L_T - N x}{m N} \right) \right]\\
$$

其中求和范围为：

$$
0 \le x \le m + 2 \left \lfloor \frac{L}{N} \right \rfloor - \left \lfloor \frac{2 L}{N} \right \rfloor - 2 \left \lfloor \frac{L_T - R}{N} \right \rfloor = r
$$

最后的求和部分实际上可以化简为：

$$
r \approx m - \frac{2L_T}{N}\\
SUM = \frac{2(1-p)r}{(1-2p)m} + \frac{1-p}{(1-2p)^2m} \left[ \left( \frac{p}{1-p} \right)^r - 1 \right]
$$

是一个只由工作员参数 m 和 $L_T$ 以及用纸参数 N 与 p 决定的、与纸的长度无关的常数。

所以最终结果为：

$$
Q \approx \left[ 1 + (l-1)p + \frac{(l+1)(l-2)}{2} p^2 \right] (1-p)^l \phantom{wwa}\\
\times \left\{ \frac{2(1-p)r}{(1-2p)m} + \frac{1-p}{(1-2p)^2m} \left[ \left( \frac{p}{1-p} \right)^r - 1 \right] \right\}\\
$$

其中第一部分是一个更精确函数的泰勒展开的前三项。第一行是由纸量与用纸模式决定的、与工作员无关的函数，而第二行是由工作员参数与用纸模式决定的、与纸量无关的函数。

当 p 接近1时，我们可以认为该函数只要被 $(1-p)^l$ 项压抑，随着 l 的增大会快速减小，也就是说如果绝大多数人倾向于先用短卷纸，那么纸越多越不容易遇到同时用完的情况。

而反过来，如果p接近0，那么第一行几乎就是常数，是否会同时用完纸完全由工作员参数决定：

$$
SECOND = \left\{ \frac{2(1-p)r}{(1-2p)m} + \frac{1-p}{(1-2p)^2m} \left[ \left( \frac{p}{1-p} \right)^r - 1 \right] \right\}\\
\approx 2(1+p) - \frac{4(1+p)L_T+(1+3p)N}{mN}
$$

可见，随着补纸间隔 m 的增大，缺纸概率也是跟着一起增大的。这很符合直观估计，因为如果大部分人是看到较多的纸就用，那就表示两卷纸很可能同时用到临界量，而此时下面是否会出现有人缺纸就完全取决于工作人员什么时候进来补纸了。


---

我们发现，这里最有趣的在于函数 c，我们猜测它与第一参数 d 是无关的，所以可以构造如下函数（忽略第一参数）：

$$
F(m;z) = \sum_{i=0}^m c(i,m) z^i
$$

缺纸概率第一项完全由该函数控制。为了更好地研究该函数，就需要找出系数函数 c 的具体形式。

我们可以取如下形式的函数：

$$
c(i,m) = \frac{(m-i)(m+i)!}{(m+i)i!m!}
$$

通过验证发现，它的确就是我们所要的函数（猜这个函数所化的时间真的是远多于验证啊……），从而我们有：

$$
F(m;z) = \sum_{i=0}^m \frac{(m-i)(m+i)!}{(m+i)i!m!}z^i
$$

因此路径概率函数为：

$$
P(d,m) = (1-p)^{l-d} p^{M(d-1-m)} F(l-d,l-m;p)
$$

同样的，缺纸概率函数现在也可以用上述函数改写，不过由于存在高阶项且不同求和项保留的高阶项数量不同，因此形式会比上面的更复杂。

---

对于 $n>2$ 的情况，原则上也可以用这里的方法给出，不过形式上就太过复杂了，这里暂且不考虑展开。

但我们可以猜测，缺纸概率可以写为如下形式：

$$
Q_n = F(l;\{p_i\}) \left[ A(\{p_i\}) \frac{r_n}{m} + B(\{p_i\}) \Delta(m,\{p_i\},r_n) \right]
$$

其中第一部分在最短纸选择概率足够大时会迅速下降为0，而当最多纸选择概率足够大时则基本保持不变。当更多用户选择最多纸时，系统的行为依然由 $\frac{r_n}{m}$ 控制，后面的部分只是起到调节作用。

---

最后，总结一下，就是，大家上厕所用纸的时候，请尽量选择少的那卷先用，因为，如果所有人都这样的话，就不会遇到你上厕所结果发现纸用完的尴尬情况了。

嗯……一篇很有味道的计算题……