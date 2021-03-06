
                   require('coffee-script');
var db           = require('../db'),
    CitySchema   = require('./city'),
    StateSchema  = require('./state'),
    City         = db.model('City', CitySchema);
    State        = db.model('State', StateSchema);
var states = [ 
  { active : true,
    countryCode : "us",
    slugOld : "alabama",
    idOld : 2,
    stateCode : "al",
    name : "Alabama",
    slug : "alabama"
  },
  { active : true,
    countryCode : "us",
    slugOld : "alaska",
    idOld : 3,
    stateCode : "ak",
    name : "Alaska",
    slug : "alaska"
  },
  { active : true,
    countryCode : "us",
    slugOld : "arizona",
    idOld : 4,
    stateCode : "az",
    name : "Arizona",
    slug : "arizona"
  },
  { active : true,
    countryCode : "us",
    slugOld : "arkansas",
    idOld : 5,
    stateCode : "ar",
    name : "Arkansas",
    slug : "arkansas"
  },
  { active : true,
    countryCode : "us",
    slugOld : "california",
    idOld : 6,
    stateCode : "ca",
    name : "California",
    slug : "california"
  },
  { active : true,
    countryCode : "us",
    slugOld : "colorado",
    idOld : 7,
    stateCode : "co",
    name : "Colorado",
    slug : "colorado"
  },
  { active : true,
    countryCode : "us",
    slugOld : "connecticut",
    idOld : 8,
    stateCode : "ct",
    name : "Connecticut",
    slug : "connecticut"
  },
  { active : true,
    countryCode : "us",
    slugOld : "delaware",
    idOld : 9,
    stateCode : "de",
    name : "Delaware",
    slug : "delaware"
  },
  { active : true,
    countryCode : "us",
    slugOld : "florida",
    idOld : 11,
    stateCode : "fl",
    name : "Florida",
    slug : "florida"
  },
  { active : true,
    countryCode : "us",
    slugOld : "georgia",
    idOld : 12,
    stateCode : "ga",
    name : "Georgia",
    slug : "georgia"
  },
  { active : true,
    countryCode : "us",
    slugOld : "hawaii",
    idOld : 13,
    stateCode : "hi",
    name : "Hawaii",
    slug : "hawaii"
  },
  { active : true,
    countryCode : "us",
    slugOld : "idaho",
    idOld : 14,
    stateCode : "id",
    name : "Idaho",
    slug : "idaho"
  },
  { active : true,
    countryCode : "us",
    slugOld : "illinois",
    idOld : 15,
    stateCode : "il",
    name : "Illinois",
    slug : "illinois"
  },
  { active : true,
    countryCode : "us",
    slugOld : "indiana",
    idOld : 16,
    stateCode : "in",
    name : "Indiana",
    slug : "indiana"
  },
  { active : true,
    countryCode : "us",
    slugOld : "iowa",
    idOld : 17,
    stateCode : "ia",
    name : "Iowa",
    slug : "iowa"
  },
  { active : true,
    countryCode : "us",
    slugOld : "kansas",
    idOld : 18,
    stateCode : "ks",
    name : "Kansas",
    slug : "kansas"
  },
  { active : true,
    countryCode : "us",
    slugOld : "kentucky",
    idOld : 19,
    stateCode : "ky",
    name : "Kentucky",
    slug : "kentucky"
  },
  { active : true,
    countryCode : "us",
    slugOld : "louisiana",
    idOld : 20,
    stateCode : "la",
    name : "Louisiana",
    slug : "louisiana"
  },
  { active : true,
    countryCode : "us",
    slugOld : "maine",
    idOld : 21,
    stateCode : "me",
    name : "Maine",
    slug : "maine"
  },
  { active : true,
    countryCode : "us",
    slugOld : "maryland",
    idOld : 22,
    stateCode : "md",
    name : "Maryland",
    slug : "maryland"
  },
  { active : true,
    countryCode : "us",
    slugOld : "massachusetts",
    idOld : 23,
    stateCode : "ma",
    name : "Massachusetts",
    slug : "massachusetts"
  },
  { active : true,
    countryCode : "us",
    slugOld : "michigan",
    idOld : 24,
    stateCode : "mi",
    name : "Michigan",
    slug : "michigan"
  },
  { active : true,
    countryCode : "us",
    slugOld : "minnesota",
    idOld : 26,
    stateCode : "mn",
    name : "Minnesota",
    slug : "minnesota"
  },
  { active : true,
    countryCode : "us",
    slugOld : "mississippi",
    idOld : 27,
    stateCode : "ms",
    name : "Mississippi",
    slug : "mississippi"
  },
  { active : true,
    countryCode : "us",
    slugOld : "missouri",
    idOld : 28,
    stateCode : "mo",
    name : "Missouri",
    slug : "missouri"
  },
  { active : true,
    countryCode : "us",
    slugOld : "montana",
    idOld : 29,
    stateCode : "mt",
    name : "Montana",
    slug : "montana"
  },
  { active : true,
    countryCode : "us",
    slugOld : "nebraska",
    idOld : 30,
    stateCode : "ne",
    name : "Nebraska",
    slug : "nebraska"
  },
  { active : true,
    countryCode : "us",
    slugOld : "nevada",
    idOld : 31,
    stateCode : "nv",
    name : "Nevada",
    slug : "nevada"
  },
  { active : true,
    countryCode : "us",
    slugOld : "newhampshire",
    idOld : 32,
    stateCode : "nh",
    name : "New Hampshire",
    slug : "new-hampshire"
  },
  { active : true,
    countryCode : "us",
    slugOld : "newjersey",
    idOld : 33,
    stateCode : "nj",
    name : "New Jersey",
    slug : "new-jersey"
  },
  { active : true,
    countryCode : "us",
    slugOld : "newmexico",
    idOld : 34,
    stateCode : "nm",
    name : "New Mexico",
    slug : "new-mexico"
  },
  { active : true,
    countryCode : "us",
    slugOld : "newyork",
    idOld : 35,
    stateCode : "ny",
    name : "New York",
    slug : "new-york"
  },
  { active : true,
    countryCode : "us",
    slugOld : "northcarolina",
    idOld : 36,
    stateCode : "nc",
    name : "North Carolina",
    slug : "north-carolina"
  },
  { active : true,
    countryCode : "us",
    slugOld : "northdakota",
    idOld : 37,
    stateCode : "nd",
    name : "North Dakota",
    slug : "north-dakota"
  },
  { active : true,
    countryCode : "us",
    slugOld : "ohio",
    idOld : 38,
    stateCode : "oh",
    name : "Ohio",
    slug : "ohio"
  },
  { active : true,
    countryCode : "us",
    slugOld : "oklahoma",
    idOld : 39,
    stateCode : "ok",
    name : "Oklahoma",
    slug : "oklahoma"
  },
  { active : true,
    countryCode : "us",
    slugOld : "oregon",
    idOld : 40,
    stateCode : "or",
    name : "Oregon",
    slug : "oregon"
  },
  { active : true,
    countryCode : "us",
    slugOld : "pennsylvania",
    idOld : 41,
    stateCode : "pa",
    name : "Pennsylvania",
    slug : "pennsylvania"
  },
  { active : true,
    countryCode : "us",
    slugOld : "rhodeisland",
    idOld : 42,
    stateCode : "ri",
    name : "Rhode Island",
    slug : "rhode-island"
  },
  { active : true,
    countryCode : "us",
    slugOld : "southcarolina",
    idOld : 43,
    stateCode : "sc",
    name : "South Carolina",
    slug : "south-carolina"
  },
  { active : true,
    countryCode : "us",
    slugOld : "southdakota",
    idOld : 44,
    stateCode : "sd",
    name : "South Dakota",
    slug : "south-dakota"
  },
  { active : true,
    countryCode : "us",
    slugOld : "tennessee",
    idOld : 45,
    stateCode : "tn",
    name : "Tennessee",
    slug : "tennessee"
  },
  { active : true,
    countryCode : "us",
    slugOld : "texas",
    idOld : 46,
    stateCode : "tx",
    name : "Texas",
    slug : "texas"
  },
  { active : true,
    countryCode : "us",
    slugOld : "utah",
    idOld : 47,
    stateCode : "ut",
    name : "Utah",
    slug : "utah"
  },
  { active : true,
    countryCode : "us",
    slugOld : "vermont",
    idOld : 48,
    stateCode : "vt",
    name : "Vermont",
    slug : "vermont"
  },
  { active : true,
    countryCode : "us",
    slugOld : "virginia",
    idOld : 49,
    stateCode : "va",
    name : "Virginia",
    slug : "virginia"
  },
  { active : true,
    countryCode : "us",
    slugOld : "washington",
    idOld : 50,
    stateCode : "wa",
    name : "Washington",
    slug : "washington"
  },
  { active : true,
    countryCode : "us",
    slugOld : "westvirginia",
    idOld : 51,
    stateCode : "wv",
    name : "West Virginia",
    slug : "west-virginia"
  },
  { active : true,
    countryCode : "us",
    slugOld : "wisconsin",
    idOld : 52,
    stateCode : "wi",
    name : "Wisconsin",
    slug : "wisconsin"
  },
  { active : true,
    countryCode : "us",
    slugOld : "wyoming",
    idOld : 53,
    stateCode : "wy",
    name : "Wyoming",
    slug : "wyoming"
  },
  { active : true,
    countryCode : "us",
    slugOld : "districtofcolumbia",
    idOld : 54,
    stateCode : "dc",
    name : "District of Columbia",
    slug : "district-of-columbia"
  }
];
/*
states.forEach(function(item, index){
    var state = new State();
        state.idOld       = item.idOld,
        state.name        = item.name,
        state.stateCode   = item.stateCode,
        state.countryCode = item.countryCode,
        state.slug        = item.slug,
        state.slugOld     = item.slugOld,
        state.active      = item.active;

        state.save();
});
*/

City.find({}, function(err, _cities) {
    if (err) console.log(err);
    
    _cities.forEach(function(_city, index){

        State.find({"idOld" : _city.regionId }, function(err, _states) {
            if (err) console.log(err);

            _states.forEach(function(_state, index){

                _city.state = _state._id;
                _city.save(function (err) {
                    if (err) console.log(err);
                });
            });
        });
    });
});
