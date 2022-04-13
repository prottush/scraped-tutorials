const puppeteer = require('puppeteer')
const Papa = require('papaparse')
const request = require('request')
const cjson = require('compressed-json')
const players = {
  "Tre Mann": "1630544",
  "Grant Long": "3",
  "Eric Piatkowski": "15",
  "Greg Anthony": "21",
  "Luc Longley": "26",
  "Doug West": "28",
  "Jim McIlvaine": "29",
  "Monty Williams": "42",
  "Chris Whitney": "43",
  "George McCloud": "45",
  "Mahmoud Abdul-Rauf": "51",
  "Mario Elie": "53",
  "Dickey Simpkins": "54",
  "Gary Payton": "56",
  "Doug Christie": "57",
  "Michael Smith": "63",
  "Sam Perkins": "64",
  "Tom Hammonds": "67",
  "Steve Kerr": "70",
  "Kenny Anderson": "72",
  "Cedric Ceballos": "76",
  "Doug Overton": "77",
  "Latrell Sprewell": "84",
  "Brent Price": "85",
  "Dikembe Mutombo": "87",
  "Nick Van Exel": "89",
  "Hubert Davis": "93",
  "Mark Bryant": "95",
  "Detlef Schrempf": "96",
  "Nick Anderson": "98",
  "Todd Day": "103",
  "Dan Majerle": "105",
  "Robert Horry": "109",
  "LaPhonso Ellis": "111",
  "Steven Smith": "200848",
  "Patrick Ewing": "201607",
  "Robert Pack": "123",
  "Vlade Divac": "124",
  "David Benoit": "128",
  "David Wesley": "133",
  "P.J. Brown": "136",
  "Vernon Maxwell": "137",
  "Tracy Murray": "145",
  "Jud Buechler": "146",
  "Jalen Rose": "147",
  "Chris Childs": "164",
  "Hakeem Olajuwon": "165",
  "Ron Harper": "166",
  "Chris Mills": "168",
  "Antonio Harvey": "176",
  "Muggsy Bogues": "177",
  "Olden Polynice": "178",
  "Bryant Stith": "179",
  "John Crotty": "180",
  "Billy Owens": "182",
  "Chris Webber": "185",
  "Duane Causwell": "190",
  "Anthony Mason": "193",
  "Scott Burrell": "197",
  "Danny Ferry": "198",
  "Chris Dudley": "201",
  "Gary Grant": "202",
  "Sam Cassell": "208",
  "Dell Curry": "209",
  "Terrell Brandon": "210",
  "Antonio Davis": "213",
  "Brian Shaw": "216",
  "Vinny Del Negro": "219",
  "Clar. Weatherspoon": "221",
  "Bill Curley": "223",
  "Eddie Jones": "224",
  "Adam Keefe": "228",
  "Kevin Edwards": "236",
  "Tyrone Hill": "238",
  "Darrick Martin": "239",
  "Aaron McKie": "243",
  "Dee Brown": "200793",
  "George Lynch": "248",
  "Sean Elliott": "251",
  "Karl Malone": "252",
  "Grant Hill": "255",
  "Brian Grant": "258",
  "Horace Grant": "270",
  "Johnny Newman": "271",
  "Allan Houston": "275",
  "Stacey Augmon": "278",
  "Felton Spencer": "280",
  "Scott Williams": "281",
  "Lindsey Hunter": "283",
  "Anthony Miller": "292",
  "Rick Fox": "296",
  "Alonzo Mourning": "297",
  "Glenn Robinson": "299",
  "Mookie Blaylock": "302",
  "John Stockton": "304",
  "John Starks": "317",
  "Greg Foster": "323",
  "Anthony Peeler": "324",
  "Danny Manning": "330",
  "Tom Gugliotta": "339",
  "Dana Barros": "344",
  "Terry Porter": "345",
  "Mitchell Butler": "348",
  "Mark Jackson": "349",
  "Darrell Armstrong": "353",
  "Anfernee Hardaway": "358",
  "Chucky Brown": "359",
  "Clifford Robinson": "361",
  "Christian Laettner": "363",
  "Derrick McKey": "365",
  "Charlie Ward": "369",
  "Terry Mills": "371",
  "Isaiah Rider": "375",
  "Eric Montross": "376",
  "Tony Smith": "380",
  "James Robinson": "381",
  "Kendall Gill": "383",
  "Calbert Cheaney": "384",
  "Elliot Perry": "386",
  "Toni Kukoc": "389",
  "Rod Strickland": "393",
  "Reggie Miller": "397",
  "Sean Rooks": "399",
  "Derek Strong": "400",
  "Shaquille O'Neal": "406",
  "Sam Mitchell": "417",
  "Avery Johnson": "422",
  "Chris Gatling": "423",
  "Terry Davis": "426",
  "Sherman Douglas": "428",
  "Shawn Kemp": "431",
  "Carlos Rogers": "435",
  "Juwan Howard": "436",
  "Zan Tabak": "440",
  "Lamond Murray": "441",
  "Pervis Ellison": "442",
  "Wesley Person": "445",
  "Lucious Harris": "446",
  "Bo Outlaw": "448",
  "Vin Baker": "452",
  "Howard Eisley": "458",
  "Popeye Jones": "461",
  "J.R. Reid": "462",
  "Jason Kidd": "467",
  "Jon Barry": "468",
  "Jamal Mashburn": "469",
  "Matt Bullard": "672",
  "Alan Henderson": "673",
  "Eric Williams": "677",
  "Jason Caffey": "679",
  "John Amaechi": "680",
  "Donny Marshall": "681",
  "Bob Sura": "682",
  "Cherokee Parks": "685",
  "Antonio McDyess": "686",
  "Michael Curry": "688",
  "Theo Ratliff": "689",
  "Don Reid": "690",
  "Andrew DeClercq": "692",
  "Joe Smith": "693",
  "Sam Mack": "694",
  "Eldridge Recasner": "695",
  "Travis Best": "696",
  "Fred Hoiberg": "697",
  "Brent Barry": "699",
  "Voshon Lenard": "702",
  "Kurt Thomas": "703",
  "Kevin Garnett": "708",
  "Jerry Stackhouse": "711",
  "Chris Carr": "713",
  "Michael Finley": "714",
  "John Coker": "715",
  "Arvydas Sabonis": "717",
  "Gary Trent": "718",
  "Tyus Edney": "721",
  "Corliss Williamson": "722",
  "Cory Alexander": "724",
  "Eric Snow": "727",
  "Greg Ostertag": "731",
  "Bryant Reeves": "735",
  "Rasheed Wallace": "739",
  "Randy Brown": "753",
  "Jim Jackson": "754",
  "Damon Stoudamire": "757",
  "Jerome Kersey": "760",
  "Matt Geiger": "761",
  "Shawn Bradley": "762",
  "Tony Massenburg": "763",
  "David Robinson": "764",
  "Hersey Hawkins": "765",
  "David Wingate": "766",
  "Glen Rice": "203318",
  "Will Perdue": "781",
  "Mitch Richmond": "782",
  "Kevin Willis": "788",
  "Charles Oakley": "891",
  "Michael Jordan": "893",
  "Tyrone Corbin": "895",
  "Tim Hardaway": "896",
  "Otis Thorpe": "901",
  "Bimbo Coles": "902",
  "Chris Mullin": "904",
  "Dale Davis": "905",
  "Ervin Johnson": "911",
  "Larry Johnson": "913",
  "Rodney Rogers": "915",
  "Corie Blount": "916",
  "Loy Vaught": "919",
  "A.C. Green": "920",
  "Elden Campbell": "922",
  "Donyell Marshall": "923",
  "Anthony Goldwire": "924",
  "Don MacLean": "931",
  "Oliver Miller": "932",
  "Derrick Coleman": "934",
  "Bryon Russell": "935",
  "Scottie Pippen": "937",
  "Allen Iverson": "947",
  "Marcus Camby": "948",
  "Shareef Abdur-Rahim": "949",
  "Stephon Marbury": "950",
  "Ray Allen": "951",
  "Antoine Walker": "952",
  "Lorenzen Wright": "953",
  "Kerry Kittles": "954",
  "Samaki Walker": "955",
  "Erick Dampier": "956",
  "Todd Fuller": "957",
  "Vitaly Potapenko": "958",
  "Steve Nash": "959",
  "Tony Delk": "960",
  "John Wallace": "961",
  "Walter McCarty": "962",
  "Derek Fisher": "965",
  "Jerome Williams": "966",
  "Travis Knight": "969",
  "Othella Harrington": "970",
  "Jeff McInnis": "976",
  "Kobe Bryant": "977",
  "Peja Stojakovic": "978",
  "Jermaine O'Neal": "979",
  "Zydrunas Ilgauskas": "980",
  "Efthimios Rentzias": "981",
  "Moochie Norris": "983",
  "Randy Livingston": "988",
  "Malik Rose": "990",
  "Jamie Feick": "994",
  "Mark Pope": "998",
  "Shandon Anderson": "1000",
  "Walt Williams": "1005",
  "Emanual Davis": "1023",
  "Darvin Ham": "1032",
  "Shawnelle Scott": "1035",
  "Juaquin Hawkins": "1038",
  "Amal McCaskill": "1043",
  "Shane Heal": "1049",
  "Dean Garrett": "1051",
  "Ben Handlogten": "1052",
  "Erick Strickland": "1065",
  "Reggie Slater": "1073",
  "Matt Maloney": "1074",
  "Ira Bowman": "1085",
  "Chucky Atkins": "1088",
  "Mark Strickland": "1110",
  "Ben Wallace": "1112",
  "Jaren Jackson": "1114",
  "Ike Austin": "1134",
  "Michael Hawkins": "1138",
  "Aaron Williams": "1425",
  "Dragan Tarlac": "1434",
  "Zeljko Rebraca": "1442",
  "Lawrence Funderburke": "1444",
  "Bruce Bowen": "1477",
  "Tim Duncan": "1495",
  "Keith Van Horn": "1496",
  "Chauncey Billups": "1497",
  "Antonio Daniels": "1498",
  "Tony Battie": "1499",
  "Ron Mercer": "1500",
  "Tim Thomas": "1501",
  "Adonal Foyle": "1502",
  "Tracy McGrady": "1503",
  "Danny Fortson": "1504",
  "Tariq Abdul-Wahad": "1505",
  "Austin Croshere": "1506",
  "Derek Anderson": "1507",
  "Maurice Taylor": "1508",
  "Kelvin Cato": "1509",
  "Brevin Knight": "1510",
  "Scot Pollard": "1513",
  "Paul Grant": "1514",
  "Anthony Parker": "1515",
  "Bobby Jackson": "1517",
  "John Thomas": "1519",
  "Charles Smith": "1520",
  "Jacque Vaughn": "1521",
  "Marc Jackson": "1531",
  "Anthony Johnson": "1533",
  "Stephen Jackson": "1536",
  "Cedric Henderson": "1538",
  "Alvin Williams": "1541",
  "Predrag Drobnjak": "1542",
  "Chris Crawford": "1544",
  "Mark Blount": "1548",
  "Jamal Robinson": "1554",
  "Adrian Griffin": "1559",
  "Gerard King": "1562",
  "Kevin Ollie": "1563",
  "Etdrick Bohannon": "1564",
  "Michael Stewart": "1565",
  "Nate Huffman": "1572",
  "Brandon Williams": "1630314",
  "Rick Brunson": "1594",
  "Kornel David": "1600",
  "Rusty LaRue": "1601",
  "Troy Hudson": "1607",
  "Art Long": "1609",
  "Chris Garner": "1612",
  "Mikki Moore": "1630",
  "Larry Robinson": "1683",
  "Michael Olowokandi": "1709",
  "Mike Bibby": "1710",
  "Raef LaFrentz": "1711",
  "Antawn Jamison": "1712",
  "Vince Carter": "1713",
  "Robert Traylor": "1714",
  "Jason Williams": "1715",
  "Larry Hughes": "1716",
  "Dirk Nowitzki": "1717",
  "Paul Pierce": "1718",
  "Bonzi Wells": "1719",
  "Michael Doleac": "1720",
  "Keon Clark": "1721",
  "Michael Dickerson": "1722",
  "Matt Harpring": "1723",
  "Bryce Drew": "1724",
  "Rasho Nesterovic": "1725",
  "Pat Garrity": "1727",
  "Roshown McLeod": "1728",
  "Ricky Davis": "1729",
  "Brian Skinner": "1730",
  "Tyronn Lue": "1731",
  "Felipe Lopez": "1732",
  "Al Harrington": "1733",
  "Sam Jacobson": "1734",
  "Vladimir Stepania": "1735",
  "Corey Benjamin": "1736",
  "Nazr Mohammed": "1737",
  "Ansu Sesay": "1738",
  "Ruben Patterson": "1739",
  "Rashard Lewis": "1740",
  "Jelani McCoy": "1741",
  "Shammond Williams": "1742",
  "Bruno Sundov": "1743",
  "Jerome James": "1744",
  "Rafer Alston": "1747",
  "Cuttino Mobley": "1749",
  "Jahidi White": "1751",
  "Sean Marks": "1752",
  "Derrick Dial": "1760",
  "Greg Buckner": "1761",
  "Tremaine Fowlkes": "1762",
  "Ryan Bowen": "1763",
  "Torraye Braggs": "1765",
  "Maceo Baston": "1766",
  "Damon Jones": "1800",
  "Brad Miller": "1802",
  "Ike Fontaine": "1829",
  "Tyrone Nesby": "1838",
  "Anthony Carter": "1853",
  "Earl Boykins": "1863",
  "Steve Goodrich": "1864",
  "Elton Brand": "1882",
  "Steve Francis": "1883",
  "Baron Davis": "1884",
  "Lamar Odom": "1885",
  "Jonathan Bender": "1886",
  "Wally Szczerbiak": "1887",
  "Richard Hamilton": "1888",
  "Andre Miller": "1889",
  "Shawn Marion": "1890",
  "Jason Terry": "1891",
  "Trajan Langdon": "1892",
  "Aleksandar Radojevic": "1893",
  "Corey Maggette": "1894",
  "William Avery": "1895",
  "Metta World Peace": "1897",
  "Cal Bowdler": "1898",
  "James Posey": "1899",
  "Quincy Lewis": "1900",
  "Dion Glover": "1901",
  "Jeff Foster": "1902",
  "Kenny Thomas": "1903",
  "Devean George": "1904",
  "Andrei Kirilenko": "1905",
  "Tim James": "1906",
  "Vonteego Cummings": "1907",
  "Jumaine Jones": "1908",
  "Scott Padgett": "1909",
  "Leon Smith": "1910",
  "Michael Ruffin": "1913",
  "Chris Herren": "1914",
  "Evan Eschmeyer": "1915",
  "Calvin Booth": "1916",
  "Wang Zhi-zhi": "1917",
  "Obinna Ekezie": "1918",
  "Laron Profit": "1919",
  "Gordan Giricek": "1921",
  "Francisco Elson": "1922",
  "Lee Nailon": "1924",
  "Todd MacCulloch": "1928",
  "Lari Ketner": "1930",
  "Rodney Buford": "1934",
  "Manu Ginobili": "1938",
  "Harold Jamison": "1942",
  "Eddie Robinson": "1944",
  "Andy Panko": "1950",
  "Raja Bell": "1952",
  "Ira Newble": "1956",
  "Milt Palacio": "1960",
  "Jamel Thomas": "1975",
  "Jermaine Jackson": "1983",
  "Zendon Hamilton": "1985",
  "Kenyon Martin": "2030",
  "Stromile Swift": "2031",
  "Darius Miles": "2032",
  "Marcus Fizer": "2033",
  "Mike Miller": "2034",
  "DerMarr Johnson": "2035",
  "Chris Mihm": "2036",
  "Jamal Crawford": "2037",
  "Joel Przybilla": "2038",
  "Keyon Dooling": "2039",
  "Jerome Moiso": "2040",
  "Etan Thomas": "2041",
  "Courtney Alexander": "2042",
  "Mateen Cleaves": "2043",
  "Jason Collier": "2044",
  "Hedo Turkoglu": "2045",
  "Desmond Mason": "2046",
  "Quentin Richardson": "2047",
  "Jamaal Magloire": "2048",
  "Speedy Claxton": "2049",
  "Morris Peterson": "2050",
  "Donnell Harvey": "2051",
  "DeShawn Stevenson": "2052",
  "Dalibor Bagaric": "2053",
  "Jake Tsakalidis": "2054",
  "Mamadou N'diaye": "2055",
  "Primoz Brezec": "2056",
  "Erick Barkley": "2057",
  "Mark Madsen": "2058",
  "Eduardo Najera": "2059",
  "Marko Jaric": "2060",
  "Dan Langhi": "2061",
  "A.J. Guyton": "2062",
  "Jake Voskuhl": "2063",
  "Khalid El-Amin": "2064",
  "Mike Smith": "2065",
  "Soumaila Samake": "2066",
  "Eddie House": "2067",
  "Lavor Postell": "2068",
  "Hanno Mottola": "2069",
  "Olumide Oyedeji": "2071",
  "Michael Redd": "2072",
  "Brian Cardinal": "2073",
  "Jabari Smith": "2074",
  "Jason Hart": "2078",
  "Kaniel Dickens": "2079",
  "Igor Rakocevic": "2080",
  "Ernest Brown": "2081",
  "Dan McClintock": "2082",
  "Chris Porter": "2084",
  "Daniel Santiago": "2091",
  "Ruben Garces": "2092",
  "Slava Medvedenko": "2098",
  "Paul McPherson": "2101",
  "Ruben Wolkowyski": "2106",
  "Eddie Gill": "2109",
  "Terrance Roberson": "2121",
  "Garth Joseph": "2123",
  "Malik Allen": "2124",
  "David Vanterpool": "2128",
  "Mike Penberthy": "2130",
  "Ime Udoka": "2137",
  "Pepe Sanchez": "2143",
  "Sean Colson": "2173",
  "Kwame Brown": "2198",
  "Tyson Chandler": "2199",
  "Pau Gasol": "2200",
  "Eddy Curry": "2201",
  "Jason Richardson": "2202",
  "Shane Battier": "2203",
  "Eddie Griffin": "2204",
  "DeSagana Diop": "2205",
  "Rodney White": "2206",
  "Joe Johnson": "2207",
  "Kedrick Brown": "2208",
  "Vladimir Radmanovic": "2209",
  "Richard Jefferson": "2210",
  "Troy Murphy": "2211",
  "Steven Hunter": "2212",
  "Kirk Haston": "2213",
  "Michael Bradley": "2214",
  "Jason Collins": "2215",
  "Zach Randolph": "2216",
  "Brendan Haywood": "2217",
  "Joseph Forte": "2218",
  "Jeryl Sasser": "2219",
  "Brandon Armstrong": "2220",
  "Raul Lopez": "2221",
  "Gerald Wallace": "2222",
  "Samuel Dalembert": "2223",
  "Jamaal Tinsley": "2224",
  "Tony Parker": "2225",
  "Will Solomon": "2226",
  "Alton Ford": "2228",
  "Mike James": "1628455",
  "Maurice Evans": "2230",
  "Ratko Varda": "2237",
  "Antonis Fotsis": "2238",
  "Trenton Hassell": "2239",
  "Gilbert Arenas": "2240",
  "Omar Cook": "2241",
  "Terence Morris": "2242",
  "Brian Scalabrine": "2243",
  "Jeff Trepagnier": "2244",
  "Damone Brown": "2245",
  "Mehmet Okur": "2246",
  "Earl Watson": "2248",
  "Jamison Brewer": "2249",
  "Bobby Simmons": "2250",
  "Sean Lampley": "2253",
  "Loren Woods": "2254",
  "Ken Johnson": "2256",
  "Ruben Boumtje-Boumtje": "2257",
  "Jarron Collins": "2260",
  "Kenny Satterfield": "2261",
  "Alvin Jones": "2264",
  "Charlie Bell": "2294",
  "Carlos Arroyo": "2306",
  "Paul Shirley": "2321",
  "Joe Crispin": "2343",
  "Tang Hamilton": "2347",
  "Victor Alexander": "2349",
  "Oscar Torres": "2351",
  "Dean Oliver": "2352",
  "Tierre Brown": "2357",
  "Chris Andersen": "2365",
  "Mike Wilks": "2366",
  "Geno Carlisle": "2367",
  "Norman Richardson": "2369",
  "Mengke Bateer": "2370",
  "Yao Ming": "2397",
  "Jay Williams": "2398",
  "Mike Dunleavy": "2399",
  "Drew Gooden": "2400",
  "Nikoloz Tskitishvili": "2401",
  "Dajuan Wagner": "2402",
  "Nene": "2403",
  "Chris Wilcox": "2404",
  "Amar'e Stoudemire": "2405",
  "Caron Butler": "2406",
  "Jared Jeffries": "2407",
  "Melvin Ely": "2408",
  "Marcus Haislip": "2409",
  "Fred Jones": "2410",
  "Bostjan Nachbar": "2411",
  "Jiri Welsch": "2412",
  "Juan Dixon": "2413",
  "Curtis Borchardt": "2414",
  "Ryan Humphrey": "2415",
  "Kareem Rush": "2416",
  "Qyntel Woods": "2417",
  "Casey Jacobsen": "2418",
  "Tayshaun Prince": "2419",
  "Nenad Krstic": "2420",
  "Frank Williams": "2421",
  "John Salmons": "2422",
  "Chris Jefferies": "2423",
  "Dan Dickau": "2424",
  "Robert Archibald": "2425",
  "Roger Mason Jr.": "2427",
  "Vincent Yarbrough": "2428",
  "Dan Gadzuric": "2429",
  "Carlos Boozer": "2430",
  "David Andersen": "2431",
  "Tito Maddox": "2432",
  "Juan Carlos Navarro": "2434",
  "Mario Kasun": "2435",
  "Flip Murray": "2436",
  "Lonny Baxter": "2437",
  "Matt Barnes": "2440",
  "Jamal Sampson": "2441",
  "Chris Owens": "2442",
  "Darius Songaila": "2443",
  "Rasual Butler": "2446",
  "Tamar Slay": "2447",
  "Luis Scola": "2449",
  "Randy Holcomb": "2450",
  "Corsley Edwards": "2451",
  "J.R. Bremer": "2452",
  "Predrag Savovic": "2453",
  "Junior Harrington": "2454",
  "Cezary Trybanski": "2456",
  "Jannero Pargo": "2457",
  "Guy Rucker": "2462",
  "Maurice Carter": "2466",
  "Pat Burke": "2469",
  "Smush Parker": "2470",
  "Mike Batiste": "2471",
  "Devin Brown": "2484",
  "Maurice Baker": "2486",
  "Adam Harrington": "2492",
  "Richie Frahm": "2499",
  "Reggie Evans": "2501",
  "Antoine Rigaudeau": "2541",
  "LeBron James": "2544",
  "Darko Milicic": "2545",
  "Carmelo Anthony": "2546",
  "Chris Bosh": "2547",
  "Dwyane Wade": "2548",
  "Chris Kaman": "2549",
  "Kirk Hinrich": "2550",
  "T.J. Ford": "2551",
  "Michael Sweetney": "2552",
  "Jarvis Hayes": "2553",
  "Mickael Pietrus": "2554",
  "Nick Collison": "2555",
  "Marcus Banks": "2556",
  "Luke Ridnour": "2557",
  "Reece Gaines": "2558",
  "Troy Bell": "2559",
  "Zarko Cabarkapa": "2560",
  "David West": "2561",
  "Sasha Pavlovic": "2562",
  "Dahntay Jones": "2563",
  "Boris Diaw": "2564",
  "Zoran Planinic": "2565",
  "Travis Outlaw": "2566",
  "Brian Cook": "2567",
  "Carlos Delfino": "2568",
  "Ndudi Ebi": "2569",
  "Kendrick Perkins": "2570",
  "Leandro Barbosa": "2571",
  "Josh Howard": "2572",
  "Maciej Lampe": "2573",
  "Jason Kapono": "2574",
  "Luke Walton": "2575",
  "Travis Hansen": "2580",
  "Steve Blake": "2581",
  "Slavko Vranes": "2582",
  "Derrick Zimmerman": "2583",
  "Willie Green": "2584",
  "Zaza Pachulia": "2585",
  "Keith Bogans": "2586",
  "Matt Bonner": "2588",
  "Mo Williams": "2590",
  "James Lang": "2591",
  "James Jones": "2592",
  "Kyle Korver": "2594",
  "Brandon Hunter": "2599",
  "Andreas Glyniadakis": "2601",
  "Jerome Beasley": "2602",
  "Theron Smith": "2604",
  "Marquis Daniels": "2605",
  "Udonis Haslem": "2617",
  "Quinton Ross": "2624",
  "Kirk Penney": "2632",
  "Alex Scales": "2637",
  "Britton Johnsen": "2639",
  "Ronald Dupree": "2648",
  "Yuta Tabuse": "2657",
  "Desmond Penigar": "2667",
  "Josh Davis": "2668",
  "Linton Johnson": "2669",
  "Hiram Fuller": "2673",
  "Matt Carroll": "2679",
  "Alex Garcia": "2682",
  "Melvin Sanders": "2684",
  "Brandin Knight": "2688",
  "Keith McLeod": "2693",
  "Josh Powell": "2694",
  "Lynn Greer": "2696",
  "Desmond Ferguson": "2724",
  "Dwight Howard": "2730",
  "Emeka Okafor": "2731",
  "Ben Gordon": "2732",
  "Shaun Livingston": "2733",
  "Devin Harris": "2734",
  "Josh Childress": "2735",
  "Luol Deng": "2736",
  "Rafael Araujo": "2737",
  "Andre Iguodala": "2738",
  "Luke Jackson": "2739",
  "Andris Biedrins": "2740",
  "Robert Swift": "2741",
  "Sebastian Telfair": "2742",
  "Kris Humphries": "2743",
  "Al Jefferson": "2744",
  "Kirk Snyder": "2745",
  "Josh Smith": "2746",
  "JR Smith": "2747",
  "Dorell Wright": "2748",
  "Jameer Nelson": "2749",
  "Pavel Podkolzin": "2750",
  "Viktor Khryapa": "2751",
  "Sergei Monia": "2752",
  "Delonte West": "2753",
  "Tony Allen": "2754",
  "Kevin Martin": "2755",
  "Sasha Vujacic": "2756",
  "Beno Udrih": "2757",
  "David Harrison": "2758",
  "Anderson Varejao": "2760",
  "Jackson Vroman": "2761",
  "Peter John Ramos": "2762",
  "Lionel Chalmers": "2763",
  "Donta Smith": "2764",
  "Andre Emmett": "2765",
  "Antonio Burks": "2766",
  "Royal Ivey": "2767",
  "Chris Duhon": "2768",
  "Justin Reed": "2770",
  "Trevor Ariza": "2772",
  "Bernard Robinson": "2774",
  "Ha Ha": "2775",
  "Pape Sow": "2776",
  "Vassilis Spanoulis": "2779",
  "Matt Freije": "2782",
  "Luis Flores": "2784",
  "DJ Mbenga": "2788",
  "Horace Jenkins": "2798",
  "Tony Bobbitt": "2800",
  "Andres Nocioni": "2804",
  "Gerald Fitch": "2809",
  "Andre Brown": "2810",
  "John Edwards": "2823",
  "Desmon Farmer": "2824",
  "Ibrahim Kutluay": "2825",
  "James Thomas": "2839",
  "Erik Daniels": "2845",
  "Awvee Storey": "2852",
  "Earl Barron": "2853",
  "Andre Barrett": "2857",
  "Damien Wilkins": "2863",
  "Jackie Butler": "2866",
  "Kasib Powell": "2867",
  "Billy Thomas": "2873",
  "Jared Reiner": "2876",
  "Mark Jones": "2891",
  "Andrew Bogut": "101106",
  "Marvin Williams": "101107",
  "Chris Paul": "101108",
  "Raymond Felton": "101109",
  "Martell Webster": "101110",
  "Charlie Villanueva": "101111",
  "Channing Frye": "101112",
  "Ike Diogu": "101113",
  "Deron Williams": "101114",
  "Andrew Bynum": "101115",
  "Yaroslav Korolev": "101117",
  "Sean May": "101118",
  "Rashad McCants": "101119",
  "Antoine Wright": "101120",
  "Joey Graham": "101121",
  "Danny Granger": "101122",
  "Gerald Green": "101123",
  "Hakim Warrick": "101124",
  "Julius Hodge": "101125",
  "Nate Robinson": "101126",
  "Jarrett Jack": "101127",
  "Francisco Garcia": "101128",
  "Luther Head": "101129",
  "Johan Petro": "101130",
  "Jason Maxiell": "101131",
  "Linas Kleiza": "101132",
  "Ian Mahinmi": "101133",
  "Wayne Simien": "101134",
  "David Lee": "101135",
  "Salim Stoudamire": "101136",
  "Daniel Ewing": "101137",
  "Brandon Bass": "101138",
  "CJ Miles": "101139",
  "Ersan Ilyasova": "101141",
  "Ronny Turiaf": "101142",
  "Travis Diener": "101143",
  "Von Wafer": "101144",
  "Monta Ellis": "101145",
  "Roko Ukic": "101146",
  "Chris Taft": "101147",
  "Mile Ilic": "101148",
  "Martynas Andriuskevicius": "101149",
  "Lou Williams": "101150",
  "Bracey Wright": "101152",
  "Mickael Gelabale": "101153",
  "Andray Blatche": "101154",
  "Ryan Gomes": "101155",
  "Robert Whaley": "101156",
  "Orien Greene": "101158",
  "Dijon Thompson": "101159",
  "Lawrence Roberts": "101160",
  "Amir Johnson": "101161",
  "Marcin Gortat": "101162",
  "Alex Acker": "101165",
  "Uros Slokar": "101166",
  "Fabricio Oberto": "101177",
  "Arvydas Macijauskas": "101178",
  "Ronnie Price": "101179",
  "Sarunas Jasikevicius": "101180",
  "Jose Calderon": "101181",
  "Donell Taylor": "101182",
  "Shavlik Randolph": "101183",
  "Deng Gai": "101184",
  "Rawle Marshall": "101185",
  "Alan Anderson": "101187",
  "Eddie Basden": "101188",
  "James Singleton": "101189",
  "Matt Walsh": "101190",
  "Anthony Roberson": "101194",
  "Luke Schenscher": "101195",
  "Will Bynum": "101198",
  "Dwayne Jones": "101204",
  "Kevin Burleson": "101207",
  "Devin Green": "101209",
  "Stephen Graham": "101211",
  "Esteban Batista": "101212",
  "Sharrod Ford": "101213",
  "Jawad Williams": "101214",
  "Will Conroy": "101215",
  "Anthony Grundy": "101219",
  "Aaron Miles": "101223",
  "Noel Felix": "101230",
  "Roger Powell": "101232",
  "Kelenna Azubuike": "101235",
  "Chuck Hayes": "101236",
  "Boniface Ndong": "101238",
  "Keith Langford": "101247",
  "John Lucas III": "101249",
  "Andre Owens": "101261",
  "Jamario Moon": "200081",
  "Andrea Bargnani": "200745",
  "LaMarcus Aldridge": "200746",
  "Adam Morrison": "200747",
  "Tyrus Thomas": "200748",
  "Shelden Williams": "200749",
  "Brandon Roy": "200750",
  "Randy Foye": "200751",
  "Rudy Gay": "200752",
  "Patrick O'Bryant": "200753",
  "Mouhamed Sene": "200754",
  "JJ Redick": "200755",
  "Hilton Armstrong": "200756",
  "Thabo Sefolosha": "200757",
  "Ronnie Brewer": "200758",
  "Cedric Simmons": "200759",
  "Rodney Carney": "200760",
  "Shawne Williams": "200761",
  "Oleksiy Pecherov": "200762",
  "Quincy Douby": "200763",
  "Renaldo Balkman": "200764",
  "Rajon Rondo": "200765",
  "Marcus Williams": "201173",
  "Josh Boone": "200767",
  "Kyle Lowry": "200768",
  "Shannon Brown": "200769",
  "Jordan Farmar": "200770",
  "Sergio Rodriguez": "200771",
  "Maurice Ager": "200772",
  "Mardy Collins": "200776",
  "Joel Freeland": "200777",
  "James White": "200778",
  "Steve Novak": "200779",
  "Solomon Jones": "200780",
  "Paul Davis": "200781",
  "P.J. Tucker": "200782",
  "Craig Smith": "200783",
  "Bobby Jones": "200784",
  "Kosta Perovic": "200785",
  "David Noel": "200786",
  "James Augustine": "200788",
  "Daniel Gibson": "200789",
  "Marcus Vinicius": "200790",
  "Alexander Johnson": "200792",
  "Paul Millsap": "200794",
  "Leon Powe": "200796",
  "Ryan Hollins": "200797",
  "Cheikh Samb": "200798",
  "Guillermo Diaz": "200799",
  "Hassan Adams": "200801",
  "Damir Markota": "200806",
  "Will Blalock": "200807",
  "Chris Quinn": "200809",
  "Allan Ray": "200810",
  "Lou Amundson": "200811",
  "Tarence Kinsey": "200814",
  "Jorge Garbajosa": "200816",
  "Pooh Jeter": "200817",
  "Justin Williams": "200818",
  "Yakhouba Diawara": "200821",
  "Pops Mensah-Bonsu": "200822",
  "Robert Hite": "200823",
  "J.J. Barea": "200826",
  "Darius Washington": "200827",
  "Ivan McFarlin": "200829",
  "Walter Herrmann": "200835",
  "Mike Hall": "200837",
  "Kevinn Pinkney": "200838",
  "Mike Harris": "200839",
  "Chris McCray": "200840",
  "Cedric Bozeman": "200841",
  "Renaldo Major": "200970",
  "Dontell Jefferson": "200971",
  "Jeremy Richardson": "200978",
  "Lance Allred": "200984",
  "Walker Russell": "201041",
  "Randolph Morris": "201043",
  "Greg Oden": "201141",
  "Kevin Durant": "201142",
  "Al Horford": "201143",
  "Mike Conley": "201144",
  "Jeff Green": "201145",
  "Yi Jianlian": "201146",
  "Corey Brewer": "201147",
  "Brandan Wright": "201148",
  "Joakim Noah": "201149",
  "Spencer Hawes": "201150",
  "Acie Law": "201151",
  "Thaddeus Young": "201152",
  "Julian Wright": "201153",
  "Al Thornton": "201154",
  "Rodney Stuckey": "201155",
  "Nick Young": "201156",
  "Sean Williams": "201157",
  "Marco Belinelli": "201158",
  "Javaris Crittenton": "201159",
  "Jason Smith": "201160",
  "Daequan Cook": "201161",
  "Jared Dudley": "201162",
  "Wilson Chandler": "201163",
  "Rudy Fernandez": "201164",
  "Morris Almond": "201165",
  "Aaron Brooks": "201166",
  "Arron Afflalo": "201167",
  "Tiago Splitter": "201168",
  "Alando Tucker": "201169",
  "Carl Landry": "201171",
  "Gabe Pruitt": "201172",
  "Nick Fazekas": "201174",
  "Glen Davis": "201175",
  "Jermareo Davidson": "201176",
  "Josh McRoberts": "201177",
  "Kyrylo Fesenko": "201178",
  "Sun Sun": "201180",
  "Chris Richard": "201181",
  "Derrick Byars": "201182",
  "Stephane Lasme": "201186",
  "Dominic McGuire": "201187",
  "Marc Gasol": "201188",
  "Aaron Gray": "201189",
  "JamesOn Curry": "201191",
  "Taurean Green": "201192",
  "Demetris Nichols": "201193",
  "Ramon Sessions": "201196",
  "DJ Strawberry": "201199",
  "Joel Anthony": "201202",
  "Mustafa Shakur": "201203",
  "Coby Karl": "201207",
  "Darryl Watkins": "201208",
  "C.J. Watson": "201228",
  "Anthony Tolliver": "201229",
  "Trey Johnson": "201234",
  "Courtney Sims": "201235",
  "Mario West": "201238",
  "Thomas Gardner": "201242",
  "Ivan Johnson": "201274",
  "Andre Ingram": "201281",
  "Eric Dawson": "201286",
  "Carldell Johnson": "201291",
  "Blake Ahearn": "201336",
  "Mike Taylor": "201446",
  "Michael Beasley": "201563",
  "O.J. Mayo": "201564",
  "Derrick Rose": "201565",
  "Russell Westbrook": "201566",
  "Kevin Love": "201567",
  "Danilo Gallinari": "201568",
  "Eric Gordon": "201569",
  "Joe Alexander": "201570",
  "D.J. Augustin": "201571",
  "Brook Lopez": "201572",
  "Jerryd Bayless": "201573",
  "Jason Thompson": "201574",
  "Brandon Rush": "201575",
  "Anthony Randolph": "201576",
  "Robin Lopez": "201577",
  "Marreese Speights": "201578",
  "Roy Hibbert": "201579",
  "JaVale McGee": "201580",
  "JJ Hickson": "201581",
  "Alexis Ajinca": "201582",
  "Ryan Anderson": "201583",
  "Courtney Lee": "201584",
  "Kosta Koufos": "201585",
  "Serge Ibaka": "201586",
  "Nicolas Batum": "201587",
  "George Hill": "201588",
  "Darrell Arthur": "201589",
  "Donte Greene": "201590",
  "DJ White": "201591",
  "J.R. Giddens": "201592",
  "Nikola Pekovic": "201593",
  "Walter Sharpe": "201594",
  "Joey Dorsey": "201595",
  "Mario Chalmers": "201596",
  "DeAndre Jordan": "201599",
  "Omer Asik": "201600",
  "Luc Mbah a Moute": "201601",
  "Kyle Weaver": "201602",
  "Sonny Weems": "201603",
  "Chris Douglas-Roberts": "201604",
  "Nathan Jawai": "201605",
  "Sean Singletary": "201606",
  "Goran Dragic": "201609",
  "Henry Walker": "201611",
  "Malik Hairston": "201612",
  "Darnell Jackson": "201616",
  "Sasha Kaun": "201619",
  "Joe Crawford": "201621",
  "Semih Erden": "201623",
  "Anthony Morrow": "201627",
  "Bobby Brown": "201628",
  "Othello Hunter": "201629",
  "Steven Hill": "201631",
  "Hamed Haddadi": "201632",
  "Rob Kurz": "201633",
  "DeMarcus Nelson": "201634",
  "Othyus Jeffers": "201785",
  "Oliver Lafayette": "201802",
  "Chris Hunter": "201805",
  "Gary Forbes": "201814",
  "Trey Gilder": "201821",
  "Cartier Martin": "201858",
  "Greg Stiemsma": "201880",
  "Blake Griffin": "201933",
  "Hasheem Thabeet": "201934",
  "James Harden": "201935",
  "Tyreke Evans": "201936",
  "Ricky Rubio": "201937",
  "Jonny Flynn": "201938",
  "Stephen Curry": "201939",
  "Jordan Hill": "201941",
  "DeMar DeRozan": "201942",
  "Brandon Jennings": "201943",
  "Terrence Williams": "201944",
  "Gerald Henderson": "201945",
  "Tyler Hansbrough": "201946",
  "Earl Clark": "201947",
  "Austin Daye": "201948",
  "James Johnson": "201949",
  "Jrue Holiday": "201950",
  "Ty Lawson": "201951",
  "Jeff Teague": "201952",
  "Eric Maynor": "201953",
  "Darren Collison": "201954",
  "Omri Casspi": "201956",
  "Byron Mullens": "201957",
  "Rodrigue Beaubois": "201958",
  "Taj Gibson": "201959",
  "DeMarre Carroll": "201960",
  "Wayne Ellington": "201961",
  "Toney Douglas": "201962",
  "Christian Eyenga": "201963",
  "Victor Claver": "201964",
  "Jeff Ayres": "201965",
  "Jermaine Taylor": "201966",
  "Dante Cunningham": "201967",
  "DaJuan Summers": "201969",
  "Sam Young": "201970",
  "DeJuan Blair": "201971",
  "Jon Brockman": "201972",
  "Jonas Jerebko": "201973",
  "Derrick Brown": "201974",
  "Jodie Meeks": "201975",
  "Patrick Beverley": "201976",
  "Marcus Thornton": "201977",
  "Chase Budinger": "201978",
  "Nick Calathes": "201979",
  "Danny Green": "201980",
  "Taylor Griffin": "201981",
  "AJ Price": "201985",
  "Nando De Colo": "201986",
  "Patty Mills": "201988",
  "Lester Hudson": "201991",
  "Garrett Temple": "202066",
  "Marcus Landry": "202068",
  "Jerel McNeal": "202077",
  "Antonio Anderson": "202079",
  "Garret Siler": "202081",
  "Larry Owens": "202082",
  "Wesley Matthews": "202083",
  "Alonzo Gee": "202087",
  "Dionte Christmas": "202091",
  "Reggie Williams": "202130",
  "Cedric Jackson": "202132",
  "Mickell Gladness": "202148",
  "Sundiata Gaines": "202178",
  "Shane Edwards": "202197",
  "Zabian Dowdell": "202220",
  "Terrel Harris": "202227",
  "John Wall": "202322",
  "Evan Turner": "202323",
  "Derrick Favors": "202324",
  "Wesley Johnson": "202325",
  "DeMarcus Cousins": "202326",
  "Ekpe Udoh": "202327",
  "Greg Monroe": "202328",
  "Al-Farouq Aminu": "202329",
  "Gordon Hayward": "202330",
  "Paul George": "202331",
  "Cole Aldrich": "202332",
  "Xavier Henry": "202333",
  "Ed Davis": "202334",
  "Patrick Patterson": "202335",
  "Larry Sanders": "202336",
  "Luke Babbitt": "202337",
  "Kevin Seraphin": "202338",
  "Eric Bledsoe": "202339",
  "Avery Bradley": "202340",
  "James Anderson": "202341",
  "Craig Brackins": "202342",
  "Elliot Williams": "202343",
  "Trevor Booker": "202344",
  "Damion James": "202345",
  "Dominique Jones": "202346",
  "Quincy Pondexter": "202347",
  "Jordan Crawford": "202348",
  "Greivis Vasquez": "202349",
  "Daniel Orton": "202350",
  "Lazar Hayward": "202351",
  "Tibor Pleiss": "202353",
  "Dexter Pittman": "202354",
  "Hassan Whiteside": "202355",
  "Armon Johnson": "202356",
  "Nemanja Bjelica": "202357",
  "Darington Hobson": "202359",
  "Andy Rautins": "202360",
  "Landry Fields": "202361",
  "Lance Stephenson": "202362",
  "Jarvis Varnado": "202363",
  "Devin Ebanks": "202365",
  "Jerome Jordan": "202366",
  "Gani Lawal": "202371",
  "Solomon Alabi": "202374",
  "Luke Harangody": "202376",
  "Pape Sy": "202377",
  "Willie Warren": "202378",
  "Jeremy Evans": "202379",
  "Hamady Ndiaye": "202380",
  "Derrick Caracter": "202382",
  "Ryan Reid": "202385",
  "Ben Uzoh": "202386",
  "Donald Sloan": "202388",
  "Timofey Mozgov": "202389",
  "Gary Neal": "202390",
  "Jeremy Lin": "202391",
  "Sherron Collins": "202395",
  "Samardo Samuels": "202396",
  "Ish Smith": "202397",
  "Jeff Adrien": "202399",
  "Jerome Dyson": "202406",
  "Elijah Millsap": "202407",
  "Marcus Cousin": "202408",
  "Manny Harris": "202412",
  "Chris Johnson": "203187",
  "Justin Dentmon": "202458",
  "Lance Thomas": "202498",
  "Jerry Smith": "202536",
  "Luke Zeller": "202545",
  "Arinze Onuaku": "202620",
  "Courtney Fortson": "202622",
  "Kyrie Irving": "202681",
  "Derrick Williams": "202682",
  "Enes Kanter": "202683",
  "Tristan Thompson": "202684",
  "Jonas Valanciunas": "202685",
  "Jan Vesely": "202686",
  "Bismack Biyombo": "202687",
  "Brandon Knight": "202688",
  "Kemba Walker": "202689",
  "Jimmer Fredette": "202690",
  "Klay Thompson": "202691",
  "Alec Burks": "202692",
  "Markieff Morris": "202693",
  "Marcus Morris Sr.": "202694",
  "Kawhi Leonard": "202695",
  "Nikola Vucevic": "202696",
  "Iman Shumpert": "202697",
  "Chris Singleton": "202698",
  "Tobias Harris": "202699",
  "Donatas Motiejunas": "202700",
  "Nolan Smith": "202701",
  "Kenneth Faried": "202702",
  "Nikola Mirotic": "202703",
  "Reggie Jackson": "202704",
  "MarShon Brooks": "202705",
  "Jordan Hamilton": "202706",
  "JaJuan Johnson": "202707",
  "Norris Cole": "202708",
  "Cory Joseph": "202709",
  "Jimmy Butler": "202710",
  "Bojan Bogdanovic": "202711",
  "Justin Harper": "202712",
  "Kyle Singler": "202713",
  "Shelvin Mack": "202714",
  "Tyler Honeycutt": "202715",
  "Jordan Williams": "202716",
  "Trey Thompkins": "202717",
  "Chandler Parsons": "202718",
  "Jeremy Tyler": "202719",
  "Jon Leuer": "202720",
  "Darius Morris": "202721",
  "Davis Bertans": "202722",
  "Malcolm Lee": "202723",
  "Charles Jenkins": "202724",
  "Josh Harrellson": "202725",
  "Andrew Goudelock": "202726",
  "Travis Leslie": "202727",
  "Keith Benson": "202728",
  "Josh Selby": "202729",
  "Lavoy Allen": "202730",
  "Vernon Macklin": "202731",
  "DeAndre Liggins": "202732",
  "E'Twaun Moore": "202734",
  "Isaiah Thomas": "202738",
  "Edwin Ubiles": "202775",
  "Dwight Buycks": "202779",
  "Cory Higgins": "202809",
  "D.J. Kennedy": "202810",
  "Mychel Thompson": "202814",
  "Dennis Horner": "202862",
  "Chris Wright": "203203",
  "Jeff Foote": "202880",
  "Xavier Silas": "202918",
  "Julyan Stone": "202933",
  "Jeremy Pargo": "202951",
  "Malcolm Thomas": "202952",
  "Brad Wanamaker": "202954",
  "Greg Smith": "202962",
  "Gustavo Ayon": "202970",
  "Josh Akognon": "203006",
  "Anthony Davis": "203076",
  "Michael Kidd-Gilchrist": "203077",
  "Bradley Beal": "203078",
  "Dion Waiters": "203079",
  "Thomas Robinson": "203080",
  "Damian Lillard": "203081",
  "Terrence Ross": "203082",
  "Andre Drummond": "203083",
  "Harrison Barnes": "203084",
  "Austin Rivers": "203085",
  "Meyers Leonard": "203086",
  "Jeremy Lamb": "203087",
  "Kendall Marshall": "203088",
  "John Henson": "203089",
  "Maurice Harkless": "203090",
  "Royce White": "203091",
  "Tyler Zeller": "203092",
  "Terrence Jones": "203093",
  "Andrew Nicholson": "203094",
  "Evan Fournier": "203095",
  "Jared Sullinger": "203096",
  "Fab Melo": "203097",
  "John Jenkins": "203098",
  "Jared Cunningham": "203099",
  "Tony Wroten": "203100",
  "Miles Plumlee": "203101",
  "Arnett Moultrie": "203102",
  "Perry Jones III": "203103",
  "Marquis Teague": "203104",
  "Festus Ezeli": "203105",
  "Jeffery Taylor": "203106",
  "Tomas Satoransky": "203107",
  "Bernard James": "203108",
  "Jae Crowder": "203109",
  "Draymond Green": "203110",
  "Orlando Johnson": "203111",
  "Quincy Acy": "203112",
  "Quincy Miller": "203113",
  "Khris Middleton": "203114",
  "Will Barton": "203115",
  "Tyshawn Taylor": "203116",
  "Doron Lamb": "203117",
  "Mike Scott": "203118",
  "Kim English": "203119",
  "Justin Hamilton": "203120",
  "Darius Miller": "203121",
  "Kevin Murphy": "203122",
  "Kostas Papanikolaou": "203123",
  "Kyle O'Quinn": "203124",
  "Kris Joseph": "203126",
  "Furkan Aldemir": "203128",
  "Tornike Shengelia": "203129",
  "Darius Johnson-Odom": "203130",
  "Robbie Hummel": "203133",
  "Robert Sacre": "203135",
  "Ognjen Kuzmic": "203136",
  "Hollis Thompson": "203138",
  "Viacheslav Kravtsov": "203139",
  "Mirza Teletovic": "203141",
  "Chris Copeland": "203142",
  "Pablo Prigioni": "203143",
  "Alexey Shved": "203144",
  "Kent Bazemore": "203145",
  "Maalik Wayns": "203146",
  "Chris Smith": "1630607",
  "Brian Roberts": "203148",
  "Henry Sims": "203156",
  "Kevin Jones": "203158",
  "Scott Machado": "203159",
  "Ben Hansbrough": "203162",
  "Tony Mitchell": "203502",
  "Willie Reed": "203186",
  "Diante Garrett": "203197",
  "DeQuan Jones": "203199",
  "Justin Holiday": "203200",
  "JaMychal Green": "203210",
  "James Nunnally": "203263",
  "Jorge Gutierrez": "203268",
  "Toure' Murry": "203315",
  "Tim Ohlbrecht": "203317",
  "Aron Baynes": "203382",
  "Nerlens Noel": "203457",
  "Alex Len": "203458",
  "Allen Crabbe": "203459",
  "Andre Roberson": "203460",
  "Anthony Bennett": "203461",
  "Archie Goodwin": "203462",
  "Ben McLemore": "203463",
  "Brandon Paul": "203464",
  "Carrick Felix": "203467",
  "CJ McCollum": "203468",
  "Cody Zeller": "203469",
  "Dennis Schroder": "203471",
  "Dewayne Dedmon": "203473",
  "DJ Stephens": "203474",
  "Erick Green": "203475",
  "Gorgui Dieng": "203476",
  "Isaiah Canaan": "203477",
  "Jamaal Franklin": "203479",
  "James Southerland": "203480",
  "Jeff Withey": "203481",
  "Kelly Olynyk": "203482",
  "Kentavious Caldwell-Pope": "203484",
  "Lorenzo Brown": "203485",
  "Mason Plumlee": "203486",
  "Michael Carter-Williams": "203487",
  "Mike Muscala": "203488",
  "Nate Wolters": "203489",
  "Otto Porter Jr.": "203490",
  "Peyton Siva": "203491",
  "Ray McCallum": "203492",
  "Reggie Bullock": "203493",
  "Ricky Ledo": "203495",
  "Robert Covington": "203496",
  "Rudy Gobert": "203497",
  "Shabazz Muhammad": "203498",
  "Shane Larkin": "203499",
  "Steven Adams": "203500",
  "Tim Hardaway Jr.": "203501",
  "Tony Snell": "203503",
  "Trey Burke": "203504",
  "Vander Blue": "203505",
  "Victor Oladipo": "203506",
  "Giannis Antetokounmpo": "203507",
  "Sergey Karasev": "203508",
  "Pierre Jackson": "203510",
  "Grant Jerrett": "203511",
  "Lucas Nogueira": "203512",
  "Erik Murphy": "203513",
  "Phil Pressey": "203515",
  "James Ennis III": "203516",
  "Nemanja Nedovic": "203517",
  "Alex Abrines": "203518",
  "Adonis Thomas": "203519",
  "Matthew Dellavedova": "203521",
  "Solomon Hill": "203524",
  "Raul Neto": "203526",
  "Ryan Kelly": "203527",
  "Joffrey Lauvergne": "203530",
  "Gal Mekel": "203539",
  "Gigi Datome": "203540",
  "Vitor Faverani": "203543",
  "Pero Antic": "203544",
  "Miroslav Raduljica": "203545",
  "Ian Clark": "203546",
  "Elias Harris": "203548",
  "Seth Curry": "203552",
  "Brandon Davies": "203561",
  "Kalin Lucas": "203564",
  "Patrick Christopher": "203565",
  "Chris Babb": "203569",
  "Larry Drew II": "203580",
  "Troy Daniels": "203584",
  "Rodney McGruder": "203585",
  "Trey McKinney-Jones": "203590",
  "Jonathon Simmons": "203613",
  "Thanasis Antetokounmpo": "203648",
  "Norvel Pelle": "203658",
  "Reggie Hearn": "203687",
  "Josh Magette": "203705",
  "C.J. Williams": "203710",
  "PJ Hairston": "203798",
  "Will Cherry": "203805",
  "Casper Ware": "203810",
  "Scotty Hopson": "203816",
  "Russ Smith": "203893",
  "Shabazz Napier": "203894",
  "Jordan McRae": "203895",
  "Zach LaVine": "203897",
  "Tyler Ennis": "203898",
  "Markel Brown": "203900",
  "Elfrid Payton": "203901",
  "Semaj Christon": "203902",
  "Jordan Clarkson": "203903",
  "Devyn Marble": "203906",
  "KJ McDaniels": "203909",
  "Nick Johnson": "203910",
  "CJ Wilcox": "203912",
  "Jabari Brown": "203913",
  "Gary Harris": "203914",
  "Spencer Dinwiddie": "203915",
  "Nik Stauskas": "203917",
  "Rodney Hood": "203918",
  "Jordan Adams": "203919",
  "Khem Birch": "203920",
  "Cleanthony Early": "203921",
  "Glenn Robinson III": "203922",
  "James Young": "203923",
  "Jerami Grant": "203924",
  "Joe Harris": "203925",
  "Doug McDermott": "203926",
  "Cory Jefferson": "203928",
  "Sean Kilpatrick": "203930",
  "Aaron Gordon": "203932",
  "T.J. Warren": "203933",
  "Lamar Patterson": "203934",
  "Marcus Smart": "203935",
  "Kyle Anderson": "203937",
  "Dwight Powell": "203939",
  "Adreian Payne": "203940",
  "Noah Vonleh": "203943",
  "Julius Randle": "203944",
  "Alex Kirk": "203945",
  "Cameron Bairstow": "203946",
  "Johnny O'Bryant III": "203948",
  "James Michael McAdoo": "203949",
  "Jarnell Stokes": "203950",
  "Keith Appling": "203951",
  "Andrew Wiggins": "203952",
  "Jabari Parker": "203953",
  "Joel Embiid": "203954",
  "Bryce Cotton": "203955",
  "Mitch McGary": "203956",
  "Dante Exum": "203957",
  "Andre Dawkins": "203958",
  "JaKarr Sampson": "203960",
  "Eric Moreland": "203961",
  "Josh Huestis": "203962",
  "Shayne Whittington": "203963",
  "Jamil Wilson": "203966",
  "Dario Saric": "203967",
  "Jerrelle Benimon": "203968",
  "Clint Capela": "203991",
  "Bogdan Bogdanovic": "203992",
  "Jusuf Nurkic": "203994",
  "Damien Inglis": "203996",
  "Bruno Caboclo": "203998",
  "Nikola Jokic": "203999",
  "Kristaps Porzingis": "204001",
  "Edy Tavares": "204002",
  "Damjan Rudez": "204014",
  "Tyler Johnson": "204020",
  "Sim Bhullar": "204021",
  "Jack Cooley": "204022",
  "Tim Frazier": "204025",
  "Tarik Black": "204028",
  "David Wear": "204033",
  "Travis Wear": "204037",
  "Langston Galloway": "204038",
  "Zoran Dragic": "204054",
  "Joe Ingles": "204060",
  "David Stockton": "204065",
  "John Holland": "204066",
  "Jarell Eddie": "204067",
  "Drew Gordon": "204079",
  "Xavier Munford": "204098",
  "Omari Johnson": "204179",
  "Greg Whittington": "204222",
  "T.J. McConnell": "204456",
  "Jahlil Okafor": "1626143",
  "Emmanuel Mudiay": "1626144",
  "Tyus Jones": "1626145",
  "Cliff Alexander": "1626146",
  "Justin Anderson": "1626147",
  "Anthony Brown": "1626148",
  "Montrezl Harrell": "1626149",
  "Andrew Harrison": "1626150",
  "Aaron Harrison": "1626151",
  "Delon Wright": "1626153",
  "RJ Hunter": "1626154",
  "Sam Dekker": "1626155",
  "D'Angelo Russell": "1626156",
  "Karl-Anthony Towns": "1626157",
  "Richaun Holmes": "1626158",
  "Justise Winslow": "1626159",
  "Willie Cauley-Stein": "1626161",
  "Kelly Oubre Jr.": "1626162",
  "Frank Kaminsky": "1626163",
  "Devin Booker": "1626164",
  "Cameron Payne": "1626166",
  "Myles Turner": "1626167",
  "Trey Lyles": "1626168",
  "Stanley Johnson": "1626169",
  "Jerian Grant": "1626170",
  "Bobby Portis": "1626171",
  "Kevon Looney": "1626172",
  "Rashad Vaughn": "1626173",
  "Christian Wood": "1626174",
  "Jordan Mickey": "1626175",
  "Rakeem Christmas": "1626176",
  "Dakari Johnson": "1626177",
  "Rondae Hollis-Jefferson": "1626178",
  "Terry Rozier": "1626179",
  "Norman Powell": "1626181",
  "Branden Dawson": "1626183",
  "Chasson Randle": "1626184",
  "Jarell Martin": "1626185",
  "Michael Frazier": "1626187",
  "Quinn Cook": "1626188",
  "Chris McCullough": "1626191",
  "Pat Connaughton": "1626192",
  "Willy Hernangomez": "1626195",
  "Josh Richardson": "1626196",
  "Darrun Hilliard": "1626199",
  "Joe Young": "1626202",
  "Treveon Graham": "1626203",
  "Larry Nance Jr.": "1626204",
  "Vincent Hunter": "1626205",
  "Keifer Sykes": "1626208",
  "Mario Hezonja": "1626209",
  "Alan Williams": "1626210",
  "Bryce Dejean-Jones": "1626214",
  "Royce O'Neale": "1626220",
  "Cedi Osman": "1626224",
  "Luis Montero": "1626242",
  "Cristiano Felicio": "1626245",
  "Boban Marjanovic": "1626246",
  "Duje Dukan": "1626251",
  "Axel Toupane": "1626253",
  "Maurice Ndour": "1626254",
  "Salah Mejri": "1626257",
  "Malcolm Miller": "1626259",
  "Coty Clarke": "1626262",
  "JJ O'Brien": "1626266",
  "Marcelo Huertas": "1626273",
  "Jordan Sibert": "1626296",
  "Jacob Pullen": "1626643",
  "Jonathan Gibson": "1626780",
  "Malcolm Delaney": "1627098",
  "Walter Lemon Jr.": "1627215",
  "Alex Stepheson": "1627293",
  "Briante Weber": "1627362",
  "Julian Washburn": "1627395",
  "Ben Simmons": "1627732",
  "Dragan Bender": "1627733",
  "Domantas Sabonis": "1627734",
  "Wade Baldwin IV": "1627735",
  "Malik Beasley": "1627736",
  "Marquese Chriss": "1627737",
  "Deyonta Davis": "1627738",
  "Kris Dunn": "1627739",
  "Henry Ellenson": "1627740",
  "Buddy Hield": "1627741",
  "Brandon Ingram": "1627742",
  "Demetrius Jackson": "1627743",
  "Brice Johnson": "1627744",
  "Damian Jones": "1627745",
  "Skal Labissiere": "1627746",
  "Caris LeVert": "1627747",
  "Thon Maker": "1627748",
  "Dejounte Murray": "1627749",
  "Jamal Murray": "1627750",
  "Jakob Poeltl": "1627751",
  "Taurean Prince": "1627752",
  "Zhou Qi": "1627753",
  "Diamond Stone": "1627754",
  "Tyler Ulis": "1627755",
  "Denzel Valentine": "1627756",
  "Stephen Zimmerman": "1627757",
  "Ron Baker": "1627758",
  "Jaylen Brown": "1627759",
  "Cat Barber": "1627760",
  "DeAndre' Bembry": "1627761",
  "Joel Bolomboy": "1627762",
  "Malcolm Brogdon": "1627763",
  "Cheick Diallo": "1627767",
  "Kay Felder": "1627770",
  "Michael Gbinije": "1627771",
  "Daniel Hamilton": "1627772",
  "AJ Hammons": "1627773",
  "Jake Layman": "1627774",
  "Patrick McCaw": "1627775",
  "Georges Niang": "1627777",
  "Chinanu Onuaku": "1627778",
  "Marcus Paige": "1627779",
  "Gary Payton II": "1627780",
  "Malachi Richardson": "1627781",
  "Wayne Selden": "1627782",
  "Pascal Siakam": "1627783",
  "Jarrod Uthoff": "1627784",
  "Isaiah Whitehead": "1627785",
  "Troy Williams": "1627786",
  "Kyle Wiltjer": "1627787",
  "Furkan Korkmaz": "1627788",
  "Timothe Luwawu-Cabarrot": "1627789",
  "Ante Zizic": "1627790",
  "Ben Bentil": "1627791",
  "Yogi Ferrell": "1627812",
  "Damion Lee": "1627814",
  "Sheldon Mac": "1627815",
  "Alex Poythress": "1627816",
  "Tim Quarterman": "1627817",
  "Isaiah Taylor": "1627819",
  "Tyrone Wallace": "1627820",
  "James Webb III": "1627821",
  "Petr Cornelie": "1627822",
  "Juancho Hernangomez": "1627823",
  "Guerschon Yabusele": "1627824",
  "Ivica Zubac": "1627826",
  "Dorian Finney-Smith": "1627827",
  "Fred VanVleet": "1627832",
  "Georgios Papagiannis": "1627834",
  "Paul Zipser": "1627835",
  "Abdel Nader": "1627846",
  "Shawn Long": "1627848",
  "Daniel Ochefu": "1627849",
  "Marshall Plumlee": "1627850",
  "Mindaugas Kuzminskas": "1627851",
  "Nicolas Brussino": "1627852",
  "Ryan Arcidiacono": "1627853",
  "Bryn Forbes": "1627854",
  "Okaro White": "1627855",
  "Matt Costello": "1627856",
  "Kyle Collinsworth": "1627858",
  "Mike Tobey": "1627861",
  "Danuel House Jr.": "1627863",
  "Jameel Warney": "1627866",
  "Patricio Garino": "1627868",
  "Marcus Georges-Hunt": "1627875",
  "Nicolas Laprovittola": "1627879",
  "Jalen Jones": "1627883",
  "Derrick Jones Jr.": "1627884",
  "Shaquille Harrison": "1627885",
  "Alex Caruso": "1627936",
  "Josh Gray": "1627982",
  "Myke Henry": "1627988",
  "David Nwaba": "1628021",
  "Alfonzo McKinnie": "1628035",
  "Jordan Loyd": "1628070",
  "Gabe York": "1628221",
  "Paris Bass": "1628238",
  "Mitchell Creek": "1628249",
  "Markelle Fultz": "1628365",
  "Lonzo Ball": "1628366",
  "Josh Jackson": "1628367",
  "De'Aaron Fox": "1628368",
  "Jayson Tatum": "1628369",
  "Malik Monk": "1628370",
  "Jonathan Isaac": "1628371",
  "Dennis Smith Jr.": "1628372",
  "Frank Ntilikina": "1628373",
  "Lauri Markkanen": "1628374",
  "Donovan Mitchell": "1628378",
  "Luke Kennard": "1628379",
  "Zach Collins": "1628380",
  "John Collins": "1628381",
  "Justin Jackson": "1628382",
  "Justin Patton": "1628383",
  "OG Anunoby": "1628384",
  "Harry Giles III": "1628385",
  "Jarrett Allen": "1628386",
  "Ike Anigbogu": "1628387",
  "T.J. Leaf": "1628388",
  "Bam Adebayo": "1628389",
  "Terrance Ferguson": "1628390",
  "D.J. Wilson": "1628391",
  "Isaiah Hartenstein": "1628392",
  "Jawun Evans": "1628393",
  "Anzejs Pasecniks": "1628394",
  "Jordan Bell": "1628395",
  "Tony Bradley": "1628396",
  "Ivan Rabb": "1628397",
  "Kyle Kuzma": "1628398",
  "Tyler Lydon": "1628399",
  "Semi Ojeleye": "1628400",
  "Derrick White": "1628401",
  "Frank Jackson": "1628402",
  "Caleb Swanigan": "1628403",
  "Josh Hart": "1628404",
  "Johnathan Motley": "1628405",
  "Dwayne Bacon": "1628407",
  "P.J. Dozier": "1628408",
  "Alec Peters": "1628409",
  "Edmond Sumner": "1628410",
  "Wes Iwundu": "1628411",
  "Frank Mason": "1628412",
  "Jonah Bolden": "1628413",
  "Sindarius Thornwell": "1628414",
  "Dillon Brooks": "1628415",
  "Tyler Dorsey": "1628416",
  "Jaron Blossomgame": "1628417",
  "Thomas Bryant": "1628418",
  "Cameron Oliver": "1628419",
  "Monte Morris": "1628420",
  "Devin Robinson": "1628421",
  "Damyean Dotson": "1628422",
  "Kobi Simmons": "1628424",
  "Sterling Brown": "1628425",
  "Vlatko Cancar": "1628427",
  "Charles Cooke": "1628429",
  "Nigel Williams-Goss": "1628430",
  "Davon Reed": "1628432",
  "Luke Kornet": "1628436",
  "Isaiah Hicks": "1628439",
  "Kadeem Allen": "1628443",
  "Jabari Bird": "1628444",
  "Chris Boucher": "1628449",
  "Eric Mika": "1628450",
  "Jacob Wiley": "1628451",
  "Milos Teodosic": "1628462",
  "Tyler Cavanaugh": "1628463",
  "Daniel Theis": "1628464",
  "Maxi Kleber": "1628467",
  "Antonio Blakeney": "1628469",
  "Torrey Craig": "1628470",
  "Matt Williams Jr.": "1628475",
  "Derrick Walton Jr.": "1628476",
  "Gian Clavell": "1628492",
  "Mangok Mathiang": "1628493",
  "Milton Doyle": "1628495",
  "Antonius Cleveland": "1628499",
  "Ben Moore": "1628500",
  "Nigel Hayes": "1628502",
  "Jamel Artis": "1628503",
  "Xavier Rathan-Mayes": "1628504",
  "Troy Caupain": "1628505",
  "London Perrantes": "1628506",
  "Andrew White III": "1628510",
  "Naz Mitrou-Long": "1628513",
  "Isaiah Briscoe": "1628515",
  "Amile Jefferson": "1628518",
  "Jaylen Morris": "1628537",
  "Mychal Mulder": "1628539",
  "Erik McCree": "1628571",
  "Amida Brimah": "1628578",
  "Craig Sword": "1628591",
  "Dusty Hannahs": "1628605",
  "Billy Garrett": "1628656",
  "Rodney Purvis": "1628681",
  "Tahjere McCall": "1628769",
  "Paul Watson": "1628778",
  "Aaron Jackson": "1628935",
  "Rawle Alkins": "1628959",
  "Grayson Allen": "1628960",
  "Kostas Antetokounmpo": "1628961",
  "Udoka Azubuike": "1628962",
  "Marvin Bagley III": "1628963",
  "Mo Bamba": "1628964",
  "Keita Bates-Diop": "1628966",
  "Brian Bowen II": "1628968",
  "Mikal Bridges": "1628969",
  "Miles Bridges": "1628970",
  "Bruce Brown": "1628971",
  "Troy Brown Jr.": "1628972",
  "Jalen Brunson": "1628973",
  "Jevon Carter": "1628975",
  "Wendell Carter Jr.": "1628976",
  "Hamidou Diallo": "1628977",
  "Donte DiVincenzo": "1628978",
  "Trevon Duval": "1628979",
  "Jacob Evans": "1628980",
  "Bruno Fernando": "1628981",
  "Melvin Frazier Jr.": "1628982",
  "Shai Gilgeous-Alexander": "1628983",
  "Devonte' Graham": "1628984",
  "Devon Hall": "1628985",
  "Kevin Hervey": "1628987",
  "Aaron Holiday": "1628988",
  "Kevin Huerter": "1628989",
  "Chandler Hutchison": "1628990",
  "Jaren Jackson Jr.": "1628991",
  "Alize Johnson": "1628993",
  "George King": "1628994",
  "Kevin Knox II": "1628995",
  "Caleb Martin": "1628997",
  "Cody Martin": "1628998",
  "Yante Maten": "1628999",
  "De'Anthony Melton": "1629001",
  "Chimezie Metu": "1629002",
  "Shake Milton": "1629003",
  "Svi Mykhailiuk": "1629004",
  "Malik Newman": "1629005",
  "Josh Okogie": "1629006",
  "Jontay Porter": "1629007",
  "Michael Porter Jr.": "1629008",
  "Jerome Robinson": "1629010",
  "Mitchell Robinson": "1629011",
  "Collin Sexton": "1629012",
  "Landry Shamet": "1629013",
  "Anfernee Simons": "1629014",
  "Zhaire Smith": "1629015",
  "Omari Spellman": "1629016",
  "Khyri Thomas": "1629017",
  "Gary Trent Jr.": "1629018",
  "Allonzo Trier": "1629019",
  "Jarred Vanderbilt": "1629020",
  "Moritz Wagner": "1629021",
  "Lonnie Walker IV": "1629022",
  "P.J. Washington": "1629023",
  "Kenrich Williams": "1629026",
  "Trae Young": "1629027",
  "Deandre Ayton": "1629028",
  "Luka Doncic": "1629029",
  "Theo Pinson": "1629033",
  "Ray Spalding": "1629034",
  "Carsen Edwards": "1629035",
  "Shamorie Ponds": "1629044",
  "Bonzie Colson": "1629045",
  "Goga Bitadze": "1629048",
  "Oshae Brissett": "1629052",
  "Vincent Edwards": "1629053",
  "Donte Grantham": "1629055",
  "Terence Davis": "1629056",
  "Robert Williams III": "1629057",
  "Dzanan Musa": "1629058",
  "Elie Okobo": "1629059",
  "Rui Hachimura": "1629060",
  "Deng Adel": "1629061",
  "Ky Bowman": "1629065",
  "Rodions Kurucs": "1629066",
  "Isaac Bonga": "1629067",
  "Tyler Cook": "1629076",
  "Arnoldas Kulboka": "1629083",
  "Elijah Bryant": "1629091",
  "Tyler Davis": "1629093",
  "Marcus Derrickson": "1629094",
  "Brandon Sampson": "1629102",
  "Kelan Martin": "1629103",
  "Gary Clark": "1629109",
  "Jock Landale": "1629111",
  "Angel Delgado": "1629116",
  "Wenyen Gabriel": "1629117",
  "Thomas Welsh": "1629118",
  "Jaylen Adams": "1629121",
  "J.P. Macura": "1629122",
  "Jared Terrell": "1629123",
  "Deonte Burton": "1629126",
  "Duncan Robinson": "1629130",
  "Daryl Macon": "1629133",
  "Kendrick Nunn": "1629134",
  "Yuta Watanabe": "1629139",
  "Johnathan Williams": "1629140",
  "Joe Chealey": "1629147",
  "Emanuel Terry": "1629150",
  "Ryan Broekhoff": "1629151",
  "DeVaughn Akoon-Purcell": "1629152",
  "Zach Lofton": "1629155",
  "Jordan McLaughlin": "1629162",
  "Brandon Goodwin": "1629164",
  "BJ Johnson": "1629168",
  "Chris Chiozza": "1629185",
  "Jemerrio Jones": "1629203",
  "Gabe Vincent": "1629216",
  "Drew Eubanks": "1629234",
  "Cameron Reynolds": "1629244",
  "Juan Toscano-Anderson": "1629308",
  "Trayvon Palmer": "1629309",
  "Haywood Highsmith": "1629312",
  "Alen Smailagic": "1629346",
  "Isaac Humphries": "1629353",
  "Dairis Bertans": "1629541",
  "Zylan Cheatham": "1629597",
  "Chris Clemons": "1629598",
  "Amir Coffey": "1629599",
  "Jarron Cumberland": "1629600",
  "Javin DeLaurier": "1629602",
  "Mamadi Diakite": "1629603",
  "CJ Elleby": "1629604",
  "Tacko Fall": "1629605",
  "Robert Franks": "1629606",
  "Jared Harper": "1629607",
  "Dewan Hernandez": "1629608",
  "DaQuan Jeffries": "1629610",
  "Terance Mann": "1629611",
  "Reggie Perry": "1629617",
  "Myles Powell": "1629619",
  "Justin Robinson": "1629620",
  "Marial Shayok": "1629621",
  "Max Strus": "1629622",
  "Lindell Wigginton": "1629623",
  "Justin Wright-Foreman": "1629625",
  "Bol Bol": "1629626",
  "Zion Williamson": "1629627",
  "RJ Barrett": "1629628",
  "Cam Reddish": "1629629",
  "Ja Morant": "1629630",
  "De'Andre Hunter": "1629631",
  "Coby White": "1629632",
  "Jarrett Culver": "1629633",
  "Brandon Clarke": "1629634",
  "Sekou Doumbouya": "1629635",
  "Darius Garland": "1629636",
  "Jaxson Hayes": "1629637",
  "Nickeil Alexander-Walker": "1629638",
  "Tyler Herro": "1629639",
  "Keldon Johnson": "1629640",
  "Romeo Langford": "1629641",
  "Nassir Little": "1629642",
  "Chuma Okeke": "1629643",
  "KZ Okpala": "1629644",
  "Kevin Porter Jr.": "1629645",
  "Charles Bassey": "1629646",
  "Darius Bazley": "1629647",
  "Jordan Bone": "1629648",
  "Ignas Brazdeikis": "1629649",
  "Moses Brown": "1629650",
  "Nic Claxton": "1629651",
  "Luguentz Dort": "1629652",
  "Devon Dotson": "1629653",
  "Daniel Gafford": "1629655",
  "Quentin Grimes": "1629656",
  "Kyle Guy": "1629657",
  "Jaylen Hoard": "1629658",
  "Talen Horton-Tucker": "1629659",
  "Ty Jerome": "1629660",
  "Cameron Johnson": "1629661",
  "Mfiondu Kabengele": "1629662",
  "Louis King": "1629663",
  "Jalen Lecque": "1629665",
  "Jalen McDaniels": "1629667",
  "Zach Norvell Jr.": "1629668",
  "Jaylen Nowell": "1629669",
  "Jordan Nwora": "1629670",
  "Miye Oni": "1629671",
  "Eric Paschall": "1629672",
  "Jordan Poole": "1629673",
  "Neemias Queta": "1629674",
  "Naz Reid": "1629675",
  "Isaiah Roby": "1629676",
  "Luka Samanic": "1629677",
  "Admiral Schofield": "1629678",
  "Matisse Thybulle": "1629680",
  "Killian Tillie": "1629681",
  "Tremont Waters": "1629682",
  "Quinndary Weatherspoon": "1629683",
  "Grant Williams": "1629684",
  "Dylan Windler": "1629685",
  "Deividas Sirvydis": "1629686",
  "Aric Holman": "1629689",
  "Adam Mokoka": "1629690",
  "Didi Louzada": "1629712",
  "Justin James": "1629713",
  "Jarrell Brantley": "1629714",
  "Marques Bolden": "1629716",
  "Armoni Brooks": "1629717",
  "Charlie Brown Jr.": "1629718",
  "Devontae Cacok": "1629719",
  "John Konchar": "1629723",
  "Vic Law": "1629724",
  "Jeremiah Martin": "1629725",
  "Garrison Mathews": "1629726",
  "Josh Reaves": "1629729",
  "Rayjon Tucker": "1629730",
  "Dean Wade": "1629731",
  "Kyle Alexander": "1629734",
  "Chris Silva": "1629735",
  "Vincent Poirier": "1629738",
  "William Howard": "1629739",
  "Nicolo Melli": "1629740",
  "Marko Guduric": "1629741",
  "Stanton Kidd": "1629742",
  "Donta Hall": "1629743",
  "Matt Thomas": "1629744",
  "Tariq Owens": "1629745",
  "Javonte Green": "1629750",
  "Dakota Mathias": "1629751",
  "Juwan Morgan": "1629752",
  "Hassani Gravett": "1629755",
  "Daulton Hommes": "1629756",
  "Matt Mooney": "1629760",
  "Shaq Buchanan": "1629783",
  "Tyler Hall": "1629788",
  "Keljin Blevins": "1629833",
  "Jaysean Paige": "1629873",
  "Xavier Moon": "1629875",
  "Ahmad Caver": "1629958",
  "Devin Cannady": "1629962",
  "Anthony Edwards": "1630162",
  "LaMelo Ball": "1630163",
  "James Wiseman": "1630164",
  "Killian Hayes": "1630165",
  "Deni Avdija": "1630166",
  "Obi Toppin": "1630167",
  "Onyeka Okongwu": "1630168",
  "Tyrese Haliburton": "1630169",
  "Devin Vassell": "1630170",
  "Isaac Okoro": "1630171",
  "Patrick Williams": "1630172",
  "Precious Achiuwa": "1630173",
  "Aaron Nesmith": "1630174",
  "Cole Anthony": "1630175",
  "Vernon Carey Jr.": "1630176",
  "Theo Maledon": "1630177",
  "Tyrese Maxey": "1630178",
  "Tyrell Terry": "1630179",
  "Saddiq Bey": "1630180",
  "R.J. Hampton": "1630181",
  "Josh Green": "1630182",
  "Jaden McDaniels": "1630183",
  "Kira Lewis Jr.": "1630184",
  "Nico Mannion": "1630185",
  "Jahmi'us Ramsey": "1630186",
  "Daniel Oturu": "1630187",
  "Jalen Smith": "1630188",
  "Tyler Bey": "1630189",
  "Elijah Hughes": "1630190",
  "Isaiah Stewart": "1630191",
  "Zeke Nnaji": "1630192",
  "Immanuel Quickley": "1630193",
  "Paul Reed": "1630194",
  "Leandro Bolmaro": "1630195",
  "Aleksej Pokusevski": "1630197",
  "Isaiah Joe": "1630198",
  "Cassius Stanley": "1630199",
  "Tre Jones": "1630200",
  "Malachi Flynn": "1630201",
  "Payton Pritchard": "1630202",
  "Grant Riller": "1630203",
  "Ashton Hagans": "1630204",
  "Lamar Stevens": "1630205",
  "Jay Scrubb": "1630206",
  "Nate Hinton": "1630207",
  "Nick Richards": "1630208",
  "Omer Yurtseven": "1630209",
  "Markus Howard": "1630210",
  "Karim Mane": "1630211",
  "Xavier Tillman": "1630214",
  "Jared Butler": "1630215",
  "Cassius Winston": "1630216",
  "Desmond Bane": "1630217",
  "Robert Woodard II": "1630218",
  "Skylar Mays": "1630219",
  "Josh Hall": "1630221",
  "Mason Jones": "1630222",
  "Jalen Harris": "1630223",
  "Jalen Green": "1630224",
  "Isaiah Todd": "1630225",
  "Daishen Nix": "1630227",
  "Jonathan Kuminga": "1630228",
  "Naji Marshall": "1630230",
  "Kenyon Martin Jr.": "1630231",
  "Nathan Knight": "1630233",
  "Ty-Shon Alexander": "1630234",
  "Trent Forrest": "1630235",
  "Anthony Lamb": "1630237",
  "Malik Fitts": "1630238",
  "Saben Lee": "1630240",
  "Sam Merrill": "1630241",
  "Trevelin Queen": "1630243",
  "Ayo Dosunmu": "1630245",
  "Vit Krejci": "1630249",
  "Marko Simonovic": "1630250",
  "Sean McDermott": "1630253",
  "Jae'Sean Tate": "1630256",
  "Jon Teske": "1630257",
  "Anthony Gill": "1630264",
  "Will Magnay": "1630266",
  "Facundo Campazzo": "1630267",
  "Nate Darling": "1630268",
  "Xavier Sneed": "1630270",
  "Brodric Thomas": "1630271",
  "Freddie Gillespie": "1630273",
  "Ade Murkey": "1630278",
  "Zavier Simpson": "1630285",
  "Trevon Scott": "1630286",
  "Jeff Dowtin": "1630288",
  "Braxton Key": "1630296",
  "Rob Edwards": "1630306",
  "Lindy Waters III": "1630322",
  "Gabriel Deck": "1630466",
  "Luca Vildoza": "1630492",
  "David Johnson": "1630525",
  "Jeremiah Robinson-Earl": "1630526",
  "Brandon Boston Jr.": "1630527",
  "Josh Christopher": "1630528",
  "Herbert Jones": "1630529",
  "Trey Murphy III": "1630530",
  "Jaden Springer": "1630531",
  "Franz Wagner": "1630532",
  "Ziaire Williams": "1630533",
  "Greg Brown III": "1630535",
  "Sharife Cooper": "1630536",
  "Chris Duarte": "1630537",
  "Bones Hyland": "1630538",
  "Kai Jones": "1630539",
  "Miles McBride": "1630540",
  "Moses Moody": "1630541",
  "Isaiah Jackson": "1630543",
  
  "James Bouknight": "1630547",
  "Day'Ron Sharpe": "1630549",
  "JT Thor": "1630550",
  "Justin Champagnie": "1630551",
  "Jalen Johnson": "1630552",
  "Keon Johnson": "1630553",
  "Jason Preston": "1630554",
  "Joel Ayayi": "1630555",
  "Kessler Edwards": "1630556",
  "Corey Kispert": "1630557",
  "Davion Mitchell": "1630558",
  "Austin Reaves": "1630559",
  "Cam Thomas": "1630560",
  "David Duke Jr.": "1630561",
  "Joshua Primo": "1630563",
  "Aaron Henry": "1630565",
  "Scottie Barnes": "1630567",
  "Luka Garza": "1630568",
  "Trendon Watford": "1630570",
  "Sandro Mamukelashvili": "1630572",
  "Sam Hauser": "1630573",
  "Scottie Lewis": "1630575",
  "Alperen Sengun": "1630578",
  "Jericho Sims": "1630579",
  "Joe Wieskamp": "1630580",
  "Josh Giddey": "1630581",
  "Yves Pons": "1630582",
  "Santi Aldama": "1630583",
  "Marcus Garrett": "1630585",
  "Usman Garuba": "1630586",
  "Isaiah Livers": "1630587",
  "Moses Wright": "1630589",
  "Jalen Suggs": "1630591",
  "McKinley Wright IV": "1630593",
  "Cade Cunningham": "1630595",
  "Evan Mobley": "1630596",
  "Aaron Wiggins": "1630598",
  "Chaundee Brown Jr.": "1630602",
  "JaQuori McLaughlin": "1630605",
  "Javonte Smart": "1630606",
  "DeJon Jarreau": "1630610",
  "RJ Nembhard Jr.": "1630612",
  "Duane Washington Jr.": "1630613",
  "Feron Hunt": "1630624",
  "Dalano Banton": "1630625",
  "Jose Alvarado": "1630631",
  "Carlik Jones": "1630637",
  "MJ Walker": "1630640",
  "Jay Huff": "1630643",
  "Mac McClung": "1630644",
  "Eugene Omoruyi": "1630647",
  "Jordan Schakel": "1630648",
  "Terry Taylor": "1630678",
  "Georgios Kalaitzakis": "1630686",
  "Ish Wainright": "1630688",
  "Jamorko Pickett": "1630691",
  "Jordan Goodwin": "1630692",
  "Jaime Echenique": "1630693",
  "Micah Potter": "1630695",
  "Kevin Pangos": "1630698",
  "Malik Ellison": "1630707",
  "Aleem Ford": "1630758",
  "Cameron McGriff": "1630787",
  "Malcolm Hill": "1630792",
  "Olivier Sarr": "1630846",
  "Gabriel Lundberg": "1630994"
}
const cPlayers = [
  'Immanuel Quickley',
  'Obi Toppin',
  'Quentin Grimes',
  'Andrew Wiggins',
  "Isaiah Jackson",
  'Cam Thomas',
    'Cole Anthony', 
    'Jalen Suggs',
    'Ayo Dosunmu',
    'Herbert Jones',
    'Jonathan Kuminga',
    'Chris Duarte',
    'Franz Wagner',
  'James Harden',
  'Russell Westbrook',
  'DeMar DeRozan',
  'Josh Giddey',
  'Evan Mobley',
  'Tobias Harris',
  'Giannis Antetokounmpo',
  'Talen Horton-Tucker',
  'Harrison Barnes',
  'Draymond Green',
  'Spencer Dinwiddie',
  'Gordon Hayward',
  'Mike Conley',
  'Jonas Valanciunas',
  'Kyle Anderson',
  'Tony Snell',
  'CJ McCollum',
  'Montrezl Harrell',
  'Robin Lopez',
  'Bismack Biyombo',
  'Jakob Poeltl',
  'Robert Covington',
  'Danny Green',
  'Karl-Anthony Towns',
  'Jaylen Brown',
  'Marcus Smart',
  'Paul Millsap',
  'Lonzo Ball',
  'Wesley Matthews',
  'Justin Anderson',
  'LeBron James',
  'Blake Griffin',
  'Greg Monroe',
  'Caris LeVert',
  'Terry Rozier',
  'Lou Williams',
  'Trevor Ariza',
  'Carmelo Anthony',
  'Trae Young',
  'Terrence Ross',
  'Dwight Howard',
  'Kemba Walker',
  'Jusuf Nurkic',
  'Tristan Thompson',
  'Devin Booker',
  'Aaron Gordon',
  'Anthony Davis',
  'Evan Fournier',
  'Will Barton',
  'Grayson Allen',
  'Keldon Johnson',
  'Hamidou Diallo',
  'Matisse Thybulle',
  'LaMelo Ball',
  'Avery Bradley',
  'Ben McLemore',
  'Kent Bazemore',
  'Josh Richardson',
  'Joel Embiid',
  'Chris Paul',
  'Daniel Theis',
  'Jarrett Allen',
  'Reggie Bullock',
  'Mikal Bridges',
  'Austin Reaves',
  'Nikola Jokic',
  'DeAndre Jordan',
  'Steven Adams',
  'Reggie Jackson',
  'Rajon Rondo',
  'Dennis Schroder',
  'Jordan Clarkson',
  'Dorian Finney-Smith',
  'Patrick Beverley',
  'Rudy Gay',
  'Luke Kennard',
  'Jerami Grant',
  'Kelly Olynyk',
  'Kyle Kuzma',
  'Kelly Oubre-Jr',
  'Zach LaVine',
  'Alec Burks',
  'Nikola Vucevic',
  'Bobby Portis',
  'Dwight Powell',
  'Jalen Green',
  'Mo Bamba',
  'Jordan Poole',
  'Saddiq Bey',
  'Desmond Bane',
  'Seth Curry',
  'Eric Bledsoe',
  'Devin Vassell',
  'Kyle Lowry',
  'Eric Gordon',
  'Joe Ingles',
  'Luka Doncic',
  'Stanley Johnson',
  'JaVale McGee',
  'Khris Middleton',
  'Malcolm Brogdon',
  'Al Horford',
  'Andre Drummond',
  'Kevin Huerter',
  'P.J. Tucker',
  'Ivica Zubac',
  'Bradley Beal',
  "Devonte' Graham",
  'Wayne Ellington',
  'Kristaps Porzingis',
  'Jayson Tatum',
  'Brandon Clarke',
  'Tyrese Haliburton',
  'Terance Mann',
  'Hassan Whiteside',
  'Kentavious Caldwell-Pope',
  'Scottie Barnes',
  'Tyrese Maxey',
  'Bam Adebayo',
  'Danilo Gallinari',
  'Shai Gilgeous-Alexander',
  'Maxi Kleber',
  'Donovan Mitchell',
  'Fred VanVleet',
  'Nemanja Bjelica',
  'Josh Hart',
  'Pascal Siakam',
  'Nerlens Noel',
  'Gorgui Dieng',
  'Norman Powell',
  'Patty Mills',
  'Julius Randle',
  'Dejounte Murray',
  'Deandre Ayton',
  'DeMarcus Cousins',
  'Cam Reddish',
  'Stephen Curry',
  'Miles Bridges',
  'Davis Bertans',
  'Lance Stephenson',
  'Brandon Ingram',
  'OG Anunoby',
  'Pat Connaughton',
  'Langston Galloway',
  'Thaddeus Young',
  'Jrue Holiday',
  'Cade Cunningham',
  'Chris Boucher',
  'Jae Crowder',
  'John Collins',
  'Bojan Bogdanovic',
  'Nicolas Batum',
  'George Hill',
  'Kyrie Irving',
  'Jimmy Butler',
  "D'Angelo Russell",
  'Buddy Hield',
  'Serge Ibaka',
  'Mason Plumlee',
  'Trey Lyles',
  'Klay Thompson',
  'Myles Turner',
  'Kevin Love',
  'Domantas Sabonis',
  'Rudy Gobert',
  'JaMychal Green',
  "De'Aaron Fox",
  'Andre Iguodala',
  'Kevin Durant',
  'Justin Holiday',
  'Duncan Robinson',
  'Clint Capela',
  'Jalen Brunson',
  "DeAndre' Bembry",
  'RJ Barrett',
  'Marquese Chriss',
  'Ja Morant',
  'Malik Monk',
  'Kevon Looney',
  'Darius Garland',
  'Christian Wood',
  'P.J. Washington',
  'Tyler Herro',
  'Alex Caruso',
  'Darius Bazley',
  'Anfernee Simons',
  'Anthony Edwards',
  'Luguentz Dort'
]

