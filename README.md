<h1 align='center'> 🤹 justel </h1>

`justel` is [koel](https://github.com/tjvr/koel) without **ko**.

---

**el** is a helper function for creating DOM elements.

For background, read the [blog post about Sugared DOM](http://blog.fastmail.com/2012/02/20/building-the-new-ajax-mail-ui-part-2-better-than-templates-building-highly-dynamic-web-pages/), which this function is based on.

el takes three arguments: `selector`, `attrs`, and `children`. Either or both
of the last two arguments may be omitted.

  - **`selector`** looks like a CSS selector. It consists of a tag name,
    followed by `#the-id` and then many `.class-names`. Any of them may
    be omitted; the default tag is `div`.

    Examples:

    ```js
    el('span');       // => <span />
    el('.hat-shop');  // => <div class="hat-shop" />
    el('');           // => <div />

    el('div#main.blue.very-big');
    // => <div id="main" class="blue very-big" />
    ```

  - **`attrs`** is a dictionary of attributes. These will be set as attributes
    on the resulting DOM element.

    Example:

    ```js
    el('a', {
      href: 'http://google.com',
      target: '_blank',
    }, "follow this link");
    ```

    The following property aliases are supported: `class` `className`
    `defaultValue` `for` `html` `text` `value`

    All escaping is handled by the browser.

    To bind **event handlers**, use special <code>on_*«event»*</code>
    attributes:

    ```js
    el('button', {
      on_click: function(event) {
        // do stuff
      },
    }, "click me");
    ```

  - **`children`** is a string or an array.

    If it's a string, it will be used instead of the `textContent` property.
    (You may not set the text both ways on the same element.)

    Otherwise, each element of the array is either a string or a DOM element.
    Strings will be converted into text nodes.

    Example:

    ```js
    el('h1', "Hi there!");  // => <h1>Hi there!</h1>
    ```

-------------------------------------------------------------------------------

### License

MIT. **justel** is just half of [koel](https://github.com/tjvr/koel)!
