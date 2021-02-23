标题：量子找最大值算法
更新：2016.11.15 05:18:00

深夜，睡不着，所以起来干点能让自己睡着的事。

不过，结果，发现，一小时搞定后还是没睡着……

----

假如有N个数，那么在经典的情况下，在这N个数字中寻找最大值的计算量妥妥的是N（某些奇葩算法甚至可以远大于N，比如，用猴子算法找最大值……）。

那么，是否存在一个高效的量子算法呢？

----

我们先假定，所有数据都以二进制的形式保存在qbyte上，比如这样：

$$
\left| \mathrm{data} \right> = \left| q_1 q_2 q_3 ... q_n \right>
$$

其中，$\left| q_i \right>$表示数据data第i位的qbit，可以是代表0的$\left| 0 \right>$，也可以是代表1的$\left| 1 \right>$。

一个量子qbyte上可以同时存在多个数据，它们以量子叠加态的形式存在，比如：

$$
\left| D \right> = \sum_i P_i \left| \mathrm{data}_i \right>
$$

下面，我们构造一个针对qbit的算符：

$$
\hat u = \left| 1 \right> \left< 1 \right|
$$

这个算符的作用显而易见，就是如果遇到 $\left| 1 \right>$ 则不发生改变，而如果偶遇到 $\left| 0 \right>$ 则变为零。所以这就是一个“取1算符”。

我们用 $\hat e_i$ 表示作用在第i位qbit上的恒等算符，用 $\hat u_i$ 表示作用在第i位qbit上的取1算符，从而可以构造如下作用qbyte上的算符：

$$
\hat S = a^{n - 1} \hat u_1 \hat e_2 \hat e_3 ... \hat e^n\\
+ a^{n - 2} \hat e_1 \hat u_2 \hat e_3 ... \hat e^n\\
+ a^{n - 3} \hat e_1 \hat e_2 \hat u_3 ... \hat e^n\\
+ ...\\
+ \hat e_1 \hat e_2 \hat e_3 ... \hat u^n\\
$$

这里先不考虑算符的归一化。

将这个算符作用在数据 $\left| \mathrm{data} \right>$ 上就有：

$$
\hat S \left| \mathrm{data} \right> = a^{n - 1} \delta (q_1 - 1) \left| \mathrm{data} \right>\\
+ a^{n - 2} \delta (q_2 - 1) \left| \mathrm{data} \right>\\
+ a^{n - 3} \delta (q_3 - 1) \left| \mathrm{data} \right>\\
+ ...\\
+ \delta (q_n - 1) \left| \mathrm{data} \right>\\
= \sum_{i = 1}^n a^{n - i} \delta (q_i - 1) \left| \mathrm{data} \right> = S \left| \mathrm{data} \right>
$$

也就是说，算符 $\hat S$ 作用在数据态矢 $\left| \mathrm{data} \right>$ 上的结果S，是一个a进制数，它的每一位要么是0要么是1，且和数据Data的对应位相同。显然，当a=2时，得到的就是数据Data。

当作用在多个数据态矢构成的叠加态上时，就有：

$$
\hat S \left| D \right> = \sum_{i = 1}^N S_i P_i \left| \mathrm{data}_i \right>
$$

其中 $S_i$ 就是数据态矢 $\left| \mathrm{data} \right>$ 对应的a进制值。

到这里，其实已经可以用这个算符来寻找最大值了。

我们对于输入的数据 $\left| D \right>$ 作用算符 $\hat S$ ，并进行归一化处理，那么每作用一次所得到的数据叠加态在每个数据本征态上的量子概率都会发生变化，且很显然数据的本征值越大，在作用后所得的叠加态中的概率也就越高。

下面来看一个例子：

|数据|1|3|5|6|7|8|12|12|16|
|--|
|初始化|11.11%|11.11%|11.11%|11.11%|11.11%|11.11%|11.11%|11.11%|11.11%|
|第一次|0.14%|1.24%|3.43%|4.95%|6.73%|8.79%|19.78%|19.78%|35.16%|
|第二次|0%|0.07%|0.54%|1.12%|2.08%|3.55%|17.95%|17.95%|56.74%|
|第三次|0%|0%|0.07%|0.2%|0.51%|1.13%|12.88%|12.88%|72.34%|
|第四次|0%|0%|0.01%|0.03%|0.11%|0.32%|8.3%|8.3%|82.92%|
|第五次|0%|0%|0%|0%|0.02%|0.09%|5.06%|5.06%|89.77%|
|第六次|0%|0%|0%|0%|0%|0.02%|2.98%|2.98%|94.02%|
|第七次|0%|0%|0%|0%|0%|0.01%|1.72%|1.72%|96.55%|
|第八次|0%|0%|0%|0%|0%|0%|0.98%|0.98%|98.03%|
|第九次|0%|0%|0%|0%|0%|0%|0.56%|0.56%|98.88%|

