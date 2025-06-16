export default function FeatureCards() {
  return (
    <section className="w-full flex justify-center items-center py-10 bg-transparent">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Balance Card */}
        <div className="bg-black/70 rounded-2xl p-6 flex flex-col gap-4 shadow-lg border border-yellow-500/20">
          <h4 className="text-white text-lg font-semibold mb-1">Balance</h4>
          <p className="text-xs text-gray-400 mb-2">Lorem ipsum dolor sit amet consectetur. Molestie lorem arcu</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="bg-yellow-500/80 text-xs px-2 py-1 rounded-full text-white font-semibold">PER-08</span>
              <span className="text-xs text-yellow-300">Making testing very design system</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-yellow-500/40 text-xs px-2 py-1 rounded-full text-white font-semibold">PER-07</span>
              <span className="text-xs text-gray-300">Create a working prototype</span>
            </div>
          </div>
        </div>
        {/* Users Card */}
        <div className="bg-black/70 rounded-2xl p-6 flex flex-col gap-4 shadow-lg border border-yellow-500/20">
          <h4 className="text-white text-lg font-semibold mb-1">Users</h4>
          <p className="text-xs text-gray-400 mb-2">Lorem ipsum dolor sit amet consectetur. Molestie lorem arcu</p>
          <div className="flex flex-col gap-2">
            <span className="text-3xl font-bold text-white">72,350</span>
            <span className="text-xs text-green-400 font-semibold">+6.9%</span>
          </div>
        </div>
        {/* Create Card */}
        <div className="bg-gradient-to-b from-yellow-500/80 to-black/90 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-lg border border-yellow-500/30 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-yellow-400/40 rounded-b-full blur-2xl z-0" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center mb-2">
              <span className="text-3xl text-yellow-400">&#9900;</span>
            </div>
            <h4 className="text-white text-lg font-semibold mb-1">Create</h4>
            <p className="text-xs text-gray-300">Lorem ipsum dolor sit amet. Molestie lorem arcu</p>
          </div>
        </div>
        {/* AI Sessions Card */}
        <div className="bg-black/70 rounded-2xl p-6 flex flex-col gap-4 shadow-lg border border-yellow-500/20">
          <h4 className="text-white text-lg font-semibold mb-1">AI Sessions</h4>
          <p className="text-xs text-gray-400 mb-2">Lorem ipsum dolor sit amet. Molestie lorem arcu</p>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-gray-300">Personal</span>
            <span className="text-xs text-gray-300">Issues, Active, Backlog, Projects</span>
          </div>
        </div>
      </div>
    </section>
  );
} 