export default file => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = () => resolve(fr.result); // CHANGE to whatever function you want which would eventually call resolve
  });
};
