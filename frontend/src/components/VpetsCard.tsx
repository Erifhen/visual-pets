import React, { useState, useEffect } from "react";

interface VpetCardProps {
  onClose: () => void;
  isVisible: boolean;
  images: { individual: string[]; spritesheet: string } | null;
}

const VpetCard: React.FC<VpetCardProps> = ({ onClose, isVisible, images }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isVisible && images) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, images]);

  const handleClose = () => {
    const confirmClose = window.confirm(
      "Tem certeza? Ao fechar esses V-Pets deixarão de existir... :c (baixe-os enquanto é tempo)"
    );
    if (confirmClose) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="vitrine-container">
      <button onClick={handleClose} className="close-button" aria-label="Fechar">
        X
      </button>

      {loading ? (
        <p>Gerando os seus V-Pets...</p>
      ) : images ? (
        <>
          <div className="cards-vitrine">
            {images.individual?.map((imageUrl, index) => (
              <div
                key={index}
                className="vpet-card"
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <img src={imageUrl} alt={`VPet ${index}`} />
                {hoverIndex === index && (
                  <a
                    href={imageUrl}
                    download={`VPet_${index}.png`}
                    className="download-button"
                  >
                    ⬇
                  </a>
                )}
              </div>
            ))}
          </div>
          {images.spritesheet && (
            <a
              href={images.spritesheet}
              download="spritesheet.png"
              className="download-button-spritesheet"
            >
              Baixar SpriteSheet
            </a>
          )}
        </>
      ) : null}
    </div>
  );
};

export default VpetCard;
