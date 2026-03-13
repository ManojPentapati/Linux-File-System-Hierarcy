// ═══════════════════════════════════════════════════════════════
//  LINUX FS TREE — Full Feature Script
//  Features: Tree viz, Search (fuzzy), Quiz, Interview Mode,
//  Compare, Cheatsheet, Export SVG, Theme toggle,
//  Keyboard Nav, URL hash routing, Progress tracking, Share
// ═══════════════════════════════════════════════════════════════

// ── Node Info Data ─────────────────────────────────────────────
const nodeInfo = {
  "/": {
    path:"/", desc:"The root directory is the top-level of the entire Linux file system. Everything — all files, folders, devices, and processes — lives under /.",
    tag:"ROOT", tagColor:"#00ff88", category:"system",
    access:["root","user"], related:["bin","etc","usr","home"],
    funFact:"Every path in Linux starts with /. There is no C:\\ — just one unified tree.",
    commands:[
      {cmd:"ls /",       desc:"List root directory contents"},
      {cmd:"cd /",       desc:"Navigate to root"},
      {cmd:"tree / -L 1",desc:"Show first-level tree"}
    ], who:"All users can read. Only root can write."
  },
  "bin": {
    path:"/bin", desc:"Essential binary executables needed by all users. Available even in single-user mode or when /usr is not mounted.",
    tag:"SYSTEM", tagColor:"#00d4ff", category:"system",
    access:["user","root"], related:["sbin","usr","lib"],
    funFact:"On modern systems /bin is often a symlink to /usr/bin for FHS compliance.",
    commands:[
      {cmd:"ls",    desc:"List files"},
      {cmd:"cp",    desc:"Copy files"},
      {cmd:"mv",    desc:"Move or rename"},
      {cmd:"rm",    desc:"Remove files"},
      {cmd:"grep",  desc:"Search text in files"},
      {cmd:"chmod", desc:"Change permissions"}
    ], who:"All users execute. Root can modify binaries."
  },
  "etc": {
    path:"/etc", desc:"System-wide configuration files. Plain text only — no binaries. Controls how the OS and installed services behave.",
    tag:"CONFIG", tagColor:"#ffd700", category:"config",
    access:["root"], related:["var","srv"],
    funFact:"'etc' originally stood for 'et cetera' — it was the leftover place for files that didn't fit elsewhere.",
    commands:[
      {cmd:"cat /etc/passwd",  desc:"View user accounts"},
      {cmd:"cat /etc/hostname",desc:"View system hostname"},
      {cmd:"nano /etc/hosts",  desc:"Edit hosts file (root)"},
      {cmd:"cat /etc/fstab",   desc:"View filesystem mounts"}
    ], who:"All users can READ. Only root can WRITE."
  },
  "home": {
    path:"/home", desc:"Personal directories for each regular user. Each user gets /home/username for files, downloads, configs, scripts.",
    tag:"USER", tagColor:"#00ff88", category:"user",
    access:["user"], related:["root","tmp"],
    funFact:"The ~ shortcut always expands to your home directory: /home/yourusername.",
    commands:[
      {cmd:"cd ~",    desc:"Go to your home directory"},
      {cmd:"ls /home",desc:"List all users"},
      {cmd:"ls -la ~/",desc:"List hidden files"},
      {cmd:"pwd",     desc:"Print current directory"}
    ], who:"Each user owns and controls their own /home/username."
  },
  "var": {
    path:"/var", desc:"Variable data — files constantly changing during normal operation: logs, database files, mail spools, print queues.",
    tag:"CONFIG", tagColor:"#ffd700", category:"config",
    access:["root","user"], related:["etc","tmp","srv"],
    funFact:"If your disk fills up, /var/log is usually the culprit — logs can grow enormous fast.",
    commands:[
      {cmd:"tail -f /var/log/syslog",desc:"Watch system logs live"},
      {cmd:"ls /var/log",            desc:"List all log files"},
      {cmd:"cat /var/log/auth.log",  desc:"View auth logs"}
    ], who:"Logs readable by all. Writing requires root or service account."
  },
  "usr": {
    path:"/usr", desc:"Secondary hierarchy — the largest directory on most systems. Holds most user utilities, applications, libraries, and documentation.",
    tag:"SYSTEM", tagColor:"#00d4ff", category:"system",
    access:["user","root"], related:["bin","lib","opt"],
    funFact:"/usr was originally 'user', then 'unix system resources'. Today it holds most installed programs.",
    commands:[
      {cmd:"ls /usr/bin",   desc:"List installed programs"},
      {cmd:"ls /usr/lib",   desc:"List shared libraries"},
      {cmd:"which python3", desc:"Find python3 location"}
    ], who:"All users can read/execute. Only root or package manager installs."
  },
  "proc": {
    path:"/proc", desc:"Virtual filesystem created in RAM by the kernel. Contains real-time info about running processes, CPU, memory, and kernel parameters.",
    tag:"VIRTUAL", tagColor:"#ff6b9d", category:"virtual",
    access:["user","root"], related:["dev","tmp"],
    funFact:"Every running process has a folder at /proc/[PID]. Try: ls /proc/$$ to see your shell's info.",
    commands:[
      {cmd:"cat /proc/cpuinfo", desc:"View CPU details"},
      {cmd:"cat /proc/meminfo", desc:"View memory usage"},
      {cmd:"cat /proc/version", desc:"View kernel version"},
      {cmd:"ls /proc/$$",       desc:"Current process info"}
    ], who:"All users can read. Some entries require root to modify."
  },
  "dev": {
    path:"/dev", desc:"Device files representing hardware and virtual devices. In Linux, everything is a file — hard drives, USB, terminals all live here.",
    tag:"DEVICES", tagColor:"#ff8c42", category:"devices",
    access:["root"], related:["proc","mnt"],
    funFact:"/dev/null is the 'black hole' of Linux — anything written to it disappears. Perfect for silencing noisy output.",
    commands:[
      {cmd:"ls /dev",       desc:"List all device files"},
      {cmd:"lsblk",         desc:"List block devices"},
      {cmd:"cat /dev/null", desc:"The null device (empty)"},
      {cmd:"fdisk -l",      desc:"List disk partitions (root)"}
    ], who:"Most device files require root. /dev/null open to all."
  },
  "boot": {
    path:"/boot", desc:"Files needed to boot the system — the Linux kernel (vmlinuz), initial RAM disk (initrd), and GRUB bootloader config.",
    tag:"SYSTEM", tagColor:"#00d4ff", category:"system",
    access:["root"], related:["lib","sbin"],
    funFact:"The kernel image is named vmlinuz — 'vm' = virtual memory, 'z' = it's compressed.",
    commands:[
      {cmd:"ls /boot",              desc:"List boot files"},
      {cmd:"uname -r",              desc:"Show kernel version"},
      {cmd:"cat /boot/grub/grub.cfg",desc:"View GRUB config (root)"}
    ], who:"All users can READ. Only root can modify bootloader files."
  },
  "tmp": {
    path:"/tmp", desc:"Temporary files created by applications and users. Contents are automatically cleared on every reboot. Any user can create files here.",
    tag:"VIRTUAL", tagColor:"#ff6b9d", category:"virtual",
    access:["user","root"], related:["var","home"],
    funFact:"On systemd systems /tmp may be tmpfs — it lives entirely in RAM for speed.",
    commands:[
      {cmd:"ls /tmp",          desc:"List temp files"},
      {cmd:"touch /tmp/test",  desc:"Create a temp file"},
      {cmd:"df -h /tmp",       desc:"Check tmp disk usage"}
    ], who:"All users can create/delete their own files. Cleared on reboot."
  },
  "root": {
    path:"/root", desc:"Home directory of the root superuser. NOT the same as / (filesystem root). Root's personal files, scripts, and configs go here.",
    tag:"USER", tagColor:"#00ff88", category:"user",
    access:["root"], related:["home","etc","sbin"],
    funFact:"Root's home is /root not /home/root — so a corrupted /home doesn't lock out the system admin.",
    commands:[
      {cmd:"sudo su",   desc:"Switch to root user"},
      {cmd:"sudo -i",   desc:"Start root shell session"},
      {cmd:"ls /root",  desc:"List root's files (sudo needed)"}
    ], who:"ONLY root user can access this directory."
  },
  "sbin": {
    path:"/sbin", desc:"System binaries — essential programs used by the sysadmin (root) for system maintenance, repair, and administration.",
    tag:"SYSTEM", tagColor:"#00d4ff", category:"system",
    access:["root"], related:["bin","boot","lib"],
    funFact:"On modern Debian/Ubuntu, /sbin is a symlink to /usr/sbin — the merge simplifies the FHS.",
    commands:[
      {cmd:"fdisk",    desc:"Disk partition manager"},
      {cmd:"ifconfig", desc:"Network interface config"},
      {cmd:"reboot",   desc:"Restart the system"},
      {cmd:"fsck",     desc:"Filesystem check & repair"}
    ], who:"Executed by root or sudo. Regular users have no access."
  },
  "lib": {
    path:"/lib", desc:"Essential shared libraries and kernel modules required by /bin and /sbin programs. Like DLLs in Windows — loaded when programs run.",
    tag:"SYSTEM", tagColor:"#00d4ff", category:"system",
    access:["root"], related:["bin","sbin","usr"],
    funFact:"Use `ldd /bin/ls` to see all shared libraries the ls command loads at runtime.",
    commands:[
      {cmd:"ls /lib",      desc:"List shared libraries"},
      {cmd:"ldd /bin/ls",  desc:"Show libraries used by ls"},
      {cmd:"ldconfig",     desc:"Refresh library cache (root)"}
    ], who:"All users use (via programs). Only root can modify."
  },
  "mnt": {
    path:"/mnt", desc:"Generic mount point for temporarily mounting filesystems — external drives, NFS network shares, USB drives.",
    tag:"DEVICES", tagColor:"#ff8c42", category:"devices",
    access:["root"], related:["dev","opt"],
    funFact:"In WSL (Windows Subsystem for Linux), your Windows C: and D: drives appear at /mnt/c and /mnt/d.",
    commands:[
      {cmd:"mount /dev/sdb1 /mnt",desc:"Mount a disk (root)"},
      {cmd:"umount /mnt",         desc:"Unmount (root)"},
      {cmd:"df -h",               desc:"View mounted filesystems"}
    ], who:"Root mounts filesystems. Users access files after mounting."
  },
  "opt": {
    path:"/opt", desc:"Optional third-party software not part of the default OS installation — e.g. Google Chrome, VS Code, custom enterprise apps.",
    tag:"USER", tagColor:"#00ff88", category:"user",
    access:["user","root"], related:["usr","home","srv"],
    funFact:"Many enterprise tools like Oracle and JIRA install to /opt to stay isolated from OS packages.",
    commands:[
      {cmd:"ls /opt",              desc:"List optional software"},
      {cmd:"ls /opt/google/chrome",desc:"Example: Chrome location"}
    ], who:"All users can run programs. Root installs here."
  },
  "srv": {
    path:"/srv", desc:"Service data — data served by the system. Web server files, FTP files, etc.",
    tag:"CONFIG", tagColor:"#ffd700", category:"config",
    access:["root"], related:["etc","var","opt"],
    funFact:"/srv is defined by FHS but many distros still use /var/www for web roots — it's a naming convention war.",
    commands:[
      {cmd:"ls /srv",    desc:"List service data"},
      {cmd:"ls /srv/www",desc:"Web server root files"}
    ], who:"Root manages. Web/FTP service users read served content."
  }
};

