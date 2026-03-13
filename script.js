// ─── Node Info Data ───────────────────────────────────────────────────────────
const nodeInfo = {
  "/": {
    path: "/",
    desc: "The root directory is the top-level directory of the entire Linux file system. Everything in Linux starts from here — all files, folders, devices, and processes are under /.",
    tag: "ROOT", tagColor: "#00ff88",
    category: "system",
    access: ["root","user"],
    related: ["bin","etc","usr","home"],
    funFact: "Every path in Linux starts with /. There is no C:\\ — just one unified tree.",
    commands: [
      { cmd: "ls /", desc: "List root directory contents" },
      { cmd: "cd /", desc: "Navigate to root" },
      { cmd: "tree / -L 1", desc: "Show first-level tree" }
    ],
    who: "All users can read. Only root can write."
  },
  "bin": {
    path: "/bin",
    desc: "Contains essential binary executables (programs) needed by all users. These commands are available even when the system is in single-user mode or when /usr is not mounted.",
    tag: "SYSTEM", tagColor: "#00d4ff",
    category: "system",
    access: ["user","root"],
    related: ["sbin","usr","lib"],
    funFact: "On modern systems, /bin is often a symlink to /usr/bin for FHS compliance.",
    commands: [
      { cmd: "ls", desc: "List files in a directory" },
      { cmd: "cp", desc: "Copy files or directories" },
      { cmd: "mv", desc: "Move or rename files" },
      { cmd: "rm", desc: "Remove/delete files" },
      { cmd: "cat", desc: "Display file contents" },
      { cmd: "grep", desc: "Search text in files" },
      { cmd: "chmod", desc: "Change file permissions" }
    ],
    who: "All users can execute. Root can modify binaries."
  },
  "etc": {
    path: "/etc",
    desc: "Stores system-wide configuration files. These are plain text files that control how the OS and installed services behave. No binaries here — only config files.",
    tag: "CONFIG", tagColor: "#ffd700",
    category: "config",
    access: ["root"],
    related: ["var","srv"],
    funFact: "'etc' originally stood for 'et cetera' — it was the leftover place for files that didn't fit elsewhere.",
    commands: [
      { cmd: "cat /etc/passwd", desc: "View user accounts" },
      { cmd: "cat /etc/hostname", desc: "View system hostname" },
      { cmd: "nano /etc/hosts", desc: "Edit hosts file (root)" },
      { cmd: "cat /etc/fstab", desc: "View filesystem mounts" }
    ],
    who: "All users can READ. Only root can WRITE/MODIFY config files."
  },
  "home": {
    path: "/home",
    desc: "Contains personal directories for each regular user. Each user gets their own folder (e.g., /home/manoj) to store personal files, documents, downloads, config files, and scripts.",
    tag: "USER", tagColor: "#00ff88",
    category: "user",
    access: ["user"],
    related: ["root","tmp"],
    funFact: "The ~ shortcut always expands to your home directory: /home/yourusername.",
    commands: [
      { cmd: "cd ~", desc: "Go to your home directory" },
      { cmd: "ls /home", desc: "List all users" },
      { cmd: "ls -la ~/", desc: "List hidden files in home" },
      { cmd: "pwd", desc: "Print current directory" }
    ],
    who: "Each user owns and controls their own /home/username folder."
  },
  "var": {
    path: "/var",
    desc: "Holds variable data — files whose content is constantly changing during normal operation. Includes log files, database files, mail spools, and print queues.",
    tag: "CONFIG", tagColor: "#ffd700",
    category: "config",
    access: ["root","user"],
    related: ["etc","tmp","srv"],
    funFact: "If your disk fills up, /var/log is usually the first place to check — logs can grow huge fast.",
    commands: [
      { cmd: "tail -f /var/log/syslog", desc: "Watch system logs live" },
      { cmd: "ls /var/log", desc: "List all log files" },
      { cmd: "cat /var/log/auth.log", desc: "View authentication logs" }
    ],
    who: "Logs readable by all. Writing requires root or service account."
  },
  "usr": {
    path: "/usr",
    desc: "The secondary hierarchy. Contains the majority of user utilities, applications, libraries, documentation, and source code. This is the largest directory on most Linux systems.",
    tag: "SYSTEM", tagColor: "#00d4ff",
    category: "system",
    access: ["user","root"],
    related: ["bin","lib","opt"],
    funFact: "/usr was originally 'user', then 'unix system resources'. Today it holds most installed programs.",
    commands: [
      { cmd: "ls /usr/bin", desc: "List installed user programs" },
      { cmd: "ls /usr/lib", desc: "List shared libraries" },
      { cmd: "which python3", desc: "Find where python3 is installed" }
    ],
    who: "All users can read/execute. Only root or package manager can install."
  },
  "proc": {
    path: "/proc",
    desc: "A virtual filesystem that doesn't exist on disk — it's created in RAM by the kernel. Contains real-time info about running processes, CPU, memory, and kernel parameters.",
    tag: "VIRTUAL", tagColor: "#ff6b9d",
    category: "virtual",
    access: ["user","root"],
    related: ["dev","sys","tmp"],
    funFact: "Every running process has a folder at /proc/[PID]. Try: ls /proc/$$ to see your shell's info.",
    commands: [
      { cmd: "cat /proc/cpuinfo", desc: "View CPU details" },
      { cmd: "cat /proc/meminfo", desc: "View memory usage" },
      { cmd: "cat /proc/version", desc: "View kernel version" },
      { cmd: "ls /proc/$$", desc: "View current process info" }
    ],
    who: "All users can read. Some entries require root to modify."
  },
  "dev": {
    path: "/dev",
    desc: "Contains device files that represent hardware and virtual devices. In Linux, everything is treated as a file — hard drives, USB, terminals are all files here.",
    tag: "DEVICES", tagColor: "#ff8c42",
    category: "devices",
    access: ["root"],
    related: ["proc","mnt","sys"],
    funFact: "/dev/null is the 'black hole' of Linux — anything written to it disappears. Perfect for silencing noisy commands.",
    commands: [
      { cmd: "ls /dev", desc: "List all device files" },
      { cmd: "lsblk", desc: "List block devices (disks)" },
      { cmd: "cat /dev/null", desc: "The null device (empty output)" },
      { cmd: "fdisk -l", desc: "List disk partitions (root)" }
    ],
    who: "Most device files require root. /dev/null, /dev/zero open to all."
  },
  "boot": {
    path: "/boot",
    desc: "Contains the files needed to boot the system — the Linux kernel (vmlinuz), initial RAM disk (initrd), and GRUB bootloader configuration files.",
    tag: "SYSTEM", tagColor: "#00d4ff",
    category: "system",
    access: ["root"],
    related: ["lib","sbin"],
    funFact: "The kernel image is named vmlinuz — 'vm' stands for virtual memory, 'z' means it's compressed.",
    commands: [
      { cmd: "ls /boot", desc: "List boot files" },
      { cmd: "uname -r", desc: "Show running kernel version" },
      { cmd: "cat /boot/grub/grub.cfg", desc: "View GRUB config (root)" }
    ],
    who: "All users can READ. Only root can modify bootloader and kernel files."
  },
  "tmp": {
    path: "/tmp",
    desc: "Temporary files created by applications and users. Contents are automatically cleared on every system reboot. Any user can create files here.",
    tag: "VIRTUAL", tagColor: "#ff6b9d",
    category: "virtual",
    access: ["user","root"],
    related: ["var","home","proc"],
    funFact: "On systems with systemd, /tmp may be a tmpfs — meaning it lives entirely in RAM for speed.",
    commands: [
      { cmd: "ls /tmp", desc: "List temp files" },
      { cmd: "touch /tmp/test.txt", desc: "Create a temp file" },
      { cmd: "df -h /tmp", desc: "Check tmp disk usage" }
    ],
    who: "All users can create/delete their own files. Cleared on reboot."
  },
  "root": {
    path: "/root",
    desc: "The home directory of the root (superuser) account. NOT the same as / (root of filesystem). This is where root's personal files, scripts, and configs are stored.",
    tag: "USER", tagColor: "#00ff88",
    category: "user",
    access: ["root"],
    related: ["home","etc","sbin"],
    funFact: "Root's home is /root not /home/root — to prevent a corrupted /home from locking out the admin.",
    commands: [
      { cmd: "sudo su", desc: "Switch to root user" },
      { cmd: "sudo -i", desc: "Start root shell session" },
      { cmd: "ls /root", desc: "List root's files (need sudo)" }
    ],
    who: "ONLY root user can access this directory."
  },
  "sbin": {
    path: "/sbin",
    desc: "System binaries — essential programs used by the system administrator (root) for system maintenance, repair, and administration tasks.",
    tag: "SYSTEM", tagColor: "#00d4ff",
    category: "system",
    access: ["root"],
    related: ["bin","boot","lib"],
    funFact: "On modern Debian/Ubuntu systems, /sbin is a symlink to /usr/sbin — the merge simplifies the FHS.",
    commands: [
      { cmd: "fdisk", desc: "Disk partition manager" },
      { cmd: "ifconfig", desc: "Network interface config" },
      { cmd: "reboot", desc: "Restart the system" },
      { cmd: "fsck", desc: "Filesystem check & repair" }
    ],
    who: "Executed by root or sudo. Regular users have no access."
  },
  "lib": {
    path: "/lib",
    desc: "Essential shared libraries and kernel modules required by programs in /bin and /sbin. Like DLLs in Windows — these are loaded when programs run.",
    tag: "SYSTEM", tagColor: "#00d4ff",
    category: "system",
    access: ["root"],
    related: ["bin","sbin","usr"],
    funFact: "Use `ldd /bin/ls` to see all the shared libraries that the ls command loads at runtime.",
    commands: [
      { cmd: "ls /lib", desc: "List shared libraries" },
      { cmd: "ldd /bin/ls", desc: "Show libraries used by ls" },
      { cmd: "ldconfig", desc: "Refresh library cache (root)" }
    ],
    who: "All users can use (indirectly via programs). Only root can modify."
  },
  "mnt": {
    path: "/mnt",
    desc: "A generic mount point for temporarily mounting filesystems — external drives, network shares (NFS), USB drives. Admins use this for manual mounts.",
    tag: "DEVICES", tagColor: "#ff8c42",
    category: "devices",
    access: ["root"],
    related: ["dev","media","opt"],
    funFact: "In WSL (Windows Subsystem for Linux), your Windows drives (C:, D:) appear at /mnt/c and /mnt/d.",
    commands: [
      { cmd: "mount /dev/sdb1 /mnt", desc: "Mount a disk here (root)" },
      { cmd: "umount /mnt", desc: "Unmount (root)" },
      { cmd: "df -h", desc: "View mounted filesystems" }
    ],
    who: "Root mounts filesystems. Users can access files after mounting."
  },
  "opt": {
    path: "/opt",
    desc: "Optional software — third-party applications that are not part of the default OS installation (e.g., Google Chrome, VS Code, custom enterprise software).",
    tag: "USER", tagColor: "#00ff88",
    category: "user",
    access: ["user","root"],
    related: ["usr","home","srv"],
    funFact: "Many enterprise tools like Oracle, JIRA, and custom company software install to /opt to stay isolated.",
    commands: [
      { cmd: "ls /opt", desc: "List installed optional software" },
      { cmd: "ls /opt/google/chrome", desc: "Example: Chrome location" }
    ],
    who: "All users can run programs. Root installs software here."
  },
  "srv": {
    path: "/srv",
    desc: "Service data — data served by the system. Web server files, FTP files go here. For example, Apache may serve files from /srv/www or /srv/http.",
    tag: "CONFIG", tagColor: "#ffd700",
    category: "config",
    access: ["root"],
    related: ["etc","var","opt"],
    funFact: "/srv is defined by FHS but many distros still use /var/www for web roots — it's a naming convention battle.",
    commands: [
      { cmd: "ls /srv", desc: "List service data" },
      { cmd: "ls /srv/www", desc: "Web server root files" }
    ],
    who: "Root manages. Web/FTP service users read served content."
  }
};

