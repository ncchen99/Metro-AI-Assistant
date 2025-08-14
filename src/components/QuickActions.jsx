const QuickActions = ({ mode }) => {
  const tourismActions = [
    "紅線旅程規劃",
    "以101為中心的兩日遊", 
    "就是放一些熱門問題"
  ]
  
  const workActions = [
    "公司附近咖啡廳",
    "ATM與銀行位置..........",
    "......................."
  ]

  const actions = mode === 'tourism' ? tourismActions : workActions

  return (
    <div className="px-4 py-4">
      {/* Quick Action Pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {actions.map((action, index) => (
          <div 
            key={index}
            className="px-4 py-1 bg-white border border-blue-400 rounded-full"
          >
            <span className="text-xs font-medium text-black tracking-wider">
              {action}
            </span>
          </div>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="w-full h-8 bg-white border border-blue-400 rounded-full px-4 flex items-center">
          <svg className="w-2.5 h-2.5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 10 10">
            <path d="M5.75 0.75C5.75 0.335786 5.41421 0 5 0C4.58579 0 4.25 0.335786 4.25 0.75V4.25H0.75C0.335786 4.25 0 4.58579 0 5C0 5.41421 0.335786 5.75 0.75 5.75L4.25 5.75V9.25C4.25 9.66421 4.58579 10 5 10C5.41421 10 5.75 9.66421 5.75 9.25V5.75L9.25 5.75C9.66421 5.75 10 5.41421 10 5C10 4.58579 9.66421 4.25 9.25 4.25H5.75V0.75Z"/>
          </svg>
          <div className="flex-1"></div>
          <svg className="w-2 h-4 text-blue-400" fill="currentColor" viewBox="0 0 9 15">
            <path d="M2 2.5C2 1.11929 3.11929 0 4.5 0C5.88071 0 7 1.11929 7 2.5V8C7 9.38071 5.88071 10.5 4.5 10.5C3.11929 10.5 2 9.38071 2 8V2.5Z"/>
            <path d="M0.5 6.5C0.776142 6.5 1 6.72386 1 7V8C1 9.933 2.567 11.5 4.5 11.5C6.433 11.5 8 9.933 8 8V7C8 6.72386 8.22386 6.5 8.5 6.5C8.77614 6.5 9 6.72386 9 7V8C9 10.3163 7.24998 12.2238 5 12.4725V14H7C7.27614 14 7.5 14.2239 7.5 14.5C7.5 14.7761 7.27614 15 7 15H2C1.72386 15 1.5 14.7761 1.5 14.5C1.5 14.2239 1.72386 14 2 14H4V12.4725C1.75002 12.2238 0 10.3163 0 8V7C0 6.72386 0.223858 6.5 0.5 6.5Z"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default QuickActions
