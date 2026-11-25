/* Destinations recorded by Yu Yan. Coordinates represent stops or, where only a
   country was named, an approximate point within it. They are not a GPS track. */
window.travelData = {
  countries: {
    CHN:{name:'China',region:'East Asia',places:'Xinjiang · Yunnan · Hong Kong · Macao',note:'I began the circuit in Xinjiang, with the Tian Shan and Sayram Lake in my notebook.'},
    KAZ:{name:'Kazakhstan',region:'Central Asia',places:'Almaty',note:'Almaty was my first stop outside China on this circuit. My notes from the city are full of mountains and dogs.'},
    UZB:{name:'Uzbekistan',region:'Central Asia',places:'Bukhara · Samarkand',note:'In Bukhara I held up my guidebook in front of the towers on its cover. In Samarkand I watched the evening light move across the tiled domes.'},
    KGZ:{name:'Kyrgyzstan',region:'Central Asia'},
    ARM:{name:'Armenia',region:'South Caucasus'},
    GEO:{name:'Georgia',region:'South Caucasus'},
    AZE:{name:'Azerbaijan',region:'South Caucasus',places:'Baku',note:'My Baku album moves between the Caspian waterfront and firelight.'},
    TUR:{name:'Türkiye',region:'Eastern Mediterranean',places:'Istanbul · Cappadocia · Fethiye · Kaş · Antalya',note:'I watched the balloons light up in Cappadocia, went paragliding over Fethiye and followed the D400 along the Mediterranean coast.'},
    EGY:{name:'Egypt',region:'North Africa',places:'Hurghada · Luxor · Giza',note:'I went snorkeling in the Red Sea, saw the temples in Luxor, and photographed the pyramids and the dogs that wandered around them in Giza.'},
    BHR:{name:'Bahrain',region:'Arabian Gulf',places:'Sakhir',note:'My stop in Bahrain included a visit to the Bahrain International Circuit in Sakhir.'},
    MYS:{name:'Malaysia',region:'Southeast Asia',places:'Kuala Lumpur',note:'In Kuala Lumpur I photographed the Petronas Towers lit up after dark.'},
    SGP:{name:'Singapore',region:'Southeast Asia',places:'Jewel Changi · Marina Bay',note:'I photographed the waterfall at Jewel Changi and the waterfront at Marina Bay, and met a friend on the National University of Singapore campus.'},
    JPN:{name:'Japan',region:'East Asia',places:'Nara · Kyoto · Osaka · Tokyo · Shizuoka',note:'My Japan album goes from deer in Nara and cherry blossoms in Kyoto to the lights of Osaka and Tokyo.'},
    KOR:{name:'South Korea',region:'East Asia'},
    THA:{name:'Thailand',region:'Southeast Asia',places:'Bangkok'},
    IDN:{name:'Indonesia',region:'Southeast Asia',places:'Bali'},
    PHL:{name:'Philippines',region:'Southeast Asia',places:'Manila · Makati'},
    CHE:{name:'Switzerland',region:'Europe'},
    LAO:{name:'Laos',region:'Southeast Asia'},
    VNM:{name:'Vietnam',region:'Southeast Asia'},
    KHM:{name:'Cambodia',region:'Southeast Asia'},
    FRA:{name:'France',region:'Europe'},DEU:{name:'Germany',region:'Europe'},
    GBR:{name:'United Kingdom',region:'Europe',places:'London · Liverpool · Gretna Green'},ITA:{name:'Italy',region:'Europe',places:'Rome · Venice'},
    USA:{name:'United States',region:'North America',places:'New York City · Philadelphia · Washington, DC'},
    AUS:{name:'Australia',region:'Oceania',places:'Melbourne · Great Ocean Road · Sydney · Wollongong · Gold Coast',note:'I followed the Great Ocean Road to the Twelve Apostles, then caught The Phantom of the Opera in Sydney.'},
    NZL:{name:'New Zealand',region:'Oceania',places:'Waitomo · Hobbiton · Milford Sound · Queenstown · Lake Tekapo · Christchurch',note:'In one trip I went underground at Waitomo, saw the Southern Alps from the cockpit of a small plane and photographed the night sky at Lake Tekapo.'}
  },
  legs: [
    {title:'Xinjiang & Central Asia',stops:[
      {id:'CHN',label:'Xinjiang, China',lng:81.18,lat:44.61},{id:'KAZ',lng:76.89,lat:43.24},{id:'UZB',lng:66.98,lat:39.65},{id:'KGZ',lng:74.6,lat:41.3}
    ]},
    {title:'The South Caucasus',stops:[
      {id:'ARM',lng:44.93,lat:40.30},{id:'GEO',lng:43.55,lat:42.15},{id:'AZE',lng:49.87,lat:40.41}
    ]},
    {title:'The Mediterranean & the Gulf',stops:[
      {id:'TUR',lng:28.98,lat:41.01},{id:'EGY',lng:32.64,lat:25.69},{id:'BHR',lng:50.51,lat:26.03}
    ]},
    {title:'Southeast Asia',stops:[
      {id:'MYS',lng:101.69,lat:3.14},{id:'SGP',lng:103.82,lat:1.35}
    ]}
  ]
};
