// 游戏状态管理
const state = {
  stars: 0,
  planets: {}, // id -> { done: bool, stars: int }
  currentDifficulty: 'easy', // 'easy' | 'hard' | 'hell'
};

// 所有关卡数据（将由各个关卡文件填充）
const PLANETS = [];
