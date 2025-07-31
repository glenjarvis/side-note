type SideNoteRecord = {
  pageURL: string;
  selector: string;
  targetText: string;
  noteText: string | null;
  startOffset: number | null;
  endOffset: number | null;
  isSaved?: boolean;
  context: string;
};

const defaultDB: SideNoteRecord[] = [
  {
    pageURL: "http://localhost:3000/assets/demo.html",
    selector:
      ":root > :nth-child(2) > :nth-child(4) > :nth-child(4) > :nth-child(1)",
    targetText: "accesibility",
    noteText: "Check spelling",
    startOffset: 9,
    endOffset: 22,
    context: "",
    isSaved: true,
  },
  {
    pageURL: "http://localhost:3000/assets/demo.html",
    selector: ":root > :nth-child(2) > :nth-child(18) > :nth-child(1)",
    targetText: "photosynthesis",
    noteText:
      "The process by which green plants use sunlight to synthesize foods from carbon dioxide and water.",
    startOffset: 9,
    endOffset: 23,
    context: "",
    isSaved: true,
  },
];

const find = (): SideNoteRecord[] => {
  return defaultDB;
};

const insertOne = (record: SideNoteRecord): SideNoteRecord[] => {
  defaultDB.push(record);
  return defaultDB; // Not efficient. But good for this POC test
};

export const noteModel = { find, insertOne };
