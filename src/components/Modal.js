import { api_get } from "../data/utils.js";

const Modal = () => {
  let on = false;
  let movieDetail = null;
  return {
    view: (vnode) => {
      //   console.log(vnode);
      let movie = vnode.attrs.movie;
      return [
        m(
          ".ui.bottom.green.attached.button",
          {
            onclick: (event) => {
              api_get(
                `https://api.themoviedb.org/3/movie/${movie.id}?api_key=e57408e326e739e92dd69004e24bd6e6&language=en-US`
              )
                .then((detail) => {
                  movieDetail = detail;
                  console.log(movieDetail);
                })
                .catch((error) => console.log(error));
              on = !on;
            },
          },
          "More info"
        ),
        on
          ? m(
              ".ui.dimmer.modals.page.transition.visible.active",
              { style: "display: flex !important;" },
              m(
                ".ui.modal.transition.visible.active",
                {
                  onkeypress: (event) => {
                    if (event.code === "Enter" || event.code === "NumpadEnter")
                      on = false;
                  },
                },
                [
                  m("i.close.icon", { onclick: () => (on = false) }),
                  m(".header", movie.title),
                  m(
                    ".image.content",
                    m(
                      ".ui.massive.image",
                      movieDetail
                        ? m("img", {
                            src: `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movieDetail.poster_path}`,
                          })
                        : m("img", {
                            src:
                              "https://vignette.wikia.nocookie.net/diamondnoace/images/6/6d/No_image.png/revision/latest/scale-to-width-down/340?cb=20160808012100",
                          })
                    ),
                    movieDetail
                      ? m(".description", [
                          m("h3", movieDetail.tagline),
                          m("p", movieDetail.release_date),
                          m("p", movieDetail.overview),
                        ])
                      : m(".description", { style: "width: 100%;" }, [
                          m(
                            ".ui.active.inverted.dimmer",
                            m(".ui.small.text.loader", "Loading...")
                          ),
                          m("p"),
                          m("p"),
                        ])
                  ),

                  m(
                    ".actions.right.aligned",
                    m(
                      ".ui.blue.button",
                      { onclick: () => (on = false) },
                      "Aceptar"
                    )
                  ),
                ]
              )
            )
          : null,
      ];
    },
  };
};

export { Modal };
