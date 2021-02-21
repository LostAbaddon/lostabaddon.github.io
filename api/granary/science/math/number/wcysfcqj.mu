标题：捋一下五次及以上方程为何没有根式通解，以及如何求其通解
更新：2021.02.04 18:42:02

> 因为工作上的需要，要优化一个模型的参数以提高系统性能，于是需要解一个一元五次方程，所以就抽了点时间复盘了一下为何一元五次及以上方程没有根式通解，以及如果要求解这些方程的话应该怎么做。

----

# 五次及以上一元方程无根式解

## 三次与四次方程根式通解

我们大家肯定都很熟悉一元二次方程$a x^2 + b x + c = 0$的解可以表达为如下形式：

$$
x = \frac{- b \pm \sqrt{b^2 - 4 a c}}{2 a}
$$

这个结论早在公元前1500年就已经被两河流域的巴比伦人所发现。

对于三次方程根式通解，则在公元1502年至1526年间被意大利数学家费罗所发现（这里采用了更现代也更普遍的形式）：

$$
a x^3 + b x^2 + c x + d = 0 \Rightarrow\\
\begin{cases}
\omega_3 = \frac{- 1 + i \sqrt 3}{2}\\
\Delta = \left( \frac{b c}{6 a^2} - \frac{b^3}{27 a^3} - \frac{d}{2 a} \right)^2 + \left( \frac{c}{3 a} - \frac{b^2}{9 a^2} \right)^3\\
\mu = \left( \frac{b c}{6 a^2} - \frac{b^3}{27 a^3} - \frac{d}{2 a} + \sqrt \Delta \right)^{\frac{1}{3}}\\
\nu = \left( \frac{b c}{6 a^2} - \frac{b^3}{27 a^3} - \frac{d}{2 a} - \sqrt \Delta \right)^{\frac{1}{3}}\\
x_1 = -\frac{b}{3 a} + \mu + \nu\\
x_2 = -\frac{b}{3 a} + \omega_3 \mu + \bar \omega_3 \nu\\
x_3 = -\frac{b}{3 a} + \bar \omega_3 \mu + \omega_3 \nu\\
\end{cases}
$$

而后是一段很有趣的历史小趣闻——费罗对自己的发现秘而不宣，只传给了自己的学生菲奥尔，而菲奥尔也一直没有昭告天下。同时，1530年时另一位意大利数学家塔尔塔利亚也独立发现了相同三次方程$x^3 + p x + q = 0$的通解，和费罗的完全相同。1535年，菲奥尔听说塔尔塔利亚也能解三次方程后表示怀疑，于是邀请塔尔塔利亚在威尼斯进行数学对决。在2月22日对决前几天，塔尔塔利亚在原来解的基础上发现如何引入非零的二次项，从而在22日的对决中彻底击败了菲奥尔——至此，晚于费罗发现三次方程根式通解的塔尔塔利亚反而成了世人皆知的三次方程通解发现者。

1539年，又一位意大利数学家卡尔达诺向塔尔塔利亚求教三次方程的解法，在发誓绝不公开解法之后，塔尔塔利亚将解法以密语的形式交给了卡尔达诺，但后来却反悔而没将密语解法交给卡尔达诺。1540年时，卡尔达诺在自己的研究过程中找到了三次方程通解。

此后，他的学生、意大利数学家费拉里在学习卡尔达诺的三次方程解法时找出了四次方程解法，但限于当年卡尔达诺的誓言，两人没有公开三次和四次方程的解法。直到1543年，费拉里在访问费罗的故乡博洛尼亚时无意间发现费罗遗留下来的手稿，这才发现费罗才是第一个发现三次方程通解的人，并将之公之于众——此举引起塔尔塔利亚的恼怒，俩人再次相约数学对决，但塔尔塔利亚以裁判不公为由最终没有参加而落败，此后终生对卡尔达诺及费拉里持有怨念。

费拉里找到的四次方程的根式，是人们目前所找到的最后一个n次方程根式通解，也是最后一个可能存在的根式通解，其形式异常复杂：

