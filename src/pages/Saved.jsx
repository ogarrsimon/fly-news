
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  BookmarkCheck,
  Trash2,
  ExternalLink,
  CalendarDays,
  ArrowUpRight,
  Newspaper,
  BookmarkX,
} from "lucide-react";

const Saved = () => {
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [articleToDelete, setArticleToDelete] = useState(null);

  useEffect(() => {
    try {
      const storedArticles = JSON.parse(
        localStorage.getItem("saved_articles") || "[]"
      );
      setSavedArticles(
        Array.isArray(storedArticles) ? storedArticles : []
      );
    } catch (error) {
      console.error("Error loading saved articles:", error);
      setSavedArticles([]);
    }
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = savedArticles
      .map((article) => {
        const summary = article.newsSummary || {};
        return summary.impact_category || summary.category;
      })
      .filter(Boolean);

    return ["All", ...new Set(uniqueCategories)];
  }, [savedArticles]);

  const filteredArticles = useMemo(() => {
    return savedArticles.filter((article) => {
      const summary = article.newsSummary || {};
      const title = summary.title || "";
      const description =
        summary.summary ||
        summary.description ||
        summary.excerpt ||
        "";

      const matchesSearch = `${title} ${description} ${article.articleUrl}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const category = summary.impact_category || summary.category;
      const matchesCategory =
        selectedCategory === "All" ||
        category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [savedArticles, searchTerm, selectedCategory]);

  const removeArticle = (articleUrl) => {
    const updatedArticles = savedArticles.filter(
      (article) => article.articleUrl !== articleUrl
    );

    setSavedArticles(updatedArticles);
    localStorage.setItem(
      "saved_articles",
      JSON.stringify(updatedArticles)
    );
    setArticleToDelete(null);
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">

        {/* Page heading */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#2214b8] dark:text-violet-400">
              <BookmarkCheck size={18} />
              Your personal library
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Saved Articles
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
              Keep track of important stories and revisit your
              AI-generated summaries whenever you need them.
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex size-11 items-center justify-center rounded-xl bg-[#2214b8]/10 text-[#2214b8] dark:text-violet-400">
              <BookmarkCheck size={22} />
            </div>

            <div>
              <p className="text-2xl font-bold">
                {savedArticles.length}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Saved stories
              </p>
            </div>
          </div>
        </div>

        {/* Search and filters */}
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search saved articles..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#2214b8] focus:ring-2 focus:ring-[#2214b8]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    selectedCategory === category
                      ? "bg-[#2214b8] text-white shadow-md shadow-[#2214b8]/20"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-[#2214b8]/40 hover:text-[#2214b8] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-violet-400"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Results heading */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Your collection
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {filteredArticles.length}{" "}
              {filteredArticles.length === 1 ? "article" : "articles"} found
            </p>
          </div>
        </div>

        {/* Saved articles grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredArticles.map((article) => {
              const summary = article.newsSummary || {};
              const title = summary.title || "Untitled article";
              const description =
                summary.summary ||
                summary.description ||
                summary.excerpt ||
                "No summary available for this article.";

              const category =
                summary.impact_category || summary.category || "News";

              const image = summary.mainImage || summary.image;

              return (
                <article
                  key={article.id || article.articleUrl}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#2214b8]/30 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                >
                  {/* Article image */}
                  <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {image ? (
                      <img
                        src={image}
                        alt={title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-400 dark:text-slate-500">
                        <Newspaper size={42} strokeWidth={1.3} />
                      </div>
                    )}

                    <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#2214b8] shadow-sm dark:border-slate-700 dark:bg-slate-900/95 dark:text-violet-400">
                      {category}
                    </span>

                    <div className="absolute right-4 top-4 rounded-full bg-[#2214b8] p-2 text-white shadow-md">
                      <BookmarkCheck size={16} />
                    </div>
                  </div>

                  {/* Article content */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="mb-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <CalendarDays size={15} />
                      Saved {formatDate(article.savedAt)}
                    </div>

                    <h3 className="mb-3 line-clamp-2 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-[#2214b8] dark:text-white dark:group-hover:text-violet-400">
                      {title}
                    </h3>

                    <p className="mb-5 line-clamp-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {description}
                    </p>

                    <div className="mt-auto flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                      <Link
                        to={`/recent/${encodeURIComponent(title)}`}
                        state={{
                          newsSummary: summary,
                          articleUrl: article.articleUrl,
                        }}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2214b8] px-3 py-3 text-sm font-semibold text-white transition hover:bg-[#1b1097]"
                      >
                        View summary
                        <ArrowUpRight size={16} />
                      </Link>

                      {article.articleUrl && (
                        <a
                          href={article.articleUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open original article"
                          title="Open original article"
                          className="flex size-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-[#2214b8] hover:text-[#2214b8] dark:border-slate-700 dark:text-slate-300 dark:hover:text-violet-400"
                        >
                          <ExternalLink size={17} />
                        </a>
                      )}

                      <button
                        onClick={() =>
                          setArticleToDelete(article.articleUrl)
                        }
                        aria-label={`Remove ${title} from saved articles`}
                        title="Remove saved article"
                        className="flex size-11 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:hover:border-red-900 dark:hover:bg-red-950/30"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>

                    {/* Delete confirmation */}
                    {articleToDelete === article.articleUrl && (
                      <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 dark:border-red-900 dark:bg-red-950/20">
                        <p className="text-sm text-red-700 dark:text-red-300">
                          Remove this article from your saved collection?
                        </p>

                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() =>
                              removeArticle(article.articleUrl)
                            }
                            className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700"
                          >
                            Yes, remove
                          </button>

                          <button
                            onClick={() => setArticleToDelete(null)}
                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900 sm:py-20">
            <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-[#2214b8]/10 text-[#2214b8] dark:text-violet-400">
              {searchTerm || selectedCategory !== "All" ? (
                <Search size={30} />
              ) : (
                <BookmarkX size={30} />
              )}
            </div>

            <h3 className="text-xl font-bold">
              {searchTerm || selectedCategory !== "All"
                ? "No matching articles"
                : "Your reading list is empty"}
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
              {searchTerm || selectedCategory !== "All"
                ? "Try a different search term or category to find your saved stories."
                : "When you find an interesting story in Briefly AI, save it here to revisit its summary whenever you want."}
            </p>

            {searchTerm || selectedCategory !== "All" ? (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="mt-6 rounded-xl bg-[#2214b8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1b1097]"
              >
                Clear filters
              </button>
            ) : (
              <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#2214b8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1b1097]"
              >
                Discover articles
                <ArrowUpRight size={17} />
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Saved;
