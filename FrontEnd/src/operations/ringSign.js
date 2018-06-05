import ecurve from 'ecurve'
import secureRandom from 'secure-random'
import BigInteger from 'bigi'
import web3Utils from 'web3-utils'
import BN from 'bn.js'

const ecparams = ecurve.getCurveByName('secp256k1')

function mapToCurve(x) {
  const P = ecurve.getCurveByName('secp256k1').p

  x = x.subtract(BigInteger('1'))
  let y = BigInteger('0')
  let found = false
  let f_x

  while (!found) {
    x = x.add(BigInteger('1'))
    f_x = x.pow(BigInteger('3')).add(BigInteger('7')).mod(P)
    y = modSqrt(f_x, P)

    if (!y.equals(BigInteger('0'))) {
      if (y.multiply(y).mod(P).subtract(f_x.mod(P)).equals(BigInteger('0')));
      found = true
    }
  }

  const Q = new Array(2)
  Q[0] = x
  Q[1] = y

  return new ecurve.Point(ecparams, Q[0], Q[1], BigInteger('1'))
}

function modSqrt(a, p) {
  if (a.compareTo(BigInteger('0')) < 0) {
    return BigInteger('0')
  }
  if (p.compareTo(BigInteger('2')) < 0) {
    return BigInteger('0')
  }

  a = a.mod(p)

  if (a.equals(BigInteger('0'))) {
    return BigInteger('0')
  }
  if (p.equals(BigInteger('2'))) {
    return a
  }

  const jac = jacobi(a, p)

  if (jac.equals(BigInteger('-1'))) {
    return BigInteger('0')
  }

  if (p.mod(BigInteger('4')).equals(BigInteger('3'))) {
    return a.modPow(p.add(BigInteger('1')).divide(BigInteger('4')), p)
  }

  if (p.mod(BigInteger('8')).equals(BigInteger('5'))) {
    const d = a.modPow(p.subtract(BigInteger('1')).divide(BigInteger('4')), p)
    if (d.equals(BigInteger('1'))) {
      return a.modPow(p.add(BigInteger('3')).divide(BigInteger('8')), p)
    }
    if (d.equals(p.subtract(BigInteger('1')))) {
      return BigInteger('2').multiply(a).multiply(BigInteger('4').multiply(a).modPow(p.subtract(BigInteger('5')).divide(BigInteger('8')), p)).mod(p)
    }
    return BigInteger('0')
  }

  let f

  for (let b = BigInteger('2'); b.compareTo(p) < 0; b = b.add(BigInteger('1'))) {
    if (jacobi(b.multiply(b).subtract(BigInteger('4').multiply(a)), p).equals(BigInteger('-1'))) {
      f = [a, b.negate(), 1]
      const ff = polynomialExpMod([BigInteger('0'), BigInteger('1')], p.add(BigInteger('1')).divide(BigInteger('2')), f, p)
      if (ff[1].equals(BigInteger('0'))) {
        return ff[0]
      } else {
        return BigInteger('0')
      }
    }
  }
  return BigInteger('0')
}

function jacobi(a, n) {
  a = a.mod(n)

  if (a.equals(BigInteger('0'))) {
    return BigInteger('0')
  }

  if (a.equals(BigInteger('1'))) {
    return BigInteger('1')
  }
  let a1 = a.clone()
  let e = BigInteger('0')

  while (a1.mod(BigInteger('2')).equals(BigInteger('0'))) {
    a1 = a1.divide(BigInteger('2'))
    e = e.add(BigInteger('1'))
  }

  let s

  if (e.mod(BigInteger('2')).equals(BigInteger('0')) || n.mod(BigInteger('8')).equals(BigInteger('1')) || n.mod(BigInteger('8')).equals(BigInteger('7'))) {
    s = BigInteger('1')
  } else {
    s = BigInteger('-1')
  }
  if (a1.equals(BigInteger('1'))) {
    return s
  }
  if (n.mod(BigInteger('4')).equals(BigInteger('3')) && a1.mod(BigInteger('4')).equals(BigInteger('3'))) {
    s = s.negate()
  }
  return s.multiply(jacobi(n.mod(a1), a1))
}

