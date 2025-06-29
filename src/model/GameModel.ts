// src/model/GameModel.ts
export class GameModel {
  stake: number = 0;
  win: number = 0;
  resultSymbols: string[][] = [];

  updateFromServer(data: {
    stake: number;
    win: number;
    resultSymbols: string[][];
  }) {
    this.stake = data.stake;
    this.win = data.win;
    this.resultSymbols = data.resultSymbols;
  }

  setResult(symbols: string[][]) {
    this.resultSymbols = symbols;
  }

  getResult(): string[][] {
    return this.resultSymbols;
  }
}
