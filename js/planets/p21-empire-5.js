// 关卡 21：帝国篇 - 实战项目：构建你的帝国系统

PLANETS.push({
  id: 'p21',
  icon: '👑',
  num: '星球 21',
  name: '帝国星 - 实战项目',
  desc: '综合运用三省六部：从零构建一个完整的帝国 AI 系统！',

  difficulties: {
    // 🟢 简单模式
    easy: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">👑 帝国星 - 终极挑战！</div>
            <p>ARIA 和你到达了帝国星的核心——皇宫！</p>
            <div class="chat-bubble robot">
              🤖 ARIA：船长！这是帝国篇的最后一关！<br><br>
              你已经学完了所有的知识：<br>
              🏛️ 三省六部架构<br>
              ⚖️ 状态机 + 分权制衡<br>
              📡 Event-Driven 实时观测<br>
              🔍 门下省质量审核<br><br>
              现在，是时候把这些组合在一起，<br>
              <strong>建造你自己的帝国 AI 系统！</strong>
            </div>
            <div class="chat-bubble">
              👦 你：太棒了！但是……从哪里开始呢？
            </div>
            <div class="chat-bubble robot">
              🤖 ARIA：别担心，我们一步一步来。
              先设计好"蓝图"，再按蓝图建造！
            </div>
          `
        },
        {
          type: 'concept',
          title: '🗺️ 项目蓝图：班级任务助手',
          html: `
            <p>我们来建造一个真实的班级任务管理系统：</p>
            <div style="margin:14px 0;padding:14px;background:rgba(0,229,255,.06);border-radius:12px;line-height:1.9">
              <strong>📋 系统功能：</strong><br>
              同学提交任务 → AI 自动规划 → 质量审核 → 分配给各小组<br><br>

              <strong>🎭 角色设计：</strong><br>
              • 值日生 AI：判断任务是否需要规划<br>
              • 计划 AI：制定详细步骤<br>
              • 检查 AI：审核计划，挑毛病<br>
              • 分配 AI：把任务分配给各小组<br>
              • 执行小组（体育/文艺/卫生等）<br><br>

              <strong>📺 看板功能：</strong><br>
              实时看到每个任务在哪个阶段<br>
              看到 AI 在"想什么"<br>
              可以随时取消任务
            </div>
          `
        },
        {
          type: 'concept',
          title: '🏆 帝国篇总结：你学会了什么？',
          html: `
            <p>回顾一下帝国篇的五颗星球：</p>
            <div style="margin:14px 0;padding:14px;background:rgba(0,229,255,.06);border-radius:12px;line-height:2">
              🏛️ <strong>星球 17</strong>：三省六部架构<br>
              &nbsp;&nbsp;→ AI 团队需要制度，不能自由散漫<br><br>

              ⚖️ <strong>星球 18</strong>：状态机与分权制衡<br>
              &nbsp;&nbsp;→ 代码层面强制守规矩，不靠自觉<br><br>

              📡 <strong>星球 19</strong>：Event-Driven 实时观测<br>
              &nbsp;&nbsp;→ 公告板让一切透明可见<br><br>

              🔍 <strong>星球 20</strong>：门下省质量审核<br>
              &nbsp;&nbsp;→ 强制质量关卡，问题越早发现越好<br><br>

              👑 <strong>星球 21</strong>：综合实战<br>
              &nbsp;&nbsp;→ 把所有知识组合成真实系统！
            </div>
            <div style="margin-top:16px;padding:12px;background:rgba(251,191,36,.1);border-left:3px solid var(--yellow);border-radius:8px">
              🎉 <strong>你已经掌握了生产级 Multi-Agent 系统的核心设计！</strong><br>
              这些知识来自真实的开源项目 EDICT，可以直接用于实际工作。
            </div>
          `
        },
        {
          type: 'quiz',
          q: '三省六部架构相比"让 AI 自由协作"最核心的改进是什么？',
          opts: [
            'AI 更多，处理速度更快',
            '制度化流程 + 强制审核 = 可控、可观测、可信赖的 AI 系统',
            '代码更少，更容易维护',
            '不需要人工介入'
          ],
          ans: 1,
          feedback_ok: '🏆 完美！这正是帝国篇的核心思想。自由协作的 AI 像一盘散沙，有了制度化流程，每一步都可预测、可审计、可干预。这才是生产级 AI 系统应有的样子！',
          feedback_err: '核心在于"可控"。AI 自由协作虽然灵活，但不可控、不可观测、不可信赖。三省六部用制度化流程解决了这个问题——不是限制 AI 的能力，而是给 AI 配上了"制度的护栏"。'
        }
      ]
    },

    // 🟡 困难模式
    hard: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">👑 帝国星 - 技术版</div>
            <div class="chat-bubble robot">
              🤖 ARIA：让我们把帝国篇所有技术组合在一起，
              构建完整的三省六部系统。
              这是一个可以直接部署的项目骨架。
            </div>
          `
        },
        {
          type: 'concept',
          title: '🏗️ 项目结构',
          html: `
            <div style="margin:14px 0;padding:14px;background:rgba(0,229,255,.06);border-radius:12px;font-family:monospace;font-size:.85rem;line-height:1.8">
              imperial_system/<br>
              ├── agents/<br>
              │&nbsp;&nbsp; ├── taizi.py&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# 太子：分拣<br>
              │&nbsp;&nbsp; ├── zhongshu.py&nbsp;&nbsp;# 中书省：规划<br>
              │&nbsp;&nbsp; ├── menxia.py&nbsp;&nbsp;&nbsp;&nbsp;# 门下省：审核<br>
              │&nbsp;&nbsp; ├── shangshu.py&nbsp;&nbsp;# 尚书省：派发<br>
              │&nbsp;&nbsp; └── departments/ # 六部：执行<br>
              │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├── libu.py<br>
              │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├── hubu.py<br>
              │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └── bingbu.py<br>
              ├── core/<br>
              │&nbsp;&nbsp; ├── state_machine.py  # 状态机<br>
              │&nbsp;&nbsp; ├── event_bus.py&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# 事件总线<br>
              │&nbsp;&nbsp; └── permissions.py&nbsp;&nbsp;&nbsp;&nbsp;# 权限矩阵<br>
              ├── api/<br>
              │&nbsp;&nbsp; ├── tasks.py&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# REST API<br>
              │&nbsp;&nbsp; └── ws.py&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# WebSocket<br>
              └── main.py&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# 入口
            </div>
          `
        },
        {
          type: 'code',
          title: '💻 完整工作流：把一切串联起来',
          code: `class ImperialWorkflow:
    """三省六部完整工作流"""

    def __init__(self, llm, event_bus):
        self.sm  = TaskStateMachine(event_bus)
        self.bus = event_bus

        # 初始化所有 Agent
        self.taizi    = TaiziAgent(llm, event_bus)
        self.zhongshu = ZhongshuAgent(llm, event_bus)
        self.menxia   = MenxiaAgent(llm, event_bus)
        self.shangshu = ShangshuAgent(llm, event_bus)
        self.depts    = DepartmentPool(llm, event_bus)

    async def run(self, task: Task) -> TaskResult:
        try:
            # 1. 太子分拣
            await self.sm.transition(task, TaskState.TAIZI, "system")
            if not await self.taizi.is_important(task):
                return await self.taizi.reply_directly(task)

            # 2. 中书省规划
            await self.sm.transition(task, TaskState.ZHONGSHU, "taizi")
            plan = await self.zhongshu.create_plan(task)

            # 3. 门下省审核（含封驳循环）
            await self.sm.transition(task, TaskState.MENXIA, "zhongshu")
            plan = await self.menxia.review_with_retry(task, plan)

            # 4. 尚书省派发
            await self.sm.transition(task, TaskState.ASSIGNED, "menxia")
            assignments = await self.shangshu.dispatch(task, plan)

            # 5. 六部并行执行
            await self.sm.transition(task, TaskState.DOING, "shangshu")
            results = await asyncio.gather(
                *[self.depts.execute(a) for a in assignments]
            )

            # 6. 完成
            await self.sm.transition(task, TaskState.DONE, "shangshu")
            return TaskResult(success=True, outputs=results)

        except Exception as e:
            await self.sm.transition(task, TaskState.CANCELLED, "system")
            raise`,
          explanation: `
            <strong>整合所有帝国篇知识：</strong><br>
            • 状态机（p18）：每一步都调用 <code>sm.transition()</code><br>
            • 门下省审核（p20）：<code>review_with_retry</code> 含封驳循环<br>
            • 事件总线（p19）：所有 Agent 初始化时注入 <code>event_bus</code><br>
            • 并行执行：<code>asyncio.gather</code> 让六部同时工作<br>
            • 异常处理：任何步骤失败 → 状态转为 CANCELLED，不留"僵尸任务"
          `
        },
        {
          type: 'code',
          title: '🚀 FastAPI 入口 + 启动',
          code: `from fastapi import FastAPI, WebSocket
from contextlib import asynccontextmanager

app = FastAPI(title="Imperial System")
workflow: ImperialWorkflow = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global workflow
    llm      = AnthropicClient(model="claude-opus-4-6")
    event_bus = EventBus(EventStore("events.db"))
    workflow  = ImperialWorkflow(llm, event_bus)
    yield  # 应用运行期间
    # 关闭清理（如有需要）

app = FastAPI(lifespan=lifespan)

@app.post("/tasks")
async def create_task(body: TaskRequest):
    task = Task(id=uuid4(), title=body.title)
    # 异步执行，立即返回 task_id
    asyncio.create_task(workflow.run(task))
    return {"task_id": str(task.id)}

@app.websocket("/ws/{task_id}")
async def websocket_endpoint(ws: WebSocket, task_id: str):
    await ws.accept()
    handler = DashboardHandler(ws)
    event_bus.subscribe("*", handler.handle)
    # 推送历史
    async for event in event_store.replay(task_id):
        await handler.handle(event)
    await ws.wait_closed()`,
          explanation: `
            <strong>生产级 API 设计：</strong><br>
            • 异步执行：<code>create_task()</code> 立即返回，任务在后台运行<br>
            • WebSocket：客户端连接后立即推送历史事件，再实时接收新事件<br>
            • 单例 Workflow：通过 <code>lifespan</code> 管理，共享 LLM 连接池<br>
            • 前端用 task_id 订阅 WebSocket，实现任务级别的实时更新
          `
        },
        {
          type: 'pitfalls',
          title: '⚠️ 生产部署常见问题',
          items: [
            'LLM 调用成本 → 用 token 计数监控，设置任务级别的 max_tokens 预算',
            '并发任务过多 → 用任务队列（Redis Queue / Celery）控制并发数',
            'WebSocket 连接数 → 用连接池 + 心跳检测，及时清理断开的连接',
            '状态机数据持久化 → 重启后状态丢失？用数据库持久化 task.state，启动时恢复',
            '测试困难 → 为每个 Agent 写单独的单元测试，Mock LLM 响应；集成测试用真实 LLM'
          ]
        },
        {
          type: 'quiz',
          q: '用户提交任务后，API 立即返回 task_id 而不是等待结果，这种设计模式叫什么？',
          opts: [
            '同步处理模式',
            '异步任务模式（Fire and Forget + Polling/WebSocket）',
            '批处理模式',
            '流式响应模式'
          ],
          ans: 1,
          feedback_ok: '✅ 正确！Multi-Agent 任务通常需要数分钟甚至数小时，不可能让 HTTP 请求等那么久。"提交→立即返回 ID→WebSocket 实时更新"是标准的异步任务模式。这和 CI/CD 系统（提交代码→立即返回构建 ID→等待构建结果）完全相同。',
          feedback_err: 'Multi-Agent 任务耗时很长，HTTP 请求不能等待。正确模式是"异步任务"：提交后立即返回 task_id，客户端通过 WebSocket 订阅实时状态更新。这样用户体验好，服务器也不会被长连接拖垮。'
        }
      ]
    },

    // 🔴 地狱模式
    hell: {
      sections: [
        {
          type: 'dialogue',
          title: '🔍 12 个 Agent 同时崩了，你的 API 账单涨了 100 倍',
          scenario: `<strong>故障场景</strong>：你的三省六部系统稳定运行了一个月。<br>
今天，一个用户提交了一个异常复杂的任务。中书省制定了方案，门下省准奏，尚书省分配给了 6 个部门同时执行。<br><br>
30 分钟后，你收到告警：<br>
• API 费用在 30 分钟内消耗了 $500（平时一整天 $50）<br>
• 6 个部门 Agent 中有 4 个超时失败了<br>
• 失败的 Agent 触发了自动重试，重试又失败，又重试……<br>
• 尚书省还在不断分配新任务，不知道下游已经崩了<br><br>
费用暴涨 + 任务失败 + 无限重试 = 三重灾难。`,
          steps: [
            {
              question: '4 个部门 Agent 超时失败后自动重试，重试又失败又重试——每次重试都消耗 token。怎么防止这种"失败雪崩"？',
              opts: [
                '不重试，失败就直接返回错误',
                '设置重试上限（如 3 次）+ 指数退避（每次间隔翻倍）+ 单任务总 token 预算硬限制',
                '增加超时时间',
                '用更快的模型'
              ],
              correct: 1,
              aria_correct: '✅ 对！三层防护：① 重试上限防无限循环 ② 指数退避防止"马上重试又失败" ③ 总 token 预算作为硬天花板。即使前两层失效，第三层也能在费用失控前强制停止。',
              aria_wrong: '❌ 不重试太极端——临时网络问题重试一次就好了。问题是"重试多少次？间隔多久？总消耗上限多少？"。你需要的是防护机制，不是禁用。'
            },
            {
              question: '尚书省还在不断分配新任务，不知道下游已经崩了。整个三省六部之间缺少什么机制？',
              opts: [
                '让尚书省更聪明',
                '错误传播机制——下游失败时，错误信号必须向上传播，上游收到信号后停止分配新任务。这就是 Saga 模式中的"补偿"',
                '减少部门数量',
                '串行执行所有任务'
              ],
              correct: 1,
              aria_correct: '✅ 正确！错误传播 + 补偿操作 = Saga 模式。下游部门失败时，尚书省收到信号，停止分配新任务，并按反序对已完成的步骤执行补偿（回滚）。这是分布式系统的标准失败处理模式。',
              aria_wrong: '❌ 不是尚书省不够聪明——它只是没有收到"下游崩了"的信号。如果有一个机制让下游的错误"向上传播"，尚书省会怎么做？'
            },
            {
              question: '你用了 Saga 模式回滚，但回滚时某个补偿操作也失败了（比如"撤销已发送的通知"失败了）。怎么办？',
              opts: [
                '忽略补偿失败',
                '补偿失败 → 升级给人类处理 + 详细日志记录。分布式系统的铁律：不是所有失败都能自动修复，但所有失败都必须被记录和告警',
                '重试补偿操作直到成功',
                '重启整个系统'
              ],
              correct: 1,
              aria_correct: '✅ 完全正确！补偿本身也可能失败——这是分布式系统的现实。关键是：① 详细记录补偿失败 ② 立即告警运维 ③ 人工介入处理。不能假装问题不存在，也不能无限重试。',
              aria_wrong: '❌ 忽略补偿失败 = 数据不一致。无限重试 = 可能永远卡住。想想：如果自动修复失败了，最后的安全网是什么？',
              reveal_on_correct: `<strong>生产系统的三层可靠性保障</strong>：<br>1. <strong>预防</strong>：重试上限 + token 预算 + 超时保护（防止单点失败变成雪崩）<br>2. <strong>补偿</strong>：Saga 模式按反序回滚已完成的步骤（自动修复）<br>3. <strong>兜底</strong>：补偿失败 → 人工介入 + 完整审计日志（最后的安全网）<br><br>三层缺一不可。前两层是自动化，第三层是人类智慧。`
            }
          ],
          completion_html: `<div style="color:var(--green);font-weight:700;padding:12px">✅ 你设计出了生产级分布式失败处理架构！</div>
<div style="color:var(--muted);font-size:.9rem;margin-top:8px">预防 + 补偿 + 兜底 = 三层可靠性。<br>系统越复杂，失败处理越重要。12 个 Agent 的系统比 1 个 Agent 的系统更容易崩，但也更需要生产级保障。</div>`
        },
        {
          type: 'concept',
          title: '📄 你刚才设计的，就是 EDICT 的生产可靠性架构',
          html: `
            <div style="margin:14px 0;padding:16px;background:rgba(251,191,36,.1);border-left:3px solid var(--yellow);border-radius:12px;line-height:1.9">
              <strong style="font-size:1.05rem">EDICT 生产级保障：Token 预算 + Saga + 幂等性</strong><br>
              <span style="color:var(--muted);font-size:.9rem">从 demo 到生产，不是加更多功能，而是加更多"防护网"</span><br><br>
              <span style="color:var(--cyan)">你刚才推导出的三层保障，正是 EDICT 在生产环境真实使用的架构！</span>
            </div>

            <div style="margin:20px 0;padding:16px;background:rgba(0,229,255,.06);border-radius:12px;line-height:1.9">
              <strong style="color:var(--cyan)">帝国篇知识图谱：五颗星球，一个完整系统</strong><br><br>
              <div style="display:grid;grid-template-columns:1fr;gap:8px;margin-top:12px">
                <div style="padding:10px;background:rgba(168,85,247,.08);border-radius:8px">
                  <strong>P17 架构层</strong>：三省六部分工 → 解决"谁做什么"
                </div>
                <div style="padding:10px;background:rgba(0,229,255,.08);border-radius:8px">
                  <strong>P18 控制层</strong>：状态机 + 权限矩阵 → 解决"怎么保证按规矩来"
                </div>
                <div style="padding:10px;background:rgba(16,185,129,.08);border-radius:8px">
                  <strong>P19 观测层</strong>：Event-Driven + Dashboard → 解决"怎么知道在发生什么"
                </div>
                <div style="padding:10px;background:rgba(251,191,36,.08);border-radius:8px">
                  <strong>P20 质量层</strong>：门下省审核 → 解决"怎么保证输出质量"
                </div>
                <div style="padding:10px;background:rgba(239,68,68,.08);border-radius:8px">
                  <strong>P21 工程层</strong>：成本控制 + Saga + 幂等性 → 解决"怎么真正上线"
                </div>
              </div>
              <div style="margin-top:12px;padding:10px;background:rgba(251,191,36,.1);border-radius:8px;font-size:.9rem">
                🏛️ 1300 年前，唐朝用三省六部解决了"如何让大帝国有序运转"。今天，我们用同样的思想解决"如何让 12 个 AI Agent 可信协作"。<strong>好的制度设计，跨越千年依然有效。</strong>
              </div>
            </div>
          `
        },
        {
          type: 'quiz',
          q: 'EDICT 使用 Saga 模式而非数据库事务（ACID），根本原因是什么？',
          opts: [
            'Saga 性能比 ACID 更高',
            '跨多个 LLM API 调用和微服务的操作无法纳入单个数据库事务，Saga 用补偿操作实现最终一致性',
            '数据库事务不支持异步',
            'Saga 代码更简单'
          ],
          ans: 1,
          feedback_ok: '🔥 深刻！ACID 要求所有操作在同一个数据库连接内原子提交。三省六部的每一步都是独立的 LLM API 调用，跨越多个服务和时间段，超出 ACID 事务的能力范围。Saga 用"补偿操作"模拟回滚，是分布式系统的标准解决方案。',
          feedback_err: '关键在于事务边界。三省六部的工作流持续数分钟、跨越多个 LLM API 和微服务，无法纳入单个 ACID 事务。Saga 是分布式系统的标准失败处理模式。'
        }
      ]
    }
  }
});
