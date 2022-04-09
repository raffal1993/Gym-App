export const importImages = () => {
  const images = {} as { [key: string]: string };

  require
    .context('../assets/images/muscles', false)
    .keys()
    .forEach(
      (image) =>
        (images[
          `${image.replace(/.webp|\.\//g, '')}`
        ] = require(`../assets/images/muscles/${image.replace('./', '')}`)),
    );

  const exercises = Object.keys(images).sort((a, b) => {
    if (b === 'other') return -1;
    return 1;
  });

  return { images, exercises };
};