// ── Quiz Questions ─────────────────────────────────────────────
const quizQuestions = [
  {q:"Which directory stores system-wide configuration files?",              answer:"/etc",                   options:["/etc","/var","/usr","/opt"]},
  {q:"Where are log files typically found in Linux?",                        answer:"/var/log",               options:["/etc/log","/var/log","/tmp/log","/proc/log"]},
  {q:"Which directory contains essential binaries available to ALL users?",  answer:"/bin",                   options:["/sbin","/usr/bin","/bin","/opt"]},
  {q:"What kind of filesystem is /proc?",                                    answer:"Virtual (RAM-based)",    options:["Disk-based","Virtual (RAM-based)","Network filesystem","Encrypted filesystem"]},
  {q:"Which directory is the home of the root superuser?",                   answer:"/root",                  options:["/","/home/root","/root","/etc/root"]},
  {q:"What is /dev/null used for?",                                          answer:"Discarding output",      options:["Storing device drivers","Discarding output","Null pointer refs","Debugging devices"]},
  {q:"Which directory should 3rd-party software like Chrome be installed to?",answer:"/opt",                 options:["/bin","/usr","/opt","/home"]},
  {q:"Where does the kernel image (vmlinuz) live?",                          answer:"/boot",                  options:["/boot","/lib","/usr/kernel","/sbin"]},
  {q:"Which directory stores shared libraries needed by /bin and /sbin?",    answer:"/lib",                   options:["/usr/lib","/lib","/var/lib","/etc/lib"]},
  {q:"In WSL, where are Windows drives mounted?",                            answer:"/mnt",                   options:["/windows","/media","/mnt","/drive"]},
  {q:"Which directory holds variable data that changes during operation?",   answer:"/var",                   options:["/etc","/tmp","/var","/usr"]},
  {q:"Which directory contains programs only sysadmins should run?",         answer:"/sbin",                  options:["/bin","/usr/bin","/sbin","/root/bin"]},
  {q:"The ~ shortcut expands to which path?",                                answer:"/home/yourusername",     options:["/root","/home/yourusername","/home","/usr/home"]},
  {q:"Which directory is described as the 'secondary hierarchy'?",           answer:"/usr",                   options:["/usr","/opt","/srv","/lib"]},
  {q:"Where does /tmp clear its files?",                                     answer:"On every reboot",        options:["Every hour","Every week","On every reboot","When disk is full"]}
];

