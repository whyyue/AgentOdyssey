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
    }
  }
});
