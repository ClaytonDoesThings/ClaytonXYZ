use lazy_static::lazy_static;
use indexmap::{
    IndexMap,
    indexmap,
};
use rocket::{
    Route,
    Request,
    Data,
    route::Outcome,
    response::Redirect,
    http::Method,
    route::Handler,
};

pub struct LegacyRedirects<'a>(IndexMap<&'a str, &'a str>);

impl LegacyRedirects<'_> {
    pub fn as_routes(&self) -> Vec<Route> {
        let mut routes = Vec::new();
        for (i, (old, new)) in self.0.iter().enumerate() {
            let mut route = Route::new(Method::Get, old, PermanentRedirect {
                old: old.to_string(),
                to: new.to_string()
            });
            route.rank = i as isize-self.0.len() as isize-13;
            routes.push(route);
        }
        routes
    }
}

#[derive(Clone)]
struct PermanentRedirect {
    old: String,
    to: String,
}

#[rocket::async_trait]
impl Handler for PermanentRedirect {
    async fn handle<'r>(&self, req: &'r Request<'_>, data: Data<'r>) -> Outcome<'r> {
        if self.old == req.uri().to_string() {
            Outcome::from(req, Redirect::temporary(self.to.clone()))
        } else {
            Outcome::Forward(data)
        }
    }
}

