export default function Dashboard() {
  return (
    <section className="w-full flex justify-center items-center py-12 bg-transparent">
      <div className="w-full max-w-5xl bg-black/80 rounded-2xl shadow-lg p-8 flex flex-col gap-8 border border-yellow-500/20">
        {/* Top analytics summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'TOTAL USERS', value: '72,350', change: '+6.9%', color: 'text-green-400', trend: 'up' },
            { label: 'SESSIONS', value: '29.4%', change: '-12.5%', color: 'text-red-400', trend: 'down' },
            { label: 'AVG. CLICK RATE', value: '56.8%', change: '+19.3%', color: 'text-green-400', trend: 'up' },
            { label: 'PAGEVIEWS', value: '92,913', change: '-12.5%', color: 'text-red-400', trend: 'down' },
          ].map((item, i) => (
            <div key={i} className="bg-black/60 rounded-xl p-4 flex flex-col items-start gap-2 border border-yellow-500/10">
              <span className="text-xs text-gray-400 font-medium tracking-wide">{item.label}</span>
              <span className="text-2xl font-bold text-white">{item.value}</span>
              <span className={`text-xs font-semibold ${item.color}`}>{item.change}</span>
            </div>
          ))}
        </div>
        {/* Importer list and monthly expenses */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Importer List */}
          <div className="flex-1 bg-black/60 rounded-xl p-6 flex flex-col gap-4 border border-yellow-500/10">
            <h3 className="text-lg font-semibold text-white mb-2">Import data into Front Dashboard</h3>
            <p className="text-xs text-gray-400 mb-4">See and talk to your users and leads immediately</p>
            {[
              { name: 'Huse', color: 'bg-fuchsia-500' },
              { name: 'Penta', color: 'bg-cyan-500' },
              { name: 'Border', color: 'bg-blue-500' },
            ].map((imp, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full ${imp.color} inline-block`} />
                  <span className="text-white font-medium">{imp.name}</span>
                  <span className="text-xs text-gray-400 ml-2">Users</span>
                </div>
                <button className="text-xs px-3 py-1 rounded-full bg-yellow-500 text-white font-semibold shadow-glow hover:bg-yellow-600 transition">Launch importer</button>
              </div>
            ))}
          </div>
          {/* Monthly Expenses Chart Placeholder */}
          <div className="flex-1 bg-black/60 rounded-xl p-6 border border-yellow-500/10 flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-2">Monthly expenses</h3>
            <div className="flex-1 flex items-end gap-2 h-32 mt-4">
              {/* Mock bar chart */}
              {[40, 80, 60, 100, 50, 70].map((val, i) => (
                <div key={i} className="flex flex-col items-center justify-end h-full">
                  <div className="w-6 rounded-t bg-yellow-500" style={{ height: `${val}%`, minHeight: '12px' }} />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              {['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 