// ─── Quiz Questions ──────────────────────────────────────────────────────────
const quizQuestions = [
  { q: "Which directory stores system-wide configuration files?", answer: "/etc", options: ["/etc", "/var", "/usr", "/opt"] },
  { q: "Where are log files typically found in Linux?", answer: "/var/log", options: ["/etc/log", "/var/log", "/tmp/log", "/proc/log"] },
  { q: "Which directory contains essential binaries available to ALL users?", answer: "/bin", options: ["/sbin", "/usr/bin", "/bin", "/opt"] },
  { q: "What kind of filesystem is /proc?", answer: "Virtual (RAM-based)", options: ["Disk-based", "Virtual (RAM-based)", "Network filesystem", "Encrypted filesystem"] },
  { q: "Which directory is the home of the root superuser?", answer: "/root", options: ["/", "/home/root", "/root", "/etc/root"] },
  { q: "What is /dev/null used for?", answer: "Discarding output (black hole)", options: ["Storing device drivers", "Discarding output (black hole)", "Null pointer references", "Debugging device files"] },
  { q: "Which directory should 3rd-party software like Chrome be installed to?", answer: "/opt", options: ["/bin", "/usr", "/opt", "/home"] },
  { q: "Where does the kernel image (vmlinuz) live?", answer: "/boot", options: ["/boot", "/lib", "/usr/kernel", "/sbin"] },
  { q: "Which directory stores shared libraries needed by /bin and /sbin?", answer: "/lib", options: ["/usr/lib", "/lib", "/var/lib", "/etc/lib"] },
  { q: "In WSL (Windows Subsystem for Linux), where are Windows drives mounted?", answer: "/mnt", options: ["/windows", "/media", "/mnt", "/drive"] },
  { q: "Which directory holds variable data that changes during system operation?", answer: "/var", options: ["/etc", "/tmp", "/var", "/usr"] },
  { q: "What does /tmp have in common with /proc?", answer: "Both can be RAM-based (tmpfs)", options: ["Both are root-only", "Both can be RAM-based (tmpfs)", "Both store system logs", "Both are read-only"] },
  { q: "Which directory contains programs only sysadmins (root) should run?", answer: "/sbin", options: ["/bin", "/usr/bin", "/sbin", "/root/bin"] },
  { q: "Where do web server files typically live on a server?", answer: "/srv or /var/www", options: ["/www", "/home/www", "/srv or /var/www", "/opt/web"] },
  { q: "The ~ shortcut expands to which path?", answer: "/home/yourusername", options: ["/root", "/home/yourusername", "/home", "/usr/home"] }
];

