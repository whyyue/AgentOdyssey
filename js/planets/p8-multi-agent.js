// 关卡 8：多 Agent 星（完整重构）

PLANETS.push({
  id: 'p8',
  icon: '🌐',
  num: '星球 08',
  name: '多 Agent 星',
  desc: '学习多 Agent 协作和架构模式。',

  difficulties: {
    // 🟢 简单模式
    easy: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🚀 最终星球！</div>
            <p>这颗巨大的星球上有无数个 Agent 机器人在协同工作，场面壮观！</p>
            <div class="chat-bubble robot">
              🤖 ARIA：船长！单个 Agent 能力有限，但如果把多个专业 Agent 组合起来，
              就能完成超级复杂的任务！这就是<strong>多 Agent 系统</strong>！
            </div>
            <div class="chat-bubble">
              👦 你：就像足球队？有守门员、前锋、中场……各有分工？
            </div>
            <div class="chat-bubble robot">
              🤖 ARIA：完美比喻！有一个「指挥官 Agent」负责分配任务，
              其他 Agent 各司其职，最后汇总结果！
            </div>
          `
        },
        {
          type: 'concept',
          title: '🌐 多 Agent 系统架构',
          html: `
            <div style="text-align:center;margin:10px 0">
              <div style="display:inline-block;background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.4);border-radius:12px;padding:10px 20px;font-weight:700;color:#fca5a5">
                🎯 指挥官 Agent（Orchestrator）
              </div>
            </div>
            <div style="display:flex;justify-content:center;gap:4px;margin:8px 0;color:var(--muted)">↙ &nbsp; ↓ &nbsp; ↘</div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:4px">
              <div style="background:rgba(0,229,255,.08);border:1px solid rgba(0,229,255,.2);border-radius:10px;padding:12px;text-align:center;font-size:.82rem">
                🔍<br><strong>搜索 Agent</strong><br><span style="color:var(--muted)">负责收集资料</span>
              </div>
              <div style="background:rgba(168,85,247,.08);border:1px solid rgba(168,85,247,.2);border-radius:10px;padding:12px;text-align:center;font-size:.82rem">
                📊<br><strong>分析 Agent</strong><br><span style="color:var(--muted)">负责分析数据</span>
              </div>
              <div style="background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2);border-radius:10px;padding:12px;text-align:center;font-size:.82rem">
                ✍️<br><strong>写作 Agent</strong><br><span style="color:var(--muted)">负责生成报告</span>
              </div>
            </div>
            <p style="margin-top:14px;font-size:.85rem;color:var(--muted);line-height:1.7">
              真实案例：你让 Agent「帮我分析今年的销售数据并写报告」——<br>
              搜索 Agent 收集数据 → 分析 Agent 处理数字 → 写作 Agent 生成报告 → 指挥官汇总给你！
            </p>
          `
        },
        {
          type: 'quiz',
          q: '多 Agent 系统中「指挥官 Agent」的主要作用是什么？',
          opts: [
            '自己完成所有任务，不需要其他 Agent',
            '分配任务给其他专业 Agent，并汇总结果',
            '只负责和用户聊天',
            '控制飞船导航系统'
          ],
          ans: 1,
          feedback_ok: '🏆 完美！指挥官 Agent 就像球队队长，负责战术分配，让每个 Agent 发挥专长！',
          feedback_err: '指挥官不是"全能选手"，而是"分配任务的人"！'
        }
      ]
    },

    // 🟡 困难模式
    hard: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🚀 多 Agent 星（技术版）</div>
            <div class="chat-bubble robot">
              🤖 ARIA：船长！让我给你讲讲多 Agent 系统的架构模式。
              这是构建复杂 Agent 系统的关键！
            </div>
          `
        },
        {
          type: 'concept',
          title: '🌐 多 Agent 架构模式',
          html: `
            <p>常见的多 Agent 架构：</p>
            <ul style="margin:10px 0 0 16px;line-height:2">
              <li><strong>Supervisor 模式</strong>：一个指挥官 Agent 分配任务给其他 Agent</li>
              <li><strong>Pipeline 模式</strong>：Agent 串行处理，输出传递给下一个</li>
              <li><strong>Parallel 模式</strong>：多个 Agent 并行工作，最后汇总</li>
              <li><strong>Hierarchical 模式</strong>：多层级的 Agent 组织</li>
            </ul>
          `
        },
        {
          type: 'code',
          title: '📟 Supervisor 模式示例',
          code: `def supervisor_agent(task):
    # 1. 分析任务
    plan = llm_call(f"分解任务：{task}")

    # 2. 分配给专业 Agent
    results = []
    if "搜索" in plan:
        results.append(search_agent.run())
    if "分析" in plan:
        results.append(analysis_agent.run())

    # 3. 汇总结果
    final = llm_call(f"汇总：{results}")
    return final`,
          explanation: `
            <strong>关键点：</strong><br>
            • Supervisor 负责任务分解和分配<br>
            • 各个专业 Agent 独立完成子任务<br>
            • Supervisor 汇总所有结果
          `
        },
        {
          type: 'pitfalls',
          title: '⚠️ 常见坑点',
          items: [
            '没有错误处理 → 一个 Agent 失败导致整个系统失败',
            'Agent 之间通信格式不统一 → 难以集成',
            '没有超时机制 → 某个 Agent 卡住导致整个系统卡住',
            '过度设计 → 简单任务不需要多 Agent，单 Agent 就够了'
          ]
        },
        {
          type: 'quiz',
          q: '什么时候应该使用多 Agent 系统？',
          opts: [
            '所有任务都应该用多 Agent',
            '任务复杂，需要不同专业能力协作时',
            '只有在有很多用户时才需要',
            '永远不应该用多 Agent'
          ],
          ans: 1,
          feedback_ok: '✅ 正确！多 Agent 适合复杂任务，简单任务用单 Agent 就够了！',
          feedback_err: '多 Agent 是为了处理复杂任务，不是所有情况都需要！'
        },
        {
          type: 'quiz',
          q: '完成了这个游戏，你学会了哪些概念？（选最全的）',
          opts: [
            '只学了 LLM 是什么',
            'LLM + 工具调用 + ReAct + 记忆 + 多Agent，这是完整的 Agent 知识体系！',
            '学会了如何制造真正的机器人',
            '学会了怎么开飞船'
          ],
          ans: 1,
          feedback_ok: '🚀🏆🌟 你太厉害了！你和爸爸都完整地了解了 Agent 开发的核心知识体系！冲冲冲！',
          feedback_err: '回想一下，我们探索了 8 颗星球：LLM、工具调用、ReAct、记忆、多Agent！'
        }
      ]
    },

    // 🔴 地狱模式
    hell: {
      sections: [
        {
          type: 'dialogue',
          title: '🔍 两个 AI 合作，为什么越聊越跑偏？',
          scenario: `<strong>故障场景</strong>：你搭了一个 CAMEL 风格的双 Agent 系统：<br>
• <strong>PM Agent</strong>：负责提需求、推进任务<br>
• <strong>开发 Agent</strong>：负责实现、给出代码<br><br>
任务是"为公司设计一个数据分析报告生成系统"。<br><br>
系统启动后，前两轮进展顺利。但第五轮时：<br>
PM Agent 突然开始写代码："我觉得可以用 <code>pandas.groupby()</code>……"<br>
开发 Agent 开始提需求："你确定要包含这个功能吗？用户真的需要吗？"<br><br>
两个 Agent 把角色搞反了，整个任务彻底跑偏。`,
          steps: [
            {
              question: 'PM Agent 开始写代码，开发 Agent 开始提需求。这个问题叫什么，根本原因是什么？',
              opts: [
                '模型版本太旧，换个更强的模型就好',
                '角色混淆（Role Confusion）——Inception Prompting 没有在整个对话过程中持续约束角色边界',
                '任务太复杂，应该分成更小的子任务',
                '对话轮数太多，超出了 Context Window'
              ],
              correct: 1,
              aria_correct: '✅ 对！这就是 CAMEL 论文命名的核心问题：Role Confusion（角色混淆）。LLM 在长对话中会逐渐"忘记"自己的角色，开始模仿对方的行为模式。',
              aria_wrong: '❌ 想想：两个 Agent 的"性格"由什么决定？它们是怎么知道自己是 PM 还是开发？如果这个设定不够强，长对话中会发生什么？'
            },
            {
              question: '要修复角色混淆，Inception Prompting 应该明确包含哪些内容？',
              opts: [
                '只写"你是一个 PM"，简洁就好',
                '详细写明：你的角色 + 你的具体目标 + 你的对话对象是谁 + 你的行为规则 + 任务完成的判断标准',
                '只写任务描述，不指定角色',
                '增加一个第三方 Agent 来监督两个 Agent'
              ],
              correct: 1,
              aria_correct: '✅ 正确！Inception Prompting 的核心是"让 Agent 充分入戏"——角色+目标+对象+规则+终止条件，缺一不可。越详细，角色越稳定。',
              aria_wrong: '❌ "你是一个 PM"只是个标签，不是角色设定。想想：真正的演员要入戏，需要了解角色的什么？背景、动机、对手是谁、这场戏要达成什么……',
              reveal_on_correct: `<strong>完整的 Inception Prompting 结构</strong>：<br><code>你正在扮演【角色名称】。<br>你的目标是：【具体目标】<br>你正在与【对话对象】合作。<br>你的行为规则：<br>1. 始终保持你的角色<br>2. 每次给出一个具体的【角色行为】<br>3. 不要做【禁止行为】<br>当任务完成时，说"任务完成"</code><br><br>越具体的约束 → 角色越稳定 → 对话越不容易跑偏。`
            },
            {
              question: '即使有了完整的 Inception Prompting，CAMEL 论文发现仍有约 15% 的对话会偏离任务。如何检测并处理这种偏离？',
              opts: [
                '增加 max_turns，让 Agent 有更多机会纠正自己',
                '每 N 轮插入一次"任务检查点"，让 Agent 回顾原始目标是否还在推进',
                '让 PM Agent 更强硬，直接否定开发 Agent 的偏离',
                '减少对话轮数，强制 Agent 更快收敛'
              ],
              correct: 1,
              aria_correct: '✅ 完全正确！任务检查点是对抗对话漂移的关键机制。每隔几轮注入"请确认：当前进展是否还在推进原始目标【X】？"，让 Agent 主动校正方向。',
              aria_wrong: '❌ 对话漂移是渐进的——Agent 不是突然跑偏，而是每轮稍微偏一点点，累积成大偏差。单纯增加轮次只会让漂移更严重。你需要一个周期性的"锚点"机制。',
              reveal_on_correct: `<strong>CAMEL 的三层防护</strong>：<br>1. <strong>Inception Prompting</strong>：对话开始时充分入戏（防止角色混淆）<br>2. <strong>任务检查点</strong>：每 N 轮回顾原始目标（对抗对话漂移）<br>3. <strong>max_turns 硬限制</strong>：兜底保护，防止无限循环消耗 token<br><br>缺少任何一层，多 Agent 对话都可能悄悄跑偏却没人发现。`
            }
          ],
          completion_html: `<div style="color:var(--green);font-weight:700;padding:12px">✅ 你理解了多 Agent 对话的核心挑战！</div>
<div style="color:var(--muted);font-size:.9rem;margin-top:8px">角色混淆 + 对话漂移，是让多 Agent 系统失控的两大元凶。<br>Inception Prompting + 任务检查点 + max_turns，是系统化的解法。</div>`
        },
        {
          type: 'concept',
          title: '📄 你刚才推导出的，2023 年 KAUST 把它写成了论文',
          html: `
            <div style="margin:14px 0;padding:16px;background:rgba(251,191,36,.1);border-left:3px solid var(--yellow);border-radius:12px;line-height:1.9">
              <strong style="font-size:1.05rem">CAMEL: Communicative Agents for "Mind" Exploration of Large Scale Language Model Society</strong><br>
              <span style="color:var(--muted);font-size:.9rem">作者：Guohao Li 等（KAUST，沙特阿卜杜拉国王科技大学）· NeurIPS 2023</span><br><br>
              <span style="color:var(--cyan)">你刚才推导出的三层问题——角色混淆、对话漂移、终止困难——正是这篇论文的核心研究动机！</span>
            </div>

            <div style="margin:20px 0;padding:16px;background:rgba(0,229,255,.06);border-radius:12px;line-height:1.9">
              <strong style="color:var(--cyan)">论文的关键发现</strong><br><br>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px">
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>实验规模</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">50 职业 × 50 任务 = 2,500 对话<br>共约 50,000 轮 Agent 对话<br>平均每对话 15-20 轮</span>
                </div>
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>核心数据</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">有 Inception Prompting：任务完成率 78%<br>没有 Inception Prompting：仅 45%<br>对话漂移率：约 15%</span>
                </div>
              </div>
              <div style="margin-top:12px;padding:10px;background:rgba(251,191,36,.1);border-radius:8px;font-size:.9rem">
                💡 <strong>意外发现</strong>：Agent 在对话中会涌现出"主动澄清需求"、"拒绝不合理指令"、"提出超出任务要求的改进建议"等未经设计的协作行为。
              </div>
            </div>
          `
        },
        {
          type: 'concept',
          title: '🚀 CAMEL 之后：多 Agent 框架的演进（2023→2026）',
          html: `
            <div style="display:flex;flex-direction:column;gap:12px">
              <div style="padding:12px;background:rgba(168,85,247,.08);border-left:3px solid var(--purple);border-radius:8px">
                <strong>2023 · CAMEL（KAUST）</strong><br>
                <span style="color:var(--muted);font-size:.9rem">首个系统研究多 Agent 对话的框架，提出 Inception Prompting。发现角色混淆和对话漂移是核心挑战。</span>
              </div>
              <div style="padding:12px;background:rgba(0,229,255,.08);border-left:3px solid var(--cyan);border-radius:8px">
                <strong>2023 · AutoGen（微软）</strong><br>
                <span style="color:var(--muted);font-size:.9rem">工程化的多 Agent 对话框架，内置 Human-in-the-loop，支持代码执行。引入批评者 Agent 对抗奉承行为。</span>
              </div>
              <div style="padding:12px;background:rgba(16,185,129,.08);border-left:3px solid var(--green);border-radius:8px">
                <strong>2023 · MetaGPT</strong><br>
                <span style="color:var(--muted);font-size:.9rem">模拟软件公司（PM+架构师+工程师+测试），给每个角色分配标准化输出格式（PRD、代码、测试报告），解决"输出格式混乱"问题。</span>
              </div>
              <div style="padding:12px;background:rgba(251,191,36,.08);border-left:3px solid var(--yellow);border-radius:8px">
                <strong>2023 · CrewAI</strong><br>
                <span style="color:var(--muted);font-size:.9rem">简化 API，用"船员"隐喻组织 Agent 团队，角色分工最清晰。适合快速原型，但复杂流程控制较弱。</span>
              </div>
              <div style="padding:12px;background:rgba(239,68,68,.08);border-left:3px solid var(--red);border-radius:8px">
                <strong>2024 · Anthropic 官方建议</strong><br>
                <span style="color:var(--muted);font-size:.9rem">对大多数场景，直接用 Claude API + 简单 Python 比引入任何框架都更清晰、更可控。多 Agent 框架适合真正复杂的编排需求。</span>
              </div>
            </div>
          `
        },
        {
          type: 'quiz',
          q: 'CAMEL 论文中，"Inception Prompting"解决的核心问题是什么？',
          opts: [
            '让 Agent 运行更快，减少 API 调用次数',
            '在对话开始时给每个 Agent 充分的角色设定，防止长对话中出现角色混淆和任务偏离',
            '让两个 Agent 之间的消息格式标准化',
            '让 Agent 生成更长、更详细的回答'
          ],
          ans: 1,
          feedback_ok: '🔥 完美！Inception Prompting 是 CAMEL 的核心贡献。就像演员开拍前要深入了解角色背景，Inception Prompting 让 Agent 在对话开始时就"入戏"——角色+目标+对话对象+行为规则，整个协作过程中都不会忘记自己是谁、要做什么。',
          feedback_err: 'Inception Prompting 解决的是"角色混淆"问题。在多 Agent 长对话中，LLM 很容易忘记自己的角色，开始模仿对方的行为。Inception Prompting 在开始时给出完整的角色设定，让 Agent 始终保持专注。'
        }
      ]
    }

  }
});
