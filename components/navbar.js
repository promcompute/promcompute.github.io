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

        /* Click-to-copy email — looks like a code block */
        .copy-email {
          background: #1a1a1a;
          color: #00ff99;
          padding: 10px 16px;
          border: 1px solid #333;
          border-radius: 6px;
          font-size: 0.875rem;
          cursor: pointer;
          user-select: none;
          transition: all 0.25s ease;
          position: relative;
          font-family: 'JetBrains Mono', monospace;
        }
        
        .copy-email:hover {
          background: #00ff99;
          color: #000;
          border-color: #00ff99;
        }
        
        .copy-email::after {
          content: "Click to copy";
          position: absolute;
          top: -28px;
          right: 0;
          background: #000;
          color: #00ff99;
          font-size: 0.7rem;
          padding: 4px 8px;
          border-radius: 4px;
          opacity: 0;
          transition: opacity 0.2s;
          white-space: nowrap;
        }
        
        .copy-email:hover::after {
          opacity: 1;
        }
        
        .copy-email.copied {
          background: #00ff99;
          color: #000;
        }
        
        .copy-email.copied::after {
          content: "Copied!";
          background: #00ff99;
          color: #000;
        }
      </style>
      
      <nav>
        <a href="index.html" class="logo">
          <div class="logo-icon">MB</div>
          <div>
            <div>Mission Brains</div>
            <div class="powered-by">powered by PromCompute 🛰️</div>
          </div>
        </a>
        <div class="copy-email" title="Click to copy email">
          promcompute@protonmail.com
        </div>
      </nav>
    `;


    // Click-to-copy functionality
    const emailEl = this.shadowRoot.querySelector('.copy-email');
    emailEl.addEventListener('click', async () => {
      await navigator.clipboard.writeText('promcompute@protonmail.com');
      emailEl.classList.add('copied');
      setTimeout(() => emailEl.classList.remove('copied'), 2000);
    });

  }
}

customElements.define('custom-navbar', CustomNavbar);