// ─── Tree Data ────────────────────────────────────────────────────────────────
const treeData = {
  name: "/", color: "#00ff88",
  children: [
    { name: "bin", color: "#00d4ff", children: [{ name: "ls", color: "#4a9eff" }, { name: "cp/mv", color: "#4a9eff" }] },
    { name: "etc", color: "#ffd700", children: [{ name: "passwd", color: "#ffaa33" }, { name: "fstab", color: "#ffaa33" }] },
    { name: "home", color: "#00ff88", children: [{ name: "manoj", color: "#33ff99" }, { name: "alice", color: "#33ff99" }] },
    { name: "var", color: "#ffd700", children: [{ name: "log", color: "#ffaa33" }, { name: "www", color: "#ffaa33" }] },
    {
      name: "usr", color: "#00d4ff",
      children: [
        { name: "bin", color: "#4a9eff", children: [{ name: "python3", color: "#6ab0ff" }, { name: "git", color: "#6ab0ff" }] },
        { name: "lib", color: "#4a9eff", children: [{ name: "local", color: "#6ab0ff" }, { name: "share", color: "#6ab0ff" }] }
      ]
    },
    { name: "proc", color: "#ff6b9d", children: [{ name: "cpuinfo", color: "#ff8ab0" }, { name: "meminfo", color: "#ff8ab0" }] },
    { name: "dev", color: "#ff8c42", children: [{ name: "sda", color: "#ffaa66" }, { name: "tty", color: "#ffaa66" }, { name: "null", color: "#ffaa66" }] },
    { name: "boot", color: "#00d4ff", children: [{ name: "vmlinuz", color: "#4a9eff" }, { name: "grub", color: "#4a9eff" }] },
    { name: "tmp", color: "#ff6b9d", children: [{ name: "session", color: "#ff8ab0" }, { name: "cache", color: "#ff8ab0" }] },
    { name: "root", color: "#00ff88", children: [{ name: ".bashrc", color: "#33ff99" }, { name: ".ssh", color: "#33ff99" }] },
    { name: "sbin", color: "#00d4ff", children: [{ name: "fdisk", color: "#4a9eff" }, { name: "reboot", color: "#4a9eff" }] },
    { name: "lib", color: "#00d4ff", children: [{ name: "modules", color: "#4a9eff" }, { name: "systemd", color: "#4a9eff" }] },
    { name: "mnt", color: "#ff8c42", children: [{ name: "usb", color: "#ffaa66" }, { name: "nfs", color: "#ffaa66" }] },
    { name: "opt", color: "#00ff88", children: [{ name: "chrome", color: "#33ff99" }, { name: "vscode", color: "#33ff99" }] }
  ]
};

