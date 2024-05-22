// 一面 背包问题

// 二面 输入n 输入 右上角到左下角的矩阵 
/*
  eg 输入3
  输出
  3
  26
  159
  48
  7
*/
function printMatrix(n) {
  let matrix = new Array(n).fill(0).map(item => new Array(n).fill(0))
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      matrix[i][j] = 3 * i + j + 1
    }
  }
  let row = n;
  let col = n;

  let y = 0, x = col - 1;
  while (x >= 0 && y <= row - 1) { //打印（0，x）-（y，column-1）对角线上的元素
    for (let j = x, i = 0; j <= col - 1 && i <= y; i++, j++) {
      console.log(matrix[i][j]);
    }
    x--;
    y++;
  }

  x = 1;
  y = col - 2;
  while (y >= 0 && x <= row - 1) { //打印（x，0）-（row-1，y）对角线上的元素
    for (let i = x, j = 0; i <= row - 1 && j <= y; i++, j++) {
      console.log(matrix[i][j]);
    }
    x++;
    y--;
  }
}
printMatrix(3);




// 题目一：
// 平行宇宙中的人类也是使用26个英文字母（a-z）但是排列顺序不同（比如bcda…而不是abcd…)。提供一组词汇和平行宇宙字母排序，返回该组词汇是否是按平行宇宙的字典顺序排序。

// 例1:
// 输入: words = ["hello","apple","world"], order = "hlabcdefgijkmnopqrstuvwxyz"
// 输出: true
// 例2:
// 输入: words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
// 输出: false
// 例3:
// 输入: words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
// 输出: false

// const findIndex = (order, ele) => {
//     return order.findIndex(item => item === ele)
// }

// const areWordsAsc = (words, order) => {
//     const len = words.length
//     for (let i = 0; i < len - 1;) {
//         const wordLength = words[i].length;
//         for (let j = 0; j < wordLength;) {
//             if (findIndex(order, words[i][j]) < findIndex(order, words[i + 1][j])) {
//                 if (i === len - 2) {
//                     return true
//                 }
//                 i++
//             } else if (findIndex(order, words[i][j]) > findIndex(order, words[i + 1][j])) {
//                 return false
//             } else {
//                 if (j >= words[i + 1].length - 1) {
//                     return false
//                 }
//                 if (j === wordLength - 1) {
//                     return true
//                 }
//                 j++
//             }
//         }
//     }
// }
/*
题目二：
给出平行宇宙按字典顺序排序的一组词汇，返回该平行宇宙的字母顺序。
注1：输入词汇保证能推导出字母顺序。
注2: 输出任意一组正确字母顺序即可。
输入: words = ["baa", "abcd", "abca", "cab", "cad"]
输出: [‘b’, ‘d’, ‘a’, ‘c’]
输入: words = ["caa", "aaa", "aab"]
输出: [‘c’, ‘a’, ‘b’]
*/
// function alienOrder(words) {
//   const adjList = new Map();
//   const indegree = new Map();

//   // Initialize the graph
//   for (const word of words) {
//     for (const char of word) {
//       adjList.set(char, new Set());
//       indegree.set(char, 0);
//     }
//   }

//   // Build the graph
//   for (let i = 0; i < words.length - 1; i++) {
//     const word1 = words[i];
//     const word2 = words[i + 1];
//     const minLength = Math.min(word1.length, word2.length);
//     let foundDifference = false;

//     for (let j = 0; j < minLength; j++) {
//       const char1 = word1[j];
//       const char2 = word2[j];
//       if (char1 !== char2) {
//         if (!adjList.get(char1).has(char2)) {
//           adjList.get(char1).add(char2);
//           indegree.set(char2, indegree.get(char2) + 1);
//         }
//         foundDifference = true;
//         break;
//       }
//     }

//     // If no difference found and word2 is a prefix of word1, order is invalid
//     if (!foundDifference && word1.length > word2.length) {
//       return "";
//     }
//   }

//   // Topological sort using Kahn's algorithm
//   const queue = [];
//   for (const [char, degree] of indegree.entries()) {
//     if (degree === 0) {
//       queue.push(char);
//     }
//   }

//   const order = [];
//   while (queue.length > 0) {
//     const char = queue.shift();
//     order.push(char);
//     for (const neighbor of adjList.get(char)) {
//       indegree.set(neighbor, indegree.get(neighbor) - 1);
//       if (indegree.get(neighbor) === 0) {
//         queue.push(neighbor);
//       }
//     }
//   }

//   // If not all characters are in the order, there's a cycle
//   if (order.length !== adjList.size) {
//     return "";
//   }

