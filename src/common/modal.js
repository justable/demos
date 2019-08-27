import EventBus from './eventbus';

/**
 * id
 */
class Modal extends EventBus {
  config = {};
  target = null;
  constructor(config) {
    super();
    this._init(config);
  }
  _init(config) {
    Object.assign(this.config, config);
    Object.assign(this.config, {
      target: document.getElementById(this.config.id),
    });
  }
  destroy() {}
  show() {
    const { target } = this.config;
    if (target.className.indexOf('active') === -1) {
      target.className = `${target.className} active`;
    }
  }
  hide() {
    const { target } = this.config;
    target.className = target.className.replace('active', '').trim();
  }
}

export default Modal;
