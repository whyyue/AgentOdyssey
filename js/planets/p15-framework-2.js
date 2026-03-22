PLANETS.push({
  id: 'p15-framework-2',
  name: '框架星球-AutoGen',
  icon: '🤖',
  difficulty: {
    easy: [
      {
        title: 'AutoGen和CrewAI',
        content: `除了LangChain，还有其他好用的框架！

**AutoGen（微软出品）**
- 特点：多个Agent互相对话
- 就像一个团队，每个人负责不同的事

**CrewAI**
- 特点：像公司一样组织Agent
- 有老板、有员工、有分工

**例子：**
做一个项目需要：
- 产品经理（理解需求）
- 工程师（写代码）
- 测试员（检查bug）

这些框架帮你组织这个"团队"！`
      },
      {
        title: 'AutoGen怎么用？',
        content: `AutoGen让多个Agent互相对话。

**角色：**
1. **UserProxy**：代表用户
2. **Assistant**：AI助手
3. **自定义Agent**：特殊功能

**工作方式：**
- UserProxy问问题
- Assistant回答或调用工具
- 如果需要，其他Agent加入讨论
- 直到问题解决

就像小组讨论，大家一起想办法！`
      },
      {
        title: 'CrewAI怎么用？',
        content: `CrewAI像管理一个公司。

**概念：**
1. **Agent**：员工，有自己的职责
2. **Task**：任务，需要完成的工作
3. **Crew**：团队，管理所有Agent

**工作流程：**
1. 定义每个Agent的角色
2. 分配任务给Agent
3. Crew协调大家一起工作
4. 完成目标

就像项目管理，每个人做自己擅长的事！`
      }
    ],
    hard: [
      {
        title: 'AutoGen实现',
        content: `使用AutoGen构建多Agent系统。

\`\`\`python
from autogen import AssistantAgent, UserProxyAgent

# 创建助手
assistant = AssistantAgent(
    name="assistant",
    llm_config={"model": "gpt-4"}
)

# 创建用户代理
user_proxy = UserProxyAgent(
    name="user",
    human_input_mode="NEVER",
    code_execution_config={"work_dir": "coding"}
)

# 开始对话
user_proxy.initiate_chat(
    assistant,
    message="帮我分析这个数据集"
)
\`\`\`

**特点：** 自动对话，直到任务完成`
      },
      {
        title: 'CrewAI实现',
        content: `使用CrewAI构建Agent团队。

\`\`\`python
from crewai import Agent, Task, Crew

# 定义Agent
researcher = Agent(
    role="研究员",
    goal="收集信息",
    tools=[search_tool]
)

writer = Agent(
    role="作家",
    goal="写报告",
    tools=[write_tool]
)

# 定义任务
task1 = Task(description="研究AI趋势", agent=researcher)
task2 = Task(description="写报告", agent=writer)

# 组建团队
crew = Crew(agents=[researcher, writer], tasks=[task1, task2])

# 执行
result = crew.kickoff()
\`\`\`

**特点：** 清晰的角色分工`
      },
      {
        title: '框架对比',
        content: `**LangChain/LangGraph**
优势：工具最多，社区最大
劣势：学习曲线陡

**AutoGen**
优势：多Agent对话自然
劣势：控制流程较难

**CrewAI**
优势：角色分工清晰
劣势：相对较新，工具少

**选择建议：**
- 单Agent任务 → LangChain
- 复杂流程控制 → LangGraph
- 多Agent协作 → AutoGen
- 明确角色分工 → CrewAI

**通用陷阱：**
- 不要过度依赖框架
- 理解底层原理更重要
- 简单任务不需要框架`
      }
    ]
  }
});
