// Reusable Skeletons
export const CardSkeleton = () => (
  <div className="animate-pulse bg-alabaster-grey-100 h-32 rounded-lg w-full"></div>
);

// Stat Card
export const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-lg border border-alabaster-grey-200 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-dusty-denim-500 text-xs font-semibold uppercase">{title}</p>
      <h3 className="text-2xl font-bold text-ink-black-900 mt-2">{value}</h3>
    </div>
    <div className={`p-2 rounded-md text-white ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
  </div>
);