// 关卡 10：预训练星

PLANETS.push({
  id: 'p10',
  icon: '🏋️',
  num: '星球 10',
  name: '预训练星',
  desc: '了解 AI 是怎么从零开始"上学"的！',

  difficulties: {
    // 🟢 简单模式
    easy: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🚀 进入训练场星球</div>
            <p>这颗星球上有一个巨大的图书馆，里面装着整个互联网的内容！ARIA 感慨道：</p>
            <div class="chat-bubble robot">
              🤖 ARIA：船长，你知道 Claude、GPT 这些 AI 是怎么变聪明的吗？
              它们要经历好几个阶段的训练——第一步叫做 <strong>预训练（Pre-training）</strong>！
            </div>
            <div class="chat-bubble">
              👦 你：预训练？就像我上学之前先上幼儿园？
            </div>
            <div class="chat-bubble robot">
              🤖 ARIA：超棒的比喻！预训练就是让 AI 读海量文字，
              学习语言的基础规律——就像小婴儿慢慢学会说话！
            </div>
          `
        },
        {
          type: 'concept',
          title: '🏋️ 预训练（Pre-training）是什么？',
          html: `
            <p>预训练的目标很简单：<strong style="color:var(--purple)">给我前面的词，预测下一个词！</strong></p>
            <div style="margin:14px 0;padding:16px;background:#060d18;border-radius:12px;font-family:monospace;font-size:.9rem;line-height:2">
              <div>输入：「今天天气真的很」</div>
              <div style="color:var(--purple)">预测：「好」✅  or  「差」✅  or  「飞机」❌</div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:14px">
              <div style="background:rgba(168,85,247,.08);border:1px solid rgba(168,85,247,.2);border-radius:12px;padding:14px">
                <strong style="color:var(--purple)">📚 训练数据</strong>
                <ul style="margin-top:8px;font-size:.82rem;color:var(--muted);line-height:2;list-style:none">
                  <li>🌐 整个互联网的网页</li>
                  <li>📖 数十亿本书</li>
                  <li>💻 GitHub 所有代码</li>
                  <li>📰 新闻、论文……</li>
                </ul>
              </div>
              <div style="background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:12px;padding:14px">
                <strong style="color:#fca5a5">💸 训练成本</strong>
                <ul style="margin-top:8px;font-size:.82rem;color:var(--muted);line-height:2;list-style:none">
                  <li>🖥️ 数千张 GPU</li>
                  <li>⏱️ 几个月时间</li>
                  <li>💰 数千万到数亿美元</li>
                  <li>⚡ 耗电量惊人</li>
                </ul>
              </div>
            </div>
          `
        },
        {
          type: 'quiz',
          q: '预训练阶段，AI 的主要学习任务是什么？',
          opts: [
            '学会画画和音乐创作',
            '根据前面的文字，预测下一个词，不断降低预测错误率',
            '学会和人类礼貌对话',
            '记住所有人的名字和生日'
          ],
          ans: 1,
          feedback_ok: '🎯 完全正确！就是这么简单的任务——预测下一个词——重复万亿次，AI 就学会了理解语言！',
          feedback_err: '预训练只做一件事：给你前面的词，猜下一个词！简单但威力巨大！'
        }
      ]
    },

    // 🟡 困难模式
    hard: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🚀 预训练星（技术版）</div>
            <div class="chat-bubble robot">
              🤖 ARIA：船长！让我给你讲讲预训练的技术细节。
              这是 AI 训练中最昂贵、最关键的阶段！
            </div>
          `
        },
        {
          type: 'concept',
          title: '🏋️ 预训练的核心要素',
          html: `
            <p>预训练的关键技术：</p>
            <ul style="margin:10px 0 0 16px;line-height:2">
              <li><strong>训练数据</strong>：数万亿 tokens 的文本数据</li>
              <li><strong>Loss 函数</strong>：交叉熵损失，衡量预测准确度</li>
              <li><strong>优化器</strong>：Adam 优化器，调整模型参数</li>
              <li><strong>学习率调度</strong>：动态调整学习速度</li>
            </ul>
          `
        },
        {
          type: 'code',
          title: '📟 预训练核心循环（伪代码）',
          code: `for epoch in range(num_epochs):
    for batch in dataloader:
        # 前向传播
        logits = model(batch.input_ids)

        # 计算 Loss（交叉熵）
        loss = cross_entropy(logits, batch.labels)

        # 反向传播
        loss.backward()

        # 更新参数
        optimizer.step()
        optimizer.zero_grad()`,
          explanation: `
            <strong>关键点：</strong><br>
            • Loss 越低，预测越准确<br>
            • 反向传播调整模型参数<br>
            • 这个循环重复数万亿次<br>
            • GPT-4 约有 1.8 万亿参数
          `
        },
        {
          type: 'pitfalls',
          title: '⚠️ 预训练的挑战',
          items: [
            '数据质量问题 → 垃圾数据会导致模型学到错误知识',
            '训练不稳定 → 需要梯度裁剪、学习率调度等技巧',
            '成本极高 → 普通公司无法承担从头预训练',
            '数据偏见 → 训练数据的偏见会被模型学习'
          ]
        },
        {
          type: 'quiz',
          q: '为什么预训练成本这么高？',
          opts: [
            '因为需要很多工程师',
            '需要数千张 GPU、几个月时间、处理数万亿 tokens',
            '因为数据很贵',
            '因为算法很复杂'
          ],
          ans: 1,
          feedback_ok: '✅ 正确！预训练需要海量计算资源和时间，这就是为什么只有大公司能做！',
          feedback_err: '预训练的成本主要来自计算资源（GPU）和时间！'
        }
      ]
    }
  }
});
