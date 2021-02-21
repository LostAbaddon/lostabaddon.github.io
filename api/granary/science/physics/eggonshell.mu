标题：关于弹性球壳上砸鸡蛋的问题
更新：2020.04.13 11:48:14

早上有朋友问我一个问题：

> 一个弹性半球壳和一个弹性半椭圆球壳，各有一枚重量相同的鸡蛋，从距离壳层顶部相同的高度落下，问哪个鸡蛋更容易碎？

这个问题要完整分析比较麻烦，你要做的曲面积分比较多。

但好在只是问哪个更容易碎，所以我们可以一定的简化来分析这个问题。

所以，就把分析过程记录下来。

---

我们下面只考虑所谓的“极小形变”，即球壳的形变极其微小。

在这个前提下，我们可以将问题转化为这么一个情况：

> 将球壳转化为一个梯形台，底宽 2L，高 H，顶宽 2l，且 $\frac{l}{L} = \rho$ 可以视为一个常数，两侧斜边的长度都是 $\lambda = \sqrt{H^2 + (L - l)^2} = \sqrt{H^2 + L^2 (1 - \rho)^2}$

这个情况下，鸡蛋砸到球壳顶层后，形变主要发生在梯形的两个斜边相对顶部平面的角形变上。

在极小形变的要求下，此时弹性力来自这个角形变，且与形变角成正比。

不考虑球壳本身的质量引起的动量变化，根据冲量定理，**一段时间内鸡蛋动量的变化量等于球壳形变的弹性力在这段时间内的积分**（如果考虑球壳的质量，那动量部分就要加上球壳的动量变化，那问题就更麻烦了，所以这里忽略，反正是定性讨论嘛）。

下面，我们来计算这个弹性力。

根据上面所建立的模型，当球壳高度下降 $\Delta H$ 时，两边斜边的形变角度为：

$$
\Delta \alpha = \arccos \frac{H}{\lambda} - \arccos \frac{H - dH}{\lambda} \approx \frac{\Delta H}{L \sqrt{1 - \rho^2}}
$$

相应的，此时鸡蛋受到的向上的支撑力为：

$$
F_P \approx 2 \kappa \Delta \alpha \sin \alpha \approx \frac{2 \kappa}{\lambda \sqrt{1 - \rho^2}} \Delta H
$$

注意到，$\lambda$ 中实际上包含了高度 H，所以它并不是一个真正的弹性形变。但在极小形变下，$\lambda$ 的该变量我们可以忽略，所以此时可以认为它近似是一个弹性运动。

下面，根据弹性运动下的冲量定理（别忘了引力）：
$$
\Delta P = \int F dt = \kappa_P \int S(t) dt - \int G dt\\
= \kappa_P \int_0^t \left[ \frac{m g}{\kappa_P} \sqrt{1 + \frac{\kappa v_0^2}{m g^2}} \sin \left(\sqrt \frac{\kappa_P}{m} \tau - \arctan \sqrt{\frac{m g^2}{\kappa_P v_0^2}} \right) \right] d \tau\\
= m g \sqrt{\frac{m}{\kappa_P} + \frac{v_0^2}{g^2}} \left[ \cos \left( \arctan \sqrt{\frac{m g^2}{\kappa_P v_0^2}} \right) - \cos \left( \sqrt{\frac{\kappa_P}{m}} t - \arctan \sqrt{\frac{m g^2}{\kappa_P v_0^2}} \right) \right]\\
= m \left\{ v_0 \left[ 1 - \cos \left( \sqrt{\frac{\kappa_P}{m}} t \right) \right]  - \sqrt{\frac{m}{\kappa_P}} g \sin \left( \sqrt{\frac{\kappa_P}{m}} t \right) \right\}
$$

而动量改变量在两种情况下都是相同的：$\Delta P = m v_0$，所以我们可以估算出鸡蛋下落到底部所需要的时间 T 为：

$$
T = \sqrt{\frac{m}{\kappa_P}} \left[ \pi - \arctan \left( \frac{v_0}{g} \sqrt{\frac{\kappa_P}{m}} \right) \right]
$$

因此，鸡蛋的平均受力就是：

$$
\bar F = \frac{\Delta P}{T} = v_0 \sqrt{m \kappa_P} \left[ \pi - \arctan \left( \frac{v_0}{g} \sqrt{\frac{\kappa_P}{m}} \right) \right]^{-1}
$$

在所有系数都相等的情况下，显然有效弹性系数 $\kappa_P$ 越大，平均受力越大（分母项的反正切函数部分由于 $\kappa$ 很大所以基本接近最大值 $\frac{\pi}{2}$，故作用可以忽略）。

而，这个有效弹性系数，我们前面计算过了，是：

$$
\kappa_P = \frac{2 \kappa}{\lambda \sqrt{1 - \rho^2}} = \frac{2 \kappa}{\sqrt{[H^2 + L^2 (1 - \rho)^2](1 - \rho^2)}}
$$

当两个球壳材料相同的时候，弹性系数 $\kappa$ 相等。而平台区占比 $\rho$ 在我们选用的模型中是一个常数（它的含义大致可以理解为曲面法向量与垂直方向夹角小于一个给定系数的区域面积与底面积的比，当这个夹角范围足够小的时候，它随椭圆的长短轴比共变，所以作为一个常数基本算是一个可靠的近似）。所以，我们现在可以得到结论：

-  如果球壳高度相等，则底部越长的球壳，有效弹性系数越小，所以鸡蛋的平均受力越小；
-  如果球壳底部长度相等，则高度越小的球壳，有效弹性系数越小，所以鸡蛋的平均受力越小。

而，平均受力差不多可以衡量鸡蛋的“易碎程度”，因此问题就解决了。

当然，这是在底部没有固定的情况下。如果底部固定，那形变的主要来源就不是平台区与斜边相交处的角形变，而是平台区与斜边自身的弯曲形变，那情况就又不一样了。

事实上，上面的分析更接近于柱面的情况而非球壳的情况，对于球壳即便是弹性形变，也会引入高阶修正。不过我们这里既然只是一个定性分析，那就这样也就足够了。