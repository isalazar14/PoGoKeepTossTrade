function getCorrectCpms(floatCPMs: number[], resultType: "df" | "map" = "df") {
	if (floatCPMs.length == 0) {console.error("floatCpms array is empty"); return}
  const trueCpms = new Float32Array(floatCPMs);
  const maxLevel = trueCpms.length;
  const totalCpmCount = trueCpms.length * 2 - 1;
  let allCpms: [number, number][] = Array(totalCpmCount);
  trueCpms.forEach((levelCpm, i) => {
    let level = i + 1;
    allCpms[(level - 1) * 2] = [level, levelCpm];
    if (level < maxLevel) {
      let nextLevelCpm = trueCpms[i + 1];
      let halfLevelCpm = getHalfLevelCPM(levelCpm, nextLevelCpm);
      let halfLevel = level + 0.5;
      allCpms[(halfLevel - 1) * 2] = [halfLevel, halfLevelCpm];
    }
  }, allCpms);
  if (resultType == "map") return new Map(allCpms)
  return allCpms;
}

function getHalfLevelCPM(levelCpm: number, nextLevelCpm: number): number {
  let halfLevelCpm = Math.sqrt(
    levelCpm * levelCpm -
      (levelCpm * levelCpm) / 2 +
      (nextLevelCpm * nextLevelCpm) / 2
  );
  return halfLevelCpm;
}

// console.log(getCorrectCpms([], 'map'))