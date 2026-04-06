# Structure of the bbn-cp Library (April 4, 2026)

## Overview of Root Object (bbn-js)

The `bbn` object serves as the root namespace for the **bbn-js** library, which provides utility functions and helper methods. The following namespaces are available within `bbn`:

- **fn**: An object containing a collection of utility functions.
- **_()**: A function that facilitates translation operations.
- **env**: An object storing application metadata such as title, URL, environment settings, language preferences, debug flags, etc.
- **var**: An object containing data utilized by the `bbn-js` library.
- **app**: A functional component (`bbnHTML`) serving as the application root (customizable by developers).
- **db**: An object managing an IndexedDB connection with methods for CRUD operations (`insert`, `update`, `delete`, `select`, `selectAll`).
- **com**: Internal communication utilities for AJAX, fetch, and file upload operations.
- **dt**: A DateTime library based on Temporal, offering an API similar to dayJs.
- **info**: An array of objects categorizing functions within the `bbn-js` library.
- **lng**: A translation object mapping original expressions to their translated counterparts (used by `_()`).
- **opt**: An object storing application options if specified during initialization.
- **version**: The current version string of `bbn-js`.
- **cp**: The namespace for the Web Components library.

---

## bbn.cp Object

### Functions

| Function | Description |
|----------|-------------|
| **addPrefix**(`prefix`, `handler`, `mixins`) | Registers a component handler based on a specified prefix. |
| **addUrlAsPrefix** | Convenience method to define components using URL-based prefixes. |
| **attributeChangedCallback**(`component`, `name`, `oldValue`, `newValue`) | Invoked during attribute changes but performs no action. |
| **createApp**(`element`, `obj`) | Initializes the root application by replacing a given element with a configured `bbn-anon` component. |
| **define**(`componentName`, `obj`, `templateString`, `css`) | Defines a custom element using `customElements.define`. |
| **fetchComponent**(`tag`) | Retrieves and defines a component based on its tag name. |
| **getComponent**(`id`) | Fetches a component instance by its `bbnId` property. |
| **immunizeValue**(`value`, `deep`) | Prevents values from being transformed by bbnData (ensures observability). |
| **isComponent**(`element`) | Determines if an element is a valid `bbnHTML` component. |
| **isTag**(`tag`, `ele`) | Checks if an element matches the specified tag or uses the `is` attribute. |
| **mapTemplate**(`templateArray`, `map = []`) | Constructs a hierarchical template structure. |
| **nextFrame**() | Returns a Promise resolving after the next animation frame. |
| **normalizeComponent**(`configuration`, `className`) | Validates and standardizes component configuration objects. |
| **queueUpdate**(...items) | Queues attributes, callbacks, or events for deferred execution. |
| **run** | Executes queued operations within the application runner. |

### Variables

| Variable | Type | Description |
|----------|------|-------------|
| **app** | `bbnAnon` | The root component of the application. |
| **badCaseAttributes** | `Object` | Maps lowercase attribute names to their JavaScript property equivalents (e.g., `colSpan`). |
| **componentsIndex** | `Map` | Registry of all components, keyed by `componentId`. |
| **directives** | `Object` | Stores directive definitions with lifecycle hooks (`inserted`, `update`). |
| **elementsQueue** | `Array` | Queue of elements awaiting processing. |
| **globalAttributes** | `Array` | List of recognized HTML global attributes. |
| **hooks** | `Array` | Lifecycle hook names (e.g., `beforeCreate`, `mounted`). |
| **htmlClasses** | `Object` | Maps HTML tags to their corresponding base classes (e.g., `li`, `form`). |
| **isRunning** | `Boolean` | Indicates whether the application runner is active. |
| **known** | `Array` | List of all registered component tag names. |
| **knownPrefixes** | `Array` | Defines prefixes for dynamic component registration. |
| **loopLevel** | `Number` | Tracks the current nesting level of loops in the runner. |
| **mixins** | `Object` | Shared component logic (see below). |
| **nextQueue** | `Array` | Queue for items to be processed in the next cycle. |
| **noValueAttributes** | `Array` | Attributes that do not require values (e.g., boolean flags). |
| **numTicks** | `Number` | Incremental counter for execution cycles. |
| **queue** | `Array` | List of pending operations. |
| **resizeObserver** | `ResizeObserver` | Monitors element dimensions. |
| **spaceHash** | `String` | Hash value representing a whitespace character. |
| **statics** | `Object` | Stores processed component definitions. |
| **tagAliases** | `Object` | Maps custom tags to native HTML elements (e.g., `"bbn-button": "button"`). |
| **tagExtensions** | `Object` | Specifies base classes for extended elements (e.g., `{ button: 'bbnButtonHtml' }`). |
| **toDefine** | `Array` | Components awaiting definition. |
| **uid** | `Number` | Central counter for generating unique IDs (`bbnUid`). |
| **unknown** | `Object` | Tracks components pending registration. |
| **version** | `Number` | Subversion identifier for cache invalidation. |

