// 关卡 13：实战星 2 - 代码审查 Agent（完整重构）

PLANETS.push({
  id: 'p13',
  icon: '🔍',
  num: '星球 13',
  name: '实战星 2：代码审查',
  desc: '构建一个能自动审查代码、发现问题的 Agent！',

  difficulties: {
    // 🟢 简单模式
    easy: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🔍 实战星 2</div>
            <p>飞船来到代码审查星，到处都是等待检查的代码！</p>
            <div class="chat-bubble robot">
              🤖 ARIA：船长！程序员写完代码后，需要有人检查——<br>
              有没有 bug？代码写得清楚吗？有没有安全漏洞？<br>
              这就是<strong>代码审查（Code Review）</strong>！
            </div>
            <div class="chat-bubble">
              👦 你：就像老师批改作业？
            </div>
            <div class="chat-bubble robot">
              🤖 ARIA：完美比喻！我们来做一个 AI 代码审查助手，<br>
              让它自动帮你找问题、给建议！
            </div>
          `
        },
        {
          type: 'concept',
          title: '🔍 代码审查要看什么？',
          html: `
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px">
              <div style="background:rgba(0,229,255,.08);border:1px solid rgba(0,229,255,.2);border-radius:10px;padding:12px;font-size:.82rem">
                ✅ <strong>正确性</strong><br>
                <span style="color:var(--muted)">代码逻辑对吗？<br>边界情况处理了吗？</span>
              </div>
              <div style="background:rgba(168,85,247,.08);border:1px solid rgba(168,85,247,.2);border-radius:10px;padding:12px;font-size:.82rem">
                📖 <strong>可读性</strong><br>
                <span style="color:var(--muted)">变量名清楚吗？<br>有注释吗？</span>
              </div>
              <div style="background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:10px;padding:12px;font-size:.82rem">
                🔒 <strong>安全性</strong><br>
                <span style="color:var(--muted)">有 SQL 注入吗？<br>用户输入验证了吗？</span>
              </div>
              <div style="background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2);border-radius:10px;padding:12px;font-size:.82rem">
                🧪 <strong>测试</strong><br>
                <span style="color:var(--muted)">有单元测试吗？<br>覆盖率够吗？</span>
              </div>
            </div>
          `
        },
        {
          type: 'quiz',
          q: '代码审查 Agent 最重要的工具是什么？',
          opts: [
            '只需要 AI，不需要工具',
            'read_file（读代码）+ run_linter（静态检查）+ check_tests（测试覆盖率）',
            '只需要运行代码看结果',
            '只需要检查变量名'
          ],
          ans: 1,
          feedback_ok: '🎯 正确！代码审查需要多个工具配合：读取代码、静态分析、测试检查，最后 AI 综合判断！',
          feedback_err: '代码审查需要多个工具：读文件、运行 linter、检查测试，AI 负责综合分析！'
        }
      ]
    },

    // 🟡 困难模式
    hard: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🔍 实战星 2（技术版）</div>
            <div class="chat-bubble robot">
              🤖 ARIA：船长！让我们实现一个真正的代码审查 Agent。<br>
              它能读取 PR 的所有文件，并行审查，最后发布评论！
            </div>
          `
        },
        {
          type: 'code',
          title: '💻 代码审查 Agent 完整实现',
          code: `import anthropic
import json
from concurrent.futures import ThreadPoolExecutor

client = anthropic.Anthropic()

tools = [
    {
        "name": "read_file",
        "description": "读取代码文件内容",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {"type": "string", "description": "文件路径"}
            },
            "required": ["path"]
        }
    },
    {
        "name": "run_linter",
        "description": "运行静态代码检查，返回问题列表",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {"type": "string"},
                "language": {"type": "string", "enum": ["python", "javascript", "typescript"]}
            },
            "required": ["path", "language"]
        }
    },
    {
        "name": "get_test_coverage",
        "description": "获取文件的测试覆盖率",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {"type": "string"}
            },
            "required": ["path"]
        }
    }
]

REVIEW_SYSTEM_PROMPT = """你是一个专业的代码审查员。
审查代码时，请关注：
1. 正确性：逻辑是否正确，边界情况是否处理
2. 安全性：是否有 SQL 注入、XSS、未验证的用户输入
3. 可读性：命名是否清晰，是否需要注释
4. 测试：覆盖率是否足够，测试是否有意义

输出格式：
- 严重问题（必须修复）
- 建议改进（可选）
- 总体评分（1-10）"""

def review_single_file(file_path: str) -> dict:
    """审查单个文件"""
    messages = [{"role": "user", "content": f"请审查文件：{file_path}"}]

    while True:
        response = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=2048,
            system=REVIEW_SYSTEM_PROMPT,
            tools=tools,
            messages=messages
        )

        if response.stop_reason == "end_turn":
            return {
                "file": file_path,
                "review": response.content[0].text
            }

        tool_results = []
        for block in response.content:
            if block.type == "tool_use":
                result = execute_tool(block.name, block.input)
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": json.dumps(result, ensure_ascii=False)
                })

        messages.append({"role": "assistant", "content": response.content})
        messages.append({"role": "user", "content": tool_results})

def review_pr(pr_files: list[str]) -> str:
    """并行审查 PR 的所有文件"""
    # 并行审查所有文件
    with ThreadPoolExecutor(max_workers=4) as executor:
        reviews = list(executor.map(review_single_file, pr_files))

    # 汇总所有审查结果
    summary_prompt = f"""以下是 PR 中所有文件的审查结果：

{json.dumps(reviews, ensure_ascii=False, indent=2)}

请给出：
1. 整体评估（是否可以合并）
2. 最重要的 3 个问题
3. 总体评分"""

    response = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=1024,
        messages=[{"role": "user", "content": summary_prompt}]
    )
    return response.content[0].text`,
          explanation: `
            <strong>关键设计：</strong><br>
            • <strong>ThreadPoolExecutor</strong>：并行审查多个文件，大幅减少总时间<br>
            • <strong>REVIEW_SYSTEM_PROMPT</strong>：明确审查维度和输出格式，保证结果一致性<br>
            • <strong>两阶段设计</strong>：先单文件审查，再汇总分析——分而治之<br>
            • <strong>结构化输出</strong>：严重问题/建议/评分，方便后续处理
          `
        },
        {
          type: 'pitfalls',
          title: '⚠️ 常见坑点',
          items: [
            '误报（False Positive）：把正确代码标记为问题——需要提供项目上下文和编码规范',
            '大文件超出 Context Window：单文件超过 10K 行时需要分块审查',
            '并行请求触发 API 限流：并发数过高时需要加速率限制（rate limiter）',
            '审查结果不一致：同一代码每次审查结果不同——降低 temperature 或使用结构化输出'
          ]
        },
        {
          type: 'quiz',
          q: '为什么代码审查 Agent 要用 ThreadPoolExecutor 并行处理文件？',
          opts: [
            '因为 Python 要求这样写',
            '一个 PR 可能有几十个文件，串行审查太慢，并行可以同时处理多个文件',
            '并行可以减少 token 消耗',
            '并行可以提高审查质量'
          ],
          ans: 1,
          feedback_ok: '✅ 正确！一个 PR 可能有 20 个文件，串行需要 20 次等待，并行只需要等最慢的那个！',
          feedback_err: '想象一个 PR 有 20 个文件，串行审查需要 20 次 API 调用的时间，并行只需要 1 次！'
        }
      ]
    },

    // 🔴 地狱模式
    hell: {
      sections: [
        {
          type: 'dialogue',
          title: '🔍 AI 代码审查员被全团队拉黑了',
          scenario: `<strong>故障场景</strong>：你把 AI 代码审查 Agent 接入了团队的 GitHub。<br>
第一周，团队很兴奋。第三周，开发者开始忽略它的评论。第六周，团队投票要求关掉它。<br><br>
你翻了最近的审查记录：<br><br>
PR #42（改动：修复空指针异常）<br>
AI 审查了整个 3,000 行的文件，对其中 2,900 行没改过的代码提出了 47 条"建议"。<br>
开发者："它把 2019 年写的代码都审查了一遍？？"<br><br>
PR #87（改动：修改配置文件中的端口号）<br>
AI 评论："建议使用环境变量而不是硬编码"——但代码里已经在用环境变量了，只是这次改了端口的默认值。<br>
开发者："它根本没看懂我改了什么。"<br><br>
PR #103（改动：重构数据库查询逻辑，500 行改动）<br>
AI 返回"审查失败：输入过长"——500 行改动超出了 Context Window。<br>
开发者："500 行就超了？那我为什么不直接让人审？"`,
          steps: [
            {
              question: 'PR #42 中，AI 审查了 3,000 行文件却只改了 100 行。它应该怎么做？',
              opts: [
                '审查全文件，确保没有其他问题',
                '只审查 git diff 中的改动部分——用增量审查聚焦真正的变化，节省 token，避免噪音',
                '只看改动的行，不看上下文',
                '随机抽取 500 行审查'
              ],
              correct: 1,
              aria_correct: '✅ 对！增量审查（git diff）是 CI/CD 代码审查的铁律。只看改动部分 + 少量上下文（--unified=5）。这样 token 消耗从 3,000 行降到 100 行，而且不会对历史代码提无关建议。',
              aria_wrong: '❌ 审查全文件 = 浪费 30 倍 token + 生成大量无关建议。开发者的改动只是那 100 行，AI 应该聚焦在哪里？'
            },
            {
              question: 'PR #87 中，AI 对已经用环境变量的代码提了"建议用环境变量"。它缺少什么信息？',
              opts: [
                '更大的模型',
                '上下文——它只看到了 git diff，不知道项目已经在用环境变量。需要把项目的代码规范（如 README、ESLint 配置）注入 prompt',
                '更多的训练数据',
                '人工校对'
              ],
              correct: 1,
              aria_correct: '✅ 正确！AI 只看 diff 就像只看修补的油漆，不知道整面墙什么颜色。注入项目规范（README、CONTRIBUTING.md、代码风格配置）让 AI 理解"这个项目已经有这个规范了"。',
              aria_wrong: '❌ 不是模型能力问题——AI 确实看了代码，但它只看了 diff 部分。它不知道项目的其他部分在做什么。你能不能在审查前给 AI 一些"背景资料"？'
            },
            {
              question: 'PR #103 的 500 行改动超出了 Context Window。更深层的问题是：大型重构 PR 和小型修复 PR 应该怎么区别处理？',
              opts: [
                '限制 PR 大小，超过 200 行的拒绝自动审查',
                '智能分块：把大 diff 按文件/函数拆分成多块，每块独立审查，最后合并结果。每块保留关键上下文（项目规范）',
                '只审查前 200 行',
                '用更长的 Context Window 模型'
              ],
              correct: 1,
              aria_correct: '✅ 完全正确！智能分块是解决 Context Window 限制的标准做法：按文件拆分 → 每块独立审查（保留项目规范作为共享上下文）→ 合并去重。这样既能处理大型 PR，又不会丢失上下文。',
              aria_wrong: '❌ 拒绝审查不是解法——大型重构恰恰最需要 AI 辅助。想想：500 行改动不可能来自一个文件对吧？能不能按文件拆开来分别审查？',
              reveal_on_correct: `<strong>CI/CD 代码审查的三条铁律</strong>：<br>1. <strong>增量审查</strong>：只看 git diff，不审查全文件（解决噪音问题）<br>2. <strong>上下文注入</strong>：把项目规范、代码风格注入 prompt（解决"不了解项目"问题）<br>3. <strong>智能分块</strong>：大型 PR 按文件拆分，独立审查后合并（解决 Context Window 限制）<br><br>这三条解决了 AI 审查被开发者拉黑的核心原因。`
            }
          ],
          completion_html: `<div style="color:var(--green);font-weight:700;padding:12px">✅ 你设计出了不被开发者拉黑的 AI 审查系统！</div>
<div style="color:var(--muted);font-size:.9rem;margin-top:8px">增量审查 + 上下文注入 + 智能分块。<br>AI 审查要被开发者接受，关键是"精确"——只说该说的，不说废话。</div>`
        },
        {
          type: 'concept',
          title: '📄 你刚才设计的，就是 2024 年 AI 代码审查工具的核心架构',
          html: `
            <div style="margin:14px 0;padding:16px;background:rgba(251,191,36,.1);border-left:3px solid var(--yellow);border-radius:12px;line-height:1.9">
              <strong style="font-size:1.05rem">AI Code Review 工程实践</strong><br>
              <span style="color:var(--muted);font-size:.9rem">GitHub Copilot Review、CodeRabbit、Sourcery 等产品的共同设计模式</span><br><br>
              <span style="color:var(--cyan)">你刚才推导出的三条铁律——增量审查、上下文注入、智能分块——正是这些产品的核心架构决策！</span>
            </div>

            <div style="margin:20px 0;padding:16px;background:rgba(0,229,255,.06);border-radius:12px;line-height:1.9">
              <strong style="color:var(--cyan)">进阶设计：审查记忆</strong><br><br>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px">
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>审查去重</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">把历史审查存入向量数据库<br>新审查前检索相似问题<br>已提过 3 次的问题升级为"必须修复"</span>
                </div>
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>质量反馈循环</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">追踪 AI 建议的接受率<br>接受率低的规则自动降权<br>定期人工校准（每月 100 条抽样）</span>
                </div>
              </div>
            </div>
          `
        },
        {
          type: 'concept',
          title: '🚀 AI 代码审查的演进（2023→2026）',
          html: `
            <div style="display:flex;flex-direction:column;gap:12px">
              <div style="padding:12px;background:rgba(168,85,247,.08);border-left:3px solid var(--purple);border-radius:8px">
                <strong>2023 · GitHub Copilot Chat</strong><br>
                <span style="color:var(--muted);font-size:.9rem">AI 代码审查从 CLI 工具进入 IDE。开发者可以在 PR 界面直接和 AI 对话。但初期噪音大，接受率低。</span>
              </div>
              <div style="padding:12px;background:rgba(0,229,255,.08);border-left:3px solid var(--cyan);border-radius:8px">
                <strong>2024 · CodeRabbit / Sourcery</strong><br>
                <span style="color:var(--muted);font-size:.9rem">专注代码审查的产品出现。增量审查 + 上下文注入 + 严重性分级成为标配。AI 审查从"新奇"变成"有用"。</span>
              </div>
              <div style="padding:12px;background:rgba(16,185,129,.08);border-left:3px solid var(--green);border-radius:8px">
                <strong>2024 · 自动修复</strong><br>
                <span style="color:var(--muted);font-size:.9rem">AI 不只提建议，还直接生成修复代码。"Review → 一键修复"工作流。但误报修复会引入新 bug——需要人类最终确认。</span>
              </div>
              <div style="padding:12px;background:rgba(251,191,36,.08);border-left:3px solid var(--yellow);border-radius:8px">
                <strong>2025-2026 · 安全审查集成</strong><br>
                <span style="color:var(--muted);font-size:.9rem">SAST + AI 审查结合。AI 理解业务逻辑漏洞（SQL 注入、权限绕过），传统工具检测已知模式。两者互补。</span>
              </div>
            </div>
          `
        },
        {
          type: 'quiz',
          q: '为什么 AI 代码审查应该审查 git diff 而不是完整文件？',
          opts: [
            '因为 git diff 格式更好看',
            '只审查改动部分：节省 token、聚焦变化、避免对已有代码提无关建议、减少审查噪音',
            '因为完整文件太长 API 不接受',
            '因为开发者只关心改动'
          ],
          ans: 1,
          feedback_ok: '🔥 完美！3,000 行文件改了 100 行，审查全文件浪费 30 倍 token 且生成大量噪音。增量审查让 AI 聚焦真正的变化，开发者才不会把它拉黑！',
          feedback_err: '增量审查 = 省资源 + 精准 + 少噪音。一个 10,000 行文件改了 50 行，审查全文件是对开发者和 token 的双重浪费！'
        }
      ]
    }
  }
});
