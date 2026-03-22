// 关卡 7：记忆星 2 - 长期记忆（完整重构）

PLANETS.push({
  id: 'p7',
  icon: '🧠',
  num: '星球 07',
  name: '记忆星 2：长期记忆',
  desc: '学习 RAG 和向量数据库。',

  difficulties: {
    // 🟢 简单模式
    easy: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🚀 记忆星核心区域</div>
            <p>ARIA 带你来到记忆星的核心区域，这里有巨大的数据库：</p>
            <div class="chat-bubble robot">
              🤖 ARIA：船长！短期记忆会消失，但<strong>长期记忆</strong>可以永久保存！
              我们把重要的信息存进数据库，需要时再检索出来。
            </div>
            <div class="chat-bubble">
              👦 你：就像我把知识记在笔记本里，考试前再翻出来复习？
            </div>
            <div class="chat-bubble robot">
              🤖 ARIA：完美比喻！这就是 <strong>RAG（检索增强生成）</strong>！
              让 Agent 在回答前先去查资料库，就像开卷考试！
            </div>
          `
        },
        {
          type: 'concept',
          title: '💾 长期记忆 = 数据库',
          html: `
            <div style="display:grid;grid-template-columns:1fr;gap:14px;margin-top:8px">
              <div style="background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2);border-radius:12px;padding:16px">
                <div style="font-size:1.5rem;margin-bottom:8px">💾</div>
                <strong style="color:var(--green)">长期记忆</strong>
                <p style="font-size:.82rem;color:var(--muted);margin-top:6px;line-height:1.6">
                  • 存进数据库<br>
                  • 永久保存<br>
                  • 像课本，随时查<br>
                  • 可以跨对话使用
                </p>
              </div>
            </div>
            <div style="margin-top:14px;padding:12px 16px;background:rgba(251,191,36,.06);border-radius:10px;border:1px solid rgba(251,191,36,.2)">
              <strong style="color:var(--yellow)">🔍 RAG</strong>（检索增强生成）= 让 Agent 在回答前先去查资料库，就像开卷考试！
            </div>
          `
        },
        {
          type: 'quiz',
          q: 'RAG 是什么？',
          opts: [
            '一种让 AI 变聪明的训练方法',
            '让 Agent 在回答前先检索外部知识库',
            '一种编程语言',
            '机器人的型号名称'
          ],
          ans: 1,
          feedback_ok: '🎉 太棒了！RAG = 检索增强生成，就像给 AI 一本可以随时查的参考书！',
          feedback_err: 'RAG 的关键词是「检索」——让 Agent 在回答前先去查找相关资料！'
        }
      ]
    },

    // 🟡 困难模式
    hard: {
      sections: [
        {
          type: 'story',
          html: `
            <div class="speaker">🚀 记忆星核心区域（技术版）</div>
            <div class="chat-bubble robot">
              🤖 ARIA：船长！让我给你讲讲 RAG 和向量数据库的技术细节。
              这是现代 Agent 系统的核心技术之一！
            </div>
          `
        },
        {
          type: 'concept',
          title: '💾 RAG 的核心技术',
          html: `
            <p>RAG 系统的关键组件：</p>
            <ul style="margin:10px 0 0 16px;line-height:2">
              <li><strong>向量数据库</strong>：存储文本的向量表示（Chroma、Pinecone）</li>
              <li><strong>Embedding 模型</strong>：将文本转换为向量</li>
              <li><strong>相似度检索</strong>：找到与查询最相关的文档</li>
              <li><strong>上下文增强</strong>：将检索结果添加到 prompt 中</li>
            </ul>
          `
        },
        {
          type: 'code',
          title: '📟 RAG 实现示例',
          code: `import chromadb

# 1. 初始化向量数据库
client = chromadb.Client()
collection = client.create_collection("memory")

# 2. 存储记忆
collection.add(
    documents=["用户喜欢喝咖啡"],
    ids=["mem_1"]
)

# 3. 检索相关记忆
results = collection.query(
    query_texts=["用户的饮品偏好"],
    n_results=3
)

# 4. 在 Agent 中使用
relevant_memories = results['documents'][0]
enhanced_prompt = f"""
相关记忆：{relevant_memories}

用户问题：{query}
"""`,
          explanation: `
            <strong>关键点：</strong><br>
            • 向量数据库自动计算文本相似度<br>
            • 检索出最相关的记忆<br>
            • 将记忆添加到 prompt 中增强 LLM 的回答
          `
        },
        {
          type: 'pitfalls',
          title: '⚠️ 常见坑点',
          items: [
            '检索结果不相关 → Embedding 模型选择或 query 构造问题',
            '记忆过多导致检索慢 → 需要建立索引和优化',
            '检索结果太长超出 Context Window → 需要摘要或截断',
            '没有更新机制 → 过时的记忆会误导 Agent'
          ]
        },
        {
          type: 'quiz',
          q: 'RAG 的核心流程是什么？',
          opts: [
            '直接把所有数据都给 LLM',
            '检索相关文档 → 添加到 prompt → LLM 生成回答',
            '训练一个新的模型',
            '把数据存在 Context Window 里'
          ],
          ans: 1,
          feedback_ok: '✅ 完全正确！RAG 的核心是「检索 + 增强 + 生成」！',
          feedback_err: 'RAG = 检索增强生成，关键是先检索，再增强 prompt！'
        }
      ]
    }
  }
});