---

## Class Hierarchy

The library follows this structural organization:

- **bbnProtoHtml**: Base methods shared by all components.
- **bbnHtml**: Extends `HTMLElement`, incorporating `bbnProtoHtml`.
- **bbnAnonHtml**: Specialized extension of `HTMLElement` for anonymous components.
- **bbnNode**: Represents nodes in the template tree, with subclasses for specialized nodes (e.g., `bbnComponentNode`, `bbnSlotNode`).
- **bbnAttr**: Manages attributes within templates, with subclasses for dynamic behaviors (e.g., `bbnBindAttr`, `bbnEventAttr`).
- **bbnData**: Implements data observability.
- **bbnFacade**: Bridges nodes to their associated data.
- **bbnParser**: Parses HTML templates, supporting self-closing tags.
- **bbnResult**: Encapsulates attribute evaluation results.
- **bbnWatcher**: Monitors data changes for reactive updates.

Anonymous components inherit from `bbnAnonHTML`, while others extend `bbnHtml` or dynamically generated classes (e.g., for `<li>` or `<form>`).

---

## bbnHtml and Related Classes

### Inherited Methods (from bbnProtoHtml)

| Method | Return Type | Description |
|--------|-------------|-------------|
| **_** | `String` | Translates and formats strings. |
| **connectedCallback** | - | Triggers the `$connected` lifecycle hook. |
| **disconnectedCallback** | - | Invokes the `$destroy` lifecycle hook. |
| **getRef** | `HTMLElement` | Retrieves an element referenced by a `ref`. |
| **closest** | `HTMLElement` | Finds the nearest ancestor matching a selector (including `is`). |
| **ancestors** | `Array` | Returns an array of parent components. |
| **find** | `HTMLElement` | Locates the first descendant matching a query. |
| **findAll** | `Array` | Retrieves all descendants matching a query. |
| **$connected** | - | Initializes the component and mounts it to the DOM. |
| **$create** | `HTMLElement` | Dynamically adds an element to the component. |
| **$destroy** | - | Cleans up resources and removes the element from the DOM. |
| **$emit** | `Event` | Dispatches a custom event. |
| **$forceUpdate** | - | Forces immediate execution of queued operations. |
| **$hasSlots** | `Boolean` | Checks for the existence of named slots. |
| **$is** | `Boolean` | Verifies if the component matches a given tag. |
| **$isComponent** | `Boolean` | Determines if an element is a web component. |
| **$isPropNative** | `Boolean` | Validates whether a property is native to `HTMLElement`. |
| **$nextTick** | - | Executes a callback after the next event loop tick. |
| **$off** | - | Removes an event listener. |
| **$on** | `AbortController` | Registers an event listener. |
| **$once** | `AbortController` | Registers a one-time event listener. |
| **$position** | `Object` | Computes the component's bounding rectangle. |
| **$retrieveSlotItems** | `Array` | Lists nodes within a specified slot. |
| **$set** | `this` | Updates component data. |
| **$watch** | `Function` | Sets up a reactive watcher and returns a cancellation function. |

---

### Properties

