let train = false

function setup(neural_network) {
  dataset_inputs = []
  dataset_inputs_for_normalize = []
  dataset_outputs = []
  dataset_outputs_for_normalize = []
  dataset_animals = []

  animals.forEach((element, index) => {
    let row = []
    let row_for_normalize = []

    Object.entries(element).forEach(([key, value]) => {
      let _value = null

      if (key === "animal_name" || key === "id") return

      _value = value > 1 ? value / 100 : value

      row.push(_value)
      row_for_normalize.push(value)
    })
    dataset_inputs.push(row)
    dataset_inputs_for_normalize.push(row_for_normalize)
    dataset_outputs.push([index / 100])
    dataset_outputs_for_normalize.push(index)
    dataset_animals.push({
      id: index / 100,
      name: element.animal_name,
      attributes: row,
    })
  })

  dataset = {
    inputs: dataset_inputs,
    inputs_for_normalize: dataset_inputs_for_normalize,
    outputs: dataset_outputs,
    outputs_for_normalize: dataset_outputs_for_normalize,
  }

  return neural_network
}