//   return order.join('');
// }
/*
初始化图和入度计数：遍历所有单词，初始化图（adjList）和入度计数器（indegree），其中每个字符都有一个空的邻接集和初始入度为0。
构建图：遍历每对相邻的单词，找到第一个不同的字符，创建从字符1到字符2的边，并更新字符2的入度。如果没有找到不同的字符并且第一个单词长度大于第二个单词，返回空字符串，因为这表示排序无效。
拓扑排序（Kahn算法）：使用入度为0的字符初始化队列，进行拓扑排序。每次从队列中取出一个字符，加入结果列表，并减少其邻居的入度。如果邻居的入度减少到0，加入队列。
检测循环：如果最终排序的字符数量不等于图中字符数量，说明存在循环，返回空字符串。
返回结果：将排序结果转换为字符串返回。
*/


/*
方法一：拓扑排序 + 深度优先搜索
使用深度优先搜索实现拓扑排序的总体思想是：对于一个特定节点，如果该节点的所有相邻节点都已经搜索完成，则该节点也会变成已经搜索完成的节点，在拓扑排序中，该节点位于其所有相邻节点的前面。一个节点的相邻节点指的是从该节点出发通过一条有向边可以到达的节点。
由于拓扑排序的顺序和搜索完成的顺序相反，因此需要使用一个栈存储所有已经搜索完成的节点。深度优先搜索的过程中需要维护每个节点的状态，每个节点的状态可能有三种情况：「未访问」、「访问中」和「已访问」。初始时，所有节点的状态都是「未访问」。
每一轮搜索时，任意选取一个「未访问」的节点 uuu，从节点 uuu 开始深度优先搜索。将节点 uuu 的状态更新为「访问中」，对于每个与节点 uuu 相邻的节点 vvv，判断节点 vvv 的状态，执行如下操作：
如果节点 vvv 的状态是「未访问」，则继续搜索节点 vvv；
如果节点 vvv 的状态是「访问中」，则找到有向图中的环，因此不存在拓扑排序；
如果节点 vvv 的状态是「已访问」，则节点 vvv 已经搜索完成并入栈，节点 uuu 尚未入栈，因此节点 uuu 的拓扑顺序一定在节点 vvv 的前面，不需要执行任何操作。
当节点 uuu 的所有相邻节点的状态都是「已访问」时，将节点 uuu 的状态更新为「已访问」，并将节点 uuu 入栈。
当所有节点都访问结束之后，如果没有找到有向图中的环，则存在拓扑排序，所有节点从栈顶到栈底的顺序即为拓扑排序。
实现方面，由于每个节点是一个字母，因此可以使用字符数组代替栈，当节点入栈时，在字符数组中按照从后往前的顺序依次填入每个字母。当所有节点都访问结束之后，将字符数组转成字符串，即为字典顺序。
*/
var alienOrder = function(words) {
  const VISITING = 1, VISITED = 2;
  let valid = true;
  const edges = new Map();
  const states = new Map();
  const length = words.length;
  for (const word of words) {
      const wordLength = word.length;
      for (let j = 0; j < wordLength; j++) {
          const c = word[j];
          if (!edges.has(c)) {
              edges.set(c, []);
          }
      }
  }

  const addEdge = (before, after) => {
      const length1 = before.length, length2 = after.length;
      const length = Math.min(length1, length2);
      let index = 0;
      while (index < length) {
          const c1 = before[index], c2 = after[index];
          if (c1 !== c2) {
              edges.get(c1).push(c2);
              break;
          }
          index++;
      }
      if (index === length && length1 > length2) {
          valid = false;
      }
  }

  const dfs = (u) => {
      states.set(u, VISITING);
      const adjacent = edges.get(u);
      for (const v of adjacent) {
          if (!states.has(v)) {
              dfs(v);
              if (!valid) {
                  return;
              }
          } else if (states.get(v) === VISITING) {
              valid = false;
              return;
          }
      }
      states.set(u, VISITED);
      order[index] = u;
      index--;
  }

  for (let i = 1; i < length && valid; i++) {
      addEdge(words[i - 1], words[i]);
  }
  const order = new Array(edges.size).fill(0);
  let index = edges.size - 1;
  const letterSet = edges.keys();
  for (const u of letterSet) {
      if (!states.has(u)) {
          dfs(u);
      }
  }
  if (!valid) {
      return "";
  }
  return order.join('');

  
};


// 示例用法
const words = ["wrt", "wrf", "er", "ett", "rftt"];
console.log(alienOrder(words)); // 输出: "wertf"