// ── Interview Cards ────────────────────────────────────────────
const interviewCards = Object.entries(nodeInfo).map(([name, info]) => ({
  q: `What is the purpose of the  ${info.path}  directory?`,
  a: info.desc,
  fact: info.funFact
})).concat([
  {q:"What is the difference between /bin and /sbin?",          a:"/bin contains binaries for ALL users (ls, cp, cat). /sbin contains system administration binaries only accessible by root (fdisk, reboot, fsck)."},
  {q:"Why does /root exist separately from /home/root?",        a:"Root's home is /root (not /home/root) so that a corrupted /home partition doesn't lock the sysadmin out of the system."},
  {q:"What makes /proc and /tmp similar?",                      a:"Both can exist entirely in RAM (tmpfs / procfs) — neither necessarily persists to disk. /proc is kernel virtual, /tmp is cleared on reboot."},
  {q:"Explain the phrase 'everything is a file' in Linux.",     a:"In Linux, hardware devices (hard drives, USB, terminals), processes (/proc), and even random/null (/dev) are all exposed as files. This unified interface allows standard I/O operations on everything."}
]);

// ── Tree Data ──────────────────────────────────────────────────
const treeData = {
  name:"/", color:"#00ff88",
  children:[
    {name:"bin",  color:"#00d4ff", children:[{name:"ls",color:"#4a9eff"},{name:"cp/mv",color:"#4a9eff"}]},
    {name:"etc",  color:"#ffd700", children:[{name:"passwd",color:"#ffaa33"},{name:"fstab",color:"#ffaa33"}]},
    {name:"home", color:"#00ff88", children:[{name:"manoj",color:"#33ff99"},{name:"alice",color:"#33ff99"}]},
    {name:"var",  color:"#ffd700", children:[{name:"log",color:"#ffaa33"},{name:"www",color:"#ffaa33"}]},
    {name:"usr",  color:"#00d4ff", children:[
      {name:"bin",color:"#4a9eff", children:[{name:"python3",color:"#6ab0ff"},{name:"git",color:"#6ab0ff"}]},
      {name:"lib",color:"#4a9eff", children:[{name:"local",color:"#6ab0ff"},{name:"share",color:"#6ab0ff"}]}
    ]},
    {name:"proc", color:"#ff6b9d", children:[{name:"cpuinfo",color:"#ff8ab0"},{name:"meminfo",color:"#ff8ab0"}]},
    {name:"dev",  color:"#ff8c42", children:[{name:"sda",color:"#ffaa66"},{name:"tty",color:"#ffaa66"},{name:"null",color:"#ffaa66"}]},
    {name:"boot", color:"#00d4ff", children:[{name:"vmlinuz",color:"#4a9eff"},{name:"grub",color:"#4a9eff"}]},
    {name:"tmp",  color:"#ff6b9d", children:[{name:"session",color:"#ff8ab0"},{name:"cache",color:"#ff8ab0"}]},
    {name:"root", color:"#00ff88", children:[{name:".bashrc",color:"#33ff99"},{name:".ssh",color:"#33ff99"}]},
    {name:"sbin", color:"#00d4ff", children:[{name:"fdisk",color:"#4a9eff"},{name:"reboot",color:"#4a9eff"}]},
    {name:"lib",  color:"#00d4ff", children:[{name:"modules",color:"#4a9eff"},{name:"systemd",color:"#4a9eff"}]},
    {name:"mnt",  color:"#ff8c42", children:[{name:"usb",color:"#ffaa66"},{name:"nfs",color:"#ffaa66"}]},
    {name:"opt",  color:"#00ff88", children:[{name:"chrome",color:"#33ff99"},{name:"vscode",color:"#33ff99"}]}
  ]
};

// ── Progress Tracking ──────────────────────────────────────────
const exploredSet = new Set();
const TOTAL_DIRS = Object.keys(nodeInfo).length;

function markExplored(name) {
  if (!nodeInfo[name]) return;
  if (!exploredSet.has(name)) {
    exploredSet.add(name);
    updateProgressUI();
    // Achievement unlock
    if (exploredSet.size === TOTAL_DIRS) {
      setTimeout(() => showToast('🏆 ALL DIRECTORIES EXPLORED! You\'re a Linux pro!'), 400);
    }
  }
}

function updateProgressUI() {
  const n = exploredSet.size;
  document.getElementById('progress-count').textContent = n;
  document.getElementById('stat-explored').textContent = n;
}

