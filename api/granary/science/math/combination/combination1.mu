标题：一个简单的组合问题：有组合约束的字母出现概率
更新：2015.01.14 21:17:17

问题是这样的——

**假定总共有N个字符，其中字符A出现P次，字符B出现Q次，组合AB出现X次，求完全随机的状态下这种情况出现的概率。**

这里分母即总可能数，很容易求：

$$
T(N; P, Q) = \frac{N!}{P! Q! (N - P - Q)!}
$$

问题在于分子，也就是P个A、Q个B中有X个AB组合的情况，要如何给出。

在直接求出分子前，我们来看另外一个问题——

**N个字符中有P个A和Q个B，不构成AB组合的情况有多少中？**

这个问题的直觉解答是这样的（回头给一个非直觉解答，也可以从这个直接解答的答案来倒推）：

这种情况的数量等于A彼此不相邻且不构成AB组合的情况，有一个AA且不构成AB组合的情况，有两个AA且不构成AB组合的情况，等等等等，以及有AAA且不构成AB组合的情况，等等等等，求和在一起。

其中，后面的所有项都可以通过第一项构造出来，而第一项则为A不和A与B相连的情况：

$$
m(N; P, Q) = \frac{(N - P)!}{P! Q! (N - 2 P - Q)!} + \frac{(N - P)!}{(P - 1)! Q! (N - 2 P - Q + 1)!}\\
= \frac{(N - P)! (N - P - Q + 1)}{P! Q! (N - 2 P - Q + 1)!}\phantom{wwwwwwwwi}
$$

其中，第一行的第一项是A不在最后一个的情况，第二项是A在最后一个的情况。思路就是将A和任何B以外的东西看作一个整体，于是N个字符就变成了N-P个字符，问题就成了从N-P个字符中任意选择P个和Q个作为A和B。对于A在末尾的也采用同样的思路。

接着，在求和项中，后面的部分就是在这一项的基础上，修改为在共N-t个字符中有P-t个A和Q个B，且A和A不相连，也不构成AB组合。接着，将那移出的t个A任意放在这里参加选择的p-t个A上，就可以构成有多个A相连的情况了，从而上述求和就成了：

$$
M(N; P, Q; 0) = \sum_{t = 0}^{P - 1} m(N - t; P - t, Q) C^t_{P - 1}\phantom{wwwwwwwwwwwwwwwwwwwwwwwwi}\\
= \frac{(N - P)! (N - P - Q + 1) (P - 1)!}{Q!}\phantom{wwwwwwwwwww}\\
\times \sum_{t = 0}^{P - 1} \frac{1}{(N - 2 P - Q + 1 + t)! t! (P - t)! (P - t - 1)!}\\
= \frac{(N - P)! (N - Q)!}{P! Q! (N - P - Q)!}\phantom{wwwwwwwwwwwwwwwwwwwwi}
$$

这个结果换一个思路理解，就是这样的：

$$
M(N; P, Q; 0) = C^Q_{N - P} C^P_{N - Q}
$$

这个式子对应的思路就是这样的：

我们在N个字符中取出P个作为A，然后剩下的里面选择Q个作为B。然后，在这个情况下，将P个留作后用的放回，取出Q个B之前的空格不放A，在剩下的里选择A。

是不是很简单？

这就是原题中X=0时的解中的分子。

而，对于X不为０的情况，可以通过这个结果做一个变换来得到——

假定现在有N-X个字符，其中P-X个A和Q-X个B，且没有任何A和B构成AB组合。在这个情况下，我们在不是A或B的N-P-Q+X个字符中选择X个，作为AB组合，这样得到的就是只有X个AB别的A和B不构成AB的情况，从而答案就是：

$$
M(N; P, Q; X) = C^{Q - X}_{N - P} C^{P - X}_{N - Q} C^X_{N - P - Q + X}
$$

从而，题目的答案就有了：

$$
P(N; P, Q; X) = \frac{M(N; P, Q; X)}{T(N; P, Q)} = \frac{C^{Q - X}_{N - P} C^{P - X}_{N - Q} C^X_{N - P - Q + X}}{C^P_N C^Q_{N - P}}
$$

是不是很简单？