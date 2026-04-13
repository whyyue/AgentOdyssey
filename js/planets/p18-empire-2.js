// 关卡 18：帝国篇 - 制度设计：状态机与分权制衡

PLANETS.push({
  id: 'p18',
  icon: '⚖️',
  num: '星球 18',
  name: '帝国星 - 制度设计',
  desc: '状态机 + 分权制衡：让 AI 系统无法越权、无法乱来！',

  difficulties: {
    // 🟢 简单模式
    easy: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">⚖️ 帝国星 - 制度设计</div>
            <p>ARIA 带你深入帝国星的核心机制……</p>
            <div class="chat-bubble robot">
              🤖 ARIA：上次我们学了三省六部的整体架构。
              但你有没有想过一个问题——<br><br>
              <strong>谁来保证 Agent 真的按规矩来？</strong><br><br>
              如果中书省"偷懒"跳过门下省，直接让尚书省执行，怎么办？<br>
              如果六部"越级"直接修改中书省的方案，怎么办？
            </div>
            <div class="chat-bubble">
              👦 你：呃……靠 Agent 自觉？
            </div>
            <div class="chat-bubble robot">
              🤖 ARIA：哈哈，AI 可没有"自觉"！<br><br>
              答案是：<strong>状态机</strong> + <strong>权限矩阵</strong>。<br>
              这两个机制从代码层面强制保证——想越规？直接报错！
            </div>
          `
        },
        {
          type: 'concept',
          title: '🚦 什么是状态机？',
          html: `
            <p>你见过红绿灯吗？它就是一个状态机：</p>
            <div style="margin:14px 0;padding:14px;background:rgba(0,229,255,.06);border-radius:12px;line-height:2">
              🔴 红灯（停止）<br>
              &nbsp;&nbsp;↓ 60秒后<br>
              🟡 黄灯（准备）<br>
              &nbsp;&nbsp;↓ 3秒后<br>
              🟢 绿灯（通行）<br>
              &nbsp;&nbsp;↓ 45秒后<br>
              🔴 红灯（停止）<br><br>
              <strong>关键规则：</strong>不能从红灯直接跳到绿灯！必须经过黄灯。
            </div>
            <p>三省六部的任务也是这样：</p>
            <div style="margin:14px 0;padding:14px;background:rgba(0,229,255,.06);border-radius:12px;font-family:monospace;font-size:.85rem;line-height:1.8">
              待处理 → 太子分拣 → 中书规划 → 门下审核<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↑__（封驳）__|<br>
              门下审核通过 → 派发执行 → 执行中 → 已完成
            </div>
            <div style="margin-top:16px;padding:12px;background:rgba(251,191,36,.1);border-left:3px solid var(--yellow);border-radius:8px">
              💡 任务不能从"待处理"直接跳到"执行中"！<br>
              每一步都必须经过前一步，这叫<strong>状态机约束</strong>。
            </div>
          `
        },
        {
          type: 'concept',
          title: '🔐 什么是分权制衡？',
          html: `
            <p>想象学校里的职责分工：</p>
            <div style="margin:14px 0;padding:14px;background:rgba(0,229,255,.06);border-radius:12px;line-height:1.8">
              <strong>班长（太子）</strong> → 只能安排课代表（中书省）<br>
              <strong>课代表（中书省）</strong> → 只能找检查员和执行员<br>
              <strong>检查员（门下省）</strong> → 可以退回课代表，或放行给执行员<br>
              <strong>执行员（尚书省）</strong> → 只能安排各小组<br>
              <strong>各小组（六部）</strong> → 只能做自己的事，不能找别人
            </div>
            <p><strong>如果体育小组想改变计划怎么办？</strong></p>
            <div style="margin:14px 0;padding:12px;background:rgba(239,68,68,.05);border-left:3px solid var(--red);border-radius:8px">
              ❌ 不行！体育小组只能向执行员汇报，<br>
              由执行员反映给上级，层层传递。<br>
              直接"越级"在代码里会直接报错！
            </div>
          `
        },
        {
          type: 'quiz',
          q: '如果尚书省想修改中书省制定的方案，应该怎么办？',
          opts: [
            '直接修改中书省的方案文件',
            '尚书省没有权限修改方案，必须通过门下省反馈给中书省',
            '让六部自己决定要不要执行这个方案',
            '绕过门下省直接执行'
          ],
          ans: 1,
          feedback_ok: '🎉 正确！权限矩阵规定：尚书省只能调用六部，无权回调中书省。发现方案有问题，必须通过门下省封驳机制反馈。这就是"分权制衡"的力量！',
          feedback_err: '记住权限矩阵：尚书省 → 只能调用六部。它无权直接接触中书省。如果方案有问题，是门下省的职责来审核和封驳，而不是尚书省。'
        }
      ]
    },

    // 🟡 困难模式
    hard: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">⚖️ 帝国星 - 技术版</div>
            <div class="chat-bubble robot">
              🤖 ARIA：让我们看看状态机和权限矩阵的代码实现。
              这两个机制是三省六部架构的"护城河"——
              从代码层面<strong>强制</strong>所有 Agent 守规矩。
            </div>
          `
        },
        {
          type: 'code',
          title: '💻 任务状态机实现',
          code: `from enum import Enum
from typing import Dict, Set

class TaskState(Enum):
    PENDING   = "pending"    # 待处理
    TAIZI     = "taizi"      # 太子分拣中
    ZHONGSHU  = "zhongshu"   # 中书规划中
    MENXIA    = "menxia"     # 门下审核中
    ASSIGNED  = "assigned"   # 已派发
    DOING     = "doing"      # 执行中
    REVIEW    = "review"     # 复核中
    DONE      = "done"       # 已完成
    CANCELLED = "cancelled"  # 已取消

# 合法的状态转换白名单
VALID_TRANSITIONS: Dict[TaskState, Set[TaskState]] = {
    TaskState.PENDING:   {TaskState.TAIZI},
    TaskState.TAIZI:     {TaskState.ZHONGSHU, TaskState.CANCELLED},
    TaskState.ZHONGSHU:  {TaskState.MENXIA,   TaskState.CANCELLED},
    TaskState.MENXIA:    {TaskState.ASSIGNED,  TaskState.ZHONGSHU,
                          TaskState.CANCELLED},  # 封驳回中书
    TaskState.ASSIGNED:  {TaskState.DOING,     TaskState.CANCELLED},
    TaskState.DOING:     {TaskState.REVIEW,    TaskState.CANCELLED},
    TaskState.REVIEW:    {TaskState.DONE,      TaskState.CANCELLED},
    TaskState.DONE:      set(),     # 终态，不可转换
    TaskState.CANCELLED: set(),     # 终态，不可转换
}

def transition(task, new_state: TaskState):
    allowed = VALID_TRANSITIONS.get(task.state, set())
    if new_state not in allowed:
        raise ValueError(
            f"非法转换: {task.state.value} → {new_state.value}"
        )
    task.state = new_state`,
          explanation: `
            <strong>核心要点：</strong><br>
            • 9 个状态，用枚举定义，不允许自造状态<br>
            • 白名单机制：只有列出的转换才合法<br>
            • 门下省可以转换到 ZHONGSHU（封驳）或 ASSIGNED（准奏）<br>
            • DONE 和 CANCELLED 是终态，无法再转换<br>
            • 非法转换直接抛出异常，Agent 无法越规
          `
        },
        {
          type: 'code',
          title: '🔐 权限矩阵 + 调用审计',
          code: `# 权限白名单：谁可以调用谁
PERMISSION_MATRIX = {
    'taizi':    ['zhongshu'],
    'zhongshu': ['menxia', 'shangshu'],
    'menxia':   ['shangshu', 'zhongshu'],  # 封驳时可回调中书
    'shangshu': ['libu', 'hubu', 'bingbu',
                 'xingbu', 'gongbu', 'libu_hr'],
    # 六部：空列表，不能调用任何 Agent
}

class Agent:
    def __init__(self, name: str):
        self.name = name

    async def call(self, target: str, task, payload):
        # 1. 权限检查（运行时强制）
        allowed = PERMISSION_MATRIX.get(self.name, [])
        if target not in allowed:
            raise PermissionError(
                f"[权限拒绝] {self.name} → {target} 未授权"
            )

        # 2. 记录调用审计日志
        task.flow_log.append({
            "from":    self.name,
            "to":      target,
            "ts":      datetime.now().isoformat(),
            "payload": payload
        })

        # 3. 执行调用
        return await agents[target].process(task, payload)`,
          explanation: `
            <strong>两层保障：</strong><br>
            • 权限矩阵：每次调用前检查白名单，越权立即报错<br>
            • 审计日志（flow_log）：记录完整调用链，可追溯<br>
            • flow_log 只追加、不可修改，保证审计可信<br>
            • 这样即使 Agent 的 LLM "想"越权，代码层面也拒绝
          `
        },
        {
          type: 'concept',
          title: '📅 真实任务流转时间线',
          html: `
            <p>一个实际任务在三省六部系统中的流转：</p>
            <div style="margin:14px 0;padding:14px;background:rgba(0,229,255,.06);border-radius:12px;font-family:monospace;font-size:.85rem;line-height:1.8">
              <strong>任务：开发一个用户登录功能</strong><br><br>
              DAY 1 10:00 → 太子分拣：判断为重要任务<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 状态: PENDING → TAIZI → ZHONGSHU<br><br>
              DAY 1 10:30 → 中书省规划：制定 4 步方案<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 状态: ZHONGSHU → MENXIA<br><br>
              DAY 1 11:00 → 门下省审核：<span style="color:var(--red)">❌ 封驳</span><br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 原因：未包含 SQL 注入防护<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 状态: MENXIA → ZHONGSHU（封驳）<br><br>
              DAY 1 11:30 → 中书省修改：补充安全措施<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 状态: ZHONGSHU → MENXIA（第2轮）<br><br>
              DAY 1 12:00 → 门下省审核：<span style="color:var(--cyan)">✅ 准奏</span><br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 状态: MENXIA → ASSIGNED<br><br>
              DAY 1 14:00 → 兵部/刑部并行执行<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 状态: ASSIGNED → DOING<br><br>
              DAY 3 16:00 → 完成并复核<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 状态: DOING → REVIEW → DONE
            </div>
            <p style="font-size:.9rem;color:var(--muted)">
              关键：门下省在第一轮<strong>封驳</strong>了未考虑安全的方案，
              这在传统框架（CrewAI/AutoGen）中是不存在的！
            </p>
          `
        },
        {
          type: 'pitfalls',
          title: '⚠️ 常见设计错误',
          items: [
            '不要用字符串表示状态 → 用枚举（Enum），避免拼写错误导致无效状态',
            '不要在状态转换外修改 task.state → 必须通过 transition() 函数，保证白名单检查',
            '不要忽略并发问题 → 多个 Agent 同时操作同一任务时，需要加锁防止竞态条件',
            '不要让权限矩阵硬编码在 Agent 内部 → 集中管理，修改时只需改一处',
            '不要遗漏 CANCELLED 状态的处理 → 任何状态都可能被取消，要处理中途取消的情况'
          ]
        },
        {
          type: 'quiz',
          q: '任务状态为 DOING（执行中）时，下列哪个状态转换是合法的？',
          opts: [
            'DOING → ZHONGSHU（回退到中书省重新规划）',
            'DOING → REVIEW（进入复核）',
            'DOING → MENXIA（重新审核）',
            'DOING → ASSIGNED（重新派发）'
          ],
          ans: 1,
          feedback_ok: '✅ 正确！DOING 只能转换到 REVIEW（正常完成）或 CANCELLED（取消）。不能回退到中书省或重新派发——状态机保证了流程的单向性！',
          feedback_err: '看看 VALID_TRANSITIONS：DOING 只能转换到 REVIEW 或 CANCELLED。状态机不允许随意回退，这保证了系统的可预测性。'
        }
      ]
    },

    // 🔴 地狱模式
    hell: {
      sections: [
        {
          type: 'dialogue',
          title: '🔍 任务状态莫名其妙跳回了"已完成"',
          scenario: `<strong>故障场景</strong>：你的三省六部系统上线一周了。<br>
今天早上，Dashboard 上出现了一个诡异的状态：<br><br>
任务 #42 的 flow_log 显示：<br>
<code style="background:rgba(0,0,0,.3);padding:4px 8px;border-radius:4px;display:inline-block">
10:00 pending → 起草中<br>
10:05 起草中 → 审核中<br>
10:10 审核中 → 起草中（封驳）<br>
10:15 起草中 → 审核中<br>
10:20 审核中 → 已完成 ✅</code><br><br>
问题：门下省第 2 轮审核的 flow_log 里，reason 写着"准奏：方案完整"。但你人工看了那个方案——它根本没改！还是被封驳的那个版本。<br><br>
门下省第一次说"不行"，第二次对着完全相同的方案说"行"。这怎么可能？`,
          steps: [
            {
              question: '门下省对着同一个方案，第一次封驳、第二次准奏。这不是审核标准不一致，而是并发竞态——两个请求同时修改了任务状态。怎么防止？',
              opts: [
                '让门下省的审核标准更严格',
                '用锁机制（如 asyncio.Lock 或数据库乐观锁）保证状态转换是原子的——同一时刻只有一个操作能修改状态',
                '串行处理所有任务',
                '用更强的模型做审核'
              ],
              correct: 1,
              aria_correct: '✅ 对！并发竞态是状态机的头号敌人。两个请求同时读到"审核中"，都以为自己是第一个，都去改状态。锁机制保证"检查 + 修改"是一个不可分割的原子操作。',
              aria_wrong: '❌ 不是审核标准的问题——方案完全相同！想想：如果两个请求同时到达，都读到当前状态是"审核中"，会发生什么？'
            },
            {
              question: '你加了锁，并发问题解决了。但产品经理问："这个任务第 10:05 的封驳，具体是谁触发的？当时的原因是什么？" 你的 flow_log 需要记录哪些信息？',
              opts: [
                '只记录状态变化：从 A 到 B',
                '每次状态变化记录：from → to + 谁（actor）+ 为什么（reason）+ 什么时间（timestamp）——完整还原决策过程',
                '记录所有 Agent 的对话内容',
                '只记录错误'
              ],
              correct: 1,
              aria_correct: '✅ 正确！from/to/actor/reason/timestamp 是审计日志的五要素。少了任何一个，你就无法完整还原"当时发生了什么"。这就是 EDICT 的 flow_log 设计。',
              aria_wrong: '❌ 只记"从 A 到 B"不够——你不知道谁改的、为什么改。想想：如果你是审计员，你需要什么信息来判断"这次状态变化是否合理"？'
            },
            {
              question: 'flow_log 是审计的基础。但如果有人（或某个有 bug 的 Agent）修改了历史记录呢？你怎么保证日志的"不可篡改性"？',
              opts: [
                '定期备份日志',
                'append-only（只追加不修改）——日志只能写入新记录，禁止 UPDATE 和 DELETE。任何篡改都会留下痕迹或直接被拒绝',
                '用区块链存日志',
                '信任系统不会出错'
              ],
              correct: 1,
              aria_correct: '✅ 完全正确！Append-only 是审计日志的铁律。数据库层禁止 UPDATE/DELETE，代码层只能 INSERT。配合单调递增的 seq 编号，任何篡改都会破坏连续性被立刻发现。',
              aria_wrong: '❌ 备份不能防篡改——备份也可以被改。想想：如果数据库层面就禁止修改已有记录，只允许添加新记录，篡改还有可能吗？',
              reveal_on_correct: `<strong>状态机的三大生产保障</strong>：<br>1. <strong>原子性</strong>：锁机制保证状态转换不被并发干扰<br>2. <strong>可审计</strong>：flow_log 记录 from/to/actor/reason/timestamp<br>3. <strong>不可篡改</strong>：append-only 日志，禁止修改历史<br><br>缺少任何一层，状态机在生产环境都是不安全的。`
            }
          ],
          completion_html: `<div style="color:var(--green);font-weight:700;padding:12px">✅ 你设计出了生产级状态机的安全机制！</div>
<div style="color:var(--muted);font-size:.9rem;margin-top:8px">原子性 + 可审计 + 不可篡改 = 状态机的三个安全支柱。<br>没有这些，状态机就是一个"看起来对但实际不靠谱"的系统。</div>`
        },
        {
          type: 'concept',
          title: '📄 你刚才设计的，就是 EDICT 的状态机 + flow_log 架构',
          html: `
            <div style="margin:14px 0;padding:16px;background:rgba(251,191,36,.1);border-left:3px solid var(--yellow);border-radius:12px;line-height:1.9">
              <strong style="font-size:1.05rem">EDICT 状态机 + 审计日志</strong><br>
              <span style="color:var(--muted);font-size:.9rem">生产级状态机的核心：原子转换 + append-only 日志 + Event Bus 联动</span><br><br>
              <span style="color:var(--cyan)">你刚才推导出的三层保障，正是 EDICT 状态机区别于 demo 级实现的核心！</span>
            </div>

            <div style="margin:20px 0;padding:16px;background:rgba(0,229,255,.06);border-radius:12px;line-height:1.9">
              <strong style="color:var(--cyan)">真实 flow_log 示例</strong><br><br>
              <div style="display:grid;grid-template-columns:1fr;gap:12px;margin-top:12px">
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px;font-family:monospace;font-size:.85rem">
                  seq:1 | pending → taizi | actor:system | "用户提交任务"<br>
                  seq:2 | taizi → zhongshu | actor:taizi-agent | "判断为重要任务"<br>
                  seq:3 | menxia → zhongshu | actor:menxia-agent | "封驳：未包含 SQL 注入防护"<br>
                  seq:4 | menxia → assigned | actor:menxia-agent | "准奏：方案完整，安全已补充"
                </div>
              </div>
              <div style="margin-top:12px;padding:10px;background:rgba(251,191,36,.1);border-radius:8px;font-size:.9rem">
                💡 seq:3 的封驳记录清晰说明了"为什么封驳"——这是合规审计的核心。任何人都可以验证决策过程的合理性。
              </div>
            </div>
          `
        },
        {
          type: 'quiz',
          q: 'EDICT 的 flow_log 为什么设计成"只追加、不可修改"？',
          opts: [
            '因为数据库性能更好',
            '保证审计合规：任何决策都有完整记录，无法事后篡改',
            '因为代码更简单',
            '为了节省存储空间'
          ],
          ans: 1,
          feedback_ok: '🔥 正确！Append-only 的 flow_log 是信任的基础。你可以验证"门下省确实在时间 T 封驳了方案，原因是 X"，没有人能事后修改这条记录。这是合规审计和责任追溯的核心。',
          feedback_err: '核心是"信任"和"合规"。如果日志可以修改，审计就失去了意义。Append-only 通过不可变性建立信任。'
        }
      ]
    }
  }
});
