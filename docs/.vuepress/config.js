module.exports = {
  base: "/line-pay-sdk-nodejs/",
  title: "line-pay-sdk-nodejs",
  description: "Node.js SDK for LINE Pay API",
  themeConfig: {
    nav: [
      {
        text: "Introduction",
        link: "/"
      },
      {
        text: "Getting Started",
        link: "/getting-started/requirements"
      },
      {
        text: "API Reference",
        link: "/api-reference/client"

      },
      {
        text: "LINE Pay",
        link: "https://line.me/en/pay"
      },
      {
        text: "LINE Developers",
        link: "https://developers.line.me/en/"
      },
      {
        text: "GitHub",
        link: "https://github.com/SombreroElGringo/line-pay-sdk-nodejs/"
      },
    ],
    sidebar: [
      {
        title: "Introduction",
        collapsable: false,
        children: [
          "",
        ]
      },  
      {
        title: "Getting Started",
        collapsable: false,
        children: [
          "/getting-started/requirements",
          "/getting-started/install",
          "/getting-started/basic-usage",
          "/getting-started/create-sandbox"
        ]
      },
      {
        title: "API Reference",
        collapsable: false,
        children: [
          "/api-reference/client",
          "/api-reference/middleware",
          "/api-reference/get-payment-details",
          "/api-reference/reserve-payment",
          "/api-reference/payment-confirm",
          "/api-reference/refund-payment",
          "/api-reference/get-authorization-details",
          "/api-reference/capture",
          "/api-reference/void-authorization",
          "/api-reference/preapproved-payment",
          "/api-reference/check-regkey-status",
          "/api-reference/expire-regkey"
        ]
      },
    ]
  }
}