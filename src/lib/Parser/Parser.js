import bbn from "@bbn/bbn";

export default class bbnParser {
  static voidTags = ['img', 'input', 'br', 'hr', 'meta', 'link', 'base', 'col', 'area', 'param', 'source', 'track', 'wbr'];
  static states = ['building', 'tag', 'attribute', 'value', 'text'];
  static config = { autocorrect: false };

  #st = '';
  #tpl = [];
  #state = 'text';
  #curTag = false;
  #curAttribute = false;
  #curQuote = false;
  #curValue = false;
  #curText = false;
  #curEscaped = false;
  #oldState = null;
  #openedTag = false;
  #currentNode = null;

  get state() {
    return this.#state;
  }

  set state(val) {
    if (this.constructor.states.includes(val) && val !== this.#state) {
      this.resetCurrentState(val);
      this.#oldState = this.#state;
      this.#state = val;
    } else {
      throw new Error('Invalid state ' + val);
    }
  }


  constructor(html) {
    bbn.fn.checkType(html, String);
    html = bbn.fn.removeHtmlComments(html).trim().split('');
    this.parseHTML(html);
    //bbn.fn.log(this.#tpl);
  }


  resetCurrentState(val) {
    switch (val) {
      case 'building':
      case 'tag':
        this.#curTag = '';
        this.#currentNode = null;
      case 'attribute':
        this.#curAttribute = '';
      case 'value':
        this.#curQuote = false;
        this.#curValue = '';
      case 'text':
        this.#curText = '';
        this.#curEscaped = false;
        break;
    }
  }


  parseHTML(html) {
    const tags = [];

    //if (!html.length) throw new Error('Empty HTML');
    //if (html[0] !== '<') throw new Error('HTML must start with a tag');

    for (let i = 0; i < html.length; i++) {
      if (html[i] === '') continue;

      switch (this.state) {
        case 'text':
          i = this.handleTextState(html, i);
          break;

        case 'tag':
          i = this.handleTagState(html, i, tags);
          break;

        case 'attribute':
          i = this.handleAttributeState(html, i, tags);
          break;

        case 'value':
          i = this.handleValueState(html, i);
          break;

        case 'building':
          i = this.handleBuildingState(html, i, tags);
          break;
      }

      this.#st += html[i];
    }
  }


