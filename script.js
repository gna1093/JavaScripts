
//First class function

function mainfunc(args){
  if(args==='developer')
    return function(name){
      console.log("hello "+args+" "+name+" !");
    }
  else if(args==='Designer')
      return function(name){
          console.log("hello "+args+" "+name+" !");
      }
  else(args==='Architec')
    return function(name){
        console.log("hello "+args+" "+name+" !");
    }
}

mainfunc('developer')('gp');
mainfunc('developer')('abc');
mainfunc('Architec')('gp');
mainfunc('Architec')('xyz');
mainfunc('Designer')('gp');
mainfunc('Designer')('asd');

mainfunc('developer')

/*var years = [1994,2000,1947,1980];

function arrayCalc(arr,func){
  var arrRes = [];
  for(var i=0; i<arr.length; i++){
    arrRes.push(func(arr[i]));
  }
  return arrRes;
}
function func(x){
  return 2020-x
}
console.log(arrayCalc(years,func));*/
