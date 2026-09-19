# typescript-log-formatting
Log formatting class for use with the browser console.

## How to Use

This is a drop-in replacement for your log formatting in the browser. The <code>LogFormatter</code> class is intended to be modified to suit your needs and preferences. You could modify the source, but the first way to customize your log styling is at initialization with some optional config:

```
const lf = new LogFormatter({
    Colors: { NORMAL: 'white', ERROR: 'red', INFO: 'lightblue', WARNING: 'yellow', HIGHLIGHT: 'coral' },
    Volumes: { NORMAL: '1em', SOFT: '.5em', LOUD: '2em'}
});
const fmt = lf.Format; //alias to make calling the formatter more compact
```

That said, just use a console operation as usual, taking care to use the spread operator on the array returned from the formatting function:

```
console.log(...fmt(`#ilThis is an #hlimportant #ilmessage.`));
```

## But why???

Standardizing log message formats makes your log messages more consistent across the codebase. The more you log, the more noisy it can get. This solution also preserves line numbers, which is an advantage over other methods, such as creating a pass-through logger. A pass-through implementation, such as a class that calls <code>console.log</code> after performing some processing, all but ensures you'll always see the log message coming from the same line - which is not usually what you want.

This approach also works with other console functions, for example:

```
console.error(...fmt("#dn⚠️Ouch, a #ensuper terrible error #dnhas ocurred."));
```

The trade-off in terms of readability compared to <code>console.log("This is a fragment of %cred %ctext in the message", "color: red;", "color: white;")</code> should be obvious. While using <code>LogFormatter.Format</code> is more terse, that is more of a strength than a weakness. There is much more you could add to customize your log formatting to make it more useful. Have fun! 😎