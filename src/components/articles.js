// Selectors
import {Input} from './selectors/Input.js';
import {Button} from "./selectors/Button.js";
import {Textarea} from "./selectors/Textarea.js";

const Articles = () => {
    const user = {
        name: "Alex",
        email: "alex.santos@digitalvalue.es"
    }

    return {
        view: (vnode) => {
            return m(".ui.container", {style: "margin-top: 2rem;"}, [
                m(".ui.form", [
                    m("h1.ui.h1", "Formulario de contacto"),
                    m(".two.fields", [
                        m(".field", m(Input, {user: user,  placeholder: "Nombre", type: "text"})),
                        m(".field", m(Input, {placeholder: "Apellidos"}))
                    ]),
                    m(".field", m(Input, {class: "ui input", placeholder: "Email"})),
                    m(".field", m(Textarea, {class: "ui textarea", placeholder: "Comentario", cols: 40, rows: 5})),
                    m(".field", m(Button, {class: "ui button", type: "submit", name: "Enviar"}))
                ])

            ])

        }
    }
}
export {Articles}