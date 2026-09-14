import React from "react";

// Shared Cursed Shrine top bar — same as cursedshrine.com and the blog.
const SiteHeader = () => (
  <header className="site-header">
    <nav className="site-col">
      <a href="https://cursedshrine.com" className="wordmark">Cursed Shrine</a>
      <div className="nav-links">
        <a href="https://gaurav.cursedshrine.com">Portfolio</a>
        <a href="https://cursedshrine.com/blog/">Blog</a>
      </div>
    </nav>
  </header>
);

export default SiteHeader;
