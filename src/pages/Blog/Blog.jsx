import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, User, Clock, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import { blogPosts } from '../../data/mockData';
import Footer from '../../components/Footer/Footer';
import Ajay from '../../assets/Ajay.webp';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTag, setActiveTag] = useState(null);

  // Filter posts based on search query, category, and tag
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === 'all' || post.category.toLowerCase() === activeCategory;

    const matchesTag =
      !activeTag || post.excerpt.toLowerCase().includes(activeTag.toLowerCase());

    return matchesSearch && matchesCategory && matchesTag;
  });

  const handleOpenPost = (post) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClosePost = () => {
    setSelectedPost(null);
  };

  const tags = ['Wedding', 'Editorial', 'Santorini', 'Cinema', 'Proposal', 'Italy'];

  return (
    <div className="min-h-screen bg-bg-dark pt-24 text-black font-body">

      {/* Blog Page Banner */}
      <section className="relative h-[35vh] md:h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1920&q=80"
          alt="Blog Header"
          className="absolute inset-0 w-full h-full object-cover opacity-45 grayscale"
        />
        <div className="relative z-20 text-center px-6">
          <h1 className="font-heading text-4xl md:text-5xl font-light text-white tracking-wide uppercase">
            Wedding Journal
          </h1>
          <p className="text-[10px] font-heading tracking-[0.25em] text-brand-pink uppercase mt-2 font-semibold">
            Home / Journal
          </p>
        </div>
      </section>

      {/* Main Content Split Section (70/30) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* LEFT COLUMN: 70% Width (Col span 8) */}
          <main className="lg:col-span-8 space-y-12">
            <AnimatePresence mode="wait">
              {!selectedPost ? (
                // LIST VIEW
                <motion.div
                  key="list-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-12"
                >
                  {filteredPosts.length === 0 ? (
                    <div className="text-center py-20 text-text-muted text-sm font-light">
                      No posts match your search filters.
                    </div>
                  ) : (
                    filteredPosts.map((post) => (
                      <article key={post.id} className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm p-5 space-y-6">
                        {/* Featured Image */}
                        <div className="overflow-hidden aspect-[16/9] rounded-xl cursor-pointer" onClick={() => handleOpenPost(post)}>
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                          />
                        </div>

                        {/* Metadata Tag */}
                        <div className="flex items-center space-x-3 text-[10px] font-heading tracking-widest text-brand-pink uppercase font-semibold">
                          <span>{post.date}</span>
                          <span className="text-black/20">•</span>
                          <span className="text-black/50">by {post.author}</span>
                          <span className="text-black/20">•</span>
                          <span className="text-black/50">0 Comments</span>
                        </div>

                        {/* Heading Title */}
                        <h2
                          onClick={() => handleOpenPost(post)}
                          className="font-heading text-2xl md:text-3xl font-light text-black hover:text-brand-pink cursor-pointer transition-colors leading-tight"
                        >
                          {post.title}
                        </h2>

                        {/* Content Excerpt */}
                        <p className="text-sm text-text-muted font-light leading-relaxed">
                          {post.excerpt}
                        </p>

                        {/* Bottom Actions Row */}
                        <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                          <button
                            onClick={() => handleOpenPost(post)}
                            className="inline-flex items-center space-x-2 border border-black/10 hover:border-brand-pink hover:bg-brand-pink/5 text-[9px] font-heading tracking-[0.2em] text-black hover:text-brand-pink uppercase px-5 py-2.5 rounded-full transition-all font-semibold"
                          >
                            <span>Read More</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>

                          {/* Share Icon triggers mock clipboard copy */}
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(window.location.href + `/${post.id}`);
                              alert("Article link copied!");
                            }}
                            className="text-black/40 hover:text-brand-pink transition-colors p-2"
                            title="Copy link"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </article>
                    ))
                  )}

                  {/* Pagination placeholder */}
                  {filteredPosts.length > 0 && (
                    <div className="pt-8 flex justify-center space-x-2">
                      <span className="w-8 h-8 rounded-full border-2 border-brand-pink flex items-center justify-center text-sm font-heading font-semibold text-brand-pink bg-brand-pink/10">1</span>
                      <span className="w-8 h-8 rounded-full border border-black/10 hover:border-brand-pink flex items-center justify-center text-sm font-heading font-semibold text-black hover:text-brand-pink cursor-pointer transition-all">2</span>
                      <span className="w-8 h-8 rounded-full border border-black/10 hover:border-brand-pink flex items-center justify-center text-sm font-heading font-semibold text-black hover:text-brand-pink cursor-pointer transition-all">&gt;</span>
                    </div>
                  )}
                </motion.div>
              ) : (
                // DETAIL READ VIEW
                <motion.div
                  key="read-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border border-black/5 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm"
                >
                  <button
                    onClick={handleClosePost}
                    className="inline-flex items-center space-x-2 text-[10px] font-heading tracking-[0.2em] text-brand-pink hover:text-black uppercase transition-colors font-semibold"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Listing</span>
                  </button>

                  <div className="overflow-hidden aspect-[16/9] rounded-xl">
                    <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex items-center space-x-3 text-[10px] font-heading tracking-widest text-brand-pink uppercase font-semibold">
                    <span>{selectedPost.date}</span>
                    <span className="text-black/20">•</span>
                    <span className="text-black/50">by {selectedPost.author}</span>
                    <span className="text-black/20">•</span>
                    <span className="text-black/50">{selectedPost.category}</span>
                  </div>

                  <h1 className="font-heading text-3xl md:text-4xl font-light text-black leading-tight">
                    {selectedPost.title}
                  </h1>

                  <div className="text-sm text-text-muted font-light leading-relaxed space-y-6 border-t border-black/5 pt-6">
                    <p className="first-letter:text-5xl first-letter:font-heading first-letter:float-left first-letter:mr-3 first-letter:text-brand-pink first-letter:font-light">
                      {selectedPost.content}
                    </p>
                    <p>
                      Designing a destination wedding photoshoot is about crafting cohesive styles. The choice of gowns, colors, and locations interact dynamically. High-end photography requires aligning light angles and timing. In places like Italy's Lake Como, the cliffs filter light dramatically, giving a unique visual aesthetic.
                    </p>
                    <p>
                      Ultimately, standard poses fail to capture real memories. By introducing movement such as having couples take a slow stroll or dance under the dusk skies we invite natural expressions. The camera acts as a fine-art portal, capturing the quiet gestures and pure romance that define destination weddings.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* RIGHT COLUMN: 30% Width (Col span 4 Sidebar) */}
          <aside className="lg:col-span-4 space-y-10">

            {/* ABOUT WIDGET */}
            <div className="bg-white border border-black/5 rounded-2xl p-6 shadow-sm text-center space-y-4">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-brand-pink border-b border-black/5 pb-3">
                About
              </h3>
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto border-2 border-brand-pink/20">
                <img
                  src={Ajay}
                  alt="Ajay Benjamin biography avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-heading text-sm text-black font-semibold">Ajay Benjamin</h4>
              <p className="text-[11px] text-text-muted font-light leading-relaxed">
                An engineer turned photographer and storyteller. Ajay Benjamin is the creative force behind Zero Gravity Photography, capturing timeless wedding stories and raw editorial emotions globally.
              </p>
            </div>

            {/* SEARCH WIDGET */}
            <div className="bg-white border border-black/5 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-brand-pink border-b border-black/5 pb-3">
                Search
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type search keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-bg-dark border border-black/10 focus:border-brand-pink rounded-full py-2 pl-4 pr-10 text-[11px] outline-none transition-all text-black placeholder:text-black/35 font-medium"
                />
                <Search className="w-4 h-4 text-black/35 absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* CATEGORIES LIST */}
            <div className="bg-white border border-black/5 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-brand-pink border-b border-black/5 pb-3">
                Categories
              </h3>
              <ul className="space-y-2 text-sm font-light text-text-muted font-heading">
                {[
                  { name: 'All Collections', value: 'all', count: blogPosts.length },
                  { name: 'Planning Vows', value: 'planning', count: 1 },
                  { name: 'Editorial Shoots', value: 'editorial', count: 1 },
                  { name: 'Cinematography Film', value: 'cinema', count: 1 },
                  { name: 'Fine-Art Portrait', value: 'photography', count: 1 },
                ].map((cat) => (
                  <li key={cat.value} className="flex justify-between items-center">
                    <button
                      onClick={() => {
                        setActiveCategory(cat.value);
                        setSelectedPost(null);
                      }}
                      className={`hover:text-brand-pink text-left transition-colors font-medium ${activeCategory === cat.value ? 'text-brand-pink font-semibold' : ''
                        }`}
                    >
                      {cat.name}
                    </button>
                    <span className="text-[10px] text-black/40 font-semibold bg-bg-dark px-2.5 py-0.5 rounded-full border border-black/5">
                      {cat.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* LATEST POSTS */}
            <div className="bg-white border border-black/5 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-brand-pink border-b border-black/5 pb-3">
                Latest Posts
              </h3>
              <div className="space-y-4">
                {blogPosts.slice(0, 3).map((post) => (
                  <div
                    key={post.id}
                    onClick={() => handleOpenPost(post)}
                    className="flex items-center space-x-3 cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-bg-dark border border-black/5">
                      <img src={post.image} alt="thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-[11px] font-heading font-medium text-black group-hover:text-brand-pink transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </h4>
                      <div className="text-[9px] text-black/40 font-semibold uppercase tracking-wider">{post.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TAG CLOUD */}
            <div className="bg-white border border-black/5 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-brand-pink border-b border-black/5 pb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setActiveTag(activeTag === tag ? null : tag);
                      setSelectedPost(null);
                    }}
                    className={`text-[9px] font-heading tracking-wider uppercase border rounded px-3 py-1.5 transition-all ${activeTag === tag
                      ? 'bg-brand-pink text-bg-dark border-brand-pink font-semibold'
                      : 'border-black/10 hover:border-brand-pink/40 text-black/70'
                      }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </div>

      <Footer />
    </div>
  );
}