| Property | Type | Definer | Description |
|----------|------|---------|-------------|
| **bbnCid** | `String` | Definition | Unique identifier prefixed with `bbncp-`. |
| **bbnTmpSlots** | `Object` | Definition | Temporary storage for slots before initialization. |
| **$props** | `Object` | Definition | Holds prop values (`{[prop]: [value]}`). |
| **$propsCfg** | `Object` | Definition | Tracks prop metadata (e.g., timestamps, values). |
| **$namespaces** | `Object` | Definition | Maps accessible keys to their namespace groups. |
| **$nodes** | `Object` | Definition | Hierarchical node structure (`{'0': bbnInternalNode, '0-0': bbnNode}`). |
| **$events** | `Object` | Definition | Registry of event handlers and associated controllers. |
| **$children** | `Array` | Definition | Direct child components. |
| **$dataCfg** | `Object` | Definition | Stores data values (`{[dataName]: {value: [dataValue]}}`). |
| **$refsElements** | `Object` | Definition | References to elements with `ref` attributes. |
| **$components** | `bbnRegistered` | Definition | Tracks registered child components. |
| **$refs** | `Object (Proxy)` | Definition | Proxy for `$refsElements`. |
| **bbnUid** | `Number` | `$connected` | Unique numeric identifier. |
| **$isConnected** | `Boolean` | `$connected` | Indicates whether the component is mounted. |
| **bbnSlots** | `Object` | `$connected` | Maps slot names to their elements. |
| **$tpl** | `Array` | `$connected` | Hierarchical template representation. |
| **$watcher** | `Object` | `$connected` | Manages reactive watchers. |
| **$slots** | `Object` | `$connected` | Alias for `bbnSlots`. |
| **$slotElements** | `Object` | `$connected` | References to slot placeholders (comments). |
| **$id** | `String` | `$connected` | Node identifier in the template (e.g., `0-1-1`). |
| **$cid** | `String` | `$connected` | Alias for `bbnCid`. |
| **$origin** | `HTMLElement` | `$connected` | Parent component from which this component was instantiated. |
| **$deps** | `Object` | `$connected` | Tracks dependencies between data/props and computed attributes. |
| **$dataDeps** | `Set` | `$connected` | Observes external `bbnData` instances used by the component. |
| **$dataInstances** | `Set` | `$connected` | Collects `bbnData` instances created within the component. |
| **$numBuild** | `Number` | `$connected` | Incremental counter for updates (starts at 0). |
| **$numTicks** | `Number` | `$connected` | Aligns with `bbn.cp.numTicks`. |
| **$root** | `bbnAnonHtml` | `$connected` | Reference to the application root. |
| **$isRoot** | `Boolean` | `$connected` | Indicates if the component is the root. |
| **$isInit** | `Boolean` | `$connected` | Set after initialization (`init`). |
| **$internal** | `bbnInternalNode` | `$connected` | Root node of the component. |
| **$isCreated** | `Boolean` | `$connected` | Set after the `created` hook. |
| **bbnDirectives** | `Object` | `$connected` | Stores directive configurations. |

---

### bbnAnonHtml-Specific Properties

| Property | Description |
|----------|-------------|
| **bbnTpl** | Template definition for anonymous components. |
| **bbnCfg** | Configuration object for anonymous components. |

---

## bbnNode Class

| Method | Return Type | Description |
|--------|-------------|-------------|
| **nodeBuild** | `HTMLElement` | Constructs the DOM element from the node. |
| **nodeClean** | `Number` | Removes dependencies and subtree elements. |
| **nodeConceive** | - | Initializes child nodes. |
| **nodeDefine** | - | Configures node attributes during construction. |
| **nodeInit** | `HTMLElement` | Triggers the DOM creation process. |
| **nodeInsert** | - | Inserts an element (optionally after another). |
| **nodeMove** | - | Relocates an element (optionally after another). |
| **nodeRemove** | - | Deletes an element from the DOM. |
| **nodeSetAll** | - | Evaluates all node attributes. |
| **nodeSetClass** | - | Applies CSS classes to the node. |
| **nodeSetStyle** | - | Sets inline styles for the node. |

---

### Properties

