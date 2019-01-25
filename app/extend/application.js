
module.exports = {
    res(type, msgOrData, msg) {
      let data = {}
      if (typeof msgOrData === 'string' && typeof msg === 'undefined') {
        msg = msgOrData
      }
      else {
        data = msgOrData
      }
      return {
        type: type,
        data: data,
        msg: msg
      }
    }
}