// ── Stats Animation ────────────────────────────────────────────
function animateCount(el, target) {
  let count = 0;
  const step = Math.ceil(target / 20);
  const iv = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count;
    if (count >= target) clearInterval(iv);
  }, 45);
}

function initStats() {
  const dirs = Object.values(nodeInfo);
  document.getElementById('progress-total').textContent = TOTAL_DIRS;
  animateCount(document.getElementById('stat-total'), dirs.length);
  animateCount(document.getElementById('stat-root-only'), dirs.filter(d=>d.access.length===1&&d.access[0]==='root').length);
  animateCount(document.getElementById('stat-user'), dirs.filter(d=>d.access.includes('user')).length);
  animateCount(document.getElementById('stat-virtual'), dirs.filter(d=>d.category==='virtual').length);
}

// ── Toast ──────────────────────────────────────────────────────
let toastTimer = null;
function showToast(msg, color = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.borderColor = color || 'var(--accent)';
  t.style.color = color || 'var(--accent)';
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}

// ── Theme Toggle ───────────────────────────────────────────────
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('theme-btn').textContent = isDark ? '🌙' : '☀';
  showToast(isDark ? '☀ Light mode' : '🌙 Dark mode');
}

// ── Export SVG ─────────────────────────────────────────────────
function exportSVG() {
  const svgEl = document.querySelector('#svg-container svg');
  if (!svgEl) return;
  const clone = svgEl.cloneNode(true);
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  // Embed background
  const bg = document.createElement('rect');
  bg.setAttribute('width', '100%'); bg.setAttribute('height', '100%');
  bg.setAttribute('fill', '#060b14');
  clone.insertBefore(bg, clone.firstChild);

  const blob = new Blob([clone.outerHTML], {type:'image/svg+xml'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'linux-fs-tree.svg'; a.click();
  URL.revokeObjectURL(url);
  showToast('✓ SVG exported!');
}

// ── Fuzzy Search ───────────────────────────────────────────────
function fuzzyScore(text, query) {
  text = text.toLowerCase(); query = query.toLowerCase();
  if (text.includes(query)) return 100 + (query.length / text.length) * 50;
  let score = 0, qi = 0;
  for (let i = 0; i < text.length && qi < query.length; i++) {
    if (text[i] === query[qi]) { score += 10; qi++; }
  }
  return qi === query.length ? score : 0;
}

const searchInput  = document.getElementById('search-input');
const searchResults= document.getElementById('search-results');
const searchClear  = document.getElementById('search-clear');

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim();
  searchClear.style.display = q ? 'block' : 'none';
  if (!q) { searchResults.innerHTML = ''; return; }

  const scored = Object.entries(nodeInfo).map(([name, info]) => {
    const score = Math.max(
      fuzzyScore(name, q),
      fuzzyScore(info.desc, q) * 0.6,
      fuzzyScore(info.tag, q) * 0.8,
      fuzzyScore(info.funFact || '', q) * 0.5
    );
    return {name, info, score};
  }).filter(x => x.score > 0).sort((a,b) => b.score - a.score);

  if (!scored.length) {
    searchResults.innerHTML = `<div style="padding:10px 14px;color:var(--text-faint);font-size:.68rem">No results for "${q}"</div>`;
    return;
  }
  searchResults.innerHTML = scored.slice(0, 7).map(({name, info}) => `
    <div class="search-result-item" onclick="highlightNode('${name}')">
      <div class="sri-dot" style="background:${info.tagColor}"></div>
      <div style="overflow:hidden">
        <div class="sri-name">${info.path}</div>
        <div class="sri-desc">${info.desc.slice(0, 72)}…</div>
      </div>
    </div>`).join('');
});

// ⌘K / Ctrl+K focus search
document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault(); searchInput.focus(); searchInput.select();
  }
});

function clearSearch() {
  searchInput.value = ''; searchResults.innerHTML = '';
  searchClear.style.display = 'none';
  g.selectAll('.node').classed('dimmed', false);
  g.selectAll('.link').classed('dimmed', false);
}

function highlightNode(name) {
  searchResults.innerHTML = ''; searchInput.value = '';
  searchClear.style.display = 'none';
  showPanel(name, nodeInfo[name]?.tagColor || '#00d4ff');
  updateBreadcrumb(name);
  markExplored(name);
  window.location.hash = encodeURIComponent(name);

  // Only open the path to this specific node — never touch other branches
  function expandPathTo(node, targetName) {
    if (!node) return false;
    if (node.data.name === targetName) return true;
    // Check hidden children first
    const kids = node.children || node._children;
    if (!kids) return false;
    for (const child of kids) {
      if (expandPathTo(child, targetName)) {
        // This child is on the path — make sure it's visible
        if (node._children) { node.children = node._children; node._children = null; }
        return true;
      }
    }
    return false;
  }
  expandPathTo(root, name);
  update(root);

  setTimeout(() => {
    g.selectAll('.node').each(function(d) {
      if (d.data.name === name) {
        focusedNode = d;
        d3.select(this).classed('focused', true);
        setTimeout(() => d3.select(this).classed('focused', false), 1500);
      }
    });
  }, 450);
}

// ── URL Hash Routing ───────────────────────────────────────────
function handleHash() {
  const hash = decodeURIComponent(window.location.hash.slice(1));
  if (hash && nodeInfo[hash]) {
    setTimeout(() => highlightNode(hash), 700);
  }
}
window.addEventListener('hashchange', handleHash);

// ── Filter by Category ─────────────────────────────────────────
let activeFilter = null;
function filterByCategory(cat) {
  activeFilter = cat;
  if (!cat) {
    g.selectAll('.node').classed('dimmed', false);
    g.selectAll('.link').classed('dimmed', false);
    showToast('Showing all categories');
    return;
  }
  g.selectAll('.node').classed('dimmed', d => {
    if (d.depth === 0) return false;
    const info = nodeInfo[d.data.name];
    return !info || info.category !== cat;
  });
  g.selectAll('.link').classed('dimmed', d => {
    const info = nodeInfo[d.target.data.name];
    return !info || info.category !== cat;
  });
  showToast(`Filtering: ${cat.toUpperCase()}`);
}

