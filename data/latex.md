标题：LaTeX 常用数学公式与符号语法一览

# 常用符号


|^^**希腊字母**^^|
|`\\alpha`|$\alpha$|`A`|$A$|`\\beta`|$\beta$|`B`|$B$|
|`\\gamma`|$\gamma$|`\\Gamma`|$\Gamma$|`\\delta`|$\delta$|`\\Delta`|$\Delta$|
|`\\epsilon`|$\epsilon$|`E`|$E$|`\\varepsilon`|$\varepsilon$| | |
|`\\zeta`|$\zeta$|`Z`|$Z$|`\\eta`|$\eta$|`H`|$H$|
|`\\theta`|$\theta$|`\\Theta`|$\Theta$|`\\vartheta`|$\vartheta$| | |
|`\\iota`|$\iota$|`I`|$I$|`\\kappa`|$\kappa$|`K`|$K$|
|`\\lambda`|$\lambda$|`\\Lambda`|$\Lambda$|`\\mu`|$\mu$|`M`|$M$|
|`\\nu`|$\nu$|`N`|$N$|`\\xi`|$\xi$|`\\Xi`|$\Xi$|
|`o`|$o$|`O`|$O$|`\\pi`|$\pi$|`\\Pi`|$\Pi$|
|`\\varpi`|$\varpi$| | |`\\rho`|$\rho$|`P`|$P$|
|`\\varrho`|$\varrho$| | |`\\sigma`|$\sigma$|`\\Sigma`|$\Sigma$|
|`\\varsigma`|$\varsigma$| | |`\\tau`|$\tau$|`T`|$T$|
|`\\upsilon`|$\upsilon$|`Y`|$Y$|`\\phi`|$\phi$|`\\Phi`|$\Phi$|
|`\\varphi`|$\varphi$| | |`\\chi`|$\chi$|`X`|$X$|
|`\\psi`|$\psi$|`\\Psi`|$\Psi$|`\\omega`|$\omega$|`\\Omega`|$\Omega$|
|^^**已弃用希腊字母**^^|
|`\\digamma`|$\digamma$|`\\varkappa`|$\varkappa$|`\\backepsilon`|$\backepsilon$|
|^^**已弃用希伯来字母**^^|
|`\\aleph`|$\aleph$|`\\beth`|$\beth$|`\\daleth`|$\daleth$|`\\gimel`|$\gimel$|
|^^**数学物理相关**^^|
|`\\Re`|$\Re$|`\\Im`|$\Im$|`\\infty`|$\infty$|`\\complement`|$\complement$|
|`\\imath`|$\imath$|`\\jmath`|$\jmath$|`\\Bbbk`|$\Bbbk$|
|`\\hbar`|$\hbar$|`\\ell`|$\ell$|`\\mho`|$\mho$|
|^^**音乐符号**^^|
|`\\flat`|$\flat$|`\\natural`|$\natural$|`\\sharp`|$\sharp$|
|^^**段落符号**^^|
|`\\S`|$\S$|`\\%`|$\%$|`\\dagger`|$\dagger$|`\\ddagger`|$\ddagger$|
|^^**扑克符号**^^|
|`\\diamondsuit`|$\diamondsuit$|`\\heartsuit`|$\heartsuit$|`\\clubsuit`|$\clubsuit$|`\\spadesuit`|$\spadesuit$|
|^^**其它符号**^^|
|`\\eth`|$\eth$|`\\wp`|$\wp$|`\\wr`|$\wr$|`\\Finv`|$\Finv$|
|`\\Game`|$\Game$|`\\smile`|$\smile$|`\\frown`|$\frown$|`\\circledS`|$\circledS$|

# 常用算符

## 常用间隔符

|紧贴`\\!`|$a \! b$|无空格|$a b$|小空格`\\,`|$a \, b$|
|中空格`\\;`|$a \; b$|空格`\\ `|$a \  b$|空格`~`|$a ~ b$|
|大空格`\\quad`|$a \quad b$|超大空格`\\qquad`|$a \qquad b$|任意长间隔`\\phantom{wwwwww}`|$a \phantom{wwwwww} b$|


## 常用修饰符

