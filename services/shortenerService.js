'use strict'

const randomstring = require("randomstring")

let urls = []

function SaveShortUrl(u) {
    let random = randomstring.generate(5)
    urls.push({ url: u, short: random })
    return random
}

function GetMainUrl(s) {
    let main = urls.find(x => x.short === s)

    if (main) {
        return main.url
    }

    return null
}

module.exports = { SaveShortUrl, GetMainUrl }