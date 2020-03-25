function LetsShort() {

    const mainUrl = document.getElementById("shorturl").value
    const url = {
        url: mainUrl
    }

    if (mainUrl) {
        document.getElementById("button").remove()
        document.getElementById("loading").removeAttribute("hidden")

        Request('POST', '/short', JSON.stringify(url)).then(short => {
            document.getElementById("loading").setAttribute("hidden", true)
            document.getElementById("shorted").innerText = `${location.href}${short}`
            document.getElementById("shorted").setAttribute("href", `${location.href}${short}`)
            document.getElementById("refresh").removeAttribute("hidden")
        }).catch(location.reload)
    }
}


function Request(meth, path, data) {
    return fetch(path, {
        method: meth,
        headers: { 'Content-Type': 'application/json' },
        body: data,
        credentials: 'same-origin'
    })
        .then(resp => {
            if (resp.status != 200) throw new Error(resp.statusText)
            return resp.text()
        })
}