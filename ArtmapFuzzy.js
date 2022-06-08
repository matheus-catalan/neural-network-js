class ArtmapFuzzy {
  constructor(
    input_nodes,
    inputs = null,
    output_nodes,
    outputs = null,
    learning_rate,
    choice_parameter,
    vigilance_parameter_a,
    vigilance_parameter_b,
    vigilance_parameter_a_b
  ) {
    this.input_nodes_a = input_nodes
    this.output_nodes_b = output_nodes
    this.choice_parameter = choice_parameter
    this.learning_rate = learning_rate
    this.vigilance_parameter_a = vigilance_parameter_a
    this.vigilance_parameter_b = vigilance_parameter_b
    this.vigilance_parameter_a_b = vigilance_parameter_a_b
    if (inputs === null && outputs === null) {
      this.inputs = dataset.inputs_for_normalize
      this.outputs = dataset.outputs_for_normalize
    } else {
      this.outputs = Matrix.toMatrix(outputs)
      this.inputs = Matrix.toMatrix(inputs)
    }

    this.a = new Matrix(
      dataset.inputs_for_normalize.length,
      input_nodes,
      this.inputs
    )

    this.b = new Matrix(
      dataset.outputs_for_normalize.length,
      output_nodes,
      this.outputs
    )

    this.wa = new Matrix(this.a.rows, this.a.cols * 2, [], 1)
    this.wb = new Matrix(this.b.rows, this.b.cols * 2, [], 1)
    this.wab = new Matrix(this.a.cols * 2, this.b.rows, [], 1)
    this.ia = new Matrix(dataset.inputs_for_normalize.length, this.a.cols * 2)
    this.ib = new Matrix(dataset.outputs_for_normalize.length, this.b.cols * 2)
    this.count_a = this.a.sum_all()
    this.count_b = this.b.sum_all()
  }

  train() {
    this.ia.complement(this.a.data, this.count_a)
    this.ib.complement(this.b.data, this.count_b)

    this.a.normalize()
    this.b.normalize()
    let Xab = true,
      j = true,
      k = true,
      count = 1

    let Y = new Matrix(this.ia.cols, this.ib.cols * 2, this.ia.data)
    while (Xab) {
      let tj = this.ia.categorization(this.wa.data, this.choice_parameter)
      let tk = this.ib.categorization(this.wb.data, this.choice_parameter)

      j = this.ia.surveillance_test(
        this.wa.data,
        tj,
        this.vigilance_parameter_a
      )
      k = this.ib.surveillance_test(
        this.wb.data,
        tk,
        this.vigilance_parameter_b
      )

      Y.data[tk][tj] = 1

      Xab = Y.match_tranking(this.wab.data, tj, this.vigilance_parameter_a_b)
      this.wa.update_weights(this.learning_rate, this.ia.data, tj)

      this.wb.update_weights(this.learning_rate, this.ib.data, tk)
      this.wab.update_weights(this.learning_rate, this.wa.data, tj)
      console.log(`${count++} vezes passadas`)
    }
  }

  predict(arr) {
    this.inputs = Matrix.toMatrix(inputs)
  }
}
