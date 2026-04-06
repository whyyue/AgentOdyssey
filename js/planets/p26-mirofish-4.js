// 关卡 26：MiroFish 系列 4 - 报告 Agent 星

PLANETS.push({
  id: 'p26',
  icon: '📊',
  num: '星球 26',
  name: 'MiroFish 4：报告 Agent',
  desc: '让 Agent 自动分析仿真结果，生成深度预测报告！',

  difficulties: {
    // 🟢 简单模式
    easy: {
      sections: [
        {
          type: 'story',
          title: '📊 仿真结束了，然后呢？',
          content: `
            仿真跑完了，1000 个 Agent 互动了 50 轮，产生了海量数据。<br><br>
            但这些数据对用户来说毫无意义——他们需要的是<strong>洞察</strong>，不是原始数据。<br><br>
            这就是 <strong>ReportAgent</strong> 的使命：<br>
            • 分析仿真中的关键事件和转折点<br>
            • 识别舆论演化的规律和趋势<br>
            • 生成结构化的预测报告<br>
            • 支持用户深度追问和交互<br><br>
            ReportAgent 不只是"总结"，它是一个能与仿真世界深度交互的智能分析师。
          `
        },
        {
          type: 'concept',
          title: '🔍 ReportAgent 的工具箱',
          content: `
            ReportAgent 配备了一套专门的分析工具：<br><br>
            <strong>数据查询工具</strong><br>
            • <code>query_agent_history(agent_id)</code>：查询某个 Agent 的完整行为历史<br>
            • <code>search_events(keyword)</code>：搜索仿真中的关键事件<br>
            • <code>get_opinion_trend(topic)</code>：获取某话题的舆论变化曲线<br><br>
            <strong>分析工具</strong><br>
            • <code>find_influencers()</code>：识别影响力最大的 Agent<br>
            • <code>detect_turning_points()</code>：检测舆论转折点<br>
            • <code>cluster_opinions()</code>：对观点进行聚类分析<br><br>
            <strong>报告生成工具</strong><br>
            • <code>generate_report(sections)</code>：生成结构化报告<br>
            • <code>create_visualization(data)</code>：生成数据可视化
          `
        },
        {
          type: 'quiz',
          q: 'ReportAgent 和普通的"总结 LLM"最大的区别是什么？',
          opts: [
            'ReportAgent 输出更长',
            'ReportAgent 能主动调用工具查询仿真数据，而不只是总结已有文本',
            'ReportAgent 使用更大的模型',
            'ReportAgent 速度更快'
          ],
          ans: 1,
          feedback_ok: '✅ 正确！ReportAgent 是一个真正的 Agent，能主动探索仿真数据，而不只是被动总结。',
          feedback_err: 'ReportAgent 的核心是"主动查询"——它能调用工具深入挖掘仿真数据，这是普通总结做不到的！'
        }
      ]
    },

    // 🔴 困难模式
    hard: {
      sections: [
        {
          type: 'story',
          title: '🏗️ 构建 ReportAgent 的架构',
          content: `
            ReportAgent 的设计面临一个核心挑战：<br><br>
            仿真产生的数据量巨大（可能有几十万条记录），但 LLM 的 Context Window 有限。<br><br>
            解决方案是<strong>分层分析架构</strong>：<br>
            <ol>
              <li><strong>第一层：数据索引</strong> — 仿真结束后，对所有数据建立索引（时间线、关键词、Agent 网络）</li>
              <li><strong>第二层：按需检索</strong> — ReportAgent 通过工具按需查询，不一次性加载所有数据</li>
              <li><strong>第三层：渐进分析</strong> — 先宏观后微观，先趋势后细节</li>
              <li><strong>第四层：交互深化</strong> — 用户追问时，Agent 能定向深挖</li>
            </ol>
            这种架构让 ReportAgent 能分析任意规模的仿真，不受 Context Window 限制。
          `
        },
        {
          type: 'code',
          title: '💻 ReportAgent 核心实现',
          code: `class ReportAgent:
    def __init__(self, simulation_db, llm_client):
        self.db = simulation_db
        self.llm = llm_client
        self.tools = self._build_tools()
        self.conversation = []

    def _build_tools(self):
        return [
            {
                "name": "query_opinion_trend",
                "description": "查询某话题在仿真过程中的舆论变化趋势",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "topic": {"type": "string", "description": "要查询的话题关键词"},
                        "time_range": {"type": "string", "description": "时间范围，如 '0-25' 表示前25轮"}
                    },
                    "required": ["topic"]
                }
            },
            {
                "name": "find_key_agents",
                "description": "找出对某话题影响力最大的 Agent",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "topic": {"type": "string"},
                        "top_n": {"type": "integer", "default": 5}
                    },
                    "required": ["topic"]
                }
            }
        ]

    def generate_report(self, user_requirement):
        """生成预测报告的主入口"""
        system_prompt = """你是一个专业的仿真分析师。
你有权访问完整的仿真数据库，可以通过工具查询任何数据。
请先进行宏观分析，再深入关键细节，最后给出预测结论。"""

        self.conversation = [
            {"role": "user", "content": f"请分析仿真结果并生成报告。用户需求：{user_requirement}"}
        ]

        # ReAct 循环：分析 → 查询 → 分析 → 生成报告
        for _ in range(10):
            response = self.llm.messages.create(
                model="claude-opus-4-6",
                max_tokens=4096,
                system=system_prompt,
                tools=self.tools,
                messages=self.conversation
            )

            if response.stop_reason == "tool_use":
                # 执行工具查询
                tool_results = self._execute_tools(response.content)
                self.conversation.append({"role": "assistant", "content": response.content})
                self.conversation.append({"role": "user", "content": tool_results})
            else:
                # 报告生成完毕
                return response.content[0].text

        return "分析超时，请缩小分析范围"`,
          explanation: `
            <strong>关键设计点：</strong><br>
            • <code>ReAct 循环</code>：ReportAgent 自主决定查询哪些数据，不需要用户指定<br>
            • <code>工具驱动</code>：通过工具按需查询，避免一次性加载海量数据<br>
            • <code>对话历史</code>：保留完整的分析过程，支持用户追问<br>
            • <code>max 10 轮</code>：防止无限查询，控制成本
          `
        },
        {
          type: 'debug',
          title: '🐛 Debug：修复报告生成的 Bug',
          description: '下面的 ReportAgent 有两个 Bug：一是工具结果没有正确格式化，二是对话历史没有正确维护。找出并修复！',
          buggy_code: `def _execute_tools(self, content_blocks):
    results = []
    for block in content_blocks:
        if block.type == "tool_use":
            # Bug 1: 直接调用工具，没有处理异常
            result = self.db.query(block.name, block.input)
            results.append(result)  # Bug 2: 格式不对，应该是 tool_result 格式

    return results  # Bug 3: 应该返回正确的消息格式`,
          fixed_code: `def _execute_tools(self, content_blocks):
    tool_results = []
    for block in content_blocks:
        if block.type == "tool_use":
            try:
                result = self.db.query(block.name, block.input)
                result_str = json.dumps(result, ensure_ascii=False)
            except Exception as e:
                result_str = f"查询失败：{str(e)}"

            tool_results.append({
                "type": "tool_result",
                "tool_use_id": block.id,  # Fix: 必须对应 tool_use 的 id
                "content": result_str
            })

    return tool_results  # Fix: 返回正确格式的列表`,
          hints: [
            'Bug 1：数据库查询可能失败，需要 try/except 捕获异常',
            'Bug 2：工具结果必须是 {"type": "tool_result", "tool_use_id": ..., "content": ...} 格式',
            'Bug 3：返回值应该是可以直接放入 messages 的 content 列表'
          ]
        },
        {
          type: 'quiz',
          q: 'ReportAgent 为什么要用 ReAct 循环而不是一次性生成报告？',
          opts: [
            '因为 ReAct 循环更复杂，显得更专业',
            '仿真数据量太大，需要按需查询；ReAct 让 Agent 能根据中间结果决定下一步查什么',
            '因为一次性生成会超过 max_tokens 限制',
            '为了增加 API 调用次数'
          ],
          ans: 1,
          feedback_ok: '✅ 完全正确！ReAct 的核心价值在于"自适应查询"——Agent 看到第一个查询结果后，能智能决定下一步该深挖哪个方向。',
          feedback_err: 'ReAct 的价值是"自适应"。仿真数据有很多维度，Agent 需要根据初步发现来决定深挖哪里，这是一次性生成做不到的。'
        }
      ]
    },

    // 🔥 地狱模式
    hell: {
      sections: [
        {
          type: 'story',
          title: '😈 地狱挑战：实时交互式报告系统',
          content: `
            普通的报告生成是"一次性"的——用户等待，Agent 分析，输出报告。<br><br>
            但真正的专业系统需要<strong>实时交互</strong>：<br>
            • 用户可以在报告生成过程中追问<br>
            • Agent 能根据追问动态调整分析方向<br>
            • 支持"钻取"（drill-down）：从宏观趋势深入到具体 Agent 的行为<br>
            • 支持"假设分析"：如果某个变量不同，结果会怎样？<br><br>
            这需要将 ReportAgent 改造为<strong>流式 + 多轮对话</strong>模式。
          `
        },
        {
          type: 'code',
          title: '💻 流式交互式 ReportAgent',
          code: `import asyncio
from anthropic import AsyncAnthropic

class InteractiveReportAgent:
    def __init__(self, simulation_db):
        self.db = simulation_db
        self.llm = AsyncAnthropic()
        self.session_history = []  # 跨轮次的对话历史
        self.analysis_cache = {}   # 缓存已查询的数据，避免重复查询

    async def stream_analysis(self, user_message: str):
        """流式生成分析，支持实时显示"""
        self.session_history.append({
            "role": "user",
            "content": user_message
        })

        full_response = ""
        tool_calls = []

        # 流式调用 LLM
        async with self.llm.messages.stream(
            model="claude-opus-4-6",
            max_tokens=4096,
            system=self._build_system_prompt(),
            tools=self._get_tools(),
            messages=self.session_history
        ) as stream:
            async for event in stream:
                if event.type == "content_block_delta":
                    if hasattr(event.delta, "text"):
                        # 实时输出文字
                        print(event.delta.text, end="", flush=True)
                        full_response += event.delta.text
                    elif hasattr(event.delta, "partial_json"):
                        # 收集工具调用参数
                        tool_calls.append(event.delta.partial_json)

        # 处理工具调用
        if tool_calls:
            results = await self._execute_tools_async(tool_calls)
            self.session_history.append({"role": "assistant", "content": full_response})
            self.session_history.append({"role": "user", "content": results})
            # 递归继续分析
            await self.stream_analysis("")
        else:
            self.session_history.append({"role": "assistant", "content": full_response})

    def _build_system_prompt(self):
        # 动态构建 system prompt，包含已分析的关键发现
        findings = self.analysis_cache.get("key_findings", "尚未发现关键信息")
        return f"""你是 MiroFish 的专业仿真分析师。
已知关键发现：{findings}
请基于已有发现继续深入分析，避免重复查询已知数据。"""`,
          explanation: `
            <strong>地狱级技术点：</strong><br>
            • <code>AsyncAnthropic</code>：异步客户端，支持流式输出<br>
            • <code>stream()</code>：实时输出 token，用户不需要等待完整响应<br>
            • <code>session_history</code>：跨轮次保留对话历史，支持追问<br>
            • <code>analysis_cache</code>：缓存已查询数据，避免重复消耗 token<br>
            • <code>动态 system prompt</code>：将已有发现注入 prompt，让 Agent 能"记住"之前的分析
          `
        },
        {
          type: 'challenge',
          title: '✏️ 挑战：实现假设分析功能',
          description: '为 InteractiveReportAgent 添加一个 "what_if" 工具，让用户能问"如果某个关键 Agent 的立场改变，结果会怎样？"',
          starter: `def _get_what_if_tool(self):
    return {
        "name": "what_if_analysis",
        "description": "___",  # TODO: 填写工具描述
        "input_schema": {
            "type": "object",
            "properties": {
                "agent_id": {"type": "integer", "description": "___"},
                "new_stance": {"type": "string", "description": "___"},
                "from_round": {"type": "integer", "description": "___"}
            },
            "required": ["agent_id", "new_stance"]
        }
    }

def execute_what_if(self, agent_id, new_stance, from_round=0):
    # TODO: 查询该 Agent 的影响力网络
    influence_network = ___

    # TODO: 估算立场改变的影响范围
    affected_agents = ___

    return {
        "agent_id": agent_id,
        "original_stance": ___,
        "new_stance": new_stance,
        "estimated_impact": ___
    }`,
          solution: `def _get_what_if_tool(self):
    return {
        "name": "what_if_analysis",
        "description": "假设某个 Agent 的立场发生改变，分析这会如何影响整体舆论走向",
        "input_schema": {
            "type": "object",
            "properties": {
                "agent_id": {"type": "integer", "description": "要改变立场的 Agent ID"},
                "new_stance": {"type": "string", "description": "新的立场描述"},
                "from_round": {"type": "integer", "description": "从第几轮开始改变，默认从头"}
            },
            "required": ["agent_id", "new_stance"]
        }
    }

def execute_what_if(self, agent_id, new_stance, from_round=0):
    influence_network = self.db.get_influence_network(agent_id)
    affected_agents = [n for n in influence_network if n["influence_score"] > 0.3]
    original = self.db.get_agent_stance(agent_id)

    return {
        "agent_id": agent_id,
        "original_stance": original,
        "new_stance": new_stance,
        "estimated_impact": f"可能影响 {len(affected_agents)} 个直接关联 Agent，占总体的 {len(affected_agents)/10:.1f}%"
    }`,
          hints: [
            'description 要让 LLM 明白这个工具用于"假设分析"场景',
            '影响力网络可以通过 self.db.get_influence_network(agent_id) 获取',
            '过滤 influence_score > 0.3 的节点作为"直接影响"的 Agent'
          ],
          validate: function(code) {
            if (code.includes('what_if') && code.includes('description') && !code.includes('___') && code.includes('influence')) {
              return { ok: true, msg: '✅ 完美！假设分析工具设计合理，ReportAgent 现在能回答"如果...会怎样"的问题了！' };
            }
            if (code.includes('___')) return { ok: false, msg: '还有未填写的 TODO 部分！' };
            if (!code.includes('influence')) return { ok: false, msg: '需要查询影响力网络来估算影响范围！' };
            return { ok: false, msg: '检查工具描述和参数定义是否完整。' };
          }
        },
        {
          type: 'quiz',
          q: '流式输出（streaming）在 ReportAgent 中的主要价值是什么？',
          opts: [
            '减少 API 费用',
            '让用户能实时看到分析过程，提升交互体验，同时可以提前中断不需要的分析',
            '提高分析准确性',
            '减少 token 消耗'
          ],
          ans: 1,
          feedback_ok: '✅ 正确！流式输出让用户不需要盯着空白屏幕等待，还能在看到初步结果后决定是否继续。',
          feedback_err: '流式输出的核心价值是"实时反馈"——用户能看到 Agent 的思考过程，而不是等待一个黑盒输出。'
        }
      ]
    }
  }
});
