const fs = require('fs')
const path = require('path')
const dist = path.join(__dirname, 'dist')
const indexPath = path.join(__dirname, 'dist/index.html')
const distScriptPath = path.join(__dirname, 'dist/scripts')
const distStaticPath = path.join(__dirname, 'dist/static')
const outPath = path.join(__dirname, 'hexo-theme')
const layoutPath = path.join(__dirname, 'hexo-theme/layout')
const scriptsPath = path.join(__dirname, 'hexo-theme/scripts')
const sourcePath = path.join(__dirname, 'hexo-theme/source')
const themePath = path.join(__dirname, 'theme')
const sourceStaticPath = path.join(__dirname, 'hexo-theme/source/static')

function deleteFolder(path) {
    let files = []
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path)
        files.forEach(function (file, index) {
            let curPath = path + '/' + file
            if (fs.statSync(curPath).isDirectory()) {
                deleteFolder(curPath)
            } else {
                fs.unlinkSync(curPath)
            }
        })
        fs.rmdirSync(path)
    }
}

const copyFile = function (srcPath, tarPath, cb) {
    var rs = fs.createReadStream(srcPath)
    rs.on('error', function (err) {
        if (err) {
            console.log('read error', srcPath)
        }
        cb && cb(err)
    })

    var ws = fs.createWriteStream(tarPath)
    ws.on('error', function (err) {
        if (err) {
            console.log('write error', tarPath)
        }
        cb && cb(err)
    })
    ws.on('close', function (ex) {
        cb && cb(ex)
    })

    rs.pipe(ws)
}

const copyFolder = function (srcDir, tarDir, cb) {
    fs.readdir(srcDir, function (err, files) {
        var count = 0
        var checkEnd = function () {
            ++count == files.length && cb && cb()
        }

        if (err) {
            checkEnd()
            return
        }

        files.forEach(function (file) {
            var srcPath = path.join(srcDir, file)
            var tarPath = path.join(tarDir, file)

            fs.stat(srcPath, function (err, stats) {
                if (stats.isDirectory()) {
                    fs.mkdir(tarPath, function (err) {
                        if (err) {
                            console.log(err)
                            return
                        }

                        copyFolder(srcPath, tarPath, checkEnd)
                    })
                } else {
                    copyFile(srcPath, tarPath, checkEnd)
                }
            })
        })

        //为空时直接回调
        files.length === 0 && cb && cb()
    })
}

if (fs.existsSync(outPath)) {
    deleteFolder(outPath)
}
fs.mkdirSync(outPath)
fs.mkdirSync(layoutPath)
fs.mkdirSync(scriptsPath)
fs.mkdirSync(sourcePath)

copyFolder(distScriptPath, scriptsPath)
copyFolder(themePath, outPath)
fs.mkdirSync(sourceStaticPath)
copyFolder(distStaticPath, sourceStaticPath)

const indexContent = fs.readFileSync(indexPath)
const content = String(indexContent)
fs.writeFileSync(path.join(layoutPath, `index.ejs`), content, 'utf-8')
