// function to chk anagram
function test() {
  var str1 = document.getElementById("m").value;
  var str2 = document.getElementById("n").value;
  if (str1.length != str2.length) {
    document.write("not anagrams");
    return;
  }
  //checking condition of anagram
  if (str1.split("").sort().join("") === str2.split("").sort().join(""))
    document.write("anagrams");
  else {
    document.write("not anagrams");
  }
}
