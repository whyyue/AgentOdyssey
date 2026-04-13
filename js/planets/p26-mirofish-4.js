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
          type: 'dialogue',
          title: '🔍 AI 写的 100 页报告，用户只看了第一页就关了',
          scenario: `<strong>故障场景</strong>：你的仿真系统跑完了 1000 个 Agent 的模拟，生成了 100 页的原始数据。你让报告 Agent 自动生成分析报告。<br><br>
报告 Agent 输出了 50 页的 PDF，内容：<br>
• 第 1-10 页：数据表格，密密麻麻的数字<br>
• 第 11-30 页：统计图表，每个维度一张图<br>
• 第 31-45 页：文字分析，但没有结论<br>
• 第 46-50 页：附录<br><br>
用户看了第一页就关了："我不要看数据，我要知道<strong>结论是什么、该怎么决策</strong>。"<br><br>
报告 Agent 把"分析数据"当成了目标，但用户的目标是"帮我做决策"。`,
          steps: [
            {
              question: '用户不要看数据表格，要"结论和决策建议"。报告 Agent 缺少什么？',
              opts: [
                '更多的数据',
                '以用户需求为中心的写作框架——先说结论（Executive Summary），再说"所以呢"（建议），最后才是支撑数据。用户关心的是"我该怎么做"，不是"数据是什么"',
                '更漂亮的图表',
                '更长的报告'
              ],
              correct: 1,
              aria_correct: '✅ 对！报告的结构应该倒过来：先说结论（1 页），再展开核心洞察（3-5 页），详细数据放附录。这是商业报告的铁律——先给结论，让用户决定是否深入。',
              aria_wrong: '❌ 更多数据只会让报告更长。想想：你老板让你写季度报告，他会先看什么？——"结论是什么？我该怎么做？"不是 100 行的 Excel。'
            },
            {
              question: '报告 Agent 要从 1000 个 Agent 的模拟数据中提炼"结论"。但数据量太大，一次塞不进 Context Window。怎么处理？',
              opts: [
                '只看前 100 个 Agent 的数据',
                '分层摘要：先让小模型对每个 Agent 生成微摘要，再让大模型从微摘要中提炼全局结论——MapReduce 思路',
                '随机抽样 10 个 Agent',
                '压缩数据'
              ],
              correct: 1,
              aria_correct: '✅ 正确！MapReduce 思路：1000 个微摘要（每个 100 字）→ 汇总成 10 个分组摘要（每个 500 字）→ 最终 1 个全局报告。三次调用，每次都在 Context Window 内，但信息层层提炼。',
              aria_wrong: '❌ 只看前 100 个或随机抽样会丢失重要信息。想想：MapReduce 的思路是什么？把大任务拆成小任务，每步处理一部分，最后汇总。能不能让 AI 也这么做？'
            },
            {
              question: '报告 Agent 生成的洞察"面包师群体收入下降 15%"——但这只是描述性统计，不是预测性洞察。用户需要"接下来会怎样"。怎么让报告 Agent 做预测？',
              opts: [
                '告诉用户"AI 不能预测未来"',
                '让报告 Agent 基于历史趋势和因果关系进行外推："按当前趋势，下季度面包师收入可能继续下降 5-10%，建议关注面粉供应链变化"——有依据的预测，附置信区间',
                '随便编一个预测',
                '增加更多历史数据'
              ],
              correct: 1,
              aria_correct: '✅ 完全正确！预测性报告 = 趋势外推 + 因果分析 + 置信度声明。不是"我确定未来会怎样"，而是"按当前数据，可能出现以下情况，建议做以下准备"。这就是从"描述过去"到"预测未来"的升级。',
              aria_wrong: '❌ AI 确实不能 100% 预测未来，但可以基于数据做有依据的趋势判断。想想：天气预报也不是 100% 准确，但它有"降水概率 70%"——概率性的预测比没有预测好得多。',
              reveal_on_correct: `<strong>报告 Agent 的三层架构</strong>：<br>1. <strong>数据聚合</strong>：MapReduce 式分层摘要，从海量数据中提炼关键指标<br>2. <strong>洞察生成</strong>：描述性统计 + 因果分析 + 趋势外推<br>3. <strong>用户导向</strong>：先结论、再建议、最后数据——用户关心的不是"数据"，而是"所以呢？"`
            }
          ],
          completion_html: `<div style="color:var(--green);font-weight:700;padding:12px">✅ 你设计出了从数据到决策的报告系统！</div>
<div style="color:var(--muted);font-size:.9rem;margin-top:8px">数据聚合 + 洞察生成 + 用户导向 = 让报告从"数据堆砌"变成"决策支持"。<br>用户要的不是信息，是行动指南。</div>`
        },
        {
          type: 'concept',
          title: '📄 AI 报告系统的核心：从描述到预测',
          html: `
            <div style="margin:14px 0;padding:16px;background:rgba(0,229,255,.06);border-radius:12px;line-height:1.9">
              <strong style="color:var(--cyan)">报告的三层价值</strong><br><br>
              <div style="display:grid;grid-template-columns:1fr;gap:12px;margin-top:12px">
                <div style="padding:12px;background:rgba(168,85,247,.08);border-radius:8px">
                  <strong>描述层：发生了什么？</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">数据统计、趋势图表、异常检测。AI 非常擅长。但用户看了只会说"然后呢？"</span>
                </div>
                <div style="padding:12px;background:rgba(0,229,255,.08);border-radius:8px">
                  <strong>洞察层：为什么会这样？</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">因果分析、相关性发现、异常归因。这是从"数据"到"理解"的关键一步。</span>
                </div>
                <div style="padding:12px;background:rgba(16,185,129,.08);border-radius:8px">
                  <strong>决策层：我该怎么做？</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">趋势预测 + 行动建议 + 风险评估。用户最关心的层次。也是 AI 报告系统最难做好的部分。</span>
                </div>
              </div>
            </div>
          `
        },
        {
          type: 'quiz',
          q: '好的报告 Agent 和差的最大区别是什么？',
          opts: [
            '图表更漂亮',
            '从用户需求出发：先给结论和行动建议，数据作为支撑——用户要的是"我该怎么做"，不是"数据是什么"',
            '报告更长更详细',
            '用了更强的模型'
          ],
          ans: 1,
          feedback_ok: '🔥 正确！差的报告堆数据，好的报告帮决策。用户打开报告时心里想的是"我该怎么做"——如果你的第一页就是结论和建议，用户会觉得"这个报告太有用了"。',
          feedback_err: '用户不要更多数据，要"所以呢？"。好的报告从结论开始，差的报告从数据开始。先给答案，再给证据。'
        }
      ]
    }
  }
});
