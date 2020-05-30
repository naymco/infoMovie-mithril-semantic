// Datos
import { api_get } from "../data/utils.js";
// Selectors
import { Input } from "./selectors/Input.js";

// Components
import { Modal } from "./Modal.js";

const LandPage = () => {
  let movies = [];
  let page = 1;
  let data = [];

  let load = async () => {
    data = await api_get(
      `https://api.themoviedb.org/3/movie/popular?api_key=e57408e326e739e92dd69004e24bd6e6&language=en-US&page=${page}`
    );
    // console.log(data.results)
    movies = data.results;
    return movies;
  };

  let search = () => {};

  let valueSearch = null;
  let listado = [];
  let movieDetail = null;
  let on = false;

  return {
    oninit: async (vnode) => {
      load();
    },
    view: (vnode) => {
      // console.log(data)
      return m(".ui.container", m("h1.ui.h1", "infoMovie"), [
        m(
          "form.ui.form",
          { style: "margin: 20px 0;" },
          m(Input, {
            oninput: (event) => {
              valueSearch = event.target.value;
              // console.log(event)
              if (valueSearch.length > 0) {
                // console.log(valueSearch);
                api_get(
                  `https://api.themoviedb.org/3/search/multi?api_key=e57408e326e739e92dd69004e24bd6e6&language=en-US&query=${event.target.value}&page=1&include_adult=false`
                )
                  .then((res) => {
                    listado = res.results;
                    // console.log(listado);
                  })
                  .catch((error) => console.log(error));
              }
            },
            type: "search",
            placeholder: "Search...",
            class: "field",
          })
        ),
        listado.length > 0
          ? m(
              ".ui.four.doubling.cards",
              listado.map((result) => {
                return m(".card", [
                  result.poster_path
                    ? m(
                        ".image",
                        m("img", {
                          src: `https://image.tmdb.org/t/p/w200/${result.poster_path}`,
                        })
                      )
                    : m(
                        ".image",
                        m("img", {
                          src:
                            "https://vignette.wikia.nocookie.net/diamondnoace/images/6/6d/No_image.png/revision/latest/scale-to-width-down/340?cb=20160808012100",
                        })
                      ),

                  m(".content", [
                    result.title
                      ? m(".header", result.title)
                      : m(".header", result.name || "No results found"),
                    result.overview
                      ? m(".description", result.overview)
                      : m(
                          ".description",
                          "We have not found any results on this film."
                        ),
                  ]),

                  m(Modal, { movie: result }),
                ]);
              })
            )
          : m(
              ".ui.four.doubling.cards",
              movies.map((movie) => {
                // console.log(movie);
                // console.log(movies);
                return m(".card", [
                  m(
                    ".image",
                    m("img", {
                      src: `https://image.tmdb.org/t/p/w200/${movie.poster_path}`,
                    })
                  ),
                  m(".content", [
                    m(".header", movie.title),
                    m(".description", movie.overview),
                  ]),
                  m(Modal, { movie: movie }),
                ]);
              })
            ),
        // Paginación a partir de aquí.
        listado.length < 1
          ? m(
              ".ui.container",
              m(".ui.label", `Páginas totales: ${data.total_pages}`),
              m(
                ".ui.label",
                {
                  style: "margin: 20px;",
                },
                `Página: ${page}`
              ),
              page > 1
                ? m(
                    "a.ui.red.button",
                    {
                      href: `./index.html#!/${page - 1}`,
                      onclick: () => {
                        page--;
                        load();
                        window.scrollTo({ top: 0, behavior: "smooth" }); // efecto muy interesante
                      },
                    },
                    m("i.icon.arrow.left"),
                    ` ${page - 1} :Anterior`
                  )
                : null,
              data.total_pages > 20 * page
                ? m(
                    "a.ui.green.button",
                    {
                      href: `./index.html#!/${page + 1}`,
                      onclick: () => {
                        page++;
                        load();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      },
                    },
                    m(`i.icon.arrow.right`),
                    ` Siguiente: ${page + 1}`
                  )
                : null
            )
          : null,
      ]);
    },
  };
};

export { LandPage };
