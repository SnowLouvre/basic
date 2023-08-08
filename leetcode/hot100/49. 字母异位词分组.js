/*
* 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
* 字母异位词 是由重新排列源单词的所有字母得到的一个新单词。
* 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
* 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
*/
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
// 哈希表
var groupAnagrams = function(strs) {
    // const len = strs.length
    // const result = []

    // for (let i = 0; i < len; i++) {
    //     // if (strs[i])
        
    // }
    // function a = (str) => {
    //     for (let i = 0; i < len; i++) {
    //         if (result[i] && result[i][0] && result[i][0])
    //     }
    // }
    const map = new Map(); // 创建一个空哈希表
    for (let str of strs) {
        let array = Array.from(str);
        array.sort(); // ！！！
        let key = array.toString();
        let list = map.get(key) ? map.get(key) : new Array();
        list.push(str);
        map.set(key, list);
    }
    return Array.from(map.values());
};