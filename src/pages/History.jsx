// import TopNavbar from "../components/TopNavbar";
import FilterBar from "../components/FilterBar.jsx";
// import FeaturedHistoryCard from "../components/FeaturedHistoryCard";
import HistoryCard from "../components/HistoryCard.jsx";
// import HistoryListItem from "../components/HistoryListItem";
// import FloatingActionButton from "../components/FloatingActionButton";
const historyData = JSON.parse(localStorage.getItem("recent_summary")) || [];

export default function History() {
  return (
  <main className="w-full min-w-0 min-h-screen md:ml-0">
    <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10 lg:py-12">

      {/* Page Header */}
      <div className="mb-8 sm:mb-10 lg:mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4 font-extrabold font-display text-black dark:text-white tracking-tight">
          History
        </h2>

        <p className="text-base sm:text-lg lg:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl">
          Review your personalized knowledge library. Every summary you've
          read, indexed by time and intelligence category.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="w-full mb-8 sm:mb-10">
        <FilterBar />
      </div>

      {/* History */}
      <section className="w-full mb-12 sm:mb-16">
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
          {historyData.map((item) => (
            <HistoryCard
              key={item.id}
              img={item.img}
              category={item.category}
              title={item.title}
              excerpt={item.excerpt}
              readTime={item.readTime}
              timestamp={item.timestamp}
            />
          ))}
        </div>
      </section>

    </div>
  </main>

  );
}