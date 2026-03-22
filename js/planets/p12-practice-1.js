PLANETS.push({
  id: 'p12-practice-1',
  name: '实战星球-天气助手',
  icon: '🌤️',
  difficulty: {
    easy: [
      {
        title: '做一个天气小助手',
        content: `现在我们要做一个真正的Agent了！

**任务：** 做一个能查天气的小助手

**它需要会：**
1. 听懂你的问题："明天北京天气怎么样？"
2. 知道要用天气工具
3. 调用工具查询
4. 把结果告诉你

就像你问小明"明天要不要带伞？"，小明会：
1. 理解你在问天气
2. 打开天气App查看
3. 告诉你"明天有雨，记得带伞！"`
      },
      {
        title: '需要什么工具？',
        content: `我们的天气助手需要这些工具：

**1. get_weather(city, date)**
- 输入：城市名、日期
- 输出：温度、天气状况

**2. get_current_location()**
- 输出：用户当前位置

**助手的工作流程：**
1. 用户问："今天天气怎么样？"
2. 助手想：需要知道位置和日期
3. 调用 get_current_location()
4. 调用 get_weather(location, "today")
5. 回答："今天北京晴天，20度"`
      },
      {
        title: '让我们试试看！',
        content: `**对话示例：**

👤 用户："明天要不要带伞？"

🤖 助手思考：
- 需要知道明天的天气
- 需要知道用户在哪里

🤖 助手行动：
1. 调用 get_current_location() → "北京"
2. 调用 get_weather("北京", "明天") → "小雨，18度"

🤖 助手回答："明天北京有小雨，建议带伞哦！"

这就是一个完整的Agent工作流程！`
      }
    ],
    hard: [
      {
        title: '天气Agent实现',
        content: `完整的天气查询Agent实现。

\`\`\`javascript
const tools = {
  get_weather: (city, date) => ({
    temp: 20, condition: "晴天"
  }),
  get_location: () => "北京"
};

async function weatherAgent(query) {
  const intent = await llm(\`分析: \${query}\`);
  if (intent.includes("位置未知")) {
    const loc = tools.get_location();
    const w = tools.get_weather(loc, "today");
    return \`\${loc}\${w.condition}，\${w.temp}度\`;
  }
  const city = extractCity(query);
  const date = extractDate(query);
  const w = tools.get_weather(city, date);
  return \`\${city}\${date}\${w.condition}\`;
}
\`\`\`

**核心：** 意图识别 → 工具调用 → 结果组装`
      },
      {
        title: 'ReAct模式',
        content: `动态决策的Agent实现。

\`\`\`javascript
async function reactAgent(query) {
  let ctx = query;
  for (let i = 0; i < 3; i++) {
    const thought = await llm(\`Query: \${query}\\nContext: \${ctx}\\nNext?\`);
    if (thought.includes("get_location")) {
      ctx += \`\\nLoc: \${tools.get_location()}\`;
    } else if (thought.includes("get_weather")) {
      ctx += \`\\nWeather: \${tools.get_weather(...)}\`;
    } else break;
  }
  return await llm(\`Answer: \${ctx}\`);
}
\`\`\`

**优势：** 动态决策，处理复杂查询`
      },
      {
        title: '常见问题',
        content: `**1. 工具调用失败**
解决：添加重试和错误处理

**2. 意图识别错误**
解决：改进prompt，添加示例

**3. 多轮对话**
解决：维护对话历史

**4. 工具选择错误**
解决：明确工具使用条件

\`\`\`javascript
try {
  return await tools.get_weather(city);
} catch (e) {
  return "抱歉，服务暂时不可用";
}
\`\`\``
      }
    ]
  }
});