$$
a x^4 + b x^3 + c x^2 + d x + e = 0 \Rightarrow\\
\begin{cases}
w_3 = 2 c^3 - 9 b c d + 27 a d^2 + 27 b^2 e - 72 a c e\\
w_2 = c^2 - 3 b d + 12 a e\\
\delta_1 = \frac{b^2}{4 a^2} - \frac{2 c}{3 a}\\
\delta_2 = \frac{b^3}{a^3} - \frac{4 b c}{a^2} + \frac{8 d}{a}\\
\Delta_1 = w_3^2 - 4 w_2^3\\
\Delta_2 = w_3 + \sqrt \Delta_1\\
\bar \Delta_2 = w_3 - \sqrt \Delta_1\\
\Delta_3 = \frac{\sqrt[3]{\Delta_2} + \sqrt[3]{\bar \Delta_2}}{3 \sqrt[3]{2} a}
\end{cases}\\
\therefore \begin{cases}
x_1 = - \frac{b}{4 a} - \frac{1}{2} \sqrt{\delta_1+\Delta_3} - \frac{1}{2} \sqrt{2 \delta_1 - \Delta_3 + \frac{\delta_2}{4 \sqrt{\delta_1+\Delta_3}}}\\
x_2 = - \frac{b}{4 a} - \frac{1}{2} \sqrt{\delta_1+\Delta_3} + \frac{1}{2} \sqrt{2 \delta_1 - \Delta_3 + \frac{\delta_2}{4 \sqrt{\delta_1+\Delta_3}}}\\
x_3 = - \frac{b}{4 a} + \frac{1}{2} \sqrt{\delta_1+\Delta_3} - \frac{1}{2} \sqrt{2 \delta_1 - \Delta_3 - \frac{\delta_2}{4 \sqrt{\delta_1+\Delta_3}}}\\
x_4 = - \frac{b}{4 a} + \frac{1}{2} \sqrt{\delta_1+\Delta_3} + \frac{1}{2} \sqrt{2 \delta_1 - \Delta_3 - \frac{\delta_2}{4 \sqrt{\delta_1+\Delta_3}}}
\end{cases}
$$

是不是看着就头皮发麻？

此后，人们一直在致力于寻找五次方程的通解，但一直没有成功。

## 五次及以上方程无根式通解的证明史

1770年，法国籍意大利裔数学家拉格朗日整理了各种求根技巧并最早研究了根之间的置换理论，当然最后没能成功找到五次方程的通解。

1799年，意大利医生兼数学家鲁菲尼在拉格朗日工作的影响下，最早开始尝试证明五次方程不存在通解，到1813年的14年间发表了六个不同版本的五次方程不存在通解的证明，但一直没有被当时的法国数学界接受，虽然在英国颇受欢迎。鲁菲尼的理论中存在一个重要的假设一直没有完全证明。

1824年，鲁菲尼死后的第三年，19岁的挪威数学家、群论奠基人之一的阿贝尔独立于鲁菲尼证明了五次及以上方程不存在根式通解，其中包括鲁菲尼没能证明的部分，现在被称为阿贝尔定理。而整个五次及以上方程没有根式通解这一结论则被称为阿贝尔-鲁菲尼定理。

阿贝尔的工作直到1828年都没能引起当时数学家的足够重视，而他自己在1829年死于肺结核。

1829年，另一位群论重要的奠基人、法国数学家伽罗华也完成了自己关于五次及以上方程没有根式通解的论文，一样寄给了大数学家柯西（阿贝尔也寄给过柯西），结果阴差阳错地柯西没有读到该论文（这方面阿贝尔比较惨，柯西压根不相信阿贝尔的论文）。此后伽罗华在于父亲冤死和考试失利，将五次及以上方程无根式通解的论文寄给傅里叶却惨遭傅里叶去世，1830年因参与政治运动而退学，31年更因此两度入狱，32年在狱中认识一医生之女并因此而得罪神枪手军官，两人约定次日决斗——此时伽罗华意识到自己断无生机，于是连夜将自己的数学理论写了下来，托朋友舍瓦列寄给高斯和雅克比，但奈何这两位数学大牛也没认真对待，直到1843年舍瓦列将阿洛华的手稿交给另一位数学大家刘维尔，这才最终将他的理论得到认可并公之于众。

可见，凡是触碰五次方程无根式通解问题的数学家，都没好下场啊……

## 简要分析为何五次及以上方程无根式通解？

理论上，任意N次方程都是有根的，只不过这个根是否可以用加减乘除和开根这几个运算来表达就不一定了。

我们将N次多项式写为$F_N(x) = \sum_{i = 0}^N c_i x^i$，相应的方程就是$F_N(x) = 0$。

