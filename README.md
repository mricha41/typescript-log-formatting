# typescript-log-formatting
Log formatting routine for use with the browser console.

## How to Use

This is a drop-in replacement for your logging in the browser. It is intended to be modified to suit your needs and preferences. That said, just use a console operation as usual, taking care to use the spread operator on the array returned from the formatting function:

```
console.log(...Log.Format(`#cdThis is an #vl#cpimportant #vn#cdmessage.`));
```

## But why???

Standardizing log message formats makes your log messages more consistent across the codebase. The more you log, the more noisy it can get. This solution also preserves line numbers, which is an advantage over other methods, such as creating a pass-through logger. A pass-through implementation, such as a class that calls <code>console.log</code> after performing some processing, all but ensures you'll always see the log message coming from the same line - which is not usually what you want.

This approach also works with other console functions, for example:

```
console.error(...Log.Format("#cdOuch, a #crsuper terrible error #cdhas ocurred."));
```

The trade-off in terms of readability compared to <code>console.log("This is a fragment of %cred %ctext in the message", "color: red;", "color: white;")</code> should be obvious. Although using <code>Log.Format</code> is more terse, that is more of a strength than a weakness. Your mileage may vary.
