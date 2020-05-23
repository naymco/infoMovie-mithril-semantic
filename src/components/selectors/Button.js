
const Button = ()=>{
    return {
        view: (vnode)=>{
            // console.log(vnode)
            return m("button", { class: vnode.attrs.class}, `${vnode.attrs.name}`)
        }
    }
}

export { Button }