我们可以看到，这个算法似乎还是有不小的问题的。

事实上，让我们假定这样的一个情况：

$\left| D \right>$ 上总共有N个数据的态矢量子叠加在一起，其中N-1个的值为a，而最后一个的值为b，且b>a，那么通过上述算法要多少次运算才能获得一个足够可靠的几率p在测量的时候塌缩到 $\left| b \right>$ 上呢？我们可以做一次算符作用：

$$
\left| D_{i + 1} \right> = \mathrm{norm} \left( \hat S \left| D_{i} \right> \right) = c_i \left( \sum_i a \left| a_i \right> + b \left| b \right> \right)
$$

我们取 $d_i = \frac{b_i}{a_i}$：

$$
d_{i + 1} = \frac{b_{i + 1}}{a_{i + 1}} = \frac{b}{a} d_i
$$

因此，当测量落在 $\left| b \right>$ 上的概率为p时，对应的计算次数就可以预估出来：

$$
n \geq \frac{\ln (N - 1) + \ln p - \ln (1 - p)}{2 (\ln b - \ln a)}
$$

可见，这个方法虽然是 $\ln N$ 量级的快速算法，但如果储存的数据中最大与次大的差距不大的话，那么反而可能很慢。

对于更一般的情况，能以p的概率找到最大值的条件为：

$$
C p \geq \sum_{i = 1}^N \left( \frac{D_i}{D_{max}} \right)^{2 n}
$$

其中 C 是最大值在数据中的出现次数，p 是阈值概率。

可以看到，如果数据都很接近，最大值并不足够“突出”，尤其是最大值与次大值的比值很接近1的话，那么必须要很大的n才能以要求的概率找到最大值。

我们可以预估一下，在0到M的范围里如果总共有N个随机数，那么最大值和次大值可能是：

$$
\mathrm{Max} \approx \frac{N}{N + 1} M\\
\mathrm{Second} \approx \frac{N - 1}{N + 1} M
$$

这么一来，在最开始(N-1)个A与一个比A大的B的情况中，以概率p找到B至少需要的计算次数为：

$$
n \geq \frac{\ln (N - 1) + \ln p - \ln (1 - p)}{2 \ln 2}
$$

而对于更加一般的情况，同时我们忽略掉比次大更小的值并认为有1个最大和1个次大，那么所需的计算次数是：

$$
n \geq \frac{\ln p - \ln (1 - p)}{2 [ \ln N - \ln (N - 1) ]} \approx \frac{\ln p - \ln (1 - p)}{2} N
$$

可见，这个效率，非常糟糕……

当然了，如果我们有能力构造这么一个算符： $\hat X = \hat S ^ {100}$ ，那倒是可以提速一百倍……但这样的算法显然依然是接近 $O(N)$ 的。

总结下来，这个算法的最主要问题有两个：

1. 如果最大与次大的差距很小，那么速度会变得很慢；
2. 在测量时是概率性地落到最大值上，而不是精确找到最大值，虽然这个概率可以非常接近100%。

----

接下来，让我们考虑一个更加进一步的情况。

假定在量子态制备的过程中，我们除了可以制备出所有数据等概率混合的量子态： 

$$
\left| D \right> = \sum_{i = 1}^N \frac{1}{\sqrt{N}} \left| \mathrm{data}_i \right>
$$

我们还可以制备出一个特定的算符：

$$
\hat U = \left| D \right> \left< D \right|
$$

我们将其作用在数据态矢上可得：

$$
\hat U \left| \mathrm{DATA} \right> = \left| D \right> \left< D \right| \sum_{i = 1}^N d_i \left| \mathrm{data}_i \right> = \frac{\sum_{i = 1}^N d_i}{\sqrt{N}} \left| D \right>
$$

等于是让数据态矢的每个数据基态的振幅都变成此前振幅的平均值。

于是乎，我们就可以构造这么一个算符：

