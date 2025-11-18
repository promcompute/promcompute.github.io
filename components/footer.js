class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          background-color: #0f0f0f;
          border-top: 1px solid #2a2a2a;
          margin-top: auto;
        }
        
        footer {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          text-align: center;
        }
        
        .footer-text {
          color: #4a4a4a;
          font-size: 0.875rem;
        }
        
        .footer-link {
          color: #00ff99;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }
        
        .footer-link:hover {
          opacity: 0.8;
        }
      </style>
      
      <footer>
        <p class="footer-text">
          © 2025 <a href="index.html" class="footer-link">Mission Brains</a> • powered by <span class="footer-link">PromCompute</span>
        </p>
      </footer>
    `;
  }
}

customElements.define('custom-footer', CustomFooter);