| Property | Type | Description |
|----------|------|-------------|
| **attr** | `Object` | Maps attribute names to their values. |
| **attributes** | `Array` | List of all attributes. |
| **children** | `Array` | Direct child nodes (`bbnNode`). |
| **classes** | `Object` | Tracks classes by source (template, external, bindings). |
| **component** | `HTMLElement` | Parent component responsible for this node. |
| **condition** | `bbnConditionAttr` | Condition attribute if present. |
| **conditionId** | `String` | Common identifier for conditional rendering. |
| **data** | `bbnFacade` | Facilitates data access within loops. |
| **element** | `HTMLElement\|Comment` | Generated DOM element or comment. |
| **events** | `Object` | Maps event names to handlers (`bbnEventAttr`). |
| **hasData** | `Boolean` | Indicates if the node has associated data. |
| **hash** | `String` | Unique identifier for loop elements. |
| **id** | `String` | Node identifier from the template map. |
| **items** | `Array` | Template children (not actual DOM nodes). |
| **isBuilding** | `Boolean` | Indicates if the node is being constructed. |
| **isCreating** | `Boolean` | Set during `nodeInit`. |
| **isSVG** | `Boolean` | Identifies SVG elements. |
| **numBuild** | `Number` | Counts reevaluations of this node's elements. |
| **oldElement** | `HTMLElement` | Previous element (used for transitions). |
| **oldClasses** | `Array` | Last evaluated classes. |
| **parent** | `bbnNode` | Parent node in the hierarchy. |
| **parentElement** | `HTMLElement` | DOM parent of this node's element. |
| **props** | `Object` | Maps attribute names to values. |
| **root** | `bbnNode` | Highest ancestor node (stops at loops). |
| **rootHash** | `String` | Hash prefixed with Node ID for loop branches. |
| **styles** | `Object` | Inline styles for the element. |
| **tag** | `String` | HTML tag name. |
| **_region** | `Object` | Bounds the node's DOM region (comments). |

---

### Getters

| Property | Type | Description |
|----------|------|-------------|
| **comment** | `Boolean` | Indicates if the element is a comment. |
| **isCommented** | `Boolean` | Identifies commented elements (templates, slots). |
| **isComponent** | `Boolean` | Determines if the node represents a component. |
| **isOut** | `Boolean` | Indicates nodes without a parent element. |
| **isValid** | `Boolean` | Confirms membership in its root loop list. |
| **next** | `bbnNode` | Next sibling node. |
| **nextElement** | `HTMLElement` | Next DOM element. |
| **off** | `Boolean` | Indicates removed nodes. |
| **prev** | `bbnNode` | Previous sibling node. |
| **prevElement** | `HTMLElement` | Previous DOM element. |
| **realTag** | `String` | Actual tag name of the element. |
| **template** | `Object` | Template object defining this node. |
| **uid** | `String` | Unique identifier combining component CID and node ID. |

---

## bbnAttr Class

| Method | Return Type | Description |
|--------|-------------|-------------|
| **attrExec** | `Object` | Executes dynamic attributes. |
| **attrGetState** | `String` | Retrieves the attribute's state. |
| **attrGetValue** | `mixed` | Fetches the attribute value. |
| **attrRetrieveArgument** | `mixed` | Evaluates expressions within attributes. |
| **attrSet** | - | Updates the attribute result and node properties. |
| **attrSetResult** | - | Sets the `bbnResult` object. |
| **attrUpdate** | - | Refreshes the attribute value. |

---

### Properties

| Property | Type | Description |
|----------|------|-------------|
| **args** | `Array` | Variables required by the attribute function. |
| **attrFn** | `Function` | Generated function for dynamic attributes. |
| **exp** | `String` | Expression contained in the attribute. |
| **stFn** | `String` | Content of the generated function. |
| **value** | `mixed` | Result of expression evaluation or static value. |
| **ownDeps** | `Array` | Tracks dependencies for this attribute. |
| **result** | `bbnResult` | Encapsulates evaluation results. |

---

### Getters

| Property | Type | Description |
|----------|------|-------------|
| **hash** | `String` | Current hash of the attribute. |
| **id** | `String` | Unique identifier based on attribute type and node UID. |
| **isChanged** | `Boolean` | Indicates recent changes to the result. |
| **isLate** | `Boolean` | Set when `lastRequest > lastUpdate`. |
| **lastChange** | `Number` | Timestamp of the last change (tick-based). |
| **lastRequest** | `Number` | Timestamp of the last request (tick-based). |
| **lastUpdate** | `Number` | Timestamp of the last update (tick-based). |
| **name** | `Array` | Variables required by the attribute function. |
| **node** | `Array` | Variables required by the attribute function. |
| **state** | `Array` | Variables required by the attribute function. |
| **uid** | `Array` | Variables required by the attribute function. |

---

## bbnData Class

