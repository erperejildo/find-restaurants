import angular from 'angular';
const name = 'range';
 
function Range(input, total) {
  total = parseInt(total);

  for (var i=0; i<total; i++) {
    input.push(i);
  }

  return input;
}
 
export default angular.module(name, [])
.filter(name, () => {
  return Range;
});