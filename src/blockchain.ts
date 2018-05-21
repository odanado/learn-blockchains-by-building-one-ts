import SHA2 from 'sha2'

export class Blockchain {

  constructor (
    private chain: Array<any>,
    private currentTransactions: Array<Object>
  ) {

  }

  public static hash (block) {
    return JSON.stringify(block)
  }

  public static validProof (lastProof: Number, proof: Number) {
    const hash: String = SHA2.SHA2_256(`${lastProof}${proof}`)
    return hash.substr(0, 4)
  }

  public newBlock (proof, previousHash: String) {
    const block = {
      'index': this.chain.length,
      'timestamp': new Date(),
      'transactions': this.currentTransactions,
      'proof': proof,
      'previous_hash': previousHash || SHA2.SHA2_256(this.lastBlock())
    }

    this.currentTransactions = []
    this.chain.push(block)

    return block
  }

  public newTransaction (sender, recipient, amount) {
    this.currentTransactions.push({
      sender, recipient, amount
    })
  }

  public lastBlock () {
    return SHA2.SHA2_256(this.chain.slice(-1).pop())
  }

  public proofOfWork (lastProof) {
    let proof = 0
    while (!Blockchain.validProof(lastProof, proof)) {
      proof += 1
    }

    return proof
  }
}