// ── Breadcrumb ─────────────────────────────────────────────────
function updateBreadcrumb(name) {
  const info = nodeInfo[name];
  if (info) document.getElementById('breadcrumb-text').textContent =
    `SELECTED: ${info.path}  ·  ${info.tag}  ·  ${info.category.toUpperCase()}`;
}

// ── SVG Setup ──────────────────────────────────────────────────
const svgW = Math.max(window.innerWidth, 1200);
const svgH = 700;

const svg = d3.select("#svg-container")
  .append("svg").attr("width", svgW).attr("height", svgH);

const g = svg.append("g").attr("transform", "translate(0, 20)");

// Disable all pan/zoom — tree is fully fixed
svg.on("mousedown.zoom", null)
   .on("touchstart.zoom", null)
   .on("touchmove.zoom", null)
   .on("touchend.zoom", null)
   .on("wheel.zoom", null)
   .on("dblclick.zoom", null);

// Use nodeSize for guaranteed fixed spacing — no collisions ever
const treeLayout = d3.tree().nodeSize([90, 160]);
let root = d3.hierarchy(treeData);
root.x0 = 0;
root.y0 = 0;

// Collapse EVERYTHING — only root is visible at start
function collapseNode(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
    d._children.forEach(collapseNode);
  }
}
root.children && root.children.forEach(collapseNode);

let nodeId = 0;
let focusedNode = null;

// ── Update / Render ────────────────────────────────────────────
function update(source) {
  const treeNodes = treeLayout(root);
  const nodes = treeNodes.descendants();
  const links = treeNodes.links();

  // Center tree horizontally in SVG
  const xs = nodes.map(d => d.x);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const treeWidth = maxX - minX;
  const offsetX = svgW / 2 - minX - treeWidth / 2;

  // Fix vertical depth spacing
  nodes.forEach(d => { d.y = d.depth * 160 + 60; });

  // Dynamically grow SVG height to fit all nodes
  const maxY = Math.max(...nodes.map(d => d.y)) + 100;
  svg.attr("height", Math.max(svgH, maxY));

  // Links
  const link = g.selectAll(".link").data(links, d => d.target.id);
  const linkEnter = link.enter().insert("path","g")
    .attr("class","link")
    .attr("stroke", d => d.target.data.color || "#2a4a6a")
    .attr("d", () => {
      const o = { x: source.x0 + offsetX, y: source.y0 };
      return diag(o, o);
    });
  linkEnter.merge(link).transition().duration(400)
    .attr("d", d => diag(
      { x: d.source.x + offsetX, y: d.source.y },
      { x: d.target.x + offsetX, y: d.target.y }
    ))
    .attr("stroke", d => d.target.data.color || "#2a4a6a");
  link.exit().transition().duration(400)
    .attr("d", () => {
      const o = { x: source.x + offsetX, y: source.y };
      return diag(o, o);
    }).remove();

  // Nodes
  const node = g.selectAll(".node").data(nodes, d => d.id || (d.id = ++nodeId));
  const nodeEnter = node.enter().append("g")
    .attr("class","node")
    .attr("transform", () => `translate(${source.x0 + offsetX},${source.y0})`)
    .on("click", (e, d) => {
      // Toggle children on click
      if (d._children || d.children) {
        if (d.children) { d._children = d.children; d.children = null; }
        else             { d.children = d._children; d._children = null; }
        update(d);
      }
      showPanel(d.data.name, d.data.color);
      updateBreadcrumb(d.data.name);
      markExplored(d.data.name);
      focusedNode = d;
      window.location.hash = encodeURIComponent(d.data.name);
      if (activeFilter) filterByCategory(activeFilter);
    });

  nodeEnter.filter(d => d.depth === 0).append("circle")
    .attr("class","node-root-ring").attr("r", 30);

  nodeEnter.append("circle")
    .attr("r", 0)
    .attr("fill", d => d._children ? d.data.color + "30" : "#0d1829")
    .attr("stroke", d => d.data.color)
    .style("filter", d => `drop-shadow(0 0 6px ${d.data.color}99)`);

  nodeEnter.append("text")
    .attr("text-anchor", "middle")
    .attr("fill", d => d.data.color)
    .attr("font-size", d => d.depth === 0 ? "13px" : "11px")
    .attr("font-weight", "700")
    .text(d => d.data.name)
    .attr("opacity", 0);

  const nodeUpdate = nodeEnter.merge(node);
  nodeUpdate.transition().duration(400)
    .attr("transform", d => `translate(${d.x + offsetX},${d.y})`);

  nodeUpdate.select("circle:not(.node-root-ring)").transition().duration(400)
    .attr("r", d => d.depth === 0 ? 18 : d.depth === 1 ? 13 : 8)
    .attr("fill", d => d._children ? d.data.color + "25" : "#0d1829")
    .attr("stroke", d => d.data.color);

  nodeUpdate.select("text").transition().duration(400)
    .attr("opacity", 1)
    .attr("dy", d => (d.children || d._children) ? -18 : (d.depth === 0 ? -22 : 20));

  node.exit().transition().duration(400)
    .attr("transform", () => `translate(${source.x + offsetX},${source.y})`)
    .remove();

  nodes.forEach(d => { d.x0 = d.x; d.y0 = d.y; });
}

function diag(s, d) {
  return `M${s.x} ${s.y}C${s.x} ${(s.y+d.y)/2},${d.x} ${(s.y+d.y)/2},${d.x} ${d.y}`;
}

function toggleNode(d) {
  if (d.children) { d._children = d.children; d.children = null; }
  else             { d.children = d._children; d._children = null; }
  update(d);
}

