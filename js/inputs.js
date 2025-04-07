export function handleColorInputs() {
  document.querySelectorAll('.color-input__label').forEach((label) => {
    const input = label.getElementsByClassName('color-input')[0];
    const colorCircle = label.getElementsByClassName('color-circle')[0];

    colorCircle.style.backgroundColor = input.value;

    input.addEventListener('input', () => {
      colorCircle.style.backgroundColor = input.value;
    });

    label.addEventListener('click', () => {
      input.click();
    });
  });
}
