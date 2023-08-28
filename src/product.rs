use indexmap::{
    IndexMap,
};
use rocket::{
    State,
    tokio::io::AsyncReadExt,
    response::Responder,
    request::Request,
    fs::NamedFile,
};
use crate::{
    Config,
    page,
};
use chrono::naive::NaiveDateTime;
use maud::{html, Markup};

#[derive(Clone, Debug)]
pub struct Product<'a> {
    pub title: &'a str,
    pub desc_text: &'a str,
    pub desc_markup: Option<Markup>,
    pub release_streams: IndexMap<&'a str, ReleaseStream<'a>>,
    pub last_update: NaiveDateTime
}

#[derive(Clone, Debug)]
pub struct ReleaseStream<'a> {
    pub title: &'a str,
    pub releases: Releases<'a>,
}

#[derive(Clone, Debug)]
pub enum Releases<'a> {
    Web(IndexMap<&'a str, WebRelease<'a>>),
    Download(IndexMap<&'a str, DownloadRelease<'a>>),
}

#[derive(Clone, Debug)]
pub struct WebRelease<'a> {
    pub body: &'a str,
}

#[derive(Clone, Debug)]
pub struct DownloadRelease<'a> {
    pub path: &'a str,
}

pub fn browse_page(config: &State<Config>, title: &str, category_title: &str, category: &str, products: &IndexMap<&str, Product>) -> Markup {
    page(config, title, format!("Browse {} on Clayton Does Things", category_title.to_ascii_lowercase()).as_str(), format!("/{}", category).as_str(), Some(format!("/{}", category).as_str()), html! {
        h1 { b { u { (category_title) } } }
        ul id="product-list" {
            @for (product_id, product) in products.iter() {
                li {
                    h2 class="product-list-title" { a href=(format!("{}/{}/{}", config.domain, category, product_id)) { (product.title) } }
                    div class="product-list-quicklinks" {
                        @for (stream_id, stream) in &product.release_streams {
                            a href=(format!("/{}/{}/{}", category, product_id, stream_id)) { (stream.title) }
                        }
                    }
                }
            }
        }
    })
}

pub fn product_page(config: &State<Config>, title_affix: &str, category: &str, product_id: &str, product: &Product) -> Markup {
    page(
        config,
        format!("{}{}", product.title, title_affix).as_str(),
        product.desc_text,
        format!("/{}/{}", category, product_id).as_str(),
        Some(format!("/{}", category).as_str()),
    html!{
        h1 { b { u { (product.title) } } }
        div {
            @match product.desc_markup.clone() {
                Some(desc_markup) => {
                    (desc_markup)
                },
                None => {
                    p { (product.desc_text) }
                },
            }
        }
        
        hr;

        h2 { u { "Releases" } }
        @for (stream_id, release_stream) in &product.release_streams {
            h3 { a href=(format!("/{}/{}/{}", category, product_id, stream_id)) { (release_stream.title) } }
            @match &release_stream.releases {
                Releases::Web(releases) => {
                    @for (release_id, _) in releases {
                        p { a href=(format!("/{}/{}/{}/{}", category, product_id, stream_id, release_id)) { (release_id) } }
                    }
                },
                Releases::Download(releases) => {
                    @for (release_id, _) in releases {
                        p { a href=(format!("/{}/{}/{}/{}", category, product_id, stream_id, release_id)) { (release_id) } }
                    }
                }
            }
        }
    })
}

pub enum ReleasePageResponse {
    Markup(Markup),
    NamedFile(NamedFile),
}

impl<'r> Responder<'r, 'r> for ReleasePageResponse {
    fn respond_to(self, request: &Request) -> rocket::response::Result<'r> {
        match self {
            ReleasePageResponse::Markup(markup) => markup.respond_to(request),
            ReleasePageResponse::NamedFile(file) => {
                if let Some(file_name) = file.path().file_name() {
                    let file_name = file_name.to_string_lossy().to_string();
                    let mut response = file.respond_to(request)?;
                    response.set_raw_header("Content-Disposition", format!("attachment; filename=\"{}\"", file_name)); // check if this is a volnerability
                    Ok(response)
                } else {
                    file.respond_to(request)
                }
            }
        }
    }
}

pub async fn try_stream_page(config: &State<Config>, title_affix: &str, category: &str, product_id: &str, product: &Product<'_>, stream_id: &str) -> Option<ReleasePageResponse> {
    let stream = product.release_streams.get(stream_id)?;
    match &stream.releases {
        Releases::Web(releases) => {
            if releases.len() == 0 { return None }
            let (release_id, release) = releases.get_index(releases.len()-1)?;
            Some(ReleasePageResponse::Markup(try_release_web_page_render(config, title_affix, category, product_id, product, stream_id, stream, release_id, release, false).await?))
        },
        Releases::Download(releases) => {
            if releases.len() == 0 { return None }
            let (_, release) = releases.get_index(releases.len()-1)?;
            Some(ReleasePageResponse::NamedFile(NamedFile::open(config.static_dir.join(release.path)).await.ok()?))
        }
    }
}

pub async fn try_release_page(config: &State<Config>, title_affix: &str, category: &str, product_id: &str, product: &Product<'_>, stream_id: &str, release_id: &str) -> Option<ReleasePageResponse> {
    let stream = product.release_streams.get(stream_id)?;
    match &stream.releases {
        Releases::Web(releases) => {
            let release = releases.get(release_id)?;
            Some(ReleasePageResponse::Markup(try_release_web_page_render(config, title_affix, category, product_id, product, stream_id, stream, release_id, release, true).await?))
        },
        Releases::Download(releases) => {
            let release = releases.get(release_id)?;
            Some(ReleasePageResponse::NamedFile(NamedFile::open(config.static_dir.join(release.path)).await.ok()?))
        }
    }
}

async fn try_release_web_page_render(config: &State<Config>, title_affix: &str, category: &str, product_id: &str, product: &Product<'_>, stream_id: &str, stream: &ReleaseStream<'_>, release_id: &str, release: &WebRelease<'_>, specific_release: bool) -> Option<Markup> {
    let mut body = Vec::new();
    rocket::tokio::fs::File::open(config.static_dir.join(release.body)).await.ok()?.read_to_end(&mut body).await.ok()?;
    Some(page(
        config,
        if specific_release {
            format!("{}[{} - {}]{}", product.title, stream.title, release_id, title_affix)
        } else {
            format!("{}[{}]{}", product.title, stream.title, title_affix)
        }.as_str(),
        product.desc_text,
        if specific_release {
            format!("/{}/{}/{}/{}", category, product_id, stream_id, release_id)
        } else {
            format!("/{}/{}/{}", category, product_id, stream_id)
        }.as_str(),
        Some(format!("/{}", category).as_ref()),
        html!{
            h1 { u { a href=(format!("/{}/{}", category, product_id)) { (product.title) } } }
            (maud::PreEscaped(String::from_utf8(body).ok()?))
        })
    )
}
