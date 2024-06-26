const nodeObj = obj => {
    const {id, name, pid = ''} = obj
    return {
      id,
      name,
      pid,
      children: []
    }
  }

  const getElementById = (list, id) => {
    for (const ele of list) {
      if (ele.id === id) {
        return ele
      } else if (ele.children?.length > 0) {
        const temp = getElementById(ele.children, id)
        if (temp) {
          return temp
        }
        continue
      }
    }
    return
  }

  const arrayToTree = (list) => {
    const tree = [];
    if (!Array.isArray(list)) return tree

    list.forEach(item => {
      if (item.pid === undefined) return tree.push(nodeObj(item))
      const element = getElementById(tree, item.pid)
      if (element) {
        element.children.push(nodeObj(item))
      }
    })
    return tree
  }

const source = [
    { id: 3, name: "d", pid: 1 },
    { id: 1, name: "b", pid: 0 },
    { id: 4, name: "e", pid: 2 },
    { id: 2, name: "c", pid: 0 },
    { id: 0, name: "a" },
    { id: 5, name: "f" },
    { id: 6, name: "g", pid: 3 },
    { id: 7, name: "h", pid: 5 },
    { id: 8, name: "i", pid: 7 },
];

// console.log(JSON.stringify(arrayToTree(source)));
console.log(arrayToTree(source));
