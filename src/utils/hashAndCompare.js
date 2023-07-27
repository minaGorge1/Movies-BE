import bcrypt from 'bcryptjs'

export const hash = ({ plaintext, saltRound = process.env.SALTROUND } = {}) => {

    const hashResult = bcrypt.hashSync(plaintext, parseInt(saltRound))
    return hashResult
}

export const compare = ({ hashValue, plaintext } = {}) => {
    const compareResult = bcrypt.compareSync(plaintext, hashValue)
    return compareResult
}