const computeRollingShotChart = (data = {}, window = 15, type = 'rft') => {
  window = data.length < window ? data.length-2 : window;

  let currRFGA = 0
  let currTeam = data[0].Team
  let totRFGA = 0
  let currRFGM = 0
  let totRFGM = 0
  let totBP = 0
  let currBP = 0
  const nData = []
  let winSet = false

  let currFGA = 0
  let totFGA = 0
  let currSRMA = 0
  let totSRMA = 0
  let currLRMA = 0
  let totLRMA = 0

  let tot3PA = 0
  let curr3PA = 0
  let curr3PM = 0
  let tot3PM = 0

  let currFTA = 0
  let currFTM = 0
  let totFTA = 0
  let totFTM = 0

  let currP = 0
  let totP = 0

  let currM = 0
  let totM = 0

  let totOffP = 0
  let currOffP = 0

  let currAss = 0
  let totAss = 0

  let currPM = 0
  let totPM = 0

  let currTPD = 0
  let totTPD = 0

  const pIntA = i => {
    if (typeof i === 'undefined') {
      return 0
    } else if (typeof i === 'string') {
      return i.length > 0 ? parseInt(i) : 0
    } else {
      return parseInt(i)
    }
  }
  const teamChart = []

  for (let i = 1; i < data.length; i++) {
    const game = data[i]

    if (type !== 'rbpsd') {
      if (currTeam !== game.Team || i === data.length - 1) {
        teamChart.push({
          team: currTeam,
          gameE: game.Date,
          gameS:
            teamChart.length === 0
              ? data[1].Date
              : teamChart[teamChart.length - 1].gameE
        })
        currTeam = game.Team
      }

      totRFGA = totRFGA + pIntA(game.AtRimFGA)
      totRFGM = totRFGM + pIntA(game.AtRimFGM)

      totAss = totAss + pIntA(game.Assists)
      currAss =
        currAss +
        pIntA(game.Assists) -
        (winSet ? pIntA(data[i - window].Assists) : 0)

      totSRMA = totSRMA + pIntA(game.ShortMidRangeFGA)
      currSRMA =
        currSRMA +
        pIntA(game.ShortMidRangeFGA) -
        (winSet ? pIntA(data[i - window].ShortMidRangeFGA) : 0)

      totLRMA = totLRMA + pIntA(game.LongMidRangeFGA)
      currLRMA =
        currLRMA +
        pIntA(game.LongMidRangeFGA) -
        (winSet ? pIntA(data[i - window].LongMidRangeFGA) : 0)

      tot3PA = tot3PA + pIntA(game.FG3A)
      curr3PA =
        curr3PA + pIntA(game.FG3A) - (winSet ? pIntA(data[i - window].FG3A) : 0)

      tot3PM = tot3PM + pIntA(game.FG3M)
      curr3PM =
        curr3PM + pIntA(game.FG3M) - (winSet ? pIntA(data[i - window].FG3M) : 0)

      totFTA = totFTA + pIntA(game.FTA)
      currFTA =
        currFTA + pIntA(game.FTA) - (winSet ? pIntA(data[i - window].FTA) : 0)

      totFTM = totFTM + pIntA(game.FtPoints)
      currFTM =
        currFTM +
        pIntA(game.FtPoints) -
        (winSet ? pIntA(data[i - window].FtPoints) : 0)

      totP = totP + pIntA(game.Points)
      currP =
        currP +
        pIntA(game.Points) -
        (winSet ? pIntA(data[i - window].Points) : 0)

      totPM = totPM + pIntA(game.PlusMinus) + 50
      currPM =
        currPM +
        pIntA(game.PlusMinus) +
        50 -
        (winSet ? pIntA(data[i - window].PlusMinus) + 50 : 0)

      totM = totM + pIntA(game.Minutes.split(':')[0])
      currM =
        currM +
        pIntA(game.Minutes.split(':')[0]) -
        (winSet ? pIntA(data[i - window].Minutes.split(':')[0]) : 0)

      currRFGA =
        currRFGA +
        pIntA(game.AtRimFGA) -
        (winSet ? pIntA(data[i - window].AtRimFGA) : 0)
      currRFGM =
        currRFGM +
        pIntA(game.AtRimFGM) -
        (winSet ? pIntA(data[i - window].AtRimFGM) : 0)

      totFGA = totFGA + pIntA(game.FG3A) + pIntA(game.FG2A)
      currFGA =
        currFGA +
        pIntA(game.FG3A) +
        pIntA(game.FG2A) -
        (winSet
          ? pIntA(data[i - window].FG3A) + pIntA(data[i - window].FG2A)
          : 0)
      totBP = totBP + pIntA(game.BadPassTurnovers)
      currBP =
        currBP +
        pIntA(game.BadPassTurnovers) -
        (winSet ? pIntA(data[i - window].BadPassTurnovers) : 0)

      totOffP = totOffP + pIntA(game.OffPoss)
      currOffP =
        currOffP +
        pIntA(game.OffPoss) -
        (winSet ? pIntA(data[i - window].OffPoss) : 0)

      totTPD = totTPD + pIntA(game.Avg2ptShotDistance) * pIntA(game.FG2A)
      currTPD =
        currTPD +
        pIntA(game.Avg2ptShotDistance) * pIntA(game.FG2A) -
        (winSet
          ? pIntA(data[i - window].Avg2ptShotDistance) *
            pIntA(data[i - window].FG2A)
          : 0)

      const ts = ((currP / (2 * (currFGA + 0.44 * currFTA))) * 100).toFixed(2)

      const rtpd = ((currTPD / (currSRMA + currLRMA + currRFGA)) * 4).toFixed(2)

      const mpg = (currM / (winSet ? window : i)).toFixed(2)

      const ppg = (currP / (winSet ? window : i)).toFixed(2)

      const xpm = (currPM / (winSet ? window : i)).toFixed(2)

      const rimfq = ((currRFGA / currFGA) * 100).toFixed(2)
      const tpr = ((curr3PM / curr3PA) * 100).toFixed(2)
      const mfq = (((currSRMA + currLRMA) / currFGA) * 100).toFixed(2)
      const tfq = ((curr3PA / currFGA) * 100).toFixed(2)

      if (i === data.length - 1) {
        nData.push({
          rsq: ((currRFGM / currRFGA) * 100).toFixed(2),
          gameN: i,
          rfga: pIntA(game.AtRimFGA),
          date: game.Date,
          opp: game.Opponent,
          rimfq: rimfq,
          mfq: mfq,
          tfq: tfq,
          team: game.Team,
          min: game.Minutes,
          points: pIntA(game.Points),
          rtpd: rtpd,
          reb: pIntA(game.Rebounds),
          avrsq: ((totRFGM / totRFGA) * 100).toFixed(2),
          avrimfq: ((totRFGA / totFGA) * 100).toFixed(2),
          avmfq: (((totSRMA + totLRMA) / totFGA) * 100).toFixed(2),
          avxpm: 50,
          avtfq: ((tot3PA / totFGA) * 100).toFixed(2),
          avtpr: ((tot3PM / tot3PA) * 100).toFixed(2),
          avftr: ((totFTA / totFGA) * 100).toFixed(2),
          avrbp: ((totBP / totAss) * 100).toFixed(2),
          avts: ((totP / (2 * (totFGA + 0.44 * totFTA))) * 100).toFixed(2),
          avppg: (totP / data.length).toFixed(2),
          avmpg: (totM / data.length).toFixed(2),
          avrft: ((totFTM / totFTA) * 100).toFixed(2),
          assists: pIntA(game.Assists),
          steals: pIntA(game.Steals),
          blocks: pIntA(game.Blocks),
          rft: ((currFTM / currFTA) * 100).toFixed(2),
          ts: ts,
          tpr: tpr,
          xpm: xpm,
          ppg: ppg,
          ftr: ((currFTA / currFGA) * 100).toFixed(2),
          rbp: ((currBP / currAss) * 100).toFixed(2),
          mpg: mpg
        })
      } else {
        nData.push({
          rsq: ((currRFGM / currRFGA) * 100).toFixed(2),
          gameN: i,
          rfga: pIntA(game.AtRimFGA),
          date: game.Date,
          opp: game.Opponent,
          rimfq: rimfq,
          mfq: mfq,
          tfq: tfq,
          team: game.Team,
          min: game.Minutes,
          points: pIntA(game.Points),
          rtpd: rtpd,
          reb: pIntA(game.Rebounds),

          assists: pIntA(game.Assists),
          steals: pIntA(game.Steals),
          blocks: pIntA(game.Blocks),
          rft: ((currFTM / currFTA) * 100).toFixed(2),
          ts: ts,
          tpr: tpr,
          xpm: xpm,
          ppg: ppg,
          ftr: ((currFTA / currFGA) * 100).toFixed(2),
          rbp: ((currBP / currAss) * 100).toFixed(2),
          mpg: mpg
        })
      }
    }

    if (i >= window) {
      winSet = true
    }
  }
  return nData
}

