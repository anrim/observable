var Observer = Object.create({}, {
  // private
  callbacks: {
    value: {}
  },
  //public
  on: {
    enumerable: true,
    value: function (event, callback) {
      if (typeof event !== "string") {
        throw new Error('Observer.on event is required');
      }
      
      if (typeof callback !== "function") {
        throw new Error('Observer.on callback is required');
      }
      
      if (!(event in this.callbacks)) {
        this.callbacks[event] = [];
      }
      
      this.callbacks[event].push(callback);
      return this;
    }
  },
  once: {
    enumerable: true,
    value: function (event,callback) {
      throw new Error("Not implemented");
    }
  },
  off: {
    enumerable: true,
    value: function (event, callback) {
      if (typeof event !== "string") {
        throw new Error('Observer.off event is required');
      }
      
      // remove all
      if (typeof callback === "undefined") {
        delete this.callbacks[event];
      } else {
        // remove callback
        var i = this.callback[event].indexOf(callback);
        if (~i) {
          this.callback[event].splice(i, 1);
        }
      }
      
      return this;
    }
  },
  trigger: {
    enumerable: true,
    value: function (event) {
      if (typeof event !== "string") {
        throw new Error('Observer.trigger event is required');
      }
      
      var args = [].slice.call(arguments, 1);
      
      this.callbacks[event] = this.callbacks[event] || [];
      this.callbacks[event].forEach(function (callback) {
        callback.apply(this, args);
      });
      
      return this;
    }
  }
});

module.exports = Observer;