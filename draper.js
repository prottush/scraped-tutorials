const puppeteer = require('puppeteer')
const Papa = require('papaparse')
const request = require('request')
const cjson = require('compressed-json')
const players = {
  'Immanuel Quickley': '1630193',
  'Obi Toppin': '1630167',
  'Quentin Grimes': '1629656',
  'RJ Barrett': '1629628',
  'LeBron James': '2544',
  'Steven Adams': '203500',
  
    'Tyrese Maxey': '1630178',
    'Russell Westbrook': '201566',
    'Devin Vassell': '1630170',
    
    'Cam Thomas': '1630560',
    'Cole Anthony': '1630175', 
    'Jalen Suggs': '1630591',
    'Ayo Dosunmu': '1630245',
    'Herbert Jones': '1630529',
    'Jonathan Kuminga': '1630228',
    'Chris Duarte': '1630537',
    'Franz Wagner': '1630532',

  'Jakob Poeltl': '1627751',
  'James Harden': '201935',
  'Andrew Wiggins': '203952',
  'Damian Lillard': '203081',
  'Austin Reaves': '1630559',
  'DeMar DeRozan': '201942',
  'Josh Giddey': '1630581',
  'Evan Mobley': '1630596',
  'Tobias Harris': '202699',
  'Giannis Antetokounmpo': '203507',
  'Talen Horton-Tucker': '1629659',
  'Harrison Barnes': '203084',
  'Bradley Beal': '203078',
  
  'Kentavious Caldwell-Pope': '203484',
  'Kyle Lowry': '200768',
  'Kemba Walker': '202689',
  'P.J. Tucker': '200782',
  'Rudy Gobert': '203497',
  'CJ McCollum': '203468',
  'Jimmy Butler': '202710',
  'Andre Drummond': '203083',
  'Bojan Bogdanovic': '202711',
  'Chris Paul': '101108',
  'Khris Middleton': '203114',
  'Draymond Green': '203110',
  'Nikola Vucevic': '202696',
  'Anthony Davis': '203076',
  'Jrue Holiday': '201950',
  'Thaddeus Young': '201152',
  'Steven Adams': '203500',
  'Trevor Ariza': '2772',
  'Eric Bledsoe': '202339',
  'Stephen Curry': '201939',
  'Paul George': '202331',
  'LaMarcus Aldridge': '200746',
  'Evan Fournier': '203095',
  'DeAndre Jordan': '201599',
  'Karl-Anthony Towns': '1626157',
  'Al Horford': '201143',
  'Robert Covington': '203496',
  'Jordan Clarkson': '203903',
  'Marcus Morris Sr.': '202694',
  'Dennis Schroder': '203471',
  'Jae Crowder': '203109',
  'Julius Randle': '203944',
  'Joe Ingles': '204060',
  'Devin Booker': '1626164',
  'Nicolas Batum': '201587',
  'Nikola Jokic': '203999',
  'Brook Lopez': '201572',
  'Cade Cunningham': '1630595',
  'Scottie Barnes': '1630567',
  'Danny Green': '201980',
  'Marcus Smart': '203935',
  'Gordon Hayward': '202330',
  'Wesley Matthews': '202083',
  'Ricky Rubio': '201937',
  'Lou Williams': '101150',
  'Zach LaVine': '203897',
  'Aaron Gordon': '203932',
  'Marc Gasol': '201188',
  'Carmelo Anthony': '2546',
  'Serge Ibaka': '201586',
  'Goran Dragic': '201609',
  'Jeff Green': '201145',
  'Tim Hardaway Jr.': '203501',
  'Jerami Grant': '203924',
  'Kyrie Irving': '202681',
  'Will Barton': '203115',
  'Cory Joseph': '202709',
  'JJ Redick': '200755',
  'Jonas Valanciunas': '202685',
  'Jeff Teague': '201952',
  'Reggie Jackson': '202704',
  'Elfrid Payton': '203901',
  'Paul Millsap': '200794',
  'Kevin Durant': '201142',
  'Klay Thompson': '202691',
  'Eric Gordon': '201569',
  'Justin Holiday': '203200',
  'Mike Conley': '201144',
  'Kawhi Leonard': '202695',
  'Gary Harris': '203914',
  'Avery Bradley': '202340',
  'Terrence Ross': '203082',
  'Patty Mills': '201988',
  'Tristan Thompson': '202684',
  'Mason Plumlee': '203486',
  'Victor Oladipo': '203506',
  'Taj Gibson': '201959',
  'Blake Griffin': '201933',
  'Buddy Hield': '1627741',
  'Markieff Morris': '202693',
  'Myles Turner': '1626167',
  'John Wall': '202322',
  'Kent Bazemore': '203145',
  'Kevin Love': '201567',
  'Austin Rivers': '203085',
  'Josh Richardson': '1626196',
  'Rudy Gay': '200752',
  'Derrick Favors': '202324',
  'Garrett Temple': '202066',
  'Otto Porter Jr.': '203490',
  'Robin Lopez': '201577',
  'Hassan Whiteside': '202355',
  'Marvin Williams': '101107',
  'Enes Freedom': '202683',
  'Danilo Gallinari': '201568',
  'D.J. Augustin': '201571',
  'Clint Capela': '203991',
  'Rajon Rondo': '200765',
  'Kelly Olynyk': '203482',
  "D'Angelo Russell": '1626156',
  'Ish Smith': '202397',
  'Tony Snell': '203503',
  'Gorgui Dieng': '203476',
  'Dwight Howard': '2730',
  'Brandon Ingram': '1627742',
  'George Hill': '201588',
  'Patrick Beverley': '201976',
  'Andre Iguodala': '2738',
  'Kelly Oubre-Jr': '1626162',
  'Domantas Sabonis': '1627734',
  'Terry Rozier': '1626179',
  'Jayson Tatum': '1628369',
  'Rodney Hood': '203918',
  'Derrick Rose': '201565',
  'Al-Farouq Aminu': '202329',
  'T.J. McConnell': '204456',
  'Donovan Mitchell': '1628378',
  'Joe Harris': '203925',
  'Kyle Korver': '2594',
  'Doug McDermott': '203926',
  'Jamal Murray': '1627750',
  'Jaylen Brown': '1627759',
  'Wayne Ellington': '201961',
  'Alex Len': '203458',
  'DeMarcus Cousins': '202326',
  'Courtney Lee': '201584',
  'Pascal Siakam': '1627783',
  'Marcin Gortat': '101162',
  'Evan Turner': '202323',
  'Darren Collison': '201954',
  'Nerlens Noel': '203457',
  'Kyle Anderson': '203937',
  'Langston Galloway': '204038',
  'Maurice Harkless': '203090',
  'Malcolm Brogdon': '1627763',
  'Kristaps Porzingis': '204001',
  'Jeremy Lamb': '203087',
  'James Johnson': '201949',
  "De'Aaron Fox": '1628368',
  'JaMychal Green': '203210',
  'Bismack Biyombo': '202687',
  'Cody Zeller': '203469',
  'T.J. Warren': '203933',
  'Kyle Kuzma': '1628398',
  'Marco Belinelli': '201158',
  'Dwyane Wade': '2548',
  'Ersan Ilyasova': '101141',
  'Solomon Hill': '203524',
  'Ben McLemore': '203463',
  'Dorian Finney-Smith': '1627827',
  'Larry Nance Jr.': '1626204',
  'Ben Simmons': '1627732',
  'Willie Cauley-Stein': '1626161',
  'Patrick Patterson': '202335',
  'Jusuf Nurkic': '203994',
  'Spencer Dinwiddie': '203915',
  'Montrezl Harrell': '1626149',
  'Norman Powell': '1626181',
  'Isaiah Thomas': '202738',
  "E'Twaun Moore": '202734',
  'DeMarre Carroll': '201960',
  'Allen Crabbe': '203459',
  'Dario Saric': '203967',
  'Wilson Chandler': '201163',
  'Alec Burks': '202692',
  'Joel Embiid': '203954',
  'Jamal Crawford': '2037',
  'Bobby Portis': '1626171',
  'Pau Gasol': '2200',
  'Dirk Nowitzki': '1717',
  'Dwight Powell': '203939',
  'Fred VanVleet': '1627832',
  'Tyler Johnson': '204020',
  'Nemanja Bjelica': '202357',
  'Seth Curry': '203552',
  'Joe Johnson': '2207',
  'Jabari Parker': '203953',
  'Bam Adebayo': '1628389',
  'Jarrett Allen': '1628386',
  "Royce O'Neale": '1626220',
  'Reggie Bullock': '203493',
  'Taurean Prince': '1627752',
  'JR Smith': '2747',
  'Mikal Bridges': '1628969',
  'Tomas Satoransky': '203107',
  'Lonzo Ball': '1628366',
  'Anthony Tolliver': '201229',
  'James Ennis III': '203516',
  'Dion Waiters': '203079',
  'Trae Young': '1629027',
  'Trey Burke': '203504',
  'Ed Davis': '202334',
  'Bogdan Bogdanovic': '203992',
  'John Collins': '1628381',
  'Frank Kaminsky': '1626163',
  'Greg Monroe': '202328',
  'Ryan Anderson': '201583',
  'Caris LeVert': '1627747',
  'Matthew Dellavedova': '203521',
  'Dante Cunningham': '201967',
  'Aron Baynes': '203382',
  'Tyus Jones': '1626145',
  'Delon Wright': '1626153',
  'Nikola Mirotic': '202703',
  'Justise Winslow': '1626159',
  'Bryn Forbes': '1627854',
  'Zach Randolph': '2216',
  'Tony Parker': '2225',
  'Dewayne Dedmon': '203473',
  'Richaun Holmes': '1626158',
  'Jared Dudley': '201162',
  'Luka Doncic': '1629029',
  'Michael Carter-Williams': '203487',
  'Lauri Markkanen': '1628374',
  'Stanley Johnson': '1626169',
  'Michael Kidd-Gilchrist': '203077',
  'Tyson Chandler': '2199',
  'CJ Miles': '101139',
  'Monta Ellis': '101145',

  'Dillon Brooks': '1628415',
  
  'Trey Lyles': '1626168',
  'Josh Hart': '1628404',
  'Mike Scott': '203118',
  'Tyreke Evans': '201936',
  'Cedi Osman': '1626224',
  'Emmanuel Mudiay': '1626144',
  'Collin Sexton': '1629012',
  'OG Anunoby': '1628384',
  'Pat Connaughton': '1626192',
  'Arron Afflalo': '201167',
  'Vince Carter': '1713',
  'Dejounte Murray': '1627749',
  'Amir Johnson': '101161',
  'Miles Bridges': '1628970',
  'Davis Bertans': '202722',
  'Shai Gilgeous-Alexander': '1628983',
  'Zaza Pachulia': '2585',
  'Kevin Huerter': '1628989',
  'Iman Shumpert': '202697',
  'Corey Brewer': '201147',
  'Rondae Hollis-Jefferson': '1626178',
  'Wesley Johnson': '202325',
  'Luol Deng': '2736',
  'Nik Stauskas': '203917',
  'Luc Mbah a Moute': '201601',
  'J.J. Barea': '200826',
  'Maxi Kleber': '1628467',
  'Lance Stephenson': '202362',
  'Devin Harris': '2734',
  'Josh Jackson': '1628367',
  'Shaun Livingston': '2733',
  'Andre Roberson': '203460',
  'Mike Muscala': '203488',
  'Deandre Ayton': '1629028',
  'Brandon Knight': '202688',
  'Jeremy Lin': '202391',
  'Kenneth Faried': '202702',
  'Matt Barnes': '2440',
  'Thabo Sefolosha': '200757',
  'Malik Beasley': '1627736',
  'Kosta Koufos': '201585',
  'Trevor Booker': '202344',
  'Mario Hezonja': '1626209',
  'Luke Kennard': '1628379',
  'John Henson': '203089',
  'JaVale McGee': '201580',
  'Lance Thomas': '202498',
  'Jonas Jerebko': '201973',
  'Shabazz Napier': '203894',
  'Ian Mahinmi': '101133',
  'Gerald Green': '101123',
  'Ivica Zubac': '1627826',
  'Raymond Felton': '101109',
  'Monte Morris': '1628420',
  'Chandler Parsons': '202718',
  'Deron Williams': '101114',
  'Ty Lawson': '201951',
  'Derrick White': '1628401',
  "Devonte' Graham": '1628984',
  'Shelvin Mack': '202714',
  'Noah Vonleh': '203943',
  'Duncan Robinson': '1629130',
  'Raul Neto': '203526',
  'Meyers Leonard': '203086',
  'Daniel Theis': '1628464',
  'Kris Dunn': '1627739',
  'Jalen Brunson': '1628973',
  'Channing Frye': '101112',
  'Jameer Nelson': '2749',
  'Tony Allen': '2754',
  'Gerald Henderson': '201945',
  'Landry Shamet': '1629013',
  'Jose Calderon': '101181',
  "DeAndre' Bembry": '1627761',
  'Manu Ginobili': '1938',
  'Glenn Robinson III': '203922',
  'Jonathon Simmons': '203613',
  
  'Yogi Ferrell': '1627812',
  'Bruce Brown': '1628971',
  'Omri Casspi': '201956',
  'Derrick Jones Jr.': '1627884',
  'Mario Chalmers': '201596',
  'David West': '2561',
  'Marquese Chriss': '1627737',
  'Ja Morant': '1629630',
  'Malik Monk': '1628370',
  'Tim Frazier': '204025',
  'Kevon Looney': '1626172',
  'Jason Terry': '1891',
  'Rodney McGruder': '203585',
  'Nick Young': '201156',
  'Jerian Grant': '1626170',
  'Troy Daniels': '203584',
  'Timothe Luwawu-Cabarrot': '1627789',
  'Dennis Smith Jr.': '1628372',
  "Kyle O'Quinn": '203124',
  'Jerryd Bayless': '201573',
  'Jarrett Jack': '101127',
  'Josh Okogie': '1629006',
  'Timofey Mozgov': '202389',
  'Wendell Carter Jr.': '1628976',
  'Jahlil Okafor': '1626143',
  'Darius Garland': '1629636',
  'Denzel Valentine': '1627756',
  'Justin Jackson': '1628382',
  'Hollis Thompson': '203138',
  'Boris Diaw': '2564',
  'Torrey Craig': '1628470',
  'Jon Leuer': '202720',
  'Frank Ntilikina': '1628373',
  'Mitchell Robinson': '1629011',
  'Jaren Jackson Jr.': '1628991',
  'Isaiah Canaan': '203477',
  'Dante Exum': '203957',
  'Danuel House Jr.': '1627863',
  'Jason Smith': '201160',
  'Al Jefferson': '2744',
  'Roy Hibbert': '201579',
  'Joakim Noah': '201149',
  'Shabazz Muhammad': '203498',
  'David Nwaba': '1628021',
  'Cameron Payne': '1626166',
  'Shane Larkin': '203499',
  'Gary Trent Jr.': '1629018',
  'Christian Wood': '1626174',
  'Richard Jefferson': '2210',
  'Ian Clark': '203546',
  'Coby White': '1629632',
  'P.J. Washington': '1629023',
  'Juancho Hernangomez': '1627823',
  'Sterling Brown': '1628425',
  'Tyler Herro': '1629639',
  'Damyean Dotson': '1628422',
  'Alex Caruso': '1627936',
  'Quincy Acy': '203112',
  'Willy Hernangomez': '1626195',
  'Furkan Korkmaz': '1627788',
  'Tyler Zeller': '203092',
  'Khem Birch': '203920',
  'Kenrich Williams': '1629026',
  'Aaron Brooks': '201166',
  'Ramon Sessions': '201196',
  'Brandon Jennings': '201943',
  'Randy Foye': '200751',
  'Dwayne Bacon': '1628407',
  'Terrance Ferguson': '1628390',
  'Marreese Speights': '201578',
  "De'Anthony Melton": '1629001',
  'Semi Ojeleye': '1628400',
  'Aaron Holiday': '1628988',
  'Andrew Bogut': '101106',
  'Darius Miller': '203121',
  'Kevin Knox II': '1628995',
  'Damion Lee': '1627814',
  'Mirza Teletovic': '203141',
  'Brandon Bass': '101138',
  'Rodney Stuckey': '201155',
  'Omer Asik': '201600',
  'Wes Iwundu': '1628411',
  'Donte DiVincenzo': '1628978',
  'Darius Bazley': '1629647',
  'Tim Duncan': '1495',
  'Luis Scola': '2449',
  'Dragan Bender': '1627733',
  'Michael Beasley': '201563',
  'Derrick Williams': '202682',
  'Cameron Johnson': '1629661',
  'Svi Mykhailiuk': '1629004',
  'Ryan Arcidiacono': '1627853',
  'Miles Plumlee': '203101',
  'Thon Maker': '1627748',
  'Kendrick Nunn': '1629134',
  'Anfernee Simons': '1629014',
  'Jared Sullinger': '203096',
  'Anthony Edwards': '1630162',
  'Cristiano Felicio': '1626245',
  'JaKarr Sampson': '203960',
  'Lavoy Allen': '202730',
  'Luguentz Dort': '1629652',
  'Georges Niang': '1627777',
  'Jonathan Isaac': '1628371',
  'Marvin Bagley III': '1628963',
  'Jodie Meeks': '201975',
  'Luke Babbitt': '202337',
  'Frank Jackson': '1628402',
  'Lonnie Walker IV': '1629022',
  'Anthony Morrow': '201627',
  'Jordan Hill': '201941',
  'Troy Brown Jr.': '1628972',
  'Paul Pierce': '1718',
  'Grayson Allen': '1628960',
  'Mike Dunleavy': '2399',
  'Keldon Johnson': '1629640',
  'Patrick McCaw': '1627775',
  'Hamidou Diallo': '1628977',
  'Matisse Thybulle': '1629680',
  'Chris Bosh': '2547',
  'Tarik Black': '204028',
  'David Lee': '101135',
  'Darrell Arthur': '201589',
  'Rui Hachimura': '1629060',
  'Mo Bamba': '1628964',
  'Jordan Poole': '1629673',
  'Saddiq Bey': '1630180',
  'Brandon Clarke': '1629634',
  'Terrence Jones': '203093',
  'Shake Milton': '1629003',
  'Josh Smith': '2746',
  'Kyle Singler': '202713',
  'Norris Cole': '202708',
  'Tyrese Haliburton': '1630169',
  "Jae'Sean Tate": '1630256',
  'Spencer Hawes': '201150',
  'Cam Reddish': '1629629',
  'Sam Dekker': '1626155',
  'Chris Boucher': '1628449',
  'C.J. Watson': '201228',
  'Brad Wanamaker': '202954',
  'Sean Kilpatrick': '203930',
  'Michael Porter Jr.': '1629008',
  'Donatas Motiejunas': '202700',
  'Kobe Bryant': '977',
  'Justin Anderson': '1626147',
  'Leandro Barbosa': '2571',
  'Jake Layman': '1627774',
  'Grant Williams': '1629684',
  "De'Andre Hunter": '1629631',
  'Thomas Bryant': '1628418',
  'Andrew Harrison': '1626150',
  'Isaac Okoro': '1630171',
  'Jarell Martin': '1626185',
  'Markelle Fultz': '1628365',
  'Treveon Graham': '1626203',
  'Kris Humphries': '2743',
  'Tayshaun Prince': '2419',
  'Terance Mann': '1629611',
  'Joffrey Lauvergne': '203530',
  'O.J. Mayo': '201564',
  'Tyler Ulis': '1627755',
  'Alex Abrines': '203518',
  'Desmond Bane': '1630217',
  'Kevin Porter Jr.': '1629645',
  'Beno Udrih': '2757',
  'Mo Williams': '2590',
  'Cody Martin': '1628998',
  'Zion Williamson': '1629627',
  'Zach Collins': '1628380',
  'Terence Davis': '1629056',
  'Eric Paschall': '1629672',
  'Shaquille Harrison': '1627885',
  'Quinn Cook': '1626188',
  'Nickeil Alexander-Walker': '1629638',
  'Boban Marjanovic': '1626246',
  'Jevon Carter': '1628975',
  'Skal Labissiere': '1627746',
  'Robert Williams III': '1629057',
  'LaMelo Ball': '1630163',
  'Abdel Nader': '1627846',
  'Jaden McDaniels': '1630183',
  'Steve Blake': '2581',
  'Brandan Wright': '201148',
  'Naz Reid': '1629675',
  'Jason Thompson': '201574',
  'Jaxson Hayes': '1629637',
  'Marcus Thornton': '201977',
  'Wayne Selden': '1627782',
  'Alonzo Gee': '202087',
  'Damian Jones': '1627745',
  'Moritz Wagner': '1629021'
}