  handleTextState(html, i) {
    if (html[i] === '<' && /[A-z]/.test(html[i + 1])) {
      this.state = 'tag';
      if (this.#curText.trim()) {
        this.addTextNode(this.#curText);
      }
    } else {
      this.#curText += html[i];
    }

    return i;
  }


  handleTagState(html, i, tags) {
    if (this.#curTag === '') {
      if (/[A-z]/.test(html[i])) {
        this.#curTag += html[i];
      } else {
        this.throwInvalidCharacterError(html, i, tags);
      }
    } else if (this.#curTag === false) {
      throw new Error('No tag name 1');
    } else if (/[A-z0-9-]/.test(html[i])) {
      this.#curTag += html[i];
    } else {
      this.processTag(html, i, tags);
    }

    return i;
  }


  processTag(html, i, tags) {
    this.#openedTag = this.#curTag;
    this.#currentNode = { tag: this.#curTag, attributes: {}, children: [] };

    if (/\s/.test(html[i])) {
      this.#st += ' ';
      while (/\s/.test(html[i])) i++;
    }

    if (html[i] === '/') {
      this.handleTagClosing(html, i, tags);
    } else if (html[i] === '>') {
      if (!this.constructor.voidTags.includes(this.#curTag)) {
        tags.push(this.#curTag);
        this.addNodeToTree(this.#currentNode);
      } else {
        this.addNodeToTree(this.#currentNode);
      }
      this.state = 'text';
    } else {
      i--;
      this.state = 'building';
    }

    return i;
  }


  handleTagClosing(html, i, tags) {
    if (this.#curTag && html[i + 1] === '>') {
      if (this.constructor.voidTags.includes(this.#curTag)) {
        if (this.constructor.config.autocorrect) {
          html[i] = '>';
          html[i + 1] = '';
        } else {
          throw new Error(bbn._("Invalid tag closing for tag %s", this.#openedTag));
        }
      } else {
        html[i] = '></' + this.#openedTag + '>';
        html[i + 1] = '';
        tags.pop();
      }
      this.#openedTag = tags[tags.length - 1] || false;
      this.state = 'text';
    } else {
      this.throwInvalidCharacterError(html, i, tags);
    }

    return i;
  }


  handleAttributeState(html, i, tags) {
    if (/[A-z0-9-]/.test(html[i])) {
      this.#curAttribute += html[i];
    } else {
      i = this.finalizeAttributeName(html, i, tags);
    }

    return i;
  }


  finalizeAttributeName(html, i, tags) {
    if (!/[:@]{0,1}[A-z]{1}[A-z0-9-]*/.test(this.#curAttribute)) {
      throw new Error('Invalid attribute name: ' + this.#curAttribute);
    }

    let hasSpace = false;
    while (/\s/.test(html[i])) {
      if (!hasSpace) {
        hasSpace = true;
        this.#st += ' ';
      }
      i++;
    }

    if (html[i] === '=') {
      this.state = 'value';
    } else {
      i = this.handleAttributeClosing(html, i, tags);
    }

    return i;
  }


  handleAttributeClosing(html, i, tags) {
    if (this.#openedTag && html[i] === '/' && html[i + 1] === '>') {
      this.#openedTag = tags[tags.length - 1] || false;
      this.state = 'text';
      html[i] = '></' + this.#openedTag + '>';
      html[i + 1] = '';
    } else if (html[i] === '>') {
      this.finalizeAttribute(tags);
    }

    return i;
  }


  finalizeAttribute(tags) {
    if (!this.#openedTag) {
      throw new Error('No tag name 2');
    }

    if (!this.constructor.voidTags.includes(this.#openedTag)) {
      tags.push(this.#openedTag);
    } else {
      this.#openedTag = tags[tags.length - 1] || false;
    }
    this.state = 'text';
  }


  handleValueState(html, i) {
    if (!this.#curQuote) {
      if (!this.#curValue) {
        while (/\s/.test(html[i])) {
          i++;
        }
      }

      i = this.processValueQuote(html, i);
    } else if (html[i] === '\\') {
      this.#curEscaped = !this.#curEscaped;
    } else if (!this.#curEscaped && html[i] === this.#curQuote) {
      this.#curQuote = false;
      this.#curValue = false;
      this.state = 'building';
      this.#curEscaped = false;
    } else {
      this.#curEscaped = false;
      this.#curValue += html[i];
    }
    return i;
  }


  processValueQuote(html, i) {
    this.#curEscaped = false;
    if (/\s/.test(html[i])) {
      this.#curValue = false;
      this.state = 'building';
    } else if (html[i] === '"') {
      this.#curQuote = '"';
    } else if (html[i] === "'") {
      this.#curQuote = "'";
    } else {
      this.#curValue += html[i];
    }

    if (this.#curQuote && this.#curValue) {
      throw new Error(bbn._("No attribute value for %s, misplaced quotes", this.#curAttribute));
    }
    return i;
  }


  handleBuildingState(html, i, tags) {
    if (!this.#openedTag) {
      throw new Error('No tag name 3');
    }

    let hasSpace = false;
    while (/\s/.test(html[i])) {
      i++;
      if (!hasSpace) {
        hasSpace = true;
        this.#st += ' ';
      }
    }

    if (html[i] === '>') {
      this.state = 'text';
    } else if (html[i] === '/') {
      i = this.processBuildingSlash(html, i, tags);
    } else if (/[A-z:@]/.test(html[i])) {
      this.state = 'attribute';
      this.#curAttribute = html[i];
    } else if (html[i]) {
      throw new Error('Invalid character ' + html[i]);
    }
    return i;
  }


  processBuildingSlash(html, i, tags) {
    if (html[i + 1] === '>') {
      html[i] = '></' + this.#openedTag + '>';
      html[i + 1] = '';
      tags.pop();
      this.#openedTag = tags[tags.length - 1] || false;
      this.state = 'text';
    } else {
      this.throwInvalidCharacterError(html, i, tags);
    }
    return i;
  }


  throwInvalidCharacterError(html, i, tags) {
    throw new Error('Invalid character ' + html[i]);
  }


  addNodeToTree(node) {
    if (!this.#tpl.length) {
      this.#tpl.push(node);
    } else {
      let parent = this.findParentNode(this.#tpl, this.#openedTag);
      if (parent) {
        parent.children.push(node);
      } else {
        this.#tpl.push(node);
      }
    }
  }


  findParentNode(tree, tag) {
    for (let node of tree) {
      if (node.tag === tag) {
        return node;
      }
      let found = this.findParentNode(node.children, tag);
      if (found) {
        return found;
      }
    }
    return null;
  }


  addTextNode(text) {
    let parent = this.findParentNode(this.#tpl, this.#openedTag);
    if (parent) {
      parent.children.push({ type: 'text', content: text.trim() });
    }
  }


  get html() {
    return this.#st;
  }


  get virtualDOM() {
    return this.#tpl;
  }

}
