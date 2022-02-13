import { useRef } from "react";

// const normalizeHtml = (html) => {
//   return html && html.replace(/&nbsp;|\u202F|\u00A0/g, " ");
// };

const MyDiv = ({ rows = 15, value, onChange, disabled, ...props }) => {
  const element = useRef('');

  const handleMouseLeave = (event) => {
    // const text = event.target.innerText;
    const html = event.target.innerHTML;
    onChange(html);
  }

  const handlePaste = (event) => {
    event.preventDefault();
    const html = (event.clipboardData || window.clipboardData).getData('text');
    // const text = e.clipboardData.getData('text/plain');
    // const html = e.clipboardData.getData('text/html');
    onChange(html);
  }

  return (
    <div
      ref={element}
      contentEditable={!disabled}
      dangerouslySetInnerHTML={{ __html: value }}
      // onInput={handleChange}
      onMouseLeave={handleMouseLeave}
      onPaste={handlePaste}
      style={{ height: rows * 26, overflowY: 'scroll' }}
      {...props}
    ></div>
  );
};

export default MyDiv;
