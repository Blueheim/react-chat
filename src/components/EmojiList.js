import React from 'react';

const EmojiList = ({ id, clickHandler }) => {
  return (
    <div id={id} className="emojis m-bg-white" onClick={clickHandler}>
      <span role="img" aria-label="" data-emoji="😂" className="emoji">
        😂
      </span>
      <span role="img" aria-label="" data-emoji="😍" className="emoji">
        😍
      </span>
      <span role="img" aria-label="" data-emoji="😭" className="emoji">
        😭
      </span>
      <span role="img" aria-label="" data-emoji="❤️" className="emoji">
        ❤️
      </span>
      <span role="img" aria-label="" data-emoji="💕" className="emoji">
        💕
      </span>
      <span role="img" aria-label="" data-emoji="😊" className="emoji">
        😊
      </span>
      <span role="img" aria-label="" data-emoji="😀" className="emoji">
        😀
      </span>
      <span role="img" aria-label="" data-emoji="😃" className="emoji">
        😃
      </span>
      <span role="img" aria-label="" data-emoji="🤣" className="emoji">
        🤣
      </span>
      <span role="img" aria-label="" data-emoji="🙂" className="emoji">
        🙂
      </span>
      <span role="img" aria-label="" data-emoji="😋" className="emoji">
        😋
      </span>
      <span role="img" aria-label="" data-emoji="😛" className="emoji">
        😛
      </span>
      <span role="img" aria-label="" data-emoji="🤨" className="emoji">
        🤨
      </span>
      <span role="img" aria-label="" data-emoji="🤮" className="emoji">
        🤮
      </span>
      <span role="img" aria-label="" data-emoji="😎" className="emoji">
        😎
      </span>
      <span role="img" aria-label="" data-emoji="🔥" className="emoji">
        🔥
      </span>
      <span role="img" aria-label="" data-emoji="😱" className="emoji">
        😱
      </span>
      <span role="img" aria-label="" data-emoji="🐰" className="emoji">
        🐰
      </span>
      <span role="img" aria-label="" data-emoji="🤔" className="emoji">
        🤔
      </span>
      <span role="img" aria-label="" data-emoji="🇫🇷" className="emoji">
        🇫🇷
      </span>
      <span role="img" aria-label="" data-emoji="🍷" className="emoji">
        🍷
      </span>
      <span role="img" aria-label="" data-emoji="🍺" className="emoji">
        🍺
      </span>
    </div>
  );
};

export default EmojiList;
