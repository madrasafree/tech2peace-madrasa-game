export function parse(str) {
    var args = [].slice.call(arguments, 1);
    var i = 0;

    return str.replace(/%s/g, () => args[i++]);
}

export function split_template(str) {
    return str.replaceAll("%s","%w%s%w").split("%w").filter(a => a != "")
}

export function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;   
}