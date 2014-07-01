module.exports = function (err, message) {
  if (err && err.stack){
    console.error(message, err.stack);
    return true
  }
  else if (err && err.json) {
    console.error(message, err.json.errors)
    return true
  }
  else if (err) {
    console.error(message, err)
    return true
  }
  return false
}
