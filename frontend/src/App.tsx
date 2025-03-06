import React, { useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import VpetCard from "./components/VpetsCard";
import './App.css';


interface VpetImages {
  individual: string[];
  spritesheet: string;
}

const App: React.FC = () => {
  const [isVitrineOpen, setIsVitrineOpen] = useState(false);
  const [vpetImages, setVpetImages] = useState<VpetImages | null>(null);

  const handleFormSubmit = (images: VpetImages) => {
    setVpetImages(images);
    setIsVitrineOpen(true);
  };

  return (
    <div className="body-container">
      <Header />
      <Form onSubmit={handleFormSubmit} />
      <VpetCard
        isVisible={isVitrineOpen}
        onClose={() => setIsVitrineOpen(false)}
        images={vpetImages}
      />
    </div>
  );
};

export default App;