const redis = require('redis')
const { json } = require('express')
const cron = require('node-cron')

const teams = {
  MIN: '1610612750',
  CHA: '1610612766',
  OKC: '1610612760',
  BOS: '1610612738',
  MIL: '1610612749',
  CLE: '1610612739',
  HOU: '1610612745',
  MIA: '1610612748',
  NYK: '1610612752',
  POR: '1610612757',
  DEN: '1610612743',
  ATL: '1610612737',
  TOR: '1610612761',
  WAS: '1610612764',
  SAC: '1610612758',
  NOP: '1610612740',
  PHI: '1610612755',
  BKN: '1610612751',
  SAS: '1610612759',
  UTA: '1610612762',
  PHX: '1610612756',
  ORL: '1610612753',
  CHI: '1610612741',
  DET: '1610612765',
  DAL: '1610612742',
  LAC: '1610612746',
  MEM: '1610612763',
  LAL: '1610612747',
  IND: '1610612754',
  GSW: '1610612744'
}

function doRequest (url) {
  return new Promise(function (resolve, reject) {
    request(url, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body)
      } else {
        reject(error)
      }
    })
  })
}

const getTeamProf = async () => {
  const client = redis.createClient({
    url:
      'redis://:p1aec2448c6cc8395f111ebaefbd5e52d9f19ed4fb6af0d09d44e2b93271090ee@ec2-44-193-178-89.compute-1.amazonaws.com:15379',
    socket: {
      tls: true,
      rejectUnauthorized: false
    }
  })

  client.on('error', err => console.log('Redis Client Error', err))
  await client.connect()

  let json = await client.get('teamPlayType')

  if (!json) {
  } else {
    await client.quit()
    console.log(json)
    const restoredFromString = cjson.decompress.fromString(json)

    return restoredFromString
  }
}

