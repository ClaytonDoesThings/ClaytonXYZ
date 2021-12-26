use indexmap::indexmap;
use lazy_static::lazy_static;
use indexmap::IndexMap;
use chrono::naive::NaiveDateTime;
use maud::{
    Markup,
    html,
};
use rocket::{
    State,
    get,
};
use crate::*;

#[derive(Clone, Debug)]
pub struct Contributors<'a> {
    pub authors: &'a [&'a str],
}

#[derive(Clone, Debug)]
pub struct Post<'a> {
    pub title: &'a str,
    pub contributors: Contributors<'a>,
    pub published: NaiveDateTime,
    pub last_update: Option<NaiveDateTime>,
    pub description: &'a str,
    pub thumbnail_path: &'a str,
    pub thumbnail_alt: &'a str,
    pub content: Markup,
}

type Posts<'a> = IndexMap<&'a str, Post<'a>>;

#[get("/blog")]
pub fn blog(config: &State<Config>) -> Markup {
    page(config, "Blog | Clayton Does Things", "The official blog of Clayton Does Things.", "/blog", Some("/blog"), html! {
        h1 { u { b { "Blog" } } }
        ul id="blog-post-list" {
            @for (post_id, post) in POSTS.iter() {
                li { a href=(format!("/blog/{}", post_id)) {
                    h2 class="blog-post-list-title" { (post.title) }
                    p class="blog-post-list-description" { (post.description) }
                    img class="blog-post-list-img" src=(format!("{}{}", config.domain, post.thumbnail_path)) alt=(post.thumbnail_alt);
                    p class="blog-post-list-timestamps" {
                        "Published: " (post.published.format("%Y-%m-%d GMT"))
                        @if let Some(last_update) = post.last_update {
                            "; Updated: " (last_update.format("%Y-%m-%d GMT"))
                        }
                    }
                    p class="blog-post-list-authors" {
                        "Authors:"
                        @for author in post.contributors.authors {
                            " " (author)
                        }
                    }
                }}
            }
        }
    })
}

#[get("/blog/<post_id>")]
pub fn blog_post(config: &State<Config>, post_id: &str) -> Option<Markup> {
    let post = POSTS.get(post_id)?;
    Some(page(config, format!("{} | Blog - Clayton Does Things", post.title).as_str(), post.description, format!("/blog/{}", post_id).as_str(), Some("/blog"), html! {
        div id="blog-post" {
            h1 { u { (post.title) } }
            p id="blog-post-description" {
                (post.description)
            }
            p id="blog-post-meta" {
                "Published: " (post.published.format("%Y-%m-%d GMT"))
                @if let Some(last_update) = post.last_update {
                    "; Updated: " (last_update.format("%Y-%m-%d GMT"))
                }
                "; Authors:"
                @for author in post.contributors.authors {
                    " " (author)
                }
            }
            div id="blog-post-content" {
                (post.content)
            }
        }
    }))
}

