// 关卡 9：Transformer 星（深化版）

PLANETS.push({
  id: 'p9',
  icon: '⚡',
  num: '星球 09',
  name: 'Transformer 星',
  desc: '揭秘 AI 大脑的核心零件！Attention 注意力机制！',

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
                P9-P11 是深入 LLM 底层原理的<strong>可选内容</strong>：<br>
                • P9：Transformer 架构<br>
                • P10：预训练流程<br>
                • P11：后训练（RLHF）<br><br>

                <strong>如果你的目标是：</strong><br>
                ✅ 快速学会 Agent 开发 → <strong>可以跳过 P9-P11，直接去 P12 实战星</strong><br>
                ✅ 深入理解 LLM 原理 → 继续学习 P9-P11<br>
                ✅ 成为 AI 研究者 → 强烈推荐学习地狱模式<br><br>

                <strong>跳过不影响后续学习！</strong>P12 之后的内容不依赖 P9-P11 的知识。
              </p>
            </div>
          `
        },
        {
          type: 'story',
          html: `
            <div class="speaker">🚀 发现隐藏星球！</div>
            <p>ARIA 突然在雷达上发现了一颗之前没注意到的星球，闪烁着耀眼的光芒……</p>
            <div class="chat-bubble robot">
              🤖 ARIA：船长！这是 <strong style="color:var(--cyan)">Transformer 星</strong>！
              这里藏着 LLM 大脑最核心的秘密——<strong>Transformer 架构</strong>！
              现在几乎所有强大的 AI（GPT、Claude、Gemini）都用它！
            </div>
            <div class="chat-bubble">
              👦 你：Transformer？像变形金刚吗？！
            </div>
            <div class="chat-bubble robot">
              🤖 ARIA：哈哈！名字确实很酷！它是 2017 年 Google 的科学家们发明的，
              论文名字叫《Attention Is All You Need》（只需要注意力）。
              核心秘诀就是一种叫 <strong>Attention（注意力）</strong> 的机制！
            </div>
          `
        },
        {
          type: 'concept',
          title: '👁️ Attention（注意力）是什么？',
          html: `
            <p>举个例子，读这句话：</p>
            <div style="margin:14px 0;padding:14px 18px;background:rgba(0,229,255,.06);border-radius:12px;font-size:1rem;line-height:2">
              「<strong>银行</strong>的利率下降了，我去<strong>河</strong>边钓鱼。」
            </div>
            <p style="font-size:.9rem;line-height:1.7">
              人脑理解「银行」时，会<strong>注意到</strong>「利率」这个词，而不是「河」。<br>
              理解「河」时，会注意到「钓鱼」，而不是「利率」。<br><br>
              <strong style="color:var(--cyan)">Attention 机制就是让 AI 也能这样做！</strong><br>
              处理每个词时，它会计算「我应该重点看哪些其他词」——这叫做 <strong>Self-Attention（自注意力）</strong>。
            </p>
          `
        },
        {
          type: 'pipe',
          title: '⚡ Transformer 处理一句话的流程',
          nodes: [
            {icon:'📝', label:'输入文字'},
            {icon:'🔢', label:'Token化'},
            {icon:'👁️', label:'Self-Attention'},
            {icon:'🔗', label:'前馈网络'},
            {icon:'🔁', label:'重复N层'},
            {icon:'✅', label:'输出结果'},
          ]
        },
        {
          type: 'quiz',
          q: 'Transformer 的核心创新是什么？',
          opts: [
            '让 AI 从左到右一个个字地读，记住每个字',
            'Self-Attention：处理每个词时同时参考所有其他词，判断哪些最重要',
            '用更大的数据库存储所有答案',
            '让 AI 用眼睛直接看图片'
          ],
          ans: 1,
          feedback_ok: '🎉 完全正确！Self-Attention 是 Transformer 最核心的创新，让 AI 能理解上下文关系！',
          feedback_err: '关键词是「同时看所有词」！Transformer 不是一个一个字读的，而是同时处理所有词，用 Attention 决定哪些词重要！'
        }
      ]
    },

    // 🟡 困难模式
    hard: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🚀 Transformer 星（技术版）</div>
            <div class="chat-bubble robot">
              🤖 ARIA：船长！让我给你讲讲 Transformer 的技术细节。
              这是现代 LLM 的基础架构！
            </div>
          `
        },
        {
          type: 'concept',
          title: '⚡ Transformer 的核心组件',
          html: `
            <p>Transformer 的关键技术：</p>
            <ul style="margin:10px 0 0 16px;line-height:2">
              <li><strong>Self-Attention</strong>：计算每个词与其他词的关联度</li>
              <li><strong>Multi-Head Attention</strong>：从多个角度同时分析</li>
              <li><strong>Position Encoding</strong>：告诉模型词的位置信息</li>
              <li><strong>Feed Forward</strong>：每个位置独立的深度处理</li>
            </ul>
          `
        },
        {
          type: 'code',
          title: '📟 Self-Attention 核心计算',
          code: `import numpy as np

# Q, K, V 矩阵（简化版）
Q = np.random.rand(seq_len, d_model)  # Query
K = np.random.rand(seq_len, d_model)  # Key
V = np.random.rand(seq_len, d_model)  # Value

# 计算注意力权重
scores = Q @ K.T / np.sqrt(d_model)
attention_weights = softmax(scores)

# 加权求和得到输出
output = attention_weights @ V`,
          explanation: `
            <strong>关键点：</strong><br>
            • Q (Query): 当前词的"查询"<br>
            • K (Key): 其他词的"键"<br>
            • V (Value): 其他词的"值"<br>
            • Attention 权重决定每个词对当前词的重要性
          `
        },
        {
          type: 'pitfalls',
          title: '⚠️ 常见误解',
          items: [
            'Transformer 不是 RNN，不需要按顺序处理 → 可以并行计算',
            'Position Encoding 很重要 → 没有它，模型不知道词的顺序',
            'Multi-Head 不是多个模型 → 是从多个角度分析同一个输入',
            'Transformer 本身不限制长度 → 限制来自实现和计算资源'
          ]
        },
        {
          type: 'quiz',
          q: '「Attention Is All You Need」这篇论文的意思是？',
          opts: [
            'AI 需要人类时刻关注它',
            '只需要注意力机制就能建造强大的语言模型，不需要老方法',
            'AI 只能回答关于注意力的问题',
            '训练 AI 需要非常专注的工程师'
          ],
          ans: 1,
          feedback_ok: '⭐ 正确！这篇 2017 年的论文彻底改变了 AI 世界，证明仅靠 Attention 机制就能超越所有之前的方法！',
          feedback_err: '这是一篇开创时代的论文标题，意思是「只需要注意力机制」就够了！'
        }
      ]
    },

    // 🔴 地狱模式
    hell: {
      sections: [
        {
          type: 'dialogue',
          title: '🔍 为什么 AI 翻译"他把钥匙放在盒子里，因为它太重了"时会搞错？',
          scenario: `<strong>故障场景</strong>：你在测试一个 2016 年的 RNN 翻译模型，把下面这句话翻译成中文：<br><br>
<em>"The trophy didn't fit in the suitcase because it was too big."</em><br><br>
正确翻译："奖杯放不进手提箱，因为<strong>奖杯</strong>太大了。"<br>
RNN 模型翻译："奖杯放不进手提箱，因为<strong>手提箱</strong>太大了。"<br><br>
"it"到底指什么——奖杯还是手提箱？人类一眼就能看出来，但 RNN 搞反了。<br><br>
这类问题叫 Winograd Schema Challenge，专门测试模型能否理解代词指代。`,
          steps: [
            {
              question: 'RNN 处理"because it was too big"时，模型的状态向量里主要保留的是什么信息？',
              opts: [
                '完整句子的所有词的信息，均等保留',
                '主要是最近几个词的信息——"because it was"，离得越远的词（如"trophy"）信息越少',
                '只有语法结构信息，没有词义信息',
                '随机保留一部分词的信息'
              ],
              correct: 1,
              aria_correct: '✅ 对！这就是 RNN 的核心缺陷——"长距离衰减"。信息通过 hidden state 逐步传递，越早的词信息越容易被覆盖。当模型处理到句子末尾的"it"时，"trophy"（第2个词）的信息已经被大量稀释了。',
              aria_wrong: '❌ 想想 RNN 是怎么工作的：它按顺序处理每个词，每个词都更新 hidden state。当你处理到第10个词时，第1个词的信息还剩多少？'
            },
            {
              question: '要让模型在处理"it"时能直接"看到"句子开头的"trophy"，需要什么机制？',
              opts: [
                '让 RNN 的 hidden state 维度更大，存更多信息',
                '一种让模型在处理每个词时，能直接查看句子中所有其他词并决定"哪些词和我最相关"的机制',
                '把句子倒序输入，让近词变远词',
                '增加更多层 RNN，深层网络自然会学会长距离依赖'
              ],
              correct: 1,
              aria_correct: '✅ 正确！你刚才描述的就是 Attention（注意力机制）的本质：处理"it"时，让模型同时看到"trophy"和"suitcase"，计算出"it更可能指trophy"——直接查询，不经过中间传递。',
              aria_wrong: '❌ 更大的 hidden state 能存更多信息，但信息还是按顺序传递，长距离衰减问题仍然存在。需要的是一种能"跳过中间词直接查询"的机制。'
            },
            {
              question: '如果每个词在处理时都能"直接看到"所有其他词，而不是按顺序传递信息，这对计算有什么影响？',
              opts: [
                '计算量减少——不需要逐步传递了',
                '可以并行计算所有词的表示——不再有"必须等上一步完成"的约束',
                '计算量不变，只是准确率更高',
                '只有在 GPU 上才能并行，CPU 上还是顺序计算'
              ],
              correct: 1,
              aria_correct: '✅ 完全正确！这是 Transformer 的第二个革命性优势：因为每个词的表示可以同时计算（都直接看全局，不等前一步），整个序列可以并行处理。训练速度提升 10x+ 的根本原因就在这里。',
              aria_wrong: '❌ 想想：如果每个词的计算都只依赖"全局输入"而不是"上一个词的输出"，那么所有词的计算之间有没有依赖关系？',
              reveal_on_correct: `<strong>Attention 的核心公式</strong>：<br><code>Attention(Q, K, V) = softmax(QKᵀ / √d_k) × V</code><br><br>• Q（Query）："我是'it'，我在找什么？"<br>• K（Key）：每个词的"我是什么"<br>• V（Value）：每个词的实际内容<br>• softmax(QKᵀ)：计算"it"和每个词的相关程度<br>• × V：按相关程度加权混合所有词的内容<br><br>结果："it"的表示 = 75% trophy内容 + 20% suitcase内容 + 5% 其他词内容`
            }
          ],
          completion_html: `<div style="color:var(--green);font-weight:700;padding:12px">✅ 你推导出了 Attention 机制的核心动机！</div>
<div style="color:var(--muted);font-size:.9rem;margin-top:8px">长距离衰减 → 需要直接查询 → Attention 机制 → 并行计算成为可能。<br>这条推导链，2017 年 Google 的研究员走过了同样的路。</div>`
        },
        {
          type: 'concept',
          title: '📄 你刚才推导出的，2017 年 Google 把它写成了论文',
          html: `
            <div style="margin:14px 0;padding:16px;background:rgba(251,191,36,.1);border-left:3px solid var(--yellow);border-radius:12px;line-height:1.9">
              <strong style="font-size:1.05rem">Attention Is All You Need</strong><br>
              <span style="color:var(--muted);font-size:.9rem">作者：Vaswani 等（Google Brain & Google Research）· NeurIPS 2017<br>引用次数：>100,000</span><br><br>
              <span style="color:var(--cyan)">你刚才推导出的两个直觉——"需要直接查询"和"可以并行"——正是这篇论文的两个核心贡献！</span>
            </div>

            <div style="margin:20px 0;padding:16px;background:rgba(0,229,255,.06);border-radius:12px;line-height:1.9">
              <strong style="color:var(--cyan)">论文的关键数据</strong><br><br>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px">
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>翻译任务（WMT 2014）</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">英德：BLEU 28.4（超越之前所有模型）<br>英法：BLEU 41.8（新 SOTA）<br>训练：8 × P100 GPU，3.5 天</span>
                </div>
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>对比 RNN</strong><br>
                  <span style="font-size:.9rem;color:var(--muted)">训练速度：快 10x+<br>长距离依赖：直接建模任意距离<br>参数效率：更高（同样性能更少参数）</span>
                </div>
              </div>
              <div style="margin-top:12px;padding:10px;background:rgba(251,191,36,.1);border-radius:8px;font-size:.9rem">
                💡 <strong>意外发现</strong>：不同注意力头自发学到了不同模式——有的关注语法依赖，有的关注语义相似，有的关注位置关系。没有人设计这些，是模型自己学会的。
              </div>
            </div>
          `
        },
        {
          type: 'concept',
          title: '🚀 Transformer 之后：架构如何演进（2017→2026）',
          html: `
            <div style="display:flex;flex-direction:column;gap:12px">
              <div style="padding:12px;background:rgba(168,85,247,.08);border-left:3px solid var(--purple);border-radius:8px">
                <strong>2017 · Transformer（Google）</strong><br>
                <span style="color:var(--muted);font-size:.9rem">Attention Is All You Need。抛弃 RNN，完全基于注意力机制。引用次数 >100,000。成为所有 LLM 的基础。</span>
              </div>
              <div style="padding:12px;background:rgba(0,229,255,.08);border-left:3px solid var(--cyan);border-radius:8px">
                <strong>2018 · BERT + GPT（Google / OpenAI）</strong><br>
                <span style="color:var(--muted);font-size:.9rem">BERT 只用 Encoder，双向预训练。GPT 只用 Decoder，单向生成。同一个架构，两种用法，催生了两条赛道。</span>
              </div>
              <div style="padding:12px;background:rgba(16,185,129,.08);border-left:3px solid var(--green);border-radius:8px">
                <strong>2020 · GPT-3（OpenAI）</strong><br>
                <span style="color:var(--muted);font-size:.9rem">175B 参数，涌现出 few-shot 学习能力。规模扩大带来了质变——这不是设计出来的，是发现的。</span>
              </div>
              <div style="padding:12px;background:rgba(251,191,36,.08);border-left:3px solid var(--yellow);border-radius:8px">
                <strong>2022 · Flash Attention（Dao 等）</strong><br>
                <span style="color:var(--muted);font-size:.9rem">重写注意力计算的内存访问模式，速度提升 2-4x。让长上下文（100K+ tokens）变得实际可行。</span>
              </div>
              <div style="padding:12px;background:rgba(239,68,68,.08);border-left:3px solid var(--red);border-radius:8px">
                <strong>2024-2026 · 超长上下文竞赛</strong><br>
                <span style="color:var(--muted);font-size:.9rem">Gemini 1.5 Pro：1M tokens。Claude 3.5：200K tokens。长上下文使 RAG 在部分场景被直接替代，架构在继续演进。</span>
              </div>
            </div>
          `
        },
        {
          type: 'quiz',
          q: 'Transformer 中 Attention 机制的核心作用是什么？',
          opts: [
            '替代 Dropout，防止过拟合',
            '让每个词在生成表示时，能直接查看句子中所有词并按相关性加权整合信息',
            '压缩序列长度，减少计算量',
            '把词向量映射到更高维度空间'
          ],
          ans: 1,
          feedback_ok: '🔥 完美！Attention = 直接查询 + 加权整合。它解决了 RNN 的长距离衰减问题，并且让所有词可以并行计算，这就是 Transformer 速度提升 10x+ 的根本原因！',
          feedback_err: 'Attention 的本质是"查询相关性"——处理每个词时，直接看整个序列，计算出"哪些词和我最相关"，然后按相关程度加权混合信息。这解决了 RNN 的两个核心问题：长距离衰减和无法并行。'
        }
      ]
    }
  }
});
