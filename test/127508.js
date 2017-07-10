var chai = require("chai");
chai.Should();

const toN2K = require("../");

const expected =
  "2015-01-15-16:14:00.409,6,127508,176,255,8,00,77,05,98,ff,f0,6d,12";

const input = {
  timestamp: "2015-01-15-16:14:00.409",
  prio: 6,
  src: 176,
  dst: 255,
  pgn: 127508,
  description: "Battery Status",
  fields: {
    "Battery Instance": 0,
    Voltage: 13.99,
    Current: -10.4,
    Temperature: 281.44,
    SID: 18
  }
};

describe("127508", function() {
  it("converts ok", function() {
    input.fields.pgn = input.pgn;
    toN2K.toPgn(input.fields).should.be.eql(toN2K.canboat2Buffer(expected));
  });
});
