import Control from '../utils/control';

export default class Popup extends Control {
  constructor(parentNode, className, hiddenClassName) {
    super(parentNode, 'div', className);
    this.className = className;
    this.hiddenClassName = hiddenClassName;
    this.hide();
  }

  setPosition(x, y) {
    this.node.style.left = `${x}px`;
    this.node.style.top = `${y}px`;
  }

  show(content) {
    this.node.className = this.className;
    this.node.innerHTML = `<div>${content[1]}</div><div>${content[0]}</div>`;
  }

  hide() {
    this.node.className = this.hiddenClassName;
  }
}
