PLANETS.push({
  id: 'p13-practice-2',
  name: '实战星球-代码审查',
  icon: '🔍',
  difficulty: {
    easy: [
      {
        title: '代码审查小助手',
        content: `小明写了很多代码，但有时候会有小错误。

**任务：** 做一个能帮忙检查代码的助手

**它需要会：**
1. 读取代码文件
2. 检查常见问题（比如变量名写错、忘记分号）
3. 给出改进建议
4. 生成审查报告

就像老师批改作业，会指出哪里写得好，哪里需要改进！`
      },
      {
        title: '需要什么工具？',
        content: `代码审查助手需要这些工具：

**1. read_file(path)**
- 读取代码文件内容

**2. run_linter(code)**
- 运行代码检查工具
- 找出语法错误和风格问题

**3. check_tests(path)**
- 检查是否有测试
- 测试覆盖率如何

**工作流程：**
1. 读取代码文件
2. 运行检查工具
3. 分析问题
4. 生成报告`
      },
      {
        title: '审查什么？',
        content: `**代码审查要看：**

1. **正确性**
   - 代码能运行吗？
   - 逻辑对吗？

2. **可读性**
   - 变量名清楚吗？
   - 有注释吗？

3. **安全性**
   - 有没有危险操作？
   - 用户输入检查了吗？

4. **测试**
   - 有测试吗？
   - 测试够吗？

就像检查作业：字写得清楚吗？答案对吗？步骤完整吗？`
      }
    ],
    hard: [
      {
        title: '代码审查Agent',
        content: `完整的代码审查Agent实现。

\`\`\`javascript
async function codeReviewAgent(filePath) {
  // 1. 读取代码
  const code = await tools.read_file(filePath);

  // 2. 运行检查
  const lintResults = await tools.run_linter(code);
  const testCoverage = await tools.check_tests(filePath);

  // 3. AI分析
  const analysis = await llm(\`
    Review this code:
    \${code}

    Linter: \${lintResults}
    Coverage: \${testCoverage}

    Provide: issues, suggestions, rating
  \`);

  // 4. 生成报告
  return {
    file: filePath,
    issues: analysis.issues,
    suggestions: analysis.suggestions,
    rating: analysis.rating
  };
}
\`\`\`

**核心：** 读取 → 检查 → 分析 → 报告`
      },
      {
        title: '多文件审查',
        content: `审查整个PR的所有文件。

\`\`\`javascript
async function reviewPR(prNumber) {
  // 1. 获取PR文件列表
  const files = await tools.get_pr_files(prNumber);

  // 2. 并行审查所有文件
  const reviews = await Promise.all(
    files.map(f => codeReviewAgent(f.path))
  );

  // 3. 汇总分析
  const summary = await llm(\`
    Summarize these reviews:
    \${JSON.stringify(reviews)}

    Overall assessment and key issues
  \`);

  // 4. 发布评论
  await tools.post_comment(prNumber, summary);

  return summary;
}
\`\`\`

**优势：** 并行处理，完整分析`
      },
      {
        title: '常见问题',
        content: `**1. 误报（False Positive）**
问题：把正确代码标记为错误
解决：结合多个检查工具，AI最终判断

**2. 漏报（False Negative）**
问题：没发现真正的问题
解决：使用更严格的规则

**3. 上下文理解**
问题：不理解业务逻辑
解决：提供项目文档和规范

**4. 性能**
问题：大文件审查慢
解决：分块处理，缓存结果

\`\`\`javascript
// 分块审查大文件
async function reviewLargeFile(code) {
  const chunks = splitIntoChunks(code, 500);
  const results = await Promise.all(
    chunks.map(c => reviewChunk(c))
  );
  return mergeResults(results);
}
\`\`\``
      }
    ]
  }
});