| Method | Static | Description |
|--------|--------|-------------|
| **addComponent** | - | Registers a component reference. |
| **dataImpacted** | Array | Identifies components affected by data changes. |
| **dataUpdate** | - | Updates data and propagates changes. |
| **fixIndexes** | - | Corrects index orders after reordering/filtering. |
| **hasComponent** | - | Checks for component references (with path). |
| **hasParent** | - | Determines if a `bbnData` parent exists. |
| **isSame** | - | Compares values for equality. |
| **removeComponent** | - | Deregisters a component reference. |
| **setData** | - | Initializes the proxy object. |
| **unset** | - | Removes data and propagates changes. |
| **getObject** | ✓ | Retrieves the `bbnData` object from a value. |
| **getValue** | ✓ | Extracts the value (proxy) from a `bbnData` object. |
| **hash** | ✓ | Generates a hash for any data. |
| **propagate** | ✓ | Propagates dependencies after data changes. |
| **proxy** | ✓ | Creates proxy objects for reactive updates. |
| **proxyPop** | ✓ | Handles array `pop` operations reactively. |
| **proxyPush** | ✓ | Handles array `push` operations reactively. |
| **proxyReverse** | ✓ | Handles array `reverse` operations reactively. |
| **proxyShift** | ✓ | Handles array `shift` operations reactively. |
| **proxySort** | ✓ | Handles array `sort` operations reactively. |
| **proxySplice** | ✓ | Handles array `splice` operations reactively. |
| **proxyUnshift** | ✓ | Handles array `unshift` operations reactively. |
| **recognize** | ✓ | Avoids redundant proxy creation for unchanged data. |
| **startWatching** | ✓ | Begins tracking accessed variables. |
| **stopWatching** | ✓ | Ends variable tracking. |
| **treatValue** | ✓ | Processes values for reactivity. |

---

### Properties

| Property | Type | Static | Description |
|----------|------|--------|-------------|
| **path** | `String` | - | Variable path from the originating component. |
| **children** | `Array` | - | Direct descendant `bbnData` instances. |
| **deps** | `Object` | - | Tracks dependencies for this data. |
| **isArray** | `Boolean` | - | Indicates array values. |
| **lastSubUpdate** | `Number` | - | Timestamp for subtree updates (tick-based). |
| **lastUpdate** | `Number` | - | Timestamp for element updates (tick-based). |
| **refs** | `Array` | - | References to this data piece. |
| **value** | `mixed (Proxy)` | - | Proxy object for reactive values. |
| **root** | `Object` | - | Metadata about the originating component. |
| **currentWatchers** | `Array` | ✓ | Active watchers during tracking. |
| **watchSequence** | `Array` | ✓ | Records accessed variables during tracking. |
| **lastSequence** | - | ✓ | Last element of the previous watched sequence. |
| **isWatching** | `Boolean` | ✓ | Indicates active variable tracking. |
| **watchStarted** | `Boolean` | ✓ | Set when watching begins (cleared by stoppers). |
| **stoppers** | `Array` | ✓ | Functions to terminate variable tracking. |

---

## bbnFacade Class

The `bbnFacade` class simplifies data access at the node level, aggregating variables from parent loops or other scopes into a unified object.

| Method | Description |
|--------|-------------|
| **add** | Registers new data references. |
| **get** | Retrieves values for given keys (current node or ancestors). |
| **has** | Checks for key existence in current data or parent nodes. |
| **hasOwn** | Validates key presence in the current data only. |
| **set** | Updates values for specified keys across the hierarchy. |

---

## bbnResult Class

The `bbnResult` object encapsulates attribute evaluation outcomes.

| Property | Description |
|----------|-------------|
| **num** | Execution counter (aligned with ticks). |
| **state** | Current state of the result. |
| **value** | Evaluated value or static content. |
| **hash** | Unique identifier for the result. |

---

## Mixins

| Name | Description |
|------|-------------|
| basic | Core functionality for components. |
| browserNotification | Enables browser notifications. |
| cell | Grid cell behavior. |
| close | Handles closing actions. |
| componentInside | Manages nested components. |
| config | Configuration management. |
| data | Data handling utilities. |
| dataEditor | Data editing capabilities. |
| dimensions | Element dimension tracking. |
| dropdown | Dropdown menu functionality. |
| editableList | Editable list operations. |
| empty | Empty state handling. |
| events | Event management. |
| field | Form field behaviors. |
| input | Input field enhancements. |
| keepCool | Performance optimizations. |
| keynav | Keyboard navigation support. |
| list | List manipulation methods. |
| localStorage | Local storage integration. |
| memory | Memory management. |
| observer | DOM observation utilities. |
| pageable | Pagination controls. |
| popup | Popup window management. |
| position | Positioning calculations. |
| resizer | Resizable element support. |
| row | Grid row behaviors. |
| serviceWorker | Service worker integration. |
| toggle | Toggle state management. |
| url | URL handling utilities. |
| view | View-related functionality. |

