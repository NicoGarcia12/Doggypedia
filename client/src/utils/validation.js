export default function validation(inputs) {
  let errors = {};

  if (!inputs.name || inputs.dogs.some((dog) => dog.name === inputs.name)) {
    errors.name = "The name cannot be empty or already exist";
  }

  const parseNumber = (value) => {
    return value ? parseFloat(value) : undefined;
  };

  const weightMin = parseNumber(inputs.weight_min);
  const weightMax = parseNumber(inputs.weight_max);
  const heightMin = parseNumber(inputs.height_min);
  const heightMax = parseNumber(inputs.height_max);
  const aniosMin = parseNumber(inputs.anios_min);
  const aniosMax = parseNumber(inputs.anios_max);

  if (
    isNaN(weightMin) ||
    isNaN(weightMax) ||
    weightMin < 1 ||
    weightMax < 1 ||
    weightMax < weightMin
  ) {
    errors.weight = "They must be at least 1 and respect min-max";
  }

  if (
    isNaN(heightMin) ||
    isNaN(heightMax) ||
    heightMin < 1 ||
    heightMax < 1 ||
    heightMax < heightMin
  ) {
    errors.height = "They must be at least 1 and respect min-max";
  }

  if (
    isNaN(aniosMin) ||
    isNaN(aniosMax) ||
    aniosMin < 0 ||
    aniosMax < 0 ||
    aniosMax <= aniosMin
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
