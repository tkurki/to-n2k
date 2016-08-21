var chai = require("chai")
chai.Should()

const toN2K = require('../')

var truePgn = "2014-08-15T19:00:00.892,2,127250,160,255,8,ff,be,87,ff,7f,86,05,fc"
var trueData = {
  "timestamp": "2014-08-15T19:00:00.892",
  "prio": 2,
  "src": 160,
  "dst": 255,
  "pgn": 127250,
  "description": "Vessel Heading",
  "fields": {
    "Heading": 3.4750,
    "Variation": 0.1414,
    "Reference": "True"
  }
}

var magPgn = "2015-01-15-16:13:02.757,2,127250,98,255,8,57,2f,a0,00,00,ff,7f,fd"
var magData = {
  "timestamp": "2015-01-15-16:13:02.757",
  "prio": 2,
  "src": 98,
  "dst": 255,
  "pgn": 127250,
  "description": "Vessel Heading",
  "fields": {
    "SID": 87,
    "Heading": 4.1007,
    "Deviation": 0.0000,
    "Reference": "Magnetic"
  }
}

describe('127250', function() {
  it("true  works", function() {
    trueData.fields.pgn = trueData.pgn
    toN2K.toPgn(trueData.fields).should.be.eql(toN2K.canboat2Buffer(truePgn))
  })

  it("magnetic works", function() {
    magData.fields.pgn = magData.pgn
    toN2K.toPgn(magData.fields).should.be.eql(toN2K.canboat2Buffer(magPgn))
  })
})
