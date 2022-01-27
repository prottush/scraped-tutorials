const puppeteer = require("puppeteer");
const Papa = require("papaparse");
const players = {
  "James Harden": "201935",
  "Andrew Wiggins": "203952",
  "Damian Lillard": "203081",
  "Russell Westbrook": "201566",
  "DeMar DeRozan": "201942",
  "Josh Giddey": "1630581",
  "Evan Mobley": "1630596",
  "Tobias Harris": "202699",
  "Giannis Antetokounmpo": "203507",
  "Harrison Barnes": "203084",
  "Bradley Beal": "203078",
  "LeBron James": "2544",
  "Kentavious Caldwell-Pope": "203484",
  "Kyle Lowry": "200768",
  "Kemba Walker": "202689",
  "P.J. Tucker": "200782",
  "Rudy Gobert": "203497",
  "CJ McCollum": "203468",
  "Jimmy Butler": "202710",
  "Andre Drummond": "203083",
  "Bojan Bogdanovic": "202711",
  "Chris Paul": "101108",
  "Khris Middleton": "203114",
  "Draymond Green": "203110",
  "Nikola Vucevic": "202696",
  "Anthony Davis": "203076",
  "Jrue Holiday": "201950",
  "Thaddeus Young": "201152",
  "Steven Adams": "203500",
  "Trevor Ariza": "2772",
  "Eric Bledsoe": "202339",
  "Stephen Curry": "201939",
  "Paul George": "202331",
  "LaMarcus Aldridge": "200746",
  "Evan Fournier": "203095",
  "DeAndre Jordan": "201599",
  "Karl-Anthony Towns": "1626157",
  "Al Horford": "201143",
  "Robert Covington": "203496",
  "Jordan Clarkson": "203903",
  "Marcus Morris Sr.": "202694",
  "Dennis Schroder": "203471",
  "Jae Crowder": "203109",
  "Julius Randle": "203944",
  "Joe Ingles": "204060",
  "Devin Booker": "1626164",
  "Nicolas Batum": "201587",
  "Nikola Jokic": "203999",
  "Brook Lopez": "201572",
  "Cade Cunningham": "1630595",
  "Scottie Barnes": "1630567",
  "Danny Green": "201980",
  "Marcus Smart": "203935",
  "Gordon Hayward": "202330",
  "Wesley Matthews": "202083",
  "Ricky Rubio": "201937",
  "Lou Williams": "101150",
  "Zach LaVine": "203897",
  "Aaron Gordon": "203932",
  "Marc Gasol": "201188",
  "Carmelo Anthony": "2546",
  "Serge Ibaka": "201586",
  "Goran Dragic": "201609",
  "Jeff Green": "201145",
  "Tim Hardaway Jr.": "203501",
  "Jerami Grant": "203924",
  "Kyrie Irving": "202681",
  "Will Barton": "203115",
  "Cory Joseph": "202709",
  "JJ Redick": "200755",
  "Jonas Valanciunas": "202685",
  "Jeff Teague": "201952",
  "Reggie Jackson": "202704",
  "Elfrid Payton": "203901",
  "Paul Millsap": "200794",
  "Kevin Durant": "201142",
  "Klay Thompson": "202691",
  "Eric Gordon": "201569",
  "Justin Holiday": "203200",
  "Mike Conley": "201144",
  "Kawhi Leonard": "202695",
  "Gary Harris": "203914",
  "Avery Bradley": "202340",
  "Terrence Ross": "203082",
  "Patty Mills": "201988",
  "Tristan Thompson": "202684",
  "Mason Plumlee": "203486",
  "Victor Oladipo": "203506",
  "Taj Gibson": "201959",
  "Blake Griffin": "201933",
  "Buddy Hield": "1627741",
  "Markieff Morris": "202693",
  "Myles Turner": "1626167",
  "John Wall": "202322",
  "Kent Bazemore": "203145",
  "Kevin Love": "201567",
  "Austin Rivers": "203085",
  "Josh Richardson": "1626196",
  "Rudy Gay": "200752",
  "Derrick Favors": "202324",
  "Garrett Temple": "202066",
  "Otto Porter Jr.": "203490",
  "Robin Lopez": "201577",
  "Hassan Whiteside": "202355",
  "Marvin Williams": "101107",
  "Enes Freedom": "202683",
  "Danilo Gallinari": "201568",
  "D.J. Augustin": "201571",
  "Clint Capela": "203991",
  "Rajon Rondo": "200765",
  "Kelly Olynyk": "203482",
  "D'Angelo Russell": "1626156",
  "Ish Smith": "202397",
  "Tony Snell": "203503",
  "Gorgui Dieng": "203476",
  "Dwight Howard": "2730",
  "Brandon Ingram": "1627742",
  "George Hill": "201588",
  "Patrick Beverley": "201976",
  "Andre Iguodala": "2738",
  "Kelly Oubre Jr.": "1626162",
  "Domantas Sabonis": "1627734",
  "Terry Rozier": "1626179",
  "Jayson Tatum": "1628369",
  "Rodney Hood": "203918",
  "Derrick Rose": "201565",
  "Al-Farouq Aminu": "202329",
  "T.J. McConnell": "204456",
  "Donovan Mitchell": "1628378",
  "Joe Harris": "203925",
  "Kyle Korver": "2594",
  "Doug McDermott": "203926",
  "Jamal Murray": "1627750",
  "Jaylen Brown": "1627759",
  "Wayne Ellington": "201961",
  "Alex Len": "203458",
  "DeMarcus Cousins": "202326",
  "Courtney Lee": "201584",
  "Pascal Siakam": "1627783",
  "Marcin Gortat": "101162",
  "Evan Turner": "202323",
  "Darren Collison": "201954",
  "Nerlens Noel": "203457",
  "Kyle Anderson": "203937",
  "Langston Galloway": "204038",
  "Maurice Harkless": "203090",
  "Malcolm Brogdon": "1627763",
  "Kristaps Porzingis": "204001",
  "Jeremy Lamb": "203087",
  "James Johnson": "201949",
  "De'Aaron Fox": "1628368",
  "JaMychal Green": "203210",
  "Bismack Biyombo": "202687",
  "Cody Zeller": "203469",
  "T.J. Warren": "203933",
  "Kyle Kuzma": "1628398",
  "Marco Belinelli": "201158",
  "Dwyane Wade": "2548",
  "Ersan Ilyasova": "101141",
  "Solomon Hill": "203524",
  "Ben McLemore": "203463",
  "Dorian Finney-Smith": "1627827",
  "Larry Nance Jr.": "1626204",
  "Ben Simmons": "1627732",
  "Willie Cauley-Stein": "1626161",
  "Patrick Patterson": "202335",
  "Jusuf Nurkic": "203994",
  "Spencer Dinwiddie": "203915",
  "Montrezl Harrell": "1626149",
  "Norman Powell": "1626181",
  "Isaiah Thomas": "202738",
  "E'Twaun Moore": "202734",
  "DeMarre Carroll": "201960",
  "Allen Crabbe": "203459",
  "Dario Saric": "203967",
  "Wilson Chandler": "201163",
  "Alec Burks": "202692",
  "Joel Embiid": "203954",
  "Jamal Crawford": "2037",
  "Bobby Portis": "1626171",
  "Pau Gasol": "2200",
  "Dirk Nowitzki": "1717",
  "Dwight Powell": "203939",
  "Fred VanVleet": "1627832",
  "Tyler Johnson": "204020",
  "Nemanja Bjelica": "202357",
  "Seth Curry": "203552",
  "Joe Johnson": "2207",
  "Jabari Parker": "203953",
  "Bam Adebayo": "1628389",
  "Jarrett Allen": "1628386",
  "Royce O'Neale": "1626220",
  "Reggie Bullock": "203493",
  "Taurean Prince": "1627752",
  "JR Smith": "2747",
  "Mikal Bridges": "1628969",
  "Tomas Satoransky": "203107",
  "Lonzo Ball": "1628366",
  "Anthony Tolliver": "201229",
  "James Ennis III": "203516",
  "Dion Waiters": "203079",
  "Trae Young": "1629027",
  "Trey Burke": "203504",
  "Ed Davis": "202334",
  "Bogdan Bogdanovic": "203992",
  "John Collins": "1628381",
  "Frank Kaminsky": "1626163",
  "Greg Monroe": "202328",
  "Ryan Anderson": "201583",
  "Caris LeVert": "1627747",
  "Matthew Dellavedova": "203521",
  "Dante Cunningham": "201967",
  "Aron Baynes": "203382",
  "Tyus Jones": "1626145",
  "Delon Wright": "1626153",
  "Nikola Mirotic": "202703",
  "Justise Winslow": "1626159",
  "Bryn Forbes": "1627854",
  "Zach Randolph": "2216",
  "Tony Parker": "2225",
  "Dewayne Dedmon": "203473",
  "Richaun Holmes": "1626158",
  "Jared Dudley": "201162",
  "Luka Doncic": "1629029",
  "Michael Carter-Williams": "203487",
  "Lauri Markkanen": "1628374",
  "Stanley Johnson": "1626169",
  "Michael Kidd-Gilchrist": "203077",
  "Tyson Chandler": "2199",
  "CJ Miles": "101139",
  "Monta Ellis": "101145",
  "Jakob Poeltl": "1627751",
  "Dillon Brooks": "1628415",
  "Trey Lyles": "1626168",
  "Josh Hart": "1628404",
  "Mike Scott": "203118",
  "Tyreke Evans": "201936",
  "Cedi Osman": "1626224",
  "Emmanuel Mudiay": "1626144",
  "Collin Sexton": "1629012",
  "OG Anunoby": "1628384",
  "Pat Connaughton": "1626192",
  "Arron Afflalo": "201167",
  "Vince Carter": "1713",
  "Dejounte Murray": "1627749",
  "Amir Johnson": "101161",
  "Miles Bridges": "1628970",
  "Davis Bertans": "202722",
  "Shai Gilgeous-Alexander": "1628983",
  "Zaza Pachulia": "2585",
  "Kevin Huerter": "1628989",
  "Iman Shumpert": "202697",
  "Corey Brewer": "201147",
  "Rondae Hollis-Jefferson": "1626178",
  "Wesley Johnson": "202325",
  "Luol Deng": "2736",
  "Nik Stauskas": "203917",
  "Luc Mbah a Moute": "201601",
  "J.J. Barea": "200826",
  "Maxi Kleber": "1628467",
  "Lance Stephenson": "202362",
  "Devin Harris": "2734",
  "Josh Jackson": "1628367",
  "Shaun Livingston": "2733",
  "Andre Roberson": "203460",
  "Mike Muscala": "203488",
  "Deandre Ayton": "1629028",
  "Brandon Knight": "202688",
  "Jeremy Lin": "202391",
  "Kenneth Faried": "202702",
  "Matt Barnes": "2440",
  "Thabo Sefolosha": "200757",
  "Malik Beasley": "1627736",
  "Kosta Koufos": "201585",
  "Trevor Booker": "202344",
  "Mario Hezonja": "1626209",
  "Luke Kennard": "1628379",
  "John Henson": "203089",
  "JaVale McGee": "201580",
  "Lance Thomas": "202498",
  "Jonas Jerebko": "201973",
  "Shabazz Napier": "203894",
  "Ian Mahinmi": "101133",
  "Gerald Green": "101123",
  "Ivica Zubac": "1627826",
  "Raymond Felton": "101109",
  "Monte Morris": "1628420",
  "Chandler Parsons": "202718",
  "Deron Williams": "101114",
  "Ty Lawson": "201951",
  "Derrick White": "1628401",
  "Devonte' Graham": "1628984",
  "Shelvin Mack": "202714",
  "Noah Vonleh": "203943",
  "Duncan Robinson": "1629130",
  "Raul Neto": "203526",
  "Meyers Leonard": "203086",
  "Daniel Theis": "1628464",
  "Kris Dunn": "1627739",
  "Jalen Brunson": "1628973",
  "Channing Frye": "101112",
  "Jameer Nelson": "2749",
  "Tony Allen": "2754",
  "Gerald Henderson": "201945",
  "Landry Shamet": "1629013",
  "Jose Calderon": "101181",
  "DeAndre' Bembry": "1627761",
  "Manu Ginobili": "1938",
  "Glenn Robinson III": "203922",
  "Jonathon Simmons": "203613",
  "RJ Barrett": "1629628",
  "Yogi Ferrell": "1627812",
  "Bruce Brown": "1628971",
  "Omri Casspi": "201956",
  "Derrick Jones Jr.": "1627884",
  "Mario Chalmers": "201596",
  "David West": "2561",
  "Marquese Chriss": "1627737",
  "Ja Morant": "1629630",
  "Malik Monk": "1628370",
  "Tim Frazier": "204025",
  "Kevon Looney": "1626172",
  "Jason Terry": "1891",
  "Rodney McGruder": "203585",
  "Nick Young": "201156",
  "Jerian Grant": "1626170",
  "Troy Daniels": "203584",
  "Timothe Luwawu-Cabarrot": "1627789",
  "Dennis Smith Jr.": "1628372",
  "Kyle O'Quinn": "203124",
  "Jerryd Bayless": "201573",
  "Jarrett Jack": "101127",
  "Josh Okogie": "1629006",
  "Timofey Mozgov": "202389",
  "Wendell Carter Jr.": "1628976",
  "Jahlil Okafor": "1626143",
  "Darius Garland": "1629636",
  "Denzel Valentine": "1627756",
  "Justin Jackson": "1628382",
  "Hollis Thompson": "203138",
  "Boris Diaw": "2564",
  "Torrey Craig": "1628470",
  "Jon Leuer": "202720",
  "Frank Ntilikina": "1628373",
  "Mitchell Robinson": "1629011",
  "Jaren Jackson Jr.": "1628991",
  "Isaiah Canaan": "203477",
  "Dante Exum": "203957",
  "Danuel House Jr.": "1627863",
  "Jason Smith": "201160",
  "Al Jefferson": "2744",
  "Roy Hibbert": "201579",
  "Joakim Noah": "201149",
  "Shabazz Muhammad": "203498",
  "David Nwaba": "1628021",
  "Cameron Payne": "1626166",
  "Shane Larkin": "203499",
  "Gary Trent Jr.": "1629018",
  "Christian Wood": "1626174",
  "Richard Jefferson": "2210",
  "Ian Clark": "203546",
  "Coby White": "1629632",
  "P.J. Washington": "1629023",
  "Juancho Hernangomez": "1627823",
  "Sterling Brown": "1628425",
  "Tyler Herro": "1629639",
  "Damyean Dotson": "1628422",
  "Alex Caruso": "1627936",
  "Quincy Acy": "203112",
  "Willy Hernangomez": "1626195",
  "Furkan Korkmaz": "1627788",
  "Tyler Zeller": "203092",
  "Khem Birch": "203920",
  "Kenrich Williams": "1629026",
  "Aaron Brooks": "201166",
  "Ramon Sessions": "201196",
  "Brandon Jennings": "201943",
  "Randy Foye": "200751",
  "Dwayne Bacon": "1628407",
  "Terrance Ferguson": "1628390",
  "Marreese Speights": "201578",
  "De'Anthony Melton": "1629001",
  "Semi Ojeleye": "1628400",
  "Aaron Holiday": "1628988",
  "Andrew Bogut": "101106",
  "Darius Miller": "203121",
  "Kevin Knox II": "1628995",
  "Damion Lee": "1627814",
  "Mirza Teletovic": "203141",
  "Brandon Bass": "101138",
  "Rodney Stuckey": "201155",
  "Omer Asik": "201600",
  "Wes Iwundu": "1628411",
  "Donte DiVincenzo": "1628978",
  "Darius Bazley": "1629647",
  "Tim Duncan": "1495",
  "Luis Scola": "2449",
  "Dragan Bender": "1627733",
  "Michael Beasley": "201563",
  "Derrick Williams": "202682",
  "Cameron Johnson": "1629661",
  "Svi Mykhailiuk": "1629004",
  "Ryan Arcidiacono": "1627853",
  "Miles Plumlee": "203101",
  "Thon Maker": "1627748",
  "Kendrick Nunn": "1629134",
  "Anfernee Simons": "1629014",
  "Jared Sullinger": "203096",
  "Anthony Edwards": "1630162",
  "Cristiano Felicio": "1626245",
  "JaKarr Sampson": "203960",
  "Lavoy Allen": "202730",
  "Luguentz Dort": "1629652",
  "Georges Niang": "1627777",
  "Jonathan Isaac": "1628371",
  "Marvin Bagley III": "1628963",
  "Jodie Meeks": "201975",
  "Luke Babbitt": "202337",
  "Frank Jackson": "1628402",
  "Lonnie Walker IV": "1629022",
  "Anthony Morrow": "201627",
  "Jordan Hill": "201941",
  "Troy Brown Jr.": "1628972",
  "Paul Pierce": "1718",
  "Grayson Allen": "1628960",
  "Mike Dunleavy": "2399",
  "Keldon Johnson": "1629640",
  "Patrick McCaw": "1627775",
  "Hamidou Diallo": "1628977",
  "Matisse Thybulle": "1629680",
  "Chris Bosh": "2547",
  "Tarik Black": "204028",
  "David Lee": "101135",
  "Darrell Arthur": "201589",
  "Rui Hachimura": "1629060",
  "Mo Bamba": "1628964",
  "Jordan Poole": "1629673",
  "Saddiq Bey": "1630180",
  "Brandon Clarke": "1629634",
  "Terrence Jones": "203093",
  "Shake Milton": "1629003",
  "Josh Smith": "2746",
  "Kyle Singler": "202713",
  "Norris Cole": "202708",
  "Tyrese Haliburton": "1630169",
  "Jae'Sean Tate": "1630256",
  "Spencer Hawes": "201150",
  "Cam Reddish": "1629629",
  "Sam Dekker": "1626155",
  "Chris Boucher": "1628449",
  "C.J. Watson": "201228",
  "Brad Wanamaker": "202954",
  "Sean Kilpatrick": "203930",
  "Michael Porter Jr.": "1629008",
  "Donatas Motiejunas": "202700",
  "Kobe Bryant": "977",
  "Justin Anderson": "1626147",
  "Leandro Barbosa": "2571",
  "Jake Layman": "1627774",
  "Grant Williams": "1629684",
  "De'Andre Hunter": "1629631",
  "Thomas Bryant": "1628418",
  "Andrew Harrison": "1626150",
  "Isaac Okoro": "1630171",
  "Jarell Martin": "1626185",
  "Markelle Fultz": "1628365",
  "Treveon Graham": "1626203",
  "Kris Humphries": "2743",
  "Tayshaun Prince": "2419",
  "Terance Mann": "1629611",
  "Joffrey Lauvergne": "203530",
  "O.J. Mayo": "201564",
  "Tyler Ulis": "1627755",
  "Alex Abrines": "203518",
  "Desmond Bane": "1630217",
  "Kevin Porter Jr.": "1629645",
  "Beno Udrih": "2757",
  "Mo Williams": "2590",
  "Cody Martin": "1628998",
  "Zion Williamson": "1629627",
  "Zach Collins": "1628380",
  "Terence Davis": "1629056",
  "Eric Paschall": "1629672",
  "Shaquille Harrison": "1627885",
  "Quinn Cook": "1626188",
  "Nickeil Alexander-Walker": "1629638",
  "Boban Marjanovic": "1626246",
  "Jevon Carter": "1628975",
  "Skal Labissiere": "1627746",
  "Robert Williams III": "1629057",
  "LaMelo Ball": "1630163",
  "Abdel Nader": "1627846",
  "Jaden McDaniels": "1630183",
  "Steve Blake": "2581",
  "Brandan Wright": "201148",
  "Naz Reid": "1629675",
  "Jason Thompson": "201574",
  "Jaxson Hayes": "1629637",
  "Marcus Thornton": "201977",
  "Wayne Selden": "1627782",
  "Alonzo Gee": "202087",
  "Damian Jones": "1627745",
  "Moritz Wagner": "1629021",
};

