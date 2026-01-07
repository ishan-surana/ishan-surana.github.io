import { marked } from 'marked';

export interface FrontMatter {
  title?: string;
  date?: string;
  author?: string;
  category?: 'system' | 'blog';
  tags?: string[];
  [key: string]: any;
}

export const parseMarkdown = (markdown: string): string => {
  try {
    return marked.parse(markdown) as string;
  } catch (error) {
    console.error("Markdown parsing failed:", error);
    return markdown;
  }
};

// Estimated read time based on 200 wpm avg
export const calculateReadTime = (content: string): string => {
  const plainText = content.replace(/[#*`_\[\]]/g, ' '); 
  const words = plainText.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

// Top metadata extraction
export const parseFrontMatter = (fileContent: string): { metadata: FrontMatter, content: string } => {
  const match = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]+([\s\S]*)$/.exec(fileContent);

  if (!match) return { metadata: {}, content: fileContent.replace(/^# .*\r?\n+/, '') };

  const rawYaml = match[1];
  const content = match[2].replace(/^# .*\r?\n+/, '');
  const metadata: FrontMatter = {};

  rawYaml.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      if (value.startsWith('[') && value.endsWith(']')) metadata[key] = value.slice(1, -1).split(',').map(item => item.trim().replace(/^['"]|['"]$/g, ''));
      else metadata[key] = value.replace(/^['"]|['"]$/g, '');
    }
  });
  return { metadata, content };
};