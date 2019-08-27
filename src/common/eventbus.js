class EventBus {
  bus = {};
  on(type, cb) {
    const cbs = this.bus[type];
    if (cbs) {
      cbs.push(cb);
    } else {
      this.bus[type] = [cb];
    }
  }
  emit(type, args) {
    const cbs = this.bus[type];
    if (cbs) {
      for (let cb of cbs) {
        if (typeof cb === 'function') {
          cb(args);
        }
      }
    } else {
      throw new Error('没有注册该事件');
    }
  }
}

export default EventBus;
