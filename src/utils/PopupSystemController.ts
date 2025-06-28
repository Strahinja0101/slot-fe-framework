// src/utils/popupHtmlController.ts
export function showStakePopup() {
  const container = document.getElementById('ui-overlay');
  if (!container) return;

  container.innerHTML = `
    <div class="popup" id="stake-popup">
      <h2>Stake Settings</h2>
      <div>
        <button onclick="selectBet(10)">Bet 10</button>
        <button onclick="selectBet(20)">Bet 20</button>
        <button onclick="selectBet(50)">Bet 50</button>
      </div>
      <button onclick="closeStakePopup()">Close</button>
    </div>
  `;
}

(window as any).closeStakePopup = () => {
  const container = document.getElementById('ui-overlay');
  if (container) container.innerHTML = '';
};

(window as any).selectBet = (amount: number) => {
  console.log(`[STAKE] Selected bet: ${amount}`);
  (window as any).closeStakePopup();
};

export function showAutoplayPopup() {
  const container = document.getElementById('ui-overlay');
  if (!container) return;

  container.innerHTML = `
    <div class="popup" id="autoplay-popup">
      <h2>Autoplay Settings</h2>
      <div>
        <label>
          Number of spins:
          <input type="number" id="autoplay-spins" min="1" max="100" value="10" />
        </label>
      </div>
      <button onclick="startAutoplay()">Start</button>
      <button onclick="closeAutoplayPopup()">Close</button>
    </div>
  `;
}

(window as any).closeAutoplayPopup = () => {
  const container = document.getElementById('ui-overlay');
  if (container) container.innerHTML = '';
};

(window as any).startAutoplay = () => {
  const input = document.getElementById('autoplay-spins') as HTMLInputElement;
  const spins = Number(input.value);
  console.log(`[AUTOPLAY] Start autoplay for ${spins} spins`);
  (window as any).closeAutoplayPopup();
  // ovde kasnije možeš dodati logiku za startovanje autospina
};

export function showMenuPopup() {
  const container = document.getElementById('ui-overlay');
  if (!container) return;

  container.innerHTML = `
    <div class="popup" id="menu-popup">
      <h2>Game Menu</h2>
      <ul>
        <li><button onclick="openSettings()">Settings</button></li>
        <li><button onclick="openPaytable()">Paytable</button></li>
        <li><button onclick="openRules()">Rules</button></li>
      </ul>
      <button onclick="closeMenuPopup()">Close</button>
    </div>
  `;
}

(window as any).closeMenuPopup = () => {
  const container = document.getElementById('ui-overlay');
  if (container) container.innerHTML = '';
};

// Dummy funkcije za stavke u meniju, možeš kasnije povezati sa stvarnim funkcijama
(window as any).openSettings = () => {
  console.log('Open Settings');
  alert('Otvori Settings (implementiraj kasnije)');
};

(window as any).openPaytable = () => {
  console.log('Open Paytable');
  alert('Otvori Paytable (implementiraj kasnije)');
};

(window as any).openRules = () => {
  console.log('Open Rules');
  alert('Otvori Rules (implementiraj kasnije)');
};
