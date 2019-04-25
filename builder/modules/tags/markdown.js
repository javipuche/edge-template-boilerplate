import edge from 'edge.js';
import marked from 'marked';

export class Markdown extends edge.BaseTag {
    constructor() {
        super();
        this.tagName = 'markdown';
        this.isBlock = true;
        this.seekable = true;
        this.selfclosed = false;
    }

    compile (compiler, lexer, buffer, { body, childs, lineno }) {
        childs.map((item) => {
            buffer.writeToOutput(marked(edge.renderString(item.body)));
        });
    }

    run () {}
}