// ─── Stats Counting ───────────────────────────────────────────────────────────
function animateCount(el, target) {
  let count = 0;
  const step = Math.ceil(target / 25);
  const interval = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count;
    if (count >= target) clearInterval(interval);
  }, 40);
}

function initStats() {
  const dirs = Object.values(nodeInfo);
  animateCount(document.getElementById('stat-total'), dirs.length);
  animateCount(document.getElementById('stat-root-only'), dirs.filter(d => d.access.length === 1 && d.access[0] === 'root').length);
  animateCount(document.getElementById('stat-user'), dirs.filter(d => d.access.includes('user')).length);
  animateCount(document.getElementById('stat-virtual'), dirs.filter(d => d.category === 'virtual').length);
}

// ─── Toast ────────────────────────────────────────────────────────────────────
let toastTimer = null;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2000);
}

// ─── Search ───────────────────────────────────────────────────────────────────
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const searchClear = document.getElementById('search-clear');

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  searchClear.style.display = q ? 'block' : 'none';
  if (!q) { searchResults.innerHTML = ''; return; }

  const matches = Object.entries(nodeInfo).filter(([name, info]) =>
    name.toLowerCase().includes(q) ||
    info.desc.toLowerCase().includes(q) ||
    info.tag.toLowerCase().includes(q) ||
    (info.funFact && info.funFact.toLowerCase().includes(q))
  );

  if (matches.length === 0) {
    searchResults.innerHTML = `<div style="padding:10px 14px;color:#3a5a7a;font-size:0.68rem;">No results for "${q}"</div>`;
    return;
  }

  searchResults.innerHTML = matches.slice(0, 6).map(([name, info]) => `
    <div class="search-result-item" onclick="highlightNode('${name}')">
      <div class="sri-dot" style="background:${info.tagColor}"></div>
      <div>
        <div class="sri-name">${info.path}</div>
        <div class="sri-desc">${info.desc.slice(0, 70)}…</div>
      </div>
    </div>
  `).join('');
});

