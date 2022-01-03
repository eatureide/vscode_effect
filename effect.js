var timeout = null

function effect(target) {
    var parent = document.getElementsByClassName(target)

    function mouseIn(ev) {
        var oldMask = this.getElementsByClassName('borderLayer')
        var mask = document.createElement('div')
        var maskChild = document.createElement('div')

        var x = ev.pageX
        var y = ev.pageY
        var bounding = this.getBoundingClientRect()

        if (!oldMask.length) {
            maskChild.setAttribute('class', 'borderChild')
            mask.setAttribute('class', 'borderLayer')
            mask.appendChild(maskChild)
            this.appendChild(mask)
        }
        
        oldMask[0].style.webkitMaskPosition = `${x - bounding.x - 90}px ${y - bounding.y - 90}px`
    }

    Array.from(parent).forEach((item) => {
        item.removeEventListener('mousemove', mouseIn)
        item.addEventListener('mousemove', mouseIn)
    })
}

function observerMenu(targetNode) {
    var config = { childList: true, subtree: true }
    var observer = new MutationObserver(() => {
        console.log('监听到改变，重新运行')
        effect('monaco-list-row')
    })
    observer.observe(targetNode, config)
}

timeout = setInterval(() => {
    var targetNode = document.getElementById('workbench.view.explorer')
    if (targetNode) {
        clearInterval(timeout)
        effect('monaco-list-row')
        observerMenu(targetNode)
    }
}, 1000)
