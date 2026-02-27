const api = [
    {
        "name": "KinnPorsche",
        "imageurl": "https://i.pinimg.com/1200x/e5/28/ec/e528ec1026f70d9cc3f90ec29d871d29.jpg",
        "genre": ["Action", "Romance", "Crime"],
        "dramaOrigin": "Thailand",
        "numberOfEP": 14,
        "description": "The son of a mafia boss hires a part-time waiter and martial artist to be his personal bodyguard after seeing his fighting skills.",
        "yourPOV": "The gold standard for high-budget BL. The chemistry is unmatched, but it's definitely for a mature audience due to the intensity."
    },
    {
        "name": "Semantic Error",
        "imageurl": "https://i.pinimg.com/736x/11/2d/53/112d53ded0bf4a71d7b25fef2f3dba2d.jpg",
        "genre": ["Romance", "Comedy", "Campus"],
        "dramaOrigin": "South Korea",
        "numberOfEP": 8,
        "description": "A logical computer science student and a free-spirited design major are forced to work together on a project despite being polar opposites.",
        "yourPOV": "A masterpiece of the 'enemies-to-lovers' trope. Short, sweet, and perfectly paced. It really put K-BLs on the map."
    },
    {
        "name": "Bad Buddy",
        "imageurl": "https://i.pinimg.com/1200x/8f/4c/ac/8f4cacd4740d89427fd20f4cb9e0100f.jpg",
        "genre": ["Romance", "Comedy", "Drama"],
        "dramaOrigin": "Thailand",
        "numberOfEP": 12,
        "description": "Two boys whose families have been rivals for generations try to maintain their own secret friendship and eventual romance.",
        "yourPOV": "It subverts almost every annoying BL trope. Ohm and Nanon have the best 'best-friend' energy you'll ever see on screen."
    },
    {
        "name": "Love in the Air",
        "imageurl": "https://i.pinimg.com/736x/67/01/9d/67019d2d3df2cf1d9374a1d8bc2b0230.jpg",
        "genre": ["Romance", "Drama"],
        "dramaOrigin": "Thailand",
        "numberOfEP": 13,
        "description": "Two interconnected stories about rain and sky—how stormy weather leads four young men to find their fated partners.",
        "yourPOV": "The first half (PayuRain) is iconic for its 'bossy' romance. It’s very high-heat and highly addictive if you like protective leads."
    },
    {
        "name": "Perfect 10 Liners",
        "imageurl": "https://i.pinimg.com/736x/1b/b1/23/1bb123238de89eda534ccb9ae94d0f39.jpg",
        "genre": ["Comedy", "Romance", "Campus"],
        "dramaOrigin": "Thailand",
        "numberOfEP": 12,
        "description": "Follows the chaotic lives and loves of engineering students who are part of the 'Perfect 10' peer group.",
        "yourPOV": "A fun, classic GMMTV-style campus drama. It’s lighthearted and great if you want something easy to watch."
    },
    {
        "name": "Revenged Love",
        "imageurl": "https://i.pinimg.com/736x/ff/f3/96/fff396217215c3b159099806dbb68203.jpg",
        "genre": ["Romance", "Comedy", "Revenge"],
        "dramaOrigin": "China",
        "numberOfEP": 12,
        "description": "An uncensored adaptation of the novel 'Counter Attack'. A man who was dumped by his girlfriend decides to seek revenge by seducing her new, wealthy boyfriend.",
        "yourPOV": "It’s chaotic and hilarious. If you missed the 'old school' toxic-yet-addictive C-BL vibes, this is a modern high-budget return to that energy."
    },
    {
        "name": "ABO Desires",
        "imageurl": "https://i.pinimg.com/736x/8b/a5/fd/8ba5fd559e297681b82eb64817a3fa99.jpg",
        "genre": ["Omegaverse", "Romance", "Corporate"],
        "dramaOrigin": "China",
        "numberOfEP": 16,
        "description": "Set in a world with secondary genders, an S-Class Alpha heir crosses paths with a mysterious Omega intern. Secrets, biology, and corporate power plays collide.",
        "yourPOV": "A rare live-action Omegaverse! It’s bold for Chinese media and handles the 'instinct' aspect of the genre surprisingly well."
    },
    {
        "name": "Fourever You (Part 1 & 2)",
        "imageurl": "https://i.pinimg.com/1200x/91/af/25/91af25757a53f3fd97686041a4f3a3ca.jpg",
        "genre": ["Romance", "Campus", "Drama"],
        "dramaOrigin": "Thailand",
        "numberOfEP": 16,
        "description": "Follows the interconnected love stories of four roommates (Easter, North, Typhoon, Daotok). Part 2 focuses heavily on the 'Beside the Sky' (TonfahTyphoon) arc.",
        "yourPOV": "Earth (Coogie) is a veteran at this point, but the chemistry with the new cast feels fresh. It's a classic university fluff-to-angst transition."
    },
    {
        "name": "To My Shore",
        "imageurl": "https://i.pinimg.com/736x/b1/ae/84/b1ae8477d2c7845f79884f7700cc68a2.jpg",
        "genre": ["Dark Romance", "Obsession", "Melodrama"],
        "dramaOrigin": "China / Thailand Co-pro",
        "numberOfEP": 12,
        "description": "A pharmaceutical director’s life is upended after an accident leads him to a manipulative Thai heir. A dark tale of obsession and identity.",
        "yourPOV": "Very psychological. If you liked the intensity of 'KinnPorsche' but wanted more 'mind games,' this is the one."
    },
    {
        "name": "Smells Like Green Spirit",
        "imageurl": "https://i.pinimg.com/736x/b9/8f/5f/b98f5f1eb518087c4f3dfe0e66369948.jpg",
        "genre": ["Youth", "Coming-of-age", "LGBTQ+"],
        "dramaOrigin": "Japan",
        "numberOfEP": 8,
        "description": "A student in a rural town is bullied for being gay. He finds a secret bond with one of his bullies after discovering they share a hidden hobby: cross-dressing.",
        "yourPOV": "Heartbreaking and beautiful. Typical Japanese BL—it's short but stays with you for weeks because of the raw emotional acting."
    },
    {
        "name": "School Trip: Join the Group I’m Not Close To",
        "imageurl": "https://i.pinimg.com/1200x/94/18/36/9418363738c0aad3c9fdf33b20c8ff6f.jpg",
        "genre": ["High School", "Slice of Life", "Romance"],
        "dramaOrigin": "Japan",
        "numberOfEP": 10,
        "description": "A shy loner with social anxiety is unexpectedly invited to join the popular clique's group for a school field trip.",
        "yourPOV": "The ultimate 'introvert's dream' drama. It's incredibly sweet and low-stress—perfect for a weekend binge."
    },
    {
        "name": "Khemjira",
        "imageurl": "https://i.pinimg.com/736x/ad/c0/c6/adc0c67665e612d6e2de6ab467a3ee3d.jpg",
        "genre": ["Horror", "Supernatural", "Romance"],
        "dramaOrigin": "Thailand",
        "numberOfEP": 12,
        "description": "Khem is from a cursed family where every male dies before age 21. To survive, he seeks help from a mysterious, reluctant shaman.",
        "yourPOV": "The mix of Thai occult folklore and romance is chilling. It’s for fans of 'The Sign' who want more spooky atmosphere."
    },
    {
        "name": "Dare You To Death",
        "imageurl": "https://i.pinimg.com/736x/68/b2/7b/68b27bbe9ccb9a500173d000b6ce159f.jpg",
        "genre": ["Thriller", "Mystery", "Enemies to Lovers"],
        "dramaOrigin": "Thailand",
        "numberOfEP": 10,
        "description": "Two rival detectives must work together to find a serial killer targeting college students through a deadly game of Truth or Dare.",
        "yourPOV": "JoongDunk in a thriller is a massive win. It’s fast-paced, and the 'Death Game' stakes make every episode intense."
    },
    {
        "name": "Cat for Cash",
        "imageurl": "https://i.pinimg.com/1200x/bf/fa/a0/bffaa040810f4c8d626dc02f53b14bd9.jpg",
        "genre": ["Fantasy", "Romance", "Comedy"],
        "dramaOrigin": "Thailand",
        "numberOfEP": 10,
        "description": "A man who hates cats is forced to run a cat café to pay off a debt, partnered with a debt collector who can actually talk to cats.",
        "yourPOV": "FirstKhaotung never miss. It's high-concept but stays grounded in their incredible chemistry. Plus, the cats are adorable."
    },
    {
        "name": "Duang with You",
        "imageurl": "https://i.pinimg.com/736x/d3/49/9f/d3499f0f01e179d4aa98bf1c559c296c.jpg",
        "genre": ["Romance", "Comedy", "Music"],
        "dramaOrigin": "Thailand",
        "numberOfEP": 12,
        "description": "A popular arts student falls for a cold, 'untouchable' jazz student and declares he will win his heart without asking for permission.",
        "yourPOV": "A high-energy, confident pursuit story. It's refreshing to see a lead who is so unashamedly in love from minute one."
    }
]