function polynomialExpMod(base, exponent, polymod, p) {
  let s = []
  s = [BigInteger('0'), BigInteger('0')]

  if (exponent.compareTo(p) > 0) {
    return [BigInteger('0'), BigInteger('0')]
  }

  if (exponent.equals(BigInteger('0'))) {
    return [BigInteger('1'), BigInteger('1')]
  }

  let G = []
  G[0] = base[0]
  G[1] = base[1]
  let k = exponent.clone()

  if (k.mod(BigInteger('2')).equals(BigInteger('1'))) {
    s[0] = G[0]
    s[1] = G[1]
  } else {
    // different from sol
    return [BigInteger('1'), BigInteger('1')]
  }

  while (k.compareTo(1) > 0) {
    k = k.divide(BigInteger('2'))
    G = polynomialMultiplyMod(G, G, polymod, p)
    if (k.mod(BigInteger('2')).equals(BigInteger('1'))) {
      s = polynomialMultiplyMod(G, s, polymod, p)
    }
  }
  return s
}

function polynomialMultiplyMod(m1, m2, polymod, p) {
  const prod = [BigInteger('0'), BigInteger('0'), BigInteger('0')]

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      // prod[j + j] = prod[i + j].add(m1[i]).add(m2[j]).mod(p);
      prod[i + j] = prod[i + j].add(m1[i].multiply(m2[j])).mod(p)
    }
  }

  return polynomialReduceMod(prod, polymod, p)
}

function polynomialReduceMod(poly, polymod, p) {
  const res = new Array(2)
  if (!poly[2].equals(BigInteger('0'))) {
    poly[1] = poly[1].subtract(poly[2].multiply(polymod[1])).mod(p)
    poly[0] = poly[0].subtract(poly[2].multiply(polymod[0])).mod(p)

    res[0] = poly[0]
    res[1] = poly[1]
  }
  return res
}

function H2(y) {
  return mapToCurve(hashToInt(y))
}

function H1(y, link, message, z_1, z_2) {
  let temp_list = []
  temp_list = temp_list.concat(y.map(
    (item) => {
      return (new BN(item.toString().split(',')[0].substring(1)).toString(16, 64)) + (new BN(item.toString().split(',')[1].slice(0, -1)).toString(16, 64))
    }
  ))
  temp_list = temp_list.concat(
    [(new BN(link.toString().split(',')[0].substring(1)).toString(16, 64)) + (new BN(link.toString().split(',')[1].slice(0, -1)).toString(16, 64))]
  )
  temp_list = temp_list.concat([new BN(message.toString()).toString(16, 64)])
  temp_list = temp_list.concat(
    [(new BN(z_1.toString().split(',')[0].substring(1)).toString(16, 64)) + (new BN(z_1.toString().split(',')[1].slice(0, -1)).toString(16, 64))]
  )
  temp_list = temp_list.concat(
    [(new BN(z_2.toString().split(',')[0].substring(1)).toString(16, 64)) + (new BN(z_2.toString().split(',')[1].slice(0, -1)).toString(16, 64))]
  )

  return BigInteger.fromHex(
    web3Utils.keccak256(
      '0x' + temp_list.join('')
    ).substring(2)
  )
}

function hashToInt(y) {
  const temp_y = y.map(
    (item) => {
      return (new BN(item.toString().split(',')[0].substring(1)).toString(16, 64)) + (new BN(item.toString().split(',')[1].slice(0, -1)).toString(16, 64))
    }
  )
  return BigInteger.fromHex(web3Utils.keccak256('0x' + temp_y.join('')).substring(2))
}

function randrange(range) {
  let r = secureRandom.randomBuffer(32)
  while (BigInteger.fromHex(r.toString('hex')).compareTo(range) >= 0) {
    r = secureRandom.randomBuffer(32)
  }
  return BigInteger.fromHex(r.toString('hex'))
}

