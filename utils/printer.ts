interface PrinterOptions {
    width?: string
    title?: string
    background?: string
    textColor?: string
    fontSize?: string
}
export default class Printer {
    constructor(component: HTMLElement, options?: PrinterOptions) {
        this._componenet = component
        this._option = options
    }
    private _componenet: HTMLElement | null
    private _option?: PrinterOptions

    print = (callback?: VoidFunction) => {
        try {
            if (this._componenet === null) throw new Error('component is null')
            let frame = document.createElement("iframe")
            frame.style.position = "absolute";
            frame.style.top = "-10000px";
            frame.style.width = this._option?.width ?? '2480px'
            const component = this._componenet
            const option = this._option

            frame.onload = () => {
                if (frame.contentWindow === null) throw new Error('component is null')
                for (let k = 0; k < document.head.children.length; k++) {
                    let el = document.head.children[k]
                    if (el.tagName === 'STYLE') {
                        frame.contentWindow.document.head.appendChild(el.cloneNode(true))
                    }
                }
                frame.contentWindow.document.body = document.createElement('body')
                frame.contentWindow.document.body.style.color = option?.textColor ?? 'black'
                frame.contentWindow.document.body.style.background = option?.background ?? 'white'
                frame.contentWindow.document.body.style.fontSize = option?.fontSize ?? '16px'

                const parent = document.createElement("div")
                parent.style.display = "flex"
                parent.style.justifyContent = "center"
                parent.appendChild(component.cloneNode(true))
                frame.contentWindow.document.body.style.width = '100%'
                frame.contentWindow.document.body.append(parent)

                setTimeout(() => {
                    const i = setInterval(() => {
                        const doc = (frame!.contentWindow!.document || frame!.contentDocument)
                        if (doc.readyState === 'complete') {
                            frame!.focus();
                            frame!.contentDocument!.title = option?.title ?? 'Printer'
                            frame!.contentWindow!.print();
                            frame!.parentNode!.removeChild(frame!);
                            clearInterval(i)
                            callback = callback ?? (() => { })
                            callback!()
                        }
                    }, 500);
                }, 1500)
                window.focus();
            }
            document.body.appendChild(frame);
        } catch (error) {
            console.log(error)
        }
    }
}