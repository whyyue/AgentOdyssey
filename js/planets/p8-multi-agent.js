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
    }
  }
});
