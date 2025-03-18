// ...existing code...
      `}
    >
      <div 
        ref={indicatorRef}
        className={`absolute ${getIndicatorClasses()}`}
      />
      
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          data-nav-item
          data-href={item.href}
          onClick={() => setActiveTab(item.href)}
          className={`
            relative flex flex-col items-center justify-center
            px-4 py-2 transition-all duration-300 ease-out
            ${orientation === 'horizontal' ? 'h-full' : 'w-full h-16'}
            ${activeTab === item.href ? 'text-primary' : 'text-gray-400'}
          `}
        >
          {item.icon && (
            <div className="text-2xl mb-1">{item.icon}</div>
          )}
          <span className="text-xs font-medium">{item.title}</span>
          
          {activeTab === item.href && (
            <div className="absolute inset-0 bg-white/5 rounded-md pointer-events-none" />
          )}
        </Link>
      ))}
    </div>
  );
};

export default AppLikeNavigation;