|根号`\\sqrt{abc}`|$\sqrt{abc}$|任意幂次根号`\\sqrt[n]{abc}`|$\sqrt[n]{abc}$|侧根号`\\surd`|$\surd abc$|
|上标`{a}^{bc}`|$a^{bc}$|下标`{a}_{bc}`|$a_{bc}$|
|分数`\\frac{abc}{xyz}`|$\frac{abc}{xyz}$|分数`abc \\over xyz`|$abc \over xyz$|
|小分数`\\tfrac{abc}{xyz}`|$\tfrac{abc}{xyz}$|中分数`\\cfrac{abc}{xyz}`|$\cfrac{abc}{xyz}$|大分数`\\dfrac{abc}{xyz}`|$\dfrac{abc}{xyz}$|
|`\\overset{abc} {xyz}`|$\overset{abc} {xyz}$|`\\underset{abc} {xyz}`|$\underset{abc} {xyz}$|
|`\\hat{n}`|$\hat{n}$|`\\check{n}`|$\check{n}$|`\\tilde{n}`|$\tilde{n}$|
|`\\acute{n}`|$\acute{n}$|`\\grave{n}`|$\grave{n}$|`\\dot{n}`|$\dot{n}$|
|`\\ddot{n}`|$\ddot{n}$|`\\breve{n}`|$\breve{n}$|`\\bar{n}`|$\bar{n}$|
|`\\vec{n}`|$\vec{n}$|`\\widehat{abc}`|$\widehat{abc}$|`\\widetilde{abc}`|$\widetilde{abc}$|
|`\\overrightarrow{abc}`|$\overrightarrow{abc}$|`\\overleftarrow{abc}`|$\overleftarrow{abc}$|`\\overleftrightarrow{abc}`|$\overleftrightarrow{abc}$|
|`\\overline{abc}`|$\overline{abc}$|`\\underline{abc}`|$\underline{abc}$|`\\brace{abc}`|$\brace{abc}$|
|`\\overbrace{abc}`|$\overbrace{abc}$|`\\overbrace{abc}^{n}`|$\overbrace{abc}^n$|`\\overbrace{abc}_{n}`|$\overbrace{abc}_n$|
|`\\underbrace{abc}`|$\underbrace{abc}$|`\\underbrace{abc}^{n}`|$\underbrace{abc}^n$|`\\underbrace{abc}_{n}`|$\underbrace{abc}_n$|

## 常用运算符

