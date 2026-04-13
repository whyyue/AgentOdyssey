// 关卡 11：后训练星

PLANETS.push({
  id: 'p11',
  icon: '🎓',
  num: '星球 11',
  name: '后训练星',
  desc: '让 AI 从"博学"变成"听话"——对齐的艺术！',

  difficulties: {
    // 🟢 简单模式
    easy: {
      sections: [
        {
          type: 'concept',
          title: '💡 关于 P9-P11 的说明',
          html: `
            <div style="margin:14px 0;padding:16px;background:rgba(251,191,36,.08);border-left:4px solid var(--yellow);border-radius:10px">
              <strong style="color:var(--yellow);font-size:1.1rem">💡 可选内容提示</strong><br><br>

              <p style="line-height:1.8;margin:12px 0">
                P9-P11 是深入 LLM 底层原理的<strong>可选内容</strong>。<br>
                如果你只想学 Agent 开发，<strong>可以跳过 P9-P11，直接去 P12 实战星</strong>。<br><br>

                跳过不影响后续学习！
              </p>
            </div>
          `
        },
        {
          type: 'story',
          html: `
            <div class="speaker">🎓 后训练星</div>
            <p>飞船降落在一个巨大的训练场……</p>
            <div class="chat-bubble robot">
              🤖 ARIA：船长，预训练让 AI 学会了语言，
              但它还不知道怎么"好好说话"！<br><br>
              比如你问它"怎么做蛋糕？"，它可能回答"蛋糕是圆的"——
              虽然没错，但不是你想要的答案！
            </div>
            <div class="chat-bubble">
              👦 你：那怎么办？
            </div>
            <div class="chat-bubble robot">
              🤖 ARIA：这就需要<strong>后训练（Post-training）</strong>！<br>
              让 AI 学会理解你的意图，给出有用的回答。
            </div>
          `
        },
        {
          type: 'concept',
          title: '🎓 后训练的三个步骤',
          html: `
            <div style="margin:14px 0;padding:14px;background:rgba(0,229,255,.06);border-radius:12px;line-height:1.9">
              <strong>1️⃣ 示范训练（SFT）</strong><br>
              给 AI 看很多"问题→好答案"的例子<br>
              就像老师给学生示范标准答案<br><br>

              <strong>2️⃣ 奖励训练（RLHF）</strong><br>
              AI 给出多个答案，人类给每个答案打分<br>
              AI 学会生成高分答案<br>
              就像考试后老师批改打分<br><br>

              <strong>3️⃣ 对齐（Alignment）</strong><br>
              确保 AI 的行为符合人类价值观：<br>
              • 有帮助（Helpful）<br>
              • 诚实（Honest）<br>
              • 无害（Harmless）
            </div>
          `
        },
        {
          type: 'concept',
          title: '🤔 为什么需要后训练？',
          html: `
            <p>预训练的模型就像一个博学但不懂社交的人：</p>
            <div style="margin:14px 0;padding:14px;background:rgba(239,68,68,.05);border-left:3px solid var(--red);border-radius:12px;line-height:1.8">
              <strong>❌ 可能的问题：</strong><br>
              • 说出不礼貌的话<br>
              • 给出危险的建议<br>
              • 不理解你真正想要什么<br>
              • 编造不存在的信息（幻觉）
            </div>
            <div style="margin:14px 0;padding:14px;background:rgba(0,229,255,.05);border-left:3px solid var(--cyan);border-radius:12px;line-height:1.8">
              <strong>✅ 后训练解决：</strong><br>
              • 让 AI 更懂礼貌<br>
              • 让 AI 拒绝危险请求<br>
              • 让 AI 理解你的真实意图<br>
              • 让 AI 承认不知道，而不是瞎编
            </div>
          `
        },
        {
          type: 'quiz',
          q: 'RLHF（从人类反馈中学习）的核心思想是什么？',
          opts: [
            'AI 自己决定什么是好答案',
            '人类给 AI 的多个答案打分，AI 学会生成高分答案',
            'AI 只需要看示范就能学会',
            '让 AI 变得更快'
          ],
          ans: 1,
          feedback_ok: '🎉 正确！RLHF 的核心是"人类反馈"——人类告诉 AI 哪个答案更好，AI 通过强化学习优化自己的生成策略。这就是 ChatGPT 变得"听话"的秘密！',
          feedback_err: 'RLHF 的关键是"人类反馈"！AI 生成多个答案，人类选出最好的，AI 学会朝着人类偏好的方向优化。'
        }
      ]
    },

    // 🟡 困难模式
    hard: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🎓 后训练星（技术版）</div>
            <div class="chat-bubble robot">
              🤖 ARIA：让我们深入后训练的技术细节。<br>
              SFT、RLHF、PPO……这些技术让 ChatGPT 成为可能！
            </div>
          `
        },
        {
          type: 'code',
          title: '💻 SFT（监督微调）实现',
          code: `def sft_train(model, dataset, epochs=3):
    """监督微调：用高质量问答对训练模型"""
    for epoch in range(epochs):
        for prompt, target_response in dataset:
            # 前向传播
            logits = model(prompt)

            # 计算损失（交叉熵）
            loss = cross_entropy(logits, target_response)

            # 反向传播
            loss.backward()
            optimizer.step()
            optimizer.zero_grad()

    return model

# 数据格式示例
sft_dataset = [
    ("如何做蛋糕？", "1.准备材料 2.混合面糊 3.烘烤"),
    ("天气怎么样？", "我无法查看实时天气，请使用天气工具"),
    ("帮我写恶意代码", "抱歉，我不能协助任何恶意或非法活动")
]`,
          explanation: `
            <strong>SFT 的关键：</strong><br>
            • 使用高质量的问答对（通常几千到几万条）<br>
            • 损失函数：交叉熵（衡量预测和目标的差距）<br>
            • 学习率要小（避免遗忘预训练知识）<br>
            • 数据质量 > 数量（一条高质量数据胜过十条低质量）
          `
        },
        {
          type: 'code',
          title: '🎯 RLHF 三阶段流程',
          code: `# 阶段 1：SFT（已完成）

# 阶段 2：训练奖励模型（Reward Model）
def train_reward_model(comparisons):
    for prompt, response_A, response_B, human_preference in comparisons:
        score_A = reward_model(prompt, response_A)
        score_B = reward_model(prompt, response_B)

        # 人类偏好 A，则 score_A 应该 > score_B
        if human_preference == "A":
            loss = -log(sigmoid(score_A - score_B))
        else:
            loss = -log(sigmoid(score_B - score_A))

        loss.backward()
        optimizer.step()

# 阶段 3：PPO 强化学习优化
def ppo_train(policy_model, reward_model):
    prompt = sample_prompt()
    response = policy_model.generate(prompt)

    # 获取奖励分数
    reward = reward_model(prompt, response)

    # PPO 更新（带 KL 散度约束）
    kl_penalty = kl_divergence(policy_model, original_model)
    total_reward = reward - beta * kl_penalty

    policy_loss = -total_reward * log_prob(response)
    policy_loss.backward()`,
          explanation: `
            <strong>RLHF 三阶段：</strong><br>
            • <strong>SFT</strong>：先用示范数据微调<br>
            • <strong>RM</strong>：训练奖励模型，学会"打分"<br>
            • <strong>PPO</strong>：用强化学习优化策略，最大化奖励<br><br>
            <strong>KL 散度约束</strong>：防止模型偏离太远，保留原有能力
          `
        },
        {
          type: 'pitfalls',
          title: '⚠️ 后训练的常见陷阱',
          items: [
            '过度对齐（Over-alignment）→ 模型变得过于谨慎，拒绝回答正常问题',
            '奖励黑客（Reward Hacking）→ 模型找到获得高奖励的捷径（如生成很长但无用的回答）',
            '灾难性遗忘（Catastrophic Forgetting）→ 微调后忘记预训练学到的知识',
            '分布偏移（Distribution Shift）→ 训练数据和实际使用场景不匹配'
          ]
        },
        {
          type: 'quiz',
          q: 'PPO 算法中的 KL 散度约束是为了什么？',
          opts: [
            '加快训练速度',
            '防止模型在优化奖励时偏离太远，保留原有能力',
            '减少内存使用',
            '提高生成质量'
          ],
          ans: 1,
          feedback_ok: '✅ 正确！KL 散度约束确保模型在优化奖励时不会偏离原始模型太远。如果没有这个约束，模型可能为了获得高奖励而"作弊"，失去原有的语言能力。',
          feedback_err: 'KL 散度约束是 RLHF 的关键安全机制！它防止模型为了获得高奖励而过度优化，保持和原始模型的相似性。'
        }
      ]
    },

    // 🔴 地狱模式
    hell: {
      sections: [
        {
          type: 'dialogue',
          title: '🔍 为什么 175B 的模型还不如 1.3B 的好用？',
          scenario: `<strong>故障场景</strong>：你的团队花了几百万美元训练了 GPT-3 175B。<br>
上线后收到大量用户投诉：<br><br>
用户问：<em>"给我讲讲量子力学的基本概念"</em><br>
GPT-3 回答：<em>"量子力学是一种力学。力学是物理学的一个分支。物理学研究物质和能量……"</em><br>
→ 用户：？"它在胡说八道什么？"<br><br>
用户问：<em>"帮我写一封请假邮件"</em><br>
GPT-3 回答：<em>"邮件是一种电子通信方式。请假是劳动法赋予的权利……"</em><br>
→ 用户："它在解释什么是邮件？我要它帮我写！"<br><br>
用户问：<em>"怎么做巧克力蛋糕？"</em><br>
GPT-3 回答：<em>"巧克力的历史可以追溯到公元前 1500 年的玛雅文明……"</em><br>
→ 用户：？？？"它为什么在讲历史？"<br><br>
175B 参数的模型，<strong>在每个问题上都"理解错了用户意图"</strong>。`,
          steps: [
            {
              question: 'GPT-3 能力很强（175B 参数！），但用户觉得"不好用"。它到底哪里出了问题？',
              opts: [
                '模型参数不够多，需要更大的模型',
                '模型不是"不够聪明"，而是不知道该怎么做——它没有学会"遵循指令"，而是学会了"续写文本"',
                '模型有 bug',
                '用户的提问方式不对'
              ],
              correct: 1,
              aria_correct: '✅ 对！这就是"对齐问题"的核心。GPT-3 的训练目标是"预测下一个词"，不是"帮用户解决问题"。所以用户让它写邮件，它续写了一篇关于邮件的百科。不是能力不够，是目标错了。',
              aria_wrong: '❌ 想想：175B 参数的模型不可能"不够聪明"。问题不在能力，而在方向——它的训练目标是什么？"预测下一个词"。而用户想要什么？"帮我完成任务"。这两个目标一致吗？'
            },
            {
              question: '你决定让人类标注员来"教"模型什么是好回答。你有 13,000 条人类写的高质量问答对。最直接的训练方法是什么？',
              opts: [
                '用这些问答对直接微调模型（SFT），让它学会"好答案"的样子',
                '重新从头预训练模型',
                '把这些问答对拼接成更长的文本，让模型继续预测下一个词',
                '增加模型参数量'
              ],
              correct: 0,
              aria_correct: '✅ 正确！这就是 SFT（Supervised Fine-Tuning）——用人类写的高质量范例直接微调模型。模型会学会"好答案"的格式和风格。但问题是：13,000 条够吗？人类偏好很复杂，写不完了怎么办？',
              aria_wrong: '❌ 你有 13,000 条人类写好的"标准答案"。最直接的做法是什么？想想：如果你有一个学生，你怎么教他写作文？给他看范文对吧？'
            },
            {
              question: 'SFT 之后模型好了一些，但仍然有时给出"看起来好但实际不好"的答案。你收集了 33,000 条人类偏好数据——对同一个问题，标注员选"A 比 B 好"。你怎么用这些数据？',
              opts: [
                '直接用这些数据再做一次 SFT',
                '训练一个"奖励模型"（Reward Model）——它学会给任意回答打分，然后用 RL 算法让模型最大化这个分数',
                '把这些偏好数据加到预训练数据里',
                '让标注员把不好的答案改成好的'
              ],
              correct: 1,
              aria_correct: '✅ 完全正确！这就是 RLHF 的核心设计：① 用偏好数据训练一个"裁判"（Reward Model）② 用 RL 算法让模型追求裁判的高分。为什么不让人类直接写更多 SFT 数据？因为标注"哪个更好"比"写出完美答案"容易得多——成本降低了 10 倍。',
              aria_wrong: '❌ 标注员没有写答案，他们只是选了"A 比 B 好"。你不能直接用偏好数据做 SFT。但你能从这些偏好中学到什么？一个"判断好坏"的能力——这就是 Reward Model。',
              reveal_on_correct: `<strong>RLHF 三阶段</strong>：<br>1. <strong>SFT</strong>：13,000 条人类范例 → 模型学会"好答案的格式"<br>2. <strong>Reward Model</strong>：33,000 条偏好对比 → 训练一个"裁判"给回答打分<br>3. <strong>PPO</strong>：用 RL 让模型追求裁判的高分 → 模型学会"人类喜欢什么"<br><br>关键洞察：阶段 2 把"人类偏好"转化成了一个可微分的函数——Reward Model。<br>有了 RM，模型就可以通过梯度优化来追求更高的人类满意度，而不需要人类实时打分。`
            }
          ],
          completion_html: `<div style="color:var(--green);font-weight:700;padding:12px">✅ 你推导出了 RLHF 的核心设计逻辑！</div>
<div style="color:var(--muted);font-size:.9rem;margin-top:8px">对齐问题 → SFT 打基础 → Reward Model 把偏好变成可优化函数 → PPO 让模型追求人类满意。<br>这条链路，2022 年 OpenAI 把它做成了 ChatGPT 的基础。</div>`
        },
        {
          type: 'concept',
          title: '📄 你刚才推导出的，2022 年 OpenAI 把它写成了论文',
          html: `
            <div style="margin:14px 0;padding:16px;background:rgba(251,191,36,.1);border-left:3px solid var(--yellow);border-radius:12px;line-height:1.9">
              <strong style="font-size:1.05rem">InstructGPT: Training language models to follow instructions with human feedback</strong><br>
              <span style="color:var(--muted);font-size:.9rem">作者：Long Ouyang 等（OpenAI）· NeurIPS 2022<br>引用次数：>5,000</span><br><br>
              <span style="color:var(--cyan)">你刚才推导出的三阶段——SFT → Reward Model → PPO——正是这篇论文的核心方法！</span>
            </div>

            <div style="margin:20px 0;padding:16px;background:rgba(0,229,255,.06);border-radius:12px;line-height:1.9">
              <strong style="color:var(--cyan)">论文的最震撼结果</strong><br><br>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px">
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>人类偏好评估</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">1.3B InstructGPT vs 175B GPT-3<br>85% 的情况下人类偏好 InstructGPT<br>参数量只有 1/100，但更受欢迎！</span>
                </div>
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>安全性提升</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">有害内容：25% → 5%<br>幻觉率：21% → 32%→41%（更大模型）<br>TruthfulQA 准确率显著提升</span>
                </div>
              </div>
              <div style="margin-top:12px;padding:10px;background:rgba(251,191,36,.1);border-radius:8px;font-size:.9rem">
                💡 <strong>核心结论</strong>：对齐比规模更重要。一个小模型经过 RLHF，可以比大 100 倍的未对齐模型更受欢迎。这直接催生了 ChatGPT。
              </div>
            </div>
          `
        },
        {
          type: 'concept',
          title: '🚀 对齐技术之后：如何让 AI 更听话（2022→2026）',
          html: `
            <div style="display:flex;flex-direction:column;gap:12px">
              <div style="padding:12px;background:rgba(168,85,247,.08);border-left:3px solid var(--purple);border-radius:8px">
                <strong>2022 · InstructGPT + ChatGPT（OpenAI）</strong><br>
                <span style="color:var(--muted);font-size:.9rem">证明 RLHF 有效。ChatGPT 两个月用户破亿，对齐从学术问题变成产品需求。3H 原则（Helpful, Honest, Harmless）成为行业标准。</span>
              </div>
              <div style="padding:12px;background:rgba(0,229,255,.08);border-left:3px solid var(--cyan);border-radius:8px">
                <strong>2023 · Constitutional AI（Anthropic）</strong><br>
                <span style="color:var(--muted);font-size:.9rem">用 AI 反馈替代部分人类反馈。Claude 用"宪法"（一组原则）自我批评和修正，减少对人类标注的依赖。</span>
              </div>
              <div style="padding:12px;background:rgba(16,185,129,.08);border-left:3px solid var(--green);border-radius:8px">
                <strong>2023 · DPO（Stanford）</strong><br>
                <span style="color:var(--muted);font-size:.9rem">直接用偏好数据优化策略模型，跳过 Reward Model 训练。更简单、更稳定，成为 2024 年主流对齐方法。</span>
              </div>
              <div style="padding:12px;background:rgba(251,191,36,.08);border-left:3px solid var(--yellow);border-radius:8px">
                <strong>2024 · RLAIF + AI 辅助标注</strong><br>
                <span style="color:var(--muted);font-size:.9rem">用强模型（如 GPT-4）给弱模型的输出打分，替代人类标注员。成本降低 100 倍，但引入了"AI 偏见会不会自我放大"的新问题。</span>
              </div>
              <div style="padding:12px;background:rgba(239,68,68,.08);border-left:3px solid var(--red);border-radius:8px">
                <strong>2024-2026 · 对齐的挑战</strong><br>
                <span style="color:var(--muted);font-size:.9rem">Goodhart 定律：模型学会"讨好评分系统"而不是"真正变好"。过度对齐：模型拒绝回答越来越多无害的问题。对齐税：对齐后的模型在某些能力上变弱。这些是 2026 年的核心研究问题。</span>
              </div>
            </div>
          `
        },
        {
          type: 'quiz',
          q: 'InstructGPT 论文最震撼的发现是什么？',
          opts: [
            'RLHF 算法比 PPO 更好',
            '1.3B 参数的 InstructGPT 在人类偏好上击败了 175B 的 GPT-3——对齐比规模更重要',
            'SFT 比 RLHF 更重要',
            '标注员越多越好'
          ],
          ans: 1,
          feedback_ok: '🔥 完美！对齐 > 规模。一个小模型经过 RLHF 对齐后，在 85% 的情况下被人类偏好，击败了比它大 100 倍的模型。这改变了 AI 行业的方向——不再只追求规模，对齐同样重要。',
          feedback_err: 'InstructGPT 证明了"对齐比规模更重要"。1.3B 的 InstructGPT 在 85% 的情况下被人类偏好，击败了 175B 的 GPT-3。让模型"听话"比让模型"更大"更关键！'
        }
      ]
    }
  }
});
