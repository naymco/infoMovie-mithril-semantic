// Datos
import { api_get } from "../data/utils.js";
// Selectors
import { Input } from "./selectors/Input.js";

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

  let valueSearch;
  let listado = [];
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
              // console.log(event)
              if (event.target.value.length > 0) {
                api_get(
                  `https://api.themoviedb.org/3/search/multi?api_key=e57408e326e739e92dd69004e24bd6e6&language=en-US&query=${event.target.value}&page=1&include_adult=false`
                )
                  .then((res) => {
                    listado = res.results;
                    console.log(listado);
                  })
                  .catch((error) => console.log(error));
              }
            },
            onclick: () => {},
            type: "search",
            placeholder: "Search...",
            class: "field",
          })
        ),
        m(
          ".ui.four.doubling.cards",
          listado.map((result) => {
            return m(".card", [
              result.poster_path
                ? m("img", {
                    src: `https://image.tmdb.org/t/p/w200/${result.poster_path}`,
                  })
                : m("img", {
                    src:
                      "https://vignette.wikia.nocookie.net/diamondnoace/images/6/6d/No_image.png/revision/latest/scale-to-width-down/340?cb=20160808012100",
                    style: "height: 350px; width: 100%;",
                  }),
              m(".content", [
                m(".header", result.title),
                m(".description", result.overview),
              ]),
              m(".ui.bottom.green.attached.button", "More info"),
            ]);
          })
        ),
        m(
          ".ui.four.doubling.cards",
          movies.map((movie) => {
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
              m(".ui.bottom.green.attached.button", "More info"),
            ]);
          })
        ),
        // Paginación a partir de aquí.
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
          : null,
      ]);
    },
  };
};

export { LandPage };
