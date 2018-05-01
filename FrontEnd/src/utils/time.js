export function unixTimeToDate(unixTime) {
  var time = new Date(unixTime * 1000)
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  var year = time.getFullYear()
  var month = months[time.getMonth()]
  var date = number(time.getDate())
  var hour = number(time.getHours())
  var min = number(time.getMinutes())
  var sec = number(time.getSeconds())
  time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
  return time
}

function number(time) {
  if (time < 10) {
    return '0' + time
  }
  return time
}

export function dateToUnixTime(date) {
  if (date) {
    return Math.round((new Date(date)).getTime() / 1000)
  } else {
    return Math.round((new Date()).getTime() / 1000)
  }
}
