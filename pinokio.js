const path = require('path')
const fs = require("fs")
const exists = (filepath) => {
  return new Promise(r=>fs.access(filepath, fs.constants.F_OK, e => r(!e)))
}
module.exports = {
//  start: async (kernel) => {
//    let installed = await exists(path.resolve(__dirname, "text-generation-webui"))
//    if (installed) {
//      return "start.json"
//    }
//  },
  menu: async (kernel) => {
    let menu = [{
      html: '<i class="fa-solid fa-microchip"></i> Install',
      href: "install.json"
    }]
    let installed = await exists(path.resolve(__dirname, "text-generation-webui"))
    if (installed) {
      menu.push({
        html: '<i class="fa-solid fa-rocket"></i> Start Chat mode',
        href: "chat.json"
      })
      menu.push({
        html: '<i class="fa-solid fa-rocket"></i> Start Basic mode',
        href: "basic.json"
      })
      menu.push({
        html: '<i class="fa-solid fa-rocket"></i> Start Notebook mode',
        href: "notebook.json"
      })
      menu.push({
        html: '<i class="fa-solid fa-rocket"></i> Start with custom flags',
        href: "custom.json"
      })
    }
    return menu
  }
}
