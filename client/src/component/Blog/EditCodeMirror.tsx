import CodeMirror, { BasicSetupOptions } from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { EditorView } from "@codemirror/view";

interface CodeMirrorProps {
    text: string;
    sample_txt: string;
    onChange: (value: string, viewUpdate: any) => void;
}

export default function EditCodeMirror(props: CodeMirrorProps) {
    const { text, sample_txt, onChange } = props;

    return (
        <CodeMirror
            value={text}
            placeholder={sample_txt}
            extensions={[fixedHeightEditor, fontSize, markdown({ base: markdownLanguage, codeLanguages: languages }), EditorView.lineWrapping]}
            onChange={onChange}
            basicSetup={option}
            style={{}}
        />
    )
}

const fixedHeightEditor = EditorView.theme({
    ".cm-scroller": {
        overflowX: "auto"
    },
    "&": { height: "100vh" },
})

const fontSize = EditorView.baseTheme({
    '.cm-content': {
        fontFamily: 'Roboto, sans-serif',
    },
});

const option: BasicSetupOptions = {
    lineNumbers: false,
    highlightActiveLine: false,
}