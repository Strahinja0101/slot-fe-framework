import { Application } from 'pixi.js';
// Import the main application class
import { App } from './App'

const host = document.getElementById('app') as HTMLElement;

const app = new Application({
  resizeTo: host,
  backgroundColor: 0x000000,
  antialias: true,
});

host.appendChild(app.view);

// Initialize the application
const appRoot = new App(app);
appRoot.init().catch(console.error);



