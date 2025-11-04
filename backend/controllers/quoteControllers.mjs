const QUOTES = [
  {
    text: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe",
  },
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi",
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
];

export const getRandomQuote = (req, res) => {
  if (!QUOTES.length)
    return res.status(404).json({ msg: "no quotes available" });
  const index = Math.floor(Math.random() * QUOTES.length);
  return res.status(200).json(QUOTES[index]);
};

export const getAllQuotes = (req, res) => {
  return res.status(200).json(QUOTES);
};
