
                   require('coffee-script');

var db            = require('../../db'),
    ProxySchema   = require('../proxy'),   
    Proxy         = db.model('Proxy', ProxySchema);
    
var proxies = [ 
/*
 {
    active : false,
    name : "149.154.69.113:8080",
    counter : 0
 },{
    active : false,
    name : "149.154.69.106:8080",
    counter : 0
 },{
    active : false,
    name : "62.109.5.99:8080",
    counter : 0
 },{
    active : false,
    name : "149.154.69.99:8080",
    counter : 0
 },{
    active : false,
    name : "149.154.69.78:8080",
    counter : 0
 },{
    active : false,
    name : "188.120.229.105:8080",
    counter : 0
 },{
    active : false,
    name : "62.109.19.1:8080",
    counter : 0
 },{
    active : false,
    name : "188.120.236.22:8080",
    counter : 0
 },{
    active : false,
    name : "92.63.103.143:8080",
    counter : 0
 },{
    active : false,
    name : "92.63.103.102:8080",
    counter : 0
 },{
    active : false,
    name : "62.109.31.246:8080",
    counter : 0
 },{
    active : false,
    name : "92.63.105.80:8080",
    counter : 0
 },{
    active : false,
    name : "82.146.40.20:8080",
    counter : 0
 },{
    active : false,
    name : "188.120.235.39:8080",
    counter : 0
 },{
    active : false,
    name : "92.63.103.249:8080",
    counter : 0
 },{
    active : false,
    name : "188.120.231.51:8080",
    counter : 0
 },{
    active : false,
    name : "149.154.69.86:8080",
    counter : 0
 },{
    active : false,
    name : "78.24.220.6:8080",
    counter : 0
 },{
    active : false,
    name : "62.109.5.9:8080",
    counter : 0
 },{
    active : false,
    name : "188.120.235.40:8080",
    counter : 0
 },{
    active : false,
    name : "62.109.0.70:8080",
    counter : 0
 },{
    active : false,
    name : "92.63.102.209:8080",
    counter : 0
 },{
    active : false,
    name : "62.109.5.119:8080",
    counter : 0
 },{
    active : false,
    name : "188.120.235.43:8080",
    counter : 0
 },{
    active : false,
    name : "188.120.236.2:8080",
    counter : 0
 },{
    active : false,
    name : "92.63.103.173:8080",
    counter : 0
 },{
    active : false,
    name : "92.63.99.62:8080",
    counter : 0
 },{
    active : false,
    name : "62.109.5.90:8080",
    counter : 0
 },{
    active : false,
    name : "62.109.3.172:8080",
    counter : 0
 },{
    active : false,
    name : "188.120.246.223:8080",
    counter : 0
 },{
    active : false,
    name : "149.154.69.75:8080",
    counter : 0
 },{
    active : false,
    name : "92.63.105.12:8080",
    counter : 0
 },{
    active : false,
    name : "188.120.235.37:8080",
    counter : 0
 },{
    active : false,
    name : "188.120.229.117:8080",
    counter : 0
 },{
    active : false,
    name : "149.154.69.134:8080",
    counter : 0
 },{
    active : false,
    name : "149.154.69.139:8080",
    counter : 0
 },{
    active : false,
    name : "92.63.107.192:8080",
    counter : 0
 },{
    active : false,
    name : "188.120.231.22:8080",
    counter : 0
 },{
    active : false,
    name : "92.63.103.98:8080",
    counter : 0
 },{
    active : false,
    name : "62.109.10.22:8080",
    counter : 0
 },{
    active : false,
    name : "149.154.69.52:8080",
    counter : 0
 },{
    active : false,
    name : "188.120.237.82:8080",
    counter : 0
 },{
    active : false,
    name : "188.120.244.18:8080",
    counter : 0
 },{
    active : false,
    name : "62.109.1.48:8080",
    counter : 0
 },{
    active : false,
    name : "62.109.27.253:8080",
    counter : 0
 },{
    active : false,
    name : "78.24.216.47:8080",
    counter : 0
 },{
    active : false,
    name : "149.154.69.69:8080",
    counter : 0
 },{
    active : false,
    name : "188.120.235.42:8080",
    counter : 0
 },{
    active : false,
    name : "188.120.231.243:8080",
    counter : 0
 },{
    active : false,
    name : "188.120.244.110:8080",
    counter : 0
 },{
    active : false,
    name : "82.146.56.143:8080",
    counter : 0
 },{
    active : false,
    name : "188.120.229.106:8080",
    counter : 0
 },{
    active : false,
    name : "82.146.57.105:8080",
    counter : 0
 },{
    active : false,
    name : "149.154.69.94:8080",
    counter : 0
 },{
    active : false,
    name : "188.120.237.121:8080",
    counter : 0
 },{
    active : false,
    name : "62.109.31.228:8080",
    counter : 0
 },{
    active : false,
    name : "62.109.5.221:8080",
    counter : 0
 },{
    active : false,
    name : "82.146.56.89:8080",
    counter : 0
 },{
    active : false,
    name : "188.120.227.220:8080",
    counter : 0
 },{
    active : false,
    name : "82.146.56.40:8080",
    counter : 0
 },{
    active : false,
    name : "82.146.47.227:8080",
    counter : 0
 },{
    active : false,
    name : "149.154.69.63:8080",
    counter : 0
 },{
    active : false,
    name : "149.154.69.143:8080",
    counter : 0
 },{
    active : false,
    name : "62.109.5.238:8080",
    counter : 0
 },{
    active : false,
    name : "149.154.69.130:8080",
    counter : 0
 },{
    active : false,
    name : "92.63.100.8:8080",
    counter : 0
 },{
    active : false,
    name : "188.120.235.38:8080",
    counter : 0
 },{
    active : false,
    name : "62.109.20.45:8080",
    counter : 0
 },{
    active : false,
    name : "188.120.235.36:8080",
    counter : 0
 },{
    active : false,
    name : "149.154.69.126:8080",
    counter : 0
 },
*/
        /*     USA     */
 {
    active : true,
    name : "91.218.121.132:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "91.218.121.116:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "207.192.117.11:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "69.64.48.212:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "207.99.118.149:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "91.218.121.130:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "193.105.171.143:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "91.218.121.129:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "212.124.112.35:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "69.64.37.122:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "83.222.127.79:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "69.64.48.181:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },    
    counter : 0
 },{
    active : true,
    name : "207.192.117.9:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "193.105.171.73:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "82.146.51.167:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "82.146.50.47:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "193.105.171.207:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "91.218.121.98:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "69.64.37.118:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "69.64.48.78:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "82.146.48.178:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },    
    counter : 0
 },{
    active : true,
    name : "69.64.48.210:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "69.64.48.252:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },    
    counter : 0
 },{
    active : true,
    name : "207.99.118.232:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "69.64.36.12:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "82.146.49.34:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "91.218.121.97:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },    
    counter : 0
 },{
    active : true,
    name : "82.146.55.226:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "69.64.37.119:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "69.64.48.246:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "91.218.121.133:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "69.64.48.70:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },    
    counter : 0
 },{
    active : true,
    name : "69.64.39.68:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "69.64.48.185:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "69.64.37.117:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "69.64.37.78:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "91.218.121.115:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 },{
    active : true,
    name : "69.64.36.73:8080",
    auth : {
        login : "USANMmLtcjhif",
        password : "eAZYhZIveg",
    },
    counter : 0
 }];

proxies.forEach(function(proxy, index){
    var _proxy = new Proxy();
        _proxy.active           = true,
        _proxy.name             = proxy.name,
        _proxy.auth.login       = proxy.auth.login;
        _proxy.auth.password    = proxy.auth.password;
        _proxy.counter          = 0;

        _proxy.save(function (err) {
            console.log(_proxy.name);
        });
});
