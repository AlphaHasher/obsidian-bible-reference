import { bibleChapters } from '../data/BibleChapters';

export function splitQuery(query: string): string[] {
  const matches = query.match(/^([123]?\s*[A-z]{2,})\s*(\d+):(\d+)\s*-\s*(\d+):(\d+)$/);
  if (!matches) {
    return [query];
  }

  const [, book, startChapterStr, startVerseStr, endChapterStr, endVerseStr] = matches;
  const startChapter = parseInt(startChapterStr);
  const endChapter = parseInt(endChapterStr);
  const startVerse = parseInt(startVerseStr);
  const endVerse = parseInt(endVerseStr);

  let queries: string[] = [];
  for (let chapter = startChapter; chapter <= endChapter; chapter++) {
    let endVerseChapter = bibleChapters[book]?.[chapter - 1] || 0;
    if (chapter === startChapter) {
      endVerseChapter = Math.min(endVerseChapter, endVerse);
    }
    for (let verse = (chapter === startChapter ? startVerse : 1); verse <= endVerseChapter; verse++) {
      queries.push(`${book} ${chapter}:${verse}`);
    }
  }

  return queries;
}
