class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes, learning_rate) {
    this.input_nodes = input_nodes
    this.hidden_nodes = hidden_nodes
    this.output_nodes = output_nodes
    this.learning_rate = learning_rate

    this.bias_hidden_nodes = new Matrix(this.hidden_nodes, 1)
    this.bias_hidden_nodes.randomize()
    this.bias_output_nodes_w = new Matrix(this.output_nodes, 1)
    this.bias_output_nodes_w.randomize()

    this.weigths_hidden_nodes = new Matrix(this.hidden_nodes, this.input_nodes)
    this.weigths_hidden_nodes.randomize()

    this.weigths_output_nodes = new Matrix(this.output_nodes, this.hidden_nodes)
    this.weigths_output_nodes.randomize()
  }

  train_network(arr, target) {
    let input = Matrix.toMatrix(arr)
    let hidden = Matrix.multiply(this.weigths_hidden_nodes, input)
    hidden = Matrix.sum(hidden, this.bias_hidden_nodes)

    hidden.map_matrix(sigmoid)

    let output = Matrix.multiply(this.weigths_output_nodes, hidden)
    output = Matrix.sum(output, this.bias_output_nodes_w)
    output.map_matrix(sigmoid)

    const expected = Matrix.toMatrix(target)
    const output_error = Matrix.sub(expected, output)
    const derivarive_output = Matrix.map_matrix(output, dsigmoid)
    const hidden_transposed = Matrix.transpose(hidden)

    let gradient = Matrix.hadamard(derivarive_output, output_error)
    gradient = Matrix.scalar_multiplication(gradient, this.learning_rate)

    this.bias_output_nodes_w = Matrix.sum(this.bias_output_nodes_w, gradient)
    let weigths_output_nodes_deltas = Matrix.multiply(
      gradient,
      hidden_transposed
    )
    this.weigths_output_nodes = Matrix.sum(
      this.weigths_output_nodes,
      weigths_output_nodes_deltas
    )

    const weigths_output_nodes_transposed = Matrix.transpose(
      this.weigths_output_nodes
    )
    const hidden_error = Matrix.multiply(
      weigths_output_nodes_transposed,
      output_error
    )
    const derivative_hidden = Matrix.map_matrix(hidden, dsigmoid)
    let input_transposed = Matrix.transpose(input)

    let gradient_hadamard = Matrix.hadamard(derivative_hidden, hidden_error)
    gradient_hadamard = Matrix.scalar_multiplication(
      gradient_hadamard,
      this.learning_rate
    )

    this.bias_hidden_nodes = Matrix.sum(
      this.bias_hidden_nodes,
      gradient_hadamard
    )

    let weigths_hidden_nodes_deltas = Matrix.multiply(
      gradient_hadamard,
      input_transposed
    )
    this.weigths_hidden_nodes = Matrix.sum(
      this.weigths_hidden_nodes,
      weigths_hidden_nodes_deltas
    )
  }

  predict(arr) {
    let input = Matrix.toMatrix(arr)

    let hidden = Matrix.multiply(this.weigths_hidden_nodes, input)
    hidden = Matrix.sum(hidden, this.bias_hidden_nodes)

    hidden.map_matrix(sigmoid)

    let output = Matrix.multiply(this.weigths_output_nodes, hidden)
    output = Matrix.sum(output, this.bias_output_nodes_w)
    output.map_matrix(sigmoid)
    output = Matrix.toArray(output)

    return output
  }
}
