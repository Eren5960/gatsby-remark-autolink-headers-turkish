"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var pluginDefaults = {
  className: "anchor",
  icon: true,
  offsetY: 0
};

exports.onRenderBody = function (_ref, pluginOptions) {
  var setHeadComponents = _ref.setHeadComponents;

  var _Object$assign = Object.assign(pluginDefaults, pluginOptions),
      className = _Object$assign.className,
      icon = _Object$assign.icon,
      offsetY = _Object$assign.offsetY;

  var styles = "\n    ." + className + ".before {position: absolute;top: 0;left: 0;transform: translateX(-100%);padding-right: 4px;} ." + className + ".after {display: inline-block;padding-left: 4px;} h1 ." + className + " svg, h2 ." + className + " svg, h3 ." + className + " svg, h4 ." + className + " svg, h5 ." + className + " svg, h6 ." + className + " svg {visibility: hidden;} h1:hover ." + className + " svg,h2:hover ." + className + " svg,h3:hover ." + className + " svg,h4:hover ." + className + " svg,h5:hover ." + className + " svg,h6:hover ." + className + " svg, h1 ." + className + ":focus svg, h2 ." + className + ":focus svg,h3 ." + className + ":focus svg, h4 ." + className + ":focus svg,h5 ." + className + ":focus svg, h6 ." + className + ":focus svg {visibility: visible;}\n  "; // This script used to have `let scrollTop` and `let clientTop` instead of
  // current ones which are `var`. It is changed due to incompatibility with
  // older browsers (that do not implement `let`). See:
  //  - https://github.com/gatsbyjs/gatsby/issues/21058
  //  - https://github.com/gatsbyjs/gatsby/pull/21083

  var script = "\ndocument.addEventListener(\"DOMContentLoaded\", function(event) {\n      var hash = window.decodeURI(location.hash.replace('#', '').replace(/\u011E/g, 'g').replace(/\xDC/g, 'u').replace(/\u015E/g, 's').replace(/I/g, 'i').replace(/\u0130/g, 'i').replace(/\xD6/g, 'o').replace(/\xC7/g, 'c').replace(/\u011F/g, 'g').replace(/\xFC/g, 'u').replace(/\u015F/g, 's').replace(/\u0131/g, 'i').replace(/\xF6/g, 'o').replace(/\xE7/g, 'c').replace(/i\u0307/g, \"i\").replace(/-+/g, \"-\"))\n      if (hash !== '') {\n        var element = document.getElementById(hash)\n        if (element) {\n          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop\n          var clientTop = document.documentElement.clientTop || document.body.clientTop || 0\n          var offset = element.getBoundingClientRect().top + scrollTop - clientTop\n          // Wait for the browser to finish rendering before scrolling.\n          setTimeout((function() {\n            window.scrollTo(0, offset - " + offsetY + ")\n          }), 0)\n        }\n      }\n    })\n  ";
  var style = icon ? /*#__PURE__*/_react.default.createElement("style", {
    key: "gatsby-remark-autolink-headers-style",
    type: "text/css"
  }, styles) : undefined;
  return setHeadComponents([style, /*#__PURE__*/_react.default.createElement("script", {
    key: "gatsby-remark-autolink-headers-script",
    dangerouslySetInnerHTML: {
      __html: script
    }
  })]);
};