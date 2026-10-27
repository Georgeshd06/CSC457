export const BASE_URL = 'http://localhost:8080'

export const imageSrc = (image) =>
  image.startsWith('data:') ? image : `${BASE_URL}/images/${image}`