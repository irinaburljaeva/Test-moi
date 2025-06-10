(function () {
  const { useState } = React;

  function App() {
    const [stage, setStage] = useState(0);
    const maxClicks = 10;
    const [shaking, setShaking] = useState(false);

    const handleClick = () => {
      if (stage < maxClicks) {
        setShaking(true);
        setTimeout(() => setShaking(false), 200);
        setStage(stage + 1);
      }
    };

    // создаём линии-трещины
    const cracks = [];
    for (let i = 0; i < stage; i++) {
      const angle   = (Math.random() * 60) - 30;
      const offsetX = (Math.random() * 40) - 20;
      cracks.push(
        React.createElement("div", {
          key: i,
          className: "crack-line",
          style: {
            transform: `translateX(${offsetX}px) rotate(${angle}deg)`,
            opacity: 0.2 + i * (0.6 / maxClicks)
          }
        })
      );
    }

    // финальный экран
    if (stage >= maxClicks) {
      return React.createElement("div", null,
        React.createElement("h2", null, "🎉 Ура! Подарок готов!"),
        React.createElement("p", null, "Отсканируй QR-код, чтобы забрать подарок"),
        React.createElement("img", {
          src: "https://sbpqr.nspk.ru/QRGenerator/images/qr_example.png",
          className: "qr",
          alt: "QR-код"
        }),
        React.createElement("div", { className: "messages" },
          React.createElement("h3", null, "Поздравления от команды 💌"),
          React.createElement("p", null, "• Ты лучший! Удачи в семейной жизни — Катя 🙌"),
          React.createElement("p", null, "• С любовью и теплом! — Ирина 💐"),
          React.createElement("p", null, "• Пусть в доме всегда будет мир — Саша ☀️")
        )
      );
    }

    // стартовый экран
    if (stage === 0) {
      return React.createElement("div", null,
        React.createElement("h1", null, "Ярослав, поздравляем со свадьбой!"),
        React.createElement("p", null, "Пусть жизнь в роли мужа будет сказкой!"),
        React.createElement("button", {
          className: "button",
          onClick: () => setStage(1)
        }, "К подарочку 🎁")
      );
    }

    // промежуточные стадии (1–9)
    return React.createElement("div", null,
      React.createElement("p", null, "Нажимай на свинку, чтобы она отдала тебе подарок"),
      React.createElement("div", { className: "piggy-container" },
        // надёжный URL свинки
        React.createElement("img", {
          src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Piggy_Bank_Vector.svg/512px-Piggy_Bank_Vector.svg.png",
          className: "piggy" + (shaking ? " shake" : ""),
          onClick: handleClick,
          alt: "копилка-свинка"
        }),
        // наложенные линии-трещины
        ...cracks
      )
    );
  }

  ReactDOM.createRoot(document.getElementById("root"))
    .render(React.createElement(App));
})();