|`\\sin`|$\sin$|`\\cos`|$\cos$|`\\tan`|$\tan$|`\\cot`|$\cot$|
|`\\sec`|$\sec$|`\\csc`|$\csc$|
|`\\arcsin`|$\arcsin$|`\\arccos`|$\arccos$|`\\arctan`|$\arctan$|
|`\\sinh`|$\sinh$|`\\cosh`|$\cosh$|`\\tanh`|$\tanh$|`\\coth`|$\coth$|
|`\\exp`|$\exp$|`\\log`|$\log$|`\\lg`|$\lg$|`\\ln`|$\ln$|
|^^**数列**^^|
|`\\sum_{a}^b`|$\sum_{a}^b$|`\\prod_{a}^b`|$\prod_{a}^b$|`\\coprod_{a}^b`|$\coprod_{a}^b$|`\\lim_{a}^b`|$\lim_{a}^b$|
|^^**微积分**^^|
|`\\int_{a}^b`|$\int_{a}^b$|`\\iint_{a}^b`|$\iint_{a}^b$|`\\iiint_{a}^b`|$\iiint_{a}^b$|`\\iiiint_{a}^b`|$\iiiint_{a}^b$|
|`\\oint_{a}^b`|$\oint_{a}^b$|
|`\\nabla`|$\nabla$|`\\partial`|$\partial$|`\\prime`|$\prime$|`\\backprime`|$\backprime$|
|^^**界限**^^|
|`\\max`|$\max$|`\\min`|$\min$|`\\sup`|$\sup$|`\\inf`|$\inf$|
|`\\limsup`|$\limsup$|`\\liminf`|$\liminf$|
|`\\ker`|$\ker$|`\\det`|$\det$|`\\deg`|$\deg$|`\\dim`|$\dim$|
|^^**投射**^^|
|`\\arg`|$\arg$|`\\Pr`|$\Pr$|`\\hom`|$\hom$|
|^^**模运算**^^|
|`\\gcd`|$\gcd$|`\\mod{n}`|$\mod{n}$|`\\pmod{n}`|$\pmod{n}$|`\\bmod{n}`|$\bmod{n}$|
|`\\mid`|$\mid$|`\\nmid`|$\nmid$|`\\shortmid`|$\shortmid$|`\\nshortmid`|$\nshortmid$|
|`\\equiv`|$\equiv$|
|^^**二元运算**^^|
|`\\pm`|$\pm$|`\\mp`|$\mp$|`\\dotplus`|$\dotplus$|
|`\\times`|$\times$|`\\div`|$\div$|`\\divideontimes`|$\divideontimes$|`\\backslash`|$\backslash$|
|`\\cdot`|$\cdot$|`\\ast`|$\ast$|`\\star`|$\star$|`\\circ`|$\circ$|
|`\\bullet`|$\bullet$|
|`\\boxplus`|$\boxplus$|`\\boxminus`|$\boxminus$|`\\boxtimes`|$\boxtimes$|`\\boxdot`|$\boxdot$|
|`\\oplus`|$\oplus$|`\\ominus`|$\ominus$|`\\otimes`|$\otimes$|`\\oslash`|$\oslash$|
|`\\odot`|$\odot$|`\\circleddash`|$\circleddash$|`\\circledcirc`|$\circledcirc$|`\\circledast`|$\circledast$|
|`\\bigoplus`|$\bigoplus$|`\\bigotimes`|$\bigotimes$|`\\bigodot`|$\bigodot$|
|^^**集合**^^|
|`\\emptyset`|$\emptyset$|`\\varnothing`|$\varnothing$|
|`\\in`|$\in$|`\\notin`|$\notin$|`\\ni`|$\ni$|
|`\\cap`|$\cap$|`\\Cap`|$\Cap$|`\\sqcap`|$\sqcap$|`\\bigcap`|$\bigcap$|
|`\\cup`|$\cup$|`\\Cup`|$\Cup$|`\\sqcup`|$\sqcup$|`\\bigcup`|$\bigcup$|
|`\\bigsqcup`|$\bigsqcup$|`\\uplus`|$\uplus$|`\\biguplus`|$\biguplus$|
|`\\setminus`|$\setminus$|`\\smallsetminus`|$\smallsetminus$|
|`\\subset`|$\subset$|`\\Subset`|$\Subset$|`\\sqsubset`|$\sqsubset$|
|`\\supset`|$\supset$|`\\Supset`|$\Supset$|`\\sqsupset`|$\sqsupset$|
|`\\subseteq`|$\subseteq$|`\\nsubseteq`|$\nsubseteq$|`\\subsetneq`|$\subsetneq$|`\\varsubsetneq`|$\varsubsetneq$|
|`\\supseteq`|$\supseteq$|`\\nsupseteq`|$\nsupseteq$|`\\supsetneq`|$\supsetneq$|`\\varsupsetneq`|$\varsupsetneq$|
|`\\subseteqq`|$\subseteqq$|`\\nsubseteqq`|$\nsubseteqq$|`\\subsetneqq`|$\subsetneqq$|`\\varsubsetneqq`|$\varsubsetneqq$|
|`\\supseteqq`|$\supseteqq$|`\\nsupseteqq`|$\nsupseteqq$|`\\supsetneqq`|$\supsetneqq$|`\\varsupsetneqq`|$\varsupsetneqq$|
|`\\sqsubseteq`|$\sqsubseteq$|`\\sqsupseteq`|$\sqsupseteq$|
|^^**比较**^^|
|`\\neq`|$\neq$|`\\doteq`|$\doteq$|`\\doteqdot`|$\doteqdot$|
|`\\sim`|$\sim$|`\\nsim`|$\nsim$|`\\backsim`|$\backsim$|`\\thicksim`|$\thicksim$|
|`\\simeq`|$\simeq$|`\\backsimeq`|$\backsimeq$|`\\eqsim`|$\eqsim$|
|`\\cong`|$\cong$|`\\ncong`|$\ncong$|
|`\\approx`|$\approx$|`\\thickapprox`|$\thickapprox$|`\\approxeq`|$\approxeq$|`\\asymp`|$\asymp$|
|`\\propto`|$\propto$|`\\varpropto`|$\varpropto$|
|`\\nless`|$\nless$|`\\ll`|$\ll$|`\\lll`|$\lll$|`\\lessdot`|$\lessdot$|
|`\\ngtr`|$\ngtr$|`\\gg`|$\gg$|`\\ggg`|$\ggg$|`\\gtrdot`|$\gtrdot$|
|`\\le`|$\le$|`\\leq`|$\leq$|`\\lneq`|$\lneq$|`\\leqq`|$\leqq$|
|`\\nleq`|$\nleq$|`\\nleqq`|$\nleqq$|`\\lneqq`|$\lneqq$|`\\lvertneqq`|$\lvertneqq$|
|`\\ge`|$\ge$|`\\geq`|$\geq$|`\\gneq`|$\gneq$|`\\geqq`|$\geqq$|
|`\\ngeq`|$\ngeq$|`\\ngeqq`|$\ngeqq$|`\\gneqq`|$\gneqq$|`\\gvertneqq`|$\gvertneqq$|
|`\\lessgtr`|$\lessgtr$|`\\lesseqgtr`|$\lesseqgtr$|`\\lesseqqgtr`|$\lesseqqgtr$|
|`\\gtrless`|$\gtrless$|`\\gtreqless`|$\gtreqless$|`\\gtreqqless`|$\gtreqqless$|
|`\\leqslant`|$\leqslant$|`\\nleqslant`|$\nleqslant$|`\\eqslantless`|$\eqslantless$|
|`\\geqslant`|$\geqslant$|`\\ngeqslant`|$\ngeqslant$|`\\eqslantgtr`|$\eqslantgtr$|
|`\\lesssim`|$\lesssim$|`\\lnsim`|$\lnsim$|`\\lessapprox`|$\lessapprox$|`\\lnapprox`|$\lnapprox$|
|`\\gtrsim`|$\gtrsim$|`\\gnsim`|$\gnsim$|`\\gtrapprox`|$\gtrapprox$|`\\gnapprox`|$\gnapprox$|
|`\\prec`|$\prec$|`\\nprec`|$\nprec$|`\\preceq`|$\preceq$|`\\npreceq`|$\npreceq$|
|`\\precneqq`|$\precneqq$|
|`\\succ`|$\succ$|`\\nsucc`|$\nsucc$|`\\succeq`|$\succeq$|`\\nsucceq`|$\nsucceq$|
|`\\succneqq`|$\succneqq$|
|`\\preccurlyeq`|$\preccurlyeq$|`\\curlyeqprec`|$\curlyeqprec$|`\\succcurlyeq`|$\succcurlyeq$|`\\curlyeqsucc`|$\curlyeqsucc$|
|`\\precsim`|$\precsim$|`\\precnsim`|$\precnsim$|`\\precapprox`|$\precapprox$|`\\precnapprox`|$\precnapprox$|
|`\\succsim`|$\succsim$|`\\succnsim`|$\succnsim$|`\\succapprox`|$\succapprox$|`\\succnapprox`|$\succnapprox$|
|^^**几何**^^|
|`\\parallel`|$\parallel$|`\\nparallel`|$\nparallel$|`\\shortparallel`|$\shortparallel$|`\\nshortparallel`|$\nshortparallel$|
|`\\perp`|$\perp$|`\\angle`|$\angle$|`\\sphericalangle`|$\sphericalangle$|`\\measuredangle`|$\measuredangle$|
|`\\Box`|$\Box$|`\\square`|$\square$|`\\blacksquare`|$\blacksquare$|`\\bigstar`|$\bigstar$|
|`\\diamond`|$\diamond$|`\\Diamond `|$\Diamond $|`\\lozenge`|$\lozenge$|`\\blacklozenge`|$\blacklozenge$|
|`\\bigcirc`|$\bigcirc$|`\\triangle `|$\triangle $|`\\bigtriangleup`|$\bigtriangleup$|`\\bigtriangledown`|$\bigtriangledown$|
|`\\vartriangle`|$\vartriangle$|`\\triangledown `|$\triangledown $|`\\blacktriangle`|$\blacktriangle$|`\\blacktriangledown`|$\blacktriangledown$|
|`\\triangleleft`|$\triangleleft$|`\\triangleright`|$\triangleright$|`\\blacktriangleleft`|$\blacktriangleleft$|`\\blacktriangleright`|$\blacktriangleright$|
|^^**逻辑**^^|
|`\\forall`|$\forall$|`\\exists`|$\exists$|`\\nexists`|$\nexists$|
|`\\therefore`|$\therefore$|`\\because`|$\because$|`\\And`|$\And$|`\\lnot`|$\lnot$|
|`\\lor`|$\lor$|`\\vee`|$\vee$|`\\curlyvee`|$\curlyvee$|`\\bigvee`|$\bigvee$|
|`\\land`|$\land$|`\\wedge`|$\wedge$|`\\curlywedge`|$\curlywedge$|`\\bigwedge`|$\bigwedge$|
|`\\bot`|$\bot$|`\\top`|$\top$|`\\vdash`|$\vdash$|`\\dashv`|$\dashv$|
|`\\ulcorner `|$\ulcorner $|`\\urcorner `|$\urcorner $|`\\llcorner `|$\llcorner $|`\\lrcorner`|$\lrcorner$|
|`\\vDash`|$\vDash$|`\\Vdash`|$\Vdash$|`\\Vvdash`|$\Vvdash$|`\\models`|$\models$|
|`\\nvdash`|$\nvdash$|`\\nVdash`|$\nVdash$|`\\nvDash`|$\nvDash$|`\\nVDash`|$\nVDash$|
|^^**箭头**^^|
|`\\leftarrow`|$\leftarrow$|`\\Leftarrow`|$\Leftarrow$|`\\Lleftarrow`|$\Lleftarrow$|`\\Longleftarrow`|$\Longleftarrow$|
|`\\rightarrow`|$\rightarrow$|`\\Rightarrow`|$\Rightarrow$|`\\Rrightarrow`|$\Rrightarrow$|`\\Longrightarrow`|$\Longrightarrow$|
|`\\to`|$\to$|`\\gets`|$\gets$|`\\implies`|$\implies$|`\\iff`|$\iff$|
|`\\leftrightarrow`|$\leftrightarrow$|`\\Leftrightarrow`|$\Leftrightarrow$|`\\longleftrightarrow`|$\longleftrightarrow$|`\\Longleftrightarrow`|$\Longleftrightarrow$|
|`\\nleftarrow`|$\nleftarrow$|`\\nrightarrow`|$\nrightarrow$|`\\nLeftarrow`|$\nLeftarrow$|`\\nRightarrow`|$\nRightarrow$|
|`\\nleftrightarrow`|$\nleftrightarrow$|`\\longleftarrow`|$\longleftarrow$|`\\longrightarrow`|$\longrightarrow$|`\\leadsto`|$\leadsto$|
|`\\uparrow`|$\uparrow$|`\\downarrow`|$\downarrow$|`\\updownarrow`|$\updownarrow$|
|`\\Uparrow`|$\Uparrow$|`\\Downarrow`|$\Downarrow$|`\\Updownarrow`|$\Updownarrow$|
|`\\nearrow`|$\nearrow$|`\\swarrow`|$\swarrow$|`\\nwarrow`|$\nwarrow$|`\\searrow`|$\searrow$|
|`\\mapsto`|$\mapsto$|`\\longmapsto`|$\longmapsto$|`\\multimap`|$\multimap$|
|`\\rightharpoonup`|$\rightharpoonup$|`\\rightharpoondown`|$\rightharpoondown$|`\\leftharpoonup`|$\leftharpoonup$|`\\leftharpoondown`|$\leftharpoondown$|
|`\\upharpoonleft`|$\upharpoonleft$|`\\upharpoonright`|$\upharpoonright$|`\\downharpoonleft`|$\downharpoonleft$|`\\downharpoonright`|$\downharpoonright$|
|`\\rightleftharpoons`|$\rightleftharpoons$|`\\leftrightharpoons`|$\leftrightharpoons$|`\\rightleftarrows`|$\rightleftarrows$|`\\leftrightarrows`|$\leftrightarrows$|
|`\\curvearrowleft`|$\curvearrowleft$|`\\curvearrowright`|$\curvearrowright$|`\\circlearrowleft`|$\circlearrowleft$|`\\circlearrowright`|$\circlearrowright$|
|`\\Lsh`|$\Lsh$|`\\Rsh`|$\Rsh$|`\\upuparrows`|$\upuparrows$|`\\downdownarrows`|$\downdownarrows$|
|`\\rightrightarrows`|$\rightrightarrows$|`\\leftleftarrows`|$\leftleftarrows$|`\\rightarrowtail`|$\rightarrowtail$|`\\leftarrowtail`|$\leftarrowtail$|
|`\\looparrowright`|$\looparrowright$|`\\looparrowleft`|$\looparrowleft$|`\\hookrightarrow`|$\hookrightarrow$|`\\hookleftarrow`|$\hookleftarrow$|
|`\\leftrightsquigarrow`|$\leftrightsquigarrow$|`\\rightsquigarrow`|$\rightsquigarrow$|`\\twoheadrightarrow`|$\twoheadrightarrow$|`\\twoheadleftarrow`|$\twoheadleftarrow$|
|^^**省略号**^^|
|`\\ldots`|$\ldots$|`\\cdots`|$\cdots$|`\\vdots`|$\vdots$|`\\ddots`|$\ddots$|
|^^**排序**^^|
|`\\diagup`|$\diagup$|`\\diagdown`|$\diagdown$|`\\centerdot`|$\centerdot$|
|`\\ltimes`|$\ltimes$|`\\rtimes`|$\rtimes$|`\\leftthreetimes`|$\leftthreetimes$|`\\rightthreetimes`|$\rightthreetimes$|
|`\\eqcirc`|$\eqcirc$|`\\circeq`|$\circeq$|`\\triangleq`|$\triangleq$|
|`\\risingdotseq`|$\risingdotseq$|`\\fallingdotseq`|$\fallingdotseq$|`\\bumpeq`|$\bumpeq$|`\\Bumpeq`|$\Bumpeq$|
|`\\intercal`|$\intercal$|`\\between`|$\between$|`\\pitchfork`|$\pitchfork$|
|`\\barwedge`|$\barwedge$|`\\veebar`|$\veebar$|`\\doublebarwedge`|$\doublebarwedge$|
|`\\vartriangleleft`|$\vartriangleleft$|`\\ntriangleleft`|$\ntriangleleft$|`\\vartriangleright`|$\vartriangleright$|`\\ntriangleright`|$\ntriangleright$|
|`\\trianglelefteq`|$\trianglelefteq$|`\\ntrianglelefteq`|$\ntrianglelefteq$|`\\trianglerighteq`|$\trianglerighteq$|`\\ntrianglerighteq`|$\ntrianglerighteq$|

