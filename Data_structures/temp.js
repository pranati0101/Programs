function Stack() {
  this.stack = new Array();
}
//function to push or insert data
Stack.prototype.Push = function(data) {
  this.stack.push(data);
};
//function to remove data
Stack.prototype.Pop = function() {
  return this.stack.pop(data);
};
Stack.prototype.isEmpty = function() {
  if (this.stack.length == 0) {
    return true;
  } else {
    return false;
  }
};
