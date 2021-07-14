标题：球对称时空中的标量场
作者：LostAbaddon
更新：2021/07/04 01:18:03
关键词：物理 广义相对论

在[《球对称时空中的自由下落物质是否可能构成黑洞》](/article/science/physics/gravity/fallingball2blackhole.mu)中，我们分析了球对称时空中只存在径向运动的点粒子时，时空的形态以及点粒子是否可能落入黑洞的问题。

我们这里来看一个复杂一点的情况：如果在保持球对称的情况下，现在时空中存在的不是点粒子而是标量场，会怎么样？

#	动力学方程

我们先来看Ricci张量与标量：

$$
ds^2 = - f(r,t) dt^2 + h(r,t) dr^2 + r^2 d\Omega^2\\
\begin{cases}
R_{\phi \phi} = \left[ 1 - \frac{1}{h} + \frac{r}{2 h} \left( \frac{h'}{h} - \frac{f'}{f} \right) \right] \sin^2 \theta\\
R_{\theta \theta} = 1 - \frac{1}{h} + \frac{r}{2 h} \left( \frac{h'}{h} - \frac{f'}{f} \right)\\
R_{r r} = \frac{h'}{r h} + \frac{H}{4 f}\\
R_{r t} = \frac{\dot h}{r h}\\
R_{t t} = \frac{f'}{r h} - \frac{H}{4 h}\\
H = 2 \ddot h - 2 f'' + \frac{f'^2 - \dot f \dot h}{f} - \frac{\dot h^2 - f' h'}{h}
\end{cases}\\
R = \frac{2}{r^2} \left( 1 - \frac{1}{h} \right) + \frac{2}{r h} \left( \frac{h'}{h} - \frac{f'}{f} \right) + \frac{H}{2 f h}
$$

下面，引入径向运动的实标量场$\phi (r, t)$与宇宙学常数，从而有：

$$
R_{\mu \nu} - \frac{1}{2} R g_{\mu \nu} + \Lambda g_{\mu \nu} = 8 \pi \partial_\mu \phi \partial_\nu \phi - 4 \pi \left( \partial_\alpha \phi \partial_\beta \phi g^{\alpha \beta} + m^2 \phi^2 \right) g_{\mu \nu}
$$

所以我们就有如下场方程：

$$
\begin{cases}
m^2 \phi = \partial_\mu \left( g^{\mu \nu} \partial_\nu \phi \right)\\
4 \pi \partial_\mu \phi \partial_\nu \phi g^{\mu \nu} = \frac{1}{2} R - 2 \Lambda - 8 \pi m^2 \phi^2\\
1 - \frac{1}{h} + \frac{r}{2 h} \left( \frac{h'}{h} - \frac{f'}{f} \right) = \left( \Lambda + 4 \pi m^2 \phi^2 \right) r^2\\
\frac{h'}{r h} + \frac{H}{4 f} = 8 \pi \phi'^2 + \left( \Lambda + 4 \pi m^2 \phi^2 \right) h\\
\frac{f'}{r h} - \frac{H}{4 h} = 8 \pi \dot \phi^2 - \left( \Lambda + 4 \pi m^2 \phi^2 \right) f\\
\frac{\dot h}{r h} = 8 \pi \phi' \dot \phi\\
H = 2 \ddot h - 2 f'' + \frac{f'^2 - \dot f \dot h}{f} - \frac{\dot h^2 - f' h'}{h}
\end{cases}
$$

整理后可得：

$$
\begin{cases}
m^2 \phi = \frac{1}{h} \phi'' - \frac{1}{f} \ddot \phi + \frac{\dot f}{f^2} \dot \phi - \frac{h'}{h^2} \phi'\\
\partial_t \ln h = 8 \pi r \phi' \dot \phi\\
\partial_r \ln \left( \frac{h}{f} \right) = 2 \left( \Lambda + 4 \pi m^2 \phi^2 \right) r h - \frac{2 h - 2}{r}\\
\partial_r \ln (h f) = 8 \pi r \left( \phi'^2 + \dot \phi^2 \frac{h}{f} \right)
\end{cases}
$$

由最后两式可得：

$$
\partial_r \ln h = 4 \pi r \left( \phi'^2 + \dot \phi^2 \frac{h}{f} \right) + \left( \Lambda + 4 \pi m^2 \phi^2 \right) r h - \frac{h - 1}{r}
$$

结合第二式就有：

$$
8 \pi \phi' \dot \phi + 8 \pi r \phi'' \dot \phi + 8 \pi r \phi' \dot \phi' = 4 \pi r \partial_t \left( \phi'^2 + \dot \phi^2 \frac{h}{f} \right) + \left( 8 \pi m^2 \phi \dot \phi \right) r h + \left( \Lambda + 4 \pi m^2 \phi^2 \right) r \dot h - \frac{\dot h}{r}
$$

我们可以参考点粒子与理想流体情况中的结果，取$h$为如下形式：

$$
h(r, t) = \frac{r}{r - 2 M(r, t)}
$$

这样就有：

$$
\begin{cases}
m^2 \phi = \frac{1}{h} \phi'' - \frac{1}{f} \ddot \phi + \frac{\dot f}{f^2} \dot \phi - \frac{h'}{h^2} \phi'\\
\frac{ 2 \dot M }{r - 2 M} = 8 \pi r \phi' \dot \phi\\
\partial_r \ln \left( \frac{h}{f} \right) = 2 \left( \Lambda + 4 \pi m^2 \phi^2 \right) \frac{r^2}{r - 2 M} - \frac{4 M}{r (r - 2 M)}\\
\partial_r \ln (h f) = 8 \pi r \left( \phi'^2 + \dot \phi^2 \frac{h}{f} \right)\\
8 \pi \phi' \dot \phi + 8 \pi r \phi'' \dot \phi + 8 \pi r \phi' \dot \phi' = 4 \pi r \partial_t \left( \phi'^2 + \dot \phi^2 \frac{h}{f} \right) + \left( 8 \pi m^2 \phi \dot \phi \right) r h + \left( \Lambda + 4 \pi m^2 \phi^2 \right) r \dot h - \frac{\dot h}{r}
\end{cases}
$$

我们下面主要考虑一个最简单的情况：$\Lambda = m = 0$。

此时方程相对非常简单：

$$
\begin{cases}
h = \frac{r}{r - 2 M}\\
\frac{ 2 \dot M }{r - 2 M} = 8 \pi r \phi' \dot \phi\\
\partial_r \ln f = \frac{2 ( r M' + M )}{r (r - 2 M)}\\
\phi'^2 + \dot \phi^2 \frac{h}{f} = \frac{M'}{2 \pi r (r - 2 M)}\\
\frac{1}{h} \phi'' - \frac{1}{f} \ddot \phi + \frac{\dot f}{f^2} \dot \phi - \frac{h'}{h^2} \phi' = 0\\
\frac{2 ( r M' - M )}{r^2 (r - 2 M)} + \frac{H}{4 f} = 8 \pi \phi'^2\\
H = \frac{12 r \dot M^2}{(r - 2 M)^3} + \frac{4 r \ddot M}{(r - 2 M)^2} - 2 f'' + \frac{f'^2}{f} - \frac{\dot f}{f} \frac{2 r \dot M}{(r - 2 M)^2} + \frac{2 (r M' - M)}{r (r - 2 M)} f'
\end{cases}
$$

这里最后的部分构成了一组很复杂的约束条件，但除此之外的部分其实相对而言还是很简单的。

如果将标量场视为“已知”的，那么实际上就可以形式地写出M的表达式为：

$$
\ln (r - 2 M) = H_0(r) + 8 \pi r \int_0^t \phi' \dot \phi dt
$$

其中，部分是运动方程，而另外一些则可以被视为是约束方程，用来消除冗余自由度。

我们下面主要分析它的一些动力学特性。

#	时空演化分析

我们将运动方程中提取并整理出这么几条：

$$
\begin{cases}
\partial_r \ln h = \left[ \Lambda + 4 \pi\left( m^2 \phi^2 + \frac{\phi'^2}{h} + \frac{\dot \phi^2}{f} \right) \right] r h - \frac{1}{r} (h - 1)\\
\partial_r \ln (h f) = 8 \pi \left( \frac{\phi'^2}{h} + \frac{\dot \phi^2}{f} \right) r h\\
\partial_r \ln \left( \frac{h}{f} \right) = 2 \left( \Lambda + 4 \pi m^2 \phi^2 \right) r h - \frac{2 h - 2}{r}\\
\end{cases}
$$

形式上，我们取：

$$
\begin{align}
p(r, t) &= \frac{\phi'^2}{h} + \frac{\dot \phi^2}{f}\\
\rho(r, t) &= \frac{\Lambda}{4 \pi} + m^2 \phi^2 + p
\end{align}
$$

这样就有（第二式的指数部分选择如此形式要求$\Lambda = 0$）：

$$
\begin{align}
h(r, t) &= \frac{r}{r - 4 \pi \int_0^r \rho (x, t) x^2 dx}\\
f(r, t) h(r, t) &= \exp \left[ - 8 \pi \int_r^\infty p (x, t) x h (x, t) dr \right]
\end{align}
$$

由于无穷远处我们可以认定$f = h = 1$，所以很显然，$\rho \ge 0$和$p \ge 0$是可以保证的，只要宇宙学常数$\Lambda$不是负得特厉害就可以。而$h > 0$在遇到最外层的奇异性位置$r_H$之前也必然大于0。

另一方面，从上面我们也可以知道$0 \le f h \le 1$在最外层奇异性位置$r_H(t)$之外（如果存在奇异性的话）处处成立，且它在$r_H$之外随r的增加不减小。因此，不难得出结论：如果$h$在$r_H$处发散，则$f$在此处必然为0，这个位置自然就形成了一个视界。而，从$h$的形式表达可知，视界的形成甚至都不必须要求$\phi$、$\phi'$或$\dot \phi$发散。

##	逼近发散——黑洞是否可能在有限未来出现？

我们下面主要将视线集中在可能会出现奇异性的区域。

在这里，$h \gg 1$而$f \approx 0$，且$f h < 1$，这些都是上面我们已经得到的结果。

下面，根据$f h < 1$，我们假定在这个近奇异区域中$f \sim h^{- 1 - \varepsilon}$且$\varepsilon > 1$，所以现在在近奇异区运动方程为：

$$
\begin{align}
\therefore & \quad (2 + \varepsilon) 4 \pi \rho r h = \varepsilon \frac{1}{r} (h - 1)\\
\therefore & \quad h \approx \left[ \frac{\varepsilon f_0}{(2 + \varepsilon) 4 \pi r^2} \right]^{\frac{1}{1 + \varepsilon}} \left| \dot \phi \right|^{- \frac{2}{1 + \varepsilon}}\\
\therefore & \quad 8 \pi r \phi' \dot \phi \approx - \frac{2}{1 + \varepsilon} \frac{\ddot \phi}{\dot \phi}\\
\therefore & \quad \ddot \phi \approx - (1 + \varepsilon) 4 \pi r \phi' \dot \phi^2\\
\end{align}
$$

如果我们将$\phi(r, t_0) = \phi_0 (r)$、$\phi'(r, t_0) = \phi_r (r)$、$\dot \phi(r, t_0) = \phi_t (r)$视为已知条件，则可以由此估算出下一刻的标量场为：

$$
\begin{align}
\phi & \approx \phi_0 + \frac{\ln \left[ 1 + (1 + \varepsilon) 4 \pi r \phi_r \phi_t (t - t_0) \right]}{(1 + \varepsilon) 4 \pi r \phi_r}\\
\partial_t \phi & \approx \frac{\phi_t}{1 + (1 + \varepsilon) 4 \pi r \phi_r \phi_t (t - t_0)}
\end{align}
$$

由于，我们希望在$h \gg 1$的区域随着时间的演化能出现$h$发散的奇异性区域，这实际上就要求$\dot h$在该奇异性区域必须大于0，反应在该区域的初始条件上，就等于要求$\phi_r \phi_t > 0$，而这又反过来告诉我们：$\phi$与$\partial_t \phi$不可能在有限区域中发散——一旦它进入可能构成奇异性的“预备区域”，它自己会立刻从中离开，除非初始条件已经存在奇异性。

当然，也存在一种可能，便是$\partial_r \phi$在近奇异区域的某个特定的位置发散，从而造成$\phi$和$\partial_t \phi$，因此我们需要研究一下$\partial_r \phi$的行为。

将上面的结果代入标量场运动方程及约束方程，我们将得到一个看起来很简洁的结果：

$$
\begin{align}
\phi'' & \approx m^2 \phi h + \frac{\varepsilon - 1}{r} h \phi'\\
\dot \phi' & \approx \left[ \left( \Lambda + 4 \pi m^2 \phi^2 \right) r - \frac{\varepsilon (1 + \varepsilon)}{(2 + \varepsilon) r} \right] h \dot \phi
\end{align}
$$

由第二条方程我们可知（别忘了将$h$表达为$\dot \phi$的函数），虽然由于近奇异区域中$\dot \phi < 0$，从而在宇宙学常数和标量场质量都不大时，场的径向梯度$\phi'$会随时增大，因此似乎可以形成一个$\partial_t \phi = 0$从而度规出现奇异性的情况。但进一步研究该方程的行为后，我们可以发现径向梯度不可能在有限区域内达到发散，所以标量场不可能在有限时间内衰减为0，除非近奇异区内已经存在位置使梯度发散。

换言之，即便考虑上$\partial_r \phi$随着时间的不断增长，__近奇异区域内如果本来没有奇异性的话，也无法在有限坐标时内自然演化出奇异性__——当然，如果我们沿着某根测地线下落的话，在内秉时间我们可以遇到奇异性，换言之在最大解析延拓下，奇异性依然是可以出现的，这是早已由彭罗斯证明了的。

但，就和只考虑经典点粒子以及理想流体时的情况一样，由于时空奇异性不可能在有限坐标时内出现，而在引入霍金辐射后，任何奇异性区域都会在有限坐标时内蒸发干净，这至少告诉我们：__在奇异性区域之外的标量场不可能在有限时间内进入黑洞内部，即便它在尽全力向黑洞坠去__。

>	事实上，由于Unruh效应即便没有视界这类时空奇异性区域也一样存在，它是非平直时空（包括从加速运动看来的等效非平直时空）的固有特性，因此在一个没有奇异性的使用也一样存在霍金辐射，从而这类时空的近奇异区域看来一样会排斥奇异性的诞生。


当然，从上面我们似乎还能看到另外一种可能性：

在近奇异性区域内，由于某些原因，比如霍金辐射，使得原本吸收标量场而造成的$\phi_r \phi_t > 0$的情况被“反转”，以致于$\phi_r \phi_t \ll 0$，那么便有可能在有限时间内出现时空奇异性。

而这样的情况却是有可能出现的：近奇异性区域对应的Unruh效应非常强烈，从而使得向外辐射出的场比被引力吸收来的场要强得多，那么在一阵辐射爆发的瞬间，一个奇异的时空区域便有可能形成。

这里已经需要考虑量子引力了，所以已经不是单纯用广义相对论的本文能解释的问题了。


而，从上面的分析我们可以看出，至少在只有径向运动的情况下，标量场会逐渐向中心聚拢，越往外的标量场会越“稀薄”，最后形成一个近奇异区域，这里的时空相较外部会有更大的弯曲，具有很强的引力红移，且该区域内时空的弯曲程度会越来越大，但在无穷远观测者看来它永远也无法形成时空真正奇异的黑洞，标量场会被不断吸入该区域，并形成一个厚厚的“保护壳”。从落向该近奇异性区域的观测者看来，这个区域会在有限的未来形成黑洞——但如果我们考虑到近奇异性区域本身所具有的霍金辐射，那既有可能无论是在无穷远观测者还是自由落体观测者看来，这个区域都不会形成黑洞，而会形成一个达到动态平衡的区域，在这里霍金辐射足够强，它可以和标量场抗衡、将标量场拒斥在外，形成一个时空扭曲极强但还没有强到能形成黑洞的“灰洞”。

当然，这是在完全不考虑标量场具体是什么物体对象的情况下，现实中的粒子显然不是标量场，而我们也需要更加相似的关于量子引力的信息才能真正解决问题。


#	结论

通过上述分析，我们可以得到如下结论：

1.	标量场不可能在这类准Schwarzschild时空的有限坐标时内完全落入黑洞；
2.	考虑霍金辐射的话，时空奇异性区域几乎不可能出现；
	-	除非近奇异性区域突然爆发一次，那么在这个瞬间有可能构造出奇异性时空，但这种情况极难发生
3.	最有可能的情况，是时空中心会形成一个霍金辐射与标量场坍缩相抗衡抵消的区域，在行为上表现为灰洞：引力极强，从而有极强的霍金辐射，但又没强到出现时空奇异性。

这些结论和点粒子及理想流体的情况非常相似。