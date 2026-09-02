import level1Image from "../assets/student/levels/level1.png";
import level2Image from "../assets/student/levels/level2.png";
import level3Image from "../assets/student/levels/level3.png";
import level4Image from "../assets/student/levels/level4.png";
import level5Image from "../assets/student/levels/level5.png";

const levelImages = {
  1: level1Image,
  2: level2Image,
  3: level3Image,
  4: level4Image,
  5: level5Image,
};

export const getStudentLevelImage = (level) => {
  const safeLevel = Math.min(
    Math.max(Number(level) || 1, 1),
    5
  );

  return levelImages[safeLevel];
};