const cPlayers = [
  'Immanuel Quickley',
  'Obi Toppin',
  'Quentin Grimes',
  'Andrew Wiggins',
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

const computeRollingShotChart =  (
  data,
  window = 15,
  type = 'rftr',
  date = '2013-14',
  tableTrend = false
)=> {
  const seasonMap = {
    '2013-14': Date.parse('2013-3-30'),
    '2014-15': Date.parse('2014-10-27'),
    '2015-16': Date.parse('2015-10-27'),
    '2016-17': Date.parse('2016-10-25'),
    '2017-18': Date.parse('2017-10-27'),
    '2018-19': Date.parse('2018-10-26'),
    '2019-20': Date.parse('2020-10-22'),
    '2020-21': Date.parse('2020-12-22'),
    '2021-22': Date.parse('2021-10-19')
  }
  // helper function
  const pIntA = i => {
    if (typeof i === 'undefined') {
      return 0
    } else if (typeof i === 'string') {
      return i.length > 0 ? parseInt(i) : 0
    } else {
      return parseInt(i)
    }
  }

  let nData = []
  let teamChart = []
  let winSet = false

  const stat1 = [
    'ShortMidRangeFGA',
    'LongMidRangeFGA',
    'ShortMidRangeFGM',
    'AtRimPctAssisted',
    'LongMidRangePctAssisted',
    'PtsUnassisted3s',
    'LongMidRangeFGM',
    'Assists',
    'FtPoints',
    'AtRimFGM',
    'AtRimFGA',
    'BadPassTurnovers',
    'Steals',
    'Blocks',
    'FG3A',
    'Minutes',
    'FG3M',
    'FG2M',
    'FG2A',
    'FG3A',
    'FTA',
    'PlusMinus',
    'Rebounds',
    'Points',
    'OffPoss',
    'DefPoss',
    'DefRebounds',
    'Arc3FGM',
    'Arc3FGA',
    'OffRebounds',
    'LiveBallTurnovers',
    'Corner3FGA',
    'Corner3FGM',
    'FoulsDrawn',
    'Fouls',
    'ShotQualityAvg',
    'OnDefRtg',
    'OnOffRtg',
    'PtsUnassisted2s',
    'PtsUnassisted3s',
    'AssistPoints'
  ]

  const stats = [...new Set(stat1)];

  const rStats = {}

  // initialize rolling stat object
  for (let i = 0; i < stats.length; i++) {
    rStats['curr' + stats[i]] = 0
    rStats['tot' + stats[i]] = 0
  }


  data = data.filter(k => Date.parse(k.Date) > seasonMap[date])


  window = window > data.length? data.length -2  : window;
  let currRFGA = 0
  let currTeam = data[window + 1].Team

  let totRFGA = 0
  let currRFGM = 0
  let totRFGM = 0

  let currFGA = 0
  let totFGA = 0

  let currSRMA = 0
  let totSRMA = 0
  let currLRMA = 0
  let totLRMA = 0

  let currFTA = 0
  let currFTM = 0
  let totFTA = 0
  let totFTM = 0

  let currRimA = 0;
  let totRimA = 0;

  let currM = 0
  let totM = 0

  let currPM = 0
  let totPM = 0

  let currTPD = 0
  let totTPD = 0

  for (let i = 1; i < data.length; i++) {
    let game = data[i]

    // Date windows for team colors
    if (winSet && (currTeam !== game.Team || i === data.length -1  )) {
      teamChart.push({
        team: currTeam,
        gameE: game.Date,
        gameS:
          teamChart.length === 0
            ? data[window].Date
            : teamChart[teamChart.length - 1].gameE
      })
      currTeam = game.Team
    }

    // Roll Function
    for (let j = 0; j < stats.length; j++) {
      if (stats[i] === 'OffensiveRating ') game = data[i]
      rStats['curr' + stats[j]] =
        rStats['curr' + stats[j]] +
        pIntA(game[stats[j]]) -
        (winSet ? pIntA(data[i - window][stats[j]]) : 0)
      rStats['tot' + stats[j]] =
        rStats['tot' + stats[j]] + pIntA(game[stats[j]])
    }

    currRimA = currRimA + (pIntA(game.AtRimFGM) * pIntA(game.AtRimPctAssisted)) -  (winSet ? (pIntA(data[i - window].AtRimFGM) * pIntA(data[i - window].AtRimPctAssisted)) : 0);
    totRimA = totRimA + (pIntA(game.AtRimFGM) * pIntA(game.AtRimPctAssisted));

    totRFGA = totRFGA + pIntA(game.AtRimFGA)
    totRFGM = totRFGM + pIntA(game.AtRimFGM)

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

    // shift +/- by 50, to display on graph
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

    totTPD = totTPD + pIntA(game.Avg2ptShotDistance) * pIntA(game.FG2A)
    currTPD =
      currTPD +
      pIntA(game.Avg2ptShotDistance) * pIntA(game.FG2A) -
      (winSet
        ? pIntA(data[i - window].Avg2ptShotDistance) *
          pIntA(data[i - window].FG2A)
        : 0)

    // calculate rate stats
    const ts = (
      (rStats['currPoints'] / (2 * (currFGA + 0.44 * rStats['currFTA']))) *
      100
    ).toFixed(2)

    const mrm = (
      ((rStats['currShortMidRangeFGM'] + rStats['currLongMidRangeFGM']) /
        (rStats['currShortMidRangeFGA'] + rStats['currLongMidRangeFGA'])) *
      100
    ).toFixed(2)
    const rtpd = ((currTPD / (currSRMA + currLRMA + currRFGA)) * 4).toFixed(2)
    const mpg = (currM / (winSet ? window : i)).toFixed(2)
    const ppg = (rStats['currPoints'] / (winSet ? window : i)).toFixed(2)
    const apg = (rStats['currAssists'] / (winSet ? window : i)).toFixed(2)
    const tpg = (
      rStats['currLiveBallTurnovers'] / (winSet ? window : i)
    ).toFixed(2)
    const spg = (rStats['currSteals'] / (winSet ? window : i)).toFixed(2)
    const rpg = (rStats['currRebounds'] / (winSet ? window : i)).toFixed(2)
    const bpg = (rStats['currBlocks'] / (winSet ? window : i)).toFixed(2)
    const rbp = (
      rStats['currAssists'] / rStats['currBadPassTurnovers']
    ).toFixed(2)
    const xpm = (rStats['PlusMinus'] / (winSet ? window : i)).toFixed(2)
    const ftr = ((rStats['currFTA'] / currFGA) * 100).toFixed(2)
    const rft = ((rStats['currFtPoints'] / rStats['currFTA']) * 100).toFixed(
      2
    )

    const ctpp = (
      (rStats['currCorner3FGM'] / rStats['currCorner3FGA']) *
      100
    ).toFixed(2)

    const rua = ((1-(currRimA/rStats['currAtRimFGM'])) *100).toFixed(2)

    let mua = (((rStats['currPtsUnassisted2s'] - (currRimA*2))/(rStats['currFG2M']*2))*100).toFixed(2)
    
    mua = mua < 0 ? 0 : mua;

    const tua = (
      (rStats['currPtsUnassisted3s'] / (rStats['currFG3M'] * 3)) *
      100
    ).toFixed(2)

    const arcpp = (
      (rStats['currArc3FGM'] / rStats['currArc3FGA']) *
      100
    ).toFixed(2)
    const tpr = ((rStats['currFG3M'] / rStats['currFG3A']) * 100).toFixed(2)
    const efg = (
      ((rStats['currFG3M'] + rStats['currFG2M'] + 0.5 * rStats['currFG3M']) /
        currFGA) *
      100
    ).toFixed(2)
    const mfq = (((currSRMA + currLRMA) / currFGA) * 100).toFixed(2)
    const tfq = ((rStats['currFG3A'] / currFGA) * 100).toFixed(2)
    const rimfq = ((currRFGA / currFGA) * 100).toFixed(2)
    const offrtg = (
      (rStats['currOnOffRtg'] / rStats['currOffPoss']) *
      75
    ).toFixed(2)
    const defrtg = (
      (rStats['currOnDefRtg'] / rStats['currDefPoss']) *
      75
    ).toFixed(2)
    const ppp = ((rStats['currPoints'] / rStats['currOffPoss']) * 75).toFixed(
      2
    )
    const rpp = (
      (rStats['currRebounds'] /
        (rStats['currOffPoss'] + rStats['currDefPoss'])) *
      75
    ).toFixed(2)
    const bpp = ((rStats['currBlocks'] / rStats['currDefPoss']) * 75).toFixed(
      2
    )
    const spp = ((rStats['currSteals'] / rStats['currDefPoss']) * 75).toFixed(
      2
    )
    const topp = (
      (rStats['currLiveBallTurnovers'] / rStats['currOffPoss']) *
      75
    ).toFixed(2)
    const app = (
      (rStats['currAssists'] / rStats['currOffPoss']) *
      75
    ).toFixed(2)
    const attr = (
      rStats['currAssists'] / rStats['currLiveBallTurnovers']
    ).toFixed(2)

    const appp = (
      (rStats['currAssistPoints'] / rStats['currOffPoss']) *
      75
    ).toFixed(2)

    const appg = (rStats['currAssistPoints'] / (winSet ? window : i)).toFixed(
      2
    )
    const pgs = (((rStats['currPoints']) + (.4 * (rStats['currFG2M'] + rStats['currFG3M'])) + (.7 * rStats['currOffRebounds']) + (.3 *rStats['currDefRebounds']) + (rStats['currSteals']) + (rStats['currAssists'] *.7) + (rStats['currBlocks'] *.7) - (.7* (currFGA - rStats['currFG2M'] - rStats['currFG3M'])) - (.4*(rStats['currFTA']-rStats['currFtPoints'])) - (.4 * rStats['currFouls']) - (.4 * rStats['currLiveBallTurnovers'])) / (winSet ? window : i)
      ).toFixed(2);  
    const defrpp = (
      (rStats['currDefRebounds'] / rStats['currDefPoss']) *
      75
    ).toFixed(2)
    const defrpg = (
      rStats['currDefRebounds'] / (winSet ? window : i)
    ).toFixed(2)

    const offrpp = (
      (rStats['currOffRebounds'] / rStats['currOffPoss']) *
      75
    ).toFixed(2)
    const offrpg = (
      rStats['currOffRebounds'] / (winSet ? window : i)
    ).toFixed(2)

    const fdpp = (
      (rStats['currFoulsDrawn'] / rStats['currOffPoss']) *
      75
    ).toFixed(2)
    const fdpg = (rStats['currFoulsDrawn'] / (winSet ? window : i)).toFixed(2)

    const ua2pp = (
      (rStats['currPtsUnassisted2s'] / rStats['currOffPoss']) *
      75
    ).toFixed(2)
    const ua2pg = (
      rStats['currPtsUnassisted2s'] / (winSet ? window : i)
    ).toFixed(2)

    const ua3pp = (
      (rStats['currPtsUnassisted3s'] / rStats['currOffPoss']) *
      75
    ).toFixed(2)
    const ua3pg = (
      rStats['currPtsUnassisted3s'] / (winSet ? window : i)
    ).toFixed(2)

    const sectionOne = Math.exp(
      -1 *
        (((rStats['currFG3A'] / rStats['currOffPoss']) * 75 * 100) /
          (((currM / rStats['currOffPoss']) * 75 * 96) / 48 + 500))
    )
    const sectionTwo =
      (rStats['currFG3M'] / rStats['currFG3A']) *
      (2 / (1 + sectionOne) - 1)

    const bc =
      ((parseFloat(app) * 4) / 3) * 0.1843 +
      (parseFloat(topp) + (parseFloat(ppp) * 4) / 3) * 0.0969 -
      2.3021 * sectionTwo +
      0.0582 *
        ((parseFloat(app) * 4) / 3) *
        (parseFloat(topp) + (parseFloat(ppp) * 4) / 3) *
        sectionTwo -
      1.1942

      const sectionO = Math.exp(
        -1 *
          (((rStats['totFG3A'] / rStats['totOffPoss']) * 75 * 100) /
            (((currM / rStats['totOffPoss']) * 75 * 96) / 48 + 500))
      )
      const sectionT =
        (rStats['totFG3M'] / rStats['totFG3A'])  *
        (2 / (1 + sectionO) - 1)

      const avbc =
        ((parseFloat((rStats['totAssists'] / rStats['totOffPoss']) * 75) *
          4) /
          3) *
          0.1843 +
        ((rStats['totLiveBallTurnovers'] / rStats['totOffPoss']) * 75 +
          ((rStats['totPoints'] / rStats['totOffPoss']) * 75 * 4) / 3) *
          0.0969 -
        2.3021 * sectionT +
        0.0582 *
          (((rStats['totAssists'] / rStats['totOffPoss']) * 75 * 4) / 3) *
          ((rStats['totLiveBallTurnovers'] / rStats['totOffPoss']) * 75 +
            ((rStats['totPoints'] / rStats['totOffPoss']) * 75 * 4) / 3) *
          sectionT -
        1.1942
    
    const mor= (((rStats['currAtRimFGA'] + rStats['currFG3A'])/(rStats['currFG3A'] + rStats['currFG2A']))*100).toFixed(2)
    nData.push({
      rsq: ((currRFGM / currRFGA) * 100).toFixed(2),
      gameN: i,
      rimfq: rimfq,
      pgs: pgs,
      mfq: mfq,
      bc: bc.toFixed(2),
      efg: efg,
      tfq: tfq,
      rtpd: rtpd,
      rft: rft,
      ts: ts,
      apg: apg,
      ctpp: ctpp,
      avrsq: ((totRFGM / totRFGA) * 100).toFixed(2),
        avrimfq: ((totRFGA / totFGA) * 100).toFixed(2),
        avmfq: (((totSRMA + totLRMA) / totFGA) * 100).toFixed(2),
        avxpm: 50, // TODO: Change to percentage
        avtfq: ((rStats['totFG3A'] / totFGA) * 100).toFixed(2),
        avattr: (
          rStats['totAssists'] / rStats['totLiveBallTurnovers']
        ).toFixed(2),
        avefg: (
          ((rStats['totFG3M'] + rStats['totFG2M'] + 0.5 * rStats['totFG3M']) /
            totFGA) *
          100
        ).toFixed(2),
        avppp: ((rStats['totPoints'] / rStats['totOffPoss']) * 75).toFixed(2),
        avrpp: ((rStats['totRebounds'] / rStats['totOffPoss']) * 75).toFixed(2),
        avapg: (rStats['totAssists'] / data.length).toFixed(2),
        
        avapp: ((rStats['totAssists'] / rStats['totOffPoss']) * 75).toFixed(
          2
        ),
        avpgs: (((rStats['totPoints']) + (.4 * (rStats['totFG2M'] + rStats['totFG3M'])) + (.7 * rStats['totOffRebounds']) + (.3 *rStats['totDefRebounds']) + (rStats['totSteals']) + (rStats['totAssists'] *.7) + (rStats['totBlocks'] *.7) - (.7* (totFGA - rStats['totFG2M'] - rStats['totFG3M'])) - (.4*(rStats['totFTA']-rStats['totFtPoints'])) - (.4 * rStats['totFouls']) - (.4 * rStats['totLiveBallTurnovers'])) / (data.length)
          ).toFixed(2),
        avmor: (((rStats['totAtRimFGA'] + rStats['totFG3A'])/(rStats['totFG3A'] + rStats['totFG2A']))*100).toFixed(2),
        avtopp: (
          (rStats['totLiveBallTurnovers'] / rStats['totOffPoss']) *
          75
        ).toFixed(2),
        avtpg: ((rStats['totLiveBallTurnovers'] / data.length)).toFixed(2),
        avspp: ((rStats['totSteals'] / rStats['totDefPoss']) * 75).toFixed(2),
        avbpp: ((rStats['totBlocks'] / rStats['totDefPoss']) * 75).toFixed(2),
        avtpr: ((rStats['totFG3M'] / rStats['totFG3A']) * 100).toFixed(2),
        avftr: ((rStats['totFTA'] / totFGA) * 100).toFixed(2),
        avrbp: (rStats['totAssists'] / rStats['totBadPassTurnovers']).toFixed(
          2
        ),
        avctpp: (
          (rStats['totCorner3FGM'] / rStats['totCorner3FGA']) *
          100
        ).toFixed(2),
        avarcpp: (
          (rStats['totArc3FGM'] / rStats['totArc3FGA']) *
          100
        ).toFixed(2),
        avmrm: (
          ((rStats['totShortMidRangeFGM'] + rStats['totLongMidRangeFGM']) /
            (rStats['totShortMidRangeFGA'] + rStats['totLongMidRangeFGA'])) *
          100
        ).toFixed(2),
        avbc: avbc.toFixed(2),
        avappp: (
          (rStats['totAssistPoints'] / rStats['totOffPoss']) *
          75
        ).toFixed(2),

        avappg: (rStats['totAssistPoints'] / data.length).toFixed(2),
        avdefrpp: (
          (rStats['totDefRebounds'] / rStats['totDefPoss']) *
          75
        ).toFixed(2),
        avdefrpg: (rStats['totDefRebounds'] / data.length).toFixed(2),
        avoffrpp: (
          (rStats['totOffRebounds'] / rStats['totOffPoss']) *
          75
        ).toFixed(2),
        avoffrpg: (rStats['totOffRebounds'] / data.length).toFixed(2),
        avfdpp: (
          (rStats['totFoulsDrawn'] / rStats['totOffPoss']) *
          75
        ).toFixed(2),
        avfdpg: (rStats['totFoulsDrawn'] / data.length).toFixed(2),
        avts: (
          (rStats['totPoints'] / (2 * (totFGA + 0.44 * rStats['totFTA']))) *
          100
        ).toFixed(2),
        avppg: (rStats['totPoints'] / data.length).toFixed(2),
        avrpg: ((rStats['totRebounds'] / data.length)*100).toFixed(2),

        avoffrtg: (
          (rStats['totOnOffRtg'] / rStats['totOffPoss']) *
          75
        ).toFixed(2),
        avdefrtg: (
          (rStats['totOnDefRtg'] / rStats['totDefPoss']) *
          75
        ).toFixed(2),
        avrua: ((1-(totRimA/rStats['totAtRimFGM'])) *100).toFixed(2),

        avmua: (((rStats['totPtsUnassisted2s'] - (totRimA*2))/(rStats['totFG2M']*2))*100).toFixed(2),
        avtua: (
          (rStats['totPtsUnassisted3s'] / (rStats['totFG3M'] * 3)) *
          100
        ).toFixed(2),
        avspg: (rStats['totSteals'] / data.length).toFixed(2),
        avrpg: (rStats['totRebounds'] / data.length).toFixed(2),
        avbpg: (rStats['totBlocks'] / data.length).toFixed(2),
        avmpg: (totM / data.length).toFixed(2),
        avrft: ((rStats['totFtPoints'] / rStats['totFTA']) * 100).toFixed(2),
        ua2pp: (
          (rStats['totPtsUnassisted2s'] / rStats['totOffPoss']) *
          75
        ).toFixed(2),
        ua2pg: (rStats['currPtsUnassisted2s'] / data.length).toFixed(2),
        ua3pp: (
          (rStats['totPtsUnassisted3s'] / rStats['totOffPoss']) *
          75
        ).toFixed(2),
        ua3pg: (rStats['currPtsUnassisted3s'] / data.length).toFixed(2),
      mor: mor,
      bpg: bpg,
      ua2pp: ua2pp,
      ua2pg: ua2pg,
      ua3pp: ua3pp,
      ua3pg: ua3pg,
      defrpp: defrpp,
      defrpg: defrpg,
      offrpp: offrpp,
      offrpg: offrpg,
      appp: appp,
      mua: mua,
      rua: rua,
      tua: tua,
      appg: appg,
      mrm: mrm,
      arcpp: arcpp,
      spg: spg,
      rpg: rpg,
      tpr: tpr,
      xpm: xpm,
      ppg: ppg,
      offrtg: offrtg,
      fdpp: fdpp,
      fdpg: fdpg,
      defrtg: defrtg,
      ftr: ftr,
      rbp: rbp,
      tpg: tpg,
      ppp: ppp,
      attr: attr,
      app: app,
      bpp: bpp,
      spp: spp,
      rpp: rpp,
      topp: topp,
      mpg: mpg,
      reb: pIntA(game.Rebounds),
      assists: pIntA(game.Assists),
      steals: pIntA(game.Steals),
      blocks: pIntA(game.Blocks),
      team: game.Team,
      min: game.Minutes,
      points: pIntA(game.Points),
      rfga: pIntA(game.AtRimFGA),
      date: game.Date,
      opp: game.Opponent
    })



    // initial window
    if (i >= window) {
      winSet = true
    }
  }
  console.log(rStats)
  return nData;
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
      'redis://:p1aec2448c6cc8395f111ebaefbd5e52d9f19ed4fb6af0d09d44e2b93271090ee@ec2-44-194-23-208.compute-1.amazonaws.com:28059',
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
      'redis://:p1aec2448c6cc8395f111ebaefbd5e52d9f19ed4fb6af0d09d44e2b93271090ee@ec2-44-194-23-208.compute-1.amazonaws.com:28059',
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
      'redis://:p1aec2448c6cc8395f111ebaefbd5e52d9f19ed4fb6af0d09d44e2b93271090ee@ec2-44-194-23-208.compute-1.amazonaws.com:28059',
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
      'redis://:p1aec2448c6cc8395f111ebaefbd5e52d9f19ed4fb6af0d09d44e2b93271090ee@ec2-44-194-23-208.compute-1.amazonaws.com:28059',
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
    if (cPlayers.includes(property)) {
      const result = await doRequest(
        'https://api.pbpstats.com/get-game-logs/nba?Season=2021-22&SeasonType=Regular%20Season&EntityType=Player&EntityId=' +
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
        if (pd) {
          if (jsonN) {
            let obj4 = cjson.decompress.fromString(jsonN)
            obj4 = obj4.filter(word => word.Date.split('-')[0] !== '2022')
            pd4 = pd.filter(word => word.Date.split('-')[0] === '2022')
            newO = obj4.concat(pd4);
            pd = newO;
            const compressedString4 = cjson.compress.toString(pd)
            await client.set(name[0] + '_' + name[1], compressedString4)
            // console.log(name[0], name[1], '2022')
          }
          const data = computeRollingShotChart(pd, 5)
          if (
            data.length >= 20 &&
            data[data.length - 1].date.split('-')[0] === '2022'
          ) {
            const trend = data.slice(data.length - 1, data.length)
            const tdat = { [name[0] + ' ' + name[1]]: trend }
            let obj = {}
            if (json) {
              obj = cjson.decompress.fromString(json)
            }

            const mergedObject = {
              ...obj,
              ...tdat
            }
            const compressedString = cjson.compress.toString(mergedObject)
            await client.set('trend', compressedString)
            console.log(name[0], name[1], compressedString.length)
          }
          const data10 = computeRollingShotChart(pd, 10)
          if (
            data10.length >= 20 &&
            data10[data10.length - 1].date.split('-')[0] === '2022'
          ) {
            const trend2 = data10.slice(data10.length - 1, data10.length)
            const tdat2 = { [name[0] + ' ' + name[1]]: trend2 }
            let obj2 = {}
            if (json2) {
              obj2 = cjson.decompress.fromString(json2)
            }

            const mergedObject2 = {
              ...obj2,
              ...tdat2
            }
            const compressedString2 = cjson.compress.toString(mergedObject2)
            await client.set('trend2', compressedString2)
            console.log(name[0], name[1], compressedString2.length)
          }
          const data20 = computeRollingShotChart(pd, 20)
          if (
            data20.length >= 20 &&
            data20[data20.length - 1].date.split('-')[0] === '2022'
          ) {
            const trend3 = data20.slice(data20.length - 1, data20.length)
            const tdat3 = { [name[0] + ' ' + name[1]]: trend3 }
            let obj3 = {}
            if (json3) {
              obj3 = cjson.decompress.fromString(json3)
            }

            const mergedObject3 = {
              ...obj3,
              ...tdat3
            }
            const compressedString3 = cjson.compress.toString(mergedObject3)
            await client.set('trend3', compressedString3)
            console.log(name[0], name[1], compressedString3.length)
          }
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
      'redis://:p1aec2448c6cc8395f111ebaefbd5e52d9f19ed4fb6af0d09d44e2b93271090ee@ec2-44-194-23-208.compute-1.amazonaws.com:28059',
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
      'redis://:p1aec2448c6cc8395f111ebaefbd5e52d9f19ed4fb6af0d09d44e2b93271090ee@ec2-44-194-23-208.compute-1.amazonaws.com:28059',
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
