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
    }
  }
});
