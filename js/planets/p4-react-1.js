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
          type: 'story',
          html: `
            <div class="speaker">🔍 Hard 模式：诊断一个坏掉的 Agent</div>
            <div class="chat-bubble robot">
              🤖 ARIA：船长，我们收到了一份故障报告。<br><br>
              有一个 ReAct Agent 在执行"查询天气 → 推荐穿衣 → 查询明天天气"这个三步任务时，
              总是在第二步就停下来直接回答，根本没有继续调用工具。<br><br>
              你能找出问题在哪里吗？
            </div>
          `
        },
        {
          type: 'debug',
          title: '🔍 诊断：这个 Agent 为什么卡在第二步？',
          description: `用户问："北京今天适合出门吗？如果适合，明天呢？"

Agent 的预期行为：
  第1步 → 调用 get_weather("北京", "今天") → 得到天气数据
  第2步 → 思考：今天适合，但用户还问了明天，需要继续查
  第3步 → 调用 get_weather("北京", "明天") → 得到天气数据
  第4步 → 综合回答

实际行为：Agent 在第2步拿到今天天气后，直接回答了"今天适合出门"，完全没有查明天的天气。

找出 Bug 并修复它。`,
          buggy_code: `def react_agent(query, tools, max_iter=5):
    messages = [{"role": "user", "content": query}]

    for i in range(max_iter):
        response = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=1024,
            tools=tools,
            messages=messages
        )

        # Bug 在这里：stop_reason 的判断逻辑有问题
        if response.stop_reason == "end_turn":
            return response.content[0].text

        # 执行工具调用
        tool_use = next(b for b in response.content if b.type == "tool_use")
        result = execute_tool(tool_use.name, tool_use.input)
        messages.append({"role": "assistant", "content": response.content})
        messages.append({
            "role": "user",
            "content": [{"type": "tool_result",
                         "tool_use_id": tool_use.id,
                         "content": str(result)}]
        })

    return "达到最大迭代次数"`,
          fixed_code: `def react_agent(query, tools, max_iter=5):
    messages = [{"role": "user", "content": query}]

    for i in range(max_iter):
        response = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=1024,
            tools=tools,
            messages=messages
        )

        # Fix：应该判断 stop_reason == "tool_use"，而不是 "end_turn"
        # 只有当 LLM 明确要调用工具时才继续循环
        if response.stop_reason == "tool_use":
            tool_use = next(b for b in response.content if b.type == "tool_use")
            result = execute_tool(tool_use.name, tool_use.input)
            messages.append({"role": "assistant", "content": response.content})
            messages.append({
                "role": "user",
                "content": [{"type": "tool_result",
                             "tool_use_id": tool_use.id,
                             "content": str(result)}]
            })
        else:
            # stop_reason 是 "end_turn"：LLM 认为任务完成，返回最终答案
            return response.content[0].text

    return "达到最大迭代次数"`,
          hints: [
            '仔细看 if 条件：它在判断什么情况下"继续"，什么情况下"停止"？',
            'stop_reason == "end_turn" 意味着 LLM 认为任务完成了，应该返回答案',
            'stop_reason == "tool_use" 意味着 LLM 想调用工具，应该继续循环',
            '原代码把这两个条件搞反了——它在 LLM 想结束时继续，在 LLM 想继续时却停了'
          ],
          validate: function(code) {
            const hasToolUseCheck = code.includes('"tool_use"') || code.includes("'tool_use'");
            const hasEndTurnReturn = code.includes('"end_turn"') || code.includes("'end_turn'") || code.includes('else');
            const wrongOrder = /if.*end_turn[\s\S]*?return[\s\S]*?tool_use/.test(code);
            if (wrongOrder) return { ok: false, msg: '逻辑还是反的！应该在 stop_reason == "tool_use" 时执行工具，在 else（end_turn）时返回答案。' };
            if (hasToolUseCheck && hasEndTurnReturn) return { ok: true, msg: '✅ 完全正确！stop_reason 的判断逻辑修复了。Agent 现在会在需要时继续调用工具，在任务完成时才返回答案。' };
            if (!hasToolUseCheck) return { ok: false, msg: '需要判断 stop_reason == "tool_use" 来决定是否继续循环！' };
            return { ok: false, msg: '接近了！确保在 tool_use 时执行工具，在其他情况下返回答案。' };
          }
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
