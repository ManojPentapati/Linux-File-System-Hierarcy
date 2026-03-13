# 🌲 Linux File System Hierarchy — Interactive Tree Visualizer

> An interactive, animated **D3.js** visualization of the Linux file system hierarchy.  
> Click any node to explore what each directory does, who can access it, and the most useful commands for it.

---

## ✨ Features

- 🌳 **Top-down collapsible tree** — expand/collapse any branch interactively
- 🖱️ **Click-to-inspect panel** — every directory shows its description, access level, and key commands
- 🎨 **Color-coded by category** — User Space, System, Config, Devices, Virtual FS
- 🔍 **Zoom & Pan** — scroll to zoom, drag to pan across the full tree
- ⚡ **Pure front-end** — no build tools, no frameworks, no install needed

---

## 📸 Preview

```
/
├── bin       → Essential binaries (ls, cp, mv, grep …)
├── etc       → System-wide config files (passwd, fstab, hosts …)
├── home      → User home directories (/home/manoj)
├── var       → Variable data — logs, mail spools
├── usr       → Secondary hierarchy — most installed programs live here
├── proc      → Virtual FS — live kernel & process info (RAM only)
├── dev       → Device files — disks, TTYs, /dev/null
├── boot      → Kernel + GRUB bootloader files
├── tmp       → Temp files, cleared on reboot
├── root      → Home dir for the root superuser
├── sbin      → System admin binaries (fdisk, reboot, fsck …)
├── lib       → Shared libraries for /bin and /sbin
├── mnt       → Manual mount points (USB, NFS …)
└── opt       → Optional 3rd-party software (Chrome, VS Code …)
```

---

## 🗂️ Project Structure

```
linux-fs-tree/
│
├── index.html     ← HTML structure (header, controls, legend, SVG canvas, side panel)
├── style.css      ← All styling  (dark theme, glow effects, side panel, badges)
└── script.js      ← All logic    (D3 tree, nodeInfo data, panel rendering, zoom)
```

---

## 🚀 Getting Started

**No install. No build step. Just open and run.**

```bash
# 1. Clone the repo
git clone https://github.com/your-username/linux-fs-tree.git

# 2. Navigate into the folder
cd linux-fs-tree

# 3. Open in browser
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

Or just drag `index.html` into any browser tab.

---

## 🎮 How to Use

| Action | What it does |
|---|---|
| **Click a node** | Expands/collapses its children + opens the detail panel |
| **▼ EXPAND ALL** | Reveals every node in the tree |
| **▲ COLLAPSE ALL** | Collapses back to depth-1 directories |
| **⌂ RESET VIEW** | Resets zoom and pan to the default position |
| **Scroll** | Zoom in / out |
| **Click & Drag** | Pan across the tree |
| **✕ button** | Closes the side detail panel |

---

## 🎨 Color Legend

| Color | Category | Examples |
|---|---|---|
| 🟢 **Green** `#00ff88` | User Space | `/home`, `/opt`, `/root` |
| 🔵 **Cyan** `#00d4ff` | System | `/bin`, `/sbin`, `/usr`, `/lib`, `/boot` |
| 🟡 **Gold** `#ffd700` | Config | `/etc`, `/var`, `/srv` |
| 🟠 **Orange** `#ff8c42` | Devices | `/dev`, `/mnt` |
| 🩷 **Pink** `#ff6b9d` | Virtual FS | `/proc`, `/tmp` |

---

## 🧠 What Each Directory Means

| Directory | Purpose |
|---|---|
| `/` | Root of the entire filesystem — everything starts here |
| `/bin` | Core binaries every user needs (`ls`, `cp`, `cat`, `grep`) |
| `/etc` | System-wide config files — text only, no binaries |
| `/home` | Personal folders for each regular user |
| `/var` | Variable data — log files, mail, print queues |
| `/usr` | Largest dir — most programs, libraries, docs live here |
| `/proc` | Virtual filesystem — real-time kernel & process info (RAM only) |
| `/dev` | Device files — "everything is a file" in Linux |
| `/boot` | Kernel (`vmlinuz`) + GRUB bootloader files |
| `/tmp` | Temp files — auto-deleted on every reboot |
| `/root` | Home directory of the `root` superuser (≠ `/`) |
| `/sbin` | Admin-only binaries (`fdisk`, `reboot`, `fsck`) |
| `/lib` | Shared libraries needed by `/bin` and `/sbin` |
| `/mnt` | Temporary mount point for external drives / NFS |
| `/opt` | Optional third-party software (Chrome, VS Code, etc.) |

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| **HTML5** | Page structure and semantic layout |
| **CSS3** | Dark theme, glow effects, animated side panel |
| **D3.js v7** | Tree layout, node/link rendering, zoom & pan |
| **JetBrains Mono** | Monospace font for that terminal aesthetic |
| **Orbitron** | Title font |

---

## 📖 Why I Built This

Learning Linux filesystem internals is one of those things that looks intimidating on paper but clicks immediately once you *see* the structure. This visualizer was built as part of my **DevOps learning path** (Linux → Git → Docker → Kubernetes → CI/CD → AWS) to make the hierarchy memorable and interview-ready.

> Every directory here has a reason to exist — and knowing *why* separates a user from a sysadmin.

---

## 🔗 Related Resources

- [Linux Filesystem Hierarchy Standard (FHS)](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html)
- [The Linux Command Line — William Shotts (free PDF)](https://linuxcommand.org/tlcl.php)
- [KodeKloud Free Linux Labs](https://kodekloud.com/courses/the-linux-basics-course/)
- [D3.js Documentation](https://d3js.org/)

---

## 📄 License

MIT — free to use, modify, and share.

---

<div align="center">
  Made with 💚 while learning Linux & DevOps
</div>