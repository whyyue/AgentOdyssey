PLANETS.push({
  id: 'p14-framework-1',
  name: '框架星球-LangChain',
  icon: '🔗',
  difficulty: {
    easy: [
      {
        title: '什么是Agent框架？',
        content: `写Agent代码很复杂，所以有人做了"工具箱"来帮忙。

**就像：**
- 你想做蛋糕，可以自己准备所有材料
- 也可以买"蛋糕预拌粉"，更简单！

**Agent框架就是"预拌粉"：**
- 已经准备好常用工具
- 已经写好常见模式
- 你只需要组装就行

今天我们学两个最流行的框架：LangChain 和 LangGraph！`
      },
      {
        title: 'LangChain是什么？',
        content: `LangChain是最流行的Agent框架。

**它提供：**
1. **链（Chain）**：把多个步骤连起来
2. **工具（Tools）**：各种现成的工具
3. **记忆（Memory）**：帮你管理对话历史
4. **模板（Templates）**：常用的提示词模板

**例子：**
- 你想做"搜索→总结"的Agent
- 不用自己写，LangChain有现成的！
- 只需要几行代码就能搞定

就像乐高积木，拼起来就能用！`
      },
      {
        title: 'LangGraph是什么？',
        content: `LangGraph是LangChain的升级版，更灵活。

**特点：**
1. **图结构**：Agent可以走不同的路径
2. **状态管理**：自动保存每一步的状态
3. **循环支持**：可以重复执行某些步骤

**区别：**
- LangChain：像流水线，一步接一步
- LangGraph：像地图，可以选择不同路线

**例子：**
如果搜索结果不好，可以回到上一步重新搜索！`
      }
    ],
    hard: [
      {
        title: 'LangChain实现',
        content: `使用LangChain构建简单Agent。

\`\`\`python
from langchain.agents import initialize_agent
from langchain.tools import Tool

# 定义工具
tools = [
    Tool(
        name="Search",
        func=search_func,
        description="搜索信息"
    ),
    Tool(
        name="Calculator",
        func=calc_func,
        description="计算数学问题"
    )
]

# 创建Agent
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent="zero-shot-react-description"
)

# 运行
result = agent.run("北京到上海多远？")
\`\`\`

**优势：** 快速搭建，工具丰富`
      },
      {
        title: 'LangGraph实现',
        content: `使用LangGraph构建状态机Agent。

\`\`\`python
from langgraph.graph import StateGraph

# 定义状态
class State:
    query: str
    results: list
    answer: str

# 定义节点
def search_node(state):
    state.results = search(state.query)
    return state

def answer_node(state):
    state.answer = summarize(state.results)
    return state

# 构建图
graph = StateGraph(State)
graph.add_node("search", search_node)
graph.add_node("answer", answer_node)
graph.add_edge("search", "answer")
graph.set_entry_point("search")

# 运行
result = graph.invoke({"query": "..."})
\`\`\`

**优势：** 灵活控制流程`
      },
      {
        title: '如何选择？',
        content: `**选LangChain：**
- 简单的线性流程
- 快速原型开发
- 使用现成工具

**选LangGraph：**
- 复杂的决策逻辑
- 需要循环和分支
- 需要精确控制状态

**常见陷阱：**
1. **过度抽象**
   问题：框架太复杂，反而难用
   解决：简单任务用简单方案

2. **版本兼容**
   问题：框架更新快，代码容易过时
   解决：锁定版本，关注更新日志

3. **调试困难**
   问题：框架封装太深，不知道哪里出错
   解决：启用详细日志，理解底层原理`
      }
    ]
  }
});
