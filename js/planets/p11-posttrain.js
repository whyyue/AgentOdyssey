PLANETS.push({
  id: 'p11-posttrain',
  name: '后训练星球',
  icon: '🎓',
  difficulty: {
    easy: [
      {
        title: '让AI变得更听话',
        content: `小明的机器人学会了说话（预训练），但它有时候会说一些奇怪的话。

比如问它"怎么做蛋糕？"，它可能回答"蛋糕是圆的"——虽然没错，但不是你想要的答案。

所以小明要**继续训练**它：
1. **示范训练（SFT）**：给它看很多"问题→好答案"的例子
2. **奖励训练（RLHF）**：告诉它哪些回答好，哪些不好
3. **对齐**：让它的回答符合人类的期望

就像教小狗不仅要会叫，还要听懂"坐下"、"握手"这些指令！`
      },
      {
        title: '三种训练方法',
        content: `**1. 示范训练（SFT - Supervised Fine-Tuning）**
给AI看很多"问题→答案"的例子，让它学会正确回答。

**2. 奖励训练（RLHF - 从人类反馈中学习）**
- AI给出多个答案
- 人类给每个答案打分
- AI学会生成高分答案

**3. 对齐（Alignment）**
确保AI的行为符合人类价值观：
- 有帮助（Helpful）
- 诚实（Honest）
- 无害（Harmless）

这就是为什么现在的AI助手不会教你做坏事！`
      },
      {
        title: '为什么需要后训练？',
        content: `预训练的模型就像一个博学的人，但不一定会好好说话。

**问题：**
- 可能说出不礼貌的话
- 可能给出危险的建议
- 可能不理解你真正想要什么

**后训练解决：**
- 让AI更懂礼貌
- 让AI拒绝危险请求
- 让AI理解你的真实意图

就像把一个知识渊博但不懂社交的人，培养成一个既有知识又会沟通的好助手！`
      }
    ],
    hard: [
      {
        title: 'SFT实现',
        content: `监督微调使用标注数据训练模型生成期望的输出。

\`\`\`python
# SFT训练循环
def sft_train(model, dataset):
    for prompt, target in dataset:
        # 前向传播
        output = model(prompt)

        # 计算损失（交叉熵）
        loss = cross_entropy(output, target)

        # 反向传播
        loss.backward()
        optimizer.step()

    return model

# 数据格式
dataset = [
    ("如何做蛋糕？", "1.准备材料 2.混合 3.烘烤"),
    ("天气怎么样？", "我无法查看实时天气，请使用天气工具")
]
\`\`\`

**关键点：**
- 使用高质量的问答对
- 损失函数：交叉熵
- 通常只需要几千到几万条数据`
      },
      {
        title: 'RLHF实现',
        content: `使用人类反馈训练奖励模型，再用强化学习优化策略。

\`\`\`python
# 1. 训练奖励模型
def train_reward_model(comparisons):
    for prompt, good_resp, bad_resp in comparisons:
        score_good = reward_model(prompt, good_resp)
        score_bad = reward_model(prompt, bad_resp)

        # 好答案应该得分更高
        loss = -log(sigmoid(score_good - score_bad))
        loss.backward()

# 2. PPO强化学习
def ppo_train(model, reward_model):
    prompt = sample_prompt()
    response = model.generate(prompt)

    # 获取奖励
    reward = reward_model(prompt, response)

    # PPO更新
    advantage = reward - baseline
    policy_loss = -advantage * log_prob
    policy_loss.backward()
\`\`\`

**流程：**
1. 收集人类偏好对比数据
2. 训练奖励模型
3. 用PPO优化生成策略`
      },
      {
        title: '常见陷阱',
        content: `**1. 过度对齐（Over-alignment）**
- 问题：模型变得过于谨慎，拒绝回答正常问题
- 解决：平衡有用性和安全性

**2. 奖励黑客（Reward Hacking）**
- 问题：模型找到获得高奖励的捷径，而不是真正改进
- 例子：生成很长但无用的回答来获得"详细"的高分
- 解决：设计更全面的奖励函数

**3. 分布偏移（Distribution Shift）**
- 问题：训练数据和实际使用场景不匹配
- 解决：使用多样化的训练数据

**4. 遗忘（Catastrophic Forgetting）**
- 问题：微调后忘记预训练学到的知识
- 解决：使用较小的学习率，保留部分预训练数据`
      }
    ]
  }
});