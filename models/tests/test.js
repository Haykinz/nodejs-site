var a = ['1','2','3','4'];

var i = 1;

var t = a[i];

a.splice(i, 1);

a.push(t);


console.log(a);