const getTeamDProf = async () => {
  const client = redis.createClient({
    url:
       'redis://:p1aec2448c6cc8395f111ebaefbd5e52d9f19ed4fb6af0d09d44e2b93271090ee@ec2-44-193-178-89.compute-1.amazonaws.com:15379',
    socket: {
      tls: true,
      rejectUnauthorized: false
    }
  })

  client.on('error', err => console.log('Redis Client Error', err))
  await client.connect()

  let json = await client.get('teamPlayTypeDef')

  if (!json) {
  } else {
    await client.quit()
    console.log(json)
    const restoredFromString = cjson.decompress.fromString(json)

    return restoredFromString
  }
}

const getKeyCache = async key => {
  const client = redis.createClient({
    url:
      'redis://:p1aec2448c6cc8395f111ebaefbd5e52d9f19ed4fb6af0d09d44e2b93271090ee@ec2-44-193-178-89.compute-1.amazonaws.com:15379',
    socket: {
      tls: true,
      rejectUnauthorized: false
    }
  })

  client.on('error', err => console.log('Redis Client Error', err))
  await client.connect()

  let json = await client.get(key)

  if (!json) {
  } else {
    await client.quit()
    console.log(json)
    const restoredFromString = cjson.decompress.fromString(json)

    return restoredFromString
  }
}

