class DelayLoaderComponent extends HTMLElement {
    constructor() {
        super()
        this.delay = this.getAttribute('delay') || 100
        this.color = this.getAttribute('color')
        this.src = this.getAttribute('src')
        const shadow = this.attachShadow({mode:'open'})
        this.img = document.createElement('img')
        shadow.appendChild(img)
        this.delayLoader = new DelayLoader()
        if(this.delay == 0) {
            this.delay = 100
        }
    }
    render() {
        const canvas = document.createElement('canvas')
        canvas.width = this.image.width
        canvas.height = this.image.height
        w = canvas.width
        h = canvas.height
        const context = canvas.getContext('2d')
        context.save()
        context.globalAlpha = 0.4
        context.drawImage(this.image,0,0)
        context.restore()
        this.delayLoader.draw(context,w/2,h/2,Math.min())
        this.img.src = canvas.toDataURL()

    }
    connectedCallback() {
        this.image = new Image()
        this.image.onload = () =>{
            this.render()
            const interval = setInterval(()=>{
                this.delayLoader.update()
                if(this.delayLoader.stopped()  == true) {
                    clearInterval(interval)
                }
            },this.delay/36)
        }
    }
}
class DelayLoader {
    constructor() {
        this.value = 0
        this.stopped = false
    }
    draw(context,x,y,r,color) {
        context.strokeStyle = color
        context.save()
        context.translate(x,y)
        context.beginPath()
        for(var i=this.value;i<=360;i++) {
            const x = r*Math.cos(i*Math.PI/180),y = r*Math.sin(i*Math.PI/180)
            if(i == this.value) {
                context.moveTo(x,y)
            }
            else {
                context.lineTo(x,y)
            }
        }
        context.stroke()
        context.restore()
    }
    update() {
        this.value += 10
        if(this.value >= 360) {
            this.stopped = true
        }
    }
    stopped() {
        return this.stopped
    }
}
customElements.define('delay-loader',DelayLoaderComponent)
