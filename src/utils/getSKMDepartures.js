export const getSKMDepartures = (direction) => {
  const now = new Date();
  const currentDayIndex = now.getDay(); // 0 - Sunday, 6 - Saturday
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const todaySchedule = skmSchedule[direction][currentDayIndex];

  let nextDepartures = [];

  for (const { hour, minutes } of todaySchedule) {
    if (hour < currentHour) continue;

    const upcomingMinutes =
      hour === currentHour
        ? minutes.filter((minute) => minute > currentMinute)
        : minutes;

    for (const minute of upcomingMinutes) {
      const timeLeftInMinutes =
        (hour - currentHour) * 60 + (minute - currentMinute);

      if (timeLeftInMinutes < 5) {
        continue;
      }

      let timeLeft;
      if (timeLeftInMinutes < 60) {
        timeLeft = `${timeLeftInMinutes}min`;
      } else {
        const hoursLeft = Math.floor(timeLeftInMinutes / 60);
        const minutesLeft = timeLeftInMinutes % 60;
        timeLeft = `${hoursLeft}h ${minutesLeft}min`;
      }

      nextDepartures.push({ timeLeft });

      if (nextDepartures.length >= 5) break;
    }

    if (nextDepartures.length >= 5) break;
  }

  return nextDepartures;
};

