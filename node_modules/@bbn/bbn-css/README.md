
<p align="center"><img  alt="BBN CSS"  src="https://bbn.io/logo/black/text/css.svg"  style="max-width: 40%; height: auto"></p>

  

# A small CSS framework
  

BBN CSS is a non intrusive and adaptable set of classes for creating fast, powerful, and coherent User Interfaces.


With its intuitive names you'll quickly become familiar with its structure, and will naturally add class names instead of style properties.

There is not a class for every single color, dimension, spacing, etc... as they all rely on the few variables that are set up in the theme, but that makes it highly adaptable and very light.


## A few examples of classes you'll immediately understand:

```
bbn-padded
bbn-lpadded
bbn-xlpadded
bbn-spadded
bbn-xspadded
bbn-left-padded
bbn-left-spadded
// ... and so on

bbn-margin
bbn-lmargin
bbn-left-margin
// same thing than padded

bbn-bordered
bbn-radius

```
  

```
// These are all colors

bbn-text
bbn-alt-text
bbn-primary-text
bbn-secondary-text
bbn-tertiary-text

bbn-background
bbn-alt-background
bbn-primary-background
bbn-secondary-background
bbn-tertiary-background

bbn-border
bbn-alt-border
bbn-primary-border
bbn-secondary-border
bbn-tertiary-border
```
  

```
bbn-b       // bold
bbn-i       // italic
bbn-c       // centered
bbn-l       // left aligned
bbn-r       // right aligned
bbn-j       // justified
bbn-xxxs    // super very tiny
bbn-xxs     // very tiny
bbn-xs      // tiny
bbn-s       // small
bbn-regular // not small, nor big
bbn-m       // medium sized
bbn-lg      // this is large and l was taken
bbn-xl      // very large
bbn-xxl     // enormous
bbn-xxxl    // gigantic
```


## Try it in your app

  

```html

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bbnjs/dist/bbn.default.css">

```

## Personnalize it easily

All the classes are based on only a few variables that will make your theme unique

```css
/** Default configuration*/
@default-text: #2e2e2e;
@default-border: #d5d5d5;
@default-background: #fff;
@default-border-style: solid;
@default-border-width: 1px;
@default-border-radius: 0.4em;
@alt-text: #2e2e2e;
@alt-border: #d5d5d5;
@alt-background: #eae8e8;
@alt-border-style: solid;
@alt-border-width: 1px;
@alt-border-radius: 0.6em;
@primary-border: #e45200;
@primary-background: #ff6b18;
@primary-text: #fff;
@secondary-border: #B22222;
@secondary-background: #C9351C;
@secondary-text: #fff;
@tertiary-border: #0974B3;
@tertiary-background: #1AABFF;
@tertiary-text: #fff;
@link-color: #3f51b5;
@header: #eae8e8;
@header-alt: #B8B6B6;
@header-alt-text: #999;
@header-text: #2e2e2e;
@text-size: 13px;
@space: 1em;
@lspace: 2em;
@xlspace: 4em;
@xxlspace: 8em;
@sspace: 0.5em;
@xsspace: 0.25em;
@xxsspace: 0.125em;
@button-text: #2e2e2e;
@effect: rgba(255, 255, 255, .4);
@line-height: 1.7em;
@line-height-mobile: 2em;
@hover-background: #bcb4b0;
@hover-border: #b6b6b6;
@hover-text: #2e2e2e;
@active-text: #2e2e2e;
@active-border: #b6b6b6;
@active-background: #C9C1B3;
@selected-text: #fff;
@selected-background: #f35800;
@selected-border: #FF5E00;
@disabled-color: #c3c3c3;
@disabled-background: #edebea;
@disabled-border: #cacaca;
@success-text: #00a03e;
@success-background: #cacaca;
@success-border: #00a03e;
@error-text: #db3340;
@error-background: #cacaca;
@error-border: #db3340;
@success-alt-text: #00a03e;
@success-alt-background: #cacaca;
@success-alt-border: #00a03e;
@error-alt-text: #db3340;
@error-alt-border: #db3340;
@font: 'Helvetica', 'Arial', sans-serif; // You can also use Web fonts

```



### Check out our [theme generator](https://bbn.io/theme) 

Still a work in progress...


