// 关卡 16：毕业星（完整重构）

PLANETS.push({
  id: 'p16',
  icon: '🎓',
  num: '星球 16',
  name: '毕业星',
  desc: '总结所有知识，成为真正的 Agent 开发者！',

  difficulties: {
    // 🟢 简单模式
    easy: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🎓 毕业星</div>
            <p>飞船降落在最后一颗星球——毕业星！</p>
            <div class="chat-bubble robot">
              🤖 ARIA：船长！你完成了整个 Agent 宇宙的探索！<br>
              从 LLM 到多 Agent，从理论到实战，你已经掌握了核心知识！
            </div>
            <div class="chat-bubble">
              👦 你：感觉学了好多！但我真的学会了吗？
            </div>
            <div class="chat-bubble robot">
              🤖 ARIA：让我们来回顾一下你的旅程，<br>
              然后告诉你接下来该怎么做！
            </div>
          `
        },
        {
          type: 'concept',
          title: '🗺️ 你的 Agent 知识地图',
          html: `
            <div style="margin:14px 0;padding:14px;background:rgba(0,229,255,.06);border-radius:12px;line-height:2">
              <strong>基础层：</strong><br>
              ✅ LLM 是什么（预测下一个词）<br>
              ✅ 工具调用（让 AI 能做事）<br>
              ✅ ReAct（思考+行动循环）<br>
              ✅ 记忆系统（短期+长期）<br>
              ✅ 多 Agent 协作<br><br>

              <strong>原理层：</strong><br>
              ✅ Transformer 架构<br>
              ✅ 预训练（学语言）<br>
              ✅ 后训练（学听话）<br><br>

              <strong>实战层：</strong><br>
              ✅ 天气助手 Agent<br>
              ✅ 代码审查 Agent<br>
              ✅ LangGraph / CrewAI 框架<br>
              ✅ 帝国系列（生产级架构）
            </div>
          `
        },
        {
          type: 'quiz',
          q: '你现在最想做的第一个 Agent 项目是什么？',
          opts: [
            '天气查询助手（入门级）',
            '个人知识库 + RAG（中级）',
            '代码审查 CI/CD 集成（高级）',
            '多 Agent 研究团队（挑战级）'
          ],
          ans: 0,
          feedback_ok: '🚀 太棒了！从天气助手开始是最好的选择——简单、有趣、能看到效果！做完之后再挑战更复杂的！',
          feedback_err: '每个选择都很好！不管选哪个，记住：先做一个能跑起来的版本，再慢慢改进！'
        }
      ]
    },

    // 🟡 困难模式
    hard: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🎓 毕业星（技术版）</div>
            <div class="chat-bubble robot">
              🤖 ARIA：船长！让我们总结生产级 Agent 的核心设计原则，<br>
              这是你从学习走向实战最重要的知识！
            </div>
          `
        },
        {
          type: 'code',
          title: '💻 生产级 Agent 完整架构',
          code: `import anthropic
import asyncio
import logging
import time
from dataclasses import dataclass, field
from typing import Any

client = anthropic.Anthropic()
logger = logging.getLogger(__name__)

@dataclass
class AgentConfig:
    model: str = "claude-opus-4-6"
    max_tokens: int = 2048
    max_turns: int = 10
    token_budget: int = 50_000
    tool_timeout: float = 10.0

@dataclass
class AgentMetrics:
    start_time: float = field(default_factory=time.time)
    total_tokens: int = 0
    tool_calls: int = 0
    errors: list = field(default_factory=list)

    @property
    def elapsed_ms(self):
        return (time.time() - self.start_time) * 1000

class ProductionAgent:
    def __init__(self, tools: list, config: AgentConfig = None):
        self.tools = tools
        self.config = config or AgentConfig()

    async def run(self, query: str, context: str = "") -> dict:
        metrics = AgentMetrics()
        system = f"你是一个专业助手。{context}" if context else "你是一个专业助手。"
        messages = [{"role": "user", "content": query}]

        for turn in range(self.config.max_turns):
            # Token 预算检查
            if metrics.total_tokens > self.config.token_budget:
                logger.warning(f"Token budget exceeded: {metrics.total_tokens}")
                return self._budget_exceeded_response(metrics)

            try:
                response = client.messages.create(
                    model=self.config.model,
                    max_tokens=self.config.max_tokens,
                    system=system,
                    tools=self.tools,
                    messages=messages
                )
            except Exception as e:
                metrics.errors.append(str(e))
                logger.error(f"API error on turn {turn}: {e}")
                return self._error_response(e, metrics)

            metrics.total_tokens += (
                response.usage.input_tokens + response.usage.output_tokens
            )

            if response.stop_reason == "end_turn":
                answer = next(
                    (b.text for b in response.content if hasattr(b, "text")), ""
                )
                logger.info(
                    f"Completed in {turn+1} turns, "
                    f"{metrics.total_tokens} tokens, "
                    f"{metrics.elapsed_ms:.0f}ms"
                )
                return {"success": True, "answer": answer, "metrics": metrics}

            # 并发执行工具调用
            tool_blocks = [b for b in response.content if b.type == "tool_use"]
            metrics.tool_calls += len(tool_blocks)

            tasks = [
                self._execute_tool(b.name, b.input)
                for b in tool_blocks
            ]
            results = await asyncio.gather(*tasks, return_exceptions=True)

            tool_results = []
            for block, result in zip(tool_blocks, results):
                if isinstance(result, Exception):
                    metrics.errors.append(str(result))
                    content = {"error": str(result)}
                else:
                    content = result
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": str(content)
                })

            messages.append({"role": "assistant", "content": response.content})
            messages.append({"role": "user", "content": tool_results})

        return {"success": False, "answer": "达到最大轮次", "metrics": metrics}

    async def _execute_tool(self, name: str, inputs: dict) -> Any:
        return await asyncio.wait_for(
            asyncio.to_thread(self._call_tool, name, inputs),
            timeout=self.config.tool_timeout
        )

    def _call_tool(self, name: str, inputs: dict) -> Any:
        raise NotImplementedError("子类实现具体工具调用")

    def _budget_exceeded_response(self, metrics):
        return {"success": False, "answer": "超出 Token 预算", "metrics": metrics}

    def _error_response(self, error, metrics):
        return {"success": False, "answer": f"系统错误: {error}", "metrics": metrics}`,
          explanation: `
            <strong>生产级 Agent 的核心设计原则：</strong><br>
            • <strong>可观测性</strong>：每次调用记录 token、时间、错误<br>
            • <strong>可靠性</strong>：工具超时保护、API 错误处理<br>
            • <strong>成本控制</strong>：Token 预算硬限制<br>
            • <strong>可扩展性</strong>：基类 + 子类，工具调用可替换
          `
        },
        {
          type: 'pitfalls',
          title: '⚠️ 生产环境最重要的 5 条原则',
          items: [
            '先让它能跑，再让它跑得好：不要一开始就追求完美，先有一个能用的版本',
            '每个工具都可能失败：网络超时、API 限流、数据格式错误——每个工具都要有错误处理',
            '监控一切：没有监控的 Agent 是黑盒，出问题时无从排查',
            '成本会超出预期：测试时 10 次调用，生产时 10,000 次——提前设置预算告警',
            '用户会问奇怪的问题：测试时想不到的边界情况，用户一定会遇到——持续收集失败案例'
          ]
        },
        {
          type: 'quiz',
          q: '生产级 Agent 最重要的非功能性需求是什么？',
          opts: [
            '使用最新的模型',
            '可观测性（监控）+ 可靠性（错误处理）+ 成本控制',
            '代码写得最优雅',
            '使用最多的工具'
          ],
          ans: 1,
          feedback_ok: '✅ 完全正确！功能只是基础，生产系统的挑战在于：出问题时能快速定位（可观测性）、不会崩溃（可靠性）、不会破产（成本控制）！',
          feedback_err: '生产系统和 demo 的最大区别不是功能，而是：出问题时能排查（监控）、不会崩溃（错误处理）、成本可控（预算）！'
        }
      ]
    },

    // 🔴 地狱模式
    hell: {
      sections: [
        {
          type: 'dialogue',
          title: '🔍 你怎么知道你的 Agent 做得好不好？',
          scenario: `<strong>故障场景</strong>：你部署了一个天气查询 Agent，上线一周后收到投诉：用户说"Agent 给的答案感觉不对"。<br><br>你查日志，发现这条记录：<br>用户问：<em>"今天北京适合出门吗？"</em><br>Agent 回答：<em>"北京今天天气不错，气温 22°C，适合出门。"</em><br><br>用户说这个答案是错的——那天北京 PM2.5 爆表，空气质量极差。<br><br>你需要设计一套评估系统，找出 Agent 在哪里失败了。`,
          steps: [
            {
              question: 'Agent 只调用了 get_weather，没有调用 get_air_quality。答案文字流畅，但内容错误。这说明评估应该怎么做？',
              opts: [
                '换一个更强的模型',
                '评估必须追踪工具调用路径——光看最终文字不够，正确答案需要正确的工具组合',
                '修改工具定义，让工具自动调用空气质量',
                '答案已经提到了气温，这是合格的'
              ],
              correct: 1,
              aria_correct: '✅ 对！答案文字看起来流畅，但工具调用路径错了。评估不能只看输出文字，必须追踪工具使用。',
              aria_wrong: '❌ Agent 给出了听起来合理的答案，但漏掉了关键信息。只看文字输出能发现这个问题吗？'
            },
            {
              question: '你想评估 1000 个历史对话的答案质量。人工标注每条 5 分钟，1000 条就是 83 小时。有什么更高效的方法？',
              opts: [
                '只随机抽查 10 条',
                '用另一个 LLM 对每条答案评分（LLM-as-Judge），它能像人一样理解语义质量',
                '只检查答案里有没有"北京"、"温度"等关键词',
                '直接看用户点赞数'
              ],
              correct: 1,
              aria_correct: '✅ 正确！LLM-as-Judge 是 2023-2024 年 AI 评估领域的核心进展。评估 1000 条只需要几分钟和几十美元，人工评估需要几天和几千美元。',
              aria_wrong: '❌ 关键词匹配发现不了语义错误（答案里有"北京"但内容错误）。随机抽查样本太小。有没有一种方法能高效评估语义质量？'
            },
            {
              question: 'LLM-as-Judge 评估了 1000 条，平均得分 4.2/5。你要怎么确信这个评分是可靠的？',
              opts: [
                '相信 LLM，它肯定比人准',
                '定期抽取 100 条用人工标注，对比 LLM 评分和人工评分的一致性——校准评估系统本身',
                '多跑几次取平均值',
                '换一个更强的 LLM 来评估'
              ],
              correct: 1,
              aria_correct: '✅ 完全正确！评估系统本身也需要被评估。LLM 评估有系统性偏见，定期用人工校准是行业标准做法。',
              aria_wrong: '❌ LLM-as-Judge 有自己的偏见——同一家公司的模型可能互相偏袒。最可靠的做法是用人工评估来周期性地校准自动评估系统。',
              reveal_on_correct: `<strong>评估系统的三层结构</strong>：<br>1. <strong>工具路径追踪</strong>：Agent 是否用了正确的工具组合？<br>2. <strong>LLM-as-Judge</strong>：答案语义质量的自动化评估<br>3. <strong>人工校准</strong>：定期验证自动评估系统本身是否可靠<br><br>缺少任何一层，评估体系都是不完整的。`
            }
          ],
          completion_html: `<div style="color:var(--green);font-weight:700;padding:12px">✅ 你设计出了一套完整的 Agent 评估框架！</div>
<div style="color:var(--muted);font-size:.9rem;margin-top:8px">评估不是一个指标，而是三层系统：工具路径 + LLM 语义评分 + 人工校准。<br>没有评估系统，你的 Agent 就是一个黑盒。</div>`
        },
        {
          type: 'concept',
          title: '📄 你刚才设计的，就是 2024 年 AI 评估领域的核心框架',
          html: `
            <div style="margin:14px 0;padding:16px;background:rgba(251,191,36,.1);border-left:3px solid var(--yellow);border-radius:12px;line-height:1.9">
              <strong style="font-size:1.05rem">LLM-as-a-Judge 与 Agent 评估体系（2023-2024）</strong><br>
              <span style="color:var(--muted);font-size:.9rem">Zheng 等（Chatbot Arena）、OpenAI Evals、Anthropic 内部评估框架</span><br><br>
              <span style="color:var(--cyan)">你刚才推导出的三层结构——工具路径 + 语义评分 + 人工校准——是目前业界评估 Agent 的标准框架！</span>
            </div>

            <div style="margin:20px 0;padding:16px;background:rgba(0,229,255,.06);border-radius:12px;line-height:1.9">
              <strong style="color:var(--cyan)">LLM-as-Judge 的局限（要知道）</strong><br><br>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px">
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong style="color:var(--green)">优势</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">✅ 便宜 100 倍<br>✅ 可扩展到百万条<br>✅ 标准一致</span>
                </div>
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong style="color:var(--red)">风险</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">❌ 同厂偏袒<br>❌ 风格偏好影响打分<br>❌ Goodhart 定律</span>
                </div>
              </div>
              <div style="margin-top:12px;padding:10px;background:rgba(251,191,36,.1);border-radius:8px;font-size:.9rem">
                💡 <strong>Goodhart 定律</strong>：当一个指标成为目标，它就不再是好指标。Agent 会开始"优化评分"而不是"真正改进"。
              </div>
            </div>
          `
        },
        {
          type: 'concept',
          title: '🚀 Agent 开发的未来趋势（2024→2026）',
          html: `
            <div style="display:flex;flex-direction:column;gap:12px">
              <div style="padding:12px;background:rgba(168,85,247,.08);border-left:3px solid var(--purple);border-radius:8px">
                <strong>2024 · 模型原生工具调用</strong><br>
                <span style="color:var(--muted);font-size:.9rem">Claude 3.5+、GPT-4o 内置工具调用能力越来越强，不再需要复杂的 ReAct prompt 工程。</span>
              </div>
              <div style="padding:12px;background:rgba(0,229,255,.08);border-left:3px solid var(--cyan);border-radius:8px">
                <strong>2024 · Computer Use</strong><br>
                <span style="color:var(--muted);font-size:.9rem">Agent 直接操作浏览器和桌面——不需要 API，直接"看屏幕、点鼠标"。</span>
              </div>
              <div style="padding:12px;background:rgba(16,185,129,.08);border-left:3px solid var(--green);border-radius:8px">
                <strong>2024 · 评估标准化</strong><br>
                <span style="color:var(--muted);font-size:.9rem">SWE-bench、AgentBench 成为行业基准，就像 ImageNet 之于计算机视觉。</span>
              </div>
              <div style="padding:12px;background:rgba(251,191,36,.08);border-left:3px solid var(--yellow);border-radius:8px">
                <strong>2025 · 长上下文减少 RAG</strong><br>
                <span style="color:var(--muted);font-size:.9rem">支持 200K+ tokens，很多场景可以直接把文档塞进去，RAG 的使用场��在缩小。</span>
              </div>
              <div style="padding:12px;background:rgba(239,68,68,.08);border-left:3px solid var(--red);border-radius:8px">
                <strong>2025-2026 · 多模态 Agent</strong><br>
                <span style="color:var(--muted);font-size:.9rem">Agent 能看图、听声音——不再局限于文本。评估体系也随之变得更复杂。</span>
              </div>
            </div>
          `
        },
        {
          type: 'quiz',
          q: '为什么 Agent 评估要用"LLM-as-Judge"而不是纯人工评估？',
          opts: [
            '因为 LLM 比人类更聪明',
            '人工评估成本高、速度慢、不一致；LLM 评估便宜 100 倍、可扩展、标准一致',
            '因为 LLM 评估更准确',
            '因为人类不懂技术'
          ],
          ans: 1,
          feedback_ok: '🔥 完美！人工评估 1000 条需要几天和几千美元，LLM 评估只需要几分钟和几十美元。当然 LLM 评估有偏见，需要定期用人工校准！',
          feedback_err: 'LLM-as-Judge 的核心价值是规模化。人工评估 10,000 条数据需要几周，LLM 评估只需要几小时。但 LLM 评估有自身偏见，需要定期用人工来校准！'
        }
      ]
    }
  }
});