// ── Keyboard Navigation ────────────────────────────────────────
document.addEventListener('keydown', e => {
  // Skip if typing in input
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;

  const allNodes = root.descendants();

  if (e.key === 'Escape') {
    closePanel(); exitQuiz(); exitInterview(); closeCompare(); closeCheatsheet(); closeShare();
    return;
  }

  if (!focusedNode) {
    if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Enter'].includes(e.key)) {
      focusedNode = root;
    }
  }
  if (!focusedNode) return;

  e.preventDefault();

  if (e.key === 'Enter') {
    showPanel(focusedNode.data.name, focusedNode.data.color);
    markExplored(focusedNode.data.name);
  } else if (e.key === 'ArrowRight') {
    // Go to first child
    const children = focusedNode.children || focusedNode._children;
    if (children && children.length) { focusedNode = children[0]; }
  } else if (e.key === 'ArrowLeft') {
    // Go to parent
    if (focusedNode.parent) focusedNode = focusedNode.parent;
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    // Siblings
    if (focusedNode.parent) {
      const sibs = focusedNode.parent.children || focusedNode.parent._children || [];
      const idx = sibs.indexOf(focusedNode);
      if (e.key === 'ArrowDown' && idx < sibs.length-1) focusedNode = sibs[idx+1];
      if (e.key === 'ArrowUp'   && idx > 0)             focusedNode = sibs[idx-1];
    }
  }

  // Highlight focused node
  g.selectAll('.node').classed('focused', d => d === focusedNode);
  updateBreadcrumb(focusedNode.data.name);

  // Scroll/zoom to node
  // Tree is fixed — no panning on keyboard nav
});

// ── Side Panel ─────────────────────────────────────────────────
function showPanel(name, color) {
  const info    = nodeInfo[name];
  const panel   = document.getElementById("panel");
  const content = document.getElementById("panel-content");

  if (!info) {
    content.innerHTML = `
      <div class="panel-name" style="color:${color}">${name}</div>
      <div class="panel-path" style="color:var(--text-dim)">sub-entry</div>
      <div class="panel-section">
        <div class="panel-label">DESCRIPTION</div>
        <div class="panel-text">This is a file or sub-directory. Click a parent node for full details.</div>
      </div>`;
  } else {
    const accessHTML = info.access.map(a =>
      a==='root' ? `<span class="access-badge badge-root">🔴 ROOT ONLY</span>`
                 : `<span class="access-badge badge-user">🟢 ALL USERS</span>`
    ).join('');

    const cmdsHTML = info.commands.map(c => `
      <li onclick="copyCmd('${c.cmd.replace(/'/g,"\\'")}')">
        <div class="cmd-text-col">
          <div class="cmd-name">${c.cmd}</div>
          <div class="cmd-desc">${c.desc}</div>
        </div>
        <button class="copy-btn" title="Copy">⎘</button>
      </li>`).join('');

    const relatedHTML = (info.related||[]).map(r =>
      `<span class="related-tag" onclick="highlightNode('${r}')">/${r}</span>`
    ).join('');

    content.innerHTML = `
      <div class="panel-name" style="color:${color}">${name}</div>
      <div class="panel-path">${info.path}</div>
      <span class="panel-tag" style="background:${color}18;color:${color};border:1px solid ${color}40">${info.tag}</span>
      <div class="panel-section">
        <div class="panel-label">DESCRIPTION</div>
        <div class="panel-text">${info.desc}</div>
      </div>
      <div class="panel-section">
        <div class="panel-label">💡 FUN FACT</div>
        <div class="panel-text" style="color:var(--text-dim);font-style:italic">${info.funFact}</div>
      </div>
      <div class="panel-section">
        <div class="panel-label">WHO CAN USE</div>
        <div>${accessHTML}</div>
        <div class="panel-text" style="margin-top:7px">${info.who}</div>
      </div>
      <div class="panel-section">
        <div class="panel-label">COMMANDS <span style="color:var(--text-faint);font-size:.55rem">· click to copy</span></div>
        <ul class="cmd-list">${cmdsHTML}</ul>
      </div>
      ${relatedHTML ? `<div class="panel-section"><div class="panel-label">RELATED</div><div class="related-grid">${relatedHTML}</div></div>` : ''}
    `;
  }
  panel.classList.add("open");
}

function closePanel() {
  document.getElementById("panel").classList.remove("open");
}

function copyCmd(cmd) {
  navigator.clipboard.writeText(cmd).then(() => showToast(`⎘ Copied: ${cmd}`));
}

// ── Controls ───────────────────────────────────────────────────
function expandAll() {
  root.each(d => { if (d._children) { d.children = d._children; d._children = null; } });
  update(root);
}

function collapseAll() {
  // Collapse everything back to root only
  root.children && root.children.forEach(collapseNode);
  update(root);
}

function resetZoom() {
  // Tree is fixed — nothing to reset
}

// ── Quiz ───────────────────────────────────────────────────────
let quiz = {questions:[], index:0, score:0, streak:0, answered:false};

function startQuiz() {
  quiz.questions = [...quizQuestions].sort(()=>Math.random()-.5).slice(0,10);
  quiz.index=0; quiz.score=0; quiz.streak=0;
  document.getElementById('quiz-total').textContent = quiz.questions.length;
  document.getElementById('quiz-overlay').classList.add('show');
  renderQuestion();
}

function renderQuestion() {
  const q = quiz.questions[quiz.index];
  quiz.answered = false;
  document.getElementById('quiz-qnum').textContent   = quiz.index+1;
  document.getElementById('quiz-score').textContent  = quiz.score;
  document.getElementById('quiz-streak').textContent = quiz.streak;
  document.getElementById('quiz-progress-fill').style.width = (quiz.index/quiz.questions.length*100)+'%';
  document.getElementById('quiz-question').textContent = q.q;
  document.getElementById('quiz-feedback').textContent  = '';
  document.getElementById('quiz-next').style.display    = 'none';
  const opts = [...q.options].sort(()=>Math.random()-.5);
  document.getElementById('quiz-options').innerHTML = opts.map(o =>
    `<button class="quiz-opt" onclick="answerQuiz(this,'${o.replace(/'/g,"\\'")}','${q.answer.replace(/'/g,"\\'")}')"> ${o}</button>`
  ).join('');
}

function answerQuiz(btn, chosen, answer) {
  if (quiz.answered) return;
  quiz.answered = true;
  document.querySelectorAll('.quiz-opt').forEach(b => b.classList.add('answered'));
  if (chosen === answer) {
    btn.classList.add('correct'); quiz.score++; quiz.streak++;
    document.getElementById('quiz-feedback').innerHTML =
      `✅ Correct!${quiz.streak>1?` 🔥 ${quiz.streak} streak!`:''}`;
  } else {
    btn.classList.add('wrong'); quiz.streak=0;
    document.querySelectorAll('.quiz-opt').forEach(b => { if(b.textContent.trim()===answer) b.classList.add('correct'); });
    document.getElementById('quiz-feedback').innerHTML =
      `❌ Answer: <strong style="color:#00ff88">${answer}</strong>`;
  }
  document.getElementById('quiz-score').textContent  = quiz.score;
  document.getElementById('quiz-streak').textContent = quiz.streak;
  document.getElementById('quiz-next').style.display = 'block';
}

