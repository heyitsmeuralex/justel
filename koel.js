var el = (function() {
  var directProperties = {
    defaultValue: 'defaultValue',
    'for': 'htmlFor',
    html: 'innerHTML',
    text: 'textContent',
    unselectable: 'unselectable',
    value: 'value'
  };

  var booleanProperties = {
    autofocus: 1,
    checked: 1,
    defaultChecked: 1,
    disabled: 1,
    hidden: 1,
    multiple: 1,
    readOnly: 1,
    required: 1,
    selected: 1
  };

  var bindingProperties = {
    value: 1,
    selected: 1,
    checked: 1,
  };

  function setProperty(el, key, value) {
    var prop = directProperties[key];
    if (prop) {
      el[prop] = (value == null ? '' : '' + value);
    } else if (booleanProperties[key]) {
      el[key] = !!value;
    } else if (value == null) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, '' + value);
    }
  }

  function getProperty(el, key) {
    var prop = directProperties[key];
    if (prop) {
      return el[prop];
    } else if (booleanProperties[key]) {
      return !!el[key];
    } else {
      return el.getAttribute(key);
    }
  }

  function bindProperty(el, key, value) {
    if (/^on_/.test(key)) {
      key = key.slice('on_'.length);
      el.addEventListener(key, value);
      return;
    }

    setProperty(el, key, value);
  };

  return function(selectors, attrs, content) {
    if (attrs instanceof Array ||
        typeof attrs === 'string' || (attrs && attrs.appendChild)
    ) {
      content = attrs;
      attrs = {};
    }
    attrs = attrs || {};

    var extraClasses = [];

    var topParent;
    var result;
    selectors.split(/ +/g).forEach(function(selector) {
      var parts = selector.split(/([#.])/g);
      var tagName = parts[0] || 'div';
      var el = document.createElement(tagName);

      for (i=1, j=2; j < parts.length; i+=2, j+=2) {
        var value = parts[j];
        if (parts[i] == '#') {
          if (attrs.id) throw "Can't specify id twice";
          el.id = value;
        } else if (parts[i] == '.') {
          extraClasses.push(value);
        }
      }

      if (!topParent) topParent = el;
      if (result) result.appendChild(el);
      result = el;
    });

    var classList = attrs.class;
    delete attrs.class;
    if (attrs.className) {
      if (classList) throw "Can't set class twice";
      classList = attrs.className;
      delete attrs.className;
    }
    if (attrs.classList) {
      throw "Use .class instead";
    }

    for (key in attrs) {
      bindProperty(result, key, attrs[key]);
    }

    if (!content) {
      return topParent;
    }
    var hasContent = (attrs.text || attrs.textContent || attrs.html ||
                      attrs.innerHTML || attrs.innerText);
    if (hasContent) {
      throw "Cannot use both attrs and children to set content";
    }
    content = content || [];

    if (typeof content === 'string') {
      topParent.appendChild(document.createTextNode(content));
    } else {
      for (var child of content) {
        if (typeof child === 'string') {
          child = document.createTextNode(child);
        }

        topParent.appendChild(child);
      }
    }

    return topParent;
  };
}());

