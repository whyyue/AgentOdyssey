// 关卡 12：实战星 1 - 天气助手 Agent（完整重构）

PLANETS.push({
  id: 'p12',
  icon: '🌤️',
  num: '星球 12',
  name: '实战星 1：天气助手',
  desc: '从零构建一个真正能用的天气查询 Agent！',

  difficulties: {
    // 🟢 简单模式
    easy: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🌤️ 实战星 1</div>
            <p>飞船降落在实战星，这里是真正动手的地方！</p>
            <div class="chat-bubble robot">
              🤖 ARIA：船长！理论学完了，现在来做一个真正能用的 Agent！<br>
              我们先从最经典的开始——<strong>天气助手</strong>！
            </div>
            <div class="chat-bubble">
              👦 你：就是那种"明天要不要带伞？"的助手？
            </div>
            <div class="chat-bubble robot">
              🤖 ARIA：完全正确！它需要理解你的问题，调用天气工具，再给你答案。<br>
              这就是一个完整的 Agent 工作流程！
            </div>
          `
        },
        {
          type: 'concept',
          title: '🌤️ 天气助手的工作流程',
          html: `
            <div style="margin:14px 0;padding:14px;background:rgba(0,229,255,.06);border-radius:12px;font-family:monospace;font-size:.9rem;line-height:2">
              👤 用户："明天要不要带伞？"<br>
              &nbsp;&nbsp;↓<br>
              🧠 Agent 思考：需要知道位置和明天的天气<br>
              &nbsp;&nbsp;↓<br>
              🔧 调用 get_location() → "北京"<br>
              &nbsp;&nbsp;↓<br>
              🔧 调用 get_weather("北京", "明天") → "小雨，18°C"<br>
              &nbsp;&nbsp;↓<br>
              💬 回答："明天北京有小雨，建议带伞！"
            </div>
            <div style="margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:10px">
              <div style="background:rgba(0,229,255,.08);border:1px solid rgba(0,229,255,.2);border-radius:10px;padding:12px;font-size:.82rem">
                🔍 <strong>get_location()</strong><br>
                <span style="color:var(--muted)">获取用户当前位置</span>
              </div>
              <div style="background:rgba(168,85,247,.08);border:1px solid rgba(168,85,247,.2);border-radius:10px;padding:12px;font-size:.82rem">
                🌡️ <strong>get_weather(city, date)</strong><br>
                <span style="color:var(--muted)">查询指定城市天气</span>
              </div>
            </div>
          `
        },
        {
          type: 'quiz',
          q: '天气助手 Agent 的工作顺序是什么？',
          opts: [
            '先回答，再查天气',
            '理解问题 → 调用工具 → 整合结果 → 给出回答',
            '只调用工具，不需要理解问题',
            '先查所有城市的天气，再找到用户要的'
          ],
          ans: 1,
          feedback_ok: '🎯 完全正确！这就是 Agent 的标准工作流：理解→工具→整合→回答！',
          feedback_err: 'Agent 必须先理解问题，才知道要调用哪个工具！'
        }
      ]
    },

    // 🟡 困难模式
    hard: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🌤️ 实战星 1（技术版）</div>
            <div class="chat-bubble robot">
              🤖 ARIA：船长！让我们用 Claude API 实现一个真正的天气助手。<br>
              这会用到 tool_use 功能——让 Claude 自己决定何时调用工具！
            </div>
          `
        },
        {
          type: 'code',
          title: '💻 天气助手完整实现',
          code: `import anthropic
import json

client = anthropic.Anthropic()

# 定义工具
tools = [
    {
        "name": "get_weather",
        "description": "查询指定城市和日期的天气",
        "input_schema": {
            "type": "object",
            "properties": {
                "city": {"type": "string", "description": "城市名"},
                "date": {"type": "string", "description": "日期，如 today/tomorrow"}
            },
            "required": ["city", "date"]
        }
    },
    {
        "name": "get_location",
        "description": "获取用户当前位置",
        "input_schema": {"type": "object", "properties": {}}
    }
]

def execute_tool(name, inputs):
    """模拟工具执行"""
    if name == "get_location":
        return {"city": "北京"}
    if name == "get_weather":
        return {"temp": 18, "condition": "小雨", "humidity": 80}

def weather_agent(query: str) -> str:
    messages = [{"role": "user", "content": query}]

    while True:
        response = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=1024,
            tools=tools,
            messages=messages
        )

        # 没有工具调用，直接返回文本
        if response.stop_reason == "end_turn":
            return response.content[0].text

        # 处理工具调用
        tool_results = []
        for block in response.content:
            if block.type == "tool_use":
                result = execute_tool(block.name, block.input)
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": json.dumps(result, ensure_ascii=False)
                })

        # 把工具结果加回对话
        messages.append({"role": "assistant", "content": response.content})
        messages.append({"role": "user", "content": tool_results})`,
          explanation: `
            <strong>关键设计：</strong><br>
            • <strong>tool_use 循环</strong>：Claude 自己决定调用哪个工具，不需要手动解析意图<br>
            • <strong>stop_reason</strong>：<code>tool_use</code> 表示需要执行工具，<code>end_turn</code> 表示完成<br>
            • <strong>tool_result</strong>：把工具结果以特定格式返回给 Claude<br>
            • <strong>while True</strong>：循环直到 Claude 不再需要工具
          `
        },
        {
          type: 'pitfalls',
          title: '⚠️ 常见坑点',
          items: [
            '工具执行失败没有处理 → Claude 会困惑，应该返回 error 字段',
            '工具描述不清晰 → Claude 可能调用错误的工具或传错参数',
            '没有 max_iterations 限制 → 极端情况下可能无限循环',
            '工具结果太长 → 超出 Context Window，需要截断或摘要'
          ]
        },
        {
          type: 'quiz',
          q: 'Claude 的 tool_use 模式中，stop_reason 为 "end_turn" 意味着什么？',
          opts: [
            'Claude 出错了，需要重试',
            'Claude 不再需要调用工具，已经可以给出最终回答',
            'Claude 需要更多工具',
            '对话结束，不会再有回复'
          ],
          ans: 1,
          feedback_ok: '✅ 正确！end_turn 表示 Claude 已经有足够信息，可以直接回答了！',
          feedback_err: 'stop_reason 是 Claude 告诉你"下一步该怎么做"的信号！'
        }
      ]
    },

    // 🔴 地狱模式
    hell: {
      sections: [
        {
          type: 'dialogue',
          title: '🔍 你的天气 Agent 上线了，然后炸了',
          scenario: `<strong>故障场景</strong>：你的天气 Agent 上线第一天，一切正常。第二天高峰期（早 8-9 点），同时有 200 个用户查询天气。<br><br>
然后你收到一连串告警：<br>
• 用户 A：等了 30 秒没反应，超时了<br>
• 用户 B：收到了"北京今天晴"——但 B 问的是上海<br>
• 用户 C：Token 费用是平时的 50 倍<br>
• 用户 D：Agent 返回了"抱歉，查询失败"——但天气 API 其实是正常的<br><br>
200 个用户、4 种不同的故障。你的 demo 代码扛不住了。`,
          steps: [
            {
              question: '用户 B 问的是上海天气，却收到了北京的。你的代码里，用户 A 的查询结果和用户 B 的请求混在了一起。这是哪种 bug？',
              opts: [
                '天气 API 返回了错误数据',
                '并发竞争——多个请求共享了同一个变量（如全局 messages 列表），用户 A 的上下文泄漏到了用户 B 的回复中',
                '模型幻觉——AI 随机编了一个北京天气',
                '用户 B 的定位服务出错'
              ],
              correct: 1,
              aria_correct: '✅ 对！这是生产环境最常见的 bug：共享状态竞争。demo 阶段只有一个用户，全局变量没问题。200 个用户并发时，请求 A 的上下文和请求 B 的上下文混在一起了。解法：每个请求创建独立的变量，不共享任何可变状态。',
              aria_wrong: '❌ 想想：为什么用户 B 收到的是"北京"而不是"上海"？因为用户 A 刚问了北京，而你的代码里有什么被两个请求共享了？'
            },
            {
              question: '用户 C 的 Token 费用是平时的 50 倍。你查日志发现：天气 API 返回了 502 错误，Agent 反复重试了 10 次，每次都把完整的对话历史发给 LLM。怎么修复？',
              opts: [
                '不重试，失败就直接返回错误',
                '设置重试上限（如 3 次）+ Token 预算硬限制——无论重试多少次，总 Token 不能超过预算',
                '缩短对话历史，只保留最后两条',
                '换一个更便宜的模型'
              ],
              correct: 1,
              aria_correct: '✅ 正确！两层防护：① 重试上限防止无限循环 ② Token 预算作为硬性天花板。即使 Agent 逻辑有 bug 导致疯狂重试，Token 预算也能在成本失控前强制停止。这是生产系统的"安全阀"思维。',
              aria_wrong: '❌ 不重试太极端——网络抖动导致的临时 502 重试一次就好了。问题是"重试多少次才停？消耗多少 token 才停？"。你需要的是上限，不是禁用。'
            },
            {
              question: '用户 D 的 Agent 返回了"查询失败"——但天气 API 其实正常返回了数据。你发现工具调用的返回格式和 Agent 期望的不一致。怎么防止这种格式不匹配？',
              opts: [
                '让 LLM 自己处理各种格式',
                '在工具调用和 LLM 之间加一层标准化适配——把工具返回的原始数据统一转成 Agent 能理解的格式',
                '手动检查每次返回的格式',
                '换一个更好的天气 API'
              ],
              correct: 1,
              aria_correct: '✅ 完全正确！这就是"适配器模式"——工具返回什么格式不重要，适配器把它转成 Agent 期望的标准格式。API 返回 {"temp": 25, "code": 1}，适配器转成 "晴天，25°C"。这样即使 API 格式变了，也只需要改适配器，不影响 Agent 逻辑。',
              aria_wrong: '❌ LLM 处理格式不稳定——它可能正确解析一次，下一次就出错。想想：你能不能在"工具返回"和"LLM 看到结果"之间，加一层什么东西来保证格式？',
              reveal_on_correct: `<strong>生产 Agent 的三层防护</strong>：<br>1. <strong>隔离</strong>：每个请求独立的状态，不共享可变数据（解决并发竞争）<br>2. <strong>预算</strong>：Token 上限 + 重试上限（解决成本失控）<br>3. <strong>适配</strong>：工具和 LLM 之间的格式标准化层（解决接口不匹配）<br><br>缺少任何一层，生产环境都会出问题。`
            }
          ],
          completion_html: `<div style="color:var(--green);font-weight:700;padding:12px">✅ 你诊断出了生产 Agent 的三大类故障！</div>
<div style="color:var(--muted);font-size:.9rem;margin-top:8px">并发竞争 + 成本失控 + 格式不匹配——这就是 demo 和生产系统的差距。<br>解法：隔离 + 预算 + 适配，三层防护缺一不可。</div>`
        },
        {
          type: 'concept',
          title: '📄 你刚才遇到的问题，所有从 demo 走向生产的人都遇到过',
          html: `
            <div style="margin:14px 0;padding:16px;background:rgba(251,191,36,.1);border-left:3px solid var(--yellow);border-radius:12px;line-height:1.9">
              <strong style="font-size:1.05rem">生产级 Agent 的非功能性需求</strong><br>
              <span style="color:var(--muted);font-size:.9rem">不是某个特定论文，而是 2023-2024 年整个 AI 工程领域的实践共识</span><br><br>
              <span style="color:var(--cyan)">你刚才遇到的三种故障，对应了生产系统的三大支柱：可靠性、成本控制、可观测性。</span>
            </div>

            <div style="margin:20px 0;padding:16px;background:rgba(0,229,255,.06);border-radius:12px;line-height:1.9">
              <strong style="color:var(--cyan)">Demo → 生产的必经之路</strong><br><br>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px">
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>Demo 能跑</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">1 个用户<br>网络永远正常<br>API 永远返回正确格式<br>Token 随便用<br>出错了重启就行</span>
                </div>
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>生产能扛</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">10,000 个并发用户<br>网络会抖、API 会挂<br>返回格式可能变<br>每月 API 费用有上限<br>7×24 不间断运行</span>
                </div>
              </div>
            </div>
          `
        },
        {
          type: 'concept',
          title: '🚀 生产 Agent 工程的演进（2023→2026）',
          html: `
            <div style="display:flex;flex-direction:column;gap:12px">
              <div style="padding:12px;background:rgba(168,85,247,.08);border-left:3px solid var(--purple);border-radius:8px">
                <strong>2023 · 第一波 Agent 部署</strong><br>
                <span style="color:var(--muted);font-size:.9rem">大家发现 demo 和生产是两回事。并发、重试、超时、成本控制——传统后端工程的问题全部回来了。AI 工程师开始学 SRE。</span>
              </div>
              <div style="padding:12px;background:rgba(0,229,255,.08);border-left:3px solid var(--cyan);border-radius:8px">
                <strong>2024 · 可观测性工具爆发</strong><br>
                <span style="color:var(--muted);font-size:.9rem">LangSmith、Helicone、Braintrust 等平台出现，专门追踪 LLM 调用的 token、延迟、成本。Agent 监控从"可选"变成"必须"。</span>
              </div>
              <div style="padding:12px;background:rgba(16,185,129,.08);border-left:3px solid var(--green);border-radius:8px">
                <strong>2024 · Guardrails 和输出验证</strong><br>
                <span style="color:var(--muted);font-size:.9rem">Guardrails AI、NeMo Guardrails 等框架出现。在 LLM 输出到达用户之前验证格式、内容、安全性——你刚才设计的"适配层"就是最简单的 Guardrail。</span>
              </div>
              <div style="padding:12px;background:rgba(251,191,36,.08);border-left:3px solid var(--yellow);border-radius:8px">
                <strong>2025 · 成本优化成为核心竞争力</strong><br>
                <span style="color:var(--muted);font-size:.9rem">模型路由：简单问题用便宜模型，复杂问题用贵模型。缓存：相同问题直接返回缓存答案。Prompt 压缩：减少 token 消耗。API 费用从每月 $10K 降到 $1K。</span>
              </div>
            </div>
          `
        },
        {
          type: 'quiz',
          q: '从 demo 到生产，最重要的变化是什么？',
          opts: [
            '使用更大的模型',
            '加入非功能性保障：并发隔离、Token 预算、格式适配、监控告警',
            '增加更多工具',
            '用更复杂的 prompt'
          ],
          ans: 1,
          feedback_ok: '🔥 完美！Demo 的目标是"能跑"，生产的目标是"能扛"。并发隔离防竞争、Token 预算防超支、格式适配防接口错、监控告警防故障黑盒——这些才是 demo 和生产的真正差距。',
          feedback_err: 'Demo 和生产的差距不是功能，而是非功能性保障：并发安全、成本控制、错误处理、可观测性。功能再强大，扛不住生产流量也是白费。'
        }
      ]
    }
  }
});
