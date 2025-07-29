console.log('SideNote initialized');  

const app = document.getElementById('app');

if (app) {
  app.innerHTML = `
    <h1>SideNote</h1>
    <p>This is a test page for embedding SideNote comments.</p>
    <p>Click on a paragraph to add a comment (feature coming soon).</p>
  `;
}

// In the future, you might expose something like:
export function initSideNote() {
  console.log('SideNote logic goes here');
}
