function getStyle(obj, attr) {
    if (window.getComputedStyle) {
      return getComputedStyle(obj, null)[attr];
    } else {
      return obj.currentStyle[attr];
    }
  }

function move(obj, attr, target, speed, callback) {
    //avoid open multiple timer
    if (obj.timer != null || undefined) {
      clearInterval(obj.timer);
    }

    obj.timer = setInterval(function () {
      // get element style
      // const cssObj = window.getComputedStyle(obj, null);
      // var oldValue = parseInt(cssObj.getPropertyValue(attr));
      var oldValue = parseInt(getStyle(obj, attr));

      var newValue = oldValue + speed;

      // stop at the edge
      if (
        (speed < 0 && newValue < target) ||
        (speed > 0 && newValue > target)
      ) {
        newValue = target;
      }

      obj.style[attr] = newValue + "px";

      if (newValue == target) {
        clearInterval(obj.timer);
        callback && callback();
      }
    }, 30);
  }