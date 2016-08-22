const Concentrate = require('concentrate')
const pgns = require('./pgns')
const pgn127250 = pgns.PGNs['127250']


function toPgn(data) {
  const pgnData = pgns.PGNs[data.pgn]
  if (!pgnData) {
    console.log("no pgn found: " + data.pgn)
    return
  }

  return pgnData.Fields.reduce(function(acc, field) {
      var value = data[field.Name];
      if (isDefined(value) && field.Resolution) {
        value = (value / field.Resolution).toFixed(0);
      }
      if (field.EnumValues) {
        value = lookup(field, value)
      }
      if (field.BitLength === 8) {
        if (field.Signed) {
          acc.int8(isDefined(value) ? value : 127)
        } else {
          acc.uint8(isDefined(value) ? value : 255)
        }
      } else if (field.BitLength === 16) {
        if (field.Signed) {
          acc.int16(isDefined(value) ? value : 32767)
        } else {
          acc.uint16(isDefined(value) ? value : 65535)
        }
      } else if (field.BitLength === 32) {
        if (field.Signed) {
          acc.int32(isDefined(value) ? value : 2147483647)
        } else {
          acc.uint32(isDefined(value) ? value : 4294967295)
        }
      } else if (field.BitLength < 8) {
        acc.tinyInt(isDefined(value) ? value : 255, field.BitLength)
      }
      return acc
  }, Concentrate()).result()
}

function lookup(field, stringValue) {
  if (!field.name2value) {
    field.name2value = {};
    field.EnumValues.forEach(function(enumPair) {
      field.name2value[enumPair.name] = Number(enumPair.value)
    })
  }
  return (field.name2value[stringValue]);
}

function isDefined(value) {
  return typeof value !== 'undefined'
}

function parseHex(s) {
  return parseInt(s, 16)
};

function canboat2Buffer(canboatData) {
  return new Buffer(canboatData.split(',').slice(6).map(parseHex), 'hex');
}

module.exports.canboat2Buffer = canboat2Buffer
module.exports.toPgn = toPgn