const postTrend = async (data, clean = false) => {
  const client = redis.createClient({
    url:
      'redis://:p1aec2448c6cc8395f111ebaefbd5e52d9f19ed4fb6af0d09d44e2b93271090ee@ec2-44-193-178-89.compute-1.amazonaws.com:15379',
    socket: {
      tls: true,
      rejectUnauthorized: false
    }
  })

  client.on('error', err => console.log('Redis Client Error', err))

  await client.connect()
  let json = await client.get('trend')

  if (clean) {
    await client.set('trend', '')
    await client.set('trend2', '')
    await client.set('trend3', '')
    return
  }
  for (const property in players) {
    const name = property.split(' ')
    const pID = players[name[0] + ' ' + name[1]]
    let json = await client.get('trend')
    let json2 = await client.get('trend2')
    let json3 = await client.get('trend3')
    let jsonN = await client.get(name[0] + '_' + name[1])
    if (true) {
      const result = await doRequest(
        'https://api.pbpstats.com/get-game-logs/nba?Season=2021-22%2C2020-21%2C2019-20%2C2018-19%2C2017-18%2C2016-17%2C2015-16%2C2014-15%2C2013-14&SeasonType=Regular%20Season&EntityType=Player&EntityId=' +
          pID
      )
        console.log(name)
      const newJ = JSON.parse(result).multi_row_table_data
      let pd = newJ.map(
        ({
          Arc3Assists,
          AtRimAccuracy,
          Blocked2s,
          EfgPct,
          ShootingFouls,
          FG3APct,
          Fouls,
          ShootingFoulsDrawPct,
          RecoveredBlocks,
          TsPct,
          UnblockedShortMidRangeAccuracy,
          BlocksRecoveredPct,
          DefThreePtReboundPct,
          DefArc3ReboundPct,
          PenaltyArc3FGA,
          PenaltyArc3Frequency,
          PenaltyAtRimAccuracy,
          PenaltyAtRimFGA,
          PenaltyAtRimFGM,
          NonPutbacksAssisted2sPct,
          NonShootingFoulsDrawn,
          NonShootingPenaltyNonTakeFouls,
          NonShootingPenaltyNonTake,
          PenaltyAtRimFrequency,
          SecondChanceAtRimFGA,
          SecondChanceAtRimFrequency,
          SecondChanceFG2A,
          SecondChanceOffPoss,
          ShootingFoulsDrawnPct,
          PenaltyDefPoss,
          PenaltyEfgPct,
          PenaltyFG2A,
          PenaltyFG2M,
          PenaltyFG3A,
          PenaltyFg2Pct,
          PenaltyFtPoints,
          PenaltyOffPoss,
          PenaltyOffPossExcludingTakeFouls,
          PenaltyOffPossPct,
          PenaltyPoints,
          PenaltyPointsExcludingTakeFouls,
          PenaltyPointsPct,
          PenaltyShotQualityAvg,
          PenaltyTsPct,
          PenaltyTurnovers,
          NonHeaveArc3Accuracy,
          Fg2Pct,
          Fg3Pct,
          LongMidRangeFrequency,
          LongMidRangePctAssisted,
          TwoPtAssists,
          TwoPtShootingFoulsDrawn,
          TwoPtShootingFoulsDrawnPct,
          UnblockedArc3Accuracy,
          UnblockedAtRimAccuracy,
          ShortMidRangeFrequency,
          ShortMidRangeOffReboundedPct,
          
          DefAtRimReboundPct,

          DefFGReboundPct,
          DefLongMidRangeReboundPct,

          DefShortMidRangeReboundPct,
          DefThreePtRebounds,
          DefTwoPtReboundPct,
          DefTwoPtRebounds,
          ...keepAttrs
        }) => keepAttrs
      )

      if (pd) {
        if (pd[pd.length-1].Date) {
          if (parseInt(pd[pd.length-1].Date.split('-')[0]) > 2012) {
            // let obj4 = cjson.decompress.fromString(jsonN)
            // obj4 = obj4.filter(word => word.Date.split('-')[0] !== '2022')
            // pd4 = pd.filter(word => word.Date.split('-')[0] === '2022')
            // newO = obj4.concat(pd4)
            // pd = newO
            const compressedString4 = cjson.compress.toString(pd)
            await client.set(name[0] + '_' + name[1], compressedString4)
            console.log(name[0], name[1], '2022')
          }
        //   const data = computeRollingShotChart(pd, 5)
        //   if (
        //     data.length >= 20 &&
        //     data[data.length - 1].date.split('-')[0] === '2022'
        //   ) {
        //     const trend = data.slice(data.length - 1, data.length)
        //     const tdat = { [name[0] + ' ' + name[1]]: trend }
        //     let obj = {}
        //     if (json) {
        //       obj = cjson.decompress.fromString(json)
        //     }

        //     const mergedObject = {
        //       ...obj,
        //       ...tdat
        //     }
        //     const compressedString = cjson.compress.toString(mergedObject)
        //     await client.set('trend', compressedString)
        //     console.log(name[0], name[1], compressedString.length)
        //   }
        //   const data10 = computeRollingShotChart(pd, 10)
        //   if (
        //     data10.length >= 20 &&
        //     data10[data10.length - 1].date.split('-')[0] === '2022'
        //   ) {
        //     const trend2 = data10.slice(data10.length - 1, data10.length)
        //     const tdat2 = { [name[0] + ' ' + name[1]]: trend2 }
        //     let obj2 = {}
        //     if (json2) {
        //       obj2 = cjson.decompress.fromString(json2)
        //     }

        //     const mergedObject2 = {
        //       ...obj2,
        //       ...tdat2
        //     }
        //     const compressedString2 = cjson.compress.toString(mergedObject2)
        //     await client.set('trend2', compressedString2)
        //     console.log(name[0], name[1], compressedString2.length)
        //   }
        //   const data20 = computeRollingShotChart(pd, 20)
        //   if (
        //     data20.length >= 20 &&
        //     data20[data20.length - 1].date.split('-')[0] === '2022'
        //   ) {
        //     const trend3 = data20.slice(data20.length - 1, data20.length)
        //     const tdat3 = { [name[0] + ' ' + name[1]]: trend3 }
        //     let obj3 = {}
        //     if (json3) {
        //       obj3 = cjson.decompress.fromString(json3)
        //     }

        //     const mergedObject3 = {
        //       ...obj3,
        //       ...tdat3
        //     }
        //     const compressedString3 = cjson.compress.toString(mergedObject3)
        //     await client.set('trend3', compressedString3)
        //     console.log(name[0], name[1], compressedString3.length)
        //   }
        }
      }
    }
  }
  await client.quit()
}

