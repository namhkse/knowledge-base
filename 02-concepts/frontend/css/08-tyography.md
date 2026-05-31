# CSS typography basics

## Typography for the web

Typography: The design and arrangement of text for visual appeal, to enchance readability.

Typeface:

Font:

Font family:

Typeface classification
- Serif
- Sans-Serif
- Script
- Monospace
- Display

Typeface Guidelines
- Serif: body text, headings
- Sans-Serif body text, headings
- Script: heading, short blocks
- Monospace: code, body, heading
- Display: headings, short blocks

## Changing font with font-family

font-family: Avenir, Helvetical, Arial, sans-serif;

Preferred font: Avenir
Fallback options: Helvetical, Arial, sans-serif
Generic font: sans-serif (defined by browser)

Use web-safe fonts

## font-weight and font-style

font-weight: 500;       // absolute 
font-weight: normal;    // absolute (400)
font-weight: ligther;   // relative with parent

font-style: normal;

## Web fonts with @font-face

Use link to the font, the web will download it, don't need to install font in the machine.

```css
@font-face {
    font-family: "Font Name"
    src: url("fontname.woff2");
}

/* usage */
body {
    font-family: "Font Name", sans-serif;
}
```

## Online font services

- Google fonts

## font-size and em

font-size: small;   // keyword
font-size: 12px;    // length
font-size: 0.8em;   // length
font-size: 80%;     // percentage value

Browser default 16px (except heading).

em
- Name comes from the letter "M"
- Relative unit based on closest ancestor element's font size
- 1em = inherited font size

rem: only based on root element `<html>`

## Font size and accessibility

Use size-based naming conventions

```css
:root {
    --font-size-xs: 0.75rem;
    --16px: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-md: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.3125rem;
}
```

## text-align, text-transform, text-decoration

- Aligns content within block elements (only works on text, inline, inline-block)
- Changes capitalization and letter case of text
- Sets the apperance of decorative lines

## line-height and letter-spacing

- Sets the vertical spacing between lines of text
- Sets the horizontal spacing between text characters