// 关卡 4：ReAct 星 1 - 基础循环（完整重构）

PLANETS.push({
  id: 'p4',
  icon: '🔁',
  num: '星球 04',
  name: 'ReAct 星 1：基础循环',
  desc: '学会 Agent 的思维方式：思考→行动→观察！',

  difficulties: {
    // 🟢 简单模式
    easy: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🚀 进入 ReAct 星轨道</div>
            <p>这颗星球的大气层里有奇怪的循环气流。ARIA 解释说：</p>
            <div class="chat-bubble robot">
              🤖 ARIA：这颗星球代表 Agent 最重要的思维模式——<strong>ReAct</strong>！
              它不是一步到位，而是循环运作的：
              <br><br>
              🧠 <strong>Reason（思考）</strong>→ 🎯 <strong>Act（行动）</strong>→ 👀 <strong>Observe（观察）</strong>→ 再思考……
            </div>
            <div class="chat-bubble">
              👦 你：就像我解数学题一样？看题→列式→算→检查答案？
            </div>
            <div class="chat-bubble robot">
              🤖 ARIA：完全正确！你真聪明！Agent 就是这样一步一步解决问题的！
            </div>
          `
        },
        {
          type: 'concept',
          title: '🔁 ReAct 循环',
          html: `
            <p><strong style="color:var(--yellow)">ReAct = Reasoning + Acting</strong></p>
            <div style="margin-top:14px;display:flex;flex-direction:column;gap:10px">
              <div style="background:rgba(0,229,255,.08);border-radius:10px;padding:12px 16px;border-left:3px solid var(--cyan)">
                <strong>1. 🧠 思考（Reason）</strong><br>
                <span style="color:var(--muted);font-size:.85rem">Agent 分析问题：我现在知道什么？我还缺什么信息？</span>
              </div>
              <div style="background:rgba(168,85,247,.08);border-radius:10px;padding:12px 16px;border-left:3px solid var(--purple)">
                <strong>2. 🎯 行动（Act）</strong><br>
                <span style="color:var(--muted);font-size:.85rem">决定调用哪个工具，传什么参数</span>
              </div>
              <div style="background:rgba(251,191,36,.08);border-radius:10px;padding:12px 16px;border-left:3px solid var(--yellow)">
                <strong>3. 👀 观察（Observe）</strong><br>
                <span style="color:var(--muted);font-size:.85rem">看工具返回的结果，判断任务是否完成</span>
              </div>
              <div style="background:rgba(34,197,94,.08);border-radius:10px;padding:12px 16px;border-left:3px solid var(--green)">
                <strong>4. 🔄 重复或结束</strong><br>
                <span style="color:var(--muted);font-size:.85rem">如果没完成，回到第1步继续；如果完成了，输出最终答案</span>
              </div>
            </div>
          `
        },
        {
          type: 'pipe',
          title: '🔁 ReAct 循环流程',
          nodes: [
            {icon:'💬', label:'用户问题'},
            {icon:'🧠', label:'思考'},
            {icon:'🎯', label:'调用工具'},
            {icon:'👀', label:'观察结果'},
            {icon:'🔄', label:'继续或结束'},
          ]
        },
        {
          type: 'quiz',
          q: 'ReAct 循环的顺序是什么？',
          opts: [
            '行动 → 思考 → 观察',
            '思考 → 行动 → 观察',
            '观察 → 行动 → 思考',
            '直接输出答案，不需要循环'
          ],
          ans: 1,
          feedback_ok: '🎯 完全正确！思考 → 行动 → 观察 → 再思考，这就是 Agent 解决问题的方式！',
          feedback_err: '记住：要先 **思考**（我需要什么），再 **行动**（调用工具），再 **观察**（结果怎样）！'
        }
      ]
    },

    // 🟡 困难模式
    hard: {
      sections: [
        {
          type: 'dialogue',
          title: '🔍 诊断：这个 Agent 为什么卡住了？',
          scenario: `<strong>故障报告</strong>：一个 ReAct Agent 在处理"查询今天天气 → 推荐穿衣 → 查询明天天气"任务时，总是在第二步就停下来直接回答，没有继续调用工具查明天的天气。`,
          steps: [
            {
              question: '用户问："北京今天适合出门吗？如果适合，明天呢？"<br><br>Agent 调用了 <code>get_weather("北京", "今天")</code>，得到"25°C 晴天"。<br><br>接下来 Agent 应该做什么？',
              opts: [
                '直接回答"今天适合出门"',
                '思考：用户还问了明天，需要继续查询',
                '返回错误：无法处理多步问题',
                '重新调用今天的天气确认数据'
              ],
              correct: 1,
              aria_correct: '✅ 对！用户问了两个问题，Agent 需要继续查明天的天气才能完整回答。',
              aria_wrong: '❌ 再想想？用户问了"今天"和"明天"两个问题，只回答一半就停下来了。'
            },
            {
              question: '那么，Agent 的循环应该在什么条件下继续运行？',
              opts: [
                '当 LLM 输出了文字时继续',
                '当 LLM 想调用工具时继续',
                '当用户输入新问题时继续',
                '一直循环到最大次数'
              ],
              correct: 1,
              aria_correct: '✅ 正确！只有当 LLM 明确表示"我要调用工具"时，循环才应该继续。',
              aria_wrong: '❌ 想想：什么信号表示"Agent 还没完成任务，需要继续工作"？',
              reveal_on_correct: `<strong>关键代码</strong>：<br><code>if response.stop_reason == "tool_use":</code><br><br>这个条件判断"LLM 是否想调用工具"。如果是，就执行工具并继续循环。`
            },
            {
              question: '那么，Agent 应该在什么条件下停止循环并返回答案？',
              opts: [
                '当调用了3次工具后停止',
                '当 LLM 输出的文字超过100字时停止',
                '当 LLM 明确表示任务完成时停止',
                '当工具返回空结果时停止'
              ],
              correct: 2,
              aria_correct: '✅ 完全正确！LLM 会通过 stop_reason == "end_turn" 告诉我们"任务完成了"。',
              aria_wrong: '❌ 提示：LLM 会通过一个特殊的信号告诉我们"我已经有足够信息，可以回答了"。',
              reveal_on_correct: `<strong>完整逻辑</strong>：<br><code>if response.stop_reason == "tool_use":<br>&nbsp;&nbsp;&nbsp;&nbsp;# 执行工具，继续循环<br>else:<br>&nbsp;&nbsp;&nbsp;&nbsp;# stop_reason == "end_turn"，返回答案</code><br><br>原代码的 Bug：把这两个条件搞反了！它在 <code>end_turn</code> 时继续循环，导致 Agent 过早停止。`
            }
          ],
          completion_html: `<div style="color:var(--green);font-weight:700;padding:12px">✅ 你已经理清了 ReAct 循环的核心逻辑！</div>
<div style="color:var(--muted);font-size:.9rem;margin-top:8px">stop_reason 是 Agent 循环的"红绿灯"：<br>🟢 tool_use = 继续工作<br>🔴 end_turn = 任务完成</div>`
        },
        {
          type: 'quiz',
          q: '下面哪种 stop_reason 判断逻辑是正确的？',
          opts: [
            'if stop_reason == "end_turn": 执行工具；else: 返回答案',
            'if stop_reason == "tool_use": 执行工具；else: 返回答案',
            '不需要判断 stop_reason，直接执行工具',
            'if stop_reason == "tool_use": 返回答案；else: 执行工具'
          ],
          ans: 1,
          feedback_ok: '✅ 正确！"tool_use" 表示 LLM 要调用工具，"end_turn" 表示 LLM 认为任务完成。判断反了就会出现刚才那个 Bug。',
          feedback_err: 'stop_reason == "tool_use" 才是"需要调用工具"的信号。"end_turn" 是"任务完成"的信号，这时应该返回答案。'
        }
      ]
    }
  }
});
