const Textarea = () => {
    return {
        view: (vnode) => {
            console.log(vnode)
            return m("textarea", {placeholder: vnode.attrs.placeholder, cols: vnode.attrs.cols, rows: vnode.attrs.rows})
        }
    }
}

export {Textarea}