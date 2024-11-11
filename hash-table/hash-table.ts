import HashNode from "./hash-node";

export default class HashTable {
  private _elements: Array<HashNode | null | undefined>;

  constructor(size: number) {
    this._elements = new Array(size);
  }

  public get elements() {
    return this._elements;
  }

  private findSlot(key: number, index: number): number {
    let visitedKeys = 0;
    const size = this._elements.length;

    while (this._elements[index]) {
      index += 1;
      if (index === size) {
        index = 0;
      }

      visitedKeys += 1;
      if (visitedKeys === size) {
        throw new Error("Overflow error");
      }
    }
    return index;
  }

  private hash(key: number) {
    return key % this._elements.length;
  }

  public indexOf(key: number) {
    let index = this.hash(key);

    if (this._elements[index]?.key === key) {
      return index;
    }

    const size = this._elements.length;
    let visitedKeys = 0;

    while (this._elements[index] !== undefined) {
      if (this._elements[index]?.key === key) {
        break;
      }

      if (visitedKeys === size) {
        throw new Error("Key not found");
      }

      visitedKeys += 1;
      index += 1;

      if (index === size) {
        index = 0;
      }
    }
    return index;
  }

  public insert(key: number, complement: number) {
    const node = new HashNode(key, complement);
    const index = this.hash(key);

    if (this._elements[index]) {
      const newIndex = this.findSlot(key, index);
      this._elements[newIndex] = node;
    } else {
      this._elements[index] = node;
    }
  }

  public remove(key: number) {
    const index = this.indexOf(key);
    this._elements[index] = null;
  }
}