---

## Directives

| Name | Description |
|------|-------------|
| bbn-draggable | Enables draggable elements. |
| bbn-droppable | Supports drop targets for drag-and-drop. |
| bbn-focused | Manages focused state. |
| bbn-portal | Portal rendering capabilities. |
| bbn-resizable | Resizable element support. |

---

## Object Typologies

### knownPrefix

- **prefix**: The component prefix string.
- **mixins**: Array of mixins applied to prefixed components.
- **handler**: Function defining the component.

### componentProcessedDefinition

- **cfg**: Component configuration object.
- **cls**: Generated class name.
- **fn**: Template function name.
- **map**: Hierarchical template structure.
- **slots**: Slot definitions.
- **tag**: Custom element tag name.
- **tpl**: Template array.




## File structure

src/
├── all.js
├── build_components.js
├── cp.js
├── directives/
│   ├── draggable.js
│   ├── droppable.js
│   ├── focused.js
│   ├── portal.js
│   └── resizable.js
├── functions/
│   ├── addPrefix.js
│   ├── addUrlAsPrefix.js
│   ├── createApp.js
│   ├── define.js
│   ├── fetchComponent.js
│   ├── getComponent.js
│   ├── immunizeValue.js
│   ├── isComponent.js
│   ├── isTag.js
│   ├── mapTemplate.js
│   ├── normalizeComponent.js
│   ├── queueUpdate.js
│   ├── run.js
├── i18n/
│   ├── en.js
│   ├── fr.js
│   └── it.js
├── index.js
├── internals/
│   ├── addComponent.js
│   ├── analyzeElement.js
│   ├── connectedCallback.js
│   ├── createCid.js
│   ├── generateHtmlClass.js
│   ├── mapDependencies.js
│   ├── removeComponent.js
│   ├── removeSelfClosing.js
│   ├── retrieveModels.js
│   ├── retrieveSlots.js
│   ├── setNodeRegion.js
│   ├── setUpHtmlClass.js
│   ├── stringToTemplate.js
│   └── templateToMap.js
├── lib/
│   ├── Attr/
│   │   ├── private/
│   │   │   ├── setDataAttribute.js
│   │   │   ├── setNoValueAttribute.js
│   │   │   ├── setPropOnComponent.js
│   │   │   ├── setRegularAttribute.js
│   │   │   ├── setSVGAttribute.js
│   │   │   └── setTransitionAttribute.js
│   │   ├── prototype/
│   │   │   ├── exec.js
│   │   │   ├── getState.js
│   │   │   ├── getValue.js
│   │   │   ├── retrieveArgument.js
│   │   │   ├── set.js
│   │   │   ├── setResult.js
│   │   │   └── update.js
│   │   ├── Attr.js
│   │   ├── Bind.js
│   │   ├── Break.js
│   │   ├── Class.js
│   │   ├── Condition.js
│   │   ├── Content.js
│   │   ├── Directive.js
│   │   ├── Event.js
│   │   ├── EventAltError.js
│   │   ├── Forget.js
│   │   ├── Html.js
│   │   ├── Is.js
│   │   ├── Loop.js
│   │   ├── Model.js
│   │   ├── Once.js
│   │   ├── Pre.js
│   │   ├── Ref.js
│   │   ├── Show.js
│   │   ├── Slot.js
│   │   ├── Style.js
│   │   ├── Text.js
│   │   ├── Transition.js
│   │   └── Vars.js
│   ├── Computed.js
│   ├── Data/
│   │   ├── prototype/
│   │   │   ├── addComponent.js
│   │   │   ├── dataImpacted.js
│   │   │   ├── dataUpdate.js
│   │   │   ├── fixIndexes.js
│   │   │   ├── hasComponent.js
│   │   │   ├── hasParent.js
│   │   │   ├── isSame.js
│   │   │   ├── removeComponent.js
│   │   │   ├── setData.js
│   │   │   └── unset.js
│   │   ├── static/
│   │   │   ├── addSequence.js
│   │   │   ├── getObject.js
│   │   │   ├── getValue.js
│   │   │   ├── hash.js
│   │   │   ├── propagate.js
│   │   │   ├── proxy.js
│   │   │   ├── proxyPop.js
│   │   │   ├── proxyPush.js
│   │   │   ├── proxyReverse.js
│   │   │   ├── proxyShift.js
│   │   │   ├── proxySort.js
│   │   │   ├── proxySplice.js
│   │   │   ├── proxyUnshift.js
│   │   │   ├── recognize.js
│   │   │   ├── startWatching.js
│   │   │   ├── stopWatching.js
│   │   │   └── treatValue.js
│   │   ├── Data.js
│   │   └── Data.js
│   ├── Facade.js
│   ├── Html/
│   │   ├── private/
│   │   │   ├── addNamespace.js
│   │   │   ├── addUnknownComponent.js
│   │   │   ├── announceComponent.js
│   │   │   ├── checkPropValue.js
│   │   │   ├── cloneNode.js
│   │   │   ├── disconnected.js
│   │   │   ├── doTransition.js
│   │   │   ├── generateNode.js
│   │   │   ├── getIdAfter.js
│   │   │   ├── getIdBefore.js
│   │   │   ├── getIdParent.js
│   │   │   ├── init.js
│   │   │   ├── initResults.js
│   │   │   ├── onHook.js
│   │   │   ├── prepareTransition.js
│   │   │   ├── realSetProp.js
│   │   │   ├── registerChild.js
│   │   │   ├── retrieveNode.js
│   │   │   ├── setData.js
│   │   │   ├── setProp.js
│   │   │   ├── setUpAllData.js
│   │   │   ├── setUpData.js
│   │   │   ├── setUpProp.js
│   │   │   ├── tryMount.js
│   │   │   ├── unregisterChild.js
│   │   │   └── updateWatcher.js
│   │   ├── prototype/
│   │   │   ├── connected.js
│   │   │   ├── create.js
│   │   │   ├── destroy.js
│   │   │   ├── emit.js
│   │   │   ├── forceUpdate.js
│   │   │   ├── has.js
│   │   │   ├── hasSlots.js
│   │   │   ├── insertElement.js
│   │   │   ├── is.js
│   │   │   ├── isComponent.js
│   │   │   ├── isPropNative.js
│   │   │   ├── nextTick.js
│   │   │   ├── off.js
│   │   │   ├── on.js
│   │   │   ├── once.js
│   │   │   ├── position.js
│   │   │   ├── retrieveSlotItems.js
│   │   │   ├── set.js
│   │   │   └── watch.js
│   │   ├── Anon.js
│   │   ├── Html.js
│   │   └── Proto.js
│   ├── Node/
│   │   ├── prototype/
│   │   │   ├── build.js
│   │   │   ├── clean.js
│   │   │   ├── conceive.js
│   │   │   ├── define.js
│   │   │   ├── init.js
│   │   │   ├── insert.js
│   │   │   ├── move.js
│   │   │   ├── remove.js
│   │   │   ├── setAll.js
│   │   │   ├── setClass.js
│   │   │   └── setStyle.js
│   │   ├── Component.js
│   │   ├── Internal.js
│   │   ├── Node.js
│   │   ├── Slot.js
│   │   ├── Svg.js
│   │   ├── Template.js
│   │   └── Text.js
│   ├── Options.js
│   ├── Parser.js
│   ├── ProtoHtml.js
│   ├── Registered.js
│   ├── Result.js
│   └── Watcher.js
└── mixins/
    ├── basic.js
    ├── browserNotification.js
    ├── cell.js
    ├── close.js
    ├── componentInside.js
    ├── config.js
    ├── data.js
    ├── dataEditor.js
    ├── dimensions.js
    ├── dropdown.js
    ├── editableList.js
    ├── empty.js
    ├── events.js
    ├── field.js
    ├── group.js
    ├── input.js
    ├── keepCool.js
    ├── keynav.js
    ├── list.js
    ├── localStorage.js
    ├── memory.js
    ├── observer.js
    ├── pageable.js
    ├── popup.js
    ├── position.js
    ├── resizer.js
    ├── row.js
    ├── serviceWorker.js
    ├── toggle.js
    ├── url.js
    └── view.js