lazy_static! {
    pub static ref POSTS: Posts<'static> = indexmap! {
        "how-should-bail-algorithms-be-used" => Post {
            title: "How Should Bail Algorithms Be Used",
            contributors: Contributors {
                authors: &[
                    "Clayton Hickey",
                ]
            },
            published: NaiveDateTime::from_timestamp(1625948861, 0),
            last_update: None,
            description: "Should bail algorithms be used today or in the future? Here's my stance. Written for Tech Roulette 2021, P4M3 - Justice Matrix",
            thumbnail_path: "/s/blog/how-should-bail-algorithms-be-used/judge-handing-computer-an-L.png",
            thumbnail_alt: "A judge handing a computer an L",
            content: html! {
                p {
                    "This article is written for the third module of "
                    a href="https://techroulette.xyz/" target="_blank" { "Tech Roulette" }
                    "  2021, Justice Matrix - Project 4. In the last module, we looked at how I would design "
                    a href="https://claytondoesthings.xyz/blog/a-theoretical-algorithm-for-deciding-bail" { "a theoretical bail algorithm" }
                    ". In this post, we're going to look at how these bail algorithms should be used in courts, if at all."
                }
                h2 style="text-align: center" { "Pros and cons of bail algorithms" }
                div style="text-indent: 0; text-align: center" {
                    div style="width: 50%;display: inline-block;vertical-align: top;" {
                        h3 { "Pros" }
                        ul style="list-style: none;padding: 0;" { 
                            li { "Fast decisions" }
                            li { "Consistent" }
                        }
                    }
                    div style="width: 50%;display: inline-block;vertical-align: top;" {
                        h3 { "Cons" }
                        ul style="list-style: none;padding: 0;" {
                            li { "Biased" }
                            li { "Usually no better or worse than people" }
                            li { "Requires lots of data for any accuracy" }
                            li { "Often misused" }
                            li { "Often overpromised on accuracy" }
                        }
                    }
                }
                h2 { "My stance" }
                p {
                    "Both judges and bail algorithms are biased. From the sources provided, it seems that some people seem to believe that algorithms are less biased than people are. "
                    "Their only advantage is that they're consistent - even if they're consistently bad - and that they can give their answer faster and cheaper (after it's developed). "
                    "I don't think that bail algorithms should be completely abandoned because they're biased. As with any technology, they are getting better at what they do but clearly, "
                    "right now, they are not up to the task - at least by themselves. A judge is supposed to give a bail amount with as least bias as possible with the data they have. "
                    "A bail algorithm's estimate WITH the knowledge of how the bail algorithm was designed, behaves, and works could still be useful data to a judge in making their final "
                    "decision but should not be mandated in any way. For now, that is the only place I see for these algorithms. Otherwise, they should not be used until there's massive improvement."
                }
            },
        },
        "a-theoretical-algorithm-for-deciding-bail" => Post {
            title: "A Theoretical Algorithm for Deciding Bail",
            contributors: Contributors {
                authors: &[
                    "Clayton Hickey",
                ],
            },
            published: NaiveDateTime::from_timestamp(1625945810, 0),
            last_update: Some(NaiveDateTime::from_timestamp(1625958008, 0)),
            description: "A quick look into creating a computer algorithm for deciding bail for someone awaiting trial. Written for Tech Roulette 2021, P4M2 - Justice Matrix",
            thumbnail_path: "/s/blog/a-theoretical-algorithm-for-deciding-bail/computer-holding-freedom-random.png",
            thumbnail_alt: "Your freedom will cost 100 million dollars",
            content: html! {
                p {
                    "This article is written for the second module of "
                    a href="https://techroulette.xyz/" target="_blank" { "Tech Roulette" }
                    " 2021, Justice Matrix - Project 4. As stated in the module description, bail is decided by a judge based on the risk of them escaping, crime alleged, "
                    "and the "dangerousness" of them to others/community. "
                    "The goal in this article is going to be to assign values to go over how to assign values to each of those points and how to put them together into a final cash value. "
                    "This theoretical algorithm is going to attempt to be unbiased, but obviously, that is not something that is going to be successful as the processing for deciding bail is inherently biased."
                }
                h2 { "Weighing Crime Alleged" }
                p {
                    "For this algorithm, I'm going to make the crime alleged a multiplier that is applied to the final value. For when multiple crimes are alleged, their multipliers are added into one multipler. "
                    "A list of all possible charges and their associated multipliers would be supplied to calculate this. I imagine for crimes like murder (at least voluntary), "
                    "crimes relating to extreme dehabilitation or mental damage to others (like rape), and terrrorism that multiplier would be set at Infinity (would not actually be stored as infinity in practice - "
                    "probably an Rust-like enum) - meaning that no chance for bail is offered. If someone has been charged for the same crime in the past, "
                    "the multiplier for it is multiplied each time by another value set by the database for the specific crime. "
                    "Optionally, the multiplier for each crime alleged could also be multiplied by another algorithm (or user-supplied if that's allowed) "
                    "to estimate the chance the defendant actually committed the crime. This gets us out value of estimated_pressure."
                }
                h2 {
                    "Determining risk of escape"
                }
                p {
                    "In my mind, there are 3 types of escapes. Those where the defendant is found easily like after a week or two, "
                    "those where a search party and ongoing investigation must be conducted to find them but they are eventually found during the search (not given-up), "
                    "and those where the defendant is never found. Each of these will be calculated to a chance percentage to be used in the final calculations. "
                    "Defendants generally cannot escape effectively without the help of another person. So, in order to calculate these, "
                    "the algorithm will go through each of the person's connections and choose the connection who would give the highest value for each. For each connection, "
                    "their ability and willingness to help for each type of escape must be calculated (as percentages) and then averaged (for a more complex algorithm, groups may also be taken into account). "
                    "The ability for a connection to aid in each type of escape varies. For the most basic type, a common scenario I'd imagine would be to keep them in their home. "
                    "Factors that could go into whether one'd be able to do that could would be how much money they make in excess, how much time do they spend working, do they live with family, "
                    "do they live with a significant other, do they live with children, and do they have the ability to transport them w/o people seeing. "
                    "These factors could be run through another algorithm/sub-algorithm to determine the percentage. This same strategy for calculating ability would be applied for the other types of escapes. "
                    "For the second type of escape that requires an extended search, factors I'd think would be if they have other property not connected to their home they could hide them, "
                    "how big is that property, how easy is it to track that connection themselves, do they have the ability to move them around, and similar factors from the first one. "
                    "For the third where they're never found, factions I'd imagine include do they have connections with other governments, "
                    "do they have passports to other countries, do they have access to private air/sea travel, could they abandon their current livelihood with the amount of money they have, "
                    "and other factors from the previous. Willingness goes through the same process but has more concurrent factors like could this person forgive the alleged crimes, "
                    "are they family/friend/other, has this person commited similar crimes, does this person have a life/family that they wouldn't want to abandon. After this has been done, "
                    "we are left with 3 percentage point chances for each degree/type of escape's success. However, I want to go one step further and take into account the defendant's "
                    "willingness to escape for each degree. To do this, we take potential_years_free for each, add potential_years_sentenced, subtract potential_added_years_if_caught, "
                    "divide it all by estimated_years_to_live, and clamp it between 5 and 100% for the percentage chance of each degree. "
                    "The final variable I want to get out of this is a high bisaed estimate for how long they may escape cut by chance. "
                    "To do this we take the maximum of these three operations that convert each percentage into a duration (years): "
                    "chance_degreee_1*3weeks, chance_degree_2*8months, chance_degree_3*estimated_years_to_live. This gets us our value of estimated_years_escaped."
                }
                h2 { "Determining dangerousness" }
                p {
                    "Dangerousness is a hard thing to quantify but the unit I'm going to use in order to reach the final cash amount is about maximum damage per year. "
                    "We can ignore any cases where bail would be denied due to the crimes alleged. "
                    "I think a decent way to base this off of is potential_years_sentenced*estimated_damage_done_in_crimes_alleged*estimated_crazy_level. "
                    "This leaves one value for me to approximate here: estimated_crazy_level. "
                    "Essentially, this value is supposed to represent the number of damages a person would do in a year if put at maximum stress due to mental issues/disorders. "
                    "To calculate this, a similar process would be done like weighing crimes alleged where a table of mental disorders and their associated crazy-ness value is created "
                    "and the defendant's disorders are simply added up for the final value except for this, they're not added to 0, "
                    "they're added to a base number that would have to be determined to account for those without mental disorders. "
                    "All values would likely be determined by statistical analysis which may introduce biases (update: This method of calculation doesn't sit right with me and I think it's actually illegal so...). "
                    "However, with this, we get our value for estimated_amount_of_damages_per_year_free."
                }
                h2 { "Putting it together" }
                p {
                    "The final formula is pretty simple. We just multiply all of our values: algorithmic_bail = estimated_pressure * estimated_years_escaped * estimated_amount_of_damages_per_year_free. "
                    "Again, this is not expected to be a perfect algorithm devoid of biases, but it's the best I could come up with on a Saturday afternoon."
                }
            },
        },
        "recommendation-algorithms-and-ethics" => Post {
            title: "Recommendation Algorithms and Ethics",
            contributors: Contributors {
                authors: &[
                    "Clayton Hickey",
                ],
            },
            published: NaiveDateTime::from_timestamp(1625864028, 0),
            last_update: None,
            description: "A not-very-short not-very-source-heavy dive into recommendation algorithms and the ethical questions surrounding them. Written for Tech Roulette 2021, P4M1 - Justice Matrix",
            thumbnail_path: "/s/blog/recommendation-algorithms-and-ethics/youtube-handing-viewer-burning-baby.png",
            thumbnail_alt: "Youtube handing a viewer a burning baby",
            content: html! {
                p {
                    "Recommendation algorithms are only ever increasing in prevelance and complexity.Recommendation algorithms are used in nearly every mainstram application. "
                    "Examples include YouTube, Twitch, Etsy, Ebay, Amazon, TikTok, Instagram, Twitter, Netflix, Snapchat, Hulu, Disney Plus, Facebook, Google News, and MSN. "
                    "Being used in so many popular applications, it would almost be weird if someone with access to modern technology did not interact with these recomemendation algorithms every day. "
                    "Given that, I believe they are an important subject to analyze the ethics of. Keep note that what you are about to read is my opinion and is lacking sources. "
                    "This article is written for the first module of "
                    a href="https://techroulette.xyz/" target="_blank" { "Tech Roulette" }
                    " 2021, Justice Matrix - Project 4."
                }
                h2 { "The goal of recommendation algorithms" }
                p {
                    "The stated goal of recommendation algorithms shifts from industry to industry. However, one thing stays constant - they are built to maximize profits by maximizing user engagement. "
                    "I am not against the idea of companies trying to maximize their profits. "
                    "However, it is important to analyze the means by which they do it and the effects to ensure that it does not violate the rights of any person. "
                    "It is also important to analyze if eeking out those extra profits hurt other areas of the business."
                }
                h2 { "Respecting the user's time" }
                p {
                    "Recommendation algorithms for entertainment/social media are designed to serve the user the content that it thinks will keep the user engaged all the time - "
                    "they never "decide" to give the user content they think will cause them to log off. This makes it the user's decision for whether they should continue to use the platform or to log off. "
                    "This seems reasonable. Why should the platform decide whether it's best the user log off? They can make their own decisions, right? "
                    "Obviously, people aren't literally scrolling through TikTok until they die (I think). "
                    "At some point, outside factors like fatigue, personal needs, and growing boredom from the often reptitiveness generally get users to log off at some point. "
                    "However, I think another strong motivator is guilt. Everyone has goals for things that they want to accomplish in a day. "
                    "Spending as much time as they can on Facebook usually isn't one of those things. So, to those concious of the time they're wasting, they feel guilty for continuing to use it. "
                    "This leads to some treating quitting social media like quitting a bad addiction (because it can be). "
                    "It's important to note that the best recommendation algorithm that keeps users engaged for as long as possible (per session) isn't the one that always serves the best content. "
                    "It's the one that starves the user - giving them "blips" of satisfaction over time. "
                    "It makes the user feel that they're \"on a hunt\" for satisfaction and that if they scroll long enough, eventually, they will get \"the big one\" and can log off feeling entirely satisfied. "
                    "This strategy for engagement is not just from recommendation algorithms, but platforms generally makking the content users want harder to find - "
                    "like hiding posts or making them non-chronological from friends or subscriptions. "
                    "In doing this, platforms completely eliminate nearly all phycological benefit from the app that the user could have gotten. "
                    "The best-case scenario for keeping a user happy and productive is to serve them exactly what they want right from the start, the best of the best content. "
                    "They leave the app as soon as possible, feeling satisfied. Now, that would be great and I'm sure designers have realized that. "
                    "However, it comes at sacrifice. This approach leads to less engagement in the short term. "
                    "Many entertainment and social media apps are barely making a profit already and the space is very competitive. "
                    "Getting users to leave one's app when they're satisfied with what they got from it doesn't always mean that that user is then going to go do something else entirely. "
                    "Likely, they're going to go to another app. "
                    "That app may not follow the same practice and instead go for the more invasive approach of "starving" the user but that means more engagement for a competitor, "
                    "and less engagement for the more \"friendly one\" - until the user decides that the more invasive one is not worth visiting and drops it entirely. "
                    "This motivates companies looking purely at engagement for being more invasive because their engagement graphs, that likely do not accurately predict the future, show that it's more effective. "
                    "This leads me to think that this is an issue of an ad-based profit motive. When a business gets their money through advertisements, "
                    "it leads to a seemingly clear relationship of time engaged to money made. For a purely ad supported platform, it's true - in the short term, until users start to quit. "
                    "The time-based incentive needs to be dropped which means no advertisements within the app unless the company can restrain themselves from eeking out "
                    "the tiny profits they get from it by tweaking their recommendation algorithm to take more time from the user. "
                    "I think this could be done by developing a profit structure centered around rewarding the platform for gaining the user's respect. Doing that is harder to do, harder to maintain. "
                    "But, I think it would help to solve, or at least improve the relationship that social media platforms have with their users in respect to respecting their time."
                }
                h2 { "Respecting the user's money" }
                p {
                    "Recommendation algorithms for shopping platforms run into similar issues as ones for entertainment and social media. "
                    "Their main objective is to get the user to spend as much money as possible. This is a little less excusable than wasting the user's time (though, time is money - usually) but, "
                    "it comes with the same defense that the user should be able to limit themselves. It also has the same tactic - make things "
                    i { "just" }
                    " hard enough to find so that when they do find the thing they want, "
                    "they are willing to pay more as it makes it come across as more of a "special" or "unique" product due to it being on the second page of Amazon. "
                    "As a price-concious consumer, my goal is to spend as little money as possible for the best product and I'm generally looking for one specific thing. "
                    "This means that my goals and that of recommendation algorithm are more or less, not aligned. "
                    "But are my goals misaligned with the platform itself? Generally not, the platform should want my purchase no matter how much I spend (as long as it's not zero) - "
                    "they make more than enough margin for server upkeep. Amazon seems to think that no matter how annoying they make their shopping process, "
                    "that I'll continue to purchase from them - I won't. Their lack of proper filters, easy to find product information, "
                    "putting the reviews not at the bottom of a never-ending page isn't because they can't do it. They want the user to spend more time, spend more money per session. "
                    "Another issue arises when one looks at the topics of addictions. What people see when they first go to a store influences their decisions and what they're going to buy. "
                    "Say someone has been buying Oreos and icecream every time they've purchased from Amazon in the past 6 months. "
                    "Understandably, the recommendation algorithm would begin to recommend them Oreos and icecream as well as other related treats. "
                    "Recently, this person has noticed that they're quickly gaining weight and decide it's time to quit Oreos and icecream. "
                    "Having used Amazon nearly exclusively for a while, they continue to use it when they go to purchase other, more healthy foods instead. "
                    "However, the first thing they see when they open it is Oreos and icecream, putting it back in their mind. They stick through, they serach for what they want. "
                    "Alongside of their search, they see Oreos and icream. They continue and put what they want in their cart. "
                    "They go to their cart, it says, \"purchase again: Oreos and icecram\" with an simple, easy-to-press button saying \"add to cart\" next to it. "
                    "The person decides that maybe a little won't hurt to \"ease the transition\". Just like that, the person's previous will has been broken. "
                    "Hiding recomendations, at least specific ones, would be a fair, and simple way to help alleviate this problem (Amazon states they have this option, "
                    "but it is not where they say it is and I can't find it - it was either removed, moved, or never existed). It would take more will from the person to toggle this option, "
                    "but it could stop users from having to quit using a service that has their recommendation algorithm \"stuck\" on products they don't want to see."
                }
                h2 { "Exacerbating biases" }
                p {
                    "Recommendation algorithms start out \"feeling out\" the user - recommending them different things that they may or may or may not enjoy. "
                    "This is so that it can eventually give them personalized recommendations. This is usually fine when looking at broad topics like gaming, music, makeup, vlogs, horror movies, etc. "
                    "However, a lot of recommendation algorithms are picking from a pool of content that include propoganda and generally highly opinionated topics. "
                    "This stuff is usually not recommended right away, but when it is, "
                    "most recommendation algorithms latch on very hard when someone engages with it because it's very likely that someone who engages with, and seemingly enjoys a specific side of a devicive topic, "
                    "will want to see more of it. It pulls people into a sort of rabbit hole where everything they see on the platform seems to agree with them and "their" ideas. "
                    "The more similar content they consume, the more the algorithm holds onto it, giving it \"sticking power\". "
                    "What people consume isn't just a reflection of the person, it also influences and changes them. "
                    "The more and more extreme the content gets, the more the person loses sight of the other side. "
                    "Especially because it's not unlikely that social media is where they intereact with the most people, and if it seems, that from their perspective, "
                    "that most people agree with them and that everyone else, must be wrong or off-base. "
                    "This doesn't make me think that platforms should not host or that recommendation algorithms should not host content with \"devisive\" topics or even extremist topics "
                    "(as long as it follows other guidelines and is not illegal). Seeing a variety of perspectives and opinions is what is important to further discussions and bring people closer together. "
                    "I do believe something has to be done about the segmentation and disunity that platforms with heavy use of recommendation algorithms seem to brew. "
                    "I'm unsure of whether this should be the jobs of the platforms themselves. "
                    "Something that may be able to be done that could help is for algorithms to detect when something is devisive in nature and try to recommend content alongside of it with differeing opinions. "
                    "That solution however, I find makes people angry - like when Twitter and YouTube put warnings on what they determined to be misinformation about Covid19. "
                    "I've been thinking for a little bit about a project of my own to help solve this problem but there are too many details to include on here - maybe on another blog post (or product launch w)."
                }
                h2 { "Determining who has a job, and who doesn't" }
                p {
                    "Recommendation algorithms play a huge part into where user engagement is targeted towards. For platforms whose content is provided by multiple people, "
                    "who are trying to make a profit or even just a living on the content they upload, a new ethics question is brought into play. "
                    "If people make their livlihoods off of content that is filtered by these algorithms, "
                    "that makes the algorithm almost the ultimate decider of whether that person's career on the platforms succeeds or fails. "
                    "It puts a lot of pressure on those creators who may put hours, days, weeks, months, into making something and having its fate not even decided by a curator, boss, "
                    "or even the people watching it. For algorithms that are not open source for people to analyze how to optimize content for it (most algorithms to \"prevent abuse\" - "
                    "I don't believe that point, I think it's to hide certain aspects of it that may or may not be beneficial for everyone, but may make some uncomfortable - "
                    "it's also because recommendation algorithms are one of a platform's most valuable assets), fear of it changing is also highly prevelant. "
                    "Creators spend significant amounts of time trying to optimize for a theoretical algorithm that they think is how the one the platform their basing their livlihood's depend on. "
                    "The stakes here also create some concern for algorithms that are made using machine learning as those can gain unintended biases. "
                    "Most concerning of these biases include race, sexuality, region, and political slant of the creators "
                    "and advantages/disadvantges brought by the algorithm for those in specific groups that are not inherently indicitive to the quality of the content they produce "
                    "but may be shown in statistical analyses due to other, unseen factors (which is what most ML algorithms do)."
                }
                h2 { "Are they necessary?" }
                p {
                    "All this concern over what recommendation algorithms make and the design considerations when creating them may lead some to want to give up on them entirely. "
                    "It's a fair thought, before recommendation algorithms, we just asked friends about the latest movie to watch or what newspaper to read. "
                    "The issue arises when one looks at just how much content is being produced nowadays. "
                    "One person cannot have near enough time or knowledge to be able to filter through all the new content being made to recommend the best content for someone. "
                    "Ok, that's kind of a pointless example, so why don't we hire a bunch of people to look through it? There's multiple issues there. "
                    "First being that those people don't know the person on the other end - it can't be personalized. There are also other ethical questions when having real people go through user-uploaded content. "
                    "Not everyone can be vetted and sometimes, people post very illegal content - one example being ISIS, who tends to upload some not-very-family-friendly content - as one could imagine. "
                    "Ok, make an algorithm to filter that out (not getting into that ethical discussion) and then have \"recommenders\" tag the content for what kind of person would like to watch it and "
                    "maybe users could identify themselves or take a test and then they'd get the content tagged for them. At this point, it's back at recommendation algorithm with nearly all the same problems - "
                    "except now, it's calculated by workers probably being paid next to nothing. Hopefully, this has illustrated that recommendation algorithms are a necessary "evil" that we have to deal with. "
                    "But, I don't think they have to be evil. They just need some - or a lot - more improvement."
                }
            },
        },
    };
}