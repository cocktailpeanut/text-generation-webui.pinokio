const os = require('os')
const fs = require('fs')
const path = require("path")
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
  title: "Text generation webui",
  description: "A gradio web UI for running Large Language Models like LLaMA, llama.cpp, GPT-J, Pythia, OPT, and GALACTICA.",
  icon: "icon.png",
  menu: async (kernel) => {
    let installed = await exists(path.resolve(__dirname, "text-generation-webui"))
    let running = kernel.status("chat.json", __dirname) || kernel.status("basic.json", __dirname) || kernel.status("notebook.json", __dirname) || kernel.status("custom.json", __dirname)
    if (installed) {
      let session = (await kernel.loader.load(path.resolve(__dirname, "session.json"))).resolved
      return [{
        filter: () => { return running },
        html: "<i class='fa-solid fa-rocket'></i> Open Web UI",
        href: (session && session.url ? session.url : "http://127.0.0.1:7860"),
        target: "_blank"
      }, {
        when: "chat.json",
        on: "<i class='fa-solid fa-desktop'></i> Server",
        href: "chat.json?fullscreen=true"
      }, {
        when: "basic.json",
        on: "<i class='fa-solid fa-desktop'></i> Server",
        href: "basic.json?fullscreen=true"
      }, {
        when: "notebook.json",
        on: "<i class='fa-solid fa-desktop'></i> Server",
        href: "notebook.json?fullscreen=true"
      }, {
        when: "custom.json",
        on: "<i class='fa-solid fa-desktop'></i> Server",
        href: "custom.json?fullscreen=true"
      }, {
        when: "chat.json",
        on: "<i class='fa-solid fa-spin fa-circle-notch'></i> Running Chat Mode",
        type: "label",
      }, {
        filter: () => { return !running },
        html: "<i class='fa-solid fa-power-off'></i> Start Chat mode",
        href: "chat.json?fullscreen=true&run=true"
      }, {
        when: "basic.json",
        on: "<i class='fa-solid fa-spin fa-circle-notch'></i> Running Basic Mode",
        type: "label",
      }, {
        filter: () => { return !running },
        html: "<i class='fa-solid fa-power-off'></i> Start Basic Mode",
        href: "basic.json?fullscreen=true&run=true"
      }, {
        when: "notebook.json",
        on: "<i class='fa-solid fa-spin fa-circle-notch'></i> Running Notebook Mode",
        type: "label",
      }, {
        filter: () => { return !running },
        html: "<i class='fa-solid fa-power-off'></i> Start Notebook Mode",
        href: "notebook.json?fullscreen=true&run=true"
      }, {
        when: "custom.json",
        on: "<i class='fa-solid fa-spin fa-circle-notch'></i> Running with Custom Flags",
        type: "label",
      }, {
        filter: () => { return !running },
        html: "<i class='fa-solid fa-power-off'></i> Start with Custom Flags",
        href: "custom.json?fullscreen=true&run=true"
      }]
    } else {
      return [{
        html: '<i class="fa-solid fa-plug"></i> Install',
        type: "link",
        href: "install.json?run=true&fullscreen=true"
      }]
    }
  }
}
