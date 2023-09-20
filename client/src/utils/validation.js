export default function validation(inputs) {
  let errors = {};
  if (!inputs.name || inputs.dogs.some((dog) => dog.name === inputs.name)) {
    errors.name = "The name cannot be empty or already exist";
  }
  if (
    !inputs.weight_min ||
    isNaN(inputs.weight_min) ||
    inputs.weight_min < 1 ||
    inputs.weight_min > inputs.weight_max ||
    !inputs.weight_max ||
    isNaN(inputs.weight_max) ||
    inputs.weight_max < 1 ||
    inputs.weight_max < inputs.weight_min
  ) {
    errors.weight = "They must be at least 1 and respect min-max";
  }
  if (
    !inputs.height_min ||
    isNaN(inputs.height_min) ||
    inputs.height_min < 1 ||
    inputs.height_min > inputs.height_max ||
    !inputs.height_max ||
    isNaN(inputs.height_max) ||
    inputs.height_max < 1 ||
    inputs.height_max < inputs.height_min
  ) {
    errors.height = "They must be at least 1 and respect min-max";
  }
  if (
    isNaN(inputs.anios_min) ||
    isNaN(inputs.anios_max) ||
    inputs.anios_min < 0 ||
    inputs.anios_max <= inputs.anios_min
  ) {
    errors.anios =
      "They cannot be equal, they have to be from 0 and respect min-max";
  }

  function isImageURL(url) {
    // Expresión regular para verificar si la URL tiene una extensión de imagen válida
    const imageExtensions = /\.(jpeg|jpg|gif|png|svg)$/i;

    // Verificar si la URL cumple con la expresión regular de las extensiones de imagen
    return imageExtensions.test(url);
  }

  if (!inputs.image || !isImageURL(inputs.image)) {
    errors.image = "You must load the URL of an image";
  }

  if (inputs.temperaments.length === 0) {
    errors.temperaments = "Must choose at least one temperament";
  }

  return errors;
}
