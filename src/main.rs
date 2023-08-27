#[macro_use] extern crate rocket;
use rocket::{
    State,
    fs::{
        NamedFile,
        FileServer,
    }
};
use maud::{html, Markup, PreEscaped};
use clayton_xyz::*;
use chrono::naive::NaiveDateTime;
use indexmap::IndexMap;

#[get("/robots.txt")]
fn robotstxt(config: &State<Config>) -> String {
    format!("User-agent: *\nAllow: /\nSitemap: {}/sitemap.xml", config.domain)
}

#[get("/favicon.ico")]
async fn favicon() -> Option<NamedFile> {
    NamedFile::open("./s/favicon.ico").await.ok()
}

#[derive(Responder)]
#[response(content_type="xml")]
pub struct Sitemap(Markup);

#[get("/sitemap.xml")]
fn sitemap(config: &State<Config>) -> Sitemap {
    let url = |path: &str, lastmod: Option<NaiveDateTime>, changefreq: &str, priority: &str| -> Markup {
        html! {
            url {
                loc {(config.domain)(path)}
                @match lastmod { Some(lastmod) => {lastmod {(lastmod.format("%Y-%m-%d"))}} None => {} }
                changefreq {(changefreq)}
                priority {(priority)}
            }
        }
    };

    let product_category = |category_path: &str, products: &IndexMap<&str, product::Product>| -> Markup {
        html!{
            (url(category_path, None, "daily", "0.9"))
            @for (product_id, product) in products.iter() {
                (url(
                    format!("{}/{}", category_path, product_id).as_str(),
                    Some(product.last_update),
                    "monthly",
                    "0.8"
                ))
                @for (stream_id, stream) in &product.release_streams {
                    (url(
                        format!("{}/{}/{}", category_path, product_id, stream_id).as_str(),
                        Some(product.last_update),
                        "monthly",
                        "0.7"
                    ))
                    @match &stream.releases {
                        product::Releases::Web(stream) => {
                            @for (release_id, _) in stream {
                                (url(
                                    format!("{}/{}/{}/{}", category_path, product_id, stream_id, release_id).as_str(),
                                    Some(product.last_update),
                                    "monthly",
                                    "0.6"
                                ))
                            }
                        },
                        product::Releases::Download(stream) => {
                            @for (release_id, _) in stream {
                                (url(
                                    format!("{}/{}/{}/{}", category_path, product_id, stream_id, release_id).as_str(),
                                    Some(product.last_update),
                                    "monthly",
                                    "0.6"
                                ))
                            }
                        }
                    }
                }
            }
        }
    };

    Sitemap(html!{
        (PreEscaped(r#"<?xml version="1.0" encoding="UTF-8"?>"#))
        urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" {
            (url("/", None, "daily", "1"))
            (product_category("/games", &GAMES))
            (product_category("/software", &SOFTWARE))
            (url("/blog", None, "daily", "0.9"))
            @for (post_id, post) in blog::POSTS.iter() {
                (url(
                    format!("/blog/{}", post_id).as_str(),
                    post.last_update,
                    "monthly",
                    "0.8"
                ))
            }
        }
    })
}

#[get("/")]
fn index(config: &State<Config>) -> Markup {
    page(config, "Home | Clayton Does Things", "Homepage of Clayton Does Things", "/", Some("/"), html! {
        h1 { b { u { "Home" } } }
        p { "Welcome to the homepage of Clayton Does Things!" }
    })
}

#[get("/games")]
fn games(config: &State<Config>) -> Markup {
    product::browse_page(config, "Games | Clayton Does Things", "Games", "games", &GAMES)
}

#[get("/games/<product_id>")]
fn game_page(config: &State<Config>, product_id: &str) -> Option<Markup> {
    Some(product::product_page(config, " | Games - Clayton Does Things", "games", product_id, GAMES.get(product_id)?))
}

#[get("/games/<product_id>/<stream_id>")]
async fn game_stream_page(config: &State<Config>, product_id: &str, stream_id: &str) -> Option<product::ReleasePageResponse> {
    product::try_stream_page(config, " | Games - Clayton Does Things", "games", product_id, GAMES.get(product_id)?, stream_id).await
}

#[get("/games/<product_id>/<stream_id>/<release_id>")]
async fn game_release_page(config: &State<Config>, product_id: &str, stream_id: &str, release_id: &str) -> Option<product::ReleasePageResponse> {
    product::try_release_page(config, " | Games - Clayton Does Things", "games", product_id, GAMES.get(product_id)?, stream_id, release_id).await
}

#[get("/software")]
fn software(config: &State<Config>) -> Markup {
    product::browse_page(config, "Software | Clayton Does Things", "Software", "software", &SOFTWARE)
}

#[get("/software/<product_id>")]
fn software_page(config: &State<Config>, product_id: &str) -> Option<Markup> {
    Some(product::product_page(config, " | Software - Clayton Does Things", "software", product_id, SOFTWARE.get(product_id)?))
}

#[get("/software/<product_id>/<stream_id>")]
async fn software_stream_page(config: &State<Config>, product_id: &str, stream_id: &str) -> Option<product::ReleasePageResponse> {
    product::try_stream_page(config, " | Software - Clayton Does Things", "software", product_id, SOFTWARE.get(product_id)?, stream_id).await
}

#[get("/software/<product_id>/<stream_id>/<release_id>")]
async fn software_release_page(config: &State<Config>, product_id: &str, stream_id: &str, release_id: &str) -> Option<product::ReleasePageResponse> {
    product::try_release_page(config, " | Software - Clayton Does Things", "software", product_id, SOFTWARE.get(product_id)?, stream_id, release_id).await
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![
            index,
            robotstxt,
            favicon,
            sitemap,
            games,
            game_page,
            game_stream_page,
            game_release_page,
            software,
            software_page,
            software_stream_page,
            software_release_page,
            blog::blog,
            blog::blog_post,
            // accounts::auth_page,
            // accounts::signup,
        ])
        .mount("/s", FileServer::from("./s")) // would be nice to make  this cached
        .mount("/", LEGACY_REDIRECTS.as_routes())
        .manage(Config {
            domain: dotenv::var("DOMAIN").unwrap(),
        })
}