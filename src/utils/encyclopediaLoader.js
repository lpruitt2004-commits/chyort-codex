// Utility to load all encyclopedia markdown files from public/encyclopedia
export async function fetchEncyclopediaList() {
  // List of topics (filenames without extension)
  const topics = [
    "anthropology",
    "art",
    "astronomy",
    "biology",
    "chemistry",
    "computer-science",
    "economics",
    "engineering",
    "environmental-science",
    "gardening",
    "geography",
    "history",
    "independent-unbiased-journalism",
    "journaling",
    "language-arts",
    "law",
    "literature",
    "mathematics",
    "medicine",
    "music",
    "philosophy",
    "physics",
    "political-science",
    "psychology",
    "sociology",
    "sports",
    "technology",
    "web-development",
  ];
  return topics;
}

export async function fetchEncyclopediaContent(topic) {
  const res = await fetch(`/encyclopedia/${topic}.md`);
  if (!res.ok) throw new Error("Failed to load topic: " + topic);
  return await res.text();
}
