const path = require('path')
const decompress = require('decompress');
const os = require('os')
const fs = require('fs')
const fetch = require('cross-fetch')
class Oobabooga {
  async download(req, ondata, kernel) {
    let platform = os.platform()
    let download_url
    if (platform === 'darwin') {
      download_url = "https://github.com/oobabooga/text-generation-webui/releases/download/installers/oobabooga_macos.zip"
    } else if (platform === 'win32') {
      download_url = "https://github.com/oobabooga/text-generation-webui/releases/download/installers/oobabooga_windows.zip"
    } else if (platform === 'linux') {
      download_url = "https://github.com/oobabooga/text-generation-webui/releases/download/installers/oobabooga_linux.zip"
    }

    // download
    const download_path = path.resolve(req.cwd, "installer.zip")
    const response = await fetch(download_url)
    const fileStream = fs.createWriteStream(download_path)
    ondata({ raw: `\r\nDownloading ${download_url}` })
    await new Promise((resolve, reject) => {
      response.body.pipe(fileStream);
      response.body.on("error", (err) => {
        reject(err);
      });
      fileStream.on("close", function() {
        resolve();
      });
    });

    // unzip
    ondata({ raw: `\r\nDecompressing ${download_path}` })
    const p = path.resolve(req.cwd, "text-generation-webui")
    await decompress(download_path, p, { strip: 1})

    // patch
    ondata({ raw: `\r\nPatching webui.py` })
    const src = path.resolve(__dirname, "webui.py")
    const dest = path.resolve(__dirname, "text-generation-webui", "webui.py")
    await fs.promises.cp(src, dest)

  }
  async patch(req, ondata, kernel) {
    ondata({ raw: `\r\nPatching webui.py` })
    const src = path.resolve(__dirname, "webui.py")
    const dest = path.resolve(__dirname, "text-generation-webui", "webui.py")
    await fs.promises.cp(src, dest)
  }
  async update_flags(req, ondata, kernel) {
    // if the requested flag exists, don't add.
    // but if not, add

    /*
      req.params := {
        add: "--notebook",
        remove: "--chat"
      }
    */
    const filename = path.resolve(__dirname, "text-generation-webui", "CMD_FLAGS.txt")
    let existing = await fs.promises.readFile(filename, "utf8").catch((e) => { console.log(e) })
    if (existing && existing.length > 0) {
      let existingChunks = existing.split(/\s+/)

      // remove
      let remove_chunks= req.params.remove.split(" ")
      let toRemove = []
      for(let chunk of remove_chunks) {
        let index = existingChunks.indexOf(chunk)
        if (index !== -1) {
          existingChunks.splice(index, 1);
        }
      }

      // add
      let add_chunks = req.params.add.split(" ")
      let toInclude = []
      for(let chunk of add_chunks) {
        if (!existingChunks.includes(chunk)) {
          toInclude.push(chunk) 
        }
      }
      for(let chunk of toInclude) {
        existingChunks.push(chunk)
      }
      let updated = existingChunks.join(" ") 
      await fs.promises.writeFile(filename, updated)
    } else {
      await fs.promises.writeFile(filename, req.params.add)
    }
  }
}
module.exports = Oobabooga