// key_idx is not big integer!!
function ringSignature(siging_key, key_idx, M, y, old_y) {
  const G = ecparams.G

  // n is not big integer!
  const n = y.length
  const c = Array(n)
  const s = Array(n)

  let z_1
  let z_2

  const H = H2(old_y)

  const link = H.multiply(siging_key)

  const u = randrange(ecparams.n)
  c[(key_idx + 1) % n] = H1(y, link, M, G.multiply(u), H.multiply(u))

  for (let i = key_idx + 1; i < n; i++) {
    s[i] = randrange(ecparams.n)

    z_1 = G.multiply(s[i]).add(y[i].multiply(c[i]))
    z_2 = H.multiply(s[i]).add(link.multiply(c[i]))

    c[(i + 1) % n] = H1(y, link, M, z_1, z_2)
  }

  for (let i = 0; i < key_idx; i++) {
    s[i] = randrange(ecparams.n)

    z_1 = G.multiply(s[i]).add(y[i].multiply(c[i]))
    z_2 = H.multiply(s[i]).add(link.multiply(c[i]))

    c[(i + 1) % n] = H1(y, link, M, z_1, z_2)
  }

  s[key_idx] = u.subtract(siging_key.multiply(c[key_idx])).mod(ecparams.n)

  z_1 = G.multiply(s[key_idx]).add(y[0].multiply(c[key_idx]))
  z_2 = H.multiply(s[key_idx]).add(link.multiply(c[key_idx]))

  return {
    c_0: c[0],
    s: s,
    link: link
  }
}

function shuffle(_list) {
  const list = _list.slice(0)

  for (let i = list.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    const itemAtIndex = list[randomIndex]
    list[randomIndex] = list[i]
    list[i] = itemAtIndex
  }
  return list
}

export function verifyRingSignature(message, y, c_0, s, link, old_y) {
  const G = ecparams.G
  // n i s not a big integer!
  const n = y.length
  const c = new Array(n)
  c[0] = c_0
  let z_1
  let z_2
  const H = H2(old_y)

  for (let i = 0; i < n; i++) {
    z_1 = G.multiply(s[i]).add(y[i].multiply(c[i]))
    z_2 = H.multiply(s[i]).add(link.multiply(c[i]))

    if (i < n - 1) {
      c[i + 1] = H1(y, link, message, z_1, z_2)
    } else {
      return c_0.equals(H1(y, link, message, z_1, z_2))
    }
  }

  return false
}

/*
* signing_key: private key for ring signature
* M: message object, where
*  M: {
*    evalChoice: String to represent hex 256bit
*    evalComment: BigInteger
*   }
* _y: public key array => bigInteger[][2]

*/

function obtainDigest(M) {
  return BigInteger.fromHex(web3Utils.soliditySha3(new BN(M.evalChoice.toString())).substring(2)).xor(
    BigInteger.fromHex(web3Utils.soliditySha3(new BN(M.evalComment.toString())).substring(2))
  )
}

export function ringSign(signingKey, M, _y) {
  const old_y = _y.map(
    (item) => {
      return new ecurve.Point(ecparams, BigInteger(item[0]), BigInteger(item[1]), BigInteger('1'))
    }
  )
  const y = shuffle(old_y)
  signingKey = BigInteger(signingKey)

  const pkString = ecparams.G.multiply(signingKey).toString()
  let key_idx
  for (let i = 0; i < y.length; i++) {
    if (y[i].toString() === (pkString)) {
      key_idx = i
    }
  }

  const MDigest = obtainDigest(M)

  const signature = ringSignature(signingKey, key_idx, MDigest, y, old_y)

  // if (!verifyRingSignature(MDigest, y, signature.c_0, signature.s, signature.link, old_y)) {
  //   console.log('signature generation failed!')
  //   throw new Error('signature generation failed!')
  // } else {
  //   console.log('Success to generate signature!')
  // }

  return [signature, y]
}

export function generateKeyPair() {
  const sk = randrange(ecparams.n)
  const pk = ecparams.G.multiply(sk)
  const key = {
    sk: sk,
    pk: pk
  }
  return key
}

// function main() {
//   let number_participants = 10
//   let x = new Array(number_participants)
//   for (let i = 0; i < number_participants; i++) {
//     x[i] = randrange(ecparams.n)
//   }
//   let y = x.map(
//     (item) => {
//       return ecparams.G.multiply(item)
//     }
//   )

//   let my = 2
//   let M = {}
//   M.evalChoice = '0x' + randrange(ecparams.n).toString()
//   M.evalComment = 'It is very good!'

//   let [sign, newY] = ringSign(x[my], M, y)
//   let MDigest = BigInteger.fromHex(web3Utils.keccak256(M.evalChoice).substring(2)).xor(
//     BigInteger.fromHex(web3Utils.keccak256(M.evalComment).substring(2))
//   )
//   console.log(verifyRingSignature(MDigest, newY, sign.c_0, sign.s, sign.link))

//   let message = randrange(ecparams.n)
//   let signature = ringSignature(x[my], my, message, y)
//   console.log(verifyRingSignature(message, y, signature.c_0, signature.s, signature.link))
// }
