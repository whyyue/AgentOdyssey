// 关卡 20：帝国篇 - 质量保障：门下省审核机制

PLANETS.push({
  id: 'p20',
  icon: '🔍',
  num: '星球 20',
  name: '帝国星 - 质量保障',
  desc: '门下省审核机制：AI 系统的强制质量关卡！',

  difficulties: {
    // 🟢 简单模式
    easy: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🔍 帝国星 - 质量保障</div>
            <p>ARIA 带你进入帝国星最关键的一环……</p>
            <div class="chat-bubble robot">
              🤖 ARIA：船长，你有没有遇到过这种情况——<br>
              让 AI 帮你写代码，写出来一堆 bug？<br>
              或者让 AI 做计划，漏掉了重要步骤？
            </div>
            <div class="chat-bubble">
              👦 你：太常见了！AI 经常自信满满地给出错误答案……
            </div>
            <div class="chat-bubble robot">
              🤖 ARIA：三省六部有一个解决方案：<br>
              <strong style="color:var(--cyan)">门下省</strong>——专门负责"挑毛病"的 Agent！<br><br>
              它不负责做任何实际工作，只负责一件事：<br>
              <strong>检查中书省的方案有没有问题。有问题就打回去重做！</strong>
            </div>
          `
        },
        {
          type: 'concept',
          title: '📝 作业检查员',
          html: `
            <p>用小明的故事来理解：</p>
            <div style="margin:14px 0;padding:14px;background:rgba(0,229,255,.06);border-radius:12px;line-height:1.9">
              老师让同学们写一篇关于运动会的计划书。<br>
              但不是写完就直接交给执行员——<br>
              中间还有一个<strong>课代表（门下省）</strong>来检查：<br><br>

              ✅ 计划写清楚了吗？<br>
              ✅ 有没有遗漏重要的步骤？<br>
              ✅ 有没有明显不合理的地方？<br><br>

              <strong>如果检查不通过：</strong><br>
              课代表会告诉计划委员哪里有问题，让他修改。<br>
              最多检查 3 次。3 次都不通过，就告诉老师。<br><br>

              <strong>如果检查通过：</strong><br>
              打上"✅ 准奏"的印章，交给执行员开始执行！
            </div>
          `
        },
        {
          type: 'concept',
          title: '🎯 为什么需要门下省？',
          html: `
            <p><strong>没有检查员的后果：</strong></p>
            <div style="margin:14px 0;padding:14px;background:rgba(239,68,68,.05);border-left:3px solid var(--red);border-radius:8px;line-height:1.8">
              计划委员写了计划 → 执行员直接开始执行<br>
              执行到一半发现：哎，计划漏了安全措施！<br>
              已经执行了一半，改起来很麻烦……<br><br>
              <strong>就像工程师写完代码直接上线，结果有 bug。</strong>
            </div>
            <p style="margin-top:16px"><strong>有检查员的好处：</strong></p>
            <div style="margin:14px 0;padding:14px;background:rgba(0,229,255,.05);border-left:3px solid var(--cyan);border-radius:8px;line-height:1.8">
              问题在计划阶段就被发现，修改成本最低！<br>
              执行员拿到的方案已经经过质量检查，放心执行。<br><br>
              <strong>就像有 Code Review 和 QA 的开发团队。</strong>
            </div>
            <div style="margin-top:16px;padding:12px;background:rgba(251,191,36,.1);border-left:3px solid var(--yellow);border-radius:8px">
              💡 发现问题越早，修复成本越低。<br>
              门下省把问题拦在"计划阶段"，代价最小！
            </div>
          `
        },
        {
          type: 'quiz',
          q: '门下省审核失败（封驳）后，任务会流转到哪里？',
          opts: [
            '直接取消任务',
            '返回给中书省重新制定方案',
            '交给尚书省去修改',
            '告诉用户失败了'
          ],
          ans: 1,
          feedback_ok: '🎉 正确！封驳就是"退回去重做"。门下省把审核意见告诉中书省，中书省修改方案后重新送审。最多 3 轮，3 轮都过不了才上报给人类处理。',
          feedback_err: '封驳不是取消！门下省会把具体的问题和修改建议告诉中书省，让中书省修改后重新提交审核。这是"迭代改进"而不是"直接放弃"。'
        }
      ]
    },

    // 🟡 困难模式
    hard: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🔍 帝国星 - 技术版</div>
            <div class="chat-bubble robot">
              🤖 ARIA：门下省是三省六部最有技术含量的部分。<br>
              一个好的审核机制需要：明确的审核标准、
              可操作的修改建议、有限的重试次数。<br>
              让我们看看怎么实现。
            </div>
          `
        },
        {
          type: 'code',
          title: '💻 门下省审核实现',
          code: `from dataclasses import dataclass
from typing import Optional, List

@dataclass
class ReviewResult:
    approved:    bool
    feedback:    str
    suggestions: List[str] = None  # 具体修改建议

class MenxiaAgent:
    MAX_ROUNDS = 3

    REVIEW_PROMPT = """
你是门下省审议官，负责审查中书省提交的方案。

方案内容：
{plan}

请从三个维度审查：
1. 可行性：方案能否被实际执行？步骤是否清晰？
2. 完整性：是否遗漏了关键步骤或风险点？
3. 安全性：是否存在潜在风险（数据丢失/安全漏洞等）？

如果合格，回复"准奏"并说明通过理由。
如果不合格，回复"封驳"并给出：
- 具体问题（列表）
- 修改建议（可操作的）
"""

    async def review(self, plan: str) -> ReviewResult:
        response = await self.llm.call(
            self.REVIEW_PROMPT.format(plan=plan)
        )
        approved = "准奏" in response
        return ReviewResult(
            approved=approved,
            feedback=response,
            suggestions=self._extract_suggestions(response)
        )

    async def review_with_retry(self, task, plan: str) -> str:
        for round_num in range(1, self.MAX_ROUNDS + 1):
            result = await self.review(plan)

            if result.approved:
                await self._log(task, round_num, "准奏")
                return plan

            # 封驳：把反馈交给中书省修改
            await self._log(task, round_num, f"封驳：{result.feedback}")
            plan = await self.zhongshu.revise(plan, result.suggestions)

        # 超过最大轮次，人工介入
        raise ReviewFailedException(
            f"经 {self.MAX_ROUNDS} 轮审核仍未通过，需要人工处理"
        )`,
          explanation: `
            <strong>核心设计：</strong><br>
            • 三维审查标准：可行性 / 完整性 / 安全性<br>
            • 结构化反馈：<code>suggestions</code> 是可操作的修改建议，不是模糊评语<br>
            • 有限轮次：<code>MAX_ROUNDS=3</code>，防止中书省和门下省死循环<br>
            • 升级机制：超过上限抛出异常，由上层决定是否人工介入
          `
        },
        {
          type: 'code',
          title: '🔄 中书省收到封驳后修改方案',
          code: `class ZhongshuAgent:

    REVISE_PROMPT = """
你是中书省规划官。你提交的方案被门下省封驳了。

原方案：
{original_plan}

门下省的审核意见：
{feedback}

具体修改建议：
{suggestions}

请根据以上意见修改方案。
注意：
- 直接解决每一条具体问题
- 保留原方案中合理的部分
- 不要引入新的风险
"""

    async def revise(self, plan: str,
                     suggestions: List[str]) -> str:
        prompt = self.REVISE_PROMPT.format(
            original_plan=plan,
            feedback="\n".join(suggestions),
            suggestions="\n".join(
                f"- {s}" for s in suggestions
            )
        )
        revised = await self.llm.call(prompt)

        # 记录修改历史（用于审计）
        self.revision_history.append({
            "version":   len(self.revision_history) + 1,
            "original":  plan,
            "revised":   revised,
            "triggered_by": "menxia_rejection"
        })
        return revised`,
          explanation: `
            <strong>有效修改的关键：</strong><br>
            • Prompt 明确告知"哪里有问题"和"怎么修改"<br>
            • 提示保留合理部分，避免全部推倒重来（浪费 token）<br>
            • 修改历史记录：可追溯每一版方案的演变过程<br>
            • 版本号（version）：便于后续分析"平均需要几轮才能通过"
          `
        },
        {
          type: 'pitfalls',
          title: '⚠️ 常见设计错误',
          items: [
            '审核标准太模糊 → 用结构化 Prompt 明确三个维度，避免 LLM 随意判断',
            '只说"不合格"不说原因 → 必须给出可操作的修改建议，否则中书省不知道怎么改',
            '无限重试 → 必须设置 MAX_ROUNDS，否则中书省和门下省可能永远达不成一致',
            '门下省和中书省用同一个 LLM 实例 → 容易互相"讨好"，失去独立审核的价值',
            '审核通过率 100% → 说明门下省标准太低，审核形同虚设'
          ]
        },
        {
          type: 'quiz',
          q: '为什么门下省和中书省最好使用不同的 LLM 配置（如不同 temperature）？',
          opts: [
            '节省 API 费用',
            '门下省需要更严格保守（低 temperature），中书省需要更有创造力（高 temperature）',
            '避免两个 Agent 使用相同的 token',
            '提高响应速度'
          ],
          ans: 1,
          feedback_ok: '⭐ 正确！中书省制定方案需要创造力（temperature 稍高），而门下省审核需要严格、保守、挑剔（temperature 低）。如果两者配置相同，门下省可能和中书省"想法一样"，失去独立审核的价值。',
          feedback_err: '想想各自的职责：中书省"制定方案"需要创造力，门下省"挑毛病"需要严谨保守。不同的工作性质需要不同的 LLM 参数配置，这样审核才有意义。'
        }
      ]
    },

    // 🔴 地狱模式
    hell: {
      sections: [
        {
          type: 'dialogue',
          title: '🔍 门下省通过了 95% 的方案，但其中 40% 被用户投诉',
          scenario: `<strong>故障场景</strong>：你的三省六部系统运行了一个月。门下省的审核数据看起来很健康：<br>
• 一次通过率：60%<br>
• 平均审核轮次：1.3 轮<br>
• 人工介入率：3%<br><br>
但用户满意度调查揭示了真相：<br>
<strong>40% 的"准奏"方案被用户评为"不满意"</strong>。<br><br>
你抽样看了 10 个"准奏但用户不满意"的方案，发现问题：<br>
• 5 个方案"看起来完整但实际有逻辑漏洞"——门下省只检查了格式，没检查逻辑<br>
• 3 个方案"技术上可行但不符合用户实际需求"——门下省不知道用户要什么<br>
• 2 个方案"安全性评估通过，但性能预算超标 10 倍"——门下省没考虑资源约束`,
          steps: [
            {
              question: '门下省通过了 95% 的方案，但 40% 被用户投诉。审核通过率高不等于质量好——这是 Goodhart 定律。怎么让审核真正有效？',
              opts: [
                '把通过标准从 75 分提高到 90 分',
                '量化多维度审核——不只看"综合分"，每个维度（可行性/完整性/安全性/清晰度）都有独立分数和最低阈值，任一维度不达标就不通过',
                '增加更多审核 Agent',
                '让用户自己审核'
              ],
              correct: 1,
              aria_correct: '✅ 对！综合分是"平均值陷阱"——一个方案可行性 100 分但安全性 0 分，综合可能还是 75 分通过。多维度 + 独立阈值确保每个方面都达标，不被其他维度的高分掩盖。',
              aria_wrong: '❌ 提高综合分阈值没用——一个方案某维度 0 分但其他维度满分，综合分还是很高。问题不是"标准太低"，而是"标准太粗"。'
            },
            {
              question: '你发现"技术上可行但不符合用户需求"占投诉的 30%。门下省在审核时不知道用户的实际场景。怎么解决？',
              opts: [
                '让门下省自己问用户',
                '在审核 prompt 中注入用户原始需求和上下文——门下省审核时必须对照"用户到底要什么"，而不只是看方案本身是否"合理"',
                '删掉门下省，让用户直接审核',
                '让中书省更好地理解用户需求'
              ],
              correct: 1,
              aria_correct: '✅ 正确！审核不能只看方案本身，必须对照原始需求。这就是为什么 EDICT 的门下省审核 prompt 包含"用户原始任务描述"——它在问"这个方案是否解决了用户的问题"，而不只是"这个方案是否合理"。',
              aria_wrong: '❌ 门下省问用户是好的，但每次审核都问用户太慢。想想：审核时能否直接把"用户的需求"作为上下文注入，让门下省对照着审？'
            },
            {
              question: '即使有了多维度审核 + 需求对照，有些方案还是会被误通过。你发现"人工介入率 3%"中，90% 的人工操作是"强制通过"——说明门下省太严格了。怎么校准审核标准？',
              opts: [
                '放宽所有标准',
                '追踪每个维度的"误拒率"和"误通过率"，用数据驱动校准——如果安全性维度从未出问题但经常误拒，就降低它的权重或阈值',
                '删掉门下省',
                '让门下省自己调参'
              ],
              correct: 1,
              aria_correct: '✅ 完全正确！审核标准不是拍脑袋定的，需要用数据校准。追踪"哪些维度经常误拒"和"哪些维度经常误通过"，针对性调整权重和阈值。这就是指标驱动的持续优化。',
              aria_wrong: '❌ "放宽所有标准"是另一个极端。问题不是"整体太严"，而是"某些维度太严、某些太松"。你需要数据来告诉你"具体哪里需要调整"。',
              reveal_on_correct: `<strong>质量保障的四层设计</strong>：<br>1. <strong>多维度量化</strong>：每个维度独立评分 + 独立阈值<br>2. <strong>需求对照</strong>：审核时必须对照用户原始需求<br>3. <strong>指标追踪</strong>：一次通过率、人工介入率、用户满意度<br>4. <strong>数据校准</strong>：根据误拒/误通过率持续优化审核标准`
            }
          ],
          completion_html: `<div style="color:var(--green);font-weight:700;padding:12px">✅ 你设计出了真正有效的质量保障体系！</div>
<div style="color:var(--muted);font-size:.9rem;margin-top:8px">多维度量化 + 需求对照 + 指标追踪 + 数据校准。<br>审核不是"设个标准就完了"，而是需要持续优化的系统。</div>`
        },
        {
          type: 'concept',
          title: '📄 你刚才设计的，就是 EDICT 门下省的量化审核体系',
          html: `
            <div style="margin:14px 0;padding:16px;background:rgba(251,191,36,.1);border-left:3px solid var(--yellow);border-radius:12px;line-height:1.9">
              <strong style="font-size:1.05rem">EDICT 门下省：量化审核 + 人工介入协议</strong><br>
              <span style="color:var(--muted);font-size:.9rem">多维度评分（可行性 0.35 / 完整性 0.30 / 安全性 0.25 / 清晰度 0.10）+ 安全性一票否决 + 3 轮升级人类</span><br><br>
              <span style="color:var(--cyan)">你刚才推导出的多维度 + 需求对照 + 指标校准，正是 EDICT 门下省从"粗放审核"进化到"精细审核"的路径！</span>
            </div>

            <div style="margin:20px 0;padding:16px;background:rgba(0,229,255,.06);border-radius:12px;line-height:1.9">
              <strong style="color:var(--cyan)">关键审核指标</strong><br><br>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px">
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>一次通过率</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">目标：> 60%<br>过低 = 中书省质量差<br>过高 = 门下省标准太松</span>
                </div>
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>人工介入率</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">目标：< 5%<br>过高 = 审核标准不合理<br>结合"强制通过占比"校准</span>
                </div>
              </div>
            </div>
          `
        },
        {
          type: 'quiz',
          q: '如果"人工介入率"持续在 20% 以上，最可能的根本原因是什么？',
          opts: [
            '服务器性能不够',
            '中书省制定方案的能力不足，或门下省审核标准设置不合理——需要用数据定位具体是哪个维度的问题',
            '任务太复杂',
            '门下省的 LLM 版本太旧'
          ],
          ans: 1,
          feedback_ok: '🔥 正确！20% 的人工介入率远超 5% 的目标，说明系统性问题。通过分析各维度的误拒率和误通过率，可以定位是中书省产出质量差还是门下省标准不合理，然后针对性优化。',
          feedback_err: '人工介入率是系统性指标。20% 的高介入率说明中书省和门下省之间存在系统性问题，需要分析具体哪个维度经常不通过，针对性优化。'
        }
      ]
    }
  }
});
