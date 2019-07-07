const arrayLand = require('./two-dimensional-array')

const calculate = (specificValue, result) => {
  let areaCount = 0           // 計算二維陣列特定數值的區域數量 (上下左右相鄰)
  let everyRowGroups = {}     // 儲存每列 group 與該 group 所包含的元素值 (只考慮左右相鄰)

  /*
   * 讀取每列陣列元素
   */
  for (let row = 0; row < arrayLand.length; row++) {
    let group = 1, groupKey
    everyRowGroups[row] = {}

    /*
     * 取得每欄元素，當相鄰元素為指定值時，放入每列 group 中，並依據編號儲存其元素 index
     */
    for (let column = 0; column < arrayLand[row].length; column++) {
      if (arrayLand[row][column] === specificValue) {
        groupKey = `group${group}`

        if (!everyRowGroups[row].hasOwnProperty(groupKey)) {
          everyRowGroups[row][groupKey] = []
        }
        everyRowGroups[row][groupKey].push(column)
      } else { /* 相鄰元素不同時，表示增加新的 group */
        if (groupKey) {
          group++
        }
      }
    }

    /*
     * 從第二列開始，比較上下相鄰元素，
     * 當有 Group 中有元素 index 相同時，
     * 即把前一列有該元素 index 之 group 移除
     */
    if (row > 0) {
      let allColumnIndexesByRow = []

      /* 將目前列的所有 group 元素 index，合併為一個陣列 */
      for (const [rowKey, groupColumns] of Object.entries(everyRowGroups[row])) {
        allColumnIndexesByRow = allColumnIndexesByRow.concat(groupColumns)
      }

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
          delete everyRowGroups[row - 1][groupPreviousKey]
        }
      }
    }
  }
  console.log(everyRowGroups)

  /* 最後加總每一列所剩下的 group 後即為特定值之區域數量 */
  for (let row in everyRowGroups) {
    areaCount += Object.keys(everyRowGroups[row]).length
  }
  result.set(specificValue, areaCount)
}

const main = () => {
  const result = new Map()

  /**
   * 二維陣列所包含的特定值, 目前為兩個：0, 1
   */
  for (let specificValue = 0; specificValue < 2; specificValue++) {
    calculate(specificValue, result)
  }
  console.log(result)
}
main()
