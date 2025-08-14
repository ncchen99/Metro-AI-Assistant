const ShortcutsSection = () => {
  const cards = [
    { id: 1, color: 'bg-metro-gray', iconColor: 'text-metro-blue', strokeColor: 'stroke-metro-blue' },
    { id: 2, color: 'bg-metro-green/30', iconColor: 'text-metro-green', strokeColor: 'stroke-metro-green' },
    { id: 3, color: 'bg-metro-light-blue/30', iconColor: 'text-metro-light-blue', strokeColor: 'stroke-metro-light-blue' },
    { id: 4, color: 'bg-metro-gray', iconColor: 'text-metro-blue', strokeColor: 'stroke-metro-blue' },
    { id: 5, color: 'bg-metro-green/30', iconColor: 'text-metro-green', strokeColor: 'stroke-metro-green' },
    { id: 6, color: 'bg-metro-light-blue/30', iconColor: 'text-metro-light-blue', strokeColor: 'stroke-metro-light-blue' },
  ]

  return (
    <div className="px-4 py-4">
      {/* Section Title */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-bold text-metro-text">捷徑</h2>
        <svg className="w-4 h-4 text-metro-green" fill="currentColor" viewBox="0 0 15 15">
          <path d="M8.625 1.125C8.625 0.50368 8.12132 0 7.5 0C6.87868 0 6.375 0.50368 6.375 1.125V6.375H1.125C0.50368 6.375 0 6.87868 0 7.5C0 8.12132 0.50368 8.625 1.125 8.625L6.375 8.625V13.875C6.375 14.4963 6.87868 15 7.5 15C8.12132 15 8.625 14.4963 8.625 13.875V8.625L13.875 8.625C14.4963 8.625 15 8.12132 15 7.5C15 6.87868 14.4963 6.375 13.875 6.375H8.625V1.125Z"/>
        </svg>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-3 gap-5 justify-items-center">
        {cards.map((card) => (
          <div key={card.id} className="relative">
            <div className={`w-27 h-18 rounded-xl ${card.color} relative`}>
              {/* Info Icon */}
              <svg className={`w-3 h-3 absolute top-2 right-2 ${card.strokeColor}`} fill="none" viewBox="0 0 12 12">
                <path d="M5.54167 5.54167L5.56702 5.52899C5.91726 5.35387 6.31161 5.67021 6.21664 6.0501L5.78336 7.78324C5.68839 8.16312 6.08274 8.47946 6.43298 8.30434L6.45833 8.29167M11.5 6C11.5 9.03757 9.03757 11.5 6 11.5C2.96243 11.5 0.5 9.03757 0.5 6C0.5 2.96243 2.96243 0.5 6 0.5C9.03757 0.5 11.5 2.96243 11.5 6ZM6 3.70833H6.00458V3.71292H6V3.70833Z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              
              {/* Card Icon */}
              <svg className={`w-4 h-3.5 absolute top-2 left-2 ${card.iconColor}`} fill="currentColor" viewBox="0 0 16 15">
                <path d="M0.517747 2.54185C1.12798 1.99717 1.92962 1.66667 2.80761 1.66667H13.1922C14.0702 1.66667 14.8718 1.99717 15.4821 2.54185C15.3402 1.39075 14.3691 0.5 13.1922 0.5H2.80761C1.63073 0.5 0.659618 1.39075 0.517747 2.54185Z"/>
                <path d="M0.517747 4.87518C1.12798 4.33051 1.92962 4 2.80761 4H13.1922C14.0702 4 14.8718 4.33051 15.4821 4.87518C15.3402 3.72409 14.3691 2.83333 13.1922 2.83333H2.80761C1.63073 2.83333 0.659618 3.72409 0.517747 4.87518Z"/>
                <path d="M2.80769 5.16667C1.53319 5.16667 0.5 6.21134 0.5 7.5V12.1667C0.5 13.4553 1.53319 14.5 2.80769 14.5H13.1923C14.4668 14.5 15.5 13.4553 15.5 12.1667V7.5C15.5 6.21134 14.4668 5.16667 13.1923 5.16667H10.3077C9.98907 5.16667 9.73077 5.42783 9.73077 5.75C9.73077 6.7165 8.95588 7.5 8 7.5C7.04412 7.5 6.26923 6.7165 6.26923 5.75C6.26923 5.42783 6.01093 5.16667 5.69231 5.16667H2.80769Z"/>
              </svg>
              
              {/* Card Label */}
              <div className="absolute bottom-2 left-2">
                <span className={`text-xs font-bold ${card.iconColor} tracking-wide`}>我的票卡</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShortcutsSection
