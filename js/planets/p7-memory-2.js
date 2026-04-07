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
    },

    // 🔴 地狱模式
    hell: {
      sections: [
        {
          type: 'dialogue',
          title: '🐛 边界条件 1：知识库里有互相矛盾的文档',
          scenario: `<strong>故障场景</strong>：用户问"Python 的 match 语句是哪个版本引入的？"<br><br>RAG Agent 检索到两篇文档：<br>• 文档1（2021年）："Python 3.9 支持 match 语句"<br>• 文档2（2022年）："match 语句是 Python 3.10 引入的"<br><br>Agent 直接把两篇文档拼接进 prompt，LLM 输出了错误答案："Python 3.9"。`,
          steps: [
            {
              question: 'Agent 检索到两篇互相矛盾的文档。它应该怎么做？',
              opts: [
                '选择第一篇文档的答案',
                '选择日期更新的文档的答案',
                '把两篇文档都给 LLM，让 LLM 自己判断',
                '明确告诉 LLM"这两篇文档有矛盾，请指出矛盾并说明不确定"'
              ],
              correct: 3,
              aria_correct: '✅ 对！不要让 LLM 在矛盾信息中"猜"答案，而是明确要求它承认不确定性。',
              aria_wrong: '❌ 想想：如果你看到两本书说的不一样，你会随便选一个相信吗？还是会说"我不确定"？'
            },
            {
              question: '在 prompt 中，应该如何呈现这两篇文档？',
              opts: [
                '直接拼接成一段文字',
                '给每篇文档加上标号（[文档1]、[文档2]），方便 LLM 引用',
                '只给 LLM 看摘要',
                '随机选一篇'
              ],
              correct: 1,
              aria_correct: '✅ 正确！标号让 LLM 能清晰地说"文档1 说 X，文档2 说 Y，两者矛盾"。',
              aria_wrong: '❌ 提示：如果文档混在一起，LLM 很难明确指出"哪里矛盾了"。',
              reveal_on_correct: `<strong>关键 Prompt 设计</strong>：<br><code>重要：如果文档之间有矛盾，请明确指出矛盾，并说明你不确定哪个是正确的。不要基于矛盾的信息给出确定的答案。</code><br><br>这让 LLM 知道"承认不确定"是被允许的，甚至是被鼓励的。`
            },
            {
              question: '为什么要让 Agent 承认"不确定"，而不是让它"猜"一个答案？',
              opts: [
                '因为用户喜欢听"不确定"',
                '因为错误的确定答案比诚实的不确定更危险',
                '因为这样可以减少 token 消耗',
                '因为 LLM 不擅长判断'
              ],
              correct: 1,
              aria_correct: '✅ 完美！在关键信息上给出错误答案，会导致用户做出错误决策。承认不确定是负责任的做法。',
              aria_wrong: '❌ 想想：如果医生不确定你的病情，你希望他瞎猜一个诊断，还是诚实地说"需要更多检查"？',
              reveal_on_correct: `<strong>RAG 的核心挑战</strong>：<br>不是"检索到文档就一定能回答"，而是"识别什么时候检索到的信息不足以给出确定答案"。<br><br>这需要在 prompt 中明确引导 LLM 的不确定性表达。`
            }
          ],
          completion_html: `<div style="color:var(--green);font-weight:700;padding:12px">✅ 你理解了 RAG 的边界条件处理！</div>
<div style="color:var(--muted);font-size:.9rem;margin-top:8px">好的 RAG 系统不是"总能回答"，而是"知道什么时候不该回答"。</div>`
        },
        {
          type: 'challenge',
          title: '✏️ 边界条件 2：处理模糊查询',
          description: `场景：用户问"最新的方法是什么？"<br><br>RAG 检索到的文档都是 2021 年的，但现在是 2026 年。Agent 基于旧文档给出了过时的答案。<br><br>任务：设计一个查询增强策略，让 Agent 能识别"时效性查询"并给出适当的不确定性声明。`,
          starter: `def enhanced_rag_query(query, vector_db):
    results = vector_db.query(query, top_k=3)

    # TODO: 检测查询是否涉及时效性（"最新"、"现在"、"目前"等）
    is_time_sensitive = ___

    # TODO: 检查检索到的文档的时间戳
    doc_dates = ___

    # TODO: 如果是时效性查询但文档过旧，在 prompt 中说明
    if is_time_sensitive and ___:
        context = f"""
注意：以下文档可能已过时（最新文档日期：{max(doc_dates)}）

{format_docs(results)}
"""
    else:
        context = format_docs(results)

    prompt = f"""
{context}

问题：{query}
"""

    return call_llm(prompt)`,
          solution: `def enhanced_rag_query(query, vector_db):
    results = vector_db.query(query, top_k=3)

    # 检测时效性关键词
    time_keywords = ['最新', '现在', '目前', '当前', 'latest', 'current', 'now']
    is_time_sensitive = any(kw in query for kw in time_keywords)

    # 检查文档时间戳
    doc_dates = [doc.metadata.get('date', '2020-01-01') for doc in results]
    latest_doc_date = max(doc_dates)

    # 判断文档是否过旧（超过1年）
    from datetime import datetime
    latest_date_obj = datetime.strptime(latest_doc_date, '%Y-%m-%d')
    is_outdated = (datetime.now() - latest_date_obj).days > 365

    if is_time_sensitive and is_outdated:
        context = f"""
⚠️ 注意：你问的是时效性问题，但检索到的文档可能已过时。
最新文档日期：{latest_doc_date}

如果文档信息已过时，请明确说明"基于{latest_doc_date}的信息..."，
并建议用户查询更新的来源。

{format_docs(results)}
"""
    else:
        context = format_docs(results)

    prompt = f"""
{context}

问题：{query}
"""

    return call_llm(prompt)`,
          hints: [
            '用关键词列表检测时效性查询："最新"、"现在"、"目前"等',
            '从文档 metadata 中提取时间戳',
            '如果是时效性查询但文档过旧，在 prompt 中明确警告'
          ],
          validate: function(code) {
            const hasTimeDetection = code.includes('最新') || code.includes('latest') || code.includes('time') || code.includes('时效');
            const hasDateCheck = code.includes('date') || code.includes('时间') || code.includes('metadata');
            const hasWarning = code.includes('过时') || code.includes('outdated') || code.includes('注意') || code.includes('warning');
            if (hasTimeDetection && hasDateCheck && hasWarning) {
              return { ok: true, msg: '✅ 完美！你设计了一个能识别时效性查询并给出适当警告的系统。这是生产级 RAG 的关键能力。' };
            }
            if (!hasTimeDetection) return { ok: false, msg: '需要检测查询中的时效性关键词（"最新"、"现在"等）！' };
            if (!hasDateCheck) return { ok: false, msg: '需要检查文档的时间戳！' };
            return { ok: false, msg: '接近了！确保在文档过旧时给出明确警告。' };
          }
        },
        {
          type: 'concept',
          title: '📄 你刚才遇到的问题，2020 年的 RAG 论文也遇到了',
          html: `
            <div style="margin:14px 0;padding:16px;background:rgba(251,191,36,.1);border-left:3px solid var(--yellow);border-radius:12px;line-height:1.9">
              <strong style="font-size:1.05rem">RAG: Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks</strong><br>
              <span style="color:var(--muted);font-size:.9rem">作者：Patrick Lewis 等（Meta AI Research）· NeurIPS 2020</span><br><br>

              <span style="color:var(--cyan)">你刚才思考的问题——"什么时候信检索结果，什么时候信模型自己的知识"——正是 RAG 论文的核心贡献！</span>
            </div>

            <div style="margin:20px 0;padding:16px;background:rgba(0,229,255,.06);border-radius:12px;line-height:1.9">
              <strong style="color:var(--cyan)">论文的核心思想</strong><br><br>

              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px">
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>参数化知识（模型记忆）</strong><br>
                  <span style="color:var(--green);font-size:.9rem">✅ 快速访问</span><br>
                  <span style="color:var(--red);font-size:.9rem">❌ 训练后无法更新</span><br>
                  <span style="color:var(--red);font-size:.9rem">❌ 容量有限，会遗忘</span><br>
                  <span style="color:var(--red);font-size:.9rem">❌ 无法追溯来源</span>
                </div>
                <div style="padding:12px;background:rgba(0,0,0,.2);border-radius:8px">
                  <strong>非参数化知识（检索）</strong><br>
                  <span style="color:var(--green);font-size:.9rem">✅ 随时更新</span><br>
                  <span style="color:var(--green);font-size:.9rem">✅ 容量无限</span><br>
                  <span style="color:var(--green);font-size:.9rem">✅ 可追溯来源</span><br>
                  <span style="color:var(--red);font-size:.9rem">❌ 需要检索时间</span>
                </div>
              </div>

              <div style="margin-top:16px;padding:12px;background:rgba(0,229,255,.1);border-radius:8px">
                <strong style="color:var(--cyan)">RAG 的思路：结合两者优点！</strong><br>
                <span style="font-size:.9rem">用检索找到相关文档，再让 LLM 基于文档生成答案。</span>
              </div>
            </div>
          `
        },
        {
          type: 'concept',
          title: '🚀 RAG 之后的演进（2020→2026）',
          html: `
            <div style="display:flex;flex-direction:column;gap:12px">
              <div style="padding:12px;background:rgba(168,85,247,.08);border-left:3px solid var(--purple);border-radius:8px">
                <strong>2022 · HyDE（Hypothetical Document Embeddings）</strong><br>
                <span style="color:var(--muted);font-size:.9rem">不直接用查询检索，而是让 LLM 先生成"假设的答案"，再用假设答案检索。效果更好！</span>
              </div>
              <div style="padding:12px;background:rgba(0,229,255,.08);border-left:3px solid var(--cyan);border-radius:8px">
                <strong>2023 · Reranking</strong><br>
                <span style="color:var(--muted);font-size:.9rem">检索后用专门的模型重新排序，把最相关的文档排在前面。</span>
              </div>
              <div style="padding:12px;background:rgba(16,185,129,.08);border-left:3px solid var(--green);border-radius:8px">
                <strong>2023 · Self-RAG</strong><br>
                <span style="color:var(--muted);font-size:.9rem">Agent 自己决定什么时候需要检索，什么时候不需要。不是每个问题都要查资料！</span>
              </div>
              <div style="padding:12px;background:rgba(251,191,36,.08);border-left:3px solid var(--yellow);border-radius:8px">
                <strong>2024 · CRAG（Corrective RAG）</strong><br>
                <span style="color:var(--muted);font-size:.9rem">检索后评估文档质量，如果质量差就重新检索或用网络搜索。</span>
              </div>
              <div style="padding:12px;background:rgba(239,68,68,.08);border-left:3px solid var(--red);border-radius:8px">
                <strong>2024 · GraphRAG（微软）</strong><br>
                <span style="color:var(--muted);font-size:.9rem">不只是检索文档片段，而是构建知识图谱，理解实体之间的关系。</span>
              </div>
            </div>
          `
        },
        {
          type: 'quiz',
          q: '当 RAG 检索到的文档和 LLM 自身知识矛盾时，正确的处理方式是？',
          opts: [
            '永远相信检索到的文档',
            '永远相信 LLM 自身的知识',
            '在 prompt 中明确指出矛盾，让 LLM 说明不确定性',
            '随机选一个'
          ],
          ans: 2,
          feedback_ok: '✅ 完美！承认不确定性是 RAG 系统的关键能力。盲目相信任何一方都可能导致错误。',
          feedback_err: '正确做法是让 LLM 识别矛盾并说明不确定性。这比给出错误的确定答案要好得多！'
        }
      ]
    }
  }
});
