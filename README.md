# 二維陣列：計算陸地與海洋區域數量

###### 給定二維陣列：0 為海洋，1 為陸地；上下左右相鄰，即為一個區域。
###### 可改變 arrayLand 的陣列元素，直接修改 [two-dimensional-array.js](../blob/master/two-dimensional-array.js)
###### 計算過程之原始碼：[counted-areas.js](../blob/master/counted-areas.js)

```javascript
const arrayLand = [
  [0, 1, 0, 0, 1],
  [0, 0, 1, 0, 0],
  [1, 1, 1, 0, 1],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 1]
]
```

### 思考：

1. 先從每列出發，左右相鄰為一個 group，將 group 編號與其包含元素之 index，一起儲存於物件中。

> 海洋：
```javascript
[0, 1, 0, 0, 1] // { group1: [ 0 ], group2: [ 2, 3 ] }
[0, 0, 1, 0, 0] // { group1: [ 0, 1 ], group2: [ 3, 4 ] }
[1, 1, 1, 0, 1] // { group1: [ 3 ] }
[0, 1, 1, 1, 0]	// { group1: [ 0 ], group4: [ 4 ] }
[0, 0, 0, 0, 1] // { group1: [ 0, 1, 2, 3 ] }
```

> 陸地：
```javascript
[0, 1, 0, 0, 1] // { group1: [ 1 ], group3: [ 4 ] }
[0, 0, 1, 0, 0] // { group1: [ 2 ] }
[1, 1, 1, 0, 1] // { group1: [ 0, 1, 2 ], group2: [ 4 ] }
[0, 1, 1, 1, 0]	// { group1: [ 1, 2, 3 ] }
[0, 0, 0, 0, 1] // { group1: [ 4 ] }
```

2. 從第二列開始，將所擁有每個 group 包含的元素 index 合併。 ***(海洋與陸地分開計算)***
```javascript
let allColumnIndexesByRow = []

/* 將目前列的所有 group 元素 index，合併為一個陣列 */
for (const [rowKey, groupColumns] of Object.entries(everyRowGroups[row]) {
	allColumnIndexesByRow = allColumnIndexesByRow.concat(groupColumns)
}
```

3. 依序取出前一列的每個 group 元素 index，如果有包含在目前列數的所有元素 index 中 `allColumnIndexesByRow`，則刪除前一列的該 group。
```javascript
/* 檢查上一列的每個 group */
for (let groupPreviousKey in everyRowGroups[row - 1]) {
  /*
   * group 的元素 index 是否有包含在目前列的所有元素 index 之中
   * 如果有包含，則刪除前一列的該 group
   */
  if (everyRowGroups[row - 1][groupPreviousKey]
    .some(
      groupColumn => allColumnIndexesByRow.includes(groupColumn)
    )
  ) {
    // 刪除該 group
    delete everyRowGroups[row - 1][groupPreviousKey]
  }
}
```

4. 最後加總每一列所剩下的 group 後即為海洋或陸地之區域數量 */
```javascript
for (let row in everyRowGroups) {
	areaCount += Object.keys(everyRowGroups[row]).length
}
result.set(specificValue, areaCount)


// 海洋
{ '0': {},
  '1': { group1: [ 0, 1 ] },
  '2': { group1: [ 3 ] },
  '3': { group4: [ 4 ] },
  '4': { group1: [ 0, 1, 2, 3 ] } }

// 陸地
{ '0': { group1: [ 1 ], group3: [ 4 ] },
  '1': {},
  '2': { group2: [ 4 ] },
  '3': { group1: [ 1, 2, 3 ] },
  '4': { group1: [ 4 ] } }
```

5. 依據一開始的二維陣列，所得結果為：
```bash
Map { 0 => 4, 1 => 5 }
```
> 海洋有 4 群，陸地有 5 群
