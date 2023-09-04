import crypto from "crypto";

interface BlockShape {
    hash: string;
    prevHash: string;
    height: number;
    data: string;
}
class Block implements BlockShape {//블록 생성
    public hash: string;
    constructor(
        public prevHash: string,
        public height: number,
        public data: string
    ) {//값을 받아서
        this.hash = Block.calculateHash(prevHash, height, data);
    }//출력
    static calculateHash(prevHash: string, height: number, data: string) {
        const toHash = `${prevHash}${height}${data}`;
        return crypto.createHash("sha256").update(toHash).digest("hex");
    }
}

class Blockchain {
    private blocks: Block[];
    constructor() {
      this.blocks = [];
    }
    private getPrevHash() {
      if (this.blocks.length === 0) return "";
      return this.blocks[this.blocks.length - 1].hash;
    }
    public addBlock(data: string) {
      const newBlock = new Block(
        this.getPrevHash(),
        this.blocks.length + 1,
        data
      );
      this.blocks.push(newBlock);
    }
    public getBlocks() {
      return [...this.blocks];
    }
  }
  
  const blockchain = new Blockchain();
  
  blockchain.addBlock("First one");
  blockchain.addBlock("Second one");
  blockchain.addBlock("Third one");
  blockchain.addBlock("Fourth one");
  
  console.log(blockchain.getBlocks());