// 关卡 17：帝国篇 - 三省六部架构

PLANETS.push({
  id: 'p17',
  icon: '🏛️',
  num: '星球 17',
  name: '帝国星 - 三省六部',
  desc: '用 1300 年前的制度，重新设计 AI 协作架构！',

  difficulties: {
    // 🟢 简单模式
    easy: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🏛️ 发现古老的帝国星球！</div>
            <p>ARIA 在星图上发现了一颗神秘的星球，上面闪烁着古老的文明光芒……</p>
            <div class="chat-bubble robot">
              🤖 ARIA：船长！这颗星球上有一个运行了 1300 年的系统！
              它叫<strong style="color:var(--cyan)">三省六部</strong>——
              是中国唐朝的官僚制度，用来管理整个帝国！
            </div>
            <div class="chat-bubble">
              👦 你：古代的制度？这和 AI Agent 有什么关系？
            </div>
            <div class="chat-bubble robot">
              🤖 ARIA：关系大了！现代的 Multi-Agent 系统都有一个问题：
              <strong>Agent 之间自由协作，容易出错，无法控制</strong>。<br><br>
              但三省六部不一样——它有<strong>分权制衡</strong>、<strong>强制审核</strong>、
              <strong>完全可观测</strong>！这正是现代 AI 系统需要的！
            </div>
          `
        },
        {
          type: 'concept',
          title: '📚 小明的班级管理系统',
          html: `
            <p>让我们用一个故事来理解三省六部：</p>
            <div style="margin:14px 0;padding:14px;background:rgba(0,229,255,.06);border-radius:12px;line-height:1.8">
              小明当了班长，要管理班级的各种事务。他发现一个人做不过来，于是建立了一个系统：<br><br>

              <strong>🎯 值日生（太子）</strong><br>
              • 接收同学的请求<br>
              • 判断：这是重要的事还是闲聊？<br>
              • 闲聊直接回复，重要的事交给计划委员<br><br>

              <strong>📋 计划委员（中书省）</strong><br>
              • 制定详细计划<br>
              • 比如"运动会需要准备什么？"<br>
              • 把计划交给检查委员审核<br><br>

              <strong>✅ 检查委员（门下省）</strong><br>
              • 检查计划是否合理<br>
              • 不合理就打回重做<br>
              • 合理才放行<br><br>

              <strong>📤 执行委员（尚书省）</strong><br>
              • 把任务分配给不同的小组<br>
              • 监督各小组的进度<br><br>

              <strong>👥 各个小组（六部）</strong><br>
              • 体育组、文艺组、卫生组等<br>
              • 各司其职，并行工作
            </div>
          `
        },
        {
          type: 'concept',
          title: '🔑 三个关键原则',
          html: `
            <p><strong>1. 分工合作</strong></p>
            <p style="margin-left:20px;color:var(--muted)">
              每个角色都有明确的职责，不会乱套
            </p>

            <p style="margin-top:12px"><strong>2. 质量检查</strong></p>
            <p style="margin-left:20px;color:var(--muted)">
              检查委员会审核计划，不合格就打回重做
            </p>

            <p style="margin-top:12px"><strong>3. 不能越级</strong></p>
            <p style="margin-left:20px;color:var(--muted)">
              体育组不能直接找计划委员，必须通过执行委员
            </p>

            <div style="margin-top:16px;padding:12px;background:rgba(251,191,36,.1);border-left:3px solid var(--yellow);border-radius:8px">
              💡 <strong>为什么这样设计？</strong><br>
              因为如果大家随便找人，就会乱成一团！<br>
              有了制度，每个人都知道该找谁，该做什么。
            </div>
          `
        },
        {
          type: 'quiz',
          q: '如果体育组发现计划有问题，应该怎么办？',
          opts: [
            '直接找计划委员修改',
            '告诉执行委员，让执行委员协调',
            '自己改了就行',
            '不管它，继续执行'
          ],
          ans: 1,
          feedback_ok: '🎉 正确！必须通过执行委员协调，不能越级！这就是"制度化协作"的核心——每个角色都有明确的沟通路径。',
          feedback_err: '记住：不能越级！体育组只能和执行委员沟通，由执行委员去协调其他角色。这样才能保证系统有序运行。'
        }
      ]
    },

    // 🟡 困难模式
    hard: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🏛️ 帝国星 - 技术版</div>
            <div class="chat-bubble robot">
              🤖 ARIA：船长，让我给你讲讲三省六部的技术实现。
              这是一个真实的开源项目：<strong>EDICT</strong>！
            </div>
          `
        },
        {
          type: 'concept',
          title: '🏗️ 三省六部架构',
          html: `
            <p>完整的 Multi-Agent 协作流程：</p>
            <div style="margin:14px 0;padding:14px;background:rgba(0,229,255,.06);border-radius:12px;font-family:monospace;font-size:.9rem;line-height:1.8">
              用户（皇上）<br>
              &nbsp;&nbsp;↓<br>
              太子（分拣）→ 判断是否重要<br>
              &nbsp;&nbsp;↓<br>
              中书省（规划）→ 制定方案<br>
              &nbsp;&nbsp;↓<br>
              门下省（审核）→ 审查方案<br>
              &nbsp;&nbsp;├─ ✅ 准奏 → 继续<br>
              &nbsp;&nbsp;└─ ❌ 封驳 → 返回中书省修改<br>
              &nbsp;&nbsp;↓<br>
              尚书省（派发）→ 分配任务<br>
              &nbsp;&nbsp;↓<br>
              六部（执行）→ 并行工作<br>
              &nbsp;&nbsp;├─ 礼部（文档）<br>
              &nbsp;&nbsp;├─ 户部（数据）<br>
              &nbsp;&nbsp;├─ 兵部（代码）<br>
              &nbsp;&nbsp;├─ 刑部（测试）<br>
              &nbsp;&nbsp;├─ 工部（基建）<br>
              &nbsp;&nbsp;└─ 吏部（人力）<br>
              &nbsp;&nbsp;↓<br>
              回奏（完成）
            </div>
          `
        },
        {
          type: 'code',
          title: '💻 三省六部系统实现',
          code: `class ImperialSystem:
    def __init__(self):
        self.taizi = TaiziAgent()
        self.zhongshu = ZhongshuAgent()
        self.menxia = MenxiaAgent()
        self.shangshu = ShangshuAgent()
        self.departments = {
            'li': LibuAgent(),
            'hu': HubuAgent(),
            'bing': BingbuAgent()
        }

    async def process_task(self, task):
        # 1. 太子分拣
        if not await self.taizi.is_important(task):
            return await self.taizi.reply_directly(task)

        # 2. 中书省规划
        plan = await self.zhongshu.create_plan(task)

        # 3. 门下省审核（最多3轮）
        for attempt in range(3):
            review = await self.menxia.review(plan)
            if review.approved:
                break
            plan = await self.zhongshu.revise(plan)

        # 4. 尚书省派发
        assignments = await self.shangshu.dispatch(plan)

        # 5. 六部执行
        results = await self.execute_departments(assignments)

        return await self.zhongshu.report(results)`,
          explanation: `
            <strong>核心要点：</strong><br>
            • 严格的流程顺序：太子 → 中书 → 门下 → 尚书 → 六部<br>
            • 门下省可以封驳：最多 3 轮审核<br>
            • 六部并行执行：提高效率<br>
            • 中书省负责回奏：汇总结果
          `
        },
        {
          type: 'pitfalls',
          title: '⚠️ 常见问题',
          items: [
            '不要让 Agent 自由协作 → 必须遵循制度化流程',
            '不要跳过门下省审核 → 这是质量保障的关键',
            '不要让六部直接调用中书省 → 必须通过尚书省',
            '不要无限重试 → 门下省审核最多 3 轮，避免死循环'
          ]
        },
        {
          type: 'quiz',
          q: '三省六部架构相比传统 Multi-Agent 框架的核心优势是什么？',
          opts: [
            'Agent 数量更多',
            '有强制的质量审核关卡（门下省）',
            '运行速度更快',
            '代码更简单'
          ],
          ans: 1,
          feedback_ok: '⭐ 正确！门下省的强制审核是三省六部的杀手锏。CrewAI 和 AutoGen 都没有这个机制，导致产出质量无法保证。',
          feedback_err: '关键在于"制度性审核"！门下省可以封驳不合格的方案，强制返工，这是传统框架没有的。'
        }
      ]
    },

    // 🔴 地狱模式
    hell: {
      sections: [
        {
          type: 'dialogue',
          title: '🔍 12 个 Agent 协作，为什么产出了垃圾结果？',
          scenario: `<strong>故障场景</strong>：你用 CrewAI 搭了一个 12 Agent 协作系统，任务是"为公司设计一个新产品的市场推广方案"。<br><br>
系统运行了 20 分钟，消耗了 $30 的 API 费用。最终输出是一份"方案"：<br>
• 第 1 段是市场分析，数据全部是编造的<br>
• 第 2 段是技术方案，写了一堆不存在的功能<br>
• 第 3 段是预算表，数字之间逻辑矛盾<br>
• 第 4 段是时间线，完全不可执行<br><br>
12 个 Agent 都"完成了任务"，但结果是一堆漂亮包装的垃圾。<br>
没有任何一个 Agent 检查过其他 Agent 的输出是否正确。`,
          steps: [
            {
              question: '12 个 Agent 都完成了任务，但结果是垃圾。最根本的问题是什么？',
              opts: [
                'Agent 数量不够，需要更多',
                '没有质量控制机制——Agent 做完就交，没有人检查输出是否正确。就像一个没有 QA 的开发团队',
                '模型版本太旧',
                '任务太复杂，不应该用 AI'
              ],
              correct: 1,
              aria_correct: '✅ 对！传统 Multi-Agent 框架（CrewAI/AutoGen）的核心缺陷：Agent 做完就交，没有审核。就像公司没有 QA 部门，工程师写完代码直接上线——结果可想而知。',
              aria_wrong: '❌ 12 个 Agent 已经够多了。问题是：它们之间有"互相检查"的机制吗？做完就交，谁在把关？'
            },
            {
              question: '你需要加一个"审核 Agent"。但问题来了：如果审核 Agent 也是 LLM，它怎么保证不会和执行 Agent 犯同样的错（比如一起编造数据）？',
              opts: [
                '用更强的模型做审核',
                '审核 Agent 必须从不同角度、用不同标准检查——关注"事实是否有来源""数据是否自洽""方案是否可执行"，而不是"看起来好不好"',
                '让人类做所有审核',
                '加更多审核 Agent，三个审核员比一个好'
              ],
              correct: 1,
              aria_correct: '✅ 正确！关键不是"更强的模型"，而是"不同的审查维度"。执行 Agent 关注"把方案写出来"，审核 Agent 关注"方案有没有问题"——目标不同，行为不同，才是制衡。就像中书省写方案、门下省审核方案，职责不同。',
              aria_wrong: '❌ 更强的模型也会犯同样的错——它们都是 LLM。关键在于"审核的视角"：执行 Agent 想"怎么写好"，审核 Agent 应该想"哪里有问题"。这需要什么？不同的目标和标准。'
            },
            {
              question: '你加了审核 Agent，它封驳了执行 Agent 的方案。执行 Agent 修改后重新提交，又被封驳。这样反复了 10 轮还没结束。怎么防止这种死循环？',
              opts: [
                '让审核 Agent 放宽标准',
                '设置审核上限（如 3 轮）——超过后强制升级给人类处理，而不是让两个 AI 无限循环',
                '让执行 Agent 第一次就做对',
                '删掉审核 Agent'
              ],
              correct: 1,
              aria_correct: '✅ 完全正确！审核上限 = 防止死循环的安全阀。3 轮不过就找人类，这比两个 AI 无限互相"抬杠"更高效。唐朝三省六部的门下省也是这样设计的——封驳有次数限制，不可能无限循环。',
              aria_wrong: '❌ 放宽标准等于没有审核。让 AI 第一次就做对也不现实。想想：如果两个 AI 一直达不成一致，你需要什么机制来"打破僵局"？',
              reveal_on_correct: `<strong>制度化协作的三层设计</strong>：<br>1. <strong>权限矩阵</strong>：谁能调用谁，防止越级和死循环<br>2. <strong>强制审核</strong>：不是可选的插件，而是必须经过的质量关卡<br>3. <strong>审核上限 + 人工升级</strong>：3 轮不过找人类，打破 AI 无限循环<br><br>这就是唐朝三省六部的设计：中书省拟方案 → 门下省审核（可封驳）→ 尚书省执行。1300 年前的制度设计，今天用在 AI 协作上依然有效。`
            }
          ],
          completion_html: `<div style="color:var(--green);font-weight:700;padding:12px">✅ 你推导出了制度化协作的核心设计！</div>
<div style="color:var(--muted);font-size:.9rem;margin-top:8px">权限控制 + 强制审核 + 审核上限 = 防止 AI 协作产出垃圾的制度保障。<br>没有这些机制，Agent 越多，垃圾越多。</div>`
        },
        {
          type: 'concept',
          title: '📄 你刚才设计的，就是 EDICT 项目的三省六部架构',
          html: `
            <div style="margin:14px 0;padding:16px;background:rgba(251,191,36,.1);border-left:3px solid var(--yellow);border-radius:12px;line-height:1.9">
              <strong style="font-size:1.05rem">EDICT：基于三省六部的 Multi-Agent 系统</strong><br>
              <span style="color:var(--muted);font-size:.9rem">12 个 Agent 协作 · Event-Driven 架构 · 实时 Dashboard · 完整审计日志</span><br><br>
              <span style="color:var(--cyan)">你刚才推导出的三层设计——权限矩阵、强制审核、审核上限——正是 EDICT 的核心架构！</span>
            </div>

            <div style="margin:20px 0;padding:16px;background:rgba(0,229,255,.06);border-radius:12px;line-height:1.9">
              <strong style="color:var(--cyan)">三省六部的角色映射</strong><br><br>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px">
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>太子（Orchestrator）</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">接收用户任务<br>判断任务类型和优先级<br>分配给中书省</span>
                </div>
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>中书省（Planner）</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">制定执行方案<br>分解子任务<br>最多修改 3 轮</span>
                </div>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px">
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>门下省（Reviewer）</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">审核方案质量<br>可行封驳、打回重做<br>最多审核 3 轮</span>
                </div>
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>尚书省 → 六部（Executor）</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">执行具体任务<br>六部各司其职<br>输出最终结果</span>
                </div>
              </div>
            </div>
          `
        },
        {
          type: 'concept',
          title: '🚀 制度化 AI 协作 vs 自由协作（2024→2026）',
          html: `
            <div style="display:flex;flex-direction:column;gap:12px">
              <div style="padding:12px;background:rgba(168,85,247,.08);border-left:3px solid var(--purple);border-radius:8px">
                <strong>2023 · 自由协作时代（CrewAI/AutoGen）</strong><br>
                <span style="color:var(--muted);font-size:.9rem">Agent 自由对话、自行分工。简单任务效果好，复杂任务经常跑偏、产出不可控。没有审核、没有审计、没有干预能力。</span>
              </div>
              <div style="padding:12px;background:rgba(0,229,255,.08);border-left:3px solid var(--cyan);border-radius:8px">
                <strong>2024 · 制度化协作出现（EDICT/MetaGPT）</strong><br>
                <span style="color:var(--muted);font-size:.9rem">引入权限矩阵、强制审核、状态机、审计日志。Agent 协作从"自由市场"变成"制度化的组织"。输出质量显著提升，但架构复杂度也增加。</span>
              </div>
              <div style="padding:12px;background:rgba(16,185,129,.08);border-left:3px solid var(--green);border-radius:8px">
                <strong>2025 · 混合模式</strong><br>
                <span style="color:var(--muted);font-size:.9rem">简单任务用自由协作（快），复杂任务用制度化协作（稳）。根据任务复杂度自动切换模式。EDICT 的太子 Agent 就是在做这种判断。</span>
              </div>
              <div style="padding:12px;background:rgba(251,191,36,.08);border-left:3px solid var(--yellow);border-radius:8px">
                <strong>2025-2026 · 模型原生协作</strong><br>
                <span style="color:var(--muted);font-size:.9rem">模型越来越强，很多需要制度约束的问题在模型层面被解决。但"审核"和"审计"作为制度性保障，即使在模型很强的未来也不会消失——就像人类社会再发达也需要审计。</span>
              </div>
            </div>
          `
        },
        {
          type: 'quiz',
          q: '为什么三省六部架构要限制门下省审核最多 3 轮？',
          opts: [
            '为了节省计算资源',
            '防止中书省和门下省陷入无限封驳循环——3 轮不过就升级给人类处理',
            '因为 3 是个吉利数字',
            '为了加快处理速度'
          ],
          ans: 1,
          feedback_ok: '🔥 正确！没有上限 = 潜在的死循环。中书省提方案 → 门下省封驳 → 中书省修改 → 门下省再封驳……3 轮是合理的平衡：给 AI 足够的改进机会，但也设定了明确的终止条件。',
          feedback_err: '核心是"防止死循环"。两个 AI 可能永远达不成一致。3 轮是安全阀——超过后升级给人类，打破 AI 的无限循环。'
        }
      ]
    }
  }
});
