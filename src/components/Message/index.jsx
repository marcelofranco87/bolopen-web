import { useState, useEffect } from "react";

export const Message = ({ status, msg }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!msg) {
      setVisible(false);
      return;
    }

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [msg]);

  return (
    <>
      {visible && (
        <div className={`mensagem mensagem-${status}`}>{msg}</div>
      )}
    </>
  );
}