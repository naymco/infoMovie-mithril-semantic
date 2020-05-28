const Input = () => {
    return {
        view: (vnode) => {
             // console.log(vnode)
            return m("div", {class: vnode.attrs.class}, m("input", {
                user: vnode.attrs.user,
                type: vnode.attrs.type,
                placeholder: vnode.attrs.placeholder,
                cols: vnode.attrs.cols,
                rows: vnode.attrs.rows,
                onclick: vnode.attrs.onclick,
                oninput: vnode.attrs.oninput
            }))
        }
    }
}

export {Input}