postTrend()

const scrapePBPTOT = async (fname, lname, hard = 'soft') => {
  if (false) {
    const pID = players[fname + ' ' + lname]
    try {
      const result = await doRequest(
        'https://api.pbpstats.com/get-game-logs/nba?Season=2021-22%2C2020-21%2C2019-20%2C2018-19%2C2017-18%2C2016-17%2C2015-16&SeasonType=Regular%20Season&EntityType=Player&EntityId=' +
          pID
      )

      const newJ = JSON.parse(result).multi_row_table_data
      const json2 = newJ.map(
        ({
          Arc3Assists,
          AtRimAccuracy,
          Blocked2s,
          EfgPct,
          ShootingFouls,
          FG3APct,
          Fouls,
          ShootingFoulsDrawPct,
          RecoveredBlocks,
          TsPct,
          UnblockedShortMidRangeAccuracy,
          BlocksRecoveredPct,
          DefThreePtReboundPct,
          DefArc3ReboundPct,
          PenaltyArc3FGA,
          PenaltyArc3Frequency,
          PenaltyAtRimAccuracy,
          PenaltyAtRimFGA,
          PenaltyAtRimFGM,
          NonPutbacksAssisted2sPct,
          NonShootingFoulsDrawn,
          NonShootingPenaltyNonTakeFouls,
          NonShootingPenaltyNonTake,
          PenaltyAtRimFrequency,
          SecondChanceAtRimFGA,
          SecondChanceAtRimFrequency,
          SecondChanceFG2A,
          SecondChanceOffPoss,
          ShootingFoulsDrawnPct,
          PenaltyDefPoss,
          PenaltyEfgPct,
          PenaltyFG2A,
          PenaltyFG2M,
          PenaltyFG3A,
          PenaltyFg2Pct,
          PenaltyFtPoints,
          PenaltyOffPoss,
          PenaltyOffPossExcludingTakeFouls,
          PenaltyOffPossPct,
          PenaltyPoints,
          PenaltyPointsExcludingTakeFouls,
          PenaltyPointsPct,
          PenaltyShotQualityAvg,
          PenaltyTsPct,
          PenaltyTurnovers,
          NonHeaveArc3Accuracy,
          Fg2Pct,
          Fg3Pct,
          LongMidRangeFrequency,
          LongMidRangePctAssisted,
          TwoPtAssists,
          TwoPtShootingFoulsDrawn,
          TwoPtShootingFoulsDrawnPct,
          UnblockedArc3Accuracy,
          UnblockedAtRimAccuracy,
          ShortMidRangeFrequency,
          ShortMidRangeOffReboundedPct,
          ShotQualityAvg,
          DefAtRimReboundPct,

          DefFGReboundPct,
          DefLongMidRangeReboundPct,

          DefShortMidRangeReboundPct,
          DefThreePtRebounds,
          DefTwoPtReboundPct,
          DefTwoPtRebounds,
          ...keepAttrs
        }) => keepAttrs
      )
      console.log(json2)
      const compressedString = cjson.compress.toString(json2)

      await client.set(fname + '_' + lname, compressedString)

      await client.quit()
      return json2
    } catch (err) {
      console.error(err)
    }
  } else if (json) {
    await client.quit()

    const restoredFromString = cjson.decompress.fromString(json)
    // console.log(fname, json.length, "cached");

    return restoredFromString
  }
  await client.quit()
}

