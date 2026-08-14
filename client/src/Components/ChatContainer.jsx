import React, { useEffect, useRef } from 'react'
import assets, { messagesDummyData } from '../assets/chat-app-assets/assets'
import { formatMessaageTime } from '../Lib/utils'

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const scrollEnd = useRef()

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return selectedUser ? (

    <div className="h-full min-h-0 min-w-0 flex flex-col backdrop-blur-lg">

      {/* Header */}
      <div className="flex items-center gap-3 mx-4 border-b border-stone-500 py-3 flex-shrink-0">

        <img
          src={assets.profile_martin}
          alt=""
          className="w-8 rounded-full"
        />

        <p className="flex-1 text-lg text-white flex items-center gap-2">

          Martin Johnson

          <span className="w-2 h-2 rounded-full bg-green-500"></span>

        </p>

        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden max-w-7 cursor-pointer"
        />

        <img
          src={assets.help_icon}
          alt=""
          className="max-md:hidden max-w-5"
        />

      </div>


      {/* Chat Area */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3">

        {messagesDummyData.map((msg, index) => {

          const isMyMessage =
            msg.senderId === '680f50e4f10f3cd28382ecf9'

          return (

            <div
              key={index}
              className={`flex items-end gap-2 justify-end ${
                !isMyMessage ? 'flex-row-reverse' : ''
              }`}
            >

              {/* Message */}
              {msg.image ? (

                <img
                  src={msg.image}
                  alt=""
                  className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8"
                />

              ) : (

                <p
                  className={`p-2 max-w-[200px] md:text-sm font-light
                  rounded-lg mb-8 break-all bg-violet-500/30 text-white ${
                    isMyMessage
                      ? 'rounded-br-none'
                      : 'rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </p>

              )}


              {/* Profile + Time */}
              <div className="text-center text-xs">

                <img
                  src={
                    isMyMessage
                      ? assets.avatar_icon
                      : assets.profile_martin
                  }
                  alt=""
                  className="w-7 rounded-full"
                />

                <p className="text-gray-500">
                  {formatMessaageTime(msg.createdAt)}
                </p>

              </div>

            </div>

          )
        })}

        <div ref={scrollEnd}></div>

      </div>


      {/* Message Input */}
      <div className="flex items-center gap-3 p-3 flex-shrink-0">

        <div className="flex-1 flex items-center bg-gray-100/10 px-3 rounded-full">

          <input
            type="text"
            placeholder="Send a message"
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none
            text-white placeholder-gray-400 bg-transparent"
          />

          <input
            type="file"
            id="image"
            accept="image/png,image/jpeg"
            hidden
          />

          <label htmlFor="image">

            <img
              src={assets.gallery_icon}
              alt=""
              className="w-5 mr-2 cursor-pointer"
            />

          </label>

        </div>

        <img
          src={assets.send_button}
          alt=""
          className="w-7 cursor-pointer"
        />

      </div>

    </div>

  ) : (

    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">

      <img
        src={assets.logo_icon}
        className="max-w-16"
        alt=""
      />

      <p className="text-lg font-medium text-white">
        Chat anytime, anywhere
      </p>

    </div>

  )
}

export default ChatContainer