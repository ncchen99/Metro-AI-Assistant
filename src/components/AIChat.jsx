import { useRef, useEffect } from 'react'

const AIChat = ({ mode = 'work', messages = [], isLoading = false }) => {
    // 自動滾動到底部
    const messagesEndRef = useRef(null);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        // 只有當有新訊息時才滾動，並且使用更溫和的滾動方式
        if (messages.length > 0 && scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollHeight = container.scrollHeight;
            const height = container.clientHeight;
            const maxScrollTop = scrollHeight - height;

            // 滾動到底部，但不強制
            container.scrollTop = maxScrollTop;
        }
    }, [messages.length]);

    // Loading 動畫元件
    const LoadingMessage = () => (
        <div className="flex items-start gap-3">
            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 transition-colors duration-300" fill={mode === 'work' ? '#4088F4' : '#38c693'} viewBox="0 0 20 20">
                    <path d="M11.5933 14.1563C10.2667 14.5088 8.6724 14.6311 7.0554 14.3751C6.834 14.3395 6.8161 14.3187 6.837 14.0979C6.8647 13.8024 6.8864 13.5072 6.9219 13.2126C6.939 13.0655 6.9985 13.0112 7.1392 13.0191C7.8786 13.0626 8.6177 13.0501 9.3534 12.9704C10.1381 12.8862 10.904 12.7178 11.662 12.4987C12.9766 12.1192 14.189 11.5303 15.3196 10.7672C15.3403 10.7539 15.3591 10.7396 15.3798 10.7263C15.4681 10.6715 15.5192 10.6801 15.5824 10.7655C15.7835 11.0354 15.9864 11.3063 16.1875 11.5761C16.275 11.6942 16.2687 11.7429 16.1559 11.8409C15.4925 12.4124 14.7587 12.8778 13.9728 13.2652C13.2875 13.6035 12.5815 13.884 11.5933 14.1563Z" />
                    <path d="M10.1966 20.0824C6.1342 20.0646 2.9587 17.7939 1.5395 13.8734C1.3799 13.4121 1.2202 12.9509 1.1315 12.4719C1.0251 11.8333 1.4153 11.3011 2.0008 11.1769C2.6571 11.035 3.2071 11.3543 3.4022 12.0107C3.7393 13.1815 4.1828 14.2991 4.9456 15.2571C6.1697 16.8005 7.784 17.6165 9.7531 17.6875C12.5738 17.7939 14.9687 16.836 16.7604 14.6185C18.0732 12.9864 18.3215 11.0173 18.0554 8.9949C17.4168 4.16968 12.3786 1.40229 7.9791 2.573C5.531 3.2294 3.9699 4.897 3.0297 7.1854C2.9587 7.3451 2.9055 7.5225 2.8345 7.6821C2.5684 8.3917 1.983 8.7288 1.3444 8.5159C0.670305 8.303 0.333205 7.6644 0.581605 6.9548C1.504 4.2583 3.1361 2.1118 5.7616 0.869999C11.3675 -1.7733 18.286 1.3135 20.0778 7.2386C20.6809 9.2255 20.61 11.2301 20.0423 13.217C19.1021 16.5166 16.7249 18.3971 13.6204 19.5147C12.556 19.9227 11.3852 20.1001 10.1966 20.0824Z" />
                    <path d="M10.4704 8.7334C10.4704 9.0173 10.5059 9.3188 10.4704 9.6027C10.364 10.1704 9.8673 10.5429 9.2996 10.5429C8.7674 10.5252 8.2884 10.1349 8.1997 9.5672C8.111 8.9995 8.0578 8.4318 8.0401 7.8642C8.0223 7.2787 8.4126 6.8175 8.9803 6.7111C9.5302 6.6046 10.1156 6.8885 10.2753 7.4384C10.3995 7.8464 10.435 8.3077 10.5059 8.7334C10.4882 8.7157 10.4882 8.7157 10.4704 8.7334Z" />
                    <path d="M7.0466 9.0884C7.0644 9.9577 6.7451 10.4366 6.1596 10.5963C5.592 10.7382 4.9533 10.5076 4.8114 9.9577C4.6517 9.2835 4.563 8.5739 4.5985 7.8821C4.6163 7.3144 5.2017 6.9241 5.7516 6.9419C6.3016 6.9596 6.816 7.4031 6.9047 7.9708C6.9757 8.3788 7.0112 8.8046 7.0466 9.0884Z" />
                </svg>
            </div>
            <div className="flex flex-col max-w-[220px] items-start">
                <div className="relative px-3 py-2 rounded-lg shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.2),inset_0_-1px_2px_0_rgba(255,255,255,0.4)] bg-chat-bg backdrop-blur-sm rounded-tl-sm">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-[#007AB0] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-[#007AB0] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-[#007AB0] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );

    const AIAvatar = () => (
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 transition-colors duration-300" fill={mode === 'work' ? '#4088F4' : '#38c693'} viewBox="0 0 20 20">
                <path d="M11.5933 14.1563C10.2667 14.5088 8.6724 14.6311 7.0554 14.3751C6.834 14.3395 6.8161 14.3187 6.837 14.0979C6.8647 13.8024 6.8864 13.5072 6.9219 13.2126C6.939 13.0655 6.9985 13.0112 7.1392 13.0191C7.8786 13.0626 8.6177 13.0501 9.3534 12.9704C10.1381 12.8862 10.904 12.7178 11.662 12.4987C12.9766 12.1192 14.189 11.5303 15.3196 10.7672C15.3403 10.7539 15.3591 10.7396 15.3798 10.7263C15.4681 10.6715 15.5192 10.6801 15.5824 10.7655C15.7835 11.0354 15.9864 11.3063 16.1875 11.5761C16.275 11.6942 16.2687 11.7429 16.1559 11.8409C15.4925 12.4124 14.7587 12.8778 13.9728 13.2652C13.2875 13.6035 12.5815 13.884 11.5933 14.1563Z" />
                <path d="M10.1966 20.0824C6.1342 20.0646 2.9587 17.7939 1.5395 13.8734C1.3799 13.4121 1.2202 12.9509 1.1315 12.4719C1.0251 11.8333 1.4153 11.3011 2.0008 11.1769C2.6571 11.035 3.2071 11.3543 3.4022 12.0107C3.7393 13.1815 4.1828 14.2991 4.9456 15.2571C6.1697 16.8005 7.784 17.6165 9.7531 17.6875C12.5738 17.7939 14.9687 16.836 16.7604 14.6185C18.0732 12.9864 18.3215 11.0173 18.0554 8.9949C17.4168 4.16968 12.3786 1.40229 7.9791 2.573C5.531 3.2294 3.9699 4.897 3.0297 7.1854C2.9587 7.3451 2.9055 7.5225 2.8345 7.6821C2.5684 8.3917 1.983 8.7288 1.3444 8.5159C0.670305 8.303 0.333205 7.6644 0.581605 6.9548C1.504 4.2583 3.1361 2.1118 5.7616 0.869999C11.3675 -1.7733 18.286 1.3135 20.0778 7.2386C20.6809 9.2255 20.61 11.2301 20.0423 13.217C19.1021 16.5166 16.7249 18.3971 13.6204 19.5147C12.556 19.9227 11.3852 20.1001 10.1966 20.0824Z" />
                <path d="M10.4704 8.7334C10.4704 9.0173 10.5059 9.3188 10.4704 9.6027C10.364 10.1704 9.8673 10.5429 9.2996 10.5429C8.7674 10.5252 8.2884 10.1349 8.1997 9.5672C8.111 8.9995 8.0578 8.4318 8.0401 7.8642C8.0223 7.2787 8.4126 6.8175 8.9803 6.7111C9.5302 6.6046 10.1156 6.8885 10.2753 7.4384C10.3995 7.8464 10.435 8.3077 10.5059 8.7334C10.4882 8.7157 10.4882 8.7157 10.4704 8.7334Z" />
                <path d="M7.0466 9.0884C7.0644 9.9577 6.7451 10.4366 6.1596 10.5963C5.592 10.7382 4.9533 10.5076 4.8114 9.9577C4.6517 9.2835 4.563 8.5739 4.5985 7.8821C4.6163 7.3144 5.2017 6.9241 5.7516 6.9419C6.3016 6.9596 6.816 7.4031 6.9047 7.9708C6.9757 8.3788 7.0112 8.8046 7.0466 9.0884Z" />
            </svg>
        </div>
    )

    const MessageActions = ({ messageId }) => (
        <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* Bookmark Icon */}
            <div className="w-4 h-4 flex items-center justify-center cursor-pointer hover:bg-white/20 rounded-full transition-colors">
                <svg className="w-3 h-3" stroke="#4088F4" strokeWidth="1.5" fill="none" viewBox="0 0 24 24">
                    <path d="M2 3a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2Z" />
                    <path fillRule="evenodd" d="M2 7.5h16l-.811 7.71a2 2 0 0 1-1.99 1.79H4.802a2 2 0 0 1-1.99-1.79L2 7.5ZM7 11a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z" clipRule="evenodd" />
                </svg>
            </div>

            {/* Copy Icon */}
            <div className="w-4 h-4 flex items-center justify-center cursor-pointer hover:bg-white/20 rounded-full transition-colors">
                <svg className="w-3 h-3" stroke="#4088F4" strokeWidth="1.5" fill="none" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M13.887 3.182c.396.037.79.08 1.183.128C16.194 3.45 17 4.414 17 5.517V16.75A2.25 2.25 0 0 1 14.75 19h-9.5A2.25 2.25 0 0 1 3 16.75V5.517c0-1.103.806-2.068 1.93-2.207.393-.048.787-.09 1.183-.128A3.001 3.001 0 0 1 9 1h2c1.373 0 2.531.923 2.887 2.182ZM7.5 4A1.5 1.5 0 0 1 9 2.5h2A1.5 1.5 0 0 1 12.5 4v.5h-5V4Z" clipRule="evenodd" />
                </svg>
            </div>

            {/* Share Icon */}
            <div className="w-4 h-4 flex items-center justify-center cursor-pointer hover:bg-white/20 rounded-full transition-colors">
                <svg className="w-3 h-3" stroke="#4088F4" strokeWidth="1.5" fill="none" viewBox="0 0 24 24">
                    <path d="M13 4.5a2.5 2.5 0 1 1 .702 1.737L6.97 9.604a2.518 2.518 0 0 1 0 .792l6.733 3.367a2.5 2.5 0 1 1-.671 1.341l-6.733-3.367a2.5 2.5 0 1 1 0-3.475l6.733-3.366A2.52 2.52 0 0 1 13 4.5Z" />
                </svg>
            </div>
        </div>
    )

    return (
        <div className="relative z-10 px-8 pb-12">
            {/* Main Chat Container */}
            <div className="w-[330px] h-[420px] rounded-[20px] bg-white/20 backdrop-blur-md shadow-[0_4px_8px_0_rgba(0,0,0,0.1),inset_2px_2px_4px_0_rgba(255,255,255,0.5),inset_-2px_-2px_4px_0_rgba(0,0,0,0.05)] relative mx-auto overflow-hidden">

                {/* Messages Container - Scrollable */}
                <div
                    ref={scrollContainerRef}
                    className="h-full overflow-y-auto px-4 py-6 space-y-4 scrollbar-hide"
                >
                    {/* 預設歡迎訊息 - 只有在沒有其他訊息時顯示 */}
                    {messages.length === 0 && (
                        <div className="flex items-start gap-3 group">
                            <AIAvatar />
                            <div className="flex flex-col max-w-[220px] items-start">
                                <div className="relative px-3 py-2 rounded-lg shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.2),inset_0_-1px_2px_0_rgba(255,255,255,0.4)] bg-chat-bg backdrop-blur-sm rounded-tl-sm">
                                    <span className="text-xs font-bold tracking-[1.2px] leading-[1.2] text-[#007AB0]">
                                        我是AI助理，有什麼我能幫您的嗎？
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 實際訊息 */}
                    {messages.map((message, index) => (
                        <div key={message.id} className={`flex items-start gap-3 group ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                            {/* Avatar */}
                            {message.type === 'ai' && <AIAvatar />}

                            {/* Message Content */}
                            <div className={`flex flex-col max-w-[220px] ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`relative px-3 py-2 rounded-lg shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.2),inset_0_-1px_2px_0_rgba(255,255,255,0.4)] ${message.type === 'ai'
                                    ? 'bg-chat-bg backdrop-blur-sm rounded-tl-sm'
                                    : 'bg-white/20 backdrop-blur-sm rounded-tr-sm'
                                    }`}>
                                    <span className={`text-xs font-bold tracking-[1.2px] leading-[1.2] ${message.type === 'ai' ? 'text-[#007AB0]' : 'text-text-gray'
                                        }`}>
                                        {message.content}
                                    </span>
                                </div>

                                {/* Message Actions - Only for AI messages */}
                                {message.type === 'ai' && (
                                    <div className="flex items-center mt-1">
                                        <MessageActions messageId={message.id} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Loading Message */}
                    {isLoading && <LoadingMessage />}

                    {/* 滾動錨點 */}
                    <div ref={messagesEndRef} />
                </div>

                {/* Scroll Indicator */}
                <div className="absolute right-2 bottom-4 w-1 h-12 bg-white/30 rounded-full">
                    <div className="w-1 h-6 bg-white/60 rounded-full"></div>
                </div>
            </div>
        </div>
    )
}

export default AIChat