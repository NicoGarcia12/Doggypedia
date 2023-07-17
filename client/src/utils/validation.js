export default function validation(inputs) {
  let errors = {};
  // CAMBIAR POR TODAS LAS DE PERROS: NAME, WEIGHT/HEIGHT MIN Y MAX
  //                                  ANIOS MIN Y MAX, IMAGE Y TEMPERAMENTS
  if (!inputs.name) {
    errors.name = "El name no puede estar vacío";
  }
  if (
    !inputs.weight_min ||
    isNaN(inputs.weight_min) ||
    inputs.weight_min < 1 ||
    inputs.weight_min > inputs.weight_max
  ) {
    errors.weight_min =
      "The minimum weight must be a number, it cannot be empty, less than 1, or greater than the maximum weight";
  }
  if (
    !inputs.weight_max ||
    isNaN(inputs.weight_max) ||
    inputs.weight_max < inputs.weight_min
  ) {
    errors.weight_max =
      "The maximum weight must be a number, not empty or less than the minimum weight";
  }
  if (
    !inputs.height_min ||
    isNaN(inputs.height_min) ||
    inputs.height_min < 1 ||
    inputs.height_min > inputs.height_max
  ) {
    errors.height_min =
      "The minimum height must be a number, not empty, less than 1, or greater than the maximum height";
  }
  if (
    !inputs.height_max ||
    isNaN(inputs.height_max) ||
    inputs.height_max < inputs.height_min
  ) {
    errors.height_max =
      "The maximum height must be a number, not empty or less than the minimum height";
  }
  if (
    !inputs.anios_min ||
    isNaN(inputs.anios_min) ||
    inputs.anios_min < 0 ||
    inputs.anios_min > inputs.anios_max
  ) {
    errors.anios_min =
      "The minimum age must be a number, not empty, less than 0, or greater than the maximum age";
  }
  if (
    !inputs.anios_max ||
    isNaN(inputs.anios_max) ||
    inputs.anios_max > inputs.anios_min
  ) {
    errors.anios_max =
      "The maximum age must be a number, not empty or less than the maximum age";
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
