/**
 * fix-dns.js
 * Overrides Node.js DNS servers before Next.js starts.
 * Needed when the system DNS resolver is localhost (127.0.0.1),
 * which causes ECONNREFUSED for mongodb+srv:// SRV lookups.
 */
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
console.log("[fix-dns] DNS servers set to:", dns.getServers());