const redis = require("redis");
const { json } = require("express");
const cron = require("node-cron");

(async () => {
  const client = redis.createClient({
    url: "redis://:p1aec2448c6cc8395f111ebaefbd5e52d9f19ed4fb6af0d09d44e2b93271090ee@ec2-34-231-237-66.compute-1.amazonaws.com:23880",
    socket: {
      tls: true,
      rejectUnauthorized: false,
    },
  });

  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();

  const mediumArticles = new Promise((resolve, reject) => {
    scrapeSched("", "")
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          client.set(data[i].name, data[i].dat);
        }
      })
      .catch((err) => reject("Medium scrape failed"));
  });
})();

const teams = {
  MIN: "1610612750",
  CHA: "1610612766",
  OKC: "1610612760",
  BOS: "1610612738",
  MIL: "1610612749",
  CLE: "1610612739",
  HOU: "1610612745",
  MIA: "1610612748",
  NYK: "1610612752",
  POR: "1610612757",
  DEN: "1610612743",
  ATL: "1610612737",
  TOR: "1610612761",
  WAS: "1610612764",
  SAC: "1610612758",
  NOP: "1610612740",
  PHI: "1610612755",
  BKN: "1610612751",
  SAS: "1610612759",
  UTA: "1610612762",
  PHX: "1610612756",
  ORL: "1610612753",
  CHI: "1610612741",
  DET: "1610612765",
  DAL: "1610612742",
  LAC: "1610612746",
  MEM: "1610612763",
  LAL: "1610612747",
  IND: "1610612754",
  GSW: "1610612744",
};

