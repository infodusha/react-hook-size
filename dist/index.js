"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSize = useSize;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useSize(ref) {
  var obs = (0, _react.useRef)();

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      ignored = _useState2[0],
      setIgnored = _useState2[1];

  var _useState3 = (0, _react.useState)({
    width: null,
    height: null
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      size = _useState4[0],
      setSize = _useState4[1];

  (0, _react.useEffect)(function () {
    function observe(entries) {
      var _entries$0$contentRec = entries[0].contentRect,
          width = _entries$0$contentRec.width,
          height = _entries$0$contentRec.height;
      setSize(function (s) {
        return s.width !== width || s.height !== height ? {
          width: width,
          height: height
        } : s;
      });
    }

    var RObserver = window.ResizeObserver || require('resize-observer-polyfill')["default"];

    obs.current = new RObserver(observe);
    return function () {
      return obs.current.disconnect();
    };
  }, []);
  (0, _react.useEffect)(function () {
    var forceUpdate = function forceUpdate() {
      return setIgnored(function (c) {
        return c + 1;
      });
    };

    var item = ref.current;

    if (item) {
      obs.current.observe(item);
      window.setTimeout(forceUpdate, 0);
    }

    return function () {
      return item && obs.current.unobserve(item);
    };
  }, [obs, ref]);
  return size;
}