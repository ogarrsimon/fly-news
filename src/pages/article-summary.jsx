import React, {useEffect} from 'react'
import { useGlobalContext } from '../context/news_context.jsx'
import { Link } from 'react-router-dom';
const Summary = () => {
    const {isLoading, error, handleCopySummary, getNewsText, newsContent, newsUrl} = useGlobalContext();
    
    useEffect(() => {
        if(newsUrl) {
            getNewsText(newsUrl);
        }
    }, []);


    if(isLoading) {
        return (
            <div className="flex items-center h-dvh justify-center">
                <div className="spinner border-2 animate-spin w-20 rounded-full text-black h-20 border-t-0 border-l-0"></div>
            </div>
        )
    }

    if(error) {
      return (
        <div className="flex w-full items-center justify-center h-96">
          <h2 className='text-black font-bold text-2xl'>opps! there seems to be an error</h2>
        </div>
      )
    }

  return (
<section className="flex-1 w-full min-w-0 px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-12 lg:py-12">
  <div className="w-full max-w-4xl mx-auto min-w-0">

    {/* Breadcrumb Navigation */}
    <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-6 sm:mb-8 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
      <a className="hover:text-primary transition-colors" href="#">
        Home
      </a>
      <span className="material-symbols-outlined text-xs">
        chevron_right
      </span>
      <a
        className="hover:text-primary transition-colors break-words"
        href="#"
      >
        {newsContent.impact_category}
      </a>
      <span className="material-symbols-outlined text-xs">
        chevron_right
      </span>
      <span className="text-primary font-medium">
        Article Summary
      </span>
    </nav>

    {/* Article Header */}
    <div className="mb-6 sm:mb-8 min-w-0">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-black bg-primary/10 rounded">
          {newsContent.impact_category}
        </span>
        <span className="text-slate-400 text-xs">•</span>
        <span className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
          6 min read original
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-slate-900 dark:text-slate-100 leading-tight tracking-tight mb-4 break-words">
        {newsContent.title}
      </h2>

      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 text-slate-500 dark:text-slate-400 text-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-base shrink-0">
            calendar_today
          </span>
          <span>{newsContent.date}</span>
        </div>

        <div className="flex items-start gap-2 min-w-0">
          <span className="material-symbols-outlined text-base shrink-0">
            link
          </span>
          <a
            className="text-primary hover:underline font-medium break-all min-w-0"
            target="_blank"
            rel="noopener noreferrer"
            href={newsUrl}
          >
            {newsUrl}
          </a>
        </div>
      </div>
    </div>

    {/* Article Image */}
    <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-10 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10 pointer-events-none" />
      <img
        alt="Solar Panels"
        className="w-full h-full object-cover"
        src={newsContent.mainImage}
        loading="lazy"
      />
    </div>

    {/* Generated Summary */}
    <div className="bg-white dark:bg-slate-900/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10 border border-slate-200 dark:border-slate-800 shadow-sm min-w-0">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary shrink-0">
            auto_awesome
          </span>
          Generated Summary
        </h3>

        <span className="text-xs font-medium text-slate-400 italic">
          Summarized in 2 seconds
        </span>
      </div>

      <div className="text-slate-700 dark:text-slate-300 text-justify max-w-none leading-7 sm:leading-8 break-words">
        <p className="whitespace-pre-line">
          {newsContent.summary}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_1fr_auto] gap-3">

        <button onClick={handleCopySummary} className="w-full min-w-0 flex items-center justify-center gap-2 bg-purple-800 text-white px-4 sm:px-6 py-3.5 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/25">
          <span className="material-symbols-outlined">
            content_copy
          </span>
          Copy Summary
        </button>

        <button className="w-full min-w-0 flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 sm:px-6 py-3.5 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
          <span className="material-symbols-outlined">
            save
          </span>
          Save Article
        </button>

        <button
          aria-label="More options"
          className="w-full md:w-14 min-h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
        >
          <span className="material-symbols-outlined">
            more_horiz
          </span>
        </button>
      </div>
    </div>

    {/* Potential Implications */}
    <div className="mt-6 sm:mt-8 bg-white dark:bg-slate-900/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10 border border-slate-200 dark:border-slate-800 shadow-sm min-w-0">

      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary shrink-0">
            lightbulb
          </span>
          Potential Implications
        </h3>
      </div>

      <ul className="space-y-5 sm:space-y-6">
        {newsContent.implications.map((point, index) => (
          <li key={index} className="flex items-start gap-3 sm:gap-4 min-w-0">
            <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-0.5">
              <span className="material-symbols-outlined text-black text-[14px]">
                eco
              </span>
            </span>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed min-w-0 break-words">
              {point}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </div>
</section>
)}

export default Summary