$$
\hat W = \hat S - \hat U \hat S
$$

从而，将它作用在数据基矢上就有：

$$
\hat W \left| \mathrm{DATA} \right> = \sum_{i = 1}^N \left( s_i d_i - \sum_{j = 1}^N \frac{s_j d_j}{N} \right) \left| \mathrm{data}_i \right>\\
\therefore d_{i, t + 1} = s_i d_{i, t} - \sum_{j = 1}^N \frac{s_j d_{j, t}}{N}\phantom{wwwwwwwwwi}\\
= s_i \left( d_{i, t} - \frac{1}{s_i} \sum_{j = 1}^N \frac{s_j d_{j, t}}{N} \right)\\
\phantom{i}= d_{i, t} \left( s_i - \frac{1}{d_{i, t}} \sum_{j = 1}^N \frac{s_j d_{j, t}}{N} \right)\\
$$

可以看到，这个算符等于将每个数据态矢本身的振幅朝相对加权平均值的反向移动了一个值，而且这个值对于越是小的数据就越大，所以其本质上是一个将大数据的振幅放大的算符。

从另一个角度来看，这也等于是将每个数据态矢对应的数据值做了调整，朝着相对加权平均值的反向移动了一个值，这个值与其当前振幅呈反比。

因此，这个算符可以很快地拉大最大与次大数据态矢的振幅差距，而在一开始将最小值的振幅也加大之后，又会反过来将其抑制缩小。

所以这是一个很好地将最大值筛选出来的算符，但缺点是在作用了一定次数后，这种筛选效果反而会下降，从而需要回头作用 $\hat S$ 算符。

我们用 $N-1$ 个小值 $A$ 与一个大值 $B$ 的例子来看一下这个算符的作用情况：

$$
a_{i + 1} = A a_i - \frac{(N - 1) A a_i + B b_i}{N} = \frac{1}{N} \left( A a_i - B b_i \right)\ \ \ \ \ \\
b_{i + 1} = B b_i - \frac{(N - 1) A a_i + B b_i}{N} = \frac{N - 1}{N} \left( B b_i - A a_i \right)\\
\therefore A a_{i + 1} - B b_{i + 1} = \frac{(N - 1)B + A}{N} \left( A a_i - B b_i \right)\\
b_i = - (N - 1) a_i \ \ \mathrm{for}\ \ i > 1
$$

通过第一个结论，我们可以很快计算出归一化之前的波函数振幅，但这里我们并不需要真的这么去做，因而第二个结论更有用——它不受归一化的影响。

对比直接作用 $\hat S$ 算符的情况：$\frac{b_{i+1}}{a_{i+1}} = \frac{B}{A} \frac{b_i}{a_i}$，现在这个结果的特点有两个：

1. 一次作用就稳定；
2. 数据量越大，最大值就越突出，而和两个值有多接近无关。

这是一个非常好的结果，因此这样我们以概率p找到最大值态矢所需要的步骤一下子就可以缩减为：

$$
n \geq \frac{\ln p - \ln (1 - p) - 2 \ln (N - 1)}{2 (\ln B - \ln A)}
$$

在考虑上随机分布出的结果，则有：

$$
n \geq \frac{\ln p - \ln (1 - p) - 2 \ln (N - 1)}{2 \ln 2}
$$

这个结果快得飞起啊！因为它居然是随着N的增大而减少的！

当然，如果是在[1,M]这个范围内随机分布，那么情况会变得复杂。

下面我们假定只有最大值 $s_1$ 和次大值 $s_2$ 给出最主要的贡献，从而无论在第几次作用算符的时候，加权平均项 $\sum_{i=1}^N \frac{s_i d_{i,t}}{N}$ 都是相对最大值和次大值足够小的量，从而有：

$$
\Sigma_t = \sum_{j = 1}^N \frac{s_j d_{j, t}}{N}\phantom{wwwwwwwwwwwwwwwwwwwww}\\
D_{i, t + 1} = \frac{d_{i, t + 1}}{d_{1, t + 1}} = \frac{s_i d_{i, t} - \Sigma_t}{s_1 d_{1, t} - \Sigma_t}\phantom{wwwwwwwwwwwwwwwwi}\\
\approx \frac{s_i}{s_1} D_{i, t} - \frac{s_1 - s_i}{N s_1} \sum_{j = 1}^N \frac{s_j}{s_1} D_{j, t}\phantom{wwwwwwwai}\\
\approx \frac{s_i}{s_1} D_{i, t} - \frac{s_1 - s_i}{N s_1} \left( D_{1, t} + \frac{s_2}{s_1} D_{2, t} + N C_t \right)
$$