function nextQuestion() {
  quiz.index++;
  if (quiz.index >= quiz.questions.length) endQuiz(); else renderQuestion();
}

function endQuiz() {
  const total=quiz.questions.length, pct=Math.round(quiz.score/total*100);
  const grade = pct>=90?'🏆 Expert':pct>=70?'⭐ Solid':pct>=50?'📚 Learning':'🔄 Keep Practicing';
  document.getElementById('quiz-progress-fill').style.width='100%';
  document.getElementById('quiz-options').innerHTML='';
  document.getElementById('quiz-next').style.display='none';
  document.getElementById('quiz-feedback').textContent='';
  document.getElementById('quiz-question').innerHTML=`
    <div style="text-align:center;padding:8px 0">
      <div style="font-size:2rem;margin-bottom:8px">${grade}</div>
      <div style="color:#00ff88;font-size:1.4rem;font-family:'Orbitron',monospace">${quiz.score}/${total}</div>
      <div style="color:var(--text-dim);margin-top:6px;font-size:.72rem">${pct}% correct</div>
      <button onclick="startQuiz()" style="margin-top:16px;width:100%;background:rgba(0,255,136,.08);border-color:#00ff88;color:#00ff88">🔄 RETRY QUIZ</button>
    </div>`;
}

function exitQuiz() { document.getElementById('quiz-overlay').classList.remove('show'); }

// ── Interview Mode ─────────────────────────────────────────────
let ivState = {cards:[], index:0, easy:0, hard:0, miss:0, timer:null, timeLeft:10};

function startInterview() {
  ivState.cards = [...interviewCards].sort(()=>Math.random()-.5);
  ivState.index=0; ivState.easy=0; ivState.hard=0; ivState.miss=0;
  document.getElementById('interview-overlay').classList.add('show');
  renderIvCard();
}

function renderIvCard() {
  if (ivState.index >= ivState.cards.length) { endInterview(); return; }
  const c = ivState.cards[ivState.index];
  document.getElementById('interview-q').textContent = c.q;
  document.getElementById('interview-answer').style.display = 'none';
  document.getElementById('interview-actions').style.display = 'none';
  document.getElementById('interview-reveal-btn').style.display = 'block';
  document.getElementById('iv-remaining').textContent = ivState.cards.length - ivState.index;
  updateIvCounts();
  startIvTimer();
}

function startIvTimer() {
  clearInterval(ivState.timer);
  ivState.timeLeft = 10;
  document.getElementById('interview-timer').textContent = 10;
  updateTimerArc(10, 10);
  ivState.timer = setInterval(() => {
    ivState.timeLeft--;
    document.getElementById('interview-timer').textContent = ivState.timeLeft;
    updateTimerArc(ivState.timeLeft, 10);
    if (ivState.timeLeft <= 0) {
      clearInterval(ivState.timer);
      revealAnswer(); // auto reveal on timeout
    }
  }, 1000);
}

function updateTimerArc(left, total) {
  const arc = document.getElementById('timer-arc');
  if (!arc) return;
  const circumference = 2 * Math.PI * 20; // r=20
  const offset = circumference * (1 - left / total);
  arc.setAttribute('stroke-dashoffset', offset);
  arc.setAttribute('stroke', left <= 3 ? '#ff6b9d' : '#ffd700');
}

function revealAnswer() {
  clearInterval(ivState.timer);
  const c = ivState.cards[ivState.index];
  const el = document.getElementById('interview-answer');
  el.style.display = 'block';
  el.innerHTML = `<strong>${c.a}</strong>${c.fact ? `<br><br><em style="color:var(--text-dim);font-size:.7rem">💡 ${c.fact}</em>` : ''}`;
  document.getElementById('interview-reveal-btn').style.display = 'none';
  document.getElementById('interview-actions').style.display = 'flex';
}

function ivResult(result) {
  ivState[result]++; ivState.index++;
  updateIvCounts(); renderIvCard();
}

function updateIvCounts() {
  document.getElementById('iv-easy').textContent = ivState.easy;
  document.getElementById('iv-hard').textContent = ivState.hard;
  document.getElementById('iv-miss').textContent = ivState.miss;
}

function endInterview() {
  clearInterval(ivState.timer);
  document.getElementById('interview-q').innerHTML = `
    <div style="text-align:center">
      <div style="font-size:1.5rem;margin-bottom:10px">📊 Session Complete</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px">
        <div style="background:rgba(0,255,136,.07);border:1px solid rgba(0,255,136,.2);border-radius:6px;padding:12px">
          <div style="color:#00ff88;font-size:1.2rem;font-family:'Orbitron',monospace">${ivState.easy}</div>
          <div style="color:var(--text-dim);font-size:.6rem;margin-top:4px">NAILED IT</div>
        </div>
        <div style="background:rgba(255,215,0,.07);border:1px solid rgba(255,215,0,.2);border-radius:6px;padding:12px">
          <div style="color:#ffd700;font-size:1.2rem;font-family:'Orbitron',monospace">${ivState.hard}</div>
          <div style="color:var(--text-dim);font-size:.6rem;margin-top:4px">SHAKY</div>
        </div>
        <div style="background:rgba(255,107,157,.07);border:1px solid rgba(255,107,157,.2);border-radius:6px;padding:12px">
          <div style="color:#ff6b9d;font-size:1.2rem;font-family:'Orbitron',monospace">${ivState.miss}</div>
          <div style="color:var(--text-dim);font-size:.6rem;margin-top:4px">MISSED</div>
        </div>
      </div>
      <button onclick="startInterview()" style="margin-top:16px;width:100%;border-color:#ffd700;color:#ffd700;background:rgba(255,215,0,.06)">🔄 RESTART</button>
    </div>`;
  document.getElementById('interview-answer').style.display='none';
  document.getElementById('interview-actions').style.display='none';
  document.getElementById('interview-reveal-btn').style.display='none';
}

