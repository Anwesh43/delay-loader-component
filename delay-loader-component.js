class DelayLoaderComponent extends HTMLElement {
    constructor() {
        super()
        this.delay = this.getAttribute('delay')
        this.color = this.getAttribute('color')
        this.src = this.getAttribute('src')
        const shadow = this.attachShadow({mode:'open'})
        this.img = document.createElement('img')
        shadow.appendChild(img)
    }
    render() {
        const canvas = document.createElement('canvas')
        canvas.width = this.image.width
        canvas.height = this.image.height
        const context = canvas.getContext('2d')
        context.save()
        context.globalAlpha = 0.4
        context.drawImage(this.image,0,0)
        context.restore()
        this.img.src = canvas.toDataURL()
    }
    connectedCallback() {
        this.image = new Image()
        this.image.onload = () =>{
            this.render()
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
