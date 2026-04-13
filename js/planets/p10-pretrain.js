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
    },

    // 🔴 地狱模式
    hell: {
      sections: [
        {
          type: 'dialogue',
          title: '🔍 模型做大了就有新能力，还是只是更准一点？',
          scenario: `<strong>实验场景</strong>：你在做一个翻译实验。你有两个模型——<br>
• <strong>小模型</strong>（1.3B 参数）：在大量文本上预训练过<br>
• <strong>大模型</strong>（175B 参数）：同样架构，只是更大<br><br>
你给两个模型同一个 prompt：<br>
<code style="background:rgba(0,0,0,.3);padding:4px 8px;border-radius:4px;display:inline-block;margin:8px 0">
sea otter → loutre de mer<br>
peppermint → menthe poivrée<br>
plush giraffe → girafe en peluche<br>
cheese → ???</code><br><br>
<strong>大模型</strong>输出：<code>fromage</code> ✅ 正确！<br>
<strong>小模型</strong>输出：<code>cheese</code> ❌ 它只是复制了输入。<br><br>
两个模型架构相同，训练数据相同，只是大小不同。小模型"看不懂"你在让它做什么。`,
          steps: [
            {
              question: '小模型（1.3B）和大模型（175B）架构完全相同，训练数据也相同，只是参数量不同。为什么大模型能"看懂" prompt 里的翻译任务，小模型看不懂？',
              opts: [
                '大模型训练了更多数据',
                '大模型的参数足够多，能记住更多的模式——包括"给几个例子就理解任务"这个模式本身',
                '大模型用了更好的 Transformer 架构',
                '小模型有 bug'
              ],
              correct: 1,
              aria_correct: '✅ 对！这就是"涌现"（Emergence）的核心：不是你设计了 Few-Shot Learning，而是模型大到一定程度后，自发"学会了从例子中理解任务"。小模型的参数容量不够，无法形成这种能力。',
              aria_wrong: '❌ 两个模型架构完全相同、训练数据也相同。唯一的区别是参数量。想想：参数多了意味着能存储更复杂的模式——那"看几个例子就理解任务"是不是也是一种复杂模式？'
            },
            {
              question: '你测试了不同大小模型做 Few-Shot 翻译的准确率：125M=5%, 350M=8%, 760M=12%, 1.3B=15%, 2.7B=22%, 6.7B=35%, 13B=48%, 175B=75%。这个曲线是什么形状？',
              opts: [
                '线性增长——每大一倍，准确率固定增加一些',
                '平缓增长，到 175B 突然暴涨',
                '幂律增长——对数尺度下近似线性，规模每扩大 10 倍，性能稳定提升一个台阶',
                '随机波动，和规模没关系'
              ],
              correct: 2,
              aria_correct: '✅ 正确！这就是 Scaling Laws（规模定律）：性能 ≈ 参数量^α。在对数坐标下几乎是直线。这意味着——你可以预测多大的模型会达到什么性能！',
              aria_wrong: '❌ 仔细看数据：5%→8%→12%→15%→22%→35%→48%→75%。不是暴涨，而是持续加速。如果你把参数量取对数再画图，会发现什么？'
            },
            {
              question: 'Scaling Laws 告诉我们性能随规模稳定提升。但你发现一个有趣的现象：算术能力在 6.7B 之前几乎为零，之后突然出现。这和 Scaling Laws 矛盾吗？',
              opts: [
                '矛盾，说明 Scaling Laws 是错的',
                '不矛盾——Scaling Laws 描述的是"平均性能"，而涌现能力是"某些特定能力在阈值后突然出现"。两者观察的维度不同',
                '不矛盾，因为算术不算性能',
                '矛盾，说明大模型不应该被使用'
              ],
              correct: 1,
              aria_correct: '✅ 完全正确！Scaling Laws 和涌现能力是互补的观察：前者说"整体趋势可预测"，后者说"某些能力有阈值效应"。合在一起就是——模型越大越强（可预测），而且会突然解锁新技能（涌现）。',
              aria_wrong: '❌ Scaling Laws 描述的是模型在多个任务上的"平均趋势"。涌现能力指的是"某个具体能力"的突变。一个是宏观趋势，一个是微观突变——它们矛盾吗？',
              reveal_on_correct: `<strong>GPT-3 的两个核心发现</strong>：<br>1. <strong>Scaling Laws</strong>：性能 ≈ 参数量^α，可以预测更大模型的表现<br>2. <strong>In-Context Learning</strong>：大模型能从 prompt 中的例子学习新任务，无需梯度更新<br><br>这两个发现合在一起意味着：<br>① 模型越大，已有能力越强（Scaling Laws）<br>② 模型越大，可能解锁全新的能力（涌现）<br>③ 每个新能力解锁后，继续增大规模会让它更强<br><br>这就是为什么整个行业都在往更大模型冲。`
            }
          ],
          completion_html: `<div style="color:var(--green);font-weight:700;padding:12px">✅ 你推导出了预训练范式的核心逻辑！</div>
<div style="color:var(--muted);font-size:.9rem;margin-top:8px">Scaling Laws（可预测）+ In-Context Learning（涌现）= 预训练范式的理论基础。<br>这不是设计出来的，是 OpenAI 在 2020 年发现的。</div>`
        },
        {
          type: 'concept',
          title: '📄 你刚才推导出的，2020 年 OpenAI 把它写成了论文',
          html: `
            <div style="margin:14px 0;padding:16px;background:rgba(251,191,36,.1);border-left:3px solid var(--yellow);border-radius:12px;line-height:1.9">
              <strong style="font-size:1.05rem">Language Models are Few-Shot Learners</strong><br>
              <span style="color:var(--muted);font-size:.9rem">作者：Tom Brown 等 31 人（OpenAI）· NeurIPS 2020<br>引用次数：>20,000</span><br><br>
              <span style="color:var(--cyan)">你刚才推导出的两个直觉——"涌现能力"和"规模的可预测性"——正是这篇论文的核心发现！</span>
            </div>

            <div style="margin:20px 0;padding:16px;background:rgba(0,229,255,.06);border-radius:12px;line-height:1.9">
              <strong style="color:var(--cyan)">论文的关键数据</strong><br><br>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px">
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>模型规模</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">8 个版本：125M → 175B<br>175B：96 层、12,288 维度、96 头<br>训练数据：300B tokens<br>训练成本：估计 $4-12M</span>
                </div>
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>核心结果</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">SuperGLUE：71.8%（超过微调 BERT）<br>算术（2 位）：175B 100% vs 13B 80%<br>Few-Shot 翻译：达可用水平<br>Zero-Shot 代码：~0%</span>
                </div>
              </div>
              <div style="margin-top:12px;padding:10px;background:rgba(251,191,36,.1);border-radius:8px;font-size:.9rem">
                💡 <strong>意外发现</strong>：GPT-3 从未专门训练过翻译——它是在大量互联网文本上预训练后，通过 Few-Shot prompt 自发学会了翻译。没有人设计这个能力，它涌现出来了。
              </div>
            </div>
          `
        },
        {
          type: 'concept',
          title: '🚀 预训练范式之后：规模竞赛如何演进（2020→2026）',
          html: `
            <div style="display:flex;flex-direction:column;gap:12px">
              <div style="padding:12px;background:rgba(168,85,247,.08);border-left:3px solid var(--purple);border-radius:8px">
                <strong>2020 · GPT-3（OpenAI）</strong><br>
                <span style="color:var(--muted);font-size:.9rem">175B 参数，发现 Scaling Laws 和 In-Context Learning。"只需预测下一个词"的预训练范式被验证。催生了整个大模型浪潮。</span>
              </div>
              <div style="padding:12px;background:rgba(0,229,255,.08);border-left:3px solid var(--cyan);border-radius:8px">
                <strong>2021 · Chinchilla（DeepMind）</strong><br>
                <span style="color:var(--muted);font-size:.9rem">发现 Scaling Laws 的另一面：训练数据量和模型参数量应该同步增长。之前大家只做大模型，数据量不够。修正了规模定律。</span>
              </div>
              <div style="padding:12px;background:rgba(16,185,129,.08);border-left:3px solid var(--green);border-radius:8px">
                <strong>2022 · ChatGPT（OpenAI）</strong><br>
                <span style="color:var(--muted);font-size:.9rem">GPT-3.5 + RLHF 对齐。预训练模型 + 后训练对齐 = 可以对话的产品。引爆 AI 热潮，两个月用户破亿。</span>
              </div>
              <div style="padding:12px;background:rgba(251,191,36,.08);border-left:3px solid var(--yellow);border-radius:8px">
                <strong>2023-2024 · 涌现能力争议</strong><br>
                <span style="color:var(--muted);font-size:.9rem">斯坦福团队质疑涌现可能是"评估指标造成的假象"——换用不同指标，曲线可能变成平滑增长。学术界开始重新审视 Scaling Laws。</span>
              </div>
              <div style="padding:12px;background:rgba(239,68,68,.08);border-left:3px solid var(--red);border-radius:8px">
                <strong>2024-2026 · 效率回归</strong><br>
                <span style="color:var(--muted);font-size:.9rem">Llama 3、DeepSeek、Gemma 等开源模型证明：小模型（7-70B）+ 高质量数据 + 精细训练 > 单纯堆参数。Scaling Laws 仍然有效，但"怎么用"变得更聪明了。</span>
              </div>
            </div>
          `
        },
        {
          type: 'quiz',
          q: 'GPT-3 论文的两个核心发现分别是什么？',
          opts: [
            'Transformer 比 RNN 好 + RLHF 有用',
            'Scaling Laws（性能可预测地随规模提升）+ In-Context Learning（大模型能从 prompt 例子学习新任务，无需微调）',
            '代码生成能力强 + 翻译能力强',
            '模型越大越好 + 数据越多越好'
          ],
          ans: 1,
          feedback_ok: '🔥 完美！Scaling Laws 告诉你"投入更多算力能得到多少提升"（可预测），In-Context Learning 告诉你"不需要为每个任务微调"（涌现）。这两个发现合在一起，就是预训练范式的理论基础——先花几百万美元训练一个通用模型，然后通过 prompt 让它做任何事！',
          feedback_err: 'GPT-3 的两个核心发现：① Scaling Laws——性能随规模可预测提升；② In-Context Learning——大模型能从 prompt 中的例子学习新任务，无需梯度更新。前者告诉你"值得砸钱"，后者告诉你"不需要每个任务都微调"。'
        }
      ]
    }
  }
});