function exitInterview() {
  clearInterval(ivState.timer);
  document.getElementById('interview-overlay').classList.remove('show');
}

// ── Compare ────────────────────────────────────────────────────
function openCompare() {
  const sel = Object.keys(nodeInfo);
  const optHTML = sel.map(k => `<option value="${k}">${nodeInfo[k].path}</option>`).join('');
  document.getElementById('cmp-a').innerHTML = optHTML;
  document.getElementById('cmp-b').innerHTML = optHTML;
  document.getElementById('cmp-b').value = sel[1];
  document.getElementById('compare-overlay').classList.add('show');
  renderCompare();
}

function renderCompare() {
  const ka = document.getElementById('cmp-a').value;
  const kb = document.getElementById('cmp-b').value;
  const a = nodeInfo[ka], b = nodeInfo[kb];
  if (!a || !b) return;

  function card(info, key) {
    const accessBadge = info.access.map(x=>
      `<span class="access-badge ${x==='root'?'badge-root':'badge-user'}" style="font-size:.58rem">${x==='root'?'🔴 ROOT':'🟢 USER'}</span>`
    ).join('');
    const cmds = info.commands.map(c=>`<div style="font-size:.65rem;color:var(--accent2);margin-bottom:2px">${c.cmd}</div>`).join('');
    return `
      <div class="cmp-card">
        <div class="cmp-title" style="color:${info.tagColor}">${info.path}</div>
        <div class="cmp-path"><span class="panel-tag" style="background:${info.tagColor}18;color:${info.tagColor};border:1px solid ${info.tagColor}40;font-size:.55rem">${info.tag}</span></div>
        <div class="cmp-label">DESCRIPTION</div>
        <div class="cmp-val">${info.desc}</div>
        <div class="cmp-label">ACCESS</div>
        <div style="margin-bottom:10px">${accessBadge}</div>
        <div class="cmp-label">KEY COMMANDS</div>
        <div>${cmds}</div>
      </div>`;
  }

  // Diff rows
  const rows = [
    ['Category',  a.category.toUpperCase(),  b.category.toUpperCase()],
    ['Access',    a.access.join('+'),         b.access.join('+')],
    ['Tag',       a.tag,                      b.tag],
    ['Root write?', a.access.includes('root')&&a.access.length===1?'Yes':'No',
                    b.access.includes('root')&&b.access.length===1?'Yes':'No'],
    ['Commands',  a.commands.length.toString(), b.commands.length.toString()]
  ].map(([label, av, bv]) => {
    const same = av === bv;
    return `<tr>
      <td>${label}</td>
      <td class="${same?'diff-same':'diff-a'}">${av}</td>
      <td class="${same?'diff-same':'diff-b'}">${bv}</td>
    </tr>`;
  }).join('');

  document.getElementById('compare-body').innerHTML = `
    ${card(a, ka)}
    ${card(b, kb)}
    <div class="cmp-diff-row">
      <div class="cmp-label" style="margin-bottom:10px">SIDE-BY-SIDE COMPARISON</div>
      <table class="diff-table">
        <thead><tr><th>ATTRIBUTE</th><th style="color:${a.tagColor}">${a.path}</th><th style="color:${b.tagColor}">${b.path}</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

function closeCompare() { document.getElementById('compare-overlay').classList.remove('show'); }

// ── Cheatsheet ─────────────────────────────────────────────────
function openCheatsheet() {
  const html = Object.entries(nodeInfo).map(([name, info]) => {
    const cmds = info.commands.map(c => `
      <div class="cs-cmd" onclick="copyCmd('${c.cmd.replace(/'/g,"\\'")}')">$ ${c.cmd}</div>
      <div class="cs-cmd-desc">${c.desc}</div>`).join('');
    return `
      <div class="cs-card">
        <div class="cs-title" style="color:${info.tagColor}">${info.path}</div>
        <div class="cs-path"><span style="font-size:.58rem;background:${info.tagColor}18;color:${info.tagColor};border:1px solid ${info.tagColor}40;padding:1px 6px;border-radius:3px">${info.tag}</span></div>
        ${cmds}
      </div>`;
  }).join('');
  document.getElementById('cheatsheet-body').innerHTML = html;
  document.getElementById('cheatsheet-overlay').classList.add('show');
}

function closeCheatsheet() { document.getElementById('cheatsheet-overlay').classList.remove('show'); }

function printCheatsheet() {
  closeCheatsheet();
  setTimeout(() => window.print(), 200);
}

// ── Share Snippet ──────────────────────────────────────────────
function openShare() {
  const explored = exploredSet.size;
  const total    = TOTAL_DIRS;
  const pct      = Math.round(explored/total*100);
  const list     = [...exploredSet].map(n=>nodeInfo[n].path).slice(0,5).join(', ');
  const more     = exploredSet.size > 5 ? ` (+${exploredSet.size-5} more)` : '';
  const grade    = pct>=100?'🏆 Linux Expert':pct>=70?'⭐ Power User':pct>=40?'📚 Learner':'🌱 Getting Started';

  const text = `🐧 Exploring the Linux File System Hierarchy!\n\n` +
    `${grade}\n` +
    `📊 Explored ${explored}/${total} directories (${pct}%)\n` +
    (explored>0 ? `📁 Recently visited: ${list}${more}\n` : '') +
    `\n🔍 Learned about /proc, /etc, /dev and more using this interactive D3.js tree visualizer.\n` +
    `\n#Linux #DevOps #SRE #SysAdmin #LearninPublic`;

  document.getElementById('share-text-box').textContent = text;
  document.getElementById('share-overlay').classList.add('show');
}

function copyShareText() {
  const text = document.getElementById('share-text-box').textContent;
  navigator.clipboard.writeText(text).then(() => showToast('✓ Copied to clipboard!'));
}

function closeShare() { document.getElementById('share-overlay').classList.remove('show'); }

// ── Init ───────────────────────────────────────────────────────
update(root);
resetZoom();
initStats();
handleHash();