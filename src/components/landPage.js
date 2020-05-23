// Datos
import {api_get} from "../data/utils.js";


const LandPage = () => {
    let movies = [];

    return {
        oninit: async (vnode) => {
            let response = await api_get("https://api.themoviedb.org/3/movie/popular?api_key=e57408e326e739e92dd69004e24bd6e6&language=en-US&page=1")
            movies = response.results;
            console.log(movies)
            return movies;
        },
        view: (vnode) => {
            return m(".ui.container", m("h1.ui.h1", "infoMovie"), [
                m(".ui.four.doubling.cards",
                    movies.map(movie => {
                        return m(".card", [
                            m(".image", m("img", {src: `https://image.tmdb.org/t/p/w200/${movie.poster_path}`})),
                            m(".content", [
                                m(".header", movie.title),
                                m(".description", movie.overview),
                            ]),
                                m(".ui.bottom.attached.button", "More info")
                        ])

                        // m(".card",
                        //     m(".image", m("img", {src: `https://image.tmdb.org/t/p/w200/${movie.poster_path}`})),
                        //     m(".content", [
                        //         m(".header", movie.title),
                        //         m(".description", movie.overview)
                        //     ])
                        // )])
                    })
                )]
            )
        }
    }
}

export {LandPage}