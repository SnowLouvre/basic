/*
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
*/
// 滑动窗口
var lengthOfLongestSubstring = function(s) {
    if (s.length === 0) return 0
    let result = 1
    const len = s.length
    for (let i = 0; i < len - 1;) {
        let j = i + 1
        const temp = []
        let current = 1
        temp.push(s[i])
        while (!temp.includes(s[j]) && j < len) {
            temp.push(s[j])
            current++
            j++;
            console.log(temp, 'temp')
            result = Math.max(result, current)
        }
        i++
    }
    return result
};
// console.log(lengthOfLongestSubstring('abcabcbb')) // 3
// console.log(lengthOfLongestSubstring('bbbbb')) // 1
console.log(lengthOfLongestSubstring('pwwkew')) // 3
