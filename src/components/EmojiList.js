import React from 'react';

const EmojiList = ({ clickHandler }) => {
  return (
    <div className="emojis" onClick={clickHandler}>
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
