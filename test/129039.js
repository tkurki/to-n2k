var chai = require("chai")
chai.Should()

const toN2K = require('../')

var pgn = "2014-08-15T19:00:00.363,4,129039,43,255,26,12,44,11,b6,0d,32,83,be,0e,5b,4f,99,23,03,ac,87,3e,01,06,00,26,ff,ff,00,74,ff"
var pgnObject = {
  "timestamp": "2014-08-15T19:00:00.363",
  "prio": 4,
  "src": 43,
  "dst": 255,
  "pgn": 129039,
  "description": "AIS Class B Position Report",
  "fields": {
    "Message ID": 18,
    "Repeat Indicator": "Initial",
    "User ID": 230035780,
    "Longitude": 24.7366450,
    "Latitude": 59.7249883,
    "Position Accuracy": "High",
    "RAIM": "in use",
    "Time Stamp": "0",
    "COG": 3.4732,
    "SOG": 3.18,
    "Communication State": "393222",
    "AIS Transceiver information": "Own information not broadcast",
    "Regional Application": 0,
    "Regional Application": 0,
    "Unit type": "CS",
    "Integrated Display": "No",
    "DSC": "Yes",
    "Band": "entire marine band",
    "Can handle Msg 22": "Yes",
    "AIS mode": "Autonomous",
    "AIS communication state": "ITDMA"
  }
}

describe('129039', function() {
  it("works", function() {
    pgnObject.fields.pgn = pgnObject.pgn
    var converted = toN2K.toPgn(pgnObject.fields)
    console.log(converted.length)
    var original = toN2K.canboat2Buffer(pgn)
    console.log(original.length)
    converted.should.be.eql(original)
  })
})