因此，它总也可以写为如下形式：

$$
F_N (x) = c_N \prod_{i = 1}^N (x - x_i)
$$

不失一般性，我们可以在有理数域上研究N次多项式，即多项式的每一项系数$c_i$都是有理数。更进一步，我们可以要求这样的多项式有如下两个特性：

1.	N个解$x_i$都不是有理数，从而上述多项式无法分解为两个低阶多项式的乘积。
2.	没有重根

也就是说，我们要求上述多项式是定义在有理数域$\mathbb{Q}$上的多项式，而它的解在$\mathbb{Q}$之外，且没有重根。

在进一步讨论这两条特性前，我们来看一点别的东西。

我们前面提到，多项式可以有两种等价的表达：

$$
\sum_{i = 0}^N c_i x^i = c_N \prod_{i = 1}^N (x - x_i)
$$

很显然，这表明存在一种置换不变：我们如果将所有N个解的下标做任意置换，由于乘法满足对称性，所以这样的下标置换不会改变多项式的表达。因此，N次多项式构成的域的自同构群（也即在保证给定多项式系数不变的所有变换构成的群）显然是置换群$S_N$（当然这里别忘了无重根这个条件，不然置换群会缩小）。

然后，让我们从另一个角度来看给定多项式的自同构群。

前面已经提到了，我们将群系数限定在有理数域上，而方程的每个根却都不是有理数——否则就认为该多项式是可约的。

下面就是所谓的“域扩张”了——我们向一个域K（比如这里就是理数域$\mathbb{Q}$）添加一组元素并形成一个新的更大的域L，则L就是K的扩域，这一关系可以记为$L/K$或$L:K$。

比如说，我们给有理数域$\mathbb{Q}$添加进$\sqrt 2$，然后新的域$\mathbb{Q}[\sqrt 2]$就是所有形如$a + b \sqrt 2$的数，其中a和b都是有理数，这样$\mathbb{Q}[\sqrt 2]$就是$\mathbb{Q}$的扩域，而且是一个“单扩张域”，因为只通过添加一个元素之后生成的整个扩域。

当我们通过四则混合运算来构造方程的根时，因为加减乘数在有理数域中封闭，所以这四种运算无法将有理数域扩张。而开方则不同，开方可以从有理数构造出无理数和虚数，事实上是可以构造出所有能用加减乘数和开方运算计算出来的无理数和复数，因此是可以将有理数域扩张到更大的域的。

比如，当我们要求二次多项式是不可约的时候，就需要向有理数域添加$\sqrt{b^2 - 4 a c}$，从而成为扩域$\mathbb{Q} \left[ \sqrt{b^2 - 4 a c} \right]$。

如果一个N次方程可以有根式解，那由于只能用加减乘数和开方这五种运算，所以相当于我们现在事实上所面对的是有理数域通过有限次扩张而来的扩张域$K=\mathbb{Q}[C_1, C_2, ... C_m]$。

我们将这种向数域K添加K上不可约多项式f的根而形成的扩域，称为f在K上的**分裂域**或**根域**，我们形式上记为$\mathbb{Q}[f]$。

同时，每个数域K都有一个自同构群，其群员是K到K的一个同构映射。比如说，复数域上的共轭映射就是一种自同构映射。这样，就自然存在一个特殊的群：所有$L/K$的自同构中，保持K不变的部分，称为L的K-自同构群，记为$\mathrm{Aut}(L/K)$。

到这里，终于和之前的内容有所联系了——能保证给定多项式$F_N(x)$不变的群作用，即$S_N$的元素，显然应该是$\mathrm{Aut}\left( \mathbb{Q}[f]/\mathbb{Q} \right)$的元素。

反过来，也就是说，如果对于某个N，$S_N$中存在元素不是$\mathrm{Aut}\left( \mathbb{Q}[F_N]/\mathbb{Q} \right)$的元素，那就是说通过加减乘除和开方进行有限次扩域后的数域不足以用来承载多项式通项公式，后者需要比前者更大的域。

因此，也就是说，如果$S_N$有$\mathrm{Aut}\left( \mathbb{Q}[F_N]/\mathbb{Q} \right)$之外的元素，那就表示N次多项式不存在根式通解——当然，这并不表示没有通解，而是说通解无法用加减乘除和开根这五种运算来表达。

