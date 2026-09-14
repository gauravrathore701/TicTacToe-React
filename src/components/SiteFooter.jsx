import React from "react";

// Shared Cursed Shrine footer with the bottom-right credit.
const SiteFooter = () => (
  <footer className="site-footer">
    <div className="site-col">
      <span>&copy; {new Date().getFullYear()} Cursed Shrine &middot; built on a Raspberry Pi</span>
      <span className="links">
        <a href="https://cursedshrine.com">Home</a>
        <a href="https://gaurav.cursedshrine.com">Portfolio</a>
        <a href="https://cursedshrine.com/blog/">Blog</a>
      </span>
      <span className="credit">
        developed and managed by <a href="https://gaurav.cursedshrine.com">Gaurav Rathore</a>
      </span>
      <span className="assist">With the help of Claudy Rex (AI Assistant)</span>
    </div>
  </footer>
);

export default SiteFooter;
