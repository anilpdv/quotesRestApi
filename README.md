# quotesRestApi
quotesRestAPi is RestFull quotes api , for general use case build on nodejs.

quotes api three routes
http://rest.quotes.cf/quotes  # this route gives popular quotes in json
http://rest.quotes.cf/search?q=walden # you can use search for quotes an books and authors
http://rest.quotes.cf/tag/wisdom # you can get quotes on tag eg: wisdom,love,freedom...

every route has page parameter
http://rest.quotes.cf/quotes?page=1  # this route gives popular quotes in json
http://rest.quotes.cf/search?q=walden&page=1 # you can use search for quotes an books and authors
http://rest.quotes.cf/tag/wisdom?page=1 # you can get quotes on tag eg: wisdom,love,freedom...

