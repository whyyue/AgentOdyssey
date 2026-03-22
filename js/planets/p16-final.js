PLANETS.push({
  id: 'p16-final',
  name: '毕业星球',
  icon: '🎓',
  difficulty: {
    easy: [
      {
        title: '恭喜你！',
        content: `你已经完成了所有的学习！

**你学会了：**
1. ✅ LLM是什么
2. ✅ 怎么使用工具
3. ✅ ReAct思考模式
4. ✅ 记忆系统
5. ✅ 多Agent协作
6. ✅ Transformer原理
7. ✅ 预训练和后训练
8. ✅ 实战项目
9. ✅ 各种框架

**现在你可以：**
- 做一个天气助手
- 做一个代码审查助手
- 选择合适的框架
- 理解AI是怎么工作的

继续加油，未来属于你！🚀`
      },
      {
        title: '下一步做什么？',
        content: `**继续学习：**
1. **动手实践**
   - 做一个自己的Agent
   - 从简单的开始

2. **深入学习**
   - 看开源项目的代码
   - 参与社区讨论

3. **关注更新**
   - AI发展很快
   - 保持学习

**推荐资源：**
- LangChain文档
- AutoGen示例
- GitHub上的开源项目

记住：最好的学习方法就是动手做！`
      },
      {
        title: '给你的建议',
        content: `**写Agent的建议：**

1. **从简单开始**
   - 不要一开始就做复杂的
   - 先做一个能用的，再慢慢改进

2. **多测试**
   - AI不是100%准确
   - 要测试各种情况

3. **处理错误**
   - 工具可能失败
   - 要有备用方案

4. **保持简单**
   - 能用简单方法就不要复杂化
   - 代码越少，bug越少

5. **持续学习**
   - AI技术发展很快
   - 保持好奇心

祝你在AI的世界里玩得开心！🎉`
      }
    ],
    hard: [
      {
        title: '完整Agent架构',
        content: `生产级Agent的完整架构。

\`\`\`javascript
class ProductionAgent {
  constructor(config) {
    this.llm = config.llm;
    this.tools = config.tools;
    this.memory = new Memory();
    this.logger = new Logger();
  }

  async run(query) {
    try {
      // 1. 记录请求
      this.logger.log("Query", query);

      // 2. 检索记忆
      const context = await this.memory.retrieve(query);

      // 3. ReAct循环
      for (let i = 0; i < 5; i++) {
        const thought = await this.think(query, context);
        if (thought.done) break;

        const result = await this.act(thought.action);
        context.push(result);
      }

      // 4. 生成回答
      const answer = await this.answer(context);

      // 5. 保存记忆
      await this.memory.save(query, answer);

      return answer;
    } catch (e) {
      this.logger.error(e);
      return this.handleError(e);
    }
  }
}
\`\`\`

**关键：** 日志、错误处理、记忆管理`
      },
      {
        title: '最佳实践',
        content: `**生产环境建议：**

\`\`\`javascript
// 1. 超时控制
async function withTimeout(fn, ms) {
  return Promise.race([
    fn(),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), ms)
    )
  ]);
}

// 2. 重试机制
async function retry(fn, times = 3) {
  for (let i = 0; i < times; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i === times - 1) throw e;
      await sleep(1000 * (i + 1));
    }
  }
}

// 3. 成本控制
class CostTracker {
  track(tokens, model) {
    const cost = tokens * PRICE[model];
    if (this.total + cost > this.limit) {
      throw new Error("Cost limit exceeded");
    }
    this.total += cost;
  }
}
\`\`\`

**核心：** 可靠性、成本、性能`
      },
      {
        title: '持续改进',
        content: `**如何让Agent更好：**

1. **收集反馈**
\`\`\`javascript
async function collectFeedback(query, answer) {
  const feedback = await getUserFeedback();
  await saveToDataset(query, answer, feedback);
}
\`\`\`

2. **A/B测试**
\`\`\`javascript
async function abTest(query) {
  const version = Math.random() > 0.5 ? "A" : "B";
  const result = await agents[version].run(query);
  logMetrics(version, result);
  return result;
}
\`\`\`

3. **监控指标**
- 响应时间
- 成功率
- 用户满意度
- Token使用量

4. **迭代优化**
- 分析失败案例
- 改进prompt
- 添加新工具
- 优化流程

**记住：** Agent开发是持续的过程！`
      }
    ]
  }
});
