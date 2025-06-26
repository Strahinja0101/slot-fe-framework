import mitt from 'mitt';

// Ovdje možeš tipizirati sve custom evente koji se koriste
type GameEvents = {
  spin: void;
  stop: void;
  win: number;
  freeSpinsTriggered: void;
  showPaytable: void;
  autoplay: void;
  stake: void;
  menu: void;
};

export const eventBus = mitt<GameEvents>();
