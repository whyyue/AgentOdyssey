// 关卡 5：ReAct 星 2 - 多步推理（完整重构）

PLANETS.push({
  id: 'p5',
  icon: '🔁',
  num: '星球 05',
  name: 'ReAct 星 2：多步推理',
  desc: '学习复杂任务的分解和规划。',

  difficulties: {
    // 🟢 简单模式
    easy: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🚀 ReAct 星深处</div>
            <p>ARIA 带你来到 ReAct 星的核心区域：</p>
            <div class="chat-bubble robot">
              🤖 ARIA：船长！简单的任务用一次循环就能完成，但复杂的任务需要<strong>多步推理</strong>！
              就像你做作业，要先读题、再列步骤、再一步步解决。
            </div>
            <div class="chat-bubble">
              👦 你：所以 Agent 也要学会"规划"？
            </div>
            <div class="chat-bubble robot">
              🤖 ARIA：完全正确！这叫 <strong>Chain-of-Thought（思维链）</strong>！
              让 Agent 先想清楚要做什么，再一步步执行。
            </div>
          `
        },
        {
          type: 'concept',
          title: '🧠 Chain-of-Thought（思维链）',
          html: `
            <p>多步推理的关键：</p>
            <ul style="margin:10px 0 0 16px;line-height:2.2">
              <li>📋 <strong>任务分解</strong>：把大任务拆成小步骤</li>
              <li>🔗 <strong>依赖关系</strong>：哪些步骤要先做，哪些可以并行</li>
              <li>🎯 <strong>逐步执行</strong>：一步一步完成，不跳步</li>
              <li>✅ <strong>验证结果</strong>：每步完成后检查是否正确</li>
            </ul>
            <p style="margin-top:12px;color:var(--muted);font-size:.85rem">
              💡 例如：「帮我分析今年的销售数据并写报告」<br>
              → 步骤1：搜索销售数据<br>
              → 步骤2：分析数据趋势<br>
              → 步骤3：生成报告
            </p>
          `
        },
        {
          type: 'quiz',
          q: 'Chain-of-Thought 的作用是什么？',
          opts: [
            '让 Agent 运行得更快',
            '让 Agent 先规划步骤，再逐步执行复杂任务',
            '让 Agent 说话更流利',
            '让 Agent 能同时做很多事'
          ],
          ans: 1,
          feedback_ok: '🎯 完全正确！Chain-of-Thought 让 Agent 能处理复杂的多步骤任务！',
          feedback_err: '记住：Chain-of-Thought 是关于"规划"和"分步执行"的！'
        }
      ]
    },

    // 🟡 困难模式
    hard: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🚀 ReAct 星深处（技术版）</div>
            <div class="chat-bubble robot">
              🤖 ARIA：船长！让我给你讲讲如何引导 LLM 进行多步推理。
              这需要精心设计 prompt 和系统消息。
            </div>
          `
        },
        {
          type: 'concept',
          title: '🧠 引导多步推理的技术',
          html: `
            <p>实现多步推理的方法：</p>
            <ul style="margin:10px 0 0 16px;line-height:2">
              <li><strong>System Prompt</strong>：在系统消息中引导 LLM 分步思考</li>
              <li><strong>Few-shot Examples</strong>：提供示例展示如何分步解决问题</li>
              <li><strong>显式规划</strong>：让 LLM 先输出计划，再执行</li>
              <li><strong>中间验证</strong>：每步完成后验证结果</li>
            </ul>
          `
        },
        {
          type: 'code',
          title: '📟 引导多步推理的 Prompt',
          code: `system_prompt = """
在回答问题前，请按以下步骤思考：

1. 分析问题：我需要什么信息？
2. 规划步骤：我应该先做什么，再做什么？
3. 执行：逐步调用工具
4. 总结：整合结果给出答案

每一步都要说明你的思考过程。
"""

response = client.messages.create(
    model="claude-opus-4-6",
    max_tokens=4096,
    system=system_prompt,
    messages=[{"role": "user", "content": query}]
)`,
          explanation: `
            <strong>关键点：</strong><br>
            • System Prompt 引导 LLM 分步思考<br>
            • 明确要求 LLM 说明思考过程<br>
            • 这样 LLM 会更有条理地解决复杂问题
          `
        },
        {
          type: 'pitfalls',
          title: '⚠️ 常见坑点',
          items: [
            'Prompt 不够明确 → LLM 可能跳步或遗漏关键步骤',
            '没有中间验证 → 前面的错误会影响后续步骤',
            '步骤过多 → 可能超出 Context Window 或 max_iterations',
            '没有处理步骤失败 → 整个任务失败，应该有重试或回退机制'
          ]
        },
        {
          type: 'quiz',
          q: '如何引导 LLM 进行多步推理？',
          opts: [
            '直接问问题，LLM 会自动分步',
            '在 System Prompt 中明确要求 LLM 分步思考和规划',
            '增加 Temperature 参数',
            '使用更大的模型'
          ],
          ans: 1,
          feedback_ok: '✅ 正确！System Prompt 是引导 LLM 行为的关键！',
          feedback_err: 'System Prompt 是引导 LLM 分步思考的最有效方法！'
        }
      ]
    },

    // 🔴 地狱模式
    hell: {
      sections: [
        {
          type: 'dialogue',
          title: '🤔 这个 Agent 为什么总是走错路？',
          scenario: `<strong>故障场景</strong>：一个 Act-only Agent（没有 Thought 步骤）在回答"北京今天适合跑步吗？"时，调用了天气工具，得到"25°C 晴天"，然后直接回答"适合"。<br><br>但用户其实有哮喘，Agent 没有考虑空气质量。`,
          steps: [
            {
              question: 'Agent 调用了 <code>get_weather("北京")</code>，得到"25°C 晴天"。<br><br>它接下来直接回答"适合跑步"。这个决策有什么问题？',
              opts: [
                '没问题，天气好就适合跑步',
                '它只考虑了温度，没考虑空气质量、湿度等其他因素',
                '它应该再调用一次天气工具确认',
                '它应该问用户要不要跑步'
              ],
              correct: 1,
              aria_correct: '✅ 对！"适合跑步"不只看温度，还要看空气质量、湿度、风速等。',
              aria_wrong: '❌ 想想：25°C 晴天就一定适合所有人跑步吗？还有什么因素会影响决策？'
            },
            {
              question: '如果 Agent 在调用工具前先"想一想"，它应该思考什么？',
              opts: [
                '思考：我应该调用哪个工具？',
                '思考：用户问的是"适合跑步"，我需要哪些信息才能判断？',
                '思考：这个问题有多少个字？',
                '思考：用户为什么要跑步？'
              ],
              correct: 1,
              aria_correct: '✅ 正确！先想清楚"需要什么信息"，再决定调用什么工具。',
              aria_wrong: '❌ 提示：在行动前，Agent 应该先分析"完整回答这个问题需要哪些信息"。',
              reveal_on_correct: `<strong>Thought 的作用</strong>：<br>在调用工具前，Agent 先思考"我需要什么信息"，而不是直接行动。<br><br>这样它会意识到：判断"适合跑步"需要天气、空气质量、用户健康状况等多个维度的信息。`
            },
            {
              question: '在看到工具结果后，Agent 也应该"想一想"。它应该思考什么？',
              opts: [
                '思考：这个结果是不是正确的？',
                '思考：这个结果告诉了我什么？我是否有足够信息回答用户？',
                '思考：这个结果有多少个字？',
                '思考：用户会不会满意这个结果？'
              ],
              correct: 1,
              aria_correct: '✅ 完全正确！看到结果后，Agent 要判断"信息是否充分"，而不是直接回答。',
              aria_wrong: '❌ 提示：Agent 应该评估"我现在掌握的信息是否足够回答用户的问题"。',
              reveal_on_correct: `<strong>完整的 ReAct 循环</strong>：<br><code>Thought（思考需要什么）→ Action（调用工具）→ Observation（看结果）→ Thought（评估是否充分）→ ...</code><br><br>没有 Thought 的 Agent 就像一个只会机械执行指令的机器人，不会"想清楚为什么"。`
            }
          ],
          completion_html: `<div style="color:var(--green);font-weight:700;padding:12px">✅ 你理解了 Thought 的核心价值！</div>
<div style="color:var(--muted);font-size:.9rem;margin-top:8px">Thought 让 Agent 从"机械执行"变成"有目的的推理"。<br>这就是 ReAct 论文的核心洞察。</div>`
        },
        {
          type: 'concept',
          title: '📄 你刚才想到的，2022 年有人写成了论文',
          html: `
            <div style="margin:14px 0;padding:16px;background:rgba(251,191,36,.1);border-left:3px solid var(--yellow);border-radius:12px;line-height:1.9">
              <strong style="font-size:1.05rem">ReAct: Synergizing Reasoning and Acting in Language Models</strong><br>
              <span style="color:var(--muted);font-size:.9rem">作者：Shunyu Yao 等（普林斯顿大学 + Google Research）· ICLR 2023</span><br><br>

              <span style="color:var(--cyan)">你刚才的直觉——"Agent 需要先想清楚为什么要做某个行动"——和这篇论文的核心思想完全一致！</span>
            </div>

            <div style="margin:20px 0;padding:16px;background:rgba(0,229,255,.06);border-radius:12px;line-height:1.9">
              <strong style="color:var(--cyan)">论文的核心发现</strong><br><br>
              在 ReAct 之前，有两种方法各有缺陷：<br>
              • <strong>只推理（CoT）</strong>：LLM 一直思考，但思考可能出错，没有外部信息纠正<br>
              • <strong>只行动（Act）</strong>：直接调用工具，但不知道为什么这样做<br><br>

              <strong style="color:var(--cyan)">ReAct = 推理 + 行动交替</strong><br>
              <code>Thought → Action → Observation → Thought → Action...</code><br>
              两者互相补充，互相纠正！
            </div>

            <div style="margin:20px 0;padding:16px;background:rgba(0,0,0,.3);border-radius:12px;line-height:1.9">
              <div style="color:var(--muted);font-size:.85rem;margin-bottom:12px">📋 论文示例（简化版）</div>
              <div style="font-family:monospace;font-size:.85rem">
                <span style="color:#fca5a5">问题：</span>科罗拉多造山运动东部区域的海拔范围是多少？<br><br>

                <span style="color:var(--yellow)">Thought 1:</span> 我需要先搜索科罗拉多造山运动，找到东部区域。<br>
                <span style="color:var(--cyan)">Action 1:</span> Search[科罗拉多造山运动]<br>
                <span style="color:#a3e635">Observation 1:</span> ...东部区域包括高原地带...<br><br>

                <span style="color:var(--yellow)">Thought 2:</span> 我找到了东部区域，但还没有海拔数据。需要搜索高原地带的海拔。<br>
                <span style="color:var(--cyan)">Action 2:</span> Search[高原地带海拔范围]<br>
                <span style="color:#a3e635">Observation 2:</span> 高原地带海拔约 1,800 到 2,100 米...<br><br>

                <span style="color:var(--yellow)">Thought 3:</span> 我已经找到了答案。<br>
                <span style="color:var(--cyan)">Action 3:</span> Finish[1,800 到 2,100 米]
              </div>
            </div>

            <div style="margin-top:16px;padding:12px;background:rgba(251,191,36,.1);border-left:3px solid var(--yellow);border-radius:8px;font-size:.9rem">
              💡 <strong>Thought 的作用（和你刚才想到的一样）：</strong><br>
              • 让 LLM 解释"为什么"要做这个行动<br>
              • 让 LLM 分析上一步的结果是否足够<br>
              • 出错时可以在 Thought 里自我纠正方向！
            </div>
          `
        },
        {
          type: 'concept',
          title: '🚀 ReAct 之后：这个想法走向了哪里？',
          html: `
            <div style="display:flex;flex-direction:column;gap:12px">
              <div style="padding:12px;background:rgba(168,85,247,.08);border-left:3px solid var(--purple);border-radius:8px">
                <strong>2023 · Reflexion</strong><br>
                <span style="color:var(--muted);font-size:.9rem">Agent 失败后，用语言反思错误，下次避免同样的错误。就像人类从失败中学习！</span>
              </div>
              <div style="padding:12px;background:rgba(0,229,255,.08);border-left:3px solid var(--cyan);border-radius:8px">
                <strong>2023 · Tree of Thoughts (ToT)</strong><br>
                <span style="color:var(--muted);font-size:.9rem">不只是一条思维链，而是探索多条路径，选最好的。就像下棋时考虑多种走法！</span>
              </div>
              <div style="padding:12px;background:rgba(16,185,129,.08);border-left:3px solid var(--green);border-radius:8px">
                <strong>2023 · LangChain / LangGraph</strong><br>
                <span style="color:var(--muted);font-size:.9rem">把 ReAct 封装成框架，开发者不需要手写 Prompt。</span>
              </div>
              <div style="padding:12px;background:rgba(251,191,36,.08);border-left:3px solid var(--yellow);border-radius:8px">
                <strong>2024 · Claude / GPT-4 内置推理</strong><br>
                <span style="color:var(--muted);font-size:.9rem">模型本身就会 ReAct 式推理，不需要特殊 Prompt。</span>
              </div>
            </div>
          `
        },
        {
          type: 'challenge',
          title: '✏️ 挑战：给 Act-only Agent 加上 Thought',
          description: '下面是一个纯 Act-only 的 Agent。请修改它，让它在每次调用工具前后都进行思考。',
          starter: `def agent(query, tools, max_iter=5):
    messages = [{"role": "user", "content": query}]

    for i in range(max_iter):
        response = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=1024,
            # TODO: 添加 system prompt 引导思考
            tools=tools,
            messages=messages
        )

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
            return response.content[0].text

    return "达到最大迭代次数"`,
          solution: `def agent(query, tools, max_iter=5):
    messages = [{"role": "user", "content": query}]

    for i in range(max_iter):
        response = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=1024,
            system="""在每次行动前，请先思考：
- 我现在知道什么？
- 我还需要什么信息？
- 为什么要调用这个工具？

在看到结果后，再思考：
- 这个结果告诉了我什么？
- 是否需要更多信息？""",
            tools=tools,
            messages=messages
        )

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
            return response.content[0].text

    return "达到最大迭代次数"`,
          hints: [
            '在 client.messages.create() 中添加 system 参数',
            'System Prompt 应该明确要求 LLM 在行动前后进行思考',
            '关键词：为什么、需要什么、结果告诉了什么'
          ],
          validate: function(code) {
            const hasSystem = code.includes('system=') || code.includes('system :');
            const hasThought = code.includes('思考') || code.includes('为什么') || code.includes('需要');
            if (hasSystem && hasThought) {
              return { ok: true, msg: '✅ 完美！你成功给 Agent 加上了 Thought 能力。现在它会在行动前思考"为什么"，在行动后分析"够不够"。' };
            }
            if (!hasSystem) return { ok: false, msg: '需要添加 system 参数来引导 LLM 思考！' };
            return { ok: false, msg: '接近了！确保 System Prompt 明确要求思考过程。' };
          }
        },
        {
          type: 'concept',
          title: '🚀 ReAct 之后：这个想法走向了哪里？',
          html: `
            <div style="margin:14px 0;padding:14px;background:rgba(251,191,36,.1);border-left:3px solid var(--yellow);border-radius:12px;line-height:1.9;font-size:.9rem">
              <strong>2023 - Reflexion</strong><br>
              Agent 失败后，用语言反思错误，下次避免同样的错误。就像人类从失败中学习！<br><br>

              <strong>2023 - Tree of Thoughts (ToT)</strong><br>
              不只是一条思维链，而是探索多条路径，选最好的。就像下棋时考虑多种走法！<br><br>

              <strong>2023 - LangChain / LangGraph</strong><br>
              把 ReAct 封装成框架，开发者不需要手写 Prompt。<br><br>

              <strong>2024 - Claude / GPT-4 内置推理</strong><br>
              模型本身就会 ReAct 式推理，不需要特殊 Prompt。
            </div>
          `
        },
        {
          type: 'quiz',
          q: 'ReAct 论文中，Thought 的最重要作用是什么？',
          opts: [
            '让输出更长，看起来更专业',
            '让 LLM 能分析 Observation 结果并自我纠正方向，而不是盲目行动',
            '减少 API 调用次数',
            '让代码更容易解析'
          ],
          ans: 1,
          feedback_ok: '🔥 完美！Thought 是 ReAct 的灵魂。它让 LLM 在每次行动前先"想清楚"，在看到结果后能"分析对不对"。这种自我纠正能力是 ReAct 比纯行动（Act-only）强的核心原因！',
          feedback_err: 'Thought 的价值在于"自我纠正"。当工具返回意外结果时，LLM 可以在下一个 Thought 里分析"这不对，我应该换个方向"。这是 ReAct 比 CoT 和 Act-only 都强的关键！'
        },
        {
          type: 'sandbox',
          title: '🎛️ 沙盒：调节 max_iterations，观察 Agent 行为',
          description: '不同的任务复杂度需要不同的迭代次数。拖动滑块，看看各种设置下 Agent 的表现。',
          sliders: [
            { id: 'max_iter', label: 'max_iterations', min: 1, max: 20, step: 1, default: 5, unit: '' },
            { id: 'task_steps', label: '任务步骤数', min: 1, max: 15, step: 1, default: 4, unit: '' }
          ],
          visualize: function(vals) {
            const maxIter = parseInt(vals.max_iter);
            const taskSteps = parseInt(vals.task_steps);
            const ratio = maxIter / taskSteps;
            let status, advice;
            if (ratio < 1) {
              status = '❌ 必然失败';
              advice = `迭代次数(${maxIter})小于任务步骤(${taskSteps})，Agent 一定无法完成任务！`;
            } else if (ratio < 1.5) {
              status = '⚠️ 风险较高';
              advice = `余量不足，一旦某步骤需要重试，Agent 就会超时失败。建议至少留 50% 余量。`;
            } else if (ratio <= 3) {
              status = '✅ 合理设置';
              advice = `有足够余量处理重试和意外情况，同时不会浪费太多 token。`;
            } else {
              status = '💸 过于宽松';
              advice = `余量过大。如果 Agent 陷入循环，会消耗大量 token 才超时。建议适当收紧。`;
            }
            const bar = Math.min(maxIter, 20);
            const taskBar = Math.min(taskSteps, 20);
            return `任务步骤: ${'▓'.repeat(taskBar)}${'░'.repeat(20-taskBar)} ${taskSteps}
最大迭代: ${'█'.repeat(bar)}${'░'.repeat(20-bar)} ${maxIter}

状态：${status}
建议：${advice}

Token 消耗估算：约 ${maxIter * 800} tokens（每步 ~800 tokens）`;
          }
        }
      ]
    }
  }
});