const scrapePBPTOTTeam = async (team, type = 'Team', hard = 'soft') => {
  const client = redis.createClient({
    url:
      'redis://:p1aec2448c6cc8395f111ebaefbd5e52d9f19ed4fb6af0d09d44e2b93271090ee@ec2-44-193-178-89.compute-1.amazonaws.com:15379',
    socket: {
      tls: true,
      rejectUnauthorized: false
    }
  })

  client.on('error', err => console.log('Redis Client Error', err))
  await client.connect()

  let json = await client.get(team + type)

  if (!json || hard === 'hard') {
    const pID = teams[team]
    try {
      const result = await doRequest(
        'https://api.pbpstats.com/get-game-logs/nba?Season=2021-22&SeasonType=Regular%20Season&EntityType=' +
          type +
          '&EntityId=' +
          pID
      )

      const newJ = JSON.parse(result).multi_row_table_data
      console.log(newJ)
      const compressedString = cjson.compress.toString(newJ)

      await client.set(team + type, compressedString)

      await client.quit()
      return newJ
    } catch (err) {
      console.error(err)
    }
  } else {
    await client.quit()
    console.log(json)
    const restoredFromString = cjson.decompress.fromString(json)
    console.log(team, json.length, 'cached')

    return restoredFromString
  }
}