^^^**一些例子**^^^

```
\bigcap^a_b;\ 
\bigcup^a_b;\ 
\bigsqcup^a_b;\ 
\biguplus^a_b;\ 
\bigvee^a_b;\ 
\bigwedge^a_b;\ 
```

$$
\bigcap^a_b;\ 
\bigcup^a_b;\ 
\bigsqcup^a_b;\ 
\biguplus^a_b;\ 
\bigvee^a_b;\ 
\bigwedge^a_b;\ 
$$

# 常用布局

## 特殊界定符

|`\\vert`|$\vert$|`\\Vert`|$\Vert$|
|`\\lVert`|$\lVert$|`\\rVert`|$\rVert$|
|`\\lgroup`|$\lgroup$|`\\rgroup`|$\rgroup$|
|`\\lmoustache`|$\lmoustache$|`\\rmoustache`|$\rmoustache$|
|`\\arrowvert`|$\arrowvert$|`\\Arrowvert`|$\Arrowvert$|
|`\\bracevert`|$\bracevert$|

## 括号

```
\left( a \over b \right) \qquad \left[ a \over b \right] \qquad \left\{ a \over b \right\} \qquad \left< a \over b \right>\\
\left| a \over b \right| \qquad \left\| a \over b \right\| \qquad \left\lfloor a \over b \right\rfloor \qquad \left\lceil a \over b \right\rceil\\
\left/ a \over b \right\backslash \qquad \left\uparrow a \over b \right\downarrow \qquad \left\Uparrow a \over b \right\Downarrow \qquad \left\{ a \over b \right.
```

