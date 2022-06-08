class Matrix {
  constructor(rows, cols, _data = [], _default_value = 0) {
    this.rows = rows
    this.cols = cols
    this.data = _data

    if (_data.length === 0) {
      for (let i = 0; i < rows; i++) {
        let arr = []
        for (let j = 0; j < cols; j++) {
          arr.push(_default_value)
        }
        this.data.push(arr)
      }
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

  categorization(W, choice_parameter) {
    let major_arr = []
    let aux = []
    let t = 0

    this.data.forEach((arr, i) => {
      arr.forEach((elm, j) => {
        major_arr = []
        if (elm <= W[i][j]) {
          major_arr.push(elm)
        } else {
          major_arr.push(W[i][j])
        }
        aux[i] = 0
        major_arr.map((m) => {
          aux[i] += m
        })

        aux[i] = aux[i] / (choice_parameter + W[i][j])
      })
    })

    aux.forEach((elm, i) => {
      if (i > aux.length - 1) {
        return
      } else if (elm >= aux[i + 1] && t > i) {
        t = i
      }
    })

    return t
  }

  surveillance_test(W, T, vigilance_parameter) {
    let smaller_arr = []
    let x = 0
    let y = 0

    this.data[T].forEach((elm, j) => {
      if (elm <= W[T][j]) {
        smaller_arr.push(elm)
      } else {
        smaller_arr.push(W[T][j])
      }
    })

    x = smaller_arr.reduce((a, b) => a + b, 0)
    y = this.data[T].reduce((a, b) => a + b, 0)

    x = x / y

    return x >= vigilance_parameter ? true : false
  }

  match_tranking(W, T, vigilance_parameter_a_b) {
    let xab = null
    let smaller_arr = []

    this.data[T].forEach((elm, j) => {
      if (elm <= W[T][j]) {
        smaller_arr.push(elm)
      } else {
        smaller_arr.push(W[T][j])
      }
    })

    xab = smaller_arr.reduce((a, b) => a + b, 0)
    let y = this.data[T].reduce((a, b) => a + b, 0)
    xab = xab / y

    console.log("xab", xab)
    console.log("vigilance_parameter_a_b", vigilance_parameter_a_b)

    return xab >= vigilance_parameter_a_b ? true : false
  }

  update_weights(learning_rate, I, T) {
    let smaller_arr = []
    this.data[T].forEach((elm, j) => {
      if (elm <= I[T][j]) {
        smaller_arr.push(elm)
      } else {
        smaller_arr.push(I[T][j])
      }
    })

    let x = smaller_arr.map((a) => a * learning_rate)
    let y = this.data[T].map((a) => (1 - learning_rate) * a)

    this.data[T] = x.map((a, i) => x[i] + y[i])
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
    if (this.cols > 1) {
      this.data = this.data.map((arr, i) => {
        return arr.map((num, j) => {
          return func(num, i, j)
        })
      })

      return this
    }

    this.data = this.data.map((num, i) => {
      return func(num, i)
    })

    return this
  }

  sum_all() {
    let sum = 0
    if (this.cols > 1) {
      this.data.forEach((arr) => {
        arr.forEach((num) => {
          sum += num
        })
      })

      return sum
    }

    this.data.forEach((num) => {
      sum += num
    })

    return sum
  }

  normalize() {
    let x = this.sum_all()
    this.map_matrix((num, i, j) => {
      return num / x
    })
  }

  complement(matrix, x) {
    for (let i = 0; i < this.rows; i++) {
      if (typeof matrix[i] === "number") {
        this.data[i][0] = matrix[i] / x
        this.data[i][1] = matrix[i] - 1 / x
      } else {
        for (let j = 0; j < this.cols / 2; j++) {
          this.data[i][j] = matrix[i][j] / x
          if (j <= this.cols / 2) {
            const new_index = j + this.cols / 2
            this.data[i][new_index] = this.data[i][j] - 1 / x
          }
        }
      }
    }
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