function clearSearch() {
  searchInput.value = '';
  searchResults.innerHTML = '';
  searchClear.style.display = 'none';
  g.selectAll('.node').classed('dimmed', false);
  g.selectAll('.link').classed('dimmed', false);
}

function highlightNode(name) {
  searchResults.innerHTML = '';
  searchInput.value = '';
  searchClear.style.display = 'none';
  showPanel(name, nodeInfo[name]?.tagColor || '#00d4ff');
  // Expand all so the node is visible, then scroll/zoom to it
  expandAll();
  setTimeout(() => {
    const nodes = g.selectAll('.node');
    nodes.each(function(d) {
      if (d.data.name === name) {
        const transform = d3.zoomIdentity.translate(svgW / 2 - d.x, 150 - d.y).scale(1.2);
        svg.transition().duration(600).call(zoom.transform, transform);
      }
    });
  }, 400);
}

// ─── Filter by category ───────────────────────────────────────────────────────
let activeFilter = null;
function filterByCategory(cat) {
  activeFilter = cat;
  if (!cat) {
    g.selectAll('.node').classed('dimmed', false);
    g.selectAll('.link').classed('dimmed', false);
    return;
  }
  g.selectAll('.node').classed('dimmed', d => {
    const info = nodeInfo[d.data.name];
    if (!info) return true;
    return info.category !== cat;
  });
  g.selectAll('.link').classed('dimmed', d => {
    const info = nodeInfo[d.target.data.name];
    if (!info) return true;
    return info.category !== cat;
  });
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
function updateBreadcrumb(name) {
  const info = nodeInfo[name];
  if (info) {
    document.getElementById('breadcrumb-text').textContent =
      `SELECTED: ${info.path}  ·  ${info.tag}  ·  ${info.category.toUpperCase()}`;
  }
}

// ─── SVG Setup ───────────────────────────────────────────────────────────────
const svgW = Math.max(window.innerWidth, 1200);
const svgH = 700;

const svg = d3.select("#svg-container")
  .append("svg")
  .attr("width", svgW)
  .attr("height", svgH);

const g = svg.append("g");

const zoom = d3.zoom().scaleExtent([0.2, 3])
  .on("zoom", e => g.attr("transform", e.transform));
svg.call(zoom);

const treeLayout = d3.tree().size([svgW - 100, svgH - 160]);
let root = d3.hierarchy(treeData);
root.x0 = svgW / 2;
root.y0 = 0;

root.children && root.children.forEach(d => {
  if (d.children) { d._children = d.children; d.children = null; }
});

let nodeId = 0;

// ─── Update / Render ──────────────────────────────────────────────────────────
function update(source) {
  const treeNodes = treeLayout(root);
  const nodes = treeNodes.descendants();
  const links = treeNodes.links();

  nodes.forEach(d => { d.y = d.depth * 130 + 60; });

  // LINKS
  const link = g.selectAll(".link").data(links, d => d.target.id);

  const linkEnter = link.enter().insert("path", "g")
    .attr("class", "link")
    .attr("stroke", d => d.target.data.color || "#2a4a6a")
    .attr("d", () => {
      const o = { x: source.x0, y: source.y0 };
      return topDownDiag(o, o);
    });

  linkEnter.merge(link).transition().duration(350)
    .attr("d", d => topDownDiag(d.source, d.target))
    .attr("stroke", d => d.target.data.color || "#2a4a6a");

  link.exit().transition().duration(350)
    .attr("d", () => {
      const o = { x: source.x, y: source.y };
      return topDownDiag(o, o);
    }).remove();

  // NODES
  const node = g.selectAll(".node").data(nodes, d => d.id || (d.id = ++nodeId));

  const nodeEnter = node.enter().append("g")
    .attr("class", "node")
    .attr("transform", () => `translate(${source.x0},${source.y0})`)
    .on("click", (e, d) => {
      if (d.children) { d._children = d.children; d.children = null; }
      else { d.children = d._children; d._children = null; }
      update(d);
      showPanel(d.data.name, d.data.color);
      updateBreadcrumb(d.data.name);
      if (activeFilter) filterByCategory(activeFilter);
    });

  // Pulse ring for root only
  nodeEnter.filter(d => d.depth === 0)
    .append("circle")
    .attr("class", "node-root-ring")
    .attr("r", 30);

  nodeEnter.append("circle")
    .attr("r", 0)
    .attr("fill", d => d._children ? d.data.color + "30" : "#0d1829")
    .attr("stroke", d => d.data.color)
    .style("filter", d => `drop-shadow(0 0 5px ${d.data.color}88)`);

  nodeEnter.append("text")
    .attr("dy", d => d.depth === 0 ? -18 : (d.children || d._children ? -16 : 18))
    .attr("text-anchor", "middle")
    .attr("fill", d => d.data.color)
    .attr("font-size", d => d.depth === 0 ? "13px" : "11px")
    .attr("font-weight", "700")
    .text(d => d.data.name)
    .attr("opacity", 0);

  const nodeUpdate = nodeEnter.merge(node);

  nodeUpdate.transition().duration(350)
    .attr("transform", d => `translate(${d.x},${d.y})`);

  nodeUpdate.select("circle:not(.node-root-ring)").transition().duration(350)
    .attr("r", d => d.depth === 0 ? 18 : d.depth === 1 ? 13 : 8)
    .attr("fill", d => d._children ? d.data.color + "25" : "#0d1829")
    .attr("stroke", d => d.data.color);

  nodeUpdate.select("text").transition().duration(350)
    .attr("opacity", 1)
    .attr("dy", d => (d.children || d._children) ? -18 : (d.depth === 0 ? -22 : 20));

  node.exit().transition().duration(350)
    .attr("transform", () => `translate(${source.x},${source.y})`)
    .remove()
    .select("circle").attr("r", 0);

  nodes.forEach(d => { d.x0 = d.x; d.y0 = d.y; });
}

function topDownDiag(s, d) {
  return `M ${s.x} ${s.y}
    C ${s.x} ${(s.y + d.y) / 2},
      ${d.x} ${(s.y + d.y) / 2},
      ${d.x} ${d.y}`;
}

// ─── Side Panel ───────────────────────────────────────────────────────────────
function showPanel(name, color) {
  const info = nodeInfo[name];
  const panel = document.getElementById("panel");
  const content = document.getElementById("panel-content");

  if (!info) {
    content.innerHTML = `
      <div class="panel-name" style="color:${color}">${name}</div>
      <div class="panel-path" style="color:#3a5a7a">sub-entry</div>
      <div class="panel-section">
        <div class="panel-label">DESCRIPTION</div>
        <div class="panel-text">This is a file or sub-directory inside a parent directory. Click a parent node for full details.</div>
      </div>`;
  } else {
    const accessHTML = info.access.map(a => {
      if (a === "root") return `<span class="access-badge badge-root">🔴 ROOT ONLY</span>`;
      if (a === "user") return `<span class="access-badge badge-user">🟢 ALL USERS</span>`;
      return `<span class="access-badge badge-both">🟡 ${a.toUpperCase()}</span>`;
    }).join("");

    const cmdsHTML = info.commands.map(c => `
      <li onclick="copyCmd('${c.cmd.replace(/'/g, "\\'")}')">
        <div class="cmd-text-col">
          <span>${c.cmd}</span><br>
          <span style="color:#4a6a8a;font-size:0.63rem">${c.desc}</span>
        </div>
        <button class="copy-btn" title="Copy command">⎘</button>
      </li>
    `).join("");

    const relatedHTML = (info.related || []).map(r =>
      `<span class="related-tag" onclick="highlightNode('${r}')">/${r}</span>`
    ).join('');

    const funFactHTML = info.funFact ? `
      <div class="panel-section">
        <div class="panel-label">💡 FUN FACT</div>
        <div class="panel-text" style="color:#7a9ab0;font-style:italic">${info.funFact}</div>
      </div>` : '';

    content.innerHTML = `
      <div class="panel-name" style="color:${color}">${name}</div>
      <div class="panel-path">${info.path}</div>
      <span class="panel-tag" style="background:${color}18;color:${color};border:1px solid ${color}40">${info.tag}</span>
      <div class="panel-section">
        <div class="panel-label">DESCRIPTION</div>
        <div class="panel-text">${info.desc}</div>
      </div>
      ${funFactHTML}
      <div class="panel-section">
        <div class="panel-label">WHO CAN USE</div>
        <div>${accessHTML}</div>
        <div class="panel-text" style="margin-top:8px">${info.who}</div>
      </div>
      <div class="panel-section">
        <div class="panel-label">COMMON COMMANDS <span style="color:#2a4a6a;font-size:0.55rem">· click to copy</span></div>
        <ul class="cmd-list">${cmdsHTML}</ul>
      </div>
      ${relatedHTML ? `<div class="panel-section">
        <div class="panel-label">RELATED DIRECTORIES</div>
        <div class="related-grid">${relatedHTML}</div>
      </div>` : ''}
    `;
  }

  panel.classList.add("open");
}

function closePanel() {
  document.getElementById("panel").classList.remove("open");
}

function copyCmd(cmd) {
  navigator.clipboard.writeText(cmd).then(() => showToast(`Copied: ${cmd}`));
}

// ─── Controls ─────────────────────────────────────────────────────────────────
function expandAll() {
  root.each(d => { if (d._children) { d.children = d._children; d._children = null; } });
  update(root);
}

function collapseAll() {
  root.children && root.children.forEach(d => {
    if (d.children) { d._children = d.children; d.children = null; }
  });
  update(root);
}

function resetZoom() {
  svg.transition().duration(400)
    .call(zoom.transform, d3.zoomIdentity.translate(0, 30).scale(1));
}

// ─── Quiz Mode ────────────────────────────────────────────────────────────────
let quizState = { questions: [], index: 0, score: 0, streak: 0, answered: false };

function startQuiz() {
  quizState.questions = [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
  quizState.index = 0;
  quizState.score = 0;
  quizState.streak = 0;
  document.getElementById('quiz-total').textContent = quizState.questions.length;
  document.getElementById('quiz-overlay').classList.add('show');
  renderQuestion();
}

function renderQuestion() {
  const q = quizState.questions[quizState.index];
  quizState.answered = false;
  document.getElementById('quiz-qnum').textContent = quizState.index + 1;
  document.getElementById('quiz-score').textContent = quizState.score;
  document.getElementById('quiz-streak').textContent = quizState.streak;
  document.getElementById('quiz-progress-fill').style.width =
    (quizState.index / quizState.questions.length * 100) + '%';
  document.getElementById('quiz-question').textContent = q.q;
  document.getElementById('quiz-feedback').textContent = '';
  document.getElementById('quiz-next').style.display = 'none';

  const opts = [...q.options].sort(() => Math.random() - 0.5);
  document.getElementById('quiz-options').innerHTML = opts.map(o =>
    `<button class="quiz-opt" onclick="answerQuiz(this, '${o.replace(/'/g,"\\'")}', '${q.answer.replace(/'/g,"\\'")}', '${q.q.replace(/'/g, "\\'")}')">${o}</button>`
  ).join('');
}

function answerQuiz(btn, chosen, answer, question) {
  if (quizState.answered) return;
  quizState.answered = true;

  document.querySelectorAll('.quiz-opt').forEach(b => b.classList.add('answered'));

  if (chosen === answer) {
    btn.classList.add('correct');
    quizState.score++;
    quizState.streak++;
    document.getElementById('quiz-feedback').innerHTML =
      `✅ Correct! ${quizState.streak > 1 ? `🔥 ${quizState.streak} streak!` : ''}`;
  } else {
    btn.classList.add('wrong');
    quizState.streak = 0;
    document.querySelectorAll('.quiz-opt').forEach(b => {
      if (b.textContent === answer) b.classList.add('correct');
    });
    document.getElementById('quiz-feedback').innerHTML = `❌ Correct answer: <strong style="color:#00ff88">${answer}</strong>`;
  }

  document.getElementById('quiz-score').textContent = quizState.score;
  document.getElementById('quiz-streak').textContent = quizState.streak;
  document.getElementById('quiz-next').style.display = 'block';
}

function nextQuestion() {
  quizState.index++;
  if (quizState.index >= quizState.questions.length) {
    endQuiz();
  } else {
    renderQuestion();
  }
}

function endQuiz() {
  const total = quizState.questions.length;
  const pct = Math.round(quizState.score / total * 100);
  const grade = pct >= 90 ? '🏆 Expert' : pct >= 70 ? '⭐ Solid' : pct >= 50 ? '📚 Learning' : '🔄 Keep Practicing';
  document.getElementById('quiz-progress-fill').style.width = '100%';
  document.getElementById('quiz-options').innerHTML = '';
  document.getElementById('quiz-next').style.display = 'none';
  document.getElementById('quiz-feedback').textContent = '';
  document.getElementById('quiz-question').innerHTML = `
    <div style="text-align:center;padding:10px 0">
      <div style="font-size:2rem;margin-bottom:10px">${grade}</div>
      <div style="color:#00ff88;font-size:1.4rem;font-family:'Orbitron',monospace">${quizState.score}/${total}</div>
      <div style="color:#5a8aaa;margin-top:8px;font-size:0.75rem">${pct}% — ${grade.split(' ')[1]}</div>
      <button onclick="startQuiz()" style="margin-top:18px;width:100%;background:rgba(0,255,136,0.1);border-color:#00ff88;color:#00ff88">
        🔄 RETRY QUIZ
      </button>
    </div>
  `;
}

function exitQuiz() {
  document.getElementById('quiz-overlay').classList.remove('show');
}

// ─── Init ─────────────────────────────────────────────────────────────────────
update(root);
resetZoom();
initStats();