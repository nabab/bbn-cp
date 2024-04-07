# bbn-cp Web Components Library (a not-so-great README made by ChatGPT)

## Introduction

Welcome to our custom Web Components library! Inspired by VueJS, our library brings a reactive and component-based approach to building modern web interfaces with a Vue-like API. Whether you're familiar with VueJS or new to component-based development, our library offers an intuitive and powerful way to create dynamic web applications.

## Getting Started

This guide will walk you through setting up a basic project using our Web Components library. By the end, you'll have a functional web application with dynamic data bindings and event handling.

## Prerequisites

Basic knowledge of HTML, CSS, and JavaScript.
A modern web browser that supports Web Components.

## Installation

Download the latest version of our library from the official repository.
Include the library in your HTML file with a `<script>` tag:

```html
<script type="text/javascript" src="path/to/bbn-cp/v2/dist/bbn-cp.js"></script>
```

## Creating Your First App

Define a container for your app. This can be any HTML element:

```html
<div class="appui bbn-overlay" style="visibility: hidden;">
  <!-- Your app's content will go here -->
</div>
```

Initialize your app with the bbn.cp.createApp method inside a <script> tag. This method takes two arguments: a selector for your app's container and an options object defining your app's data, methods, and lifecycle hooks:

```html
<script>
document.addEventListener('DOMContentLoaded', () => {
  const app = bbn.cp.createApp('.appui', {
    data() {
      return {
        // Your app's initial state
        lst: [1, 2, 3],
        myData: {
          name: 'Ettore',
          color: 'blue',
          number: 3,
          radio: 'dunno',
          choice: 2,
          ok: 0
        }
      };
    },
    methods: {
      // Define methods to handle user actions and events
    },
    mounted() {
      // Lifecycle hook that runs after the app is mounted to the DOM
    },
    watch: {
      // Watchers for reactive data changes
    }
  });
})
</script>
```

Inside your app's container, use custom elements (e.g., <bbn-input>, <bbn-dropdown>) to create an interactive UI. Bind data to these elements with the v-model directive and use {{}} syntax for text interpolation:

```html
<h1>
  Name: {{myData.name}}<br>
  Color: {{myData.color}}
</h1>
<bbn-form>
  <bbn-input v-model="myData.name"></bbn-input>
  <bbn-dropdown :source="lst" v-model="myData.choice"></bbn-dropdown>
  <!-- Add more components as needed -->
</bbn-form>
```

## Running Your App

Open your HTML file in a web browser. You should see your app running, complete with reactive data bindings and interactive components.

## Conclusion

Congratulations! You've just created a simple web application using our Web Components library with a Vue-like API. Explore the documentation to learn more about available components, directives, and features to build more complex and dynamic applications. Happy coding!