const scrapeSched = async (fname, lname) => {
  const names = [
    "LeBron_James",
    "Stephen_Curry",
    "Kevin_Durant",
    "Giannis_Antetokounmpo",
    "James_Harden",
    "Nikola_Jokic",
    "Joel_Embiid",
    "Anthony_Davis",
    "Luka_Doncic",
    "Damian_Lillard",
    "Devin_Booker",
    "Chris_Paul",
    "Jayson_Tatum",
    "Bradley_Beal",
    "Jimmy_Butler",
    "Ja_Morant",
    "Trae_Young",
    "Kyrie_Irving",
    "Rudy_Gobert",
    "Paul_George",
    "Jaylen_Brown",
    "Russell_Westbrook",
    "Draymond_Green",
    "LaMelo_Ball",
    "Zach_LaVine",
    "Klay_Thompson",
    "DeMar_DeRozan",
    "Kawhi_Leonard",
    "Brandon_Ingram",
    "Joe_Harris",
    "Zion_Williamson",
    "Karl-Anthony_Towns",
    "Jakob Poeltl",
    "Kristaps_Porzingis",
    "Malik_Monk",
    "Bam_Adebayo",
    "Jrue_Holiday",
    "Domantas Sabonis",
    "Andrew Wiggins",
    "Tyler Herro",
    "Jarrett_Allen",
    "Tobias_Harris",
    "Buddy_Hield",
    "Tyrese_Haliburton",
    "Spencer_Dinwiddie",
    "Matisse_Thybulle",
    "Alex_Caruso",
  ];
  const cache = [];
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });

    for (let i = 0; i < names.length; i++) {
      let page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        if (
          req.resourceType() == "stylesheet" ||
          req.resourceType() == "font" ||
          req.resourceType() == "image"
        ) {
          req.abort();
        } else {
          req.continue();
        }
      });
      const name = names[i].split("_");
      const pID = players[name[0] + " " + name[1]];
      await page.goto(
        "https://www.pbpstats.com/game-logs/nba/player?Season=2021-22,2020-21,2017-18,2018-19,2019-20&SeasonType=Regular+Season&EntityId=" +
          pID +
          "&EntityType=Player&Table=Shooting&StatType=Totals"
      );
      await page.waitForSelector(".line-numbers", { timeout: 20000 });

      const body = await page.evaluate(() => {
        return document.querySelector("body").innerHTML;
      });
      // const link = body.split('href="data:text/csv');

      const newbody = body.split('href="data:text/csv,')[1].split('">');

      const csv = decodeURIComponent(newbody[0]);
      const json = Papa.parse(csv);
      const dat = JSON.stringify(json);
      cache.push({ name: names[i], dat: dat });
      console.log(names[i] + " completed size is: " + dat.length);
      await page.close();
    }
    await browser.close();
    return cache;
  } catch (error) {
    console.log(error);

    await page.close();
    await browser.close();
  }
};

