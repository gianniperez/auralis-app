"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue } from "framer-motion";

const POINTER_FINE_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeToFinePointer(callback: () => void) {
  const mediaQuery = window.matchMedia(POINTER_FINE_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => {
    mediaQuery.removeEventListener("change", callback);
  };
}

function getFinePointerSnapshot() {
  return window.matchMedia(POINTER_FINE_QUERY).matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const isFinePointer = useSyncExternalStore(
    subscribeToFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot,
  );

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible((prev) => (prev ? prev : true));
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "input" ||
        target.tagName.toLowerCase() === "textarea" ||
        target.tagName.toLowerCase() === "select" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.closest("[role='button']") !== null ||
        target.closest("[class*='card']") !== null ||
        target.closest("[class*='cursor-pointer']") !== null ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovering(isInteractive);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isFinePointer, mouseX, mouseY]);

  if (!isFinePointer) return null;

  return (
    <motion.div
      className="fixed pointer-events-none select-none z-[99999] will-change-transform flex items-center justify-center transition-all duration-300"
      style={{
        left: mouseX,
        top: mouseY,
        width: isHovering ? 46 : 38,
        height: isHovering ? 46 : 38,
        transformOrigin: "50% 2.5%",
        transform: `translate(-50%, -2.5%) rotate(${
          isHovering ? "-18deg" : "-24deg"
        }) scale(${isMouseDown ? 0.9 : isHovering ? 1.15 : 1})`,
        opacity: isVisible ? 1 : 0,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 736 736"
        className="w-full h-full block transition-all duration-300"
        style={{
          filter: isHovering
            ? "drop-shadow(0 0 2px rgba(8, 4, 13, 0.9)) drop-shadow(0 0 6px #ffffff) drop-shadow(0 0 14px rgba(253, 245, 230, 0.95)) drop-shadow(0 0 24px rgba(237, 194, 158, 0.85))"
            : "drop-shadow(0 0 2px rgba(8, 4, 13, 0.8)) drop-shadow(0 0 4px rgba(253, 245, 230, 0.95)) drop-shadow(0 0 10px rgba(237, 194, 158, 0.75)) drop-shadow(0 0 20px rgba(227, 164, 110, 0.4))",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="cursor_crest_grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            {/* Oro Alquímico refinado: Punta de oro blanco y cuerpo oro cálido */}
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#fdf5e6" />
            <stop offset="70%" stopColor="#edc29e" />
            <stop offset="100%" stopColor="#c59267" />
          </linearGradient>
          <linearGradient
            id="cursor_crest_hover_grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            {/* Hover luminoso: Resplandor celestial de oro blanco y halo solar */}
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#fdf5e6" />
            <stop offset="85%" stopColor="#edc29e" />
            <stop offset="100%" stopColor="#fdf5e6" />
          </linearGradient>
        </defs>
        <path
          d="M 373.478 18.500 C 373.843 19.600, 375.206 24.100, 376.508 28.500 C 380.723 42.753, 399.733 104.972, 405.838 124.500 C 409.105 134.950, 426.444 188.674, 444.369 243.886 C 462.294 299.098, 477.213 345.673, 477.521 347.386 C 478.077 350.470, 477.968 350.562, 466.291 356.896 C 449.132 366.205, 432.553 377.287, 426.034 383.806 C 416.666 393.175, 407.246 411.150, 399.095 435.210 C 394.437 448.958, 393.679 452, 394.910 452 C 396.075 452, 395.932 452.149, 409.952 436.380 C 427.556 416.581, 441.762 402.747, 449.864 397.513 C 472.505 382.887, 511.765 367.746, 540.500 362.558 C 544.900 361.764, 552.775 360.384, 558 359.492 C 563.225 358.600, 570.584 357.337, 574.353 356.685 L 581.207 355.500 571.853 349.374 C 550.048 335.094, 532.666 318.878, 520.032 301.030 C 507.006 282.627, 486.797 247.052, 471.569 215.720 C 466.432 205.149, 455.149 182.100, 446.498 164.500 C 437.846 146.900, 419.634 109.775, 406.027 82 C 383.865 36.764, 371.599 12.832, 373.478 18.500 M 344.280 52.665 C 334.841 71.824, 319.611 102.800, 310.436 121.500 C 249.665 245.359, 251.050 242.607, 238.255 264.958 C 221.117 294.896, 208.897 312.138, 196.334 324.105 C 186.299 333.663, 165.667 349.300, 158.750 352.588 C 156.688 353.568, 155 354.647, 155 354.986 C 155 355.325, 166.137 357.521, 179.750 359.866 C 205.231 364.257, 207.849 364.866, 226.459 370.729 C 257.244 380.429, 285.105 394.647, 299.391 407.947 C 302.080 410.451, 311.710 420.825, 320.790 431 C 329.869 441.175, 337.903 450.156, 338.642 450.957 C 346.487 459.464, 331.879 417.423, 319.720 396.500 C 317.483 392.650, 313.047 386.939, 309.862 383.810 C 302.846 376.915, 285.667 365.448, 269.750 357.034 C 261.750 352.805, 258 350.277, 258 349.112 C 258 347.070, 269.907 309.933, 317.509 163.500 C 323.767 144.250, 331.585 119.725, 334.882 109 C 351.380 55.340, 362.026 19.579, 361.750 18.751 C 361.582 18.245, 353.720 33.506, 344.280 52.665 M 365.548 251.750 C 360.497 273.283, 349.656 302.665, 342.686 313.705 C 336.711 323.170, 319.191 340.115, 310.750 344.593 C 307.182 346.485, 307.281 347.460, 311.207 349.086 C 316.450 351.257, 333.065 364.179, 339.288 370.923 C 344.840 376.941, 350.559 386.813, 355.137 398.282 C 358.626 407.024, 365.138 425.231, 366.480 430 C 367.201 432.561, 367.963 433.854, 368.249 433 C 380.093 397.623, 388.045 380.163, 396.361 371.273 C 402.834 364.353, 415.757 353.929, 423.300 349.543 L 428.099 346.752 424.300 344.183 C 410.827 335.074, 398.601 322.690, 391.433 310.890 C 385.421 300.993, 375.716 273.731, 370.381 251.751 C 369.346 247.489, 368.245 244.002, 367.933 244.001 C 367.621 244, 366.548 247.488, 365.548 251.750 M 115 344.102 C 94.925 347.323, 72.875 350.825, 66 351.885 C 21.376 358.763, 5.934 361.484, 7.635 362.170 C 8.661 362.584, 20.525 364.519, 34 366.472 C 47.475 368.424, 80.093 373.361, 106.484 377.444 C 132.875 381.526, 154.580 384.753, 154.719 384.615 C 154.857 384.477, 152.164 382.302, 148.735 379.782 C 137.903 371.823, 128.861 362.970, 129.198 360.653 C 129.519 358.447, 143.160 346.156, 149.913 341.989 C 153.935 339.507, 155.121 337.890, 152.750 338.122 C 152.063 338.190, 135.075 340.880, 115 344.102 M 582.032 338.775 C 582.049 339.174, 584.862 341.394, 588.282 343.708 C 596.050 348.966, 607 359.091, 607 361.016 C 607 362.942, 595.629 373.736, 587.456 379.569 C 583.854 382.139, 581.048 384.381, 581.219 384.553 C 581.486 384.819, 624.597 378.396, 655 373.561 C 671.029 371.011, 716.177 364.215, 722 363.476 C 725.025 363.091, 728.074 362.465, 728.775 362.085 C 729.927 361.459, 693.672 355.482, 615.500 343.408 C 600.100 341.030, 586.263 338.851, 584.750 338.567 C 583.237 338.283, 582.014 338.376, 582.032 338.775 M 153 365.316 C 153 365.631, 156.360 368.417, 160.467 371.507 C 186.549 391.137, 194.699 403.850, 195.732 426.511 C 196.415 441.515, 192.962 457.857, 184.265 480.772 C 183.904 481.722, 189.887 476.153, 197.561 468.396 C 210.187 455.633, 212.320 453.907, 220.006 450.237 C 229.315 445.791, 236.303 444, 244.339 444 C 266.886 444, 287.466 461.829, 292.536 485.754 C 295.561 500.031, 294.027 509.397, 285.122 531 C 281.834 538.975, 279.552 545.647, 280.050 545.826 C 280.548 546.005, 283.778 544.004, 287.227 541.380 C 313.309 521.539, 322.809 507.312, 331.381 475.254 L 333.854 466.007 327.081 457.254 C 323.356 452.439, 314.700 442.199, 307.846 434.497 C 289.881 414.311, 280.296 406.670, 260.500 396.759 C 238.991 385.989, 206.353 374.349, 188.164 370.960 C 156.534 365.067, 153 364.500, 153 365.316 M 558 369.035 C 533.689 373.638, 531.996 374.093, 512.112 381.367 C 477.936 393.869, 461.692 402.370, 446.077 415.924 C 438.794 422.246, 418.580 444.628, 408.533 457.495 L 401.818 466.094 405.484 478.797 C 412.256 502.257, 418.197 513.174, 431.488 526.582 C 439.486 534.649, 454.426 546.396, 455.944 545.810 C 456.385 545.639, 454.973 541.225, 452.806 536 C 443.991 514.741, 442.847 510.934, 442.287 501 C 441.320 483.856, 447.358 468.500, 459.534 457.133 C 475.163 442.544, 494.673 440.057, 515.500 449.999 C 521.955 453.081, 525.449 455.719, 533.588 463.659 C 539.136 469.072, 545.359 475.453, 547.416 477.839 C 549.473 480.225, 551.343 481.991, 551.571 481.762 C 551.800 481.534, 550.583 477.556, 548.867 472.923 C 542.965 456.984, 540.891 447.423, 540.319 433.500 C 539.730 419.156, 540.917 412.290, 545.756 402.055 C 549.034 395.121, 561.428 382.142, 573.686 372.807 C 578.809 368.905, 583 365.553, 583 365.357 C 583 364.538, 577.410 365.360, 558 369.035 M 367.421 465.709 C 365.019 476.217, 357.921 498.845, 352.272 514 C 346.363 529.855, 338.029 539.816, 321.326 550.988 C 317.022 553.867, 313.500 556.368, 313.500 556.546 C 313.500 556.724, 316.709 559.123, 320.630 561.877 C 331.431 569.461, 339.321 577.248, 342.778 583.735 C 346.287 590.319, 350.426 603.797, 351.458 612 C 351.839 615.025, 352.786 621.550, 353.563 626.500 C 354.340 631.450, 356.354 644.725, 358.039 656 C 368.973 729.173, 367.911 722.910, 369.043 720.889 C 369.488 720.093, 370.587 714.505, 371.484 708.471 C 373.402 695.579, 377.697 666.777, 381.992 638 C 386.739 606.198, 386.961 604.943, 389.160 597.500 C 391.611 589.199, 395.140 581.923, 399.238 576.720 C 402.497 572.583, 417.023 560.858, 421.311 558.904 C 425.004 557.222, 424.681 555.612, 420.250 553.610 C 414.620 551.066, 399.079 538.182, 394.787 532.500 C 390.183 526.405, 387.399 520.642, 382.580 507.233 C 378.112 494.798, 370.028 468.153, 370.012 465.809 C 369.991 462.871, 368.086 462.798, 367.421 465.709"
          fill={
            isHovering
              ? "url(#cursor_crest_hover_grad)"
              : "url(#cursor_crest_grad)"
          }
          fillRule="evenodd"
        />
      </svg>
    </motion.div>
  );
}
