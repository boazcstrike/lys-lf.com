import React from "react";

function MiniShowcase({ text }) {
  return (
    <div className="bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url('@/assets/images/LYS-38.jpg')] bg-cover bg-fixed bg-center bg-no-repeat pt-4 pb-1 text-center">
      <h2 className="font-raleway font-bold uppercase text-[2.6em] text-white my-[1.2em]">
        {text}
      </h2>
    </div>
  );
}

export default MiniShowcase;
