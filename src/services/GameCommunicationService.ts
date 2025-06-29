// src/services/GameCommunicationService.ts
import axios from 'axios';

export interface GameResponse {
  stake: number;
  win: number;
  resultSymbols: string[][];
}

export class GameCommunicationService {
  static async fetchInitialGameState(): Promise<GameResponse> {
    const response = await axios.get<GameResponse>('/mockResponses/game1.json');
    return response.data;
  }
}
