let count_train = 100000
train_network = (train = true) => {
  if (train) {
    const input = dataset.inputs[41]
    for (var i = 0; i < 100000; i++) {
      var index = Math.floor(Math.random(58) * 58)
      neural_network.train(dataset.inputs[index], dataset.outputs[index])
    }

    console.log(
      `---------------------------------- vezez treinada ${(count_train += 100000)} ------------------------------------------------------`
    )
    console.log("input: ", dataset.inputs[41])
    console.log("output: ", dataset.outputs[41][0])
    console.log("predict: ", neural_network.predict(dataset.inputs[41])[0])
    console.log("expected: ", 0.41)
    console.log(
      `percentage error: ${(
        Math.abs(
          Math.abs(neural_network.predict(dataset.inputs[41])[0] - 0.41999999) /
            0.41999999
        ) * 100
      ).toFixed(3)}%`
    )

    if (
      neural_network.predict(input)[0] > 0.41 &&
      neural_network.predict(input)[0] < 0.41999999
    ) {
      console.log("Training finished")
      return
    }
    train_network(true)
  }
}

train_network_artmap_fuzzy = (train = true, artmapfuzzy) => {
  console.log(
    `---------------------------------- Inicio do treinamento ------------------------------------------------------`
  )
  artmapfuzzy.train()
}

const calculate_error_output = (inputs, index_input_predicat) => {
  let error = 0
  const tmp = Math.pow(10, 2)
  const index = Math.floor(index_input_predicat * tmp) / tmp

  console.log("Entrar predicada pela rede".dataset.inputs[index * 100])
  console.log("Entradas fornecidas", inputs)

  // for (var i = 0; i < inputs.length; i++) {}
}

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x))
}

function dsigmoid(x) {
  return x * (1 - x)
}

train_log = () => {
  return train_log_arr
}

get_animal = (id) => {
  const tmp = Math.pow(10, 2)
  const index = Math.floor(id * tmp) / tmp

  return animals.find((animal) => animal.id === index)
}
