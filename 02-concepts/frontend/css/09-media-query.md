# Reponsive Layouts

## Introduction to media query

Media queries  
Used to apply CSS styles based on specific features or characteristics of a browser or device

SYNTAX  
```
@media [type] and [feature] {
    <!-- CSS goes here -->
}

@media screen and (max-widht: 600px) {
    h2 {
        font-size: 1.2 rem;
    }
}
```

Media type: print, screen, all...

Media feature: min-width, orientation, min-resolution, prefers-color-scheme...

Logical operators: and, not, only...

CSS to beapplied if conditions are met

Where to include media queries ?   
Option 1: Add media queries below the related style.
```css
h1 {
    font-size: 5rem;
}

@media screen and (min-widht: 1000px) {
    h1 {
        font-size: 7rem;
    }
}
```

Option 2: Group all media qureies together at the bottom of the CSS file.
```css
h1 {
    font-size: 5rem;
}
...
/* Media queries */
@media screen and (min-widht: 1000px) {
    h1 {
        font-size: 7rem;
    }
}
```

Option 3: Media queries are added in a separate stylesheet.
```html
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" media="screen and (max-width: 600px)" href="css/small-screens.css">
```

**Breakpoint**: the point where a media query is introduced to make changes

**Breakpoint usage**  
Option 1: Use widths based on commmon device types (Most common).
Option 2: Use widhts based on design and layout.
Option 3:  