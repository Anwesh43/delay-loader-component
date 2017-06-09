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
