import useWebAnimations from "@wellyshen/use-web-animations";
import React, { useEffect } from "react";
import "./RedQueen.css";

const RedQueen = () => {
  /* Background animations */
  var sceneryFrames = [
    { transform: "translateX(100%)" },
    { transform: "translateX(-100%)" },
  ];

  var sceneryTimingBackground = {
    duration: 36000,
    iterations: Infinity,
  };

  var sceneryTimingForeground = {
    duration: 12000,
    iterations: Infinity,
  };

  var background1Movement = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingBackground,
  });

  var background2Movement = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingBackground,
  });

  var foreground1Movement = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingForeground,
  });

  var foreground2Movement = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingForeground,
  });

  var spriteFrames = [
    { transform: "translateY(0)" },
    { transform: "translateY(-100%)" },
  ];
  var redQueen_alice = useWebAnimations({
    keyframes: spriteFrames,
    timing: {
      easing: "steps(7, end)",
      direction: "reverse",
      duration: 600,
      playbackRate: 1,
      iterations: Infinity,
    },
  });

  /* Alice tires so easily! 
  Every so many seconds, reduce their playback rate so they slow a little.
  */

  var sceneries = [
    foreground1Movement,
    foreground2Movement,
    background1Movement,
    background2Movement,
  ];
  let adjustBackgroundPlayback = null;
  useEffect(() => {
    adjustBackgroundPlayback = function () {
      if (redQueen_alice.getAnimation().playbackRate < 0.8) {
        sceneries.forEach(function (anim) {
          anim.getAnimation().playbackRate =
            (redQueen_alice.getAnimation().playbackRate / 2) * -1;
        });
      } else if (redQueen_alice.getAnimation().playbackRate > 1.2) {
        sceneries.forEach(function (anim) {
          anim.getAnimation().playbackRate =
            redQueen_alice.getAnimation().playbackRate / 2;
        });
      } else {
        sceneries.forEach(function (anim) {
          anim.getAnimation().playbackRate = 0;
        });
      }
    };
    adjustBackgroundPlayback();
  }, [adjustBackgroundPlayback]);

  useEffect(() => {
    setInterval(function () {
      if (redQueen_alice.getAnimation().playbackRate > 0.4) {
        redQueen_alice.getAnimation().playbackRate *= 0.9;
      }

      adjustBackgroundPlayback();
    }, 3000);
  }, []);

  const goFaster = () => {
    redQueen_alice.getAnimation().playbackRate *= 1.1;

    adjustBackgroundPlayback();
  };
  useEffect(() => {
    document.addEventListener("click", goFaster);
    document.addEventListener("touchstart", goFaster);

    return () => {
      document.removeEventListener("click", goFaster);
      document.removeEventListener("touchstart", goFaster);
    };
  }, []);

  return (
    <>
      <div className="sky" />
      <div className="earth">
        <div id="red-queen_and_alice">
          <img
            id="red-queen_and_alice_sprite"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png"
            srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen.png 2x"
            alt="Alice and the Red Queen running to stay in place."
            ref={redQueen_alice.ref}
          />
        </div>
      </div>
      <div className="scenery" id="foreground1" ref={foreground1Movement.ref}>
        <img
          id="palm3"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png"
          srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3.png 2x"
          alt=" "
        />
      </div>
      <div className="scenery" id="foreground2" ref={foreground2Movement.ref}>
        <img
          id="bush"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png"
          srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush.png 2x"
          alt=" "
        />
        <img
          id="w_rook_upright"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png"
          srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright.png 2x"
          alt=" "
        />
      </div>
      <div className="scenery" id="background1" ref={background1Movement.ref}>
        <img
          id="r_pawn_upright"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png"
          srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright.png 2x"
          alt=" "
        />
        <img
          id="w_rook"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png"
          srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook.png 2x"
          alt=" "
        />
        <img
          id="palm1"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png"
          srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1.png 2x"
          alt=" "
        />
      </div>
      <div className="scenery" id="background2" ref={background2Movement.ref}>
        <img
          id="r_pawn"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png"
          srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn.png 2x"
          alt=" "
        />
        <img
          id="r_knight"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png"
          srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight.png 2x"
          alt=" "
        />
        <img
          id="palm2"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png"
          srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2.png 2x"
          alt=" "
        />
      </div>
    </>
  );
};

export default RedQueen;
