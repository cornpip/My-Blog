import 'github-markdown-css';
import '../../css/Reactmd.module.css'
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter'
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw';
import { Box } from '@mui/material';

interface ReactMdProps {
    text: string
}

const CodeBlock: React.FC<any> = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
        <SyntaxHighlighter language={match[1]} PreTag="div" {...props} style={github} customStyle={{
            margin: "0",
            padding: "0",
            background: 'inherit',
            backgroundColor: 'inherit',
        }}>
            {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
    ) : (
        <code className={className} {...props}>
            {children}
        </code>
    );
};

export default function ReactMd(props: ReactMdProps) {
    const { text } = props;

    const renderers = {
        code: CodeBlock,
    };

    return (
        <Box sx={{ height: "100vh", overflow: "auto" }}>
            <div className='markdown-body'>
                <ReactMarkdown
                    remarkPlugins={[rehypeHighlight, remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={renderers}>
                    {text}
                </ReactMarkdown>
            </div>
        </Box>
    )
}