const skmSchedule = {
  Śródmieście: [
    [
      { hour: 4, minutes: [26, 57] },
      { hour: 5, minutes: [32] },
      { hour: 6, minutes: [3, 33] },
      { hour: 7, minutes: [2, 33] },
      { hour: 8, minutes: [3, 33] },
      { hour: 9, minutes: [3, 33] },
      { hour: 10, minutes: [3, 33] },
      { hour: 11, minutes: [3, 33] },
      { hour: 12, minutes: [3, 33] },
      { hour: 13, minutes: [3, 33] },
      { hour: 14, minutes: [3, 33] },
      { hour: 15, minutes: [3, 33] },
      { hour: 16, minutes: [3, 33] },
      { hour: 17, minutes: [3, 33] },
      { hour: 18, minutes: [3, 33] },
      { hour: 19, minutes: [3, 33] },
      { hour: 20, minutes: [3, 33] },
      { hour: 21, minutes: [3, 33] },
      { hour: 22, minutes: [3, 33] },
      { hour: 23, minutes: [17, 47] },
    ],
    [
      { hour: 4, minutes: [22] },
      { hour: 5, minutes: [2, 17, 32, 47] },
      { hour: 6, minutes: [2, 12, 24, 32, 39, 47, 55] },
      { hour: 7, minutes: [2, 9, 17, 24, 32, 39, 48, 54] },
      { hour: 8, minutes: [2, 10, 18, 25, 32, 40, 47, 56] },
      { hour: 9, minutes: [5, 12, 23, 32, 42, 52] },
      { hour: 10, minutes: [2, 12, 22, 32, 42, 52] },
      { hour: 11, minutes: [2, 12, 22, 32, 42, 52] },
      { hour: 12, minutes: [2, 13, 22, 32, 42, 52] },
      { hour: 13, minutes: [2, 12, 22, 32, 45, 52] },
      { hour: 14, minutes: [2, 13, 22, 32, 42, 54] },
      { hour: 15, minutes: [2, 14, 22, 32, 45, 54] },
      { hour: 16, minutes: [2, 9, 17, 24, 32, 39, 47, 54] },
      { hour: 17, minutes: [2, 9, 17, 24, 32, 39, 49] },
      { hour: 18, minutes: [2, 12, 22, 32, 42, 52] },
      { hour: 19, minutes: [2, 12, 22, 32, 47] },
      { hour: 20, minutes: [2, 17, 32, 47] },
      { hour: 21, minutes: [2, 17, 32, 47] },
      { hour: 22, minutes: [2, 32] },
      { hour: 23, minutes: [15, 45] },
    ],
    [
      { hour: 4, minutes: [22] },
      { hour: 5, minutes: [2, 17, 32, 47] },
      { hour: 6, minutes: [2, 12, 24, 32, 39, 47, 55] },
      { hour: 7, minutes: [2, 9, 17, 24, 32, 39, 48, 54] },
      { hour: 8, minutes: [2, 10, 18, 25, 32, 40, 47, 56] },
      { hour: 9, minutes: [5, 12, 23, 32, 42, 52] },
      { hour: 10, minutes: [2, 12, 22, 32, 42, 52] },
      { hour: 11, minutes: [2, 12, 22, 32, 42, 52] },
      { hour: 12, minutes: [2, 13, 22, 32, 42, 52] },
      { hour: 13, minutes: [2, 12, 22, 32, 45, 52] },
      { hour: 14, minutes: [2, 13, 22, 32, 42, 54] },
      { hour: 15, minutes: [2, 14, 22, 32, 45, 54] },
      { hour: 16, minutes: [2, 9, 17, 24, 32, 39, 47, 54] },
      { hour: 17, minutes: [2, 9, 17, 24, 32, 39, 49] },
      { hour: 18, minutes: [2, 12, 22, 32, 42, 52] },
      { hour: 19, minutes: [2, 12, 22, 32, 47] },
      { hour: 20, minutes: [2, 17, 32, 47] },
      { hour: 21, minutes: [2, 17, 32, 47] },
      { hour: 22, minutes: [2, 32] },
      { hour: 23, minutes: [15, 45] },
    ],
    [
      { hour: 4, minutes: [22] },
      { hour: 5, minutes: [2, 17, 32, 47] },
      { hour: 6, minutes: [2, 12, 24, 32, 39, 47, 55] },
      { hour: 7, minutes: [2, 9, 17, 24, 32, 39, 48, 54] },
      { hour: 8, minutes: [2, 10, 18, 25, 32, 40, 47, 56] },
      { hour: 9, minutes: [5, 12, 23, 32, 42, 52] },
      { hour: 10, minutes: [2, 12, 22, 32, 42, 52] },
      { hour: 11, minutes: [2, 12, 22, 32, 42, 52] },
      { hour: 12, minutes: [2, 13, 22, 32, 42, 52] },
      { hour: 13, minutes: [2, 12, 22, 32, 45, 52] },
      { hour: 14, minutes: [2, 13, 22, 32, 42, 54] },
      { hour: 15, minutes: [2, 14, 22, 32, 45, 54] },
      { hour: 16, minutes: [2, 9, 17, 24, 32, 39, 47, 54] },
      { hour: 17, minutes: [2, 9, 17, 24, 32, 39, 49] },
      { hour: 18, minutes: [2, 12, 22, 32, 42, 52] },
      { hour: 19, minutes: [2, 12, 22, 32, 47] },
      { hour: 20, minutes: [2, 17, 32, 47] },
      { hour: 21, minutes: [2, 17, 32, 47] },
      { hour: 22, minutes: [2, 32] },
      { hour: 23, minutes: [15, 45] },
    ],
    [
      { hour: 4, minutes: [22] },
      { hour: 5, minutes: [2, 17, 32, 47] },
      { hour: 6, minutes: [2, 12, 24, 32, 39, 47, 55] },
      { hour: 7, minutes: [2, 9, 17, 24, 32, 39, 48, 54] },
      { hour: 8, minutes: [2, 10, 18, 25, 32, 40, 47, 56] },
      { hour: 9, minutes: [5, 12, 23, 32, 42, 52] },
      { hour: 10, minutes: [2, 12, 22, 32, 42, 52] },
      { hour: 11, minutes: [2, 12, 22, 32, 42, 52] },
      { hour: 12, minutes: [2, 13, 22, 32, 42, 52] },
      { hour: 13, minutes: [2, 12, 22, 32, 45, 52] },
      { hour: 14, minutes: [2, 13, 22, 32, 42, 54] },
      { hour: 15, minutes: [2, 14, 22, 32, 45, 54] },
      { hour: 16, minutes: [2, 9, 17, 24, 32, 39, 47, 54] },
      { hour: 17, minutes: [2, 9, 17, 24, 32, 39, 49] },
      { hour: 18, minutes: [2, 12, 22, 32, 42, 52] },
      { hour: 19, minutes: [2, 12, 22, 32, 47] },
      { hour: 20, minutes: [2, 17, 32, 47] },
      { hour: 21, minutes: [2, 17, 32, 47] },
      { hour: 22, minutes: [2, 32] },
      { hour: 23, minutes: [15, 45] },
    ],
    [
      { hour: 4, minutes: [27] },
      { hour: 5, minutes: [12, 32] },
      { hour: 6, minutes: [2, 17, 32, 47] },
      { hour: 7, minutes: [2, 17, 33, 47] },
      { hour: 8, minutes: [2, 17, 32, 47] },
      { hour: 9, minutes: [2, 17, 32, 47] },
      { hour: 10, minutes: [2, 17, 32, 47] },
      { hour: 11, minutes: [2, 17, 32, 47] },
      { hour: 12, minutes: [2, 17, 32, 47] },
      { hour: 13, minutes: [2, 17, 32, 47] },
      { hour: 14, minutes: [4, 17, 32, 47] },
      { hour: 15, minutes: [2, 17, 32, 47] },
      { hour: 16, minutes: [2, 17, 32, 47] },
      { hour: 17, minutes: [2, 17, 32, 47] },
      { hour: 18, minutes: [2, 17, 32, 47] },
      { hour: 19, minutes: [2, 17, 32, 47] },
      { hour: 20, minutes: [2, 17, 32, 47] },
      { hour: 21, minutes: [2, 17, 32, 47] },
      { hour: 22, minutes: [2, 32] },
      { hour: 23, minutes: [17, 47] },
    ],
    [
      { hour: 4, minutes: [26, 57] },
      { hour: 5, minutes: [32] },
      { hour: 6, minutes: [3, 33] },
      { hour: 7, minutes: [2, 33] },
      { hour: 8, minutes: [3, 33] },
      { hour: 9, minutes: [3, 33] },
      { hour: 10, minutes: [3, 33] },
      { hour: 11, minutes: [3, 33] },
      { hour: 12, minutes: [3, 33] },
      { hour: 13, minutes: [3, 33] },
      { hour: 14, minutes: [3, 33] },
      { hour: 15, minutes: [3, 33] },
      { hour: 16, minutes: [3, 33] },
      { hour: 17, minutes: [3, 33] },
      { hour: 18, minutes: [3, 33] },
      { hour: 19, minutes: [3, 33] },
      { hour: 20, minutes: [3, 33] },
      { hour: 21, minutes: [3, 33] },
      { hour: 22, minutes: [3, 33] },
      { hour: 23, minutes: [17, 47] },
    ],
  ],
  Wejherowo: [
    [
      { hour: 0, minutes: [19] },
      { hour: 2, minutes: [3] },
      { hour: 4, minutes: [7, 37] },
      { hour: 5, minutes: [3, 18, 33, 48] },
      { hour: 6, minutes: [3, 13, 23, 33, 43, 48, 55] },
      { hour: 7, minutes: [3, 10, 18, 26, 33, 40, 48, 55] },
      { hour: 8, minutes: [3, 10, 18, 25, 30, 40, 48, 55] },
      { hour: 9, minutes: [3, 13, 23, 33, 43, 53] },
      { hour: 10, minutes: [3, 11, 23, 33, 43, 53] },
      { hour: 11, minutes: [3, 13, 23, 33, 43, 53] },
      { hour: 12, minutes: [3, 13, 23, 33, 43, 51] },
      { hour: 13, minutes: [3, 10, 23, 33, 40, 48] },
      { hour: 14, minutes: [3, 13, 23, 33, 43, 53] },
      { hour: 15, minutes: [3, 18, 25, 33, 40, 48, 55] },
      { hour: 16, minutes: [3, 18, 25, 33, 40, 48, 55] },
      { hour: 17, minutes: [3, 10, 23, 33, 43, 53] },
      { hour: 18, minutes: [3, 10, 23, 33, 43, 53] },
      { hour: 19, minutes: [3, 10, 23, 33, 43, 53] },
      { hour: 20, minutes: [3, 18, 33, 48] },
      { hour: 21, minutes: [3, 18, 33, 48] },
      { hour: 22, minutes: [3, 33] },
      { hour: 23, minutes: [3, 33] },
    ],
    [
      { hour: 0, minutes: [19] },
      { hour: 2, minutes: [3] },
      { hour: 4, minutes: [7, 37] },
      { hour: 5, minutes: [3, 18, 33, 48] },
      { hour: 6, minutes: [3, 13, 23, 33, 43, 48, 55] },
      { hour: 7, minutes: [3, 10, 18, 26, 33, 40, 48, 55] },
      { hour: 8, minutes: [3, 10, 18, 25, 30, 40, 48, 55] },
      { hour: 9, minutes: [3, 13, 23, 33, 43, 53] },
      { hour: 10, minutes: [3, 11, 23, 33, 43, 53] },
      { hour: 11, minutes: [3, 13, 23, 33, 43, 53] },
      { hour: 12, minutes: [3, 13, 23, 33, 43, 51] },
      { hour: 13, minutes: [3, 10, 23, 33, 40, 48] },
      { hour: 14, minutes: [3, 13, 23, 33, 43, 53] },
      { hour: 15, minutes: [3, 18, 25, 33, 40, 48, 55] },
      { hour: 16, minutes: [3, 18, 25, 33, 40, 48, 55] },
      { hour: 17, minutes: [3, 10, 23, 33, 43, 53] },
      { hour: 18, minutes: [3, 10, 23, 33, 43, 53] },
      { hour: 19, minutes: [3, 10, 23, 33, 43, 53] },
      { hour: 20, minutes: [3, 18, 33, 48] },
      { hour: 21, minutes: [3, 18, 33, 48] },
      { hour: 22, minutes: [3, 33] },
      { hour: 23, minutes: [3, 33] },
    ],
    [
      { hour: 0, minutes: [19] },
      { hour: 2, minutes: [3] },
      { hour: 4, minutes: [7, 37] },
      { hour: 5, minutes: [3, 18, 33, 48] },
      { hour: 6, minutes: [3, 13, 23, 33, 43, 48, 55] },
      { hour: 7, minutes: [3, 10, 18, 26, 33, 40, 48, 55] },
      { hour: 8, minutes: [3, 10, 18, 25, 30, 40, 48, 55] },
      { hour: 9, minutes: [3, 13, 23, 33, 43, 53] },
      { hour: 10, minutes: [3, 11, 23, 33, 43, 53] },
      { hour: 11, minutes: [3, 13, 23, 33, 43, 53] },
      { hour: 12, minutes: [3, 13, 23, 33, 43, 51] },
      { hour: 13, minutes: [3, 10, 23, 33, 40, 48] },
      { hour: 14, minutes: [3, 13, 23, 33, 43, 53] },
      { hour: 15, minutes: [3, 18, 25, 33, 40, 48, 55] },
      { hour: 16, minutes: [3, 18, 25, 33, 40, 48, 55] },
      { hour: 17, minutes: [3, 10, 23, 33, 43, 53] },
      { hour: 18, minutes: [3, 10, 23, 33, 43, 53] },
      { hour: 19, minutes: [3, 10, 23, 33, 43, 53] },
      { hour: 20, minutes: [3, 18, 33, 48] },
      { hour: 21, minutes: [3, 18, 33, 48] },
      { hour: 22, minutes: [3, 33] },
      { hour: 23, minutes: [3, 33] },
    ],
    [
      { hour: 0, minutes: [19] },
      { hour: 2, minutes: [3] },
      { hour: 4, minutes: [7, 37] },
      { hour: 5, minutes: [3, 18, 33, 48] },
      { hour: 6, minutes: [3, 13, 23, 33, 43, 48, 55] },
      { hour: 7, minutes: [3, 10, 18, 26, 33, 40, 48, 55] },
      { hour: 8, minutes: [3, 10, 18, 25, 30, 40, 48, 55] },
      { hour: 9, minutes: [3, 13, 23, 33, 43, 53] },
      { hour: 10, minutes: [3, 11, 23, 33, 43, 53] },
      { hour: 11, minutes: [3, 13, 23, 33, 43, 53] },
      { hour: 12, minutes: [3, 13, 23, 33, 43, 51] },
      { hour: 13, minutes: [3, 10, 23, 33, 40, 48] },
      { hour: 14, minutes: [3, 13, 23, 33, 43, 53] },
      { hour: 15, minutes: [3, 18, 25, 33, 40, 48, 55] },
      { hour: 16, minutes: [3, 18, 25, 33, 40, 48, 55] },
      { hour: 17, minutes: [3, 10, 23, 33, 43, 53] },
      { hour: 18, minutes: [3, 10, 23, 33, 43, 53] },
      { hour: 19, minutes: [3, 10, 23, 33, 43, 53] },
      { hour: 20, minutes: [3, 18, 33, 48] },
      { hour: 21, minutes: [3, 18, 33, 48] },
      { hour: 22, minutes: [3, 33] },
      { hour: 23, minutes: [3, 33] },
    ],
    [
      { hour: 0, minutes: [19] },
      { hour: 2, minutes: [3] },
      { hour: 4, minutes: [7, 37] },
      { hour: 5, minutes: [3, 18, 33, 48] },
      { hour: 6, minutes: [3, 13, 23, 33, 43, 48, 55] },
      { hour: 7, minutes: [3, 10, 18, 26, 33, 40, 48, 55] },
      { hour: 8, minutes: [3, 10, 18, 25, 30, 40, 48, 55] },
      { hour: 9, minutes: [3, 13, 23, 33, 43, 53] },
      { hour: 10, minutes: [3, 11, 23, 33, 43, 53] },
      { hour: 11, minutes: [3, 13, 23, 33, 43, 53] },
      { hour: 12, minutes: [3, 13, 23, 33, 43, 51] },
      { hour: 13, minutes: [3, 10, 23, 33, 40, 48] },
      { hour: 14, minutes: [3, 13, 23, 33, 43, 53] },
      { hour: 15, minutes: [3, 18, 25, 33, 40, 48, 55] },
      { hour: 16, minutes: [3, 18, 25, 33, 40, 48, 55] },
      { hour: 17, minutes: [3, 10, 23, 33, 43, 53] },
      { hour: 18, minutes: [3, 10, 23, 33, 43, 53] },
      { hour: 19, minutes: [3, 10, 23, 33, 43, 53] },
      { hour: 20, minutes: [3, 18, 33, 48] },
      { hour: 21, minutes: [3, 18, 33, 48] },
      { hour: 22, minutes: [3, 33] },
      { hour: 23, minutes: [3, 33] },
    ],
    [
      { hour: 0, minutes: [19] },
      { hour: 1, minutes: [3] },
      { hour: 2, minutes: [3] },
      { hour: 3, minutes: [3] },
      { hour: 4, minutes: [3, 33] },
      { hour: 5, minutes: [8, 48] },
      { hour: 6, minutes: [18, 48] },
      { hour: 7, minutes: [18, 48] },
      { hour: 8, minutes: [18, 48] },
      { hour: 9, minutes: [18, 48] },
      { hour: 10, minutes: [18, 48] },
      { hour: 11, minutes: [18, 48] },
      { hour: 12, minutes: [18, 48] },
      { hour: 13, minutes: [18, 48] },
      { hour: 14, minutes: [18, 48] },
      { hour: 15, minutes: [18, 48] },
      { hour: 16, minutes: [18, 48] },
      { hour: 17, minutes: [18, 48] },
      { hour: 18, minutes: [18, 48] },
      { hour: 19, minutes: [18, 48] },
      { hour: 20, minutes: [18, 48] },
      { hour: 21, minutes: [18, 48] },
      { hour: 22, minutes: [18, 33] },
      { hour: 23, minutes: [3, 33] },
    ],
    [
      { hour: 0, minutes: [19] },
      { hour: 1, minutes: [3] },
      { hour: 2, minutes: [3] },
      { hour: 3, minutes: [3] },
      { hour: 4, minutes: [3, 33] },
      { hour: 5, minutes: [8, 48] },
      { hour: 6, minutes: [18, 48] },
      { hour: 7, minutes: [18, 48] },
      { hour: 8, minutes: [18, 48] },
      { hour: 9, minutes: [18, 48] },
      { hour: 10, minutes: [18, 48] },
      { hour: 11, minutes: [18, 48] },
      { hour: 12, minutes: [18, 48] },
      { hour: 13, minutes: [18, 48] },
      { hour: 14, minutes: [18, 48] },
      { hour: 15, minutes: [18, 48] },
      { hour: 16, minutes: [18, 48] },
      { hour: 17, minutes: [18, 48] },
      { hour: 18, minutes: [18, 48] },
      { hour: 19, minutes: [18, 48] },
      { hour: 20, minutes: [18, 48] },
      { hour: 21, minutes: [18, 48] },
      { hour: 22, minutes: [18, 33] },
      { hour: 23, minutes: [3, 33] },
    ],
  ],
};
