# 🌲 Linux File System Hierarchy — Interactive Tree Visualizer

> An interactive, animated **D3.js** visualization of the Linux file system hierarchy.
> Click any node to explore what each directory does, who can access it, and the most useful commands for it.

---

## ✨ Features

### 🌳 Tree Visualization
- **Root-first reveal** — only `/` is shown at start; click it to expand depth-1 directories, then click any directory to reveal its children
- **Zero-collision layout** — uses `d3.tree().nodeSize()` so node labels never overlap, no matter how many branches are open
- **Fixed position tree** — the tree stays locked in place; no accidental pan or drag
- **Smooth animations** — branches expand and collapse with 400ms transitions
- **Pulsing root node** — animated ring on `/` draws the eye to start

### 🖱️ Click-to-Inspect Panel
- Every directory opens a side panel with description, fun fact, access level, and key commands
- **Copy-to-clipboard** — click any command to instantly copy it, with a toast confirmation
- **Related directories** — clickable tags jump to connected nodes
- Panel slides in from the right without disturbing the tree

### 🔍 Search
- **Fuzzy search** — finds results even with typos (e.g. type "prc" to find `/proc`)
- **⌘K / Ctrl+K** shortcut to focus the search bar instantly
- Results show path, category color dot, and description preview
- Clicking a result auto-expands the tree and highlights the matching node

### 🎨 Theme & Display
- **Dark / Light theme toggle** — full CSS variable system, one-click switch
- **Color-coded categories** — User Space, System, Config, Devices, Virtual FS
- **Clickable legend filters** — click any category to dim unrelated nodes
- **Export SVG** — downloads the current tree as a clean `.svg` file

### 🎯 Quiz Mode
- 10 randomized questions drawn from a bank of 15
- Multiple-choice with instant feedback
- Streak counter and score tracking
- Final grade: Expert / Solid / Learning / Keep Practicing
- Retry button to reshuffle and go again

### ⏱ Interview Mode
- Timed flashcard drill covering all 15+ directories plus conceptual questions
- **10-second animated countdown ring** per card
- Self-rate each answer: ✅ Got it / 🤔 Shaky / ❌ Missed
- End-of-session breakdown so you know exactly what to review
- Auto-reveals answer when the timer runs out

### ⇄ Compare Mode
- Side-by-side comparison of any two directories
- Dropdown selectors for both sides
- Diff table highlights Category, Access, Tag, Root-write status, Command count
- Differences shown in color; matching values dimmed

### 📋 Command Cheatsheet
- One-page grid of every directory and its key commands
- Click any command to copy it
- **Print button** — opens browser print dialog with a clean print stylesheet (3-column grid, white background)

### ↗ Share Progress
- Generates a ready-to-post LinkedIn/Twitter snippet showing your exploration stats and grade
- One-click copy to clipboard

### 🏆 Progress Tracker
- Tracks which of the 15 directories you've visited this session
- Animated counter in the header badge and stats bar
- Achievement toast when you explore all 15

### ⌨️ Keyboard Navigation
- `← →` move between parent and child nodes
- `↑ ↓` move between siblings
- `Enter` open the info panel for the focused node
- `Esc` close any open panel or modal

### 🔗 URL Hash Routing
- Every node click updates the URL to `#/etc`, `#/proc`, etc.
- Share the link and it opens directly on that directory

### 📊 Animated Stats Bar
- Counts up on load: total directories, root-only, user-accessible, virtual FS, explored

---

## 📸 Tree Structure

```
/                        ← Click to expand
├── bin   (System)       → ls, cp, mv, grep …
├── etc   (Config)       → passwd, fstab, hosts …
├── home  (User)         → /home/manoj, /home/alice
├── var   (Config)       → log/, www/
├── usr   (System)       → bin/ (python3, git), lib/ (local, share)
├── proc  (Virtual FS)   → cpuinfo, meminfo
├── dev   (Devices)      → sda, tty, null
├── boot  (System)       → vmlinuz, grub/
├── tmp   (Virtual FS)   → session, cache
├── root  (User)         → .bashrc, .ssh/
├── sbin  (System)       → fdisk, reboot
├── lib   (System)       → modules/, systemd/
├── mnt   (Devices)      → usb/, nfs/
└── opt   (User)         → chrome/, vscode/
```