换一个角度来说，$\mathrm{Aut}\left( \mathbb{Q}[F_N]/\mathbb{Q} \right)$中的每个群作用，都可以在不改变多项式的情况下，将一个根映射到另一个根。而如果它和$S_N$不重合，那就表示它无法将所有根都映射出来，那就谈不上是“通解”了。

直接看扩域的$\mathrm{Q}$-自同构群比较困难，所以我们要采用一些分解的数段。

假定我们已经知道了$\mathrm{Aut}(L/K)$，以及它的一个子群H，那么我们可以构造L在H作用下的不动域：

$$
L^H = \{ x \in L : \forall h \in H, h(x) = x \}
$$

显然，这样定义的不动域是K的扩域，同时也是L的子域。因此我们现在就有了一个对应关系：

每一个介于恒等映射氮元素集到$\mathrm{Aut}(L/K)$之间的子群H，都对应了一个L到K之间的中间域$L^H$，这样的一一对应被称为**伽罗华对应**。

当然，并不是任意扩域L都满足$L^{\mathrm{Aut}(L/K)} = K$的，满足这一关系的K的扩域L，称为K的**伽罗华扩张**或者**正规扩张**。我们上面所谈的也是伽罗华扩张。K的伽罗华扩张L的K-自同构群被称为伽罗华群$\mathrm{Gal}(L/K)$。

更形式化一点来说，我们令$L_0 = K$、$L_n = L$，则$L_{i + 1}$是$L_i$的伽罗华扩张。相应的，$\mathrm{Gal}(L/L_{i+1})$是$\mathrm{Gal}(L/L_i)$的正规子群（和不变域对应）。

> 如果H是G的正规子群，则表示：
$$
H \triangleleft G \Leftrightarrow \forall h \in H, \forall g \in G: g h g^{-1} \in H
$$

也即，从K到L可以构造一条有限扩张链，它对应到从恒等元群到$\mathrm{Gal}(L/K)$的正规子群链。

我们可以用$\mathrm{Gal}(F/K) = \mathrm{Gal}(L/K) / \mathrm{Gal}(L/F)$是一个商群，从而上述伽罗华对应也可以将有限扩张链对应到商群链。

上面的说法过于抽象，所以我们换一种说法。

假定$L_{i+1}$是$L_i$的伽罗华扩张，那其实就等于是向$L_i$添加了若干不在$L_i$中的元素，这些元素是$L_i$中某些元素的若干次开根。形象地说来，就是我们发现在现在的数域中无法表达我们所想要的公式，那就添加新元素，而由于我们能用的只有加减乘除和开方，前面四个在数域中封闭，只能通过开方来添加数域之外的数进来。因此，每一次伽罗华扩张都意味着添加一些数的某次根。

> 这里要注意，我们并不局限在实数域而可以添加复数域中的元素进来。
事实上要实现伽罗华扩张，基本就无法避免这种复元素（参考上面给出的三次方程通解公式），其中最常见的就是n次方等于1的复数：n次单位根。比如三次单位根就是$\frac{-1 + i \sqrt 3}{2}$而四次单位根就是$i$。

具体来说，比如我们现在是在有理数域，现在要解二次方程$a x^2 + b x + c = 0$，由于我们要求方程是不可约的，即无法写为$(x - x_1) (x - x_2) = 0$的形式且$x_1$和$x_2$都是有理数。那么，为了要得到公式，由于有理数之间的加减乘除还是有理数，所以我们只能使用开根，加入$\sqrt{b^2 - 4 a c}$，从而可以构造出$\frac{- b \pm \sqrt{b^2 - 4 a c}}{2 a}$这样的有理数域扩域中的新数。

我们添加了一个根号，所以做了一次扩域。

接着，对于三次方程，我们在有理数域上做一次扩域后，可以表达出$\mu^3$和$\nu^3$，但无法表达它们的三次根，也无法表达三次单位根，所以需要进行扩域，加上这些元素。因此，要得到三次方程的根式通解，我们至少需要对有理数域做两次伽罗华扩张。对四次方程，则至少需要四次伽罗华扩张。

好了，继续我们之前的分析。

由于有限伽罗华扩张域$\mathbb{Q}_{i+1}$是向$\mathbb{Q}_i$添加新根元素而获得的，可以证明这样的$\mathbb{Q}_i$-自同构群$\mathrm{Aut} \left( \mathbb{Q}_{i+1} / \mathbb{Q}_i \right)$是一个阿贝尔群。而它又是伽罗华对应下的正规子群链中相邻两个群的商群：

