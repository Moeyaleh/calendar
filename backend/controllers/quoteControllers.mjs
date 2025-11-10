const QUOTES = [
  {
    text: "Take the initiative — for time passes, and lost moments never return.",
    author: "Imam al-Ghazali",
  },
  {
    text: "Do not wait for opportunities; create them with sincerity and effort.",
    author: "Ibn Taymiyyah",
  },
  {
    text: "The one who strives sincerely, even if he stumbles, is better than the one who sits idle.",
    author: "Imam Ahmad ibn Hanbal",
  },
  {
    text: "Work hard in silence, and let your success be your remembrance.",
    author: "Imam al-Shafi’i",
  },
  {
    text: "Action without intention is like a traveler without direction.",
    author: "Imam al-Ghazali",
  },
  {
    text: "Do not be a slave to laziness; the key to success lies in consistency.",
    author: "Hasan al-Basri",
  },
  {
    text: "When you feel weak, remember that Allah created you capable of greatness.",
    author: "Ali ibn Abi Talib (RA)",
  },
  {
    text: "Be patient with your efforts; the seed does not sprout the day it is planted.",
    author: "Ibn al-Qayyim al-Jawziyyah",
  },
  {
    text: "The path to success is built upon small steps done with sincerity.",
    author: "Imam Malik ibn Anas",
  },
  {
    text: "He who has high determination will never be content with mediocrity.",
    author: "Ibn Taymiyyah",
  },
  {
    text: "The believer is not lazy; he rises early and ends his day with gratitude.",
    author: "Umar ibn al-Khattab (RA)",
  },
  {
    text: "If you cannot do great things, then do small things in a great way.",
    author: "Imam al-Shafi’i",
  },
  {
    text: "Your value is in what you do consistently, not what you do occasionally.",
    author: "Ibn al-Jawzi",
  },
  {
    text: "Effort is the price of excellence — pay it daily.",
    author: "Sufyan al-Thawri",
  },
  {
    text: "Do not underestimate a small deed done sincerely; it may outweigh a mountain.",
    author: "Abdullah ibn Mubarak",
  },
  {
    text: "Whoever purifies his intention, Allah will bless his actions beyond measure.",
    author: "Imam al-Nawawi",
  },
  {
    text: "The one who begins his work with Bismillah has already succeeded halfway.",
    author: "Imam al-Bukhari",
  },
  {
    text: "Success is not reaching the end; success is continuing when you want to stop.",
    author: "Ibn Ata’illah al-Iskandari",
  },
  {
    text: "Don’t delay your good deeds until tomorrow, for tomorrow may never come.",
    author: "Hasan al-Basri",
  },
  {
    text: "Allah loves those who work with excellence in whatever they do.",
    author: "Prophet Muhammad ﷺ (Hadith - Sahih Muslim)",
  },
];

export const getRandomQuote = (req, res) => {
  const index = Math.floor(Math.random() * QUOTES.length);
  return res.status(200).json(QUOTES[index]);
};
