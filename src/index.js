// Components
import { Articles } from "./components/articles.js";
import { LandPage} from "./components/landPage.js";


const Routes = () => {
    return {
        view: (vnode) => {
            return m(".ui.container", m("nav.ui.inverted.stackable.eight.item.menu", [

                    m(m.route.Link, {
                        selector: "a.item",
                        options: {replace: true},
                        href: "/blog",
                        style: "padding: 2rem"
                    }, "Blog"),

                    m(m.route.Link, {
                        selector: "a.item",
                        options: {replace: true},
                        href: "/contacto",
                        style: "padding: 2rem; "
                    }, "Contacto"),

                    m("a.item", {href: "./index.html#!/", style: "padding: 2rem"}, "Atrás")
                ]))

        }
    }
}

const Menu = () => {
    return {
        view: (vnode) => {
            return m(".layout", [
                m("header.inverted", {style: "background-color: #1b1c1d; padding: 3rem, 0rem;  position: relative; "}, [
                    m(".ui.container", m("h1.ui.header.inverted", { style: "padding: 10px; margin: 0; "}, "AlexBlog")),
                    m(Routes),

                ])
            ], m("main", vnode.children.map(child => {
                console.log(vnode)
                return m(child, vnode.attrs)
            })))
        }
    }
}

let root = document.body

m.route(root, "/", {
    "/": {
        view: (vnode) => {
            return m(Menu, LandPage )
        }
    },
    "/contacto": {
        view: (vnode) => {
            return m(Menu, Articles)
        }
    }
})

// m.render(document.body, "hello world");