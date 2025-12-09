import React from "react";
import { motion, useAnimation } from "framer-motion";

export default function Video() {
  const controls = useAnimation();

  React.useEffect(() => {
    const sequence = async () => {
      await controls.start({ scale: 0.25, transition: { duration: 2 } });
      await controls.start({ scale: 0.5, transition: { duration: 2 } });
      await controls.start({ scale: 0.75, transition: { duration: 2 } });
      await controls.start({ scale: 1, transition: { duration: 2 } });
    };
    sequence();
  }, [controls]);

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <motion.video
        animate={controls}
        src="https://v.ftcdn.net/01/69/40/53/700_F_169405316_YmWXHtWdhsHuLfu4YeP5DhP02Kx9hiF5_ST.mp4"
        autoPlay
        loop
        muted
        className="
          w-full h-full
          max-w-full max-h-full
          object-cover object-center
          sm:object-cover
          md:object-cover
        "
      />
    </div>
  );
}
