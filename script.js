const nodeInfo = {
  "/": {
    path: "/",
    desc: "The root directory is the top-level directory of the entire Linux file system. Everything in Linux starts from here — all files, folders, devices, and processes are under /.",
    tag: "ROOT", tagColor: "#00ff88",
    access: ["root","user"],
    commands: [
      { cmd: "ls /", desc: "List root directory contents" },
      { cmd: "cd /", desc: "Navigate to root" },
      { cmd: "tree /", desc: "Show full directory tree" }
    ],
    who: "All users can read. Only root can write."
  },
  "bin": {
    path: "/bin",
    desc: "Contains essential binary executables (programs) needed by all users. These commands are available even when the system is in single-user mode or when /usr is not mounted.",
    tag: "SYSTEM", tagColor: "#00d4ff",
    access: ["user","root"],
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
    access: ["root"],
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
    access: ["user"],
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
    access: ["root","user"],
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
    access: ["user","root"],
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
    access: ["user","root"],
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
    access: ["root"],
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
    access: ["root"],
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
    tag: "TEMP", tagColor: "#ff6b9d",
    access: ["user","root"],
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
    access: ["root"],
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
    access: ["root"],
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
    access: ["root"],
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
    access: ["root"],
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
    access: ["user","root"],
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
    access: ["root"],
    commands: [
      { cmd: "ls /srv", desc: "List service data" },
      { cmd: "ls /srv/www", desc: "Web server root files" }
    ],
    who: "Root manages. Web/FTP service users read served content."
  }
};

const treeData = {
  name: "/", color: "#00ff88",
  children: [
    {
      name: "bin", color: "#00d4ff",
      children: [
        { name: "ls", color: "#4a9eff" },
        { name: "cp/mv", color: "#4a9eff" }
      ]
    },
    {
      name: "etc", color: "#ffd700",
      children: [
        { name: "passwd", color: "#ffaa33" },
        { name: "fstab", color: "#ffaa33" }
      ]
    },
    {
      name: "home", color: "#00ff88",
      children: [
        { name: "manoj", color: "#33ff99" },
        { name: "alice", color: "#33ff99" }
      ]
    },
    {
      name: "var", color: "#ffd700",
      children: [
        { name: "log", color: "#ffaa33" },
        { name: "www", color: "#ffaa33" }
      ]
    },
    {
      name: "usr", color: "#00d4ff",
      children: [
        {
          name: "bin", color: "#4a9eff",
          children: [
            { name: "python3", color: "#6ab0ff" },
            { name: "git", color: "#6ab0ff" }
          ]
        },
        {
          name: "lib", color: "#4a9eff",
          children: [
            { name: "local", color: "#6ab0ff" },
            { name: "share", color: "#6ab0ff" }
          ]
        }
      ]
    },
    {
      name: "proc", color: "#ff6b9d",
      children: [
        { name: "cpuinfo", color: "#ff8ab0" },
        { name: "meminfo", color: "#ff8ab0" }
      ]
    },
    {
      name: "dev", color: "#ff8c42",
      children: [
        { name: "sda", color: "#ffaa66" },
        { name: "tty", color: "#ffaa66" }
      ]
    },
    {
      name: "boot", color: "#00d4ff",
      children: [
        { name: "vmlinuz", color: "#4a9eff" },
        { name: "grub", color: "#4a9eff" }
      ]
    },
    {
      name: "tmp", color: "#ff6b9d",
      children: [
        { name: "session", color: "#ff8ab0" },
        { name: "cache", color: "#ff8ab0" }
      ]
    },
    {
      name: "root", color: "#00ff88",
      children: [
        { name: ".bashrc", color: "#33ff99" },
        { name: ".ssh", color: "#33ff99" }
      ]
    },
    {
      name: "sbin", color: "#00d4ff",
      children: [
        { name: "fdisk", color: "#4a9eff" },
        { name: "reboot", color: "#4a9eff" }
      ]
    },
    {
      name: "lib", color: "#00d4ff",
      children: [
        { name: "modules", color: "#4a9eff" },
        { name: "systemd", color: "#4a9eff" }
      ]
    },
    {
      name: "mnt", color: "#ff8c42",
      children: [
        { name: "usb", color: "#ffaa66" },
        { name: "nfs", color: "#ffaa66" }
      ]
    },
    {
      name: "opt", color: "#00ff88",
      children: [
        { name: "chrome", color: "#33ff99" },
        { name: "vscode", color: "#33ff99" }
      ]
    }
  ]
};

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

// ─── Tree Layout ─────────────────────────────────────────────────────────────
const treeLayout = d3.tree().size([svgW - 100, svgH - 160]);
let root = d3.hierarchy(treeData);
root.x0 = svgW / 2;
root.y0 = 0;

// Collapse depth-1 children by default
root.children && root.children.forEach(d => {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  }
});

let nodeId = 0;

// ─── Update / Render ─────────────────────────────────────────────────────────
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
    });

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

  nodeUpdate.select("circle").transition().duration(350)
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

// ─── Top-Down Bezier ──────────────────────────────────────────────────────────
function topDownDiag(s, d) {
  return `M ${s.x} ${s.y}
    C ${s.x} ${(s.y + d.y) / 2},
      ${d.x} ${(s.y + d.y) / 2},
      ${d.x} ${d.y}`;
}

// ─── Side Panel ──────────────────────────────────────────────────────────────
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

    const cmdsHTML = info.commands.map(c =>
      `<li><span>${c.cmd}</span><br><span style="color:#4a6a8a;font-size:0.63rem">${c.desc}</span></li>`
    ).join("");

    content.innerHTML = `
      <div class="panel-name" style="color:${color}">${name}</div>
      <div class="panel-path">${info.path}</div>
      <span class="panel-tag" style="background:${color}18;color:${color};border:1px solid ${color}40">${info.tag}</span>
      <div class="panel-section">
        <div class="panel-label">DESCRIPTION</div>
        <div class="panel-text">${info.desc}</div>
      </div>
      <div class="panel-section">
        <div class="panel-label">WHO CAN USE</div>
        <div>${accessHTML}</div>
        <div class="panel-text" style="margin-top:8px">${info.who}</div>
      </div>
      <div class="panel-section">
        <div class="panel-label">COMMON COMMANDS</div>
        <ul class="cmd-list">${cmdsHTML}</ul>
      </div>`;
  }

  panel.classList.add("open");
}

function closePanel() {
  document.getElementById("panel").classList.remove("open");
}

// ─── Controls ────────────────────────────────────────────────────────────────
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

// ─── Init ─────────────────────────────────────────────────────────────────────
update(root);
resetZoom();