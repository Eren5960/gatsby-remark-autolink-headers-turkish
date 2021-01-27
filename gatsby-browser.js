"use strict";

var offsetY = 0;

var getTargetOffset = function getTargetOffset(hash) {
  var id = window.decodeURI(hash.replace("#", "").replace(/Ğ/g, 'g').replace(/Ü/g, 'u').replace(/Ş/g, 's').replace(/I/g, 'i').replace(/İ/g, 'i').replace(/Ö/g, 'o').replace(/Ç/g, 'c').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/i̇/g, "i").replace(/-+/g, "-"));

  if (id !== "") {
    var element = document.getElementById(id);

    if (element) {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      var clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
      var computedStyles = window.getComputedStyle(element);
      var scrollMarginTop = computedStyles.getPropertyValue("scroll-margin-top") || computedStyles.getPropertyValue("scroll-snap-margin-top") || "0px";
      return element.getBoundingClientRect().top + scrollTop - parseInt(scrollMarginTop, 10) - clientTop - offsetY;
    }
  }

  return null;
};

exports.onInitialClientRender = function (_, pluginOptions) {
  if (pluginOptions.offsetY) {
    offsetY = pluginOptions.offsetY;
  }

  requestAnimationFrame(function () {
    var offset = getTargetOffset(window.location.hash);

    if (offset !== null) {
      console.log(offset);
      window.scrollTo(0, offset);
    }
  });
};

exports.shouldUpdateScroll = function (_ref) {
  var location = _ref.routerProps.location;
  var offset = getTargetOffset(location.hash);
  return offset !== null ? [0, offset] : true;
};