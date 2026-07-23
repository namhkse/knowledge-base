# Yazi

A fast terminal file manager is written in Rust.

# Quick Start

Start the program with: 

```sh
yazi
```

Press `q` to quit, `F1` to open the help menu.

## Keybindings

Navigation:
- Navigate h, j, k, i
- Seek up/down in the preview: K, J
- Search and jump to directory: Z (zoxide), z (fzf)
- Change dir: `g + space`

Selection:
- Toggle selection of file/dir: space
- Select with visual mode: v
- Reverse selection: `ctrl + r`
- Select all: `ctrl + a`

File operations:
- Open selection files: o, O, enter
- Show the file information: tab
- Copy and cancel copy: y, Y
- Cut and cancel cut: x, X
- Paste: p, P(overwrite)
- Delete: d, D (permantely)
- Create file: a
- Rename: r
- Toggle the visibility of hidden files: .

Run shell command: `:`

Copy paths: c + <key>
- c: file path
- d: dir path
- f: filename
- n: finemame withot extension

Filter files: f

Find files: /, n, N
Search files: s, S

Sorting: , + <key> (see popup)

Multi tab:
- create a new tab: t + t
- switch to the tab: 1, 2, ...
- switch to next, prev: [, ]
- close current tab: ctrl + c

# Configuration

The config folder: `~/.config/yazi/`
- yazi.toml - General config
- keymap.toml
- theme.toml