const scrapeMedium = async (fname, lname) => {
  const client = redis.createClient({
    url: "redis://:p1aec2448c6cc8395f111ebaefbd5e52d9f19ed4fb6af0d09d44e2b93271090ee@ec2-34-231-237-66.compute-1.amazonaws.com:23880",
    socket: {
      tls: true,
      rejectUnauthorized: false,
    },
  });

  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();

  let json = await client.get(fname + "_" + lname);

  if (!json) {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"],
      });

      let page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        if (
          req.resourceType() == "stylesheet" ||
          req.resourceType() == "font" ||
          req.resourceType() == "image"
        ) {
          req.abort();
        } else {
          req.continue();
        }
      });

      const pID = players[fname + " " + lname];
      await page.goto(
        "https://www.pbpstats.com/game-logs/nba/player?Season=2021-22,2020-21,2017-18,2018-19,2019-20&SeasonType=Regular+Season&EntityId=" +
          pID +
          "&EntityType=Player&Table=Shooting&StatType=Totals"
      );
      await page.waitForSelector(".line-numbers", { timeout: 20000 });

      const body = await page.evaluate(() => {
        return document.querySelector("body").innerHTML;
      });
      // const link = body.split('href="data:text/csv');

      const newbody = body.split('href="data:text/csv,')[1].split('">');

      const csv = decodeURIComponent(newbody[0]);
      json = Papa.parse(csv);

      await page.close();
      await browser.close();
      return json;
    } catch (error) {
      console.log(error);
      await page.close();
      await browser.close();
    }
  } else {
    return JSON.parse(json);
  }
};

