function getType(a, b, c){
  var score = a + b + c;
  var cl;
  if(score >= 0 && score <= 5){
    cl = 'calme';
  }
  else if(score >5 && score <= 10){
    cl = 'tranquille';
  }
  else if(score >10 && score <= 15){
    cl = 'ambiance';
  }
  else if(score >15 && score <= 20){
    cl = 'dejante';
  }
  return cl;
}
