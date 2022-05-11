let train = false

function setup(neural_network) {
  dataset_inputs = []
  dataset_outputs = []
  dataset_animals = []

  animals.forEach((element, index) => {
    let row = []

    Object.entries(element).forEach(([key, value]) => {
      let _value = null

      if (key === "animal_name" || key === "id") return

      _value = value > 1 ? value / 100 : value

      row.push(_value)
    })
    dataset_inputs.push(row)
    dataset_outputs.push([index / 100])
    dataset_animals.push({
      id: index / 100,
      name: element.animal_name,
      attributes: row,
    })
  })

  dataset = {
    inputs: dataset_inputs,
    outputs: dataset_outputs,
  }

  return neural_network
}
