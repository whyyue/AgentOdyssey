// 关卡 14：框架星 1 - LangChain & LangGraph（完整重构）

PLANETS.push({
  id: 'p14',
  icon: '🔗',
  num: '星球 14',
  name: '框架星 1：LangChain & LangGraph',
  desc: '学习最流行的 Agent 框架，快速构建复杂系统！',

  difficulties: {
    // 🟢 简单模式
    easy: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🔗 框架星 1</div>
            <p>飞船来到框架星，这里有各种现成的工具箱！</p>
            <div class="chat-bubble robot">
              🤖 ARIA：船长！从零写 Agent 很复杂，所以有人做了"框架"——<br>
              就像做蛋糕可以买预拌粉，不用自己准备每种材料！
            </div>
            <div class="chat-bubble">
              👦 你：那我们学哪个框架？
            </div>
            <div class="chat-bubble robot">
              🤖 ARIA：最流行的两个：<strong>LangChain</strong>（简单快速）<br>
              和 <strong>LangGraph</strong>（灵活强大）！
            </div>
          `
        },
        {
          type: 'concept',
          title: '🔗 LangChain vs LangGraph',
          html: `
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:8px">
              <div style="background:rgba(0,229,255,.08);border:1px solid rgba(0,229,255,.2);border-radius:12px;padding:14px">
                <strong style="color:var(--cyan)">🔗 LangChain</strong>
                <p style="font-size:.82rem;color:var(--muted);margin-top:8px;line-height:1.8">
                  • 像流水线，一步接一步<br>
                  • 有大量现成工具<br>
                  • 适合简单线性流程<br>
                  • 快速原型开发
                </p>
              </div>
              <div style="background:rgba(168,85,247,.08);border:1px solid rgba(168,85,247,.2);border-radius:12px;padding:14px">
                <strong style="color:var(--purple)">🗺️ LangGraph</strong>
                <p style="font-size:.82rem;color:var(--muted);margin-top:8px;line-height:1.8">
                  • 像地图，可以选路线<br>
                  • 支持循环和分支<br>
                  • 适合复杂决策逻辑<br>
                  • 精确控制状态
                </p>
              </div>
            </div>
            <div style="margin-top:14px;padding:12px;background:rgba(251,191,36,.08);border-left:3px solid var(--yellow);border-radius:8px;font-size:.9rem">
              💡 简单任务用 LangChain，复杂任务用 LangGraph！
            </div>
          `
        },
        {
          type: 'quiz',
          q: '如果你要做一个"搜索→分析→如果结果不好就重新搜索"的 Agent，应该用哪个框架？',
          opts: [
            'LangChain，因为它更流行',
            'LangGraph，因为它支持循环和条件分支',
            '两个都不用，自己写',
            'LangChain，因为它有现成工具'
          ],
          ans: 1,
          feedback_ok: '🎯 正确！有循环（重新搜索）和条件（结果不好才重搜），这正是 LangGraph 擅长的！',
          feedback_err: '有循环逻辑（重新搜索）的场景，LangGraph 的图结构更合适！'
        }
      ]
    },

    // 🟡 困难模式
    hard: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🔗 框架星 1（技术版）</div>
            <div class="chat-bubble robot">
              🤖 ARIA：船长！让我们看看 LangChain 和 LangGraph 的实际代码。<br>
              理解框架的设计思路，比记住 API 更重要！
            </div>
          `
        },
        {
          type: 'code',
          title: '💻 LangGraph 状态机 Agent',
          code: `from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated
import operator

# 1. 定义状态（TypedDict 保证类型安全）
class AgentState(TypedDict):
    query: str
    search_results: list[str]
    answer: str
    retry_count: int

# 2. 定义节点函数（每个节点接收状态，返回更新）
def search_node(state: AgentState) -> dict:
    results = web_search(state["query"])
    return {"search_results": results}

def evaluate_node(state: AgentState) -> dict:
    """评估搜索结果质量"""
    if len(state["search_results"]) < 2:
        return {"retry_count": state["retry_count"] + 1}
    return {}

def answer_node(state: AgentState) -> dict:
    context = "\\n".join(state["search_results"])
    answer = llm_call(f"基于以下资料回答：{context}\\n问题：{state['query']}")
    return {"answer": answer}

# 3. 条件路由函数
def should_retry(state: AgentState) -> str:
    if state["retry_count"] < 2 and len(state["search_results"]) < 2:
        return "retry"
    return "answer"

# 4. 构建图
workflow = StateGraph(AgentState)

workflow.add_node("search", search_node)
workflow.add_node("evaluate", evaluate_node)
workflow.add_node("answer", answer_node)

# 5. 添加边（包括条件边）
workflow.set_entry_point("search")
workflow.add_edge("search", "evaluate")
workflow.add_conditional_edges(
    "evaluate",
    should_retry,
    {
        "retry": "search",   # 结果不好，重新搜索
        "answer": "answer"   # 结果够好，生成答案
    }
)
workflow.add_edge("answer", END)

# 6. 编译并运行
app = workflow.compile()
result = app.invoke({
    "query": "2024年诺贝尔物理学奖得主",
    "search_results": [],
    "answer": "",
    "retry_count": 0
})`,
          explanation: `
            <strong>LangGraph 的核心概念：</strong><br>
            • <strong>State</strong>：整个工作流共享的数据，每个节点可以更新部分字段<br>
            • <strong>Node</strong>：处理函数，接收完整状态，返回要更新的字段<br>
            • <strong>Edge</strong>：节点之间的连接，可以是固定的或条件的<br>
            • <strong>条件边</strong>：根据状态决定走哪条路——这是 LangGraph 的核心优势
          `
        },
        {
          type: 'pitfalls',
          title: '⚠️ 框架使用的常见坑',
          items: [
            '过度抽象：框架封装太深，出错时不知道哪里出问题——启用 LangSmith 追踪',
            '版本不兼容：LangChain 更新极快，0.1→0.2→0.3 API 变化很大——锁定版本',
            '状态爆炸：LangGraph 状态越来越大，每个节点都往里加字段——定期清理无用字段',
            '框架依赖锁定：业务逻辑和框架代码混在一起，换框架时全部重写——保持核心逻辑独立'
          ]
        },
        {
          type: 'quiz',
          q: 'LangGraph 中"条件边"（conditional_edges）的作用是什么？',
          opts: [
            '让代码运行更快',
            '根据当前状态动态决定下一步走哪个节点，实现分支和循环',
            '连接两个节点',
            '保存状态到数据库'
          ],
          ans: 1,
          feedback_ok: '✅ 正确！条件边是 LangGraph 的灵魂——它让 Agent 能根据结果动态调整路径，而不是固定流程！',
          feedback_err: '条件边让 Agent 能"思考"下一步：结果好就继续，结果差就重试——这就是智能决策！'
        }
      ]
    },

    // 🔴 地狱模式
    hell: {
      sections: [
        {
          type: 'dialogue',
          title: '🔍 你的 Agent 工作流跑了一半崩了，所有进度全丢了',
          scenario: `<strong>故障场景</strong>：你用 LangGraph 搭了一个研究 Agent，工作流是：<br>
<strong>搜索 → 摘要 → 翻译 → 审校 → 生成报告</strong>（5 个步骤）<br><br>
处理一篇长文档时，第 3 步"翻译"API 超时了。<br>
Agent 报错停止。<br><br>
你重新运行——Agent 从第 1 步"搜索"重新开始。<br>
搜索又要花 30 秒，API 又要花钱。<br>
你已经做过搜索和摘要了，为什么不能从第 3 步继续？<br><br>
更糟的是：用户问了 5 个问题，Agent 在处理第 3 个问题时崩了。<br>
前 2 个问题的结果也没了。`,
          steps: [
            {
              question: '工作流跑到一半崩了，重新开始要重复已完成的步骤。你需要什么能力？',
              opts: [
                '让每个步骤更快，减少崩溃概率',
                '在每个步骤完成后保存状态——崩溃后从最后完成的步骤恢复，而不是从头开始',
                '用更稳定的 API',
                '把所有步骤合并成一步'
              ],
              correct: 1,
              aria_correct: '✅ 对！这就是 Checkpointing（检查点）——每个节点执行后自动保存状态。崩溃后从最后一个检查点恢复，而不是从头来。这是 LangGraph 最核心的生产特性。',
              aria_wrong: '❌ 让步骤更快只是降低崩溃概率，不解决根本问题——总会崩的。你需要的是"崩了之后怎么办"的机制。'
            },
            {
              question: '你有了 Checkpointing，每个步骤执行后保存状态。但不同用户的请求怎么区分？用户 A 的搜索结果不能混到用户 B 的回复里。你需要什么？',
              opts: [
                '给每个用户创建独立的数据库',
                '给每个请求分配唯一标识（thread_id），Checkpointing 按 thread_id 隔离状态',
                '串行处理所有请求，同一时间只处理一个',
                '用不同的 API key'
              ],
              correct: 1,
              aria_correct: '✅ 正确！thread_id 是多用户隔离的标准方案。每个请求有独立的 thread_id，状态按 thread_id 存储。用户 A 的检查点和用户 B 的检查点完全独立。这也让你可以查看任意用户的历史状态。',
              aria_wrong: '❌ 串行处理会让 200 个用户排队等——用户体验灾难。想想：你能不能给每个请求打一个标签，让状态存储按标签区分？'
            },
            {
              question: '有了 Checkpointing + thread_id 隔离，你的系统稳定了。但产品经理说："我想看用户 C 昨天下午 3 点的 Agent 执行到哪一步了，当时的中间结果是什么。" 你需要什么能力？',
              opts: [
                '把所有执行日志打印到文件',
                '保留完整的检查点历史（不是只保留最新的），支持时间旅行——回溯到任意历史状态查看',
                '让用户截图保存',
                '在数据库里存每一步的输入输出'
              ],
              correct: 1,
              aria_correct: '✅ 完全正确！LangGraph 的 get_state_history() 就是这个能力——它保留所有历史检查点，你可以回溯到任意时刻。这不只是调试工具，也是审计和合规的核心需求。',
              aria_wrong: '❌ 打印日志和截图都不够结构化。想想：你已经有了 Checkpointing（每步保存状态），如果保留所有检查点而不只是最新的，你能做到什么？',
              reveal_on_correct: `<strong>LangGraph 的三个核心生产特性</strong>：<br>1. <strong>Checkpointing</strong>：每个节点执行后自动保存状态 → 崩溃后从断点恢复<br>2. <strong>thread_id 隔离</strong>：不同用户/会话的状态完全独立 → 多用户并发安全<br>3. <strong>时间旅行</strong>：保留完整检查点历史 → 回溯任意时刻的状态<br><br>灵感来源：Google 的 Pregel 图计算模型——节点独立计算、消息传递、超步执行。LangGraph 把这套分布式计算的思想用在了 Agent 工作流上。`
            }
          ],
          completion_html: `<div style="color:var(--green);font-weight:700;padding:12px">✅ 你推导出了 Agent 工作流框架的核心设计！</div>
<div style="color:var(--muted);font-size:.9rem;margin-top:8px">检查点 + 状态隔离 + 时间旅行 = 生产级工作流框架。<br>没有这些特性的框架，只能做 demo，不能做生产。</div>`
        },
        {
          type: 'concept',
          title: '📄 你刚才推导出的，LangGraph 把它做成了产品',
          html: `
            <div style="margin:14px 0;padding:16px;background:rgba(251,191,36,.1);border-left:3px solid var(--yellow);border-radius:12px;line-height:1.9">
              <strong style="font-size:1.05rem">LangGraph：基于图结构的 Agent 工作流框架</strong><br>
              <span style="color:var(--muted);font-size:.9rem">LangChain 团队 · 2023-2024<br>灵感来源：Google Pregel（图计算）+ Actor 模型（并发）</span><br><br>
              <span style="color:var(--cyan)">你刚才推导出的三个特性——检查点、隔离、时间旅行——正是 LangGraph 区别于其他框架的核心能力！</span>
            </div>

            <div style="margin:20px 0;padding:16px;background:rgba(0,229,255,.06);border-radius:12px;line-height:1.9">
              <strong style="color:var(--cyan)">LangGraph vs 直接用 API</strong><br><br>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px">
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>用 LangGraph</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">✅ 5+ 步骤的复杂工作流<br>✅ 需要循环和条件分支<br>✅ 需要持久化状态<br>✅ Human-in-the-loop<br>✅ 团队协作可视化</span>
                </div>
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>直接用 Claude API</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">✅ 简单单次调用<br>✅ 需要最大灵活性<br>✅ 延迟敏感场景<br>✅ 学习和理解底层原理<br>✅ Anthropic 官方推荐</span>
                </div>
              </div>
            </div>
          `
        },
        {
          type: 'concept',
          title: '🚀 Agent 框架的演进（2023→2026）',
          html: `
            <div style="display:flex;flex-direction:column;gap:12px">
              <div style="padding:12px;background:rgba(168,85,247,.08);border-left:3px solid var(--purple);border-radius:8px">
                <strong>2023 · LangChain（第一代）</strong><br>
                <span style="color:var(--muted);font-size:.9rem">Chain（链式调用）抽象。快速原型，但复杂流程难以控制。链太长、错误处理弱、状态管理混乱。</span>
              </div>
              <div style="padding:12px;background:rgba(0,229,255,.08);border-left:3px solid var(--cyan);border-radius:8px">
                <strong>2023-2024 · LangGraph（第二代）</strong><br>
                <span style="color:var(--muted);font-size:.9rem">基于图的工作流。节点、边、条件路由。Checkpointing 改变了游戏规则——生产部署成为可能。学习曲线陡但值得。</span>
              </div>
              <div style="padding:12px;background:rgba(16,185,129,.08);border-left:3px solid var(--green);border-radius:8px">
                <strong>2024 · Anthropic 官方立场</strong><br>
                <span style="color:var(--muted);font-size:.9rem">对大多数场景，直接用 Claude API + 简单 Python 比引入框架更清晰、更可控。"不要为了用框架而用框架。"</span>
              </div>
              <div style="padding:12px;background:rgba(251,191,36,.08);border-left:3px solid var(--yellow);border-radius:8px">
                <strong>2025-2026 · 模型原生工作流</strong><br>
                <span style="color:var(--muted);font-size:.9rem">模型内置工具调用越来越强，很多原本需要框架编排的场景，现在一个 prompt + 几行代码就能搞定。框架在简化，不是在变复杂。</span>
              </div>
            </div>
          `
        },
        {
          type: 'quiz',
          q: 'LangGraph 的 Checkpointing 最重要的用途是什么？',
          opts: [
            '让代码运行更快',
            '保存每个节点执行后的状态，支持崩溃恢复、多用户隔离和历史回溯',
            '减少 API 调用次数',
            '自动优化 prompt'
          ],
          ans: 1,
          feedback_ok: '🔥 完美！Checkpointing 是 LangGraph 的杀手级特性。30 分钟的工作流跑到第 25 分钟崩了——有 Checkpointing 从第 25 分钟继续，没有就要从头来。生产环境的必备能力。',
          feedback_err: 'Checkpointing 解决的是"可靠性"问题——保存每步状态，崩溃后恢复，多用户隔离，历史可回溯。没有它，长时间工作流就是定时炸弹。'
        }
      ]
    }
  }
});
