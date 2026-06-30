// 原创深度指南 — 由本知识库自行整理撰写的完整长文(非外链,正文即在本页)
// 每篇:{id,title,sub,mins,tags,body(HTML)}。body 用受控的 h4/p/ul/ol/table/code,样式在 index.html 内统一。
window.GUIDES=[
{
 id:"ma-complete",
 title:"Modular Avatar 完全指南:从装衣服到一键开关",
 sub:"现代非破坏式改模的核心工具,看完能独立给任意素体装衣、做开关、合表情",
 mins:14,
 tags:["MA","ModularAvatar","非破坏","穿衣","开关","菜单","新手到进阶"],
 body:`
<h4>一、为什么是 Modular Avatar(以下简称 MA)</h4>
<p>传统改模流程里,装一件衣服要手动把衣服的骨骼拖进素体骨架、逐根对齐、重绑权重,出错了很难回退。MA 把这一切变成"非破坏式":你只是在场景里放好组件,真正的合并发生在<b>上传那一刻</b>(构建时),原始模型一根骨头都不会被改。这意味着——删掉 MA 组件,模型立刻回到原样;换个衣服,不用重做骨架。</p>
<p>MA 是 NDMF(Non-Destructive Modular Framework)生态的一部分,和 VRCFury 是当下两大主流。本文只讲 MA,因为它对新手最友好、社区衣装适配最广。</p>

<h4>二、安装(VCC / ALCOM)</h4>
<ol>
<li>装好 VRChat Creator Companion(VCC)或开源替代 ALCOM,创建一个 Avatars 3.0 项目。</li>
<li>在 VCC 里给项目加 <code>Modular Avatar</code> 包(若列表没有,先在 Settings → Packages 添加仓库 <code>vpm.nadena.dev</code>)。</li>
<li>回 Unity,菜单栏出现 <code>Tools → Modular Avatar</code> 即装好。</li>
</ol>

<h4>三、核心操作一:给素体装一件衣服(Setup Outfit)</h4>
<p>这是 MA 最高频的用途,90% 的人装它就为这个。</p>
<ol>
<li>把素体(已带 VRC Avatar Descriptor)拖进场景。</li>
<li>把衣服的 prefab/模型拖进场景,<b>作为素体的子物体</b>(拖到素体 GameObject 下面)。</li>
<li>选中衣服物体,菜单 <code>Tools → Modular Avatar → Setup Outfit</code>。</li>
<li>MA 自动识别衣服骨架、匹配到素体对应骨骼,生成一个 <code>MA Merge Armature</code> 组件。</li>
<li>进 Play 模式或点 Build &amp; Test,衣服已正确贴合并跟随骨骼动。</li>
</ol>
<p><b>关键点:</b>Setup Outfit 能成功的前提是衣服骨架命名能对上素体(Hips/Spine/Chest/...)。同社团素体(如 Selestia、各类同人素体)适配的衣服基本秒成;骨架命名差异大的,需要手动在 Merge Armature 里指定根骨骼。</p>

<h4>四、核心操作二:做一个"开关"(显示/隐藏物体)</h4>
<p>例如:想用表情菜单切换"戴眼镜 / 不戴眼镜"。MA 的 <code>Object Toggle</code> 让你完全不碰 Animator。</p>
<ol>
<li>选中要被控制的物体(眼镜),或新建一个空物体作为开关载体。</li>
<li>加组件 <code>MA Menu Item</code>,Type 选 <code>Toggle</code>。</li>
<li>在该组件的 Object Toggles 里,拖入眼镜物体,设定它在开/关时的显隐状态。</li>
<li>该 Menu Item 会自动出现在 Avatar 的表情菜单里,名字、图标都能在组件上设。</li>
</ol>
<p>想把多个开关归到一个子菜单?新建空物体加 <code>MA Menu Item</code>(Type=Submenu),把各个开关物体作为它的子物体即可,菜单层级跟着物体层级走——所见即所得。</p>

<h4>五、核心操作三:合并多套衣服/部件而不爆参数</h4>
<p>VRChat 的表情参数(Expression Parameters)有 256 bit 上限,开关一多就爆。MA 的应对:</p>
<ul>
<li><code>MA Parameters</code>:给每个模块本地命名参数,自动重映射,避免多件衣服参数名撞车。</li>
<li>布尔开关只占 1 bit;互斥的多选(如换 5 种发色)用一个 Int 参数 + 多个 Menu Item 设不同值,比 5 个 bool 省参数。</li>
<li>装第三方衣服时若对方已带 MA 组件,直接拖进来就合并,参数自动隔离——这正是非破坏生态的威力。</li>
</ul>

<h4>六、和 PhysBone 的配合</h4>
<p>衣服上的飘带、裙摆要动,需要 PhysBone。两种做法:</p>
<ul>
<li>衣服自带 PhysBone:Merge Armature 后,衣服骨上的 PhysBone 会一起合并,通常直接能用。</li>
<li>给素体头发/尾巴加:在对应骨骼链根部加 <code>VRC Phys Bone</code> 组件,设 Pull/Spring/Stiffness。Android(Quest)上限是 8 组件 / 64 transform / 16 碰撞器,务必控制数量。</li>
</ul>

<h4>七、常见翻车点(我整理的排查表)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>衣服装上去整个炸开/错位</td><td>骨架没对上。检查 Merge Armature 的 Merge Target 是否指向素体 Armature;骨骼命名差异大时手动指定根。</td></tr>
<tr><td>开关在菜单里不显示</td><td>Menu Item 没挂在 Avatar 层级内,或没设 Installer。确认物体是 Avatar 子物体。</td></tr>
<tr><td>多件衣服参数冲突</td><td>用 MA Parameters 给各模块本地化参数名。</td></tr>
<tr><td>上传后 Quest 看不到飘动</td><td>Quest 默认不跑超限 PhysBone;先减组件数到上限内。</td></tr>
<tr><td>删了 MA 组件衣服还在变形</td><td>不会。MA 非破坏,删组件即恢复;若仍异常,是你手动改过原始骨架。</td></tr>
</table>

<h4>八、进阶:从 MA 到完整工作流</h4>
<p>掌握上面三招后,一个现代改模流程长这样:导入素体 → 拖入衣服 Setup Outfit → 加发色/服装开关(Object Toggle + Menu Item)→ 表情用 FaceEmo 或手势层 → PhysBone 调飘动 → VRCQuestTools 转 Quest 版 → 上传 PC + Quest 同一 blueprint。全程不破坏原模型,随时可回退、可复用。</p>
<p><b>一句话总结:</b>MA 把"改模"从"动手术"变成了"搭积木"。先把这篇的三个核心操作练熟,再去看视频教程会快很多。</p>
`
},
{
 id:"quest-optimize",
 title:"Quest/性能优化实战:从 Very Poor 到 Good 的完整路线",
 sub:"把 PC 模型塞进 Quest 的硬上限,附官方各档具体数值表(已核实)",
 mins:16,
 tags:["Quest","Android","优化","性能评级","减面","贴图压缩","PhysBone","VRCQuestTools"],
 body:`
<h4>一、先搞懂:性能评级到底卡什么</h4>
<p>VRChat 用一套静态分析给每个 avatar 打分,从 Excellent 到 Very Poor 五档。其他玩家默认会把 Poor/Very Poor 的模型自动隐藏(显示成机器人 fallback)。所以"优化"的实际目标是:<b>PC 端至少 Good、Quest 端至少 Good</b>,让别人能看到你。</p>
<p>关键认知:<b>PC 和 Quest 是两套完全不同的上限</b>,Quest 严苛得多。同一个模型在 PC 是 Excellent,传到 Quest 可能直接 Very Poor。下面是官方当前数值(已逐项核实)。</p>

<h4>二、官方上限数值表(已核实)</h4>
<p><b>PC 端:</b></p>
<table><tr><th>项目</th><th>Excellent</th><th>Good</th><th>Medium</th><th>Poor</th></tr>
<tr><td>三角面</td><td>32,000</td><td>70,000</td><td>70,000</td><td>70,000</td></tr>
<tr><td>纹理显存</td><td>40 MB</td><td>75 MB</td><td>110 MB</td><td>150 MB</td></tr>
<tr><td>Skinned Mesh</td><td>1</td><td>2</td><td>8</td><td>16</td></tr>
<tr><td>材质槽</td><td>4</td><td>8</td><td>16</td><td>32</td></tr>
<tr><td>PhysBone 组件</td><td>4</td><td>8</td><td>16</td><td>32</td></tr>
<tr><td>PhysBone Transform</td><td>16</td><td>64</td><td>128</td><td>256</td></tr>
<tr><td>PhysBone 碰撞器</td><td>4</td><td>8</td><td>16</td><td>32</td></tr>
</table>
<p><b>Quest/Android 端(严苛得多):</b></p>
<table><tr><th>项目</th><th>Excellent</th><th>Good</th><th>Medium</th><th>Poor</th></tr>
<tr><td>三角面</td><td>7,500</td><td>10,000</td><td>15,000</td><td>20,000</td></tr>
<tr><td>纹理显存</td><td>10 MB</td><td>18 MB</td><td>25 MB</td><td>40 MB</td></tr>
<tr><td>Skinned Mesh</td><td>1</td><td>1</td><td>2</td><td>2</td></tr>
<tr><td>材质槽</td><td>1</td><td>1</td><td>2</td><td>4</td></tr>
<tr><td>PhysBone 组件</td><td>0</td><td>4</td><td>6</td><td>8</td></tr>
<tr><td>PhysBone Transform</td><td>0</td><td>16</td><td>32</td><td>64</td></tr>
<tr><td>PhysBone 碰撞器</td><td>0</td><td>4</td><td>8</td><td>16</td></tr>
</table>
<p>注意:Quest 端 Good 档只给 1 个材质槽、1 个 Skinned Mesh、10000 面。这就是为什么 Quest 优化的核心永远是<b>减面 + 合并网格 + 合并材质 + 压贴图</b>。</p>

<h4>三、实战路线(按收益从高到低)</h4>
<ol>
<li><b>合并网格到 1 个 Skinned Mesh。</b>用 Blender 的 CATS 插件或类似工具,把身体、衣服、头发合并成单一 SkinnedMeshRenderer。这一步直接决定 Skinned Mesh 计数。</li>
<li><b>合并材质 + 纹理图集(Atlas)。</b>Quest 只给 1 个材质槽。把多张贴图打成一张图集,材质合一。Material Combiner(Blender)或 Mesh 工具能做。</li>
<li><b>降贴图分辨率。</b>最常见的超标原因不是面数,而是贴图。别用 2K/4K——Quest 上 512 或 1024 通常够。在 Unity 的纹理导入设置里直接改 Max Size,并选 ASTC 压缩。</li>
<li><b>减面。</b>面数超 1 万就要在 Blender 用 Decimate 修改器减面,优先减看不见的内部结构、手指细节。</li>
<li><b>砍 PhysBone。</b>Quest Good 档只给 4 个 PhysBone 组件。头发、尾巴各留一两条主链,裙摆飘带能砍就砍。</li>
<li><b>换 Quest 兼容着色器。</b>Quest 不支持 Poiyomi/lilToon 等 PC 着色器,必须用 VRChat/Mobile 系列着色器(Toon Lit / Standard Lite 等)。</li>
</ol>

<h4>四、最省事的做法:VRCQuestTools 一键转换</h4>
<p>不想手动逐项改,用 <code>VRCQuestTools</code>:</p>
<ol>
<li>VCC 装好 VRCQuestTools 包。</li>
<li>场景里右键 avatar → <code>VRCQuestTools → Convert Avatar for Quest/Android</code>。</li>
<li>点 Begin Converter Settings,它会自动:把材质换成 Quest 着色器、生成合并贴图、降分辨率。</li>
<li>转换出的是一个<b>副本</b>,原 PC 版不动——这点和 MA 的非破坏理念一致。</li>
</ol>
<p>自动转换能解决材质/着色器/贴图,但<b>减面和合并网格通常还得手动在 Blender 做</b>,因为这涉及几何体改动。</p>

<h4>五、上传:PC 与 Quest 同一 blueprint</h4>
<p>要让 PC 用户看 PC 版、Quest 用户看 Quest 版,两个版本必须上传到<b>同一个 blueprint ID</b>:</p>
<ol>
<li>先上传 PC 版(平台切 Windows),拿到 blueprint ID。</li>
<li>切到 Android 平台(Build Settings → Android),打开 Quest 版工程。</li>
<li>用 Pipeline Manager 填入<b>相同的 blueprint ID</b>,上传。</li>
<li><b>骨架必须一致</b>——PC 和 Quest 版骨骼结构不同会导致 fallback 异常。</li>
</ol>
<p>EasyQuestSwitch(EQS)工具能帮你在切平台时自动调整每平台的材质/物体设置,推荐配合用。</p>

<h4>六、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>Quest 上别人看不到我(变机器人)</td><td>评级 Poor/Very Poor 被自动隐藏。对照上表把超标项降到 Good 档内。</td></tr>
<tr><td>面数没超却还是红</td><td>多半是贴图显存超标。先把 2K/4K 贴图降到 1024/512 + ASTC。</td></tr>
<tr><td>Quest 上传后全粉/全白</td><td>用了 PC 着色器。换成 VRChat/Mobile 系列。</td></tr>
<tr><td>材质槽超标</td><td>Quest Good 只给 1 槽。合并材质 + 纹理图集。</td></tr>
<tr><td>头发不飘了</td><td>PhysBone 组件超 Quest 上限被砍。减到 4 个组件内。</td></tr>
<tr><td>PC 和 Quest 版互相覆盖</td><td>blueprint ID 写错或没复用同一个。检查 Pipeline Manager。</td></tr>
</table>

<h4>七、一句话总结</h4>
<p>Quest 优化的本质是"做减法":<b>1 个网格、1 个材质、贴图压到 1K 以内、面数压到 1 万内、PhysBone 留 4 个、着色器换 Mobile</b>。能用 VRCQuestTools 自动处理材质和贴图,但减面合并网格还得回 Blender。对着上面的官方数值表逐项过一遍,就能稳定做到 Good。</p>
`
},
{
 id:"expression-gesture",
 title:"表情与手势系统全解:Playable Layers、内置参数、FaceEmo 实战",
 sub:"搞懂 5 个动画层和全部内置参数(已核实数值),做出握拳变表情、菜单切换、口型同步",
 mins:18,
 tags:["表情","手势","Gesture","FX层","PlayableLayers","FaceEmo","Animator","内置参数","口型"],
 body:`
<h4>一、先建立全局认知:Avatars 3.0 的 5 个动画层</h4>
<p>很多人改模卡在表情和手势,是因为不知道动画到底"放哪一层"。人形 avatar 有 5 个 Playable Layer,按 <code>Base → Additive → Gesture → Action → FX</code> 顺序叠加,后面的层优先级更高。官方明确:<b>不要给 avatar 加额外 animator,也不要在多个层复用同一个 controller</b>。</p>
<table><tr><th>层</th><th>负责什么</th><th>限制</th></tr>
<tr><td>Base</td><td>始终播放的移动/位姿:走、跑、跳、蹲、爬</td><td>仅 transform,需 Avatar Mask</td></tr>
<tr><td>Additive</td><td>叠加在 Base 上的细节,如呼吸起伏</td><td>永远 Additive 混合,仅人形骨骼</td></tr>
<tr><td>Gesture</td><td>单个身体部位的动画:手势触发的手型、表情;尾巴/耳朵 idle</td><td>仅 transform,需遮罩</td></tr>
<tr><td>Action</td><td>完全覆盖式 Emote(类似旧版舞蹈动作)</td><td>默认混合为 0,用前需 Playable Layer Control 抬起再归零</td></tr>
<tr><td>FX</td><td><b>最常用</b>:开关物体、切材质、shader/粒子动画、表情 BlendShape</td><td>非 transform 的一切都放这,会复制到镜像</td></tr>
</table>
<p><b>一句话记住:</b>凡是"不是骨骼动作"的东西(开关、变色、表情、特效)全进 <b>FX 层</b>。这是改模里你 90% 时间打交道的层。</p>

<h4>二、内置参数表(已逐项核实,做表情/手势必背)</h4>
<p>这些参数 VRChat 自动维护、只读、不占你的 256 bit 上限。做"握拳变表情"靠的就是 GestureLeft/Right。</p>
<p><b>手势 GestureLeft / GestureRight(Int,0-7):</b></p>
<table><tr><th>值</th><th>手势</th><th>值</th><th>手势</th></tr>
<tr><td>0</td><td>Neutral 自然</td><td>4</td><td>Victory 剪刀手</td></tr>
<tr><td>1</td><td>Fist 握拳</td><td>5</td><td>RockNRoll 摇滚</td></tr>
<tr><td>2</td><td>HandOpen 张开</td><td>6</td><td>HandGun 手枪</td></tr>
<tr><td>3</td><td>FingerPoint 指点</td><td>7</td><td>ThumbsUp 点赞</td></tr>
</table>
<p>配套:<code>GestureLeftWeight</code>/<code>GestureRightWeight</code>(Float 0.0-1.0,扳机拉动程度,只在 Fist 时有意义)。</p>
<p><b>其他高频内置参数:</b></p>
<ul>
<li><code>IsLocal</code>(Bool):只有自己佩戴时 true——做"只给自己看"的效果用它。</li>
<li><code>Viseme</code>(Int 0-14):口型同步,0=sil 静音,其余对应 pp/ff/th/dd/kk/ch/ss/nn/rr/aa/e/i/o/u。这是嘴型自动对口型的来源。</li>
<li><code>Voice</code>(Float 0.0-1.0):麦克风音量,可驱动"说话时发光"等效果。</li>
<li><code>VRCEmote</code>(Int 1-16):默认 Action 层的舞蹈/动作菜单。</li>
<li><code>VRCFaceBlendH</code>/<code>VRCFaceBlendV</code>(Float -1~1):FX 层的脸部混合,做"看向不同方向调表情"。</li>
<li><code>GroundedSeatedAFKInStationMuteSelf</code> 等状态量:做条件触发(坐下时/静音时切动画)。</li>
<li><code>TrackingType</code>(Int):6=全身追踪,3=头+手 VR——可据此切不同动画。</li>
</ul>
<p><b>参数内存:</b>int/float 各占 8 bit,bool 占 1 bit。可同步自定义参数总上限 256 bit,自定义参数总数上限 8192。内置参数全部不计入。</p>

<h4>三、手动做一个"握拳变笑脸"(理解原理)</h4>
<p>就算你最后用插件,也该懂底层在干嘛:</p>
<ol>
<li>在 Blender/建模软件里给脸做好"笑脸"的 BlendShape(形态键)。</li>
<li>Unity 里打开 avatar 的 FX 层 Animator Controller。</li>
<li>建一个动画,内容是把"笑脸"BlendShape 拉到 100。</li>
<li>建状态机:默认 Idle(BlendShape=0)→ 当 <code>GestureLeft Equals 1</code>(握拳)→ 切到笑脸状态。</li>
<li>用 <code>GestureLeft</code> 作为 Transition 条件。上传后,左手握拳就变笑脸。</li>
</ol>
<p>这套"参数→状态→动画"的逻辑是所有表情/开关的通用骨架。理解了它,后面用任何插件都不会懵。</p>

<h4>四、省事做法:FaceEmo 管理表情菜单</h4>
<p>手搓 Animator 状态机很累,<code>FaceEmo</code> 让你用图形界面管理整套表情:</p>
<ol>
<li>VCC 装 FaceEmo 包。</li>
<li>它把你的各个表情 BlendShape 组合(如"笑+闭眼")做成预设。</li>
<li>设定每个手势(握拳/剪刀手/点赞...)对应哪个表情预设。</li>
<li>也能生成表情菜单,让你在游戏里手动选表情而不只靠手势。</li>
<li>FaceEmo 基于非破坏框架,和 MA 一样不改原模型。</li>
</ol>
<p>它本质是帮你自动生成第三节那套 Animator 逻辑,但你只需点选,不碰状态机。</p>

<h4>五、口型同步(Viseme)别忘了配</h4>
<p>新模型说话嘴不动,八成是 Viseme 没设。在 VRC Avatar Descriptor 的 LipSync 区:</p>
<ul>
<li>模式选 <code>Viseme Blend Shape</code>(模型有 15 个标准 viseme BlendShape 时)。</li>
<li>指定脸部 SkinnedMesh,SDK 会自动匹配 15 个 viseme 形态键。</li>
<li>没有标准 viseme 的模型,用 <code>Jaw Flap Blend Shape</code> 或 <code>Jaw Flap Bone</code> 简易方案(下巴根据音量开合)。</li>
</ul>

<h4>六、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>握拳没反应</td><td>条件写错。Transition 用 GestureLeft Equals 1(不是 Weight)。检查动画是否真的改了 BlendShape。</td></tr>
<tr><td>表情卡住不回弹</td><td>缺回到 Idle 的反向 Transition,或 Has Exit Time 没关。</td></tr>
<tr><td>嘴不对口型</td><td>Descriptor 里 Viseme 没设或选错 SkinnedMesh。</td></tr>
<tr><td>表情把整张脸搞崩</td><td>多个 BlendShape 冲突。同一时刻别让两个表情动画都驱动同一形态键。</td></tr>
<tr><td>表情只有自己看得到/看不到</td><td>误用了 IsLocal 条件,或表情动画放错层(应在 FX)。</td></tr>
<tr><td>参数报超 256 bit</td><td>砍同步参数:布尔合并、多选用 Int 代替多个 bool、非必要的设 not synced。</td></tr>
</table>

<h4>七、一句话总结</h4>
<p>表情手势系统的核心三件事:<b>动画放对层(表情/开关进 FX)、用对内置参数(手势靠 GestureLeft/Right 0-7)、口型记得配 Viseme</b>。先手动做一次握拳变表情理解原理,再用 FaceEmo 提效。背下第二节的参数表,你就掌握了改模里最绕的一块。</p>
`
},
{
 id:"physbone-tuning",
 title:"PhysBone 物理调参实战:头发、尾巴、裙摆、抓取全搞懂",
 sub:"逐个讲清 Pull/Spring/Stiffness/Gravity/Limits/碰撞/抓取(已核实官方参数),附按部位的推荐配置",
 mins:17,
 tags:["PhysBone","物理","头发","尾巴","裙摆","碰撞器","抓取","调参","动骨"],
 body:`
<h4>一、PhysBone 是什么、替代了什么</h4>
<p>PhysBone(VRC Phys Bone)是 VRChat 官方的骨骼物理系统,让头发、尾巴、裙摆、耳朵这些骨骼链能随动作自然摆动。它<b>取代了旧的 Dynamic Bones</b>——现在新模型一律用 PhysBone,Dynamic Bones 已弃用且 Quest 不支持。</p>
<p>用法极简:在要摆动的骨骼链<b>根部</b>加一个 <code>VRC Phys Bone</code> 组件,它会自动管理这根骨往下的整条链。难点不在加组件,而在调参——参数没调好,头发会"面条化"乱甩或僵硬不动。</p>

<h4>二、核心力学参数(已核实)</h4>
<p>先选 <b>Integration Type</b>:<code>Simplified</code>(稳定、好配,新手首选)或 <code>Advanced</code>(对外力更敏感但难调)。不同模式开放的参数不同。</p>
<table><tr><th>参数</th><th>作用</th><th>调高的效果</th></tr>
<tr><td>Pull</td><td>把骨骼拉回静止位置的力</td><td>越高越快回正、越"硬";越低越飘忽</td></tr>
<tr><td>Spring(仅 Simplified)</td><td>朝静止位置摆动的量</td><td>越高弹性越强、回弹越明显</td></tr>
<tr><td>Stiffness(仅 Advanced)</td><td>保持静止姿态的程度</td><td>越高越不易被带动</td></tr>
<tr><td>Momentum(仅 Advanced)</td><td>摆动惯性,效果近似 Spring</td><td>越高余摆越久</td></tr>
<tr><td>Gravity</td><td>重力大小,正值下垂、负值上飘</td><td>正值让头发自然下坠</td></tr>
<tr><td>Gravity Falloff</td><td>静止时减去多少重力,1.0=静止姿态完全不受重力</td><td>设 1 可让静止造型不被重力压垮</td></tr>
<tr><td>Immobile</td><td>抑制运动的因子</td><td>越高越"粘"在身上、移动时甩动越小</td></tr>
</table>
<p><b>Immobile Type</b>:<code>All Motion</code>(默认,抑制来自父级的所有运动)或 <code>World (Experimental)</code>(只抵消场景位移,动画/IK 仍生效)。走路时头发狂甩,适当提 Immobile。</p>

<h4>三、Limits:限制摆动范围,防止穿模</h4>
<p>裙摆甩进腿里、头发穿过脸,就靠 Limits 约束。Limit Type 四选一:</p>
<ul>
<li><code>None</code>:不限制,适合自由飘的头发。</li>
<li><code>Angle</code>:限制到 Max Angle,绕轴形成锥形范围——最常用,给裙摆/头发设个最大偏转角。</li>
<li><code>Hinge</code>:沿一个平面限制,呈扇形(像披萨片),适合只该单方向折的部件。</li>
<li><code>Polar</code>:分别配 Max Pitch / Max Yaw,球面上一段区域。官方提醒它<b>有非零性能开销,别滥用</b>。</li>
</ul>

<h4>四、碰撞:让头发尾巴不穿身体</h4>
<ul>
<li><code>Radius</code>:每根骨骼的碰撞半径(米),也决定抓取判定范围。太小会穿模,太大会"撑开"。</li>
<li><code>Allow Collision</code>:True(与全局碰撞体碰)/ False(只与下面 Colliders 列表碰)/ Other(更细过滤)。</li>
<li><code>Colliders</code>:指定专门碰撞的碰撞体列表。常见做法是给身体、头部、手加 VRC PhysBone Collider,再让头发/尾巴的 PhysBone 引用它们,实现"头发搭在肩上、尾巴贴着腿"。</li>
</ul>
<p>注意 Quest 上限:碰撞器数量很紧(Good 档 4 个),别给每根骨头都堆碰撞。</p>

<h4>五、抓取与摆姿(社交互动的灵魂)</h4>
<p>让朋友能揪你尾巴、捏你头发,就靠 Grab &amp; Pose:</p>
<ul>
<li><code>Allow Grabbing</code>:允许被抓,可分别设"自己/他人"。</li>
<li><code>Allow Posing</code>:抓住后能否摆姿定型。</li>
<li><code>Grab Movement</code>(0-1):0=用 pull&amp;spring 平滑到抓取位置,1=瞬间吸附到手。</li>
<li><code>Snap To Hand</code>:被抓时直接吸到抓取者的手骨。</li>
</ul>

<h4>六、拉伸挤压 & 多子链处理</h4>
<p><b>Stretch &amp; Squish</b>:Stretch Motion 控制运动带来的拉伸量,Max Stretch / Max Squish 是相对原骨长的倍数——做果冻感、弹性部件用。</p>
<p><b>Multi-Child Type</b>(一个组件管多条骨链时根骨怎么动):</p>
<ul>
<li><code>Ignore</code>:根骨不动。<b>给头发用这个</b>——一个组件挂在所有发束的共同父节点,统一管理。</li>
<li><code>First</code>:根骨与第一条链连成串。</li>
<li><code>Average</code>:根骨取所有链的平均运动。</li>
</ul>

<h4>七、按部位的推荐起手配置(我整理)</h4>
<table><tr><th>部位</th><th>建议</th></tr>
<tr><td>长发/马尾</td><td>Pull 中、Spring 中高、Gravity 正、Limit=Angle 限角度、加头/肩碰撞器防穿;Multi-Child=Ignore</td></tr>
<tr><td>尾巴</td><td>Pull 偏低更灵动、Gravity 小、开 Allow Grabbing 让人能揪、加腿部碰撞</td></tr>
<tr><td>裙摆</td><td>Immobile 偏高防狂甩、Limit=Angle 防穿腿、加腿碰撞器</td></tr>
<tr><td>耳朵/猫耳</td><td>Pull 高、Spring 高,小幅快速回弹更可爱</td></tr>
<tr><td>胸部物理</td><td>Pull/Spring 适中、Max Squish 留一点弹性、Immobile 防过度晃</td></tr>
</table>

<h4>八、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>头发僵硬不动</td><td>Pull/Stiffness 太高,或 Immobile 太高。先降 Pull。</td></tr>
<tr><td>头发面条乱甩</td><td>Pull/Spring 太低。提 Pull,并用 Limit 限角度。</td></tr>
<tr><td>穿过身体</td><td>没配碰撞器,或 Radius 太小。给身体加 Collider 并引用。</td></tr>
<tr><td>静止造型被重力压垮</td><td>Gravity Falloff 设 1.0,让静止姿态不受重力。</td></tr>
<tr><td>Quest 上完全不动</td><td>PhysBone 组件/碰撞器超 Quest 上限被裁。减到上限内。</td></tr>
<tr><td>抓不动</td><td>Allow Grabbing 没开,或 Radius 太小抓不到。</td></tr>
</table>

<h4>九、一句话总结</h4>
<p>PhysBone 调参就是平衡<b>回正力(Pull)、弹性(Spring)、重力(Gravity)、约束(Limit)、防穿(碰撞)</b>这五件事。新手用 Simplified 模式,从上面的部位推荐配置起手微调。记住 Quest 的组件和碰撞器上限很紧,先做 PC 版调好再精简 Quest 版。</p>
`
},
{
 id:"shader-intro",
 title:"着色器入门:lilToon 与 Poiyomi 怎么选、怎么调",
 sub:"模型好不好看主要看着色器。讲清两大主流的定位差异、核心功能、锁定上传(已核实官方功能)",
 mins:16,
 tags:["着色器","Shader","lilToon","Poiyomi","卡通渲染","轮廓","RimLight","MatCap","自发光","锁定"],
 body:`
<h4>一、为什么着色器决定"好不好看"</h4>
<p>同一个模型,换个着色器观感天差地别。着色器(Shader)决定光照怎么打、阴影什么形状、有没有轮廓线、皮肤通透感、边缘光、自发光。VRChat 里两大主流是 <b>lilToon</b> 和 <b>Poiyomi</b>,几乎所有日系/卡通模型都用其一。Unity 自带的 Standard 着色器在 VRChat 卡通风里基本不用。</p>
<p><b>重要前提:</b>这两个都是 <b>PC 平台</b>着色器,<b>Quest 不支持</b>。Quest 版必须换成 VRChat/Mobile 系列着色器(见 Quest 优化那篇)。</p>

<h4>二、lilToon vs Poiyomi:怎么选</h4>
<table><tr><th></th><th>lilToon</th><th>Poiyomi</th></tr>
<tr><td>定位</td><td>轻量、上传友好、新手易上手</td><td>功能极其丰富、可调项极多</td></tr>
<tr><td>适合</td><td>大多数普通模型、追求省事和性能</td><td>要做复杂特效、精细光照表现</td></tr>
<tr><td>代价</td><td>高级特效不如 Poiyomi 多</td><td>着色器较重、关键字/变体多,需注意性能</td></tr>
</table>
<p><b>选择建议:</b>新手或普通模型直接 lilToon——装上、指材质、调几个值就很好看。要做发光纹路、溶解、AudioLink 音频联动这类高级效果,再上 Poiyomi。很多模型作者会预设好其中一个,你跟着用即可。</p>

<h4>三、安装</h4>
<ul>
<li><b>lilToon:</b>通过 VCC/ALCOM 添加,或导入 unitypackage。装好后材质的 Shader 下拉里能选到 <code>lilToon</code>。</li>
<li><b>Poiyomi:</b>同样 VCC/ALCOM/GitHub/BOOTH 多种方式(当前版本约 v3.x)。免费版够用,Pro 版需 Patreon 订阅。</li>
<li>导入着色器后,选中材质球,在 Inspector 顶部 Shader 下拉切换到对应着色器,下面就出现该着色器的全部参数面板。</li>
</ul>

<h4>四、lilToon 核心功能模块</h4>
<p>选中材质换成 lilToon 后,常用的几块:</p>
<ul>
<li><b>Main Color / 主纹理:</b>基础颜色和贴图,色调/亮度/饱和度微调都在这。</li>
<li><b>Shadow / 阴影:</b>卡通渲染的灵魂——控制阴影颜色、范围、边界硬度,做出二次元的硬边阴影。</li>
<li><b>Rim Light / 边缘光:</b>勾勒轮廓的高光,让角色从背景里"浮"出来。</li>
<li><b>MatCap:</b>用一张球形贴图快速模拟金属/光泽/高光质感。</li>
<li><b>Emission / 自发光:</b>让纹路、眼睛、装饰发光,可做闪烁/流动动画。</li>
<li><b>Outline / 轮廓线:</b>描边(颜色/粗细/按距离修正),卡通感的关键。</li>
<li><b>Normal Map / 法线:</b>不增面的情况下表现表面凹凸细节。</li>
</ul>

<h4>五、渲染模式:Opaque / Cutout / Transparent(最常踩的坑)</h4>
<table><tr><th>模式</th><th>用途</th><th>注意</th></tr>
<tr><td>Opaque 不透明</td><td>实心物体,皮肤、衣服主体</td><td>最省性能,无透明</td></tr>
<tr><td>Cutout 镂空</td><td>头发边缘、睫毛、镂空贴图(非透即不透)</td><td>边缘硬,无半透明过渡</td></tr>
<tr><td>Transparent 半透明</td><td>玻璃、薄纱、渐隐</td><td>有半透明,但<b>排序易出问题</b>:多层半透明会闪烁/前后错乱</td></tr>
</table>
<p><b>经验:</b>能用 Cutout 就别用 Transparent。头发用 Transparent 经常出现"穿模处忽隐忽现",改 Cutout 或调渲染队列(Render Queue)能解决大部分排序问题。</p>

<h4>六、Poiyomi 的进阶能力(已核实)</h4>
<p>Poiyomi 官方列出的功能远超基础卡通:</p>
<ul>
<li><b>着色预设:</b>风格化卡通(Texture Ramp / Multilayer Math / ShadeMap)和写实类(Wrapped / Skin / Cloth)。</li>
<li><b>Rim Lighting:</b>最多 2 个,另有 Environmental Rim 模拟环境反射。</li>
<li><b>MatCap:</b>最多 4 个。<b>Emission:</b>最多 4 个独立发光槽。<b>Decal 贴花:</b>最多 4 个(贴 logo/图案)。</li>
<li>其他:反射与高光、Clear Coat、Glitter 闪粉、Dissolve 溶解、Flipbook 序列帧,以及 <b>AudioLink、LTCGI、VRC Light Volumes</b> 支持。</li>
</ul>

<h4>七、关键一步:上传前"锁定"(Lock / Optimize)</h4>
<p>Poiyomi 用 ThryEditor 的 Shader Optimizer。<b>上传前必须锁定材质</b>(Lock):它会把当前实际用到的功能编译成精简的着色器变体,剥掉没用的分支,大幅降低着色器关键字数量和运行开销。</p>
<ul>
<li>没锁定就上传,可能因关键字过多导致性能问题甚至材质异常。</li>
<li>锁定后想再改参数,需要先 Unlock。改完再 Lock。</li>
<li>lilToon 也有类似的优化机制,按其文档操作。</li>
</ul>

<h4>八、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>材质全粉/全洋红</td><td>缺着色器。导入 lilToon/Poiyomi 后重新给材质指定对应 Shader。</td></tr>
<tr><td>头发边缘忽隐忽现</td><td>Transparent 排序问题。改 Cutout 或调 Render Queue。</td></tr>
<tr><td>Quest 上变白/报错</td><td>用了 PC 着色器。Quest 版必须换 VRChat/Mobile 着色器。</td></tr>
<tr><td>发光不亮</td><td>Emission 没开或强度为 0;确认对应贴图通道。</td></tr>
<tr><td>上传后性能差/材质怪</td><td>Poiyomi 没锁定。上传前 Lock All Materials。</td></tr>
<tr><td>轮廓线穿插脸里</td><td>Outline 太粗,或法线方向异常;减细轮廓或检查模型法线。</td></tr>
</table>

<h4>九、一句话总结</h4>
<p>普通模型用 <b>lilToon</b>(轻、好上手),要高级特效用 <b>Poiyomi</b>(功能多但记得上传前锁定)。卡通感的三个关键开关是 <b>Shadow(硬边阴影)、Rim Light(边缘光)、Outline(描边)</b>。透明优先 Cutout 少用 Transparent。Quest 一律换 Mobile 着色器。</p>
`
},
{
 id:"zero-to-upload",
 title:"从零到上传:VRChat 改模完整主线(新手总路线)",
 sub:"一条主线把所有环节串起来,每步标注去看本站哪篇专题。看完知道按什么顺序学、卡在哪查哪",
 mins:15,
 tags:["新手","总流程","上传","SDK","AvatarDescriptor","主线","路线图","入门"],
 body:`
<h4>开篇:这篇是"地图",其它专题是"分册"</h4>
<p>改模涉及很多工具和概念,新手最容易在"不知道下一步该干嘛"上卡住。这篇按真实顺序走一遍完整主线,每个环节告诉你<b>去看本站哪篇深度指南</b>。建议先通读这篇建立全局观,再按需翻专题。</p>

<h4>第 0 步:准备环境</h4>
<ul>
<li>装 <b>VRChat Creator Companion(VCC)</b> 或开源替代 <b>ALCOM</b>——它统一管理 Unity 版本、SDK、各种包,新手别手动装 Unity 包。</li>
<li>用 VCC 创建一个 <b>Avatars 3.0</b> 项目,Unity 版本让 VCC 决定(当前官方要求 Unity 2022.3 线,具体号以 VCC 实际安装为准,别自己升级)。</li>
<li>账号要求:上传 avatar 需要 trust 等级达到 <b>New User</b> 或更高;Visitor 只能本地 Build &amp; Test 自己看。新号会在获得上传权限后收到邮件。</li>
</ul>

<h4>第 1 步:准备素体和工具包</h4>
<ul>
<li>买/下一个素体(Booth 日系、Gumroad/Jinxxy 欧美兽人等,见本站素体区)。导入它的 unitypackage。</li>
<li>装核心工具:<b>Modular Avatar</b>(装衣服/开关)、<b>lilToon 或 Poiyomi</b>(着色器)。都用 VCC 加。</li>
<li>把素体拖进场景,确认它带 <code>VRC Avatar Descriptor</code> 组件。</li>
</ul>

<h4>第 2 步:装衣服、加开关 → 看《Modular Avatar 完全指南》</h4>
<p>用 MA 的 Setup Outfit 把衣服贴合到素体、用 Object Toggle + Menu Item 做显隐开关、用 MA Parameters 防参数冲突。这是改模最高频的操作,细节全在那篇。</p>

<h4>第 3 步:调物理 → 看《PhysBone 物理调参实战》</h4>
<p>头发、尾巴、裙摆要自然摆动,在骨链根部加 VRC Phys Bone,按部位推荐配置调 Pull/Spring/Gravity/Limit,加碰撞器防穿模。那篇有按部位的起手参数表。</p>

<h4>第 4 步:做表情手势 → 看《表情与手势系统全解》</h4>
<p>握拳变表情靠内置参数 GestureLeft/Right(0-7),表情/开关动画放 FX 层,口型记得在 Descriptor 配 Viseme。手搓累就用 FaceEmo。原理和参数表在那篇。</p>

<h4>第 5 步:调着色器让它好看 → 看《着色器入门》</h4>
<p>普通模型 lilToon、要特效用 Poiyomi。卡通感三开关:Shadow 硬边阴影、Rim Light 边缘光、Outline 描边。透明优先 Cutout。Poiyomi 上传前记得 Lock。</p>

<h4>第 6 步:设好 Avatar Descriptor 必填项(已核实)</h4>
<p>上传前确认 <code>VRC Avatar Descriptor</code> 配好:</p>
<ul>
<li><b>View Position(视点):</b>场景里那个小白球,代表你在游戏里的眼睛位置,放到双眼之间。歪了会导致镜子里视角不对。</li>
<li><b>LipSync(口型):</b>五种模式,可点 Auto Detect 自动检测。推荐 <code>Viseme Blend Shape</code>(模型有 15 个标准 viseme 时)。</li>
<li><b>Eye Look / 眨眼:</b>有眼骨和闭眼形态键时配上,让眼睛会动、会眨。</li>
</ul>

<h4>第 7 步:本地测试 → 正式上传(已核实流程)</h4>
<ol>
<li>菜单 <code>VRChat SDK → Show Control Panel</code>,登录账号,切到 <b>Builder</b> 标签。</li>
<li>先看 <b>Validations</b> 区的错误/警告和性能等级,有红色错误先解决。</li>
<li><b>Build &amp; Test</b>:本地构建,只有自己在游戏的 "SDK Test Avatars" 里能看到,用来验证动作/表情/物理是否正常。</li>
<li>没问题后:填名字、描述、选可见性(Public/Private)、content warning、缩略图,选目标平台。</li>
<li>点 <b>Build &amp; Publish</b> 正式上传。上传成功后游戏里就能选用。</li>
</ol>

<h4>第 8 步:出 Quest 版 → 看《Quest/性能优化实战》</h4>
<p>想让 Quest 用户也看到你,用 VRCQuestTools 转 Quest 版(换 Mobile 着色器、压贴图),减面/合并网格/砍 PhysBone 到 Quest 上限内,然后 <b>用同一个 blueprint ID</b> 上传到 Quest 平台。两个平台共用一个 avatar 条目,骨架必须一致。那篇有官方各档数值表。</p>

<h4>主线全景图</h4>
<table><tr><th>阶段</th><th>做什么</th><th>看哪篇</th></tr>
<tr><td>0 环境</td><td>VCC + Unity + 账号</td><td>本篇</td></tr>
<tr><td>1 素体</td><td>导入素体和工具</td><td>素体区 + 本篇</td></tr>
<tr><td>2 装衣开关</td><td>MA Setup Outfit / Toggle</td><td>Modular Avatar 完全指南</td></tr>
<tr><td>3 物理</td><td>PhysBone 调参</td><td>PhysBone 物理调参实战</td></tr>
<tr><td>4 表情手势</td><td>FX 层 / 内置参数 / Viseme</td><td>表情与手势系统全解</td></tr>
<tr><td>5 着色器</td><td>lilToon/Poiyomi 调好看</td><td>着色器入门</td></tr>
<tr><td>6 Descriptor</td><td>视点/口型/眨眼</td><td>本篇</td></tr>
<tr><td>7 上传</td><td>SDK Build &amp; Publish</td><td>本篇</td></tr>
<tr><td>8 Quest 版</td><td>转换 + 优化 + 同 blueprint</td><td>Quest 性能优化实战</td></tr>
</table>

<h4>一句话总结</h4>
<p>改模主线就八步:<b>装环境 → 导素体 → MA 装衣 → PhysBone 调物理 → 表情手势 → 着色器 → 配 Descriptor → 上传 → 出 Quest 版</b>。先跑通一次最简单的(素体直接上传),再逐步加衣服、物理、表情。卡在哪步就翻对应那篇专题。</p>
`
},
{
 id:"texture-recolor",
 title:"贴图与改色入门:给模型换肤、改色、加图案",
 sub:"个性化最快的一步。讲清贴图结构、UV、改色三种做法(着色器调色/PS改图/Substance),附排查",
 mins:14,
 tags:["贴图","纹理","改色","UV","Photoshop","Substance","换肤","图案","个性化"],
 body:`
<h4>一、先搞懂:模型的"皮肤"是怎么贴上去的</h4>
<p>3D 模型本身只是灰色网格,看起来有颜色花纹,是因为贴了"贴图(Texture)"。要改外观,先理解几个概念:</p>
<ul>
<li><b>Albedo / Base Color(基础色贴图):</b>决定模型表面的颜色和花纹,是你改色改图案最常动的一张。</li>
<li><b>UV:</b>把 3D 表面"摊平"到 2D 贴图上的对应关系。改贴图时,看 UV 布局才知道哪块像素对应模型哪个部位。</li>
<li><b>Normal Map(法线贴图):</b>不增面表现凹凸细节(布料褶皱、肌肉),改色时<b>不要</b>动它。</li>
<li><b>其他贴图:</b>Metallic/Smoothness(金属光滑)、Emission(自发光)、AO(环境光遮蔽)、Mask(各种遮罩)。</li>
</ul>

<h4>二、改色三种做法,从易到难</h4>
<table><tr><th>做法</th><th>难度</th><th>适合</th></tr>
<tr><td>着色器里调色相/明度</td><td>最易</td><td>整体改色、微调,不碰贴图文件</td></tr>
<tr><td>Photoshop/Krita 改贴图</td><td>中</td><td>局部改色、加 logo/图案/纹身</td></tr>
<tr><td>Substance Painter 重绘</td><td>高</td><td>专业级重新上色、做磨损质感</td></tr>
</table>

<h4>三、做法一:着色器里调色(不改文件,最快)</h4>
<p>lilToon / Poiyomi 都能直接调整材质颜色,不用动贴图:</p>
<ul>
<li>选中材质,在 Main Color 区有色调(Hue)、饱和度(Saturation)、明度(Value/Brightness)调节。</li>
<li>想把红衣服改成蓝衣服,拖 Hue Shift(色相偏移)即可,整体换色秒做。</li>
<li>缺点:它是全局偏移,没法只改一部分(除非配合遮罩 Mask)。适合整体换色调,不适合"只改鞋不改衣"。</li>
</ul>

<h4>四、做法二:Photoshop/Krita 改贴图(最常用)</h4>
<ol>
<li>找到模型的 Albedo 贴图文件(通常在素体的 Textures 文件夹,.png/.psd)。很多日系素体直接附带可编辑的 <b>.psd 分层源文件</b>,改色极方便。</li>
<li>用 Photoshop/免费的 Krita/GIMP 打开。有 PSD 分层就直接改对应图层颜色。</li>
<li>局部改色:用色相/饱和度调整图层 + 蒙版,只圈选要改的区域(如只改裙子)。</li>
<li>加图案/logo/纹身:新建图层贴上去,<b>对照 UV 布局</b>摆到正确位置(UV 可从 Blender 或素体说明里看)。</li>
<li>导出覆盖原 png(或另存),回 Unity 让贴图刷新,材质即更新。</li>
</ol>
<p><b>关键:</b>改贴图时心里要有 UV 概念——贴图上看似不连续的区块,在模型上可能是相邻的;改之前先在 Blender 里看 UV 或用"在模型上看实时效果"的方式试。</p>

<h4>五、做法三:Substance Painter(专业级)</h4>
<p>要做精细的磨损、脏迹、金属质感、复杂图案,用 Substance Painter:</p>
<ul>
<li>把模型导入 Substance,它能<b>直接在 3D 模型上绘制</b>,不用对着 2D 贴图猜位置。</li>
<li>用智能材质、遮罩、笔刷做出布料/皮革/金属的真实质感。</li>
<li>完成后烘焙导出各张贴图(Albedo/Normal/Metallic 等),导回 Unity。</li>
<li>门槛和成本较高,新手前期用做法一二足够,有进阶需求再学。</li>
</ul>

<h4>六、换肤色 / 改瞳色的注意点</h4>
<ul>
<li><b>肤色:</b>改 Albedo 的皮肤区域色相;若脸和身体是<b>分开的贴图/材质</b>,记得两张都改,否则脖子断层。</li>
<li><b>瞳色:</b>眼睛通常是单独的小贴图或材质,改它即可;有些模型瞳色用着色器参数控制,直接调更省事。</li>
<li>改完在不同光照的世界里看一下——卡通着色器下,阴影色也会影响观感。</li>
</ul>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>改了贴图 Unity 没变化</td><td>改的不是模型实际引用的那张图;在材质上点贴图槽定位真正用的文件。</td></tr>
<tr><td>图案贴歪了/在错误部位</td><td>没对照 UV。先看 UV 布局再摆图案。</td></tr>
<tr><td>改色后有接缝/断层</td><td>脸和身体是两张贴图,只改了一张;两张一起改。</td></tr>
<tr><td>颜色在游戏里发灰/不对</td><td>卡通着色器的阴影色影响;调着色器 Shadow 颜色,或换光照环境再看。</td></tr>
<tr><td>法线丢失表面变平</td><td>误改/误删了 Normal Map;改色别动法线贴图。</td></tr>
<tr><td>贴图模糊</td><td>导出分辨率太低,或 Unity 导入设置 Max Size 太小。</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>改外观从易到难:<b>先试着色器调色(Hue Shift 整体换色)→ 不够再用 PS/Krita 改 Albedo 贴图(对照 UV)→ 专业需求上 Substance</b>。记住三点:别动 Normal Map、改色要对照 UV、脸和身体可能是两张贴图。很多素体带 PSD 源文件,改色比想象的简单。</p>
`
},
{
 id:"error-troubleshooting",
 title:"报错与翻车大全:改模出问题时的系统排查",
 sub:"上传报错、变机器人、材质全粉、缺脚本、衣服错位……按症状定位的完整诊断手册",
 mins:16,
 tags:["报错","排查","troubleshooting","error","missing script","上传失败","调试","急救"],
 body:`
<h4>一、排查的总原则:先看 SDK 面板的 Validations</h4>
<p>改模出问题别瞎猜,VRChat SDK 控制面板的 <b>Builder → Validations</b> 区会列出所有错误(红色,必须修)和警告(黄色,通常可忽略)。红色错误不解决无法上传。先看它怎么说,再对症处理。Unity 底部的 Console 也会打印报错堆栈,双击能跳到出问题的地方。</p>
<p><b>核心思路:</b>大多数改模问题就四类来源——<b>缺依赖/版本不对、骨架命名不匹配、材质/着色器缺失、性能超限</b>。下面按症状归类。</p>

<h4>二、上传前/上传时报错</h4>
<table><tr><th>症状</th><th>原因</th><th>解法</th></tr>
<tr><td>SDK 面板登录不上 / 不显示</td><td>SDK 版本旧或网络问题</td><td>用 VCC 更新 SDK 到当前版本,重启 Unity</td></tr>
<tr><td>Validations 报 missing script</td><td>导入的包缺依赖(MA/着色器/SDK 版本不匹配)</td><td>确认 VCC 里装齐对应包;删掉报缺失的组件再按正确版本重加</td></tr>
<tr><td>blueprint ID 被清空 / 上传报权限</td><td>试图覆盖不属于你的 avatar</td><td>在 Pipeline Manager 点 Detach 或新建 blueprint ID</td></tr>
<tr><td>性能等级 Very Poor 无法上传</td><td>三角面/材质/贴图超限</td><td>见 Quest 优化篇,减面合并材质压贴图</td></tr>
<tr><td>缺 Avatar Descriptor</td><td>模型根物体没加 VRC Avatar Descriptor</td><td>选中 avatar 根,Add Component 加上并设 View Position</td></tr>
</table>

<h4>三、上传成功但游戏里不对劲</h4>
<table><tr><th>症状</th><th>原因</th><th>解法</th></tr>
<tr><td>变成 error avatar(机器人)</td><td>性能 Poor 被对方自动隐藏,或材质/着色器异常</td><td>降到 Good;让对方在安全设置里允许显示</td></tr>
<tr><td>视角不对 / 镜子里头歪</td><td>View Position 视点没放对</td><td>把 Descriptor 的小白球移到双眼之间</td></tr>
<tr><td>嘴不动 / 不对口型</td><td>LipSync 没配或选错 SkinnedMesh</td><td>Descriptor 的 LipSync 选 Viseme Blend Shape 并指定脸 mesh</td></tr>
<tr><td>眼睛不眨不动</td><td>Eye Look 未设置</td><td>配 Eye Look 的眼骨和闭眼形态键</td></tr>
<tr><td>表情/开关没反应</td><td>动画放错层或参数条件错</td><td>表情/开关进 FX 层;检查 Transition 条件;见表情手势篇</td></tr>
</table>

<h4>四、材质与着色器问题</h4>
<table><tr><th>症状</th><th>原因</th><th>解法</th></tr>
<tr><td>材质全粉 / 全洋红</td><td>缺着色器</td><td>导入 lilToon/Poiyomi 后给材质重新指定 Shader</td></tr>
<tr><td>材质全白 / 发光过曝</td><td>着色器不兼容(常见于 Quest 用了 PC 着色器)</td><td>Quest 版换 VRChat/Mobile 着色器</td></tr>
<tr><td>头发边缘忽隐忽现</td><td>Transparent 半透明排序问题</td><td>改 Cutout,或调 Render Queue</td></tr>
<tr><td>Poiyomi 上传后材质怪/性能差</td><td>没锁定</td><td>上传前 Lock All Materials</td></tr>
<tr><td>贴图模糊</td><td>导入设置 Max Size 太小</td><td>提高纹理 Max Size(注意 Quest 显存上限)</td></tr>
</table>

<h4>五、衣服/骨架问题</h4>
<table><tr><th>症状</th><th>原因</th><th>解法</th></tr>
<tr><td>衣服穿上整个炸开/错位</td><td>骨架命名不匹配</td><td>用 MA Setup Outfit;命名差异大时手动指定 Merge Target</td></tr>
<tr><td>衣服不跟着身体动</td><td>没合并骨架或权重丢失</td><td>确认 Merge Armature 生效;检查衣服 SkinnedMesh 的骨骼引用</td></tr>
<tr><td>身体从衣服里穿出来(穿帮)</td><td>没做 shrink/隐藏被遮挡的身体部位</td><td>用 MA 的 Shrink 或 toggle 隐藏被衣服盖住的身体网格</td></tr>
<tr><td>多件衣服参数冲突</td><td>参数名撞车</td><td>用 MA Parameters 本地化参数名</td></tr>
</table>

<h4>六、物理问题(PhysBone)</h4>
<table><tr><th>症状</th><th>原因</th><th>解法</th></tr>
<tr><td>头发/尾巴僵硬不动</td><td>Pull/Stiffness/Immobile 太高</td><td>降 Pull;见 PhysBone 篇</td></tr>
<tr><td>头发面条乱甩</td><td>Pull/Spring 太低、没限角度</td><td>提 Pull,加 Limit=Angle</td></tr>
<tr><td>穿过身体</td><td>没配碰撞器或 Radius 太小</td><td>给身体加 Collider 并在 PhysBone 引用</td></tr>
<tr><td>Quest 上完全不动</td><td>PhysBone 组件/碰撞器超 Quest 上限被裁</td><td>减到 Quest 上限内</td></tr>
</table>

<h4>七、Unity 工程层面的坑</h4>
<ul>
<li><b>导入顺序:</b>先装 SDK 和着色器,再导素体,最后导衣服。顺序乱了易出现 missing script。</li>
<li><b>版本一致:</b>Unity 版本永远让 VCC 决定,别手动升级——手动升级会导致上传后内容加载不出来。</li>
<li><b>不要混用多个 SDK:</b>一个项目只用一套 VRChat SDK。</li>
<li><b>报错先存档:</b>大改动前复制一份工程或用版本管理,翻车能回退。</li>
<li><b>Console 报错读不懂:</b>复制报错关键句去 VRChat 官方论坛 ask.vrchat 或 SDK3 Error Mega Guide 搜,九成有人遇到过。</li>
</ul>

<h4>八、定位问题的通用流程</h4>
<ol>
<li>看 SDK 面板 Validations 的红色错误,逐条解决。</li>
<li>看 Unity Console 报错,双击跳转定位。</li>
<li>判断属于哪类:依赖/版本、骨架、材质、性能、物理。</li>
<li>对照上面的症状表找解法。</li>
<li>还卡住:把报错原文拿去 ask.vrchat 官方论坛或本站收录的报错大全搜。</li>
<li>大改前先备份,试错才不怕翻车。</li>
</ol>

<h4>九、一句话总结</h4>
<p>排查铁律:<b>先看 SDK 面板 Validations,再看 Console,然后归类(依赖/骨架/材质/性能/物理)对症下药</b>。最常见的就三件事——缺着色器(全粉)、缺依赖(missing script)、性能超限(变机器人)。读不懂报错就拿原文去 ask.vrchat 搜,改大动作前永远先备份。</p>
`
},
{
 id:"fbt-calibration",
 title:"全身追踪 FBT 校准与防变形:膝盖反折、脚飘怎么治",
 sub:"VR 进阶必修。讲清校准姿势、追踪器佩戴、模型比例对 FBT 的影响,附变形排查",
 mins:15,
 tags:["FBT","全身追踪","校准","追踪器","Tracker","防变形","膝盖反折","IK","VR"],
 body:`
<h4>一、FBT 是什么、需要什么</h4>
<p>全身追踪(Full Body Tracking,FBT)让你的腰、腿、脚在 VRChat 里真实跟随现实动作——能坐、能盘腿、能跳舞。没有 FBT 时,VRChat 用 IK 根据头和手"猜"身体姿态,腿是模拟的。</p>
<p>实现方式通常是:头显 + 两手柄 + <b>至少 3 个追踪器</b>(腰 1 + 双脚 2,即"3 点 FBT")。进阶用 6 点(加双膝/双肘)。常见硬件有 Vive Tracker、Tundra Tracker,以及免费的 SlimeVR(IMU 方案)。本篇讲改模这侧的校准与防变形,不深入硬件配对。</p>

<h4>二、追踪器佩戴位置(变形的第一个关键)</h4>
<p>追踪器戴歪是变形的头号原因。基本原则:</p>
<ul>
<li><b>腰部追踪器:</b>戴在尾椎/骨盆位置,正对前方别歪。戴太高(腰上方)会导致弯腰异常。</li>
<li><b>脚部追踪器:</b>戴在脚背或脚踝外侧,左右一致、朝向一致。两脚朝向不对称会导致校准后腿扭曲。</li>
<li><b>追踪器要稳:</b>绑带松动会让追踪点漂移,表现为"脚慢慢飘走"。</li>
</ul>

<h4>三、校准的标准姿势与流程</h4>
<p>VRChat 里 FBT 校准(Calibrate)的通用做法:</p>
<ol>
<li>站直,双脚与现实站姿一致(别叉太开也别并太拢)。</li>
<li>呼出菜单进入校准模式,身前会出现校准用的对齐标记。</li>
<li><b>摆"T 字"或"I 字"标准姿势:</b>双臂按提示张开或自然下垂,头摆正、看向正前方。</li>
<li>保持姿势,等系统把追踪点和模型骨骼对齐,完成校准。</li>
<li>校准瞬间的<b>姿势准不准 = 校准结果准不准</b>。歪着校准,游戏里就一直歪。</li>
</ol>
<p><b>诀窍:</b>校准时让模型的脚和你现实的脚在同一朝向、模型站姿和你一致。校准前可先调好 avatar 的初始站姿。</p>

<h4>四、模型比例对 FBT 的影响(改模这侧的重点)</h4>
<p>同样的追踪,换个模型可能就变形,原因是<b>模型骨骼比例和你真人比例不匹配</b>:</p>
<ul>
<li><b>腿长比例:</b>模型腿特别长或特别短,校准后膝盖容易反折或脚不到地。校准时可用"用真实身高校准 / 按模型比例校准"的不同模式权衡。</li>
<li><b>骨骼朝向(Roll):</b>模型腿骨、脚骨的初始朝向若不规范(Blender 里骨骼 roll 乱),会导致膝盖朝向错误、反折。这是建模阶段的问题,改模时尽量用骨架规范的素体。</li>
<li><b>T-pose 规范:</b>上传的 avatar 应是标准 T-pose 且 Unity 的 Humanoid 骨骼映射正确(Configure Avatar 里检查 Mapping 全绿)。映射错会直接导致肢体扭曲。</li>
</ul>

<h4>五、膝盖反折(最经典的变形)怎么治</h4>
<p>膝盖向后弯折是 FBT 最常见的翻车,逐项查:</p>
<ol>
<li><b>校准姿势:</b>校准时腿微微弯一点(别完全锁直),给系统正确的膝盖弯曲方向参考。</li>
<li><b>追踪器朝向:</b>脚追踪器朝向歪了,重新戴正再校准。</li>
<li><b>模型骨骼 roll:</b>若换任何模型都反折,是该模型腿骨朝向问题,需在 Blender 修骨骼 roll 或换素体。</li>
<li><b>Humanoid 映射:</b>Unity 里 Configure 检查 UpperLeg/LowerLeg/Foot 映射对不对、有没有把左右腿弄反。</li>
</ol>

<h4>六、脚飘 / 脚不到地</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>脚悬空不到地</td><td>校准时身高/比例没对上;用真实身高模式重校,或调 avatar 比例</td></tr>
<tr><td>脚慢慢飘走</td><td>追踪器绑带松/被遮挡丢追踪;绑紧、改善基站可见性</td></tr>
<tr><td>蹲下时腿穿模</td><td>模型腿部权重或 PhysBone 干扰;检查腿部无异常物理组件</td></tr>
<tr><td>站着腿一直抖</td><td>追踪器互相干扰或基站反射;调整环境、重校准</td></tr>
</table>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>校准后整个身体扭曲</td><td>追踪器戴歪或左右弄反;检查佩戴位置和朝向,重校</td></tr>
<tr><td>换模型就变形,原模型正常</td><td>新模型骨骼比例/roll/映射问题;查 Humanoid 映射,或换骨架规范素体</td></tr>
<tr><td>腰部前后倾</td><td>腰追踪器戴太高/太低;移到骨盆位置</td></tr>
<tr><td>校准总是不准</td><td>校准姿势不标准;站直、脚朝向与现实一致、严格按提示摆姿</td></tr>
<tr><td>坐下时腿姿怪</td><td>正常 IK 限制;部分靠 Station/动画补偿</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>FBT 防变形三件事:<b>追踪器戴正戴稳、校准姿势标准(脚朝向一致、膝盖微弯)、模型骨架要规范(Humanoid 映射全绿、腿骨 roll 正确)</b>。换模型就变形多半是该模型骨骼问题,优先选骨架规范的素体。膝盖反折先从校准姿势和追踪器朝向查起。</p>
`
},
{
 id:"constraints",
 title:"VRC Constraints 约束系统:物品跟手、世界固定、朝向锁定",
 sub:"做手持物、头顶挂件、世界锚定的核心。讲清六种约束和关键参数(已核实官方)",
 mins:14,
 tags:["Constraints","约束","ParentConstraint","跟随","世界固定","AimConstraint","VRChat","进阶"],
 body:`
<h4>一、约束系统能做什么</h4>
<p>约束(Constraints)让一个物体的位置/旋转/缩放跟随另一个物体。改模里典型用途:<b>手持物品(剑、手机、麦克风跟着手)、头顶挂件、武器挂腰、物品固定在世界某点不随你动、物体始终朝向某处</b>。它是做交互道具和特效的基础。</p>
<p><b>重要变化:</b>VRChat 现在有自己的 <b>VRC Constraints</b>,是 Unity 原生约束的"对等替代"(like-for-like replacement)并增加了头像专用功能。头像上<b>推荐用 VRC 约束</b>——因为游戏内加载时任何 Unity 约束都会被自动转换成 VRC 约束,直接用 VRC 约束能更准确反映行为和性能评级。</p>

<h4>二、六种约束类型(已核实)</h4>
<table><tr><th>类型</th><th>作用</th><th>典型用途</th></tr>
<tr><td>VRCParentConstraint</td><td>目标像是源的子物体那样跟着移动和旋转</td><td>物品完整跟手(最常用)</td></tr>
<tr><td>VRCPositionConstraint</td><td>目标位置匹配源的位置</td><td>只跟位置不跟转向</td></tr>
<tr><td>VRCRotationConstraint</td><td>目标旋转匹配源的旋转</td><td>只跟转向不跟位置</td></tr>
<tr><td>VRCScaleConstraint</td><td>目标缩放匹配源的缩放</td><td>跟随大小变化</td></tr>
<tr><td>VRCAimConstraint</td><td>旋转目标使其朝向源,可自定义哪个轴算"前方"</td><td>炮口/眼睛始终瞄准目标</td></tr>
<tr><td>VRCLookAtConstraint</td><td>简化版 Aim,目标正 Z 轴朝向源</td><td>简单的"看向"</td></tr>
</table>

<h4>三、最常用:让物品跟手(Parent Constraint)</h4>
<ol>
<li>把道具(如一把剑)作为 avatar 的子物体放进场景。</li>
<li>给道具加 <code>VRC Parent Constraint</code> 组件。</li>
<li>在 <b>Sources</b> 列表里添加源:你想让它跟随的骨骼(如右手 Hand 骨)。</li>
<li>调整道具相对手的位置/角度(握持姿态),让它握在手里的样子对。</li>
<li>启用 <b>Lock</b> 和 <b>Is Active</b>(见下节,这两个不开约束不生效)。</li>
</ol>
<p>想做"左右手都能拿/收起来",配合多个源 + 权重动画,或用开关(MA Object Toggle)显隐不同手上的副本。</p>

<h4>四、关键参数(已核实,踩坑重灾区)</h4>
<ul>
<li><b>Sources + Weight:</b>源是被跟随的对象。头像上<b>无法对单个源的 transform 引用做动画</b>;要切换跟随对象,做法是设多个源、对它们的 Weight(权重)做动画——权重谁高就主要跟谁。</li>
<li><b>Lock:</b><b>必须启用</b>。不开的话约束会去重新评估 At Rest 和 Offset 值,而不是真正作用于 transform。</li>
<li><b>Is Active:</b><b>必须启用</b>,且组件本身和所在物体都要处于激活状态,否则不生效。</li>
<li><b>Solve In Local Space:</b>从默认的世界空间求解改为匹配源的本地位置/旋转/缩放。</li>
<li><b>Target Transform:</b>可改被约束的对象(默认是组件所在物体);但这个引用<b>运行时缓存、不能用动画或 Udon 改</b>。</li>
</ul>

<h4>五、世界固定:Freeze To World(已核实)</h4>
<p>想让一个物体<b>钉在世界某点、不随你移动</b>(如放下的画板、定身特效):</p>
<ul>
<li>启用 <b>Freeze To World</b>:约束忽略所有源,把目标锁在世界空间。</li>
<li>它<b>只影响被冻结的轴</b>;要完全锁死需冻结全部轴(位置/旋转各轴)。</li>
<li>注意它和"禁用组件"不同:禁用时目标在本地空间停止移动;Freeze 是主动在本地空间移动来抵消世界位移,从而看起来钉在原地。</li>
<li><b>Rebake Offsets When Unfrozen:</b>解冻时重算相对源的偏移,而不是保留原偏移。</li>
</ul>

<h4>六、性能:约束数量与深度</h4>
<p>约束计入头像性能评级,两个相关指标:</p>
<ul>
<li><b>Constraint Count(约束数量):</b>包含被禁用的约束也算。别堆太多。</li>
<li><b>Constraint Depth(约束深度):</b>最长的依赖链(A 约束跟 B、B 又跟 C……)。链越长越耗,尽量扁平。</li>
<li>官方提示:大量 Unity 原生约束会造成显著性能问题,而 VRC 约束反而可能提升性能——这也是头像优先用 VRC 约束的理由。</li>
</ul>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>约束完全不起作用</td><td>Lock 或 Is Active 没开;两个都必须启用</td></tr>
<tr><td>物品位置偏了/不在手里</td><td>Offset 没调好;摆好握持姿态后再锁</td></tr>
<tr><td>用了 Unity 约束行为怪/评级差</td><td>头像改用 VRC 约束(Unity 约束会被自动转换)</td></tr>
<tr><td>想动画切换跟随对象但改不了源</td><td>源 transform 不能直接动画;改成多源 + 权重动画</td></tr>
<tr><td>世界固定没完全锁住</td><td>只冻结了部分轴;冻结全部轴</td></tr>
<tr><td>性能评级因约束变差</td><td>减少约束数量、缩短约束深度链</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>头像上一律用 <b>VRC Constraints</b>(不是 Unity 原生)。物品跟手用 <b>Parent Constraint</b> + 源设手骨,记得<b>必开 Lock 和 Is Active</b>。世界固定用 <b>Freeze To World</b> 且要冻结全部轴。切换跟随对象靠多源权重动画。约束会算进性能,别堆太多、别套太深。</p>
`
},
{
 id:"license-redistribution",
 title:"许可与二次配布:改模前必看的版权红线",
 sub:"素体/衣装能不能商用、能不能再配布、改了能不能卖。讲清常见条款和避坑(非法律意见)",
 mins:13,
 tags:["许可","License","版权","二次配布","商用","规约","利用规约","避坑","合规"],
 body:`
<h4>开篇:为什么这篇很重要</h4>
<p>改模圈最容易出事的不是技术,而是<b>版权</b>。素体、衣装、贴图大多是创作者的付费作品,附带"利用规约(Terms of Use)"。不看规约就拿去商用、再配布、公开发模,轻则被要求下架,重则被封号、被追责。这篇梳理常见条款和避坑思路。</p>
<p><b>重要声明:</b>本文是通用科普,<b>不构成法律意见</b>。每个作品的规约不同,<b>最终一切以该作品作者写明的规约为准</b>。有疑问直接问作者。</p>

<h4>一、先分清三种"权利"</h4>
<table><tr><th>行为</th><th>含义</th></tr>
<tr><td>个人使用</td><td>自己买来自己改、自己在 VRChat 用</td></tr>
<tr><td>商用(Commercial)</td><td>用它做的东西用于盈利:接单代做、直播营利、卖成品等</td></tr>
<tr><td>二次配布(Redistribution)</td><td>把作品(或含作品的成品)分发给他人,无论免费还是收费</td></tr>
</table>
<p>大多数规约对这三类分别规定,且<b>默认最严</b>:没写明允许的,就当作不允许。</p>

<h4>二、改模最常踩的红线</h4>
<ul>
<li><b>把买来的素体/衣装直接发给别人:</b>几乎都是禁止的二次配布。哪怕你改过,内含的原始资产仍受原规约约束。</li>
<li><b>公开发布"完整可用"的成品模型:</b>等于把里面的付费素体白送,通常违规。常见合规做法是<b>只发自己原创的部分</b>(如自制贴图/配布物),让用户自己去买素体。</li>
<li><b>商用未授权:</b>很多个人向素体默认禁止商用,接单代做/卖成品前必须确认作者允许商用。</li>
<li><b>跨平台搬运:</b>把别人的作品搬到其它平台分发,基本都违规。</li>
<li><b>AI/换脸/真人肖像:</b>涉及真人肖像、他人 IP(动漫角色等)另有肖像权/版权风险。</li>
</ul>

<h4>三、常见规约关键词(看规约时重点找这些)</h4>
<table><tr><th>关键词</th><th>含义</th></tr>
<tr><td>商用可 / 商用不可</td><td>能否用于盈利</td></tr>
<tr><td>改变（改変）可否</td><td>能否修改模型/贴图</td></tr>
<tr><td>再配布（再配布）禁止</td><td>通常禁止把原始文件转发他人</td></tr>
<tr><td>クレジット表記</td><td>是否需要标注原作者(署名)</td></tr>
<tr><td>成人向け（NSFW)可否</td><td>能否用于成人内容</td></tr>
<tr><td>暴力/政治/宗教用途限制</td><td>部分作者禁止特定用途</td></tr>
<tr><td>アバター素体への利用</td><td>是否允许用作 VRChat 头像</td></tr>
</table>
<p>很多日系素体规约是日文,上面括号里是常见日文原词,看 Booth 商品页和附带的 readme/利用規約.txt 时认这些字。</p>

<h4>四、合规发布自己作品的正确姿势</h4>
<ol>
<li><b>只配布原创部分:</b>自制的衣服/贴图/配布物可以单独发,但不要打包别人的素体。</li>
<li><b>写清依赖:</b>在说明里写"需自行购买 XX 素体",给出购买链接。</li>
<li><b>注明你自己作品的规约:</b>你发的东西也要写明别人能否商用/改/再配布。</li>
<li><b>保留并尊重原作者署名:</b>需要 credit 的就标注。</li>
<li><b>商用前逐一确认:</b>成品里每个资产(素体+各衣装+各贴图)都允许商用,才能整体商用。一个不允许就不行。</li>
</ol>

<h4>五、平台与许可类型小知识</h4>
<ul>
<li><b>Booth / Gumroad / Jinxxy:</b>商品页通常有许可说明,购买即接受。下载包里常附 readme 或利用规约文件,务必读。</li>
<li><b>VRChat 官方规则:</b>上传你无权使用的内容违反 VRChat 社区准则,可能导致内容删除或封号。</li>
<li><b>开源/CC 许可:</b>少数资产用 Creative Commons 等,注意区分 CC-BY(需署名)、CC-BY-NC(禁商用)、CC0(公共领域)等。</li>
<li><b>VRM 等格式内嵌许可:</b>VRM 模型文件本身可携带许可元数据(可否暴力/性表现/商用/再配布),导入时能看到。</li>
</ul>

<h4>六、自查清单(动手前过一遍)</h4>
<table><tr><th>问题</th><th>查哪里</th></tr>
<tr><td>我能改它吗</td><td>规约的"改変"条款</td></tr>
<tr><td>我能商用吗</td><td>规约的"商用"条款,所有资产都要可商用</td></tr>
<tr><td>我能把成品发给别人吗</td><td>规约的"再配布"条款,通常不行</td></tr>
<tr><td>需要标注作者吗</td><td>规约的"クレジット/credit"条款</td></tr>
<tr><td>能用于成人内容吗</td><td>规约的"成人向け/NSFW"条款</td></tr>
<tr><td>规约没提的用途</td><td>默认按禁止处理,问作者</td></tr>
</table>

<h4>七、一句话总结</h4>
<p>三条铁律:<b>不二次配布别人的素体、商用前确认每个资产都允许商用、规约没写明的当作禁止</b>。发布自己的作品时只配布原创部分、让用户自购素体、写清依赖和署名。规约是日文就认"商用/改変/再配布/クレジット"这几个词。拿不准就直接问原作者——这不是法律意见,具体以作者规约为准。</p>
`
},
{
 id:"avatar-scaling",
 title:"Avatar Scaling 体型缩放:让模型适配身高调整",
 sub:"VRChat 现在玩家能实时调身高。讲清缩放原理、Eye Height、相关参数(已核实官方)",
 mins:13,
 tags:["缩放","Scaling","身高","EyeHeight","ScaleFactor","视点","Avatar","进阶"],
 body:`
<h4>一、Avatar Scaling 是什么</h4>
<p>VRChat 现在允许玩家在游戏里<b>实时调整自己的身高</b>(通过 Action Menu 的缩放转盘)。这对社交很重要——和不同身高的人互动、坐进世界里的椅子、够到高处。作为改模者,你要理解它的原理,才能让模型在被缩放时表现正常,以及做基于缩放的效果。</p>

<h4>二、核心概念(已核实)</h4>
<table><tr><th>术语</th><th>含义</th></tr>
<tr><td>Eye Height(视点高度)</td><td>T-Pose 时视点相对地面(Y=0)的高度</td></tr>
<tr><td>Prefab Height</td><td>默认缩放下的视点高度,由 SDK 里的 View Position 决定</td></tr>
<tr><td>Target Eye Height</td><td>玩家或 Udon 想要的目标高度</td></tr>
<tr><td>Avatar Scale</td><td>Prefab Height 与 Target Eye Height 的比值(如目标 4.5m、prefab 1.5m,缩放为 3)</td></tr>
</table>
<p>所以<b>你在 SDK 里设的 View Position 直接决定 Prefab Height</b>——视点摆对,缩放基准才正确。</p>

<h4>三、缩放范围(已核实)</h4>
<ul>
<li><b>Prefab Height:</b>本身无上限,但<b>会影响性能评级</b>。</li>
<li><b>Target Eye Height:</b>Udon 控制时限制在 <b>0.1 到 100 米</b>;Action Menu 转盘范围是 <b>0.2 到 5.0 米</b>。</li>
<li>上传一个超出该范围的 avatar 且不用转盘时,可以突破这些限制,此时 Target Eye Height 等于 Prefab Height。</li>
<li>在网站端禁用缩放时,Target Eye Height 永远等于 Prefab Height(即固定身高)。</li>
</ul>

<h4>四、缩放怎么生效(已核实)</h4>
<ul>
<li>它改变 avatar 根 transform 的 <b>localScale</b>,且这个缩放是被"强制"的——除了 Udon 缩放函数外用户无法覆盖。</li>
<li>切换/重置/重载 avatar 会触发本地"<b>重新测量(remeasure)</b>",据此调整你的视点并重新摆放内部组件(如语音位置)。</li>
<li>缩放以 eye height 形式同步,<b>量化到小数点后 3 位</b>,对远端用户做平滑处理。</li>
<li>转盘在确认前只在镜子里缩放你的 avatar,确认后立即应用并发给远端。</li>
</ul>

<h4>五、缩放相关内置参数(已核实)</h4>
<p>这些参数让你做"按身高变化触发效果"(如变大时换特效)。均为只读、Playable 同步:</p>
<ul>
<li><code>ScaleModified</code>(Bool):缩放是否被改过。</li>
<li><code>ScaleFactor</code>(Float):当前缩放系数。</li>
<li><code>ScaleFactorInverse</code>(Float):缩放系数的倒数。</li>
<li><code>EyeHeightAsMeters</code>(Float):当前视点高度(米)。</li>
<li><code>EyeHeightAsPercent</code>(Float):视点高度的百分比表示。</li>
</ul>
<p>例如想让模型"变小时声音特效不同/变大时披风更夸张",就用 ScaleFactor 驱动 FX 层动画。</p>

<h4>六、改模时的注意点</h4>
<ul>
<li><b>View Position 必须准:</b>它定义 Prefab Height,是整个缩放系统的基准。摆在双眼之间。</li>
<li><b>PhysBone/约束随缩放:</b>缩放改的是根 localScale,子物体一起缩放;一般 PhysBone 会跟着缩放正常表现,但极端缩放下可能需要微调。</li>
<li><b>性能:</b>Prefab Height 影响性能评级,别把模型做得异常大/小当默认。</li>
<li><b>FBT 配合:</b>缩放会触发视点重测量;全身追踪下身高比例本就敏感,缩放后若姿态异常,重新校准。</li>
</ul>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>缩放后视角高度不对</td><td>View Position 没设准;摆到双眼之间重设 Prefab Height</td></tr>
<tr><td>无法调整身高</td><td>该 avatar 在网站端禁用了缩放,或上传超范围;检查设置</td></tr>
<tr><td>基于缩放的特效不触发</td><td>没用对参数;用 ScaleFactor/EyeHeightAsMeters 驱动 FX 层</td></tr>
<tr><td>缩放后 FBT 姿态歪</td><td>触发了重测量;重新校准 FBT</td></tr>
<tr><td>默认就异常大/小且性能差</td><td>Prefab Height 过大影响评级;按正常比例做模型</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>Avatar Scaling 的基准是 <b>View Position(决定 Prefab Height)</b>,务必摆准。玩家能在 0.2-5.0 米(转盘)调身高,缩放改的是根 localScale。要做基于身高的效果,用内置参数 <b>ScaleFactor / EyeHeightAsMeters</b> 驱动 FX 层。缩放会触发视点重测量,FBT 下缩放后姿态异常就重校准。</p>
`
},
{
 id:"osc-control",
 title:"OSC 外部控制:用程序/硬件/AI 控制 avatar",
 sub:"表情捕捉、心率显示、聊天框、外部移动的底层协议。地址与端口已核实官方",
 mins:14,
 tags:["OSC","外部控制","表情捕捉","心率","Chatbox","端口","9000","9001","进阶"],
 body:`
<h4>一、OSC 是什么、能做什么</h4>
<p>OSC(Open Sound Control)原本是音乐设备间通信的协议,VRChat 用它<b>让外部程序读写你的 avatar 参数</b>。这打开了一扇大门:</p>
<ul>
<li><b>面部捕捉:</b>手机/摄像头/眼动设备把你的真实表情映射到 avatar(如 VRCFaceTracking)。</li>
<li><b>心率显示:</b>智能手表的心率推到 avatar 上显示数字。</li>
<li><b>硬件联动:</b>各种自制控制器、按钮盒触发表情/特效。</li>
<li><b>AI / 文字转语音:</b>程序往聊天框打字、AI 驱动表情。</li>
<li><b>外部移动控制:</b>程序模拟移动输入。</li>
</ul>

<h4>二、开启与端口(已核实)</h4>
<ul>
<li><b>开启:</b>游戏内 Action Menu → <code>OSC → Enabled</code>。启用后 VRChat 开始监听并发送参数数据。</li>
<li><b>端口:</b>UDP <b>9000</b> = 你的程序<b>发给</b> VRChat;UDP <b>9001</b> = 你的程序<b>接收</b> VRChat 发来的数据。</li>
<li><b>IP:</b>默认本机 <code>127.0.0.1</code>。命令行可覆盖,如 <code>--osc=9000:127.0.0.1:9001</code> 就是默认值。</li>
<li><b>OSCQuery:</b>服务发现机制,HTTP 跑在 127.0.0.1(TCP 端口可变),用 UDP 5353 做 mDNS 发现,让 OSC 应用自动找到 VRChat。</li>
<li>注意:<b>9001 接收端口同一时间只能被一个程序监听</b>,多个 OSC 工具会抢端口。</li>
</ul>

<h4>三、地址格式(已核实)</h4>
<table><tr><th>地址</th><th>作用</th><th>类型</th></tr>
<tr><td>/avatar/parameters/&lt;参数名&gt;</td><td>读写 avatar 参数(自定义参数可读写,保留参数多为只读)</td><td>int/float/bool</td></tr>
<tr><td>/avatar/change</td><td>切换 avatar 时 VRChat 发出当前 avatar ID</td><td>,s</td></tr>
<tr><td>/input/Vertical</td><td>前后移动(+1 前 / -1 后),只写</td><td>,f</td></tr>
<tr><td>/input/Horizontal</td><td>左右移动,只写</td><td>,f</td></tr>
<tr><td>/chatbox/input</td><td>设置聊天框文本(144 字符/9 行上限,UTF-8)</td><td>,sTT</td></tr>
<tr><td>/chatbox/typing</td><td>控制"正在输入"指示符</td><td>—</td></tr>
</table>
<p><b>关键:</b>要外部控制某个表情/开关,就往 <code>/avatar/parameters/你的参数名</code> 发对应值。比如有个叫 <code>Blush</code> 的 bool 参数,发 <code>/avatar/parameters/Blush true</code> 就让脸红开关打开。</p>
<p><b>注意 input 轴:</b><code>/input/Vertical</code> 这类轴值在停用时要<b>重置为 0</b>,否则角色会一直移动。</p>

<h4>四、自动生成的配置文件(已核实)</h4>
<p>启用 OSC 并加载 avatar 时,VRChat 自动生成一个 JSON 映射文件:</p>
<p><code>%AppData%\\..\\LocalLow\\VRChat\\VRChat\\OSC\\usr_{userId}\\Avatars\\{avatarId}.json</code></p>
<ul>
<li>它把你的参数名映射到输入/输出 OSC 地址和类型。</li>
<li>可手动编辑,用来重新路由数据或转换类型。</li>
<li>参数对不上时,删掉这个文件让 VRChat 重新生成,常能修复"OSC 控制没反应"。</li>
</ul>

<h4>五、改模这侧要做什么</h4>
<p>OSC 控制的是<b>你 avatar 上已有的参数</b>,所以改模侧的工作是:</p>
<ol>
<li>在 Expression Parameters 里建好要被外部控制的参数(如面捕需要的一堆表情参数)。</li>
<li>在 FX 层做好这些参数驱动的动画(参数变 → 表情/特效变)。</li>
<li>面捕类工具(如 VRCFaceTracking)通常有配套的参数模板/prefab,按其文档把参数加进 avatar。</li>
<li>参数名要和外部程序约定的一致,否则地址对不上。</li>
</ol>

<h4>六、典型场景配置思路</h4>
<table><tr><th>场景</th><th>思路</th></tr>
<tr><td>面部捕捉</td><td>装 VRCFaceTracking,按模板加面捕参数 + FX 动画,程序经 OSC 写参数</td></tr>
<tr><td>心率显示</td><td>心率程序把数值发到自定义参数,FX 层用该参数驱动数字/颜色</td></tr>
<tr><td>聊天框打字</td><td>程序直接发 /chatbox/input,无需改 avatar</td></tr>
<tr><td>硬件按钮</td><td>按钮程序发 /avatar/parameters/开关名</td></tr>
</table>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>OSC 完全没反应</td><td>没在 Action Menu 开 OSC Enabled</td></tr>
<tr><td>参数控制不生效</td><td>参数名不匹配,或 JSON 映射过期;删 OSC 配置文件重生成</td></tr>
<tr><td>两个 OSC 工具冲突</td><td>9001 只能一个程序监听;关掉其一或用中转</td></tr>
<tr><td>角色一直自己走</td><td>/input 轴值没重置为 0</td></tr>
<tr><td>面捕没表情</td><td>FX 层没做参数驱动的动画,或没加面捕参数模板</td></tr>
<tr><td>聊天框乱码</td><td>非 UTF-8 或超 144 字符/9 行上限</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>OSC 让外部程序经 <b>UDP 9000(发给VRChat)/ 9001(收)</b> 读写参数。Action Menu 先开 <code>OSC → Enabled</code>。控制参数发到 <code>/avatar/parameters/参数名</code>,聊天框发 <code>/chatbox/input</code>。改模侧负责建好参数和 FX 动画,程序侧负责发地址。控制失灵先删 OSC 配置 JSON 重生成。</p>
`
},
{
 id:"contacts",
 title:"Contacts 接触系统:摸头脸红、击掌反应怎么做",
 sub:"社交互动的核心。讲清 Sender/Receiver、三种接收类型、碰撞标签(已核实官方)",
 mins:14,
 tags:["Contacts","接触","摸头","交互","Sender","Receiver","碰撞标签","社交","进阶"],
 body:`
<h4>一、Contacts 能做什么</h4>
<p>接触系统(Contacts)让 avatar 能<b>感知被触摸</b>并做出反应:摸头脸红、被戳脸闭眼、击掌触发特效、牵手亮爱心。它是 VRChat 社交互动的灵魂功能之一,和表情、特效结合能做出很有温度的反馈。</p>
<p>它由两个组件组成,是<b>独立于 Unity 标准碰撞体</b>的专用系统:</p>
<ul>
<li><b>Contact Sender(发送器):</b>定义一块空间,负责"被检测到"。比如手上放一个 Sender。</li>
<li><b>Contact Receiver(接收器):</b>检测 Sender,据此更新参数或触发事件。比如头上放一个 Receiver,被手的 Sender 碰到就触发脸红。</li>
</ul>

<h4>二、三种 Receiver Type(已核实,做交互的核心选择)</h4>
<table><tr><th>类型</th><th>行为</th><th>用什么参数</th></tr>
<tr><td>Constant</td><td>有接触时持续告知,无接触时重置</td><td>Bool(摸着就脸红,松手恢复)</td></tr>
<tr><td>OnEnter</td><td>接触那一帧告知,下一帧立即重置;可设 Min Velocity</td><td>Bool 触发(击掌瞬间触发一次)</td></tr>
<tr><td>Proximity</td><td>给 0.0-1.0 的值,表示接触点离中心的远近;多接触取最近</td><td>Float(越靠近反应越强)</td></tr>
</table>
<p>选型:<b>持续状态用 Constant</b>(摸头期间一直脸红)、<b>瞬间事件用 OnEnter</b>(击掌触发一次特效)、<b>渐变效果用 Proximity</b>(手越近爱心越大)。</p>

<h4>三、Collision Tags 碰撞标签(已核实,匹配机制)</h4>
<p>谁能碰谁,由<b>碰撞标签</b>决定。规则:<b>Sender 和 Receiver 必须至少有一对相同的标签字符串</b>才会碰撞成功。</p>
<ul>
<li>标签<b>区分大小写</b>,每个 Contact 最多 16 个。</li>
<li>SDK 提供建议的内置身体部位标签:<b>Head(头)、Hand(手)、Finger(手指)</b>等。想做"别人的手摸我的头",就让头上 Receiver 收 Hand/Finger 标签。</li>
<li>自定义标签推荐用 PascalCase(如 <code>MyHeadpat</code>),用自定义标签可做"只有特定道具能触发"的私有交互。</li>
</ul>

<h4>四、Allow Self / Allow Others(已核实)</h4>
<ul>
<li><b>Allow Self:</b>允许被自己影响(自己摸自己的头也触发)。</li>
<li><b>Allow Others:</b>允许被别人影响(别人摸你触发)。</li>
<li>做"只有别人能摸"或"只有自己能戳"就靠这两个开关组合。</li>
</ul>

<h4>五、形状与尺寸(已核实)</h4>
<ul>
<li><b>Shape Type:</b>Sphere(球)、Capsule(胶囊)、Box(盒)三选一。头部判定常用 Sphere。</li>
<li><b>Radius:</b>碰撞体半径(Sphere/Capsule 用)。<b>Position / Rotation:</b>相对 root 的位置和旋转偏移——把判定球摆到头顶。</li>
<li><b>限制:</b>最大半径 3 米,最大宽/高/深 6 米(缩放后应用)。</li>
</ul>

<h4>六、做一个"摸头脸红"的完整思路</h4>
<ol>
<li>在头顶放一个 <b>Contact Receiver</b>,Shape=Sphere,摆到头部位置,Radius 调到约头大小。</li>
<li>Receiver Type 选 <b>Constant</b>,关联一个 Bool 参数如 <code>HeadPat</code>。</li>
<li>Collision Tags 勾 <b>Hand、Finger</b>(别人/自己的手指能触发)。</li>
<li>按需设 Allow Self / Allow Others。</li>
<li>在 FX 层做:<code>HeadPat</code> 为 true 时切换到脸红表情动画。</li>
<li>手上一般已有内置的 Hand/Finger Sender(SDK 会为手指碰撞体生成全局 PhysBone Colliders),所以摸头交互常常 Receiver 这侧配好就行。</li>
</ol>

<h4>七、性能与排查</h4>
<ul>
<li><b>Local Only:</b>开启后该 contact <b>不计入性能评级</b>;Receiver 开 Local Only 时单个 avatar 最多可用 256 个 contact 组件。纯本地反馈(自己看的脸红)适合开 Local Only。</li>
<li>Contacts 会算进 Avatar Dynamics 性能,别滥放。</li>
</ul>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>摸头没反应</td><td>Sender/Receiver 没有匹配的标签;确认双方都有 Hand 或 Finger</td></tr>
<tr><td>自己能触发别人不能(或反之)</td><td>Allow Self/Others 设置;按需开启</td></tr>
<tr><td>判定范围不对</td><td>Radius/Position 没摆好;调到贴合头部</td></tr>
<tr><td>击掌触发多次</td><td>用了 Constant;瞬间事件应用 OnEnter</td></tr>
<tr><td>本地有反应别人看不到</td><td>误开 Local Only 或参数没同步;需要别人可见就别开 Local Only</td></tr>
<tr><td>性能评级因 contact 变差</td><td>减少数量,纯本地的开 Local Only</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>摸头交互 = 头上放 <b>Contact Receiver</b>(Constant + Bool 参数)+ 勾 <b>Hand/Finger 标签</b> + FX 层做脸红动画。瞬间事件(击掌)用 <b>OnEnter</b>,渐变用 <b>Proximity</b>。匹配靠双方至少一个相同标签。纯本地反馈开 <b>Local Only</b> 省性能。这是把"被触摸"变成表情反应的标准套路。</p>
`
},
{
 id:"audiolink",
 title:"AudioLink 音频联动:让 avatar 随音乐律动发光",
 sub:"舞会/DJ 场景的视觉灵魂。讲清四频段、着色器读取、世界依赖(已核实开源文档)",
 mins:13,
 tags:["AudioLink","音频联动","节奏","发光","着色器","特效","音乐","进阶"],
 body:`
<h4>一、AudioLink 是什么</h4>
<p>AudioLink 是 VRChat 生态的<b>音频联动系统</b>(开源,llealloo 维护),让 avatar 和世界里的物体<b>随音乐节奏律动</b>——发光闪烁、缩放跳动、颜色随节拍变化。在舞会、DJ、音乐世界里,满场 avatar 跟着鼓点一起发光,就是它的功劳。</p>
<p>原理:它把实时音频数据编码进一张 <b>128×64 的 RGBA 纹理</b>,每帧更新。着色器或 Udon 读取这张纹理,就能拿到当前音频信息驱动视觉。</p>

<h4>二、四个频段(已核实,最常用的数据)</h4>
<p>核心数据块 <code>ALPASS_AUDIOLINK</code> 是纹理角落的 1×4 区,每帧更新,对应四个频段:</p>
<table><tr><th>频段</th><th>对应</th><th>典型用法</th></tr>
<tr><td>Bass(低音)</td><td>鼓、贝斯</td><td>整体律动、缩放跳动(最常用)</td></tr>
<tr><td>Low-mid(低中)</td><td>人声、主旋律低区</td><td>身体部位发光</td></tr>
<tr><td>High-mid(高中)</td><td>主旋律高区</td><td>装饰发光</td></tr>
<tr><td>Treble(高音)</td><td>镲、高频细节</td><td>闪烁、粒子</td></tr>
</table>
<p>历史数据保存在 <code>ALPASS_AUDIOLINKHISTORY</code> 向右级联(最右最旧),可做拖尾/流动效果。</p>

<h4>三、avatar 怎么用(着色器读取)</h4>
<p>AudioLink 数据在着色器里读取。原生写法是包含头文件后采样纹理:</p>
<ul>
<li>头文件:<code>#include "Packages/com.llealloo.audiolink/Runtime/Shaders/AudioLink.cginc"</code></li>
<li>用 <code>AudioLinkData()</code>、<code>AudioLinkLerp()</code> 等函数采样四段值。</li>
<li>用 <code>AudioLinkIsAvailable()</code> 检查当前是否有 AudioLink 纹理(没有就别驱动,避免异常)。</li>
</ul>
<p><b>实际改模中:</b>多数人不手写着色器,而是用支持 AudioLink 的成熟着色器直接连。Poiyomi 等卡通着色器内置了 AudioLink 选项(本会话前面核实过 Poiyomi 官方列出 AudioLink 支持),勾选后把 Emission/缩放等绑到某个频段即可,无需写代码。</p>

<h4>四、关键前提:世界里必须有 AudioLink</h4>
<p>这是新手最大的困惑点:<b>AudioLink 数据由世界提供</b>。</p>
<ul>
<li>数据来自挂载 AudioLink 对象的相机/音源。<b>所在世界没有放 AudioLink prefab,你的 avatar 就拿不到数据、不会律动</b>。</li>
<li>所以同一个 avatar 在音乐世界里会发光跳动,在普通世界里则纹丝不动——这是正常的,不是你做错了。</li>
<li>用 <code>AudioLinkIsAvailable()</code> 判断,没数据时回退到默认外观。</li>
</ul>

<h4>五、进阶数据区(已核实,做高级效果用)</h4>
<ul>
<li><b>Chronotensity</b>(<code>ALPASS_CHRONOTENSITY</code>):基于四段累积增减的数值,让动画随音频强度平滑推进,是 <code>_Time.y</code> 的替代。用 <code>AudioLinkGetChronoTime(index, band)</code> 读,offset.x 控制运动模式(单向/来回等)、offset.y 选频段。</li>
<li><b>DFT</b>(<code>ALPASS_DFT</code>):10 个八度的频谱,做精细的频率可视化。</li>
<li><b>Waveform</b>(<code>ALPASS_WAVEFORM</code>):波形数据。<b>ColorChord</b>(<code>ALPASS_CCSTRIP/CCLIGHTS</code>):把音频转成颜色。</li>
<li><b>网络时钟</b>:<code>AudioLinkDecodeDataAsSeconds(ALPASS_GENERALVU_NETWORK_TIME)</code> 让所有玩家看到完全相同的动画,无需网络同步——做同步律动很有用。</li>
</ul>

<h4>六、性能注意(已核实)</h4>
<ul>
<li>纯着色器读取 AudioLink 纹理开销小;但 Udon 侧的 <b>Readback(GPU→CPU 回读)</b>较重。</li>
<li><b>Quest 上不推荐回读功能</b>——Quest 不支持异步回读,会触发昂贵的同步回读。Quest 上尽量只用着色器侧的 AudioLink。</li>
</ul>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>avatar 完全不律动</td><td>所在世界没有 AudioLink;换到有 AudioLink 的音乐世界测试</td></tr>
<tr><td>有的世界动有的不动</td><td>正常——取决于世界是否放了 AudioLink prefab</td></tr>
<tr><td>律动但不对节拍</td><td>绑错频段;鼓点律动绑 Bass</td></tr>
<tr><td>着色器报错找不到头文件</td><td>没装 AudioLink 包;用 VCC/导入包后再编译</td></tr>
<tr><td>Quest 上卡/性能差</td><td>用了 Udon 回读;Quest 只用着色器侧</td></tr>
<tr><td>没音乐时外观异常</td><td>没用 AudioLinkIsAvailable 做回退</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>AudioLink 让 avatar 随音乐律动,数据是一张每帧更新的纹理,核心是 <b>Bass/Low-mid/High-mid/Treble 四个频段</b>(律动一般绑 Bass)。最关键的认知:<b>数据由世界提供,世界没放 AudioLink 你就不会动</b>。改模实操多用 Poiyomi 等内置 AudioLink 的着色器勾选绑定,不必手写。Quest 别用 Udon 回读。</p>
`
},
{
 id:"fallback-impostor",
 title:"Fallback 与 Impostor:别人到底看到你的什么",
 sub:"性能高就被隐藏成机器人?讲清屏蔽机制、Fallback 设置、Impostor 自动替身(已核实官方)",
 mins:13,
 tags:["Fallback","Impostor","替身","机器人","性能屏蔽","跨平台","可见性","上传后"],
 body:`
<h4>一、为什么你精心做的模型别人看是机器人</h4>
<p>很多人困惑:模型自己看好好的,别人那却是个灰机器人或别的样子。原因是 VRChat 的<b>可见性保护机制</b>——当你的 avatar 因性能、大小、平台、安全等原因不能正常显示时,对方会看到一个替代品。理解 Fallback 和 Impostor,才能控制"别人到底看到你的什么"。</p>

<h4>二、什么情况下你的真身被替换(已核实)</h4>
<table><tr><th>情形</th><th>触发条件</th><th>对方看到</th></tr>
<tr><td>Performance Blocked</td><td>你的性能等级超过对方设的最低显示等级</td><td>Impostor 或 Fallback</td></tr>
<tr><td>File Size Blocked</td><td>超过对方设的最大下载/解压大小</td><td>Impostor 或 Fallback</td></tr>
<tr><td>Platform Mismatch</td><td>你传 PC 版,对方在 Android(或反之)</td><td>Impostor</td></tr>
<tr><td>Missing Asset</td><td>avatar 在对方平台不可用</td><td>Fallback</td></tr>
<tr><td>Blocked via Safety</td><td>被信任与安全系统屏蔽</td><td>默认机器人</td></tr>
<tr><td>Manually Hidden</td><td>对方在快捷菜单点了 Hide Avatar</td><td>默认机器人</td></tr>
<tr><td>Loading</td><td>还在下载/初始化</td><td>默认机器人</td></tr>
</table>
<p>关键认知:<b>性能等级越差,越容易被对方默认隐藏</b>。所以即使你不出 Quest 版,把 PC 版性能做到 Good 以上也很重要——这正好呼应 Quest/性能优化篇。</p>

<h4>三、Impostor:自动生成的替身(已核实)</h4>
<p>Impostor 是 VRChat 给你的 avatar <b>自动生成并优化的跨平台替身</b>(body double)。它的意义很大:</p>
<ul>
<li><b>即使你从没传过跨平台版本,或 avatar 因性能被屏蔽,别人依然能看到你的 Impostor</b>——而不是千篇一律的机器人。它长得像你的真身。</li>
<li>触发场景:avatar 预览、性能屏蔽、平台不匹配(PC↔Android)。</li>
<li>目前<b>仅支持 humanoid avatar</b>,generic 尚不支持。</li>
</ul>
<p><b>如何生成(自己操作):</b></p>
<ol>
<li>先上传好 avatar。</li>
<li>登录 VRChat 网站 → Avatars → My Avatars → 选中目标 avatar 的信息页。</li>
<li>点 <b>Generate Impostors</b>(已有的话是 Regenerate Impostors)。</li>
<li>等待,刷新页面后能看到为 PC 和 Quest 生成的 impostor。</li>
</ol>

<h4>四、Fallback:你指定的备用 avatar(已核实)</h4>
<p>Fallback 是当 Impostor 关闭时显示的备用 avatar,可由你<b>指定</b>。设置自定义 fallback 的要求:</p>
<ul>
<li>必须为<b>所有可用平台</b>都构建。</li>
<li>性能等级必须 <b>Good 或更好</b>(在对应平台上)。</li>
<li>必须在 <b>Android 上传时设置 Fallback 标记</b>。</li>
</ul>
<p><b>如何指定:</b>在 VRChat 网站打开 avatar 页面,Manage Avatar 区域选 <b>Use as Fallback</b>。可以上传一个自定义 avatar 当 fallback,或用 Public avatar 行里的 avatar。</p>
<p><b>重要趋势(已核实):</b>自 2025.2.2 起,<b>Fallbacks 正在被逐步弃用,转向 Impostors</b>。仍能用且功能正常,但客户端内已不可选,只能通过网站更改。所以现在<b>优先给你的 avatar 生成 Impostor</b>。</p>

<h4>五、Impostor 与 Fallback 的关系</h4>
<ul>
<li><b>Impostor:</b>基于你自己 avatar 自动生成的专属替身,长得像你。</li>
<li><b>Fallback:</b>当你把 Impostor 关掉时显示的备用 avatar(可指定)。</li>
<li>Impostor 可开关——开着时别人看 Impostor,关掉时看 Fallback。</li>
<li>当前推荐路线:<b>给主力 avatar 生成 Impostor</b>,这样被屏蔽/跨平台时别人看到的仍是你的样子。</li>
</ul>

<h4>六、实操建议</h4>
<ol>
<li>上传后去网站给 avatar <b>Generate Impostors</b>,尤其是性能偏高或只有 PC 版的 avatar。</li>
<li>性能尽量做到 <b>Good 以上</b>,减少被默认隐藏的概率(见 Quest/性能优化篇)。</li>
<li>真身改动较大后,回网站 <b>Regenerate Impostors</b> 更新替身。</li>
<li>想要统一的备用形象,再指定一个 Good 级 fallback。</li>
</ol>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>别人看我是机器人</td><td>被 Safety/手动隐藏,或还在加载;也可能性能太差被屏蔽</td></tr>
<tr><td>Quest 用户看我是替身</td><td>没传 Quest 版;生成 Impostor 让他们看到近似真身</td></tr>
<tr><td>Generate Impostors 是灰的</td><td>avatar 非 humanoid(generic 不支持),或还没上传</td></tr>
<tr><td>改了模型替身还是旧的</td><td>需在网站 Regenerate Impostors</td></tr>
<tr><td>设不了自定义 fallback</td><td>性能没到 Good、没全平台构建、或没设 Android fallback 标记</td></tr>
<tr><td>客户端里找不到 fallback 选项</td><td>已弃用转 Impostor;只能在网站改</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>别人看不到你真身时会看到替身。<b>现在优先用 Impostor</b>:上传后去网站 Generate Impostors,它是你 avatar 的自动替身,性能屏蔽/跨平台时别人仍能看到近似你的样子(仅 humanoid)。<b>Fallback</b> 是 Impostor 关闭时的备用,要 Good 以上+全平台,但正被逐步弃用、只能网站改。核心还是把性能做到 Good 以上,少被隐藏。</p>
`
},
{
 id:"playable-layers",
 title:"五个动画层(Playable Layers)详解:状态机怎么分工",
 sub:"表情手势篇的进阶。讲清 Base/Additive/Gesture/Action/FX 各管什么(已核实官方)",
 mins:15,
 tags:["Playable Layers","动画层","状态机","FX","Gesture","Action","Write Defaults","Avatars3.0","进阶"],
 body:`
<h4>一、为什么要懂这五个层</h4>
<p>Avatars 3.0 的所有动画行为都跑在<b>五个 Playable Layer</b>上。表情手势篇讲了在 FX 层做开关,但做复杂的 avatar(全身舞蹈、移动覆盖、呼吸叠加)就必须搞清五层的分工——放错层是新手做动画时最常见的失败原因。</p>
<p>五个层<b>层层叠加</b>,应用顺序是 <b>Base → Additive → Gesture → Action → FX</b>,后面的覆盖前面的(同一骨骼都为 1.0 权重时,Action 盖过 Additive)。</p>

<h4>二、五个层各管什么(已核实)</h4>
<table><tr><th>层</th><th>作用</th><th>动什么</th></tr>
<tr><td>Base</td><td>运动动画:走/跑/侧移的 blend tree,跳跃、下落、蹲、爬</td><td>仅 transform</td></tr>
<tr><td>Additive</td><td>在 Base 已动的 humanoid 骨骼上叠加,如呼吸(始终 Additive 混合)</td><td>仅 humanoid transform</td></tr>
<tr><td>Gesture</td><td>作用于单独身体部位(手势),也做尾巴/翅膀/耳朵等的 idle</td><td>仅 transform</td></tr>
<tr><td>Action</td><td>完全接管控制(类似 emote/舞蹈),默认权重为零</td><td>仅 transform</td></tr>
<tr><td>FX</td><td>特殊层:一切非 transform 的东西</td><td>开关/材质/blendshape/粒子等</td></tr>
</table>

<h4>三、最重要的分界:transform vs 非 transform(已核实)</h4>
<p>这是放对层的核心规则:</p>
<ul>
<li><b>Base/Additive/Gesture/Action 只应改 transform</b>(位置/旋转/缩放、humanoid 肌肉)。</li>
<li><b>FX 层放一切非 transform 的东西</b>:启用/禁用 GameObject、组件、材质替换、shader 动画、粒子系统、blendshape(表情)等。</li>
<li><b>原因(已核实):</b>其他层只有 transform 会被复制到镜像分身,而 <b>FX 层的一切都会被复制</b>。所以表情开关、特效必须在 FX。</li>
<li>官方强调:即便在 FX 层,<b>仍不推荐动 transform</b>。要动 transform 的(手形、骨骼)放对应的 Gesture/其他层。</li>
</ul>

<h4>四、Gesture 与 FX 的配合(已核实)</h4>
<ul>
<li><b>Gesture:</b>处理身体部位的 transform 动画(手形、尾巴摆动)。</li>
<li><b>FX:</b>处理非 transform(显隐、材质、blendshape 表情)。</li>
<li><b>遮罩协调(关键坑):</b>在 Gesture 里勾选要动的 transform,这些 transform 必须在 <b>FX 的 mask 里被禁用</b>,才能让 Gesture 动画"透出来"。遮罩没配好,手势和表情会互相打架。</li>
</ul>

<h4>五、Action 层:做舞蹈/emote(已核实)</h4>
<ul>
<li>Action 用于需要<b>完全接管全身、覆盖其他所有层</b>的骨骼动画(emote、舞蹈)。</li>
<li><b>默认权重为零</b>,使用前要用 <b>Playable Layer Control</b> 把权重调上去,用完调回零——这是做 emote 的标准流程,忘了调回去角色会卡在动作里。</li>
</ul>

<h4>六、Write Defaults:开还是关</h4>
<p>Write Defaults(WD)是每个动画 State 上的选项,决定没被该状态动画控制的属性是否恢复默认值。它是社区争论最多的设置:</p>
<ul>
<li><b>核心原则:整个 avatar 的所有状态保持 WD 一致</b>(要么全开要么全关)。混用是表情/开关"卡住、回不去、互相干扰"的头号元凶。</li>
<li>很多工具链(如 MA、VRCFury)和模板默认按 WD <b>关</b> 设计,跟随你所用素体/工具的约定最稳妥。</li>
<li>自己拿不准时:看素体自带控制器用的是开还是关,全程统一,别中途混。</li>
</ul>
<p>(注:WD 的官方建议随版本有调整,以你所用素体/工具链的统一约定为准。)</p>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>表情/开关放进去不生效</td><td>放错层;非 transform 的东西必须在 FX 层</td></tr>
<tr><td>手势和表情互相打架</td><td>Gesture 勾的 transform 没在 FX mask 禁用</td></tr>
<tr><td>emote 跳完卡住不动</td><td>Action 权重没调回零;用 Playable Layer Control 复位</td></tr>
<tr><td>开关切换后回不去/串状态</td><td>WD 开关不统一;全 avatar 统一 WD</td></tr>
<tr><td>呼吸/idle 叠加异常</td><td>放错 Additive/Gesture;按用途归层</td></tr>
<tr><td>镜像里特效消失</td><td>特效放在非 FX 层(只有 transform 被复制);移到 FX</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>五层顺序 <b>Base→Additive→Gesture→Action→FX</b>,后盖前。铁律:<b>动 transform 的(手势/骨骼)放 Gesture 等层,一切非 transform 的(表情/开关/材质/粒子)放 FX</b>——因为只有 FX 全部内容会复制到镜像。Action 做 emote 记得权重用完归零。Write Defaults 全 avatar 必须统一,别混用。</p>
`
},
{
 id:"vrcfury",
 title:"VRCFury 入门:另一主流非破坏性工具",
 sub:"很多配布物依赖它。讲清非破坏原理、核心组件、与 Modular Avatar 的共存(已核实官方)",
 mins:13,
 tags:["VRCFury","非破坏","Full Controller","Toggle","Armature Link","SPS","工具","进阶"],
 body:`
<h4>一、VRCFury 是什么</h4>
<p>VRCFury 是一套 VRChat avatar 的<b>非破坏性工具</b>(Non-Destructive Tools),和 Modular Avatar 并列为当前两大主流改模工具。很多 Booth 上的配布物(衣服、特效、玩具)直接打包成 VRCFury 组件,你装上拖进去就能用,所以<b>哪怕你主用 MA,也得会用 VRCFury</b>,否则装不了这些配布物。</p>
<p>它的核心理念:在 Unity 里用简单 GUI 定义开关(toggle)、手势、物品模式等,<b>自动生成动画控制器、VRC 菜单和同步参数</b>,不用手动编辑动画层和菜单。所有操作"All Reversible"(全部可逆)。</p>

<h4>二、非破坏性怎么体现(已核实)</h4>
<p>这是它和 MA 共通的最大优点,原理(已核实官方):</p>
<ul>
<li>VRCFury <b>只在上传前才执行工作</b>:它复制你的 avatar、往副本上添加你要的功能,再上传那份副本。</li>
<li><b>原始动画控制器文件不被改动</b>;移除 VRCFury 组件后,下次上传"like it was never there"(就像从没存在过)。</li>
<li>已有的层、参数、菜单保持不动。</li>
<li>会根据编辑器里的静止状态<b>自动计算和维护默认状态,兼容 Write Defaults ON 或 OFF</b>——这点很省心,呼应动画层篇讲的 WD 一致难题。</li>
<li>与 TPS、VRCLens 等不冲突。</li>
</ul>

<h4>三、核心功能方向(已核实)</h4>
<p>官方列出的功能方向包括:</p>
<table><tr><th>功能</th><th>作用</th></tr>
<tr><td>Clothing Attacher</td><td>装衣服(类似 MA 的 Setup Outfit)</td></tr>
<tr><td>Toggle Builder</td><td>做开关(显隐物品/特效)</td></tr>
<tr><td>Gesture Manager</td><td>管理手势</td></tr>
<tr><td>Controller Merger</td><td>合并动画控制器(配布物常用)</td></tr>
<tr><td>Avatar Optimizer</td><td>优化 avatar</td></tr>
<tr><td>Modular Setup</td><td>模块化配置</td></tr>
</table>
<p>其中 <b>Full Controller</b>(整套合并外部控制器+菜单+参数)是配布物最常用的组件——作者把特效打包成一个控制器,你用 Full Controller 一键合并进自己 avatar。还有 <b>SPS</b>(玩具类)等专用组件(详情见官方 Components/SPS 子页)。</p>

<h4>四、和 Modular Avatar 的关系</h4>
<p>两者都是非破坏性工具,功能多有重叠(都能装衣服、做开关)。实践中的处理:</p>
<ul>
<li><b>可以共存:</b>同一 avatar 上同时有 MA 和 VRCFury 组件是常见的——因为不同配布物用不同工具打包,你往往被动两个都得装。</li>
<li><b>跟随配布物:</b>配布物用哪个工具打包,你就装哪个、按它的说明操作,别强行改造。</li>
<li><b>选型自由:</b>自己从零做时选一个为主即可。MA 在中文圈教程更多,VRCFury 的 Full Controller 对"合并整套配布特效"很顺手。</li>
<li>两者都装齐,遇到任何配布物都不会卡在"装不了"。</li>
</ul>

<h4>五、典型使用流程</h4>
<ol>
<li>用 VCC 装好 VRCFury(和 MA 一样走 VCC 加包最稳)。</li>
<li>导入配布物,按其说明把 VRCFury prefab/组件拖到 avatar 对应位置。</li>
<li>多数配布物已配好 Full Controller/Toggle,<b>无需手动建菜单和参数</b>。</li>
<li>进 Play 模式或用 Av3 Emulator/Gesture Manager 预览开关。</li>
<li>上传——VRCFury 在上传时自动生成所有动画和菜单。</li>
</ol>

<h4>六、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>配布物装不上/缺组件</td><td>没装 VRCFury;用 VCC 加包后重试</td></tr>
<tr><td>上传后开关没出现</td><td>VRCFury 组件没拖对位置;按配布物说明放</td></tr>
<tr><td>和 MA 功能重复打架</td><td>同一功能别用两个工具做;各管各的配布物</td></tr>
<tr><td>移除后想还原</td><td>非破坏,删组件即恢复原样</td></tr>
<tr><td>参数/菜单数超限</td><td>多个配布物叠加超限;精简 toggle 或合并</td></tr>
<tr><td>WD 不一致报警</td><td>VRCFury 自动维护默认状态,兼容 WD 开/关</td></tr>
</table>

<h4>七、一句话总结</h4>
<p>VRCFury 是和 MA 并列的<b>非破坏性工具</b>,很多配布物只能用它装,所以<b>两个都得会</b>。原理同 MA:上传时在副本上加功能,删了就像没存在过。配布特效常用 <b>Full Controller</b> 一键合并。它和 MA 能共存,配布物用哪个就装哪个。最大省心点:自动维护默认状态、兼容 Write Defaults 开关两种。</p>
`
},
{
 id:"viseme-eyelook",
 title:"口型同步与眨眼:让说话和眼神活起来",
 sub:"上传必配却常被忽略。讲清 Viseme 两种模式、眨眼/眼动 blendshape(已核实官方)",
 mins:12,
 tags:["Viseme","口型同步","LipSync","眨眼","Eye Look","Blink","blendshape","Descriptor"],
 body:`
<h4>一、为什么说话时嘴不动</h4>
<p>新人常遇到:模型上传了,但自己说话时嘴一动不动,或眼睛直勾勾不眨。这通常是 <b>Avatar Descriptor 里的 LipSync 和 Eye Look 没配</b>。这两项决定了 avatar 说话时口型、平时眼神是否自然,是上传时容易漏掉却很影响观感的一步。</p>

<h4>二、LipSync 的两种模式(已核实)</h4>
<p>VRChat 支持两种口型同步方式,都仍可用、效果都正常:</p>
<table><tr><th>模式</th><th>原理</th><th>适合</th></tr>
<tr><td>Viseme Blend Shape</td><td>用脸部 blendshape 做 15 个口型,按语音切换</td><td>有完整口型 blendshape 的精细模型(主流)</td></tr>
<tr><td>Jaw Flap Bone(下巴骨)</td><td>说话时按音量开合下巴骨</td><td>没做口型 blendshape 的模型、动物嘴等</td></tr>
</table>
<p>(已核实:现在还能调整下巴骨 viseme 的角度。)选哪种取决于你的模型有没有做口型 blendshape。</p>

<h4>三、15 个 viseme(标准集)</h4>
<p>Blend Shape 模式用一组<b>标准的 15 个 viseme</b>(这是行业通用的 Oculus 口型标准):</p>
<p><code>sil(静音)、PP、FF、TH、DD、kk、CH、SS、nn、RR、aa、E、ih、oh、ou</code></p>
<ul>
<li>每个 viseme 对应一个发不同音时的嘴型 blendshape(如 aa 是张大嘴、oh 是圆嘴)。</li>
<li>大多数日系素体已做好这 15 个对应的 blendshape,在 Descriptor 里选脸部 Mesh 后通常能<b>自动匹配</b>。</li>
<li>名字不标准时需手动把每个 viseme 指到对应 blendshape。</li>
</ul>

<h4>四、Viseme 动画参数(已核实,可玩花样)</h4>
<ul>
<li>Avatars 3.0 提供一个内置 <code>Viseme</code> 动画参数,指示当前该播哪个口型。</li>
<li>关键:<b>"能动画的就能当 viseme"</b>——可以用它驱动 2D 嘴、机器人嘴等任意造型,不限于 blendshape。</li>
<li>该参数<b>在所有 viseme 模式下都会更新</b>,所以即使用下巴骨模式,也能额外用 Viseme 参数做花样。</li>
</ul>

<h4>五、眨眼与眼动(已核实)</h4>
<p>在 Descriptor 的 Eye Look 设置:</p>
<ul>
<li><b>模拟眼动:</b>需定义 eye bones(眼睛骨骼),avatar 才会自然转眼珠看别人。</li>
<li><b>眨眼:</b>可用 blendshape 或骨骼,blendshape 是常规做法。三个相关 blendshape:
  <ul>
  <li><b>Blink:</b>双眼眨眼。</li>
  <li><b>Looking Up:</b>用于微调眼/虹膜/眼睑/眉毛位置。</li>
  <li><b>Looking Down:</b>用法同 Looking Up。</li>
  </ul>
</li>
<li>不需要某项时设为 <code>-none-</code>。</li>
</ul>

<h4>六、行为微调滑块(已核实)</h4>
<table><tr><th>滑块</th><th>作用</th></tr>
<tr><td>Calm ↔ Excited</td><td>控制眨眼频率(越 Excited 眨得越勤)</td></tr>
<tr><td>Shy ↔ Confident</td><td>控制看向其他玩家的频率和注视时长</td></tr>
</table>
<p>想要害羞少对视、或自信常注视,调 Shy/Confident。</p>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>说话嘴不动</td><td>没配 LipSync;选 Viseme Blend Shape 并指脸部 Mesh</td></tr>
<tr><td>口型乱/对不上音</td><td>viseme 指到了错的 blendshape;逐个核对 15 个</td></tr>
<tr><td>没口型 blendshape 怎么办</td><td>用 Jaw Flap Bone 模式,指下巴骨</td></tr>
<tr><td>眼睛不眨</td><td>没设 Blink blendshape;在 Eye Look 指好</td></tr>
<tr><td>眼珠不转/不看人</td><td>没定义 eye bones</td></tr>
<tr><td>眨眼和表情冲突</td><td>表情动画覆盖了 Blink;表情里包含闭眼或调 mask</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>上传前在 Descriptor 配好两件事:<b>LipSync</b>(有口型 blendshape 选 Viseme Blend Shape 配 15 个标准口型,没有就用 Jaw Flap Bone)和 <b>Eye Look</b>(设 Blink blendshape + eye bones)。内置 <code>Viseme</code> 参数能驱动任意嘴型造型。Calm/Excited 调眨眼频率,Shy/Confident 调对视。这步漏了,avatar 说话像个木头人。</p>
`
},
{
 id:"mesh-material-merge",
 title:"网格与材质合并:降 draw call 上性能等级",
 sub:"材质槽和网格数量是评级关键。讲清确切上限和合并技术(数值已核实官方)",
 mins:14,
 tags:["材质合并","网格合并","draw call","材质槽","性能","Atlas","优化","进阶"],
 body:`
<h4>一、为什么要合并</h4>
<p>性能优化篇讲了整体思路,这篇专攻最有效的一招:<b>合并网格和材质</b>。VRChat 性能评级里,<b>材质槽(Material Slots)和网格数量(Mesh Count)</b>是直接计入等级的硬指标,而它们恰恰最容易因为"装了一堆配布物"而超标。理解确切上限,针对性合并,往往能从 Poor/Very Poor 一步提到 Good。</p>

<h4>二、材质槽确切上限(已核实)</h4>
<p>材质槽数即网格上放材质的位置数,<b>每个材质槽生成一个 submesh,带来一次额外的 draw call</b>——这是它直接影响性能的原因。</p>
<table><tr><th>等级</th><th>PC</th><th>Quest</th></tr>
<tr><td>Excellent</td><td>4</td><td>1</td></tr>
<tr><td>Good</td><td>8</td><td>1</td></tr>
<tr><td>Medium</td><td>16</td><td>2</td></tr>
<tr><td>Poor</td><td>32</td><td>4</td></tr>
<tr><td>Very Poor</td><td>超过 32</td><td>超过 4</td></tr>
</table>
<p>注意补充(已核实):粒子系统占 1 个材质槽,带 trails 的占 2 个,Line Renderer 占 1 个——特效堆多了也会吃材质槽。<b>Quest 极严:想 Good 必须只有 1 个材质槽。</b></p>

<h4>三、网格数量上限(已核实)</h4>
<p>分 Skinned Mesh(蒙皮,会跟骨骼变形)和 Basic Mesh(非蒙皮)两项,各自独立算:</p>
<table><tr><th>等级</th><th>PC 蒙皮</th><th>PC 非蒙皮</th><th>Quest 蒙皮</th><th>Quest 非蒙皮</th></tr>
<tr><td>Excellent</td><td>1</td><td>4</td><td>1</td><td>1</td></tr>
<tr><td>Good</td><td>2</td><td>8</td><td>1</td><td>1</td></tr>
<tr><td>Medium</td><td>8</td><td>16</td><td>2</td><td>2</td></tr>
<tr><td>Poor</td><td>16</td><td>24</td><td>2</td><td>2</td></tr>
</table>
<p>每件衣服/配饰常是独立的 skinned mesh,装多了蒙皮网格数飙升——这是 PC 想到 Excellent(只能 1 个蒙皮网格)的最大障碍。</p>

<h4>四、三角形(原称 Polygons)上限(已核实)</h4>
<p>文档现称 Triangles(过去误称 Polygons):</p>
<table><tr><th>等级</th><th>PC</th><th>Quest</th></tr>
<tr><td>Excellent</td><td>32,000</td><td>7,500</td></tr>
<tr><td>Good</td><td>70,000</td><td>10,000</td></tr>
<tr><td>Medium</td><td>70,000</td><td>15,000</td></tr>
<tr><td>Poor</td><td>70,000</td><td>20,000</td></tr>
<tr><td>Very Poor</td><td>超过 70,000</td><td>超过 20,000</td></tr>
</table>
<p>PC 端 Good/Medium/Poor 的三角形上限都是 70,000,所以 PC 上三角形通常不是瓶颈;<b>瓶颈往往在材质槽和蒙皮网格数</b>。</p>

<h4>五、合并技术(降槽/降网格的实操)</h4>
<ul>
<li><b>材质图集(Texture Atlas):</b>把多张贴图拼成一张大图,多个材质就能合并成一个——直接降材质槽。工具如 <b>Thry's Atlas、Material Combiner</b>。</li>
<li><b>网格合并(Mesh Merge):</b>把多个 skinned mesh 合并成一个,降蒙皮网格数。注意合并后仍要保留 blendshape(表情)。</li>
<li><b>一键优化器:</b><b>Avatar Optimizer (AAO,d4rkpl4y3r 的 Optimizer)</b> 这类工具能在<b>上传时自动合并材质/网格</b>、剔除无用骨骼,非破坏、效果显著,是目前最省力的做法。</li>
<li><b>剔除看不见的网格:</b>被衣服完全盖住的身体部分,删面或用 shrink 隐藏,既降三角形也利于合并。</li>
</ul>

<h4>六、合并的注意点</h4>
<ul>
<li><b>合并前备份:</b>合并是相对侵入的操作;用 AAO 这类<b>上传时合并</b>的非破坏工具最安全,源文件不动。</li>
<li><b>保留 blendshape:</b>合并网格时确保表情/口型 blendshape 不丢。</li>
<li><b>开关物品别合死:</b>需要单独显隐的部件(可切换的衣服)如果合并到一起就没法单独开关了,合并要避开它们或用支持的工具。</li>
<li><b>Quest 优先合并:</b>Quest 材质槽和网格上限极严(Good 各 1),Quest 版几乎必须合并到极致。</li>
</ul>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>材质槽超标(评级差)</td><td>用 Atlas 合并贴图/材质,或 AAO 上传时合并</td></tr>
<tr><td>蒙皮网格数超标</td><td>合并多件衣服的 skinned mesh,或用 AAO</td></tr>
<tr><td>合并后表情没了</td><td>合并丢了 blendshape;用保留 blendshape 的合并方式</td></tr>
<tr><td>合并后某衣服开关失效</td><td>可切换部件被合死;合并避开它们</td></tr>
<tr><td>Quest 怎么都到不了 Good</td><td>材质槽/网格各须为 1;合到极致 + 减三角形</td></tr>
<tr><td>特效占了材质槽</td><td>粒子/Line Renderer 各占槽;精简特效</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>升性能等级最有效的是降<b>材质槽</b>(每槽一次 draw call,PC Good≤8 / Quest Good=1)和<b>蒙皮网格数</b>(PC Excellent 只能 1 个)。手段:<b>Texture Atlas 合并材质、Mesh Merge 合并网格</b>,最省力的是 <b>Avatar Optimizer(AAO)上传时自动合并</b>(非破坏)。合并注意保留 blendshape、避开要单独开关的部件。Quest 上限极严,几乎必须合到极致。</p>
`
},
{
 id:"local-testing",
 title:"本地测试与预览:别再反复上传调表情",
 sub:"Build & Test、Av3 Emulator、Gesture Manager。上传前在 Unity 验证(已核实官方)",
 mins:12,
 tags:["本地测试","Build&Test","Av3Emulator","Gesture Manager","预览","调试","迭代","效率"],
 body:`
<h4>一、为什么要本地测试</h4>
<p>新手最浪费时间的做法:改一点就正式上传,进游戏看效果,不对再改再传……一轮十几分钟。其实<b>绝大多数验证都能在 Unity 本地完成</b>:表情切换、开关、手势、口型、PhysBone 摆动。学会本地测试,迭代速度能快十倍。</p>

<h4>二、SDK Build & Test(已核实,官方自带)</h4>
<p>SDK 控制面板里的 <b>Build & Test</b> 是官方的本地测试功能:</p>
<ul>
<li>它让你<b>不上传就快速测试 avatar</b>。</li>
<li><b>测试 avatar 只有你自己能看到</b>("Test avatars can only be seen by you")。要给别人看必须正式上传。</li>
<li>构建后,avatar 出现在 VRChat 头像菜单的 <b>"SDK Test Avatars"</b> 分区,进游戏选它即可。</li>
<li>启动参数加 <code>--watch-avatars</code>,之后每次本地构建会立即把你切到新版本,改完秒看。</li>
<li><b>不受 trust rank 限制:</b>正式上传需要 New User 以上,但本地构建测试连 Visitor 都能用——新号也能边学边测。</li>
</ul>
<p>用途:验证在<b>真实 VRChat 环境</b>里的表现(光照、镜子、和世界交互),适合最终确认。</p>

<h4>三、Av3 Emulator(社区工具,Unity 内模拟)</h4>
<p>更快的是连游戏都不进,直接在 Unity 的 Play 模式里模拟 Avatars 3.0 行为:</p>
<ul>
<li><b>Av3 Emulator</b> 在 Play 模式模拟参数、Playable Layers、表情菜单、PhysBone、Contacts 等。</li>
<li>能直接拨动 Expression 参数、测试 toggle 和手势,不用进游戏。</li>
<li>适合做动画状态机调试时的快速迭代——配合动画层篇调 FX 状态机非常顺手。</li>
</ul>

<h4>四、Gesture Manager(社区工具,菜单与手势预览)</h4>
<ul>
<li><b>Gesture Manager</b> 让你在 Play 模式里<b>直接操作 Expression 菜单</b>、模拟左右手手势,实时看表情和开关效果。</li>
<li>对"做完表情菜单想点点看对不对"这种验证特别直观——它把游戏内的菜单搬到了编辑器里。</li>
<li>和 Av3 Emulator 常配合使用(有的版本已整合)。</li>
</ul>

<h4>五、三种方式怎么选</h4>
<table><tr><th>需求</th><th>用什么</th></tr>
<tr><td>调 FX 状态机/参数逻辑</td><td>Av3 Emulator(Play 模式直接拨参数)</td></tr>
<tr><td>点表情菜单/试手势</td><td>Gesture Manager</td></tr>
<tr><td>看真实光照/镜子/世界交互</td><td>SDK Build & Test(进游戏)</td></tr>
<tr><td>最终上传前确认</td><td>Build & Test 走一遍</td></tr>
</table>
<p>典型流程:Unity 里用 Emulator + Gesture Manager 反复调好逻辑 → Build & Test 进游戏看真实效果 → 没问题再正式上传。</p>

<h4>六、本地测试也测不出来的</h4>
<ul>
<li><b>同步/远端表现:</b>参数同步、别人看到的样子,本地单人测不全,最终要进游戏(甚至找朋友)看。</li>
<li><b>AudioLink:</b>需要世界提供数据,得进有 AudioLink 的世界(见 AudioLink 篇)。</li>
<li><b>性能评级:</b>看 SDK 控制面板的性能评级或上传时的提示。</li>
<li><b>Impostor/Fallback:</b>别人视角的替身,要上传后在网站生成看(见 Fallback/Impostor 篇)。</li>
</ul>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>找不到测试 avatar</td><td>看 VRChat 菜单 "SDK Test Avatars" 分区</td></tr>
<tr><td>改了不想反复点构建</td><td>启动加 --watch-avatars 自动切新版本</td></tr>
<tr><td>Emulator 里参数不动</td><td>没进 Play 模式,或没加 Emulator 组件</td></tr>
<tr><td>菜单点了没反应</td><td>用 Gesture Manager 确认菜单/参数绑定</td></tr>
<tr><td>本地正常上传后异常</td><td>多为同步/远端问题;进游戏多人验证</td></tr>
<tr><td>Visitor 不能测</td><td>本地测试不受限;正式上传才需 New User+</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>别再改一点传一次。Unity 里用 <b>Av3 Emulator</b>(拨参数/调状态机)+ <b>Gesture Manager</b>(点菜单/试手势)反复调逻辑,再用官方 <b>Build & Test</b> 进游戏看真实效果(只有你能看到、连 Visitor 都能用、加 --watch-avatars 自动切版本),最后才正式上传。同步、AudioLink、Impostor 这些本地测不全,留到上传后验证。</p>
`
},
{
 id:"parameter-memory",
 title:"参数内存与同步:为什么加不了开关了",
 sub:"256 bit 同步预算是硬上限。讲清各类型占用、省内存技巧(数值已核实官方)",
 mins:13,
 tags:["参数","内存","256bit","同步","Expression Parameters","Int","Float","Bool","进阶"],
 body:`
<h4>一、装着装着突然"加不了开关"</h4>
<p>很多人装配布物到一半,SDK 报参数超限、加不了新开关——这就是撞上了 <b>256 bit 同步参数预算</b>。每个配布物的开关/特效都要参数,参数装多了内存就爆。理解这个预算和省内存技巧,才能在有限空间里塞下更多功能。</p>

<h4>二、256 bit 同步预算(已核实)</h4>
<ul>
<li>VRChat 最多同步 <b>256 bits</b> 的自定义参数("synchronize up to 256 bits of custom parameters")。这是硬上限。</li>
<li>另有一个总数上限:最多 <b>8192 个</b>自定义参数(含同步和不同步)。</li>
<li><b>关键区别:256-bit 预算只算需要同步给别人的参数。</b>本地参数(不同步)不占这个预算,但仍计入 8192 总数。</li>
</ul>

<h4>三、各类型占多少 bit(已核实)</h4>
<table><tr><th>类型</th><th>占用</th><th>范围</th></tr>
<tr><td>Bool</td><td><b>1 bit</b></td><td>开/关</td></tr>
<tr><td>Int</td><td><b>8 bits</b></td><td>无符号 0-255</td></tr>
<tr><td>Float</td><td><b>8 bits</b></td><td>有符号 -1.0 到 1.0</td></tr>
</table>
<p>所以一个 Float 或 Int 顶 8 个 Bool。256 bit 理论上能放 256 个 Bool,或 32 个 Int/Float,通常是混合。</p>

<h4>四、内置参数不占预算(已核实)</h4>
<ul>
<li>内置参数(GestureLeft、GestureRight、Viseme、IsLocal、Grounded 等)<b>不计入这些上限</b>。用它们做逻辑是"免费"的。</li>
<li>注意:<b>VRCEmote 属于默认 AV3 别名(aliased)的自定义参数,不是内置参数</b>——它会占预算。</li>
</ul>

<h4>五、省内存的实战技巧</h4>
<ol>
<li><b>能本地就本地:</b>只给自己看、不需要别人看到的效果(纯本地 UI、镜子里的预览),参数设为<b>不同步</b>,不占 256 预算。</li>
<li><b>多个互斥开关合并成一个 Int:</b>比如 8 个互斥的衣服样式,用 8 个 Bool 占 8 bit,改用 1 个 Int(0-7)也占 8 bit 但能表达更多状态——超过 8 个互斥项时 Int 更省。</li>
<li><b>Bool 优先:</b>独立的开关用 Bool(1 bit)最省,别动不动用 Float。</li>
<li><b>删没用的参数:</b>配布物常带用不到的参数,清掉同步的没用项。</li>
<li><b>用工具自动优化:</b>VRCFury/MA 等在合并时能帮忙管理参数;有的优化器会压缩参数。</li>
</ol>

<h4>六、和其他系统的关系</h4>
<ul>
<li><b>OSC:</b>外部控制读写的就是这些参数(见 OSC 篇),同步参数才能让别人看到 OSC 驱动的效果。</li>
<li><b>动画层:</b>参数驱动 FX 层动画(见动画层篇),参数是连接菜单和动画的桥。</li>
<li><b>Contacts:</b>接触触发的参数若要别人看到反应,需同步,占预算(见 Contacts 篇)。</li>
</ul>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>SDK 报参数内存超限</td><td>同步参数超 256 bit;删没用的、合并、转本地</td></tr>
<tr><td>加配布物后传不上</td><td>多个配布物参数叠加爆预算;精简或合并 Int</td></tr>
<tr><td>本地有效别人看不到</td><td>参数没同步;需要别人看到就勾同步</td></tr>
<tr><td>Float 用太多很占</td><td>每个 8 bit;独立开关改用 Bool</td></tr>
<tr><td>互斥开关占太多</td><td>多个 Bool 合并成 1 个 Int</td></tr>
<tr><td>以为内置参数占预算</td><td>GestureLeft 等内置不占;放心用</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>同步参数有 <b>256 bit</b> 硬预算:<b>Bool 1 bit、Int/Float 各 8 bit</b>,内置参数(GestureLeft/Viseme 等)不占。爆预算就:删没用的同步参数、独立开关用 Bool、多个互斥项合并成 Int、纯本地效果设不同步。装配布物"加不了开关"几乎都是撞了这 256 bit。</p>
`
},
{
 id:"rig-humanoid",
 title:"骨骼绑定(Rig):动作扭曲、传不上多半是它",
 sub:"导入第一道坎。讲清 Humanoid 必需骨骼、Hips 规则、常见绑定错误(已核实官方)",
 mins:14,
 tags:["Rig","Humanoid","骨骼","绑定","T-pose","Hips","导入","IK","基础"],
 body:`
<h4>一、为什么动作扭曲、上传报错</h4>
<p>导入模型后动作鬼畜、手臂拧麻花、或 SDK 报骨骼错误——根源往往在 <b>Rig(骨骼绑定)</b>配置。这是所有改模的地基:Unity 要把模型骨骼正确映射到 Mecanim humanoid 标准,VRChat 才能驱动它。地基没打好,后面表情/动画/IK 全乱。</p>

<h4>二、Animation Type:Humanoid 还是 Generic(已核实)</h4>
<ul>
<li><b>类人 avatar:</b>在 Unity 模型的 Rig 设置里把 Animation Type 设为 <b>Humanoid</b>。这是绝大多数 avatar 的选择。</li>
<li><b>非类人(四足、怪物等):</b>与人体差异大的,建议用 <b>Generic</b> rig 配自定义 Animation Controller。</li>
<li>设为 Humanoid 后,Unity 会按 Mecanim humanoid 要求检查你的骨骼映射。</li>
</ul>

<h4>三、必需与可选骨骼(已核实)</h4>
<table><tr><th>骨骼</th><th>VRChat 要求</th></tr>
<tr><td>Head、双 Hand、双 Foot</td><td>必须映射</td></tr>
<tr><td>Pelvis(Hips)、Spine、Chest、Neck、Shoulders</td><td>必须映射</td></tr>
<tr><td>Neck、Chest</td><td>Mecanim 算可选,但 <b>VRChat 要求必须有</b></td></tr>
<tr><td>Toe(脚趾)</td><td>可选,不映射也行</td></tr>
<tr><td>手指(Thumb/Index/Middle 等)</td><td>可选;想要完整 IK(蹲下/自动落脚)建议映射</td></tr>
<tr><td>Upper Chest</td><td>SDK3 下映射没问题</td></tr>
</table>

<h4>四、Hips 的特殊规则(已核实,最易踩)</h4>
<ul>
<li><b>Hips 必须是所有 humanoid 骨骼的祖先</b>,层级不能拆分。</li>
<li>官方警告:若"Hips bone is not the ancestor of all humanoid bones",会导致 IK 异常。</li>
<li>有些 rig 把<b>地面根骨</b>当祖先(Hips 不是最顶层),属不良放置,可能需要重新绑定。</li>
</ul>

<h4>五、T-pose 要求(已核实)</h4>
<ul>
<li>理想 T-pose:髋骨指向正上、大腿指向正下,<b>pelvis 与 thigh 骨骼夹角接近 180 度</b>。</li>
<li>夹角不对(常见于 A-pose 没转成 T-pose)会"may not work well with full-body IK and Tracking"——FBT 用户表现尤其差(呼应 FBT 校准篇)。</li>
<li>可用 AvatarTPoseController 应用 T-pose 后检查。</li>
</ul>

<h4>六、常见绑定错误(已核实)</h4>
<table><tr><th>错误</th><th>后果 / 修复</th></tr>
<tr><td>脊柱层级有 slot 留空</td><td>Neck/Chest 没映射;补齐</td></tr>
<tr><td>层级错误</td><td>Shoulders 和 Neck 的父级必须是 Chest</td></tr>
<tr><td>LowerArm 不是 UpperArm 第一个子级</td><td>前臂旋转出问题;把目标骨移到子级列表首位</td></tr>
<tr><td>Hand 不是 LowerArm 第一个子级</td><td>同上;twist-bone/道具骨会干扰 IK,需调整</td></tr>
<tr><td>拆分层级(split hierarchy)</td><td>重新组织骨骼层级</td></tr>
<tr><td>修复需解包 prefab</td><td>调骨骼前先 Unpack Prefab</td></tr>
</table>
<p>(补充:Eye 骨骼配置 Y 轴朝上、Z 轴朝前;Blender 导出确保 rest X 旋转为 90 度。)</p>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>SDK 报缺骨骼/rig 错误</td><td>Neck/Chest 等必需骨没映射;在 Rig→Configure 补齐</td></tr>
<tr><td>手臂/腿拧麻花</td><td>LowerArm/Hand 不是首个子级;调子级顺序</td></tr>
<tr><td>FBT 下姿态全乱</td><td>T-pose 不标准(pelvis-thigh 夹角不到 180);修 T-pose</td></tr>
<tr><td>IK 异常/根部漂移</td><td>Hips 不是所有骨骼的祖先;重绑层级</td></tr>
<tr><td>非人形动作怪</td><td>该用 Generic rig + 自定义控制器</td></tr>
<tr><td>改不了骨骼层级</td><td>先 Unpack Prefab 再调</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>类人模型 Rig 设 <b>Humanoid</b>,必须映射 Head/双手/双脚 + Spine/Chest/Neck/Shoulders/Hips(<b>Neck、Chest VRChat 强制要</b>)。铁律:<b>Hips 必须是所有骨骼的祖先</b>、<b>T-pose 下 pelvis 与 thigh 夹角接近 180 度</b>。动作扭曲多是 LowerArm/Hand 不在子级首位。非人形用 Generic。这是地基,一切动画/IK 都建在它上面。</p>
`
},
{
 id:"blendshape-basics",
 title:"Blendshape(形态键):表情和体型调整的底层",
 sub:"表情/口型/缩胸都靠它。讲清原理、Blender 导出、Unity 使用(Unity 部分已核实)",
 mins:13,
 tags:["Blendshape","形态键","ShapeKeys","Blender","表情","缩胸","SkinnedMeshRenderer","基础"],
 body:`
<h4>一、blendshape 是一切表情的底层</h4>
<p>前面表情篇、口型篇都在"用 blendshape",但没讲它本身是什么。Blendshape(Blender 里叫 <b>shape keys / 形态键</b>)是 avatar 表情、viseme 口型、体型调整(缩胸/缩肚/改比例)的<b>共同底层技术</b>。搞懂它,你就能自己做表情、改体型,而不只是用别人做好的。</p>

<h4>二、原理(已核实)</h4>
<ul>
<li>blendshape 存储一组<b>顶点的目标位置偏移</b>,让网格从默认形状变形到目标形状。</li>
<li><b>权重控制变形程度:</b>0 = 无影响,100 = 完全变形(Unity 里可超过 100 做夸张效果,但默认满值是 100)。</li>
<li>比如"微笑"blendshape:权重 0 是平脸,100 是完整笑脸,50 是半笑——表情动画就是在动画里把这个权重从 0 推到 100。</li>
</ul>

<h4>三、在 Blender 里做(shape keys)</h4>
<ul>
<li>Blender 的 <b>Shape Keys</b> 面板就是 blendshape:Basis 是基础形状,新增一个 key 后进入编辑、挪动顶点,就定义了一个变形目标。</li>
<li>做表情:复制 Basis → 改名(如 vrc.v_aa 或表情名)→ 编辑模式拖顶点做出嘴型/表情。</li>
<li>做缩胸/缩身:新建 shape key,把对应部位顶点缩小,导入后权重拉到 100 即缩到位。</li>
<li><b>导出 FBX 时必须保留:</b>Unity 文档要求在建模软件里"启用导出 blend shapes"。Blender 导出 FBX 时勾选 Shape Keys 相关选项,否则形态键会丢。</li>
</ul>

<h4>四、在 Unity 里用(已核实)</h4>
<ul>
<li>导入 FBX 后,选中网格的 <b>SkinnedMeshRenderer</b>,Inspector 里有 <b>BlendShapes</b> 区块,列出该网格所有 blendshape,每个一个<b>滑块</b>调权重。</li>
<li>拖滑块就能预览变形——做表情动画时,就是在动画 clip 里 K 这些滑块的关键帧。</li>
<li>脚本可用 <code>GetBlendShapeWeight</code>/<code>SetBlendShapeWeight</code> 读写,<code>blendShapeCount</code> 查数量(进阶用)。</li>
</ul>

<h4>五、VRChat 里的三大用途</h4>
<table><tr><th>用途</th><th>说明</th><th>相关篇</th></tr>
<tr><td>面部表情</td><td>手势/菜单触发的笑、眨眼、生气</td><td>表情手势篇</td></tr>
<tr><td>Viseme 口型</td><td>15 个标准口型 blendshape 做语音同步</td><td>口型同步篇</td></tr>
<tr><td>体型调整</td><td>缩胸、缩肚、改身材比例等可调外观</td><td>缩放篇</td></tr>
</table>
<p>眨眼(Blink)也是 blendshape(见口型篇 Eye Look)。可以说脸上一切动态都建在 blendshape 上。</p>

<h4>六、关键注意点(已核实+实践)</h4>
<ul>
<li><b>顶点拓扑不能变:</b>blendshape 依赖固定的顶点顺序和数量,<b>删面/重拓扑会破坏对应关系</b>,blendshape 直接失效。要改网格就在做 blendshape 之前改。</li>
<li><b>合并网格要保留 blendshape:</b>不是所有合并工具都支持(呼应合并篇)——用支持 blendshape 的工具,否则合并后表情全没。</li>
<li><b>命名要对:</b>viseme 等需要 VRChat 识别的 blendshape,命名要符合预期(如 viseme 用标准名)才能自动匹配。</li>
<li><b>表情冲突:</b>多个 blendshape 同时高权重可能脸部穿模;做组合表情时注意。</li>
</ul>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>Unity 里没有 BlendShapes 区块</td><td>导出 FBX 没勾 shape keys;重新导出</td></tr>
<tr><td>改了网格后 blendshape 错乱</td><td>改拓扑破坏了顶点对应;先建网格再做形态键</td></tr>
<tr><td>合并后表情消失</td><td>合并工具没保留 blendshape;换支持的工具</td></tr>
<tr><td>viseme 不自动识别</td><td>命名不符;按标准 viseme 名命名</td></tr>
<tr><td>表情组合脸穿模</td><td>多个 blendshape 叠加冲突;调权重或改形态</td></tr>
<tr><td>缩胸 key 拉满还露馅</td><td>形态键没缩到位;Blender 里把顶点收更紧</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>Blendshape(Blender 里 shape keys)靠<b>存顶点偏移</b>实现变形,权重 0-100 控制程度,是表情、viseme 口型、缩胸缩身的共同底层。Blender 里做好 → 导出 FBX <b>务必勾 shape keys</b> → Unity 的 SkinnedMeshRenderer 里拖滑块/K 动画。铁律:<b>做了 blendshape 就别再改网格拓扑</b>,合并网格要用保留 blendshape 的工具。</p>
`
},
{
 id:"sdk-upload-panel",
 title:"SDK 控制面板与上传:卡在上传这一步怎么办",
 sub:"登录、Builder 校验、trust rank、Descriptor。把上传流程讲透(已核实官方)",
 mins:12,
 tags:["SDK","上传","控制面板","Builder","Validations","trust rank","Descriptor","报错"],
 body:`
<h4>一、做好了却传不上去</h4>
<p>模型做完,卡在最后一步——SDK 面板登录不了、Build 按钮灰着、或报一堆校验错误。上传是改模的临门一脚,这篇把 <b>SDK 控制面板</b>的登录、校验、上传流程讲透,对照排查就能过。</p>

<h4>二、打开控制面板与登录(已核实)</h4>
<ul>
<li>菜单 <b>VRChat SDK → Show Control Panel</b> 打开面板。</li>
<li>用 <b>VRChat 账号</b>登录(必须有 VRChat.com 账号;Steam/Meta 账号需先在官网关联)。</li>
<li>登录后切到 <b>Builder</b> 标签页,构建相关都在这里。</li>
</ul>

<h4>三、Trust Rank:能不能上传的前提(已核实)</h4>
<ul>
<li>正式上传(给别人看)需要账号达到 <b>New User 或更高</b>。</li>
<li><b>Visitor 级别只能本地构建和测试</b>(仅自己可见,见本地测试篇)——新号先在游戏里玩一阵升到 New User 才能上传。</li>
<li>这是很多新号"传不上"的根本原因:不是模型问题,是 rank 没到。</li>
</ul>

<h4>四、上传前必备:Avatar Descriptor(已核实)</h4>
<ul>
<li>avatar 必须有 <b>VRC Avatar Descriptor 组件</b>才能上传。</li>
<li>添加:选中 avatar 根物体 → Add Component → 搜 "VRC Avatar Descriptor" 添加 → 配置它的设置(View Position 视点、LipSync、Eye Look 等,见口型篇)。</li>
<li>没加 Descriptor,avatar 不会出现在可上传列表里。</li>
</ul>

<h4>五、Builder 页的校验(已核实)</h4>
<ul>
<li>Builder 页有 <b>Validations</b> 区,列出<b>错误(Errors)和警告(Warnings)</b>。</li>
<li><b>错误</b>会阻止上传,必须修;<b>警告</b>不阻止但建议看(比如性能问题)。</li>
<li>会显示 avatar 的<b>性能等级</b>(performance rank,见性能/合并篇)。</li>
<li>例如三角面过多会被警告"too many triangles"。</li>
</ul>

<h4>六、常见上传问题排查(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>登录失败</td><td>账号没关联 VRChat.com;Steam/Meta 先去官网绑定</td></tr>
<tr><td>Build 按钮灰/传不了</td><td>trust rank 还是 Visitor;先玩游戏升到 New User</td></tr>
<tr><td>avatar 不在上传列表</td><td>没加 VRC Avatar Descriptor;加上</td></tr>
<tr><td>Validations 报红错误</td><td>按提示逐条修,错误清空才能传</td></tr>
<tr><td>性能等级 Very Poor 警告</td><td>不阻止上传但影响可见性;优化(见合并篇)</td></tr>
<tr><td>缺骨骼/rig 报错</td><td>Rig 没配好(见骨骼绑定篇)</td></tr>
<tr><td>参数内存超限</td><td>同步参数超 256 bit(见参数内存篇)</td></tr>
<tr><td>SDK 版本过旧报错</td><td>用 VCC 更新 SDK 到最新</td></tr>
</table>

<h4>七、完整上传流程</h4>
<ol>
<li>确认账号 New User 以上(Visitor 先升级)。</li>
<li>avatar 加好 VRC Avatar Descriptor 并配置。</li>
<li>VRChat SDK → Show Control Panel,登录。</li>
<li>切 Builder 页,看 Validations——清掉所有红色错误。</li>
<li>看性能等级,必要时优化。</li>
<li>填名字/描述/缩略图,点上传。</li>
<li>(可选)先 Build & Test 本地验证一遍再正式传(见本地测试篇)。</li>
</ol>

<h4>八、一句话总结</h4>
<p>上传卡住先查三件事:<b>账号是不是 New User 以上</b>(Visitor 只能本地测)、<b>有没有加 VRC Avatar Descriptor</b>、<b>Builder 页 Validations 的红色错误清没清</b>。菜单 VRChat SDK → Show Control Panel 登录后进 Builder 页操作。警告(如三角面多)不阻止上传但建议优化。其它具体报错按对应专题篇(Rig、参数、合并)处理。</p>
`
},
{
 id:"uv-texture-basics",
 title:"UV 与贴图导入:改贴图前必须懂的底层",
 sub:"贴图重绘和着色器的地基。讲清 UV、sRGB、法线贴图、压缩(Unity 部分已核实)",
 mins:13,
 tags:["UV","贴图","纹理","Texture","sRGB","法线贴图","Normal map","压缩","美术","基础"],
 body:`
<h4>一、为什么改贴图前要懂 UV</h4>
<p>贴图重绘篇讲了怎么改颜色,但很多人不懂<b>贴图到底怎么贴到模型上的</b>——结果改了贴图发现位置全错、接缝明显。答案是 <b>UV</b>。UV 是连接 2D 贴图和 3D 模型的桥梁,加上 Unity 的纹理导入设置(sRGB、压缩、法线类型),构成整个美术管线的地基。</p>

<h4>二、UV 是什么(已核实)</h4>
<ul>
<li>UV 是<b>二维纹理坐标</b>,取值范围通常 <b>0–1</b>,决定纹理如何映射到网格表面的每个顶点。</li>
<li><b>U 对应横向、V 对应纵向</b>(就是贴图的 X/Y,只是换了名避免和 3D 的 XYZ 混淆)。</li>
<li>模型的每个顶点都有一个 UV 坐标,相当于"这个点该取贴图上哪个位置的颜色"。</li>
<li><b>UV 展开(UV unwrap)</b>就是把 3D 模型表面"摊平"成 2D,像把纸盒拆开铺平——贴图就画在这张摊平图上。</li>
<li>超出 0–1 的部分由 <b>Wrap Mode</b> 决定:Repeat(平铺)或 Clamp(拉伸边缘)。</li>
</ul>

<h4>三、改贴图为什么不能乱改 UV</h4>
<ul>
<li>贴图按 UV 对应到模型。<b>改贴图(在原 UV 布局上重画)安全</b>;改 UV 布局则会让原贴图全错位。</li>
<li>所以重绘贴图时:在原贴图的 UV 布局上画,别动模型 UV。导出 UV 布局图(UV layout)当参考,就知道哪块对应模型哪里。</li>
<li>这也解释了贴图重绘篇为何强调"在原图层上改色"——是为了不破坏 UV 对应。</li>
</ul>

<h4>四、Unity 纹理类型(已核实)</h4>
<table><tr><th>Texture Type</th><th>用于</th></tr>
<tr><td>Default</td><td>大多数贴图(Albedo 颜色/漫反射)</td></tr>
<tr><td>Normal map</td><td>法线贴图,必须设这个,Unity 才正确解码</td></tr>
</table>
<p>法线贴图(凹凸细节)<b>必须把 Texture Type 设为 Normal map</b>,否则表面光照全错(常见现象:细节发蓝、凹凸方向反)。设为该类型会自动按线性处理。</p>

<h4>五、sRGB 勾不勾:最易错的设置(已核实)</h4>
<ul>
<li><b>颜色贴图(Albedo/漫反射)→ 勾 sRGB</b>:它们存的是 gamma 编码的颜色。</li>
<li><b>数据贴图(法线/金属度 Metallic/粗糙度 Roughness/AO/高度)→ 取消 sRGB</b>:这些是线性数据不是颜色,勾了会被错误 gamma 转换,导致材质表现不对。</li>
<li>记法:<b>"眼睛看到的颜色勾,给着色器算的数据不勾"</b>。</li>
</ul>

<h4>六、尺寸与压缩(已核实)</h4>
<ul>
<li><b>Max Size:</b>限制导入后贴图最大边长。越大越占显存,适当降低省显存和带宽——VRChat 里贴图是显存大户,直接影响别人加载你的速度。</li>
<li><b>压缩:</b>减小贴图在显存的体积、提升加载、降显存,但可能损画质。桌面用 BC/DXT,移动(Quest)用 ASTC/ETC。</li>
<li><b>尺寸用 2 的幂(POT):</b>如 512/1024/2048,便于压缩和 mipmap。</li>
<li>Quest 优化时(见 Quest 篇),降贴图尺寸是减体积的有效手段。</li>
</ul>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>改了贴图位置全错</td><td>动了 UV 布局;在原 UV 上重画别改 UV</td></tr>
<tr><td>法线细节发蓝/凹凸反</td><td>没设 Normal map 类型;改过来</td></tr>
<tr><td>颜色发灰/过暗过亮</td><td>sRGB 勾错;颜色贴图勾、数据贴图不勾</td></tr>
<tr><td>金属/粗糙表现怪</td><td>这些数据贴图误勾了 sRGB;取消</td></tr>
<tr><td>avatar 加载慢/显存高</td><td>贴图太大;降 Max Size、开压缩</td></tr>
<tr><td>贴图接缝明显</td><td>UV 接缝处理;重绘时跨缝对齐或用工具</td></tr>
</table>

<h4>八、一句话总结</h4>
<p><b>UV</b>(0-1 二维坐标)决定贴图怎么贴到模型上,改贴图时<b>在原 UV 布局上画、别动 UV</b>。Unity 导入设置三个关键:<b>法线贴图设 Normal map 类型</b>、<b>sRGB 颜色贴图勾/数据贴图(法线金属粗糙)不勾</b>、<b>贴图用 2 的幂尺寸 + 适当压缩降显存</b>。这是贴图重绘和着色器的地基。</p>
`
},
{
 id:"viewpoint-thumbnail",
 title:"视点(View Position)与缩略图:上传前最后两件小事",
 sub:"视点决定第一人称视角,缩略图决定别人选不选你。常被忽略(视点已核实官方)",
 mins:10,
 tags:["View Position","视点","第一人称","缩略图","Descriptor","上传","视角"],
 body:`
<h4>一、两件小事,体验差很多</h4>
<p>上传前还有两件容易忽略的小事:<b>View Position(视点)</b>和<b>缩略图</b>。视点没调好,你进游戏第一人称视角会飘在头顶或穿进自己脑袋;缩略图随便截,别人在 avatar 列表里根本不会点你。两件都简单,但漏了很影响体验。</p>

<h4>二、View Position 是什么(已核实)</h4>
<ul>
<li>它决定你在 VRChat 里<b>第一人称相机的位置</b>——就是你"用这个 avatar 时眼睛在哪"。</li>
<li>在 Unity 场景里显示为一个<b>白色小球</b>,作为可视参考。</li>
<li>它在 VRC Avatar Descriptor 组件的最上方,是上传前必设项之一。</li>
</ul>

<h4>三、视点该放哪(已核实)</h4>
<ul>
<li>有头部的 avatar:把视点放在<b>两眼之间</b>("place the view position between the avatar's eyes")。</li>
<li>头部异常大的 avatar:放到接近正常头部应在的位置。</li>
<li>没头部的 avatar:放在你认为合适的地方。</li>
<li>调法:在 Descriptor 里展开 View Position,场景里会出现白球,调 XYZ 数值或对照模型头部移动,让球落在两眼中间稍靠前。</li>
</ul>

<h4>四、放错的后果(已核实+实践)</h4>
<ul>
<li><b>官方明确:</b>头部过大且视点设得过高时,抬头低头会让<b>脚离地</b>("its feet may lift off the ground when looking up and down")。</li>
<li>实践常见(社区经验):视点太靠后/太低会在第一人称看到自己脸的内部;太靠前则视角不自然。把球放在两眼之间稍偏前最稳。</li>
<li>视点也是 avatar 高度参考的一部分,和缩放/FBT 校准相关(见缩放篇、FBT 篇)——视点位置不对会影响身高判定。</li>
</ul>

<h4>五、缩略图:别人选不选你的第一眼</h4>
<ul>
<li>上传时可设缩略图——它是别人在 avatar 列表/收藏里看到的<b>唯一预览图</b>。</li>
<li>SDK 上传界面可<b>从场景相机捕获</b>当前画面当缩略图,也可上传自定义图。</li>
<li>建议:<b>正面、光照清楚、avatar 占画面主体</b>。糊、黑、背对镜头的缩略图,别人根本认不出也不会选。</li>
<li>换装/改色后记得<b>更新缩略图</b>,否则列表里还是旧样子,容易找错。</li>
</ul>

<h4>六、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>第一人称飘在头顶</td><td>视点太高;白球下移到两眼之间</td></tr>
<tr><td>看到自己脸内部/黑屏</td><td>视点太靠后或埋进头里;往前移到眼前</td></tr>
<tr><td>抬头低头脚离地</td><td>头大+视点过高;按官方降视点</td></tr>
<tr><td>身高判定不对</td><td>视点位置影响高度;校准前先摆正视点</td></tr>
<tr><td>列表里缩略图很糊/认不出</td><td>重新捕获正面清晰图上传</td></tr>
<tr><td>改了外观缩略图还是旧的</td><td>重新上传时更新缩略图</td></tr>
</table>

<h4>七、一句话总结</h4>
<p>上传前别漏两件小事:<b>View Position</b> 是第一人称视点,在 Descriptor 里把白球放到<b>两眼之间</b>(放太高会抬头低头脚离地、太后会看到脸内部);<b>缩略图</b>是别人选你的第一眼,捕一张<b>正面清晰、avatar 为主体</b>的图,换装后记得更新。两件都简单,做了体验立刻不一样。</p>
`
},
{
 id:"dynamicbone-to-physbone",
 title:"DynamicBone 转 PhysBone:改老配布物的必修课",
 sub:"老素体还在用 DynamicBone。讲清官方转换工具、注意点(已核实官方,2026-06 更新)",
 mins:11,
 tags:["DynamicBone","PhysBone","转换","迁移","Convert","老配布物","摇摆骨骼","进阶"],
 body:`
<h4>一、为什么会遇到这个问题</h4>
<p>很多老素体、老配布物的头发/裙摆/尾巴还在用 <b>DynamicBone</b>(早期的摇摆骨骼插件)。VRChat 后来推出了原生的 <b>PhysBone</b>(见 PhysBone 调校篇),现在改老模型时常要把 DynamicBone 转成 PhysBone。这篇讲清官方转换工具和坑。</p>

<h4>二、两种转换方式(已核实)</h4>
<ul>
<li><b>客户端自动转换:</b>VRChat 客户端<b>加载 avatar 时总会自动</b>把 DynamicBone 转成 PhysBone("will always automatically convert")。所以哪怕你没手动转,进游戏也是 PhysBone 在跑。</li>
<li><b>SDK 手动转换:</b>在编辑器里主动转,这样你能看到、调整结果,推荐改模时手动转。</li>
<li>注意:<b>世界(world)里的 DynamicBone 目前不会自动转换</b>,这条只针对 avatar。</li>
</ul>

<h4>三、手动转换工具在哪(已核实)</h4>
<ul>
<li>在 <b>Build Control Panel</b>,或 Unity 菜单 <b>VRChat SDK / Utilities / Convert DynamicBones to PhysBones</b>。</li>
<li>转换前<b>先选中 avatar</b>。</li>
<li>前提:项目里仍需有 DynamicBone 插件,SDK 才能识别原组件来转换。</li>
</ul>

<h4>四、关键警告:转换不可逆(已核实)</h4>
<ul>
<li>手动转换会<b>删除原 DynamicBone 组件</b>并替换为 PhysBone,且"can not be easily reversed"(难以撤销)。</li>
<li><b>转换前务必备份 avatar</b>(复制一份场景物体或存 prefab)。</li>
<li>这是最容易让人后悔的一步——转完发现摆动不对又退不回去。</li>
</ul>

<h4>五、转换不是完美复刻(已核实)</h4>
<ul>
<li>官方明确:<b>"Dynamic Bones and PhysBones are not identical"</b>。转换目标是"大多数设置能用而不崩坏",而非 1:1 还原,"it will never be perfect"。</li>
<li>所以转换后<b>常需手动微调</b>摆动参数(见 PhysBone 调校篇的 Pull/Stiffness 等)。</li>
<li>具体差异(已核实):
  <ul>
  <li>默认用 <b>Advanced 模式</b>,Multi-Child Type 用 <b>Ignore</b>。</li>
  <li>DynamicBone 在 X/Z 方向的 <b>Gravity 和 Force 值无对应项,会被忽略不迁移</b>——靠这两项的效果转换后会变,需手动补。</li>
  </ul>
</li>
</ul>

<h4>六、为什么要转(已核实+背景)</h4>
<ul>
<li>官方理由:<b>提升整体性能</b>,且是<b>avatar 之间互动所必需</b>("necessary for interactions between avatars")——别人摸你头发能动,靠的是 PhysBone(见 Contacts 篇)。</li>
<li>PhysBone 被纳入<b>性能评级</b>(Quest 上有硬性上限,超了算 Very Poor;见性能/合并篇)。</li>
<li>(背景)PhysBone 是 VRChat 原生功能,DynamicBone 是第三方插件——用原生的对协作和分发更省心。</li>
</ul>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>找不到转换菜单</td><td>VRChat SDK/Utilities/Convert DynamicBones to PhysBones;先选中 avatar</td></tr>
<tr><td>转换后摆动不对</td><td>两者不等价;手动调 PhysBone 参数</td></tr>
<tr><td>转完想退回去</td><td>不可逆;只能用转换前的备份</td></tr>
<tr><td>头发不受重力下垂</td><td>X/Z Gravity/Force 被忽略;手动加 Gravity</td></tr>
<tr><td>SDK 不识别 DynamicBone</td><td>项目缺 DynamicBone 插件;先导入再转</td></tr>
<tr><td>别人摸不动我头发</td><td>还是 DynamicBone 或没配好;转成 PhysBone</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>老配布物的 DynamicBone 要转成 PhysBone:菜单 <b>VRChat SDK / Utilities / Convert DynamicBones to PhysBones</b>(选中 avatar)。客户端加载时也会自动转,但改模手动转才能调结果。铁律:<b>转换不可逆,先备份</b>;两者不等价,<b>转完常要手动微调</b>(X/Z 的 Gravity/Force 不迁移)。转的理由:性能 + avatar 互动必需。</p>
`
},
{
 id:"avatar-audio",
 title:"Avatar 音频:给模型加脚步声和特效音",
 sub:"VRC Spatial Audio Source、40m 上限、增益限制。音频被强制空间化(已核实官方)",
 mins:11,
 tags:["音频","Audio","AudioSource","VRC Spatial Audio Source","脚步声","特效音","空间音频","进阶"],
 body:`
<h4>一、给 avatar 加声音</h4>
<p>想让 avatar 走路有脚步声、放特效带音效、或带个会响的音乐盒?这要用 Unity 的 <b>AudioSource</b>,但 VRChat 对 avatar 音频有一套<b>强制限制</b>(防止有人用超大音量音频骚扰别人)。这篇讲清怎么加、限制是什么。</p>

<h4>二、VRC Spatial Audio Source(已核实)</h4>
<ul>
<li>avatar 上的 AudioSource <b>会被自动加上 VRC Spatial Audio Source 组件</b>:就算你不手动加,SDK 也会用默认设置创建。</li>
<li>官方警告:不手动加可能导致"unexpected, undocumented, and undesired behavior"(意外行为)。所以<b>建议自己手动加并配置</b>。</li>
<li>这个组件控制音频的空间化(声音随距离/方向变化)。</li>
</ul>

<h4>三、强制限制:别想搞超大声(已核实)</h4>
<table><tr><th>限制</th><th>数值</th><th>说明</th></tr>
<tr><td>最大距离 Far</td><td><b>不超过 40m</b></td><td>运行时强制,超出听不到</td></tr>
<tr><td>增益 Gain</td><td><b>avatar 最高 10dB</b></td><td>世界音源可更高,avatar 被限制</td></tr>
</table>
<p>这两条是<b>运行时强制</b>的,设再大也会被夹回去——VRChat 故意这么做,防止音频骚扰。想全场放音乐的需求,avatar 做不到(那是世界的事)。</p>

<h4>四、Near / Far 半径(已核实)</h4>
<ul>
<li><b>Far</b> = 音量衰减到静音的外半径,默认 <b>40m</b>(也是上限)。</li>
<li><b>Near</b> = 音量开始衰减的内半径,默认 <b>0m</b>;官方建议<b>保持 0</b> 以获得真实空间化。</li>
<li>默认衰减大致是<b>反平方(inverse-square)</b>,单位都是米——离得越远越小声,符合现实。</li>
<li>Near/Far 只有勾 "Use Spatializer Falloff" 时才覆盖 AudioSource 自己的曲线。</li>
</ul>

<h4>五、2D 音频:一般别用(已核实)</h4>
<ul>
<li>关掉 <b>Use Spatialized Audio</b> 会变成 2D 音频——音量不随位置空间化(无论你在哪都一样响、不分左右)。</li>
<li>彻底变 2D 还需把 AudioSource 的 Spatial Blend 调到 100% 2D。</li>
<li>官方<b>不推荐用 2D 音频</b>("do not recommend")——它不符合 VR 的空间感,也更容易扰民。脚步/特效音都该用空间化(3D)。</li>
</ul>

<h4>六、常见用途与做法</h4>
<ul>
<li><b>脚步声:</b>动画事件或走路状态触发 AudioSource;音量适中、空间化。</li>
<li><b>特效音:</b>开关特效时配合播放(用动画或 Contacts 触发,见对应篇)。</li>
<li><b>音乐盒/道具音:</b>循环音频,但记住 40m 上限——只有近处的人听得到。</li>
<li><b>别设开机自动大声循环:</b>容易被人嫌,且可能被对方安全设置屏蔽。</li>
</ul>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>远处听不到我的音频</td><td>40m 硬上限;avatar 音频本就只覆盖近处</td></tr>
<tr><td>声音不分远近/方向</td><td>用了 2D 音频;开 Use Spatialized Audio</td></tr>
<tr><td>音量怎么调都不够大</td><td>Gain 上限 10dB;avatar 被强制限制</td></tr>
<tr><td>没手动加组件行为怪</td><td>SDK 自动加默认值;手动加并配置</td></tr>
<tr><td>近处声音突然消失</td><td>Near 设太大;保持 0</td></tr>
<tr><td>别人听不到(只我能听)</td><td>对方可能屏蔽了 avatar 音频(安全设置)</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>给 avatar 加音频用 AudioSource,SDK 会自动套 <b>VRC Spatial Audio Source</b>(建议手动加配置)。两条铁限制:<b>最大距离 40m</b>、<b>增益最高 10dB</b>,运行时强制,搞不了超大声。<b>Near 保持 0、用空间化(别用 2D)</b>。脚步/特效音都该是 3D 空间音频。想全场放音乐是世界的活,avatar 做不到。</p>
`
},
{
 id:"blendtree-animation",
 title:"Blend Tree(混合树):让动作和表情平滑过渡",
 sub:"locomotion 和渐变表情的核心。讲清 1D/2D 混合、与普通状态的区别(Unity 部分已核实)",
 mins:12,
 tags:["BlendTree","混合树","动画","状态机","locomotion","平滑过渡","1D","2D","进阶"],
 body:`
<h4>一、为什么动作会"生硬切换"</h4>
<p>用普通状态机做动画,从走到跑是"啪"地切换;做渐变表情(比如随参数慢慢张嘴)也僵硬。想要<b>平滑过渡</b>——走路随速度自然变成跑、表情随滑块连续变化——就要用 <b>Blend Tree(混合树)</b>。它是动画层篇的进阶,locomotion 和渐变表情都靠它。</p>

<h4>二、Blend Tree 是什么(已核实)</h4>
<ul>
<li>Blend Tree 用于<b>混合两个或更多相似动画</b>("blend between two or more similar motions"),混合程度由一个数值参数控制。</li>
<li>它是状态机里的一种<b>特殊状态</b>("a special type of state in an Animation State Machine")——在状态机里看是一个状态,双击进去是混合树。</li>
<li>前提:被混合的动画要<b>性质和节奏相近</b>,且在归一化时间上对齐(如走/跑都让左脚在 0.0、右脚在 0.5 落地),否则混出来会抽搐。</li>
</ul>

<h4>三、和普通状态切换的区别(已核实)</h4>
<table><tr><th></th><th>Transition(普通切换)</th><th>Blend Tree(混合)</th></tr>
<tr><td>行为</td><td>在给定时间内从 A 切到 B</td><td>同时融合多个动画的部分</td></tr>
<tr><td>结果</td><td>非此即彼,有过渡段</td><td>"varying degrees" 连续混合</td></tr>
<tr><td>适合</td><td>状态切换(站→坐)</td><td>连续变化(走→跑、渐变表情)</td></tr>
</table>
<p>关键:Transition 是"换",Blend Tree 是"融"。要连续可调的效果就用混合树。</p>

<h4>四、1D Blend Tree(已核实)</h4>
<ul>
<li>用<b>单个参数</b>混合。官方经典例子:<b>按角色速度混合走和跑</b>("walking and running according to the character's speed")。</li>
<li>做法:新建 Blend Tree → 设为 1D → 选一个 Float 参数 → 加几个动画 clip,按阈值排布(速度 0=站、0.5=走、1=跑)。</li>
<li>参数从 0 推到 1,动画就从站平滑过渡到走再到跑。</li>
</ul>

<h4>五、2D Blend Tree(已核实+实践)</h4>
<ul>
<li>用<b>两个参数</b>混合(已核实文档展示"5 个 clip 的 2D Blend Tree")。</li>
<li>典型场景:<b>定向移动</b>——用 X/Y 两个参数(前后、左右)混合 8 方向移动动画,人物朝哪走放对应动画。</li>
<li>VRChat locomotion(走/跑/侧移)常用 2D 混合,配合 IK 做出自然的移动姿态。</li>
</ul>

<h4>六、在 VRChat 里的用途(实践)</h4>
<ul>
<li><b>Locomotion 层:</b>走/跑/蹲移动的平滑混合(见动画层篇,Base 层负责移动)。</li>
<li><b>渐变表情:</b>用一个参数连续控制表情程度(配合 blendshape,见 blendshape 篇)——比如 OSC/面捕驱动的连续口型。</li>
<li><b>渐变姿势:</b>身体倾斜、头部朝向等需要连续调整的。</li>
<li>很多面捕(face tracking)方案就是用 Blend Tree 把多个 blendshape 按追踪数据连续混合。</li>
<li>还有 <b>Direct Blend Tree</b>(直接混合,已核实文档提到),进阶用来同时驱动多个独立 blendshape,是高级表情系统的常用手法。</li>
</ul>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>走跑切换很生硬</td><td>用了 Transition;改用 1D Blend Tree 按速度混合</td></tr>
<tr><td>混合时动作抽搐</td><td>动画节奏没对齐;让脚步在归一化时间对齐</td></tr>
<tr><td>表情不能连续调</td><td>用状态切换了;改 Blend Tree 按参数连续混</td></tr>
<tr><td>2D 移动方向不对</td><td>X/Y 参数或 clip 位置摆错;检查阈值坐标</td></tr>
<tr><td>面捕表情卡顿/跳变</td><td>该用 Blend Tree 连续混合而非离散状态</td></tr>
<tr><td>想同时驱动多个blendshape</td><td>用 Direct Blend Tree</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>Blend Tree 是状态机里的<b>特殊状态</b>,把多个相似动画按参数<b>连续融合</b>(不是切换)。<b>1D</b> 用单参数(速度控走/跑),<b>2D</b> 用双参数(方向移动),<b>Direct</b> 同时驱动多个 blendshape。被混动画要节奏对齐否则抽搐。VRChat 的 locomotion、渐变表情、面捕都靠它做出平滑效果。要"融"用混合树,要"换"用 Transition。</p>
`
},
{
 id:"performance-safety",
 title:"性能等级与安全屏蔽:为什么别人看不到你的真身",
 sub:"五档性能等级、Minimum Displayed Rank、组件被屏蔽规则(已核实官方)",
 mins:13,
 tags:["性能等级","Performance Rank","安全设置","Fallback","屏蔽","Very Poor","优化","Quest","重要"],
 body:`
<h4>一、你以为别人看到的是你做的模型</h4>
<p>辛苦做好的 avatar,在别人那边可能<b>根本看不到</b>——只看到一个灰色 Fallback,或者你的特效/动骨/音频被全部移除。原因是 VRChat 的<b>性能等级 + 安全屏蔽系统</b>。这篇讲清规则,让你明白为什么要优化、优化到什么程度别人才能看到你的真身。这是贯穿优化篇、合并篇的"为什么"。</p>

<h4>二、五档性能等级(已核实)</h4>
<table><tr><th>等级</th><th>说明</th></tr>
<tr><td><b>Excellent</b></td><td>最高级("冰箱上的金星"),最优</td></tr>
<tr><td><b>Good</b></td><td>官方建议<b>目标至少 Good</b></td></tr>
<tr><td><b>Medium</b></td><td>"perfectly fine",做不到 Good 也 OK</td></tr>
<tr><td><b>Poor</b></td><td>偏重,容易被屏蔽</td></tr>
<tr><td><b>Very Poor</b></td><td>无上限,问题可能很严重</td></tr>
</table>
<p>评级看三角面、骨骼数、贴图内存、材质数、动骨数等综合指标(见合并篇、Quest 篇)。</p>

<h4>三、Minimum Displayed Performance Rank(已核实)</h4>
<ul>
<li>每个玩家可在 Performance Options 里设一个<b>最低显示门槛</b>——低于这个等级(太重)的 avatar 会被管理。</li>
<li><b>PC 默认门槛是 Very Poor</b>(即默认谁都不屏蔽);玩家可改成 Medium 或 Poor 来挡掉重模型。</li>
<li>超标的 avatar 会被替换成 <b>Fallback</b>(见 Fallback 篇)——别人看到的是替身不是你。</li>
<li>所以:你优化越差,越多人(设了门槛的)看不到你真身。这是做 Fallback 的核心动机。</li>
</ul>

<h4>四、组件被单独屏蔽(已核实,重要)</h4>
<ul>
<li>即使整个 avatar 没被换成 Fallback,<b>超标的特定组件也会被移除</b>。</li>
<li>受管控组件:<b>PhysBones、Contacts、Constraints、灯光、粒子系统、Trail/Line Renderers、Cloth、Audio Sources</b> 等,各有规则。</li>
<li>官方例子:门槛设 Poor 时,带 9 个 Trail Renderer(属 Very Poor)的 avatar 会"<b>移除所有 Trail Renderer</b>"后显示。</li>
<li>含义:你的头发动骨、特效粒子、音频可能在别人那边<b>被静默删掉</b>——不是 bug,是安全系统。</li>
</ul>

<h4>五、为什么必须优化(已核实)</h4>
<ul>
<li><b>"你的 avatar 影响所有人的帧率"</b>——重模型拖累整个房间,这是 VRChat 强制管控的根本原因。</li>
<li>优化太差 → 别人只看到 Fallback,你的设计白做。</li>
<li>活动、群组、场所可能<b>要求 Very Poor 用户更换</b> avatar。</li>
<li>结论:目标至少 Good(做不到 Medium 也行),并配一个像样的 Fallback 兜底。</li>
</ul>

<h4>六、PC 与移动端(Quest)标准天差地别(已核实)</h4>
<table><tr><th>指标</th><th>PC</th><th>移动端(Quest/Android/iOS)</th></tr>
<tr><td>Excellent 三角面</td><td>32,000</td><td>7,500</td></tr>
<tr><td>Poor 三角面上限</td><td>70,000</td><td>20,000</td></tr>
<tr><td>默认屏蔽门槛</td><td>Very Poor(不屏蔽)</td><td><b>Medium(看不到 Poor/Very Poor)</b></td></tr>
<tr><td>能否关闭屏蔽</td><td>能</td><td><b>不能</b></td></tr>
</table>
<ul>
<li>移动端<b>灯光、Cloth、音频源直接禁用</b>(始终为零),不管你怎么设。</li>
<li>移动端有<b>硬性组件上限</b>(如 8 个 PhysBone 组件、16 个 Contacts),超出<b>无法用 "Show Avatar" 绕过</b>。</li>
<li>所以 Quest 版要专门优化(见 Quest 篇)——PC 上没事的东西在 Quest 上可能直接没了。</li>
</ul>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>别人说看到我是灰色替身</td><td>性能太差被换 Fallback;优化等级 + 配好 Fallback</td></tr>
<tr><td>我的特效/动骨别人看不到</td><td>组件超标被安全系统移除;减组件或降到门槛内</td></tr>
<tr><td>Quest 上灯光/音频没了</td><td>移动端直接禁用这些;不可恢复,设计时避开</td></tr>
<tr><td>Quest 动骨/Contacts 失效</td><td>超移动端硬上限;减到 8 PhysBone/16 Contacts 内</td></tr>
<tr><td>评级突然变 Very Poor</td><td>可能关了 Mesh Read/Write(立即降级);重新开</td></tr>
<tr><td>活动要求我换 avatar</td><td>你是 Very Poor;优化或备一个达标 avatar</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>VRChat 按五档<b>性能等级</b>(Excellent→Very Poor)管控 avatar:玩家设的 <b>Minimum Displayed Rank</b> 会把太重的你换成 <b>Fallback</b>,超标组件(动骨/特效/音频)还会被<b>单独移除</b>。<b>目标至少 Good</b>(Medium 也行)+ 配 Fallback,别人才能看到真身。<b>移动端标准严得多</b>(三角面 1/4、默认挡 Poor 且不可关、灯光音频直接禁用、组件有硬上限)。优化不是可选项——你的模型影响全房间帧率。</p>
`
},
{
 id:"editor-debug-tools",
 title:"编辑器内调试:不用上传就能测表情和菜单",
 sub:"Av3Emulator + Gesture Manager,省下反复上传的时间(工具事实已核实)",
 mins:11,
 tags:["调试","Av3Emulator","Gesture Manager","Play Mode","测试","表情","菜单","效率","进阶"],
 body:`
<h4>一、别再为了测一个表情反复上传</h4>
<p>改好一个手势表情/菜单开关,想看效果——总不能每次都上传到游戏里测吧?那太慢了。<b>在 Unity 编辑器里就能预览</b>:两个社区神器 <b>Av3Emulator</b> 和 <b>Gesture Manager</b>,让你不进游戏就测表情、手势、菜单、动画层,改模效率翻倍。本地测试篇讲的是上传前 Build&Test,这篇讲的是更早、更快的编辑器内调试。</p>

<h4>二、Av3Emulator:模拟整个 3.0 系统(已核实)</h4>
<ul>
<li>它是 <b>VRChat Avatars 3.0 系统的模拟器</b>,在 Unity 编辑器里基于 <b>PlayableGraph API</b>(AnimationControllerPlayable / AnimationLayerMixerPlayable)重建,"should emulate most features of Avatar3"。</li>
<li>开源工具(lyuma/Av3Emulator),通过 VCC 或导入 unitypackage 安装。</li>
<li>用法(已核实):<b>Tools 菜单 → Avatar 3.0 Emulator</b>,会往场景加一个对象,用它设默认 VR 模式、tracking 类型等。</li>
</ul>

<h4>三、Av3Emulator 能测什么(已核实)</h4>
<ul>
<li><b>手势强度:</b>用左右手 gesture 权重测试模拟拳头等手势。</li>
<li><b>自定义表情菜单</b>(Custom Expression Menus):直接点菜单测开关。</li>
<li><b>参数:</b>查看和编辑 float/int 参数(通过表情菜单、Animator 的 Parameters 标签、blend tree、Parameter Driver 或手动)。</li>
<li><b>Animator 实时调试:</b>用 "<b>Animator To Debug</b>" 下拉选择要可视化的层,在 Animator 窗口实时查看和编辑。</li>
<li><b>非本地克隆:</b>勾 "Create Non Local Clone" 测试别人看到的同步效果。</li>
<li><b>Visemes:</b>能测,但注意只在 0% 或 100%(无中间值)。</li>
</ul>

<h4>四、Av3Emulator 的已知限制(已核实)</h4>
<ul>
<li>README 明确<b>未实现</b>的:自定义 inspector、非 Animation 模式下肢体 IK Tracking 的可视化、<b>眼动/眨眼支持</b>、Set View position 未完全实现。</li>
<li>也就是说:眼动眨眼、视点这些还是得上传到游戏里实测(见本地测试篇)。</li>
<li>(实践)调试在编辑器的 Play Mode 下进行——进播放模式后由模拟器接管。</li>
</ul>

<h4>五、Gesture Manager:轻量预览动画(已核实用途)</h4>
<ul>
<li>BlackStartx 的 Gesture Manager,官方简介:"<b>preview and edit your VRChat avatar animation directly in Unity</b>"(在 Unity 里直接预览和编辑动画)。</li>
<li>相比 Av3Emulator 更<b>轻量直接</b>:主要用来快速预览手势触发的表情/动画,点一下就看效果。</li>
<li>两者常一起用(Av3Emulator 的致谢里就提到 GestureManager)——Gesture Manager 快速看表情,Av3Emulator 模拟完整 3.0 行为。</li>
</ul>

<h4>六、典型调试流程(实践)</h4>
<ol>
<li>装好 Av3Emulator(+ Gesture Manager),通过 VCC 最省心。</li>
<li>Tools → Avatar 3.0 Emulator 加模拟器对象。</li>
<li>进 Play Mode,选中 avatar。</li>
<li>用 Gesture Manager 快速点手势看表情,或在 Av3 Runtime 组件调参数/菜单。</li>
<li>用 Animator To Debug 看哪层在跑、参数怎么变——定位"表情不触发""开关无效"等问题。</li>
<li>编辑器里调通了,再上传 + Build&Test 实测眼动/视点这些模拟器测不了的。</li>
</ol>

<h4>七、排查表(我整理)</h4>
<table><tr><th>需求 / 现象</th><th>用法</th></tr>
<tr><td>想快速看手势表情</td><td>Gesture Manager,点手势即预览</td></tr>
<tr><td>测菜单开关/参数</td><td>Av3Emulator,Play Mode 下点菜单</td></tr>
<tr><td>表情不触发,查原因</td><td>Av3Emulator 的 Animator To Debug 看层和参数</td></tr>
<tr><td>测别人看到的同步效果</td><td>勾 Create Non Local Clone</td></tr>
<tr><td>眼动/眨眼测不了</td><td>模拟器未实现;上传到游戏实测</td></tr>
<tr><td>viseme 只有0/100</td><td>已知限制;口型中间值要游戏里看</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>改模别再为测一个表情反复上传。<b>Av3Emulator</b> 在 Unity Play Mode 里模拟整个 3.0 系统(手势、菜单、参数、Animator 实时调试、非本地克隆),<b>Gesture Manager</b> 轻量快速预览手势动画,两者配合在编辑器里就把表情/菜单/动画层调通。注意模拟器<b>测不了眼动/眨眼/视点</b>——这些仍需上传实测(见本地测试篇)。编辑器调通再上传,效率翻倍。</p>
`
},
{
 id:"expression-menu",
 title:"表情菜单与控件类型:让用户操作你的开关",
 sub:"六种控件、8 个上限、子菜单、Puppet。参数和动画的操作界面(已核实官方)",
 mins:12,
 tags:["表情菜单","Expression Menu","控件","Toggle","Radial Puppet","子菜单","菜单","参数","进阶"],
 body:`
<h4>一、菜单是参数的操作界面</h4>
<p>参数内存篇讲了参数怎么存,动画层篇讲了参数怎么驱动动画——但用户怎么<b>操作</b>这些参数?靠 <b>Expression Menu(表情菜单)</b>,就是你在游戏里打开的那个径向菜单。控件类型(Toggle/Radial 等)直接决定交互体验。这篇讲清菜单结构和六种控件,把"开关"做成用户能点的界面。</p>

<h4>二、两个必需的 asset(已核实)</h4>
<ul>
<li>用菜单至少需要<b>两个 asset</b>:一个或多个 <b>Expressions Menu</b> + 一个 <b>Expression Parameters</b>。</li>
<li>创建:<b>Assets &gt; Create &gt; VRChat &gt; Avatars &gt; Expressions Menu</b>。</li>
<li>都要加到 Avatar Descriptor 的 <b>"Expressions" 部分</b>:Menu 属性指向菜单,Parameters 属性指向参数表。</li>
<li>关系:菜单的控件引用参数名 → 参数名要和 <b>animator 里的参数匹配</b>("should match the parameters in your animators")→ 参数驱动动画层(见动画层篇、参数篇)。</li>
</ul>

<h4>三、一个菜单最多 8 个控件(已核实)</h4>
<ul>
<li>官方明确:<b>"Up to 8 controls can be added to a single menu"</b>。</li>
<li>超过 8 个怎么办?用 <b>Sub-Menu</b> 分层(下面讲)——这就是为什么复杂 avatar 都是多级菜单。</li>
</ul>

<h4>四、六种控件类型(已核实)</h4>
<table><tr><th>类型</th><th>作用</th><th>参数</th></tr>
<tr><td><b>Button</b></td><td>点击时设参数,随后重置(约1秒),<b>不能按住</b></td><td>触发型</td></tr>
<tr><td><b>Toggle</b></td><td>开时设参数,关时重置——最常用的开关</td><td>Bool/Int</td></tr>
<tr><td><b>Sub-Menu</b></td><td>打开另一个菜单,可嵌套;进入可设参数,退出重置为0</td><td>可选</td></tr>
<tr><td><b>Radial Puppet</b></td><td>单个 float,像"可填充的进度条",0.0–1.0</td><td>1 个 Float</td></tr>
<tr><td><b>Two-Axis Puppet</b></td><td>摇杆控两个 float(垂直/水平),-1.0–1.0</td><td>2 个 Float</td></tr>
<tr><td><b>Four-Axis Puppet</b></td><td>控四个 float(上右下左),0.0–1.0</td><td>4 个 Float</td></tr>
</table>

<h4>五、什么时候用哪种(实践)</h4>
<ul>
<li><b>开关衣服/配件:</b>Toggle(开=穿,关=脱)——最常见。</li>
<li><b>连续调节:</b>Radial Puppet(改颜色明度、缩放程度、特效强度)——配合 Blend Tree(见混合树篇)做连续效果。</li>
<li><b>一次性动作:</b>Button(放个一次性特效/动作)——注意不能按住。</li>
<li><b>分类整理:</b>Sub-Menu(衣服一个子菜单、表情一个子菜单),也是突破 8 控件上限的方法。</li>
<li><b>摇杆控制:</b>Two/Four-Axis Puppet(控制方向性的东西,如尾巴朝向)。</li>
</ul>

<h4>六、同步方式的差异(已核实)</h4>
<ul>
<li><b>Button/Toggle</b> 用 <b>Playable Sync</b>。</li>
<li><b>Puppet 控件</b>打开时用 <b>IK Sync</b>,适合需要精确同步的快速动作。</li>
<li>Puppet 的 "Parameter" 属性是<b>可选的</b>。</li>
<li>(关联参数篇)参数类型:Int(0–255)、Float(-1.0–1.0)、Bool;可设 Default/Saved/Synced——Synced 才会同步给别人看,但占同步内存(见参数内存篇的 256 bit 限制)。</li>
</ul>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>菜单里点了没反应</td><td>控件参数名和 animator 不匹配;对齐名字</td></tr>
<tr><td>菜单加不进第9个控件</td><td>单菜单上限8;用 Sub-Menu 分层</td></tr>
<tr><td>想做连续调节做成了开关</td><td>用 Radial Puppet 而非 Toggle</td></tr>
<tr><td>Button 想按住不放</td><td>Button 不能按住;改用 Toggle</td></tr>
<tr><td>别人看不到我的菜单效果</td><td>参数没勾 Synced;勾上(注意内存)</td></tr>
<tr><td>菜单没显示</td><td>Menu/Parameters 没挂到 Descriptor;挂上</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>表情菜单是参数的<b>操作界面</b>:需要 Expressions Menu + Expression Parameters 两个 asset,挂到 Descriptor 的 Expressions 部分,控件参数名要和 animator 对齐。<b>单菜单最多 8 控件</b>,超了用 <b>Sub-Menu</b> 分层。六种控件:<b>Toggle</b>(开关,最常用)、<b>Button</b>(一次性,不能按住)、<b>Radial Puppet</b>(连续滑块)、<b>Two/Four-Axis</b>(摇杆)、<b>Sub-Menu</b>(子菜单)。连续效果配 Blend Tree,同步要勾 Synced(占内存)。</p>
`
},
{
 id:"ma-advanced",
 title:"Modular Avatar 进阶组件:Bone Proxy 和 Menu Installer",
 sub:"配件附着、菜单自动安装、世界固定。非破坏式改模的进阶武器(已核实官方)",
 mins:12,
 tags:["Modular Avatar","MA","Bone Proxy","Menu Installer","World Fixed Object","配件","进阶","非破坏式"],
 body:`
<h4>一、MA 不只是合并骨架</h4>
<p>MA 总篇讲了 Merge Armature(合并衣服骨架)这个核心。但 MA 还有一组进阶组件,做配件改模(把东西绑到手上、给配件自带菜单、世界固定物体)时高频用到——而且全是<b>非破坏式</b>(见 MA 总篇)。这篇讲清 Bone Proxy、Menu Installer 等进阶组件,让你的配件"即插即用"。</p>

<h4>二、MA Bone Proxy:把物体附到骨骼上(已核实)</h4>
<ul>
<li>作用:把预制件里的物体<b>放进原 avatar 已有的物体/骨骼内部</b>("place objects from your prefab inside of objects that are part of the original avatar")。例如把 contacts 放进 avatar 的手里。</li>
<li>额外好处:移动物体后会<b>自动更新 animator 的路径引用</b>,引用旧位置的动画不会断。</li>
<li>用法:给预制件物体加 Bone Proxy 组件,把目标骨骼拖进 <b>"Target"</b> 字段,物体就被放进目标里。</li>
<li>注意:它适合"附着到已有物体",<b>不适合配置服装</b>——服装该用 Merge Armature。</li>
</ul>

<h4>三、Bone Proxy 的附着模式(已核实)</h4>
<table><tr><th>模式</th><th>含义</th><th>适用</th></tr>
<tr><td><b>As child at root</b></td><td>挂到目标下,位置/朝向归零,和目标重合</td><td>非 avatar 专用预制件(推荐)</td></tr>
<tr><td><b>As child keep world pose</b></td><td>挂到目标下,保留原世界位置/朝向</td><td>avatar 专用,如给 Cloth 放 collider</td></tr>
</table>
<ul>
<li>也可只保留位置或旋转之一,另一项匹配目标骨骼(高级用途)。</li>
<li>设目标时系统会根据当前是否已在目标位置<b>自动选模式</b>。</li>
<li><b>Match Parent Scale</b>:开启则移动后本地缩放归 (1,1,1);关闭保留原世界缩放。</li>
</ul>

<h4>四、MA Menu Installer:配件自带菜单(已核实)</h4>
<ul>
<li>作用:把菜单项<b>自动装进 avatar 的表情菜单</b>("add menu items to the avatar's expressions menu")——配件自带开关,装上即用,不用手动改菜单。</li>
<li>默认装在<b>最顶层</b>;选中的菜单<b>装满会自动拆成分页(子菜单)</b>。</li>
<li>能指定装到某个子菜单:点 "Select Menu" 双击目标菜单;还能用 "Install To" 扩展另一个 Menu Installer 装的菜单。</li>
<li>这正是为什么 MA 配布的配件"拖进去就有菜单开关"——它带了 Menu Installer。</li>
</ul>

<h4>五、MA Menu Item / Menu Group(已核实)</h4>
<ul>
<li>除了装现成菜单资源,给物体加 <b>Menu Item</b> 或 <b>Menu Group</b> 组件,Menu Installer 会<b>按组件配置自动生成菜单项</b>。</li>
<li>意思:你不用手动建 Expression Menu asset(见菜单篇),用 MA 组件就能可视化地搭菜单——对非破坏式工作流更顺。</li>
</ul>

<h4>六、其他进阶组件(已核实概述)</h4>
<ul>
<li><b>MA World Fixed Object:</b>让物体<b>固定在世界空间</b>,不随 avatar 移动(做世界锚定的特效/道具)。</li>
<li><b>MA Parameters:</b>声明并配置组件用到的参数——配件自带参数声明,避免和别的配件撞名。</li>
<li><b>MA Merge Armature:</b>合并骨架(衣服骨架并入身体),MA 总篇的核心,配件穿戴的基础。</li>
<li>组合拳:Merge Armature 穿衣 + Bone Proxy 附配件 + Menu Installer 自带菜单 + Parameters 声明参数 = 一个完整的"即插即用"配布件。</li>
</ul>

<h4>七、排查表(我整理)</h4>
<table><tr><th>需求 / 现象</th><th>用法</th></tr>
<tr><td>把道具绑到手/头上</td><td>Bone Proxy,Target 选对应骨骼</td></tr>
<tr><td>配件想自带菜单开关</td><td>Menu Installer + Menu Item</td></tr>
<tr><td>绑配件后动画路径断了</td><td>Bone Proxy 会自动更新引用;用它而非手动挪</td></tr>
<tr><td>配置服装用 Bone Proxy 不对</td><td>服装用 Merge Armature,不是 Bone Proxy</td></tr>
<tr><td>物体不该随我动</td><td>World Fixed Object</td></tr>
<tr><td>配件菜单装错层级</td><td>Menu Installer 的 Select Menu/Install To 指定</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>MA 进阶组件让配件"即插即用":<b>Bone Proxy</b> 把物体附到指定骨骼(Target 字段,两种附着模式,自动更新动画引用,但服装仍用 Merge Armature);<b>Menu Installer</b> 把菜单自动装进 avatar 表情菜单(默认顶层、装满自动分页、可指定子菜单),配 <b>Menu Item</b> 自动生成菜单项;还有 <b>World Fixed Object</b>(世界固定)、<b>Parameters</b>(参数声明)。组合起来就是一个完整的非破坏式配布件。</p>
`
},
{
 id:"contacts-advanced",
 title:"Contacts 进阶:Sender/Receiver 参数全解",
 sub:"三种 Receiver 模式、碰撞标签、几何形状。做互动的核心(已核实官方)",
 mins:12,
 tags:["Contacts","Sender","Receiver","碰撞标签","Proximity","互动","摸头","进阶"],
 body:`
<h4>一、互动的底层机制</h4>
<p>Contacts 总篇讲了概念——摸头变色、握手触发特效靠的就是它。这篇深入 <b>Sender / Receiver 的具体参数</b>:三种 Receiver 模式、碰撞标签、几何形状。搞懂这些,你才能精确做出"摸到哪、触发什么、离多近反应多强"的互动。</p>

<h4>二、Sender 和 Receiver 的分工(已核实)</h4>
<ul>
<li><b>Sender(发送器):</b>只负责被检测,本身不做判断("Senders simply exist to be detected")。比如手指尖放个 Sender。</li>
<li><b>Receiver(接收器):</b>检测 Sender,据此<b>更新参数或触发事件</b>。比如头顶放个 Receiver,被手指 Sender 碰到就变色。</li>
<li>一句话:Sender 是"能被摸的点",Receiver 是"被摸了会反应的区域"。</li>
</ul>

<h4>三、三种 Receiver Type(已核实,核心)</h4>
<table><tr><th>类型</th><th>行为</th><th>参数类型</th></tr>
<tr><td><b>Constant</b></td><td>持续报告有无接触,无接触时重置</td><td>推荐 Bool</td></tr>
<tr><td><b>OnEnter</b></td><td>接触那一帧报告,下一帧重置;可设 Min Velocity</td><td>Bool/Int</td></tr>
<tr><td><b>Proximity</b></td><td>给 0.0–1.0,表示接触点离中心多近;多接触取最近</td><td><b>必须 Float</b></td></tr>
</table>
<ul>
<li><b>Constant:</b>做"正在被摸=开"的持续状态(摸着头发就一直发光)。</li>
<li><b>OnEnter:</b>做"碰一下触发一次"(击掌放个音效),Min Velocity 可要求一定速度才触发。</li>
<li><b>Proximity:</b>做"越近反应越强"的连续效果(配 Radial/Blend Tree,手越近脸越红)。</li>
</ul>

<h4>四、Collision Tags:谁能和谁交互(已核实)</h4>
<ul>
<li>碰撞标签是一组<b>字符串</b>,Sender 和 Receiver <b>至少要有一对标签匹配</b>才会碰撞成功。</li>
<li><b>区分大小写</b>,每个 Contact <b>最多 16 个</b>标签。</li>
<li>用途:用标签控制"只有手指能摸头"(手指 Sender 和头 Receiver 共享一个标签),避免乱触发。</li>
<li>VRChat 有内置标签(如 Hand/Finger 等),也能自定义。</li>
</ul>

<h4>五、参数写入(已核实)</h4>
<ul>
<li>Receiver 收到信号时<b>设置 animator 里的一个 Parameter</b>:碰撞时设为指定 Value,无碰撞重置为 0。</li>
<li>参数类型按 Receiver Type 定(Float/Bool/Int)。</li>
<li>重要:这个参数<b>无需加入同步的 Avatar Parameter 列表</b>——Contacts 自己处理,不占你的 256bit 同步内存(见参数内存篇)。</li>
</ul>

<h4>六、几何形状参数(已核实)</h4>
<table><tr><th>参数</th><th>含义</th><th>适用形状</th></tr>
<tr><td>Shape Type</td><td>Sphere / Capsule / Box</td><td>—</td></tr>
<tr><td>Radius</td><td>碰撞体半径(最大 3m)</td><td>Sphere/Capsule</td></tr>
<tr><td>Height</td><td>Capsule 沿 Y 高度(含两端球)</td><td>Capsule</td></tr>
<tr><td>Size</td><td>Box 各轴尺寸(最大 6m)</td><td>Box</td></tr>
<tr><td>Position / Rotation</td><td>相对 root 的位置/旋转偏移</td><td>全部</td></tr>
</table>

<h4>七、Allow Self / Others 和 Local Only(已核实)</h4>
<ul>
<li><b>Allow Self:</b>允许被自己影响(自己摸自己)。</li>
<li><b>Allow Others:</b>允许被别人影响(别人摸你)。</li>
<li><b>Local Only:</b>接触只在本地生效,<b>不计入性能评级</b>;开启时单 avatar 最多可用 <b>256 个 contact 组件</b>(否则受性能评级限制,见性能安全篇的移动端 16 上限)。</li>
</ul>

<h4>八、排查表 + 一句话总结(我整理)</h4>
<table><tr><th>需求 / 现象</th><th>原因 / 解法</th></tr>
<tr><td>摸了没反应</td><td>Sender/Receiver 标签没匹配;查标签(区分大小写)</td></tr>
<tr><td>想做越近越强</td><td>Receiver 用 Proximity + Float 参数</td></tr>
<tr><td>碰一下触发一次</td><td>用 OnEnter,不是 Constant</td></tr>
<tr><td>只想自己能摸</td><td>关 Allow Others</td></tr>
<tr><td>Contact 太多超性能</td><td>开 Local Only(不计评级,上限256)</td></tr>
<tr><td>别人摸不到(Quest)</td><td>移动端 Contacts 硬上限16;见性能安全篇</td></tr>
</table>
<p><b>一句话:</b>Sender 是"能被摸的点",Receiver 是"被摸有反应的区域"。Receiver 三模式:<b>Constant</b>(持续状态)、<b>OnEnter</b>(碰一下触发)、<b>Proximity</b>(越近越强,用Float)。靠 <b>Collision Tags</b> 匹配(区分大小写、≤16)控制谁能摸谁,结果写入参数(不占同步内存)。<b>Local Only</b> 不计评级且上限256。</p>
`
},
{
 id:"blueprint-id-update",
 title:"蓝图 ID 与更新:改完怎么覆盖而不是传成新模型",
 sub:"Blueprint ID、PipelineManager、Attach/Detach、PC/Quest 同 ID(已核实官方)",
 mins:11,
 tags:["Blueprint ID","蓝图ID","PipelineManager","更新","Attach","Detach","上传","重要"],
 body:`
<h4>一、改完想"更新"不是"传个新的"</h4>
<p>你上传过 avatar,改了点东西想更新——结果传成了一个全新的模型,旧的还在?或者换了电脑/重装工程,想继续更新原来那个 avatar 却接不上?这都是 <b>Blueprint ID(蓝图 ID)</b>的事。这篇讲清 ID 机制和 Attach/Detach,让你的更新覆盖到正确的 avatar。这是上传篇、SDK 面板篇的实战配套。</p>

<h4>二、PipelineManager 与 Blueprint ID(已核实)</h4>
<ul>
<li>avatar 上有个 <b>VRCPipelineManager</b> 组件,作用是"<b>store the ID of a world or avatar</b>"(存这个 avatar 的蓝图 ID)。</li>
<li>它会在需要时<b>自动添加</b>("added automatically"),通常不用你手动加。</li>
<li>Blueprint ID 是 avatar/世界的<b>唯一 ID</b>,格式固定:<b>avtr_00000000-0000-0000-0000-000000000000</b>(0 替换为 0-9/a-f),其他格式"will not be accepted"。</li>
</ul>

<h4>三、ID 决定"更新"还是"新建"(已核实+社区)</h4>
<ul>
<li>核心逻辑:<b>上传时带着同一个 Blueprint ID = 覆盖更新那个 avatar</b>;<b>没有 ID(新生成)= 创建全新 avatar</b>。</li>
<li>所以你改完模型,只要 PipelineManager 里的 ID 没变,Build & Publish 就是更新原来那个,玩家收藏的还在。</li>
<li>(社区核实)Blueprint ID <b>绑定上传账号</b>——别人上传用过的 ID 你不能用(否则就能改别人的模型了),这是安全机制。</li>
</ul>

<h4>四、Attach 按钮(已核实)</h4>
<ul>
<li>作用:<b>自动生成 Blueprint ID</b>。文档说通常不用自己建 ID,"<b>just click 'Attach' and one will be generated for you</b>"。</li>
<li>如果你<b>已有</b>一个想上传的 ID(比如换工程后想接回原 avatar),可用 "Attach (Optional)" 关联那个 ID——填进去就能继续更新原 avatar。</li>
</ul>

<h4>五、Detach 按钮(已核实+实战)</h4>
<ul>
<li>作用:想上传到<b>不同的 blueprint</b> 时用——"<b>press the Detach (Optional) button</b>"。</li>
<li>实战场景:
<ul>
<li>下载的配布模型自带别人的 ID → 上传报错(不是你的账号)→ <b>Detach</b> 后再传,生成你自己的新 avatar。</li>
<li>想把现有模型复制成一个独立的新 avatar → Detach 断开,下次上传就是新的。</li>
</ul></li>
<li>常见报错:"signed in account does not have access to the blueprint" → 就是 ID 不属于你,Detach 解决。</li>
</ul>

<h4>六、PC / Quest 双端要同一个 ID(实战,重要)</h4>
<ul>
<li>做跨平台 avatar,PC 版和 Quest 版必须用<b>同一个 Blueprint ID</b>,玩家才会自动按平台加载对应版本。</li>
<li>常见流程:<b>先传 PC 版</b>生成 ID → 复制这个 avtr_ ID → Quest 工程里把同一 ID <b>Attach</b> 进去 → 传 Quest 版。</li>
<li>如果两端用了不同 ID,会变成两个独立 avatar,Quest 用户看不到你的 PC 版(见性能安全篇的平台差异)。</li>
</ul>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>改完传成了新模型</td><td>ID 变了或 Detach 过;确认 PipelineManager 的 ID 没变</td></tr>
<tr><td>报"没有该 blueprint 权限"</td><td>ID 是别人的;Detach 后重传</td></tr>
<tr><td>换工程接不回原 avatar</td><td>把原 avtr_ID 用 Attach 填回去</td></tr>
<tr><td>Quest 版成了独立模型</td><td>两端 ID 不一致;Quest 用 PC 的同一 ID</td></tr>
<tr><td>场景里多个 PipelineManager</td><td>可能传错 blueprint;只留一个</td></tr>
<tr><td>不知道自己 avatar 的 ID</td><td>看 PipelineManager 组件,或 Content Manager</td></tr>
</table>

<h4>八、一句话总结</h4>
<p><b>Blueprint ID</b>(avtr_ 开头)是 avatar 唯一身份,存在 <b>PipelineManager</b> 组件里。<b>同 ID 上传=更新覆盖,新 ID=新建</b>。<b>Attach</b> 自动生成 ID(或填回已有 ID 接回原 avatar),<b>Detach</b> 断开关联(传别人的配布模型报权限错就 Detach)。ID 绑账号,别人的不能用。<b>PC/Quest 双端必须同一 ID</b>:先传 PC 拿 ID,Quest 端 Attach 同一 ID 再传。</p>
`
},
{
 id:"gogoloco",
 title:"GoGo Loco:坐趴躺飞的自定义移动系统",
 sub:"最流行的 locomotion 预制件,姿势/身高/飞行(官方页面已核实)",
 mins:10,
 tags:["GoGo Loco","locomotion","移动","姿势","飞行","坐","趴","预制件","Franada","进阶"],
 body:`
<h4>一、默认移动太单调</h4>
<p>VRChat 默认只能站着走——想坐下、趴着、躺平 AFK、甚至飞起来?最流行的方案是 <b>GoGo Loco</b>(作者 Franada),一个改进默认 locomotion 的预制件。装上就能在菜单里切换各种姿势和移动方式。这篇讲它是什么、能做什么、怎么装,补全 avatar 的"移动与姿态"环节(配合动画层篇的 locomotion 层、缩放篇的身高)。</p>

<h4>二、GoGo Loco 是什么(已核实)</h4>
<ul>
<li>官方描述:这个 locomotion 预制件"<b>created to improve the default controller</b>"(为改进默认控制器而生)。</li>
<li>当前版本 <b>V1.8.6</b>(作者 Franada,gumroad 发布,有免费和付费 Tribe/Chimaco 版本)。</li>
<li>本质:替换/增强 avatar 的 Base 动画层 locomotion(见动画层篇),让移动和姿势更丰富。</li>
</ul>

<h4>三、核心功能(已核实)</h4>
<ul>
<li><b>多种姿势:</b>可在菜单里循环切换("cycle between multiple poses")——<b>坐(sit)、睡/躺(sleep)、AFK</b> 等。</li>
<li><b>调整身高 / Play Space:</b>内置 play space 功能"<b>move your character up and down</b>",可像 OVR/ABT 那样上下调整身高,"perfect for small character"(适合小体型,配合缩放篇)。</li>
<li><b>飞行(Fly):</b>支持飞行模式,且 <b>Quest 兼容</b>("fly (Quest compatible!)")。</li>
<li><b>多个 toggle:</b>例如<b>关闭腿部移动</b>、<b>关掉跳跃动画</b>等(官方:"toggle to turn off legs movement or jump animation as example")。</li>
</ul>

<h4>四、安装方式(已核实)</h4>
<ul>
<li>支持 <b>VRCFury</b> 或 <b>Modular Avatar</b> 安装(见 VRCFury 篇、MA 总篇)——非破坏式,拖进去即用。</li>
<li>有第三方做的 "Auto Installer with Modular Avatar" 一键安装版,不想用 VRCFury 的可选。</li>
<li>装好后,GoGo 的功能会出现在你的表情菜单里(见菜单篇),用 Toggle/Radial 控制姿势和身高。</li>
</ul>

<h4>五、桌面端 / Quest 通用(已核实)</h4>
<ul>
<li>姿势、身高调整、飞行在 <b>desktop 或 Quest</b> 都能用("on desktop or Quest")——很多桌面玩家(无 VR 设备)靠它做出坐趴等姿势。</li>
<li>这是它流行的关键:不像很多功能依赖 VR/FBT,GoGo 桌面端也完整可用。</li>
</ul>

<h4>六、和其他系统的关系(实践)</h4>
<ul>
<li><b>vs 动画层 locomotion:</b>GoGo 本质就是一套做好的 locomotion 动画层 + 菜单,省你自己搭(见动画层篇/混合树篇)。</li>
<li><b>vs 缩放篇:</b>GoGo 的 play space 上下移动 ≈ 改变视点高度,和 avatar 缩放是两回事(缩放改模型大小,play space 改你站的高度)。</li>
<li><b>vs FBT:</b>全身追踪时姿势由真实身体驱动;GoGo 的预设姿势更适合桌面/半身玩家。</li>
</ul>

<h4>七、排查表(我整理)</h4>
<table><tr><th>需求 / 现象</th><th>解法</th></tr>
<tr><td>想坐下/趴着/躺平</td><td>装 GoGo Loco,菜单切姿势</td></tr>
<tr><td>桌面端也想摆姿势</td><td>GoGo 桌面端可用,不需要 VR</td></tr>
<tr><td>小体型踩不到地</td><td>用 play space 上下调身高</td></tr>
<tr><td>想飞(含Quest)</td><td>GoGo 飞行模式,Quest 兼容</td></tr>
<tr><td>不想用 VRCFury 装</td><td>用 MA 版或 Auto Installer</td></tr>
<tr><td>装完菜单没出现</td><td>确认 VRCFury/MA 正确合并(见对应篇)</td></tr>
</table>

<h4>八、一句话总结</h4>
<p><b>GoGo Loco</b>(Franada,V1.8.6)是最流行的 locomotion 预制件,"改进默认控制器":菜单切换<b>坐/躺/AFK 等姿势</b>、<b>play space 上下调身高</b>、<b>飞行(Quest 兼容)</b>,还有关腿部移动/跳跃等 toggle。<b>桌面端和 Quest 都能用</b>(不依赖 VR/FBT)是它流行的关键。用 <b>VRCFury 或 MA</b> 非破坏式安装,功能进表情菜单。本质是一套做好的 locomotion 动画层,省你自己搭。</p>
`
},
{
 id:"poiyomi-features",
 title:"Poiyomi 实操:发光、描边、溶解、边缘光",
 sub:"最流行 toon shader 的核心功能详解(官方功能页已核实)",
 mins:13,
 tags:["Poiyomi","shader","着色器","自发光","描边","溶解","边缘光","MatCap","AudioLink","美化","进阶"],
 body:`
<h4>一、为什么人人都用 Poiyomi</h4>
<p>着色器入门篇讲了 toon shader 的概念,而 <b>Poiyomi</b> 是 VRChat 社区事实上的标准 toon shader——做发光、描边、溶解特效、AudioLink 律动几乎都靠它。这篇按官方功能页详解 Poiyomi 的核心功能,让你知道"想做某个效果该开哪个模块"。配合着色器入门篇(基础)、AudioLink 篇(律动)、B站的 Poiyomi 系列视频(实操)。</p>

<h4>二、Emission 自发光:最多 4 槽(已核实)</h4>
<ul>
<li>官方:"<b>Up to 4 Emission Slots</b>, each with independent unique options"——最多 <b>4 个独立自发光槽</b>,各自单独配置。</li>
<li>用途:加高光或发光效果(highlights / glow)——发光眼睛、发光纹身、能量线条等。</li>
<li>4 槽意味着你能让不同部位<b>独立发光</b>(如眼睛一种颜色、符文另一种),还能各自配 AudioLink 律动。</li>
</ul>

<h4>三、Rim Light 边缘光:最多 2 个(已核实)</h4>
<ul>
<li>"<b>Up to 2 Rim Lighting effects</b>",做菲涅尔式的边缘高光/发光("fresnel-like highlights or glows around the edges")。</li>
<li>效果:模型轮廓发亮——常用来做赛博/梦幻氛围,或让角色从背景里"浮"出来。</li>
<li>还有 <b>Environmental Rim</b>:模拟环境的低角度反射,让边缘光更自然贴合场景。</li>
</ul>

<h4>四、Outline 描边:卡通轮廓(已核实)</h4>
<ul>
<li>"<b>Outline features...using the inverse-hull effect</b>"——用<b>反向外壳法</b>给模型加卡通外轮廓描边。</li>
<li>效果:动漫/卡通风的黑色(或彩色)勾边,让角色更有插画感。</li>
<li>原理:复制模型外扩一圈反面渲染——所以描边粗细、颜色可调,但太粗会穿插。</li>
</ul>

<h4>五、Dissolve 溶解:多种过渡(已核实)</h4>
<ul>
<li>"<b>Dissolve effects with various transition styles</b>"——多种溶解过渡样式(具体样式官方页未逐一列)。</li>
<li>还"<b>supports UV Tile Discarding using Dissolve</b>"——可配合 UV 平铺丢弃来按区域溶解。</li>
<li>用途:做"出现/消失"动画——换装时身体溶解过渡、召唤特效、隐身等。常配合动画/菜单(见菜单篇)触发。</li>
</ul>

<h4>六、其他高频模块(已核实)</h4>
<table><tr><th>模块</th><th>作用</th></tr>
<tr><td><b>MatCap</b>(最多4)</td><td>球面纹理快速近似质感,增强着色风格(金属/光泽)</td></tr>
<tr><td><b>Toon Shading</b></td><td>卡通着色预设:Texture Ramp / Multilayer Math / ShadeMap</td></tr>
<tr><td><b>AudioLink</b>(10+模块)</td><td>各种音频律动,含 AL Spectrum 波形投影(见 AudioLink 篇)</td></tr>
<tr><td><b>Flipbook</b></td><td>纹理数组做动画播放(序列帧特效)</td></tr>
<tr><td><b>Glitter / Decals</b></td><td>闪粉 / 贴花(最多4个)</td></tr>
<tr><td><b>VRC Light Volumes / LTCGI</b></td><td>世界光照适配</td></tr>
</table>

<h4>七、排查表(我整理)</h4>
<table><tr><th>想做的效果</th><th>开哪个模块</th></tr>
<tr><td>发光眼睛/纹身/线条</td><td>Emission(4 槽可分部位)</td></tr>
<tr><td>边缘发亮/氛围光</td><td>Rim Light(2 个)+ Environmental Rim</td></tr>
<tr><td>动漫黑边勾线</td><td>Outline(反向外壳,调粗细/颜色)</td></tr>
<tr><td>出现/消失/隐身动画</td><td>Dissolve(配菜单/动画触发)</td></tr>
<tr><td>跟音乐律动发光</td><td>Emission + AudioLink 模块(见 AudioLink 篇)</td></tr>
<tr><td>金属/光泽质感</td><td>MatCap(4 个)</td></tr>
<tr><td>描边穿插模型</td><td>描边太粗;调细 Outline width</td></tr>
</table>

<h4>八、一句话总结</h4>
<p><b>Poiyomi</b> 是 VRChat 标准 toon shader,核心模块:<b>Emission</b>(最多4槽独立发光,分部位)、<b>Rim Light</b>(最多2个,菲涅尔边缘光,+Environmental Rim)、<b>Outline</b>(反向外壳卡通描边)、<b>Dissolve</b>(多种溶解过渡,支持 UV Tile Discard)。还有 MatCap(质感)、Toon Shading(卡通着色)、AudioLink(10+律动模块)、Flipbook(序列帧)、Glitter/Decals 等。想做某效果先找对应模块,发光+AudioLink 可做音乐律动。基础见着色器入门篇,实操配 B站 Poiyomi 系列。</p>
`
},
{
 id:"liltoon-vs-poiyomi",
 title:"lilToon:轻量 toon shader,和 Poiyomi 怎么选",
 sub:"MIT 开源、预设系统、自动轻量化(官方页面已核实)",
 mins:11,
 tags:["lilToon","shader","着色器","Poiyomi","轻量","预设","MIT","Quest","选型","进阶"],
 body:`
<h4>一、不是只有 Poiyomi 一个选择</h4>
<p>Poiyomi 功能强但模块多、上手稍重。社区另一主流 toon shader 是 <b>lilToon</b>(作者 lilxyzw)——更轻量、有预设系统、对新手友好,日系模型尤其常用。这篇讲 lilToon 是什么、和 Poiyomi 怎么选,帮你按需求挑着色器。配合着色器入门篇(概念)、Poiyomi 篇(对比)、B站的 lilToon 系列视频。</p>

<h4>二、lilToon 是什么(已核实)</h4>
<ul>
<li>官方定位:为 avatar 类服务开发的<b>多功能 toon shader</b>,标语 "Feature-rich shaders for avatars"。</li>
<li><b>MIT 许可证</b>开源(Copyright 2020-present lilxyzw),通过 <b>BOOTH 和 VCC</b> 分发,源码在 GitHub。</li>
<li>MIT 意味着<b>免费、可商用、可改</b>——这是它被大量配布模型采用的原因之一(配布无授权顾虑,见许可篇)。</li>
</ul>

<h4>三、核心功能(已核实)</h4>
<ul>
<li><b>预设系统:</b>一键从预设套用配置,还能<b>保存自己的预设</b>——一个材质调好后可一键复用到别的材质。这是 lilToon 上手快的关键。</li>
<li><b>颜色调整:</b>面向改模的改色功能,且能把<b>调好的颜色导出成贴图</b>(配合重绘篇的改色思路)。</li>
<li><b>抗锯齿着色:</b>平滑渲染日系动漫风着色("anti-aliased shading")。</li>
<li><b>VRSNS 适配:</b>防止高光过曝(blown-out highlights)、防止半透明物体(如水)后面的穿透显示。</li>
</ul>

<h4>四、轻量与稳定(已核实,重点)</h4>
<ul>
<li><b>自动轻量化:</b>编辑器会<b>自动重写 shader</b>,按开关排除未用功能,"minimize load and keep build size down"——降低 avatar 容量(见性能安全篇)。这是 lilToon 主打的优势。</li>
<li><b>稳定:</b>支持 Unity 所有光照、亮度接近 Standard Shader,覆盖<b>宽 Unity 版本范围</b>。</li>
<li>对 Quest/性能敏感场景,这种"只编译用到的功能"的设计很有价值。</li>
</ul>

<h4>五、lilToon vs Poiyomi 怎么选(实践对比)</h4>
<table><tr><th>维度</th><th>lilToon</th><th>Poiyomi</th></tr>
<tr><td>定位</td><td>轻量、预设、新手友好</td><td>功能极全、模块多</td></tr>
<tr><td>许可</td><td>MIT 开源免费</td><td>免费版+Pro 版</td></tr>
<tr><td>上手</td><td>预设一键,快</td><td>参数多,学习曲线陡</td></tr>
<tr><td>极限特效</td><td>够用</td><td>更多(AudioLink/Dissolve 等丰富)</td></tr>
<tr><td>常见场景</td><td>日系模型、配布默认</td><td>欧美系、追求特效</td></tr>
</table>
<ul>
<li>注意:两者可用插件<b>互转材质</b>(B站有 liltoon 转 poi / poi 转 liltoon 教程)——拿到配布模型用哪个不必纠结。</li>
<li>选择建议:求快/求轻/日系 → lilToon;求极限特效/已熟悉 → Poiyomi。两个都装、按模型来也很常见。</li>
</ul>

<h4>六、排查表(我整理)</h4>
<table><tr><th>需求 / 现象</th><th>解法</th></tr>
<tr><td>新手想快速上色</td><td>lilToon 预设系统,一键套用</td></tr>
<tr><td>多材质统一风格</td><td>lilToon 保存预设复用</td></tr>
<tr><td>Quest/性能吃紧</td><td>lilToon 自动排除未用功能,轻量</td></tr>
<tr><td>配布模型材质是另一种shader</td><td>用 liltoon↔poi 互转插件</td></tr>
<tr><td>高光过曝/水后穿透</td><td>lilToon 有对应 VRSNS 适配选项</td></tr>
<tr><td>想要极致特效</td><td>选 Poiyomi(见 Poiyomi 篇)</td></tr>
</table>

<h4>七、和许可篇的联系(实践)</h4>
<ul>
<li>lilToon 是 <b>MIT</b>,你做配布模型带 lilToon 材质没有授权风险。</li>
<li>但<b>模型本体、贴图</b>的授权另算(见许可与配布篇)——shader 免费不代表整个模型能随便发。</li>
</ul>

<h4>八、一句话总结</h4>
<p><b>lilToon</b>(lilxyzw,<b>MIT 开源免费</b>)是和 Poiyomi 并列的主流 toon shader,主打<b>轻量+预设+新手友好</b>:预设系统一键套用并可保存复用、改色可导出贴图、抗锯齿着色、防高光过曝。最大优势是<b>编辑器自动重写 shader 排除未用功能</b>,降低 avatar 容量(对 Quest/性能友好)。选型:求快/求轻/日系选 lilToon,求极限特效选 Poiyomi,两者可插件互转材质。</p>
`
},
{
 id:"shape-changer-toggle",
 title:"MA Shape Changer:穿衣不穿模、形态切换、减面",
 sub:"反应式改形态键,Set 收缩 / Delete 删面(已核实官方)",
 mins:12,
 tags:["Modular Avatar","Shape Changer","形态键","blendshape","穿模","减面","反应式","换装","进阶"],
 body:`
<h4>一、穿衣服露出身体、变身切形态怎么做</h4>
<p>穿上紧身衣,身体从衣服缝里挤出来(穿模)?或者想做"变身"切换不同体型?这靠 <b>MA Shape Changer</b>——非破坏式地改 blendshape 形态键(见形态键基础篇),配合开关/菜单实现穿衣收身、形态切换、还能顺带减面。这篇讲清它的 Set/Delete 两模式和反应式机制。配合 MA 总篇、形态键篇、菜单篇。</p>

<h4>二、Shape Changer 是什么(已核实)</h4>
<ul>
<li>作用:启用时<b>修改 avatar 上另一个渲染器的形态键</b>("modifies the shape keys (blendshapes) of another renderer on the avatar, when... enabled")。</li>
<li>它是 <b>Reactive Component(反应式组件)</b>——响应所在物体及父级的<b>启停/动画</b>,不用手动建动画。</li>
<li>配置:把要调整的渲染器(如身体网格)放进 <b>Target Renderer</b>,用 + 选 blendshape。</li>
</ul>

<h4>三、Set 与 Delete 两种模式(已核实,核心)</h4>
<table><tr><th>模式</th><th>行为</th><th>用途</th></tr>
<tr><td><b>Set</b></td><td>激活时把 blendshape 设到指定数值</td><td>收缩身体某部位(穿衣收身)</td></tr>
<tr><td><b>Delete</b></td><td>删除受该 blendshape 影响的多边形</td><td>彻底删掉被遮挡部分,减面</td></tr>
</table>
<ul>
<li>关键区别:<b>Delete 若不被动画控制,会真正减少面数</b>("reduce the polygon count... performance benefit");若被动画控制,只是隐藏不减统计面数。</li>
<li>经验:当某 blendshape 几乎把某部位缩没了,就用 <b>Delete</b> 而非 Set——既不穿模又省面(见性能安全篇)。</li>
</ul>

<h4>四、最常见用途:穿衣不穿模(已核实)</h4>
<ul>
<li>官方定位:用在<b>服装网格上</b>,删除或收缩"被服装遮挡或与之冲突的身体部分"。</li>
<li>典型:穿紧身衣 → Shape Changer 把身体对应部位收缩(Set)或删掉(Delete)→ 不再从衣服里挤出来。</li>
<li>因为是反应式:衣服开关一开,收身/删面<b>自动跟着生效</b>;关掉衣服,身体恢复——无需手动连动画。</li>
</ul>

<h4>五、Threshold 与注意事项(已核实)</h4>
<ul>
<li><b>Threshold:</b>调节哪些顶点算"受影响"。Delete 删得不够干净时,<b>调低 Threshold</b>。</li>
<li>重要:<b>不要用它改已被其他动画控制的 blendshape</b>——那种情况应该改成"动画化这个组件所在物体的开关"(用 Object Toggle 等反应式组件配合)。</li>
<li>它配合 <b>Object Toggle / Menu Item</b>(见 MA 进阶篇)一起用,组成完整换装反应。</li>
</ul>

<h4>六、做"变身/双形态"切换(实践)</h4>
<ul>
<li>思路:不同形态各做一组 blendshape 状态,用菜单 Toggle(见菜单篇)切换控制 Shape Changer 所在物体的启停。</li>
<li>B站有"强化道具双形态切换""MA Shape Changer 控制形态键"等实操(见相关 B站直链)。</li>
<li>注意区分:Shape Changer 是<b>反应式设默认/删面</b>;运行时连续变化(如渐变变大)仍要用动画+混合树(见混合树篇)。</li>
</ul>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象 / 需求</th><th>解法</th></tr>
<tr><td>穿衣身体挤出来</td><td>Shape Changer 收缩对应部位(Set)</td></tr>
<tr><td>被遮挡部分想减面</td><td>用 Delete(不被动画控制才减面)</td></tr>
<tr><td>Delete 删不干净</td><td>调低 Threshold</td></tr>
<tr><td>做双形态变身</td><td>菜单 Toggle 控制组件物体启停</td></tr>
<tr><td>改的形态键被动画占用了</td><td>别用 Shape Changer 改;改动画化物体开关</td></tr>
<tr><td>开关衣服没自动收身</td><td>确认 Shape Changer 在衣服物体层级下(反应式)</td></tr>
</table>

<h4>八、一句话总结</h4>
<p><b>MA Shape Changer</b> 是<b>反应式组件</b>,启用时改另一渲染器的 blendshape:<b>Set</b>(设到指定值,收缩身体)或 <b>Delete</b>(删多边形,不被动画控制时真减面省性能)。最常见用途是<b>穿衣收身/删面防穿模</b>——衣服开关一开自动生效,不用手连动画。Delete 删不净调低 Threshold;别用它改已被动画控制的 blendshape(改成动画化物体开关)。做双形态变身用菜单 Toggle 控制它启停。</p>
`
},
{
 id:"particle-effects",
 title:"粒子特效:手部光效、武器拖尾、眼部特效",
 sub:"Unity 粒子系统在 avatar 上的限制与做法(性能数字已核实)",
 mins:12,
 tags:["粒子","Particle System","特效","手部特效","拖尾","性能","限制","进阶"],
 body:`
<h4>一、特效都是粒子系统做的</h4>
<p>手上的光、武器挥动的拖尾、眼睛的星光、释放技能的爆发——这些几乎都是 Unity <b>Particle System(粒子系统)</b>做的。但 VRChat 对 avatar 粒子有<b>硬性性能限制</b>,超了会被整体移除。这篇讲清粒子系统在 avatar 上的限制数字和实操要点,让你的特效既好看又不被砍。配合性能安全篇、Poiyomi 篇(粒子材质)。</p>

<h4>二、粒子系统是什么(基础)</h4>
<ul>
<li>Unity 内置组件,发射大量小图片/网格(粒子),通过生命周期、速度、颜色、大小曲线做出动态效果。</li>
<li>在 avatar 上:挂到某个物体,配合动画/菜单(见菜单篇)开关——比如按个键手上冒光。</li>
<li>粒子材质常用 Poiyomi 或加色(Additive)着色器做发光感(见 Poiyomi 篇)。</li>
</ul>

<h4>三、性能评级的粒子限制(PC,已核实,关键)</h4>
<table><tr><th>指标</th><th>Excellent</th><th>Good</th><th>Medium</th><th>Poor</th></tr>
<tr><td>粒子系统数量</td><td>0</td><td>4</td><td>8</td><td>16</td></tr>
<tr><td>总活跃粒子数</td><td>0</td><td>300</td><td>1000</td><td>2500</td></tr>
<tr><td>粒子网格多边形</td><td>0</td><td>1000</td><td>2000</td><td>5000</td></tr>
<tr><td>Trails(拖尾)开启</td><td>否</td><td>否</td><td>可</td><td>可</td></tr>
<tr><td>Collision(碰撞)开启</td><td>否</td><td>否</td><td>可</td><td>可</td></tr>
</table>
<ul>
<li>任一项超标就<b>被降到下一级评级</b>("bumped into the next rank")。</li>
<li>总活跃粒子数 = 各粒子系统 <b>maxParticles 之和</b>。所以控制每个系统的 Max Particles 很重要。</li>
<li>要进 Excellent 评级,<b>粒子系统数量必须为 0</b>——有任何粒子最高只能 Good。</li>
</ul>

<h4>四、超限的后果:全部移除(已核实,重要)</h4>
<ul>
<li>在 Minimum Displayed Performance Rank 机制下,如果总粒子数/粒子多边形/Trails/Collision 超过对方设置的显示门槛,结果是 <b>"All Particle Systems removed"</b>——<b>移除全部粒子系统</b>,不是替换整个 avatar。</li>
<li>意思:特效做太重,在别人眼里你的特效<b>直接消失</b>(但模型还在)。所以特效要克制。</li>
<li>对照参数同步/动骨等是各自的限制(见性能安全篇),粒子是单独一类。</li>
</ul>

<h4>五、控制粒子开销的实操(实践)</h4>
<ul>
<li><b>压 Max Particles:</b>每个系统的 maxParticles 设到实际需要的最小值——总和直接决定评级。</li>
<li><b>少开 Trails/Collision:</b>这两项一开就掉到 Medium 以下;非必要不开。</li>
<li><b>合并系统:</b>能用一个粒子系统做的别拆成多个(数量也算评级)。</li>
<li><b>网格粒子省面:</b>Mesh 粒子的多边形会累计,用简单网格或改用 Billboard。</li>
<li><b>默认关闭:</b>特效平时关,用菜单 Toggle 需要时才开(见菜单篇)——降低常驻开销。</li>
</ul>

<h4>六、Quest / 移动端(实践)</h4>
<ul>
<li>移动端对粒子更严格,很多重特效在 Quest 上会被砍(见性能安全篇的平台差异)。</li>
<li>做跨平台特效要更克制,或 Quest 版直接精简掉(配合蓝图 ID 篇的双端同 ID)。</li>
</ul>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象 / 需求</th><th>原因 / 解法</th></tr>
<tr><td>别人看不到我的特效</td><td>粒子超限被全移除;压 Max Particles/减系统数</td></tr>
<tr><td>评级一直到不了 Excellent</td><td>有粒子最高 Good;Excellent 需 0 粒子系统</td></tr>
<tr><td>加了拖尾就掉评级</td><td>Trails 开启=Medium 以下;非必要关</td></tr>
<tr><td>粒子多边形超标</td><td>用简单网格或 Billboard 粒子</td></tr>
<tr><td>特效平时也吃性能</td><td>默认关,菜单 Toggle 按需开</td></tr>
<tr><td>Quest 上特效没了</td><td>移动端更严;Quest 版精简</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>特效=Unity <b>粒子系统</b>,但 avatar 有硬限制(PC):粒子系统数 <b>0/4/8/16</b>、总粒子数 <b>0/300/1000/2500</b>、粒子多边形 <b>0/1000/2000/5000</b>(Excellent/Good/Medium/Poor),<b>Trails/Collision</b> 一开就 Medium 以下。超标会被<b>全部移除</b>(特效在别人眼里消失,模型还在)。实操:压 Max Particles、少开 Trails/Collision、合并系统、默认关用菜单开。Quest 更严要精简。要 Excellent 评级则不能有任何粒子。</p>
`
},
{
 id:"face-eye-tracking",
 title:"面部追踪与眼追:让表情活起来",
 sub:"OSC 传 blendshape、VRCFT、硬件、Selfie Expression(官方 Wiki 已核实)",
 mins:12,
 tags:["面部追踪","眼追","Face Tracking","VRCFaceTracking","OSC","Quest Pro","表情","Selfie","进阶"],
 body:`
<h4>一、让模型脸跟着你动</h4>
<p>普通模型只有手势触发的固定表情,而<b>面部追踪</b>能让模型的眼睛、嘴、眉毛实时跟着你真实的脸动——说话有口型、笑有笑脸、眨眼同步。这是社交沉浸感的飞跃。这篇讲面部追踪/眼追怎么工作、要什么硬件软件、模型端要准备什么。配合 OSC 篇(传输机制)、口型篇、参数篇。</p>

<h4>二、面部追踪是什么(已核实)</h4>
<ul>
<li>用硬件+软件捕捉你真实表情,实时映射到 avatar——"reflecting eye movement, mouth shapes, and other facial features"。</li>
<li>通常分两部分:<b>眼动追踪</b>(eye tracking)和<b>嘴部/面部追踪</b>。</li>
<li>它让虚拟社交更生动,是高端玩家的标配。</li>
</ul>

<h4>三、怎么工作:OSC 传 blendshape(已核实,核心)</h4>
<ul>
<li>捕捉到的面部数据转成 <b>blendshape 数值</b>,通过 <b>OSC</b> 发给 VRChat——"External tracking software sends blendshape data to VRChat over OSC"(见 OSC 篇)。</li>
<li>原生支持的头显(如 <b>Quest Pro</b>)可<b>直接发送数据</b>,不必额外桥接软件。</li>
<li>所以面部追踪本质是 OSC 应用的一种——理解了 OSC 就理解了它的管道。</li>
</ul>

<h4>四、需要什么软件(已核实)</h4>
<ul>
<li>社区最常用 <b>VRCFaceTracking(VRCFT)</b>——它"acts as a bridge between tracking software and VRChat"(在追踪软件和 VRChat 之间架桥)。</li>
<li>早期还用 iFacialMocap(iPhone)、VSeeFace(PC)等第三方工具。</li>
<li>VRCFT 会自动把游戏 OSC 开关设为 Enabled(见 OSC 篇)。</li>
</ul>

<h4>五、支持哪些硬件(已核实)</h4>
<table><tr><th>类型</th><th>设备</th></tr>
<tr><td>内置面+眼追</td><td>Meta Quest Pro、Apple Vision Pro(ARKit)、Varjo XR-4</td></tr>
<tr><td>眼追+可选面捕模块</td><td>HTC Vive 系列、Pimax Crystal 等</td></tr>
<tr><td>仅眼动</td><td>BigScreen Beyond 2e</td></tr>
</table>
<p>(文档未提 Pico。具体以官方 Wiki 兼容列表为准。)</p>

<h4>六、模型端要准备什么(已核实)</h4>
<ul>
<li>avatar 必须配置三类要素:
<ul>
<li><b>Visemes</b>(口型同步,见口型篇);</li>
<li><b>表情 blendshapes</b>(表达情绪,见形态键篇);</li>
<li>在 <b>VRChat SDK</b> 里设置好<b>眼部与头部追踪</b>支持。</li>
</ul></li>
<li>面捕模型通常还要一整套 ARKit 标准 blendshape(jaw open、eye blink 等),配布的"面捕版"模型已做好这些(见 B站面捕适配教程)。</li>
</ul>

<h4>七、Selfie Expression:没设备也能动(已核实)</h4>
<ul>
<li>VRChat 内置功能,用<b>普通摄像头</b>追踪表情:"uses a standard webcam to track facial expressions on desktop and mobile"。</li>
<li>可用版本:<b>Android 2024.4.2、PC 2025.1.3 起</b>。</li>
<li>意义:桌面/移动端玩家<b>没有专用面捕硬件</b>也能让脸动起来,门槛大幅降低。</li>
</ul>

<h4>八、一句话总结</h4>
<p><b>面部追踪</b>让模型实时反映你的眼动、嘴型、表情。原理:追踪软件把<b>blendshape 数值经 OSC</b> 发给 VRChat(Quest Pro 等可原生直发)。软件最常用 <b>VRCFaceTracking(VRCFT)</b>桥接。硬件:Quest Pro/Vision Pro/Varjo 内置面眼追,Vive/Pimax 眼追+面捕模块。模型端需配好 <b>Visemes + 表情 blendshape + SDK 眼/头追踪</b>。无专用设备?用内置 <b>Selfie Expression</b>(普通摄像头,PC 2025.1.3 起)。本质是 OSC 应用,见 OSC 篇。</p>
`
},
{
 id:"pickup-props",
 title:"可抓取道具:让眼镜、剑、烟能拿起来",
 sub:"VRCPickup 四件套、Auto Hold、Object Sync(官方已核实)",
 mins:11,
 tags:["Pickup","VRCPickup","道具","抓取","手持","Object Sync","Rigidbody","物品","进阶"],
 body:`
<h4>一、想把道具拿在手里</h4>
<p>给模型加副眼镜能摘下来戴上、一把剑能抽出来挥、一根烟能拿在手上——这些"可抓取道具"靠 <b>VRCPickup</b> 组件实现。注意它原本是世界(world)组件,在 avatar 上用有讲究。这篇讲清 pickup 需要哪些组件、怎么配、抓取方式和同步问题。配合 Contacts 篇(接触触发)、菜单篇(道具开关)。</p>

<h4>二、VRCPickup 是什么(已核实)</h4>
<ul>
<li>作用:让物体可被<b>抓取/使用</b>("so you can grab/use the object in VRChat")。</li>
<li>它是把任意物体变"可拿"的核心组件——眼镜、武器、道具都靠它。</li>
<li>注意:VRCPickup 是<b>世界组件</b>,放在 avatar 上有些行为受限(他人能否拿、跨平台等),很多 avatar 道具改用 Contacts/约束方案模拟(见 Contacts 篇)。</li>
</ul>

<h4>三、一个 pickup 需要四件套(已核实,核心)</h4>
<table><tr><th>组件</th><th>作用</th><th>必需?</th></tr>
<tr><td><b>Rigidbody</b></td><td>物理计算</td><td>必需</td></tr>
<tr><td><b>Collider</b></td><td>碰撞检测(才能被抓到)</td><td>必需</td></tr>
<tr><td><b>VRCPickup</b></td><td>使物体可抓取/使用</td><td>必需</td></tr>
<tr><td><b>VRC Object Sync</b></td><td>物体位置在玩家间同步</td><td>可选</td></tr>
</table>
<ul>
<li>少了 Rigidbody 或 Collider,物体抓不起来——这是新手最常见的漏配。</li>
</ul>

<h4>四、Object Sync 与所有权(已核实,易踩坑)</h4>
<ul>
<li>VRC Object Sync 让物体位置<b>在玩家间同步</b>("synced between players")。</li>
<li>关键:每个同步物体<b>必须有一个所有者(owner)</b>。这就是为什么——道具在<b>自己手里很顺</b>,但如果上一个持有者是别人,你看它会<b>卡顿</b>(所有权还没转到你这)。</li>
<li>理解这点能解释大量"道具在别人那卡/不同步"的现象。</li>
</ul>

<h4>五、Is Kinematic 与抓取方式(已核实)</h4>
<ul>
<li><b>Is Kinematic:</b>开启后物体只能由玩家互动移动,不与其他物体碰撞(但别的物体会撞它)、不受物理力——适合枕头这类。</li>
<li><b>Auto Hold:</b>(官方 pickup 文档)勾选后物体在第一次"grab"时贴到手上,再次 grab 才放下——适合要一直拿着的道具。</li>
<li><b>抓取对齐:</b>默认 <b>freehand</b>(贴在你手抓的位置),也可设成<b>强制对齐</b>到固定姿势(如枪的握把位置)。</li>
</ul>

<h4>六、avatar 道具的现实做法(实践)</h4>
<ul>
<li>纯 VRCPickup 在 avatar 上让<b>别人拿</b>较复杂,社区常用:
<ul>
<li><b>Contacts + 约束</b>:摸到触发,道具吸附到手(见 Contacts 篇);</li>
<li><b>菜单 Toggle</b>:开关道具显隐,不一定要"物理抓"(见菜单篇);</li>
<li>第三方<b>物品/武器 pickup 系统</b>预制件(让他人能像世界物体一样拿你身上的道具)。</li>
</ul></li>
<li>选哪种看需求:自己戴脱→Toggle/Contacts;要给别人玩→pickup 系统预制件。</li>
</ul>

<h4>七、排查表(我整理)</h4>
<table><tr><th>现象 / 需求</th><th>原因 / 解法</th></tr>
<tr><td>道具抓不起来</td><td>缺 Rigidbody 或 Collider</td></tr>
<tr><td>道具在别人那卡顿</td><td>Object Sync 所有权未转移(正常机制)</td></tr>
<tr><td>想一抓就一直拿着</td><td>勾 Auto Hold</td></tr>
<tr><td>枪要握把对齐手</td><td>用强制对齐(非 freehand)</td></tr>
<tr><td>道具乱飞/被撞</td><td>开 Is Kinematic</td></tr>
<tr><td>要给别人拿身上的道具</td><td>用 pickup 系统预制件</td></tr>
<tr><td>只是自己戴脱</td><td>菜单 Toggle 更简单</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>可抓取道具靠 <b>VRCPickup</b>(世界组件),一个 pickup 四件套:<b>Rigidbody</b>(物理)+<b>Collider</b>(碰撞)+<b>VRCPickup</b>(可抓)+可选 <b>VRC Object Sync</b>(同步)。抓不起来通常是缺 Rigidbody/Collider。Object Sync 物体<b>必须有所有者</b>,所以道具在别人那会卡(所有权机制)。<b>Auto Hold</b> 一抓就持续拿、<b>Is Kinematic</b> 防乱飞、抓取可 freehand 或强制对齐。avatar 道具现实中常用 <b>Contacts/约束/菜单 Toggle</b> 或 pickup 系统预制件代替纯 VRCPickup。</p>
`
},
{
 id:"face-customization",
 title:"捏脸:改脸型不崩口型的正确姿势",
 sub:"脸型 blendshape 与 viseme 冲突的根因与修复",
 mins:11,
 tags:["捏脸","face","脸型","blendshape","viseme","口型","表情","MMD","进阶"],
 body:`
<h4>一、捏脸为什么会把口型搞崩</h4>
<p>很多人捏完脸(改脸型)后发现:说话口型对不上、表情扭曲、导入 MMD 动作时脸崩坏。根因是<b>脸型 blendshape 和口型/表情 blendshape 在同一网格上互相干扰</b>。这篇讲清捏脸的原理、为什么会崩、以及怎么避免。配合形态键篇、口型篇、面部追踪篇。</p>

<h4>二、捏脸是什么(实践)</h4>
<ul>
<li>捏脸 = 调整脸部的 <b>blendshape(形态键)</b>:眼睛大小、脸宽、鼻梁、嘴型等(见形态键基础篇)。</li>
<li>两种做法:
<ul>
<li><b>定型</b>:用工具(如 MA Shape Changer,见 Shape Changer 篇)把脸型 blendshape 设到你要的默认值,固定下来;</li>
<li><b>可调</b>:做成菜单 Radial 参数,游戏内实时拉滑条捏(见菜单篇)。</li>
</ul></li>
</ul>

<h4>三、口型系统的基础(已核实)</h4>
<ul>
<li>VRChat 口型(viseme)有两种模式:<b>下颌骨(jaw-flap bone)</b>或<b>基于 blendshape 的 visemes</b>——"Both are still present and work just fine."</li>
<li>下颌骨角度现在<b>可自定义</b>("configure the angle of the jaw-flap bone viseme")。</li>
<li>Avatars 3.0 有个 <b>Viseme animator 参数</b>指示当前该播哪个口型,"if you can animate it, you can use it in a viseme",且该参数"updated in all viseme modes"。</li>
<li>(注:具体 15 个 viseme 名称未在该官方页核实,以 VRChat 口型专门文档为准。)</li>
</ul>

<h4>四、崩坏的根因(实践,重点)</h4>
<ul>
<li><b>blendshape 数值叠加:</b>口型用的是 blendshape,捏脸改的也是 blendshape。如果捏脸 blendshape <b>影响了嘴部区域的顶点</b>,它和 viseme blendshape 同时作用时数值叠加,嘴型就<b>变形/崩坏</b>。</li>
<li><b>MMD 口型冲突:</b>MMD 舞蹈动作自带一套口型/表情 blendshape 动画。如果你的捏脸改了同名或同区域 blendshape,跳 MMD 时脸会<b>崩</b>(B站有专门"修复捏脸后 MMD 口型崩坏"教程)。</li>
<li>本质:<b>多个动画/默认值在同一 blendshape 或同一批顶点上打架</b>。</li>
</ul>

<h4>五、避免崩坏的做法(实践)</h4>
<ul>
<li><b>捏脸优先用骨骼而非嘴区 blendshape:</b>能用脸骨缩放调的(脸宽、下巴)就别用会动到嘴的 blendshape。</li>
<li><b>避开 viseme 用到的 blendshape:</b>捏脸时不要改 viseme/表情会用到的那些形态键。</li>
<li><b>用 Shape Changer 定型:</b>把脸型用 Shape Changer 设默认值(反应式,不占动画层,见 Shape Changer 篇),减少和动画的冲突面。</li>
<li><b>MMD 模型留好原口型:</b>做 MMD 用途时保留原始 viseme/MMD blendshape 不动,捏脸另开 blendshape。</li>
<li><b>改完测试:</b>说话测口型、跳段 MMD 测表情(见本地测试篇)。</li>
</ul>

<h4>六、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>捏脸后说话口型对不上</td><td>捏脸 blendshape 动到嘴区;避开 viseme 形态键</td></tr>
<tr><td>跳 MMD 脸崩坏</td><td>捏脸改了 MMD 口型同名/同区 blendshape;保留原口型</td></tr>
<tr><td>表情扭曲</td><td>捏脸与表情 blendshape 顶点冲突</td></tr>
<tr><td>想固定脸型</td><td>用 MA Shape Changer 设默认(反应式)</td></tr>
<tr><td>想游戏内实时捏</td><td>做成菜单 Radial 参数</td></tr>
<tr><td>脸宽/下巴想调</td><td>优先用脸骨缩放,别用嘴区 blendshape</td></tr>
</table>

<h4>七、和其他系统的联系</h4>
<ul>
<li>捏脸是<b>形态键</b>的应用(见形态键篇),冲突涉及<b>口型/表情</b>(见口型篇),定型可用 <b>Shape Changer</b>(见 Shape Changer 篇),面捕模型的捏脸还要兼容 <b>ARKit blendshape</b>(见面部追踪篇)。</li>
<li>这是一个典型的"多系统共用 blendshape"问题——理解 blendshape 叠加就理解了根因。</li>
</ul>

<h4>八、一句话总结</h4>
<p>捏脸 = 调脸部 <b>blendshape</b>(定型用 Shape Changer,实时用菜单 Radial)。崩口型的<b>根因是 blendshape 叠加</b>:捏脸若动到<b>嘴区/viseme/表情用到的顶点</b>,和口型动画同时作用就变形,跳 MMD 同名 blendshape 冲突更明显。避免:捏脸<b>优先用脸骨</b>、避开 viseme 形态键、用 Shape Changer 定型、MMD 用途保留原口型、改完测口型+MMD。口型有 jaw-flap bone 和 blendshape visemes 两种模式(已核实),本质是多系统共用 blendshape 要避免打架。</p>
`
},
{
 id:"color-customization",
 title:"一键换色:Hue Shift 做彩虹滑条",
 sub:"Poiyomi 色相偏移 + VRCFury/菜单 Radial(官方步骤已核实)",
 mins:11,
 tags:["换色","Hue Shift","色相","Poiyomi","VRCFury","菜单","Radial","材质","进阶"],
 body:`
<h4>一、想给衣服/头发一键换色</h4>
<p>想在游戏内拖个滑条就让衣服、头发、瞳色实时变色,甚至循环出整条彩虹?这靠着色器的 <b>Hue Shift(色相偏移)</b>配合菜单参数实现,不用做几十张不同颜色的贴图。这篇用 Poiyomi + VRCFury 的官方流程讲清"一键换色"。配合 Poiyomi 篇、菜单篇、VRCFury 篇。</p>

<h4>二、原理:色相偏移而非换贴图(实践)</h4>
<ul>
<li>Hue Shift 是着色器对<b>整张贴图的色相做旋转</b>:0 是原色,转一圈回到原色。</li>
<li>所以一个材质能<b>循环出所有颜色</b>,无需为每种颜色单独做贴图——省容量、省工。</li>
<li>把这个 hue shift 值接到<b>菜单 Radial 滑条</b>,就能游戏内实时调。</li>
</ul>

<h4>三、关键前提:材质锁定 + Animated(已核实)</h4>
<ul>
<li>Poiyomi 属性默认不能被动画驱动。要让 hue shift 可调,先在材质里<b>右键该属性 → 设为 "Animated (when locked)"</b>。</li>
<li><b>锁定材质(lock)是关键</b>:只有标成 "Animated (when locked)" 并锁定后,该属性才能被滑条/参数驱动。</li>
<li>这解释了大量"我做了换色滑条但没反应"——属性没设 Animated 或材质没锁。</li>
</ul>

<h4>四、官方完整步骤(已核实,核心)</h4>
<ol>
<li>Poiyomi 材质找到 <b>hue shift</b>,右键设为 <b>"Animated (when locked)"</b>。</li>
<li>再右键该属性 → <b>"Copy Property Name"</b> 复制属性名(注意:属性名和 inspector 显示的文字<b>不一样</b>)。</li>
<li>在网格上加 <b>VRCFury Toggle</b> 组件,add 选 <b>"Material Property"</b>,把复制的属性名粘进 property 框。</li>
<li>Options 里勾 <b>"Use Slider Wheel"</b> → 菜单上变成 <b>radial 滑条</b>,能实时调色相。</li>
<li>想不被换世界/重启重置,勾 <b>"Save Between Worlds"</b>(参数持久化)。</li>
<li>Poiyomi 把值设为 1,色相会"cycles through all the hues until it gets back to the initial color at 1"。</li>
<li>用 <b>gesture manager</b> 测试效果(见本地测试篇)。</li>
</ol>

<h4>五、进阶玩法(实践)</h4>
<ul>
<li><b>分区换色:</b>想只改衣服不改皮肤——把要换色的部分用<b>单独材质</b>(见材质合并篇的反向:分材质),只给那个材质做 hue shift。</li>
<li><b>多个滑条:</b>衣服、头发、瞳色各一个 hue shift 参数,做多个 radial(注意参数内存,见菜单/参数篇)。</li>
<li><b>预设几种固定色:</b>不用滑条,用几个 Toggle 切换固定 hue 值,做"配色方案"切换。</li>
<li>lilToon 也有类似改色(见 lilToon 篇),思路相同:属性可动画 + 菜单参数。</li>
</ul>

<h4>六、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>做了滑条但颜色不变</td><td>属性没设 Animated(when locked)或材质没锁</td></tr>
<tr><td>属性名粘了没用</td><td>要用 Copy Property Name 的名,非 inspector 显示文字</td></tr>
<tr><td>换世界后颜色重置</td><td>勾 Save Between Worlds</td></tr>
<tr><td>换色把皮肤也染了</td><td>换色部分要用单独材质</td></tr>
<tr><td>想要彩虹循环</td><td>hue shift 值范围设到 1(转一整圈)</td></tr>
<tr><td>参数不够用</td><td>合并/精简参数(见参数内存篇)</td></tr>
</table>

<h4>七、和其他系统的联系</h4>
<ul>
<li>换色本质是<b>着色器属性</b>(见 Poiyomi/lilToon 篇)+<b>动画驱动</b>(材质锁定)+<b>菜单参数</b>(见菜单篇)的组合。</li>
<li>用 VRCFury 做最省事(见 VRCFury 篇),也可纯手动建动画+菜单。</li>
<li>参数要占内存,做多个换色滑条注意总量(见参数内存篇)。</li>
</ul>

<h4>八、一句话总结</h4>
<p>一键换色靠着色器 <b>Hue Shift(色相偏移)</b>:对整张贴图旋转色相,一个材质循环出所有颜色,无需多张贴图。Poiyomi 官方流程:属性右键设 <b>"Animated (when locked)"</b> → <b>Copy Property Name</b> → VRCFury Toggle 加 <b>Material Property</b> 粘属性名 → 勾 <b>Use Slider Wheel</b> 变 radial 滑条 → 勾 Save Between Worlds 防重置 → 值设 1 转整圈彩虹 → gesture manager 测。<b>材质必须锁定</b>且属性设 Animated 才生效(换色没反应的头号原因)。分区换色用单独材质,注意参数内存。</p>
`
},
{
 id:"pbr-realistic-material",
 title:"写实材质:PBR、金属度、法线、自发光",
 sub:"PBR 贴图通道与写实风格在 VRChat 的取舍",
 mins:12,
 tags:["写实","PBR","金属度","metallic","法线","normal","自发光","emission","材质","进阶"],
 body:`
<h4>一、想做写实风而不是卡通风</h4>
<p>大多数 VRChat 模型用 Poiyomi/lilToon 走<b>卡通(toon)风</b>,但你想要写实皮肤、金属反光、布料质感怎么办?这要用 <b>PBR(基于物理的渲染)</b>思路和对应贴图通道。这篇讲 PBR 各贴图、写实材质在 VRChat 的现实取舍。配合 UV/贴图篇、Poiyomi 篇、性能篇。</p>

<h4>二、PBR 是什么(实践)</h4>
<ul>
<li>PBR = Physically Based Rendering,用<b>物理参数</b>(金属度、粗糙度等)模拟真实光照,得到写实质感。</li>
<li>卡通着色靠色阶/描边追求风格化,PBR 追求<b>真实</b>——两条路线。</li>
<li>VRChat 里 Poiyomi 等也支持 PBR 工作流(金属/高光、法线、AO 等),不是只能卡通。</li>
</ul>

<h4>三、PBR 的核心贴图通道(实践)</h4>
<table><tr><th>贴图</th><th>作用</th></tr>
<tr><td><b>Albedo/Base Color</b></td><td>基础颜色(不含光影)</td></tr>
<tr><td><b>Normal(法线)</b></td><td>用 RGB 编码表面凹凸细节,不增面也有立体感</td></tr>
<tr><td><b>Metallic(金属度)</b></td><td>表面有多"金属"(影响反射方式)</td></tr>
<tr><td><b>Roughness/Smoothness</b></td><td>表面粗糙/光滑(影响反光锐利度)</td></tr>
<tr><td><b>AO(环境光遮蔽)</b></td><td>凹陷处的阴影,增加层次</td></tr>
<tr><td><b>Emission(自发光)</b></td><td>自己发光的部分(见发光/灯光相关)</td></tr>
</table>

<h4>四、法线贴图重点(实践)</h4>
<ul>
<li>法线贴图让<b>低面模型也有高面的凹凸细节</b>(布料纹理、肌肉、鳞片)——省面又出效果。</li>
<li>注意<b>法线方向(OpenGL vs DirectX)</b>:Unity 用的方向若反了,凹凸会内外颠倒,需翻转绿色通道。</li>
<li>法线是写实质感性价比最高的一张图(对照 Quest 优化篇:用法线代替真实几何)。</li>
</ul>

<h4>五、写实在 VRChat 的取舍(实践,重要)</h4>
<ul>
<li><b>光照环境不可控:</b>VRChat 世界光照千差万别,写实材质在 A 世界好看,B 世界可能发灰/过曝。卡通着色对环境光更宽容。</li>
<li><b>性能成本:</b>多张高分辨率 PBR 贴图(Albedo+Normal+Metallic+AO...)吃显存,影响贴图内存评级(见性能篇、Quest 篇)。</li>
<li><b>Quest 限制:</b>移动端着色器受限,复杂 PBR 多数砍成简单着色(见 Quest 篇)。</li>
<li>结论:<b>写实在 PC 高端可行,但要接受光照不稳和性能成本</b>;社交向/跨平台多数仍选卡通。</li>
</ul>

<h4>六、排查表(我整理)</h4>
<table><tr><th>现象 / 需求</th><th>原因 / 解法</th></tr>
<tr><td>想要写实质感</td><td>用 PBR 通道:Normal+Metallic+Roughness+AO</td></tr>
<tr><td>凹凸方向反了</td><td>法线 OpenGL/DirectX 方向,翻转绿通道</td></tr>
<tr><td>低面想要细节</td><td>法线贴图代替真实几何</td></tr>
<tr><td>换个世界就发灰/过曝</td><td>写实对环境光敏感;考虑卡通或调光照设置</td></tr>
<tr><td>贴图内存评级差</td><td>PBR 多图吃显存;压分辨率/合并(见性能篇)</td></tr>
<tr><td>Quest 上变样</td><td>移动着色器砍 PBR;Quest 版简化</td></tr>
</table>

<h4>七、和其他系统的联系</h4>
<ul>
<li>PBR 贴图是 <b>UV/贴图</b>体系的扩展(见 UV/贴图篇),着色器用 <b>Poiyomi/lilToon</b>(见对应篇)。</li>
<li>法线与<b>减面</b>互补(见 Quest 优化篇:法线保细节)、自发光接<b>灯光/AudioLink</b>(见对应篇)。</li>
<li>多贴图直接影响<b>贴图内存评级</b>和 <b>Quest 适配</b>(见性能篇、Quest 篇)。</li>
</ul>

<h4>八、一句话总结</h4>
<p>写实走 <b>PBR</b>(基于物理渲染):核心贴图 <b>Albedo</b>(基色)、<b>Normal</b>(法线凹凸,不增面)、<b>Metallic</b>(金属度)、<b>Roughness</b>(粗糙)、<b>AO</b>(遮蔽)、<b>Emission</b>(自发光)。法线性价比最高,注意 OpenGL/DirectX 方向。取舍:VRChat 世界<b>光照不可控</b>写实易发灰/过曝,多张高分 PBR 贴图<b>吃显存</b>影响评级,<b>Quest 砍 PBR</b>。PC 高端可写实,社交/跨平台多仍选卡通。</p>
`
},
{
 id:"transparency-render-queue",
 title:"透明与渲染排序:为什么衣服会穿透发灰",
 sub:"Render Queue、ZWrite、Cutout vs Transparent(着色器通识)",
 mins:11,
 tags:["透明","render queue","渲染排序","ZWrite","Cutout","Transparent","半透明","穿模","进阶"],
 body:`
<h4>一、半透明衣服为什么乱七八糟</h4>
<p>给模型做了半透明衣服、玻璃、翅膀、头发,结果前后关系错乱、互相穿透、隔着衣服能看到本不该看到的东西、或整体发灰?这是<b>透明渲染排序</b>问题。这篇讲清渲染模式、render queue、ZWrite 怎么影响透明,以及怎么修。配合着色器篇、贴图篇。</p>

<h4>二、四种渲染模式(着色器通识)</h4>
<table><tr><th>模式</th><th>效果</th><th>用途</th></tr>
<tr><td><b>Opaque(不透明)</b></td><td>完全实心,不处理透明</td><td>普通实体</td></tr>
<tr><td><b>Cutout(裁切)</b></td><td>按 alpha 阈值<b>非黑即白</b>,无半透明过渡</td><td>头发片、镂空、贴花边缘</td></tr>
<tr><td><b>Transparent(透明)</b></td><td>平滑<b>半透明混合</b></td><td>玻璃、薄纱、半透身体</td></tr>
<tr><td><b>Fade(淡出)</b></td><td>整体渐隐(含高光)</td><td>淡入淡出特效</td></tr>
</table>
<ul>
<li>选错模式是头号问题:头发用 Transparent 常排序错,改 <b>Cutout</b> 反而干净;真半透明才用 Transparent。</li>
</ul>

<h4>三、Render Queue:绘制顺序(着色器通识,核心)</h4>
<ul>
<li>Render Queue 是个<b>数字,控制材质绘制顺序</b>。数值越小越<b>先画</b>。</li>
<li>常见基准(Unity 标准):<b>Opaque≈2000、AlphaTest(Cutout)≈2450、Transparent≈3000</b>。</li>
<li>透明物体在不透明之后画,且大体<b>从后往前</b>,才能正确混合。</li>
<li><b>半透明互相穿透/前后错乱→手动调 render queue</b>:该先画的设小值、后画的设大值,修正叠加顺序。</li>
</ul>

<h4>四、ZWrite / ZTest:深度(着色器通识)</h4>
<ul>
<li><b>ZWrite(深度写入):</b>透明物体一般<b>默认关</b>,以免遮挡后面的透明像素;关了后更依赖队列排序。某些情况<b>开 ZWrite</b> 能改善自身穿透,但可能丢部分混合效果。</li>
<li><b>ZTest(深度测试):</b>决定像素是否通过深度比较被画,影响物体间前后遮挡。</li>
<li>这两者和 render queue <b>共同决定</b>最终透明排序。</li>
</ul>

<h4>五、Alpha Cutoff(裁切阈值,着色器通识)</h4>
<ul>
<li>Cutout 模式下,<b>alpha 低于阈值的像素被丢弃</b>,高于的保留。</li>
<li>调高→裁掉更多(镂空更多);调低→保留更多。用于控制头发片、贴花的边缘。</li>
<li>头发边缘"毛糙/有白边"常是 cutoff 或贴图 alpha 没调好。</li>
</ul>

<h4>六、排查表(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>头发片排序乱/穿透</td><td>改用 Cutout 而非 Transparent</td></tr>
<tr><td>多层半透明前后错乱</td><td>手动调各材质 render queue</td></tr>
<tr><td>透明物自己穿透自己</td><td>试开 ZWrite(可能损失混合)</td></tr>
<tr><td>整体发灰/过暗</td><td>渲染模式选错或叠加错误</td></tr>
<tr><td>头发边缘有白边/毛糙</td><td>调 Alpha Cutoff 或修贴图 alpha</td></tr>
<tr><td>隔着衣服看到不该看的</td><td>排序导致;调 queue 或换 Cutout</td></tr>
</table>

<h4>七、和其他系统的联系</h4>
<ul>
<li>这些都是<b>着色器</b>(Poiyomi/lilToon)的渲染设置(见着色器篇),依赖<b>贴图 alpha 通道</b>(见贴图篇)。</li>
<li>翅膀去白边、薄纱、玻璃都靠这套(见翅膀相关 reddit 直链)。</li>
<li>透明材质在 Quest 上行为可能不同,跨平台要测(见 Quest 篇)。</li>
</ul>

<h4>八、一句话总结</h4>
<p>透明乱套靠<b>渲染模式 + Render Queue + ZWrite</b> 三件事修。模式:<b>Cutout</b>(非黑即白,头发镂空用)、<b>Transparent</b>(真半透明)、Fade(渐隐)——头发排序乱<b>优先改 Cutout</b>。Render Queue 是绘制顺序数字(小先画,Opaque≈2000/Cutout≈2450/Transparent≈3000),<b>多层半透明错乱就手调 queue</b>。透明默认关 ZWrite,自穿透可试开(损失混合)。Alpha Cutoff 控裁切阈值修边缘白边。都属着色器渲染设置,依赖贴图 alpha,Quest 要另测。</p>
`
},
{
 id:"emission-glow",
 title:"自发光:让纹身、眼睛、衣服图案发光",
 sub:"Emission Map、强度、呼吸闪烁、AudioLink 音频反应(着色器通识)",
 mins:11,
 tags:["自发光","emission","发光","glow","呼吸灯","AudioLink","霓虹","眼睛","进阶"],
 body:`
<h4>一、想让局部发光</h4>
<p>想让纹身、瞳孔、衣服图案、霓虹纹路自己发光,在暗场景也亮、还能呼吸闪烁或随音乐跳动?这靠着色器的 <b>Emission(自发光)</b>。这篇讲 emission 怎么配、怎么做动态发光、怎么接 AudioLink。配合着色器篇、换色篇、AudioLink 篇。</p>

<h4>二、Emission 是什么(着色器通识)</h4>
<ul>
<li>Emission = 材质<b>自己发光</b>的部分,<b>不依赖场景光照</b>——再暗的世界也亮。</li>
<li>和普通漫反射不同:漫反射要有光照才亮,emission 是"自带光源"的显示效果。</li>
<li>注意:它通常只是<b>材质变亮显示</b>,默认不真照亮周围(除非配真实光源/后处理 bloom 才有光晕)。</li>
</ul>

<h4>三、核心设置(着色器通识)</h4>
<table><tr><th>设置</th><th>作用</th></tr>
<tr><td><b>Emission Map</b></td><td>自发光贴图,指定<b>哪里发光</b>(黑不发光,亮的发光)</td></tr>
<tr><td><b>Emission Color</b></td><td>发光<b>颜色</b>(可染色,叠在贴图上)</td></tr>
<tr><td><b>Emission Strength</b></td><td>发光<b>强度</b>(越高越亮,配 bloom 出光晕)</td></tr>
<tr><td><b>多个 Emission 层</b></td><td>Poiyomi 等支持多层 emission,不同区域不同效果</td></tr>
</table>
<ul>
<li>常见做法:把要发光的图案(纹身、纹路)单独画成 emission map,主贴图保持正常。</li>
</ul>

<h4>四、动态发光:呼吸、闪烁、流动(实践)</h4>
<ul>
<li><b>呼吸灯(pulse):</b>用动画让 emission strength 上下变化,做"呼吸"效果(B站有 poiyomi 呼吸灯发光纹身教程)。</li>
<li><b>闪烁/scroll:</b>emission map 配 UV 滚动或动画,做流动霓虹、跑马灯。</li>
<li><b>菜单开关/调色:</b>把 emission 强度/颜色做成<b>菜单参数</b>(同换色篇思路:属性设 Animated+菜单 Radial),游戏内开关或调亮度、调色。</li>
</ul>

<h4>五、AudioLink 音频反应发光(实践)</h4>
<ul>
<li>把 emission 接 <b>AudioLink</b>,发光强度/颜色<b>随音乐节拍跳动</b>(见 AudioLink 篇)——蹦迪、舞台模型常用。</li>
<li>原理:AudioLink 把音频频段数据喂给着色器,emission 读取对应频段值驱动亮度。</li>
<li>B站有"给头发用 poiyomi 的 audiolink 功能做效果""衣服图案发光变色动起来"等实战。</li>
</ul>

<h4>六、排查表(我整理)</h4>
<table><tr><th>现象 / 需求</th><th>原因 / 解法</th></tr>
<tr><td>想局部发光</td><td>画 emission map(黑=不发光)+设 color/strength</td></tr>
<tr><td>发光了但不亮/不明显</td><td>提高 strength;世界要有 bloom 才出光晕</td></tr>
<tr><td>整个材质都在发光</td><td>emission map 没做对,非发光区要涂黑</td></tr>
<tr><td>想呼吸/闪烁</td><td>动画驱动 emission strength</td></tr>
<tr><td>想随音乐跳</td><td>接 AudioLink(见 AudioLink 篇)</td></tr>
<tr><td>想游戏内开关/调色</td><td>emission 属性设 Animated + 菜单参数</td></tr>
<tr><td>进某些地图过亮</td><td>世界后处理叠加;降 strength 或做世界检测</td></tr>
</table>

<h4>七、和其他系统的联系</h4>
<ul>
<li>Emission 是<b>着色器</b>功能(见 Poiyomi/lilToon 篇),动态发光靠<b>动画+菜单参数</b>(见换色篇/菜单篇),音频反应靠 <b>AudioLink</b>(见 AudioLink 篇)。</li>
<li>发光属性可动画的前提同换色:<b>属性设 Animated + 材质锁定</b>(见换色篇)。</li>
<li>多张 emission 贴图也占贴图内存(见性能篇)。</li>
</ul>

<h4>八、一句话总结</h4>
<p>自发光 <b>Emission</b> 让材质局部<b>自己发光、不依赖场景光照</b>。核心:<b>Emission Map</b>(指定哪里发光,黑=不发)+<b>Color</b>(颜色)+<b>Strength</b>(强度,配 bloom 出光晕)。动态玩法:动画驱动 strength 做<b>呼吸灯/闪烁</b>、UV 滚动做<b>流动霓虹</b>、属性设 Animated+菜单参数做<b>游戏内开关调色</b>、接 <b>AudioLink</b> 做<b>音频反应发光</b>。发光不明显多是 strength 低或世界无 bloom;整体发光是 emission map 没涂黑非发光区。属着色器通识,与换色/菜单/AudioLink 同源。</p>
`
},
{
 id:"blender-workflow",
 title:"Blender 到 VRChat:改模绕不开的建模工具",
 sub:"导入导出、FBX 设置、常见操作与坑(工作流通识)",
 mins:12,
 tags:["Blender","建模","FBX","导出","导入","UV","权重","网格编辑","进阶"],
 body:`
<h4>一、为什么改模要会一点 Blender</h4>
<p>很多改模操作 Unity 做不了:删多余网格、改模型形状、合并/分离部件、改 UV、修权重、加新部件——这些都得在 <b>Blender</b>(免费开源 3D 软件)里做。这篇讲 Blender 在改模流程里的定位、导入导出怎么设、常见操作和坑。配合 UV 篇、骨骼篇、Quest 优化篇、材质合并篇。</p>

<h4>二、Blender 在流程里的位置(实践)</h4>
<ul>
<li>典型流程:<b>商品模型(.blend/.fbx)→ Blender 编辑 → 导出 FBX → Unity 导入 → 配材质/组件 → 上传</b>。</li>
<li>Blender 管<b>几何与权重</b>(形状、网格、UV、骨骼绑定),Unity 管<b>材质、动画、VRChat 组件</b>。</li>
<li>不是所有改模都要 Blender:纯换装/调材质/加开关在 Unity 就行;<b>改形状/删面/改 UV 才需要</b>。</li>
</ul>

<h4>三、导入导出关键设置(实践,易错)</h4>
<table><tr><th>环节</th><th>注意</th></tr>
<tr><td><b>导入 FBX</b></td><td>注意单位/缩放,VRChat 模型常 1 单位=1 米</td></tr>
<tr><td><b>导出 FBX</b></td><td>选 FBX,Path Mode 设 Copy 内嵌贴图;勾选需要的网格+骨架</td></tr>
<tr><td><b>缩放(Scale)</b></td><td>导出 Apply Transform 或在 Unity 里调 Scale Factor,避免模型巨大/极小</td></tr>
<tr><td><b>朝向(Axis)</b></td><td>Blender Z-up vs Unity Y-up,导出设对否则躺倒/转向</td></tr>
<tr><td><b>Apply 变换</b></td><td>改完缩放/旋转要 Apply(Ctrl+A),否则 Unity 里数值乱</td></tr>
</table>

<h4>四、改模常见 Blender 操作(实践)</h4>
<ul>
<li><b>删多余网格:</b>编辑模式选中面/顶点 → 删除(如删被衣服盖住的身体、删多余配件减面)。</li>
<li><b>合并/分离:</b>Join(Ctrl+J)合并对象、Separate(P)按选择分离——配合 Unity 里材质槽。</li>
<li><b>权重绘制(Weight Paint):</b>新加的部件要刷权重绑到骨骼,否则不跟着动(见骨骼篇)。</li>
<li><b>UV 编辑:</b>展 UV、调 UV 布局(见 UV 篇),改贴图映射。</li>
<li><b>形态键(Shape Key):</b>就是 blendshape,Blender 里做表情/体型变化(见形态键篇)。</li>
</ul>

<h4>五、常见坑(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>导入 Unity 后模型巨大/极小</td><td>缩放没 Apply 或导出单位错;调 Scale Factor</td></tr>
<tr><td>模型躺倒/朝向错</td><td>Z-up/Y-up 轴向;导出设 -Z forward Y up</td></tr>
<tr><td>新部件不跟骨骼动</td><td>没刷权重;Weight Paint 绑骨骼</td></tr>
<tr><td>贴图丢失变白/粉</td><td>导出 Path Mode 没设 Copy;Unity 里重指贴图</td></tr>
<tr><td>法线翻转/面发黑</td><td>法线朝内;Recalculate Normals(Shift+N)</td></tr>
<tr><td>导出后材质槽乱</td><td>Blender 材质对应 Unity 材质槽;整理材质</td></tr>
</table>

<h4>六、版本与插件(实践)</h4>
<ul>
<li>Blender 免费,新版本对 FBX 支持更好;跟模型/教程用的大版本走可减少兼容问题。</li>
<li>常用辅助插件:<b>CATS</b>(MMD/VRChat 模型处理,合并骨骼、修材质,老但常用)、各类 MMD 导入插件。</li>
<li>减面也可在 Blender 用 <b>Decimate 修改器</b>(见 Quest 优化篇),或用 Unity 端工具。</li>
</ul>

<h4>七、和其他系统的联系</h4>
<ul>
<li>Blender 管几何,<b>UV/贴图</b>(见 UV 篇)、<b>骨骼权重</b>(见骨骼篇)、<b>形态键</b>(见形态键篇)、<b>减面</b>(见 Quest 优化篇)都在这做。</li>
<li>导出 FBX 后进 Unity 配<b>材质/着色器</b>(见着色器篇)和 <b>VRChat 组件</b>(见上传篇)。</li>
<li>材质合并/网格合并(见合并篇)Blender 和 Unity 都能做,看场景选。</li>
</ul>

<h4>八、一句话总结</h4>
<p><b>Blender</b>(免费 3D 软件)管改模里 Unity 做不了的<b>几何与权重</b>:删面、改形状、合并分离、UV、权重、形态键。流程:模型→Blender 编辑→导出 FBX→Unity 配材质组件→上传。导出易错点:<b>缩放要 Apply</b>(否则 Unity 里巨大/极小)、<b>轴向 Z-up/Y-up</b>(否则躺倒)、<b>Path Mode 设 Copy</b>(否则丢贴图)、新部件<b>刷权重</b>(否则不跟骨骼)、面发黑<b>重算法线</b>。纯换装调材质不用 Blender,改形状删面才需要。CATS 插件常用于 MMD/VRChat 模型处理。</p>
`
},
{
 id:"custom-animation-emote",
 title:"自定义动画与舞蹈:导入 emote、跳舞、自定义姿势",
 sub:"动画从哪来、怎么塞进菜单、Humanoid vs Generic(工作流通识)",
 mins:11,
 tags:["动画","emote","舞蹈","dance","自定义动作","Humanoid","菜单","导入","进阶"],
 body:`
<h4>一、想让模型跳舞、摆自定义动作</h4>
<p>想让模型在游戏里跳舞、做自定义 emote、摆个特定 pose?这要做<b>自定义动画</b>并塞进 expression 菜单触发。这篇讲动画从哪来、怎么导入、怎么接菜单、常见坑。配合表情手势篇、混合树篇、菜单篇。</p>

<h4>二、动画从哪来(实践)</h4>
<ul>
<li><b>买/下载现成动画:</b>Booth、Gumroad 有大量 emote/舞蹈动画包(.anim 或 .fbx),最省事。</li>
<li><b>自己 K 帧:</b>在 Unity Animation 窗口或 Blender 里手动做关键帧动画。</li>
<li><b>动捕/转换:</b>用动捕数据或把 MMD 动作(.vmd)转成 Unity 动画。</li>
<li>注意<b>授权</b>:商用动画包注意 license(见授权篇)。</li>
</ul>

<h4>三、Humanoid vs Generic 动画(实践,关键)</h4>
<table><tr><th>类型</th><th>特点</th></tr>
<tr><td><b>Humanoid</b></td><td>绑人形骨骼,<b>可跨模型复用</b>(同一支舞用在不同人形模型)</td></tr>
<tr><td><b>Generic</b></td><td>绑具体骨骼名,<b>换模型常失效</b></td></tr>
</table>
<ul>
<li>买的人形舞蹈动画多是 Humanoid,导入时 Rig 设 <b>Humanoid</b> 才能套到你的模型。</li>
<li>导入 fbx 动画:Inspector → Rig → Animation Type 设 Humanoid;Animation 标签里可裁剪/循环。</li>
</ul>

<h4>四、怎么塞进菜单触发(实践)</h4>
<ul>
<li>核心同表情手势:做一个 <b>animator 状态</b>放动画,用<b>参数</b>切换,挂 <b>menu 按钮/子菜单</b>触发(见菜单篇、表情手势篇)。</li>
<li>VRCFury/MA 有现成的 <b>Toggle/Action</b> 组件,直接把动画拖进去生成菜单项,免手搓 animator。</li>
<li>多个 emote 用<b>子菜单</b>归类(见菜单篇),或用 int 参数做一个轮盘选动作。</li>
</ul>

<h4>五、常见坑(我整理)</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>舞蹈动作错乱/抽搐</td><td>动画不是 Humanoid 或骨骼不匹配;Rig 设 Humanoid</td></tr>
<tr><td>动画只动上半身</td><td>动画遮罩(Avatar Mask)或层权重问题</td></tr>
<tr><td>跳舞时手指僵直</td><td>动画没含手指轨道;或被手势层覆盖</td></tr>
<tr><td>emote 触发后停不下来</td><td>状态机没设回 idle 的过渡</td></tr>
<tr><td>动作和移动冲突</td><td>emote 放 Action 层并正确写权重(见可玩层篇)</td></tr>
<tr><td>换模型后动画失效</td><td>原是 Generic;换 Humanoid 或重绑</td></tr>
</table>

<h4>六、Action 层与 AFK(实践)</h4>
<ul>
<li>全身 emote(舞蹈)通常放 <b>Action 层</b>,播放时临时接管全身、结束放回(见可玩层篇)。</li>
<li>这和 GoGo Loco 的姿势是两回事:GoGo Loco 管坐躺移动姿态,emote 管一次性表演动作(见 GoGo Loco 篇)。</li>
<li>AFK 动画也是类似机制(挂机时播放指定动作)。</li>
</ul>

<h4>七、和其他系统的联系</h4>
<ul>
<li>动画导入后走<b>animator + 参数 + 菜单</b>(见表情手势篇、菜单篇、混合树篇),全身 emote 用 <b>Action 层</b>(见可玩层篇)。</li>
<li>VRCFury/MA 简化 emote 接入(见对应篇),动画包注意<b>授权</b>(见授权篇)。</li>
<li>跳舞要全身姿态配合,和 <b>GoGo Loco</b>(姿势)、<b>全身追踪</b>互补(见对应篇)。</li>
</ul>

<h4>八、一句话总结</h4>
<p>自定义动画/舞蹈/emote:动画来源有<b>买现成、自己 K 帧、动捕/MMD 转换</b>。关键分清 <b>Humanoid</b>(绑人形骨骼可跨模型复用,买的舞蹈多是这种,导入 Rig 设 Humanoid)vs <b>Generic</b>(绑具体骨骼换模型易失效)。塞菜单:做 animator 状态+参数+menu 触发,或用 <b>VRCFury/MA 的 Toggle/Action</b> 免手搓。全身 emote 放 <b>Action 层</b>临时接管全身。常见坑:动作抽搐(非 Humanoid)、只动上半身(遮罩)、停不下来(没设回 idle)。与表情手势/菜单/可玩层/GoGo Loco 互补。</p>
`
},
{
 id:"where-to-get-avatars",
 title:"模型从哪来:购买渠道、找模、委托与避坑",
 sub:"Booth/Gumroad/VKet、找模技巧、委托流程、防盗模防诈骗(实践经验)",
 mins:11,
 tags:["模型来源","购买","Booth","Gumroad","委托","commission","找模","盗模","避坑","入门"],
 body:`
<h4>一、第一步:先有个模型</h4>
<p>改模的起点是<b>拿到一个模型</b>。新手最常问:在哪买?怎么找到看上的那个?能不能找人定制?怎么不被骗、不踩盗模坑?这篇讲模型来源渠道、找模技巧、委托流程和避坑。配合授权篇(能不能改/卖)、性能篇(选模看指标)。</p>

<h4>二、主流购买渠道(实践)</h4>
<table><tr><th>渠道</th><th>特点</th></tr>
<tr><td><b>Booth(booth.pm)</b></td><td>日本平台,VRChat 模型/衣装/配件最大集散地,多为日系素体</td></tr>
<tr><td><b>Gumroad</b></td><td>欧美创作者多,各类模型/工具/动画</td></tr>
<tr><td><b>VKet / 虚拟市场</b></td><td>大型线上展会,海量模型集中展示促销</td></tr>
<tr><td><b>Jinxxy 等</b></td><td>新兴 VRChat 模型平台</td></tr>
<tr><td>国内平台</td><td>部分在闲鱼/QQ 群/淘宝流通(注意正版与授权)</td></tr>
</table>
<ul>
<li>买之前看清是 <b>VRChat ready</b>(已配好)还是<b>纯素体</b>(要自己搭),以及 PC/Quest 支持。</li>
</ul>

<h4>三、找模技巧(实践)</h4>
<ul>
<li><b>看到喜欢的不知道名字:</b>截图问社区(reddit r/VRchat 有大量"认模"帖)、用模型搜索站、看对方资料/铭牌。</li>
<li><b>按素体找:</b>很多模型基于知名素体(如某些热门 base),搜素体名能找到大量衣装/变体。</li>
<li><b>Booth 收藏夹/标签:</b>用 tag、关注作者、看"关联商品"顺藤摸瓜。</li>
</ul>

<h4>四、委托定制(commission,实践)</h4>
<ul>
<li><b>什么是委托:</b>付费请人做模型/改模/上传(reddit 大量 commission 帖)。</li>
<li><b>合理预期:</b>定制价格区间差异大,问清<b>包含什么</b>(建模?改模?上传?贴图?)。</li>
<li><b>避免被宰:</b>对比多个报价(reddit 有"这价格合理吗"类讨论),先看作品集。</li>
<li><b>沟通:</b>明确交付内容、修改次数、授权范围(能不能自己再改、用在哪)。</li>
</ul>

<h4>五、防盗模与防诈骗(重要)</h4>
<table><tr><th>风险</th><th>怎么防</th></tr>
<tr><td><b>盗模站</b>(如 ripper 类)</td><td>违反 TOS 且坑作者;reddit 明确讨论这类站违规。支持正版</td></tr>
<tr><td><b>免费模来路不明</b></td><td>Gumroad 上"免费"可能是盗传;看作者可信度</td></tr>
<tr><td><b>委托诈骗</b></td><td>社区有"scammer 接单"预警;走有保障的方式、看口碑</td></tr>
<tr><td><b>恶意文件</b></td><td>来路不明的 unitypackage 可能含恶意脚本;只从可信源下载</td></tr>
</table>
<ul>
<li>盗模不仅违规,还常缺更新/缺组件/有问题,得不偿失。</li>
</ul>

<h4>六、买之前看什么(实践)</h4>
<ul>
<li><b>授权条款:</b>能不能改、能不能再配布、能不能商用(见授权篇)——买前看,别买完才发现不让改。</li>
<li><b>性能指标:</b>多边形数、材质数、是否 Quest 支持(见性能篇、Quest 篇)——太重的模型改起来累。</li>
<li><b>配套:</b>有没有 FBX 源文件、贴图工程、表情、是否含 prefab。</li>
<li><b>更新:</b>作者是否还在维护(SDK 更新后老模型可能要修)。</li>
</ul>

<h4>七、和其他系统的联系</h4>
<ul>
<li>拿到模型后看<b>授权</b>能不能改/卖(见授权篇),按<b>性能指标</b>判断改起来累不累(见性能篇、Quest 篇)。</li>
<li>纯素体要自己搭衣装(见 MA 总篇 Setup Outfit),VRChat ready 模型可直接上传(见上传篇)。</li>
<li>委托/代上传也是一种路径(reddit 有代上传改色服务帖)。</li>
</ul>

<h4>八、一句话总结</h4>
<p>模型来源:<b>Booth</b>(日系最大)、<b>Gumroad</b>(欧美)、<b>VKet</b>(展会)、Jinxxy 等。买前分清 <b>VRChat ready vs 纯素体</b>、PC/Quest 支持。找模:截图问社区认模、按<b>素体名</b>搜变体、关注作者。<b>委托</b>要问清包含什么、对比报价、看作品集、明确授权。防坑:<b>别用盗模站</b>(违 TOS 且缺更新)、来路不明文件可能含恶意脚本、警惕委托诈骗。买前必看<b>授权</b>(能不能改/卖)和<b>性能指标</b>(面数/材质/Quest)。与授权篇、性能篇、Quest 篇直接相关。</p>
`
},
{
 id:"ingame-avatar-issues",
 title:"上传后头像在游戏里出问题:T-Pose、穿模、手指反折自救",
 sub:"卡 T 姿势、变机器人、衣服穿模、手指弯折、超尺寸卡菜单的现场排查(实战)",
 mins:11,
 tags:["T-Pose","损坏头像","穿模","手指反折","Missing Script","AABB","报错","自救","进阶"],
 body:`
<h4>一、传上去了,但游戏里不对劲</h4>
<p>模型在 Unity 里看着好好的,上传到游戏里却卡 T 姿势、变成机器人、衣服穿过身体、手指向后弯、或者太高卡住菜单。这篇按现象定位"上传后/换装后在游戏里"的异常,和编辑器期报错篇(error-troubleshooting)互补——那篇偏 Unity 里的错,这篇偏游戏内的现象。配合骨骼篇、衣服适配、缩放篇。</p>

<h4>二、卡 T-Pose / 不动(高频)</h4>
<ul>
<li><b>最常见原因:</b>Rig 没设成 <b>Humanoid</b>(见骨骼篇)——人形动画套不上,就保持 T 姿势。</li>
<li>检查 fbx 的 <b>Rig → Animation Type = Humanoid</b>,且 Configure 里骨骼映射正确。</li>
<li>也可能是<b>动画控制器/Base 层</b>被替换坏了(见可玩层篇),或上传的是损坏版本。</li>
</ul>

<h4>三、变机器人 / 显示成默认头像</h4>
<ul>
<li>"变机器人"通常是<b>头像加载失败</b>触发了 fallback/默认显示(见 Fallback 篇),或<b>性能等级 Very Poor</b>被对方屏蔽(见性能与安全篇)。</li>
<li>自己看自己变机器人:可能是<b>损坏头像</b>——切回安全头像或换一个,别卡在坏头像上。</li>
<li>上传后 <b>Missing Script</b> 报错重传失败:删掉缺失脚本组件(常是残留的 DynamicBone/旧组件引用)再传(见骨骼迁移篇)。</li>
</ul>

<h4>四、衣服穿模 / 脚穿地面</h4>
<table><tr><th>现象</th><th>原因 / 解法</th></tr>
<tr><td>衣服穿过身体</td><td>身体没做<b>收缩 blendshape</b>(见形态键篇)或衣服<b>权重没刷好</b>(见骨骼篇)</td></tr>
<tr><td>动作时露穿帮</td><td>blendshape 收缩没覆盖到动作幅度;或衣服网格太贴</td></tr>
<tr><td>脚陷进地面 / 漂浮</td><td><b>视点(View Position)</b>或缩放不对(见视点篇);IK/地面校准</td></tr>
</table>

<h4>五、手指反折 / 姿势错乱</h4>
<ul>
<li><b>手指向后弯:</b>手部<b>骨骼朝向</b>或<b>权重</b>错(见骨骼篇),Humanoid 配置里手指映射也要对。</li>
<li><b>整体姿态歪:</b>可能是 Armature 根骨被误旋转(Blender 里 Apply 变换,见 Blender 篇)。</li>
<li><b>合并骨架后变形:</b>Merge Armature 时缩放没统一(见 MA 篇、Blender 篇)。</li>
</ul>

<h4>六、太高/太宽,卡菜单或传不上(AABB)</h4>
<ul>
<li>头像<b>包围盒(AABB / Bounds)过大</b>或模型过高,可能<b>超出上传限制</b>或在游戏里<b>卡住菜单</b>。</li>
<li>解法:在 Unity 里检查模型实际尺寸(常见 1 单位=1 米),用<b>缩放</b>调到合理身高(见缩放篇),必要时在 Blender 里 Apply 缩放(见 Blender 篇)。</li>
<li>卡在过高头像动不了:切回默认头像自救,再修。</li>
</ul>

<h4>七、PC/Quest 平台差异</h4>
<ul>
<li><b>PCVR 不加载 / 只显示 fallback:</b>性能等级被屏蔽、或该平台没传对应版本(见 Fallback 篇、性能篇)。</li>
<li><b>Quest 上不显示:</b>没传 Quest 版本,或材质用了 Quest 不支持的着色器(见 Quest 篇)。</li>
<li>记住 PC 和 Quest 是<b>两套上传</b>,缺一边那边就看不到真身(见 Quest 篇、上传篇)。</li>
</ul>

<h4>八、一句话总结</h4>
<p>上传后游戏内异常按现象定位:<b>卡 T-Pose</b> 八成是 Rig 没设 Humanoid;<b>变机器人/默认头像</b>是加载失败 fallback 或性能 Very Poor 被屏蔽,损坏头像就切回安全头像;<b>Missing Script</b> 重传失败删缺失组件;<b>衣服穿模</b>是收缩 blendshape 没做或权重没刷;<b>脚穿地面</b>查视点;<b>手指反折</b>是手骨朝向/权重错;<b>太高卡菜单/AABB 过大</b>用缩放调身高、Blender 里 Apply。<b>PCVR/Quest 不加载</b>多是没传对应平台版本或着色器不兼容。和编辑器报错篇互补——本篇专攻游戏内现象。</p>
`
},
{
 id:"avatar-filesize",
 title:"传不上去/太大:文件体积与下载大小限制",
 sub:"下载大小 vs 未压缩大小、PC 与 Quest 上限、怎么减体积(实战)",
 mins:10,
 tags:["文件体积","下载大小","上传失败","压缩","贴图","Quest","优化","进阶"],
 body:`
<h4>一、传不上去,提示太大</h4>
<p>模型上传时报"太大"、或别人看你要等半天才加载、Quest 上直接传不上——这些都和<b>文件体积</b>有关。VRChat 对头像的下载大小和未压缩大小有上限,超了就传不上或被限制。这篇讲两种"大小"、各平台上限、怎么减体积。配合性能篇、Quest 篇、贴图篇。</p>

<h4>二、两种"大小"要分清(关键)</h4>
<table><tr><th>指标</th><th>含义</th></tr>
<tr><td><b>下载大小(Download Size)</b></td><td>打包压缩后别人要下载的体积——决定别人加载你要多久</td></tr>
<tr><td><b>未压缩大小(Uncompressed Size)</b></td><td>解压到内存后的实际占用——影响显存/内存</td></tr>
</table>
<ul>
<li>两个都有上限,<b>哪个超了都传不上</b>。SDK 上传面板会显示这两个数值,红了就得减。</li>
<li>PC 上限比 Quest 宽松;<b>Quest 更严</b>(移动端内存有限,见 Quest 篇)。</li>
</ul>

<h4>三、体积主要被什么占掉(实战)</h4>
<ul>
<li><b>贴图(最大头):</b>一堆 2K/4K 贴图是体积爆炸的头号原因(见贴图篇)。</li>
<li><b>网格:</b>高面数模型、没删的隐藏网格(见减面/Quest 优化篇)。</li>
<li><b>音频:</b>未压缩的高码率音频文件(见 avatar 音频篇)。</li>
<li><b>动画/材质冗余:</b>大量材质、重复资源。</li>
</ul>

<h4>四、怎么减下载大小(实战,按性价比)</h4>
<table><tr><th>手段</th><th>效果</th></tr>
<tr><td><b>压贴图分辨率</b></td><td>性价比最高——4K 降 2K、不重要的降 1K/512,体积断崖式下降</td></tr>
<tr><td><b>贴图压缩格式</b></td><td>用合适的压缩(如 Crunch 压缩)进一步缩小下载体积</td></tr>
<tr><td><b>合并贴图/图集(atlas)</b></td><td>减少贴图张数和材质数(见合并篇)</td></tr>
<tr><td><b>删多余网格</b></td><td>删被盖住的身体、没用的配件(见 Quest 优化篇)</td></tr>
<tr><td><b>压缩音频</b></td><td>降码率/转压缩格式(见音频篇)</td></tr>
</table>
<ul>
<li><b>批量改贴图尺寸:</b>工程里贴图多时,用工具批量降分辨率(reddit 有"批量 resize 贴图"求助),比一张张改快。</li>
</ul>

<h4>五、Quest 版要单独瘦身(实战)</h4>
<ul>
<li>Quest 上限更严,常要为 Quest 单独做<b>更激进的瘦身</b>:更小贴图、更少材质、更低面数(见 Quest 篇)。</li>
<li>VRCQuestTools 等工具能帮你把 PC 版转换/压缩成 Quest 版(社区常用)。</li>
<li>PC 和 Quest 是<b>两套上传</b>,各自算各自的体积(见 Quest 篇、上传篇)。</li>
</ul>

<h4>六、排查表(我整理)</h4>
<table><tr><th>现象</th><th>解法</th></tr>
<tr><td>上传报"太大"/超限</td><td>看 SDK 面板哪个红了(下载/未压缩),优先压贴图</td></tr>
<tr><td>别人加载你很慢</td><td>下载大小过大;压贴图、删冗余</td></tr>
<tr><td>Quest 传不上</td><td>Quest 上限更严;单独激进瘦身</td></tr>
<tr><td>压完还是大</td><td>查是不是多张大贴图/未压缩音频;合并材质</td></tr>
<tr><td>显存吃紧/卡</td><td>未压缩大小过高;降贴图分辨率(见性能篇)</td></tr>
</table>

<h4>七、和其他系统的联系</h4>
<ul>
<li>体积和<b>性能等级</b>是两回事但相关:贴图既占体积也占显存(见性能篇)。减贴图两头都受益。</li>
<li>减体积主力是<b>贴图</b>(见贴图篇)和<b>网格</b>(见 Quest 优化/合并篇),Quest 要更狠(见 Quest 篇)。</li>
<li>上传面板看体积数值(见上传面板篇)。</li>
</ul>

<h4>八、一句话总结</h4>
<p>传不上去多半是<b>文件体积超限</b>。分两种:<b>下载大小</b>(压缩后别人下载的,决定加载快慢)和<b>未压缩大小</b>(解压到内存的,影响显存),<b>哪个超都传不上</b>,SDK 面板会显示。体积大头是<b>贴图</b>——减体积性价比最高的就是<b>压贴图分辨率</b>(4K→2K→1K)、用压缩格式、合并图集;其次删多余网格、压音频。<b>Quest 上限更严</b>要单独激进瘦身(VRCQuestTools 等)。PC/Quest 各算各的体积。与贴图/性能/Quest/合并篇直接相关。</p>
`
},
{
 id:"vroid-workflow",
 title:"VRoid 做模型:从捏脸到进 VRChat 的完整链路",
 sub:"VRoid Studio 捏模、导出 VRM、转 FBX/导入、进 VRChat 的全流程(新手起点)",
 mins:12,
 tags:["VRoid","VRM","建模","导出","新手","Blender","转换","进阶"],
 body:`
<h4>一、不会建模也能做自己的模型</h4>
<p>不会 Blender、又想要一个独一无二的模型?<b>VRoid Studio</b> 是免费的捏人软件,像捏游戏角色一样调脸型、发型、衣服,导出后能进 VRChat。这是很多人做<b>第一个原创模型</b>的起点。这篇讲 VRoid→VRChat 的完整链路、每步的坑。配合骨骼篇、上传篇、Blender 篇、性能篇。</p>

<h4>二、整体链路(先有全局)</h4>
<ol>
<li><b>VRoid Studio</b> 里捏模型(脸/发/衣/体型)。</li>
<li>导出 <b>VRM</b> 格式(VRoid 的原生导出格式)。</li>
<li>VRM 导入 Unity——需要 <b>VRM 导入插件</b>(UniVRM 等),Unity 默认不认 VRM。</li>
<li>转成 VRChat 能用的形态:配 <b>Humanoid</b> 骨骼、加 VRChat 组件、设材质(见上传篇)。</li>
<li>按正常流程上传(见上传篇)。</li>
</ol>
<p>也有人走 <b>VRM→Blender→FBX</b> 这条路(要改网格/权重时,见 Blender 篇)。</p>

<h4>三、VRoid Studio 里要注意什么</h4>
<ul>
<li><b>捏模型:</b>脸型、发型(VRoid 头发是一根根"发片"生成)、服装、体型都能调。新手最容易忽略的是<b>后脑勺/头发量</b>——发型没铺满会露头皮(B站很多"给 V 做后脑勺"教程就是讲这个)。</li>
<li><b>面数/材质:</b>VRoid 默认模型面数和材质数不低,<b>性能等级可能偏差</b>,进 VRChat 前常要优化(见性能篇、Quest 篇)。</li>
<li><b>导出设置:</b>导出 VRM 时有减面/材质合并选项,适当用能降体积(见文件体积篇)。</li>
</ul>

<h4>四、VRM 导入 Unity(关键坑)</h4>
<ul>
<li>Unity <b>默认不认 VRM</b>,必须先装 <b>UniVRM</b>(VRM 导入插件)。装好后才能把 .vrm 拖进工程。</li>
<li>导入后它是 VRM 结构,要转成 VRChat 头像:<b>Humanoid 骨骼</b>一般 VRoid 已经是标准人形(见骨骼篇),加 VRChat 的 Avatar Descriptor、设置视点(见视点篇)、配表情(见 viseme 篇)。</li>
<li>常见坑:<b>VRM 转 FBX 后贴图丢失</b>——需要手动重新关联材质贴图(B站有专门教程讲这个)。</li>
</ul>

<h4>五、要改网格就走 Blender</h4>
<ul>
<li>VRoid 捏不出的细节(改脸型几何、加部件、改 UV),导出 VRM 后<b>导入 Blender</b> 改(见 Blender 篇)。</li>
<li>VRoid→Blender 有较简易的导入方式(部分无需插件),改完再导 FBX 进 Unity。</li>
<li>注意 VRoid 的<b>形态键(表情)</b>在转换中别弄丢,VRChat 要用它做 viseme/表情(见形态键篇)。</li>
</ul>

<h4>六、VRoid 模型的优缺点(实战判断)</h4>
<table><tr><th>优点</th><th>缺点 / 注意</th></tr>
<tr><td>免费、零建模基础、快速出原创角色</td><td>默认<b>性能偏重</b>,常要优化才达好评级</td></tr>
<tr><td>风格统一、换装方便</td><td>VRoid 味较明显,想要独特感要进 Blender 改</td></tr>
<tr><td>形态键/骨骼基本规范</td><td>VRM→Unity 要装 UniVRM,转 FBX 易丢贴图</td></tr>
</table>

<h4>七、和其他系统的联系</h4>
<ul>
<li>VRoid 出的模型进 VRChat 后,后续改装、加开关、配表情和买来的模型<b>流程一样</b>(见 MA 篇、表情篇)。</li>
<li>VRoid 默认性能偏重,<b>优化</b>是必经一步(见性能篇、Quest 篇、文件体积篇)。</li>
<li>要深度改造就进 Blender(见 Blender 篇);骨骼/形态键沿用通用流程(见骨骼篇、形态键篇)。</li>
</ul>

<h4>八、一句话总结</h4>
<p>VRoid Studio 是<b>免费零基础</b>做原创模型的起点:捏脸发衣→导出 <b>VRM</b>→装 <b>UniVRM</b> 导入 Unity→配 Humanoid + VRChat 组件→上传。坑点:发型要铺满<b>后脑勺</b>、VRoid 默认<b>性能偏重</b>需优化、<b>VRM 转 FBX 易丢贴图</b>要手动重连、Unity 不装 UniVRM 不认 VRM。要改网格细节就走 <b>VRM→Blender→FBX</b>。进 VRChat 后的改装/表情/优化和普通模型一样。与骨骼/上传/Blender/性能/形态键篇直接相关。</p>
`
},
{
 id:"avatar-safety-piracy",
 title:"模型安全:盗模辨别、恶意文件、crasher 防护",
 sub:"怎么看一个模型是不是盗的、模型包会不会带毒、怎么防崩溃器(实战+自保)",
 mins:11,
 tags:["安全","盗模","恶意脚本","crasher","病毒","隐私","自保","进阶"],
 body:`
<h4>一、模型也有安全问题</h4>
<p>从不明渠道下模型,可能踩三种坑:<b>盗模</b>(侵权,作者会被封、你也可能连带)、<b>带毒文件</b>(unitypackage 能塞恶意脚本)、<b>crasher</b>(故意做来让别人客户端崩溃的恶意模型)。这篇讲怎么辨别和自保。和授权篇(版权角度)、性能与安全篇(屏蔽设置)互补——本篇偏<b>安全防护</b>。</p>

<h4>二、怎么辨别盗模(实战)</h4>
<ul>
<li><b>来源可疑:</b>盗模站(把别人付费模型免费"白嫖")、压缩包群里转发的成品、远低于市场价的"代下"——基本都是盗的。</li>
<li><b>看授权:</b>正版从 Booth/Gumroad 等作者本人店铺购买,有授权说明(见授权篇)。拿不出来源和授权的要警惕。</li>
<li><b>社区辨别:</b>reddit 上常有"这个是不是翻录的(ripped)"的辨别求助——盗模常缺失原作者文件结构、着色器损坏、材质错乱。</li>
<li><b>风险:</b>用盗模不只是道德问题,作者发现可投诉,且盗模<b>得不到更新和支持</b>,出问题没人管。</li>
</ul>

<h4>三、模型包会不会带毒(重要)</h4>
<ul>
<li><b>会。</b>Unity 的 <b>.unitypackage</b> 可以包含脚本,理论上能在导入/运行时执行代码——来路不明的包确实存在塞恶意脚本的风险。</li>
<li><b>自保:</b>只从<b>可信来源</b>(作者本人店铺)下载;对群里转发、网盘来路不明的 unitypackage 保持警惕。</li>
<li>导入前可留意包里有没有<b>预期之外的脚本</b>(.cs 文件)、可疑的 Editor 脚本。不确定就别导进主工程。</li>
<li>杀软对部分插件会<b>误报</b>(如 VCC/部分工具),要分清误报和真威胁——可信来源的工具误报可放行,不明来源的别冒险。</li>
</ul>

<h4>四、crasher(崩溃器)是什么、怎么防</h4>
<ul>
<li><b>crasher</b> 是故意做来让<b>别人客户端崩溃</b>的恶意模型(超高面数、畸形网格、滥用粒子/着色器把显卡打爆)。</li>
<li>注意区分:有些是<b>故障特效(glitchy)风格</b>的正常模型,不是 crasher(reddit 有人专门问怎么区分)——crasher 的目的是搞崩你,glitchy 只是视觉风格。</li>
<li><b>防护靠安全设置:</b>VRChat 的 <b>Safety / 性能屏蔽</b>会自动隐藏超标(Very Poor)模型(见性能与安全篇),陌生人房间把安全等级调严能挡掉大部分 crasher。</li>
<li>遇到刻意 crasher:<b>屏蔽该用户、调高安全等级</b>,必要时举报。</li>
</ul>

<h4>五、隐私与账号安全(顺带)</h4>
<ul>
<li>别在不明第三方网站输 VRChat 账号密码(钓鱼)——只在官方客户端/官网登录。</li>
<li>装第三方<b>mod/破解客户端</b>有封号和盗号风险(也违 TOS,见性能与安全篇)。</li>
<li>账号问题(莫名封号、找回旧号上的模型)走官方支持,reddit 上这类申诉很常见但第三方帮不上。</li>
</ul>

<h4>六、自保清单(我整理)</h4>
<table><tr><th>场景</th><th>做法</th></tr>
<tr><td>下模型</td><td>只从作者本人店铺(Booth/Gumroad);拒绝盗模站</td></tr>
<tr><td>导 unitypackage</td><td>可信来源才导;留意意外脚本;不确定别进主工程</td></tr>
<tr><td>杀软报毒</td><td>分清误报(可信工具)和真威胁(不明来源)</td></tr>
<tr><td>陌生人房间</td><td>调高安全等级,自动屏蔽 Very Poor/crasher</td></tr>
<tr><td>遇到 crasher</td><td>屏蔽用户、调严安全设置、举报</td></tr>
<tr><td>账号</td><td>只在官方登录;不用破解客户端;问题走官方支持</td></tr>
</table>

<h4>七、和其他系统的联系</h4>
<ul>
<li>盗模的<b>版权/授权</b>角度见授权篇,本篇偏安全防护。</li>
<li>crasher 防护靠<b>性能屏蔽/安全等级</b>(见性能与安全篇)。</li>
<li>从哪买正版、怎么避坑见"模型从哪来"篇。</li>
</ul>

<h4>八、一句话总结</h4>
<p>模型三大安全坑:<b>盗模</b>(只从作者本人店铺买,盗模得不到更新且侵权)、<b>带毒文件</b>(.unitypackage 能塞恶意脚本,只导可信来源、留意意外脚本)、<b>crasher</b>(故意搞崩你的恶意模型,靠调高<b>安全等级</b>自动屏蔽 Very Poor、屏蔽+举报应对)。区分 crasher 和 glitchy 风格模型。账号别在第三方登录、别用破解客户端。与授权篇(版权)、性能与安全篇(屏蔽设置)、模型来源篇互补。</p>
`
},
{
 id:"cross-source-import",
 title:"把别处的模型搬进 VRChat:MMD/Roblox/VRM/其它来源转换",
 sub:"MMD(PMX)、ChilloutVR、Roblox、VRM 等来源怎么转成 VRChat 能用的模型(流程+坑)",
 mins:12,
 tags:["MMD","PMX","Roblox","VRM","转换","导入","Blender","进阶"],
 body:`
<h4>一、模型不一定要从 VRChat 商店买</h4>
<p>想把<b>MMD 模型</b>、<b>Roblox 形象</b>、<b>ChilloutVR 模型</b>或别的 <b>VRM</b> 搬进 VRChat?可以,但每种来源转换难度和坑都不同。这篇讲常见来源的转换思路、共性步骤、各自的坑。配合 Blender 篇、骨骼篇、上传篇、VRoid 篇、授权篇。</p>

<h4>二、先想清楚两件事(关键)</h4>
<ul>
<li><b>授权!</b>别人的 MMD 模型、游戏提取的模型,<b>很多禁止转用到其他平台</b>。MMD 模型常有严格的"禁止改造/禁止他平台"条款;游戏提取(rip)的资源基本都侵权。转之前先看授权(见授权篇)——这是红线。</li>
<li><b>所有来源的共同终点:</b>不管从哪来,进 VRChat 都要变成<b>带 Humanoid 骨骼 + VRChat 组件的 FBX/Prefab</b>(见骨骼篇、上传篇)。转换本质就是"把源格式整理成 VRChat 认的结构"。</li>
</ul>

<h4>三、MMD(.pmx)→ VRChat</h4>
<ul>
<li>MMD 用 <b>.pmx</b> 格式,Unity/VRChat 不直接认,要先进 <b>Blender</b>(装 PMX 导入插件,如 MMD Tools / Cats)。</li>
<li><b>骨骼是最大坑:</b>MMD 骨骼是日文命名、结构和 Humanoid 不同,要<b>重映射成 Humanoid</b>(Cats 插件能帮忙)。否则 VRChat 认不出人形(见骨骼篇)。</li>
<li><b>表情(morph):</b>MMD 的表情 morph 要转成 VRChat 的 viseme/blendshape(见形态键篇、viseme 篇)。</li>
<li><b>物理:</b>MMD 的刚体物理要重做成 PhysBone(见 PhysBone 篇)。</li>
<li>导出 FBX 进 Unity,常遇<b>贴图丢失</b>要手动重连(见 Blender 篇)。</li>
<li><b>MMD 世界跳舞:</b>另一种玩法是不转换,直接进 VRChat 的"MMD 世界"用自己模型跳舞(社区常见,和导入是两回事)。</li>
</ul>

<h4>四、Roblox 形象 → VRChat</h4>
<ul>
<li>Roblox 形象(R6/R15)是<b>方块拼接</b>风格,没有现成可导入的标准格式——多数情况要在 <b>Blender 里照着重建</b>模型,再标准绑骨(见 Blender 篇、骨骼篇)。</li>
<li>这更接近"参考 Roblox 风格做一个新模型",而非直接转换。注意 Roblox 资产的<b>使用授权</b>。</li>
</ul>

<h4>五、ChilloutVR / 其它 VR 社交平台 → VRChat</h4>
<ul>
<li>ChilloutVR(CVR)和 VRChat 都基于 Unity,模型工程相近,转换相对可行:换掉 CVR 的组件、加上 <b>VRChat 的 Avatar Descriptor</b> 和参数系统(见上传篇)。</li>
<li>骨骼若已是 Humanoid 基本能复用;着色器要换成 VRChat 兼容的(见着色器篇)。</li>
</ul>

<h4>六、VRM(VRoid 及其它)→ VRChat</h4>
<ul>
<li>VRM 是通用虚拟形象格式,导入 Unity 要装 <b>UniVRM</b>,再配 VRChat 组件(VRoid 走的就是这条,见 VRoid 篇)。</li>
<li>VRM 骨骼/形态键一般较规范,转换比 MMD 省心。</li>
</ul>

<h4>七、转换共性坑(我整理)</h4>
<table><tr><th>坑</th><th>解法</th></tr>
<tr><td>骨骼非 Humanoid</td><td>Blender 里重映射/Cats 一键(见骨骼篇)</td></tr>
<tr><td>贴图丢失</td><td>导 FBX 后手动重连材质贴图</td></tr>
<tr><td>表情没了</td><td>morph/blendshape 转成 viseme(见 viseme 篇)</td></tr>
<tr><td>物理失效</td><td>刚体/动骨重做成 PhysBone(见 PhysBone 篇)</td></tr>
<tr><td>性能爆表</td><td>MMD 模型常面数/材质超标,要优化(见性能篇)</td></tr>
<tr><td>着色器不兼容</td><td>换成 VRChat 兼容着色器(见着色器篇)</td></tr>
<tr><td>授权不允许</td><td>停——别转,违规且可能被封(见授权篇)</td></tr>
</table>

<h4>八、一句话总结</h4>
<p>把别处模型搬进 VRChat,先过两关:<b>授权</b>(MMD/游戏提取很多禁止转平台,这是红线)和<b>统一终点</b>(都要变成 Humanoid 骨骼 + VRChat 组件)。<b>MMD(.pmx)</b>最麻烦——进 Blender(Cats/MMD Tools)、骨骼重映射成 Humanoid、morph 转 viseme、刚体转 PhysBone、补贴图、优化。<b>Roblox</b> 基本是照风格在 Blender 重建。<b>ChilloutVR</b> 同 Unity 较好转(换组件)。<b>VRM</b> 装 UniVRM 最省心(见 VRoid 篇)。共性坑:骨骼/贴图/表情/物理/性能/着色器。与 Blender/骨骼/上传/形态键/授权篇直接相关。</p>
`
},
{
 id:"sps-dps-intro",
 title:"SPS/DPS 动态系统入门:概念、安装、找不到面板怎么办",
 sub:"什么是 SPS/DPS、怎么装、为什么没有面板、和 PhysBone 的关系(技术向)",
 mins:9,
 tags:["SPS","DPS","动态系统","PhysBone","Contact","插件","成人向","进阶"],
 body:`
<h4>一、SPS/DPS 是什么</h4>
<p>逛改模会看到 <b>SPS</b>、<b>DPS</b> 这些词,新人常一头雾水。它们是给模型加<b>动态交互系统</b>的插件(成人向居多,但本质是 Contact + PhysBone + 着色器的技术组合)。这篇中性讲清概念、安装、常见"装了没面板"的坑。和 PhysBone 篇、Contact 篇、MA 篇相关。</p>

<h4>二、概念分清(关键)</h4>
<table><tr><th>名称</th><th>说明</th></tr>
<tr><td><b>DPS</b></td><td>较早的动态系统(Dynamic Penetration System),基于早期动骨/着色器实现,现在多被 SPS 取代</td></tr>
<tr><td><b>SPS</b></td><td>较新的方案(属 VRCFury 生态),基于 <b>Contact</b> 实现,安装更简单、兼容性更好</td></tr>
</table>
<ul>
<li>底层用到的都是 VRChat 的通用技术:<b>Contact</b>(接触检测,见 Contact 篇)、<b>PhysBone</b>(物理,见 PhysBone 篇)、着色器变形。理解这些通用系统比记插件名更重要。</li>
</ul>

<h4>三、SPS 安装(VRCFury 生态)</h4>
<ul>
<li>SPS 通常<b>随 VRCFury 一起</b>装(见 VRCFury 篇)。装好 VRCFury 后,在网格上加 SPS 组件即可,不用手动连一堆 Contact。</li>
<li>这也是 reddit 上"<b>装了 SPS 却找不到面板/没有 SPS 标签</b>"的最常见原因:<b>VRCFury 没装好</b>或版本不对——SPS 面板依赖 VRCFury。先确认 VRCFury 正确安装(见 VRCFury 篇、VCC 篇)。</li>
</ul>

<h4>四、"找不到面板"排查表(实战)</h4>
<table><tr><th>现象</th><th>原因/解法</th></tr>
<tr><td>没有 SPS 标签/面板</td><td>VRCFury 没装或版本旧——重装/更新 VRCFury</td></tr>
<tr><td>组件加不上</td><td>选错对象;SPS 加在对应网格上</td></tr>
<tr><td>装了不起作用</td><td>Contact 没生成/被覆盖;检查 VRCFury 构建日志</td></tr>
<tr><td>对方看不到反应</td><td>双方都要装支持的系统 + 安全设置允许 Contact</td></tr>
</table>

<h4>五、和通用系统的关系(理解本质)</h4>
<ul>
<li>SPS/DPS 不是"黑魔法",是把 <b>Contact 发送器/接收器</b>(见 Contact 篇)+ <b>PhysBone</b>(见 PhysBone 篇)+ 着色器变形<b>打包自动化</b>了。手动也能搭,只是繁琐。</li>
<li>能不能被别人感知,取决于<b>双方都装了兼容系统</b>且 VRChat <b>Avatar Dynamics / Contact 安全设置</b>开着(见性能与安全篇)。</li>
<li>Contact 有数量和半径等限制(见 Contact 篇),堆太多影响性能(见性能篇)。</li>
</ul>

<h4>六、注意</h4>
<ul>
<li>这类内容多为<b>成人向</b>,只在<b>私人房</b>用、遵守平台规则和年龄限制(见安全篇)。</li>
<li>SPS/DPS 插件和模型一样要<b>正版来源、看授权</b>(见安全篇、授权篇)。</li>
</ul>

<h4>七、一句话总结</h4>
<p>SPS/DPS 是给模型加<b>动态交互</b>的插件:<b>DPS</b> 较旧(着色器/动骨),<b>SPS</b> 较新(基于 Contact,随 <b>VRCFury</b> 装,更简单)。reddit 高频问题"<b>装了没面板</b>"几乎都是 <b>VRCFury 没装好/版本不对</b>——SPS 面板依赖它。本质是 <b>Contact + PhysBone + 着色器</b>的自动化打包,能否被感知取决于双方都装兼容系统且 Contact 安全设置开启。成人向内容只在私人房用、遵守规则。与 VRCFury/Contact/PhysBone/安全篇相关。</p>
`
},
{
 id:"trust-rank-system",
 title:"信任等级:为什么传不了模型、怎么升级、和改模的关系",
 sub:"Visitor/New User/Known/Trusted 是什么、影响哪些功能、怎么提升(机制向)",
 mins:9,
 tags:["信任等级","Trust Rank","上传权限","新手","安全等级","账号","进阶"],
 body:`
<h4>一、改模前常被卡的一道门</h4>
<p>"我做好模型却<b>传不上去</b>"、"为什么别人能用某功能我不能"——很多时候不是改模问题,是<b>信任等级(Trust Rank)</b>不够。VRChat 用信任等级控制部分权限,新号受限。这篇讲等级体系、影响哪些功能、怎么升,以及和改模/安全的关系。配合上传篇、安全篇。</p>

<h4>二、信任等级是什么(机制)</h4>
<ul>
<li>VRChat 给每个账号一个<b>信任等级</b>,大致由游玩时长、社交、被他人正面互动等综合决定(官方<b>不公开精确算法</b>,reddit 上"具体阈值是多少"的讨论基本无定论)。</li>
<li>常见等级从低到高:<b>Visitor(游客)→ New User → User/Known → Trusted</b>(还有 Veteran 等)。颜色从灰到橙/绿区分。</li>
<li>它<b>不是改模水平</b>的体现,是账号"活跃且可信"的程度。</li>
</ul>

<h4>三、和改模/上传的直接关系(关键)</h4>
<ul>
<li><b>上传模型/世界需要达到一定信任等级。</b>全新的 <b>Visitor</b> 号通常<b>不能上传</b>——这是 reddit 上"做好模型传不上、SDK 不让传"的常见原因之一(另一类是 SDK/账号配置,见上传篇)。</li>
<li>升到 <b>New User</b> 一般就解锁<b>上传</b>能力。所以新人做好第一个模型,可能要先正常玩一会儿、把号养上来才能传。</li>
<li>其它受等级影响的:<b>公开发布</b>(public)世界/模型、部分社交功能、能否在公共房展示某些内容。</li>
</ul>

<h4>四、怎么提升(实战)</h4>
<table><tr><th>做法</th><th>说明</th></tr>
<tr><td><b>正常玩、累积时长</b></td><td>持续游玩是基础,信任随活跃增长</td></tr>
<tr><td><b>社交互动</b></td><td>和人正常交流、交友(被正面互动有帮助)</td></tr>
<tr><td><b>别违规</b></td><td>被举报/封禁会拉低甚至清零(见安全篇)</td></tr>
<tr><td><b>耐心</b></td><td>没有"一键升级",新号升到能上传通常要一点时间</td></tr>
</table>
<ul>
<li>注意有个<b>Nuisance(骚扰)</b>标记——行为不端会被降到这一档,功能严重受限。别刷屏、别捣乱。</li>
<li>网上"快速刷信任等级"的说法多不可靠,正常玩是唯一稳的路。</li>
</ul>

<h4>五、信任等级 ≠ 安全等级(别混)</h4>
<ul>
<li><b>信任等级</b>是"你这个账号的可信度";<b>安全等级(Safety)</b>是"你愿意显示对方多少内容"(见安全篇)。两者不同但相关。</li>
<li>你看别人时,可按对方<b>信任等级</b>批量设置显示哪些功能(陌生低信任号默认屏蔽其模型的音效/粒子等)——这也是防 crasher 的机制(见安全篇)。</li>
<li>所以你的信任等级低,在别人那边可能<b>默认被屏蔽</b>更多(模型显示不全),养上来后这种情况减少。</li>
</ul>

<h4>六、常见疑问(我整理)</h4>
<table><tr><th>疑问</th><th>答</th></tr>
<tr><td>做好模型传不上</td><td>可能是 Visitor 不能传;先养到 New User(也查 SDK/账号,见上传篇)</td></tr>
<tr><td>多久能升</td><td>无公开阈值;正常玩一段时间</td></tr>
<tr><td>为什么我模型在别人那显示不全</td><td>你信任低,对方按等级默认屏蔽;养上来改善</td></tr>
<tr><td>能花钱升吗</td><td>不能;VRChat+ 是订阅功能,不直接提升信任</td></tr>
<tr><td>被降级了</td><td>查是否违规/被举报(见安全篇)</td></tr>
</table>

<h4>七、一句话总结</h4>
<p><b>信任等级</b>(Visitor→New User→Known→Trusted)由活跃/社交/可信度综合决定,<b>官方不公开精确算法</b>。和改模最直接的关系:<b>全新 Visitor 号通常不能上传模型</b>,升到 <b>New User</b> 解锁上传——这是"做好模型传不上"的常见原因之一。提升靠正常玩、社交、不违规,<b>没有捷径</b>,别碰 Nuisance。注意它和<b>安全等级</b>不是一回事(一个是你的可信度,一个是你看别人的显示设置)。低信任号在别人那可能被默认屏蔽更多。与上传篇、安全篇相关。</p>
`
},
{
 id:"write-defaults",
 title:"Write Defaults:开关坏掉、动画串味的头号元凶",
 sub:"WD On/Off 是什么、为什么混用会出鬼、整套统一的实战规则",
 mins:11,
 tags:["Write Defaults","动画","Animator","开关","坑","进阶","必读"],
 body:`
<h4>一、一个让无数人抓狂的开关</h4>
<p>"我加的开关一关掉,脸就变形/材质乱了"、"动画放完不复位"、"别人用没事我用就出鬼"——十有八九是 <b>Write Defaults(WD)</b> 在作祟。这是 VRChat 动画系统最隐蔽、最经典的坑。这篇把它讲透:WD 是什么、为什么混用会爆炸、怎么整套统一。配合形态键篇、Playable Layers 篇、动画树篇、MA 篇。</p>

<h4>二、Write Defaults 到底是什么</h4>
<ul>
<li>它是 Unity Animator 里**每个动画状态(State)**上的一个勾选项,叫 <b>Write Defaults</b>。</li>
<li><b>WD On(勾上):</b>当这个状态没有控制某个属性时,该属性会<b>写回它的"默认值"</b>。</li>
<li><b>WD Off(不勾):</b>状态<b>只控制它动画里明确包含的属性</b>,其它属性<b>保持上一帧的值不动</b>。</li>
<li>简单说:WD On 像"没管的东西自动归位",WD Off 像"没管的东西保持原样"。</li>
</ul>

<h4>三、为什么混用会出鬼(核心)</h4>
<ul>
<li>问题<b>几乎从不是"On 还是 Off 本身"</b>,而是<b>一套 Animator 里 On 和 Off 混着用</b>。</li>
<li>混用时,某些状态归位、某些不归位,行为变得<b>不可预测</b>:开关关掉脸不复原、blendshape 卡住、两个开关互相干扰、动画放完残留。</li>
<li>典型现象:<b>开了某表情再关,脸回不到原样</b>;<b>切换服装时上一套的形变没清掉</b>。这些十有八九是 WD 不统一。</li>
</ul>

<h4>四、统一规则(实战,最重要)</h4>
<table><tr><th>原则</th><th>说明</th></tr>
<tr><td><b>全 On 或全 Off,别混</b></td><td>同一个 Animator Controller(乃至整个模型)里所有状态 WD 设成一致</td></tr>
<tr><td><b>跟随底模/工具的约定</b></td><td>很多现代工具(VRCFury、MA)默认按某种 WD 处理,跟着它走</td></tr>
<tr><td><b>VRChat 官方倾向 WD On</b></td><td>官方文档近年推荐 <b>WD On</b> 为默认做法(尤其配合新系统);很多老教程是 Off 时代的</td></tr>
<tr><td><b>动画要含完整起始帧</b></td><td>WD Off 下,toggle 动画最好包含"开"和"关"两个明确状态,别指望自动归位</td></tr>
</table>
<ul>
<li><b>怎么批量改:</b>手动一个个勾很容易漏。用工具批量设置(如 AV3 Manager / VRCFury 的处理 / 一些一键脚本)把整套统一,比手点可靠。</li>
<li><b>检查:</b>怀疑 WD 问题时,先确认是不是混用了——这是排查第一步。</li>
</ul>

<h4>五、和其它系统的关系</h4>
<ul>
<li><b>Modular Avatar / VRCFury</b>(见 MA 篇、VRCFury 篇)生成动画层时会按自己的 WD 约定处理,<b>手搓层要和它们保持一致</b>,否则混用。</li>
<li><b>Playable Layers</b>(见该篇):FX 层是 toggle/表情重灾区,WD 不统一最常在这里爆。</li>
<li><b>形态键开关</b>(见形态键篇、形态切换篇):blendshape toggle 关掉不复位,经典 WD 症状。</li>
</ul>

<h4>六、排查清单(我整理)</h4>
<table><tr><th>现象</th><th>查</th></tr>
<tr><td>开关关掉不复原</td><td>WD 是否混用;动画是否含归位帧</td></tr>
<tr><td>两个开关互相干扰</td><td>WD 统一 + 检查是否控制了重叠属性</td></tr>
<tr><td>动画放完残留</td><td>WD Off 没归位帧;改 On 或补帧</td></tr>
<tr><td>别人没事我有事</td><td>对方整套 WD 一致,你的混了</td></tr>
<tr><td>用了 MA/VRCFury 还出问题</td><td>手搓层和工具的 WD 约定不一致</td></tr>
</table>

<h4>七、一句话总结</h4>
<p><b>Write Defaults</b> 是 Animator 每个状态上的勾选项:<b>On</b>=没控制的属性自动归默认值,<b>Off</b>=没控制的属性保持上一帧。出鬼的根源<b>几乎都是一套里 On/Off 混用</b>导致行为不可预测(开关关掉不复原、形变残留)。铁律:<b>整套统一,别混</b>;官方近年倾向 <b>WD On</b>;WD Off 时动画要含明确归位帧;用工具批量设置别手点漏。配合 MA/VRCFury 时手搓层要和它们的约定一致。与 Playable Layers、形态键、动画树、MA 篇直接相关。</p>
`
},
{
 id:"kitbash-basemodel",
 title:"拼底模(Kitbash):用基底+配件组装专属模型",
 sub:"什么是 kitbash、底模怎么选、衣服配件怎么拼、常见坑",
 mins:11,
 tags:["kitbash","底模","base","配件","换装","Blender","进阶"],
 body:`
<h4>一、不是从零雕,而是"拼"</h4>
<p>VRChat 里绝大多数个性模型不是从零建的,而是<b>买一个底模(base model)+ 一堆衣服/配件/发型拼起来</b>,这套做法叫 <b>kitbash</b>。新人常问"怎么做一个自己的模型"——答案多半是 kitbash。这篇讲底模怎么选、配件怎么拼上去、常见坑。配合骨骼篇、权重篇、Blender 篇、MA 篇、授权篇。</p>

<h4>二、底模是什么、怎么选</h4>
<ul>
<li><b>底模(base)</b>是带好骨骼、blendshape、基础贴图的"裸模",专门给人拼装改造。热门底模在 <b>Booth</b> 等平台卖。</li>
<li>选底模看:<b>骨骼是否规范</b>(好绑配件)、<b>社区生态</b>(配件多不多——热门底模配件海量)、<b>授权</b>(能否商用/再分发,见授权篇)、<b>性能</b>(底模本身多重)。</li>
<li>热门底模(如各种知名 base)<b>配件兼容生态</b>是最大优势:很多衣服直接标"适配某底模",省去重绑。</li>
</ul>

<h4>三、配件怎么拼上去(关键)</h4>
<ul>
<li><b>同底模适配的配件</b>:最省事——衣服/发型已按这个底模的骨骼做好权重,拖进去对齐即可,可能微调。</li>
<li><b>跨底模的配件</b>:要<b>重新绑定权重</b>到目标骨骼(见权重篇),或在 Blender 里调整(见 Blender 篇),工作量大。</li>
<li><b>现代做法用 Modular Avatar</b>(见 MA 篇):很多配件做成 MA prefab,拖进去自动装骨骼/菜单,不用手动合并——大幅降低 kitbash 门槛。</li>
<li><b>穿模处理</b>:配件和身体重叠时,用 blendshape 把身体对应部位"缩进去"(shrink),或删隐藏网格(见形态键篇、性能篇)。</li>
</ul>

<h4>四、常见坑(实战)</h4>
<table><tr><th>坑</th><th>解法</th></tr>
<tr><td>配件不跟身体动</td><td>权重没绑到骨骼;重绑(见权重篇)</td></tr>
<tr><td>配件错位/比例不对</td><td>底模缩放不同;Blender 里对齐缩放(见缩放篇)</td></tr>
<tr><td>身体从衣服穿出来</td><td>用 shrink blendshape 缩身体或删隐藏面</td></tr>
<tr><td>材质/数量爆表</td><td>配件多→材质多;合并图集(见性能篇、合并篇)</td></tr>
<tr><td>骨骼对不上</td><td>跨底模配件骨骼命名/结构不同,要重映射(见骨骼篇)</td></tr>
<tr><td>授权不允许</td><td>底模/配件能否再分发看授权(见授权篇)</td></tr>
</table>

<h4>五、流程建议</h4>
<ol>
<li>选好<b>底模</b>(看生态/授权/性能)。</li>
<li>优先买<b>同底模适配</b>的配件,省重绑。</li>
<li>能用 <b>MA prefab</b> 就用,拖进去自动装。</li>
<li>处理<b>穿模</b>(shrink blendshape / 删面)。</li>
<li>做<b>开关</b>切换服装/配件(见形态切换篇、MA 篇)。</li>
<li><b>优化</b>:合并材质、查性能等级(见性能篇)。</li>
<li>注意全程<b>授权合规</b>(见授权篇、安全篇)。</li>
</ol>

<h4>六、一句话总结</h4>
<p><b>Kitbash</b> = 底模 + 配件拼装,是做个性模型的主流方式(不是从零雕)。<b>选底模</b>看骨骼规范/配件生态/授权/性能,热门底模的<b>配件兼容生态</b>是最大优势。配件拼装:<b>同底模适配</b>的最省事,<b>跨底模</b>要重绑权重,<b>Modular Avatar</b> prefab 能自动装骨骼/菜单大幅降门槛。常见坑:配件不跟动(权重)、错位(缩放)、穿模(shrink blendshape/删面)、材质爆表(合图集)、授权。与骨骼、权重、Blender、MA、形态键、性能、授权篇直接相关。</p>
`
}
];
