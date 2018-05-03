import ecurve from 'ecurve'
import secureRandom from 'secure-random'
import BigInteger from 'bigi'

var ecparams = ecurve.getCurveByName('secp256k1')

function randrange(range) {
  var r = secureRandom.randomBuffer(32)
  while (BigInteger.fromHex(r.toString('hex')).compareTo(range) >= 0) {
    r = secureRandom.randomBuffer(32)
  }
  return BigInteger.fromHex(r.toString('hex'))
}

export default function generateKeyPair() {
  var sk = randrange(ecparams.n)
  var pk = ecparams.G.multiply(sk)
  var key = {
    sk: sk,
    pk: pk
  }
  return key
}
