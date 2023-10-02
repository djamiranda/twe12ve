import React from 'react';

const PopupWindow = ({ currentProduct }) => {
  const openPopupWindow = () => {
    const newWindow = window.open('', 'Popup Window', 'width=500,height=500');
    newWindow.document.head.innerHTML = `
      <style>
        /* Import fonts */
        @font-face {
          font-family: 'FuturaExtraBoldCondensed';
          src: url("https://cdn.glitch.com/711eafe7-e0de-40bd-ba9c-cfab210f5b28%2FFuturaExtraBoldCondensed.otf?v=1631480624986") format("opentype");
        }

        /* Apply styles to the elements */
        .popup-container {
          text-align: center;
          padding: 15px;
        }

        .popup-text {
          font-family: 'FuturaExtraBoldCondensed', sans-serif;
          font-style: normal;
          font-weight: bold;
          font-size: 110px;
          line-height: 10%;
          letter-spacing: -5px
          
          
        }
        // .popup-text .second {
        //   padding-right: 14px;
        // }

        .popup-image {
          width: 300px;
          height: auto;
        }
      </style>
    `;
    newWindow.document.body.innerHTML = `
      <div class="popup-container">
        <h1 class="popup-text">GOT</h1>
        <h1 class="popup-text second"><i>' </i>EM</h1>
        <img class="popup-image" src="/images/${currentProduct.image}" alt="${currentProduct.name}" />
      </div>
    `;
  };

  return (
    <button onClick={openPopupWindow}>Share</button>
  );
};

export default PopupWindow;
