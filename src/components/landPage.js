// Datos
import {api_get, Icono} from "../data/utils.js";


const LandPage = () => {
    let movies = [];
    let page = 1;
    let data = []

    let load = async () => {
        data = await api_get(`https://api.themoviedb.org/3/movie/popular?api_key=e57408e326e739e92dd69004e24bd6e6&language=en-US&page=${page}`);
        console.log(data.results)
        movies = data.results
        return movies;
    }

    return {
        oninit: async (vnode) => {
            load();
        },
        view: (vnode) => {
            console.log(data)
            return m(".ui.container", m("h1.ui.h1", "infoMovie"), [
                    m(".ui.four.doubling.cards",
                        movies.map(movie => {
                            return m(".card", [
                                m(".image", m("img", {src: `https://image.tmdb.org/t/p/w200/${movie.poster_path}`})),
                                m(".content", [
                                    m(".header", movie.title),
                                    m(".description", movie.overview),
                                ]),
                                m(".ui.bottom.green.attached.button", "More info")
                            ])
                        })
                    )],
                // Paginación a partir de aquí.
                m(".ui.label", data.total_pages),
                m(".ui.label",{
                    style: "margin: 20px;",
                }, page),
                page > 1 ? m("a.ui.red.button", {
                    onclick: () => {
                        page--;
                        load();
                    }
                }, m("i.icon.arrow.left"), ` ${page-1} :Anterior`) : null,
                data.total_pages > 20 * page ? m("a.ui.green.button", {
                    onclick: () => {
                        page++;
                        console.log(page)
                        load();
                    }
                }, m(`i.icon.arrow.right`), ` Siguiente: ${page+1}`) : null
            )
        }
    }
}

export {LandPage}