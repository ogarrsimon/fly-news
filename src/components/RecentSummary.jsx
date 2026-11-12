import React from 'react'
import { useGlobalContext } from '../context/news_context';
import { CiViewList } from "react-icons/ci";
import { Link } from 'react-router-dom';

const RecentSummary = () => {
  const { recentNewsSummary, newsUrl } = useGlobalContext();

  if (recentNewsSummary === null) {
    return(
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Summaries</h3>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6">
          <span className="text-4xl text-slate-400"><CiViewList /></span>
          </div>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No summaries yet</h4>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-0">Paste a news article link in the box above to generate your first AI-powered summary.</p>
        </div>
      </section>
    )
  }
  
  return (

    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Recent Summaries
        </h3>

        <Link
          to="/recent"
          className="text-primary font-semibold text-sm hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {recentNewsSummary.map((summary, index) => (
          <Link
            to={`/recent/${encodeURIComponent(summary.title)}`}
            key={index}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary/40 transition-all cursor-pointer group shadow-sm overflow-hidden"
          >
            <img
              src={summary.newsSummary.mainImage}
              alt={summary.newsSummary.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-5">
              <div className="flex justify-between items-start gap-3 mb-4">
                <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {summary.newsSummary.impact_category}
                </span>

                <span className="text-xs text-slate-400 shrink-0">
                  2 hours ago
                </span>
              </div>

              <h4 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-2 line-clamp-2">
                {summary.newsSummary.title}
              </h4>

              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                {summary.newsSummary.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default RecentSummary