$$
\left( a \over b \right) \qquad \left[ a \over b \right] \qquad \left\{ a \over b \right\} \qquad \left< a \over b \right>\\
\left| a \over b \right| \qquad \left\| a \over b \right\| \qquad \left\lfloor a \over b \right\rfloor \qquad \left\lceil a \over b \right\rceil\\
\left/ a \over b \right\backslash \qquad \left\uparrow a \over b \right\downarrow \qquad \left\Uparrow a \over b \right\Downarrow \qquad \left\{ a \over b \right.
$$

## 矩阵相关

|二项式`\\binom{a}{b}`|$\binom{a}{b}$|`a \choose b`|$a \choose b$|
|小型二项式`\\tbinom{a}{b}`|$\tbinom{a}{b}$|大型二项式`\\dbinom{a}{b}`|$\dbinom{a}{b}$|


**无边界矩阵**

```
\begin{matrix}
x & y \\
z & v
\end{matrix}
```

$$
\begin{matrix}
x & y \\
z & v
\end{matrix}
$$

**单竖边矩阵**

```
\begin{vmatrix}
x & y \\
z & v
\end{vmatrix}
```

$$
\begin{vmatrix}
x & y \\
z & v
\end{vmatrix}
$$

**双竖边矩阵**

```
\begin{Vmatrix}
x & y \\
z & v
\end{Vmatrix}
```

$$
\begin{Vmatrix}
x & y \\
z & v
\end{Vmatrix}
$$

**方括号矩阵**

```
\begin{bmatrix}
x & y \\
z & v
\end{bmatrix}
```

$$
\begin{bmatrix}
x & y \\
z & v
\end{bmatrix}
$$

**花括号矩阵**

```
\begin{Bmatrix}
x & y \\
z & v
\end{Bmatrix}
```

$$
\begin{Bmatrix}
x & y \\
z & v
\end{Bmatrix}
$$

**圆括号矩阵**

```
\begin{pmatrix}
x & y \\
z & v
\end{pmatrix}
```

$$
\begin{pmatrix}
x & y \\
z & v
\end{pmatrix}
$$

**单边花括号矩阵**

```
\begin{cases}
x & y \\
z & v
\end{cases}
```

$$
\begin{cases}
x & y \\
z & v
\end{cases}
$$

**多行等式**

```
\begin{align}
f(x) & = (x + y)^2\\
& = x^2 + 2 x y + y^2
\end{align}\\
\qquad\\
\begin{array}{lcl}
z & = & a \\
f(x,y,z) & = & x + y + z 
\end{array}\\
\qquad\\
\begin{array}{lcr}
z & = & a \\
f(x,y,z) & = & x + y + z 
\end{array}
```

$$
\begin{align}
f(x) & = (x + y)^2\\
& = x^2 + 2 x y + y^2
\end{align}\\
\qquad\\
\begin{array}{lcl}
z & = & a \\
f(x,y,z) & = & x + y + z 
\end{array}\\
\qquad\\
\begin{array}{lcr}
z & = & a \\
f(x,y,z) & = & x + y + z 
\end{array}
$$

**表格型矩阵**

```
\begin{array}{|c|c||c|} a & b & S \\
\hline
0&0&1\\
0&1&1\\
1&0&1\\
1&1&0\\
\end{array}
```

$$
\begin{array}{|c|c||c|} a & b & S \\
\hline
0&0&1\\
0&1&1\\
1&0&1\\
1&1&0\\
\end{array}
$$

# 特殊字符集

|`\\mathrm{ABC}`|$\mathrm{ABC}$|`\\mathit{ABC}`|$\mathit{ABC}$|
|`\\mathbf{ABC}`|$\mathbf{ABC}$|`\\mathcal{ABC}`|$\mathcal{ABC}$|
|`\\mathfrak{ABC}`|$\mathfrak{ABC}$|`\\mathscr{ABC}`|$\mathscr{ABC}$|
|`\\mathbb{ABC}`|$\mathbb{ABC}$|


***


>	本文内容整理自网上，如有补充请[联系本人](lostabaddon@gmail.com)。