lazy_static! {
    pub static ref LEGACY_REDIRECTS: LegacyRedirects<'static> = {
        LegacyRedirects(indexmap!{
            // From old sitemap
            "/w/home" => "/",
            "/w/games" => "/games",
            "/w/games/arc-2" => "/games/arc-2",
            "/w/games/arc-2/web/index.html" => "/games/arc-2/web-cdt",
            "/w/games/arc-2/web/index.html?version=v1.0.2-CDT" => "/games/arc-2/web-cdt/v1.0.2",
            "/w/games/arc-2/web/index.html?version=v1.0.2" => "/games/arc-2/web/v1.0.2",
            "/w/games/arc-plat" => "/games/arc-plat",
            "/w/games/arc-plat/web/index.html" => "/games/arc-plat/web",
            "/w/games/arc-plat/web/index.html?version=v1.1.2" => "/games/arc-plat/web/v1.1.2",
            "/w/games/arc-plat/web/index.html?version=v1.1.1" => "/games/arc-plat/web/v1.1.1",
            "/w/games/carai" => "/games/carai",
            "/w/games/carai/web/index.html" => "/games/carai/web",
            "/w/games/carai/web/index.html?version=v1.0.0" => "/games/carai/web/v1.0.0",
            "/w/games/carai/windows" => "/games/carai/windows",
            "/w/games/carai/windows?version=v1.0.0" => "/games/carai/windows/v1.0.0",
            "/w/games/carai/mac" => "/games/carai/mac",
            "/w/games/carai/mac?version=v1.0.0" => "/games/carai/mac/v1.0.0",
            "/w/games/carai/linux" => "/games/carai/linux",
            "/w/games/carai/linux?version=v1.0.0" => "/games/carai/linux/v1.0.0",
            "/w/games/demonic-conquest" => "/games/demonic-conquest",
            "/w/games/demonic-conquest/web/index.html" => "/games/demonic-conquest/web",
            "/w/games/demonic-conquest/web/index.html?version=v0.1" => "/games/demonic-conquest/web/v0.1",
            "/w/games/demonic-conquest/windows" => "/games/demonic-conquest/windows",
            "/w/games/demonic-conquest/windows?version=v0.1" => "/games/demonic-conquest/windows/v0.1",
            "/w/games/demonic-conquest/mac" => "/games/demonic-conquest/mac",
            "/w/games/demonic-conquest/mac?version=v0.1" => "/games/demonic-conquest/mac/v0.1",
            "/w/games/demonic-conquest/linux" => "/games/demonic-conquest/linux",
            "/w/games/demonic-conquest/linux?version=v0.1" => "/games/demonic-conquest/linux/v0.1",
            "/w/games/dig-it" => "/games/dig-it",
            "/w/games/dig-it/windows" => "/games/dig-it/windows",
            "/w/games/dig-it/windows?version=v1.2.2" => "/games/dig-it/windows/v1.2.2",
            "/w/games/russian-roulette" => "/games/russian-roulette",
            "/w/games/russian-roulette/web/index.html" => "/games/russian-roulette/web",
            "/w/games/russian-roulette/web/index.html?version=v1.1.0" => "/games/russian-roulette/web/v1.1.0",
            "/w/games/tetris" => "/games/tetris",
            "/w/games/tetris/web/index.html" => "/games/tetris/web",
            "/w/games/tetris/web/index.html?version=v1.0.0" => "/games/tetris/web/v1.0.0",
            "/w/games/the-giver-the-game" => "/games/the-giver-the-game",
            "/w/games/the-giver-the-game/web/index.html" => "/games/the-giver-the-game/web",
            "/w/games/the-giver-the-game/web/index.html?version=v1.0" => "/games/the-giver-the-game/web/v1.0",
            "/w/games/the-giver-the-game/linux64" => "/games/the-giver-the-game/linux64",
            "/w/games/the-giver-the-game/linux64?version=v1.0" => "/games/the-giver-the-game/linux64/v1.0",
            "/w/games/the-giver-the-game/windows32" => "/games/the-giver-the-game/windows32",
            "/w/games/the-giver-the-game/windows32?version=v1.0" => "/games/the-giver-the-game/windows32/v1.0",
            "/w/games/the-giver-the-game/windows64" => "/games/the-giver-the-game/windows64",
            "/w/games/the-giver-the-game/windows64?version=v1.0" => "/games/the-giver-the-game/windows64/v1.0",
            "/w/software" => "/software",
            "/w/software/calculator-the-game-cheats" => "/software/calculator-the-game-cheats",
            "/w/software/calculator-the-game-cheats/web/index.html" => "/software/calculator-the-game-cheats/web",
            "/w/software/calculator-the-game-cheats/web/index.html?version=v1.0" => "/software/calculator-the-game-cheats/web/v1.0",
            "/w/software/comcode-translator" => "/software/comcode-translator",
            "/w/software/comcode-translator/web/index.html" => "/software/comcode-translator/web",
            "/w/software/comcode-translator/web/index.html?version=v1.0.0" => "/software/comcode-translator/web/v1.0.0",
            "/w/software/legitimate-images-made-from-images" => "/software/legitimate-images-made-from-images",
            "/w/software/legitimate-images-made-from-images/web/index.html" => "/software/legitimate-images-made-from-images/web",
            "/w/software/legitimate-images-made-from-images/web/index.html?version=v1.0.0" => "/software/legitimate-images-made-from-images/web/v1.0.0",
            "/w/software/symbol-translator" => "/software/symbol-translator",
            "/w/software/symbol-translator/web/index.html" => "/software/symbol-translator/web",
            "/w/software/symbol-translator/web/index.html?version=v1.2.0" => "/software/symbol-translator/web/v1.2.0",
            "/w/software/symbol-translator/web/index.html?version=v1.1.2" => "/software/symbol-translator/web/v1.1.2",
            "/w/software/tessellation-creator" => "/software/tessellation-creator",
            "/w/software/tessellation-creator/web/index.html" => "/software/tessellation-creator/web",
            "/w/software/tessellation-creator/web/index.html?version=v1.0.0" => "/software/tessellation-creator/web/v1.0.0",
            "/w/software/word-search-cheats" => "/software/word-search-cheats",
            "/w/software/word-search-cheats/web/index.html" => "/software/word-search-cheats/web",
            "/w/software/word-search-cheats/web/index.html?version=v1.0.0" => "/software/word-search-cheats/web/v1.0.0",
            "/w/software/word-search-cheats-ocr" => "/software/word-search-cheats-ocr",
            "/w/software/word-search-cheats-ocr/web/index.html" => "/software/word-search-cheats-ocr/web",
            "/w/software/word-search-cheats-ocr/web/index.html?version=v1.0.0" => "/software/word-search-cheats-ocr/web/v1.0.0",
            
            // from legacy routes in old app.js
            "/games/othcXgpI9PNqBt3aY5AX" => "/games/arc-plat",
            "/games/2HbTB1akfOrcKvPc3klU" => "/games/arc-2",
            "/games/SrfvRpIl5K2dvoQyaRDr" => "/games/carai",
            "/games/cFCb44HSul7ydovmyqm0" => "/games/demonic-conquest",
            "/games/Zi1l6UGwnqyZhAEKkekH" => "/games/dig-it",
            "/games/ZmEAX6ahcJmtPne2cJT5" => "/games/russian-roulette",
            "/games/NoeJACBZ7L6GPyxaiV2o" => "/games/tetris",
            "/games/Kjwl3N49rt3JHO9wQumj" => "/games/the-giver-the-game",
            "/software/vb3kiylD5juse5xAelMQ" => "/software/calculator-the-game-cheats",
            "/software/ewwNONFTbeoPq607TgFc" => "/software/comcode-translator",
            "/software/B4cXi8BOIS3Tmu9kTH55" => "/software/legitimate-images-made-from-images",
            "/software/1Jv03Dpex8vMMdQDkmjH" => "/software/symbol-translator",
            "/software/tvyPtYy0lmITI5uv6uFx" => "/software/tessellation-creator",
            "/software/3kJxqfLU7XQoOE3GwfXs" => "/software/word-search-cheats",
            "/software/G2GFOL958ihQwP3Ds3X7" => "/software/word-search-cheats-ocr",

            // from alternate routes in old app.js
            "/w" => "/",
        })
    };
}