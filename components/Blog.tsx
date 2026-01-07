import React, { useState, useMemo, useEffect } from 'react';
import { BlogPost } from '../types';
import { Calendar, Hash, ChevronRight, Terminal, X, Search, ChevronLeft, Clock, FileText, User, Zap, BookOpen, Loader2 } from 'lucide-react';
import { parseMarkdown, calculateReadTime, parseFrontMatter } from '../utils/markdown';

const Blog: React.FC = () => {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postPaths = import.meta.glob('/posts/*.md', {as: 'raw'});
        const loadedPosts = await Promise.all(
          Object.entries(postPaths).map(async ([_, module], index) => {
            const content = await module();
            const { metadata, content: bodyContent } = parseFrontMatter(content);
            let textContent = new DOMParser().parseFromString(parseMarkdown(bodyContent), 'text/html').body.textContent?.replace(/\s+/g, ' ').trim() ?? '';
            const excerpt = textContent.substring(0, 200) + '...';
            return {
              id: index + 1,
              title: metadata.title || 'Untitled Log',
              date: metadata.date || new Date().toISOString().split('T')[0],
              category: (metadata.category as 'system' | 'blog') || 'blog',
              tags: metadata.tags || [],
              author: metadata.author || 'Unknown',
              excerpt: excerpt,
              readTime: calculateReadTime(bodyContent),
              content: bodyContent
            } as BlogPost;
          })
        );
        
        const validPosts = loadedPosts.filter((p): p is BlogPost => p !== null);
        validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setPosts(validPosts);
      } catch (error) {
        console.error("Error loading blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 4;

  // Filtering
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
      
      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(start, start + itemsPerPage);
  }, [filteredPosts, currentPage]);

  useMemo(() => {
     setCurrentPage(1);
  }, [searchQuery, selectedTag]);

  // Actions
  const handleReadPost = (post: BlogPost) => {
    setActivePost(post);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setView('list');
    setActivePost(null);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
    setView('list');
  };

  const getThemeColors = (category: 'system' | 'blog') => {
    if (category === 'system') {
      return {
        text: 'text-tron-orange',
        border: 'border-tron-orange',
        bg: 'bg-tron-orange/10',
        hoverBorder: 'hover:border-tron-orange',
        hoverText: 'group-hover:text-tron-orange',
        icon: <Zap size={14} className="text-tron-orange" />
      };
    }
    return {
      text: 'text-tron-cyan',
      border: 'border-tron-cyan',
      bg: 'bg-tron-cyan/10',
      hoverBorder: 'hover:border-tron-cyan',
      hoverText: 'group-hover:text-tron-cyan',
      icon: <BookOpen size={14} className="text-tron-cyan" />
    };
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-tron-cyan gap-4">
        <Loader2 size={48} className="animate-spin" />
        <p className="font-orbitron tracking-widest text-lg">RETRIEVING DATA ARCHIVES...</p>
      </div>
    );
  }

  // Detail View
  const DetailView = () => {
    if (!activePost) return null;
    
    const theme = getThemeColors(activePost.category);
    
    const htmlContent = useMemo(() => {
      return parseMarkdown(activePost.content);
    }, [activePost.content]);

    const isSystem = activePost.category === 'system';
    
    const markdownStyles = `
      prose prose-invert max-w-none 
      
      prose-headings:font-orbitron prose-headings:font-bold prose-headings:tracking-wider prose-headings:mb-6
      ${isSystem ? 'prose-headings:text-tron-orange prose-headings:drop-shadow-[0_0_5px_rgba(255,153,0,0.4)]' : 'prose-headings:text-tron-cyan prose-headings:drop-shadow-[0_0_5px_rgba(0,240,255,0.4)]'}
      
      prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
      
      prose-p:font-rajdhani prose-p:text-lg prose-p:leading-relaxed prose-p:text-gray-300 prose-p:mb-6
      
      prose-strong:text-white prose-strong:font-bold
      
      prose-blockquote:border-l-4 prose-blockquote:bg-gray-900/40 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:my-8
      ${isSystem ? 'prose-blockquote:border-tron-orange prose-blockquote:text-tron-orange/90' : 'prose-blockquote:border-tron-cyan prose-blockquote:text-tron-cyan/90'}
      
      prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6
      prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-6
      prose-li:text-gray-300 prose-li:font-rajdhani prose-li:mb-2 prose-li:marker:text-gray-600
      
      prose-code:font-mono prose-code:text-sm prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
      ${isSystem ? 'prose-code:text-tron-orange prose-code:bg-tron-orange/10' : 'prose-code:text-tron-cyan prose-code:bg-tron-cyan/10'}
      
      prose-pre:bg-[#0a0a0f] prose-pre:border prose-pre:border-gray-800 prose-pre:rounded-lg prose-pre:p-4 prose-pre:shadow-inner
      
      prose-a:no-underline prose-a:border-b prose-a:border-opacity-50 hover:prose-a:border-opacity-100 prose-a:transition-all
      ${isSystem ? 'prose-a:text-tron-orange prose-a:border-tron-orange' : 'prose-a:text-tron-cyan prose-a:border-tron-cyan'}
      
      prose-hr:border-gray-800 prose-hr:my-8
    `;

    return (
      <div className="max-w-4xl mx-auto px-4 py-20 animate-fadeIn">
        
        <button 
          onClick={handleBackToList}
          className={`group flex items-center gap-2 mb-8 transition-colors ${theme.text} hover:text-white`}
        >
          <div className={`p-1 border rounded transition-colors ${theme.border} border-opacity-30 group-hover:border-opacity-100`}>
            <ChevronLeft size={16} />
          </div>
          <span className="font-orbitron tracking-widest text-sm">RETURN TO LOGS</span>
        </button>

        <article className="bg-black/40 border border-gray-800 rounded-lg overflow-hidden backdrop-blur-sm">
          
          <header className="p-8 md:p-12 border-b border-gray-800 bg-gradient-to-b from-gray-900/50 to-transparent">
             <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-mono mb-6">
                <span className={`flex items-center gap-2 bg-gray-900 px-3 py-1 rounded border border-opacity-20 ${theme.text} ${theme.border}`}>
                  {theme.icon} {activePost.category.toUpperCase()}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={14} /> {activePost.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={14} /> {activePost.readTime}
                </span>
                <span className="flex items-center gap-2">
                  <User size={14} /> {activePost.author}
                </span>
             </div>
             
             <h1 className="text-3xl md:text-5xl font-orbitron text-white mb-6 leading-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
               {activePost.title}
             </h1>

             <div className="flex flex-wrap gap-2">
                {activePost.tags.map(tag => (
                  <button 
                    key={tag}
                    onClick={() => handleTagClick(tag)} 
                    className="text-xs font-mono text-purple-400 bg-purple-500/5 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-400 px-2 py-1 rounded transition-all"
                  >
                    #{tag}
                  </button>
                ))}
             </div>
          </header>
          
        <div className={`p-8 md:p-12 ${markdownStyles}`} dangerouslySetInnerHTML={{ __html: htmlContent }} />

        </article>
      </div>
    );
  };

  // List View
  if (view === 'detail' && activePost) {
    return <DetailView />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-800 pb-6 gap-6">
        <div>
          <h2 className="text-4xl font-orbitron text-white mb-2">
            DATA LOGS<span className="text-tron-cyan animate-cursor-blink">_</span>
          </h2>
          <p className="text-tron-cyan text-lg tracking-widest">SYSTEM UPDATES & THOUGHTS</p>
        </div>
      </div>

      <div className="bg-gray-900/30 border border-gray-800 p-4 rounded-lg mb-10 backdrop-blur flex flex-col md:flex-row gap-4 items-center justify-between">
         
         <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-500 group-focus-within:text-tron-cyan transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="SEARCH PROTOCOLS..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/50 border border-gray-700 text-white pl-10 pr-4 py-2 rounded focus:outline-none focus:border-tron-cyan focus:shadow-neon-cyan transition-all font-mono text-sm uppercase"
            />
         </div>

         {selectedTag && (
            <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded animate-fadeIn">
               <span className="text-xs text-purple-400 font-mono">FILTER: #{selectedTag.toUpperCase()}</span>
               <button onClick={() => setSelectedTag(null)} className="text-purple-400 hover:text-white">
                 <X size={14} />
               </button>
            </div>
         )}
      </div>

      <div className="grid gap-8 mb-12">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => {
            const theme = getThemeColors(post.category);
            
            return (
              <article 
                key={post.id} 
                className={`group relative bg-black/40 border-l-2 border-gray-800 ${theme.hoverBorder} p-6 md:p-8 transition-all duration-300 hover:bg-gray-900/20`}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  
                  <div className="md:w-48 flex flex-col gap-2 shrink-0 border-b md:border-b-0 md:border-r border-gray-800 pb-4 md:pb-0 md:pr-6">
                    <div className={`self-start px-2 py-0.5 rounded border border-opacity-30 text-[10px] font-orbitron tracking-wider mb-2 ${theme.bg} ${theme.border} ${theme.text}`}>
                       {post.category.toUpperCase()}
                    </div>

                    <div className={`font-orbitron text-xl ${theme.text}`}>
                      {new Date(post.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }).toUpperCase()}
                    </div>
                    <div className="text-gray-500 font-mono text-sm">
                      {new Date(post.date).getFullYear()}
                    </div>
                    <div className="mt-auto pt-2 hidden md:block">
                       <span className="text-xs text-gray-600 font-mono uppercase">ID: #{post.id.toString().padStart(4, '0')}</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className={`text-2xl font-orbitron text-white ${theme.hoverText} transition-colors mb-3`}>
                      {post.title}
                    </h3>
                    <p className="text-gray-400 font-rajdhani text-lg leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <button 
                            key={tag}
                            onClick={(e) => { e.stopPropagation(); handleTagClick(tag); }}
                            className={`flex items-center gap-1 text-xs font-mono px-2 py-1 rounded transition-colors border
                              ${selectedTag === tag 
                                ? 'bg-purple-500/20 border-purple-500 text-purple-400' 
                                : 'bg-gray-900 border-gray-800 text-gray-500 hover:text-purple-400 hover:border-purple-500/50'}`}
                          >
                            <Hash size={10} />
                            {tag}
                          </button>
                        ))}
                      </div>

                      <button 
                        onClick={() => handleReadPost(post)}
                        className={`cybr-btn cybr-btn-sm ${post.category === 'system' ? 'orange' : ''}`}
                        style={{ '--primary': post.category === 'system' ? '#ff9900' : '#00f0ff', '--color': post.category === 'system' ? '#ff9900' : '#00f0ff' } as React.CSSProperties}
                      >
                         <span className="relative z-10 flex items-center gap-2">
                           Read Log <Terminal size={14} />
                         </span>
                         <span aria-hidden className="cybr-btn__glitch">ACCESS_</span>
                      </button>
                    </div>
                  </div>

                </div>
              </article>
            );
          })
        ) : (
          <div className="text-center py-20 border border-dashed border-gray-800 rounded">
            <FileText size={48} className="mx-auto text-gray-700 mb-4" />
            <p className="text-gray-500 font-orbitron text-xl">NO DATA FOUND FOR CURRENT QUERY</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedTag(null); }}
              className="mt-4 text-tron-cyan hover:underline"
            >
              RESET FILTERS
            </button>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
           <button 
             onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
             disabled={currentPage === 1}
             className="p-2 border border-gray-800 rounded text-gray-500 hover:text-tron-cyan hover:border-tron-cyan disabled:opacity-30 disabled:hover:text-gray-500 transition-all"
           >
             <ChevronLeft size={20} />
           </button>
           
           <div className="flex gap-2 font-mono text-sm">
             {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
               <button
                 key={page}
                 onClick={() => setCurrentPage(page)}
                 className={`w-8 h-8 flex items-center justify-center border rounded transition-all
                   ${currentPage === page 
                     ? 'bg-tron-cyan/20 border-tron-cyan text-tron-cyan shadow-[0_0_10px_rgba(0,240,255,0.3)]' 
                     : 'border-gray-800 text-gray-500 hover:border-gray-600'}`}
               >
                 {page}
               </button>
             ))}
           </div>

           <button 
             onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
             disabled={currentPage === totalPages}
             className="p-2 border border-gray-800 rounded text-gray-500 hover:text-tron-cyan hover:border-tron-cyan disabled:opacity-30 disabled:hover:text-gray-500 transition-all"
           >
             <ChevronRight size={20} />
           </button>
        </div>
      )}

    </div>
  );
};

export default Blog;