$$
\mathrm{Aut} \left( \mathbb{Q}_{i+1} / \mathbb{Q}_i \right) = \mathrm{Gal} \left( L / \mathbb{Q}_i \right) / \mathrm{Gal} \left( L / \mathbb{Q}_{i + 1} \right)
$$

这样，我们就终于可以回头来看N次方程是否有根式通解的问题了。

我们将不可约N次方程的对称群$S_N$做正规子群分解：

$$
\{1\} \triangleleft G_1 ... \triangleleft G_m \triangleleft S_N
$$

如果这条分解链上某两个相邻元素的商群不是阿贝尔群，那就表示我们无法通过有限次伽罗华扩张将$\mathbb{Q}$扩张到一个足够容纳不可约N次方程表达式通解的数域，也就是说：N次方程没有根式通解。

而，$S_5$只有一种正规子群分解：

$$
\{1\} = S_1 \triangleleft A_5 \triangleleft S_5
$$

其中$A_5$为5阶交错群，它是由$S_5$中群元的交换子构成的群，且关键是，它是非阿贝尔群，且它的子群只有一阶群$S_1$和它自身（就像一个素数一样，这样的群被称为单群）。因此这条正规子群链的前两个的商群，就是$A_5$，一个非阿贝尔群。

当N大于5时，也会遇到这样的问题。

事实上，只有$S_2$、$S_3$和$S_4$存在满足商群可交换这一条件的正规子群链，从而也就只有二次方程、三次方程和四次方程有根式通解。

简单来说，就是这样：

**N次方程的根满足置换不变性，即在置换根顺序的情况下，不会改变方程本身，这些变换构成一个群S。而另一方面，对于不可约方程，根式解函数本质上是一个不断对数域进行扩张的过程，并在这个过程中扩张域上那些能保持有理数域不变的变换也构成一个群G。接着，我们可以证明G和B之间满足一种被称为伽罗华对应的对应关系，它要求G的扩张域链中相邻中间域之间的到前自同构群和B的正规子群链相邻子群的商群对应。最后，当N大于等于5时前者S不存在正规子群链的相邻子群的商群是阿贝尔群，而根式通解造成的扩张域链相邻中间域的到前自同构群都是阿贝尔群，从而两者无法对应，从而五次及以上方程不存在根式通解。**

一个非常漂亮的理论，虽然我这边基本上七扣八除得没留下什么有用的东西了……

## 域扩张与尺规作图的三个不可能问题

前面我们在介绍为何五次及以上方程不存在根式通解的时候，讲到了域这么一个概念，下面说说它的另外一些应用。

当我们做域扩张的时候，假定K的扩域是L，假定K中的幺元为e，那么L中的元素都可以写为如下形式：

$$
l = a_0 e + a_1 g_1 + a_2 g_2 + ... a_n g_n; l \in L, a_i \in K, g_i \in L
$$

从而，我们可以记从域K扩到域L的维度为$[L/K : K]$。显然，并不是说我们加多少元素，就扩维多少的，比如$\mathbb{Q}[\sqrt 2, \sqrt 3]$，它的元素必须写为：

$$
l = q_0 + q_1 \sqrt 2 + q_2 \sqrt 3 + q_3 \sqrt 6
$$

因为，显然$\sqrt 6$无法表达为一个有理数呈上若干个$\sqrt 2$或$\sqrt 3$能得到的，因此$[\mathbb{Q}[\sqrt 2, \sqrt 3] : \mathbb{Q}] = 4$。

容易证明，扩域维数满足：$[L/K : F/K] \times [F/K : K] = [L/K : K]$。

我们之前谈到有限伽罗华扩张的时候，除了说有限次伽罗华扩张之外，其实也是说扩张之后的域到原来域的维度为有限值。因此，向任意有限域的有限伽罗华扩域中添加一个超越数（比如$\pi$或$e$），就显然不是一个有限伽罗华扩张，因为这样的扩维为可数无穷维。

另一方面，如果域K的单扩张是$K[x]$，那么我们就说x相对K的次数为：$\{x\} = [K[x] : K]$。

有了这些工具，我们就可以来讨论古老的尺规作图三大难题了：

1.	三等分角：任意给定一个角，都能通过尺规作图画出它的三分之一角来
2.	立方倍积：任意给定一个立方体，都能通过尺规作图画出体积是它两倍的相似立方体来
3.	化圆为方：将一个圆，通过尺规作图，画出面积相等的立方体来，或者反过来也行

