class Matrix {
  constructor(rows, cols) {
    this.rows = rows
    this.cols = cols

    this.data = []

    for (let i = 0; i < rows; i++) {
      let arr = []
      for (let j = 0; j < cols; j++) {
        arr.push(0)
      }
      this.data.push(arr)
    }
  }

  static toMatrix(arr) {
    let matrix = new Matrix(arr.length, 1)
    matrix.map_matrix((elm, i, j) => {
      return arr[i]
    })
    return matrix
  }

  static toArray(obj) {
    let arr = []
    obj.map_matrix((elm, i, j) => {
      arr.push(elm)
    })
    return arr
  }

  print() {
    console.table(this.data)
  }

  randomize() {
    this.map_matrix((elm, i, j) => {
      return Math.random() * 2 - 1
    })
  }

  static map_matrix(A, func) {
    let matrix = new Matrix(A.rows, A.cols)

    matrix.data = A.data.map((arr, i) => {
      return arr.map((num, j) => {
        return func(num, i, j)
      })
    })

    return matrix
  }

  map_matrix(func) {
    this.data = this.data.map((arr, i) => {
      return arr.map((num, j) => {
        return func(num, i, j)
      })
    })

    return this
  }

  static transpose(A) {
    var matrix = new Matrix(A.cols, A.rows)
    matrix.map_matrix((num, i, j) => {
      return A.data[j][i]
    })
    return matrix
  }

  static scalar_multiplication(A, escalar) {
    var matrix = new Matrix(A.rows, A.cols)

    matrix.map_matrix((num, i, j) => {
      return A.data[i][j] * escalar
    })

    return matrix
  }

  static hadamard(A, B) {
    var matrix = new Matrix(A.rows, A.cols)

    matrix.map_matrix((num, i, j) => {
      return A.data[i][j] * B.data[i][j]
    })

    return matrix
  }

  static sum(A, B) {
    var matrix = new Matrix(A.rows, A.cols)

    matrix.map_matrix((num, i, j) => {
      return A.data[i][j] + B.data[i][j]
    })

    return matrix
  }

  static sub(A, B) {
    var matrix = new Matrix(A.rows, A.cols)

    matrix.map_matrix((num, i, j) => {
      return A.data[i][j] - B.data[i][j]
    })

    return matrix
  }

  static multiply(A, B) {
    var matrix = new Matrix(A.rows, B.cols)

    matrix.map_matrix((num, i, j) => {
      let sum = 0
      for (let k = 0; k < A.cols; k++) {
        let elm1 = A.data[i][k]
        let elm2 = B.data[k][j]
        sum += elm1 * elm2
      }

      return sum
    })

    return matrix
  }
}