由于很显然的 $D_{1,t} \equiv 1$ ，所以上面又可以进一步写为：

$$
D_{i, t + 1} \approx \frac{s_i}{s_1} D_{i, t} - \frac{s_1 - s_i}{s_1} \left( \frac{1}{N} + \frac{s_2}{s_1} \frac{D_{2, t}}{N} + C_t \right)
$$

所以有：

$$
D_{2, t + 1} \approx \frac{s_2}{s_1} \left( 1 - \frac{s_1 - s_2}{N s_1} \right) D_{2, t} - \frac{s_1 - s_2}{s_1} \left( \frac{1}{N} + C_t \right)\phantom{wwwwww}\\
\approx \frac{(N + 1) (N - 1)^2}{N^3} D_{2, t} - \frac{1}{N^2} - \frac{C_t}{N}\phantom{wwwwwwwwi}\\
\therefore D_{2, t} \approx \left( 1 - \frac{1}{N} - \frac{1}{N^2} + \frac{1}{N^3} \right)^t \frac{N^2 + 2 N - 1}{N^2 + N - 1} - \frac{N}{N^2 + N - 1}
$$

所以在这个近似下，相对此前只用算符 $\hat S$ 的情况来说，只能减少几乎常数次数，所以效率提升不明显：

$$
n \geq \frac{\ln p - \ln (1 - p)}{2} N + 1 - \sqrt{\frac{p}{1 - p}}
$$

当我们选择的p足够接近1的时候，最后一项可以变得非常可观（第一项中也有类似因子，但是在对数的位置上，从而当p足够大时没有这最后一项大），从而使得整体所需的计算量下降到一个很低的量级。

当然， 这是基于近似计算的结果。实际情况下当然不可能降低很多计算量。

在非近似的数据模拟的情况下，实际测试下来还是可以提升到一定程度的，因为在最开始的几项中这里被忽略的尾项 $C_t$ 实际上并不小，从而可以在一开始就可以将次大值的振幅减少很多。

从上面的近似结果我们也还可以看出另外一点来：

当计算次数t大于某个临界值T后，次大值的概率非但不会继续下降，还可能重新增大，并最终趋近某个接近 $\frac{1}{N}$ 的极限值。

这个特性与量子搜索的Grover算法是相同的。

总结来说，算符 $\hat W$ 虽然比 $\hat S$ 更好，但依然不是优质的搜索最大值算法。

它存在下列问题：

1. 概率地选择最大值，而非确定地找到最大值；
2. 如果次大值与最大值很接近且里别的值非常远，那么需要很漫长的计算次数；
3. 存在某个临界计算次数，超过该次数后次大值的概率反而开始增大，此时需要回头使用 $\hat S$ 算符。

所以，至少目前还没想出更好的寻找最大值的量子算法——当然啦，说不定ARXIV上已经有相关文章躺在那里了，只是我没去找罢了。

----

当然，还有一些别的方法可以来求最大值，比如我们可以设计一种特殊的量子门电路——

假定输入态是两个数据的纠缠态，先只考虑单qbit数据的情况：

$$
\left| \mathrm{input} \right> = \left| a \right> \otimes \left| b \right>
$$

将其送入一个特定的筛选最大值的量子门电路中：

$$
\hat U = \left| 1_a 0_b \right> \left< 1_a 0_b \right| + \left| 1_a 0_b \right> \left< 0_a 1_b \right|\\
\ \ \ \ + \left| 1_a 1_b \right> \left< 1_a 1_b \right| + \left| 0_a 0_b \right> \left< 0_a 0_b \right|
$$

这个算符的意思就是：假如a是1而b是0，那么输出1和随便一个数（这个数没用，只不过量子门电路不会丢失信息，所以总要输出些什么……）；如果a为0而b为1，那么输出1；如果a和b都是1，那么输出1；如果a和b都是0，那么输出0。

这个看上去很简单，没什么。

下面来看2-qbit数据的情况：

数据态为：

$$
\left| \mathrm{input} \right> = \left| a_1 a_2 \right> \otimes \left| b_1 b_2 \right>
$$

此时的量子门电路为：