---

## 🗂️ Project Structure

```
linux-fs-tree/
│
├── index.html   ← HTML structure: header, stats, search, controls, modals, SVG canvas
├── style.css    ← All styling: dark/light themes, tree nodes, side panel, all modals
└── script.js    ← All logic: D3 tree, nodeInfo data, quiz, interview, compare, cheatsheet, share
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

Or drag `index.html` into any browser tab.

---

## 🎮 How to Use

| Action | What it does |
|---|---|
| **Click `/`** | Expands depth-1 directories |
| **Click any directory node** | Expands its children + opens the detail panel |
| **▼ EXPAND ALL** | Reveals every node in the tree at once |
| **▲ COLLAPSE ALL** | Collapses everything back to root only |
| **⌘K / Ctrl+K** | Focus the search bar |
| **Click a command in panel** | Copies the command to clipboard |
| **Click a legend category** | Dims all unrelated nodes |
| **🎯 QUIZ MODE** | Start a 10-question multiple-choice quiz |
| **⏱ INTERVIEW** | Timed flashcard drill with self-rating |
| **⇄ COMPARE** | Side-by-side directory comparison |
| **📋 CHEATSHEET** | Printable command reference grid |
| **↗ SHARE** | Generate a LinkedIn/Twitter progress post |
| **⬇ EXPORT** | Download the tree as an SVG file |
| **☀ / 🌙** | Toggle dark / light theme |
| **✕ button** | Close any panel or modal |
| **Esc** | Close any open panel or modal |
| **← → ↑ ↓** | Keyboard navigation between nodes |

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

| Directory | Tag | Purpose |
|---|---|---|
| `/` | ROOT | Top of the entire filesystem — everything lives here |
| `/bin` | SYSTEM | Core binaries every user needs (`ls`, `cp`, `cat`, `grep`) |
| `/etc` | CONFIG | System-wide config files — text only, no binaries |
| `/home` | USER | Personal folders for each regular user |
| `/var` | CONFIG | Variable data — log files, mail, print queues |
| `/usr` | SYSTEM | Largest dir — most programs, libraries, docs live here |
| `/proc` | VIRTUAL | Virtual FS — real-time kernel & process info (RAM only) |
| `/dev` | DEVICES | Device files — "everything is a file" in Linux |
| `/boot` | SYSTEM | Kernel (`vmlinuz`) + GRUB bootloader files |
| `/tmp` | VIRTUAL | Temp files — auto-deleted on every reboot |
| `/root` | USER | Home directory of the `root` superuser (≠ `/`) |
| `/sbin` | SYSTEM | Admin-only binaries (`fdisk`, `reboot`, `fsck`) |
| `/lib` | SYSTEM | Shared libraries needed by `/bin` and `/sbin` |
| `/mnt` | DEVICES | Temporary mount point for external drives / NFS |
| `/opt` | USER | Optional third-party software (Chrome, VS Code, etc.) |
| `/srv` | CONFIG | Service data — web server files, FTP roots |

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| **HTML5** | Page structure, modals, controls |
| **CSS3** | Dark/light themes via CSS variables, glow effects, animations |
| **D3.js v7** | Tree layout (`nodeSize`), node/link rendering, hierarchy |
| **Vanilla JS** | Quiz engine, interview mode, compare, search, clipboard, export |
| **JetBrains Mono** | Monospace font for the terminal aesthetic |
| **Orbitron** | Display font for headers and stats |

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

<div align="center">
  Made with 💚 while learning Linux & DevOps
</div>