const scrapePass = async (fname, lname) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    let page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (
        req.resourceType() == "stylesheet" ||
        req.resourceType() == "font" ||
        req.resourceType() == "image"
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    const pID = players[fname + " " + lname];
    await page.goto(
      "https://www.pbpstats.com/game-logs/nba/player?Season=2021-22,2020-21,2017-18,2018-19,2019-20&SeasonType=Regular+Season&EntityId=" +
        pID +
        "&EntityType=Player&Table=Turnovers&StatType=Totals"
    );
    await page.waitForSelector(".line-numbers", { timeout: 10000 });

    const body = await page.evaluate(() => {
      return document.querySelector("body").innerHTML;
    });
    // const link = body.split('href="data:text/csv');

    const newbody = body.split('href="data:text/csv,')[1].split('">');

    const csv = decodeURIComponent(newbody[0]);
    const json = Papa.parse(csv);
    await page.close();
    ``;
    await browser.close();

    return json;
  } catch (error) {
    console.log(error);
    await page.close();
    await browser.close();
  }
};

const scrapeTShot = async (team) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });

    let page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (
        req.resourceType() == "stylesheet" ||
        req.resourceType() == "font" ||
        req.resourceType() == "image"
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    const tID = teams[team + ""];
    await page.goto(
      "https://www.pbpstats.com/game-logs/nba/team?Season=2021-22&SeasonType=Regular+Season&EntityId=" +
        tID +
        "&EntityType=Team&Table=Shooting&StatType=Totals"
    );
    await page.waitForSelector(".line-numbers", { timeout: 20000 });
    console.log(
      "https://www.pbpstats.com/game-logs/nba/team?Season=2021-22&SeasonType=Regular+Season&EntityId=" +
        tID +
        "&EntityType=Team&Table=Shooting&StatType=Totals"
    );

    const body = await page.evaluate(() => {
      return document.querySelector("body").innerHTML;
    });
    // const link = body.split('href="data:text/csv');

    const newbody = body.split('href="data:text/csv,')[1].split('">');

    const csv = decodeURIComponent(newbody[0]);
    const json = Papa.parse(csv);

    await page.close();
    await browser.close();
    return json;
  } catch (error) {
    console.log(error);

    await page.close();
    await browser.close();
  }
};

