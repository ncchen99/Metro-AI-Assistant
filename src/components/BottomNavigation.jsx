const BottomNavigation = () => {
  return (
    <div className="absolute bottom-0 w-full z-10">
      {/* Navigation Container */}
      <div className="w-full h-[77px] bg-white flex justify-center items-center pb-2">
        {/* Gradient Bar */}
        <div className="absolute top-0 w-full h-[5px] bg-metro-gradient"></div>

        {/* Tabs Container */}
        <div className="flex w-[375px] h-[41px] justify-center items-center px-2 relative top-3">

          {/* AI Assistant Tab - Active */}
          <div className="flex flex-col justify-center items-center flex-1 gap-1 py-3 relative">
            {/* AI Icon with Background */}
            <div className="relative">
              <div className="w-[19px] h-[19px] bg-white rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" fill="#4088F4" viewBox="0 0 20 20">
                  <path d="M11.5933 14.1563C10.2667 14.5088 8.6724 14.6311 7.0554 14.3751C6.834 14.3395 6.8161 14.3187 6.837 14.0979C6.8647 13.8024 6.8864 13.5072 6.9219 13.2126C6.939 13.0655 6.9985 13.0112 7.1392 13.0191C7.8786 13.0626 8.6177 13.0501 9.3534 12.9704C10.1381 12.8862 10.904 12.7178 11.662 12.4987C12.9766 12.1192 14.189 11.5303 15.3196 10.7672C15.3403 10.7539 15.3591 10.7396 15.3798 10.7263C15.4681 10.6715 15.5192 10.6801 15.5824 10.7655C15.7835 11.0354 15.9864 11.3063 16.1875 11.5761C16.275 11.6942 16.2687 11.7429 16.1559 11.8409C15.4925 12.4124 14.7587 12.8778 13.9728 13.2652C13.2875 13.6035 12.5815 13.884 11.5933 14.1563Z" />
                  <path d="M10.1966 20.0824C6.1342 20.0646 2.9587 17.7939 1.5395 13.8734C1.3799 13.4121 1.2202 12.9509 1.1315 12.4719C1.0251 11.8333 1.4153 11.3011 2.0008 11.1769C2.6571 11.035 3.2071 11.3543 3.4022 12.0107C3.7393 13.1815 4.1828 14.2991 4.9456 15.2571C6.1697 16.8005 7.784 17.6165 9.7531 17.6875C12.5738 17.7939 14.9687 16.836 16.7604 14.6185C18.0732 12.9864 18.3215 11.0173 18.0554 8.9949C17.4168 4.16968 12.3786 1.40229 7.9791 2.573C5.531 3.2294 3.9699 4.897 3.0297 7.1854C2.9587 7.3451 2.9055 7.5225 2.8345 7.6821C2.5684 8.3917 1.983 8.7288 1.3444 8.5159C0.670305 8.303 0.333205 7.6644 0.581605 6.9548C1.504 4.2583 3.1361 2.1118 5.7616 0.869999C11.3675 -1.7733 18.286 1.3135 20.0778 7.2386C20.6809 9.2255 20.61 11.2301 20.0423 13.217C19.1021 16.5166 16.7249 18.3971 13.6204 19.5147C12.556 19.9227 11.3852 20.1001 10.1966 20.0824Z" />
                  <path d="M10.4704 8.7334C10.4704 9.0173 10.5059 9.3188 10.4704 9.6027C10.364 10.1704 9.8673 10.5429 9.2996 10.5429C8.7674 10.5252 8.2884 10.1349 8.1997 9.5672C8.111 8.9995 8.0578 8.4318 8.0401 7.8642C8.0223 7.2787 8.4126 6.8175 8.9803 6.7111C9.5302 6.6046 10.1156 6.8885 10.2753 7.4384C10.3995 7.8464 10.435 8.3077 10.5059 8.7334C10.4882 8.7157 10.4882 8.7157 10.4704 8.7334Z" />
                  <path d="M7.0466 9.0884C7.0644 9.9577 6.7451 10.4366 6.1596 10.5963C5.592 10.7382 4.9533 10.5076 4.8114 9.9577C4.6517 9.2835 4.563 8.5739 4.5985 7.8821C4.6163 7.3144 5.2017 6.9241 5.7516 6.9419C6.3016 6.9596 6.816 7.4031 6.9047 7.9708C6.9757 8.3788 7.0112 8.8046 7.0466 9.0884Z" />
                </svg>
              </div>
            </div>
            <span className="text-xs font-medium text-primary-blue tracking-[-0.24px]">AI 助理</span>
          </div>

          {/* Home Tab */}
          <div className="flex flex-col justify-center items-center flex-1 gap-1 py-3">
            <svg className="w-6 h-6" fill="#6F6F6F" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-medium text-gray-500 tracking-[-0.24px]">首頁</span>
          </div>

          {/* Account Tab */}
          <div className="flex flex-col justify-center items-center flex-1 gap-1 py-3">
            <svg className="w-5 h-6" fill="#6F6F6F" viewBox="0 0 20 20">
              <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
            </svg>
            <span className="text-xs font-medium text-gray-500 tracking-[-0.24px]">我的帳戶</span>
          </div>
        </div>

        {/* Home Indicator */}
        {/* <div className="absolute bottom-2 w-[134px] h-[5px] bg-text-gray rounded-full"></div> */}
      </div>
    </div>
  )
}

export default BottomNavigation