const scrapeMedium = async (fname, lname, hard = 'soft') => {
  const client = redis.createClient({
    url:
      'redis://:p1aec2448c6cc8395f111ebaefbd5e52d9f19ed4fb6af0d09d44e2b93271090ee@ec2-44-193-178-89.compute-1.amazonaws.com:15379',
    socket: {
      tls: true,
      rejectUnauthorized: false
    }
  })

  client.on('error', err => console.log('Redis Client Error', err))

  await client.connect()

  let json = await client.get(fname + '_' + lname)

  if (!JSON.stringify(json) || hard === 'hard') {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
      })

      let page = await browser.newPage()
      await page.setViewport({ width: 1920, height: 1080 })
      await page.setRequestInterception(true)
      page.on('request', req => {
        if (
          req.resourceType() == 'stylesheet' ||
          req.resourceType() == 'font' ||
          req.resourceType() == 'image'
        ) {
          req.abort()
        } else {
          req.continue()
        }
      })

      const pID = players[fname + ' ' + lname]
      await page.goto(
        'https://www.pbpstats.com/game-logs/nba/player?Season=2021-22,2020-21,2017-18,2018-19,2019-20&SeasonType=Regular+Season&EntityId=' +
          pID +
          '&EntityType=Player&Table=Shooting&StatType=Totals'
      )
      await page.waitForSelector('.line-numbers', { timeout: 20000 })

      const body = await page.evaluate(() => {
        return document.querySelector('body').innerHTML
      })
      // const link = body.split('href="data:text/csv');

      const newbody = body.split('href="data:text/csv,')[1].split('">')

      const csv = decodeURIComponent(newbody[0])
      json = Papa.parse(csv)

      client.set(fname + '_' + lname, JSON.stringify(json))

      await page.close()

      await browser.close()
      await client.disconnect()
      return json
    } catch (error) {
      console.log(error)
      await page.close()
      await client.disconnect()
      await browser.close()
    }
  } else {
    await client.disconnect()
    return JSON.parse(json)
  }
}

const scrapePass = async (fname, lname) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    })
    let page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080 })
    await page.setRequestInterception(true)
    page.on('request', req => {
      if (
        req.resourceType() == 'stylesheet' ||
        req.resourceType() == 'font' ||
        req.resourceType() == 'image'
      ) {
        req.abort()
      } else {
        req.continue()
      }
    })

    const pID = players[fname + ' ' + lname]
    await page.goto(
      'https://www.pbpstats.com/game-logs/nba/player?Season=2021-22,2020-21,2017-18,2018-19,2019-20&SeasonType=Regular+Season&EntityId=' +
        pID +
        '&EntityType=Player&Table=Turnovers&StatType=Totals'
    )
    await page.waitForSelector('.line-numbers', { timeout: 10000 })

    const body = await page.evaluate(() => {
      return document.querySelector('body').innerHTML
    })
    // const link = body.split('href="data:text/csv');

    const newbody = body.split('href="data:text/csv,')[1].split('">')

    const csv = decodeURIComponent(newbody[0])
    const json = Papa.parse(csv)
    await page.close()
    ;``
    await browser.close()

    return json
  } catch (error) {
    console.log(error)
    await page.close()
    await browser.close()
  }
}

const scrapeTShot = async team => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    })

    let page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080 })
    await page.setRequestInterception(true)
    page.on('request', req => {
      if (
        req.resourceType() == 'stylesheet' ||
        req.resourceType() == 'font' ||
        req.resourceType() == 'image'
      ) {
        req.abort()
      } else {
        req.continue()
      }
    })

    const tID = teams[team + '']
    await page.goto(
      'https://www.pbpstats.com/game-logs/nba/team?Season=2021-22&SeasonType=Regular+Season&EntityId=' +
        tID +
        '&EntityType=Team&Table=Shooting&StatType=Totals'
    )
    await page.waitForSelector('.line-numbers', { timeout: 20000 })
    console.log(
      'https://www.pbpstats.com/game-logs/nba/team?Season=2021-22&SeasonType=Regular+Season&EntityId=' +
        tID +
        '&EntityType=Team&Table=Shooting&StatType=Totals'
    )

    const body = await page.evaluate(() => {
      return document.querySelector('body').innerHTML
    })
    // const link = body.split('href="data:text/csv');

    const newbody = body.split('href="data:text/csv,')[1].split('">')

    const csv = decodeURIComponent(newbody[0])
    const json = Papa.parse(csv)

    await page.close()
    await browser.close()
    return json
  } catch (error) {
    console.log(error)

    await page.close()
    await browser.close()
  }
}

const scrapeTTo = async team => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    })

    let page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080 })
    await page.setRequestInterception(true)
    page.on('request', req => {
      if (
        req.resourceType() == 'stylesheet' ||
        req.resourceType() == 'font' ||
        req.resourceType() == 'image'
      ) {
        req.abort()
      } else {
        req.continue()
      }
    })

    const tID = teams[team + '']
    await page.goto(
      'https://www.pbpstats.com/game-logs/nba/team?Season=2021-22&SeasonType=Regular+Season&EntityId=' +
        tID +
        '&EntityType=Team&Table=Turnovers&StatType=Totals'
    )
    await page.waitForSelector('.line-numbers', { timeout: 20000 })

    const body = await page.evaluate(() => {
      return document.querySelector('body').innerHTML
    })
    // const link = body.split('href="data:text/csv');

    const newbody = body.split('href="data:text/csv,')[1].split('">')

    const csv = decodeURIComponent(newbody[0])
    const json = Papa.parse(csv)

    await page.close()
    await browser.close()
    return json
  } catch (error) {
    console.log(error)

    await page.close()
    await browser.close()
  }
}

const scrapeYoutube = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(
    'https://www.youtube.com/results?search_query=headless+browser'
  )

  const scrapedData = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.ytd-video-renderer #video-title'))
      .map(link => ({
        title: link.getAttribute('title'),
        link: link.getAttribute('href')
      }))
      .slice(0, 10)
  )

  await browser.close()
  return scrapedData
}

module.exports.scrapeMedium = scrapeMedium
module.exports.scrapePass = scrapePass
module.exports.scrapeTShot = scrapeTShot
module.exports.scrapeTTo = scrapeTTo
module.exports.scrapeYoutube = scrapeYoutube
module.exports.scrapePBPTOT = scrapePBPTOT
module.exports.scrapePBPTOTTeam = scrapePBPTOTTeam
module.exports.getTeamProf = getTeamProf
module.exports.getTeamDProf = getTeamDProf
module.exports.getKeyCache = getKeyCache
module.exports.postTrend = postTrend
