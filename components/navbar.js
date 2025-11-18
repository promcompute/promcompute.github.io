class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          background-color: #0f0f0f;
          border-bottom: 1px solid #2a2a2a;
        }
        
        nav {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.5rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .logo {
          display: flex;
          align-items: center;
          space-x: 2px;
          font-size: 1.25rem;
          font-weight: 600;
          color: #00ff99;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }
        
        .logo:hover {
          opacity: 0.8;
        }
        
        .logo-icon {
          width: 32px;
          height: 32px;
          margin-right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #00ff99 0%, #00ccff 100%);
          border-radius: 8px;
          font-weight: bold;
          font-size: 18px;
        }
        
        .powered-by {
          font-size: 0.875rem;
          color: #6a6a6a;
          font-weight: 400;
        }
      </style>
      
      <nav>
        <a href="index.html" class="logo">
          <div class="logo-icon">MB</div>
          <div>
            <div>Mission Brains</div>
            <div class="powered-by">powered by PromCompute</div>
          </div>
        </a>
        <div></div>
      </nav>
    `;
  }
}

customElements.define('custom-navbar', CustomNavbar);