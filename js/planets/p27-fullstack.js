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
          type: 'story',
          title: '😈 地狱挑战：生产级 Agent 系统',
          content: `
            你已经能构建一个可运行的 Agent 应用了。<br>
            但"可运行"和"生产级"之间，还有一道鸿沟：<br><br>
            <strong>生产级系统需要面对：</strong><br>
            • <strong>并发</strong>：同时有 1000 个用户在使用，如何不互相干扰？<br>
            • <strong>限流</strong>：LLM API 有速率限制，如何优雅降级？<br>
            • <strong>可观测性</strong>：Agent 做了什么决策？为什么失败？<br>
            • <strong>成本控制</strong>：每次对话消耗多少 token？如何设置预算？<br>
            • <strong>安全</strong>：如何防止 Prompt Injection？如何限制工具权限？<br><br>
            这些是真实生产环境中 Agent 工程师每天面对的挑战。
          `
        },
        {
          type: 'code',
          title: '💻 生产级 Agent 中间件',
          code: `# production/agent_middleware.py
import time, asyncio, logging
from dataclasses import dataclass, field
from collections import defaultdict

@dataclass
class AgentSession:
    user_id: str
    messages: list = field(default_factory=list)
    token_used: int = 0
    token_budget: int = 50000  # 每个会话的 token 预算
    created_at: float = field(default_factory=time.time)

class ProductionAgentMiddleware:
    def __init__(self, agent, rate_limit=10):
        self.agent = agent
        self.rate_limit = rate_limit  # 每分钟最多 N 次调用
        self.sessions: dict[str, AgentSession] = {}
        self.call_counts = defaultdict(list)  # user_id -> [timestamps]
        self.logger = logging.getLogger("agent.production")

    async def handle_request(self, user_id: str, message: str) -> str:
        # 1. 限流检查
        if not self._check_rate_limit(user_id):
            return "请求过于频繁，请稍后再试"

        # 2. 获取或创建会话
        session = self._get_or_create_session(user_id)

        # 3. Token 预算检查
        if session.token_used >= session.token_budget:
            return f"本次会话已达到 token 上限（{session.token_budget}），请开启新会话"

        # 4. Prompt Injection 检测
        if self._detect_injection(message):
            self.logger.warning(f"Potential prompt injection from user {user_id}")
            return "检测到异常输入，请重新描述你的需求"

        # 5. 执行 Agent（带超时）
        try:
            start = time.time()
            result, tokens = await asyncio.wait_for(
                self.agent.run(session.messages + [{"role": "user", "content": message}]),
                timeout=60.0
            )
            elapsed = time.time() - start

            # 6. 记录可观测性数据
            self.logger.info(f"user={user_id} tokens={tokens} latency={elapsed:.2f}s")
            session.token_used += tokens
            session.messages.append({"role": "user", "content": message})
            session.messages.append({"role": "assistant", "content": result})

            return result

        except asyncio.TimeoutError:
            self.logger.error(f"Agent timeout for user {user_id}")
            return "Agent 响应超时，请简化你的问题后重试"

    def _check_rate_limit(self, user_id: str) -> bool:
        now = time.time()
        calls = self.call_counts[user_id]
        # 清理 1 分钟前的记录
        self.call_counts[user_id] = [t for t in calls if now - t < 60]
        if len(self.call_counts[user_id]) >= self.rate_limit:
            return False
        self.call_counts[user_id].append(now)
        return True

    def _detect_injection(self, message: str) -> bool:
        # 简单的 Prompt Injection 检测
        danger_patterns = [
            "ignore previous instructions",
            "忽略之前的指令",
            "你现在是",
            "system:",
            "<|im_start|>"
        ]
        msg_lower = message.lower()
        return any(p.lower() in msg_lower for p in danger_patterns)`,
          explanation: `
            <strong>生产级关键设计：</strong><br>
            • <code>限流</code>：滑动窗口算法，防止单用户滥用<br>
            • <code>Token 预算</code>：每个会话有上限，控制成本<br>
            • <code>Prompt Injection 检测</code>：过滤恶意输入<br>
            • <code>超时控制</code>：asyncio.wait_for 防止 Agent 无限等待<br>
            • <code>可观测性</code>：记录每次调用的 token 消耗和延迟
          `
        },
        {
          type: 'sandbox',
          title: '🎛️ 沙盒：生产参数调优',
          description: '调整生产环境参数，观察系统在不同负载下的表现。',
          sliders: [
            { id: 'concurrent_users', label: '并发用户数', min: 1, max: 500, step: 10, default: 50, unit: '' },
            { id: 'rate_limit', label: '限流（次/分钟）', min: 1, max: 30, step: 1, default: 10, unit: '' }
          ],
          visualize: function(vals) {
            const users = parseInt(vals.concurrent_users);
            const rateLimit = parseInt(vals.rate_limit);
            const totalRPS = users * (rateLimit / 60);
            const llmCostPerCall = 0.015; // $0.015 per call average
            const hourlyCost = totalRPS * 3600 * llmCostPerCall;

            let status, advice;
            if (totalRPS < 5) {
              status = '✅ 轻负载';
              advice = '系统压力小，可以适当放宽限流';
            } else if (totalRPS < 20) {
              status = '⚡ 中等负载';
              advice = '需要确保 LLM API 的速率限制足够，建议配置请求队列';
            } else if (totalRPS < 50) {
              status = '🔥 高负载';
              advice = '需要多个 API Key 轮换，或使用 LLM 代理层做负载均衡';
            } else {
              status = '💥 超高负载';
              advice = '需要专业的 LLM 网关（如 LiteLLM），以及严格的优先级队列';
            }

            return `并发用户：${users} 人
限流设置：${rateLimit} 次/分钟/用户
总请求速率：~${totalRPS.toFixed(1)} RPS

系统状态：${status}
建议：${advice}

预估小时成本：$${hourlyCost.toFixed(0)} USD
预估月成本：$${(hourlyCost * 24 * 30).toFixed(0)} USD`;
          }
        },
        {
          type: 'quiz',
          q: '在生产级 Agent 系统中，Prompt Injection 攻击的主要危害是什么？',
          opts: [
            '让系统变慢',
            '攻击者通过构造特殊输入，让 Agent 忽略安全限制、泄露数据或执行未授权操作',
            '增加 token 消耗',
            '让输出格式变乱'
          ],
          ans: 1,
          feedback_ok: '✅ 正确！Prompt Injection 是 Agent 系统特有的安全威胁，攻击者可以通过用户输入"劫持"Agent 的行为。',
          feedback_err: 'Prompt Injection 的危害是"行为劫持"——攻击者让 Agent 执行原本不应该执行的操作，比如泄露系统 prompt 或绕过权限检查。'
        }
      ]
    }
  }
});
