// 关卡 15：框架星 2 - AutoGen & CrewAI（完整重构）

PLANETS.push({
  id: 'p15',
  icon: '🤖',
  num: '星球 15',
  name: '框架星 2：AutoGen & CrewAI',
  desc: '学习多 Agent 协作框架，组建你的 AI 团队！',

  difficulties: {
    // 🟢 简单模式
    easy: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🤖 框架星 2</div>
            <p>飞船来到多 Agent 框架星，这里有各种 AI 团队！</p>
            <div class="chat-bubble robot">
              🤖 ARIA：船长！上一颗星球学了 LangGraph，<br>
              今天学两个专门为多 Agent 协作设计的框架：<br>
              <strong>AutoGen</strong>（微软）和 <strong>CrewAI</strong>！
            </div>
            <div class="chat-bubble">
              👦 你：它们和 LangGraph 有什么不同？
            </div>
            <div class="chat-bubble robot">
              🤖 ARIA：LangGraph 关注"流程控制"，<br>
              AutoGen 和 CrewAI 更关注"Agent 之间的对话和协作"！
            </div>
          `
        },
        {
          type: 'concept',
          title: '🤖 AutoGen vs CrewAI',
          html: `
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:8px">
              <div style="background:rgba(0,229,255,.08);border:1px solid rgba(0,229,255,.2);border-radius:12px;padding:14px">
                <strong style="color:var(--cyan)">🤖 AutoGen（微软）</strong>
                <p style="font-size:.82rem;color:var(--muted);margin-top:8px;line-height:1.8">
                  • 多个 Agent 互相对话<br>
                  • 像小组讨论<br>
                  • 支持代码执行<br>
                  • 人类可以随时介入
                </p>
              </div>
              <div style="background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2);border-radius:12px;padding:14px">
                <strong style="color:var(--green)">👥 CrewAI</strong>
                <p style="font-size:.82rem;color:var(--muted);margin-top:8px;line-height:1.8">
                  • 像公司组织架构<br>
                  • 每个 Agent 有明确角色<br>
                  • 任务分配清晰<br>
                  • 适合流程化工作
                </p>
              </div>
            </div>
            <div style="margin-top:14px;padding:12px;background:rgba(251,191,36,.08);border-left:3px solid var(--yellow);border-radius:8px;font-size:.9rem">
              💡 AutoGen 适合需要"讨论"的任务，CrewAI 适合需要"分工"的任务！
            </div>
          `
        },
        {
          type: 'quiz',
          q: '如果你要做一个"产品经理+工程师+测试员"协作完成项目的系统，哪个框架最合适？',
          opts: [
            'AutoGen，因为它是微软做的',
            'CrewAI，因为它专门为明确角色分工的团队协作设计',
            'LangChain，因为工具最多',
            '直接用 Claude API'
          ],
          ans: 1,
          feedback_ok: '🎯 正确！CrewAI 的 Agent/Task/Crew 模型完美对应"角色/任务/团队"的组织结构！',
          feedback_err: 'CrewAI 的设计理念就是模拟公司组织——每个 Agent 有角色，每个任务有负责人！'
        }
      ]
    },

    // 🟡 困难模式
    hard: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🤖 框架星 2（技术版）</div>
            <div class="chat-bubble robot">
              🤖 ARIA：船长！让我们看看 AutoGen 和 CrewAI 的实际代码。<br>
              重点理解它们的设计哲学，而不只是 API！
            </div>
          `
        },
        {
          type: 'code',
          title: '💻 CrewAI 完整实现：AI 研究团队',
          code: `from crewai import Agent, Task, Crew, Process
from crewai_tools import SerperDevTool, WebsiteSearchTool

# 工具
search_tool = SerperDevTool()

# ===== 定义 Agent 团队 =====

researcher = Agent(
    role="AI 研究员",
    goal="收集关于指定主题的最新、最准确的信息",
    backstory="""你是一个经验丰富的研究员，擅长从互联网上
    找到高质量的信息来源，并能快速识别关键信息。""",
    tools=[search_tool],
    verbose=True,
    allow_delegation=False  # 不允许把任务转给其他 Agent
)

analyst = Agent(
    role="数据分析师",
    goal="分析研究员收集的信息，找出关键趋势和洞察",
    backstory="""你是一个分析专家，擅长从大量信息中
    提炼出有价值的洞察，并用清晰的逻辑呈现。""",
    verbose=True,
    allow_delegation=False
)

writer = Agent(
    role="技术写作专家",
    goal="把分析结果写成清晰、专业的报告",
    backstory="""你是一个技术写作专家，能把复杂的技术内容
    写成普通人也能理解的文章。""",
    verbose=True,
    allow_delegation=False
)

# ===== 定义任务（注意：任务有依赖关系）=====

research_task = Task(
    description="""搜索关于"{topic}"的最新信息。
    收集至少 5 个可靠来源，记录关键数据和观点。
    输出：结构化的信息列表，包含来源 URL。""",
    expected_output="包含来源的结构化信息列表",
    agent=researcher
)

analysis_task = Task(
    description="""基于研究员收集的信息，进行深度分析：
    1. 识别 3-5 个关键趋势
    2. 找出不同来源的共识和分歧
    3. 评估信息的可靠性
    输出：分析报告（500字以内）""",
    expected_output="趋势分析报告",
    agent=analyst,
    context=[research_task]  # 依赖 research_task 的输出
)

writing_task = Task(
    description="""基于分析报告，写一篇面向普通读者的文章：
    - 标题吸引人
    - 开头用一个具体例子引入
    - 用简单语言解释复杂概念
    - 结尾给出实际建议
    字数：800-1000字""",
    expected_output="完整的文章",
    agent=writer,
    context=[analysis_task]  # 依赖 analysis_task 的输出
)

# ===== 组建团队并执行 =====

crew = Crew(
    agents=[researcher, analyst, writer],
    tasks=[research_task, analysis_task, writing_task],
    process=Process.sequential,  # 顺序执行（也可以 parallel）
    verbose=True
)

result = crew.kickoff(inputs={"topic": "2024年大模型技术进展"})
print(result)`,
          explanation: `
            <strong>CrewAI 的核心设计：</strong><br>
            • <strong>backstory</strong>：给 Agent 设定背景故事，影响它的"性格"和决策风格<br>
            • <strong>context</strong>：任务依赖，后一个任务自动获得前一个任务的输出<br>
            • <strong>allow_delegation</strong>：控制 Agent 是否可以把任务转给其他 Agent<br>
            • <strong>Process.sequential</strong>：顺序执行；<code>Process.hierarchical</code> 则有 Manager Agent 统筹
          `
        },
        {
          type: 'pitfalls',
          title: '⚠️ 常见坑点',
          items: [
            'Agent 角色设计太模糊：backstory 不清晰导致 Agent 行为不可预测——角色描述要具体',
            '任务依赖链太长：5+ 个任务串行，总时间很长——考虑哪些任务可以并行',
            'Token 消耗失控：每个 Agent 都有完整对话历史，多 Agent 系统 token 消耗是单 Agent 的 N 倍',
            '奉承行为：Agent 之间互相同意，不提出真正的异议——需要明确要求 Agent 批判性思考'
          ]
        },
        {
          type: 'quiz',
          q: 'CrewAI 中 Task 的 context 参数有什么作用？',
          opts: [
            '设置任务的优先级',
            '指定该任务依赖哪些前置任务，自动获取前置任务的输出作为输入',
            '设置任务的超时时间',
            '指定任务使用哪个工具'
          ],
          ans: 1,
          feedback_ok: '✅ 正确！context 建立了任务之间的依赖关系，让后续任务能自动获得前置任务的结果！',
          feedback_err: 'context 是 CrewAI 的任务编排核心——它告诉框架"这个任务需要等那个任务完成，并使用它的输出"！'
        }
      ]
    },

    // 🔴 地狱模式
    hell: {
      sections: [
        {
          type: 'dialogue',
          title: '🔍 多 Agent 团队为什么会集体犯错？',
          scenario: `<strong>故障场景</strong>：你用 AutoGen 搭了一个三 Agent 系统：<br>
• <strong>工程师 Agent</strong>：写代码<br>
• <strong>审核员 Agent</strong>：审查代码<br>
• <strong>用户 Agent</strong>：最终验收<br><br>
任务是写一个 Python 函数计算第 n 个斐波那契数。十轮对话后，三个 Agent 都同意了方案：<br>
<code>def fib(n): return n if n &lt;= 1 else fib(n-1) + fib(n-2)</code><br><br>
但这个函数对 <code>fib(40)</code> 需要约 30 亿次递归调用，实际运行会卡死。审核员 Agent 为什么没有发现这个问题？`,
          steps: [
            {
              question: '工程师写完代码，审核员说"代码逻辑正确，可以通过"。这个审核员为什么没有指出性能问题？',
              opts: [
                '审核员模型的版本太旧',
                '审核员的 system_message 没有明确要求批判，LLM 天然倾向于认同对方——这是奉承行为（Sycophancy）',
                '审核员没有工具可以运行代码',
                '斐波那契函数本来就没有问题'
              ],
              correct: 1,
              aria_correct: '✅ 对！这叫 Sycophancy（奉承行为）。LLM 天然倾向于认同对话中的另一方，在多 Agent 系统中这个问题被放大——两个 AI 互相认同，形成"回音室"。',
              aria_wrong: '❌ 想想：审核员自己也是 LLM，它也有 LLM 天然的倾向。它的"性格"由 system_message 决定。如果 system_message 没有明确要求批判，它默认会做什么？'
            },
            {
              question: '要修复这个问题，审核员 Agent 的 system_message 应该怎么写？',
              opts: [
                '你是一个友好的代码助手，帮助工程师改进代码',
                '你的职责是找出代码中的问题。如果代码有问题，明确指出。只有代码完全正确时，才说"审核通过"',
                '你是一个有 10 年经验的高级工程师',
                '你需要审查代码并给出评分（满分 10 分）'
              ],
              correct: 1,
              aria_correct: '✅ 正确！关键词是"找出问题"和"明确指出"。这明确对抗了 LLM 的奉承倾向。如果不写清楚，LLM 默认会倾向于同意。',
              aria_wrong: '❌ 奉承行为的根源是"没有明确要求批判"。要打破它，需要在 system_message 里明确告诉 Agent："你的职责是找问题，不是给赞美"。',
              reveal_on_correct: `<strong>AutoGen 的核心设计洞察</strong>：<br>角色定义决定行为。批评者 Agent 的 system_message 必须明确：<br><code>"你的职责是找出代码中的问题，而不是赞美。只有代码完全正确时，才说'审核通过'。"</code><br><br>这不是可选项，是对抗奉承行为的必要设计。`
            },
            {
              question: '三个 Agent 的系统，每轮对话 3 次 LLM 调用，运行 10 轮。和单 Agent（10 次调用）相比，成本是多少倍？',
              opts: [
                '3 倍',
                '10 倍',
                '30 倍',
                '100 倍'
              ],
              correct: 2,
              aria_correct: '✅ 对！3 个 Agent × 10 轮 = 30 次调用，是单 Agent 的 30 倍。而且每次调用还要处理越来越长的对话历史，实际成本更高。',
              aria_wrong: '❌ 算一下：每轮 3 个 Agent 各调用一次，运行 10 轮，一共 3 × 10 = 30 次调用。',
              reveal_on_correct: `<strong>多 Agent 的成本定律</strong>：<br>成本 ≈ Agent 数量 × 轮次 × 单次成本（还要加上不断增长的上下文长度）。<br><br>多 Agent 值得这个成本吗？只有当问题本身需要多角色协作——比如代码需要写作者和批评者的对立视角。否则单 Agent 更经济。`
            }
          ],
          completion_html: `<div style="color:var(--green);font-weight:700;padding:12px">✅ 你理解了多 Agent 系统的核心挑战！</div>
<div style="color:var(--muted);font-size:.9rem;margin-top:8px">奉承行为 + 成本爆炸，是多 Agent 系统失败的两大根源。<br>解法：明确的批评者角色 + 只在真正需要多角色时才用多 Agent。</div>`
        },
        {
          type: 'concept',
          title: '📄 你刚才想到的，2023 年微软把它做成了框架',
          html: `
            <div style="margin:14px 0;padding:16px;background:rgba(251,191,36,.1);border-left:3px solid var(--yellow);border-radius:12px;line-height:1.9">
              <strong style="font-size:1.05rem">AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation</strong><br>
              <span style="color:var(--muted);font-size:.9rem">作者：Qingyun Wu 等（微软研究院）· 2023</span><br><br>
              <span style="color:var(--cyan)">你刚才推导出的核心问题——"多 Agent 如果没有批评者就会互相认同"——正是这篇论文的主要动机！</span>
            </div>

            <div style="margin:20px 0;padding:16px;background:rgba(0,229,255,.06);border-radius:12px;line-height:1.9">
              <strong style="color:var(--cyan)">AutoGen 的核心设计</strong><br><br>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px">
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>对话协议</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">消息路由：auto / round_robin / custom<br>终止条件：关键词 / 最大轮次<br>Human-in-the-loop 内置支持</span>
                </div>
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>角色系统</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">每个 Agent 独立 system_message<br>批评者 = 对抗奉承的制度设计<br>代码执行与 LLM 解耦</span>
                </div>
              </div>
            </div>
          `
        },
        {
          type: 'concept',
          title: '🚀 多 Agent 框架的演进（2023→2026）',
          html: `
            <div style="display:flex;flex-direction:column;gap:12px">
              <div style="padding:12px;background:rgba(168,85,247,.08);border-left:3px solid var(--purple);border-radius:8px">
                <strong>2023 · AutoGen（微软）</strong><br>
                <span style="color:var(--muted);font-size:.9rem">多 Agent 对话框架，内置 Human-in-the-loop，代码执行能力强。奉承问题催生了批评者 Agent 模式。</span>
              </div>
              <div style="padding:12px;background:rgba(0,229,255,.08);border-left:3px solid var(--cyan);border-radius:8px">
                <strong>2023 · MetaGPT</strong><br>
                <span style="color:var(--muted);font-size:.9rem">用软件公司角色（PM、架构师、工程师）完成端到端项目生成。把奉承问题转化为流程约束。</span>
              </div>
              <div style="padding:12px;background:rgba(16,185,129,.08);border-left:3px solid var(--green);border-radius:8px">
                <strong>2023 · CrewAI</strong><br>
                <span style="color:var(--muted);font-size:.9rem">用"船员"隐喻简化 API，角色分工最清晰，适合快速原型。但复杂流程控制弱���</span>
              </div>
              <div style="padding:12px;background:rgba(251,191,36,.08);border-left:3px solid var(--yellow);border-radius:8px">
                <strong>2024 · LangGraph</strong><br>
                <span style="color:var(--muted);font-size:.9rem">基于图结构的工作流编排，Checkpointing 支持最好，最灵活但学习曲线最陡。</span>
              </div>
              <div style="padding:12px;background:rgba(239,68,68,.08);border-left:3px solid var(--red);border-radius:8px">
                <strong>2024 · Anthropic 官方建议</strong><br>
                <span style="color:var(--muted);font-size:.9rem">对大多数场景，直接用 Claude API + 简单 Python 比引入框架更清晰、更可控。框架适合真正复杂的编排需求。</span>
              </div>
            </div>
          `
        },
        {
          type: 'quiz',
          q: '为什么在 AutoGen 的多 Agent 系统中，需要专门设计一个"批评者 Agent"？',
          opts: [
            '因为批评者 Agent 运行更快',
            '对抗 AI 的奉承行为——没有批评者时，Agent 之间会互相同意，即使方案有明显问题',
            '因为框架要求必须有批评者',
            '批评者 Agent 可以减少 token 消耗'
          ],
          ans: 1,
          feedback_ok: '🔥 完美！这是多 Agent 系统设计的核心洞察。LLM 天然倾向于同意对方，在多 Agent 系统中会被放大。专门的批评者 Agent 打破这个循环，确保质量！',
          feedback_err: '奉承行为（Sycophancy）是多 Agent 系统的核心挑战。当 AI 提出方案，另一个 AI 会倾向于同意——即使方案有问题。批评者 Agent 打破这个"互相吹捧"的循环！'
        }
      ]
    }
  }
});
