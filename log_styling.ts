//standardized logging styles
export class LogFormatter {

    private Colors: LogFormatter.Colors = {
        NORMAL: 'white',
        ERROR: 'red',
        WARNING: 'yellow',
        INFO: 'lightblue',
        HIGHLIGHT: 'hotpink'
    };

    private Volumes: LogFormatter.Volumes = {
        NORMAL: '1em',
        SOFT: '.75em',
        LOUD: '1.25em'
    };

    private Emphasis = {
        BOLD: 'font-weight: bold',
        ITALICS: 'font-style: italics'
    }

    private options: LogFormatter.LogFormatterOptions;
    //need to define index signature to
    //avoid "can't use string as index" errors
    private formats: {[index: string]: string};

    constructor (options?: LogFormatter.LogFormatterOptions) {

        this.options = options ? options : { Colors: this.Colors, Volumes: this.Volumes };
        this.formats =  {
            /////////////////////////////////////////////////////////////////
            //all of these options are shorthand
            //d = default, e = error, i = info, w = warning, h = highlight
            /////////////////////////////////////////////////////////////////
            //all the defaults...
            '#dn': `color: ${this.options.Colors.NORMAL}; font-size: ${this.options.Volumes.NORMAL};`, 
            '#ds': `color: ${this.options.Colors.NORMAL}; font-size: ${this.options.Volumes.SOFT};`,
            '#dl': `color: ${this.options.Colors.NORMAL}; font-size: ${this.options.Volumes.LOUD}`,
            '#db': `color: ${this.options.Colors.NORMAL}; font-size: ${this.options.Volumes.NORMAL}; ${this.Emphasis.BOLD};`,
            '#di': `color: ${this.options.Colors.NORMAL}; font-size: 1em; ${this.Emphasis.ITALICS};`,
            //all the errors...
            '#en': `color: ${this.options.Colors.ERROR}; font-size: ${this.options.Volumes.NORMAL};`, 
            '#es': `color: ${this.options.Colors.ERROR}; font-size: ${this.options.Volumes.SOFT};`,
            '#el': `color: ${this.options.Colors.ERROR}; font-size: ${this.options.Volumes.LOUD}`,
            '#eb': `color: ${this.options.Colors.ERROR}; font-size: ${this.options.Volumes.NORMAL}; ${this.Emphasis.BOLD};`,
            '#ei': `color: ${this.options.Colors.ERROR}; font-size: 1em; ${this.Emphasis.ITALICS};`,
            //all the infos...
            '#in': `color: ${this.options.Colors.INFO}; font-size: ${this.options.Volumes.NORMAL};`,
            '#is': `color: ${this.options.Colors.INFO}; font-size: ${this.options.Volumes.SOFT};`,
            '#il': `color: ${this.options.Colors.INFO}; font-size: ${this.options.Volumes.LOUD}`,
            '#ib': `color: ${this.options.Colors.INFO}; font-size: ${this.options.Volumes.NORMAL}; ${this.Emphasis.BOLD};`,
            '#ii': `color: ${this.options.Colors.INFO}; font-size: 1em; ${this.Emphasis.ITALICS};`,
            //all the warnings...
            '#wn': `color: ${this.options.Colors.WARNING}; font-size: ${this.options.Volumes.NORMAL};`,
            '#ws': `color: ${this.options.Colors.WARNING}; font-size: ${this.options.Volumes.SOFT};`,
            '#wl': `color: ${this.options.Colors.WARNING}; font-size: ${this.options.Volumes.LOUD}`,
            '#wb': `color: ${this.options.Colors.WARNING}; font-size: ${this.options.Volumes.NORMAL}; ${this.Emphasis.BOLD};`,
            '#wi': `color: ${this.options.Colors.WARNING}; font-size: 1em; ${this.Emphasis.ITALICS};`,
            //all the highlights
            '#hn': `color: ${this.options.Colors.HIGHLIGHT}; font-size: ${this.options.Volumes.NORMAL};`,
            '#hs': `color: ${this.options.Colors.HIGHLIGHT}; font-size: ${this.options.Volumes.SOFT};`,
            '#hl': `color: ${this.options.Colors.HIGHLIGHT}; font-size: ${this.options.Volumes.LOUD}`,
            '#hb': `color: ${this.options.Colors.HIGHLIGHT}; font-size: ${this.options.Volumes.NORMAL}; ${this.Emphasis.BOLD};`,
            '#hi': `color: ${this.options.Colors.HIGHLIGHT}; font-size: 1em; ${this.Emphasis.ITALICS};`,
        };
    }

    //takes a message using the Formats above instead of %c
    //extracts those formats, replaces the Formats with %c,
    //then returns an array with the new message and styles
    Format = (message: string) => {

        const regex = /#[\w-]{2}/g; //all message segments marked with # Formats
        const matches = [...message.matchAll(regex)].flat(); //array of each format specified in the message
        
        let new_message = message.replaceAll(regex, '%c'); //replace all # Formats with %c so console can parse the message
        const new_formats: Array<string> = matches.map((v) => { //get an array of style strings to apply in order of appearance
            return this.formats[v]
        });
        
        return [`${new_message}`].concat(new_formats); //return an array with console arguments in order
        
    }

}

export namespace LogFormatter {

    export type Colors = {
        NORMAL: string,
        ERROR: string,
        INFO: string,
        WARNING: string,
        HIGHLIGHT: string
    };

    export type Volumes = {
        NORMAL: string,
        SOFT: string,
        LOUD: string
    };

    export type LogFormatterOptions = {
        Colors: LogFormatter.Colors,
        Volumes: LogFormatter.Volumes
    };

}