// 关卡 27：全栈集成星 - AgentOdyssey 终章

PLANETS.push({
  id: 'p27',
  icon: '🌟',
  num: '星球 27',
  name: '全栈集成：终章',
  desc: '将所有技能融合，构建完整的 Agent 应用！',

  difficulties: {
    // 🟢 简单模式
    easy: {
      sections: [
        {
          type: 'story',
          title: '🌟 你已经走了多远',
          content: `
            回顾一下你的旅程：<br><br>
            🔵 <strong>基础篇（P1-P8）</strong>：LLM 调用 → 工具调用 → ReAct 循环 → 记忆系统 → Multi-Agent<br>
            🟣 <strong>深度篇（P9-P16）</strong>：Transformer 原理 → 预训练 → 后训练 → 实战项目 → 框架应用<br>
            🔴 <strong>帝国篇（P17-P21）</strong>：制度化 Multi-Agent → 角色分工 → 质量控制 → 生产部署<br>
            🟡 <strong>MiroFish 篇（P23-P26）</strong>：GraphRAG → Agent 人格 → 仿真引擎 → 报告 Agent<br><br>
            现在，是时候把这一切融合在一起了。<br><br>
            <strong>全栈 Agent 开发者</strong>不只是会用某个框架，而是能从零设计并实现一个完整的 Agent 应用系统。
          `
        },
        {
          type: 'concept',
          title: '🏗️ 全栈 Agent 应用的架构',
          content: `
            一个完整的 Agent 应用包含以下层次：<br><br>
            <strong>前端层</strong><br>
            • 用户界面（Web/移动端）<br>
            • 实时流式显示 Agent 输出<br>
            • 工具调用状态可视化<br><br>
            <strong>API 层</strong><br>
            • RESTful / WebSocket 接口<br>
            • 会话管理（Session）<br>
            • 认证与授权<br><br>
            <strong>Agent 层</strong><br>
            • ReAct 循环引擎<br>
            • 工具注册与执行<br>
            • 记忆管理（短期 + 长期）<br><br>
            <strong>数据层</strong><br>
            • 向量数据库（长期记忆）<br>
            • 关系数据库（结构化数据）<br>
            • 消息队列（异步任务）
          `
        },
        {
          type: 'quiz',
          q: '在全栈 Agent 应用中，WebSocket 相比 HTTP 的核心优势是什么？',
          opts: [
            'WebSocket 更安全',
            'WebSocket 支持服务端主动推送，适合流式输出 Agent 的实时响应',
            'WebSocket 速度更快',
            'WebSocket 更容易实现'
          ],
          ans: 1,
          feedback_ok: '✅ 正确！Agent 的流式输出需要服务端持续推送数据，WebSocket 的双向通信完美支持这个场景。',
          feedback_err: 'WebSocket 的核心是"双向实时通信"——服务端可以主动推送数据，不需要客户端轮询，非常适合 Agent 的流式输出。'
        }
      ]
    },

    // 🔴 困难模式
    hard: {
      sections: [
        {
          type: 'story',
          title: '🔧 构建全栈 Agent 应用',
          content: `
            让我们以一个<strong>智能代码审查助手</strong>为例，看看全栈 Agent 应用的完整实现。<br><br>
            功能需求：<br>
            • 用户提交代码，Agent 自动审查<br>
            • 实时流式显示审查过程<br>
            • Agent 能调用工具运行代码、查文档<br>
            • 支持多轮对话追问<br>
            • 审查历史持久化存储<br><br>
            技术栈：<br>
            • 前端：React + WebSocket<br>
            • 后端：FastAPI + asyncio<br>
            • Agent：Anthropic SDK + 自定义工具<br>
            • 存储：PostgreSQL + pgvector
          `
        },
        {
          type: 'code',
          title: '💻 全栈 Agent 后端核心',
          code: `# backend/agent_server.py
from fastapi import FastAPI, WebSocket
from anthropic import AsyncAnthropic
import asyncio, json

app = FastAPI()
llm = AsyncAnthropic()

# 工具定义
CODE_REVIEW_TOOLS = [
    {
        "name": "run_linter",
        "description": "运行代码静态分析，检查语法错误和代码风格",
        "input_schema": {
            "type": "object",
            "properties": {
                "code": {"type": "string"},
                "language": {"type": "string", "enum": ["python", "javascript", "typescript"]}
            },
            "required": ["code", "language"]
        }
    },
    {
        "name": "search_best_practices",
        "description": "搜索某个编程模式的最佳实践",
        "input_schema": {
            "type": "object",
            "properties": {
                "pattern": {"type": "string", "description": "要搜索的编程模式或问题"}
            },
            "required": ["pattern"]
        }
    }
]

@app.websocket("/ws/review")
async def code_review_ws(websocket: WebSocket):
    await websocket.accept()

    try:
        while True:
            # 接收用户消息
            data = await websocket.receive_json()
            messages = data.get("messages", [])

            # 流式 Agent 循环
            await run_agent_stream(websocket, messages)

    except Exception as e:
        await websocket.send_json({"type": "error", "message": str(e)})

async def run_agent_stream(websocket: WebSocket, messages: list):
    """流式运行 Agent，实时推送结果"""
    for _ in range(10):  # max iterations
        async with llm.messages.stream(
            model="claude-opus-4-6",
            max_tokens=4096,
            system="你是一个专业的代码审查专家。请仔细分析代码，指出问题并给出改进建议。",
            tools=CODE_REVIEW_TOOLS,
            messages=messages
        ) as stream:
            tool_uses = []
            current_text = ""

            async for event in stream:
                if event.type == "content_block_delta":
                    if hasattr(event.delta, "text"):
                        current_text += event.delta.text
                        # 实时推送文字
                        await websocket.send_json({
                            "type": "text_delta",
                            "content": event.delta.text
                        })

            final = await stream.get_final_message()

            if final.stop_reason == "tool_use":
                # 通知前端正在调用工具
                await websocket.send_json({"type": "tool_start"})
                tool_results = await execute_tools(final.content)
                messages.append({"role": "assistant", "content": final.content})
                messages.append({"role": "user", "content": tool_results})
                await websocket.send_json({"type": "tool_end"})
            else:
                # 审查完成
                await websocket.send_json({"type": "done"})
                return`,
          explanation: `
            <strong>关键技术点：</strong><br>
            • <code>WebSocket</code>：双向实时通信，支持流式推送<br>
            • <code>AsyncAnthropic</code>：异步客户端，不阻塞事件循环<br>
            • <code>stream()</code>：流式输出，实时推送每个 token<br>
            • <code>tool_start/tool_end</code>：通知前端工具调用状态，可以显示 loading<br>
            • <code>messages 列表</code>：在 WebSocket 连接内维护对话历史
          `
        },
        {
          type: 'challenge',
          title: '✏️ 挑战：实现前端 WebSocket 客户端',
          description: '补全前端代码，连接 WebSocket 并实时显示 Agent 的流式输出。',
          starter: `// frontend/AgentChat.js
function AgentChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    // TODO: 建立 WebSocket 连接
    wsRef.current = new WebSocket("___");

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // TODO: 根据消息类型处理
      if (data.type === "text_delta") {
        // 追加文字到最后一条消息
        setMessages(prev => ___);
      } else if (data.type === "tool_start") {
        // TODO: 显示工具调用状态
        ___
      } else if (data.type === "done") {
        setIsLoading(false);
      }
    };

    return () => wsRef.current?.close();
  }, []);

  const sendCode = (code) => {
    setIsLoading(true);
    // TODO: 发送消息
    wsRef.current.send(JSON.stringify({
      messages: [{ role: "user", content: ___ }]
    }));
  };
}`,
          solution: `function AgentChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket("ws://localhost:8000/ws/review");

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "text_delta") {
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return [...prev.slice(0, -1), { ...last, content: last.content + data.content }];
          }
          return [...prev, { role: "assistant", content: data.content }];
        });
      } else if (data.type === "tool_start") {
        setMessages(prev => [...prev, { role: "system", content: "🔧 正在调用工具分析代码..." }]);
      } else if (data.type === "done") {
        setIsLoading(false);
      }
    };

    return () => wsRef.current?.close();
  }, []);

  const sendCode = (code) => {
    setIsLoading(true);
    wsRef.current.send(JSON.stringify({
      messages: [{ role: "user", content: \`请审查以下代码：\n\`\`\`\n\${code}\n\`\`\`\` }]
    }));
  };
}`,
          hints: [
            'WebSocket URL 格式：ws://localhost:8000/ws/review',
            '追加文字时，检查最后一条消息是否是 assistant，是则追加，否则新建',
            '发送代码时，用 Markdown 代码块格式包裹，方便 Agent 识别'
          ],
          validate: function(code) {
            if (code.includes('WebSocket') && code.includes('text_delta') && code.includes('tool_start') && !code.includes('___')) {
              return { ok: true, msg: '✅ 完美！前端 WebSocket 客户端实现正确，用户能实时看到 Agent 的分析过程了！' };
            }
            if (code.includes('___')) return { ok: false, msg: '还有未填写的 TODO 部分！' };
            if (!code.includes('text_delta')) return { ok: false, msg: '需要处理 text_delta 消息类型来实现流式显示！' };
            return { ok: false, msg: '检查 WebSocket 连接和消息处理逻辑。' };
          }
        },
        {
          type: 'quiz',
          q: '在全栈 Agent 应用中，为什么要在前端维护消息历史而不只依赖后端？',
          opts: [
            '前端存储更安全',
            '支持断线重连时恢复对话，以及在不同 WebSocket 连接间保持上下文',
            '减少后端存储压力',
            '前端处理速度更快'
          ],
          ans: 1,
          feedback_ok: '✅ 正确！WebSocket 连接可能断开，前端保存历史能在重连后恢复对话，提升用户体验。',
          feedback_err: '前端维护历史的核心原因是"容错"——WebSocket 断开后，前端能用保存的历史重建对话，不需要用户重新开始。'
        }
      ]
    },

    // 🔥 地狱模式
    hell: {
      sections: [
        {
          type: 'dialogue',
          title: '🔍 你要上线一个 Agent 产品，从哪里开始？',
          scenario: `<strong>场景</strong>：你学完了整个 AgentOdyssey 课程。现在老板说："给我做一个能用的 Agent 产品，下周五上线。"<br><br>
你面前有一堆选项：<br>
• 用 LangGraph 还是直接用 Claude API？<br>
• 需要 RAG 吗？向量数据库选哪个？<br>
• 要不要做多 Agent？用 CrewAI 还是 AutoGen？<br>
• 怎么监控？怎么控制成本？怎么处理错误？<br><br>
你有 5 天时间。如果你选错了技术栈，可能 3 天就浪费了。`,
          steps: [
            {
              question: '5 天上线一个 Agent 产品。你的第一个决定应该是什么？',
              opts: [
                '选最流行的框架',
                '先确定核心用例——用户到底要用这个 Agent 做什么？一个清晰的用例决定所有技术选择',
                '搭最复杂的架构',
                '开始写代码'
              ],
              correct: 1,
              aria_correct: '✅ 对！用例决定架构。"帮用户查天气"不需要多 Agent；"帮用户分析报告"需要 RAG；"帮团队管理项目"需要工作流编排。先用例，后技术。',
              aria_wrong: '❌ 选最流行的框架可能在用牛刀杀鸡——查天气不需要 LangGraph。先确定"用户要做什么"，所有技术选择都围绕这个用例。'
            },
            {
              question: '用例确定了：帮团队自动审查 GitHub PR 的代码。你选直接用 Claude API 还是 LangGraph？',
              opts: [
                'LangGraph，因为它更强大',
                '直接用 Claude API——这个用例是单次调用（拿到 diff → 让 LLM 审查 → 返回结果），不需要复杂的状态管理和多步编排。简单场景用简单方案',
                '两个都学一遍再决定',
                '用 CrewAI'
              ],
              correct: 1,
              aria_correct: '✅ 正确！Anthropic 官方建议：简单场景直接用 API。代码审查是"拿 diff → 调 LLM → 返回评论"，不需要图结构、不需要 Checkpointing、不需要状态机。直接用 API + 几行 Python，周五就能上线。',
              aria_wrong: '❌ LangGraph 强大但有学习成本和架构开销。代码审查真的是"多步复杂工作流"吗？还是"拿数据 → 调 LLM → 返回结果"？如果是后者，为什么需要框架？'
            },
            {
              question: '你选了直接用 Claude API，代码审查 Agent 上线了。上线第一天就出了问题：一个大型 PR（500 行改动）审查超时了。你没有监控，不知道是 LLM 超时还是 GitHub API 超时。你缺少什么？',
              opts: [
                '更大的 Context Window',
                '可观测性——记录每次调用的延迟、token 消耗、错误类型。出了问题能快速定位是"哪一层"出了问题',
                '更多的服务器',
                '换一个更快的模型'
              ],
              correct: 1,
              aria_correct: '✅ 完全正确！可观测性是生产系统的"眼睛"。没有监控的 Agent 是黑盒——出问题时你只能猜测。记录每次调用的耗时、token、错误，让你能快速定位问题所在。',
              aria_wrong: '❌ 你甚至不知道是 LLM 慢还是 GitHub API 慢——没有数据，所有猜测都是盲目的。你需要什么来"看到"系统内部发生了什么？',
              reveal_on_correct: `<strong>从学习到实战的三步走</strong>：<br>1. <strong>用例优先</strong>：确定用户要做什么，所有技术选择围绕用例<br>2. <strong>最简实现</strong>：简单场景用简单方案（直接 API），复杂场景才用框架<br>3. <strong>可观测性</strong>：上线第一天就要有监控——延迟、成本、错误率<br><br>这就是 AgentOdyssey 全部课程的核心收获：<br>LLM → 工具调用 → ReAct → 记忆 → 多Agent → 框架 → 生产级架构<br>每一层都是在前一层的基础上演进，最终指向同一个目标：<strong>做出能用的产品</strong>。`
            }
          ],
          completion_html: `<div style="color:var(--green);font-weight:700;padding:12px">✅ 你有了从学习到实战的方法论！</div>
<div style="color:var(--muted);font-size:.9rem;margin-top:8px">用例优先 → 最简实现 → 可观测性。<br>技术是为产品服务的，不是反过来。先做一个能跑的版本，再让它跑得好。</div>`
        },
        {
          type: 'concept',
          title: '📄 你的 Agent 知识体系完整地图',
          html: `
            <div style="margin:14px 0;padding:16px;background:rgba(0,229,255,.06);border-radius:12px;line-height:1.9">
              <strong style="color:var(--cyan)">27 颗星球，你走过的完整旅程</strong><br><br>
              <div style="display:grid;grid-template-columns:1fr;gap:8px;margin-top:12px">
                <div style="padding:10px;background:rgba(168,85,247,.08);border-radius:8px">
                  <strong>基础层（P1-P8）</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">LLM → Prompt → 工具调用 → ReAct → 记忆 → 多Agent</span>
                </div>
                <div style="padding:10px;background:rgba(0,229,255,.08);border-radius:8px">
                  <strong>原理层（P9-P11）</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">Transformer → 预训练（Scaling Laws）→ 后训练（RLHF）</span>
                </div>
                <div style="padding:10px;background:rgba(16,185,129,.08);border-radius:8px">
                  <strong>实战层（P12-P16）</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">天气助手 → 代码审查 → LangGraph → AutoGen/CrewAI → 生产架构</span>
                </div>
                <div style="padding:10px;background:rgba(251,191,36,.08);border-radius:8px">
                  <strong>架构层（P17-P21）</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">三省六部 → 状态机 → Event-Driven → 质量保障 → 生产实践</span>
                </div>
                <div style="padding:10px;background:rgba(239,68,68,.08);border-radius:8px">
                  <strong>前沿层（P23-P27）</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">GraphRAG → Generative Agents → 仿真引擎 → 报告Agent → 全栈集成</span>
                </div>
              </div>
            </div>
          `
        },
        {
          type: 'quiz',
          q: '学完整个课程后，做第一个 Agent 产品最重要的是什么？',
          opts: [
            '用最复杂的架构',
            '从最小可用版本开始：确定用例 → 最简实现 → 上线 → 收集反馈 → 迭代改进',
            '把所有学到的技术都用上',
            '等待完美的时机'
          ],
          ans: 1,
          feedback_ok: '🔥 完美！先做一个能跑的版本，比想一个完美的方案更有价值。你的第一个 Agent 不需要多 Agent、不需要 RAG、不需要 LangGraph——它需要的是"能解决用户的真实问题"。从简单开始，迭代变强。',
          feedback_err: '最重要的不是技术栈，而是方法论：用例优先 → 最简实现 → 快速上线 → 数据驱动迭代。先跑起来，再优化。'
        }
      ]
    }
  }
});
