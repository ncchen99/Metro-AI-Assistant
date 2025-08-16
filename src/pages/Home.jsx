import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-center space-y-8 p-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    台灣捷運 AI 助理
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    智慧交通助手，讓您的通勤更便利
                </p>

                <div className="space-y-4">
                    <Link
                        to="/ai-assistant"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors duration-200"
                    >
                        啟動 AI 助理
                    </Link>
                </div>

                <div className="mt-12 text-sm text-gray-500">
                    <p>體驗智能交通服務</p>
                </div>
            </div>
        </div>
    )
}

export default Home
