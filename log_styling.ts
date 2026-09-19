//standardized logging styles
export namespace Log {

    const preferredScheme = window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ? 'dark' : 'light'

    //need to define index signature to
    //avoid "can't use string as index" errors
    export const Formats: {[index: string]: string} = {
        //all of these options are shorthand
        //where v = volume, c = color, and e = emphasis
        //volume is how loud the message segment should be using font-size
        //emphasis used for log message segments that should stand out
        '#vn': 'font-size: 1em;', //log volume normal
        '#vs': 'font-size: .75em;', //log volume soft
        '#vl': 'font-size: 1.25em;', //log volume loud
        '#cd': preferredScheme === 'light' ? 'color: black;' : 'color: white;', //default font color
        '#cb': 'color: black;',
        '#ci': 'color: indigo;',
        '#cp': 'color: hotpink;',
        '#cy': 'color: yellow;',
        '#cr': 'color: red;',
        '#ei': 'font-style: italic;', //emphasize italic
        '#eb': 'font-weight: bold;' //emphasize in bold
    };

    //takes a message using the Formats above instead of %c
    //extracts those formats, replaces the Formats with %c,
    //then returns an array with the new message and styles
    export function Format (message: string) {

        const regex = /#[\w-]{2}/g; //all message segments marked with # Formats
        const matches = [...message.matchAll(regex)].flat(); //array of each format specified in the message
        //console.log(matches);
        
        let new_message = message.replaceAll(regex, '%c'); //replace all # Formats with %c so console can parse the message
        const new_formats: Array<string> = matches.map((v) => { //get an array of style strings to apply in order of appearance
            return Formats[v]
        });
        //console.log(new_formats)
        return [`${new_message}`].concat(new_formats); //return an array with console arguments in order
        
    }

}