$$
\hat I_i = \left| 1_{a, i} 0_{b, i} \right> \left< 1_{a, i} 0_{b, i} \right| + \left| 0_{a, i} 1_{b, i} \right> \left< 0_{a, i} 1_{b, i} \right|\\
\ \ \ \ + \left| 1_{a, i} 1_{b, i} \right> \left< 1_{a, i} 1_{b, i} \right| + \left| 0_{a, i} 0_{b, i} \right> \left< 0_{a, i} 0_{b, i} \right|\\
\hat X_i = \left| 1_{a, i} 0_{b, i} \right> \left< 0_{a, i} 1_{b, i} \right| + \left| 0_{a, i} 1_{b, i} \right> \left< 1_{a, i} 0_{b, i} \right|\\
\ \ \ \ \ + \left| 1_{a, i} 1_{b, i} \right> \left< 1_{a, i} 1_{b, i} \right| + \left| 0_{a, i} 0_{b, i} \right> \left< 0_{a, i} 0_{b, i} \right|\\
\hat W_i = \left| 1_{a, i} 0_{b, i} \right> \left< 1_{a, i} 0_{b, i} \right| + \left| 1_{a, i} 0_{b, i} \right> \left< 0_{a, i} 1_{b, i} \right|\\
\ \ \ \ \ + \left| 1_{a, i} 1_{b, i} \right> \left< 1_{a, i} 1_{b, i} \right| + \left| 0_{a, i} 0_{b, i} \right> \left< 0_{a, i} 0_{b, i} \right|\\
\hat U = \left| 1_{a, 1} 0_{b, 1} \right> \left< 1_{a, 1} 0_{b, 1} \right| \hat I_2\\
\ \ \ \ + \left| 1_{a, 1} 0_{b, 1} \right> \left< 0_{a, 1} 1_{b, 1} \right| \hat X_2\\
\ \ \ \ \ + \left| 1_{a, 1} 1_{b, 1} \right> \left< 1_{a, 1} 1_{b, 1} \right| \hat W_2\\
\ \ \ \ \ + \left| 0_{a, 1} 0_{b, 1} \right> \left< 0_{a, 1} 0_{b, 1} \right| \hat W_2\\
$$

显然，这个算符的作用就是：如果a的1号位是1而b的一号位是0，那么输出结果的一号位是1且后面的位置都放a的对应位内容（量子门的两个输出中第二个输出结果我们这里不考虑，只考虑一号位的输出）；如果a的1号位是0而b的一号位是1，那么输出1并且在此后放置b的对应位内容（X算符的作用就是将输入的二号位输出到输出的一号位）；而如果a和b的一号位都是0或者都是1，那么输出0和1的同时，用W算符来判断a和b的二号位内容并做相应输出。

可以看到，这里的W算符就是在1-qbit情况下的最大值算符。

因此，我们可以外推出对于n-qbit情况的求最大值算符：

$$
\hat U_i = \left| 1_{a, i} 0_{b, i} \right> \left< 1_{a, i} 0_{b, i} \right| \prod_{j = i + 1}^N \hat I_j\phantom{wwwwwwwwwwwwi}\\
+ \left| 1_{a, i} 0_{b, i} \right> \left< 0_{a, i} 1_{b, i} \right| \prod_{j = i + 1}^N \hat X_j\phantom{wwwwwwwwwwi}\\
+ \left( \left| 1_{a, i} 1_{b, i} \right> \left< 1_{a, i} 1_{b, i} \right| + \left| 0_{a, i} 0_{b, i} \right> \left< 0_{a, i} 0_{b, i} \right| \right) \hat U_{i - 1}
$$

其中当i为N-1时，算符的最后一项不再调用U算符而是调用W算符。

我们当然也可以在数学上构造三输入数据态时求最大值的量子算符，这里就不多啰嗦了。

但是显然要通过这个在少于N步的计算步骤中找到最大值是不现实的——当然，我们可以构造一个N输入数据态矢的求最大值算符，但这样的东西制作起来可就麻烦了——而且这就和我们做一个特殊的求N个值中最大值的经典电路没什么本质分别了，我们不过是在重复差分机的工作罢了。

----

所以说，忙活了半天，其实还是没找到什么像样的求最大值的量子快速算法啊。。。

----

另，鼓捣完这些后，突然很有兴趣想试试如果在ANN中引入各种量子计算的算符的话，会得到什么呢？

嗯……这就纯粹是脑洞了………………