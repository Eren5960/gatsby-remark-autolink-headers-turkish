import React from "react"

const pluginDefaults = {
  className: `anchor`,
  icon: true,
  offsetY: 0,
}

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  const { className, icon, offsetY } = Object.assign(
    pluginDefaults,
    pluginOptions
  )

  const styles = `
    .${className}.before {position: absolute;top: 0;left: 0;transform: translateX(-100%);padding-right: 4px;} .${className}.after {display: inline-block;padding-left: 4px;} h1 .${className} svg, h2 .${className} svg, h3 .${className} svg, h4 .${className} svg, h5 .${className} svg, h6 .${className} svg {visibility: hidden;} h1:hover .${className} svg,h2:hover .${className} svg,h3:hover .${className} svg,h4:hover .${className} svg,h5:hover .${className} svg,h6:hover .${className} svg, h1 .${className}:focus svg, h2 .${className}:focus svg,h3 .${className}:focus svg, h4 .${className}:focus svg,h5 .${className}:focus svg, h6 .${className}:focus svg {visibility: visible;}
  `

  // This script used to have `let scrollTop` and `let clientTop` instead of
  // current ones which are `var`. It is changed due to incompatibility with
  // older browsers (that do not implement `let`). See:
  //  - https://github.com/gatsbyjs/gatsby/issues/21058
  //  - https://github.com/gatsbyjs/gatsby/pull/21083
  const script=`\ndocument.addEventListener("DOMContentLoaded", function(event) {\n      var hash = window.decodeURI(location.hash.replace('#', '').replace(/Ğ/g, 'g').replace(/Ü/g, 'u').replace(/Ş/g, 's').replace(/I/g, 'i').replace(/İ/g, 'i').replace(/Ö/g, 'o').replace(/Ç/g, 'c').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/i̇/g, "i").replace(/-+/g, "-"))\n      if (hash !== '') {\n        var element = document.getElementById(hash)\n        if (element) {\n          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop\n          var clientTop = document.documentElement.clientTop || document.body.clientTop || 0\n          var offset = element.getBoundingClientRect().top + scrollTop - clientTop\n          // Wait for the browser to finish rendering before scrolling.\n          setTimeout((function() {\n            window.scrollTo(0, offset - ${offsetY})\n          }), 0)\n        }\n      }\n    })\n  `;

  const style = icon ? (
    <style key={`gatsby-remark-autolink-headers-style`} type="text/css">
      {styles}
    </style>
  ) : undefined

  return setHeadComponents([
    style,
    <script
      key={`gatsby-remark-autolink-headers-script`}
      dangerouslySetInnerHTML={{ __html: script }}
    />,
  ])
}