要讨论这三个问题，我们首先要来看尺规作图从域论的角度来看，都发生了些什么事。

尺规作图中，我们只能使用支持和圆规，所以本质上就是只能求两条直线的交点、直线与圆的交点、圆与圆的交点。

因此，从解析几何的角度我们不难发现，前者是求解一次方程，后两者都是求解二次方程，从而前者是有理数域内的运算，而后者是对有理数域进行单扩张，且由于是二次方程，单扩张本原元的次数要么是1要么是2——这是因为二次方程最多是对判别式开根，如果判别式开根在原来的数域中，那这次操作的次数为1；如果不在原来的数域中，那新数的平方显然是在原来数域中的，所以扩域的基就是原来域的基加上判别式开根的乘积，没有其它了，从而维度为2，因此扩张元的次数为2。

根据连续域扩张后的扩维等于每次域扩张扩维的乘积，我们不难发现，如果一个尺规作图问题可以通过有限步完成（假定步数为n），那最终扩域相对有理数域的维度为$2^{m \le n}$，关键是，它必然是2的非负整数次幂。

有了这个工具，我们现在就能来解决上述三个问题了。

首先是最简单的化圆为方，这个问题的关键是要通过尺规作图来画出$\sqrt \pi$，而我们知道$\pi$是一个超越数，它如果能画出来，需要的域扩张的维数为无穷大，所以，不用想了，化圆为方被秒杀。

接着是立方倍积，它的关键是要尺规作图实现$\sqrt[3]2$，它的次数为3，不是2的非负整数次幂，因此，也被秒杀。

最后是三等分角，由余弦的三倍角公式$\cos 3 \theta = 4 \cos^3 \theta - 3 \cos \theta$可知，对于绝大多数的“任意角”，这都要求一次次数为3的域扩张，从而也是不可能做到的，一样被秒杀。

就这样，接住伽罗华奠基并发展起来的域论工具，从古希腊时代一直流传到1837年的几何问题就很简单地被解决了……

当然，要做到这些也不是不可以，但都要求在直尺和圆规之外添加新的工具，对应的就是允许域扩张有更多的形式和可能。比如如果允许使用二刻尺，那三等分角就是可以实现的了。

> 最早的尺规作图中允许使用二刻尺，即在一把无刻度的直尺上有两个固定刻度的尺。但后来古希腊时代便不再允许使用二刻尺了。阿基米德最早证明了如何用二刻尺来实现任意角的三等分。

---

# N次方程的通解

上面我们实际上是用域论的工具来证明了，五次及以上的一次方程不存在根式通解，但并不是说不存在通解，只不过这个通解不能用根式来表达而已。

所以，五次及以上的方程并不是没有通解，毕竟我们都知道，N次方程在复数域必然有N个根（包括重根），其存在性毋庸置疑，只是怎么找出来的问题。

所以，我们可以换一个思路来解五次方程。

以$x^N + x + t = 0$为例（任意五次方程都可以通过一系列变换来化为这种被称为布灵方程的形式），我们可以使用泰勒展开来得到其一个根：

$$
\because x = \sum_{i = 0}^\infty c_i t^{(N - 1) i + 1}\phantom{wwwwwwwww}\\
\therefore x(t) = \sum_{i = 0}^\infty C^i_{N i} \frac{(- 1)^{N i + 1}\ t^{(N - 1) i + 1}}{(N - 1) i + 1}
$$

它实际上是一个广义超几何函数：

$$
x = - t \ _{N - 1} F_{N - 2} \left( \frac{1}{N}, \frac{2}{N}, ...\frac{N - 1}{N}; \frac{2}{N - 1}, \frac{3}{N - 1}, ...\frac{N - 2}{N - 1}, \frac{N}{N - 1}; \frac{(- N)^N t^{N - 1}}{(N - 1)^{N - 1}} \right)
$$

有了一个根，我们就可以将方程降次，然后反复通过坐标变换转化为低一次的布灵方程，再使用上述超几何函数来得到第二个根，如此重复直到得到所有根。

而，当N大于4的时候，超几何函数没有根式表达。

所以，N次方程的通项公式当然存在，只不过无法用根式来表达而已。

至此，我们将N次方程的根的问题算是彻底复盘完了。