const scrapeTTo = async (team) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });

    let page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (
        req.resourceType() == "stylesheet" ||
        req.resourceType() == "font" ||
        req.resourceType() == "image"
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    const tID = teams[team + ""];
    await page.goto(
      "https://www.pbpstats.com/game-logs/nba/team?Season=2021-22&SeasonType=Regular+Season&EntityId=" +
        tID +
        "&EntityType=Team&Table=Turnovers&StatType=Totals"
    );
    await page.waitForSelector(".line-numbers", { timeout: 20000 });

    const body = await page.evaluate(() => {
      return document.querySelector("body").innerHTML;
    });
    // const link = body.split('href="data:text/csv');

    const newbody = body.split('href="data:text/csv,')[1].split('">');

    const csv = decodeURIComponent(newbody[0]);
    const json = Papa.parse(csv);

    await page.close();
    await browser.close();
    return json;
  } catch (error) {
    console.log(error);

    await page.close();
    await browser.close();
  }
};

const scrapeYoutube = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.youtube.com/results?search_query=headless+browser"
  );

  const scrapedData = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".ytd-video-renderer #video-title"))
      .map((link) => ({
        title: link.getAttribute("title"),
        link: link.getAttribute("href"),
      }))
      .slice(0, 10)
  );

  await browser.close();
  return scrapedData;
};

module.exports.scrapeMedium = scrapeMedium;
module.exports.scrapePass = scrapePass;
module.exports.scrapeTShot = scrapeTShot;
module.exports.scrapeTTo = scrapeTTo;
module.exports.scrapeYoutube = scrapeYoutube;
